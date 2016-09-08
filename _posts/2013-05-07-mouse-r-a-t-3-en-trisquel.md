---
id: 437
title: Mouse R.A.T.3 en Trisquel
date: 2013-05-07T20:21:00+00:00
author: ovalenzuela
layout: post
guid: https://ovalenzueladotcom.wordpress.com/2013/05/07/mouse-r-a-t-3-en-trisquel
permalink: /2013/05/mouse-r-a-t-3-en-trisquel.html
blogger_blog:
  - www.ovalenzuela.com
blogger_author:
  - Andrés Barrera
blogger_02f5be51301771664ae7c1c72bf29246_permalink:
  - 6505976471398148057
categories:
  - GNU con Linux
  - Google
  - Hacks y Mods
---
Por una falla en mi Ultrabook, tuve que volver a mi antiguo netbook mientras el Ultrabook esta en servicio. Y uno de los temas que más me complicaba era el no poder usar mi Mouse RAT3 en Trisquel, así que acá dejo la configuración que utilice, por si a alguno le sirve.

sudo gedit /etc/X11/xorg.conf

Section &#8220;InputDevice&#8221;  
           # generated from default  
           Identifier     &#8220;Mouse0&#8221;  
           Driver         &#8220;evdev&#8221;  
           Option         &#8220;Name&#8221; &#8220;Saitek Cyborg R.A.T.3 Mouse&#8221;  
           Option         &#8220;Vendor&#8221; &#8220;06a3&#8221;  
           Option         &#8220;Product&#8221; &#8220;0ccc&#8221;  
           Option         &#8220;Protocol&#8221; &#8220;auto&#8221;  
           Option         &#8220;Device&#8221; &#8220;/dev/input/event4&#8221;  
           Option         &#8220;Emulate3Buttons&#8221; &#8220;no&#8221;  
           Option         &#8220;Buttons&#8221; &#8220;7&#8221;  
           Option         &#8220;ZAxisMapping&#8221; &#8220;4 5&#8221;  
           Option         &#8220;ButtonMapping&#8221; &#8220;1 2 3 4 5 6 7 0 0 0 0 0 0 0&#8221;  
           Option         &#8220;Resolution&#8221; &#8220;3200&#8221;  
EndSection

<div>
  Publicado originalmente por Oscar Valenzuela en http://ovalenzuela.xpertians.com &#8211; Puede ser compartido y copiado libremente, mientras mantenga esta nota.
</div>