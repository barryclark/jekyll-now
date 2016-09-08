---
id: 82
title: Piratea tus archivos seguro y libremente con un PirateBox hecho en casa
date: 2014-06-14T21:36:00+00:00
author: ovalenzuela
layout: post
guid: https://ovalenzueladotcom.wordpress.com/2014/06/14/piratea-tus-archivos-seguro-y-libremente-con-un-piratebox-hecho-en-casa
permalink: /2014/06/piratea-tus-archivos-seguro-y-libremente-con-un-piratebox-hecho-en-casa.html
blogger_blog:
  - www.ovalenzuela.com
blogger_author:
  - Andrés Barrera
blogger_02f5be51301771664ae7c1c72bf29246_permalink:
  - 1361763275633383878
dsq_thread_id:
  - 3110720054
categories:
  - Desarrollo
  - GNU con Linux
  - Google
  - Hacks y Mods
  - Noticias Destacadas
  - Opinión
---
Siguiendo con los temas de seguridad para nuestra información, hoy les quiero contar sobre un proyecto llamado <a href="http://piratebox.cc/" target="_blank" title="Piratebox">PirateBox</a>, una especie de microservidor que cualquiera puede montar, para compartir películas, fotos y música de forma privada, lo mejor es que por un costo inferior a us$ 45 (clp $22.500), podemos contar con este servidor para compartir todo tipo de archivos, y podremos llevarlo con nosotros a eventos y reuniones. Adicionalmente, el PirateBox cuenta con un sistema de Chat anónimo, que por cierto borra su contenido cada vez que reiniciamos el servidor.

[<img alt="wpid-piratebox-logo1" class="alignnone size-full wp-image-4556" src="http://ovalenzuela.com/wp-content/uploads/2014/06/wpid-piratebox-logo1.png" height="199" width="226" />](http://ovalenzuela.com/wp-content/uploads/2014/06/wpid-piratebox-logo1.png)

El concepto técnico de PirateBox, es contar con un pequeño servidor web, montado dentro de un pequeño router inalámbrico al que instalaremos OpenWRT (Linux), idealmente un TP-Link MR3020, que puede ser encontrado fácilmente en el mercado local por menos de us$32 (clp $16.000) y un pendrive del tamaño que deseemos, por ejemplo uno de 8GB cuyo costo no superará los us$ 10 (clp $5.000) que servirá para almacenar los archivos. El router puede ser alimentado por un transformador (que incluye), un cable USB conectado a nuestra computadora o simplemente una batería externa.

Cosas que necesitaremos: 

  * Router TP-Link MR3020
  * Cable de red Ethernet
  * Pendrive de la capacidad que queramos, con solo 1 partición, idealmente FAT32 o EXT4
  * Internet y un puerto ethernet libre en el router de la casa.</ul> 

El proceso de instalación es bastante simple, y normalmente no debería llevarnos más de 20 minutos para aquellos que cuentan con un conocimiento medio sobre GNU/Linux, y sí, nuevamente daré las instrucciones para hacerlo desde un sistema operativo libre, no voy a explicar como sortear los típicos problemas de WinShit. 

  * Lo primero será descargar una versión modificada de <a href="http://piratebox.aod-rpg.de/openwrt-ar71xx-generic-tl-mr3020-v1-squashfs-factory.bin" target="_blank" title="OpenWRT para MR3020">OpenWRT para MR3020</a>, que nos permitirá reemplazar el sistema operativo del router Inalámbrico.
  * <span style="line-height:1.5;">Una vez que hemos descargado OpenWRT, procedemos a mover el interruptor situado junto al puerto LAN/WAN a modo WISP, luego desactivamos el wifi de nuestro equipo y conectaremos el puerto ethernet de nuestra computadora al router usando un cable de red.</span>
  * <span style="line-height:1.5;">Luego, ponemos energía al router e intentaremos ingresar a la página de administración del router en la dirección http://192.168.0.254, donde usaremos &#8220;<strong>admin</strong>&#8221; como usuario y &#8220;<strong>admin</strong>&#8221; como contraseña.</span>
  * <span style="line-height:1.5;">Ya dentro, vamos a<strong> Herramientas del sistema</strong> > <strong>Actualización de Firmware</strong>, donde encontraremos un formulario para subir un archivo, que nos permitirá subir el firmware descargado previamente, y esperamos a que el router reinicie, lo que por cierto puede demorar hasta 5 minutos, por lo que se recomienda cerrar el navegador (puesto que la página ya no servirá) y abrimos una terminal para conectarnos al router.</span>
  * Vamos a Herramientas del sistema> Actualización de Firmware y seleccione el firmware OpenWRT
  * <span style="line-height:1.5;">Después de la actualización, el sistema del router se reiniciará (desconecten y reconecten el cable de red).</span>
  * Hacemos Telnet al dispositivo y comenzamos con los comandos:</ul> 

`> telnet 192.168.1.1`

Ejecutamos el comando passwd para configurar una contraseña de inicio de sesión, así posteriormente podremos conectarnos por SSH:

`> passwd`

Luego, editaremos las configuraciones básicas de red, pero antes debemos contar con una dirección IP estática dentro del segmento de nuestra red, la dirección de puerta de enlace (requiere acceso a Internet durante el proceso de instalación) y obviamente la mascara de red.

`> vi /etc/config/network`

El archivo finalmente debe ser similar a esto:

`config interface 'loopback'<br />option ifname 'lo'<br />option proto 'static'<br />option ipaddr '127.0.0.1'<br />option netmask '255.0.0.0'</p>
<p>config interface 'lan'<br />option ifname 'eth0'<br />option type 'bridge'<br />option proto 'static'<br />option ipaddr '192.168.2.100'<br />option netmask '255.255.255.0'<br />option gateway '192.168.2.1'<br />list dns '192.168.2.1'<br />list dns '8.8.8.8'`

Luego, apagamos el router (desconectando la energía).  
Activamos la conexión inalámbrica de la computadora y conectamos el router a nuestro router de internet de la casa, la idea es que el puerto Ethernet del router 3g esté conectado a un puerto ethernet del router de internet en casa.

[<img alt="skate-share4" class="alignnone size-medium wp-image-4558" src="http://ovalenzuela.com/wp-content/uploads/2014/06/skate-share4-300x225.jpg" height="225" width="300" />](http://ovalenzuela.com/wp-content/uploads/2014/06/skate-share4.jpg)

Conectamos la energía al router 3g, esperamos 5 minutos aproximadamente, y trataremos de conectar en la red de casa vía SSH a la ip que hemos configurado en el router 3g.

`> ssh root@192.168.1.100`

Una vez dentro del router, realizamos un ping para verificar el acceso a Internet:

`> ping google.com`

Si todo fue OK, realizaremos algunas actualizaciones y configuraciones para asegurarnos que nuestro equipo tenga todo lo que se requiere:

`> opkg update<br />> opkg install kmod-usb-uhci<br />> usbcore ## insmod puede devolver el mensaje: insmod: no se puede insertar 'usbcore': File exists, es normal.<br />> insmod uhci<br />> opkg install kmod-usb-ohci ## puede devolver el mensaje: instalado en la raíz está actualizado, es normal.<br />> insmod usb-ohci`

Ahora que nuestro router está listo, procederemos a instalar el software base de PirateBox en nuestro router.

Conectamos la memoria USB al router, y procedemos con la instalación, siempre conectado por SSH:

`> cd /tmp<br />> wget http://piratebox.aod-rpg.de/piratebox_0.5.1_all.ipk<br />> opkg update && opkg install piratebox*`

Si existe algún problema, debemos verificar que la unidad fue montada correctamente!, si alguien tiene algún problema, favor comente más abajo para ir agregando algunos workarounds al post.  
Si por el contrario, todo fue OK, procedemos a instalar la sala de chat Kareha:

`> /opt/piratebox/bin/install_piratebox.sh /opt/piratebox/conf/piratebox.conf imageboard`

A continuación, editamos la configuración de Kareha cambiando en archivo el nombre de usuario admin y la contraseña (ADMIN_PASS y secreto):

`> vi /opt/piratebox/www/board/config.pl`

Una vez que la instalación se haya completado, desconectamos el cable ethernet y la alimentación durante al menos 1 minuto. Luego esperamos a que el equipo inicie y conectamos nuestra computadora a la red wifi &#8220;PirateBox – Share freely&#8221;. Al estar conectados, al intentar abrir cualquier página web y debemos ser redirigidos al menú de PirateBox.

[<img alt="wpid-PirateBoxSendafile1" class="alignnone size-medium wp-image-4555" src="http://ovalenzuela.com/wp-content/uploads/2014/06/wpid-PirateBoxSendafile1-300x190.png" height="190" width="300" />](http://ovalenzuela.com/wp-content/uploads/2014/06/wpid-PirateBoxSendafile1.png)

Si todo fue OK, entonces podemos comenzar a piratear libremente con nuestra PirateBox, sino, pues no dude en consultar!!.

Inspirado en: <a href="http://www.acercadelaeducacion.com.ar/2012/11/hace-tu-cajita-pirata-y-comparti-todo-en-cualquier-lado-piratebox/" target="_blank" title="Hace tu cajita pirata y compartí todo en cualquier lado #PirateBox">Hace tu cajita pirata y compartí todo en cualquier lado #PirateBox</a>

Más información en el sitio oficial del proyecto <a href="http://piratebox.cc/" target="_blank" title="Piratebox">PirateBox</a>.