---
id: 104
title: Instalar Cyanogenmod 11 en un Google Nexus 5
date: 2014-05-04T23:42:00+00:00
author: ovalenzuela
layout: post
guid: https://ovalenzueladotcom.wordpress.com/2014/05/04/instalar-cyanogenmod-11-en-un-google-nexus-5
permalink: /2014/05/instalar-cyanogenmod-11-en-un-google-nexus-5.html
blogger_blog:
  - www.ovalenzuela.com
blogger_author:
  - Andrés Barrera
blogger_02f5be51301771664ae7c1c72bf29246_permalink:
  - 5782541656019152737
categories:
  - Android
  - Google
  - Hacks y Mods
  - Opinión
---
Por temas que en realidad prefiero aun no comentar, pasé un fin de semana muy nervioso a la espera de algunas noticias, y para relajarme un poco, decidí dedicar un rato a instalar CM 11 en mi Nexus 5, así que para ayudar a quien lo necesite, dejaré una pequeña guía al respecto.

[<img alt="cyanogen-big" class="alignnone size-medium wp-image-3706" src="http://ovalenzuela.com/wp-content/uploads/2014/05/cyanogen-big-300x116.jpg" height="116" width="300" />](http://ovalenzuela.com/wp-content/uploads/2014/05/cyanogen-big.jpg)

Preparándonos:

Antes de comenzar, debemos contar con el Android-SDK instalando y funcionando en nuestro computador. Es importante destacar que este proceso no debe ejecutarse con una batería inferior al 60%. Además, debemos activar la depuración USB en nuestro Google Nexus 5: vamos a ajustes, nos desplazaremos hasta &#8220;opciones del programador&#8221; y allí activaremos la la depuración USB. Si no aparece &#8220;opciones del programador&#8221;, debemos ir a &#8220;Acerca del Dispositivo&#8221; y presionamos repetidamente donde se indica el &#8220;Número de Compilación&#8221;, hasta que se indique que esta listo.

Luego, debemos descargar los siguientes archivos:

Imagen Recovery CWM: <a href="http://ur1.ca/h9c03" style="color:#0077aa;font-weight:bold;">http://ur1.ca/h9c03</a>

Imagen CM 11: <a href="http://ur1.ca/h9c0b" style="color:#0077aa;font-weight:bold;">http://ur1.ca/h9c0b</a>

Google Apps KitKat: <a href="http://ur1.ca/h9c0g" style="color:#0077aa;font-weight:bold;">http://ur1.ca/h9c0g</a>

Una vez descargados los archivos, los copiaremos a la partición &#8220;/sdcard/&#8221;: 

<pre class="alt2" style="color:#222225;">adb push cm-11-20140503-NIGHTLY-hammerhead.zip /sdcard/<br />adb push gapps-kk-20140105-signed.zip /sdcard/</pre>

Desbloquear el BootLoader:

Primero que todo, debemos desbloquear el bootloader, para lo cual ejecutamos siempre como ROOT en nuestro equipo (GNU/Linux): 

<pre class="alt2" style="color:#222225;">adb devices #verifica el dispositivo<br />adb reboot-bootloader #reinicia en bootloader<br />fastboot oem unlock #desbloquea el equipo</pre>

A continuación y sin desconectar el teléfono del cable USB seguiremos las instrucciones que aparecen en la pantalla de nuestro Google Nexus 5, donde nos pedirá seleccionar &#8220;YES&#8221; usando las teclas de volumen para confirmar que queremos desbloquear el bootloader y aceptamos con el botón de encendido. Esperamos unos segundos y continuamos.

[<img alt="n5-bootloader-unlock-1" class="alignnone size-medium wp-image-3673" src="http://ovalenzuela.com/wp-content/uploads/2014/05/n5-bootloader-unlock-1-194x300.jpg" height="300" width="194" />](http://ovalenzuela.com/wp-content/uploads/2014/05/n5-bootloader-unlock-1.jpg)

Una vez hayamos seguido los pasos antes descritos, reiniciamos el equipo: 

<pre class="alt2" style="color:#222225;">fastboot reboot</pre>

Luego de iniciar (realizará un borrado total del dispositivo que puede llegar a demorar hasta 10 minutos), tendremos desbloqueado el bootloader, con lo que podremos modificar libremente el equipo.

Instalar CWM Recovery:

Habiendo desbloqueado el equipo procederemos a instalar el recovery,  para lo cual siempre como ROOT, ejecutamos los siguientes comandos: 

<pre class="alt2" style="color:#222225;">adb bootloader #inicia en bootloader<br />fastboot flash recovery recovery-clockwork-touch-6.0.4.5-hammerhead.img #graba el recovery</pre>

Al finalizar, usando las teclas de volumen seleccionamos recovery mode en la barra superior y presionamos el botón de encendido. OJO: si intentamos reiniciar normalmente de inmediato, se reescribirá el recovery, por lo que debemos reiniciar usando el modo antes descrito. Al iniciar el recovery, podremos continuar con la instalación.

[<img alt="nexus5_cwm" class="alignnone size-medium wp-image-3702" src="http://ovalenzuela.com/wp-content/uploads/2014/05/nexus5_cwm-300x198.jpg" height="198" width="300" />](http://ovalenzuela.com/wp-content/uploads/2014/05/nexus5_cwm.jpg)

Instalar Cyanogenmod 11:

Una vez en el recovery, aplicamos el update seleccionado &#8220;Install from zip file&#8221;, luego &#8220;choose zip from /sdcard/&#8221;, elegimos &#8220;0&#8221; y elegimos en primer lugar el archivo &#8220;cm-11-20140503-NIGHTLY-hammerhead.zip&#8221;, luego al finalizar el proceso continuamos con el archivo &#8220;gapps-kk-20140105-signed.zip&#8221;.  
Cuando ambos archivos se hayan instalado, realizamos el &#8220;wipe cache&#8221; correspondiente y reiniciamos, el inicio puede durar hasta 10 minutos, así que solo resta esperar.

Una vez finalizado tendremos nuestro equipo con Cyanogenmod 11.