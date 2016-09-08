---
id: 416
title: Android 4.3 Jellybean (Cyanogenmod 10.2) en Razr HD (XT925)
date: 2013-09-02T13:13:00+00:00
author: ovalenzuela
layout: post
guid: https://ovalenzueladotcom.wordpress.com/2013/09/02/android-4-3-jellybean-cyanogenmod-10-2-en-razr-hd-xt925
permalink: /2013/09/android-4-3-jellybean-cyanogenmod-10-2-en-razr-hd-xt925.html
blogger_blog:
  - www.ovalenzuela.com
blogger_author:
  - Andrés Barrera
blogger_02f5be51301771664ae7c1c72bf29246_permalink:
  - 5010246806557549710
dsq_thread_id:
  - 3086968227
categories:
  - Android
  - Google
---
Aunque la versión 4.1.2 de Android que viene incorporado en los teléfonos Motorola Razr HD (XT925) funciona bastante bien, hay ciertos aspectos de la ROM que la verdad me saturan al nivel de considerar reemplazarlo. Cosas como aplicaciones innecesarias, configuraciones que solo buscan capturar tus datos y por supuesto el tremendo trabajo que cuesta el conseguir Root para hacer tareas tan simples como respaldar tu equipo y las Apps instaladas.  
Es por eso, que aprovechando unos minutos del día decidí instalar Cyanogenmod 10.2 que trae Android 4.3 Jellybean, y luego de verificar que lo único que no funcionaría del todo bien era la salida de vídeo por HDMI, me decidí a probar y los resultados han sido excelentes.  
Para instalarlo, solo deben seguir las instrucciones descritas a continuación, sin embargo, antes deben desbloquear el bootloader usando la herramienta Motopocalypse, que pueden descargar desde aquí:

[http://go.gnu.cl/NYCWSo](http://go.gnu.cl/NYCWSo "http://go.gnu.cl/NYCWSo")

Esta herramienta trae 2 scripts, uno que desbloquea llamado **run_unlock.sh** que ejecutaremos primero y otro que reemplazará el mensaje de advertencia por el logo de Motorola llamado **run_removewarning.sh**.  
Luego de desbloquear el **Bootloader**, comenzaremos a instalar el sistema, para lo cual debemos seguir los siguientes pasos:

1.- Descargar los paquetes necesarios: 

  * ROM Cyanogenmod 10.2
  * Google Apps
  * Clock Work Mod Recovery (fastboot)
  * Herramientas</ul> 

Para facilitar la vida, he creado un único archivo que contiene lo necesario, pueden descargarlo desde aquí:

<a href="http://go.gnu.cl/kRgGwr" target="_blank" title="http://go.gnu.cl/kRgGwr">http://go.gnu.cl/kRgGwr</a>

2.- Iniciar el teléfono en modo **Fastboot**, para lo cual apagamos el equipo completamente. Luego lo volvemos a encender, pero mantenemos presionados los botones **Encendido** y **Volumen Arriba** al mismo tiempo, hasta que nos salga un menú. En ese menú, usando el botón de **Volumen Abajo** nos posicionamos en **Fastboot** y luego confirmamos presionando el botón **Volumen Arriba**.  
Al estar el equipo en modo Fastboot, ejecutaremos los comandos como root, para instalar el software necesario:  
Primero, verificamos que el equipo sea reconocido correctamente:  
`sudo ./fastboot.linux devices`

Debería indicarse la disponibilidad de nuestro equipo. De ser así continuamos, de lo contrario hay que verificar el cable. Al ser exitoso, procedemos a instalar el recovery y posteriormente reiniciamos:  
`sudo ./fastboot.linux flash recovery cwmrecovery6028-xt925_20130219-epinter.img<br />sudo ./fastboot.linux reboot`

Dejamos que el equipo inicie en forma normal. Al finalizar la carga, vamos a la opción de desarrollador y activamos la opción &#8220;Depuración por USB&#8221;, y ejecutamos el siguiente comando para verificar que el proceso ha sido exitoso:  
`sudo ./adb.linux devices`  
Tal y como en la ocasión anterior, si ha sido exitoso, entonces procedemos a copiar la ROM a la SDCard Externa y reiniciamos:  
`sudo ./adb.linux push cm-10.2-20130901-NIGHTLY-xt925-skrilax.zip /mnt/external_sd/<br />sudo ./adb.linux push gapps-jb-20130813-signed.zip /mnt/external_sd/<br />sudo ./adb.linux reboot recovery`  
Al reiniciar, el sistema cargará directamente el **CWM Recovery**, por los botones de **Volumen** para navegar en el menú y el botón **Encendido** para confirmar una acción. En el menú seleccionaremos la opción **install zip from sdcard** > **choose zip from external sdcard** y navegamos hasta el archivo, lo seleccionamos con el botón de encendido y luego confirmamos la acción seleccionando **Yes &#8211; Install cm-10.2-20130901-NIGHTLY-xt925-skrilax.zip**. Posteriormente repetimos el proceso para el archivo **gapps-jb-20130813-signed.zip**.  
Luego de este proceso, volvemos al menú principal y elegimos la opción **wipe data/factory reset** y finalmente reiniciamos con **reboot system now**.  
El primer inicio del sistema es algo lento, puesto que el sistema operativo debe crear toda la estructura interna y el caché, por lo que deberemos esperar. Al cabo de algunos minutos, nuestro equipo iniciará con la versión de Android 4.3 listo para ser configurado.