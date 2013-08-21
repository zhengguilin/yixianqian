package com.bp.linux;


import java.io.IOException;
import java.io.InputStreamReader;
import java.io.LineNumberReader;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.bp.base.BaseServlet;
import com.bp.common.T;
import com.bp.rest.RestSupport;
/**执行cmd命令*/
@RestSupport("/bp/cmd/linux")
public class CmdLinuxServlet  extends BaseServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = -4165043494972364940L;

	/**
	 * dos  win 下记得 cmd.exe
	 * 	if(!cmd.startsWith("cmd.exe")) {
			cmd="cmd.exe  /c  start  "+cmd;
	}*/
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		String cmd=req.getParameter("cmd");
		if (T.isNullOrEmpty(cmd)) {
			T.print(resp, "请输入参数cmd!");
		}else  {
			cmd=cmd.replaceAll("!!", "&&");
			Runtime rt = Runtime.getRuntime();
			Process p = rt.exec(cmd);
			InputStreamReader ir = new InputStreamReader(p.getInputStream());
			LineNumberReader input = new LineNumberReader(ir);
			String line;
			StringBuffer sb = new StringBuffer();
			while ((line = input.readLine()) != null) {
				sb.append(line).append("\n").append("<br>");
			}
			String result = sb.toString();
			T.print(resp, result);
			input.close();
			ir.close();
		}
	}

}
