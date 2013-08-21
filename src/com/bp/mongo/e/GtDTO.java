package com.bp.mongo.e;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
public class GtDTO {
	private Map<String, Integer> intParametersGt;
	private Map<String, Double> doubleParametersGt;
	private Map<String, Date> dateParametersGt;
	
	public Map<String, Integer> getIntParametersGt() {
		if(intParametersGt==null)
			intParametersGt=new HashMap<String, Integer>();
		return intParametersGt;
	}
	public void setIntParametersGt(Map<String, Integer> intParametersGt) {
		this.intParametersGt = intParametersGt;
	}
	public Map<String, Date> getDateParametersGt() {
		if(dateParametersGt==null)
			dateParametersGt=new HashMap<String, Date>();
		return dateParametersGt;
	}
	public void setDateParametersGt(Map<String, Date> dateParametersGt) {
		this.dateParametersGt = dateParametersGt;
	}
	public Map<String, Double> getDoubleParametersGt() {
		if(doubleParametersGt==null)
			doubleParametersGt=new HashMap<String, Double>();
		return doubleParametersGt;
	}
	public void setDoubleParametersGt(Map<String, Double> doubleParametersGt) {
		this.doubleParametersGt = doubleParametersGt;
	}
}
