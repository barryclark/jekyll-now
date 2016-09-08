---
id: 540
title: Android Root en Motorola Atrix 4G
date: 2012-08-13T04:52:00+00:00
author: ovalenzuela
layout: post
guid: https://ovalenzueladotcom.wordpress.com/2012/08/13/android-root-en-motorola-atrix-4g
permalink: /2012/08/android-root-en-motorola-atrix-4g.html
blogger_blog:
  - www.ovalenzuela.com
blogger_author:
  - Andrés Barrera
blogger_02f5be51301771664ae7c1c72bf29246_permalink:
  - 3037350204873652455
categories:
  - Android
  - Google
---
<div align="justify">
  <span><span><br />Como saben, el Motorola Atrix 4G para Chile, viene con Froyo, y esta versión aunque trae las mismas prestaciones que su hermano AT&T tan bien documentado en la Internetz, no se lleva bien con el tema del ROOT mediante el tan publicitado SuperOneClick, así que fue necesario meter mano al tema y rootearlo con un metodo menos conocido, más complicado, pero que obviamente funciono perfecto.</span></span>
</div>

<div align="justify">
  <span><span><br /></span></span>
</div>

<div align="justify">
  <span><span>Lo primero que necesitaremos será tener algo de software en nuestro computador, y aunque este tutorial lo explico más a detalle para la pobre gente que usa Windows, en GNU/Linux muchas de las cosas que explicaré estan de más.</span></span>
</div>

<div align="justify">
  <span><span><br /></span></span>
</div>

<div align="justify">
  <span><span>Como todo equipo con hardware nuevo, necesitaremos instalar los drivers del equipo, algo que pueden hacer en forma simple descargandolos desde aquí: Para 32bits <a href="http://gititbit.ch/aUSB1">http://gititbit.ch/aUSB1</a> y para 64bits <a href="http://gititbit.ch/aUSB2">http://gititbit.ch/aUSB2</a>.</span></span>
</div>

<div align="justify">
  <span><span><br /></span></span>
</div>

<div align="justify">
  <span><span>Luego de haber instalado y configurado los drivers, recuerden que no en todos los sistemas operativos tenemos que hacer este tipo de cosas&#8230;, procederemos a descargarnos el paquete ADB-Fastboot desde la dirección: <a href="http://gititbit.ch/AFAS">http://gititbit.ch/AFAS</a>.</span></span>
</div>

<div align="justify">
  <span><span><br /></span></span>
</div>

<div align="justify">
  <span><span>Una vez realizado esto, tenemos que descomprimir el archivo de ADB-Fastboot y dejar su contenido directamente en la raíz de mi unidad de disco, por ejemplo si estoy usando Windowshit deberemos dejarlo en c:/, si por el contrario estoy usando algun sabor de GNU/Linux, recomiendo dejarlo por un rato en / y seguir trabajando como root para evitar problemas.</span></span>
</div>

<div align="justify">
  <span><span><br /></span></span>
</div>

<div align="justify">
  <span><span>Luego nos descargaremos una imagen ya lista, desde la siguiente dirección: <a href="http://gititbit.ch/RTMG">http://gititbit.ch/RTMG</a> Deberemos descomprimir el archivo descargado y dejar el root.img directamente en la raíz (c: para winshits y / para proGNU/Linux), tal como lo hicimos antes para el ADB-Fastboot.</span></span>
</div>

<div align="justify">
  <span><span><br /></span></span>
</div>

<div align="justify">
  <span><span>A continuación deberemos poner nuestro Atrix en el modo FastBoot para ingresar y comenzar a trabajar, para esto apagamos el dispositivo completamente, luego de esto lo volveremos a prender, manteniendo presionado el boton encendido y a la vez el boton para bajar el volumen, hasta que en la pantalla nos salga un mensaje &#8220;Fastboot&#8221;, entonces soltamos los botones y presionamos brevemente el boton para subir el volumen.</span></span>
</div>

<div align="justify">
  <span><span><br /></span></span>
</div>

<div align="justify">
  <span><span>Una vez realizado este procedimiento, tendremos acceso al Fastboot y comenzaremos el procedimiento para rotear nuestro equipo. Ejecutamos a comando fastboot desde la terminal, y copiamos la imagen descargada:</span></span>
</div>

<div align="justify">
  <span><span><br /></span></span>
</div>

<div align="justify">
  <span><span>c:> fastboot flash preinstall root.img</span></span>
</div>

<div align="justify">
  <span><span><br /></span></span>
</div>

<div align="justify">
  <span><span>Finalmente reiniciamos nuestro Atrix:</span></span>
</div>

<div align="justify">
  <span><span><br /></span></span>
</div>

<div align="justify">
  <span><span>c:> fastboot reboot</span></span>
</div>

<div align="justify">
  <span><span><br /></span></span>
</div>

<div align="justify">
  <span><span>Cuando el equipo haya iniciado en forma normal, vamos a proceder a activar el modo de &#8220;Depuración USB&#8221;, para lo cual accedemos a la configuración de nuestro terminal:</span></span>
</div>

<div align="justify">
  <span><span><br /></span></span>
</div>

<div align="justify">
  <span><span>Configuración >> Aplicaciones >> Desarrollo >> Depuración USB</span></span>
</div>

<div align="justify">
  <span><span><br /></span></span>
</div>

<div align="justify">
  <span><span>Habiendo activado esta opción, procederemos a conectarnos usando el comando ADB y accediendo al terminal vía comandos, para finalizar la nueva configuración de nuestro terminal:</span></span>
</div>

<div align="justify">
  <span><span><br /></span></span>
</div>

<div align="justify">
  <span><span>c:> adb shell</span></span>
</div>

<div align="justify">
  <span><span>c:> /preinstall/dosu</span></span>
</div>

<div align="justify">
  <span><span><br /></span></span>
</div>

<div align="justify">
  <span><span>Ahora volveremos a montar el disco interno del equipo, para tener permisos de escritura, e instalaremos nuestro anhelado SuperUser.apk:</span></span>
</div>

<div align="justify">
  <span><span><br /></span></span>
</div>

<div align="justify">
  <span><span>c:> /bin/mount /system -o remount,rw</span></span>
</div>

<div align="justify">
  <span><span>c:> cp /preinstall/su /system/bin/su</span></span>
</div>

<div align="justify">
  <span><span>c:> chmod 6755 /system/bin/su</span></span>
</div>

<div align="justify">
  <span><span>c:> PATH=/system/bin:$PATH pm install /preinstall/Superuser.apk</span></span>
</div>

<div align="justify">
  <span><span><br /></span></span>
</div>

<div align="justify">
  <span><span>Habiendo ejecutado estos comandos sin que se presentase un problema, entonces, felicidades! ya eres todo un ROOT!</span></span>
</div>

<div align="justify">
  <span><span><br /></span></span>
</div>

<div align="justify">
  <span><span>Procedimiento probado en Motorola Atrix Movistar Chile y en un equipo Personal Argentina</span></span> 
  
  <div>
    <span><span><br /></span></span>
  </div>
</div>

<div>
  Publicado originalmente por Oscar Valenzuela en http://ovalenzuela.xpertians.com &#8211; Puede ser compartido y copiado libremente, mientras mantenga esta nota.
</div>