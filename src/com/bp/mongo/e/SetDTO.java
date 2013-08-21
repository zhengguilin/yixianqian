package com.bp.mongo.e;

import java.util.HashMap;
import java.util.Map;

public class SetDTO {
	private String date;
	private Map<String, String> stringParametersSet;
	private Map<String, Integer> intParametersSet;
	private Map<String, Double> doubleParametersSet;
	
	
	
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public Map<String, Double> getDoubleParametersSet() {
		if(doubleParametersSet==null)
			doubleParametersSet=new HashMap<String, Double>();
		return doubleParametersSet;
	}
	public void setDoubleParametersSet(Map<String, Double> doubleParametersSet) {
		this.doubleParametersSet = doubleParametersSet;
	}
	public Map<String, String> getStringParametersSet() {
		if(stringParametersSet==null)
			stringParametersSet=new HashMap<String, String>();
		return stringParametersSet;
	}
	public void setStringParametersSet(Map<String, String> stringParametersSet) {
		this.stringParametersSet = stringParametersSet;
	}
	public Map<String, Integer> getIntParametersSet() {
		if(intParametersSet==null)
			intParametersSet=new HashMap<String, Integer>();
		return intParametersSet;
	}
	public void setIntParametersSet(Map<String, Integer> intParametersSet) {
		this.intParametersSet = intParametersSet;
	}
	
	
}
