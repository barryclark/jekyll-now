---
id: 405
title: Extender almacenamiento en tu consola Ouya
date: 2013-10-18T06:47:00+00:00
author: ovalenzuela
layout: post
guid: https://ovalenzueladotcom.wordpress.com/2013/10/18/extender-almacenamiento-en-tu-consola-ouya
permalink: /2013/10/extender-almacenamiento-en-tu-consola-ouya.html
blogger_blog:
  - www.ovalenzuela.com
blogger_author:
  - Andrés Barrera
blogger_02f5be51301771664ae7c1c72bf29246_permalink:
  - 1875151229555141810
dsq_thread_id:
  - 3100335213
categories:
  - Google
  - Hacks y Mods
---
No hace mucho llego a mis manos una consola de juegos Ouya, la cual es un proyecto para crear la primera consola de concepto &#8220;libre y abierto&#8221; (no puedo decir Software Libre, porque no todo lo es), y que fue desarrollada gracias al aporte de Kickstarter, y aunque ha funcionado bastante bien, un tema que notoriamente nos causa problemas es su limitado almacenamiento a 8GB. Es por esto que buscando por Internet encontré la forma de extender la capacidad de nuestra Ouya, usando un pendrive y la aplicaación Link2SD, el cual permitirá mover las aplicaciones desde la memoria interna a una partición ext4.

<a name='more'></a>  
Requisitos: 

  * Ser root en Ouya y tener instalado SuperUser (tendrás que volver a rootear en cada actualización de hardware).
  * La aplicación Link2SD (apk).
  * Unidad USB con una segunda partición primaria en formato ext4.</ul> 

Utilice cualquier herramienta (gparted, MiniTool Partition, fdisk, etc) para crear una segunda partición primaria en la unidad USB, y dar formato a ext4.

Ahora, Link2SD no reconocerá que efectivamente existe un formato ext4 en la segunda partición en la unidad USB, por lo que para que funcione, hay que montarlo manualmente a /data/sdext2. Entonces, inserte la unidad USB en la Ouya, y siga las siguientes instrucciones, luego de conectar tu Ouya a tu pc: 

  1. adb shell
  * su
  * mkdir /data/sdext2
  * mount -t ext4 /dev/block/vold/8:2 /data/sdext2
  * exit</ol> 

Ahora hay que ejectar Link2SD en Ouya, y empezar a usar ese incómodo touchpad para mover aplicaciones y datos (usar el botón de enlace o mover a la tarjeta SD no funciona para Ouya) a su nuevo espacio de almacenamiento. Hay algunas opciones en el menú Link2SD para que cada aplicación que se instale desde ahora, se mueva automáticamente a la nueva ubicación.

Por supuesto, este proceso se elimina si extraes la unidad USB de la Ouya o si apagas la OUYA, en tal caso tienes que montar primero la partición ext4 manualmente antes de poder utilizar los juegos!

Opcionalmente, puedes utilizar SDExt2Mounter para montar automáticamente la unidad, para esto debes tener instalado Busybox, luego ejecutas el siguiente procedimiento: 

  1. Inicias SDExt2Mounter
  * Le otorgas acceso PERMANENTE a root si lo pregunta.
  * Presionas el botón (make) mount.
  * Presionas el botón AutoMount.
  * Reinicias tu Ouya.</ol> 

Luego de reiniciar, tu Ouya habrá montado automáticamente la partición, de forma que tus juegos se mostrarán en el launcher. Obviamente la parte de SDExt2Mounter solo necesitas ejecutarla una vez.

Descargas: 

  * Link2SD.apk <a href="https://www.blogger.com/SDExt2Mounter_1.2.apk" target="_blank">http://go.gnu.cl/0clmxm</a>
  * SDExt2Mounter_1.2.apk <a href="http://go.gnu.cl/1GuVCq" target="_blank">http://go.gnu.cl/1GuVCq</a></ul> 

Más información, en el foro de XDA <a href="http://forum.xda-developers.com/showthread.php?t=2345680" target="_blank" title="Foro XDA">http://forum.xda-developers.com/showthread.php?t=2345680</a>