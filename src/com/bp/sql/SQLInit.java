package com.bp.sql;
import org.apache.tomcat.jdbc.pool.DataSource;
import org.apache.tomcat.jdbc.pool.PoolProperties;

import com.bp.common.T;
public class SQLInit {

	/**初始化数据库*/
	public static DataSource init() {
		PoolProperties p = new PoolProperties();
		p.setUrl(T.r("sql.url"));
		p.setDriverClassName(T.r("sql.driverClassName"));
		p.setUsername(T.r("sql.username"));
		p.setPassword(T.r("sql.password"));
		p.setJmxEnabled(true);
		p.setTestWhileIdle(false);
		 //设置在每一次取对象时测试ping
		p.setTestOnBorrow(true);
		p.setValidationQuery("SELECT 1");
		p.setTestOnReturn(false);
		p.setValidationInterval(30000);
		p.setTimeBetweenEvictionRunsMillis(Integer.parseInt(T.r("sql.timeBetweenEvictionRunsMillis")));
		p.setMaxActive(Integer.parseInt(T.r("sql.maxActive")));
		p.setInitialSize(Integer.parseInt(T.r("sql.initialSize")));
		p.setMaxWait(Integer.parseInt(T.r("sql.maxWait")));
		p.setRemoveAbandonedTimeout(Integer.parseInt(T.r("sql.removeAbandonedTimeout")));
		p.setMinEvictableIdleTimeMillis(Integer.parseInt(T.r("sql.minEvictableIdleTimeMillis")));
		p.setMinIdle(Integer.parseInt(T.r("sql.minIdle")));
		p.setLogAbandoned(new Boolean(T.r("sql.logAbandoned")));
		p.setRemoveAbandoned(new Boolean(T.r("sql.removeAbandoned")));
		p.setJdbcInterceptors("org.apache.tomcat.jdbc.pool.interceptor.ConnectionState;"+
		  "org.apache.tomcat.jdbc.pool.interceptor.StatementFinalizer");
		DataSource datasource = new DataSource();
		datasource.setPoolProperties(p);
		return datasource;
	}
	
}
