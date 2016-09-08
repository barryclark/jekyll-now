---
id: 247
title: Cyanogen se disculpa por un error ocurrido en las actualizaciones via OTA de los Galaxy S3 y S4
date: 2014-02-25T13:31:00+00:00
author: ovalenzuela
layout: post
guid: https://ovalenzueladotcom.wordpress.com/2014/02/25/cyanogen-se-disculpa-por-un-error-ocurrido-en-las-actualizaciones-via-ota-de-los-galaxy-s3-y-s4
permalink: /2014/02/cyanogen-se-disculpa-por-un-error-ocurrido-en-las-actualizaciones-via-ota-de-los-galaxy-s3-y-s4.html
blogger_blog:
  - www.ovalenzuela.com
blogger_author:
  - Andrés Barrera
blogger_02f5be51301771664ae7c1c72bf29246_permalink:
  - 5799041146107346882
dsq_thread_id:
  - 4704417147
categories:
  - Google
---
[<img class="alignnone size-large wp-image-124689" alt="cyanogenmod-imagen-boot" src="http://www.elandroidelibre.com/wp-content/uploads/2014/01/cyanogenmod-imagen-boot-680x452.jpg" width="680" height="452" />](http://www.elandroidelibre.com/wp-content/uploads/2014/01/cyanogenmod-imagen-boot.jpg)

Un fallo lo tiene cualquiera, aunque uno de este tipo tiene delito. La nueva OTA repartida a través del instalador de CyanogenMod deja **inútiles** los dispositivos **Galaxy S3** y **Galaxy S4** que actualizaron a la **última versión de CM11**. Ya que después de la instalación de esta **OTA**, al reiniciar, el móvil no arrancaba.

La causa de esto fue porque el equipo de desarrolladores de CyanogenMod pretendían **unificar las versiones de CM11 del Galaxy S3 y Galaxy S4 en una**, para optimizar así el funcionamiento de las actualizaciones OTA.

En un principio, programaron su servidor para que repartiera las OTA de modo que para los Galaxy S3 y Galaxy S4 realizará los **mismos procesos con una ROM única**. ¿Dónde está el fallo?, la versión unificada funcionaba correctamente pero a última hora decidieron probarla durante más tiempo para **asegurar el buen funcionamiento** de ésta.

Esto no lo modificaron en el instalador y la sorpresa fue que el flasheo de la OTA en estos dispositivos fue un fracaso, modificando su **sistema de booteo** y no permitiendo que el dispositivo arranque. Una sorpresa un tanto desagradable para los usuarios. **No incorporaron la ROM modificada sino que dejaron las antiguas versiones**, por lo tanto el proceso de flasheo fue incorrecto.

## Los desarrolladores ya han lanzado una solución

Asumiendo totalmente la culpa, los desarrolladores de CyanogenMod han lanzado un **solución** para estos terminales con los que se **corregiría este fallo del arranque** y el terminal arrancaría correctamente. Corriendo la última versión de CM11.

Si sois unos de los afectados, desde el <a href="http://forum.cyanogenmod.com/topic/88951-sideload-fix-for-recent-s3-and-s4-ota-update-issue/" target="_blank">foro de soporte </a>de **CyanogenMod** os traemos la solución en **forma de ejecutable para Windows** y un **ZIP para instalarlo por sideload** si sois más manitas.

A continuación os dejamos con los **links de los ejecutables** (.EXE) para arreglar el problema de esta actualización. Tan sólo tenéis que iniciarlo y **seguir los pasos que se os muestren por pantalla**. Los desarrolladores se han esforzado en hacerlo intuitivo. Qué menos.

  * Samsung Galaxy S III (<a href="http://dist01.slc.cyngn.com/buildFixes/cm-11-20140109-SNAPSHOT-InstallerXNPQ02R-d2att.exe" target="_blank">AT&T</a>)
  * Samsung Galaxy S III (<a href="http://dist01.slc.cyngn.com/buildFixes/cm-11-20140109-SNAPSHOT-InstallerXNPQ02R-d2cri.exe" target="_blank">Cricket</a>)
  * Samsung Galaxy S III (<a href="http://dist01.slc.cyngn.com/buildFixes/cm-11-20140109-SNAPSHOT-InstallerXNPQ02R-d2spr.exe" target="_blank">Sprint</a>)
  * Samsung Galaxy S III (<a href="http://dist01.slc.cyngn.com/buildFixes/cm-11-20140109-SNAPSHOT-InstallerXNPQ02R-d2tmo.exe" target="_blank">T-Mobile</a>)
  * Samsung Galaxy S III (<a href="http://dist01.slc.cyngn.com/buildFixes/cm-11-20140110-SNAPSHOT-InstallerXNPQ02R-d2usc.exe" target="_blank">US Cellular</a>)
  * Samsung Galaxy S4 (<a href="http://dist01.slc.cyngn.com/buildFixes/cm-11-20140110-SNAPSHOT-InstallerXNPQ02R-jfltecan.exe" target="_blank">Canada</a>)
  * Samsung Galaxy S4 (<a href="http://dist01.slc.cyngn.com/buildFixes/cm-11-20140110-SNAPSHOT-InstallerXNPQ02R-jfltecri.exe" target="_blank">Cricket</a>)
  * Samsung Galaxy S4 (<a href="http://dist01.slc.cyngn.com/buildFixes/cm-11-20140110-SNAPSHOT-InstallerXNPQ02R-jfltecsp.exe" target="_blank">C Spire</a>)
  * Samsung Galaxy S4 (<a href="http://dist01.slc.cyngn.com/buildFixes/cm-11-20140110-SNAPSHOT-InstallerXNPQ02R-jfltespr.exe" target="_blank">Sprint</a>)
  * Samsung Galaxy S4 (<a href="http://dist01.slc.cyngn.com/buildFixes/cm-11-20140110-SNAPSHOT-InstallerXNPQ02R-jfltetmo.exe" target="_blank">T-Mobile</a>)
  * Samsung Galaxy S4 (<a href="http://dist01.slc.cyngn.com/buildFixes/cm-11-20140110-SNAPSHOT-InstallerXNPQ02R-jflteusc.exe" target="_blank">US Cellular</a>)
  * Samsung Galaxy S4 (<a href="http://dist01.slc.cyngn.com/buildFixes/cm-11-20140110-SNAPSHOT-InstallerXNPQ02R-jfltexx.exe" target="_blank">Internacional</a>)

En el caso de que ya estéis familiarizados con las herramientas **ADB**, también podéis arreglar este problema **flasheando por ADB** el archivo **ZIP** correspondiente a vuestro dispositivo.

  * Samsung Galaxy S III (<a href="https://fota.cyngn.com/get/jenkins/406/cm-11-20140109-SNAPSHOT-InstallerXNPQ02R-d2att-signed.zip" target="_blank">AT&T</a>)
  * Samsung Galaxy S III (<a href="https://fota.cyngn.com/get/jenkins/407/cm-11-20140109-SNAPSHOT-InstallerXNPQ02R-d2cri-signed.zip" target="_blank">Cricket</a>)
  * Samsung Galaxy S III (<a href="https://fota.cyngn.com/get/jenkins/408/cm-11-20140109-SNAPSHOT-InstallerXNPQ02R-d2spr-signed.zip" target="_blank">Sprint</a>)
  * Samsung Galaxy S III (<a href="https://fota.cyngn.com/get/jenkins/409/cm-11-20140109-SNAPSHOT-InstallerXNPQ02R-d2tmo-signed.zip" target="_blank">T-Mobile</a>)
  * Samsung Galaxy S III (<a href="https://fota.cyngn.com/get/jenkins/410/cm-11-20140110-SNAPSHOT-InstallerXNPQ02R-d2usc-signed.zip" target="_blank">US Cellular</a>)
  * Samsung Galaxy S4 (<a href="https://fota.cyngn.com/get/jenkins/415/cm-11-20140110-SNAPSHOT-InstallerXNPQ02R-jfltecan-signed.zip" target="_blank">Canada</a>)
  * Samsung Galaxy S4 (<a href="https://fota.cyngn.com/get/jenkins/416/cm-11-20140110-SNAPSHOT-InstallerXNPQ02R-jfltecri-signed.zip" target="_blank">Cricket</a>)
  * Samsung Galaxy S4 (<a href="https://fota.cyngn.com/get/jenkins/417/cm-11-20140110-SNAPSHOT-InstallerXNPQ02R-jfltecsp-signed.zip" target="_blank">C Spire</a>)
  * Samsung Galaxy S4 (<a href="https://fota.cyngn.com/get/jenkins/418/cm-11-20140110-SNAPSHOT-InstallerXNPQ02R-jfltespr-signed.zip" target="_blank">Sprint</a>)
  * Samsung Galaxy S4 (<a href="https://fota.cyngn.com/get/jenkins/419/cm-11-20140110-SNAPSHOT-InstallerXNPQ02R-jfltetmo-signed.zip" target="_blank">T-Mobile</a>)
  * Samsung Galaxy S4 (<a href="https://fota.cyngn.com/get/jenkins/420/cm-11-20140110-SNAPSHOT-InstallerXNPQ02R-jflteusc-signed.zip" target="_blank">US Cellular</a>)
  * Samsung Galaxy S4 (<a href="https://fota.cyngn.com/get/jenkins/421/cm-11-20140110-SNAPSHOT-InstallerXNPQ02R-jfltexx-signed.zip" target="_blank">Internacionall</a>)

Un buen gesto por parte de CyanogenMod el **lanzar esta serie de correcciones** ya que ha sido su culpa que miles de terminales Galaxy S3 y Galaxy S4 se apaguen para no volverse a iniciar. Además, los métodos de reparación no son difíciles de aplicar, que es de agradecer. Incluso para Windows hay un instalador guiado.

¿Os ha ocurrido esto?, comentad debajo.

Fuente | <a href="http://www.cyanogenmod.org/blog/cm-installer-ota-issue-identified-with-d2-and-jf" target="_blank">CyanogenMod Blog</a>

El artículo [Cyanogen se disculpa por un error ocurrido en las actualizaciones via OTA de los Galaxy S3 y S4](http://www.elandroidelibre.com/2014/02/cyanogen-se-disculpa-por-un-error-ocurrido-en-las-actualizaciones-via-ota-de-los-galaxy-s3-y-s4.html) se publicó en [El Androide Libre](http://www.elandroidelibre.com) (El Blog Android de referencia. Aplicaciones, noticias, Juegos y smartphones Android Libres)


<img width="1" height="1" src="http://rss.feedsportal.com/c/34005/f/617036/s/378602ec/sc/15/mf.gif" border="0" /> 

<div>
  <table border='0'>
    <tr>
      <td valign='middle'>
        <a href="http://share.feedsportal.com/share/twitter/?u=http%3A%2F%2Fwww.elandroidelibre.com%2F2014%2F02%2Fcyanogen-se-disculpa-por-un-error-ocurrido-en-las-actualizaciones-via-ota-de-los-galaxy-s3-y-s4.html&t=Cyanogen+se+disculpa+por+un+error+ocurrido+en+las+actualizaciones+via+OTA+de+los+Galaxy+S3+y+S4" target="_blank"><img src="http://res3.feedsportal.com/social/twitter.png" border="0" /></a> <a href="http://share.feedsportal.com/share/facebook/?u=http%3A%2F%2Fwww.elandroidelibre.com%2F2014%2F02%2Fcyanogen-se-disculpa-por-un-error-ocurrido-en-las-actualizaciones-via-ota-de-los-galaxy-s3-y-s4.html&t=Cyanogen+se+disculpa+por+un+error+ocurrido+en+las+actualizaciones+via+OTA+de+los+Galaxy+S3+y+S4" target="_blank"><img src="http://res3.feedsportal.com/social/facebook.png" border="0" /></a> <a href="http://share.feedsportal.com/share/linkedin/?u=http%3A%2F%2Fwww.elandroidelibre.com%2F2014%2F02%2Fcyanogen-se-disculpa-por-un-error-ocurrido-en-las-actualizaciones-via-ota-de-los-galaxy-s3-y-s4.html&t=Cyanogen+se+disculpa+por+un+error+ocurrido+en+las+actualizaciones+via+OTA+de+los+Galaxy+S3+y+S4" target="_blank"><img src="http://res3.feedsportal.com/social/linkedin.png" border="0" /></a> <a href="http://share.feedsportal.com/share/gplus/?u=http%3A%2F%2Fwww.elandroidelibre.com%2F2014%2F02%2Fcyanogen-se-disculpa-por-un-error-ocurrido-en-las-actualizaciones-via-ota-de-los-galaxy-s3-y-s4.html&t=Cyanogen+se+disculpa+por+un+error+ocurrido+en+las+actualizaciones+via+OTA+de+los+Galaxy+S3+y+S4" target="_blank"><img src="http://res3.feedsportal.com/social/googleplus.png" border="0" /></a> <a href="http://share.feedsportal.com/share/email/?u=http%3A%2F%2Fwww.elandroidelibre.com%2F2014%2F02%2Fcyanogen-se-disculpa-por-un-error-ocurrido-en-las-actualizaciones-via-ota-de-los-galaxy-s3-y-s4.html&t=Cyanogen+se+disculpa+por+un+error+ocurrido+en+las+actualizaciones+via+OTA+de+los+Galaxy+S3+y+S4" target="_blank"><img src="http://res3.feedsportal.com/social/email.png" border="0" /></a>
      </td>
      
      <td valign='middle'>
      </td>
    </tr>
  </table>
</div>

[<img src="http://da.feedsportal.com/r/186531082697/u/49/f/617036/c/34005/s/378602ec/sc/15/rc/1/rc.img" border="0" />](http://da.feedsportal.com/r/186531082697/u/49/f/617036/c/34005/s/378602ec/sc/15/rc/1/rc.htm)  
[<img src="http://da.feedsportal.com/r/186531082697/u/49/f/617036/c/34005/s/378602ec/sc/15/rc/2/rc.img" border="0" />](http://da.feedsportal.com/r/186531082697/u/49/f/617036/c/34005/s/378602ec/sc/15/rc/2/rc.htm)  
[<img src="http://da.feedsportal.com/r/186531082697/u/49/f/617036/c/34005/s/378602ec/sc/15/rc/3/rc.img" border="0" />](http://da.feedsportal.com/r/186531082697/u/49/f/617036/c/34005/s/378602ec/sc/15/rc/3/rc.htm)

[<img src="http://da.feedsportal.com/r/186531082697/u/49/f/617036/c/34005/s/378602ec/a2.img" border="0" />](http://da.feedsportal.com/r/186531082697/u/49/f/617036/c/34005/s/378602ec/a2.htm)
<img width="1" height="1" src="http://pi.feedsportal.com/r/186531082697/u/49/f/617036/c/34005/s/378602ec/a2t.img" border="0" /> 

<div>
  <a href="http://feeds.feedburner.com/~ff/elandroidelibre?a=Ldb_v-FO56w:ukCKtBBV6LE:ecdYMiMMAMM"><img src="http://feeds.feedburner.com/~ff/elandroidelibre?d=ecdYMiMMAMM" border="0" /></a> <a href="http://feeds.feedburner.com/~ff/elandroidelibre?a=Ldb_v-FO56w:ukCKtBBV6LE:V_sGLiPBpWU"><img src="http://feeds.feedburner.com/~ff/elandroidelibre?i=Ldb_v-FO56w:ukCKtBBV6LE:V_sGLiPBpWU" border="0" /></a> <a href="http://feeds.feedburner.com/~ff/elandroidelibre?a=Ldb_v-FO56w:ukCKtBBV6LE:7Q72WNTAKBA"><img src="http://feeds.feedburner.com/~ff/elandroidelibre?d=7Q72WNTAKBA" border="0" /></a> <a href="http://feeds.feedburner.com/~ff/elandroidelibre?a=Ldb_v-FO56w:ukCKtBBV6LE:dnMXMwOfBR0"><img src="http://feeds.feedburner.com/~ff/elandroidelibre?d=dnMXMwOfBR0" border="0" /></a> <a href="http://feeds.feedburner.com/~ff/elandroidelibre?a=Ldb_v-FO56w:ukCKtBBV6LE:yIl2AUoC8zA"><img src="http://feeds.feedburner.com/~ff/elandroidelibre?d=yIl2AUoC8zA" border="0" /></a> <a href="http://feeds.feedburner.com/~ff/elandroidelibre?a=Ldb_v-FO56w:ukCKtBBV6LE:qj6IDK7rITs"><img src="http://feeds.feedburner.com/~ff/elandroidelibre?d=qj6IDK7rITs" border="0" /></a> <a href="http://feeds.feedburner.com/~ff/elandroidelibre?a=Ldb_v-FO56w:ukCKtBBV6LE:I9og5sOYxJI"><img src="http://feeds.feedburner.com/~ff/elandroidelibre?d=I9og5sOYxJI" border="0" /></a>
</div>

<img src="http://feeds.feedburner.com/~r/elandroidelibre/~4/Ldb_v-FO56w" height="1" width="1" />