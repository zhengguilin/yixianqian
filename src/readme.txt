 <param-value>/servlets.xml,/servlets2.xml</param-value>
javamelody配置
<role rolename="monitoring"/>
<user username="monitoring" password="monitoring" roles="monitoring"/>
<!-- javamelody监控配置开始 -->
	<!-- tomcat认证开始 -->
	<login-config>
		<auth-method>BASIC</auth-method>
		<realm-name>Monitoring</realm-name>
	</login-config>
	<security-role>
		<role-name>monitoring</role-name>
	</security-role>
	<security-constraint>
		<web-resource-collection>
			<web-resource-name>Monitoring</web-resource-name>
			<url-pattern>/monitoring</url-pattern>
		</web-resource-collection>
		<auth-constraint>
			<role-name>monitoring</role-name>
		</auth-constraint>
	</security-constraint>
	<!-- tomcat认证结束 -->
	<filter>
		<filter-name>monitoring</filter-name>
		<filter-class>net.bull.javamelody.MonitoringFilter</filter-class>
	</filter>
	<filter-mapping>
		<filter-name>monitoring</filter-name>
		<url-pattern>/*</url-pattern>
	</filter-mapping>
	<listener>
		<listener-class>net.bull.javamelody.SessionListener</listener-class>
	</listener>
	<!-- javamelody监控配置结束 -->