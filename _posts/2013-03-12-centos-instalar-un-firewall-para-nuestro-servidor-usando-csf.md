---
id: 455
title: 'CenTOS: Instalar un Firewall para nuestro servidor usando CSF'
date: 2013-03-12T19:36:00+00:00
author: ovalenzuela
layout: post
guid: https://ovalenzueladotcom.wordpress.com/2013/03/12/centos-instalar-un-firewall-para-nuestro-servidor-usando-csf
permalink: /2013/03/centos-instalar-un-firewall-para-nuestro-servidor-usando-csf.html
blogger_blog:
  - www.ovalenzuela.com
blogger_author:
  - Andrés Barrera
blogger_02f5be51301771664ae7c1c72bf29246_permalink:
  - 7593807661298164033
dsq_thread_id:
  - 3091885708
categories:
  - GNU con Linux
  - Google
---
<div>
  <div>
    <a href="http://www.ovalenzuela.com/wp-content/uploads/2016/02/e64ba-csf_large.png"><img border="0" src="http://www.ovalenzuela.com/wp-content/uploads/2016/02/e64ba-csf_large.png" /></a>
  </div>
  
  <p>
    El Firewall CSF es realmente uno de mis favoritos, anteriormente usaba Shorewall (Shoreline), pero las nuevas versiones han incorporado demasiadas funcionalidades, y cuando uno busca algo simple y fácil, llega la hora de buscar nuevas alternativas.
  </p>
</div>

<div>
</div>

<div>
  CSF es un Firewall basado en IPTABLES, y una de las cosas que más me gusta, es su capacidad de analizar intentos de acceso a servicios corriendo en nuestro servidor, de forma que si alguien intenta acceder muchas veces (usando fuera bruta por ejemplo), el Firewall será capaz de detectar este evento y bloquear la dirección IP origen. Su instalación es bastante simple:
</div>

Paso 1: Asegurarse que todos los modulos perl esten instalados:

[root@servidor ~]# yum install -y perl-libwww-perl

Paso 2: Descargamos el software y se descomprime:

[root@servidor ~]# cd /usr/local/src  
[root@servidor ~]# http://www.configserver.com/free/csf.tgz  
[root@servidor ~]# tar -zxvf csf.tgz  
[root@servidor ~]# cd csf

Paso 3: Procedemos a instalar:

[root@servidor ~]# ./install.sh

Paso 4: Limpiamos los fuentes

[root@servidor ~]# rm -Rf /usr/local/src/csf* && cd

Paso 5: Respaldamos el archivo original de configuración:

[root@servidor ~]# cp /etc/csf/csf.conf /etc/csf/csf.conf.bak

Paso 6: Editamos para adaptar la configuración:  
[root@servidor ~]# nano -w /etc/csf/csf.conf

<div>
  NOTA: Como recomendación, en webmin existe un modulo de gestión para CSF, que es muy sencillo. Recomiendo usar esto para evitar problemas de sintaxis. Si no se desea usar webmin, es posible detener el servicio luego de configurar CSF.
</div>

<div>
  Publicado originalmente por Oscar Valenzuela en http://ovalenzuela.xpertians.com &#8211; Puede ser compartido y copiado libremente, mientras mantenga esta nota.
</div>