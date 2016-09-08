---
id: 450
title: 'CentOS: Instalar RKHunter'
date: 2013-03-12T20:13:00+00:00
author: ovalenzuela
layout: post
guid: https://ovalenzueladotcom.wordpress.com/2013/03/12/centos-instalar-rkhunter
permalink: /2013/03/centos-instalar-rkhunter.html
blogger_blog:
  - www.ovalenzuela.com
blogger_author:
  - Andrés Barrera
blogger_02f5be51301771664ae7c1c72bf29246_permalink:
  - 838767887004997768
dsq_thread_id:
  - 3200622725
categories:
  - GNU con Linux
  - Google
---
<div>
  <a href="http://www.ovalenzuela.com/wp-content/uploads/2016/02/9c199-rkhunter.png"><img border="0" height="77" src="http://www.ovalenzuela.com/wp-content/uploads/2016/02/9c199-rkhunter.png?w=300" width="320" /></a>
</div>

En el post anterior vimos como instalar y configurar CHKROOTKIT, ahora toca el turno a RKHunter.  
RKHunter es una herramienta que &#8220;escanea&#8221; nuestro sistema por rootkits, backdoors y posibles ataques locales (exploits), comparando las firmas MD5 de archivos importantes del sistema con una base de datos online. Adicionalmente, identifica directorios extraños, permisos equivocados, archivos ocultos, strings sospechosos en modulos dell kernel y otras pruebas que ya ni me acuerdo, así que mejor a instalar:

Paso 1: Descargar, instalar y actualizar

[root@servidor ~]# cd /usr/local/src  
[root@servidor ~]# wget http://dfn.dl.sourceforge.net/sourceforge/rkhunter/rkhunter-1.3.6.tar.gz  
[root@servidor ~]# wget http://dfn.dl.sourceforge.net/sourceforge/rkhunter/rkhunter-1.3.6.tar.gz.sha1.txt  
[root@servidor ~]# sha1sum -c rkhunter-1.3.6.tar.gz.sha1.txt  
[root@servidor ~]# tar -zxvf rkhunter-1.3.6.tar.gz  
[root@servidor ~]# cd rkhunter-1.3.6  
[root@servidor ~]# ./installer.sh &#8211;layout default &#8211;install  
[root@servidor ~]# /usr/local/bin/rkhunter &#8211;update  
[root@servidor ~]# /usr/local/bin/rkhunter &#8211;propupd  
[root@servidor ~]# rm -Rf /usr/local/src/rkhunter*  
[root@servidor ~]# cd

Con esto, se habrá instalado el software y se ha creado una &#8220;imagen&#8221; de lo que tenemos instalado y su estado.

Paso 2: Agregar una tarea de verificación díaria:

[root@servidor ~]# nano -w /etc/cron.daily/rkhunter.sh

Agregamos lo siguiente, cambiando usuario@dominio.tld por nuestro correo:  
#!/bin/sh  
(  
/usr/local/bin/rkhunter &#8211;versioncheck  
/usr/local/bin/rkhunter &#8211;update  
/usr/local/bin/rkhunter &#8211;cronjob &#8211;report-warnings-only  
) | /bin/mail -s &#8216;rkhunter Daily Run (MiServidor)&#8217; usuario@dominio.tld

Asignamos los permisos necesarios:

[root@servidor ~]# chmod 700 /etc/cron.daily/rkhunter.sh

Y listo! 

<div>
  Publicado originalmente por Oscar Valenzuela en http://ovalenzuela.xpertians.com &#8211; Puede ser compartido y copiado libremente, mientras mantenga esta nota.
</div>