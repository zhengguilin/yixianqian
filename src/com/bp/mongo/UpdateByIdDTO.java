package com.bp.mongo;

import com.bp.mongo.e.SetDTO;


public class UpdateByIdDTO extends BaseDTO{
	private String id;
	private SetDTO setDTO;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
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
