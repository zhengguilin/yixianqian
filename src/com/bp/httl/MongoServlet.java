package com.bp.httl;

import httl.web.servlet.HttlServlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.bp.httl.service.BookService;
import com.bp.httl.service.impl.BookServiceImpl;

public class MongoServlet extends HttlServlet {

	private static final long serialVersionUID = 1L;

	private BookService bookService = new BookServiceImpl();

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		try {
			request.setAttribute("books", bookService.findBooks());
		} catch (Exception e) {
			request.setAttribute("exception", e);
			request.getRequestDispatcher("error.httl").forward(request, response);
		}
	}

}