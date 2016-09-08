---
id: 420
title: Como utilizar tu Android como mouse con PRemotedroid
date: 2013-08-26T11:59:00+00:00
author: ovalenzuela
layout: post
guid: https://ovalenzueladotcom.wordpress.com/2013/08/26/como-utilizar-tu-android-como-mouse-con-premotedroid
permalink: /2013/08/como-utilizar-tu-android-como-mouse-con-premotedroid.html
blogger_blog:
  - www.ovalenzuela.com
blogger_author:
  - Andrés Barrera
blogger_02f5be51301771664ae7c1c72bf29246_permalink:
  - 5056529594583542932
dsq_thread_id:
  - 4676905633
categories:
  - Android
  - Google
---
La verdad es que ya pocas aplicaciones para Android me sorprenden, pero cuando sucede, es una alegría digna de era compartida y la aplicación en cuestión debe ser difundida, por eso quiero compartir con ustedes esta espectacular aplicación llamada PRemoteDroid la que nos permitirá usar nuestro Droid como un mouse vía Bluetooth y/o WiFi.

Para utilizar esta aplicación  vía Bluetooth deberemos antes instalar las librerías básicas y adicionalmente las librerías de desarrollo:

En Trisquel:  
sudo apt-get install libbluetooth-dev

En Fedora:  
yum install bluez-libs-devel

Luego, instalamos la versión servidor desde la página del proyecto:

[https://code.google.com/p/premotedroid/](https://code.google.com/p/premotedroid/ "https://code.google.com/p/premotedroid/")

Lo descargamos, lo desempaquetamos y lo moveremos a la carpeta /opt para que quede disponible:

wget https://premotedroid.googlecode.com/files/PRemoteDroid-Server.zip

unzip PRemoteDroid-Server.zip

sudo mv PRemoteDroid-Server/ /opt/

Finalmente, crearemos un script que nos sirva de lanzador:

sudo echo &#8220;#!/bin/bash&#8221; > /usr/local/bin/btmouse.sh  
sudo echo &#8220;cd /opt/PRemoteDroid-Server/&#8221; >> /usr/local/bin/btmouse.sh  
sudo echo &#8220;java -classpath bluecove-2.1.jar -classpath blucove-gpl-2.1.0.jar -jar PRemoteDroid-Server.jar &&#8221; >> /usr/local/bin/btmouse.sh  
sudo chmod +x /usr/local/bin/btmouse.sh  
sudo /usr/local/bin/btmouse.sh &

Ya disponiendo de estas librerías, instalamos la aplicación desde la tienda Play Google para nuestro Android:

<https://play.google.com/store/apps/details?id=org.pierre.remotedroid.client&hl=es>

<img class="size-full wp-image-403" alt="4483057-1374553875211-144x144" src="http://ovalenzuela.com/wp-content/uploads/2013/08/4483057-1374553875211-144x144.png" width="144" height="144" />

Para terminar, configuramos la conexión tanto en el cliente instalado en nuestro Android, como en el servidor, conectamos y a disfrutar!