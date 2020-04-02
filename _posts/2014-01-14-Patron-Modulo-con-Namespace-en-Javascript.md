---
layout: post
title: Patrón Módulo con Namespace en Javascript
categories:
  - Buenas Prácticas
  - javascript
  - Patrones de Diseño
tags:
  - javascript
published: true
---

## Introducción

Javascript cada vez es más popular entre los desarrolladores.  
Están apareciendo nuevos frameworks para utilizarlo de formas que hace unos años ni siquiera hubiéramos imaginado.  
_Knockout, Backbone, Ember, Angular.js hasta podemos ejecutarlo en servidores con node.js o Rhino._ 
Además, los navegadores tienen interpretes mas sofisticados e incluso compiladores para transformar el Javascript interpretado y mejorar el rendimiento en las ejecuciones. 
Pero, ¿qué pasa cuando nuestro código crece?, ¿cómo lo estructuramos?,  ¿cómo evitamos colisiones con el Javascript que ya tenemos escrito?

## Patrón módulo en Javascript

Podemos encontrar una definición formal de este patrón en la wikipedia:   
[Patrón Módulo](http://es.wikipedia.org/wiki/Módulo_(patrón_de_diseño) "Patrón módulo").  
![Patrón Módulo con Namespace en Javascript](http://jcnistal.es/wp-content/uploads/2014/01/module-298x300.jpg)

Un módulo es una agrupación de conceptos relacionados entre sí y que pueden exponer algunas de sus partes al exterior.  
En lenguajes orientados a objetos como Java y .Net podemos implementar módulos con clases.

## **¿Cómo declaramos un módulo en Javascript?**

Para crear un módulo necesitamos definirlo como una función: 
```javascript 
var SimpleGameModule = function () { //Código del módulo }; 
``` 

Para crear una instancia de nuestro nuevo módulo solo tenemos que ejecutar:
```javascript 
var objGame = new SimpleGameModule();
```

Si no queremos crear instancias de nuestro módulo y queremos tenerlo disponible desde el inicio,  tenemos que declararlo como una [función autoejecutable](http://www.etnassoft.com/2011/03/14/funciones-autoejecutables-en-javascript/ "Funciones autoejecutables"). 
Fijaros en "()" después de la llave de cierre del módulo: eso hace que cuando el intérprete de Javascript lea la función, directamente la ejecute. 
```javascript 
var SimpleGameModule = (function(){ //Código del módul })(); 
```
 
## ** ¿Cómo crear un Namespace?**

Cuando nuestras aplicaciones crezcan tendremos muchos módulos que necesitaremos organizar.
Los Namespaces nos ayudan organizar nuestros módulo en grupos funcionales.
Declarar un módulo en javascript es tan sencillo como crear una variable: 
```javascript  
var GammingNamespace = {};
```

## **¿Cómo añadir nuestro módulo al Namespace?**

Para utilizar nuestro patrón módulo con namespace en javascript, primero tenemos que declarar nuestro namespace. 
Después tenemos que  incluir nuestro módulo en una función autoejecutable que recibe como parámetro el namespace. 
Por último pasamos nuestro namespace como parámetro de la función autoejecutable. 
```javascript 
var GammingNamespace = {}; 
(function (ns) { 
  use strict; 
  //Constructor 
  var SimpleGameModule = function () { 
    //Código del módulo 
  }; 
  //Publicamos el módulo en el namespace 
  ns.SimpleGameModule = SimpleGameModule; 
}(window.GammingNamespace || {})); 
``` 
En el caso de que nuestro Namespace no esté declarado, el módulo dará un error. 
Como medida de seguridad  pasamos "{}" y así nuestro código seguirá funcionando. 
Ahora nuestro módulo no es visible desde el contexto global: solo está disponible dentro del Namespaces "GammingNamespace". 
```javascript 
var objGame = new GammingNamespace.SimpleGameModule();
```

## **¿Cómo declaramos atributos privados en nuestro módulo?**

Los atributos privados tenemos que declararlos en el constructor de nuestro módulo, dentro del objeto _this._ 
```javascript 
var GammingNamespace = {}; 
(function (ns) { 
  use strict; 
  //Constructor 
  var SimpleGameModule = function () { 
    //Atributos de la instancia 
    this.score; 
  }; 
  //Publicamos nuestro módulo en el namespace 
  ns.SimpleGameModule = SimpleGameModule; 
}(window.GammingNamespace || {}));
``` 
Estos atributos solo serán visibles dentro del módulo. 
Si ejecutáramos el módulo e intentamos acceder a alguno de los atributos, recibiríamos un "undefined": 
```javascript 
var objGame = new GammingNamespace.SimpleGameModule(); 
objGame.score;
```

## **¿Cómo declaramos métodos privadas?**

```javascript 
var GammingNamespace = {}; 
(function (ns) { 
  use strict; 
  //Constructor
  var SimpleGameModule = function () { 
    //Atributos de la instancia 
    this.score; _InitializeGame.call(this); 
  }; 
  //Funciones privadas 
  var _InitializeGame = function () { 
    this.score = 0; 
  }; 
  //Publicamos nuestro módulo en el namespace 
  ns.SimpleGameModule = SimpleGameModule; 
}(window.GammingNamespace || {}));
```

## **¿Cómo declaramos métodos y atributos públicos?**

Para crear métodos o atributos públicos tenemos que encapsularlos dentro de la propiedad [prototype](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Prototype-based_programming "Prototype style programming") de nuestro módulo: 
```javascript 
var GammingNamespace = {}; 
(function (ns) {
  use strict; 
  //Constructor 
  var SimpleGameModule = function () { 
    //Atributos de la instancia 
    this.score; _InitializeGame.call(this); }; 
  //Funciones privadas 
  var _InitializeGame = function () {
    this.score = 0; 
  }; 
  //Funciones públicas 
  SimpleGameModule.prototype = { 
    AddScore : function (point) { 
      this.score += point; 
    }, 
    GetScore : function () { 
      return "Tu puntuación es: " + this.score; 
    } 
  } 
  //Publicamos nuestro módulo en el namespace 
  ns.SimpleGameModule = SimpleGameModule; 
}(window.GammingNamespace || {}));
```
Encapsulamos todos los métodos públicos sobrescribiendo el atributo _prototype_ para optimizar el "minificado" del fichero. 
Como la palabra _prototype_ es reservada del lenguaje, si creáramos cada método publico individualmente en el _prototype,_ no podríamos "minificar" esas líneas. 
Si tenemos muchos métodos públicos estaremos perdiendo ratio de compresión. 
```javascript  
//Public 
Prototype GammingNamespace.prototype.AddScore: function (points) { 
  this.score += points 
} 
GammingNamespace.prototype.GetScore: function () { 
  return this.score; 
} 
```
Si vamos a utilizar herencia para nuestro módulo tenemos que declarar cada método individualmente en el _prototype._ Esto lo explicaremos en el post dedicado a la herencia en javascript.

## **¿Cómo trabajo con el patrón módulo con namespace en Javascript?**

Solo tenemos que crear una instancia de nuestro módulo y utilizar sus métodos públicos: 
```javascript 
var objGame = new GammingNamespace.SimpleGameModule(); 
objGame.GetScore(); 
objGame.AddScore(10);
objGame.GetScore(); 
```

## **¿Cómo usar objectos del contexto global en nuestros módulos?**

En muchos casos tendremos que acceder a objetos globales desde nuestro módulo, por ejemplo al objecto "window" o "jQuery". 
Una buena práctica para encapsular totalmente nuestros módulos es pasar estos objectos como parámetros a nuestro módulo. 
Dentro de nuestro módulo guardaremos una copia de estos objectos. 
De esta forma solo utilizaremos objectos internos del módulo y ganaremos algo de rendimiento, porque cada vez que queramos acceder a "jQuery" o al objecto "window" lo haremos en nuestra copia local y no tendremos que acceder al contexto global del navegador. 
```javascript 
var GammingNamespace = {}; 
(function (ns, jQuery, window) { 
  use strict; 
  var _$ = jQuery; 
  var _window = window; 
  //Constructor 
  var SimpleGameModule = function () { 
    //Atributos de la instancia 
    this.score; _InitializeGame.call(this); 
  };
  //Funciones privadas 
  var _InitializeGame = function () { 
    this.score = 0; 
  }; //Funciones públicas 
  SimpleGameModule.prototype = { 
    AddScore : function (point) { 
      this.score += point; 
    },
    GetScore : function () {
      return "Tu puntuación es: " + this.score;
    } 
  } 
  //Publicamos nuestro módulo en el namespace 
  ns.SimpleGameModule = SimpleGameModule;
}(window.GammingNamespace || {}, window, jQuery)); 
```

## **Ventajas de este patrón**

*   Encapsulación de nuestras funciones.
*   Evitamos colisión con otros desarrollos.
*   Mostrar solo la parte pública de nuestros desarrollos.

## **Desventajas de este patrón**

*   Si queremos cambiar un método de público a privado o viceversa tenemos que modificar el módulo y mover los métodos. Esta desventaja se puede solucionar utilizando: [Revealing Module Pattern](http://www.etnassoft.com/2011/04/12/revealing-module-javascript/ "Revealing Module Pattern").

## **¿Cómo afecta al rendimiento este patrón?**

Hemos comparado el rendimiento de este patrón con otras formas de encapsular funcionalidades en javascript:

*   [Patrón módulo clásico](http://www.etnassoft.com/2011/04/11/el-patron-de-modulo-en-javascript-en-profundidad/ "Patrón módulo clásico"): es muy complicado hacer herencia de módulos.
*   [Object literal notation](http://net.tutsplus.com/tutorials/javascript-ajax/the-basics-of-object-oriented-javascript/ "Object Literal Notation"): no permite métodos ni atributos privados.

Los resultados se pueden ver en [jsperf.com](http://jsperf.com/module-pattern-vs-object-literal-vs-prototype/4 "Rendimiento patrones encapsulación") 
En muchos casos, la versión "Object literal notation" tiene un mejor rendimiento, pero hay que tener en cuenta que en estas pruebas estamos haciendo cientos de miles de ejecuciones. Por lo tanto, en una aplicación estandard, el rendimiento de estos patrones es similar. 
Para más información sobre el consumo de memoria y el rendimiento de este patrón podéis consultar el artículo: [Javascript Module Pattern, Memory, Closures](http://www.macwright.org/2013/01/22/javascript-module-pattern-memory-and-closures.html "http://www.macwright.org/2013/01/22/javascript-module-pattern-memory-and-closures.html") Nos vemos por la red!
