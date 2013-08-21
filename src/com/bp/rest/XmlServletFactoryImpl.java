package com.bp.rest;


import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

import com.bp.base.BaseServlet;



/**
 * 读取XML，填充ServletFactory工程数据源
 *
 * @author y.nie
 * @date 2010-9-16
 * @version 1.0
 */
public class XmlServletFactoryImpl extends ServletFactory {

	public XmlServletFactoryImpl(String scanPackage) {
		super(scanPackage);

		if (scanPackage == null || scanPackage.length() == 0) {
			throw new XmlFileIllegalException("要扫描的包路径不能为空");
		}

		if(scanPackage.indexOf(',') == -1){
			this.init(scanPackage);
		}else{
			String [] xmls = scanPackage.split(",");
			for(String xml : xmls){
				if(xml == null || xml.length() == 0){
					continue;
				}

				this.init(xml);
			}
		}
	}

	@SuppressWarnings("rawtypes")
	protected void init(String xmlPath) {
		SaxParseService sax = new SaxParseService();
		InputStream input = this.getClass().getResourceAsStream(xmlPath);
		Map<String, String> hashMap = null;
		try {
			hashMap = sax.getResult(input);
		} catch (Exception e2) {
			e2.printStackTrace();
		}

		if (hashMap == null) {
			return;
		}

		Map<String, BaseServlet> resultMap = new HashMap<String, BaseServlet>();

		for (Map.Entry<String, String> entry : hashMap.entrySet()) {
			Class c = null;
			try {
				c = Class.forName(entry.getValue());
			} catch (ClassNotFoundException e1) {
				e1.printStackTrace();
			}

			if (c == null) {
				continue;
			}

			if (c.getSuperclass() != BaseServlet.class) {
				continue;
			}

			try {
				resultMap.put(entry.getKey().replaceAll("\\*", "([^\\/]\\*)"),
						(BaseServlet) c.newInstance());
			} catch (InstantiationException e) {
				e.printStackTrace();
			} catch (IllegalAccessException e) {
				e.printStackTrace();
			}
		}

		super.initMap(resultMap);
	}
}