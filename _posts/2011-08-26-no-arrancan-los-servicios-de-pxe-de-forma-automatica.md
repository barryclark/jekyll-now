---
layout: post
title: NO ARRANCAN LOS SERVICIOS DE PXE DE FORMA AUTOMATICA
date: 2011-08-26 12:09
author: agarciaizquierdo
comments: true
categories: [ALTIRIS, CLIENT MANAGEMENT SUITE, CMS, COMANDOS, DEPLOYMENT SOLUTION, Sin categoría]
---
Buenas, en este post vamos a hablar de un problema que nos podemos encontrar en nuestros PXE de nuestra infraestructura.<br />Con nuestros PXE podemos hacer que al arrancar un equipo, teniendo configurando como primer dispositivo de arranque la red, antes de entrar en el sistema operativo, coja una dirección IP de nuestro DHCP, previamente configurado, y lanzar un arranque de WinPE, por ejemplo, y luego desplegarle una imagen.<br /><br />Cuando instalamos nuestro PXE, la instalación nos creara cuatro nuevos servicios:<br /><br /><ul><li>_Symantec_netBoot_Interface</li>
 <li>_Symantec_netBoot_Mtftp</li>
 <li>_Symantec_netBoot_NSiSignal</li>
 <li>_Symantec_netBoot_Server</li>
 </ul><div><br /></div><div>Según Symantec estos servicios se ponen de forma manual al detectar otro PXE en la red, pero me he encontrado entornos donde no existe otro PXE y no ha levantado los servicios, ademas de dejarlos en manual y no crear las dependencias necesarias entre los servicios.</div><div>Para solucionar este problema Symantec nos ha creado un script, el cual soluciona este problema. </div><div>Normalmente yo lo agrego a una tarea de Altiris y lo despliego sobre mis Site Server con este problema, que suelen ser bastantes.. Luego reinicio el servidor y a funcionar. :)</div><div><br /></div><div>Aquí os dejo el articulo de la KB de Symantec donde lo explica, ademas del script.</div><div><ul><li><a href="http://www.symantec.com/business/support/index?page=content&amp;id=TECH127275&amp;actp=search&amp;viewlocale=en_US&amp;searchid=1314359206500">DS7.1 Setting PXE Server Services to automatic startup (formely included a now obsolte Hotfix installation)</a></li>
 <li><a href="http://www.symantec.com/business/support/resources/sites/BUSINESS/content/live/TECHNICAL_SOLUTION/127000/TECH127275/en_US/Set%20SBS%20Services%20to%20AutoStart%20with%20Dependencies.xml">Set SBS Services to AutoStart with Dependencies</a></li>
 </ul><div>Un saludo!</div></div><div><br /></div><div><span class="Apple-style-span" style="background-color:#ebebeb;"></span><br /><h1 style="font:normal normal normal 2em/normal arial, helvetica, sans-serif;width:765px;margin:0;padding:0!important;"><span class="Apple-style-span" style="background-color:#ebebeb;"><span class="Apple-style-span" style="font-family:inherit;"><br /></span></span></h1><h1 style="font:normal normal normal 2em/normal arial, helvetica, sans-serif;width:765px;margin:0;padding:0!important;"><span class="Apple-style-span" style="background-color:#ebebeb;"><br /></span></h1></div>
