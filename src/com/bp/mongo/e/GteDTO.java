package com.bp.mongo.e;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class GteDTO {
	private Map<String, Integer> intParametersGte;
	private Map<String, Double> doubleParametersGte;
	private Map<String, Date> dateParametersGte;
	public Map<String, Integer> getIntParametersGte() {
		if(intParametersGte==null)
			intParametersGte=new HashMap<String, Integer>();
		return intParametersGte;
	}
	public void setIntParametersGte(Map<String, Integer> intParametersGte) {
		this.intParametersGte = intParametersGte;
	}
	public Map<String, Date> getDateParametersGte() {
		if(dateParametersGte==null)
			dateParametersGte=new HashMap<String, Date>();
		return dateParametersGte;
	}
	public void setDateParametersGte(Map<String, Date> dateParametersGte) {
		this.dateParametersGte = dateParametersGte;
	}
	
	public Map<String, Double> getDoubleParametersGte() {
		if(doubleParametersGte==null)
			doubleParametersGte=new HashMap<String, Double>();
		return doubleParametersGte;
	}
	public void setDoubleParametersGte(Map<String, Double> doubleParametersGte) {
		this.doubleParametersGte = doubleParametersGte;
	}
}
