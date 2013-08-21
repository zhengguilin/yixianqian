package com.bp.mongo;

public class CountAddByIdDTO extends BaseDTO{
	private String id;
	private String countP;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getCountP() {
		return countP;
	}
	public void setCountP(String countP) {
		this.countP = countP;
	}
	
}
