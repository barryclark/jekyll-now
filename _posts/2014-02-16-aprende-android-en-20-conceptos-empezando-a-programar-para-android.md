---
id: 366
title: Aprende Android en 20 conceptos. Empezando a programar para Android
date: 2014-02-16T04:15:00+00:00
author: ovalenzuela
layout: post
guid: https://ovalenzueladotcom.wordpress.com/2014/02/16/aprende-android-en-20-conceptos-empezando-a-programar-para-android
permalink: /2014/02/aprende-android-en-20-conceptos-empezando-a-programar-para-android.html
blogger_blog:
  - www.ovalenzuela.com
blogger_author:
  - Andrés Barrera
blogger_02f5be51301771664ae7c1c72bf29246_permalink:
  - 1464463308832983701
categories:
  - Google
---
[<img class="size-full wp-image-127338 aligncenter" alt="android desarrollo" src="http://www.elandroidelibre.com/wp-content/uploads/2014/02/android-desarrollo.jpg" width="614" height="425" />](http://www.elandroidelibre.com/wp-content/uploads/2014/02/android-desarrollo.jpg)

A día de hoy, Android dispone de cientos de millones de dispositivos móviles en más de 190 países a lo largo del mundo. Y todo ello acompañado de más de 1.5 billones de descargas de aplicaciones desde Google Play cada mes. Unos números asombrosos que a muchas personas les han llevado a querer aportar su granito de arena, desarrollando su propia aplicación. ¿**Quién no ha pensado tener esa idea que poder llevar a cabo?**

[<img class=" wp-image-127335 aligncenter" alt="Android crecimiento" src="http://www.elandroidelibre.com/wp-content/uploads/2014/02/Android-crecimiento.png" width="501" height="295" />](http://www.elandroidelibre.com/wp-content/uploads/2014/02/Android-crecimiento.png)

Por ello, y aportando mi propia experiencia como desarrollador de apps para Android, **hoy vamos a inaugurar una nueva sección orientada a introducirnos al desarrollo de aplicaciones para Android: **la sección _**‘Aprende Android en 20 conceptos’.**_

En esta sección haremos un recorrido por los **20 fundamentos básicos de la API** (_Application Programming Interface_) **de Android para poder programa una aplicación en Android, desde cero**. Para quien no conozca lo que es una <a title="API en Wikipedia" href="http://es.wikipedia.org/wiki/Interfaz_de_programaci%C3%B3n_de_aplicaciones" target="_blank"><strong>API</strong></a>, básicamente se trata de la funcionalidad que nos proporcionan (en este caso Android) para poder programar.

Esto no quiere decir que con estos 20 conceptos lo conozcamos todo, ni por supuesto que no haya otros conceptos también importantes. De lo que se trata es de explicar aquí **los conceptos generales más importantes para crear una buena estructura de nuestra aplicación**. Con esta base, profundizar en conceptos más específicos (como por ejemplo puede ser el acceso al GPS) será mucho más sencillo.

Los 20 conceptos que trataremos en la sección ‘_**Aprende Android en 20**_** _conceptos’_ **son los siguientes:

> 0. Empezando
> 
> 1. Fundamentos de una aplicación   
> 2. Recursos de una app   
> 3. La clase Activity   
> 4. La clase Fragment   
> 5. View personalizada   
> 6. Adaptadores (Adapter)   
> 7. La clase Intent   
> 8. Receptores de mensajes broadcast (Broadcast Receiver)   
> 9. Prefencias de una app (Shared Preferences)   
> 10. Bases de datos SQLite   
> 11. Servicios (La clase Service)   
> 12. Tareas asíncronas (La clase AsyncTask)
> 
> 13. Gestores de contenidos (Content Provider)   
> 14. La barra de acciones ActionBar   
> 15. Notificaciones   
> 16. Orientación del dispositivo   
> 17. Animaciones   
> 18. Widgets   
> 19. Otros conceptos   
> 20. Información adicional

La sección será **semanal**, pero introduciremos más de un concepto cada semana, a partir de la próxima semana. En esta semana nos preocuparemos de **dejar nuestro ordenador preparado para empezar a programar en Android**.

## 0. Empezando

Lo primero será saber que para programar **aplicaciones nativas en Android**, deberemos aprender a programar en el lenguaje **Java**, conociendo la **programación orientada a objetos**.

Lo primero que debemos hacer es preparar nuestro entorno de desarrollo y saber dónde conseguir cualquier información. Para ello, lo primero es saber dónde está **toda la información para los desarrolladores de Android.** Google nos tiene preparada una web para ello,  pero debemos saber que toda la información está en **inglés**:

> <a title="Android Developers" href="http://developer.android.com/about/index.html" target="_blank">Web de desarrolladores de Android</a>

[<img class="size-full wp-image-127339 aligncenter" alt="web desarrollo android" src="http://www.elandroidelibre.com/wp-content/uploads/2014/02/web-desarrollo-android.png" width="680" height="452" />](http://www.elandroidelibre.com/wp-content/uploads/2014/02/web-desarrollo-android.png)

En esta web, tenemos **3 secciones básicas: Diseño, Desarrollo y Distribución**. En ellas, tendremos toda la información acerca de las recomendaciones de Google para diseñar nuestra app, toda la información sobre la API de Android e información para saber publicar nuestra aplicación, sabiendo cómo promocionarla, anunciarla…

En la parte de abajo, tendremos información adicional, sobre Android, conseguir el **SDK **(_Software Development Kit_), soporte…

Éste será nuestro primer paso, **descargarnos el entorno de desarrollo**, para lo que iremos a _Get the SDK_, o haremos click en el siguiente enlace:

> <a title="Get the SDK" href="http://developer.android.com/sdk/index.html" target="_blank">Descargar el SDK</a>

[<img class="size-full wp-image-127340 aligncenter" alt="web desarrollo sdk" src="http://www.elandroidelibre.com/wp-content/uploads/2014/02/web-desarrollo-sdk.png" width="661" height="453" />](http://www.elandroidelibre.com/wp-content/uploads/2014/02/web-desarrollo-sdk.png)

Una vez en la web, basta con que le demos al link que dice _Download the SDK_, y nos bajará **una versión del entorno de desarrollo Eclipse, personalizada para Android y ya preparada con el último SDK, el plugin ADT, así como emuladores sobre los que poder testear nuestra aplicación.**

En el pasado Google I/O (2013), <a title="Android para desarrolladores: los verdaderos protagonistas de Google I/O" href="http://www.elandroidelibre.com/2013/05/android-para-desarrolladores-los-verdaderos-protagonistas-de-google-io.html" target="_blank">anunciaron también el nuevo IDE <strong>Android Studio</strong></a>, el cual podemos también utilizar en lugar de Eclipse, pero debemos saber que aún están en fase beta. Desde la misma página podrás acceder a la información al mismo. <a title="Así funciona el nuevo Android Studio, Comenzando a usar la aplicación" href="http://www.elandroidelibre.com/2013/05/asi-funciona-el-nuevo-android-studio-comenzando-a-usar-la-aplicacion.html" target="_blank">Nosotros ya hemos hablado antes de este nuevo IDE</a>, pero en este tutorial utilizaremos Eclipse.

Una vez abrimos nuestro entorno de desarrollo, podemos **descargarnos todas las versiones de Android si queremos, así como otros paquetes extra**. Para ello utilizaremos el **Android SDK Manager**.

[<img class="size-full wp-image-127341 aligncenter" alt="eclipse sdk manager" src="http://www.elandroidelibre.com/wp-content/uploads/2014/02/eclipse-sdk-manager.png" width="549" height="501" />](http://www.elandroidelibre.com/wp-content/uploads/2014/02/eclipse-sdk-manager.png)

Por otro lado, podremos crear tantos emuladores de dispositivos Android como queramos: con distintos tamaños de pantalla, distintas versiones de Android… Para ello, debemos utilizar el **Android Virtual Device Manager (ADB)**, al cual podemos acceder desde Eclipse o desde la vía de comandos de nuestro sistema operativo:

[<img class="size-full wp-image-127342 aligncenter" alt="eclipse adb" src="http://www.elandroidelibre.com/wp-content/uploads/2014/02/eclipse-adb.png" width="658" height="596" />](http://www.elandroidelibre.com/wp-content/uploads/2014/02/eclipse-adb.png)

Aunque la mejor manera de tener control sobre nuestros dispositivos será aprendiendo a manejar <a title="Diez comandos de ADB que deberías conocer" href="http://www.elandroidelibre.com/2013/02/diez-comandos-de-adb-que-deberias-conocer.html" target="_blank"><strong>ADB desde la línea de comandos</strong>, algo de lo que también hemos hablado</a>. No obstante, en Eclipse podremos gestionar también nuestros dispositivos y sacar información de nuestro dispositivo: desde capturas de pantalla o ver los ficheros hasta enviar coordenadas GPS o enviar una llamada. Para ello, iremos a _**Window / Open perspective / Other… / DDMS**. _La vista de Eclipse **DDMS** (_Dalvik Debug Monitor Server_) nos será de gran utilidad mientras desarrollemos nuestras aplicaciones. Disponemos de toda la información sobre la misma en el siguiente enlace:

> <a title="Using DDMS" href="http://developer.android.com/tools/debugging/ddms.html" target="_blank">DDMS</a>

Llegados a este punto, nuestro ordenador está preparado para crear nuestra primera aplicación Android. Para ello, **nos basaremos en los pasos que Google nos recomienda seguir para una sencilla app**. Toda esta información la podremos encontrar en unos _trainings _que Google nos tiene preparados:

> <a title="Getting Started" href="http://developer.android.com/training/index.html" target="_blank">Formación (Trainings) sobre Android de Google</a>
> 
> <a title="Creating an Android Project" href="http://developer.android.com/training/basics/firstapp/creating-project.html" target="_blank">Creando un nuevo proyecto Android</a>

Nuestra sección hoy terminará siguiendo el segundo enlace, donde crearemos un nuevo proyecto Android. Para ello, seguiremos los siguientes pasos:

  1. Haz click en **New**
  2. En la ventana que aparece, abrir la carpeta **Android** y elegir **Android Application Project**
  3. En la siguiente ventana, debemos introducir el nombre de nuestra aplicación, el nombre del proyecto y el nombre del paquete (**éste será unico para nuestra app, pues sera el ID que Google Play utilizará para identificar la aplicación**). También introduciremos la versión de Android mínima requerida, así como la versión con la que compilaremos (generar nuestra aplicación a partir del código) nuestra aplicación.
  4. Tras rellenar todos los campos según necesitemos o queramos, nos vamos a la siguiente pantalla, donde dejaremos las opciones seleccionadas por defecto.
  5. En la siguiente pantalla, podremos crear un icono para nuestra aplicación. Para ello, sería ideal echar un vistazo a las guías de diseño de Android con respecto a lo que a iconos se refiere.
  6. Por último, seleccionaremos una plantilla de actividad sobre la que empezar a trabajar. Podemos seleccionar **Blank Activity**, que básicamente es una pantalla vacía.
  7. Finalizamos el asistente.

[<img class="size-full wp-image-127343 aligncenter" alt="adt asistente" src="http://www.elandroidelibre.com/wp-content/uploads/2014/02/adt-asistente.png" width="420" height="348" />](http://www.elandroidelibre.com/wp-content/uploads/2014/02/adt-asistente.png)

Con esto, tendremos nuestro particular _Hola mundo_ con el que siempre empezamos a programar cuando utilizamos una nueva API (<a title="Así funciona el nuevo Android Studio, probando la aplicación" href="http://www.elandroidelibre.com/2013/06/asi-funciona-el-nuevo-android-studio-probando-la-aplicacion.html" target="_blank">también vimos cómo crear un Hola Mundo en AndroidStudio</a>). Para **ejecutarlo**, basta con tener un dispositivo real conectado o lanzar un emulador y hacer click en el botón **Run **(un círculo verde con el icono Play en blanco).

Con esta información básica, damos por terminada la sección hoy. **La próxima semana entraremos de lleno en esos 20 conceptos** que creo que nos ayudarían a tener mucho más claro cómo esta organizara la estructura de la API de Android y, por tanto, nos facilitarán las cosas para tener claro cómo desarrollar nuestras aplicaciones.

Si tenéis cualquier duda o queréis preguntarme o sugerirme cualquier cosa, también podéis encontrarme en <a title="Twitter de Jose Angel Zamora" href="https://twitter.com/jangelzamora" target="_blank">Twitter</a>.

**Si aún no os habéis animado a programar, ¿os animaréis?**

El artículo [Aprende Android en 20 conceptos. Empezando a programar para Android](http://www.elandroidelibre.com/2014/02/aprende-android-en-20-conceptos-empezando-a-programar-para-android.html) se publicó en [El Androide Libre](http://www.elandroidelibre.com) (El Blog Android de referencia. Aplicaciones, noticias, Juegos y smartphones Android Libres)


<img width="1" height="1" src="http://rss.feedsportal.com/c/34005/f/617036/s/37270718/sc/5/mf.gif" border="0" /> 

<div>
  <table border='0'>
    <tr>
      <td valign='middle'>
        <a href="http://share.feedsportal.com/share/twitter/?u=http%3A%2F%2Fwww.elandroidelibre.com%2F2014%2F02%2Faprende-android-en-20-conceptos-empezando-a-programar-para-android.html&t=Aprende+Android+en+20+conceptos.+Empezando+a+programar+para+Android" target="_blank"><img src="http://res3.feedsportal.com/social/twitter.png" border="0" /></a> <a href="http://share.feedsportal.com/share/facebook/?u=http%3A%2F%2Fwww.elandroidelibre.com%2F2014%2F02%2Faprende-android-en-20-conceptos-empezando-a-programar-para-android.html&t=Aprende+Android+en+20+conceptos.+Empezando+a+programar+para+Android" target="_blank"><img src="http://res3.feedsportal.com/social/facebook.png" border="0" /></a> <a href="http://share.feedsportal.com/share/linkedin/?u=http%3A%2F%2Fwww.elandroidelibre.com%2F2014%2F02%2Faprende-android-en-20-conceptos-empezando-a-programar-para-android.html&t=Aprende+Android+en+20+conceptos.+Empezando+a+programar+para+Android" target="_blank"><img src="http://res3.feedsportal.com/social/linkedin.png" border="0" /></a> <a href="http://share.feedsportal.com/share/gplus/?u=http%3A%2F%2Fwww.elandroidelibre.com%2F2014%2F02%2Faprende-android-en-20-conceptos-empezando-a-programar-para-android.html&t=Aprende+Android+en+20+conceptos.+Empezando+a+programar+para+Android" target="_blank"><img src="http://res3.feedsportal.com/social/googleplus.png" border="0" /></a> <a href="http://share.feedsportal.com/share/email/?u=http%3A%2F%2Fwww.elandroidelibre.com%2F2014%2F02%2Faprende-android-en-20-conceptos-empezando-a-programar-para-android.html&t=Aprende+Android+en+20+conceptos.+Empezando+a+programar+para+Android" target="_blank"><img src="http://res3.feedsportal.com/social/email.png" border="0" /></a>
      </td>
      
      <td valign='middle'>
      </td>
    </tr>
  </table>
</div>

[<img src="http://da.feedsportal.com/r/186530690960/u/49/f/617036/c/34005/s/37270718/sc/5/rc/1/rc.img" border="0" />](http://da.feedsportal.com/r/186530690960/u/49/f/617036/c/34005/s/37270718/sc/5/rc/1/rc.htm)  
[<img src="http://da.feedsportal.com/r/186530690960/u/49/f/617036/c/34005/s/37270718/sc/5/rc/2/rc.img" border="0" />](http://da.feedsportal.com/r/186530690960/u/49/f/617036/c/34005/s/37270718/sc/5/rc/2/rc.htm)  
[<img src="http://da.feedsportal.com/r/186530690960/u/49/f/617036/c/34005/s/37270718/sc/5/rc/3/rc.img" border="0" />](http://da.feedsportal.com/r/186530690960/u/49/f/617036/c/34005/s/37270718/sc/5/rc/3/rc.htm)

[<img src="http://da.feedsportal.com/r/186530690960/u/49/f/617036/c/34005/s/37270718/a2.img" border="0" />](http://da.feedsportal.com/r/186530690960/u/49/f/617036/c/34005/s/37270718/a2.htm)
<img width="1" height="1" src="http://pi.feedsportal.com/r/186530690960/u/49/f/617036/c/34005/s/37270718/a2t.img" border="0" /> 

<div>
  <a href="http://feeds.feedburner.com/~ff/elandroidelibre?a=sjNsC31kuC0:5TN-uF-hV60:ecdYMiMMAMM"><img src="http://feeds.feedburner.com/~ff/elandroidelibre?d=ecdYMiMMAMM" border="0" /></a> <a href="http://feeds.feedburner.com/~ff/elandroidelibre?a=sjNsC31kuC0:5TN-uF-hV60:V_sGLiPBpWU"><img src="http://feeds.feedburner.com/~ff/elandroidelibre?i=sjNsC31kuC0:5TN-uF-hV60:V_sGLiPBpWU" border="0" /></a> <a href="http://feeds.feedburner.com/~ff/elandroidelibre?a=sjNsC31kuC0:5TN-uF-hV60:7Q72WNTAKBA"><img src="http://feeds.feedburner.com/~ff/elandroidelibre?d=7Q72WNTAKBA" border="0" /></a> <a href="http://feeds.feedburner.com/~ff/elandroidelibre?a=sjNsC31kuC0:5TN-uF-hV60:dnMXMwOfBR0"><img src="http://feeds.feedburner.com/~ff/elandroidelibre?d=dnMXMwOfBR0" border="0" /></a> <a href="http://feeds.feedburner.com/~ff/elandroidelibre?a=sjNsC31kuC0:5TN-uF-hV60:yIl2AUoC8zA"><img src="http://feeds.feedburner.com/~ff/elandroidelibre?d=yIl2AUoC8zA" border="0" /></a> <a href="http://feeds.feedburner.com/~ff/elandroidelibre?a=sjNsC31kuC0:5TN-uF-hV60:qj6IDK7rITs"><img src="http://feeds.feedburner.com/~ff/elandroidelibre?d=qj6IDK7rITs" border="0" /></a> <a href="http://feeds.feedburner.com/~ff/elandroidelibre?a=sjNsC31kuC0:5TN-uF-hV60:I9og5sOYxJI"><img src="http://feeds.feedburner.com/~ff/elandroidelibre?d=I9og5sOYxJI" border="0" /></a>
</div>

<img src="http://feeds.feedburner.com/~r/elandroidelibre/~4/sjNsC31kuC0" height="1" width="1" />