package com.bp.linux;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import com.bp.base.BaseServlet;
import com.bp.common.T;
import com.bp.rest.RestSupport;

@RestSupport("/bp/linux/open")
public class LinuxOpenServlet  extends BaseServlet {
	private static final long serialVersionUID = 5337212266246528219L;

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		doPost(req, resp);
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		try {
			LinuxInit.open();
			T.print(resp, "OK");
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		
	}

	
	
	

}
