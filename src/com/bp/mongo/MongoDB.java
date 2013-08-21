package com.bp.mongo;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.List;

import com.bp.common.T;
import com.mongodb.DB;
import com.mongodb.Mongo;
import com.mongodb.MongoOptions;
import com.mongodb.ReadPreference;
import com.mongodb.ServerAddress;
public class MongoDB {
	private String mongodbusername;
	private String mongodbpassword;
	private String mongodbdb;
	private Mongo mongo = null;
	private DB db;
	private static DB oneDB;
	private boolean flag = false;
	
	public MongoDB() {
		mongodbusername=T.r("mongodb.username");
		mongodbpassword=T.r("mongodb.password");
		mongodbdb=T.r("mongodb.db");
		MongoOptions mo=new MongoOptions();
		mo.autoConnectRetry=new Boolean(T.r("mongoOptions.autoConnectRetry"));
		mo.connectionsPerHost=Integer.parseInt(T.r("mongoOptions.connectionsPerHost"));
		mo.threadsAllowedToBlockForConnectionMultiplier=Integer.parseInt(T.r("mongoOptions.threadsAllowedToBlockForConnectionMultiplier"));
		mo.connectTimeout=Integer.parseInt(T.r("mongoOptions.connectTimeout"));
		mo.socketTimeout=Integer.parseInt(T.r("mongoOptions.socketTimeout"));
		mo.socketKeepAlive=new Boolean(T.r("mongoOptions.socketKeepAlive"));
		String address=T.r("mongodb.address");
		if(address.contains(";")) {
			String s[]=address.split(";");
			List<ServerAddress> replicaSetSeeds=new ArrayList<ServerAddress>();
			for(int i=0;i<s.length;i++) {
				String ss[]=s[i].split(":");
				try {
					ServerAddress sa=new ServerAddress(ss[0], Integer.parseInt(ss[1]));
					replicaSetSeeds.add(sa);
				} catch (NumberFormatException e) {
					e.printStackTrace();
				} catch (UnknownHostException e) {
					e.printStackTrace();
				}
			}
			mongo=new Mongo(replicaSetSeeds, mo);
		}else {
			String ss[]=address.split(":");
			try {
				ServerAddress sa=new ServerAddress(ss[0], Integer.parseInt(ss[1]));
				mongo=new Mongo(sa,mo);
			} catch (NumberFormatException e) {
				e.printStackTrace();
			} catch (UnknownHostException e) {
				e.printStackTrace();
			}
		}
		init();
	}


	public static DB getDB() {
		if(MongoDB.oneDB==null&&T.r("mongodb.isUsed").equals("true")) {
			new MongoDB();
		}
		return MongoDB.oneDB;
	}


	public void init() {
		/**开启复制集*/
		if(T.r("mongodb.isSecondary").equals("true")) {
			mongo.setReadPreference(ReadPreference.SECONDARY);
		}
		db = mongo.getDB(mongodbdb);
		if (mongodbusername.length()>0&&mongodbpassword.length()>0) {
			flag = db.authenticate(mongodbusername,
					mongodbpassword.toCharArray());
			if (flag) {
				System.out.println("MongoDB认证成功");
				MongoDB.oneDB=db;
			} else {
				System.out.println("MongoDB认证失败");
			}
		}else {
			System.out.println("MongoDB认证成功~~~~~");
		}
	}


	public void destory() {
		if (flag) {
			if (mongo != null)
				mongo.close();
			mongo = null;
			db = null;
			System.out.println("MongoDB销毁!");
		}
	}
	public static void main(String args[]) {
	}
}
