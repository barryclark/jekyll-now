---
id: 466
title: Mouse Mad Catz Cyborg R.A.T 3 en Fedora
date: 2013-03-03T22:47:00+00:00
author: ovalenzuela
layout: post
guid: https://ovalenzueladotcom.wordpress.com/2013/03/03/mouse-mad-catz-cyborg-r-a-t-3-en-fedora
permalink: /2013/03/mouse-mad-catz-cyborg-r-a-t-3-en-fedora.html
blogger_blog:
  - www.ovalenzuela.com
blogger_author:
  - Andrés Barrera
blogger_02f5be51301771664ae7c1c72bf29246_permalink:
  - 1582625068597792528
dsq_thread_id:
  - 4939070650
categories:
  - GNU con Linux
  - Google
  - Opinión
---
<div>
  <a href="http://www.ovalenzuela.com/wp-content/uploads/2016/02/9ddd2-r3_4.jpg"><img border="0" height="200" src="http://www.ovalenzuela.com/wp-content/uploads/2016/02/9ddd2-r3_4.jpg?w=300" width="200" /></a><span>Bueno, uno siempre usa más que todo la consola, sin embargo en muchas ocasiones se hace en extremo necesario contar con un buen mouse. Yo estaba usando un Mouse Inalámbrico HP, sin embargo el tema de que te dejase parado cuando se le agotaba la batería era realmente fastidioso. Muchas veces en los peores momentos se quedo sin funcionar.</span>
</div>

<div>
  <span>Por esto, decidí comprar un mouse con cable, uno de buena marca, sin embargo en menos de 1 mes, se volvió inestable y era muy difícil controlarlo al memento de necesitar crear diagramas de casos de uso y cosas por el estilo, por lo que consideré que haber invertido $15.000 en ese mouse, algo así como 30 dolares, fue una verdadera perdida de dinero y tiempo.</span>
</div>

<div>
  <a href="http://www.ovalenzuela.com/wp-content/uploads/2016/02/1b798-rat-3.jpg"><img border="0" height="200" src="http://www.ovalenzuela.com/wp-content/uploads/2016/02/1b798-rat-3.jpg?w=300" width="320" /></a>
</div>

<div>
  <span>Finalmente, decidí invertir y comprar un buen dispositivo, por lo que opté por un <a href="http://www.cyborggaming.com/prod/rat3.htm" rel="nofollow" target="_blank">Mouse Mad Catz Cyborg R.A.T 3</a>, que además de verse bien (ver las fotos para la envidia) es del tipo láser con una presición de hasta 3500 dpi (configurables) y tiene su cable blindado.</span>
</div>

<div>
  <a href="http://www.ovalenzuela.com/wp-content/uploads/2016/02/d0896-28512_cyborg-rat-3-gaming-mouse-3302964-5.jpeg"><img border="0" height="200" src="http://www.ovalenzuela.com/wp-content/uploads/2016/02/d0896-28512_cyborg-rat-3-gaming-mouse-3302964-5.jpeg?w=240" width="160" /></a><span>Aunque no todo fue bien de inmediato, el mouse trae muchisimas configuraciones y botones, lo que se traduce en que XORG en ocasiones no lo detecta muy bien, de hecho al bootear considera que alguno de los botones están presionados, y lo mantiene así, lo que se traduce en que pierdes el foco y se hace imposible trabajar con el. La primera solución que se me ocurrió fue reiniciar el X, es decir, pasar con CTRL+ALT+F2 a otra consola, ingresar como root y tiperar init 3 e init 5 para pasar a modo 3 y luego a modo 5 y se reiniciará la X. Pero el tema no duró, por lo que opté por remapear los botones directamente en el X, para eso, editaremos el archivo /etc/X11/Xmodmap y al final del mismo, agregamos lo siguiente:</span>
</div>

<div>
  <span>pointer = 1 2 3 4 5 6 7 8 9 0 0 0 13 14 0 0 0 0</span>
</div>

<div>
  <span>Con esto, nuestro mouse funcionará excelente, solo necesitamos reiniciar y listo, a disfrutar de un excelente </span><span>mouse</span><span>.</span>
</div>

<div>
</div>

<div>
  Publicado originalmente por Oscar Valenzuela en http://ovalenzuela.xpertians.com &#8211; Puede ser compartido y copiado libremente, mientras mantenga esta nota.
</div>