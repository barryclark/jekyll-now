---
id: 141
title: Crea tu primer videojuego para Android con HTML5
date: 2014-03-04T18:00:00+00:00
author: ovalenzuela
layout: post
guid: https://ovalenzueladotcom.wordpress.com/2014/03/04/crea-tu-primer-videojuego-para-android-con-html5
permalink: /2014/03/crea-tu-primer-videojuego-para-android-con-html5.html
blogger_blog:
  - www.ovalenzuela.com
blogger_author:
  - Andrés Barrera
blogger_02f5be51301771664ae7c1c72bf29246_permalink:
  - 4080760409671051010
dsq_thread_id:
  - 4647016974
categories:
  - Google
---
[<img class="aligncenter size-full wp-image-129781" alt="android juego code" src="http://www.elandroidelibre.com/wp-content/uploads/2014/03/android-juego-code.jpg" width="720" height="380" />](http://www.elandroidelibre.com/wp-content/uploads/2014/03/android-juego-code.jpg)

La mayoría de nosotros tiene grandes ideas para **hacer nuevos videojuegos**. Desgraciadamente son pocas las personas que hacen realidad dichas ideas porque la mayoría piensa que programar juegos es algo muy difícil. En realidad, programar juegos no es algo tan complicado; si tienes conocimientos básicos de **HTML, CSS y Javascript**, es suficiente para que puedas comenzar a hacer tus primeros juegos.

## Agrega un elemento Canvas a una página web

Una de las características más atractivas de HTML5 es el elemento , que puede  utilizarse para dibujar gráficas vectoriales y generar efectos visuales, juegos interactivos y animaciones. Un Canvas es un área rectangular que permite el despliegue (rendering) dinámico de gráficas 2D. El Canvas interactúa con CSS3 y Javascript para generar gráficos y animaciones interactivas en el navegador web, sin necesidad de plugins.

El listado 1 contiene el código básico para **definir un Canvas**.

> <p dir="ltr">
>
> </p>
> 
> <p dir="ltr">
>      <br /> 
>   
>   <h1>
>     SpaceShipGame
>   </h1>
> </p>
> 
> <p dir="ltr">
>      
> </p>
> 
> <p dir="ltr">
>      
> </p></p> 

Esto es muy similar a como se define una imagen con el emeneto <img />, con la diferencia de que no tiene los atributos src y alt. El elemento solamente tiene dos atributos: width (ancho) y height (alto), ambos tienen un valor default de 300 pixeles. El valor del id se utiliza para interactuar con el Canvas por medio de Javascript.

## Dibuja los gráficos

<p dir="ltr">
  El listado 2 muestra el código para <strong>crear un fondo negro con estrellas blancas</strong>.
</p>

> <p dir="ltr">
>   // Obtenemos una referencia al canvas.
> </p>
> 
> <p dir="ltr">
>   canvas = document.getElementById(“spaceCanvas”);
> </p>
> 
> <p dir="ltr">
>   ctx = canvas.getContext(“2d”);
> </p>
> 
> <p dir="ltr">
>   // Lo pintamos negro
> </p>
> 
> <p dir="ltr">
>   ctx.fillStyle = “black”;
> </p>
> 
> <p dir="ltr">
>   ctx.rect(0, 0, 300, 300);
> </p>
> 
> <p dir="ltr">
>   ctx.fill();
> </p>
> 
> <p dir="ltr">
>   // Dibujamos 100 estrellas blancas
> </p>
> 
> <p dir="ltr">
>   ctx.fillStyle = “white”;
> </p>
> 
> <p dir="ltr">
>   for (i = 0; i <= 100; i++) {
> </p>
> 
> <p dir="ltr">
>      // Generamos coordenadas al azar entre 20 y 299
> </p>
> 
> <p dir="ltr">
>       var x = 20 + Math.floor(Math.random() * 279);
> </p>
> 
> <p dir="ltr">
>       var y = 20 + Math.floor(Math.random() * 279);
> </p>
> 
> <p dir="ltr">
>      // Dibujamos la estrella
> </p>
> 
> <p dir="ltr">
>      ctx.beginPath();
> </p>
> 
> <p dir="ltr">
>      ctx.arc(x, y, 3, 0, Math.PI * 2);
> </p>
> 
> <p dir="ltr">
>      ctx.closePath();
> </p>
> 
> <p dir="ltr">
>      ctx.fill();
> </p>
> 
> <p dir="ltr">
>   }
> </p>

<p dir="ltr">
  Primero obtenemos una referencia a nuestro elemento Canvas y luego obtenemos su contexto. Este  objeto nos provee métodos para poder manipularlo.
</p>

<p dir="ltr">
  Para crear las estrellas utilizamos la función “arc”, que se utiliza para crear círculos (parciales o completos). En este caso estamos creando círculos en las coordenadas “x, y” con un radio de 3 pixeles, comenzando el trazo en el ángulo 0 y terminando en el ángulo 2Pi (es decir que es una circunferencia completa).
</p>

<p dir="ltr">
  Notarán que los valores de nuestras coordenadas deben ser mayores a 20,20. Esto es para dejar espacio para nuestra nave espacial, que iniciará en la esquina superior izquierda.
</p>

Para pintar nuestra nave utilizaremos curvas de bezier por medio de la función “bezierCurveTo”. Esta función recibe 6 valores como parámetro, que en realidad son 3 pares de coordenadas: los primeros 2 pares de coordenadas son puntos de control y el último par es el punto final. El listado 3 muestra el **código para dibujar nuestra nave**.

> <p dir="ltr">
>   function nave() {
> </p>
> 
> <p dir="ltr">
>      // Dibujemos la nave usando curbas de bezier.
> </p>
> 
> <p dir="ltr">
>      // Primero pintemos el fuselaje en azul
> </p>
> 
> <p dir="ltr">
>      ctx.fillStyle = “rgb(0, 0, 255)”;
> </p>
> 
> <p dir="ltr">
>      ctx.beginPath();
> </p>
> 
> <p dir="ltr">
>      ctx.moveTo(28.4, 16.9);
> </p>
> 
> <p dir="ltr">
>      ctx.bezierCurveTo(28.4, 19.7, 22.9, 22.0, 16.0, 22.0);
> </p>
> 
> <p dir="ltr">
>      ctx.bezierCurveTo(9.1, 22.0, 3.6, 19.7, 3.6, 16.9);
> </p>
> 
> <p dir="ltr">
>      ctx.bezierCurveTo(3.6, 14.1, 9.1, 11.8, 16.0, 11.8);
> </p>
> 
> <p dir="ltr">
>      ctx.bezierCurveTo(22.9, 11.8, 28.4, 14.1, 28.4, 16.9);
> </p>
> 
> <p dir="ltr">
>      ctx.closePath();
> </p>
> 
> <p dir="ltr">
>      ctx.fill();
> </p>
> 
>  
> 
> <p dir="ltr">
>   // ahora la cabina en rojo
> </p>
> 
> <p dir="ltr">
>      ctx.fillStyle = “rgb(255, 0, 0)”;
> </p>
> 
> <p dir="ltr">
>      ctx.beginPath();
> </p>
> 
> <p dir="ltr">
>      ctx.moveTo(22.3, 12.0);
> </p>
> 
> <p dir="ltr">
>      ctx.bezierCurveTo(22.3, 13.3, 19.4, 14.3, 15.9, 14.3);
> </p>
> 
> <p dir="ltr">
>      ctx.bezierCurveTo(12.4, 14.3, 9.6, 13.3, 9.6, 12.0);
> </p>
> 
> <p dir="ltr">
>      ctx.bezierCurveTo(9.6, 10.8, 12.4, 9.7, 15.9, 9.7);
> </p>
> 
> <p dir="ltr">
>      ctx.bezierCurveTo(19.4, 9.7, 22.3, 10.8, 22.3, 12.0);
> </p>
> 
> <p dir="ltr">
>      ctx.closePath();
> </p>
> 
> <p dir="ltr">
>      ctx.fill();
> </p>
> 
> }

<p dir="ltr">
  Al ver nuestro código en un navegador, veremos una imagen similar a la de la figura 1.
</p>

<div>
  <a href="http://www.elandroidelibre.com/wp-content/uploads/2014/03/figura-1-juego.png"><img class="size-full wp-image-129697" alt="Figura 1. Imagen inicial" src="http://www.elandroidelibre.com/wp-content/uploads/2014/03/figura-1-juego.png" width="432" height="435" /></a> 
  
  <p>
    Figura 1. Imagen inicial
  </p>
</div>

## Agrega comportamiento

Ahora vamos a mover la nave espacial usando **Javascript.** Cada movimiento se hace en dos   
pasos:

  1. Borramos la nave de su posición actual (reestableciendo el fondo que había en el lugar donde dibujamos la nave).
  2. Dibujamos la nave en su nueva posición.

Estas serán las dos actividades que realizaremos de manera continua para estar redibujando la nave. El listado 4 muestra como lo implementamos.

> <p dir="ltr">
>   function gameLoop()
> </p>
> 
> <p dir="ltr">
>   {
> </p>
> 
> <p dir="ltr">
>      ctx.putImageData(oldBackground, oldX, oldY);
> </p>
> 
> <p dir="ltr">
>      ctx.putImageData(ship, newX, newY);
> </p>
> 
> }

Como podrán ver, en el listado 4 aparecen variables que no habíamos definido. Estas son   
variables que utilizamos para almacenar: las coordenadas anteriores de la nave, las   
coordenadas nuevas, un objeto con la imagen de la nave, y un objeto con la imagen de fondo   
anterior (para reestablecerlo cuando movamos a la nave a otro lugar). Más adelante veremos   
como se inicializan y actualizan dichas variables.

Para definir que queremos que nuestra función “gameLoop” se esté ejecutando de manera   
continua utilizamos el método setInterval() de esta forma:

> setInterval(gameLoop, 20);

es decir que cada 20 milisegundos se ejecutará la función gameLoop.

A continuación vamos a capturar el evento cuando alguien toca la pantalla y moveremos la nave   
a dicho lugar. Para ello, registramos el evento “touchstart” y definimos una función que realice   
las acciones correspondientes. El listado 5 muestra el código:

> <p dir="ltr">
>   document.addEventListener(“mousedown”, moverNave, true);
> </p>
> 
>  
> 
> <p dir="ltr">
>   function moverNave (event)
> </p>
> 
> <p dir="ltr">
>   {
> </p>
> 
> <p dir="ltr">
>      event.preventDefault(); //Para evitar el comportamiento default
> </p>
> 
> <p dir="ltr">
>      oldX = newX;
> </p>
> 
> <p dir="ltr">
>      oldY = newY;
> </p>
> 
> <p dir="ltr">
>      oldBackground = newBackground;
> </p>
> 
> <p dir="ltr">
>      ctx.putImageData(oldBackground, oldX,oldY);
> </p>
> 
> <p dir="ltr">
>      var eventTouch;
> </p>
> 
> <p dir="ltr">
>      eventTouch = event.changedTouches[0];
> </p>
> 
> <p dir="ltr">
>      newX = eventTouch.pageX – 15;
> </p>
> 
> <p dir="ltr">
>      newY = eventTouch.pageY – 60;
> </p>
> 
> <p dir="ltr">
>      newBackground = ctx.getImageData(newX, newY, 30, 30);
> </p>
> 
> }

<p dir="ltr">
  Lo primero que hacemos en esta función es llamar el método preventDefault() del evento, para evitar que se dispare el comportamiento default para dicho evento.
</p>

<p dir="ltr">
  Posteriormente actualizamos nuestras variables de control para almacenar las coordenadas e imagen de fondo actual, y procedemos a borrar la nave (poniendo el fondo que tenemos almacenado para esa posición).
</p>

<p dir="ltr">
  Después registramos las coordenadas donde se dio el evento táctil y guardamos la imagen de fondo que se encuentra en el recuadro para las nuevas coordenadas (antes de que se redibuje la nave ahi). Al guardar las nuevas coordenadas, se darán cuenta que estamos restando 15 a la X y 60 a la Y. Esto es tan solo un ajuste para buscar que la nave quede más centrada a donde hicimos el tacto.
</p>

<p dir="ltr">
  Es importante notar que en realidad en esta función no estamos dibujando la nave, solo actualizamos las coordenadas. Como ya vimos, la función que se encarga de estar redibujando la nave es gameLoop, usando la información de las coordenadas almacenadas.
</p>

<p dir="ltr">
  El listado 6 contiene el código completo de este ejercicio. Puedes salvarlo como html, y accederlo desde el navegador web de tu dispositivo móvil para probarlo.
</p>

Si quieres continuar, te dejamos como ejercicio que modifiques el código para hacer que tu nave se mueva poco a poco con una trayectoria, y puedas alterar dicha trayectoria al tocar la pantalla.

> <p dir="ltr">
>
> </p>
> 
> <p dir="ltr">
>   <p dir="ltr">
>     <p dir="ltr">
>       Nave espacial
>     </p>
>     
>     <p dir="ltr">
>       <p dir="ltr">
>         <p dir="ltr">
>              <br /> 
>           
>           <h1>
>             Juego de nave espacial
>           </h1>
>         </p>
>         
>         <p dir="ltr">
>              
>         </p>
>         
>         <p dir="ltr">
>              
>         </p>
>         
>         <p dir="ltr">
>           <p dir="ltr">
>             <p dir="ltr">
>               <p dir="ltr">
>                 canvas = document.getElementById(“spaceCanvas”);
>               </p>
>               
>               <p dir="ltr">
>                 ctx = canvas.getContext(“2d”);
>               </p>
>               
>               <p>
>                  
>               </p>
>               
>               <p dir="ltr">
>                 // definimos variables para almacenar imagenes que usaremos.
>               </p>
>               
>               <p dir="ltr">
>                 var oldBackground;
>               </p>
>               
>               <p dir="ltr">
>                 var newBackground;
>               </p>
>               
>               <p dir="ltr">
>                 var ship;
>               </p>
>               
>               <p>
>                  
>               </p>
>               
>               <p dir="ltr">
>                 // definimos e inicializamos variables para coordenadas.
>               </p>
>               
>               <p dir="ltr">
>                 var oldX = 0;
>               </p>
>               
>               <p dir="ltr">
>                 var oldY = 0;
>               </p>
>               
>               <p dir="ltr">
>                 var newX = 0;
>               </p>
>               
>               <p dir="ltr">
>                 var newY = 0;
>               </p>
>               
>               <p>
>                  
>               </p>
>               
>               <p dir="ltr">
>                 fondo();
>               </p>
>               
>               <p dir="ltr">
>                 nave();
>               </p>
>               
>               <p dir="ltr">
>                 setInterval(gameLoop, 20);
>               </p>
>               
>               <p dir="ltr">
>                 document.addEventListener(“touchstart”, moverNave, true);
>               </p>
>               
>               <p>
>                  
>               </p>
>               
>               <p dir="ltr">
>                 function fondo() {
>               </p>
>               
>               <p dir="ltr">
>                    // Primero lo pintamos negro
>               </p>
>               
>               <p dir="ltr">
>                    ctx.fillStyle = “black”;
>               </p>
>               
>               <p dir="ltr">
>                    ctx.rect(0, 0, 300, 300);
>               </p>
>               
>               <p dir="ltr">
>                    ctx.fill();
>               </p>
>               
>               <p>
>                  
>               </p>
>               
>               <p dir="ltr">
>                    // Dibujemos 100 estrellas
>               </p>
>               
>               <p dir="ltr">
>                    ctx.fillStyle = “white”;
>               </p>
>               
>               <p dir="ltr">
>                    for (i = 0; i <= 100; i++) {
>               </p>
>               
>               <p dir="ltr">
>                        // Generamos coordenadas al azar entre 30 y 299
>               </p>
>               
>               <p dir="ltr">
>                        var x = 30 + Math.floor(Math.random() * 269);
>               </p>
>               
>               <p dir="ltr">
>                        var y = 30 + Math.floor(Math.random() * 269);
>               </p>
>               
>               <p>
>                  
>               </p>
>               
>               <p dir="ltr">
>                        // Dibujamos la estrella
>               </p>
>               
>               <p dir="ltr">
>                        ctx.beginPath();
>               </p>
>               
>               <p dir="ltr">
>                        ctx.arc(x, y, 3, 0, Math.PI * 2);
>               </p>
>               
>               <p dir="ltr">
>                        ctx.closePath();
>               </p>
>               
>               <p dir="ltr">
>                        ctx.fill();
>               </p>
>               
>               <p dir="ltr">
>                    }
>               </p>
>               
>               <p dir="ltr">
>                    // inicializamos la imagen de fondo con el estado inicial
>               </p>
>               
>               <p dir="ltr">
>                    newBackground = ctx.getImageData(0, 0, 30, 30);
>               </p>
>               
>               <p dir="ltr">
>                    oldBackground = newBackground;
>               </p>
>               
>               <p dir="ltr">
>                 }
>               </p>
>               
>               <p>
>                  
>               </p>
>               
>               <p dir="ltr">
>                 function nave() {
>               </p>
>               
>               <p dir="ltr">
>                    // Dibujemos la nave usando curbas de bezier.
>               </p>
>               
>               <p dir="ltr">
>                    // Primero pintemos el fuselaje en azul
>               </p>
>               
>               <p dir="ltr">
>                    ctx.fillStyle = “rgb(0, 0, 255)”;
>               </p>
>               
>               <p dir="ltr">
>                    ctx.beginPath();
>               </p>
>               
>               <p dir="ltr">
>                    ctx.moveTo(28.4, 16.9);
>               </p>
>               
>               <p dir="ltr">
>                    ctx.bezierCurveTo(28.4, 19.7, 22.9, 22.0, 16.0, 22.0);
>               </p>
>               
>               <p dir="ltr">
>                    ctx.bezierCurveTo(9.1, 22.0, 3.6, 19.7, 3.6, 16.9);
>               </p>
>               
>               <p dir="ltr">
>                    ctx.bezierCurveTo(3.6, 14.1, 9.1, 11.8, 16.0, 11.8);
>               </p>
>               
>               <p dir="ltr">
>                    ctx.bezierCurveTo(22.9, 11.8, 28.4, 14.1, 28.4, 16.9);
>               </p>
>               
>               <p dir="ltr">
>                    ctx.closePath();
>               </p>
>               
>               <p dir="ltr">
>                    ctx.fill();
>               </p>
>               
>               <p>
>                  
>               </p>
>               
>               <p dir="ltr">
>                    // ahora la cabina en rojo
>               </p>
>               
>               <p dir="ltr">
>                    ctx.fillStyle = “rgb(255, 0, 0)”;
>               </p>
>               
>               <p dir="ltr">
>                    ctx.beginPath();
>               </p>
>               
>               <p dir="ltr">
>                    ctx.moveTo(22.3, 12.0);
>               </p>
>               
>               <p dir="ltr">
>                    ctx.bezierCurveTo(22.3, 13.3, 19.4, 14.3, 15.9, 14.3);
>               </p>
>               
>               <p dir="ltr">
>                    ctx.bezierCurveTo(12.4, 14.3, 9.6, 13.3, 9.6, 12.0);
>               </p>
>               
>               <p dir="ltr">
>                    ctx.bezierCurveTo(9.6, 10.8, 12.4, 9.7, 15.9, 9.7);
>               </p>
>               
>               <p dir="ltr">
>                    ctx.bezierCurveTo(19.4, 9.7, 22.3, 10.8, 22.3, 12.0);
>               </p>
>               
>               <p dir="ltr">
>                    ctx.closePath();
>               </p>
>               
>               <p dir="ltr">
>                    ctx.fill();
>               </p>
>               
>               <p>
>                  
>               </p>
>               
>               <p dir="ltr">
>                    // guardamos la imagen de la nave
>               </p>
>               
>               <p dir="ltr">
>                    ship = ctx.getImageData(0, 0, 30, 30);
>               </p>
>               
>               <p dir="ltr">
>                 }
>               </p>
>               
>               <p>
>                  
>               </p>
>               
>               <p dir="ltr">
>                 function gameLoop()
>               </p>
>               
>               <p dir="ltr">
>                 {
>               </p>
>               
>               <p dir="ltr">
>                    ctx.putImageData(oldBackground, oldX, oldY);
>               </p>
>               
>               <p dir="ltr">
>                    ctx.putImageData(ship, newX, newY);
>               </p>
>               
>               <p dir="ltr">
>                 }
>               </p>
>               
>               <p>
>                  
>               </p>
>               
>               <p dir="ltr">
>                 function moverNave (event)
>               </p>
>               
>               <p dir="ltr">
>                 {
>               </p>
>               
>               <p dir="ltr">
>                    event.preventDefault(); //To prevent default behavior
>               </p>
>               
>               <p dir="ltr">
>                    oldX = newX;
>               </p>
>               
>               <p dir="ltr">
>                    oldY = newY;
>               </p>
>               
>               <p dir="ltr">
>                    oldBackground = newBackground;
>               </p>
>               
>               <p dir="ltr">
>                    ctx.putImageData(oldBackground, oldX,oldY);
>               </p>
>               
>               <p dir="ltr">
>                    var eventTouch;
>               </p>
>               
>               <p dir="ltr">
>                    eventTouch = event.changedTouches[0];
>               </p>
>               
>               <p dir="ltr">
>                    newX = eventTouch.pageX – 15;
>               </p>
>               
>               <p dir="ltr">
>                    newY = eventTouch.pageY – 60;
>               </p>
>               
>               <p dir="ltr">
>                    newBackground = ctx.getImageData(newX, newY, 30, 30);
>               </p>
>               
>               <p dir="ltr">
>                 }
>               </p>
>               
>               <p dir="ltr">
>                 </blockquote> 
>                 
>                 <h2>
>                   Conclusión
>                 </h2>
>                 
>                 <p>
>                   En este artículo hemos visto a grandes rasgos <strong>como crear y manipular elementos de un</strong><br /> <strong> Canvas en HTML5.</strong> También hemos conocido elementos esenciales de cualquier videojuego,<br /> tales como registrar eventos y manipular objetos gráficos.
>                 </p>
>                 
>                 <p>
>                   Para aprender más acerca de herramientas y tecnologías para crear aplicaciones para Android,<br /> te recomendamos visitar la <a title="http://software.intel.com/es-es/android-es" href="http://software.intel.com/es-es/android-es" target="_blank">Zona para desarrolladores de Intel.</a>
>                 </p>
>                 
>                 <p>
>                   El artículo <a href="http://www.elandroidelibre.com/2014/03/crea-tu-primer-videojuego-para-android-con-html5.html">Crea tu primer videojuego para Android con HTML5</a> se publicó en <a href="http://www.elandroidelibre.com">El Androide Libre</a> (El Blog Android de referencia. Aplicaciones, noticias, Juegos y smartphones Android Libres)
>                 </p>
>                 
>                 <p>
>                   <img width="1" height="1" src="http://rss.feedsportal.com/c/34005/f/617036/s/37c99f3f/sc/15/mf.gif" border="0" /> 
>                   
>                   <div>
>                     <table border='0'>
>                       <tr>
>                         <td valign='middle'>
>                           <a href="http://share.feedsportal.com/share/twitter/?u=http%3A%2F%2Fwww.elandroidelibre.com%2F2014%2F03%2Fcrea-tu-primer-videojuego-para-android-con-html5.html&t=Crea%C2%A0tu+primer%C2%A0videojuego%C2%A0para+Android%C2%A0con+HTML5" target="_blank"><img src="http://res3.feedsportal.com/social/twitter.png" border="0" /></a> <a href="http://share.feedsportal.com/share/facebook/?u=http%3A%2F%2Fwww.elandroidelibre.com%2F2014%2F03%2Fcrea-tu-primer-videojuego-para-android-con-html5.html&t=Crea%C2%A0tu+primer%C2%A0videojuego%C2%A0para+Android%C2%A0con+HTML5" target="_blank"><img src="http://res3.feedsportal.com/social/facebook.png" border="0" /></a> <a href="http://share.feedsportal.com/share/linkedin/?u=http%3A%2F%2Fwww.elandroidelibre.com%2F2014%2F03%2Fcrea-tu-primer-videojuego-para-android-con-html5.html&t=Crea%C2%A0tu+primer%C2%A0videojuego%C2%A0para+Android%C2%A0con+HTML5" target="_blank"><img src="http://res3.feedsportal.com/social/linkedin.png" border="0" /></a> <a href="http://share.feedsportal.com/share/gplus/?u=http%3A%2F%2Fwww.elandroidelibre.com%2F2014%2F03%2Fcrea-tu-primer-videojuego-para-android-con-html5.html&t=Crea%C2%A0tu+primer%C2%A0videojuego%C2%A0para+Android%C2%A0con+HTML5" target="_blank"><img src="http://res3.feedsportal.com/social/googleplus.png" border="0" /></a> <a href="http://share.feedsportal.com/share/email/?u=http%3A%2F%2Fwww.elandroidelibre.com%2F2014%2F03%2Fcrea-tu-primer-videojuego-para-android-con-html5.html&t=Crea%C2%A0tu+primer%C2%A0videojuego%C2%A0para+Android%C2%A0con+HTML5" target="_blank"><img src="http://res3.feedsportal.com/social/email.png" border="0" /></a>
>                         </td>
>                         
>                         <td valign='middle'>
>
>                         </td>
>                       </tr>
>                     </table>
>                   </div>
>                   
>                   <p>
>                     <a href="http://da.feedsportal.com/r/186531373107/u/49/f/617036/c/34005/s/37c99f3f/sc/15/rc/1/rc.htm"><img src="http://da.feedsportal.com/r/186531373107/u/49/f/617036/c/34005/s/37c99f3f/sc/15/rc/1/rc.img" border="0" /></a><br /><a href="http://da.feedsportal.com/r/186531373107/u/49/f/617036/c/34005/s/37c99f3f/sc/15/rc/2/rc.htm"><img src="http://da.feedsportal.com/r/186531373107/u/49/f/617036/c/34005/s/37c99f3f/sc/15/rc/2/rc.img" border="0" /></a><br /><a href="http://da.feedsportal.com/r/186531373107/u/49/f/617036/c/34005/s/37c99f3f/sc/15/rc/3/rc.htm"><img src="http://da.feedsportal.com/r/186531373107/u/49/f/617036/c/34005/s/37c99f3f/sc/15/rc/3/rc.img" border="0" /></a>
>                   </p>
>                   
>                   <p>
>                     <a href="http://da.feedsportal.com/r/186531373107/u/49/f/617036/c/34005/s/37c99f3f/a2.htm"><img src="http://da.feedsportal.com/r/186531373107/u/49/f/617036/c/34005/s/37c99f3f/a2.img" border="0" /></a><img width="1" height="1" src="http://pi.feedsportal.com/r/186531373107/u/49/f/617036/c/34005/s/37c99f3f/a2t.img" border="0" /> 
>                     
>                     <div>
>                       <a href="http://feeds.feedburner.com/~ff/elandroidelibre?a=d9OuOcD9G3s:ys20QtHRJ-k:ecdYMiMMAMM"><img src="http://feeds.feedburner.com/~ff/elandroidelibre?d=ecdYMiMMAMM" border="0" /></a> <a href="http://feeds.feedburner.com/~ff/elandroidelibre?a=d9OuOcD9G3s:ys20QtHRJ-k:V_sGLiPBpWU"><img src="http://feeds.feedburner.com/~ff/elandroidelibre?i=d9OuOcD9G3s:ys20QtHRJ-k:V_sGLiPBpWU" border="0" /></a> <a href="http://feeds.feedburner.com/~ff/elandroidelibre?a=d9OuOcD9G3s:ys20QtHRJ-k:7Q72WNTAKBA"><img src="http://feeds.feedburner.com/~ff/elandroidelibre?d=7Q72WNTAKBA" border="0" /></a> <a href="http://feeds.feedburner.com/~ff/elandroidelibre?a=d9OuOcD9G3s:ys20QtHRJ-k:dnMXMwOfBR0"><img src="http://feeds.feedburner.com/~ff/elandroidelibre?d=dnMXMwOfBR0" border="0" /></a> <a href="http://feeds.feedburner.com/~ff/elandroidelibre?a=d9OuOcD9G3s:ys20QtHRJ-k:yIl2AUoC8zA"><img src="http://feeds.feedburner.com/~ff/elandroidelibre?d=yIl2AUoC8zA" border="0" /></a> <a href="http://feeds.feedburner.com/~ff/elandroidelibre?a=d9OuOcD9G3s:ys20QtHRJ-k:qj6IDK7rITs"><img src="http://feeds.feedburner.com/~ff/elandroidelibre?d=qj6IDK7rITs" border="0" /></a> <a href="http://feeds.feedburner.com/~ff/elandroidelibre?a=d9OuOcD9G3s:ys20QtHRJ-k:I9og5sOYxJI"><img src="http://feeds.feedburner.com/~ff/elandroidelibre?d=I9og5sOYxJI" border="0" /></a>
>                     </div>
>                     
>                     <p>
>                       <img src="http://feeds.feedburner.com/~r/elandroidelibre/~4/d9OuOcD9G3s" height="1" width="1" />
>                     </p>