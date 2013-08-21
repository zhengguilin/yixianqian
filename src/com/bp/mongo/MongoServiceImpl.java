package com.bp.mongo;

import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSON;
import com.mongodb.DBObject;

public class MongoServiceImpl {
	
	private static MongoDAOImpl mongoDAO=new MongoDAOImpl();
	
	public static boolean insert(Map<String, String[]> map) {
		if (Check.c(map))
			mongoDAO.insert(CommonService.getInsertDTO(map));
		return true;
	}

	public static boolean deleteById(Map<String, String[]> map) {
		try {
			if (Check.c(map))
				mongoDAO.deleteById(CommonService.getDeleteByIdDTO(map));
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	public static boolean deleteByIds(Map<String, String[]> map) {
		try {
			if (Check.c(map))
				mongoDAO.deleteByIds(CommonService.getDeleteByIdsDTO(map));
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	public static boolean delete(Map<String, String[]> map) {
		try {
			if (Check.c(map))
				mongoDAO.delete(CommonService.getDeleteDTO(map));
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	public static boolean updateById(Map<String, String[]> map) {
		try {
			if (Check.c(map))
				mongoDAO.updateById(CommonService.getUpdateByIdDTO(map));
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	public static boolean update(Map<String, String[]> map) {
		try {
			if (Check.c(map))
				mongoDAO.update(CommonService.getUpdateDTO(map));
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}


	public static String select(Map<String, String[]> map) {
		String result = "";
		if (Check.c(map)) {
			if(map.containsKey("id")) {
				result=JSON.toJSONString(mongoDAO.selectById(CommonService
						.getSelectByIdDTO(map)));
			}else {
				List<DBObject> list = mongoDAO.select(CommonService
						.getSelectDTO(map));
				result = JSON.toJSONString(list);
			}
		}
		return result;
	}

	public static int count(Map<String, String[]> map) {
		int num = 0;
		if (Check.c(map))
			num = mongoDAO.count(CommonService.getCountDTO(map));
		return num;
	}

	public static boolean countAddById(Map<String, String[]> map) {
		try {
			if (Check.c(map))
				mongoDAO.countAddById(CommonService.getCountAddByIdDTO(map));
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	public static Number sum(Map<String, String[]> map) {
		Number sum = 0;
		if (Check.c(map))
			sum = mongoDAO.sum(CommonService.getSumDTO(map));
		return sum;
	}
}
