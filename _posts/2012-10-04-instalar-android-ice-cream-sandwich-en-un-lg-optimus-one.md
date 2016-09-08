---
id: 517
title: Instalar Android Ice Cream Sandwich en un LG Optimus One
date: 2012-10-04T19:09:00+00:00
author: ovalenzuela
layout: post
guid: https://ovalenzueladotcom.wordpress.com/2012/10/04/instalar-android-ice-cream-sandwich-en-un-lg-optimus-one
permalink: /2012/10/instalar-android-ice-cream-sandwich-en-un-lg-optimus-one.html
blogger_blog:
  - www.ovalenzuela.com
blogger_author:
  - Andrés Barrera
blogger_02f5be51301771664ae7c1c72bf29246_permalink:
  - 3635249074173371835
dsq_thread_id:
  - 3086968421
categories:
  - Android
  - Google
  - Hacks y Mods
---
<div>
</div>

<div>
  A continuación se describe el proceso de instalación y configuración de Cyanogenmod en un equipo Optimus One de LG. Esta ROM proveerá al equipo de la última versión disponible de Android ICS.
</div>

<div>
</div>

<div>
  <b>Requisitos de instalación</b>
</div>

<div>
  Para comenzar la instalación del Sistema Operativo Cyanogenmod, deberá tener instalado en su computador Android SDK (http://android.com). y en el caso que use Windows deberá además contar con los drivers USB para LG Optimus One P500,  que puede ser descargado desde el siguiente enlace: <a href="http://ur1.ca/ah89h">http://ur1.ca/ah89h</a>
</div>

<div>
</div>

<div>
  <b>Pasos para instalar Cyanogenmod en el terminal</b>
</div>

<div>
  <ul>
    <li>
      Active el depurador USB (presione sobre aplicaciones, luego sobre desarrollo y seleccione Depurador USB).
    </li>
    <li>
      Descargue el paquete GingerBreak para obtener privilegios de ROOT desde <a href="http://ur1.ca/ah89f">http://ur1.ca/ah89f</a> e instalelo, al finalizar seleccione la opción de Abrir.
    </li>
    <li>
      Luego de la Bienvenida presione aceptar y presione sobre la opción “Root Device” (Nota : Al termino , el dispositivo se reiniciara automáticamente).
    </li>
    <li>
      Espere a que el celular encienda, no interrumpa el proceso, aunque demore más de lo habitual.
    </li>
    <li>
      Conecte el dispositivo a algún computador vía cable USB. (Nota : Si usted está en Windows, debe tener los drivers USB para LG Optimus One P500).
    </li>
    <li>
      Confirme que el nivel de batería del celular sea 100% o cercano a este, de no ser así cargue la batería del celular antes de continuar.
    </li>
    <li>
      Descargue la imagen de Cynogenmod junto con los programas a utilizar en la instalación, para ello visite la URL <a href="http://ur1.ca/ah89p">http://ur1.ca/ah89p</a>.
    </li>
    <li>
      Descomprima los archivos.
    </li>
    <li>
      Ejecute las instrucciones que se encuentran detalladas en el archivo “paso1.txt” . 
    </li>
    <li>
      Para ejecutar en Windows las instrucciones del archivo utilice CMD (Command)
    </li>
    <li>
      Estas instrucciones describen el proceso de copia de la imagen Cynogenmod 9 al terminal, el instalador de Google play y abre la shell del celular en su computador.
    </li>
    <li>
      Ahora usando la Shell que abrió en el paso anterior, siga las instrucciones que se encuentran detalladas en el archivo “paso2.txt”
    </li>
    <li>
      El primer comando a utilizar nos inicia como usuario root en el dispositivo:
    </li>
  </ul>
</div>

<div>
  <i>         su</i>
</div>

<div>
  <ul>
    <li>
      En la pantalla del dispositivo, saldrá una ventana que nos solicita permisos para iniciar como root, coloque la opción “Permitir”.
    </li>
  </ul>
</div>

<div>
  <div>
    <a href="http://www.ovalenzuela.com/wp-content/uploads/2016/02/662d5-capturadepantallade2012-10-04125114.png"><img border="0" src="http://www.ovalenzuela.com/wp-content/uploads/2016/02/662d5-capturadepantallade2012-10-04125114.png?w=221" height="200" width="147" /></a>
  </div>
  
  <ul>
    <li>
      Ahora como root ejecute las instrucciones restantes del archivo “paso2.txt”.
    </li>
    <li>
      Al finalizar, en la shell escriba el comando:
    </li>
  </ul>
</div>

<div>
  <i>         </i><i>reboot recovery</i>
</div>

<div>
  <ul>
    <li>
      Se reiniciara el dispositivo y arrancará en modo Recovery.
    </li>
  </ul>
  
  <div>
    <a href="http://www.ovalenzuela.com/wp-content/uploads/2016/02/c6650-capturadepantallade2012-10-04125153.png"><img border="0" src="http://www.ovalenzuela.com/wp-content/uploads/2016/02/c6650-capturadepantallade2012-10-04125153.png?w=236" height="200" width="156" /></a>
  </div>
  
  <ul>
    <li>
      Dentro del modo Recovery puede desplazarse utilizando las teclas de volumen en el costado del teléfono, tanto hacia arriba como hacia abajo. Para confirmar, presione la tecla menú.
    </li>
    <li>
      Seleccione la opción “install zip from sdcard”
    </li>
    <li>
      Seleccione la opción “Choose zip from sdcard”
    </li>
  </ul>
  
  <div>
  </div>
  
  <div>
    <a href="http://www.ovalenzuela.com/wp-content/uploads/2016/02/cf361-capturadepantallade2012-10-0412253a52253a01.png"><img border="0" src="http://www.ovalenzuela.com/wp-content/uploads/2016/02/cf361-capturadepantallade2012-10-0412253a52253a01.png?w=220" height="200" width="162" /></a>
  </div>
  
  <ul>
    <li>
      Seleccione el zip que contiene el sistema operativo Cyanogenmod 9 y confirme con la tecla menú, no interrumpa el proceso durante la instalación.
    </li>
  </ul>
  
  <div>
    <a href="http://www.ovalenzuela.com/wp-content/uploads/2016/02/b39c0-capturadepantallade2012-10-0412253a52253a09.png"><img border="0" src="http://www.ovalenzuela.com/wp-content/uploads/2016/02/b39c0-capturadepantallade2012-10-0412253a52253a09.png?w=300" height="129" width="200" /></a>
  </div>
  
  <ul>
    <li>
      Seleccione el zip que contiene la aplicación de Google Play, no interrumpa el proceso.
    </li>
  </ul>
  
  <div>
    <a href="http://www.ovalenzuela.com/wp-content/uploads/2016/02/4147c-capturadepantallade2012-10-04125216.png"><img border="0" src="http://www.ovalenzuela.com/wp-content/uploads/2016/02/4147c-capturadepantallade2012-10-04125216.png?w=300" height="125" width="200" /></a>
  </div>
  
  <ul>
    <li>
      Vuelva al menú principal con la tecla volver.
    </li>
    <li>
      Seleccione la opción “Wipe”.
    </li>
    <li>
      Seleccione la opción “Wipe /data”.
    </li>
    <li>
      Seleccione la opción “Wipe cache”.
    </li>
  </ul>
  
  <div>
    <a href="http://www.ovalenzuela.com/wp-content/uploads/2016/02/ce211-capturadepantallade2012-10-04125219.png"><img border="0" src="http://www.ovalenzuela.com/wp-content/uploads/2016/02/ce211-capturadepantallade2012-10-04125219.png?w=208" height="200" width="138" /></a>
  </div>
  
  <ul>
    <li>
      Retroceda en el menú y seleccione la opción “Reboot system now”.
    </li>
    <li>
      Espere que cargue el nuevo sistema operativo (Nota :El primer arranque de sistema toma más tiempo de lo normal), no interrumpa el proceso.
    </li>
  </ul>
</div>

<div>
  <b>Actualizar Bandabase</b>
</div>

<div>
  Una vez instalado el sistema, notará que al iniciar este no tiene red, puesto que no se ha configurado la Bandabase para nuestro país.
</div>

<div>
</div>

<div>
  Requisitos
</div>

<div>
  <ol>
    <li>
      Un Optimus One con Cyanogenmod 9.0. 
    </li>
    <li>
      Un computador con Windows XP/7.
    </li>
    <li>
      Drivers USB para LG Optimus One instalados 
    </li>
  </ol>
</div>

<div>
</div>

<div>
  Actualizar la banda base vía LGMDP
</div>

<div>
  <ol>
    <li>
      Descargue la nueva banda base P500-v20G-baseband.7z. (Nota:Para descomprimir este archivo debe tener instalado previamente 7zip o WinRaR, ambos están en el archivo anteriormente descargado).
    </li>
    <li>
      Descomprima el archivo que contiene la nueva banda base.<a href="http://www.ovalenzuela.com/wp-content/uploads/2016/02/d4136-capturadepantallade2012-10-04125237.png"><img border="0" src="http://www.ovalenzuela.com/wp-content/uploads/2016/02/d4136-capturadepantallade2012-10-04125237.png?w=300" height="123" width="320" /></a>
    </li>
    <li>
      Ahora en el Optimus active el modo Debugging (Setings>Developer options y presione sobre Android debugging), y conéctenlo a su computador vía USB
    </li>
    <li>
      Vaya al Administrador de Dispositivos (clic derecho sobre Mi PC)
    </li>
    <li>
      Desactive la opción “LG Virtual Módem” o la opción correspondiente de Módem para el dispositivo LG, en el caso que aparezca.
    </li>
    <li>
      Ahora abra el programa LGMDP , seleccione  el puerto, luego presione Connect.
    </li>
    <li>
      Donde dice IMAGE, seleccione la carpeta en la cual descomprimió el archivo que contiene la Baseband. Varias alertas se mostrarán, ignórelas.<a href="http://www.ovalenzuela.com/wp-content/uploads/2016/02/f0d18-capturadepantallade2012-10-04125240.png"><img border="0" src="http://www.ovalenzuela.com/wp-content/uploads/2016/02/f0d18-capturadepantallade2012-10-04125240.png?w=300" height="159" width="200" /></a>
    </li>
    <li>
      Ahora cierre la ventana, presione en Download y deje al sistema ejecutar el proceso.
    </li>
    <li>
      Ahora debe esperar. (Nota:No desconecte el dispositivo móvil o cancele la operación hasta que el software indique “Descarga Completa”) (Nota2:Si el software en el paso que se reinicia e intenta conectarse con el dispositivo móvil tarda por sobre los 100 segundos, desactive y active la opción para depurar por USB manualmente en el terminal) en el terminal.
    </li>
    <li>
      Cuando diga en el computador “DOWNLOAD COMPLETE”, se reiniciará el teléfono. Espere que el sistema este listo y verifique que es posible generar llamadas al 103 u otro número gratuito de su operador.
    </li>
  </ol>
</div>

<div>
  <a href="http://www.ovalenzuela.com/wp-content/uploads/2016/02/bcd35-capturadepantallade2012-10-04124937.png"><img border="0" src="http://www.ovalenzuela.com/wp-content/uploads/2016/02/bcd35-capturadepantallade2012-10-04124937.png?w=300" height="246" width="320" /></a>
</div>

<div>
</div>

<div>
  Publicado originalmente por Oscar Valenzuela en http://ovalenzuela.xpertians.com &#8211; Puede ser compartido y copiado libremente, mientras mantenga esta nota.
</div>