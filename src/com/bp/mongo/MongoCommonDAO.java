package com.bp.mongo;

import java.util.Date;
import java.util.Map;
import java.util.Set;
import java.util.regex.Pattern;

import com.bp.mongo.e.GtDTO;
import com.bp.mongo.e.GteDTO;
import com.bp.mongo.e.LikeDTO;
import com.bp.mongo.e.LtDTO;
import com.bp.mongo.e.LteDTO;
import com.bp.mongo.e.QueryDTO;
import com.bp.mongo.e.SetDTO;
import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;

public class MongoCommonDAO {
	@SuppressWarnings({ "unchecked", "rawtypes" })
	private  static DBObject common1(DBObject o,Map map) {
		if(map!=null) {
			Set<String> set = map.keySet();
			for(String key:set) {
				o.put(key, map.get(key));
			}
		}
		return o;
	}
	@SuppressWarnings({ "unchecked", "rawtypes" })
	private  static DBObject common2(DBObject o,Map map,String refStr) {
		if(map!=null) {
			Set<String> set = map.keySet();
			for(String key:set) {
				if(o.containsField(key)) {
					((DBObject)(o.get(key))).put(refStr,  map.get(key));
				}else {
					DBObject ref=new BasicDBObject();
					ref.put(refStr, map.get(key));
					o.put(key, ref);
				}
			}
		}
		return o;
	}
	public static DBObject set(SetDTO setDTO) {
		Map<String,String> map1=setDTO.getStringParametersSet();
		Map<String, Integer> map2=setDTO.getIntParametersSet();
		Map<String, Double> map3=setDTO.getDoubleParametersSet();
		String date=setDTO.getDate();
		DBObject o=new BasicDBObject();
		o=common1(o,map1);
		o=common1(o,map2);
		o=common1(o,map3);
		if(date!=null&&date.length()>0)
			o.put(date, new Date());
		return o;
	}
	public static DBObject query(QueryDTO queryDTO) {
		Map<String,String> map1=queryDTO.getStringParametersQuery();
		Map<String, Integer> map2=queryDTO.getIntParametersQuery();
		Map<String, Double> map3=queryDTO.getDoubleParametersQuery();
		DBObject o=new BasicDBObject();
		o=common1(o,map1);
		o=common1(o,map2);
		o=common1(o,map3);
		GtDTO gt=queryDTO.getGtDTO();
		GteDTO gte=queryDTO.getGteDTO();
		LtDTO lt=queryDTO.getLtDTO();
		LteDTO lte=queryDTO.getLteDTO();
		LikeDTO like=queryDTO.getLikeDTO();
		if(like!=null) {
			Map<String,String> likeMap=like.getStringParametersLike();
			Set<String> set = likeMap.keySet();
			for(String key:set) {
				o.put(key,Pattern.compile(likeMap.get(key)));
			} 
		}
		if(gt!=null) {
			Map<String, Integer> gtMap1=gt.getIntParametersGt();
			Map<String, Double> gtMap2=gt.getDoubleParametersGt();
			Map<String, Date> gtMap3=gt.getDateParametersGt();
			o=common2(o,gtMap1,"$gt");
			o=common2(o,gtMap2,"$gt");
			o=common2(o,gtMap3,"$gt");
			
		}
		if(gte!=null) {
			Map<String, Integer> gteMap1=gte.getIntParametersGte();
			Map<String, Double> gteMap2=gte.getDoubleParametersGte();
			Map<String, Date> gteMap3=gte.getDateParametersGte();
			o=common2(o,gteMap1,"$gte");
			o=common2(o,gteMap2,"$gte");
			o=common2(o,gteMap3,"$gte");
			
		}
		if(lt!=null) {
			Map<String, Integer> ltMap1=lt.getIntParametersLt();
			Map<String, Double> ltMap2=lt.getDoubleParametersLt();
			Map<String, Date> ltMap3=lt.getDateParametersLt();
			o=common2(o,ltMap1,"$lt");
			o=common2(o,ltMap2,"$lt");
			o=common2(o,ltMap3,"$lt");
			
		}
		if(lte!=null) {
			Map<String, Integer> lteMap1=lte.getIntParametersLte();
			Map<String, Double> lteMap2=lte.getDoubleParametersLte();
			Map<String, Date> lteMap3=lte.getDateParametersLte();
			o=common2(o,lteMap1,"$lte");
			o=common2(o,lteMap2,"$lte");
			o=common2(o,lteMap3,"$lte");
		}
		return o;
	}
}
