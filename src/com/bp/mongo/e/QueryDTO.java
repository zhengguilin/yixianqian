package com.bp.mongo.e;

import java.util.HashMap;
import java.util.Map;

public class QueryDTO {
	private Map<String, String> stringParametersQuery;
	private Map<String, Integer> intParametersQuery;
	private Map<String, Double> doubleParametersQuery;
	
	private LikeDTO likeDTO;
	private GtDTO gtDTO;
	private GteDTO gteDTO;
	private LtDTO ltDTO;
	private LteDTO lteDTO;
	
	

	
	public LikeDTO getLikeDTO() {
		if(likeDTO==null)
			likeDTO=new LikeDTO();
		return likeDTO;
	}
	public void setLikeDTO(LikeDTO likeDTO) {
		this.likeDTO = likeDTO;
	}
	public GtDTO getGtDTO() {
		if(gtDTO==null)
			gtDTO=new GtDTO();
		return gtDTO;
	}
	public void setGtDTO(GtDTO gtDTO) {
		this.gtDTO = gtDTO;
	}
	public GteDTO getGteDTO() {
		if(gteDTO==null)
			gteDTO=new GteDTO();
		return gteDTO;
	}
	public void setGteDTO(GteDTO gteDTO) {
		this.gteDTO = gteDTO;
	}
	public LtDTO getLtDTO() {
		if(ltDTO==null)
			ltDTO=new LtDTO();
		return ltDTO;
	}
	public void setLtDTO(LtDTO ltDTO) {
		this.ltDTO = ltDTO;
	}
	public LteDTO getLteDTO() {
		if(lteDTO==null)
			lteDTO=new LteDTO();
		return lteDTO;
	}
	public void setLteDTO(LteDTO lteDTO) {
		this.lteDTO = lteDTO;
	}
	public Map<String, String> getStringParametersQuery() {
		if(stringParametersQuery==null)
			stringParametersQuery=new HashMap<String, String>();
		return stringParametersQuery;
	}
	public void setStringParametersQuery(Map<String, String> stringParametersQuery) {
		this.stringParametersQuery = stringParametersQuery;
	}
	public Map<String, Integer> getIntParametersQuery() {
		if(intParametersQuery==null)
			intParametersQuery=new HashMap<String, Integer>();
		return intParametersQuery;
	}
	public void setIntParametersQuery(Map<String, Integer> intParametersQuery) {
		this.intParametersQuery = intParametersQuery;
	}
	
	public Map<String, Double> getDoubleParametersQuery() {
		if(doubleParametersQuery==null)
			doubleParametersQuery=new HashMap<String, Double>();
		return doubleParametersQuery;
	}
	public void setDoubleParametersQuery(Map<String, Double> doubleParametersQuery) {
		this.doubleParametersQuery = doubleParametersQuery;
	}
}
