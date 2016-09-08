---
id: 441
title: 'Base de Datos Embebidas: De SQLite a Java con JDBC'
date: 2013-03-29T23:23:00+00:00
author: ovalenzuela
layout: post
guid: https://ovalenzueladotcom.wordpress.com/2013/03/29/base-de-datos-embebidas-de-sqlite-a-java-con-jdbc
permalink: /2013/03/base-de-datos-embebidas-de-sqlite-a-java-con-jdbc.html
blogger_blog:
  - www.ovalenzuela.com
blogger_author:
  - Andrés Barrera
blogger_02f5be51301771664ae7c1c72bf29246_permalink:
  - 6335894397587644775
categories:
  - Amigos
---
No es mi intención profundizar mucho sobre las diversas bases de datos embebidas que existen, sino lo más importante, sus funcionalidades y para lo que sirven.

En algunas ocasiones, cuando desarrollamos aplicaciones para el escritorio (que tal parece que está pasado de moda versus la web), y queremos ser prácticos a la hora de implementar bases de datos con estas futuras apps lo indicado sería usar db embebidas. A menos que nuestra aplicación se conectara a una base de datos externa por una URL. Pero si nuestra app no necesita compartir su base de datos sería un gasto innecesario tenerla en un servidor externo y mucho menos que nuestra aplicación se conectara a ella.

Es donde viene el concepto de base de datos embebida, donde podamos guardar información tanto temporal (que volquemos las tablas una vez cerrada la aplicación) como tener diversas propiedades que queramos que sean dinámicas, etc.

Un ejemplo es <a title="SQLite" href="http://www.sqlite.org" target="_blank">SQLite</a>. Éste un motor de base de datos que no necesita implementación en un servidor ni configuración, es relacional y obviamente utiliza SQL para sus transacciones, además de ser rápida y ágil. Sus fuentes son de dominio público y es muy utilizado por ejemplo en aplicaciones Android, entre otros.

Tampoco me quiero extender con las bondades y obviamente desventajas de SQLite, para mayor información podemos usar <a title="wikipedia" href="http://es.wikipedia.org/wiki/SQLite" target="_blank">Wikipedia</a> o <a href="https://www.google.cl/search?hl=es&q=sqlite" target="_blank">Google</a>.

La mayoría de las distribuciones cuenta en sus repositorios con SQLite, sino puedes descargarlo desde su web oficial <http://www.sqlite.org/>.

El cliente que ocupo para este motor de base de datos es un complemento para Mozilla Firefox (compatible con Iceweasel e Icecat) llamado <a title="SQLite Manager" href="https://addons.mozilla.org/es/firefox/addon/sqlite-manager/" target="_blank">SQLite Manager</a> y es bastante completo.

[<img class="aligncenter size-medium wp-image-643" alt="sqlite_manager" src="http://www.psep.cl/wp-content/uploads/2013/03/sqlite_manager-300x246.png" width="300" height="246" />](http://www.psep.cl/wp-content/uploads/2013/03/sqlite_manager.png)

Del como crear una base de datos SQLite (extensión .sqlite) y tablas es bastante intuitivo y dar una explicación sobre ello estaría demás.

Para conectarnos desde Java necesitamos el driver jdbc, que podemos descargar desde su <a href="https://bitbucket.org/xerial/sqlite-jdbc/downloads" target="_blank">web oficial</a>.

Una vez incluida la librería en nuestro proyecto, basta con lo siguiente:

<pre>protected Connection loadConnection(){<br />        Connection con = null;<br /><br />        try{<br />            //Instancia del driver JDBC de SQLite<br />            DriverManager.registerDriver(new org.sqlite.JDBC());<br /><br />            //Creamos un objeto StringBuilder para concatenar String de conexión<br />            StringBuilder strConUrl = new StringBuilder();<br />            strConUrl.append("jdbc:sqlite:");<br />            strConUrl.append("exampleApp.sqlite"); // URL de nuestra base de datos<br /><br />            con = DriverManager.getConnection(strConUrl.toString());<br /><br />        }catch(Exception e){<br />            e.printStackTrace();<br />        }<br /><br />        return con;<br />    }</pre>

Del porqué ese método está protected, por la sencilla razón que por lo general, manejo las conexiones en una clase abstracta, para que las clases que necesiten conexiones tengan extender esta misma y sólo así puedan usar el método de conexión **loadConnection()**. Ese método retorna un objeto de tipo conexión a la base de datos SQLite.