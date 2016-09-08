---
id: 488
title: Instalar Android JellyBean (CM 10) a nuestra Kindle Fire
date: 2012-10-16T19:38:00+00:00
author: ovalenzuela
layout: post
guid: https://ovalenzueladotcom.wordpress.com/2012/10/16/instalar-android-jellybean-cm-10-a-nuestra-kindle-fire
permalink: /2012/10/instalar-android-jellybean-cm-10-a-nuestra-kindle-fire.html
blogger_blog:
  - www.ovalenzuela.com
blogger_author:
  - Andrés Barrera
blogger_02f5be51301771664ae7c1c72bf29246_permalink:
  - 5111196211923344316
dsq_thread_id:
  - 3086968361
categories:
  - Android
  - Google
  - Hacks y Mods
---
<div>
  <div>
    Por todos es sabido que la Kindle Fire aunque es una excelente tablet, a muy buen precio, su sistema operativo es en realidad una molestia para quienes disfrutan de instalar aplicaciones y trabajar con ella, es por eso que a continuación dejo una guía sobre como reemplazar el sistema operativo e instalar Jellybean.
  </div>
  
  <div>
  </div>
  
  <div>
    <b>Rootear el Kindle</b>
  </div>
  
  <div>
    Para instalar nuestra nueva ROM, será necesario primero Rootear nuestro dispositivo, lo que puede ser realizado con la herramienta Kindle Fire Utility (Kindle_Fire_Utility_v0.9.6.zip), la que puede ser descargada desde la siguiente dirección:
  </div>
  
  <div>
  </div>
  
  <div>
    <a href="https://docs.google.com/folder/d/0B1nsC-ORopYIejhDYmdta3B0SGs/edit">https://docs.google.com/folder/d/0B1nsC-ORopYIejhDYmdta3B0SGs/edit</a>
  </div>
  
  <div>
  </div>
  
  <div>
    Una vez descargado el archivo, lo extraemos y accedemos a la carpeta que se generará. Si no ha instalado los drivers para acceder a su dispositivo, esta será la oportunidad, para lo cual ejecutamos install_drivers.bat, sin haber conectado el Kindle. Una vez finalizada la instalación de los drivers, conectamos el Kindle y esperamos a que el sistema reconozca el hardware y lo habilite. En Administrador de Dispositivos, podremos verificar que el dispositivo esta disponible y sin problemas. Quizás en el proceso sea necesario reiniciar su equipo, no se bien como funciona Windows en este sentido, por lo que esta parte del proceso dependerá de sus propios conocimientos del sistema, en mi caso uso GNU con Linux y el tema es mucho más simple que con Windows.
  </div>
  
  <div>
  </div>
  
  <div>
    Cuando los drivers estén habilitados, deberemos activar antes de comenzar la opción de instalar aplicaciones de otras fuentes, para lo cual en nuestro Kindle vamos a &#8220;Settings->More->Device&#8221; nos aseguramos que la opción “Allow Installation of Applications” este marcada en “ON”.
  </div>
  
  <div>
  </div>
  
  <div>
    Con lo anterior, su sistema debería ser capaz de reconocer su Kindle, por lo que procedemos a ejecutar run.bat. Cuando la aplicación se inicie, nos indicará que la tablet esta conectada con un mensaje similar al siguiente:
  </div>
  
  <div>
  </div>
  
  <div>
    <a href="http://www.ovalenzuela.com/wp-content/uploads/2016/02/b03a3-principal_kindle.png"><img border="0" src="http://www.ovalenzuela.com/wp-content/uploads/2016/02/b03a3-principal_kindle.png?w=300" height="254" width="320" /></a>
  </div>
  
  <div>
  </div>
  
  <div>
  </div>
  
  <div>
    Luego siguiendo las instrucciones de la aplicación, realizamos el Root permamente con la opción 2.
  </div>
  
  <div>
    Al finalizar, el sistema reiniciará la tablet y esta dispondrá con la aplicación Superuser, lo que podremos verificar en &#8220;Settings->More->Applications->All Applications&#8221; y deberá figurar la aplicación en cuestión, de ser así, entonces ya contamos con Root en nuestra tablet.
  </div>
  
  <div>
  </div>
  
  <div>
    <b>Instalar el Recovery</b>
  </div>
  
  <div>
    Una vez que hayamos verificado que el Kindle esta accesible, instalaremos el Recovery, como recomendación usaremos TWRP con la opción 3 y esperamos que el proceso finalice, es importante destacar que durante el proceso de instalación el sistema descargará la imagen del recovery desde Internet, así que deberemos disponer de Internet sin bloqueos ni proxy en nuestro equipo.
  </div>
  
  <div>
  </div>
  
  <div>
    <b>Instalar el FireFireFire</b>
  </div>
  
  <div>
    Cuando el proceso anterior haya finalizado, de una forma similar instalaremos el FireFireFire el cual una vez cargado, nos permitirá acceder al Recovery.
  </div>
  
  <div>
  </div>
  
  <div>
    <b>Ingresar en modo Recovery</b>
  </div>
  
  <div>
    Cuando el sistema se haya reiniciado y el proceso anterior haya finalizado, procederemos a apagar completamente el dispositivo en forma manual, luego lo volvemos a encender, y apenas el logo aparezca en pantalla, mantendremos el boton de encendido presionado hasta que se despliegue el menú y lo soltamos solo cuando el indicador se posicione en Recovery, de esta forma se iniciará TWRP.
  </div>
  
  <div>
  </div>
  
  <div>
    Una vez dentro del Recovery, nos vamos a la opción Wipe, y realizaremos un Wipe de cache, Dalvik y finalmente un Factory Reset que realiza un Wipe sobre data.
  </div>
  
  <div>
  </div>
  
  <div>
    <a href="http://www.ovalenzuela.com/wp-content/uploads/2016/02/71974-principal_twrp.png"><img border="0" src="http://www.ovalenzuela.com/wp-content/uploads/2016/02/71974-principal_twrp.png?w=300" height="186" width="320" /></a>
  </div>
  
  <div>
  </div>
  
  <div>
  </div>
  
  <div>
    Cuando el proceso anterior finalice y manteniendo siempre conectada la Tablet a nuestro pc, volvemos a la página principal y nos vamos a la opción Mount y montamos la unidad para que pueda estar disponible desde nuestro computador, una vez realizado esto, copiamos los archivos correspondientes a la Rom Cyanogenmod 10 (JellyBean) y las Google Apps a la raíz de la unidad. Al finalizar, demontamos la unidad de nuestro computador como lo haríamos con cualquier pendrive, y desactivamos el montaje en nuestra tablet, para luego volver al inicio (Home).
  </div>
  
  <div>
  </div>
  
  <div>
    <b>Copiamos los archivos de la ROM y el Google APPs</b>
  </div>
  
  <div>
    Como ya disponemos de los archivos necesarios copiados a nuestra Tablet, ejecutamos Install, seleccionamos la rom a instalar &#8220;cm-10-20121010-UNOFFICIAL-otter.zip&#8221; y cuando nos depliegue la ventana indicando que esta listo para flashear, presionamos la opción Add Zip para agregar &#8220;gapps-jb-20120726-signed.zip&#8221;, finalmente confirmamos y comenzará el flasheo de nuestra rom.
  </div>
  
  <div>
  </div>
  
  <div>
    Cuando termine, es de buena practica realizar otro Wipe desde la misma opción que se nos presenta, y luego presionamos sobre Reboot.
  </div>
  
  <div>
  </div>
  
  <div>
    Luego de unos minutos, dispondremos de nuestra Tablet con Jellybean lista para ser utilizada.
  </div>
  
  <div>
  </div>
  
  <div>
    <a href="http://www.ovalenzuela.com/wp-content/uploads/2016/02/d2665-principal_cyanogenmod.png"><img border="0" src="http://www.ovalenzuela.com/wp-content/uploads/2016/02/d2665-principal_cyanogenmod.png?w=292" height="320" width="311" /></a>
  </div>
  
  <div>
  </div>
  
  <div>
    Si esta guía le gusto o le resulto útil, compártela. Puedes copiar y distribuir esta guía, pero al menos tomate la molestia de citar la fuente original.
  </div>
  
  <div>
  </div>
</div>

<div>
  Publicado originalmente por Oscar Valenzuela en http://ovalenzuela.xpertians.com &#8211; Puede ser compartido y copiado libremente, mientras mantenga esta nota.
</div>