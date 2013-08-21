package com.bp.mongo;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import org.bson.types.ObjectId;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.MapReduceCommand;
import com.mongodb.MapReduceOutput;
public class MongoDAOImpl {
	private static DB db=MongoDB.getDB();
	private static SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

	public void insert(InsertDTO insertDTO) {
		DBCollection c=db.getCollection(insertDTO.getCollection());
		DBObject o=MongoCommonDAO.set(insertDTO.getSetDTO());
		c.save(o);
	}

	public void deleteById(DeleteByIdDTO deleteByIdDTO) {
		DBCollection c=db.getCollection(deleteByIdDTO.getCollection());
		DBObject o=new BasicDBObject();
		o.put("_id", new ObjectId(deleteByIdDTO.getId()));
		c.remove(o);
	}

	public void deleteByIds(DeleteByIdsDTO deleteByIdsDTO) {
		DBCollection c=db.getCollection(deleteByIdsDTO.getCollection());
		DBObject o=new BasicDBObject();
		for (int i = 0; i < deleteByIdsDTO.getIds().length; i++) {
			o.put("_id", new ObjectId(deleteByIdsDTO.getIds()[i]));
			c.remove(o);
		}
	}

	public void delete(DeleteDTO deleteDTO) {
		DBCollection c=db.getCollection(deleteDTO.getCollection());
		DBObject o=MongoCommonDAO.query(deleteDTO.getQueryDTO());
		c.remove(o);
	}

	public void updateById(UpdateByIdDTO updateByIdDTO) {
		DBCollection c=db.getCollection(updateByIdDTO.getCollection());
		DBObject updateValue=MongoCommonDAO.set(updateByIdDTO.getSetDTO());
		DBObject updateSet=new BasicDBObject("$set",updateValue);
		DBObject query=new BasicDBObject();
		query.put("_id", new ObjectId(updateByIdDTO.getId()));
		c.update(query, updateSet);
	}

	public void update(UpdateDTO updateDTO) {
		DBCollection c=db.getCollection(updateDTO.getCollection());
		DBObject updateValue=MongoCommonDAO.set(updateDTO.getSetDTO());
		DBObject updateSet=new BasicDBObject("$set",updateValue);
		DBObject query=MongoCommonDAO.query(updateDTO.getQueryDTO());
		c.update(query, updateSet, false, true);
	}

	public int count(CountDTO countDTO) {
		DBCollection c=db.getCollection(countDTO.getCollection());
		DBObject query=MongoCommonDAO.query(countDTO.getQueryDTO());
		return (int) c.count(query);
	}

	public void countAddById(CountAddByIdDTO countAddByIdDTO) {
		DBCollection c=db.getCollection(countAddByIdDTO.getCollection());
		DBObject query=new BasicDBObject();
		query.put("_id", new ObjectId(countAddByIdDTO.getId()));
		DBObject o=c.findOne(query);
		int countP=(Integer) (o.get(countAddByIdDTO.getCountP()));
		DBObject updateValue=new BasicDBObject();
		updateValue.put(countAddByIdDTO.getCountP(), countP+1);
		DBObject updateSet=new BasicDBObject("$set",updateValue);
		c.update(query, updateSet);
	}

	public Number sum(SumDTO sumDTO) {
		DBCollection c=db.getCollection(sumDTO.getCollection());
		String sumP=sumDTO.getSumP();
		DBObject query=MongoCommonDAO.query(sumDTO.getQueryDTO());
		String map="function() {emit('sum',{sumP:this."+sumP+"});};";
		String reduce="function(key,values) {var sum=0;values.forEach(function(doc){sum=sum+doc.sumP});return sum}";
		MapReduceCommand cmd = new MapReduceCommand(c, map, reduce,null, MapReduceCommand.OutputType.INLINE, query);
		MapReduceOutput out = c.mapReduce(cmd);
		Number sum=0;
		for (DBObject o : out.results()) {
			sum=(Number) o.get("value");
		}
		return sum;
	}

	@SuppressWarnings("rawtypes")
	private DBObject sdf(DBObject o) {
		o.put("_id", ((ObjectId)o.get("_id")).toString());
		Set<String> set=o.keySet();
		for (Iterator iterator = set.iterator(); iterator.hasNext();) {
			String string = (String) iterator.next();
			Object date=o.get(string) ;
			if(date instanceof  Date)
				o.put(string, sdf.format(date));
		}
		return o;
	}
	
	
	public DBObject selectById(SelectByIdDTO selectByIdDTO) {
		DBCollection c=db.getCollection(selectByIdDTO.getCollection());
		DBObject query=new BasicDBObject();
		query.put("_id", new ObjectId(selectByIdDTO.getId()));
		DBObject o=c.findOne(query);
		o=sdf(o);
		return o;
	}

	public List<DBObject> select(SelectDTO selectDTO) {
		DBCollection c=db.getCollection(selectDTO.getCollection());
		DBObject query=MongoCommonDAO.query(selectDTO.getQueryDTO());
		int offset=selectDTO.getLimit()*(selectDTO.getPage()-1);
		DBCursor cursor=null;
		if(selectDTO.getSortasc()!=null) {
			DBObject sort=new BasicDBObject();
			sort.put(selectDTO.getSortasc(), 1);
			cursor=c.find(query).skip(offset).limit(selectDTO.getLimit()).sort(sort);
		}else if(selectDTO.getSortdesc()!=null) {
			DBObject sort=new BasicDBObject();
			sort.put(selectDTO.getSortdesc(),-1);
			cursor=c.find(query).skip(offset).limit(selectDTO.getLimit()).sort(sort);
		}else {
			cursor=c.find(query).skip(offset).limit(selectDTO.getLimit());
		}
		List<DBObject> list=new ArrayList<DBObject>();
		while(cursor.hasNext()) {
			DBObject o=cursor.next();
			o=sdf(o);
			list.add(o);
		}
		return list;
	}

}
