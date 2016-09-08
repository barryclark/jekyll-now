---
id: 278
title: 'Aprende Android en 20 conceptos: Conceptos 1 y 2'
date: 2014-02-23T04:00:00+00:00
author: ovalenzuela
layout: post
guid: https://ovalenzueladotcom.wordpress.com/2014/02/23/aprende-android-en-20-conceptos-conceptos-1-y-2
permalink: /2014/02/aprende-android-en-20-conceptos-conceptos-1-y-2.html
blogger_blog:
  - www.ovalenzuela.com
blogger_author:
  - Andrés Barrera
blogger_02f5be51301771664ae7c1c72bf29246_permalink:
  - 4994878510728269259
categories:
  - Google
---
[<img class="size-full wp-image-127338 aligncenter" alt="android desarrollo" src="http://www.elandroidelibre.com/wp-content/uploads/2014/02/android-desarrollo.jpg" width="614" height="425" />](http://www.elandroidelibre.com/wp-content/uploads/2014/02/android-desarrollo.jpg)

La semana pasada anunciábamos la nueva sección <a title="Aprende Android en 20 conceptos" href="http://www.elandroidelibre.com/tag/20conceptos" target="_blank"><em><strong>Aprende Android en 20</strong><strong> conceptos</strong></em></a>, sección orientada a **introducirnos en los conceptos más básicos para empezar a programa nuestra propia aplicación Android**.

De hecho, aparte de los _20 conceptos_, incluimos la semana pasada un punto 0 de introducción, donde podíamos **instalarnos el entorno de desarrollo y tener nuestra máquina lista para empezar a programar**.

Hoy toca hablar ya de los dos primeros conceptos: los **Fundamentos de una aplicación **y los **Recursos****.**

> **1. <a title="Fundamentals" href="http://developer.android.com/guide/components/fundamentals.html" target="_blank">Fundamentos de una aplicación</a>**

Lo primero que tenemos que mencionar es que las aplicaciones Android están escritas en el **lenguaje de programación orientado a objetos Java**. El SDK de Android tiene una serie de herramientas que permitirán compilar el código, incluyendo los datos y los recursos (de los que hablaremos a continuación), y lo meterá todo en un fichero **APK**, o también conocido como **paquete Android**. Este fichero será nuestro instalador.

Una vez instalada una aplicación, cada una de ellas tiene su propio sistema de seguridad, de tal modo que:

  * **Cada aplicación será un usuario diferente dentro de Android como Sistema Operativo basado en un sistema Linux multiusuario**. Este usuario será un ID de usuario Linux único.
  * Android dará permisos para todos los ficheros de una aplicación únicamente para el usuario que identifica dicha app.
  * **Cada proceso tiene su propia máquina virtua**l, por lo que la ejecución de aplicaciones es totalmente independiente.
  * Por defecto, **cada aplicación corre en su propio proceso Linux**, el cual se gestiona a nivel de Sistema Operativo

[<img class="size-full wp-image-128198 aligncenter" alt="arquitectura android" src="http://www.elandroidelibre.com/wp-content/uploads/2014/02/arquitectura-android.png" width="435" height="311" />](http://www.elandroidelibre.com/wp-content/uploads/2014/02/arquitectura-android.png)

Con todas estas reglas, Android consigue implementar lo que se conoce como _**Principio de menor** **privilegio**_, consistente en otorgar los permisos justos a cada aplicación, de modo que el sistema sea lo más seguro posible.

[<img class="aligncenter" alt="android candado" src="http://www.elandroidelibre.com/wp-content/uploads/2014/02/android-candado.png" width="187" height="159" />](http://www.elandroidelibre.com/wp-content/uploads/2014/02/android-candado.png)

Pero todo esto es el funcionamiento por defecto, pues podremos gestionarlo según nos interese, por ejemplo para compartir datos entre diferentes aplicaciones (un ejemplo perfecto son los Contactos).

Una vez conocido como funciona Android, es hora de pasar a definir los **componentes de una aplicación**. Éstos son los bloques básicos que podemos construir. Hay **4 diferentes tipos de componentes:**

  * **Activity**: Representa una **pantalla independiente con una interfaz de usuario**. A pesar de que nuestra aplicación dispondrá de múltiples pantallas interconectadas entre sí, nosotros deberemos generarlas individual e independientemente (pudiendo pasar datos entre ellas, en caso de ser necesario). Entraremos en más detalle en esta clase cuando lleguemos al concepto 3.
  * **Service**: Es un **componente que corre de fondo para hacer operaciones de larga duración o trabajo en procesos remotos**. Contrario a la actividad, no dispone de interfaz gráfica. Veremos más detalles al llegar al concepto 11.
  * **Content Provider: **Este componente nos permite **gestionar un conjunto de datos de la aplicación para compartir**. Los Contactos son el ejemplo perfecto para este componente: datos que podemos compartir entre diferentes aplicaciones. Pero podemos crear nuestro propio conjunto de datos (más detalle en el concepto 13).
  * **Broadcast Receiver**: El cuarto de los componentes nos permite **responder a anuncios _broadcast _del sistema**. Un buen ejemplo es si queremos gestionar cuando tengamos el aviso de batería baja (el cual enviará un mensaje _broadcast_), aunque podemos diseñar nuestros propios mensajes (más detalles en el concepto 8).

Un aspecto interesante de diseño de Android es que una aplicación A podría abrir un componente de una aplicación B. El ejemplo ideal es cuando queremos usar la cámara en nuestra app, podemos hacer una Activity con la cámara, o abrir el componente de la cámara que viene ya instalada por defecto en el sistema operativo.

Para ello utilizamos un mensaje llamado **Intent**, el cual también sirve para **activar 3 de los 4 componentes de una app** (todos excepto el Content Provider), Más adelante veremos cómo hay métodos específicos para abrir cualquier componente a través de un Intent (concepto 7).

[<img class="size-full wp-image-128203 aligncenter" alt="android componentes app" src="http://www.elandroidelibre.com/wp-content/uploads/2014/02/android-componentes-app.png" width="374" height="365" />](http://www.elandroidelibre.com/wp-content/uploads/2014/02/android-componentes-app.png)

Pero, **¿cómo sabe nuestra aplicación qué componentes tiene disponibles? **Para ello, existe el fichero <a title="AndroidManifest.xml" href="http://developer.android.com/guide/topics/manifest/manifest-intro.html" target="_blank"><strong>AndroidManifest.xml</strong></a>. Este fichero será el encargado de comunicarle al sistema operativo:

  * las componentes de las que dispone la aplicación
  * los permisos necesarios para la aplicación (cámara, GPS…)
  * la versión de Android mínima necesaria
  * el hardware y software requerido y/o usado
  * las librerias externas que utiliza (como Google Maps…)

[<img class="size-full wp-image-128204 aligncenter" alt="AndroidManifest" src="http://www.elandroidelibre.com/wp-content/uploads/2014/02/AndroidManifest.png" width="471" height="247" />](http://www.elandroidelibre.com/wp-content/uploads/2014/02/AndroidManifest.png)

Para ello, utilizaremos etiquetas, que en el caso de los componentes serán:

_<a title="&#8221; href=&#8221;http://developer.android.com/guide/topics/manifest/activity-element.html&#8221; target=&#8221;_blank&#8221;></a>   <a title="&#8221; href=&#8221;http://developer.android.com/guide/topics/manifest/service-element.html&#8221; target=&#8221;_blank&#8221;></a>   <a title="&#8221; href=&#8221;http://developer.android.com/guide/topics/manifest/receiver-element.html&#8221; target=&#8221;_blank&#8221;></a>   <a title="&#8221; href=&#8221;http://developer.android.com/guide/topics/manifest/provider-element.html&#8221; target=&#8221;_blank&#8221;></a>_

Cada una de estas etiquetas tendrán una serie de atributos disponibles, donde indicaremos qué componente en cuestión será de todos los disponibles, icono o un sinfín de opciones disponibles. Además, si queremos indicar las capacidades de uno de nuestros componentes, podemos hacer uso de la etiqueta _<a title="&#8221; href=&#8221;http://developer.android.com/guide/topics/manifest/intent-filter-element.html&#8221; target=&#8221;_blank&#8221;></a>._

> **2. <a title="App Resources" href="http://developer.android.com/guide/topics/resources/index.html" target="_blank">Recursos de una app</a>**

[<img class="aligncenter" alt="recursos" src="http://www.elandroidelibre.com/wp-content/uploads/2014/02/recursos.png" width="350" height="280" />](http://www.elandroidelibre.com/wp-content/uploads/2014/02/recursos.png)

A la hora de hacer un buen programa, siempre **hay que externalizar los recursos del código**, entendiendo por recursos imágenes, textos, estilos… De esta forma, también podremos **especificar diferentes recursos dependiendo del tipo de dispositivo en el que estemos, sin necesidad de modificar el código**. Para esto, el ejemplo perfecto es la versión móvil y tablet de una misma pantalla (o Activity, para ir entrando en la _jerga_): creamos una única Activity la cual utilizará una distribución de su contenido diferente según el tipo de dispositivo que usemos.

[<img class="size-full wp-image-128208 aligncenter" alt="layouts" src="http://www.elandroidelibre.com/wp-content/uploads/2014/02/layouts.png" width="459" height="397" />](http://www.elandroidelibre.com/wp-content/uploads/2014/02/layouts.png)

Siempre podemos especificar **un recurso genérico o por defecto. **En contraposición a éste, tendremos la opción de **especificar que una versión concreta de un recurso es para una configuración específica**.

Para detallar la configuración específica podemos basarnos en idiomas, resolución, orientación del dispositivo… Para ello, basta ver las posibilidades en esta <a title="Providing resources" href="http://developer.android.com/guide/topics/resources/providing-resources.html" target="_blank">página</a>. Básicamente radica en **añadir unas terminaciones a las carpetas donde almacenaremos los recursos, acordes a la configuración específica**.

Todos los recursos irán bajo la carpeta _**/res.**_** **Pero, ¿qué recursos son los que podemos incluir? Los <a title="Resource Types" href="http://developer.android.com/guide/topics/resources/available-resources.html" target="_blank">siguientes</a>:

  * Animaciones
  * Colores
  * <a title="Drawable Resources" href="http://developer.android.com/guide/topics/resources/drawable-resource.html" target="_blank">Imágenes </a>(_Drawable_)
  * <a title="Layout Resource" href="http://developer.android.com/guide/topics/resources/layout-resource.html" target="_blank">Layouts </a>(Disposición de elementos gráficos)
  * <a title="Menu Resource" href="http://developer.android.com/guide/topics/resources/menu-resource.html" target="_blank">Menús</a>
  * <a title="String Resources" href="http://developer.android.com/guide/topics/resources/string-resource.html" target="_blank">Cadenas de texto </a>(_String_)
  * <a title="Style Resource" href="http://developer.android.com/guide/topics/resources/style-resource.html" target="_blank">Estilos</a>
  * <a title="More Resource Types" href="http://developer.android.com/guide/topics/resources/more-resources.html" target="_blank">Otros </a>(booleanos, dimensiones…)

Para ello, deben ir en una **estructura de carpetas específica**, de forma que por ejemplo para añadir cadenas de texto en español utilizaríamos la carpeta /res/values-es o /res/drawable-xxhdpi para _Drawables_ para pantallas de alta resolución.

A continuación podéis ver un diagrama de flujo de cómo Android elige el recurso adecuado:

[<img class="size-full wp-image-128217 aligncenter" alt="recurso workflow" src="http://www.elandroidelibre.com/wp-content/uploads/2014/02/recurso-workflow.png" width="332" height="412" />](http://www.elandroidelibre.com/wp-content/uploads/2014/02/recurso-workflow.png)

Teniendo claro cómo se gestionan los recursos, **¿cómo creamos algunos recursos específicos? **Veamos a continuación algunos de ellos: layouts, menus y estilos.

Un <a title="Layout" href="http://developer.android.com/guide/topics/ui/declaring-layout.html" target="_blank"><strong>layout</strong> </a>define la estructura visual de una interfaz de usuario. A pesar de que podríamos crearla dinámicamente por código, **lo ideal es declarar los elementos de la interfaz en un XML**.

Para crear un layout, disponemos de muchos componentes gráficos ya en la API, aunque podemos crear los nuestros propios. Tenemos layouts donde insertar múltiples componentes, vistas de texto, botones… A continuación, podéis ver un ejemplo de un layout que nos pondrá un texto y justo debajo un botón:

[<img class="size-full wp-image-128221 aligncenter" alt="layout ejemplo" src="http://www.elandroidelibre.com/wp-content/uploads/2014/02/layout-ejemplo.png" width="596" height="267" />](http://www.elandroidelibre.com/wp-content/uploads/2014/02/layout-ejemplo.png)

En este caso, un LinearLayout nos pondrá elementos uno detrás de otro (en este caso al ser su orientación vertical, uno debajo de otro). A continuación un TextView que de ancho y alto ocupa _lo que necesite (wrap_content)_, con el texto _Hello, I am a TextView_. Y similar para el botón. Cada uno con su identificador único.

Si queremos hacernos buenos a la hora de hacer layouts, lo ideal es que **empecemos trabajando con el editor gráfico de eclipse o Android Studio**, pero vayamos comprobando cómo queda el XML. Conforme pase el tiempo, os daréis cuenta que a veces será más rápido escribir directamente en el XML.

Cuando vamos a definir un **<a title="Menu" href="http://developer.android.com/guide/topics/ui/menus.html" target="_blank">menú</a>** en una de nuestras Actividades, éste también se define a través de un XML. Para más información, os recomiendo visitar el <a title="Menu" href="http://developer.android.com/guide/topics/ui/menus.html" target="_blank">link</a>. Aquí os dejo un ejemplo:

[<img class="size-full wp-image-128225 aligncenter" alt="menu ejemplo" src="http://www.elandroidelibre.com/wp-content/uploads/2014/02/menu-ejemplo.png" width="534" height="192" />](http://www.elandroidelibre.com/wp-content/uploads/2014/02/menu-ejemplo.png)

Por último, cuando hablamos de <a title="Styles & Themes" href="http://developer.android.com/guide/topics/ui/themes.html" target="_blank"><strong>estilos</strong></a>, nos estamos referiendo al concepto más parecido a lo que es CSS para una web: externalizar estilos para poder ser reutilizados. Podremos definir estilos para asignarlos a entidades gráficas, así como crear un **tema** para asignarlo a toda la aplicación.

A continuación podéis ver como mostrar un texto con un formato específico:

[<img class="alignnone size-full wp-image-128230" alt="texto sin estilo" src="http://www.elandroidelibre.com/wp-content/uploads/2014/02/texto-sin-estilo.png" width="337" height="121" />](http://www.elandroidelibre.com/wp-content/uploads/2014/02/texto-sin-estilo.png)

Y como queda tras utilizarlo con estilos, donde el estilo CodeFont podríamos reutilizarlo en otras Views, o si decidiéramos cambiarlo, podríamos cambiarlo a todos a la vez:

[<img alt="texto con estilo" src="http://www.elandroidelibre.com/wp-content/uploads/2014/02/texto-con-estilo.png" width="610" height="265" />](http://www.elandroidelibre.com/wp-content/uploads/2014/02/texto-con-estilo.png)

Llegados este punto, creo que es el momento de mencionaros la <a title="User Interface" href="http://developer.android.com/guide/topics/ui/index.html" target="_blank">guía de diseño de interfaces para Android</a>, una web donde podremos ver las tendencias y consejos sobre cómo montar una buena interfaz de usuario.

Por último, para jugar un poco con la asignación de recursos para diferentes configuraciones, estaría bien que sigáis <a title="Supporting Different Devices" href="http://developer.android.com/training/basics/supporting-devices/index.html" target="_blank">este ejemplo de Google</a>.

Con esto damos por terminados los dos primeros conceptos de esta sección. Es cierto que **estos dos conceptos son muy densos, pues son conceptos donde pretendo explicar la estructura de la aplicación**, pero muchos de las cosas que nombramos son las que iremos analizando a posteriori.

**¿Preparados para los siguientes conceptos? **

> <a title="Aprende Android en 20 conceptos" href="http://www.elandroidelibre.com/tag/20conceptos" target="_blank">Ver la sección Aprende Android en 20 conceptos</a>

El artículo [Aprende Android en 20 conceptos: Conceptos 1 y 2](http://www.elandroidelibre.com/2014/02/aprende-android-en-20-conceptos-conceptos-1-y-2.html) se publicó en [El Androide Libre](http://www.elandroidelibre.com) (El Blog Android de referencia. Aplicaciones, noticias, Juegos y smartphones Android Libres)


<img width="1" height="1" src="http://rss.feedsportal.com/c/34005/f/617036/s/376d469d/sc/5/mf.gif" border="0" /> 

<div>
  <table border='0'>
    <tr>
      <td valign='middle'>
        <a href="http://share.feedsportal.com/share/twitter/?u=http%3A%2F%2Fwww.elandroidelibre.com%2F2014%2F02%2Faprende-android-en-20-conceptos-conceptos-1-y-2.html&t=Aprende+Android+en+20+conceptos%3A+Conceptos+1+y+2" target="_blank"><img src="http://res3.feedsportal.com/social/twitter.png" border="0" /></a> <a href="http://share.feedsportal.com/share/facebook/?u=http%3A%2F%2Fwww.elandroidelibre.com%2F2014%2F02%2Faprende-android-en-20-conceptos-conceptos-1-y-2.html&t=Aprende+Android+en+20+conceptos%3A+Conceptos+1+y+2" target="_blank"><img src="http://res3.feedsportal.com/social/facebook.png" border="0" /></a> <a href="http://share.feedsportal.com/share/linkedin/?u=http%3A%2F%2Fwww.elandroidelibre.com%2F2014%2F02%2Faprende-android-en-20-conceptos-conceptos-1-y-2.html&t=Aprende+Android+en+20+conceptos%3A+Conceptos+1+y+2" target="_blank"><img src="http://res3.feedsportal.com/social/linkedin.png" border="0" /></a> <a href="http://share.feedsportal.com/share/gplus/?u=http%3A%2F%2Fwww.elandroidelibre.com%2F2014%2F02%2Faprende-android-en-20-conceptos-conceptos-1-y-2.html&t=Aprende+Android+en+20+conceptos%3A+Conceptos+1+y+2" target="_blank"><img src="http://res3.feedsportal.com/social/googleplus.png" border="0" /></a> <a href="http://share.feedsportal.com/share/email/?u=http%3A%2F%2Fwww.elandroidelibre.com%2F2014%2F02%2Faprende-android-en-20-conceptos-conceptos-1-y-2.html&t=Aprende+Android+en+20+conceptos%3A+Conceptos+1+y+2" target="_blank"><img src="http://res3.feedsportal.com/social/email.png" border="0" /></a>
      </td>
      
      <td valign='middle'>
      </td>
    </tr>
  </table>
</div>

[<img src="http://da.feedsportal.com/r/186530976760/u/49/f/617036/c/34005/s/376d469d/sc/5/rc/1/rc.img" border="0" />](http://da.feedsportal.com/r/186530976760/u/49/f/617036/c/34005/s/376d469d/sc/5/rc/1/rc.htm)  
[<img src="http://da.feedsportal.com/r/186530976760/u/49/f/617036/c/34005/s/376d469d/sc/5/rc/2/rc.img" border="0" />](http://da.feedsportal.com/r/186530976760/u/49/f/617036/c/34005/s/376d469d/sc/5/rc/2/rc.htm)  
[<img src="http://da.feedsportal.com/r/186530976760/u/49/f/617036/c/34005/s/376d469d/sc/5/rc/3/rc.img" border="0" />](http://da.feedsportal.com/r/186530976760/u/49/f/617036/c/34005/s/376d469d/sc/5/rc/3/rc.htm)

[<img src="http://da.feedsportal.com/r/186530976760/u/49/f/617036/c/34005/s/376d469d/a2.img" border="0" />](http://da.feedsportal.com/r/186530976760/u/49/f/617036/c/34005/s/376d469d/a2.htm)
<img width="1" height="1" src="http://pi.feedsportal.com/r/186530976760/u/49/f/617036/c/34005/s/376d469d/a2t.img" border="0" /> 

<div>
  <a href="http://feeds.feedburner.com/~ff/elandroidelibre?a=Hgk9DTeSPeE:tGcn9aIqR1c:ecdYMiMMAMM"><img src="http://feeds.feedburner.com/~ff/elandroidelibre?d=ecdYMiMMAMM" border="0" /></a> <a href="http://feeds.feedburner.com/~ff/elandroidelibre?a=Hgk9DTeSPeE:tGcn9aIqR1c:V_sGLiPBpWU"><img src="http://feeds.feedburner.com/~ff/elandroidelibre?i=Hgk9DTeSPeE:tGcn9aIqR1c:V_sGLiPBpWU" border="0" /></a> <a href="http://feeds.feedburner.com/~ff/elandroidelibre?a=Hgk9DTeSPeE:tGcn9aIqR1c:7Q72WNTAKBA"><img src="http://feeds.feedburner.com/~ff/elandroidelibre?d=7Q72WNTAKBA" border="0" /></a> <a href="http://feeds.feedburner.com/~ff/elandroidelibre?a=Hgk9DTeSPeE:tGcn9aIqR1c:dnMXMwOfBR0"><img src="http://feeds.feedburner.com/~ff/elandroidelibre?d=dnMXMwOfBR0" border="0" /></a> <a href="http://feeds.feedburner.com/~ff/elandroidelibre?a=Hgk9DTeSPeE:tGcn9aIqR1c:yIl2AUoC8zA"><img src="http://feeds.feedburner.com/~ff/elandroidelibre?d=yIl2AUoC8zA" border="0" /></a> <a href="http://feeds.feedburner.com/~ff/elandroidelibre?a=Hgk9DTeSPeE:tGcn9aIqR1c:qj6IDK7rITs"><img src="http://feeds.feedburner.com/~ff/elandroidelibre?d=qj6IDK7rITs" border="0" /></a> <a href="http://feeds.feedburner.com/~ff/elandroidelibre?a=Hgk9DTeSPeE:tGcn9aIqR1c:I9og5sOYxJI"><img src="http://feeds.feedburner.com/~ff/elandroidelibre?d=I9og5sOYxJI" border="0" /></a>
</div>

<img src="http://feeds.feedburner.com/~r/elandroidelibre/~4/Hgk9DTeSPeE" height="1" width="1" />