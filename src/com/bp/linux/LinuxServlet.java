package com.bp.linux;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import ch.ethz.ssh2.Session;
import ch.ethz.ssh2.StreamGobbler;

import com.bp.base.BaseServlet;
import com.bp.common.T;
import com.bp.rest.RestSupport;

@RestSupport("/bp/linux")
public class LinuxServlet extends BaseServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = -1106225090192088428L;

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		doPost(req, resp);
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		if (LinuxMem.isUse()) {
			String command = req.getParameter("command");
			if (T.isNullOrEmpty(command)) {
				T.print(resp, "请输入command参数!");
			} else {
				command=command.replaceAll("!!", "&&");
				try
				{
					Session sess = LinuxMem.getConn().openSession();
					sess.execCommand(command);
					InputStream stdout = new StreamGobbler(sess.getStdout());
					BufferedReader br = new BufferedReader(new InputStreamReader(stdout));
					StringBuilder sb=new StringBuilder();
					while (true)
					{
						String line = br.readLine();
						if (line == null)
							break;
						sb.append(line).append("<br>");
					}
					T.print(resp, sb.toString());
					sess.close();
				}
				catch (IOException e)
				{
					T.print(resp, "出现异常,请核对命令或执行linux链接开启\\bp\\linux\\open");
					e.printStackTrace(System.err);
					System.exit(2);
				}
			}
		} else {
			T.r("没有开启操作linux权限!");
		}

	}

}
