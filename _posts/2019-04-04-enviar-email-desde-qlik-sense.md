---
id: 233
title: Enviar email desde Qlik Sense
date: 2019-04-04T07:00:00+02:00
author: Alvaro Garcia Izquierdo
layout: post
guid: https://agarciaizquierdo.github.io/2019/04/04/enviar-email-desde-qlik-sense/
permalink: /2019/04/04/enviar-email-desde-qlik-sense/
categories:
  - Sin categoría
tags:
  - envio mail
  - Qlik Sense
  - trips
  - trucos
---
<div class="separator" style="clear:both;text-align:center;">
  <a href="https://agarciaizquierdo.github.io/2019/04/04/enviar-email-desde-qlik-sense/" style="margin-left:1em;margin-right:1em;"><img border="0" src="https://4.bp.blogspot.com/-oe9ExQiO7Mo/XKIhv82e0EI/AAAAAAABO4A/v27f3LLVqNYDLqmuBt0f2zgdzRPm5iVPACLcBGAs/s1600/Sin%2Bt%25C3%25ADtulo.png" /></a>
</div>

Uno de los mayores problemas que me encontré al comenzar a trabajar con **Qlik**, es que por defecto, no tenia posibilidad de enviar informes por email o peor aun, enviar notificaciones de errores (problemas en la descarga de ficheros, errores de cambios de campos&#8230;) Para esto era necesario comprar otro producto, llamado <a href="https://www.qlik.com/es-es/products/nprinting" target="_blank" rel="noopener noreferrer"><b>Nprinting</b></a>.

<a href="https://www.qlik.com/es-es/products/nprinting" target="_blank" rel="noopener noreferrer"><b>Nprinting</b></a> permite crear informes muy chulos y enviarlos por correo, dejarlo en una ubicación de red&#8230; Pero yo no necesitaba enviar informes por email, lo que yo necesitaba es que me enviara un correo cuando una carga fallase, y para eso, puede resultar difícil justificar la compra de otro producto, así que me puse a investigar.

Después de buscar, encontré este ejemplo en <a href="https://github.com/newmans99/Qlik-Simple-Email-Example" target="_blank" rel="noopener noreferrer"><b>github</b></a> que me venia perfecto.  
En este ejemplo se basan en usar un conector de **Qlik**, el cual hace de pasarela con nuestro servidor de correo y envía el correo.

El resumen de los pasos seria:

  1. Descargar el conector (actualmente se encuentra en la versión November 2018 y funciona sin problema en la versión Febrero 2019 de Qlik Sense)
  2. Configurar el conector
  3. Habilitarlo como servicio (así nos aseguraremos que aunque se reinicie la maquina, sigue funcionando.)
  1. Usando el script **Install Service** ubicado en la carpeta **BatchFiles**

  4. Incluirlo en nuestro código de **Qlik**, yo suelo partirlo en dos partes
  1. Una primera, suele ser en la segunda sección, donde meter toda la lógica de conexión con el conector, y donde fijo el **ErrorMode = 0**, de esta forma, si falla en algún momento el script, seguirá hasta el final, para poder enviar el email
  2. Una segunda, suele ser la última, donde le marco, que si ha fallado la ejecución del script en algún momento, mande un correo avisando

<div>
  En el articulo del github viene bastante bien explicado y detallado
</div>
