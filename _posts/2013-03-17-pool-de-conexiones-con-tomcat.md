---
id: 446
title: Pool de conexiones con Tomcat
date: 2013-03-17T15:02:00+00:00
author: ovalenzuela
layout: post
guid: https://ovalenzueladotcom.wordpress.com/2013/03/17/pool-de-conexiones-con-tomcat
permalink: /2013/03/pool-de-conexiones-con-tomcat.html
blogger_blog:
  - www.ovalenzuela.com
blogger_author:
  - Andrés Barrera
blogger_02f5be51301771664ae7c1c72bf29246_permalink:
  - 8632818904909357838
dsq_thread_id:
  - 3265640691
categories:
  - Amigos
---
Una de las buenas prácticas que debemos tener presentes a la hora de desarrollar software es la abstracción de la capa de datos. <a title="Apache Tomcat" href="http://tomcat.apache.org/" target="_blank">Tomcat</a> nos ayuda, al igual que otros servidores Java(EE), a manejar un pool de conexiones a las bases de datos.

**¿Por qué manejar un Pool JDBC?**

Dado las circunstancias, muchas veces los sistemas son migrados de servidores y probablemente hasta de base de datos, por lo que manejar un pool en el servidor te ahorra tiempo al momento de cambiar las credenciales y hasta el driver de conexión, de manera que no tengamos que cambiarlo en el código fuente.

La forma en la cual se efectúa esto no tiene mucha complejidad. Dentro de los archivos de configuración de Apache Tomcat en la carpeta _conf/_ está el fichero _context.xml_, al cual uno le agrega con el tag _Resource_ la conexión a la DB.

<pre><br />&lt;!--<br />  Licensed to the Apache Software Foundation (ASF) under one or more<br />  contributor license agreements.  See the NOTICE file distributed with<br />  this work for additional information regarding copyright ownership.<br />  The ASF licenses this file to You under the Apache License, Version 2.0<br />  (the "License"); you may not use this file except in compliance with<br />  the License.  You may obtain a copy of the License at<br /><br />http://www.apache.org/licenses/LICENSE-2.0<br /><br />  Unless required by applicable law or agreed to in writing, software<br />  distributed under the License is distributed on an "AS IS" BASIS,<br />  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.<br />  See the License for the specific language governing permissions and<br />  limitations under the License.<br />--&gt;<br /><!-- The contents of this file will be loaded for each web application -->

<br /><br /><br />	<!-- Default set of monitored resources -->

<br />	WEB-INF/web.xml<br /><br />	&lt;Resource auth="Container" driverClassName="com.mysql.jdbc.Driver" <br />		maxActive="100" maxIdle="100" maxWait="10000" name="jdbc/test" <br />		password="123456" type="javax.sql.DataSource" <br />		url="jdbc:mysql://localhost:3306/test" username="root" /&gt;<br /><br /></pre>

Agregué en el tag _Resource_ los atributos:

  * auth=”Container” **(tipo, en este caso es contenedor)**
  * driverClassName=”com.mysql.jdbc.Driver” **(driver a cargar por Tomcat)**
  * maxActive=”100″ **(máximo de conexiones activas, por defecto)**
  * maxIdle=”100″ **(máximo de conexiones, por defecto)**
  * maxWait=”10000″ **(máximo de tiempo en mili-segundos para la conexión, por defecto)**
  * name=”jdbc/test” **(el nombre del contenedor)**
  * password=”123456″ **(contraseña de la base de datos)**
  * type=”javax.sql.DataSource” **(señala datasource para la conexión)**
  * url=”jdbc:mysql://localhost:3306/test” **(url de la base de datos)**
  * username=”root” **(usuario de la base de datos)**
</ul> 

Para mayor información sobre las posibles configuraciones puedes revisar la documentación de Tomcat en <http://people.apache.org/~fhanik/jdbc-pool/jdbc-pool.html>

Es importante también tener en cuenta la ubicación del driver jdbc, este puede ser puesto tanto en la carpeta _lib/_ del server, o bien puedes incluirlo en el proyecto con Eclipse en la carpeta _WEB-INF/lib._ 

Para poder leer el contenedor desde Java basta con:

<pre>Context contextInitial	= new InitialContext();<br />// Contexto inicial<br />Context context		= (Context) contextInitial.lookup("java:comp/env");<br />// Nombre del contenedor a cargar en el DataSource<br />DataSource ds = (DataSource) context.lookup("jdbc/test");<br /><br />//Carga la conexión<br />con = ds.getConnection();</pre>

Es bastante simple, pero para verle en acción, subí un proyecto a code.google para que puedan mirar como funciona → <https://code.google.com/p/tomcat-pool-example/>