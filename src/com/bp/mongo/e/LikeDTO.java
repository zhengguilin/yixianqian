package com.bp.mongo.e;

import java.util.HashMap;
import java.util.Map;

public class LikeDTO {
	private Map<String, String> stringParametersLike;
	
	public Map<String, String> getStringParametersLike() {
		if(stringParametersLike==null)
			stringParametersLike=new HashMap<String, String>();
		return stringParametersLike;
	}
	public void setStringParametersLike(Map<String, String> stringParametersLike) {
		this.stringParametersLike = stringParametersLike;
	}
}
