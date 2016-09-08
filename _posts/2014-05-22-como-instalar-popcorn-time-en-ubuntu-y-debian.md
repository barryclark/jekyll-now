---
id: 91
title: Cómo instalar Popcorn Time en Ubuntu y Debian
date: 2014-05-22T15:45:00+00:00
author: ovalenzuela
layout: post
guid: https://ovalenzueladotcom.wordpress.com/2014/05/22/como-instalar-popcorn-time-en-ubuntu-y-debian
permalink: /2014/05/como-instalar-popcorn-time-en-ubuntu-y-debian.html
blogger_blog:
  - www.ovalenzuela.com
blogger_author:
  - Andrés Barrera
blogger_02f5be51301771664ae7c1c72bf29246_permalink:
  - 6770530239532053860
dsq_thread_id:
  - 4639241186
categories:
  - Noticias Destacadas
---
<a href="http://www.omicrono.com/2014/05/popcorn-time-3-0-ya-disponible-para-descarga-con-streaming-de-series-ademas-de-peliculas/popcorn-time-nuevo-1/" rel="attachment wp-att-81474" target="_blank"><img alt="popcorn-time-nuevo-1" src="http://www.omicrono.com/wp-content/uploads/2014/05/popcorn-time-nuevo-1.jpg" width="1102" height="647" /></a>

Es cierto que hay muchas versiones de Popcorn Time, creadas por diversos grupos que aseguran continuar con el legado de los creadores originales; por el momento hay una versión que está destacando por encima de las demás, de la que os hablamos <a href="http://www.omicrono.com/2014/05/popcorn-time-3-0-ya-disponible-para-descarga-con-streaming-de-series-ademas-de-peliculas/" target="_blank">no hace mucho</a>, gracias a sus novedades como la reproducción de series de televisión además de películas, y una interfaz mejorada. Ahora los usuarios de Ubuntu y Debian tenemos unos repositorios no oficiales para instalar y actualizar fácilmente la aplicación.

## Instalación desde repositorios

Para instalar Popcorn Time en Ubuntu y Debian solo tenemos que añadir los repositorios de la página webupd8 creados para la ocasión. En realidad el programa que instalamos lo que hace es **buscar la última versión disponible en la página oficial y descargar e instalar el paquete**, pero es suficiente si lo que queremos es instalar el programa de manera sencilla. Para ello abrimos una terminal y ejecutamos los siguientes comandos:

> sudo add-apt-repository ppa:webupd8team/popcorntime  
> sudo apt-get update  
> sudo apt-get install popcorn-time

Al ejecutar el último comando veremos una pantalla en la que tendremos que aceptar los términos de uso de la aplicación (ya que no es legal en algunos países).

<a href="http://www.omicrono.com/2014/05/como-instalar-popcorn-time-en-ubuntu-y-debian/popcorn-time-ubuntu/" rel="attachment wp-att-82079" target="_blank"><img alt="popcorn-time-ubuntu" src="http://www.omicrono.com/wp-content/uploads/2014/05/popcorn-time-ubuntu.jpg" width="724" height="486" /></a>

Si usamos Debian, tenemos que usar los siguientes comandos:

> su &#8211;  
> echo “deb http://ppa.launchpad.net/webupd8team/popcorntime/ubuntu trusty main” | tee /etc/apt/sources.list.d/webupd8team-popcorntime.list  
> echo “deb-src http://ppa.launchpad.net/webupd8team/popcorntime/ubuntu trusty main” | tee -a /etc/apt/sources.list.d/webupd8team-popcorntime.list  
> apt-key adv –keyserver keyserver.ubuntu.com –recv-keys EEA14886  
> apt-get update  
> apt-get install popcorn-time  
> exit

Fuente | <a href="http://www.webupd8.org/2014/05/install-popcorn-time-in-ubuntu-or.html" target="_blank">Webupd8</a>

El artículo <a href="http://www.omicrono.com/2014/05/como-instalar-popcorn-time-en-ubuntu-y-debian/" target="_blank">Cómo instalar Popcorn Time en Ubuntu y Debian</a> se publicó en <a href="http://www.omicrono.com" target="_blank">Omicrono</a> (Tu mundo de actualidad, tecnología, software e Internet.)