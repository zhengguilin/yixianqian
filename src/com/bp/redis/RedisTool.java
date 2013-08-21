package com.bp.redis;

import com.bp.common.T;
import com.jd.data.redis.ConnectionFactoryBuilder;
import com.jd.data.redis.RedisUtils;

public class RedisTool {

	private static RedisUtils redisUtils;

	public static void init() {
		// 设置连接池参数
		ConnectionFactoryBuilder connectionFactoryBuilder = new ConnectionFactoryBuilder();
		// 单个应用中的链接池最大链接数
		connectionFactoryBuilder.setMaxActive(Integer.parseInt(T
				.r("redis.maxActive")));
		// 单个应用中的链接池最大空闲数
		connectionFactoryBuilder.setMaxIdle(Integer.parseInt(T
				.r("redis.maxIdle")));
		// 单个应用中的链接池取链接时最大等待时间，单位：ms
		connectionFactoryBuilder.setMaxWait(Integer.parseInt(T
				.r("redis.maxWait")));
		// 设置在每一次取对象时测试ping
		connectionFactoryBuilder.setTestOnBorrow(new Boolean(T
				.r("redis.testOnBorrow")));
		// 设置redis connect request response timeout 单位:ms
		connectionFactoryBuilder.setTimeout(Integer.parseInt(T.r("redis.timeout")));
		// master redis server 设置
		// value 举例 host:port:password[password可选,password中不要有":"]
		connectionFactoryBuilder.setMasterConfString(T
				.r("redis.masterConfString"));
		// slave redis server 设置[可选]
		// value 举例 host:port:password[password可选,password中不要有":"]
		String s = T.r("redis.slaveConfString");
		if (s != null && s.length() > 0)
			connectionFactoryBuilder.setSlaveConfString(s);
		// 生成分片主从实例 举例,如果没有从分片服务器，可以不设置slaveShards
		RedisTool.redisUtils = new RedisUtils(connectionFactoryBuilder);
	}

	public static RedisUtils getRedisUtils() {
		return redisUtils;
	}

	public static void setRedisUtils(RedisUtils redisUtils) {
		RedisTool.redisUtils = redisUtils;
	}

}
