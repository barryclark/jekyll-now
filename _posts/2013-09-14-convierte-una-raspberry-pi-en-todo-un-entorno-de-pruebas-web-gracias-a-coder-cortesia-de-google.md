---
id: 414
title: Convierte una Raspberry Pi en todo un entorno de pruebas web gracias a Coder, cortesía de Google
date: 2013-09-14T17:22:00+00:00
author: ovalenzuela
layout: post
guid: https://ovalenzueladotcom.wordpress.com/2013/09/14/convierte-una-raspberry-pi-en-todo-un-entorno-de-pruebas-web-gracias-a-coder-cortesia-de-google
permalink: /2013/09/convierte-una-raspberry-pi-en-todo-un-entorno-de-pruebas-web-gracias-a-coder-cortesia-de-google.html
blogger_blog:
  - www.ovalenzuela.com
blogger_author:
  - Andrés Barrera
blogger_02f5be51301771664ae7c1c72bf29246_permalink:
  - 5294421602467654988
categories:
  - Noticias Destacadas
---
![Coder](http://img.genbetadev.com/2013/09/Sin-t%C3%ADtulo-1.png)

Es sabido por todos que **Google** siempre que puede demuestra su lado bueno y comparte con el mundo fantásticas herramientas, como es el caso de **Coder**, todo un sistema para **Raspberry Pi** que nos proporciona todo lo necesario para desarrollar aplicaciones web, desde un editor (con tecnología web) hasta un servidor web y facilidades para acceder a él desde nuestra red local. Perfecto para tener un _sandbox_ donde probar y compartir tus aplicaciones.

<a name='more'></a>

El proyecto es libre y podemos consultar su código en <a href="https://github.com/googlecreativelab/coder/" target="_blank">GitHub</a>, ha sido desarrollado por un pequeño equipo de Google asentado en Nueva York.

Desde <a href="http://googlecreativelab.github.io/coder/" target="_blank">la web del proyecto</a> nos proponen distintos usos para esta herramienta, como pueden ser: usarla en un entorno de aprendizaje, donde podrían hacer varias personas sus aplicaciones y probarlas entre ellos o usar un pequeño servidor de pruebas externo de bajo coste en lugar de exponer nuestro propio equipo al prestar servicios web.

El equipo para tener nuestro servidor completo es muy simple y económico, una Raspberry Pi (mejor el modelo B), una fuente de alimentación para el (un cargador de cualquier móvil), una tarjeta SD de 4GB como mínimo y opcionalmente conectar un adaptador Wifi <span>USB</span>.

## Puesta en marcha

Montar un servidor web con una Raspberry Pi no es algo nuevo, la diferencia está en que para poderlo usar simplemente debemos de descargar un paquete con un instalador que se encarga de configurar la tarjeta SD de la Raspberry Pi (configurando también la contraseña del servidor para restringir el acceso).

En el siguiente vídeo se puede ver un poco como es el editor y como es su funcionamiento a grandes rasgos.</p> 

Para acceder al servidor desde la propia Raspberry debemos de ir, desde el navegador a `http://coder.local` y desde otro equipo hay que acceder a un punto de acceso Wifi que genera el propio sistema, autentificarse y posteriormente entrar en `http://coder.local`. No detallan si se puede acceder de una forma “clásica”, con IP y puerto, pero bueno, todo es cuestión de probarlo.

## Alternativas

Esta herramienta, junto a la Raspberry Pi es muy útil para aprender por su editor simple y sencillez, pero para algo más avanzado con un lenguaje en el _back-end_ y disponer igual de un _sandbox_ podemos optar por una máquina virtual con un Ubuntu Server, por ejemplo, que te incorpora por defecto si así lo quieres un entorno <span>LAMP</span>, como en mi caso hago. En el caso de una máquina virtual podemos ponerla en red como un equipo más y así nos aseguramos de proteger nuestro equipo habitual. Y claro, esta es una de las muchas opciones que podemos escoger.

Más información | <a href="http://googlecreativelab.github.io/coder/" target="_blank">Coder</a>

&#8211;    
La noticia  <a href="http://www.genbetadev.com/desarrollo-web/convierte-una-raspberry-pi-en-todo-un-entorno-de-pruebas-gracias-a-coder-cortesia-de-google?utm_source=Feedburner&utm_medium=rss&utm_campaign=footer" target="_blank"><em> Convierte una Raspberry Pi en todo un entorno de pruebas web gracias a Coder, cortesía de Google </em> </a> fue publicada originalmente en  <a href="http://www.genbetadev.com" target="_blank"><strong> Genbetadev </strong> </a> por <a href="http://www.genbetadev.com/autor/pedro-gutierrez" target="_blank">Pedro Gutiérrez</a>. 


<img width="1" height="1" src="http://weblogssl.feedsportal.com/c/33859/f/609642/s/313aa99e/sc/5/mf.gif" border="0" /> 

<div>
  <table border="0">
    <tr>
      <td valign="middle">
        <a href="http://share.feedsportal.com/share/twitter/?u=http%3A%2F%2Fwww.genbetadev.com%2Fdesarrollo-web%2Fconvierte-una-raspberry-pi-en-todo-un-entorno-de-pruebas-gracias-a-coder-cortesia-de-google&t=Convierte+una+Raspberry+Pi+en+todo+un+entorno+de+pruebas+web+gracias+a+Coder%2C+cortes%C3%ADa+de+Google" target="_blank"><img src="http://res3.feedsportal.com/social/twitter.png" border="0" /></a> <a href="http://share.feedsportal.com/share/facebook/?u=http%3A%2F%2Fwww.genbetadev.com%2Fdesarrollo-web%2Fconvierte-una-raspberry-pi-en-todo-un-entorno-de-pruebas-gracias-a-coder-cortesia-de-google&t=Convierte+una+Raspberry+Pi+en+todo+un+entorno+de+pruebas+web+gracias+a+Coder%2C+cortes%C3%ADa+de+Google" target="_blank"><img src="http://res3.feedsportal.com/social/facebook.png" border="0" /></a> <a href="http://share.feedsportal.com/share/linkedin/?u=http%3A%2F%2Fwww.genbetadev.com%2Fdesarrollo-web%2Fconvierte-una-raspberry-pi-en-todo-un-entorno-de-pruebas-gracias-a-coder-cortesia-de-google&t=Convierte+una+Raspberry+Pi+en+todo+un+entorno+de+pruebas+web+gracias+a+Coder%2C+cortes%C3%ADa+de+Google" target="_blank"><img src="http://res3.feedsportal.com/social/linkedin.png" border="0" /></a> <a href="http://share.feedsportal.com/share/gplus/?u=http%3A%2F%2Fwww.genbetadev.com%2Fdesarrollo-web%2Fconvierte-una-raspberry-pi-en-todo-un-entorno-de-pruebas-gracias-a-coder-cortesia-de-google&t=Convierte+una+Raspberry+Pi+en+todo+un+entorno+de+pruebas+web+gracias+a+Coder%2C+cortes%C3%ADa+de+Google" target="_blank"><img src="http://res3.feedsportal.com/social/googleplus.png" border="0" /></a> <a href="http://share.feedsportal.com/share/email/?u=http%3A%2F%2Fwww.genbetadev.com%2Fdesarrollo-web%2Fconvierte-una-raspberry-pi-en-todo-un-entorno-de-pruebas-gracias-a-coder-cortesia-de-google&t=Convierte+una+Raspberry+Pi+en+todo+un+entorno+de+pruebas+web+gracias+a+Coder%2C+cortes%C3%ADa+de+Google" target="_blank"><img src="http://res3.feedsportal.com/social/email.png" border="0" /></a>
      </td>
      
      <td valign="middle">
      </td>
    </tr>
  </table>
</div>

<a href="http://da.feedsportal.com/r/173953768794/u/49/f/609642/c/33859/s/313aa99e/sc/5/kg/391/rc/1/rc.htm" target="_blank"><img src="http://da.feedsportal.com/r/173953768794/u/49/f/609642/c/33859/s/313aa99e/sc/5/kg/391/rc/1/rc.img" border="0" /></a>  
<a href="http://da.feedsportal.com/r/173953768794/u/49/f/609642/c/33859/s/313aa99e/sc/5/kg/391/rc/2/rc.htm" target="_blank"><img src="http://da.feedsportal.com/r/173953768794/u/49/f/609642/c/33859/s/313aa99e/sc/5/kg/391/rc/2/rc.img" border="0" /></a>  
<a href="http://da.feedsportal.com/r/173953768794/u/49/f/609642/c/33859/s/313aa99e/sc/5/kg/391/rc/3/rc.htm" target="_blank"><img src="http://da.feedsportal.com/r/173953768794/u/49/f/609642/c/33859/s/313aa99e/sc/5/kg/391/rc/3/rc.img" border="0" /></a>

<a href="http://da.feedsportal.com/r/173953768794/u/49/f/609642/c/33859/s/313aa99e/kg/391/a2.htm" target="_blank"><img src="http://da.feedsportal.com/r/173953768794/u/49/f/609642/c/33859/s/313aa99e/kg/391/a2.img" border="0" /></a>
<img width="1" height="1" src="http://pi.feedsportal.com/r/173953768794/u/49/f/609642/c/33859/s/313aa99e/kg/391/a2t.img" border="0" /> 

<div>
  <a href="http://feeds.weblogssl.com/~ff/genbetadev?a=dwYToo9CWyQ:PznMSD4Rg9o:yIl2AUoC8zA" target="_blank"><img src="http://feeds.feedburner.com/~ff/genbetadev?d=yIl2AUoC8zA" border="0" /></a> <a href="http://feeds.weblogssl.com/~ff/genbetadev?a=dwYToo9CWyQ:PznMSD4Rg9o:7Q72WNTAKBA" target="_blank"><img src="http://feeds.feedburner.com/~ff/genbetadev?d=7Q72WNTAKBA" border="0" /></a>
</div>

<img src="http://feeds.feedburner.com/~r/genbetadev/~4/dwYToo9CWyQ" height="1" width="1" />