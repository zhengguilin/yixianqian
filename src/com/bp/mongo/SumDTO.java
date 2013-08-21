package com.bp.mongo;

import com.bp.mongo.e.QueryDTO;


public class SumDTO extends BaseDTO{
	private String sumP;
	private QueryDTO queryDTO;

	public String getSumP() {
		return sumP;
	}

	public void setSumP(String sumP) {
		this.sumP = sumP;
	}

	public QueryDTO getQueryDTO() {
		if(queryDTO==null)
			queryDTO=new QueryDTO();
		return queryDTO;
	}

	public void setQueryDTO(QueryDTO queryDTO) {
		this.queryDTO = queryDTO;
	}
	
	
}
