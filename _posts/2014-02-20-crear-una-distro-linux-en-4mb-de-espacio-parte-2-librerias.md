---
id: 313
title: 'Crear una distro Linux en 4mb de espacio Parte 2: Librerías'
date: 2014-02-20T10:42:00+00:00
author: ovalenzuela
layout: post
guid: https://ovalenzueladotcom.wordpress.com/2014/02/20/crear-una-distro-linux-en-4mb-de-espacio-parte-2-librerias
permalink: /2014/02/crear-una-distro-linux-en-4mb-de-espacio-parte-2-librerias.html
blogger_blog:
  - www.ovalenzuela.com
blogger_author:
  - Andrés Barrera
blogger_02f5be51301771664ae7c1c72bf29246_permalink:
  - 876203043539012278
dsq_thread_id:
  - 4746563671
categories:
  - GNU con Linux
  - Google
  - Hacks y Mods
---
Continuando con mi post anterior, ya que tenemos una distribución funcional, podremos comenzar a incorporar las librerías necesarias para instalar utilitarios y otras aplicaciones. Al igual que en el post anterior, algunas rutas cambian de acuerdo a la arquitectura, es decir 32 o 64 bits cambiará la carpeta lib o lib64. Tal y como en el post anterior, he creado un <a title="http://ovalenzuela.xpertians.com/gnux/gnux_libs.sh" href="http://ovalenzuela.xpertians.com/gnux/gnux_libs.sh" target="_blank">script</a> para Fedora que automatiza el proceso, pero claro, automatizando no se aprende mucho, así que depende de cada cual usarlo o no.

Lo primero es verificar la arquitectura de nuestro sistema:  
`` <br />MACHINE_TYPE=`uname -m` ``

if [ &#8220;$(id -u)&#8221; != &#8220;0&#8221; ]; then  
echo &#8220;This script must be run as root&#8221; 1>&2  
exit 1  
fi

A continuación ingresamos a la carpeta previamente creada y descargamos el paquete necesario:  
`<br />cd GNUX/<br />wget http://ovalenzuela.xpertians.com/gnux/libs.tgz<br />tar xvzf libs.tgz<br />cd src/<br />`

Instalamos la librería ZLib:  
`<br />tar xjfv zlib-1.2.3.tar.bz2<br />cd zlib-1.2.3/<br />./configure --shared --prefix=/usr<br />make<br />strip -vs libz.so*<br />cp -av libz.so* ../../rootfs/usr/lib<br />cd ../<br />`

Instalamos PCRE;  
`<br />tar xzfv pcre-7.4.tar.gz<br />cd pcre-7.4<br />./configure --prefix=/usr<br />make<br />make DESTDIR=$PWD/_pkg install<br />strip -vs _pkg/usr/bin/*<br />cp -av _pkg/usr/bin/* ../../rootfs/usr/bin<br />if [ ${MACHINE_TYPE} == 'x86_64' ]; then<br />strip -vs _pkg/usr/lib64/*<br />cp -av _pkg/usr/lib64/*.so* ../../rootfs/usr/lib<br />else<br />strip -vs _pkg/usr/lib/*<br />cp -av _pkg/usr/lib/*.so* ../../rootfs/usr/lib<br />fi<br />cd ../<br />`

Instalamos CPIO:  
`<br />tar xzf cpio-2.10.tar.gz<br />cd cpio-2.10<br />./configure --prefix=/usr --bindir=/bin --libexecdir=/usr/bin --mandir=/usr/share/man --infodir=/usr/share/info<br />make<br />make DESTDIR=$PWD/_pkg install<br />strip -v _pkg/bin/*<br />strip -v _pkg/usr/bin/*<br />cp -a _pkg/bin/* ../../rootfs/bin<br />cp -a _pkg/usr/bin/* ../../rootfs/usr/bin<br />cp -a _pkg/usr/share/locale/es ../../rootfs/usr/share/locale<br />cd ../<br />`

Instalamos un Perl:  
`<br />tar xzf perl-5.8.8.tar.gz<br />cd perl-5.8.8<br />sed -i s/'usr/local'/'usr'/ uconfig.sh<br />sed -i s/'perl5/5.9'/'perl5'/ uconfig.sh<br />sed -i s/'unknown'/'i486-pc-linux-gnu'/ uconfig.sh<br />make -f Makefile.micro regen_uconfig<br />make -f Makefile.micro<br />strip microperl<br />cp microperl ../../rootfs/usr/bin<br />chroot ../../rootfs/ /bin/ash -c "cd /usr/bin && ln -s microperl perl"<br />cd ../<br />`

Instalamos un GLibc:  
`<br />tar xjf glib-2.12.4.tar.bz2<br />cd glib-2.12.4<br />./configure --prefix=/usr --sysconfdir=/etc --mandir=/usr/share/man --with-html-dir=/usr/share/doc<br />make<br />make DESTDIR=$PWD/_pkg install<br />strip -v _pkg/usr/bin/*<br />if [ ${MACHINE_TYPE} == 'x86_64' ]; then<br />strip -v _pkg/usr/lib64/*.so*<br />cp -a _pkg/usr/lib64/*.so* ../../rootfs/usr/lib<br />else<br />strip -v _pkg/usr/lib/*.so*<br />cp -a _pkg/usr/lib/*.so* ../../rootfs/usr/lib<br />fi<br />cp -a _pkg/usr/share/locale/es ../../rootfs/usr/share/locale<br />cp -a _pkg/usr/bin/* ../../rootfs/usr/bin<br />cd ../<br />`

Copiamos las librerías que nos puedan faltar:  
`<br />cd ../rootfs/`

if [ ${MACHINE\_TYPE} == &#8216;x86\_64&#8217; ]; then  
cp /usr/lib64/libstdc++.so.6 lib/  
cp /usr/lib64/libgcc_s.so.1 lib/  
cp /usr/lib64/libdl.so.2 lib/  
cp /usr/lib64/libpthread.so.0 lib/  
else  
cp /usr/lib/libstdc++.so.6 lib/  
cp /usr/lib/libgcc_s.so.1 lib/  
cp /usr/lib/libdl.so.2 lib/  
cp /usr/lib/libpthread.so.0 lib/  
fi

strip -v lib/libstdc++.so.6  
strip -v lib/libgcc_s.so.1  
strip -v lib/libdl.so.2  
strip -v lib/libpthread.so.0

Creamos el nuevo RootFS:  
`<br />find . -print | cpio -o -H newc | gzip -9 > ../rootfs.gz<br />cd ../<br />rm -rf rootcd/boot/rootfs.gz<br />cp rootfs.gz rootcd/boot<br />`

Generamos el iso y lanzamos el emulador:  
`<br />genisoimage -R -o gnux-base.iso -b boot/isolinux/isolinux.bin -c boot/isolinux/boot.cat -no-emul-boot -boot-load-size 4 -V "gNuX" -input-charset iso8859-1 -boot-info-table rootcd<br />qemu-system-x86_64 -cdrom gnux-base.iso<br />`

Y bueno, con esto ya tendremos instaladas las librerías que necesitamos 😉