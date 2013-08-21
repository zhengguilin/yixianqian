package com.bp.sql;

import java.io.IOException;
import java.sql.Clob;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializeConfig;
import com.alibaba.fastjson.serializer.SimpleDateFormatSerializer;
import com.bp.base.BaseServlet;
import com.bp.common.T;
import com.bp.rest.RestFilter;
import com.bp.rest.RestSupport;

@RestSupport({"/bp/sql","/bp/mysql","/bp/oracle","/bp/sqlserver","/bp/postgresql"})
public class SQLServlet extends BaseServlet {

	/**
	 * 参数 int type ResultSet.TYPE_FORWORD_ONLY 结果集的游标只能向下滚动。
	 * ResultSet.TYPE_SCROLL_INSENSITIVE 结果集的游标可以上下移动，当数据库变化时，当前结果集不变。
	 * ResultSet.TYPE_SCROLL_SENSITIVE 返回可滚动的结果集，当数据库变化时，当前结果集同步改变。 参数 int
	 * concurrency ResultSet.CONCUR_READ_ONLY 不能用结果集更新数据库中的表。
	 * ResultSet.CONCUR_UPDATETABLE 能用结果集更新数据库中的表。
	 */

	private Connection con;
	private PreparedStatement ps;
	private ResultSet rs;
	/**
	 * 
	 */
	private static final long serialVersionUID = 5384239265379497718L;

	private static SerializeConfig mapping = new SerializeConfig();
	static {
		mapping.put(Date.class, new SimpleDateFormatSerializer(
				"yyyy-MM-dd HH:mm:ss"));
		mapping.put(java.sql.Date.class, new SimpleDateFormatSerializer(
				"yyyy-MM-dd HH:mm:ss"));
		mapping.put(Timestamp.class, new SimpleDateFormatSerializer(
		"yyyy-MM-dd HH:mm:ss"));
	}

	/** 初始化异步获取连接 */
	public void initCon() throws ServletException {
		Future<Connection> future;
		try {
			future = RestFilter.getDataSource().getConnectionAsync();
			while (!future.isDone()) {
				System.out
						.println("Connection is not yet available. Do some background work");
				Thread.sleep(100); // simulate work
			}
			con = future.get();
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (InterruptedException e) {
			e.printStackTrace();
		} catch (ExecutionException e) {
			e.printStackTrace();
		}

	}

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		doPost(req, resp);
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		String sql = req.getParameter("sql");
		if (T.isNullOrEmpty(sql)) {
			T.print(resp, "请输入参数sql");
		} else {
			String sql2 = sql.toLowerCase().trim();
			initCon();
			if (sql2.startsWith("select")) {
				querySQL(sql, resp);
			} else if (sql2.startsWith("insert") || sql2.startsWith("update")
					|| sql2.startsWith("delete")) {
				updateSQL(sql, resp);
			} else {
				executeSQL(sql, resp);
			}
			try {
				if(rs!=null)
					rs.close();
				if(ps!=null)
					ps.close();
				if(con!=null)
					con.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}

	/** 执行查询的SQL */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	private void querySQL(String sql, HttpServletResponse resp) {
		try {
			ps = con.prepareStatement(sql,
					ResultSet.TYPE_SCROLL_INSENSITIVE,
					ResultSet.CONCUR_READ_ONLY);
			rs = ps.executeQuery();
			ResultSetMetaData rsmd = rs.getMetaData();
			int columnCount = rsmd.getColumnCount();
			ArrayList list = new ArrayList();
			Map rowData;
			while (rs.next()) {
				rowData = new HashMap(columnCount);
				for (int i = 1; i <= columnCount; i++) {
					Object v = rs.getObject(i);
					if (v != null && v.getClass() == Clob.class) {
						v = clob2String((Clob) v);
					}
					rowData.put(rsmd.getColumnName(i), v);
				}
				list.add(rowData);
			}
			String result = JSON.toJSONString(list, mapping);
			T.print(resp, result);
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/** 执行增加，删除 修改的SQL，返回影响的行数 */
	private void updateSQL(String sql, HttpServletResponse resp) {
		try {
			ps = con.prepareStatement(sql,
					ResultSet.TYPE_SCROLL_INSENSITIVE);
			int line = ps.executeUpdate();
			T.print(resp, line);
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/** 执行任意的SQL，返回是否执行成功 */
	private void executeSQL(String sql, HttpServletResponse resp) {
		try {
			ps = con.prepareStatement(sql);
			boolean result = ps.execute();
			T.print(resp, result);
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	private static String clob2String(Clob clob) throws Exception {
		return (clob != null ? clob.getSubString(1, (int) clob.length()) : null);
	}
}
