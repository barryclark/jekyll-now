---
id: 415
title: Instalar Android ADT en Debian GNU/Linux 64bits
date: 2013-09-07T15:58:00+00:00
author: ovalenzuela
layout: post
guid: https://ovalenzueladotcom.wordpress.com/2013/09/07/instalar-android-adt-en-debian-gnulinux-64bits
permalink: /2013/09/instalar-android-adt-en-debian-gnulinux-64bits.html
blogger_blog:
  - www.ovalenzuela.com
blogger_author:
  - Andrés Barrera
blogger_02f5be51301771664ae7c1c72bf29246_permalink:
  - 7260111940382269858
categories:
  - Amigos
---
La verdad es que estaba testeando el “nuevo” IDE de Google para la plataforma llamado Android Studio, que está basado en IntelliJ. Como lo encontré horrible preferí instalar ADT en mi equipo.

<img class="aligncenter size-full wp-image-738" alt="adt-ide" src="http://www.psep.cl/wp-content/uploads/2013/09/adt-ide.png" width="253" height="253" />

ADT es un fork de Eclipse para Android y está más que probado, de hecho, en mi equipo antiguo funcionaba sin problemas. Por todo lo acontecido decidí instalar el clásico ADT en mi nuevo ultrabook, aunque me topé con algunos problemas, ya que anteriormente usaba 32 bits y ahora  64 bits… ¿qué hacer?

La gracia de Debian es que es Multiarch (en su versión 7), por lo que para poder utilizar ADT hay que agregar esa arquitectura en nuestro sistema, a pesar de descargar la versión para 64 bits.

<pre>#  dpkg --add-architecture i386</pre>

Con esto queda agregada la arquitectura i386 en nuestra distro, lo cual se puede comprobar con el siguiente comando:

<pre># dpkg --print-foreign-architectures</pre>

Debería imprimir una lista de arquitecturas incluidas de manera manual.

Una vez agregada la arquitectura se debe instalar el paquete ia32-libs:

<pre># apt-get install ia32-libs</pre>

Ya instalado estaría nuestro sistema listo para utilizar el ADT, el cual se descarga de su <a title="Android SDK" href="http://developer.android.com/sdk/index.html" target="_blank">web.</a>

 

 

_Artículo original en [Psep.cl](http://www.psep.cl/2013/09/01/instalar-android-adt-en-debian-gnulinux-64bits/ "Instalar Android ADT en Debian GNU/Linux 64bits - Psep.cl"), puede ser distribuido y modificado mientras incluya esta nota según Licencia <a title="CC by-sa 3.0" href="http://creativecommons.org/licenses/by-sa/3.0/deed.es" target="_blank">CC</a>._