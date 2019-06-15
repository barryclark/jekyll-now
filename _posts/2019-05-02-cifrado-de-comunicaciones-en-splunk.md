---
id: 230
title: Cifrado de comunicaciones en Splunk
date: 2019-05-02T10:27:00+02:00
author: Alvaro Garcia Izquierdo
layout: post
guid: https://agarciaizquierdo.github.io/2019/05/02/cifrado-de-comunicaciones-en-splunk/
permalink: /2019/05/02/cifrado-de-comunicaciones-en-splunk/
categories:
  - Sin categoría
tags:
  - certificados
  - seguridad
  - Splunk
  - Splunk Español
  - splunk forwarder
---
<div class="separator" style="clear:both;text-align:center;">
  <a href="https://agarciaizquierdo.github.io/2019/05/02/cifrado-de-comunicaciones-en-splunk/" style="margin-left:1em;margin-right:1em;"><img border="0" height="200" src="https://3.bp.blogspot.com/--p5WP-LRD-4/XMrF2Jx-oOI/AAAAAAABPG0/8ln9QYUIbrscsZ38TyPJxz7UYMqgz4yCgCLcBGAs/s320/00000000EC.jpg" width="320" /></a>
</div>

Uno de los puntos mas importante en despliegues de **Splunk**, y algo que debería ser una costumbre en todos los primeros pasos de despliegues, es la instalación y configuración de certificados.  
En toda instalación de Splunk, podríamos distinguir tres puntos donde instalar certificados:

  * Web: He llamado así al certificado que publicaremos para acceso de nuestros usuarios, es decir, para que la información entre el navegadores de los usuarios y nuestro **SH** este cifrada. Este certificado lo configuramos en nuestro **web.conf** y **server.conf**. Aquí os dejo unos enlaces donde explica como hacerlo:
  * <https://docs.splunk.com/Documentation/Splunk/7.2.6/Security/AboutsecuringauthenticationtoSplunkWeb>
  * <https://answers.splunk.com/answers/506572/installing-a-ssl-certificate-in-splunk.html>

  * Envío de datos al **IDX**: Por defecto, al información que mandamos a nuestro indexador no va cifrada, para ello tenemos que habilitar en nuestros **forwarder** y **Searh Head** que este envío se haga de forma cifrada, para ello tenemos dos opciones, usar los certificados propios que para ello tiene **Splunk**, enlace <a href="https://docs.splunk.com/Documentation/Splunk/7.2.6/Security/ConfigureSplunkforwardingtousethedefaultcertificate" target="_blank" rel="noopener noreferrer"><b>aquí</b></a> de como se hace, o usar unos certificados firmados por nuestra entidad root CA o una externa,  para ello os pongo mas enlaces, ya que es un proceso mas largo
  * <https://docs.splunk.com/Documentation/Splunk/7.2.6/Security/ConfigureSplunkforwardingtousesignedcertificates>
  * <https://answers.splunk.com/answers/7164/how-do-i-set-up-ssl-forwarding-with-new-self-signed-certificates-and-authentication.html>
  * <https://wiki.splunk.com/images/f/fb/SplunkTrustApril-SSLipperySlopeRevisited.pdf>

  * Por ultimo, Splunk dispone de un certificado autofirmado, para acceder a su Rest API y puerto de gestión, el 8089, en algún tipo de proyectos, nos piden cambiarlo, por uno firmado por una entidad conocida o la propia del cliente, aquí os dejo también como cambiarlo:
  * <https://docs.splunk.com/Documentation/Splunk/7.2.6/Security/Securingyourdeploymentserverandclients>

<div>
  En la documentación de Splunk disponemos de mucha información de que y como cifrar la información.
</div>
