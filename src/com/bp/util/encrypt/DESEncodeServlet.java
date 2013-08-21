package com.bp.util.encrypt;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.bp.base.BaseServlet;
import com.bp.common.T;
import com.bp.rest.RestSupport;

/**
 * DES的加密类，如果有KEY则使用KEY，没有则使用默认KEY
 * 
 * */
@RestSupport("/bp/des/encode")
public class DESEncodeServlet  extends BaseServlet {
	

	/**
	 * 
	 */
	private static final long serialVersionUID = 8127289198700754473L;

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
				DESUtil crypt = new DESUtil(key);
				try {
					String result=crypt.encrypt(content);
					T.print(resp, result);
				} catch (Exception e) {
					e.printStackTrace();
				}
			} else {
				T.print(resp, "请输入加密内容！");
			}
		}else {
			if(content!=null&&content.length()>0) {
				DESUtil crypt = new DESUtil(T.key);
				try {
					String result=crypt.encrypt(content);
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
