package com.bp.httl;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.bp.base.BaseServlet;
import com.bp.common.T;
import com.bp.mongo.MongoServiceImpl;
import com.bp.rest.RestSupport;

@RestSupport("/bp/mongo/deletebyids")
public class DeleteByIdsServlet extends BaseServlet{

	/**
	 * 
	 */
	private static final long serialVersionUID = -6278298466206811663L;

	@Override
	public void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		doPost(req, resp);
	}

	@Override
	public void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		T.print(resp, MongoServiceImpl.deleteById(req.getParameterMap()));
	}

}
