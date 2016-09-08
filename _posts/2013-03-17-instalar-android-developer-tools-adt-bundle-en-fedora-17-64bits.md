---
id: 447
title: Instalar Android Developer Tools (ADT Bundle) en Fedora 17 64bits
date: 2013-03-17T14:27:00+00:00
author: ovalenzuela
layout: post
guid: https://ovalenzueladotcom.wordpress.com/2013/03/17/instalar-android-developer-tools-adt-bundle-en-fedora-17-64bits
permalink: /2013/03/instalar-android-developer-tools-adt-bundle-en-fedora-17-64bits.html
blogger_blog:
  - www.ovalenzuela.com
blogger_author:
  - Andrés Barrera
blogger_02f5be51301771664ae7c1c72bf29246_permalink:
  - 260583459691887020
categories:
  - Android
  - Desarrollo
  - GNU con Linux
  - Google
---
<div>
  <span>Bueno, varios usuarios y amigos, me han reportado algunos inconvenientes al momento de instalar y ejecutar el nuevo ADT Bundle en Fedora cuando es de 64bits, por lo que a continuación van una serie de TIPs:</span>
</div>

<div>
  <span><br /></span>
</div>

<div>
  <span>Lo primero, descargamos el ADT Bundle (puede que la versión cambie, por lo que recomiendo revisarlo directamente desde la página:</span>
</div>

<div>
  <span><a href="http://developer.android.com/sdk/index.html">http://developer.android.com/sdk/index.html</a></span>
</div>

<div>
  <span><br /></span>
</div>

<div>
  <span>[ovalenzuela@localhost ~]$ wget http://dl.google.com/android/adt/adt-bundle-linux-x86_64-20130219.zip</span>
</div>

<div>
  <span><br /></span>
</div>

<div>
  <span>Una vez descargado, procederemos a descomprimir el archivo y renombrar el directorio:</span>
</div>

<div>
  <span><br /></span>
</div>

<div>
  <span>[ovalenzuela@localhost ~]$ unzip Descargas/adt-bundle-linux-x86_64-*.zip</span>
</div>

<div>
  <span>[ovalenzuela@localhost ~]$ mv adt-bundle-linux-x86_64-*/ adt-bundle-linux</span>
</div>

<div>
  <span><br /></span>
</div>

<div>
  <span>Luego, agregaremos las rutas a nuestro profile, de modo que pueda encontrar todo directamente. Para esto se edita el archivo bash_profile y se agregarán las lineas descritas a continuación:</span>
</div>

<div>
  <span><br /></span>
</div>

<div>
  <span>[ovalenzuela@localhost ~]$ gedit ~/.bash_profile</span>
</div>

<div>
  <span>export ANDROID_SDK_HOME=/home/ovalenzuela/adt-bundle-linux/sdk</span>
</div>

<div>
  <span>PATH=$PATH:$HOME/adt-bundle-linux/sdk:$HOME/adt-bundle-linux/tools</span>
</div>

<div>
  <span>PATH=$PATH:$HOME/adt-bundle-linux/sdk/platform-tools</span>
</div>

<div>
  <span>export PATH</span>
</div>

<div>
  <span><br /></span>
</div>

<div>
  <span>Finalmente, para evitar los errores de ADB por usar una versión para 64 bits, instalaremos algunas librerías:</span>
</div>

<div>
  <span><br /></span>
</div>

<div>
  <span>[root@localhost ~]# yum install glibc.i686 glibc-devel.i686 libstdc++.i686 zlib-devel.i686 ncurses-devel.i686 libX11-devel.i686 libXrender.i686 libXrandr.i686</span>
</div>

<div>
  <span><br /></span>
</div>

<div>
  <span>Ahora podremos ejecutar el Eclipse que viene integrado y comenzar a trabajar:</span>
</div>

<div>
  <span><br /></span>
</div>

<div>
  <span>/home/ovalenzuela/adt-bundle-linux/eclipse/eclipse &</span>
</div>

<div>
  Publicado originalmente por Oscar Valenzuela en http://ovalenzuela.xpertians.com &#8211; Puede ser compartido y copiado libremente, mientras mantenga esta nota.
</div>