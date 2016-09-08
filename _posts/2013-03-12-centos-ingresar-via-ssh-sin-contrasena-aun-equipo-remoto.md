---
id: 458
title: 'CenTOS: Ingresar vía SSH sin contraseña aun equipo remoto'
date: 2013-03-12T18:04:00+00:00
author: ovalenzuela
layout: post
guid: https://ovalenzueladotcom.wordpress.com/2013/03/12/centos-ingresar-via-ssh-sin-contrasena-aun-equipo-remoto
permalink: /2013/03/centos-ingresar-via-ssh-sin-contrasena-aun-equipo-remoto.html
blogger_blog:
  - www.ovalenzuela.com
blogger_author:
  - Andrés Barrera
blogger_02f5be51301771664ae7c1c72bf29246_permalink:
  - 4369351885579244833
dsq_thread_id:
  - 4853786823
categories:
  - GNU con Linux
  - Google
  - Hacks y Mods
---
Algo que siempre se me olvida, es como generar y copiar unas llaves ssh a otra maquina, para que al ingresar vía ssh no pida nuevamente la contraseña, algo muy útil cuando debes hacer scripts que ejecuten comandos en forma remota.

Lo primero entonces, será considerar que nosotros queremos ingresar desde la maquina llamada mi pc a un servidor, en ambos tendremos el mismo usuario creado, aunque pudiéramos cambiarlo si es lo que se necesita.

Paso 1: Lo primero, en nuestro pc generaremos una nueva llave ssh, a las preguntas responderemos con un enter para seleccionar el default, excepto para la contraseña:  
[ovalenzuela@localhost ~]$ ssh-keygen -t rsa

Una vez respondido las preguntas, se debería haber generado un archivo, este lo usaremos después  por ahora debemos verificar que en el servidor exista el repositorio de claves:

[ovalenzuela@localhost ~]$ ssh ip_servidor -lroot  
[root@servidor ~]# ls .ssh/

Si nos responde que existe y nos despliega contenido, todo OK, sino, debemos crearlo:

[root@servidor ~]# mkdir -p .ssh

Ahora, nos desconectamos del servidor y procederemos a copiar la llave desde nuestro pc al servidor:  
[ovalenzuela@localhost ~]$ cd  
[ovalenzuela@localhost ~]$ cat .ssh/id\_rsa.pub | ssh root@ip\_servidor &#8216;cat >> .ssh/authorized_keys&#8217;

Luego de ingresar la contraseña del servidor por última vez, se copiarán las llaves y nos nos intentamos conectar, esta vez no nos solicitará la contraseña

[ovalenzuela@localhost ~]$ ssh ip_servidor -lroot  
[root@servidor ~]# 

<div>
  Publicado originalmente por Oscar Valenzuela en http://ovalenzuela.xpertians.com &#8211; Puede ser compartido y copiado libremente, mientras mantenga esta nota.
</div>