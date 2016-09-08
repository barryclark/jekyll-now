---
id: 252
title: Actualizar Alcatel OneTouch Fire de @MovistarChile a FirefoxOS 1.3
date: 2014-02-24T22:00:00+00:00
author: ovalenzuela
layout: post
guid: https://ovalenzueladotcom.wordpress.com/2014/02/24/actualizar-alcatel-onetouch-fire-de-movistarchile-a-firefoxos-1-3
permalink: /2014/02/actualizar-alcatel-onetouch-fire-de-movistarchile-a-firefoxos-1-3.html
blogger_blog:
  - www.ovalenzuela.com
blogger_author:
  - Andrés Barrera
blogger_02f5be51301771664ae7c1c72bf29246_permalink:
  - 4585675047444901417
dsq_thread_id:
  - 3086968136
categories:
  - FirefoxOS
  - Google
  - Hacks y Mods
  - Opinión
---
Hace tiempo me había interesado el sistema operativo el sistema operativo FirefoxOS, sin embargo la falta de disponibilidad de equipos y los problemas que tienen el emulador me habían impedido &#8220;meter mano&#8221;.

Hace poco, en Chile la empresa Movistar lanzó el primer equipo con FirefoxOS y aunque era de gama baja, su precio de solo $29.990 (60 dolares aprox) hacía que se viera como un equipo prometedor, por lo que obviamente compré uno apenas estuvo disponible para ver que tal funcionaba. Lamentablemente mi experiencia no fue la mejor, un sistema lento y un comportamiento plagado de lags y fallas me llevaban a pensar que el sistema aún estaba muy inmaduro. Leyendo y conversando con algunos amigos, llegué a la conclusión de que aunque el equipo era bueno considerando que es gama baja, concluí que el problema residía en la versión del sistema operativo, en este caso el 1.1 y buscando por Internet encontré la forma de actualizar el sistema operativo a la versión 1.3.

Como siempre debo recalcar que aunque muchos publican y republican contenidos, en mi caso yo antes de publicar cualquier cosa, incluso recomendaciones de productos, siempre y por regla solo lo hago en base a mi experiencia, lo que ofrece cierta garantía en mi practica y a la vez, una dificultad puesto que mi experiencia pudiera no ser un procedimiento estándar, y por tanto, el mismo proceso para otros casos pueden cambiar. Así y entonces, como siempre la advertencia es: **usted es el único responsable** de lo que hace a sus equipos, por lo que antes de proceder se recomienda, leer, releer, respaldar y verificar todo antes de hacer cualquier cosa, y aún así es su responsabilidad lo que suceda con su terminal. Obviamente intentaré ayudarle en cualquier caso, pero no siempre podré estar disponible.

Advertidos, manos a la obra para reemplazar el sistema operativo del equipo. El procedimiento, a pesar de lo que pudiéramos imaginar, es bastante similar a flashear cualquier Android, de hecho, usaremos las mismas herramientas ADB y Fastboot, los que además están incluidos en el archivo de la imagen.

Por supuesto, este procedimiento es para GNU/Linux y si usas Winshit o Mac, pues mala suerte, no voy a estar ayudando a resolver problemas que sufres por gusto con sistemas operativos técnicamente inferiores o que solo buscan dinero, así que si es tu caso, o migras o pagas un soporte 😉

Para comenzar, descargamos el siguiente archivo:  
`<br /><a href="http://go.gnu.cl/42KiLD" target="_blank" title="http://go.gnu.cl/42KiLD">http://go.gnu.cl/42KiLD</a>`

Luego se descomprime:  
`<br />tar xvzf images-hamachi-v1.3.tgz`

Entonces, en el equipo debemos activar en el menú desarrollador, las opciones Depuración Remota y Consola Habilitada. Luego, para iniciar el proceso de grabación será necesario apagar el equipo, retirar la batería al menos 10 segundos y antes de ponerla nuevamente mantener presionados los botones &#8220;Volumen Abajo&#8221; y &#8220;Encendido&#8221; al mismo tiempo y sin soltarlos al menos 10 segundos. En la pantalla solo veremos el logo de Alcatel, así que contamos los segundos y soltamos.

[<img alt="capture-20140122-113334" class="alignnone size-full wp-image-2529" src="http://ovalenzuela.com/wp-content/uploads/2014/02/capture-20140122-113334.png" height="293" width="777" />](http://ovalenzuela.com/wp-content/uploads/2014/02/capture-20140122-113334.png)

Con este procedimiento, habremos puesto el equipo en modo Bootloader con Fastboot activado, por lo que solo resta usar las herramientas para probar (siempre como root). Antes de continuar, será necesario asignar los permisos necesarios y ejecutar el proceso:  
`<br /># chmod +x fastboot*`

Verificamos que el equipo sea reconocido:  
`<br /># ./fastboot devices`

Debería indicarnos algo similar a esto:  
`<br /># ./fastboot devices<br />MSM7627A fastboot`

Verificado esto, continuamos, de lo contrario debemos volver intentar que el equipo inicie en Bootloader con el Fastboot activado.

Para quemar la nueva ROM, ejecutamos lo siguiente:  
`<br /># ./fastboot flash boot boot.img<br /># ./fastboot flash userdata userdata.img<br /># ./fastboot flash system system.img<br /># ./fastboot flash recovery recovery.img<br /># ./fastboot erase cache<br /># ./fastboot reboot`

Esperamos unos minutos a que el equipo inicie y listo! Nuestro equipo de &#8220;30 lucas&#8221; corriendo FirefoxOS 1.3 y a &#8220;toda nalga&#8221;.