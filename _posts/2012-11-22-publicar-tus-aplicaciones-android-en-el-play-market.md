---
id: 477
title: Publicar tus aplicaciones Android en el Play Market
date: 2012-11-22T19:53:00+00:00
author: ovalenzuela
layout: post
guid: https://ovalenzueladotcom.wordpress.com/2012/11/22/publicar-tus-aplicaciones-android-en-el-play-market
permalink: /2012/11/publicar-tus-aplicaciones-android-en-el-play-market.html
blogger_blog:
  - www.ovalenzuela.com
blogger_author:
  - Andrés Barrera
blogger_02f5be51301771664ae7c1c72bf29246_permalink:
  - 4801119463698041021
dsq_thread_id:
  - 4887603131
categories:
  - Android
  - Desarrollo
  - Google
---
<div>
  <h3>
    <span>Registrarse para publicar aplicaciones en el Play Market</span>
  </h3>
</div>

<div>
  <div>
    <a href="http://www.ovalenzuela.com/wp-content/uploads/2016/02/6a56f-google-play.jpg"><img border="0" height="178" src="http://www.ovalenzuela.com/wp-content/uploads/2016/02/6a56f-google-play.jpg?w=300" width="200" /></a>
  </div>
  
  <p>
    <span>Antes de publicar una aplicación, debemos registrarnos como publicadores en Android Market. Para esto, visitamos el sitio <a href="http://market.android.com/publish">http://market.android.com/publish</a> e ingresamos con nuestra cuenta Google (correo gmail). Luego, llenamos toda la información requerida, incluyendo tu nombre verdadero y numero de teléfono REAL, donde Google te contactará en caso de una emergencia como un problema con tu cuenta o con alguna de tus aplicaciones publicadas. Es importante destacar que se recomienda usar datos reales, ya que Google podría usarlos para verificar tu identidad, a fin de definir si publica o no tus aplicaciones o si en algún minuto decides cobrar por tus apps, Google verificara estos datos antes de liberar el pago. Te recomendamos leer el acuerdo de distribución de Android Market que se te presentará, y será requisito aceptar los términos y condiciones, además deberás cancelar un costo de inscripción (solo 1 vez) de $25 USD usando tu tarjeta de crédito. </span><span>Cuando el proceso haya concluido, tendrás tu cuenta de publicador lista para recibir tu primera aplicación.</span></div> 
    
    <div>
      <span><br /></span>
    </div>
    
    <div>
      <h3>
        <span>Generando las firmas para nuestra aplicación</span>
      </h3>
    </div>
    
    <div>
      <span>Asumiendo que tu aplicación esta lista para ser publicada, eso incluye que:</span>
    </div>
    
    <div>
      <span>&#8211; Fue probada varias veces y en diferentes dispositivos</span>
    </div>
    
    <div>
      <span>&#8211; Se configuraron los permisos requeridos en forma adecuada</span>
    </div>
    
    <div>
      <span>&#8211; Se especifico el nombre y se agregó el icono correspondiente</span>
    </div>
    
    <div>
      <span>&#8211; Se configuró la versión en el archivo manifest</span>
    </div>
    
    <div>
      <span>&#8211; Se declararon las versiones compatibles</span>
    </div>
    
    <div>
      <span>(minSdkVersion, targetSdkVersion, maxSdkVersion)</span>
    </div>
    
    <div>
      <span>&#8211; Se limpiaron los logs y repositorios de prueba</span>
    </div>
    
    <div>
      <span>&#8211; Se eliminaron los registros de logs y todo lo que se creo con fines de depuración</span>
    </div>
    
    <div>
      <span>Entonces procederemos a firmar la aplicación y prepararla para ser publicada.</span>
    </div>
    
    <div>
      <span>Cada vez que tu compilas y ejecutas directamente desde Eclipse, se asigna una llave temporal usada para desarrollar, la que es usada para firmar las aplicaciones, y ya que Play Market no acepta aplicaciones en desarrollo, será necesario crear una llave personal, usada para firmar tus aplicaciones que pasarán a &#8220;producción&#8221; o mejor dicho, que serán publicadas en el Play Market. Esto se usa para garantizar la autenticidad de la aplicación, por lo que es muy importante que durante el proceso de generación de los certificados, se defina una contraseña robusta, y mantengas en resguardo el archivo generado.</span>
    </div>
    
    <p>
      <div>
        <span>Para generar una aplicación firmada y de paso generar nuestro certificado, debes seleccionar el proyecto en el explorador, luego ir en el Eclipse a Archivo>Exportar donde seleccionaremos bajo el contenedor Android, la opción Exportar una Aplicación Android y damos en siguiente. </span>
      </div>
      
      <div>
        <span><br /></span>
      </div>
      
      <div>
        <a href="http://www.ovalenzuela.com/wp-content/uploads/2016/02/5a0f4-capturadepantallade2012-11-22163512.png"><img border="0" height="320" src="http://www.ovalenzuela.com/wp-content/uploads/2016/02/5a0f4-capturadepantallade2012-11-22163512.png?w=259" width="275" /></a>
      </div>
      
      <div>
      </div>
      
      <div>
      </div>
      
      <div>
        <span>A continuación dejamos intacto el nombre del proyecto, damos siguiente y nos dejará crear un nuevo &#8220;KeyStroke&#8221; o certificado de llaves, aquí es muy importante crear el archivo en una carpeta definida, muy segura y elegir una muy buena contraseña. </span>
      </div>
      
      <div>
        <span><br /></span>
      </div>
      
      <div>
        <a href="http://www.ovalenzuela.com/wp-content/uploads/2016/02/e49c2-capturadepantallade2012-11-22163714.png"><img border="0" height="320" src="http://www.ovalenzuela.com/wp-content/uploads/2016/02/e49c2-capturadepantallade2012-11-22163714.png?w=257" width="273" /></a>
      </div>
      
      <div>
        <span><br /></span>
      </div>
      
      <div>
        <span><br /></span>
      </div>
      
      <div>
        <span>Luego de ingresar estos datos y dar siguiente, nos solicitará ingresar los datos del perfil, podemos llenar con lo que necesitemos, garantizando que al menos se ingresen los siguientes:</span>
      </div>
      
      <div>
        <span><br /></span>
      </div>
      
      <div>
        <a href="http://www.ovalenzuela.com/wp-content/uploads/2016/02/94c53-capturadepantallade2012-11-22163748.png"><img border="0" height="320" src="http://www.ovalenzuela.com/wp-content/uploads/2016/02/94c53-capturadepantallade2012-11-22163748.png?w=257" width="273" /></a>
      </div>
      
      <div>
      </div>
      
      <p>
        <div>
          <span>Luego, se nos solicitará la ubicación donde queremos crear nuestra aplicación y al haberlo definido, solo le damos al botón &#8220;Finalizar&#8221;. Cuando el sistema termine, la ventana se cerrará y nuestra aplicación estará en la ubicación definida anteriormente, firmada con nuestra llave personal y lista para ser publicada. En adelante, cada vez que deseemos publicar una nueva versión, deberemos realizar el mismo proceso, pero usando el KeyStroke ya creado, por lo que es en extremo importante guardar muy bien este archivo.</span>
        </div>
        
        <p>
          <h3>
            <span>Publicando mi primera aplicación</span>
          </h3>
          
          <p>
            <div>
              <span>Ingresa a tu cuenta de publicación y presiona sobre &#8220;Upload an Application&#8221;, llena todos los datos solicitados, debes como mínimo ingresar las capturas de pantalla de tu aplicación ejecutandose, y agrega una corta y precisa descripción. Llena el resto de datos, como si deseas cobrar por tu software, finalmente presiona &#8220;Publish&#8221; y tu aplicación estará disponible al cabo de 1 o 2 horas, tiempo que demora el sistema en validar que tu software no sea malware. </span><span>Al cabo de 3 horas, lo que es bastante tiempo, verifica el Play Market en busca de tu aplicación, y ya debería esta disponible.</span>
            </div>
            
            <div>
              Publicado originalmente por Oscar Valenzuela en http://ovalenzuela.xpertians.com &#8211; Puede ser compartido y copiado libremente, mientras mantenga esta nota.
            </div>