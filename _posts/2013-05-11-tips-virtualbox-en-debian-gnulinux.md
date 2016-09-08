---
id: 435
title: Tips VirtualBox en Debian GNU/Linux
date: 2013-05-11T16:13:00+00:00
author: ovalenzuela
layout: post
guid: https://ovalenzueladotcom.wordpress.com/2013/05/11/tips-virtualbox-en-debian-gnulinux
permalink: /2013/05/tips-virtualbox-en-debian-gnulinux.html
blogger_blog:
  - www.ovalenzuela.com
blogger_author:
  - Andrés Barrera
blogger_02f5be51301771664ae7c1c72bf29246_permalink:
  - 5243980648278054632
categories:
  - Amigos
---
&#8211; Si usas la rama sid/experimental, probablemente tendrás problemas con el servicio del Virtualbox. Esto debido a que quien maneja los controladores del kernel (virtualbox-dkms) no soporta nuevas versiones del núcleo Linux.

Actualmente sid tiene la versión 3.8.x del kernel linux y Virtualbox 4.1.x. El panorama no mejora mirando a la rama experimental, donde aún hay una versión “más nueva” de la misma rama 4.1.x de Virtualbox, por lo que es recomendable bajar Virtualbox directamente de su web oficial <https://www.virtualbox.org/wiki/Linux_Downloads> (dónde dice Debian…) e instalar el paquete deb con un simple dpkg -i nombredelpaquete.deb.

&#8211; Para redimensionar particiones (y otras funciones más), VirtualBox posee la herramienta VboxManage en la shell. Sólo basta con:

<pre>VBoxManage modifyhd --resize 20000 imagen.vdi</pre>

La descripción del comando es demasiado evidente.