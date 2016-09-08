---
id: 68
title: El camino de Node.js en Google Cloud
date: 2014-10-01T05:37:00+00:00
author: ovalenzuela
layout: post
guid: https://ovalenzueladotcom.wordpress.com/2014/10/01/el-camino-de-node-js-en-google-cloud
permalink: /2014/10/el-camino-de-node-js-en-google-cloud.html
blogger_blog:
  - www.ovalenzuela.com
blogger_author:
  - Oscar Valenzuela
blogger_02f5be51301771664ae7c1c72bf29246_permalink:
  - 7197329331321859128
dsq_thread_id:
  - 4781218290
categories:
  - Desarrollo
  - Feedly
---
<div>
  <div class="separator" style="clear:both;text-align:center;">
    <a href="http://www.ovalenzuela.com/wp-content/uploads/2016/02/6575b-google-cloud-logo.png" style="margin-left:1em;margin-right:1em;"><img border="0" src="http://www.ovalenzuela.com/wp-content/uploads/2016/02/6575b-google-cloud-logo.png" /></a>
  </div>
  
  <p>
    <div style="text-align:justify;">
      <span style="font-family:Verdana, sans-serif;">Ante la pregunta <strong>¿por qué Node.js no está disponible en Google App Engine?</strong> Durante mucho tiempo no encontrábamos una explicación clara. Google creó el motor V8 en el que se basa Node.js pero, a nuestro pesar, lleva tiempo desaprovechando una oportunidad muy interesante. Finalmente, parece que las cosas van cambiando a lo que se refieren a la comunidad de desarrolladores de Node.js interesados en trabajar con la nube de Google. Mientras, otros servicios le han ganado mucho terreno.</span>
    </div>
    
    <div style="text-align:justify;">
      <span style="font-family:Verdana, sans-serif;"><strong>Google App Engine ya ofrece soporte (entre comillas) a Node.js</strong>. No lo encontraréis entre las plataformas oficiales, sino que hay que recurrir al concepto de <em>Custom Runtimes</em> que permite inyectar unas <strong>runtimes específicas a nuestro VM</strong>, como por ejemplo, Ruby on Rails, Node.JS o cualquier otro entorno.</span>
    </div>
    
    <div style="text-align:justify;">
      <span style="font-family:Verdana, sans-serif;">En la pasada de Google IO anunciaron el soporte a través de <a href="http://ift.tt/1nIROn4">Managed VMs (aún limitadas en preview)</a>. En Github dentro del proyecto de Google Cloud Platform tenemos <a href="http://ift.tt/1on7LID">ejemplos que explican el funcionamiento</a> y cómo configurar App Engine para usar Node.js.</span>
    </div>
    
    <p>
      <a href="http://ift.tt/1nIRLHS">http://ift.tt/1nIRLHS</a> 
      
      <div style="text-align:justify;">
        <span style="font-family:Verdana, sans-serif;">Desde hace un tiempo existe <a href="http://ift.tt/1d1GImW">Google APIs Node.js Client</a> para acceder a las APIs que provee Google. Su intención no es más que abrir la comunicación desde Node.js a las APIs que ofrece Google como Youtube, Drive, Gmail, Analytics, etc…</span>
      </div>
      
      <div style="text-align:justify;">
        <span style="font-family:Verdana, sans-serif;">Ahora también se une, desde hace un par de semanas, <a href="http://ift.tt/1sv54HT">Google Cloud Platform para Node.js</a> que añade soporte para interactuar con <a href="http://ift.tt/1eT8f6o">Cloud Datastore</a> y Cloud Storage desde cualquier app Node.js. Con un par de líneas se puede acceder a cualquiera de los servicios en la nube. El proyecto está liberado en Github como Open Source y contiene múltiples ejemplos de qué hacer.</span>
      </div></div>