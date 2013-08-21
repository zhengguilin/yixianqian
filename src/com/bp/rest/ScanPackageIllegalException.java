package com.bp.rest;

/**
 * 定义需要扫描的包出现的异常
 */
public class ScanPackageIllegalException extends IllegalArgumentException {
	private static final long serialVersionUID = 6324279375643767512L;

	public ScanPackageIllegalException() {
		super();
	}

	public ScanPackageIllegalException(String exceptionStr) {
		super(exceptionStr);
	}
}
