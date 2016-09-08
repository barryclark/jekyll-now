---
id: 514
title: Instalar Android Jelly Bean en un Motorola Defy
date: 2012-10-05T00:40:00+00:00
author: ovalenzuela
layout: post
guid: https://ovalenzueladotcom.wordpress.com/2012/10/05/instalar-android-jelly-bean-en-un-motorola-defy
permalink: /2012/10/instalar-android-jelly-bean-en-un-motorola-defy.html
blogger_blog:
  - www.ovalenzuela.com
blogger_author:
  - Andrés Barrera
blogger_02f5be51301771664ae7c1c72bf29246_permalink:
  - 504412628920911343
dsq_thread_id:
  - 4882790045
categories:
  - Android
  - Google
  - Hacks y Mods
---
<div>
  <a href="http://www.ovalenzuela.com/wp-content/uploads/2016/02/6e34d-cyanogenmod-10.jpg"><img border="0" height="108" src="http://www.ovalenzuela.com/wp-content/uploads/2016/02/6e34d-cyanogenmod-10.jpg?w=300" width="200" /></a>
</div>

<div>
  Como habrán leído en blogs y sitios de noticias en Internet, Google ha publicado recientemente su última versión de Android conocida como Jelly Bean, sin embargo y para lamento de muchos, solo los equipos de gama alta recibirán esta actualización y para quienes no posean uno de estos modelos, solo podrían obtener una versión de Jelly Bean gracias a los cocineros de roms del equipo de Cyanogenmod y sus roms derivadas.
</div>

<div>
  Ahora bien, buscando por Internet encontramos lo necesario para instalar Jelly Bean en un equipo de gama media o baja, de los que ya son considerados como antiguos y como ejemplo ahora utilizaremos un Motorola Defy de Movistar Chile, cuyo proceso de instalación se describe a continuación, sin embargo y como siempre, debemos acotar que:
</div>

<div>
  <b><br /></b>
</div>

<div>
  <b>CARGA TU CELULAR AL 100% ANTES DE CONTINUAR, SI NO TIENES SUFICIENTE CARGA, PUEDES DAÑAR TU CELULAR PARA SIEMPRE.</b>
</div>

<div>
  <b>ES TU ABSOLUTA RESPONSABILIDAD LO QUE HACES CON TU EQUIPO, YO NO TE DIGO QUE HACER Y QUE NO HACER, NO SOY TU PAPITO.</b>
</div>

<div>
</div>

<div>
  Antes de comenzar, declaramos que esta guía esta orientada exclusivamente a usuarios que usan sistemas operativos GNU/Linux, aunque es posible portar todo a sistemas operativos técnicamente inferiores (inferiores por su inestabilidad, problemas de configuración, problemas de versiones, problemas con permisos, u otros miles de posibles problemas), sin embargo de usarlo, será un tema que cada cual debe revisar, puesto que no es de nuestro interés prestar soporte a problemas originados en sistemas operativos que no sean GNU/Linux.
</div>

<div>
</div>

<div>
  Así entonces, procederemos a obtener los archivos necesarios, estos se encuentran disponibles listos para ser instalados. Se recomienda ejecutar los comandos como ROOT, puesto que algunos requieren ejecución con privilegios especiales.
</div>

<div>
</div>

<div>
  Para obtener los archivos procederemos a descargar y descomprimirlos desde el repositorio disponible en Google Drive:
</div>

<div>
  <ul>
    <li>
      <span>CM10_defy.tgz </span><a href="http://ur1.ca/ah9i0">http://ur1.ca/ah9i0</a>
    </li>
    <li>
      <span>CM7_defy.tgz </span><a href="http://ur1.ca/ah9i1">http://ur1.ca/ah9i1</a>
    </li>
    <li>
      <span>FroyoMovistar.tgz </span><a href="http://ur1.ca/ah9i3">http://ur1.ca/ah9i3</a>
    </li>
    <li>
      <span>SndInitDefy_2.0.apk </span><a href="http://ur1.ca/ah9i4">http://ur1.ca/ah9i4</a>
    </li>
    <li>
      <span>DefyRoot.tar.gz </span><a href="http://ur1.ca/ah9i5">http://ur1.ca/ah9i5</a>
    </li>
    <li>
      <span>sbf_flash </span><a href="http://ur1.ca/ah9i9">http://ur1.ca/ah9i9</a>
    </li>
  </ul>
</div>

<div>
  Una vez descargados, continuaremos el proceso.<br />Lo primero que cabe mencionar, es que esta guía fue desarrollada utilizando como base un celular con la versión original de Movistar Chile, si la has modificado o tienes instalada otra diferente, entonces será necesario instalar la ROM original ya probada. Si por el contrario ya la tienes instalada, entonces puedes saltar al paso 2.
</div>

<div>
</div>

<span><b>Paso 1.- Instalar la ROM original de Movistar Chile con Froyo:</b></span>  
<span>Apagamos en equipo, y lo reiniciamos en modo BootLoader. Para esto, luego de apagarlo, lo encendemos manteniendo presionado los botones de encendido y subir volumen, hasta que aparezca un mensaje similar a este:</span>  
<span><br /></span> 

<div>
  <a href="http://www.ovalenzuela.com/wp-content/uploads/2016/02/f4f4e-bootloader.jpg"><img border="0" height="200" src="http://www.ovalenzuela.com/wp-content/uploads/2016/02/f4f4e-bootloader.jpg?w=280" width="185" /></a>
</div>

<span><br /></span><span>A continuación, procedemos a &#8220;flashear&#8221; la ROM.</span> 

<div>
  <i>chmod +x sb_flash</i>
</div>

<div>
  <div>
    <i>tar xvzf FroyoMovistar.tgz</i>
  </div>
  
  <div>
    <i>cd FroyoMovistar/</i>
  </div>
  
  <div>
    <div>
      <i>tar xvzf JORLA_U3*.sbf.tgz</i>
    </div>
    
    <div>
      <i>../sb_flash JORLA_U3*.sbf</i>
    </div>
    
    <div>
      <i>cd ../</i>
    </div>
    
    <div>
    </div>
    
    <div>
      <b>Paso 2.- Convertirnos en ROOT e instalar SuperSU</b>
    </div>
    
    <div>
      <div>
      </div>
      
      <div>
        <i>tar xvzf DefyRoot.tar.gz</i>
      </div>
      
      <div>
        <i>cd DefyRoot/</i>
      </div>
      
      <div>
        <i>./RootDefy.sh</i>
      </div>
      
      <div>
        <i>./adblinux reboot</i>
      </div>
      
      <div>
        <i>../</i>
      </div>
      
      <div>
      </div>
      
      <div>
        <b>Paso 3.- Instalar Second Init</b>
      </div>
      
      <div>
      </div>
      
      <div>
        <i>DefyRoot/adblinux install SndInitDefy_2.0.apk</i>
      </div>
      
      <div>
      </div>
      
      <div>
        <a href="http://www.ovalenzuela.com/wp-content/uploads/2016/02/ba739-defy_2ndinit.jpg"><img border="0" height="200" src="http://www.ovalenzuela.com/wp-content/uploads/2016/02/ba739-defy_2ndinit.jpg?w=169" width="112" /></a>
      </div>
      
      <div>
        Con el comando anterior, se ha instalado el APK del aplicativo, acto seguido deberemos ejecutarlo desde el menú de aplicaciones y ejecutar la opción que descarga e instala el Recovery y otros componentes. Para esto, basta con presionar el botón &#8220;Install 2dnInit Recovery&#8221;, luego ejecutamos que la versión a instalar sea la última, en nuestro caso la versión 1.07. Luego esperamos a que se descargue y se inicie la instalación. Durante el proceso el SuperSU solicitará verificación para otorgar los permisos de ROOT necesarios, por tanto presionamos &#8220;Permitir&#8221; las 2 o más veces que se nos solicite. Una vez que se finalice la instalación, nos aparecerá brevemente un mensaje de &#8220;Succesfull&#8221; y procederemos a copiar los archivos necesarios a la SDCard.
      </div>
      
      <div>
      </div>
      
      <div>
        <b>Paso 4.- Copiar Cyanogenmod</b>
      </div>
      
      <div>
        Fíjese que en el mismo directorio esta disponible la versión Cyanogenmod 7, que se conoce por ser más estable, sin embargo incorpora Android Gingerbread y por tanto, esta algo desactualizada. Por el contrario, nosotros en el ejemplo usaremos una versión mucho más inestable, pero que se encuentra más actualizada, nos referimos a Jelly Bean.
      </div>
      
      <div>
      </div>
      
      <div>
        <i>tar xvzf CM10_defy.tgz</i>
      </div>
      
      <div>
        <i>cd CM10/</i>
      </div>
      
      <div>
        <i>DefyRoot/adblinux push CM10/CM10-120812-NIGHTLY-Defy.zip /sdcard/</i>
      </div>
      
      <div>
        <i>DefyRoot/adblinux push CM10/gapps-<a href="tel:20111128" target="_blank">20111128</a>.zip /sdcard/</i>
      </div>
      
      <div>
      </div>
      
      <div>
        Con esto, ya tendremos disponibles los archivos necesarios en nuestra SDCard, y por tanto, podremos proceder con la instalación.
      </div>
      
      <div>
      </div>
      
      <div>
      </div>
      
      <div>
        <b>Paso 5.- Ingresar al Custom Recovery instalado</b>
      </div>
      
      <div>
        <span>Para acceder al Recovery que recién instalamos, deberemos apagar el celular en forma manual. Una vez realizada esta acción, lo volvemos a encender, poniendo atención al color del led que esta en la parte superior de la pantalla, cuando este destelle en color azul, entonces apretaremos el boto de &#8220;volumen abajo&#8221; 1 vez, para ingresar a &#8220;Recovery&#8221;.</span>
      </div>
      
      <div>
        A continuación, podremos navegar utilizando los botones de volumen de audio y confirmaremos nuestra selección con el botón de encendido.
      </div>
      
      <div>
        Una vez en el menú, seleccionaremos la opción &#8220;Recovery&#8221; y confirmamos con el botón de encendido. Luego, nuevamente seleccionamos &#8220;Custom Recovery&#8221; y volvemos a confirmar. Con esto cargará un nuevo menú de opciones, donde marcaremos &#8220;Wipe data/factory reset&#8221; para limpiar los registros antiguos en nuestro celular y esperamos a que se nos indique el término del proceso con el mensaje &#8220;Data wipe complete&#8221;. Con estos pasos, ya tendremos listo nuestro celular para instalar CyanogenMod.
      </div>
      
      <div>
        <a href="http://www.ovalenzuela.com/wp-content/uploads/2016/02/5ce35-cwmreco.png"><img border="0" src="http://www.ovalenzuela.com/wp-content/uploads/2016/02/5ce35-cwmreco.png" /></a>
      </div>
      
      <div>
      </div>
      
      <div>
        En el mismo menú, seleccionaremos la opción &#8220;install zip from sdcard&#8221;, confirmamos y nos aparece un submenú con diferentes opciones, donde la que nos interesa es &#8220;chose zip from sdcard&#8221;. Al seleccionarla y confirmar, podremos navegar en el directorio de nuestra tarjeta sd, en busca del archivo a &#8220;flashear&#8221;, en este caso, seleccionamos CM10-120812-NIGHTLY-Defy.zip y confirmaremos con el botón de encendido. El proceso puede demorar bastante, no lo interrumpas, no apagues el celular, simplemente déjalo trabajar. Al finalizar el proceso, repetiremos las acciones anteriores, pero en este caso seleccionamos el archivo gapps-<a href="tel:20111128" target="_blank">20111128</a>.zip.
      </div>
      
      <div>
        Cuando todo esto haya acabado, podremos volver con la opción &#8220;Go Back&#8221; y en la pantalla principal, confirmaremos sobre la opción &#8220;Reboot System Now&#8221;, lo que reiniciará nuestro equipo. Esperamos a que el sistema reinicie, lo que puede llevar bastante tiempo, incluso más de 15 minutos, jamás apagar o mover el celular, simplemente déjelo trabajar. Al iniciar, tendremos nuestro celular con Jelly Bean corriendo.
      </div>
      
      <div>
      </div>
      
      <div>
        <b>Paso 6.- Corregir problema de alertas de teclado</b>
      </div>
      
      <div>
        El equipo al iniciar mostrará en pantalla varios problemas con respecto al servicio del teclado (KEYBOARD), simplemente daremos aceptar y realizamos la configuración inicial como si tratará de cualquier otro celular, teniendo en cuenta que el teclado no funciona hasta ahora, por tanto aquellos campos donde es necesario escribir, los saltamos y más tarde corregimos el problema.
      </div>
      
      <div>
        Luego que hayamos accedido al sistema, y a pesar de que los mensajes continúen, ejecutaremos la instalación del Hacker Keyboard para reemplazar al Keyboard de Android que es el que tiene problemas:
      </div>
      
      <div>
      </div>
      
      <div>
        <i>DefyRoot/adblinux install CM10/hackerskeyboard-v1034rc1.apk</i>
      </div>
      
      <div>
      </div>
      
      <div>
        Al finalizar la instalación, vamos a &#8220;Ajustes del Sistema&#8221;>&#8221;Idioma y entrada de texto&#8221; y seleccionamos el teclado Hacker&#8217;s Keyboard en la lista de Teclados y Métodos de entrada. Finalmente, modificamos el teclado predeterminado y cambiamos a Hacker&#8217;s Keyboard. Con esto, el problema del teclado quedará solucionado y podremos trabajar tranquilos.
      </div>
      
      <div>
      </div>
      
      <div>
        <b>Paso 7.- Cambiar el Baseband para Chile</b>
      </div>
      
      <div>
        Para terminar, deberemos cambiar el Baseband para que se ajuste con Chile, para lo cual vamos a &#8220;Ajustes del Sistema&#8221;>&#8221;Opciones Avanzadas&#8221;>&#8221;Baseband selection&#8221; donde configuraremos las 3 opciones como &#8220;América&#8221;, &#8220;Argentina&#8221; y finalmente optaremos por la Baseband de &#8220;Claro 3.4.2-107-9&#8221;. Damos en aceptar, y decimos que &#8220;si&#8221; queremos reiniciar, el equipo reiniciará y ya podremos disfrutar de red en nuestro equipo. Importante es que aún deberemos configurar los APNs para navegar, pero eso es harina de otro saco y pueden buscarlo ustedes en San Google sin necesidad de mayor conocimiento.
      </div>
      
      <div>
      </div>
      
      <div>
        Espero que el proceso se entienda y les guste, en lo personal Jelly Bean funciona espectacular, y es posible dejar corriendo el celular con una velocidad de procesador muy superior a la original, por lo que podremos jugar tranquilamente y sacar el jugo a nuestro equipo.
      </div>
      
      <div>
      </div>
    </div>
  </div>
  
  <div>
  </div>
</div>

<div>
  Publicado originalmente por Oscar Valenzuela en http://ovalenzuela.xpertians.com &#8211; Puede ser compartido y copiado libremente, mientras mantenga esta nota.
</div>