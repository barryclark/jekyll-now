---
id: 497
title: Ambiente de Desarrollo de Android para Fedora
date: 2012-10-10T15:25:00+00:00
author: ovalenzuela
layout: post
guid: https://ovalenzueladotcom.wordpress.com/2012/10/10/ambiente-de-desarrollo-de-android-para-fedora
permalink: /2012/10/ambiente-de-desarrollo-de-android-para-fedora.html
blogger_blog:
  - www.ovalenzuela.com
blogger_author:
  - Andrés Barrera
blogger_02f5be51301771664ae7c1c72bf29246_permalink:
  - 1273500160700601560
dsq_thread_id:
  - 4747571278
categories:
  - Android
  - Desarrollo
  - Google
---
<div>
  <span>Preparando el material necesario para el Taller de Android, se requiere instalar ciertos programas que se utilizarán para programar y probar las aplicaciones construidas. A continuación se describe el proceso de instalación para Fedora (Debe ser ejecutado como ROOT para evitar conflictos de permisos).</span>
</div>

<div>
  <span><br /></span>
</div>

<div>
  <span>Los requisitos son:</span>
</div>

<div>
  <span>&#8211; Java SDK</span>
</div>

<div>
  <span>&#8211; Android SDK</span>
</div>

<span>&#8211; Eclipse</span> 

<div>
  <div>
    <span>Antes de comenzar nos pasamos a root:</span><br /><span>su &#8211;</span><br /><span><br /></span><span>Luego, descargamos el instalador de JDK desde la siguiente dirección</span><span>:</span>
  </div>
</div>

<div>
  <span><a href="http://www.oracle.com/technetwork/java/javase/downloads/jdk7u7-downloads-1836413.html">http://www.oracle.com/technetwork/java/javase/downloads/jdk7u7-downloads-1836413.html</a></span>
</div>

<div>
  <span><br /></span>
</div>

<div>
  <span>Desde donde descargaremos el archivo jdk-7u7-linux-i586.rpm si utilizamos un sistema de 32bits y jdk-7u7-linux-x64.rpm si usamos un sistema para 64bits.</span><br /><span>Luego de descargar el archivo de acuerdo a nuestra configuración, procedemos a instalar el paquete (siempre como root):</span><br /><span>rpm -Uvh jdk-7u7*.rpm</span><br /><span><br /></span><span>A continuación configuraremos nuestro sistema para que utilice el nuevo JDK instalado, para lo cual ejecutaremos los siguientes comandos:</span><br /><span></span><br /><span><br /></span><span>alternatives &#8211;install /usr/bin/java java /usr/java/latest/jre/bin/java 20000</span><br /><span>alternatives &#8211;install /usr/bin/javac javac /usr/java/latest/bin/javac 20000</span><br /><span>alternatives &#8211;install /usr/bin/jar jar /usr/java/latest/bin/jar 20000</span><br /><span><br /></span>
</div>

<div>
  <span>Es importante destacar que &#8220;</span><span>/usr/java/latest/bin/&#8221; corresponde al directorio donde quedó nuestro JDK instalado yl puede variar a &#8220;</span><span>/usr/java/jdk1.7.0_07/jre/bin/&#8221; o similar. Puedes encontrar más detalles aquí:</span><br /><span><a href="http://www.if-not-true-then-false.com/2010/install-sun-oracle-java-jdk-jre-7-on-fedora-centos-red-hat-rhel/">http://www.if-not-true-then-false.com/2010/install-sun-oracle-java-jdk-jre-7-on-fedora-centos-red-hat-rhel/</a></span><br /><span><br /></span>
</div>

<div>
  <span>Una vez que hayamos descargado e instalado el JDK podremos continuar instalando el SDK de Android. </span><span>Para obtener una copia del SDK de Android, podremos visitar el siguiente enlace:</span>
</div>

<div>
  <span><a href="http://developer.android.com/sdk/index.html">http://developer.android.com/sdk/index.html</a></span>
</div>

<div>
  <span><br /></span>
</div>

<div>
  <span>Donde se nos ofrece la última versión del archivo, junto a otras versiones para diferentes plataformas. Por supuesto, nosotros descargaremos android-sdk_r20.0.3-linux.tgz que a la fecha de esta publicación es la última versión disponible.</span>
</div>

<div>
  <span>Una vez, descargado el archivo, se debe descomprimir para instalar el software.</span><br /><span>tar xvzf android-sdk_r20.0.3-linux.tgz</span><br /><span>cd android-sdk-linux/tools/</span><br /><span>chmod +x android</span><br /><span>./android</span><br /><span><br /></span><span>Durante la instalación nos consulta si queremos dejar disponible el Android SDK a todos los usuarios del sistemas o solo para el usuario actual, dada experiencias anteriores, recomendaremos usar la marcada por defecto.</span>
</div>

<div>
  <span>Una vez instalado el Android SDK, nos preguntará si deseamos abrir inmediatamente el SDK Manager, esta opción nos permitirá descargar e instalar los componentes necesarios para trabajar con las diferentes versiones de Android disponibles, por defecto nos ofrecerá instalar los componentes de la última versión de la API disponible (recomiendo descargar la versión 2.3.x). Adicionalmente a los componentes de la versión de API que deseamos utilizar (recomiendo seleccionar la versión 2.3.x), deberemos marcar el Android SDK platform-tools y en el contenedor &#8220;extras&#8221;, marcamos la opción de &#8220;Google USB Driver package&#8221;.</span>
</div>

<div>
  <div>
  </div>
  
  <div>
  </div>
  
  <div>
    <a href="http://www.ovalenzuela.com/wp-content/uploads/2016/02/adt2.png"><img border="0" height="113" src="http://www.ovalenzuela.com/wp-content/uploads/2016/02/adt2.png?w=300" width="320" /></a>
  </div>
  
  <div>
  </div>
  
  <div>
  </div>
  
  <div>
    <a href="http://www.ovalenzuela.com/wp-content/uploads/2016/02/8ae00a14afb2a0ca1912d2c17ba94cfc.png"><img border="0" height="227" src="http://www.ovalenzuela.com/wp-content/uploads/2016/02/8ae00a14afb2a0ca1912d2c17ba94cfc.png?w=300" width="320" /></a>
  </div>
  
  <div>
  </div>
  
  <div>
    <a href="http://www.ovalenzuela.com/wp-content/uploads/2016/02/9985373c7d9271be6c7de41fd886be5d.png"><img border="0" height="227" src="http://www.ovalenzuela.com/wp-content/uploads/2016/02/9985373c7d9271be6c7de41fd886be5d.png?w=300" width="320" /></a>
  </div>
  
  <div>
  </div>
  
  <div>
    <a href="http://www.ovalenzuela.com/wp-content/uploads/2016/02/adt3.png"><img border="0" height="297" src="http://www.ovalenzuela.com/wp-content/uploads/2016/02/adt3.png?w=300" width="320" /></a>
  </div>
  
  <div>
  </div>
  
  <div>
  </div>
</div>

<div>
  <span>A continuación seleccionamos la opción de &#8220;Install packages&#8221;, aceptamos todas las licencias con &#8220;Accept All&#8221; y luego &#8220;Install&#8221;, luego comenzará la descarga e instalación, como se muestra en la siguiente pantalla:</span>
</div>

<div>
  <span><br /></span> 
  
  <div>
    <a href="http://www.ovalenzuela.com/wp-content/uploads/2016/02/41e7b6e0a2f54a37ce86eef8b1f6ebc8.png"><img border="0" height="228" src="http://www.ovalenzuela.com/wp-content/uploads/2016/02/41e7b6e0a2f54a37ce86eef8b1f6ebc8.png?w=300" width="320" /></a>
  </div>
  
  <p>
    <span><br /></span></div> 
    
    <div>
      <span>Este proceso puede demorar bastante, dependiendo de la velocidad del enlace y los paquetes marcados.</span>
    </div>
    
    <div>
      <span><br /></span>
    </div>
    
    <div>
      <span>Una vez finalizadas las descargas e instalación, pasamos a crear un dispositivo, donde emularemos el comportamiento de nuestras aplicaciones. Para esto, vamos al menú superior, e ingresamos a &#8220;tools->Manage AVDs&#8221; y en la nueva ventana, presionamos sobre New. En las opciones que se nos despliegan, podremos crear el dispositivo sobre el cual realizaremos nuestra emulación. Como es un celular con Android, deberemos especificar ciertos parámetros del Hardware, partiendo por el Nombre, en Target seleccionamos la API que instalamos (recomiendo seleccionar la versión 2.3.x y si descargamos otra, entonces seleccionaremos esa), en SD la capacidad de la SD que el dispositivo tendría instalada, generalmente es mejor usar una de 4GB. Esto es lo básico, sin embargo nos permitirá emular nuestro primer dispositivo de pruebas. Finalmente, presionamos sobre la opción &#8220;Create AVD&#8221; y esperamos a que nuestra maquina virtual sea generada.</span>
    </div>
    
    <div>
      <span><br /></span>
    </div>
    
    <div>
      <a href="http://www.ovalenzuela.com/wp-content/uploads/2016/02/862b15b31dff086f71fb597a81f0d073.png"><img border="0" height="320" src="http://www.ovalenzuela.com/wp-content/uploads/2016/02/862b15b31dff086f71fb597a81f0d073.png?w=191" width="203" /></a>
    </div>
    
    <div>
      <span><br /></span>
    </div>
    
    <div>
      <a href="http://www.ovalenzuela.com/wp-content/uploads/2016/02/6fb15eaacbe66f0bc141f3e17cfa17c2.png"><img border="0" height="227" src="http://www.ovalenzuela.com/wp-content/uploads/2016/02/6fb15eaacbe66f0bc141f3e17cfa17c2.png?w=300" width="320" /></a>
    </div>
    
    <div>
      <span><br /></span>
    </div>
    
    <div>
      <span>Como prueba, una vez que se ha generado la maquina virtual, podremos seleccionarla de la lista y presionar el boton &#8220;Start&#8221;, nos aparecerá la ventana del emulador con el típico mensaje de bienvenida, mientras Android se esta iniciando. </span>
    </div>
    
    <div>
      <span><br /></span>
    </div>
    
    <div>
      <span><br /></span>
    </div>
    
    <div>
      <a href="http://www.ovalenzuela.com/wp-content/uploads/2016/02/15.png"><img border="0" height="191" src="http://www.ovalenzuela.com/wp-content/uploads/2016/02/15.png?w=300" width="320" /></a>
    </div>
    
    <div>
      <span><br /></span>
    </div>
    
    <div>
      <span>Luego de unos instantes, aparecerá la ventana del celular dando la bienvenida y esperando ser desbloqueado. En este punto, nuestro emulador y SDK están instalados y configurados correctamente, ahora deberemos integrarlo a nuestro IDE para poder vincularlo en la programación.</span>
    </div>
    
    <div>
      <span><br /></span>
    </div>
    
    <div>
      <span>Para instalar Eclipse, deberemos antes descargarlo desde su sitio web:</span>
    </div>
    
    <div>
      <span><a href="http://www.eclipse.org/downloads/">http://www.eclipse.org/downloads/</a></span>
    </div>
    
    <div>
      <span><br /></span>
    </div>
    
    <div>
      <span>Desde donde obtendremos la última versión para nuestro sistema operativo, a la fecha de esta publicación debería ser la versión &#8220;Eclipse Classic 4.2.1&#8221;. El archivo descargado no es más que una carpeta comprimida, que podremos extraer en el lugar de nuestra conveniencia dentro de nuestro sistema operativo (recomiendo usar la raíz de nuestra carpeta personal). Luego de descomprimir nuestra carpeta, ejecutamos el archivo &#8220;eclipse&#8221; y esperamos a que nuestro IDE se inicie.</span>
    </div>
    
    <div>
      <span>Cuando el IDE este listo, podremos proceder a configurar el plugin de Android, para lo cual vamos al menú &#8220;Help->Install New Software&#8221;, y en la ventana que se despliegue, presionamos el botón &#8220;Add&#8221;, para luego ingresar en &#8220;Name&#8221; Android y en &#8220;Location&#8221; la url del repositorio, https://dl-ssl.google.com/android/eclipse/ (si el sistema luego tiene problemas para acceder, podemos ingresar la url reemplazando https por http). Y se cargarán los paquetes disponibles, donde marcaremos para instalar &#8220;Developer Tools&#8221;, presionamos &#8220;Next&#8221; para luego aceptar las licencias y volver a presionar &#8220;Next&#8221; y comenzará la descarga. Si el instalador nos muestra una aviso de seguridad, confirmamos para instalar el software. Al finalizar, se nos pedirá reiniciar y luego de que Eclipse vuelva a activarse, el plugin estará disponible. Finalmente para vincular nuestro SDK, deberemos visitar la opción en el menú &#8220;Window->Preferences&#8221; y en el contenedor &#8220;Android&#8221;, nos permitirá ingresar la ruta de la carpeta que contiene nuestro Android SDK. Presionamos &#8220;Apply&#8221; y para comprobar que todo este bien, vamos a &#8220;Window->Android SDK and AVD Manager&#8221;, donde deberíamos poder ver el dispositivo que anteriormente habíamos creado. </span>
    </div>
    
    <div>
      <span><br /></span>
    </div>
    
    <div>
      <span>Llegando a este paso, nuestro entorno esta listo para ser utilizado. </span> 
      
      <div>
        <div>
          <div>
            <span>Publicado originalmente por Oscar Valenzuela en http://ovalenzuela.xpertians.com</span>
          </div>
        </div>
        
        <div>
          <div>
            <span>Puede ser compartido y copiado libremente, mientras mantenga esta nota.</span>
          </div>
          
          <div>
            <span><br /></span>
          </div>
          
          <div>
            <span><br /></span>
          </div>
        </div>
      </div>
    </div>
    
    <div>
      Publicado originalmente por Oscar Valenzuela en http://ovalenzuela.xpertians.com &#8211; Puede ser compartido y copiado libremente, mientras mantenga esta nota.
    </div>