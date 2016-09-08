---
id: 461
title: 'CenTOS: asegurando nuestra partición /TMP'
date: 2013-03-12T17:45:00+00:00
author: ovalenzuela
layout: post
guid: https://ovalenzueladotcom.wordpress.com/2013/03/12/centos-asegurando-nuestra-particion-tmp
permalink: /2013/03/centos-asegurando-nuestra-particion-tmp.html
blogger_blog:
  - www.ovalenzuela.com
blogger_author:
  - Andrés Barrera
blogger_02f5be51301771664ae7c1c72bf29246_permalink:
  - 1173564710869434593
dsq_thread_id:
  - 3090830732
categories:
  - Desarrollo
  - GNU con Linux
  - Google
---
<div>
  <div>
    <a href="http://www.ovalenzuela.com/wp-content/uploads/2016/02/712c2-centos_h-5c-a-293.png"><img border="0" src="http://www.ovalenzuela.com/wp-content/uploads/2016/02/712c2-centos_h-5c-a-293.png" /></a>
  </div>
  
  <p>
    La partición /TMP generalmente es usada por todos los servicios de neustro servidor como repositorio de información, para variables de sesión y cosas por el estilo. El tipico error de muchos es que por otros problemas de seguridad permiten a atacantes usando servicios tipo web ejecutar comandos o escribir en dicha patición, y por tal, ejecutar scripts que finalmente terminan por vulnerar todo el sistema y entregar acceso a los atacantes. A continuación veremos como asegurar dicha partición, para evitar ataques y sus consecuencias:
  </p>
</div>

<div>
</div>

<div>
  Paso 1: Respaldar su archivo /etc/fstab
</div>

<div>
</div>

<div>
  [root@servidor ~]# cp /etc/fstab /etc/fstab.bak
</div>

<div>
</div>

<div>
  Paso 2: Crear un archivo de 3GB para ser usado como partición /tmp
</div>

<div>
</div>

<div>
  [root@servidor ~]# dd if=/dev/zero of=/var/tempFS bs=1024 count=3072000
</div>

<div>
  [root@servidor ~]# /sbin/mkfs.ext3 /var/tempFS
</div>

<div>
</div>

<div>
  Paso 3: Crear un respaldo de tu actual partición /tmp
</div>

<div>
</div>

<div>
  [root@servidor ~]# cp -Rpf /tmp /tmpbackup
</div>

<div>
</div>

<div>
  Paso 4: Montar nuestra nueva partición y cambiar los permisos:
</div>

<div>
</div>

<div>
  [root@servidor ~]# mount -o loop,noexec,nosuid,rw /var/tempFS /tmp
</div>

<div>
  [root@servidor ~]# chmod 1777 /tmp
</div>

<div>
</div>

<div>
  Paso 5: Copiar la data antigua:
</div>

<div>
</div>

<div>
  [root@servidor ~]# cp -Rpf /tmpbackup/* /tmp/
</div>

<div>
</div>

<div>
  Paso 6: Editar /etc/fstab y agregar lo siguiente:
</div>

<div>
</div>

<div>
  [root@servidor ~]# nano -w /etc/fstab
</div>

<div>
  /var/tempFS /tmp ext3 loop,nosuid,noexec,rw 0 0
</div>

<div>
</div>

<div>
  Paso 7: Verificar la entrada en fstab:
</div>

<div>
</div>

<div>
  [root@servidor ~]# mount -o remount /tmp
</div>

<div>
</div>

<div>
  Paso 8: Verificar la partición /tmp este funcionndo correctamente:
</div>

<div>
</div>

<div>
  [root@servidor ~]# df -h
</div>

<div>
</div>

<div>
  Deberías obtener algo similar a esto:
</div>

<div>
  /var/tempFS           962M   18M  896M   2% /tmp
</div>

<div>
</div>

<div>
  Paso 9: Usar /tmp como /var/tmp:
</div>

<div>
</div>

<div>
  [root@servidor ~]# mv /var/tmp /var/vartmp
</div>

<div>
  [root@servidor ~]# ln -s /tmp /var/tmp
</div>

<div>
</div>

<div>
  Paso 10: Copiar la data antigua:
</div>

<div>
</div>

<div>
  [root@servidor ~]# cp /var/vartmp/* /tmp/
</div>

<div>
</div>

<div>
  Paso 11: Asegurar /dev/shm:
</div>

<div>
</div>

<div>
  [root@servidor ~]# nano -w /etc/fstab
</div>

<div>
  Localizar dentro del archivo algo similar a esto:
</div>

<div>
  none /dev/shm tmpfs defaults,rw 0 0
</div>

<div>
  Lo cambiamos a esto:
</div>

<div>
  none /dev/shm tmpfs defaults,nosuid,noexec,rw 0 0
</div>

<div>
</div>

<div>
  Paso 12: Volvemos a montar /dev/shm:
</div>

<div>
</div>

<div>
  [root@servidor ~]# mount -o remount /dev/shm
</div>

<div>
</div>

<div>
  Paso 13: Reiniciamos los servicios, idealmente reiniciamos el servidor.
</div>

<div>
  Publicado originalmente por Oscar Valenzuela en http://ovalenzuela.xpertians.com &#8211; Puede ser compartido y copiado libremente, mientras mantenga esta nota.
</div>