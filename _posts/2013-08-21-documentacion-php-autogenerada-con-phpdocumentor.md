---
id: 424
title: Documentación PHP autogenerada con PHPDocumentor
date: 2013-08-21T14:30:00+00:00
author: ovalenzuela
layout: post
guid: https://ovalenzueladotcom.wordpress.com/2013/08/21/documentacion-php-autogenerada-con-phpdocumentor
permalink: /2013/08/documentacion-php-autogenerada-con-phpdocumentor.html
blogger_blog:
  - www.ovalenzuela.com
blogger_author:
  - Andrés Barrera
blogger_02f5be51301771664ae7c1c72bf29246_permalink:
  - 2643438427392471835
dsq_thread_id:
  - 4665802731
categories:
  - Desarrollo
  - Google
  - Hacks y Mods
---
Para aquelllos que nos encanta desarrollar cosas nuevas, siempre es una molestia necesaria el documentar el software adecuadamente, seguir un estandar o simplemente colocar esos comentarios que permitirán a quienes usen nuestros códigos saber que diablos hace cada cosa.

Si te identificas con esta descripción, entonces encontrarás el siguiente post más que interesante, puesto que te da la oportunidad de preocuparte y hacer lo que te gusta, sin alejarte de contar con documentación al más puro estilo profesional, para esto usamos la herramienta PHPDocumentor. A continuación entonces va un ejemplo de uso de esta espectacular herramienta.

Lo primero, será bajar e instalar las herramientas necesarias, puesto que usaremos la versión de PHPDocumentor que aún esta en desarrollo, puesto que esta versión trae un template mucho más bonito y nuevas funcionalidades.

Fedora:

yum install graphviz-php php-xml pear

Trisquel:

apt-get install php-pear php-xml-parser libgv-php5 php5-xsl graphviz

Una vez descargadas las librerías, procederemos a descargar y compilar las herramientas usando pear:

pear channel-discover pear.phpdoc.org

pear install phpdoc/phpDocumentor-alpha

Con esto, ya dispondremos del comando phpdoc en nuestro sistema, y como la documentación de PHPDocumentor es muy buena, solo incluiré un ejemplo de uso:

phpdoc -d Libs/ -d Schedules/ -t Docs/PHPDoc/

En el ejemplo anterior, pedimos a phpdoc que revise los directorios Libs y Schedules por clases y que la salida de la documentación se exporte en el directorio Docs/PHPDoc/. Lo mejor de todo es que si en algún lugar tenias algún error en tus comentarios, entonces el sistema te lo señala al momento de generar la documentación!, simplemente espectacular!

A continuación unas fotos de como queda:

[<img class="alignnone size-full wp-image-319" src="http://ovalenzuela.com/wp-content/uploads/2013/06/Captura-de-pantalla-de-2013-08-21-141553.png" alt="Captura de pantalla de 2013-08-21 14:15:53" width="800" height="305" />](http://ovalenzuela.com/wp-content/uploads/2013/06/Captura-de-pantalla-de-2013-08-21-141553.png)

[<img class="alignnone size-full wp-image-318" src="http://ovalenzuela.com/wp-content/uploads/2013/06/Captura-de-pantalla-de-2013-08-21-141524.png" alt="Captura de pantalla de 2013-08-21 14:15:24" width="800" height="325" />](http://ovalenzuela.com/wp-content/uploads/2013/06/Captura-de-pantalla-de-2013-08-21-141524.png)

[<img class="alignnone size-full wp-image-317" src="http://ovalenzuela.com/wp-content/uploads/2013/06/Captura-de-pantalla-de-2013-08-21-141513.png" alt="Captura de pantalla de 2013-08-21 14:15:13" width="800" height="372" />](http://ovalenzuela.com/wp-content/uploads/2013/06/Captura-de-pantalla-de-2013-08-21-141513.png)

Realmente espectacular, y si quieren hechar un vistazo a como funciona en vivo, les invito a ver la documentación de las clases principales de WarpIT! Directamente aquí:

<a title="http://www.xpertians.com/warpit/Docs/PHPDoc/packages/WarpIT!.html" href="http://www.xpertians.com/warpit/Docs/PHPDoc/packages/WarpIT!.html" target="_blank">http://www.xpertians.com/warpit/Docs/PHPDoc/packages/WarpIT!.html</a>