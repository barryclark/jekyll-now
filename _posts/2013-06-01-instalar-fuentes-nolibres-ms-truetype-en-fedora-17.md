---
id: 432
title: Instalar fuentes NOLIBRES MS TrueType en Fedora 17
date: 2013-06-01T16:45:00+00:00
author: ovalenzuela
layout: post
guid: https://ovalenzueladotcom.wordpress.com/2013/06/01/instalar-fuentes-nolibres-ms-truetype-en-fedora-17
permalink: /2013/06/instalar-fuentes-nolibres-ms-truetype-en-fedora-17.html
blogger_blog:
  - www.ovalenzuela.com
blogger_author:
  - Andrés Barrera
blogger_02f5be51301771664ae7c1c72bf29246_permalink:
  - 7628985336712235260
categories:
  - GNU con Linux
  - Google
  - Opinión
---
<div>
  <span>En ocasiones se requiere usar fuentes TrueType por que son exigencia para ciertas presentaciones de documentos, una lata, pero usar Windows sería peor, por lo que acá va un pequeño tutorial para crear un paquete RPM, para que luego podamos eliminarlo de nuestro sistema sin hacer daños:</span>
</div>

<div>
  <span><br /></span>
</div>

<div>
  <span>Lo primero necesitaremos algunas dependencias:</span>
</div>

<div>
  <span>yum install rpm-build cabextract ttmkfdir wget</span>
</div>

<div>
  <span><br /></span>
</div>

<div>
  <span>Luego, deberemos descargar el paquete chkfontpath que es un requisito para la instalación. Como este paquete no será fácil de encontrar para nuestra distribución, podemos descargar directamente el RPM adecuado desde la dirección:</span>
</div>

<div>
  <a href="http://packages.atrpms.net/dist/f17/chkfontpath/"><span>http://packages.atrpms.net/dist/f17/chkfontpath/</span></a>
</div>

<div>
  <span><br /></span>
</div>

<div>
  <span>Una vez descargado, se procede a instalar:</span>
</div>

<div>
  <span>rpm -i chkfontpath-1.10.1-2.fc17.x86_64.rpm</span>
</div>

<div>
  <span><br /></span>
</div>

<div>
  <span>Luego procedemos a descargar el archivo SPEC para construir el RPM y luego a compilar, ojo que el RPMBUILD necesitará descargar varios paquetes desde Internet.</span>
</div>

<div>
  <span>cd /tmp</span>
</div>

<div>
  <span>wget http://corefonts.sourceforge.net/msttcorefonts-2.0-1.spec</span>
</div>

<div>
  <span>rpmbuild -ba msttcorefonts-2.0-1.spec</span>
</div>

<div>
  <span><br /></span>
</div>

<div>
  <span>Finalmente, si todo ha salido bien, tendremos nuestro RPM listo para instalar:</span>
</div>

<div>
  <span>cd /root/rpmbuild/RPMS/noarch/</span>
</div>

<div>
  <span>rpm -i msttcorefonts-2.0-1.noarch.rpm</span>
</div>

<div>
  <span><br /></span>
</div>

<div>
  <span>Cuando ya no necesitemos el paquete, lo podremos desinstalar con un simple comando:</span>
</div>

<div>
  <span>rpm -e msttcorefonts-2.0-1.noarch</span>
</div>

<div>
  <span><br /></span>
</div>

<div>
  <span>Y eso es todo amigos!</span>
</div>

<div>
  <span><br /></span>
</div>

<div>
  <span>PD: Igual los fuckings podrían dejar usar otras fuentes para publicaciones científicas  una verdadera shit usar Arial y fuentes asociadas&#8230;.</span>
</div>

<div>
  Publicado originalmente por Oscar Valenzuela en http://ovalenzuela.xpertians.com &#8211; Puede ser compartido y copiado libremente, mientras mantenga esta nota.
</div>