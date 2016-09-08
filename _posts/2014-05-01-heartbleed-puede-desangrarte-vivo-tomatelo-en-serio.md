---
id: 115
title: Heartbleed puede desangrarte vivo. Tómatelo en serio.
date: 2014-05-01T07:11:00+00:00
author: ovalenzuela
layout: post
guid: https://ovalenzueladotcom.wordpress.com/2014/05/01/heartbleed-puede-desangrarte-vivo-tomatelo-en-serio
permalink: /2014/05/heartbleed-puede-desangrarte-vivo-tomatelo-en-serio.html
blogger_blog:
  - www.ovalenzuela.com
blogger_author:
  - Andrés Barrera
blogger_02f5be51301771664ae7c1c72bf29246_permalink:
  - 2218627177254760106
categories:
  - Noticias Destacadas
---
<div align="justify">
  Aunque últimamente ando bastante falto de tiempo libre debido a la cantidad de proyectos que intento llevar en paralelo pero mi carácter curioso e impulsivo me la ha vuelto a jugar y me ha hecho perder un poco de tiempo jugando con un servidor. Por motivos que no vienen al caso, estaba yo echando un vistazo a la página web de alguien relacionado con mi trabajo, el de experto en sistemas de automatización industrial concretamente, que ya sabéis que es de lo que me gusta hablar a mí en mis artículos, pero me topé con un bug de <a href="http://www.elladodelmal.com/2014/04/heartbleed-y-el-caos-de-seguridad-en.html" target="_blank">HeartBleed</a> en un puerto menos habitual y he querido hacer este artículo para enfatizar estas cosas:<br /> 
  
  <blockquote>
    <i>1.- HeartBleed puede estar en cualquier parte<br />2.- Es muy fácil de explotar<br />3.- Cambia las passwords<br />4.- Pon un segundo factor de autenticación a tus cuentas.</i></p>
  </blockquote>
  
  <p>
    <b>Fase 1: Descubriendo la Vulnerabilidad de HeartBleed</b>
  </p>
  
  <p>
    Mientras leía la web y me interesaba por lo que allí había hice lo que cualquier persona normal -, lancé un <i><b>nmap</b></i> al servidor donde se aloja &#8211; vale, supongo que esto de normal encajaría solo dentro de los que estamos por estas comunidades y que no será tan normal en otros lares -. De entre todos los servicios y puertos que salieron en los resultados hubo uno de todos ellos que me llamó la atención.
  </p>
  
  <table align="center" cellpadding="0" cellspacing="0">
    <tr>
      <td>
        <a href="http://www.ovalenzuela.com/wp-content/uploads/2016/02/6e218-01_nmap.png" target="_blank"><img border="0" src="http://www.ovalenzuela.com/wp-content/uploads/2016/02/6e218-01_nmap.png" width="470" /></a>
      </td>
    </tr>
    
    <tr>
      <td>
        <i>Figura 1: Lanzando nmap contra el servidor</i>
      </td>
    </tr>
  </table>
  
  <p>
    Era un servidor de <i><b>Plesk 11.0.9</b></i>, algo que no es que sea inhabitual, pero que abre siempre las puertas de poder encontrar algo interesante especialmente al estar alojado en un puerto menos habitual al escaneo, especialmente esos días que la vulnerabilidad de <a href="http://www.elladodelmal.com/2014/04/heartbleed-y-el-caos-de-seguridad-en.html" target="_blank">Heartbleed</a> estaba en todo su esplendor. 
    
    <div>
    </div>
    
    <p>
      <table align="center" cellpadding="0" cellspacing="0">
        <tr>
          <td>
            <a href="http://blog.elevenpaths.com/2014/04/heartbleed-plugin-for-foca.html" target="_blank"><img border="0" src="http://www.ovalenzuela.com/wp-content/uploads/2016/02/7b0bf-hbfoca2.png" width="470" /></a>
          </td>
        </tr>
        
        <tr>
          <td>
            <i>Figura 2: <a href="http://blog.elevenpaths.com/2014/04/heartbleed-plugin-for-foca.html" target="_blank">Plugin de HeartBleed para FOCA</a></i>
          </td>
        </tr>
      </table>
      
      <div>
      </div>
      
      <p>
        <div>
        </div>
        
        <p>
          Como aún no había sacado <a href="http://www.elevenpaths.com/" target="_blank">Eleven Paths</a> su <a href="http://blog.elevenpaths.com/2014/04/heartbleed-plugin-for-foca.html" target="_blank">plugin de HeartBleed para FOCA</a> que puedes ver en la imagen superior, me fui a buscar cualquiera funcional en <i><b>exploit-db</b></i>, y use <a href="http://www.exploit-db.com/exploits/32764" target="_blank">este en concreto</a>. Lo lancé y esperé el resultado.
        </p>
        
        <table align="center" cellpadding="0" cellspacing="0">
          <tr>
            <td>
              <a href="http://www.ovalenzuela.com/wp-content/uploads/2016/02/65738-02_script.png" target="_blank"><img border="0" src="http://www.ovalenzuela.com/wp-content/uploads/2016/02/65738-02_script.png" /></a>
            </td>
          </tr>
          
          <tr>
            <td>
              <i>Figura 3: Lanzando el exploit al puerto 8443</i>
            </td>
          </tr>
        </table>
        
        <p>
          Como podéis ver, es vulnerable y devuelve <i><b>16384 bytes</b></i> de información de la memoria del proceso <i><b>OpenSSL</b></i> dentro de este servidor, pero en este primer intento no hay información de interés en la respuesta que pueda considerarse jugosa. Por el momento.
        </p>
        
        <table align="center" cellpadding="0" cellspacing="0">
          <tr>
            <td>
              <a href="http://www.ovalenzuela.com/wp-content/uploads/2016/02/e3797-03_script.png" target="_blank"><img border="0" src="http://www.ovalenzuela.com/wp-content/uploads/2016/02/e3797-03_script.png" width="470" /></a>
            </td>
          </tr>
          
          <tr>
            <td>
              <i>Figura 4: El servidor es vulnerable al exploit</i>
            </td>
          </tr>
        </table>
        
        <p>
          <b>Fase 2: Explotando HeartBleed de forma automatizada</b>
        </p>
        
        <p>
          A estas alturas, como os habéis podido imaginar, ya no tengo mayor interés por la página web que estaba leyendo y me centro en mi vulnerable amigo. Decido pedir la página de login del panel y probar a introducir algunas combinaciones habituales de usuario y contraseña de las que no espero resultados. Ya sabéis, los <i><b>&#8220;sospechosos habituales&#8221;</b></i> <i><b>admin/admin, admin/Abc123456, admin/123456</b></i>, etcétera. Creo que hacer esto es un mecanismo de mi cerebro para poder pensar mientras las manos son comandadas por el sistema parasimpático.
        </p>
        
        <p>
          Tras varias pruebas obviamente infructuosas vuelvo a lanzar el <i><b>script</b></i> de <i><b>Python</b></i> y obtengo en el volcado de la memoria la última combinación <i><b>user/password</b></i> que había utilizado. Perfecto, es cuestión de hacer peticiones hasta que el usuario legítimo entre al panel, cosa bastante improbable teniendo en cuenta la hora que es.
        </p>
        
        <table align="center" cellpadding="0" cellspacing="0">
          <tr>
            <td>
              <a href="http://blog.elevenpaths.com/2014/04/heartbleed-plugin-for-foca.html" target="_blank"><img border="0" src="http://www.ovalenzuela.com/wp-content/uploads/2016/02/a5a2c-hbfoca3.png" width="470" /></a>
            </td>
          </tr>
          
          <tr>
            <td>
              <i>Figura 5: Opción de fijar el ataque de <a href="http://blog.elevenpaths.com/2014/04/heartbleed-plugin-for-foca.html" target="_blank">HeartBleed en el Plugin de FOCA</a></i>
            </td>
          </tr>
        </table>
        
        <p>
          Esto es algo que hoy en día está bastante automatizado en todos los ataques de <a href="http://www.elladodelmal.com/2014/04/heartbleed-y-el-caos-de-seguridad-en.html" target="_blank">HeartBleed</a>, y por eso en el <a href="http://blog.elevenpaths.com/2014/04/heartbleed-plugin-for-foca.html" target="_blank">plugin de HeartBleed para FOCA</a> se ha añadido de la opción de lanzar el ataque cada 5 segundos y generar un log, algo que ya podían haber publicado antes y no habría tenido que hacérmelo yo.
        </p>
        
        <p>
          Como no tenía claro si a la mañana siguiente tendría tiempo de ponerme de nuevo, preparé un pequeño script en <i><b>Bash</b></i> que me hiciera el trabajo sucio de explotar la vulnerabilidad periódicamente guardando los datos cada <i><b>30 segundos</b></i> hasta que pueda volver a evadirme de las obligaciones y centrarme en las diversiones.
        </p>
        
        <table align="center" cellpadding="0" cellspacing="0">
          <tr>
            <td>
              <a href="http://www.ovalenzuela.com/wp-content/uploads/2016/02/65cb6-04_scriptautomatico.png" target="_blank"><img border="0" src="http://www.ovalenzuela.com/wp-content/uploads/2016/02/65cb6-04_scriptautomatico.png" /></a>
            </td>
          </tr>
          
          <tr>
            <td>
              <i>Figura 6: Script en Bash para fijar la explotación del bug de HeartBleed</i>
            </td>
          </tr>
        </table>
        
        <p>
          Poco que explicar, sencillo pero funcional. Abro una conexión <i><b>ssh</b></i> hacia el equipo que se va quedar haciendo el trabajo y creo una sesión con <i><b>Screen</b></i>, me parece una buena opción cuando abro terminales de forma remota porque al cerrar la conexión la sesión se queda abierta en el servidor. Solo queda esperar el tiempo suficiente.
        </p>
        
        <p>
          Al día siguiente, cerca del mediodía echo un vistazo al <i><b>log</b></i> y sorpresa, en algún momento se ha conectado alguien con credenciales de administrador y éstas han sido capturadas.
        </p>
        
        <table align="center" cellpadding="0" cellspacing="0">
          <tr>
            <td>
              <a href="http://www.ovalenzuela.com/wp-content/uploads/2016/02/44f1b-05_catgrep.png" target="_blank"><img border="0" src="http://www.ovalenzuela.com/wp-content/uploads/2016/02/44f1b-05_catgrep.png" width="470" /></a>
            </td>
          </tr>
          
          <tr>
            <td>
              <i>Figura 7: Una password en el log</i>
            </td>
          </tr>
        </table>
        
        <p>
          Llegados a este punto no puedo vencer la tentación y entro al panel a echar un vistazo, solo un vistazo, os lo juro, para poder mostrar esta captura y conseguir enfatizar el mensaje final de este artículo.
        </p>
        
        <table align="center" cellpadding="0" cellspacing="0">
          <tr>
            <td>
              <a href="http://www.ovalenzuela.com/wp-content/uploads/2016/02/62cd0-06_plesk.png" target="_blank"><img border="0" src="http://www.ovalenzuela.com/wp-content/uploads/2016/02/62cd0-06_plesk.png" width="470" /></a>
            </td>
          </tr>
          
          <tr>
            <td>
              <i>Figura 8: El panel accesible</i>
            </td>
          </tr>
        </table>
        
        <p>
          <b>Conclusiones sobre HeartBleed</b>
        </p>
        
        <p>
          Una de las webs alojadas en este servidor pertenece a un bufete de abogados, por lo que para que quede claro desde el principio el carácter didáctico del ataque he decidido ponerme en contacto con ellos directamente y que sean ellos los que se encarguen de exigir a quien estimen conveniente que apliquen una política de seguridad adecuada. 
          
          <div>
          </div>
          
          <p>
            Hoy en día <a href="http://www.elladodelmal.com/2014/04/heartbleed-y-el-caos-de-seguridad-en.html" target="_blank">HeartBleed</a> es ya una vulnerabilidad conocida en profundidad, explotada de manera habitual por todas las herramientas, pero seguro que seguiremos encontrándola aún en multitud de sitios durante años. Es muy fácil de automatizar y sería más que recomendable que tomaras en serio las recomendaciones del principio de este artículo. Haz un escaneo profundo de todos equipos de la red &#8211; todos, incluidos los dispositivos de red &#8211; y por todos los puertos &#8211; todos los puertos &#8211; buscando cualquier <i><b>OpenSSL</b></i> vulnerable que pueda estar ahí.
          </p>
          
          <p>
            Por supuesto, todas las <i><b>passwords</b></i> que tuvieras antes de <a href="http://www.elladodelmal.com/2014/04/heartbleed-y-el-caos-de-seguridad-en.html" target="_blank">HeartBleed</a> deben ser cambiadas, al igual que los certificados digitales, deben ser cambiadas, porque mucha gente ha estado haciendo estas mismas pruebas y pueden estar en manos de cualquiera. Pon un segundo factor de autenticación a cada identidad que puedas o <a href="https://latch.elevenpaths.com/" target="_blank">Latch</a> si puedes a tu web que como dice este artículo &#8220;<a href="http://blogthinkbig.com/latch/" target="_blank">Con Latch el problema de Heartbleed no hubiera sido tan grande</a>&#8220;. Además, visto este ejemplo de hoy, tal vez sería bueno que el equipo de <a href="http://www.elevenpaths.com/" target="_blank">Eleven Paths</a> &#8211; o alguien &#8211; sacara un <i><b>plugin de Latch para Plesk</b></i>, que parece que hace falta.
          </p>
          
          <p>
            Autor: <i><b>Juan Luis Valverde Padilla</b></i><br /><i><b>jl.valverde@jvalverde.es</b></i></div> 
            
            <div>
              <a href="http://elladodelmal.com" target="_blank">Un informático en el lado del mal</a> &#8211; <a href="https://plus.google.com/102683520044497994270/posts" target="_blank">Google+</a> <a href="http://feeds.feedburner.com/ElLadoDelMal" target="_blank">RSS</a> <a href="http://0xword.com" target="_blank">0xWord</a> <a href="http://seguridadapple.com" target="_blank">Seguridad Apple</a><br /><a href="http://0xword.com/" target="_blank"><img src="http://www.ovalenzuela.com/wp-content/uploads/2016/02/f22f5-l5.png" /></a>
            </div>
            
            <div>
              <a href="http://feeds.feedburner.com/~ff/ElLadoDelMal?a=ybKyLG6yJlA:O3eoRJ6cmRg:yIl2AUoC8zA" target="_blank"><img src="http://feeds.feedburner.com/~ff/ElLadoDelMal?d=yIl2AUoC8zA" border="0" /></a> <a href="http://feeds.feedburner.com/~ff/ElLadoDelMal?a=ybKyLG6yJlA:O3eoRJ6cmRg:-BTjWOF_DHI" target="_blank"><img src="http://feeds.feedburner.com/~ff/ElLadoDelMal?i=ybKyLG6yJlA:O3eoRJ6cmRg:-BTjWOF_DHI" border="0" /></a> <a href="http://feeds.feedburner.com/~ff/ElLadoDelMal?a=ybKyLG6yJlA:O3eoRJ6cmRg:qj6IDK7rITs" target="_blank"><img src="http://feeds.feedburner.com/~ff/ElLadoDelMal?d=qj6IDK7rITs" border="0" /></a> <a href="http://feeds.feedburner.com/~ff/ElLadoDelMal?a=ybKyLG6yJlA:O3eoRJ6cmRg:7Q72WNTAKBA" target="_blank"><img src="http://feeds.feedburner.com/~ff/ElLadoDelMal?d=7Q72WNTAKBA" border="0" /></a> <a href="http://feeds.feedburner.com/~ff/ElLadoDelMal?a=ybKyLG6yJlA:O3eoRJ6cmRg:I9og5sOYxJI" target="_blank"><img src="http://feeds.feedburner.com/~ff/ElLadoDelMal?d=I9og5sOYxJI" border="0" /></a> <a href="http://feeds.feedburner.com/~ff/ElLadoDelMal?a=ybKyLG6yJlA:O3eoRJ6cmRg:ecdYMiMMAMM" target="_blank"><img src="http://feeds.feedburner.com/~ff/ElLadoDelMal?d=ecdYMiMMAMM" border="0" /></a>
            </div>
            
            <p>
              <img src="http://feeds.feedburner.com/~r/ElLadoDelMal/~4/ybKyLG6yJlA" height="1" width="1" />
            </p>