package com.bp.mongo;


public class DTO {
	private String id;
	private String table;
	private String collection;
	
	private String sum;
	private String now;
	private String countAdd;
	
	private String sortdesc;
	private String sortasc;
	
	

	
	
	
	private int page=1;
	private int limit=20;
	
	
	public int getPage() {
		return page;
	}
	public void setPage(int page) {
		this.page = page;
	}
	public int getLimit() {
		return limit;
	}
	public void setLimit(int limit) {
		this.limit = limit;
	}
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getTable() {
		return table;
	}
	public void setTable(String table) {
		this.table = table;
	}
	public String getCollection() {
		return collection;
	}
	public void setCollection(String collection) {
		this.collection = collection;
	}
	

	public String getSum() {
		return sum;
	}
	public void setSum(String sum) {
		this.sum = sum;
	}
	public String getCountAdd() {
		return countAdd;
	}
	public void setCountAdd(String countAdd) {
		this.countAdd = countAdd;
	}
	public String getSortdesc() {
		return sortdesc;
	}
	public void setSortdesc(String sortdesc) {
		this.sortdesc = sortdesc;
	}
	public String getSortasc() {
		return sortasc;
	}
	public void setSortasc(String sortasc) {
		this.sortasc = sortasc;
	}
	public String getNow() {
		return now;
	}
	public void setNow(String now) {
		this.now = now;
	}

	


	
	
}
