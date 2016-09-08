---
id: 440
title: 'Debianizando: Empaquetar aplicaciones en Java'
date: 2013-03-31T21:14:00+00:00
author: ovalenzuela
layout: post
guid: https://ovalenzueladotcom.wordpress.com/2013/03/31/debianizando-empaquetar-aplicaciones-en-java
permalink: /2013/03/debianizando-empaquetar-aplicaciones-en-java.html
blogger_blog:
  - www.ovalenzuela.com
blogger_author:
  - Andrés Barrera
blogger_02f5be51301771664ae7c1c72bf29246_permalink:
  - 2504882493391786153
dsq_thread_id:
  - 5016190623
categories:
  - Amigos
---
[<img class="aligncenter size-medium wp-image-647" alt="deb-dpkg" src="http://www.psep.cl/wp-content/uploads/2013/03/deb-dpkg-300x256.png" width="211" height="181" />](http://www.psep.cl/wp-content/uploads/2013/03/deb-dpkg.png)

Mantener y empaquetar software no es muy complejo. Las grandes ventajas de empaquetar tu software hecho en Java es poder entregar instaladores fáciles y rápidos para otras distribuciones “debian like”, sin necesidad de ejecutar el .jar desde la shell con java -jar (en algunos casos). Esa es una de las ventajas.

Para llevar a cabo esto, es necesario realizar un árbol de directorios, completar unos ficheros y ejecutar la herramienta dpkg.

Todo el procedimiento está detallado en <a href="http://www.garabatoslinux.net/como-crear-un-paquete-deb-de-una-aplicacion-java.html" target="_blank">este post</a> y mi intención no es copiar lo que ya está hecho, por lo que hice un script en bash que genera el empaquetado, el cual puedes descargar en el siguiente <a title="java-build-deb" href="https://docs.google.com/file/d/0BzNoXE1DnUqEcV9lTzk1dzhtWEk/edit?usp=sharing" target="_blank">enlace</a>.

Saludos.