---
id: 75
title: Si te interesa Tor o Linux eres Person of Interest en la NSA
date: 2014-07-04T03:17:00+00:00
author: ovalenzuela
layout: post
guid: https://ovalenzueladotcom.wordpress.com/2014/07/04/si-te-interesa-tor-o-linux-eres-person-of-interest-en-la-nsa
permalink: /2014/07/si-te-interesa-tor-o-linux-eres-person-of-interest-en-la-nsa.html
blogger_blog:
  - www.ovalenzuela.com
blogger_author:
  - Andrés Barrera
blogger_02f5be51301771664ae7c1c72bf29246_permalink:
  - 3948732013879117894
categories:
  - Noticias Destacadas
---
<div>
  Dentro de los <a href="http://www.elladodelmal.com/2013/09/0wn3d-o-como-la-nsa-mato-el-espiritu-de.html" target="_blank">proyectos de la NSA para poder investigar</a> lo que estaba pasando en <i><b>Internet</b></i> que pudieron ser conocidos tras las filtración de documentos de <i><b>Edward Snowden</b></i> apareció <a href="http://www.elladodelmal.com/2013/07/x-keyscore-el-sistema-de-data-mining-de.html" target="_blank">X-Keyscore</a>, un sistema distribuido para el análisis de los datos capturados por medio de los programas <a href="http://www.elladodelmal.com/2013/06/prism-fisa-y-el-usa-patriot-act.html" target="_blank">PRISM</a> o <a href="http://www.elladodelmal.com/2013/06/mastering-internet-y-la-operacion.html" target="_blank">Tempora</a>, orientados a la recolección de información.
</div>

<div>
  <table align="center" cellpadding="0" cellspacing="0">
    <tr>
      <td>
        <a href="http://www.elladodelmal.com/2013/07/x-keyscore-el-sistema-de-data-mining-de.html" target="_blank"><img border="0" src="http://www.ovalenzuela.com/wp-content/uploads/2016/02/2b7d3-xkeyscore_2.png" width="470" /></a>
      </td>
    </tr>
    
    <tr>
      <td>
        <i>Figura 1: Distribución de los servidores de X-Keyscore por el mundo</i>
      </td>
    </tr>
  </table>
  
  <p>
    </div> 
    
    <div>
    </div>
    
    <div>
      <a href="http://www.elladodelmal.com/2013/07/x-keyscore-el-sistema-de-data-mining-de.html" target="_blank">X-Keyscore</a> es un sistema de análisis de información distribuido, con servidores en multiples puntos del mundo al cuál los investigadores se conectan para localizar a los posibles sospechosos. Como vimos, entre las cosas que podía preguntar un analista para encontrar esas anomalías, estaba el uso de criptografía o el uso de determinados idiomas en ubicaciones no habituales para esa lengua.
    </div>
    
    <div>
    </div>
    
    <div>
      Dentro de todos los documentos que se han podido ir conociendo después, en algunos <a href="http://daserste.ndr.de/panorama/xkeyscorerules100.txt" target="_blank">ficheros de reglas de configuración de X-Keyscore</a>, tal y como se puede ver a continuación, los agentes de la <i><b>NSA</b></i> estaban registrando las direcciones <i><b>IP</b></i> de la gente que estaba conectándose a sitios que ofrecen a los usuarios alguna información sobre <i><b>criptografía</b></i>, tales como el sitio web de <a href="https://tails.boum.org/" target="_blank">Tails (The Amnesic Incognito Live System)</a>, una distribución de <i><b>Linux</b></i> basada en <i><b>Debian</b></i> y centrada en el anonimato.
    </div>
    
    <div>
    </div>
    
    <table align="center" cellpadding="0" cellspacing="0">
      <tr>
        <td>
          <a href="https://tails.boum.org/" target="_blank"><img border="0" src="http://www.ovalenzuela.com/wp-content/uploads/2016/02/0b371-tails.png" /></a>
        </td>
      </tr>
      
      <tr>
        <td>
          <i>Figura 2: <a href="https://tails.boum.org/" target="_blank">Tails, Live Debian Linux enfocada en privacidad y anonimato</a></i>
        </td>
      </tr>
    </table>
    
    <div>
    </div>
    
    <div>
      Esa distribución es un sistema operativo live que se puede correr desde un <i><b>USB</b></i>, una <i><b>smartcard</b></i> o un <i><b>DVD</b></i> y que realiza absolutamente todas las conexiones a través de la red <i><b>TOR</b></i>, con la idea de <a href="http://www.elladodelmal.com/2013/09/conectate-tor-con-tu-propio-nodo-y-sin.html" target="_blank">conectarse a TOR sin usar Internet en el mismo equipo</a>.</p> 
      
      <table align="center" cellpadding="0" cellspacing="0">
        <tr>
          <td>
            <a href="http://www.ovalenzuela.com/wp-content/uploads/2016/02/17d87-tails_rules.png" target="_blank"><img border="0" src="http://www.ovalenzuela.com/wp-content/uploads/2016/02/17d87-tails_rules.png" width="470" /></a>
          </td>
        </tr>
        
        <tr>
          <td>
            <i>Figura 3: Reglas de X-Keyscore para detectar conexiones a Tails y Linux Journal</i><span> </span>
          </td>
        </tr>
      </table>
      
      <p>
        A pesar de que la <a href="http://www.elladodelmal.com/2013/09/como-ser-anonimo-en-internet-la-red-tor.html" target="_blank">NSA tiene ya muchos proyectos de investigación de TOR</a>, que van desde el uso de servidores infiltrados hasta el estudio estadístico de las conexiones y los saltos de routers, parece que una buena idea es registrar las direcciones <i><b>IP</b></i> de los usuarios que se conectan a los servidores web y tenerlos &#8220;<i><b>fichados</b></i>&#8221; desde el principio.
      </p>
    </div>
    
    <div>
      <table align="center" cellpadding="0" cellspacing="0">
        <tr>
          <td>
            <a href="http://www.ovalenzuela.com/wp-content/uploads/2016/02/f0d54-tor_rules.png" target="_blank"><img border="0" src="http://www.ovalenzuela.com/wp-content/uploads/2016/02/f0d54-tor_rules.png" width="470" /></a>
          </td>
        </tr>
        
        <tr>
          <td>
            <i>Figura 4: Reglas de X-Keyscore para gente que se conecta a servidores de Tor en la web</i>
          </td>
        </tr>
      </table>
      
      <p>
        </div> 
        
        <div>
          La cosa va más allá aún, ya que <a href="http://daserste.ndr.de/panorama/xkeyscorerules100.txt" target="_blank">en el fichero de reglas</a> se puede ver que simplemente con conectarse a la web de <i><b>Linux Journal</b></i> te convierte en sospechoso y una <i><b>&#8220;person of interest&#8221;</b></i> para ser investigado dentro de la plataforma <a href="http://www.elladodelmal.com/2013/07/x-keyscore-el-sistema-de-data-mining-de.html" target="_blank">X-Keyscore</a>. Es decir, el mero hecho de estar interesado en <i><b>criptografía</b></i>, anonimato o <i><b>Linux</b></i> te convertía en investigable para la <i><b>NSA</b></i>.
        </div>
        
        <div>
        </div>
        
        <div>
          Saludos Malignos!
        </div>
        
        <div>
          <a href="http://elladodelmal.com" target="_blank">Un informático en el lado del mal</a> &#8211; <a href="https://plus.google.com/102683520044497994270/posts" target="_blank">Google+</a> <a href="http://feeds.feedburner.com/ElLadoDelMal" target="_blank">RSS</a> <a href="http://0xword.com" target="_blank">0xWord</a> <a href="http://seguridadapple.com" target="_blank">Seguridad Apple</a><br /><a href="http://0xword.com/" target="_blank"><img src="http://www.ovalenzuela.com/wp-content/uploads/2016/02/420ad-l5.png" /></a>
        </div>
        
        <div>
          <a href="http://feeds.feedburner.com/~ff/ElLadoDelMal?a=oelV-Y9EVqA:0WzuwHa9w2w:yIl2AUoC8zA" target="_blank"><img src="http://feeds.feedburner.com/~ff/ElLadoDelMal?d=yIl2AUoC8zA" border="0" /></a> <a href="http://feeds.feedburner.com/~ff/ElLadoDelMal?a=oelV-Y9EVqA:0WzuwHa9w2w:-BTjWOF_DHI" target="_blank"><img src="http://feeds.feedburner.com/~ff/ElLadoDelMal?i=oelV-Y9EVqA:0WzuwHa9w2w:-BTjWOF_DHI" border="0" /></a> <a href="http://feeds.feedburner.com/~ff/ElLadoDelMal?a=oelV-Y9EVqA:0WzuwHa9w2w:qj6IDK7rITs" target="_blank"><img src="http://feeds.feedburner.com/~ff/ElLadoDelMal?d=qj6IDK7rITs" border="0" /></a> <a href="http://feeds.feedburner.com/~ff/ElLadoDelMal?a=oelV-Y9EVqA:0WzuwHa9w2w:7Q72WNTAKBA" target="_blank"><img src="http://feeds.feedburner.com/~ff/ElLadoDelMal?d=7Q72WNTAKBA" border="0" /></a> <a href="http://feeds.feedburner.com/~ff/ElLadoDelMal?a=oelV-Y9EVqA:0WzuwHa9w2w:I9og5sOYxJI" target="_blank"><img src="http://feeds.feedburner.com/~ff/ElLadoDelMal?d=I9og5sOYxJI" border="0" /></a> <a href="http://feeds.feedburner.com/~ff/ElLadoDelMal?a=oelV-Y9EVqA:0WzuwHa9w2w:ecdYMiMMAMM" target="_blank"><img src="http://feeds.feedburner.com/~ff/ElLadoDelMal?d=ecdYMiMMAMM" border="0" /></a>
        </div>
        
        <p>
          <img src="http://feeds.feedburner.com/~r/ElLadoDelMal/~4/oelV-Y9EVqA" height="1" width="1" />
        </p>