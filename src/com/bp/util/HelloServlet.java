package com.bp.util;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.catalina.comet.CometEvent;
import org.apache.catalina.comet.CometProcessor;


import com.bp.base.BaseServlet;
import com.bp.common.T;
import com.bp.rest.RestSupport;

@RestSupport({"/bp/hello/$1/h/*","/bp/hello"})
public class HelloServlet extends BaseServlet implements CometProcessor {

	/**
	 * 
	 */
	private static final long serialVersionUID = -5232779927051348746L;

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		doPost(req, resp);
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		System.out.println(req.getParameter("name"));
		
	}

	@Override
	public void event(CometEvent arg0) throws IOException, ServletException {
		int a=0;
		
		try {
			Thread.sleep(1000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		T.print(arg0.getHttpServletResponse(), a);
	}
	
	
	

}
