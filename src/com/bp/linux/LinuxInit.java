package com.bp.linux;

import java.io.IOException;

import ch.ethz.ssh2.Connection;

public class LinuxInit {
	public static void open() {
		try {
			Connection conn = new Connection(LinuxMem.getIp());
			conn.connect();
			boolean isAuthenticated = conn.authenticateWithPassword(LinuxMem.getUsername(), LinuxMem.getPassword());
			if (isAuthenticated == false)
				throw new IOException("Authentication failed.");
			LinuxMem.setConn(conn);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
