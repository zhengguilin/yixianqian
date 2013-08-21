package com.bp.redis;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alibaba.fastjson.JSON;
import com.bp.base.BaseServlet;
import com.bp.common.T;
import com.bp.rest.RestSupport;
import com.jd.data.redis.connection.RedisAccessException;
@RestSupport("/bp/redis/set")
public class RedisSetServlet  extends BaseServlet{

	/**
	 * 
	 */
	private static final long serialVersionUID = -641908289028755207L;

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		doPost(req, resp);
	}

	@SuppressWarnings("deprecation")
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		String key=req.getParameter("key");
		String content=req.getParameter("content");
		String seconds=req.getParameter("seconds");
		if(key==null||content==null||key.length()==0||key.length()==0) {
			T.print(resp, "请传入参数key和content!");
		}else if(seconds==null||seconds.length()==0) {
			try {
				String result=RedisTool.getRedisUtils().set(key, content);
				T.print(resp, result);
			} catch (RedisAccessException e) {
				e.printStackTrace();
			}
		}else {
			try {
				List<Object> list=RedisTool.getRedisUtils().set(key, Integer.parseInt(seconds), content);
				T.print(resp, JSON.toJSONString(list));
			} catch (NumberFormatException e) {
				e.printStackTrace();
			} catch (RedisAccessException e) {
				e.printStackTrace();
			}
		}
	}

}
