---
id: 464
title: 'CenTOS: Endureciendo (Hardening) SSHD'
date: 2013-03-12T17:40:00+00:00
author: ovalenzuela
layout: post
guid: https://ovalenzueladotcom.wordpress.com/2013/03/12/centos-endureciendo-hardening-sshd
permalink: /2013/03/centos-endureciendo-hardening-sshd.html
blogger_blog:
  - www.ovalenzuela.com
blogger_author:
  - Andrés Barrera
blogger_02f5be51301771664ae7c1c72bf29246_permalink:
  - 4614680720387934659
dsq_thread_id:
  - 3113374585
categories:
  - GNU con Linux
  - Google
  - Hacks y Mods
---
<span>La idea general, es &#8220;endurecer&#8221; la seguridad de nuestra configuración SSH, por lo que seré muy breve, pero la idea es en general seguir los pasos y tendremos un SSH configurado aún más seguro:</span>  
<span><br /></span><span>Paso 1: Primero que todo, debes crear un usuario regular (no root), ya que se deshabilitará el acceso como root. En este caso creamos el usuario admin:</span>  
<span><br /></span><span>adduser admin && passwd admin</span>  
<span><br /></span><span>Paso 2: Respalda tu actual configuración sshd_config:</span>  
<span><br /></span><span>mv /etc/ssh/sshd_config /etc/ssh/sshd_config.bak</span>  
<span><br /></span><span>Paso 3: Crea un nuevo archivo de configuración para sshd:</span>  
<span><br /></span><span>nano -w /etc/ssh/sshd_config</span>  
<span><br /></span><span>Paso 3.1: Pega el siguiente contenido directamente en tu archivo:</span>  
<span><br /></span><span>## Cambia este puerto, por ejemplo 8022 (muy recomendable)</span>  
<span>Port 22</span>  
<span>## Configura la dirección donde escuchará el demonio ssh. por defecto=0.0.0.0</span>  
<span>#ListenAddress 192.168.0.1</span>  
<span>## Acepta solo ssh versión 2</span>  
<span>Protocol 2</span>  
<span>## Deshabilita el acceso como root, en adelante necesitarás ingresar como un usuario normal y desde esa sesión ingresar &#8220;su -&#8221; para convertirse en root:</span>  
<span>PermitRootLogin no</span>  
<span>##</span>  
<span>UsePrivilegeSeparation yes</span>  
<span>##</span>  
<span>AllowTcpForwarding no</span>  
<span>## Disables X11Forwarding</span>  
<span>X11Forwarding no</span>  
<span>## Verifica los usuarios y sus directorios personales, que no sean editables por cualquier usuario:</span>  
<span>StrictModes yes</span>  
<span>## Esta opción especifica que el archivo rhost o shosts no será utilizado para autenticación:</span>  
<span>IgnoreRhosts yes</span>  
<span>##</span>  
<span>HostbasedAuthentication no</span>  
<span>## Esta opción especifica si sshd puede utilizar rhost para autenticación:</span>  
<span>RhostsRSAAuthentication no</span>  
<span>## Le agrega un mensaje al usuario, una especie de banner:</span>  
<span>Banner /etc/motd</span>  
<span>## Habilita o desactiva el servidor sftp</span>  
<span>#Subsystem      sftp    /usr/libexec/openssh/sftp-server</span>  
<span>## Agregamos los usuarios que pueden ingresar por ssh (ver paso 1)</span>  
<span>AllowUsers admin</span>  
<span>Control + X para guardar</span>  
<span><br /></span><span>Paso 4: Verificamos las configuraciones que se han realizado en el nuevo archivo:</span>  
<span>nano -w /etc/ssh/sshd_config</span>  
<span>RECUERDA QUE SE RECOMIENDA CAMBIAR EL PUERTO. ( Ejemplo Puerto 8022 )</span>  
<span><br /></span><span>Paso 5: Agregamos un texto pulento al archivo MOTD (/etc/motd)</span>  
<span>echo &#8220;Private system, please log off.&#8221; > /etc/motd</span>  
<span><br /></span><span>Paso 6: Reiniciamos el demonio SSHD</span>  
<span><br /></span><span>service sshd restart</span>  
<span><br /></span><span>Paso 7: Iniciamos un NUEVO CLIENTE, y probamos conectarnos. (OJO!!! NO CIERRES EL ACTUAL EN CASO DE PROBLEMAS)</span>  
<span><br /></span><span>ssh 192.168.0.1 -ladmin -P8022 # o el puerto que hayas elegido</span>  
<span><br /></span><span>Si todo fue bien, entonces ya puedes usar ssh 😉</span> 

<div>
  Publicado originalmente por Oscar Valenzuela en http://ovalenzuela.xpertians.com &#8211; Puede ser compartido y copiado libremente, mientras mantenga esta nota.
</div>