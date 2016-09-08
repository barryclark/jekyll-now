---
id: 430
title: QEMU como emulador libre de maquinas virtuales (chao Virtualboxnon-free)
date: 2013-07-20T22:20:00+00:00
author: ovalenzuela
layout: post
guid: https://ovalenzueladotcom.wordpress.com/2013/07/20/qemu-como-emulador-libre-de-maquinas-virtuales-chao-virtualboxnon-free
permalink: /2013/07/qemu-como-emulador-libre-de-maquinas-virtuales-chao-virtualboxnon-free.html
blogger_blog:
  - www.ovalenzuela.com
blogger_author:
  - Andrés Barrera
blogger_02f5be51301771664ae7c1c72bf29246_permalink:
  - 7887077035214978201
dsq_thread_id:
  - 4744544744
categories:
  - GNU con Linux
  - Google
  - Hacks y Mods
---
<div>
  <a href="http://ovalenzuela.xpertians.com/wp-content/uploads/blogger/-Dpkcf72nGVQ/UesMHB1LUpI/AAAAAAAAOiA/qqAgo6gIT-8/s1600/Virtualbox.png"><img alt="" border="0" src="http://ovalenzuela.xpertians.com/wp-content/uploads/blogger/-Dpkcf72nGVQ/UesMHB1LUpI/AAAAAAAAOiA/qqAgo6gIT-8/s200/Virtualbox.png" height="200" width="193" /></a>
</div>

<div>
  Antes de comenzar, debo confesar que hace mucho tiempo no me veía en la necesidad de utilizar una maquina virtual, sin embargo se que muchos las usan a diario. Antes, mi favorito era Virtualbox, pero desde que Oracle compro SUN, todo este mundo tiene un sabor amargo por su culpa, y cada vez que veo el logo de Oracle en los ex-productos de SUN, me dan arcadas y ganas de vomitar.
</div>

<div>
</div>

<!--Ads1-->

<div>
</div>

<div>
  Volviendo a nuestro tema, mi amigo <a href="http://staff.gnu.cl/psep" target="_blank">@psep</a> me comentó hace poco, ya que iba a instalar una maquina virtual para hacer unas pruebas, que Oracle había comenzado a linkear drivers y librerías no libres en Virtualbox, con mucha pena y rabia pude comprobarlo en la misma página de Trisquel, un sistema operativo 100% libre basado en el popular sistema operativo Ubuntu (trululu para los amigos), donde se señalaba que aunque el paquete virtualbox-ose era libre, el paquete Guest Additions no es libre, tal como se señala en el sitio de Trisquel:
</div>

<div>
</div>

<div>
  <i>VirtualBox OSE Guest Additions</i>
</div>

<div>
</div>

<div>
  <i>Description: Description: x86 virtualization solution &#8211; guest additions. Can be found in Ubuntu multiverse, note that the virtualbox-ose package is free software.</i>
</div>

<div>
  <i>Problem: Non-free license: VirtualBox PUEL terms and conditions</i>
</div>

<div>
  <i>Recommended Fix: Remove program/package</i>
</div>

<div>
  <i>(Source) package name(s): virtualbox-guest-additions-iso</i>
</div>

<div>
  <i>Trisquel Status: Fixed (Not included in Trisquel)</i>
</div>

<div>
  <i><a href="http://trisquel.info/en/wiki/software-does-not-respect-free-system-distribution-guidelines">http://trisquel.info/en/wiki/software-does-not-respect-free-system-distribution-guidelines</a></i>
</div>

<div>
</div>

<div>
  Es por esto, que me decidí a publicar un pequeño y sencillo tutorial sobre como utilizar Qemu para emular sistemas operativos. Por supuesto esta guía es muy breve y tiene como finalidad servir de introducción, por lo que comandos especiales y avanzados, deberán ser consultados directamente a la documentación oficial de Qemu.
</div>

<div>
</div>

<div>
  <a href="http://ovalenzuela.xpertians.com/wp-content/uploads/blogger/-BZb-kdGGfhM/UesMNK3oZVI/AAAAAAAAOiI/z79hLygRHsk/s1600/qemu-logo.png"><img alt="" border="0" src="http://ovalenzuela.xpertians.com/wp-content/uploads/blogger/-BZb-kdGGfhM/UesMNK3oZVI/AAAAAAAAOiI/z79hLygRHsk/s1600/qemu-logo.png" /></a>
</div>

<div>
  Lo primero que deberemos hacer será descargar e instalar Qemu, en la arquitectura que estoy usando (Trisquel) será con el siguiente comando:
</div>

<div>
</div>

<div>
  sudo apt-get install qemu
</div>

<div>
</div>

<div>
  Luego de esto, procederemos a crear una carpeta donde guardaremos las imágenes de nuestras maquinas virtuales en nuestro home:
</div>

<div>
</div>

<div>
  cd
</div>

<div>
  mkir .qemu
</div>

<div>
  cd .qemu
</div>

<div>
</div>

<div>
  A continuación crearemos la imagen del disco duro, como voy a instalar un simple <a href="http://www.damnsmalllinux.org/" target="_blank">DamnSmallLinux</a>, llamaré a mi imagen DSL y le otorgaré 1Gb de espacio:
</div>

<div>
</div>

<div>
  qemu-img create DSL.img 1000M
</div>

<div>
</div>

<div>
  Como mencioné anteriormente, usaré una imagen ISO de DamnSmallLinux, la que se obtiene con el nombre current.iso, por lo que usando este archivo y nuestro recientemente creado HD, iniciaremos nuestra maquina virtual. Es importante destacar que el paquete Qemu incluye la emulación de 32 y 64bits, como en este caso el sistema operativo a instalar requiere 32bits, usaré el comando qemu-system-i386, en caso de requerir 64bits debería usar qemu-system-x86_64:
</div>

<div>
</div>

<div>
  qemu-system-i386 -boot d -cdrom /directorio/donde/descargamos/current.iso -hda DSL.img &
</div>

<div>
</div>

<div>
  Instalar el sistema operativo es en forma normal como lo haríamos en cualquier otro pc, y por esto no lo voy a describir, ya que depende de cada distribución o sistema operativo que cada cual quiera utilizar.
</div>

<div>
</div>

<div>
  Luego de instalar el sistema operativo, podremos iniciar nuestra maquina virtual con el siguiente comando:
</div>

<div>
</div>

<div>
  qemu-system-i386 -boot c -hda DSL.img -m 256 -localtime &
</div>

<div>
</div>

<div>
  La opción -m 256 indica cuanta RAM dispondrá la maquina virtual.
</div>

<div>
  El parametro -localtime pasa la hora y fecha desde el host principal a la maquina virtual.
</div>

<div>
  El & al final es para que quede funcionando en segundo plano.
</div>

<div>
</div>

<div>
  Y a disfrutar!
</div>

<div>
  Publicado originalmente por Oscar Valenzuela en http://ovalenzuela.xpertians.com &#8211; Puede ser compartido y copiado libremente, mientras mantenga esta nota.
</div>