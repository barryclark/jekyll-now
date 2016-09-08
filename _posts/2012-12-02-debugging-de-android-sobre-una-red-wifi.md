---
id: 473
title: Debugging de Android sobre una red Wifi
date: 2012-12-02T21:17:00+00:00
author: ovalenzuela
layout: post
guid: https://ovalenzueladotcom.wordpress.com/2012/12/02/debugging-de-android-sobre-una-red-wifi
permalink: /2012/12/debugging-de-android-sobre-una-red-wifi.html
blogger_blog:
  - www.ovalenzuela.com
blogger_author:
  - Andrés Barrera
blogger_02f5be51301771664ae7c1c72bf29246_permalink:
  - 8644647794443005978
categories:
  - Android
  - Google
---
<div>
  <a href="http://www.ovalenzuela.com/wp-content/uploads/2016/02/d6106-unnamed.jpg"><img border="0" height="320" src="http://www.ovalenzuela.com/wp-content/uploads/2016/02/d6106-unnamed.jpg?w=180" width="190" /></a>
</div>

<div>
  <span>Varias personas me han manifestado la molestia que resulta producto de que algunos dispositivos no permiten utilizar el USB Debugging al momento de desarrollar aplicaciones, o que ciertas ROMs customizadas no permiten acceder vía USB para utilizar la herramienta ADB. Para estos casos, así como para quienes no gustan de portar cables, existe una espectacular herramienta llamada ADB Wifi, la que con solo conectar el dispositivo a una red wifi, permite vía la red acceder al ambiente de depuración.</span>
</div>

<div>
  <span><br /></span>
</div>

<div>
  <span>El procedimiento es sencillo, solo debemos instalar la aplicación en el equipo con el cual trabajaremos, conectar el mismo a la misma red wifi a la cual esta conectado nuestro pc, luego en nuestro móvil activamos la aplicación y nos indicara la dirección IP a la cual debemos conectarnos. Entonces, solo necesitaremos en nuestro equipo ejecutar el comando adb connect xxx.xxx.xxx.xxx reemplazando las xxx por la dirección indicada. Si estamos bajo un ambiente GNU/Linux se podrá ejecutar como ./adb y con los mismos parámetros.</span>
</div>

<div>
  <span><br /></span>
</div>

<div>
  <span>Finalmente, habiendo habilitado LogCat en nuestro ambiente de desarrollo, se comenzarán a desplegar los mensajes del sistema.</span>
</div>

<div>
  <span><br /></span>
</div>

<div>
  <a href="http://www.ovalenzuela.com/wp-content/uploads/2016/02/57845-descarga.png"><img border="0" height="320" src="http://www.ovalenzuela.com/wp-content/uploads/2016/02/57845-descarga.png?w=300" width="320" /></a>
</div>

<div>
  <span><br /></span>
</div>

<div>
  Publicado originalmente por Oscar Valenzuela en http://ovalenzuela.xpertians.com &#8211; Puede ser compartido y copiado libremente, mientras mantenga esta nota.
</div>