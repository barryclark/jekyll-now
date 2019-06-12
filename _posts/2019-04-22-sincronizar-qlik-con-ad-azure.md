---
id: 231
title: Sincronizar qlik con AD Azure
date: 2019-04-22T12:25:00+02:00
author: Alvaro Garcia Izquierdo
layout: post
guid: http://alvarogarcia.home.blog/2019/04/22/sincronizar-qlik-con-ad-azure/
permalink: /2019/04/22/sincronizar-qlik-con-ad-azure/
categories:
  - Sin categoría
tags:
  - Azure
  - DIRECTORIO ACTIVO
  - Qlik Sense
---
Cada día son mas los servicios delegados en la nube, uno de estos puede ser nuestro **Directorio Activo**, el cual a efectos de conectividad, no funciona de la misma forma, si lo queremos conectar con nuestro **Qlik Sense** para que los usuarios se logen, por ejemplo con su cuenta de correo.

En el siguiente <a href="https://docs.microsoft.com/es-es/azure/active-directory/saas-apps/qliksense-enterprise-tutorial" target="_blank" rel="noopener noreferrer"><b>enlace </b></a>se explica de forma bastante detallada los pasos a seguir, algunas de las consideraciones que debemos tener en cuenta antes de empezar:

  * Equipo de **AD**, para crearnos los XML, dar de alta la App&#8230;
  * Equipo seguridad, para dar de alta las nuevas reglas, en caso de ser necesarias, ya que tendremos que crear un nuevo **Virtual Proxy**, y puede darse el caso de tener que dar de alta DNS, abrir puertos&#8230;
  * Administrador de Qlik Sense (nosotros), para poder realizar todas las configuraciones en **Qlik Sense**

<div>
  Espero que os sea de ayuda
</div>