package com.bp.mongo;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;
import java.util.Set;

import com.bp.mongo.e.P;
import com.bp.mongo.e.QueryDTO;
import com.bp.mongo.e.SetDTO;
public class CommonService {
	private static SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
	private static SimpleDateFormat sdf2 = new SimpleDateFormat(
			"yyyy-MM-dd HH:mm:ss");

	private static Date sdf(String date) {
		Date date2 = null;
		if (date.length() > 12) {
			try {
				date2 = sdf2.parse(date);
			} catch (ParseException e) {
				e.printStackTrace();
			}
		} else {
			try {
				date2 = sdf.parse(date);
			} catch (ParseException e) {
				e.printStackTrace();
			}
		}
		return date2;
	}

	public static QueryDTO commonQueryDTO(String key,
			Map<String, String[]> map, QueryDTO queryDTO) {
		if (key.startsWith(P.queryString)) {
			String queryString = key.substring(key.indexOf("_") + 1);
			queryDTO.getStringParametersQuery().put(queryString,
					map.get(key)[0]);
		} else if (key.startsWith(P.queryInt)) {
			String queryInt = key.substring(key.indexOf("_") + 1);
			queryDTO.getIntParametersQuery().put(queryInt,
					Integer.parseInt(map.get(key)[0]));
		} else if (key.startsWith(P.queryDouble)) {
			String queryDouble = key.substring(key.indexOf("_") + 1);
			queryDTO.getDoubleParametersQuery().put(queryDouble,
					Double.parseDouble(map.get(key)[0]));
		} else if (key.startsWith(P.queryLike)) {
			String queryLike = key.substring(key.indexOf("_") + 1);
			queryDTO.getLikeDTO().getStringParametersLike()
					.put(queryLike, map.get(key)[0]);
		} else if (key.startsWith(P.gtDate)) {
			String gtDate = key.substring(key.indexOf("_") + 1);
			Date date = null;
			date = sdf(map.get(key)[0]);
			queryDTO.getGtDTO().getDateParametersGt().put(gtDate, date);
		} else if (key.startsWith(P.gteDate)) {
			String gteDate = key.substring(key.indexOf("_") + 1);
			Date date = null;
			date = sdf(map.get(key)[0]);
			queryDTO.getGteDTO().getDateParametersGte().put(gteDate, date);

		} else if (key.startsWith(P.gtDouble)) {
			String gtDouble = key.substring(key.indexOf("_") + 1);
			queryDTO.getGtDTO().getDoubleParametersGt()
					.put(gtDouble, Double.parseDouble(map.get(key)[0]));
		} else if (key.startsWith(P.gtInt)) {
			String gtInt = key.substring(key.indexOf("_") + 1);
			queryDTO.getGtDTO().getIntParametersGt()
					.put(gtInt, Integer.parseInt(map.get(key)[0]));
		} else if (key.startsWith(P.gteDouble)) {
			String gteDouble = key.substring(key.indexOf("_") + 1);
			queryDTO.getGteDTO().getDoubleParametersGte()
					.put(gteDouble, Double.parseDouble(map.get(key)[0]));
		} else if (key.startsWith(P.gteInt)) {
			String gteInt = key.substring(key.indexOf("_") + 1);
			queryDTO.getGteDTO().getIntParametersGte()
					.put(gteInt, Integer.parseInt(map.get(key)[0]));
		} else if (key.startsWith(P.ltDate)) {
			String ltDate = key.substring(key.indexOf("_") + 1);
			Date date = null;
			date = sdf(map.get(key)[0]);
			queryDTO.getLtDTO().getDateParametersLt().put(ltDate, date);
		} else if (key.startsWith(P.lteDate)) {
			String lteDate = key.substring(key.indexOf("_") + 1);
			Date date = null;
			date = sdf(map.get(key)[0]);
			queryDTO.getLteDTO().getDateParametersLte().put(lteDate, date);
		} else if (key.startsWith(P.ltDouble)) {
			String ltDouble = key.substring(key.indexOf("_") + 1);
			queryDTO.getLtDTO().getDoubleParametersLt()
					.put(ltDouble, Double.parseDouble(map.get(key)[0]));
		} else if (key.startsWith(P.ltInt)) {
			String ltInt = key.substring(key.indexOf("_") + 1);
			queryDTO.getLtDTO().getIntParametersLt()
					.put(ltInt, Integer.parseInt(map.get(key)[0]));
		} else if (key.startsWith(P.lteDouble)) {
			String lteDouble = key.substring(key.indexOf("_") + 1);
			queryDTO.getLteDTO().getDoubleParametersLte()
					.put(lteDouble, Double.parseDouble(map.get(key)[0]));
		} else if (key.startsWith(P.lteInt)) {
			String lteInt = key.substring(key.indexOf("_") + 1);
			queryDTO.getLteDTO().getIntParametersLte()
					.put(lteInt, Integer.parseInt(map.get(key)[0]));
		}
		return queryDTO;
	}

	public static SetDTO commonSetDTO(String key, Map<String, String[]> map,
			SetDTO setDTO) {
		if (key.equals(P.setDate)) {
			setDTO.setDate(map.get(key)[0]);
		} else if (key.startsWith(P.setInt)) {
			String setInt = key.substring(key.indexOf("_") + 1);
			setDTO.getIntParametersSet().put(setInt,
					Integer.parseInt(map.get(key)[0]));
		} else if (key.startsWith(P.setDouble)) {
			String setDouble = key.substring(key.indexOf("_") + 1);
			setDTO.getDoubleParametersSet().put(setDouble,
					Double.parseDouble(map.get(key)[0]));
		} else if (key.startsWith(P.setString)) {
			String setString = key.substring(key.indexOf("_") + 1);
			setDTO.getStringParametersSet().put(setString, map.get(key)[0]);
		}
		return setDTO;
	}

	public static InsertDTO getInsertDTO(Map<String, String[]> map) {
		InsertDTO dto = new InsertDTO();
		Set<String> set = map.keySet();
		for (String key : set) {
			if (key.equals(P.collection)) {
				dto.setCollection(map.get(key)[0]);
			}
			dto.setSetDTO(commonSetDTO(key, map, dto.getSetDTO()));
		}
		return dto;
	}

	public static DeleteDTO getDeleteDTO(Map<String, String[]> map) {
		DeleteDTO dto = new DeleteDTO();
		Set<String> set = map.keySet();
		for (String key : set) {
			if (key.equals(P.collection)) {
				dto.setCollection(map.get(key)[0]);
			}
			dto.setQueryDTO(commonQueryDTO(key, map, dto.getQueryDTO()));
		}
		return dto;
	}

	public static DeleteByIdDTO getDeleteByIdDTO(Map<String, String[]> map) {
		DeleteByIdDTO dto = new DeleteByIdDTO();
		Set<String> set = map.keySet();
		for (String key : set) {
			if (key.equals(P.collection)) {
				dto.setCollection(map.get(key)[0]);
			} else if (key.equals(P.id)) {
				dto.setId(map.get(key)[0]);
			}
		}
		return dto;
	}

	public static DeleteByIdsDTO getDeleteByIdsDTO(Map<String, String[]> map) {
		DeleteByIdsDTO dto = new DeleteByIdsDTO();
		Set<String> set = map.keySet();
		for (String key : set) {
			if (key.equals(P.collection)) {
				dto.setCollection(map.get(key)[0]);
			} else if (key.equals(P.id)) {
				String[] ids = map.get(key);
				dto.setIds(ids);
			}
		}
		return dto;
	}

	public static UpdateDTO getUpdateDTO(Map<String, String[]> map) {
		UpdateDTO dto = new UpdateDTO();
		Set<String> set = map.keySet();
		for (String key : set) {
			if (key.equals(P.collection)) {
				dto.setCollection(map.get(key)[0]);
			}
			dto.setQueryDTO(commonQueryDTO(key, map, dto.getQueryDTO()));
			dto.setSetDTO(commonSetDTO(key, map, dto.getSetDTO()));
		}
		return dto;
	}

	public static UpdateByIdDTO getUpdateByIdDTO(Map<String, String[]> map) {
		UpdateByIdDTO dto = new UpdateByIdDTO();
		Set<String> set = map.keySet();
		for (String key : set) {
			if (key.equals(P.collection)) {
				dto.setCollection(map.get(key)[0]);
			} else if (key.equals(P.id)) {
				dto.setSetDTO(commonSetDTO(key, map, dto.getSetDTO()));
			}
		}
		return dto;
	}

	public static CountDTO getCountDTO(Map<String, String[]> map) {
		CountDTO dto = new CountDTO();
		Set<String> set = map.keySet();
		for (String key : set) {
			if (key.equals(P.collection)) {
				dto.setCollection(map.get(key)[0]);
			}
			dto.setQueryDTO(commonQueryDTO(key, map, dto.getQueryDTO()));
		}
		return dto;
	}

	public static CountAddByIdDTO getCountAddByIdDTO(Map<String, String[]> map) {
		CountAddByIdDTO dto = new CountAddByIdDTO();
		Set<String> set = map.keySet();
		for (String key : set) {
			if (key.equals(P.collection)) {
				dto.setCollection(map.get(key)[0]);
			} else if (key.equals(P.id)) {
				dto.setId(map.get(key)[0]);
			} else if (key.equals(P.countAdd)) {
				dto.setCountP(map.get(key)[0]);
			}
		}
		return dto;
	}

	public static SelectByIdDTO getSelectByIdDTO(Map<String, String[]> map) {
		SelectByIdDTO dto = new SelectByIdDTO();
		Set<String> set = map.keySet();
		for (String key : set) {
			if (key.equals(P.collection)) {
				dto.setCollection(map.get(key)[0]);
			} else if (key.equals(P.id)) {
				dto.setId(map.get(key)[0]);
			}
		}
		return dto;
	}

	public static SelectDTO getSelectDTO(Map<String, String[]> map) {
		SelectDTO dto = new SelectDTO();
		Set<String> set = map.keySet();
		for (String key : set) {
			if (key.equals(P.collection)) {
				dto.setCollection(map.get(key)[0]);
			} else if (key.equals(P.page)) {
				dto.setPage(Integer.parseInt(map.get(key)[0]));
			} else if (key.equals(P.limit)) {
				dto.setLimit(Integer.parseInt(map.get(key)[0]));
			} else if (key.equals(P.sortasc)) {
				dto.setSortasc(map.get(key)[0]);
			} else if (key.equals(P.sortdesc)) {
				dto.setSortdesc(map.get(key)[0]);
			}
			dto.setQueryDTO(commonQueryDTO(key, map, dto.getQueryDTO()));
		}
		return dto;
	}

	public static SumDTO getSumDTO(Map<String, String[]> map) {
		SumDTO dto = new SumDTO();
		Set<String> set = map.keySet();
		for (String key : set) {
			if (key.equals(P.collection)) {
				dto.setCollection(map.get(key)[0]);
			} else if (key.equals(P.sum)) {
				dto.setSumP(map.get(key)[0]);
			}
			dto.setQueryDTO(commonQueryDTO(key, map, dto.getQueryDTO()));
		}
		return dto;
	}
}
