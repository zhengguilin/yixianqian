package com.bp.rest;

/**
 * 定义需要扫描的XML文件出现的异常
 * 
 */
public class XmlFileIllegalException extends IllegalArgumentException {
	private static final long serialVersionUID = 6324279375643767512L;

	public XmlFileIllegalException() {
		super();
	}

	public XmlFileIllegalException(String exceptionStr) {
		super(exceptionStr);
	}
}
