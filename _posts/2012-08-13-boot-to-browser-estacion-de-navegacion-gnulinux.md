---
id: 539
title: 'Boot to Browser: Estación de Navegación GNU/Linux'
date: 2012-08-13T04:55:00+00:00
author: ovalenzuela
layout: post
guid: https://ovalenzueladotcom.wordpress.com/2012/08/13/boot-to-browser-estacion-de-navegacion-gnulinux
permalink: /2012/08/boot-to-browser-estacion-de-navegacion-gnulinux.html
blogger_blog:
  - www.ovalenzuela.com
blogger_author:
  - Andrés Barrera
blogger_02f5be51301771664ae7c1c72bf29246_permalink:
  - 3053225780189341290
categories:
  - GNU con Linux
  - Google
---
<div align="justify">
</div>

<div align="justify">
</div>

<div align="justify">
</div>

<div align="justify">
</div>

<div align="justify">
</div>

<div align="justify">
  <span>En muchos casos me ha tocado ver, que surge la necesidad de contar con estaciones de trabajo que solo permitan navegar, es decir, que al encender solo parta el navegador sin muchas otras cosas, un concepto conocido como Boot to Browser o al spanglish, iniciar y cargar el navegador.</span>
</div>

<div align="justify">
  <span><span>Para contar con una maquina que cumpla esta función, deberemos tener instalada una maquina como cualquiera, con el sistema operativo GNU/Linux del sabor que se quiera, por supuesto, en mi caso usaré un Centos 6.0 con un kernel modificado, pero ahí ven ustedes que prefieren usar.</span></span>
</div>

<div align="justify">
</div>

<div align="justify">
  <span><span><b>PASO 1:</b></span></span>
</div>

<div align="justify">
  <span><span>Lo primero entonces, es instalar nuestra distribución favorita al equipo, es recomendable que el equipo destino tenga un hardware decente, considerando que HTML5 ayuda, pero no tanto.</span></span>
</div>

<div align="justify">
</div>

<div align="justify">
  <span><span><b>PASO 2:</b></span></span>
</div>

<div align="justify">
  <span><span>Luego de instalado, deberemos crear un lanzador de aplicaciones, este lanzador se encargará de iniciar nuestras aplicaciones y el servidor X, sin iniciar el gestor gráfico, para esto deberemos crear en /usr/local/bin/ el archivo launch con el siguiente contenido:</span></span>
</div>

<div align="justify">
  <span><span>nano /usr/local/bin/launch</span></span>
</div>

<div align="justify">
  <span><span>#!/bin/bash</span></span>
</div>

<div align="justify">
  <span><span>rm ~/.xinitrc</span></span>
</div>

<div align="justify">
  <span><span>echo exec $1 > ~/.xinitrc</span></span>
</div>

<div align="justify">
  <span><span>startx</span></span>
</div>

<div align="justify">
  <span><span>Luego otorgamos los permisos necesarios:</span></span>
</div>

<div align="justify">
  <span><span>chmod +x /usr/local/bin/launch</span></span>
</div>

<div align="justify">
</div>

<div align="justify">
  <span><span><b>PASO 3:</b></span></span>
</div>

<div align="justify">
  <span><span>Luego, en caso de que hayamos habilitado el inicio de sesión gráfica, deberemos configurar inittab para que el runlevel por defecto sea 3, deberemos entonces, buscar una linea similar a esta:</span></span>
</div>

<div align="justify">
  <span><span>id:5:initdefault:</span></span>
</div>

<div align="justify">
  <span><span>y cambiarla así:</span></span>
</div>

<div align="justify">
  <span><span>id:3:initdefault:</span></span>
</div>

<div align="justify">
  <span><span>Esto, cambiara el modo de funcionamiento de nuestro sistema e iniciaría solo el modo consola en multiusuario. Este cambio lo realizamos para probar nuestra configuración antes de dejarlo listo, claro que existen muchas maneras para probar, pero la mas simple es aplicar estos cambios y reiniciar el equipo.</span></span>
</div>

<div align="justify">
</div>

<div align="justify">
  <span><span><b>PASO 4:</b></span></span>
</div>

<div align="justify">
  <span><span>Al iniciar veremos que el equipo inicia solo en modo consola, nos logeamos con el usuario elegido y tipeamos lo siguiente: launch firefox</span></span>
</div>

<div align="justify">
  <span><span>Si todo ha salido bien, entonces tendremos disponible nuestro navegador favorito en un modo donde solo se despliega esta aplicacion y sin menus, ventanas, ni cosas adicionales. Como siempre para volver al modo normal, podremos usar ctr+alt+f1 donde nos llevara a una nueva consola.</span></span>
</div>

<div align="justify">
</div>

<div align="justify">
  <span><span><b>PASO 5:</b></span></span>
</div>

<div align="justify">
  <span><span>Si ya hicimos la prueba, entonces nuestro archivo .xinitrc sera cambiado para tener el comando que directamente iniciará nuestro X con el navegador, por lo que ahora solo nos resta modificar nuevamente el sistema, para que inicie solo con estos cambios, lo que se logra modificando nuevamente el archivo inittab, para volver a su configuración original:</span></span>
</div>

<div align="justify">
  <span><span>id:3:initdefault:</span></span>
</div>

<div align="justify">
  <span><span>Vuelve a ser así:</span></span>
</div>

<div align="justify">
  <span><span>id:5:initdefault:</span></span>
</div>

<div align="justify">
  <span><span>Y finalmente modificamos la linea similar a esta:</span></span>
</div>

<div align="justify">
  <span><span>x:5:respawn:/etc/X11/prefdm -nodaemon</span></span>
</div>

<div align="justify">
  <span><span>Por esta:</span></span>
</div>

<div align="justify">
  <span><span>x:5:once:/bin/su &#8211; &#8212; root -l -c &#8216;/usr/bin/startx /dev/null 2>&1&#8217;</span></span>
</div>

<div align="justify">
  <span><span>Cuando ya esto este listo, reiniciamos nuestro equipo y veremos iniciar nuestro navegador.</span></span>
</div>

<div align="justify">
  <span><span>Un aspecto importante, es que estamos utilizando para pruebas y configuración el usuario root, lo cual es claramente NO RECOMENDABLE, por temas de seguridad. Entonces, se sugiere utilizar un usuario con menos privilegios, para esto deberemos ingresar a la shell del usuario en modo init 3 como en el paso 4 y ejecutar el comando launch firefox para que configure el archivo .xinitrc, luego cambiaremos en el paso 5 el nombre de usuario por root y el sistema quedara listo para ser utilizado como Boot to Browser con privilegios del usuario.</span></span>
</div>

<div align="justify">
</div>

<div align="justify">
  <span><span><b>PASO 6:</b></span></span>
</div>

<div align="justify">
  <span><span>Otro tema interesante de cambiar, por el simple hecho quizas de darle elegancia, es eliminar el mensaje que nos indica Firefox sobre restaurar la antigua sesión, para esto deberemos una vez iniciado Firefox ingresar en la barra de direcciones &#8220;about:config&#8221;, lo que nos permitirá ingresar a la configuración del navegador, luego usando el filtro buscamos el valor para &#8220;browser.sessionstore.resume_from_crash&#8221; que deberá estar en true, lo cambiamos haciendo doble clic sobre la linea, luego cerramos el navegador en &#8220;archivo >salir&#8221; y reiniciamos. De esta forma no preguntara cada vez que iniciemos, si queremos restaurar la sesión anterior.</span></span>
</div>

<div align="justify">
</div>

<div align="justify">
  <span><span><b>PASO 7:</b></span></span>
</div>

<div align="justify">
  <span><span>Finalmente si deseamos deshabilitar la opción de que cuando alguien presione &#8220;ctrl+alt+supr&#8221; el equipo se reinicie, después de todo nosotros aún podemos ingresar por consola y reiniciarlo, podremos editar nuevamente nuestro inittab para deshabilitar este comando:</span></span>
</div>

<div align="justify">
  <span><span>ca::ctrlaltdel:/sbin/shutdown -t3 -r now</span></span>
</div>

<div align="justify">
  <span><span>Por algo similar a esto:</span></span>
</div>

<div align="justify">
  <span><span>ca::ctrlaltdel:/bin/echo &#8220;CTRL-ALT-DEL is disabled&#8221;</span></span>
</div>

<div align="justify">
  <span><span>Y decimos a init que reinicie con:</span></span>
</div>

<div align="justify">
  <span><span>init q</span></span>
</div>

<div align="justify">
</div>

<div align="justify">
  <span><span>Happy Hacking!</span></span>
</div>

<div>
  Publicado originalmente por Oscar Valenzuela en http://ovalenzuela.xpertians.com &#8211; Puede ser compartido y copiado libremente, mientras mantenga esta nota.
</div>