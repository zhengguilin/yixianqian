package com.bp.httl;

import httl.Engine;
import httl.Template;
import httl.web.servlet.HttlServlet;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.bp.base.BaseServlet;
import com.bp.common.T;
import com.bp.httl.service.BookService;
import com.bp.httl.service.impl.BookServiceImpl;
import com.bp.mongo.MongoServiceImpl;
import com.bp.rest.RestSupport;

@RestSupport("/bp/mongo/countaddbyid")
public class CountAddByIdServlet  extends BaseServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 3131655396187207030L;
	private BookService bookService = new BookServiceImpl();
	@Override
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		try {
			Map<String, Object> parameters = new HashMap<String, Object>();
			parameters.put("books",  bookService.findBooks());
			Engine engine = Engine.getEngine();
			Template template = engine.getTemplate("/books.httl");
			template.render(parameters, response.getOutputStream());
		} catch (Exception e) {
			e.printStackTrace();
			request.setAttribute("exception", e);
			request.getRequestDispatcher("error.httl").forward(request,
					response);
		}
	}

	@Override
	public void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		doGet(req,resp);
	}

}
