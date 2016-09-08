---
id: 410
title: DBeaver – El gestor de base de datos universal
date: 2013-09-15T21:17:00+00:00
author: ovalenzuela
layout: post
guid: https://ovalenzueladotcom.wordpress.com/2013/09/15/dbeaver-el-gestor-de-base-de-datos-universal
permalink: /2013/09/dbeaver-el-gestor-de-base-de-datos-universal.html
blogger_blog:
  - www.ovalenzuela.com
blogger_author:
  - Andrés Barrera
blogger_02f5be51301771664ae7c1c72bf29246_permalink:
  - 495147714002850517
dsq_thread_id:
  - 4712647668
categories:
  - Amigos
---
La búsqueda de una herramienta de base de datos es tediosa, sobre todo cuando trabajas con muchos motores (<a title="MySQL" href="http://www.mysql.com/" target="_blank">MySQL</a>, <a title="MariaDB" href="https://mariadb.org/" target="_blank">MariaDB</a>, <a title="PostgreSQL" href="http://www.postgresql.org.es/" target="_blank">PostgreSQL</a>, <a title="SQLite" href="http://www.sqlite.org/" target="_blank">SQLite</a>, Oracle, MSSQL, DB2, etc, etc, etc…) al momento de administrar y/o desarrollar.

Hace un tiempo utilizaba un programa que cumplía con todo eso llamado <a title="SQuirreL SQL" href="http://squirrel-sql.sourceforge.net/" target="_blank">SQuirreL SQL</a>, un software desarrollado en Java y que funciona bastante bien, el único problema es que los drivers hay que agregarlos “a mano”, además de las clases, url de conexión, entre otras cosas tediosas… sin contar que funciona como un cliente simple.

<img class=" alignright" title="Logo DBeaver" alt="" src="http://dbeaver.jkiss.org/wp-content/themes/dbeaver/images/beaver-head.png" width="100" height="103" />

En esa búsqueda, antes mencionada, me topé con <a title="DBeaver" href="http://dbeaver.jkiss.org/" target="_blank">DBeaver</a>. Como dice en su web, intenta ser “Universal Database Manager”. Este es un fork de <a title="Eclipse IDE" href="http://www.eclipse.org/" target="_blank">Eclipse</a> (de hecho hay un plugin para este IDE) que cumple lo mismo que SQuirreL SQL, pero los drivers son descargados de internet (repositorio desde su web) y configurados al instante de manera “automágica”, lo que sencillamente genial. La gracia de esta herramienta no es sólo como cliente, sino también funciona para administrar y diseñar base de datos.

Para su instalación puedes revisar en su web en la sección de <a title="DBeaver - Download" href="http://dbeaver.jkiss.org/download/" target="_blank">descargas</a>, en mi caso, bajaría el paquete DEB (descargue la correspondiente a su sistema operativo) y su instalación es simple:

<pre># dpkg -i dbeaver_xx.deb</pre>

(donde xx es la versión correspondiente)

 

_Artículo original en [Psep.cl](http://www.psep.cl/2013/09/15/dbeaver-el-gestor-de-base-de-datos-universal "DBeaver - El gestor de base de datos universal - Psep.cl"), puede ser distribuido y modificado mientras incluya esta nota según Licencia <a title="CC by-sa 3.0" href="http://creativecommons.org/licenses/by-sa/3.0/deed.es" target="_blank">CC</a>._