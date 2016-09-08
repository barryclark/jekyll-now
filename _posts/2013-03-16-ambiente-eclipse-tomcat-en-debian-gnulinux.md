---
id: 448
title: Ambiente Eclipse + Tomcat en Debian GNU/Linux
date: 2013-03-16T13:04:00+00:00
author: ovalenzuela
layout: post
guid: https://ovalenzueladotcom.wordpress.com/2013/03/16/ambiente-eclipse-tomcat-en-debian-gnulinux
permalink: /2013/03/ambiente-eclipse-tomcat-en-debian-gnulinux.html
blogger_blog:
  - www.ovalenzuela.com
blogger_author:
  - Andrés Barrera
blogger_02f5be51301771664ae7c1c72bf29246_permalink:
  - 4712049862135858458
categories:
  - Amigos
---
En lo personal, no había utilizado <a title="Apache Tomcat" href="http://tomcat.apache.org/" target="_blank">Apache Tomcat</a> en mis proyectos Java desde hace mucho, en mi trabajo usamos casi siempre <a title="JBoss Server" href="http://www.jboss.org/" target="_blank">JBoss</a> o <a title="WebLogic Server" href="http://www.oracle.com/technetwork/middleware/weblogic/overview/index.html" target="_blank">WebLogic</a> por el soporte con <a title="Enterprise JavaBeans" href="http://es.wikipedia.org/wiki/Enterprise_JavaBeans" target="_blank">EJB</a> y en la universidad trabajé con <a title="GlassFish Server" href="http://glassfish.java.net/" target="_blank">GlassFish</a> por una cosa de gustos y la facilidad con <a title="NetBeans IDE" href="http://netbeans.org/" target="_blank">NetBeans</a> (IDE con el cual te “enseñan” en la universidad).

Ahora bien, hace poco me tocó levantar unos proyectos que utilizan Tomcat así que me tocó configurar el ambiente… vamos primero a la instalación de Tomcat.

<pre># apt-get install tomcat6</pre>

En los repositorios que trabajo está disponible tanto tomcat6 como tomcat7, pero preferí usar la versión 6 por un tema de compatibilidad con el proyecto, ningún otro motivo tengo. Una vez instalado se deben crear una serie de enlaces simbólicos para que <a title="Eclipse IDE" href="http://www.eclipse.org/" target="_blank">Eclipse</a> pueda utilizar el servidor. Esto es recomendado sólo para ambientes de desarrollo, eso es muy importante.

Por defecto, la instalación de los scripts de Tomcat son en la carpeta /usr/share/tomcatX, donde X es el número de versión que instalaron; así también los otros archivos, de configuración, se encuentran en /var/lib/tomcatX; el log se almacena en /var/log/tomcatX y <a title="Seguridad en Tomcat" href="http://tomcat.apache.org/tomcat-7.0-doc/security-manager-howto.html" target="_blank">catalina.policy</a> se encuentra en /etc/tomcatX/policy.d/. La idea es crear accesos directos a la carpeta donde se encuentran los scripts del servidor y darle permisos para que Eclipse pueda subir proyectos, cambiar la configuración y obviamente subir/bajar el server.

<pre># cd /usr/share/tomcat6<br /># ln -s /var/lib/tomcat6/conf conf<br /># ln -s /var/lib/tomcat6/webapps/ webapps<br /># ln -s /etc/tomcat6/policy.d/03catalina.policy conf/catalina.policy<br /># ln -s /var/log/tomcat6/ log</pre>

Con esto se crean los enlaces simbólicos para que Eclipse pueda encontrarlos, ahora sólo basta darle los permisos.

<pre># chmod -R 777 /usr/share/tomcat6/</pre>

Ahora sólo basta con crear un nuevo server en nuestro IDE, seleccionar Apache Tomcat X (en mi caso es la 6) y seleccionar la ruta por defecto /usr/share/tomcat6/.