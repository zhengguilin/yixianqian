package com.bp.util.encrypt;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.bp.base.BaseServlet;
import com.bp.common.T;
import com.bp.rest.RestSupport;
/**执行cmd命令*/
@RestSupport("/bp/des/decode")
public class DESDecodeServlet   extends BaseServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 791837365935347541L;

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
					String result=crypt.decrypt(content);
					T.print(resp, result);
				} catch (Exception e) {
					e.printStackTrace();
				}
			} else {
				T.print(resp, "请输入解密内容！");
			}
		}else {
			if(content!=null&&content.length()>0) {
				DESUtil crypt = new DESUtil(T.key);
				try {
					String result=crypt.decrypt(content);
					T.print(resp, result);
				} catch (Exception e) {
					e.printStackTrace();
				}
			} else {
				T.print(resp, "请输入解密内容！");
			}
		}
	}
	
	

}
