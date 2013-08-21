package com.bp.common;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Iterator;
import java.util.Properties;

import javax.servlet.http.HttpServletResponse;


/**公共工具类*/
public class T {
	
	/**标准日期输出*/
	public static SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd  HH:mm:ss");
	
	/**配置文件*/
	private static Properties p = null;
	/**公用密钥*/
	public static final String  key="12345678";
 
	public static void print(HttpServletResponse resp,int s) {
		print(resp,s+"");
	}
	public static void print(HttpServletResponse resp,boolean s) {
		print(resp,s+"");
	}
	/**公用打印*/
	public static void print(HttpServletResponse resp,Object s) {
		String ss=s+"";
		resp.setContentType("text/html;charset=UTF-8");
		resp.setCharacterEncoding("UTF-8");
		try {
			resp.getWriter().print(ss.trim());
			resp.getWriter().flush();
			resp.getWriter().close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	/**判断是否为空和空字符串*/
	public static boolean isNullOrEmpty(Object obj) {	
		return obj == null || "".equals(obj.toString());
	}
	/**为空则返回字符串空*/
	public static String toString(Object obj){
		if(obj == null) return "null";
		return obj.toString();
	}
	
	
	
	@SuppressWarnings("rawtypes")
	public static String join(Collection s, String delimiter) {
        StringBuffer buffer = new StringBuffer();
        Iterator iter = s.iterator();
        while (iter.hasNext()) {
            buffer.append(iter.next());
            if (iter.hasNext()) {
                buffer.append(delimiter);
            }
        }
        return buffer.toString();
    }


	public static String r(String key) {
		return r(key,"bp");
	}
	
	/**读取txt配置文件 */
	public static String r(String key, String propertiesName) {
		if (p == null || p.size() == 0) {
			p = new Properties();
			try {
				p.load(T.class
						.getResourceAsStream("/"+propertiesName+".txt"));

			} catch (Exception ex) {
				System.out.println(ex.getMessage());
			}
		}

		return String.valueOf(p.getProperty(key, ""));
	}
	public static void main(String args[]) {
		System.out.println(T.r("mongodb.usert"));
	}
}
