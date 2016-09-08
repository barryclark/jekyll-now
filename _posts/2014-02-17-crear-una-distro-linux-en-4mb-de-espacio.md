---
id: 348
title: Crear una distro Linux en 4mb de espacio
date: 2014-02-17T15:17:00+00:00
author: ovalenzuela
layout: post
guid: https://ovalenzueladotcom.wordpress.com/2014/02/17/crear-una-distro-linux-en-4mb-de-espacio
permalink: /2014/02/crear-una-distro-linux-en-4mb-de-espacio.html
blogger_blog:
  - www.ovalenzuela.com
blogger_author:
  - Andrés Barrera
blogger_02f5be51301771664ae7c1c72bf29246_permalink:
  - 5940149198120289666
dsq_thread_id:
  - 3297570385
categories:
  - GNU con Linux
  - Google
  - Hacks y Mods
---
Desde mi último post ha pasado bastante tiempo, y la verdad he priorizado otras cosas en mi vida que me tienen muy contento, pero de vez en cuando intentaré publicar una que otra cosa, para mantener el movimiento y para no perder más tiempo en tanta explicación, vamos a comenzar con el post que toca ahora.

Por diferentes motivos, en ocasiones se nos hace necesario contar con una distribución limpia, idealmente con lo mínimo de software posible. Así también quienes trabajamos en sistemas embebidos, que tienen grandes limitaciones de hardware y disponibilidad para agregar o cambiar cosas, necesitamos un ambiente de pruebas, una especie de Sandbox constituido por el kernel Linux y una que otra herramienta, así que pasando manos a la obra, veremos como construir un sistema Linux boteable, para luego agregar las herramientas y librerías necesarias.

Para todo esto, he construido un <a title="Script!" href="http://ovalenzuela.xpertians.com/gnux/gnux_base.sh" target="_blank">script</a> que realiza la mayoría de las tareas en forma automática en Fedora, para otras distribuciones seguramente los comandos serán similares, sino, mala suerte XD.

En detalle lo que hace el script es lo siguiente:

Identificamos si el sistema corre en 32 o 64 bits:

`` MACHINE_TYPE=`uname -m` ``

if [ &#8220;$(id -u)&#8221; != &#8220;0&#8221; ]; then  
echo &#8220;This script must be run as root&#8221; 1>&2  
exit 1  
fi

Instala algunas dependencias y librerías:  
`yum groupinstall "Development Tools" "Development Libraries" -y<br />yum install nano qemu flex gcc-c++ zlib-devel glibc-static ncurses-devel zlib-static docbook-utils -y`

Creamos un directorio para trabajar:  
`mkdir GNUX<br />cd GNUX/<br />`

Descargamos los paquetes necesarios y lo descomprimimos:  
`wget http://ovalenzuela.xpertians.com/gnux/base.tgz<br />tar xvzf base.tgz<br />cd src/<br />tar xvzf samples.tgz`

Compilamos el Kernel Linux con las opciones por defecto:  
`tar xvzf linux-3.13.tar.gz<br />cd linux-3.13/<br />make mrproper<br />cp ../samples/kernel.config .config`

echo &#8220;In the next menu, please select save and then exit options&#8221;  
read -p &#8220;Press any key to continue&#8230; &#8221; -n1 -s

make menuconfig  
#save and exit  
make bzImage  
make modules  
make INSTALL\_MOD\_PATH=$PWD/\_pkg modules\_install  
cd ../

Creamos un directorio donde dejaremos el sistema final:  
`mkdir ../rootfs`

Compilamos Busybox:  
`tar xjf busybox-1.22.1.tar.bz2<br />cd busybox-1.22.1/<br />cp ../samples/busybox.config .config`

echo &#8220;In the next menu, please select exit and then save options&#8221;  
read -p &#8220;Press any key to continue&#8230; &#8221; -n1 -s

make menuconfig  
#exit and save  
make  
make install  
chmod 4755 _install/bin/busybox  
cp -a _install/* ../../rootfs/  
cd ../../rootfs/  
rm linuxrc  
ln -s bin/busybox init  
mkdir lib

Si el sistema es de 64 bits copiamos las librerías de lib64, sino, usamos lib:

`if [ ${MACHINE_TYPE} == 'x86_64' ]; then`

\## 64 Bits ##  
cp /lib64/{libcrypt.so.1,libm.so.6\*,libc.so.6\*} lib  
cp /lib64/ld-linux-x86-64.so.2 lib/  
cp /usr/lib64/{libcrypt.so.1,libm.so.6,libc.so.6} lib  
cp /lib64/ld-linux-x86-64.so.2 lib/

else

\## 32 Bits ##  
cp /lib/{libcrypt.so.1,libm.so.6,libc.so.6} lib  
cp /lib/{libcrypt.so.1,libm.so.6\*,libc.so.6\*} lib

fi

strip -v lib/*

Creamos el resto de directorios y creamos los modulos usando un script del proyecto Slitaz:  
`mkdir -p dev etc root home proc media mnt sys tmp var<br />mkdir -p usr/{lib,local,games,share} var/{cache,lib,lock,log,games,run,spool} media/{cdrom,flash,usbdisk}<br />chmod 1777 tmp/<br />cp /etc/rpc etc<br />cp ../src/samples/mktazdevs.sh bin/`

./bin/mktazdevs.sh dev

Nuevamente copiamos las librerías de acuerdo a nuestra arquitectura  
`if [ ${MACHINE_TYPE} == 'x86_64' ]; then`

\## 64 Bits ##  
cp /lib64/{libnss\_dns.so.2,libnss\_files.so.2} lib  
cp /lib64/libresolv.so.2 lib

else

\## 32 Bits ##  
cp /lib/{libnss\_dns.so.2,libnss\_files.so.2} lib  
cp /lib/libresolv.so.2 lib

fi

strip -v lib/\*.so\*

Creamos algunos archivos de configuración:  
`echo "127.0.0.1 localhost" > etc/hosts<br />echo "localnet 127.0.0.1" > etc/networks<br />echo "gNuX" > etc/hostname<br />echo "order hosts,bind" > etc/host.conf<br />echo "multi on" >> etc/host.conf`

cp ../src/samples/nsswitch.conf etc/  
cp ../src/samples/securetty etc/  
cp ../src/samples/shells etc/

echo &#8220;gNuX GNU/Linux 1.0 Kernel r l&#8221; > etc/issue  
echo &#8220;&#8221; >> etc/issue

cp ../src/samples/motd etc/  
cp ../src/samples/busybox.conf etc/  
chmod 600 etc/busybox.conf  
cp ../src/samples/inittab etc/  
cp ../src/samples/profile etc/

echo &#8220;root:x:0:0:root:/root:/bin/sh&#8221; > etc/passwd  
echo &#8220;root::13525:0:99999:7:::&#8221; > etc/shadow  
echo &#8220;root:x:0:&#8221; > etc/group  
echo &#8220;root:*::&#8221; > etc/gshadow  
chmod 640 etc/shadow  
chmod 640 etc/gshadow

cp ../src/samples/fstab etc/  
ln -s lib/ lib64

Entramos como chroot y trabajamos en temas dentro del sistema:  
`chroot . /bin/ash -c "ln -s /proc/mounts /etc/mtab"<br />chroot . /bin/ash -c "mkdir /usr/share/kmap"<br />chroot . /bin/ash -c "/bin/busybox dumpkmap > /usr/share/kmap/es_ES.kmap"<br />`

Copiamos los contenidos dentro de nuestro sistema:  
`mkdir -p usr/share/doc<br />mkdir usr/share/udhcpc<br />cp ../src/busybox-1.22.1/examples/udhcp/simple.script usr/share/udhcpc/default.script<br />chmod +x usr/share/udhcpc/default.script`

mkdir etc/init.d  
cp ../src/samples/rcS etc/init.d/  
chmod +x etc/init.d/rcS

Creamos nuestro sistema RootFS, y cargamos el Isolinux:  
`find . -print | cpio -o -H newc | gzip -9 > ../rootfs.gz<br />cd ../<br />mkdir -p rootcd/boot/isolinux<br />cp src/linux-3.13/arch/x86_64/boot/bzImage rootcd/boot/<br />cp rootfs.gz rootcd/boot/`

cd src/  
tar xvzf syslinux-3.35.tar.gz  
cp syslinux-3.35/isolinux.bin ../rootcd/boot/isolinux  
cd ../

cp src/samples/isolinux.cfg rootcd/boot/isolinux/  
cp src/samples/display.txt rootcd/boot/isolinux/

Generamos el ISO del sistema operativo:  
`genisoimage -R -o gnux-base.iso -b boot/isolinux/isolinux.bin -c boot/isolinux/boot.cat -no-emul-boot -boot-load-size 4 -V "gNuX" -input-charset iso8859-1 -boot-info-table rootcd`

Lanzamos el emulador con la nueva imagen ISO:  
`qemu-system-x86_64 -cdrom gnux-base.iso ##Cambiamos el qemu según la arquitectura.`

Y enjoy!  
En el siguiente post agregaremos las librerías que normalmente se necesitan para compilar herramientas dentro del sistema.