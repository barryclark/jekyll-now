---
id: 391
title: 'MotoTool: Todo lo que necesitas para rootear, restaurar o convertir en GPE tu Moto G'
date: 2014-02-13T15:09:00+00:00
author: ovalenzuela
layout: post
guid: https://ovalenzueladotcom.wordpress.com/2014/02/13/mototool-todo-lo-que-necesitas-para-rootear-restaurar-o-convertir-en-gpe-tu-moto-g
permalink: /2014/02/mototool-todo-lo-que-necesitas-para-rootear-restaurar-o-convertir-en-gpe-tu-moto-g.html
blogger_blog:
  - www.ovalenzuela.com
blogger_author:
  - Andrés Barrera
blogger_02f5be51301771664ae7c1c72bf29246_permalink:
  - 2129617603503123229
categories:
  - Google
---
[<img class="alignnone size-medium wp-image-127098" alt="moto-tool-1" src="http://www.elandroidelibre.com/wp-content/uploads/2014/02/moto-tool-1-400x400.jpg" width="400" height="400" />](http://www.elandroidelibre.com/wp-content/uploads/2014/02/moto-tool-1.jpg)

No todo el mundo está familiarizado con la ventana de terminal con la que hay que tratar para “trastear” con algunos dispositivos Android. Incluso hay personas que se amedrentan cuando se ponen delante de la ventana de comandos. Para ellos existe una solución para que también puedan juguetear con su Android, concretamente, con los **Moto G**.

## Flashea un custom recovery, restaura tu Android o conviértelo en GPE

**MotoTool** es una **herramienta con interfaz gráfica** para **Windows** con la que podrás realizar de forma mucho más intuitiva muchas modificaciones de tu terminal Moto.

**IMPORTANTE**: Antes de empezar con cualquiera de estos procedimientos tendrías que cumplir el requisito más importante, tener <a href="https://motorola-global-portal.custhelp.com/app/standalone/bootloader/unlock-your-device-a/action/auth" target="_blank">desbloqueado el bootloader</a> del dispositivo.

[<img class="size-large wp-image-127099 aligncenter" alt="capture-mototool-3" src="http://www.elandroidelibre.com/wp-content/uploads/2014/02/capture-mototool-3-680x425.png" width="680" height="425" />](http://www.elandroidelibre.com/wp-content/uploads/2014/02/capture-mototool-3.png)

Cuando descargamos el archivo y lo descomprimimos, nos encontramos con una carpeta con múltiples archivos dentro, entre los que se encuentra un ejecutable llamado “**AllinoneMotoTool**“. Ni que decir tiene que este es el programa ejecutable.

Una vez ejecutemos **MotoTool** nos encontraremos con una **interfaz muy sencilla** y asequible para cualquier usuario. Si nos fijamos en la parte superior del programa nos encontramos con dos pestañas, una destinada para los dispositivos **Moto que sean Google Play Edition** (Moto G comprado en la Play Store) y los que **no sean GPE** (Comprado en alguna tienda).

[<img class="alignnone size-large wp-image-127101" alt="capture-mototool-1" src="http://www.elandroidelibre.com/wp-content/uploads/2014/02/capture-mototool-1-680x425.png" width="680" height="425" />](http://www.elandroidelibre.com/wp-content/uploads/2014/02/capture-mototool-1.png)

Las funcionalidades que posee este programa son **bastante completas** aunque en mi opinión le falta una de las más importantes, hacer **root**. Aún así, el proceso de rootear es bastante sencillo una vez que estamos frente al MotoTool.

A continuación os mostramos paso por paso **como hacer root a tu Moto G con ayuda de** **MotoTool**:

  1. Conectamos el dispositivo en **Modo Depuración USB**
  2. Nos situamos en la pestaña correcta. (GPE o NO-GPE)
  3. Si no tenemos los drivers instalados, pulsamos en **Install Drivers** y luego en **Do it!**
  4. Seleccionamos el **sistema operativo** (KitKat 4.4 – 4.4.2 o JellyBean 4.3)
  5. Marcamos **Push SU 2SD** en el apartado Tools y en el icono **Do it!**
  6. Marcamos el **Custom Recovery** que queramos, en este caso **CWM** y le dais a **Flash it!**
  7. Cuando estéis en el modo fastboot, le dais al **botón vol &#8211;** hasta posicionaros encima de **Recovery Mode** y pulsáis en **vol + para selccionarlo**
  8. Pulsáis sobre **Choose Zip from SD Card**
  9. Buscáis **supersu.zip**
 10. Flasheais, reiniciais y listo

A pesar de esta carencia del programa, **MotoTool** es bastante completo porque te ahorra los pasos de **flashear el Custom Recovery** y de copiar el archivo de **SuperSU**. Tampoco ha sido muy duro el proceso de rooteo, ¿no?

Dentro del <a href="http://forum.xda-developers.com/showthread.php?t=2635706" target="_blank">tema del foro de XDA</a> propio de esta aplicación nos encontramos con la **lista completa** de las **funcionalidades** que ofrece **MotoTool**:

  * Flash Stock Recovery
  * Flash Custom Recovery (CWM o TWRP)
  * Reiniciar el terminal en modo recovery o fastboot
  * Copia al teléfono el archivo de SuperSU
  * Restaura instalando de nuevo el sistema operativo a dispositivos NO-GPE
  * Restaura instalando de nuevo el sistema operativo a dispositivos GPE o convierte en GPE tu dispositivo NO-GPE

El **link de descarga** de **MotoTool** lo podéis encontrar en el **tema de XDA** y también os lo facilitamos:

> MotoTool versión 2.2 (<a href="https://mega.co.nz/#!zAZk0A7L!BwHIy9lE-cA9gu7rHzho2qRhRzoKo8iXBSImArfBP0o" target="_blank">MEGA</a>)

### Para restaurar el dispositivo antes habrá que descargar el sistema operativo

Una de las cosas que le faltan a este programa es que traiga ya consigo los firmwares o que los descargue remotamente de algún servidor. Pero tampoco nos vamos a poner exquisitos, que bastante tenemos con no tener que meter los comandos por el terminal para flashear la ROM.

Por eso tendréis que **descargar** por vosotros mismos el archivo correspondiente a vuestro dispositivo y copiarlo **DESCOMPRIMIDO** en la carpeta **RestoreImage** o **GpeImage** dependiendo de si se trata de una imagen GPE o NO-GPE.

[<img class="alignnone size-full wp-image-127108" alt="captura-version" src="http://www.elandroidelibre.com/wp-content/uploads/2014/02/captura-version.png" width="360" height="349" />](http://www.elandroidelibre.com/wp-content/uploads/2014/02/captura-version.png)

A continuación os mostramos los **links** de descarga facilitados por el desarrollador de la aplicación para descargar tanto la **ROM original de Motorola para el Moto G** como la que **ROM GPE**. Dentro de la página de Motorola tendréis que descargar la versión **según vuestro modelo**. (Ajustes > Acerca del teléfono > Versión del sistema)

> ROM Original NO-GPE para Moto G (<a href="http://sbf.droid-developers.org/phone.php?device=14" target="_blank">página oficial</a>)
> 
> ROM Original GPE para Moto G (<a href="https://mega.co.nz/#!3dZB1YAR!Yd6J9Yg_rtSgSpAY8_ZyKJXtweiCzhkevlvKwnEfFN0" target="_blank">MEGA</a>)

## Buen programa pero aún por completar

Mi opinión acerca de este programa es buena. Un programa que facilite estas labores a personas con poco dominio de la ventana del terminal es algo que hace falta. Porque es cierto que hay personas que no hacen esta serie de cosas por no atreverse a enfrentarse a la **ventana de comandos**. Lo sé porque en mi caso cuando empecé con Android me pasaba.

Es **un programa fantástico pero por completar**. Creo que lo que le falta a este programa es que **descargue remotamente el firmware de tu dispositivo** (aunque lo veo difícil habiendo tantas versiones distintas) y que el proceso de **rooteo** sea en **un click** como el resto de cosas.

Espero que el **desarrollador** siga con este programa adelante y que en próximas actualizaciones nos encontramos con una suite completa para Moto G.

El artículo [MotoTool: Todo lo que necesitas para rootear, restaurar o convertir en GPE tu Moto G](http://www.elandroidelibre.com/2014/02/mototool-todo-lo-que-necesitas-para-rootear-restaurar-o-convertir-en-gpe-tu-moto-g.html) se publicó en [El Androide Libre](http://www.elandroidelibre.com) (El Blog Android de referencia. Aplicaciones, noticias, Juegos y smartphones Android Libres)


<img width="1" height="1" src="http://rss.feedsportal.com/c/34005/f/617036/s/37123ad5/sc/5/mf.gif" border="0" /> 

<div>
  <table border='0'>
    <tr>
      <td valign='middle'>
        <a href="http://share.feedsportal.com/share/twitter/?u=http%3A%2F%2Fwww.elandroidelibre.com%2F2014%2F02%2Fmototool-todo-lo-que-necesitas-para-rootear-restaurar-o-convertir-en-gpe-tu-moto-g.html&t=MotoTool%3A+Todo+lo+que+necesitas+para+rootear%2C+restaurar+o+convertir+en+GPE+tu+Moto+G" target="_blank"><img src="http://res3.feedsportal.com/social/twitter.png" border="0" /></a> <a href="http://share.feedsportal.com/share/facebook/?u=http%3A%2F%2Fwww.elandroidelibre.com%2F2014%2F02%2Fmototool-todo-lo-que-necesitas-para-rootear-restaurar-o-convertir-en-gpe-tu-moto-g.html&t=MotoTool%3A+Todo+lo+que+necesitas+para+rootear%2C+restaurar+o+convertir+en+GPE+tu+Moto+G" target="_blank"><img src="http://res3.feedsportal.com/social/facebook.png" border="0" /></a> <a href="http://share.feedsportal.com/share/linkedin/?u=http%3A%2F%2Fwww.elandroidelibre.com%2F2014%2F02%2Fmototool-todo-lo-que-necesitas-para-rootear-restaurar-o-convertir-en-gpe-tu-moto-g.html&t=MotoTool%3A+Todo+lo+que+necesitas+para+rootear%2C+restaurar+o+convertir+en+GPE+tu+Moto+G" target="_blank"><img src="http://res3.feedsportal.com/social/linkedin.png" border="0" /></a> <a href="http://share.feedsportal.com/share/gplus/?u=http%3A%2F%2Fwww.elandroidelibre.com%2F2014%2F02%2Fmototool-todo-lo-que-necesitas-para-rootear-restaurar-o-convertir-en-gpe-tu-moto-g.html&t=MotoTool%3A+Todo+lo+que+necesitas+para+rootear%2C+restaurar+o+convertir+en+GPE+tu+Moto+G" target="_blank"><img src="http://res3.feedsportal.com/social/googleplus.png" border="0" /></a> <a href="http://share.feedsportal.com/share/email/?u=http%3A%2F%2Fwww.elandroidelibre.com%2F2014%2F02%2Fmototool-todo-lo-que-necesitas-para-rootear-restaurar-o-convertir-en-gpe-tu-moto-g.html&t=MotoTool%3A+Todo+lo+que+necesitas+para+rootear%2C+restaurar+o+convertir+en+GPE+tu+Moto+G" target="_blank"><img src="http://res3.feedsportal.com/social/email.png" border="0" /></a>
      </td>
      
      <td valign='middle'>
      </td>
    </tr>
  </table>
</div>

[<img src="http://da.feedsportal.com/r/186530612642/u/49/f/617036/c/34005/s/37123ad5/sc/5/rc/1/rc.img" border="0" />](http://da.feedsportal.com/r/186530612642/u/49/f/617036/c/34005/s/37123ad5/sc/5/rc/1/rc.htm)  
[<img src="http://da.feedsportal.com/r/186530612642/u/49/f/617036/c/34005/s/37123ad5/sc/5/rc/2/rc.img" border="0" />](http://da.feedsportal.com/r/186530612642/u/49/f/617036/c/34005/s/37123ad5/sc/5/rc/2/rc.htm)  
[<img src="http://da.feedsportal.com/r/186530612642/u/49/f/617036/c/34005/s/37123ad5/sc/5/rc/3/rc.img" border="0" />](http://da.feedsportal.com/r/186530612642/u/49/f/617036/c/34005/s/37123ad5/sc/5/rc/3/rc.htm)

[<img src="http://da.feedsportal.com/r/186530612642/u/49/f/617036/c/34005/s/37123ad5/a2.img" border="0" />](http://da.feedsportal.com/r/186530612642/u/49/f/617036/c/34005/s/37123ad5/a2.htm)
<img width="1" height="1" src="http://pi.feedsportal.com/r/186530612642/u/49/f/617036/c/34005/s/37123ad5/a2t.img" border="0" /> 

<div>
  <a href="http://feeds.feedburner.com/~ff/elandroidelibre?a=H_li1yHL9dI:Iki8uYhC3bE:ecdYMiMMAMM"><img src="http://feeds.feedburner.com/~ff/elandroidelibre?d=ecdYMiMMAMM" border="0" /></a> <a href="http://feeds.feedburner.com/~ff/elandroidelibre?a=H_li1yHL9dI:Iki8uYhC3bE:V_sGLiPBpWU"><img src="http://feeds.feedburner.com/~ff/elandroidelibre?i=H_li1yHL9dI:Iki8uYhC3bE:V_sGLiPBpWU" border="0" /></a> <a href="http://feeds.feedburner.com/~ff/elandroidelibre?a=H_li1yHL9dI:Iki8uYhC3bE:7Q72WNTAKBA"><img src="http://feeds.feedburner.com/~ff/elandroidelibre?d=7Q72WNTAKBA" border="0" /></a> <a href="http://feeds.feedburner.com/~ff/elandroidelibre?a=H_li1yHL9dI:Iki8uYhC3bE:dnMXMwOfBR0"><img src="http://feeds.feedburner.com/~ff/elandroidelibre?d=dnMXMwOfBR0" border="0" /></a> <a href="http://feeds.feedburner.com/~ff/elandroidelibre?a=H_li1yHL9dI:Iki8uYhC3bE:yIl2AUoC8zA"><img src="http://feeds.feedburner.com/~ff/elandroidelibre?d=yIl2AUoC8zA" border="0" /></a> <a href="http://feeds.feedburner.com/~ff/elandroidelibre?a=H_li1yHL9dI:Iki8uYhC3bE:qj6IDK7rITs"><img src="http://feeds.feedburner.com/~ff/elandroidelibre?d=qj6IDK7rITs" border="0" /></a> <a href="http://feeds.feedburner.com/~ff/elandroidelibre?a=H_li1yHL9dI:Iki8uYhC3bE:I9og5sOYxJI"><img src="http://feeds.feedburner.com/~ff/elandroidelibre?d=I9og5sOYxJI" border="0" /></a>
</div>

<img src="http://feeds.feedburner.com/~r/elandroidelibre/~4/H_li1yHL9dI" height="1" width="1" />