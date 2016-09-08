---
id: 438
title: Integra tu cuenta Google+ con Twitter usando sus APIs en 15 pasos.
date: 2013-05-01T19:15:00+00:00
author: ovalenzuela
layout: post
guid: https://ovalenzueladotcom.wordpress.com/2013/05/01/integra-tu-cuenta-google-con-twitter-usando-sus-apis-en-15-pasos
permalink: /2013/05/integra-tu-cuenta-google-con-twitter-usando-sus-apis-en-15-pasos.html
blogger_blog:
  - www.ovalenzuela.com
blogger_author:
  - Andrés Barrera
blogger_02f5be51301771664ae7c1c72bf29246_permalink:
  - 3448186723011290843
categories:
  - Desarrollo
  - Google
---
<div>
  <a href="http://www.ovalenzuela.com/wp-content/uploads/2016/02/6bc21-googletotwitter.jpg"><img border="0" height="129" src="http://www.ovalenzuela.com/wp-content/uploads/2016/02/6bc21-googletotwitter.jpg?w=300" width="320" /></a>
</div>

<div>
  <span>Hace tiempo un buen amigo, me había pedido una forma para integrar Google Plus (Google+) con la cuenta Twitter y en ese entonces la única forma de realizar esta integración era utilizando un correo, es decir, compartir con una cuenta fantasma, enviando un correo, &#8220;parseando&#8221; el correo con la notificación y luego publicando el contenido en Twitter. La verdad, una forma bien &#8220;trucha&#8221;, pero en la mayoría de los casos funcionaba.</span>
</div>

<div>
  <span><br /></span>
</div>

<div>
  <span>Con la publicación de la API de Google+, se hizo posible armar integraciones, sin embargo esto seguía siendo complejo y requiere algo de conocimiento. Es por esto, que decidí aprovechar un ratito libre y armar un pequeño desarrollo que se conecte a tu cuenta en Google+, lea el feed de contenidos y luego publique los contenidos en Twitter. Este desarrollo esta escrito en PHP y se puede descargar desde aquí: <a href="https://code.google.com/p/gplus2twitter/">https://code.google.com/p/gplus2twitter/</a></span>
</div>

<div>
  <span><br /></span>
</div>

<div>
  <span>Luego, deberán hacer algunas configuraciones que las he resumido en 15 pasos:</span>
</div>

<div>
</div>

  1. <span>Ingrese a su perfil en Google+.</span>
  2. <span>Ingrese a la siguiente URL: <a href="https://code.google.com/apis/console/">https://code.google.com/apis/console/</a></span>
  3. <span>Seleccione &#8220;Services&#8221; o &#8220;Servicios&#8221; y verifique que la opción &#8220;Google+ API&#8221; este habilitado, sino habilitalo!.</span>
  4. <span>Ingrese a &#8220;API Access&#8221;.</span>
  5. <span>Bajo el recuadro &#8220;Simple API Access&#8221; anote y guarde su &#8220;API Key&#8221; anotándolo en el archivo de configuración &#8220;config.php&#8221; bajo el parametro &#8220;$apiKey&#8221;.</span>
  6. <span>Ingrese a su perfil en Google+, al hacerlo fíjese que en la URL, aparece un ID que identifica su cuenta. Es decir, si su URL es similar a https://plus.google.com/101454396565203911226 entonces el ID es esa serie de numeros: 101454396565203911226.</span>
  7. <span>Anotelos en su config bajo el parametro &#8220;$proId&#8221;</span>
  8. <span>Ingrese con su cuenta Twitter a <a href="https://dev.twitter.com/apps">https://dev.twitter.com/apps</a></span>
  9. <span>Click en &#8220;Create a new Application&#8221;.</span>
 10. <span>Ingresamos lo que se nos ocurra para &#8220;name&#8221;, &#8220;description&#8221; y para &#8220;website&#8221; y aceptamos los términos.</span>
 11. <span>Vamos a la opción &#8220;Settings&#8221; y bajo el box &#8220;Application Type&#8221; marcamos la opción &#8220;Read and Write&#8221;.</span>
 12. <span>Volvemos a &#8220;Details&#8221; y presionamos el botón &#8220;Your access token&#8221; para crear nuestro Token.</span>
 13. <span>Configuramos los datos en nuestro config.</span>
 14. <span>Damos permisos de escritura al directorio Cache (chmod -R 777 Cache).</span>
 15. <span>Cronteamos el sync.php para que se ejecute a intervalos de tiempo.</span>

<div>
  <span>Y con esto, a disfrutar nuestros posts en Twitter desde Google+.</span>
</div>

<div>
  Publicado originalmente por Oscar Valenzuela en http://ovalenzuela.xpertians.com &#8211; Puede ser compartido y copiado libremente, mientras mantenga esta nota.
</div>