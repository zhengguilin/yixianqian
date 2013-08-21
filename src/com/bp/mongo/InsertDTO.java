package com.bp.mongo;


import com.bp.mongo.e.SetDTO;


public class InsertDTO extends BaseDTO{
	
	private SetDTO setDTO;
	public SetDTO getSetDTO() {
		if(setDTO==null)
			setDTO=new SetDTO();
		return setDTO;
	}
	public void setSetDTO(SetDTO setDTO) {
		this.setDTO = setDTO;
	}
	
	
	
	
	
}
