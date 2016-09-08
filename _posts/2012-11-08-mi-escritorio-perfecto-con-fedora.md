---
id: 483
title: Mi escritorio perfecto con Fedora
date: 2012-11-08T15:11:00+00:00
author: ovalenzuela
layout: post
guid: https://ovalenzueladotcom.wordpress.com/2012/11/08/mi-escritorio-perfecto-con-fedora
permalink: /2012/11/mi-escritorio-perfecto-con-fedora.html
blogger_blog:
  - www.ovalenzuela.com
blogger_author:
  - Andrés Barrera
blogger_02f5be51301771664ae7c1c72bf29246_permalink:
  - 8469711234908880120
categories:
  - GNU con Linux
  - Google
---
<span>Aunque en general Debian es muy estable y liviano, para trabajar prefiero Fedora, no solo por su compatibilidad en cuanto a desarrollo de software con Redhat, sino, porque simplemente&#8230; funciona. No soy de los que pasan horas probando software inestable o de pruebas, no me interesa que mi sistema funcione a medias o estar perdiendo horas y horas buscando una solución para que mi distro favorita funcione al 100 por ciento, yo simplemente trabajo con el sistema,  y no tengo el tiempo o la paciencia que tenia antes, por eso uso Fedora.</span>  
<span>Pero como cualquier distro, hay que hacerle algunas mejoras e instalaciones adicionales antes de partir, por eso, dejo acá la lista de cambios que yo siempre realizo, para que si a alguien le sirve, pueda también utilizarlas.</span>  
<span><br /></span><span>Instalar y habilitar repos rpmfusion:</span>  
<span>yum localinstall &#8211;nogpgcheck http://download1.rpmfusion.org/free/fedora/rpmfusion-free-release-stable.noarch.rpm http://download1.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-stable.noarch.rpm</span>  
<span>yum update</span>  
<span><br /></span><span>Habilitar el repositorio de Google</span>  
<span>su &#8211;</span>  
<span>yum install wget</span>  
<span>wget https://dl-ssl.google.com/linux/linux_signing_key.pub</span>  
<span>rpm &#8211;import linux_signing_key.pub</span>  
<span><br /></span><span>Agregar el google.repo para 32 bits</span>  
<span>[google]</span>  
<span>name=Google &#8211; i386</span>  
<span>baseurl=http://dl.google.com/linux/rpm/stable/i386</span>  
<span>enabled=1</span>  
<span>gpgcheck=1</span>  
<span>gpgkey=https://dl-ssl.google.com/linux/linux_signing_key.pub</span>  
<span><br /></span><span><br /></span><span>Agregar el google.repo para 64 bits</span>  
<span>[google64]</span>  
<span>name=Google &#8211; x86_64</span>  
<span>baseurl=http://dl.google.com/linux/rpm/stable/x86_64</span>  
<span>enabled=1</span>  
<span>gpgcheck=1</span>  
<span>gpgkey=https://dl-ssl.google.com/linux/linux_signing_key.pub</span>  
<span><br /></span><span><br /></span><span>Configurar yum para funcionar con el mirror más rapido:</span>  
<span>yum -y install yum-plugin-fastestmirror yum-presto yum-langpacks</span>  
<span><br /></span><span>Instalar repositorio de Adobe Flash (opcional):</span>  
<span>rpm -ivh http://linuxdownload.adobe.com/adobe-release/adobe-release-i386-1.0-1.noarch.rpm</span>  
<span>rpm &#8211;import /etc/pki/rpm-gpg/RPM-GPG-KEY-adobe-linux</span>  
<span><br /></span><span>Super instalada de lo básico:</span>  
<span>yum -y install gstreamer-plugins-good gstreamer-plugins-bad gstreamer-plugins-ugly vlc java-*-openjdk java-*-openjdk-plugin google-chrome-stable transmission unrar gstreamer-ffmpeg gstreamer-plugins-bad-free-extras gstreamer-plugins-bad gstreamer-plugins-ugly gstreamer-plugins-bad-nonfree libreoffice-langpack-es libreoffice-writer libreoffice-calc libreoffice-impress flash-plugin google-chrome-stable gstreamer-plugins-bad gstreamer-plugins-bad-free-extras gstreamer-plugins-bad-nonfree gstreamer-plugins-ugly gstreamer-ffmpeg libdvdread libdvdnav gstreamer-plugins-good lsdvd libdvbpsi ffmpeg ffmpeg-libs gstreamer-ffmpeg libmatroska xvidcore xine-lib-extras-freeworld xine-lib-extras xine-lib-extras-freeworld k3b-extras-freeworld libdvdread libdvdnav lsdvd libdvdcss</span>  
<span><br /></span><span>Y con todo esto, ya podremos comenzar a utilizar nuestro sistema.</span>

<div>
  Publicado originalmente por Oscar Valenzuela en http://ovalenzuela.xpertians.com &#8211; Puede ser compartido y copiado libremente, mientras mantenga esta nota.
</div>