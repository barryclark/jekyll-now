### maven的使用方式
1. eclipse 中，右键项目
	1. run->maven build
	2. config 
	3. tomcat: run / tomcat7: run  /tomcat7: deploy / package   / tomcat7:redeploy
1. 配置插件
	1. 配置部署插件
 
			<plugin>
				<groupId>org.apache.tomcat.maven</groupId>
				<artifactId>tomcat7-maven-plugin</artifactId>
				<version>2.2</version>
				<configuration>
					<url>http://localhost:8080/manager/text</url>  <!-- 这里配置热部署时的服务器地址（事先在目标tomcat里配置好用户名密码） -->
					<username>username</username>  <!-- 这里配置热部署时的用户名（事先在目标tomcat里配置好用户名密码，分配好） -->
					<password>password</password>  <!-- 这里配置热部署时的密码（事先在目标tomcat里配置好用户名密码） -->
	       		    <port>8080</port><!-- 这里配置访问端口 -->
					<path>/${project.artifactId}</path>  <!-- 这里配置项目的访问路径 -->
				</configuration>
			</plugin>
	
	1. 配置免web.xml

			<plugin>
				<groupId>org.apache.maven.plugins</groupId>
				<artifactId>maven-war-plugin</artifactId>
				<version>3.0.0</version>
				<configuration>
					<failOnMissingWebXml>false</failOnMissingWebXml>
				</configuration>
			</plugin>

	1. 配置jdk版本

			<plugin>
				<groupId>org.apache.maven.plugins</groupId>
				<artifactId>maven-compiler-plugin</artifactId>
				<configuration>
					<source>1.8</source>
					<target>1.8</target>
				</configuration>
			</plugin>

### maven配置jdk的方式： 

1. 方式一：改变./M2_HOME/conf/setting.xml中的配置

		<profile>  
		
		    <id>jdk-1.7</id>  
		
		     <activation>  
		
		          <activeByDefault>true</activeByDefault>  
		
		          <jdk>1.7</jdk>  
		
		      </activation>  
		
		<properties>  
		
		<maven.compiler.source>1.7</maven.compiler.source>  
		
		<maven.compiler.target>1.7</maven.compiler.target>  
		
		<maven.compiler.compilerVersion>1.7</maven.compiler.compilerVersion>  
		
		</properties>  
		
		</profile>   

2. 方式二：添加插件

		<build>  
		    <plugins>  
		        <plugin>  
		            <groupId>org.apache.maven.plugins</groupId>  
		            <artifactId>maven-compiler-plugin</artifactId>  
		            <configuration>  
		                <source>1.7</source>  
		                <target>1.7</target>  
		            </configuration>  
		        </plugin>  
		    </plugins>  
		</build>  


