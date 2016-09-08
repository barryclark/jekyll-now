---
id: 492
title: Recibe llamados en Chile por VOIP con numero fijo gratis
date: 2012-10-15T00:09:00+00:00
author: ovalenzuela
layout: post
guid: https://ovalenzueladotcom.wordpress.com/2012/10/15/recibe-llamados-en-chile-por-voip-con-numero-fijo-gratis
permalink: /2012/10/recibe-llamados-en-chile-por-voip-con-numero-fijo-gratis.html
blogger_blog:
  - www.ovalenzuela.com
blogger_author:
  - Andrés Barrera
blogger_02f5be51301771664ae7c1c72bf29246_permalink:
  - 7889984332279731661
dsq_thread_id:
  - 3086968397
categories:
  - Google
  - Hacks y Mods
  - Opinión
---
<div align="justify">
  Uno de los factores importantes cuando vives o estas lejos de los tuyos es la comunicación por voz, de hecho, los costos por llamados telefónicos cuando estas en el extranjero son un gasto fijo importante y que limita en diferente medida la posibilidad de usar esos mismos fondos en otras cosas más divertidas. Hoy queremos presentarte una buena solución, una adicional y cómoda que va más allá de los típicos programas de computadora privativos muy difundidos y que permitirá que gente que no es tan cercana a la tecnología pueda llamarte, usando lo ultimo de Internet sin saber, mediante la tradicional red de telefonía fija tradicional.
</div>

<div>
</div>

<div align="justify">
  Lo primero que tenemos que tener claro es que para quienes son mas tecnológicos, este tema sera bastante sencillo, por tanto, seremos los responsables de configurar el ambiente que necesitamos para implementar esta solución. Luego, como todo, esta solución podremos utilizarla sin costo alguno, pero tendrá costo después de 10 días, por lo que si queremos mantener en el tiempo esta implementación, deberemos desembolsar un costo fijo mensual de $2.500, algo así como 7 dolares, lo que siendo franco es casi nada para el costo del minuto que debería pagar, alguien que este en el extranjero, porque si una persona en el extranjero se conecta por internet a ese numero, podrá recibir llamados en Chile como si fuera una llamada local, ahora bien, recibir llamadas es completamente gratis, salvo pasado los 10 días en que nos cobran el costo de asignación del número de red fija, sin embargo, llamar tendrá un costo por minuto, que es similar a lo que otros operadores nos cobrarían. Finalmente tener claro que la calidad de la llamada, es proporcional a la calidad y velocidad de Internet de la persona que este en el extranjero.
</div>

<div align="justify">
  Nuestra solución se basa en la telefonía IP o mas conocida como VOIP (Voz sobre IP), donde habilitaremos un numero telefónico de red fija local (Santiago, Valparaiso, Concepción, etc) y que asignaremos mediante un programita a nuestro computador que estará fuera del país con nosotros. Así, nuestra gente podrá llamar a un numero de red fija de la misma ciudad donde se encuentran, y la llamada se traspasará a nuestro computador que deberá estar conectado a Internet donde podremos contestar y hablar por horas. Si por algún motivo andamos de parranda y no estamos conectados (considerando que estamos de vacaciones), podrán dejarnos el mensaje, el cual sera enviado en un archivo de audio (tipo mp3) a nuestro correo electrónico.
</div>

<div align="justify">
</div>

<div align="justify">
  Vamos entonces con lo que necesitaremos:
</div>

<div align="justify">
</div>

<div align="justify">
  <b>Primer paso: Crear la cuenta</b><br />Para crear la cuenta, deberemos acceder a <a href="http://www.txi.cl/" target="_blank">http://www.txi.cl</a>, quien desde ahora será nuestro operador. En su página, ingresaremos a la opción &#8220;Inscríbase&#8221;, donde se nos pedirá nuestro rut, esto es importante porque nos asigna como representante del número que seleccionemos. Luego de ingresar nuestro rut, el sistema nos presenta una descripción breve del servicio y nosotros le damos al botón &#8220;Continuar&#8221;, que nos llevará a las condiciones de uso del software, donde marcaremos la opción &#8220;Acepto&#8221; y se desplegará el formulario que llenaremos para crear nuestra cuenta.
</div>

<img alt="" border="1" src="http://www.thenerdletter.com/images/txi_seleccionnumero.jpg" />  
Una vez ingresados nuestros datos, le damos al botón y se desplegará la información de nuestra nueva cuenta, compuesto por nuestro número de teléfono y nuestra clave del servicio, con esto el servicio ya esta activo y disponible. 

<div>
</div>


<img alt="" border="1" src="http://www.thenerdletter.com/images/txi_asignacionnumero.jpg" /> 

<div align="justify">
</div>

<div align="justify">
  <b>Segundo paso:  Descargar un software VOIP</b><br />En esta misma opción, el sitio nos ofrece la posibilidad de descargar una aplicación para Windows, aunque podemos usar diferentes para otros sistemas, es cosa de elegir la que más nos guste, yo por ejemplo utilizo SipDroid para mi celular Android y Ekiga en mi pc con GNU/Linux.<br />Si nos gusta nuestro sistema con virus y problemas, y por eso usamos Windows, podremos descargar la misma aplicación que nos ofrece la página directamente en un archivo ZIP, al descargar ese archivo, podremos abrirlo y veremos varios archivos, ejecutaremos CounterPathMate que configura nuestro equipo para funcionar con VOIP y luego X-Lite.
</div>

<div align="justify">
</div>

<div align="justify">
  <b>Tercer paso: Configurar la cuenta</b><br />Para la mayoría de los Software VOIP los parametros que necesitaremos son:<br />* Display name: Puede escribir un nombre, el que usted guste.<br />* User name: corresponde al número de teléfono asignado.<br />* Password: corresponde a la clave proporcionada.<br />* Authorization user name: corresponde al número de teléfono asignado.<br />* Domain: corresponde al nombre del servidor: voipserver.txi.cl<br />* Proxy: corresponde a la dirección del servidor proxy voipserver.txi.cl:5060
</div>

Con estos datos ya tendremos configurada nuestra cuenta VOIP y ejecutandose en nuestro equipo. 

<div align="justify">
</div>

<div align="justify">
  <b>Cuarto paso: Probar una llamada</b><br />A continuación, la opción será llamar al numero de referencia de nuestra cuenta, para esto solo discamos en algún otro teléfono el numero asignado y nuestro software deberá estar sonando esperando que contestemos.<br />Para llamar, deberemos antes cargar saldo a nuestra cuenta, lo que podemos hacer directamente en linea usando el portal y mediante nuestra tarjeta de crédito, es importante destacar que el saldo demora en confirmarse alrededor de 2 a 4 horas hábiles, así que tendremos que esperar un poco, ya que es un proceso semi automático.
</div>


<img alt="" border="1" src="http://www.thenerdletter.com/images/txi_portalclientes.jpg" /> 

<div align="justify">
</div>

<div align="justify">
  Y bueno, cualquier consulta será muy bienvenida, así podremos ir mejorando esta publicación.
</div>

<div>
  Publicado originalmente por Oscar Valenzuela en http://ovalenzuela.xpertians.com &#8211; Puede ser compartido y copiado libremente, mientras mantenga esta nota.
</div>