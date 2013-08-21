package com.bp.mongo.e;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class LtDTO {
	private Map<String, Integer> intParametersLt;
	private Map<String, Double> doubleParametersLt;
	private Map<String, Date> dateParametersLt;
	
	public Map<String, Double> getDoubleParametersLt() {
		if(doubleParametersLt==null)
			doubleParametersLt=new HashMap<String, Double>();
		return doubleParametersLt;
	}
	public void setDoubleParametersLt(Map<String, Double> doubleParametersLt) {
		this.doubleParametersLt = doubleParametersLt;
	}
	public Map<String, Integer> getIntParametersLt() {
		if(intParametersLt==null)
			intParametersLt=new HashMap<String, Integer>();
		return intParametersLt;
	}
	public void setIntParametersLt(Map<String, Integer> intParametersLt) {
		this.intParametersLt = intParametersLt;
	}
	public Map<String, Date> getDateParametersLt() {
		if(dateParametersLt==null)
			dateParametersLt=new HashMap<String, Date>();
		return dateParametersLt;
	}
	public void setDateParametersLt(Map<String, Date> dateParametersLt) {
		this.dateParametersLt = dateParametersLt;
	}
	
}
