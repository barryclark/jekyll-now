---
id: 449
title: 'CentOS: Instalar Linux Environment Security'
date: 2013-03-12T21:15:00+00:00
author: ovalenzuela
layout: post
guid: https://ovalenzueladotcom.wordpress.com/2013/03/12/centos-instalar-linux-environment-security
permalink: /2013/03/centos-instalar-linux-environment-security.html
blogger_blog:
  - www.ovalenzuela.com
blogger_author:
  - Andrés Barrera
blogger_02f5be51301771664ae7c1c72bf29246_permalink:
  - 834926844962741905
dsq_thread_id:
  - 4849406737
categories:
  - GNU con Linux
  - Google
---
<div>
  LES o Linux Environment Security es una suite destinada a asegurar sistemas basados en RPM como Redhat, Turbolinux, Fedora, etc. Funciona otorgando permiso de ejecución solo para usuarios root en los aplicativos binarios que normalmente no son necesarios para los usuarios sin privilegios de administración. OJO: esta configuración puede traer problemas en configuraciones donde se utilizan paneles de control como cpanel, directadmin, lxadmin y otros.
</div>

Paso 1: Descargar e instalar LES

[root@servidor ~]# cd /usr/local/src  
[root@servidor ~]# wget http://www.r-fx.ca/downloads/les-current.tar.gz  
[root@servidor ~]# tar -zxvf les-current.tar.gz  
[root@servidor ~]# cd les-0.*  
[root@servidor ~]# ./install.sh  
[root@servidor ~]# rm -Rf /usr/local/src/les*

Paso 2: Verificando las posibles opciones

[root@servidor ~]# /usr/local/sbin/les

Paso 3: Si no esta seguro, habilita todas las opciones  
[root@servidor ~]# /usr/local/sbin/les -ea

Opciones disponibles:  
-da | &#8211;disable-all Deshabilita todas las opciones  
-ea | &#8211;enable-all Habilita todas las opciones  
-sb | &#8211;secure-bin Configura solo root para binarios criticos  
-sp | &#8211;secure-path Configura solo root para rutas criticas  
-sr | &#8211;secure-rpmpkg Configura inmutable bit para paquetes RPM  
-so | &#8211;secure-prof Configura inmutable bit para perfiles  
-sd | &#8211;secure-devel Configura acceso a utilidades de desarrollo para el grupo deva y root 

<div>
  Publicado originalmente por Oscar Valenzuela en http://ovalenzuela.xpertians.com &#8211; Puede ser compartido y copiado libremente, mientras mantenga esta nota.
</div>