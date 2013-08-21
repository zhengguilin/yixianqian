package com.bp.rest;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.apache.tomcat.jdbc.pool.DataSource;

import com.bp.base.BaseServlet;
import com.bp.base.ParameterRequestWrapper;
import com.bp.common.T;
import com.bp.linux.LinuxInit;
import com.bp.linux.LinuxMem;
import com.bp.mongo.MongoDB;
import com.bp.redis.RedisTool;
import com.bp.sql.SQLInit;
import com.bp.util.IPServlet;

/**
 * 控制转交请求给相应的Servlet
 * 
 */
public class RestFilter implements Filter {
	private static ServletFactory servletFactory = null;

	/** 使用tomcat7 自带连接池,有很多好处 */
	private static DataSource dataSource;// 链接池

	public static DataSource getDataSource() {
		return dataSource;
	}

	/** 允许使用的IP */
	private static List<String> ips = new ArrayList<String>();

	private static boolean ipUse = false;

	/**
	 * 初始化servlet工厂
	 */
	public void init(FilterConfig config) throws ServletException {
		String scanPackage = config.getInitParameter("scanPackage");

		if (scanPackage == null || scanPackage.length() == 0) {
			throw new NullPointerException();
		}

		if (scanPackage.toLowerCase().endsWith(".xml")) {
			servletFactory = new XmlServletFactoryImpl(scanPackage);
		} else {
			servletFactory = new AnnotationServletFactoryImpl(scanPackage);
		}
		if (T.r("mongodb.isUsed").equals("true"))
			MongoDB.getDB();
		if (T.r("sql.isUsed").equals("true"))
			dataSource = SQLInit.init();
		if (T.r("redis.isUsed").equals("true"))
			RedisTool.init();
		if (T.r("ip.isUsed").equals("true")) {
			ipUse = true;
			String[] ss = T.r("ip.canUse").split(";");
			if (ss != null && ss.length > 0)
				ips = Arrays.asList(ss);
		}
		if(T.r("linux.isUsed").equals("true")) {
			LinuxMem.setUse(true);
			LinuxMem.setIp(T.r("linux.ip"));
			LinuxMem.setUsername(T.r("linux.username"));
			LinuxMem.setPassword(T.r("linux.password"));
			LinuxMem.setPort(Integer.parseInt(T.r("linux.port")));
			LinuxInit.open();
		}

		// 提供外部程序访问servlet工厂入口
		config.getServletContext().setAttribute("servletFactory",
				servletFactory);
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public void doFilter(ServletRequest req, ServletResponse res,
			FilterChain chain) throws IOException, ServletException {
		HttpServletRequest request = (HttpServletRequest) req;
		String realUrl = request.getRequestURI().replaceFirst(
				request.getContextPath(), "");
		String method = request.getMethod();
		HashMap m=new HashMap(request.getParameterMap());  
		request=transcoding(method,m,request);
		BaseServlet servlet ;
		if(ipUse){
			String ip=IPServlet.getIP(request);
			if(ips.size()>0&&ips.contains(ip)) {
				servlet= servletFactory.getServletByUrl(realUrl);
			}else if(ip.equals("127.0.0.1")||ip.equals("0:0:0:0:0:0:0:1")) {
				servlet= servletFactory.getServletByUrl(realUrl);
			}else {
				servlet= servletFactory.getServletByUrl("/bp/notallowed");
			}
		}else {
			servlet= servletFactory.getServletByUrl(realUrl);
		}
		
		if (servlet != null) {
			servlet.service(request, res);
			return;
		}
		chain.doFilter(request, res);
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public HttpServletRequest transcoding(String method, HashMap m,HttpServletRequest request) {
		// 1.以post方式提交的请求,直接设置编码为UTF-8
		/*if (method.equalsIgnoreCase("post")) {
			try {
				request.setCharacterEncoding("UTF-8");
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}
		}else 
			if(method.equalsIgnoreCase("get")) {*/
			// 取出客户提交的参数集
			Enumeration<String> paramNames = request.getParameterNames();
			// 遍历参数集取出每个参数的名称及值
			while (paramNames.hasMoreElements()) {
				String name = paramNames.nextElement();// 取出参数名称
				String values[] = request.getParameterValues(name);// 根据参数名称取出其值
				// 如果参数值集不为空
				if (values != null) {
					// 如果参数值集中只有一个值
					if (values.length == 1) {
						try {
							// 调用toUTF(values[0])函数,(values[0]即第一个参数值)方法转换参数值的字元编码
							String vlustr = toUTF(method,values[0]);
							values[0]=vlustr;
							// 并将该值以属性的形式藏在m
							m.put(name, values);
						} catch (UnsupportedEncodingException e) {
							e.printStackTrace();
						}
					}
					// 如果参数值集中有多个值
					else {
						// 遍历参数值集
						for (int i = 0; i < values.length; i++) {
							try {
								// 回圈依次将每个值调用toUTF(values[i])方法转换参数值的字元编码
								String vlustr = toUTF(method,values[i]);
								values[i] = vlustr;
							} catch (UnsupportedEncodingException e) {
								e.printStackTrace();
							}
						}
						// 将该值以属性的形式藏在request
						m.put(name, values);
					}
				}
			}
		/*}else {
			try {
				request.setCharacterEncoding("UTF-8");
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}
		}*/
		ParameterRequestWrapper wrapRequest=new ParameterRequestWrapper(request,m);
		return (HttpServletRequest)wrapRequest;
	}

	/**
	 * 将inStr转为UTF-8的编码形式
	 * 
	 * @param inStr
	 *            输入字符串
	 * @return UTF-8的编码形式的字符串
	 * @throws UnsupportedEncodingException
	 */
	private String toUTF(String method,String inStr) throws UnsupportedEncodingException {
		String outStr = "";
		if (inStr != null) {
			// outStr=java.net.URLDecoder.decode(inStr);//不用decode了,到这的时候就已经自动decode过了
			// 将字符串转为UTF-8编码形式
			if(method.toLowerCase().equals("get")){
			outStr = new String(inStr.getBytes("iso-8859-1"), "UTF-8");
			}else {
			outStr = new String(inStr.getBytes("UTF-8"), "UTF-8");
			}
			
		}
		return outStr;
	}

	public void destroy() {
		if (servletFactory != null) {
			servletFactory.clear();
		}
	}
}
