package com.bp.util;

import java.io.IOException;
import java.util.UUID;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.bp.base.BaseServlet;
import com.bp.common.T;
import com.bp.rest.RestSupport;
/**生成唯一ID*/
@RestSupport("/bp/uuid")
public class UUIDServlet extends BaseServlet{

	private static final long serialVersionUID = -413576221880790107L;

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		T.print(resp, UUID.randomUUID().toString());
	}
	
}
