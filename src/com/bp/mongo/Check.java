package com.bp.mongo;

import java.util.Map;

public class Check {
	public static boolean c(Map<String, String[]> map) {
		return map.containsKey("collection");
	}
}
