---
id: 445
title: Manejo de servicios en Debian GNU/Linux con rcconf
date: 2013-03-17T15:25:00+00:00
author: ovalenzuela
layout: post
guid: https://ovalenzueladotcom.wordpress.com/2013/03/17/manejo-de-servicios-en-debian-gnulinux-con-rcconf
permalink: /2013/03/manejo-de-servicios-en-debian-gnulinux-con-rcconf.html
blogger_blog:
  - www.ovalenzuela.com
blogger_author:
  - Andrés Barrera
blogger_02f5be51301771664ae7c1c72bf29246_permalink:
  - 531934141506547347
categories:
  - Amigos
---
Un simple programa vía shell para el manejo de servicios del equipo, en esos casos cuando por ejemplo no quiero que se levante el Servidor Apache, MySQL, etc., al inicio del sistema. Sólo basta instalarlo desde los repositorios.

<pre># apt-get install rcconf</pre>

Luego lo ejecutas desde la shell como root:

<pre># rcconf</pre>

[<img class="aligncenter size-medium wp-image-634" alt="rcconf_cap" src="http://www.psep.cl/wp-content/uploads/2013/03/rcconf_cap-300x179.png" width="300" height="179" />](http://www.psep.cl/wp-content/uploads/2013/03/rcconf_cap.png)

Es bastante simple e intuitivo para usar, los que están marcados representan a los servicios activos que se inician al iniciar (valga la redundancia) el sistema. Si quieres que un servicio no se cargue al inicio sólo lo desmarcas y pones aceptar. Bastante fácil, ¿no?

 