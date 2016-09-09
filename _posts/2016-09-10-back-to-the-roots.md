---
published: false
id: 800
title: Back to the roots
date: 2016-09-10T00:00:00+00:00
author: ovalenzuela
layout: post
guid: http://ovalenzuela.com/?p=800
permalink: /2016/09/back-to-the-roots.html
categories:
  - General
  - Personal
tags:
  - OSS
  - software
  - amazon
---
<img class=" size-full wp-image-668 alignleft" src="http://www.ovalenzuela.com/wp-content/uploads/2016/02/b85d8f26e874779cf3259aa6e53f5734.jpg" alt="b85d8f26e874779cf3259aa6e53f5734" width="237" height="232" />Alguna vez te has preguntado qué hay dentro de una App en Android?, ciertamente uno quiere intrusear en el código para aprender, pero esto también puede tener otras intenciones, como por ejemplo para verificar que hace realmente una App con nuestros datos, como el tan comentado caso de la App desarrollada por Subtel para Chile, donde en mi humilde el desarrollador tuvo que trabajar apurado, y ni las mínimas recomendables prácticas fueron seguidas, pero bueno ese es otro tema, seguramente para un futuro post.

Volviendo al tema original, hay un punto importante, la Ingeniería Inversa o la decodificación de software esta prohibido en algunos paises, es mas, en algunos es penado por ley, por lo que lo que continuar leyendo y ejecutar este proceso será únicamente de tu responsabilidad y espero que se realice con fines académicos o de investigación.

## A las herramientas!

<img class=" size-full wp-image-691 alignleft" src="http://www.ovalenzuela.com/wp-content/uploads/2016/02/logo.png" alt="logo" width="292" height="44" />Lo primero que deberás hacer es obtener el APK, y aunque hay muchas formas de obtener una copia del software, la más simple para mi ha sido usando el servicio proporcionado por <a href="https://apkpure.com/" target="_blank">APK Pure</a>, donde usando un sitio web puede descargar el APK. Si, existen otros métodos, pero tiendo a trabajar desde una tablet, chromebook o en equipos donde no puedo instalar mucho software para uso personal. Entonces, en este ejemplo descargamos <a href="https://play.google.com/store/apps/details?id=com.xpertians.maqui" target="_blank">Maqui</a> una app que he desarrollado hace algún tiempo, la cual puedes ver en <a href="https://play.google.com/store/apps/details?id=com.xpertians.maqui" target="_blank">Google Play</a>.

Entonces el proceso es simple, abrimos APK Pure y pegamos el enlace completo en la barra de búsqueda, y le hacemos click al icono de búsqueda. Luego, nos aparecera la opcion de &#8220;Download APK&#8221;.

<img class="alignnone size-full wp-image-694" src="http://www.ovalenzuela.com/wp-content/uploads/2016/02/captura-de-pantalla-2016-02-23-a-las-10-17-50-p-m.png" alt="Captura de pantalla 2016-02-23 a las 10.17.50 p.m." width="774" height="193" sizes="(max-width: 774px) 100vw, 774px" />

Seleccionamos la APK que deseamos analizar, seleccionamos un decompilador, para este caso recomiendo Jadx y le damos a &#8220;Upload and Decompile&#8221;.


_**Happy Coding!**_
