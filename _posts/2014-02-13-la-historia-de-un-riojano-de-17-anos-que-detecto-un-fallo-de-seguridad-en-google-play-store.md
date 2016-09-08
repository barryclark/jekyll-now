---
id: 390
title: La historia de un riojano de 17 años que detectó un fallo de seguridad en Google Play Store
date: 2014-02-13T16:34:00+00:00
author: ovalenzuela
layout: post
guid: https://ovalenzueladotcom.wordpress.com/2014/02/13/la-historia-de-un-riojano-de-17-anos-que-detecto-un-fallo-de-seguridad-en-google-play-store
permalink: /2014/02/la-historia-de-un-riojano-de-17-anos-que-detecto-un-fallo-de-seguridad-en-google-play-store.html
blogger_blog:
  - www.ovalenzuela.com
blogger_author:
  - Andrés Barrera
blogger_02f5be51301771664ae7c1c72bf29246_permalink:
  - 895106555890416933
categories:
  - Google
---
[<img class="size-full wp-image-118988 aligncenter" alt="play_store" src="http://www.elandroidelibre.com/wp-content/uploads/2013/11/play_store.jpg" width="757" height="425" />](http://www.elandroidelibre.com/wp-content/uploads/2013/11/play_store.jpg)

Hoy vamos a hablar de un **chaval de tan sólo 17 años**, de Santo Domingo de la Calzada, en La Rioja. Se llama Miguel Ángel Jimeno, y se trata de un enamorado de la **seguridad en aplicaciones web**, el cual dedica parte de su tiempo a **investigar vulnerabilidades**.

Para dejar sello de lo que hace referente a la seguridad, se ha abierto  en enero de este mismo año un <a title="Researching for fun" href="http://researchingforfun.blogspot.com.es/" target="_blank">blog</a> llamado _Researching for fun_. En él, va explicando aquellas vulnerabilidades que va encontrando en productos de famosas compañías.

Su forma de publicar es sencilla: nos cuenta **cómo reproducir el problema** y **qué le responden tras reportarlo a la compañía en cuestión**.

Ha publicado ya varios problemas, tales como un <a title="Stored XSS on Google" href="http://researchingforfun.blogspot.com.es/2014/01/stored-xss-on-google-no-bounty-no-hall.html" target="_blank"><em>Stored XSS en un dominio de Google</em></a> o un <a title="eBay Stored XSS" href="http://researchingforfun.blogspot.com.es/2014/02/ebay-stored-xss-no-fix-no-hof-duplicated.html" target="_blank"><em>Stored XSS en eBay</em></a>, entre otros, ahora **ha encontrado uno más relacionado con Android, concretamente con Play Store**. Se trata de un **fallo de inyección HTML en la propia aplicación Play Store**.

Para reproducir el fallo, basta **abrir Play Store**, **irnos a Mis Aplicaciones** y entrar en **cualquiera de las aplicaciones** que tenemos instaladas. Una vez allí, basta con que demos nuestra valoración de la aplicación, pero de una manera un tanto especial: elegiremos el número de estrellas que queramos, pero **a la hora de introducir un comentario, escribiremos cualquier código HTML**, como por ejemplo _![](”a”/)_, el código que Miguel Ángel utilizó de ejemplo (básicamente una etiqueta para añadir una imagen en HTML). A continuación, publicamos nuestro comentario. En el caso de Miguel Ángel, la prueba se hizo con un Nexus 4 con Android KitKat 4.4.2.

[<img class="alignnone wp-image-127162" alt="HTML Inyeccion Play Store" src="http://www.elandroidelibre.com/wp-content/uploads/2014/02/HTML-Inyeccion-Play-Store1.png" width="307" height="512" />](http://www.elandroidelibre.com/wp-content/uploads/2014/02/HTML-Inyeccion-Play-Store1.png) [<img class="alignnone wp-image-127161" alt="HTML Inyeccion Play Store 2" src="http://www.elandroidelibre.com/wp-content/uploads/2014/02/HTML-Inyeccion-Play-Store-21.png" width="307" height="512" />](http://www.elandroidelibre.com/wp-content/uploads/2014/02/HTML-Inyeccion-Play-Store-21.png)

Como se puede observar, podemos ver nuestra imagen añadida, pero esto podría ser algo mucho más grave, pues podríamos llegar a **inyectar cualquier tipo de código**, incluyendo desde **publicidad** hasta encontrar formas de **distribuir <a title="Troyanos: Algunos apuntes para que sepas qué son y como funcionan" href="http://www.elandroidelibre.com/2013/04/troyanos-algunas-apuntes-para-que-sepas-que-son-y-como-funcionan.html" target="_blank">troyanos </a>para terminales Android**.

A partir de ahí, **Miguel Ángel reportó el problema** y el fallo se pasó al equipo de seguridad de Android el 14 de diciembre de 2013 tras varias respuestas automáticas:

> Hola,
> 
> Gracias por tu reporte. Lo he reenviado al equipo de seguridad de Android.
> 
> Saludos.

Dos días más tarde, se pasó el caso al equipo encargado de Play Store:

> Muchas gracias por tu reporte, Miguel. Lo he reenviado al equipo de Google Play. Te mantendremos informado.
> 
> Saludos.

El 26 del mismo mes, ya respondieron diciendo estar probando un parche:

> Hola Miguel,
> 
> El equipo de Google Play está ahora testeando un parche — Debería saber la fecha esperada de liberación del cambio pronto después de las vacaciones.
> 
> Gracias.

Y así fue, el reciente 7 de febrero de 2014, le respondieron diciendo que el fallo debería estar ya arreglado:

> Hola Miguel,
> 
> El problema debería ahora estar resuelto. Muchas gracias por tu asistencia.
> 
> El equipo de seguridad de Android

Esta es una historia más en las investigaciones que realiza Miguel, que tras haber detectado ya un par de fallos a Google, desde la compañía no todos sus productos están dentro del <a title="Vulnerability Reward Google" href="http://www.google.com/about/appsecurity/reward-program/" target="_blank">Programa de Recompensas a Vulnerabilidades</a> de Google, por lo que Miguel deberá esperar y seguir intentándolo.

A pesar de ello, para Miguel Ángel lo que es motivo de orgullo es conseguir detectarle un fallo de seguridad a la gran G.

Desde aquí, quiero **felicitar a todas aquellas personas que sin ningún tipo de ánimo de lucro intentan detectar fallos y simplemente se dedican a reportarlos**, para el beneficio del resto de usuarios.

Y particularmente en este caso, no habría estado nada mal el detalle por parte de Google incluyendo a Miguel en su Programa de recompensas. **¿Qué opináis vosotros?**

**Fuente | <a title="Researching for fun" href="http://researchingforfun.blogspot.com.es/" target="_blank">Researching for fun</a>**

El artículo [La historia de un riojano de 17 años que detectó un fallo de seguridad en Google Play Store](http://www.elandroidelibre.com/2014/02/la-historia-de-un-riojano-de-17-anos-que-detecto-un-fallo-de-seguridad-en-google-play-store.html) se publicó en [El Androide Libre](http://www.elandroidelibre.com) (El Blog Android de referencia. Aplicaciones, noticias, Juegos y smartphones Android Libres)


<img width="1" height="1" src="http://rss.feedsportal.com/c/34005/f/617036/s/37131a45/sc/15/mf.gif" border="0" /> 

<div>
  <table border='0'>
    <tr>
      <td valign='middle'>
        <a href="http://share.feedsportal.com/share/twitter/?u=http%3A%2F%2Fwww.elandroidelibre.com%2F2014%2F02%2Fla-historia-de-un-riojano-de-17-anos-que-detecto-un-fallo-de-seguridad-en-google-play-store.html&t=La+historia+de+un+riojano+de+17+a%C3%B1os+que+detect%C3%B3+un+fallo+de+seguridad+en+Google+Play+Store" target="_blank"><img src="http://res3.feedsportal.com/social/twitter.png" border="0" /></a> <a href="http://share.feedsportal.com/share/facebook/?u=http%3A%2F%2Fwww.elandroidelibre.com%2F2014%2F02%2Fla-historia-de-un-riojano-de-17-anos-que-detecto-un-fallo-de-seguridad-en-google-play-store.html&t=La+historia+de+un+riojano+de+17+a%C3%B1os+que+detect%C3%B3+un+fallo+de+seguridad+en+Google+Play+Store" target="_blank"><img src="http://res3.feedsportal.com/social/facebook.png" border="0" /></a> <a href="http://share.feedsportal.com/share/linkedin/?u=http%3A%2F%2Fwww.elandroidelibre.com%2F2014%2F02%2Fla-historia-de-un-riojano-de-17-anos-que-detecto-un-fallo-de-seguridad-en-google-play-store.html&t=La+historia+de+un+riojano+de+17+a%C3%B1os+que+detect%C3%B3+un+fallo+de+seguridad+en+Google+Play+Store" target="_blank"><img src="http://res3.feedsportal.com/social/linkedin.png" border="0" /></a> <a href="http://share.feedsportal.com/share/gplus/?u=http%3A%2F%2Fwww.elandroidelibre.com%2F2014%2F02%2Fla-historia-de-un-riojano-de-17-anos-que-detecto-un-fallo-de-seguridad-en-google-play-store.html&t=La+historia+de+un+riojano+de+17+a%C3%B1os+que+detect%C3%B3+un+fallo+de+seguridad+en+Google+Play+Store" target="_blank"><img src="http://res3.feedsportal.com/social/googleplus.png" border="0" /></a> <a href="http://share.feedsportal.com/share/email/?u=http%3A%2F%2Fwww.elandroidelibre.com%2F2014%2F02%2Fla-historia-de-un-riojano-de-17-anos-que-detecto-un-fallo-de-seguridad-en-google-play-store.html&t=La+historia+de+un+riojano+de+17+a%C3%B1os+que+detect%C3%B3+un+fallo+de+seguridad+en+Google+Play+Store" target="_blank"><img src="http://res3.feedsportal.com/social/email.png" border="0" /></a>
      </td>
      
      <td valign='middle'>
      </td>
    </tr>
  </table>
</div>

[<img src="http://da.feedsportal.com/r/187557765791/u/49/f/617036/c/34005/s/37131a45/sc/15/rc/1/rc.img" border="0" />](http://da.feedsportal.com/r/187557765791/u/49/f/617036/c/34005/s/37131a45/sc/15/rc/1/rc.htm)  
[<img src="http://da.feedsportal.com/r/187557765791/u/49/f/617036/c/34005/s/37131a45/sc/15/rc/2/rc.img" border="0" />](http://da.feedsportal.com/r/187557765791/u/49/f/617036/c/34005/s/37131a45/sc/15/rc/2/rc.htm)  
[<img src="http://da.feedsportal.com/r/187557765791/u/49/f/617036/c/34005/s/37131a45/sc/15/rc/3/rc.img" border="0" />](http://da.feedsportal.com/r/187557765791/u/49/f/617036/c/34005/s/37131a45/sc/15/rc/3/rc.htm)

[<img src="http://da.feedsportal.com/r/187557765791/u/49/f/617036/c/34005/s/37131a45/a2.img" border="0" />](http://da.feedsportal.com/r/187557765791/u/49/f/617036/c/34005/s/37131a45/a2.htm)
<img width="1" height="1" src="http://pi.feedsportal.com/r/187557765791/u/49/f/617036/c/34005/s/37131a45/a2t.img" border="0" /> 

<div>
  <a href="http://feeds.feedburner.com/~ff/elandroidelibre?a=P2s1xNrTZ44:92o-RfotZcg:ecdYMiMMAMM"><img src="http://feeds.feedburner.com/~ff/elandroidelibre?d=ecdYMiMMAMM" border="0" /></a> <a href="http://feeds.feedburner.com/~ff/elandroidelibre?a=P2s1xNrTZ44:92o-RfotZcg:V_sGLiPBpWU"><img src="http://feeds.feedburner.com/~ff/elandroidelibre?i=P2s1xNrTZ44:92o-RfotZcg:V_sGLiPBpWU" border="0" /></a> <a href="http://feeds.feedburner.com/~ff/elandroidelibre?a=P2s1xNrTZ44:92o-RfotZcg:7Q72WNTAKBA"><img src="http://feeds.feedburner.com/~ff/elandroidelibre?d=7Q72WNTAKBA" border="0" /></a> <a href="http://feeds.feedburner.com/~ff/elandroidelibre?a=P2s1xNrTZ44:92o-RfotZcg:dnMXMwOfBR0"><img src="http://feeds.feedburner.com/~ff/elandroidelibre?d=dnMXMwOfBR0" border="0" /></a> <a href="http://feeds.feedburner.com/~ff/elandroidelibre?a=P2s1xNrTZ44:92o-RfotZcg:yIl2AUoC8zA"><img src="http://feeds.feedburner.com/~ff/elandroidelibre?d=yIl2AUoC8zA" border="0" /></a> <a href="http://feeds.feedburner.com/~ff/elandroidelibre?a=P2s1xNrTZ44:92o-RfotZcg:qj6IDK7rITs"><img src="http://feeds.feedburner.com/~ff/elandroidelibre?d=qj6IDK7rITs" border="0" /></a> <a href="http://feeds.feedburner.com/~ff/elandroidelibre?a=P2s1xNrTZ44:92o-RfotZcg:I9og5sOYxJI"><img src="http://feeds.feedburner.com/~ff/elandroidelibre?d=I9og5sOYxJI" border="0" /></a>
</div>

<img src="http://feeds.feedburner.com/~r/elandroidelibre/~4/P2s1xNrTZ44" height="1" width="1" />