package com.bp.mongo;

import com.bp.mongo.e.QueryDTO;


public class CountDTO extends BaseDTO{
	private QueryDTO queryDTO;

	public QueryDTO getQueryDTO() {
		if(queryDTO==null)
			queryDTO=new QueryDTO();
		return queryDTO;
	}

	public void setQueryDTO(QueryDTO queryDTO) {
		this.queryDTO = queryDTO;
	}
	
}
