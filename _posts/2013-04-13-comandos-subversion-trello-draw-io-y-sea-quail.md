---
id: 439
title: Comandos SubVersion, Trello, Draw.io y Sea Quail
date: 2013-04-13T04:41:00+00:00
author: ovalenzuela
layout: post
guid: https://ovalenzueladotcom.wordpress.com/2013/04/13/comandos-subversion-trello-draw-io-y-sea-quail
permalink: /2013/04/comandos-subversion-trello-draw-io-y-sea-quail.html
blogger_blog:
  - www.ovalenzuela.com
blogger_author:
  - Andrés Barrera
blogger_02f5be51301771664ae7c1c72bf29246_permalink:
  - 473553717945665929
categories:
  - Desarrollo
  - Google
  - Hacks y Mods
---
<div>
  <a href="http://www.ovalenzuela.com/wp-content/uploads/2016/02/65660-logosubversion.png"><img border="0" height="172" src="http://www.ovalenzuela.com/wp-content/uploads/2016/02/65660-logosubversion.png?w=300" width="200" /></a>
</div>

<span>Esta semana, varios me han preguntado sobre recursos para trabajar a diario con la aventura de trabajar en desarrollo de software y gestión, y bueno, respondiendo a estas consultas aquí va una pequeña lista de recursos para trabajar a la rápida:</span>  
<span>Para trabajar con versionamiento de software, utilizamos Subversion. Es posible que muchos usen GIT, pero simplemente no voy con la moda y no me cae bien su autor.</span>  
<span><br /></span><span>Descargarnos un proyecto:</span>  
<span>svn co -r HEAD http://www.dominio.com/svn/repositorio repositorio &#8211;username usuario</span>  
<span><br /></span><span>Actualizar el repositorio local:</span>  
<span>cd /ruta/del/repositorio/</span>  
<span>svn up</span>  
<span><br /></span><span>Publicar en el repositorio remoto:</span>  
<span>cd /ruta/del/repositorio/</span>  
<span>svn commit -m &#8220;mensaje de referencia a los cambios realizados&#8221;</span>  
<span><br /></span><span>Limpiar conflictos:</span>  
<span>cd /ruta/del/repositorio/</span>  
<span>svn cleanup</span>  
<span><br /></span><span>Volver atrás a una versión especifica, ejemplo de la versión actual 150 a la versión 140:</span>  
<span>cd /ruta/del/repositorio/</span>  
<span>svn update</span>  
<span>svn merge -r 150:140 .</span>  
<span>svn commit -m &#8220;Recuperado a la versión r140&#8221;</span>  
<span><br /></span><span>Ahora bien, respecto a los otros recursos, el primero es <a href="http://trello.com/" target="_blank">Trello</a>, un excelente gestor de proyectos tipo Kanban, <a href="http://www.draw.io/">Draw.io</a><span></span><span></span><a href="http://www.blogger.com/"></a> para dibujar y crear diagramas y finalmente, el editor de diagramas para bases de datos de <a href="http://diagrams.seaquail.net/" target="_blank">Sea Quail</a>.</span> 

<div>
</div>

<div>
  Publicado originalmente por Oscar Valenzuela en http://ovalenzuela.xpertians.com &#8211; Puede ser compartido y copiado libremente, mientras mantenga esta nota.
</div>