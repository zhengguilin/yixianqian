package com.bp.mongo.e;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class LteDTO {
	private Map<String, Integer> intParametersLte;
	private Map<String, Double> doubleParametersLte;
	private Map<String, Date> dateParametersLte;
	public Map<String, Integer> getIntParametersLte() {
		if(intParametersLte==null)
			intParametersLte=new HashMap<String, Integer>();
		return intParametersLte;
	}
	public Map<String, Double> getDoubleParametersLte() {
		if(doubleParametersLte==null)
			doubleParametersLte=new HashMap<String, Double>();
		return doubleParametersLte;
	}
	public void setDoubleParametersLte(Map<String, Double> doubleParametersLte) {
		this.doubleParametersLte = doubleParametersLte;
	}
	public void setIntParametersLte(Map<String, Integer> intParametersLte) {
		this.intParametersLte = intParametersLte;
	}
	public Map<String, Date> getDateParametersLte() {
		if(dateParametersLte==null)
			dateParametersLte=new HashMap<String, Date>();
		return dateParametersLte;
	}
	public void setDateParametersLte(Map<String, Date> dateParametersLte) {
		this.dateParametersLte = dateParametersLte;
	}
	

	
}
