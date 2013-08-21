package com.bp.redis;


import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.bp.base.BaseServlet;
import com.bp.common.T;
import com.bp.rest.RestSupport;
import com.jd.data.redis.connection.RedisAccessException;
@RestSupport("/bp/redis/get")
public class RedisGetServlet extends BaseServlet{

	/**
	 * 
	 */
	private static final long serialVersionUID = -7077858527604888068L;

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		doPost(req, resp);
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		String key=req.getParameter("key");
		if(key==null||key.length()==0){
			T.print(resp, "请输入参数key!");
		}else {
			try {
				String result=RedisTool.getRedisUtils().get(key);
				T.print(resp, result);
			} catch (RedisAccessException e) {
				e.printStackTrace();
			}
		}
	}

}
