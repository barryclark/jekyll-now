---
published: true
id: 160916
title: Apps Android en tu PC/Mac/Linux usando tu navegador Chrome
date: 2016-09-27T00:00:00+00:00
author: ovalenzuela
layout: post
guid: http://ovalenzuela.com/?p=270916
permalink: /2016/09/apps-android-en-tu-pc-mac-linux-usando-tu-navegador.html
categories:
  - General
  - Android
tags:
  - android
  - software
  - hack
---

<img class="alignleft" src="http://www.ovalenzuela.com/images/2016/09/arc_welder.png" width="200px"/> Como desarrollador de apps, se lo dificil que es rentabilizar un projecto y conseguir financiamiento. Por lo que puedo entender 
perfectamente que una excelente app que es gratuita, se convierta en un servicio pagado mediante suscripciones. Razonable, no de 
lo mejor, pero razonable. Sin embargo el salto que algunos desarrolladores deciden dar, de pasar de gratuita a un costo de $50 dolares 
cada 12 meses, me parece no solo absurdo, sino totalmente "patudo".

Dado este hecho, decidí migrar de CloudMagic, el cliente de correos que usaba en Android, ChromeOS y Mac, a mi querido K9 Mail, un cliente 
de correo para Android espectacular. El problema, obviamente radica en que la app funciona en Android, pero no en los otros sistemas que utilizo.

Aunque podria haber instalado un emulador de los usados comunmente para desarrollar aplicaciones en Android, pero dado que no tengo la intención 
de instalar una app completa que consuma recursos constantemente sólo para leer el correo, me orienté a usar 
<a href="https://developer.chrome.com/apps/getstarted_arc" target="_blank">ARC</a> sobre Chrome, despúes de todo,
Chrome estaba ya instalado en mi computador y es soportado en casi todos los sistemas, <b>INCLUYENDO ChromeOS (Chromebook)</b>. El proceso para 
emular una app es algo largo, pero las apps funcionan bastante bien. Incluso soportan copy&paste desde un ambiente a otro.

Para quienes no lo saben, ARC Welder realiz&aacute; una simple conversi&oacute;n de nuestra APP para ser usada como una App de Chrome.

Manos a la obra:

# Lo primero es instalar el plugin <a href="http://goo.gl/gAn0Xh" target="_blank" alt="ARC Welder">ARC Welder</a> para Chrome. Una vez instalado,
una nueva app estar&aacute; disponible en la secci&oacute;n correspondiente de tu Chrome.

# Luego de instalar el plugin, debemos descargar el APK de la app que deseamos utilizar. C&oacute;mo antes lo hab&iacute;a se&ntilde;alado en otro 
<a href="http://ovalenzuela.com/2016/02/ingenieria-inversa-de-android-apps.html" target="_blank">POST</a>, podemos usar el sitio web llamado 
<a href="https://apkpure.com/" target="_blank">APK Pure</a> para buscar obtener el APK que queremos ejecutar en nuestro navegador.

# El siguiente paso, es abrir ARC Welder e importar el archivo APK descargado, luego seleccionar los par&aacute;metros que deseamos 
(orientaci&oacute;n, si la app soportar&aacute; redimensionamiento, etc.) y finalmente presionamos <b>DOWNLOAD ZIP</b> para obtener el c&oacute;digo 
para ser usado luego en Chrome. Guardamos el ZIP y cerramos el conversor.

# Finalmente, vamos al directorio donde el archivo ZIP fue descargado y lo "descomprimimos". Iniciamos Chrome, vamos a la configuraci&oacute;n de 
extensiones poniendo "chrome://extensions/" en la barra de direcciones, y usamos la opci&oacute;n "Load unpacked extension", seleccionamos el 
directorio donde el paquete ZIP fue descomprimido y bingo! nuestra app esta instalada.

# Para acceder a tu app, simplemente vas "chrome://apps/" o tu lengueta de applicaciones, donde podr&aacute;s encontrar tu app lista para ser usada.


_**Happy Coding!**_
