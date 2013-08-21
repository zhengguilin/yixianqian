package com.bp.mongo;

import com.bp.mongo.e.QueryDTO;


public class SelectDTO extends BaseDTO{
	private String id;
	private String sortdesc;
	private String sortasc;
	private int page=1;
	private int limit=20;
	private QueryDTO queryDTO;

	public QueryDTO getQueryDTO() {
		if(queryDTO==null)
			queryDTO=new QueryDTO();
		return queryDTO;
	}

	public void setQueryDTO(QueryDTO queryDTO) {
		this.queryDTO = queryDTO;
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
	
}
