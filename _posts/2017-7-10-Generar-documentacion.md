---
published: true
layout: post
category: angular
tags:
  - angular
---
La generación de documentación facilita el desarrollo de los proyectos a lo largo del tiempo. Tanto si el que retoma la programación es el desarrollador actual como si son otros ajenos al desarrollo original, la generación de documentación en formato HTML a partir de comentarios insertados en el código, les facilitará la comprensión de la arquitectura de la aplicación.


Si trabajamos con **Atom** podemos utilizar dos librerías para automatizar la generación de documentación. Instalamos en el editor el paquete "[Docblockr](https://atom.io/packages/docblockr)", que facilita comentar propiedades y métodos de nuestras clases. Por otro lado necesitamos "[Typedoc](http://typedoc.org/)" para generar la documentación, en formato HTML, a partir de los comentarios incluídos mediante **Docblockr**.

**Dockblockr** lo instalaremos desde la pantalla "Settings" (Ctrl + ,) de **Atom**.

Para utilizar **Typedoc** necesitamos tener instalado [Node.js](https://nodejs.org "Node.js"). A continuación lo podremos instalar mediante el comando **$ npm install -g typedoc**.

## Trabajo con Dockblockr

Para generar un bloque de comentarios teclearemos **/**** y a continuación pulsaremos el **Tabulador** o **Enter**. 

{% highlight ts %}
/**
 * 
 */
{% endhighlight %}

### Comentar Funciones
Si colocamos el puntero justo encima de la declaración de una función, el bloque de comentarios incluye automáticamente el nombre de la función, los parámetros de la misma y el retorno.

{% highlight ts %}
/**
     * [cambiarTitulo description]
     * @param  {[type]} titulo      [description]
     * @param  {[type]} nuevoTitulo [description]
     * @return {[type]}             [description]
     */
    cambiarTitulo(titulo,nuevoTitulo){
      titulo.setTitle(nuevoTitulo);
    }
{% endhighlight %}

Justo después de la inserción del comentario podremos utilizar el tabulador para pasar por los diferentes campos "type" y "description" y editarlos en el momento.

### Comentar variables

Si el puntero lo colocamos justo encima de la declaración de una variable, el bloque que se genera incluye el nombre de la variable y el tipo;

{% highlight ts %}
/**
       * [nuevoTitulo description]
       * @type {string}
       */
      let nuevoTitulo:string = "Curso angular";
{% endhighlight %}

## Generar la documentación con Typedoc

Para generar la documentación podemos hacerlo ejecutando un comando en un terminal abierto en el directorio del proyecto. Incluiremos el directorio del cual queremos extraer los comentarios del código (src) y el directorio en el cual se va a generar la documentación html (doc).

**$ typedoc --experimentalDecorators --target "es5" --module "commonjs" --ignoreCompilerErrors  --out doc/ src/**

También podemos instalarlo localmente con $ **npm install --save-dev typedoc**

## Compodoc

A diferencia de **Typedoc**, que documenta Typescript, [Compodoc](https://github.com/compodoc/compodoc) se ha diseñado para documentar Angular.

Lo más cómodo es instalarlo localmente con el comando **$ npm install --save-dev compodoc**


A continuación incluimos las siguientes líneas en los scripts de **package.json**:

_"scripts": {
    ...
    "docs": "node_modules/.bin/compodoc -p src/tsconfig.json -d docs",
    "serve-docs": "node_modules/.bin/compodoc -s -d docs"
    ...
  }_
  
El primer script generará la documentación en el directorio **docs** al ejecutar **$ npm run docs**

El segundo script servirá la documentación en **localhos:8080** al ejecutar **$ npm run serve-docs**

El resultado es bastante impresionante:

![Compodoc]({{site.baseurl}}/images/compodoc.gif)