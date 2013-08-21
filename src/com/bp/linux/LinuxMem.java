package com.bp.linux;

import ch.ethz.ssh2.Connection;


public class LinuxMem {
	private static boolean isUse=false;
	private static String ip;
	private static String username;
	private static String password;
	private static Integer port=22;
	private static Connection conn;
	public static String getIp() {
		return ip;
	}
	public static void setIp(String ip) {
		LinuxMem.ip = ip;
	}
	public static String getUsername() {
		return username;
	}
	public static void setUsername(String username) {
		LinuxMem.username = username;
	}
	public static String getPassword() {
		return password;
	}
	public static void setPassword(String password) {
		LinuxMem.password = password;
	}
	public static boolean isUse() {
		return isUse;
	}
	public static void setUse(boolean isUse) {
		LinuxMem.isUse = isUse;
	}
	public static Integer getPort() {
		return port;
	}
	public static void setPort(Integer port) {
		LinuxMem.port = port;
	}
	public static Connection getConn() {
		return conn;
	}
	public static void setConn(Connection conn) {
		LinuxMem.conn = conn;
	}
	
	
	
}
