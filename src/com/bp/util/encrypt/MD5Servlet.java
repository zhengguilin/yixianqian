package com.bp.util.encrypt;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.bp.base.BaseServlet;
import com.bp.common.T;
import com.bp.rest.RestSupport;

/**单字符串MD5加密*/
@RestSupport("/bp/md5/decode")
public class MD5Servlet extends BaseServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 5521338651907902075L;

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		doPost(req, resp);
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		String key=req.getParameter("key");
		String content=req.getParameter("content");
		if(key!=null&&key.length()==8) {
			if(content!=null&&content.length()>0) {
				try {
					String result=MD5Util.MD5(content+key);
					T.print(resp, result);
				} catch (Exception e) {
					e.printStackTrace();
				}
			} else {
				T.print(resp, "请输入加密内容！");
			}
		}else {
			if(content!=null&&content.length()>0) {
				try {
					String result=MD5Util.MD5(content+key);
					T.print(resp, result);
				} catch (Exception e) {
					e.printStackTrace();
				}
			} else {
				T.print(resp, "请输入加密内容！");
			}
		}
	}
	
	
	
}
