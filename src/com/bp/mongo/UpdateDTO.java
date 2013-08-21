package com.bp.mongo;

import com.bp.mongo.e.QueryDTO;
import com.bp.mongo.e.SetDTO;


public class UpdateDTO extends BaseDTO{
	private QueryDTO queryDTO;
	private SetDTO setDTO;
	public QueryDTO getQueryDTO() {
		if(queryDTO==null)
			queryDTO=new QueryDTO();
		return queryDTO;
	}

	public void setQueryDTO(QueryDTO queryDTO) {
		this.queryDTO = queryDTO;
	}

	public SetDTO getSetDTO() {
		if(setDTO==null)
			setDTO=new SetDTO();
		return setDTO;
	}

	public void setSetDTO(SetDTO setDTO) {
		this.setDTO = setDTO;
	}
	
}
