---
id: 452
title: 'CentOS: Instalar CHKROOTKIT'
date: 2013-03-12T20:05:00+00:00
author: ovalenzuela
layout: post
guid: https://ovalenzueladotcom.wordpress.com/2013/03/12/centos-instalar-chkrootkit
permalink: /2013/03/centos-instalar-chkrootkit.html
blogger_blog:
  - www.ovalenzuela.com
blogger_author:
  - Andrés Barrera
blogger_02f5be51301771664ae7c1c72bf29246_permalink:
  - 4685068222444388542
dsq_thread_id:
  - 3086968292
categories:
  - GNU con Linux
  - Google
---
<div>
  <a href="http://www.ovalenzuela.com/wp-content/uploads/2016/02/be116-chkrootkit-logo.jpg"><img border="0" height="200" src="http://www.ovalenzuela.com/wp-content/uploads/2016/02/be116-chkrootkit-logo.jpg?w=132" width="118" /></a>
</div>

CHKROOTKIT es un excelente programa para salvaguardar nuestro servidores, su objetivo es proteger nuestros sistemas de rootkits o software modificado maliciosamente, con el objetivo de tomar control de nuestro sistema o simplemente dañarlo. Es uno de los software que DEBES tener instalado al momento de conectar un servidor a internet, sobre todo, si otros usuarios pueden acceder a ejecutar comandos sobre la maquina.  
Su instalación es bastante sencilla:

Paso 1: Descargamos el software:

[root@servidor ~]# cd /usr/local/src  
[root@servidor ~]# wget ftp://ftp.pangeia.com.br/pub/seg/pac/chkrootkit.tar.gz  
[root@servidor ~]# wget wget ftp://ftp.pangeia.com.br/pub/seg/pac/chkrootkit.md5  
[root@servidor ~]# md5sum -c chkrootkit.md5

Como se puede apreciar en lo comandos anteriores estamos verificando la integridad del software descargado. Sé que muchos no lo hacen, pero es una muy buena práctica, y en extremo necesario si estamos trabajando con software de seguridad y auditoría.

Paso 2: Instalamos el software:

[root@servidor ~]# tar -zxvf chkrootkit.tar.gz  
[root@servidor ~]# mkdir /usr/local/chkrootkit  
[root@servidor ~]# mv /usr/local/src/chkrootkit\*/\* /usr/local/chkrootkit  
[root@servidor ~]# cd /usr/local/chkrootkit  
[root@servidor ~]# make sense

Con el último paso se creará una base de registros del software ya existente, y se modificarán los permisos de algunos componentes para resguardar nuestro sistema ante ciertos ataques.

Paso 3: Agregarmos una tarea de revisión diaria:  
Con esta configuración, tendremos un reporte diario ante sucesos.

[root@servidor ~]# nano -w /etc/cron.daily/chkrootkit.sh

Y agregamos dentro del archivo lo siguiente, cambiando usuario@dominio.tld por nuestro correo:  
#!/bin/sh  
(  
/usr/local/chkrootkit/chkrootkit -q  
) | /bin/mail -s &#8216;CHROOTKIT Daily Run (MiServidor)&#8217; usuario@dominio.tld

Otorgamos permisos de ejecución al script:  
[root@servidor ~]# chmod 700 /etc/cron.daily/chkrootkit.sh

Paso 4: Por si las moscas, reiniciamos crontab:  
[root@servidor ~]# service crond restart 

<div>
  Publicado originalmente por Oscar Valenzuela en http://ovalenzuela.xpertians.com &#8211; Puede ser compartido y copiado libremente, mientras mantenga esta nota.
</div>