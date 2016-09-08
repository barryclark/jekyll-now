---
id: 716
title: Costos de desarrollo con UCP
date: 2016-05-19T23:09:03+00:00
author: ovalenzuela
layout: post
guid: http://ovalenzuela.com/?p=716
permalink: /2016/05/costos-de-desarrollo-con-ucp.html
dsq_thread_id:
  - 4842478946
categories:
  - Desarrollo
  - General
  - Noticias Destacadas
  - Opinión
tags:
  - apps
  - desarrollador
  - ingeniera
  - profesional
---
<p align="justify">
  En la actualidad, existen diversas técnicas y métodos que se pueden utilizar para calcular el esfuerzo, costo y tiempo necesario para el desarrollo de un software. Algunas técnicas pertenecen a la rama tradicional, otras a la ágil y otras son más, por así decirlo, abstractas. Usar la técnica correcta es en realidad una tarea difícil, puesto que existen demasiadas variables a considerar. Sin embargo con práctica y experiencia, es posible ajustar las técnicas a los diferentes proyectos y las necesidades específicas del mismo.
</p>

<p align="justify">
  Una de las técnicas que más me gustan es la conocida como Use Case Points (UCP) debido a que me permite especificar el esfuerzo necesario para desarrollar un sistema desde la perspectiva del desarrollador, pero con orientación a cómo el usuario interactúa con el sistema. Adicionalmente UCP toma en consideración variables adicionales tales como la experiencia del desarrollador, la complejidad del desarrollo, etc.
</p>

<p align="justify">
  Muchos desarrolladores podrán decir que usar casos de uso no es ágil, pero duela a quien le duela, hay que ser francos, “Historias de usuario” es algo muy  distinto de “casos de uso” e incluso la orientación es completamente diferente. Mientras que las historias de usuario están orientadas a definir el producto, es decir el “que”, los casos de uso están orientados a definir el “cómo” o mejor dicho, la funcionalidad del sistema. Ciertamente las historias de uso son muy útiles pues definen el producto y el valor que se entrega al usuario, sin embargo no definen en ninguna forma los aspectos técnicos del requerimiento, es decir, nunca una frase entregará la definición necesaria. Por otro lado los casos de uso pueden ser algo muy “pesado” y que consumen tiempo, pero con práctica puede ser una tarea que toma solo unas horas y ayudan a definir mejor aspectos técnicos de desarrollo, ahorrando a larga, mucho trabajo o iteraciones innecesarias.
</p>

<p align="justify">
  Como ingenieros, deberíamos conocer bien cómo estimar usando casos de uso, antes de sumirnos en la “agilidad”. Resulta hasta cómico cuando leo en las redes sociales, ingenieros con muchos años de experiencia, incitando a otros a usar métodos ágiles, pero luego postear “como se cuanto cobrar por mi software”, “cómo puedo estimar cuanto demorare en desarrollar este sistema”, es chistoso y a la vez lamentable. Nuevamente, esto al principio puede parecer tedioso, pero a la larga con práctica, llevará solo unos minutos y quizás hasta lo hagas mentalmente. Entonces ahí puedes usar la misma técnica solo usando un frase o una historia de usuario.
</p>

<p align="justify">
  Luego de burlarnos de la pobre base técnica de estos “profesionales de título” e ignorar las ganas de pegar una imagen con los posts de Facebook, vamos a comenzar con un ejemplo: Un usuario necesita enviar un mensaje al dueño de un sitio web, usando el conocido formulario de contacto. Entonces, como historia de usuario diríamos: “Como USUARIO, quisiera contar con un formulario de contacto, para enviar información y obtener soporte”. El rol es USUARIO, el punto de interacción es el “formulario de contacto” y el objetivo es “enviar información”. Excelente definición del valor para el usuario y del producto. Pero nula información técnica o como el desarrollo debe ocurrir.
</p>

<p align="justify">
  Entonces, veamos el caso de uso: En general, los casos de uso tienen 2 componentes, el diagrama de caso de uso usando UML y el caso de uso narrado que cuenta la historia de lo que sucede en el diagrama. Aunque el diagrama no es algo obligatorio y comúnmente se obvia para ahorrar tiempo, en mi opinión cuando el desarrollador y el analista son personas diferentes, son muy útiles para comunicar gráficamente los requerimientos a través de la técnica de la “monística” o el arte de dibujar monos. Por otro lado, el caso de uso narrado se separa en lo que hace el sistema frente a lo que hace el usuario, en este ejemplo:
</p>

<table>
  <tr>
    <td colspan="2">
      <strong>Curso Normal</strong>
    </td>
  </tr>
  
  <tr>
    <td>
      1. El USUARIO visita la página web que contiene el formulario
    </td>
    
    <td>
    </td>
  </tr>
  
  <tr>
    <td>
    </td>
    
    <td>
      2. El SISTEMA despliega el formulario
    </td>
  </tr>
  
  <tr>
    <td>
      3. El USUARIO llena los datos<br /> 4. El USUARIO presiona el botón “Enviar&#8221;
    </td>
    
    <td>
    </td>
  </tr>
  
  <tr>
    <td>
    </td>
    
    <td>
      5. El SISTEMA valida los datos ingresados.<br /> 6. El SISTEMA almacena los datos en la Base de Datos.<br /> 7. El SISTEMA despliega el mensaje de confirmación que los datos fueron almacenados.<br /> 8. Fin
    </td>
  </tr>
</table>

<p align="justify">
  Cuando algo sale mal con el formulario, ocurre un flujo alternativo. Por ejemplo el usuario ingreso mal un dato:
</p>

<table>
  <tr>
    <td colspan="2">
      <strong>Curso Alternativo (Paso 5)</strong>
    </td>
  </tr>
  
  <tr>
    <td>
    </td>
    
    <td>
      5. El SISTEMA valida los datos y estos están incorrectos<br /> 6. El SISTEMA despliega el formulario<br /> 7. El SISTEMA despliega mensaje: “Datos ingresados no son válidos&#8221;
    </td>
  </tr>
  
  <tr>
    <td>
      8. El USUARIO llena los datos<br /> 9. El USUARIO presiona el botón “Enviar&#8221;.
    </td>
    
    <td>
    </td>
  </tr>
  
  <tr>
    <td>
    </td>
    
    <td>
      10. El SISTEMA valida los datos ingresados.<br /> 11. El SISTEMA almacena los datos en la Base de Datos.<br /> 12. El SISTEMA despliega el mensaje: “Datos enviados exitosamente&#8221;.<br /> 13. Fin
    </td>
  </tr>
</table>

<p align="justify">
  Bien, ya tenemos nuestro primer caso de uso. De este podemos descomponer algunas cosas:
</p>

  * Los actores son USUARIO y SISTEMA.
  * El sistema usa una base de datos.
  * El nombre del botón es “Enviar”.
  * El sistema requiere base de datos.
  * Los mensajes a desplegar para el caso de éxito y cuando hay un error.

<p align="justify">
  Ahora comenzaremos con UCP. En este ejemplo tenemos solo un caso de uso, pero habitualmente un sistema estará formado por múltiples casos de uso. UCP se compone de 4 datos:
</p>

  1. Factor de Complejidad Técnica (TCF &#8211; Technical Complexity Factor).
  2. Factor de Complejidad Ambiente (ECF &#8211; Environment Complexity Factor).
  3. Puntos de Casos de Uso sin Ajustar (UUCP &#8211; Unadjusted Use Case Points).
  4. Factor de Productividad (PF &#8211; Productivity Factor).

<p align="justify">
  Los pasos para obtener el valor de cada ítem son:
</p>

  1. Determinar y calcular los Factores Técnicos.
  2. Determinar y calcular el Factor Ambiente.
  3. Calcular los Puntos sin Ajustar de los Casos de Uso.
  4. Determinar el Factor de Productividad.
  5. Multiplicar el valor de todas las variables.

<p align="justify">
  <b>Determinando el Factor Técnico:</b>
</p>

<p align="justify">
  Existen trece factores técnicos estándar para estimar el impacto en la productividad que diferentes variables generan en la aplicación. Estos 13 factores tienen un valor de peso estandarizado y uno puede agregar un valor de 0 a 5 que nos permite indicar la importancia que dichos factores tienen en nuestra aplicación. La multiplicación de peso con el valor dado nos entregan el factor que cada ítem tendrá. La suma total de estos factores se conoce como Factor de Complejidad Técnica sin ajustar. El valor final para el Factor de Complejidad Técnica se obtiene usando la fórmula adicional: FCT <span dir="auto">=</span><span dir="auto">(FCT sin Ajustar</span><span dir="auto">*</span><span dir="auto">0,01</span><span dir="auto">)</span><span dir="auto">+</span><span dir="auto">0,6. En este ejemplo:</span>
</p>

<p align="justify">
  <img class="aligncenter wp-image-772 size-full" src="http://www.ovalenzuela.com/wp-content/uploads/2016/05/factor_tecnico.png" alt="factor_tecnico" width="332" height="215" srcset="http://www.ovalenzuela.com/wp-content/uploads/2016/05/factor_tecnico.png 332w, http://www.ovalenzuela.com/wp-content/uploads/2016/05/factor_tecnico-300x194.png 300w" sizes="(max-width: 332px) 100vw, 332px" />
</p>

<p align="justify">
  <b>Factor de Complejidad Ambiente:</b>
</p>

<p align="justify">
  El Factor de Complejidad Ambiente estima el impacto en la productividad de varios factores ambientales, tales como el si los desarrolladores tienen conocimiento y experiencia en el lenguaje, si son desarrolladores de medio tiempo, su nivel de motivación, etc. Al igual que en el caso anterior, tenemos una serie de preguntas a contestar, las que tienen un peso e influencia, y se les asigna un valor de 0 a 5 para definir el factor final. Nuevamente, la suma de los factores nos otorgaran el valor del factor ambiente no ajustado, y obtendremos el final usando la siguiente fórmula: FA <span dir="auto">=</span><span dir="auto">1,4</span><span dir="auto">&#8211;</span><span dir="auto">(FA sin ajustar</span><span dir="auto">*</span><span dir="auto">0,03</span><span dir="auto">). En este ejemplo:</span>
</p>

<p align="justify">
  <img class="aligncenter wp-image-773 size-full" src="http://www.ovalenzuela.com/wp-content/uploads/2016/05/factor_ambiente.png" alt="factor_ambiente" width="292" height="153" />
</p>

<p align="justify">
  <b>Puntos por Caso de Uso sin Ajustar:</b>
</p>

<p align="justify">
  Los puntos por caso de uso sin ajustar se calculan en base a dos datos:
</p>

  * El peso sin ajustar de los casos de uso (Unadjusted Use Case Weight &#8211; UUCW), basado en el número total de actividades o pasos contenidos en el escenario del caso de uso.
  * El peso sin ajustar del Actor (Unadjusted Actor Weight &#8211; UAW), basado en la combinación de la complejidad de los actores (usuarios u otros sistemas) que intervienen en el caso de uso.

<p align="justify">
  El peso sin ajustar de los casos de uso se categorizan en Simple, Mediano y Complejo. Como se mencionó anteriormente se valorizan de acuerdo al número de pasos que contienen, incluyendo flujos alternativos.
</p>

<table>
  <tr>
    <td>
      <p align="justify">
        Tipo
      </p>
    </td>
    
    <td>
      <p align="justify">
        Descripción
      </p>
    </td>
    
    <td>
      <p align="justify">
        Valor
      </p>
    </td>
  </tr>
  
  <tr>
    <td>
      <p align="justify">
        Simple
      </p>
    </td>
    
    <td>
      <p align="justify">
        Una interfaz de usuario simple que probablemente interviene en solo una entidad de base de datos. El escenario exitoso tiene 3 o menos pasos. Su implementación requiere menos de 5 clases.
      </p>
    </td>
    
    <td>
      <div style="text-align: center;">
        <p>
          5
        </p>
      </div>
    </td>
  </tr>
  
  <tr>
    <td>
      <p align="justify">
        Mediano
      </p>
    </td>
    
    <td>
      <p align="justify">
        Más de una interfaz e interactúa con 2 o más llamadas a una base de datos. Contiene entre 4 a 7 pasos. Su implementación requiere programar de 5 a 10 clases.
      </p>
    </td>
    
    <td>
      <div style="text-align: center;">
        <p>
          10
        </p>
      </div>
    </td>
  </tr>
  
  <tr>
    <td>
      <p align="justify">
        Complejo
      </p>
    </td>
    
    <td>
      <p align="justify">
        Involucra más de 3 interacciones con una base de datos. Contiene sobre 7 pasos. Su implementación requiere más de 10 pasos
      </p>
    </td>
    
    <td>
      <div style="text-align: center;">
        <p>
          15
        </p>
      </div>
    </td>
  </tr>
</table>

<p align="justify">
  <b>Peso sin ajustar de los actores:</b>
</p>

<p align="justify">
  De igual forma los actores son clasificados en función de su complejidad y cantidad de interacciones como Simple, Medio y Complejo.
</p>

<table>
  <tr>
    <td>
      <p align="justify">
        Tipo
      </p>
    </td>
    
    <td>
      <p align="justify">
        Descripción
      </p>
    </td>
    
    <td>
      <p align="justify">
        Valor
      </p>
    </td>
  </tr>
  
  <tr>
    <td>
      <p align="justify">
        Simple
      </p>
    </td>
    
    <td>
      <p align="justify">
        El actor representa otro sistema con una API bien definida.
      </p>
    </td>
    
    <td>
      <div style="text-align: center;">
        <p>
          1
        </p>
      </div>
    </td>
  </tr>
  
  <tr>
    <td>
      <p align="justify">
        Medio
      </p>
    </td>
    
    <td>
      <p align="justify">
        El actor representa otro sistema interactuando mediante una conexión de red.
      </p>
    </td>
    
    <td>
      <div style="text-align: center;">
        <p>
          2
        </p>
      </div>
    </td>
  </tr>
  
  <tr>
    <td>
      <p align="justify">
        Complejo
      </p>
    </td>
    
    <td>
      <p align="justify">
        El actor es una persona interactuando mediante una interfaz.
      </p>
    </td>
    
    <td>
      <div style="text-align: center;">
        <p>
          3
        </p>
      </div>
    </td>
  </tr>
</table>

<p align="justify">
  Finalmente, el valor de los casos de uso sin ajustar se obtiene sumando el total del peso o valor de los casos de uso con el peso o valor de todos los actores. Por ejemplo:
</p>

<p align="justify">
  <img class="aligncenter wp-image-774 size-full" src="http://www.ovalenzuela.com/wp-content/uploads/2016/05/casos_uso.png" alt="casos_uso" width="304" height="129" srcset="http://www.ovalenzuela.com/wp-content/uploads/2016/05/casos_uso.png 304w, http://www.ovalenzuela.com/wp-content/uploads/2016/05/casos_uso-300x127.png 300w" sizes="(max-width: 304px) 100vw, 304px" />
</p>

<p align="justify">
  Con todos estos valores, es posible obtener los puntos por caso de uso multiplicando los resultados entre si. Y para obtener la cantidad de horas hombre correspondientes al esfuerzo por desarrollar, basta con multiplicar la cantidad de puntos obtenidos por el factor de productividad que corresponde al tiempo que un desarrollador requiere para completar un punto. El valor estándar es de 20 horas por punto, pero esto puede variar según la experiencia del desarrollador y la complejidad del proyecto. Puesto que nuestro ejemplo es solo un formulario, podemos decir que puedo completar 1 punto por día (8 horas laborales).
</p>

<p align="justify">
  Esto representa entonces el valor de horas requeridas para programar, sin embargo todo proyecto formal tiene otras fases además de la de desarrollo, tales como análisis, diseño y pruebas. Usando valores porcentuales para asignar una proporción del tiempo al proyecto, podemos obtener un estimado de lo que demora el proyecto completo.
</p>

<p align="justify">
  Luego, ya que conocemos el valor hora de un desarrollador promedio, podremos completar el resto de los cálculos necesarios para estimar el valor venta del proyecto. Habitualmente podemos cobrar el doble del costo del valor de horas necesarias para completar el proyecto, más el impuesto (20%), es decir, multiplicamos los valores de costo por 2.2.
</p>

<p align="justify">
  Finalmente tendremos el resumen de nuestro proyecto completo:
</p>

<p align="justify">
  <img class="aligncenter wp-image-775 size-full" src="http://www.ovalenzuela.com/wp-content/uploads/2016/05/resultados_final.png" alt="resultados_final" width="594" height="184" srcset="http://www.ovalenzuela.com/wp-content/uploads/2016/05/resultados_final.png 594w, http://www.ovalenzuela.com/wp-content/uploads/2016/05/resultados_final-300x93.png 300w" sizes="(max-width: 594px) 100vw, 594px" />
</p>

<p align="justify">
  Para facilitar la vida a quienes desean usar mi template, pueden copiarlo desde <a href="https://docs.google.com/spreadsheets/d/1KKc4U1W40Za0fva1YOvYx2RV52zuDAWaoCO1FNDgdRw/edit?usp=sharing">Google Docs</a>.
</p>

<p align="justify">
  <strong><em>Happy Coding!</em></strong>
</p>