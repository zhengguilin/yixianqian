package com.bp.base;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.bp.common.T;
import com.bp.rest.RestSupport;
@RestSupport("/bp/notallowed")
public class NotAllowedServlet extends BaseServlet{

	/**
	 * 
	 */
	private static final long serialVersionUID = -3181484187875208738L;

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		doPost(req, resp);
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		T.print(resp, "你的IP没有此权限!");
		
	}
	
	
	

}
