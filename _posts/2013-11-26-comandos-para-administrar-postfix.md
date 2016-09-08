---
id: 401
title: Comandos para administrar Postfix
date: 2013-11-26T18:20:00+00:00
author: ovalenzuela
layout: post
guid: https://ovalenzueladotcom.wordpress.com/2013/11/26/comandos-para-administrar-postfix
permalink: /2013/11/comandos-para-administrar-postfix.html
blogger_blog:
  - www.ovalenzuela.com
blogger_author:
  - Andrés Barrera
blogger_02f5be51301771664ae7c1c72bf29246_permalink:
  - 2511062218949679494
categories:
  - GNU con Linux
  - Google
  - Hacks y Mods
---
Casi siempre se me olvidan los comandos, y he ido descubriendo que es muy práctico anotarlos en el blog, tanto porque me permite ayudar a otros, como porque puedo actualizar y mejorar la información, sin mencionar que puedo usar el buscador cuando no recuerdo algo.  
<a name='more'></a>  
Así que como nota, acá van algunos comandos útiles para trabajar con Postfix:

Para vaciar la cola mediante un flush, es decir, obligar a enviar o intentar enviar todo lo que esta en la cola usamos el siguiente comando:  
postfix -f

Para visualizar la cola de correos, se usa el siguiente comando:  
postqueue -p

En el mismo, comando anterior, podremos ver que los correos en la cola son identificados con un string compuesto por letras y números, por lo que para desplegar el contenido de uno de estos correos, podremos usar la siguiente opción:  
postcat -vq 17E082C3230

Para borrar todos los correos en la cola, sin pedir que sean enviados, tendremos 2 opciones, la primera es la funcion agregada en el mismo Postfix que hace uso de su propio set de herramientas:

postsuper -d ALL

Sin embargo, cuando estamos bajo ataque de un spammer, lo que realmente necesitaremos será eliminar todos los archivos de una forma más expedita, para tal caso, lo que tendremos que hacer es bajar postfix, ejecutar un borrado de todos los archivos en el directorio deferer y finalmente volver a subir el servicio:  
/etc/init.d/postfix stop  
cd /var/spool/postfix/deferred && find /var/spool/postfix/deferred -type f | xargs rm  
/etc/init.d/postfix start