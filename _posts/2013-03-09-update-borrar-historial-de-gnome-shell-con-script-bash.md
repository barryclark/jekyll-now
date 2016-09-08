---
id: 465
title: 'UPDATE: Borrar historial de GNOME Shell con script bash'
date: 2013-03-09T21:26:00+00:00
author: ovalenzuela
layout: post
guid: https://ovalenzueladotcom.wordpress.com/2013/03/09/update-borrar-historial-de-gnome-shell-con-script-bash
permalink: /2013/03/update-borrar-historial-de-gnome-shell-con-script-bash.html
blogger_blog:
  - www.ovalenzuela.com
blogger_author:
  - Andrés Barrera
blogger_02f5be51301771664ae7c1c72bf29246_permalink:
  - 500625248115769001
categories:
  - Amigos
---
En momentos de ocio, hice este script para eliminar el historial de GNOME Shell. Está en bash y Zenity para la interacción.

<pre>#!/bin/bash<br /><br />fileHistorial=~/.local/share/recently-used.xbel<br /><br />zenity --question --text="¿Borrará todo el historial de su Shell?"<br /><br />if  [ $? -eq 0 ] ; then<br /><br />        if [ -f $fileHistorial ]; then<br />                rm ~/.local/share/recently-used.xbel<br />                 zenity --info --text="Historial eliminado"<br />        else<br />                zenity --info --text="No tiene historial."<br />        fi<br /><br />fi</pre>

Más adelante haré un post sobre Zenity, ya que tiene bastantes bondades para scripts simples.