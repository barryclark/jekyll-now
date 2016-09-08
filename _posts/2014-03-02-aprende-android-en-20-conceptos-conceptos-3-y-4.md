---
id: 176
title: 'Aprende Android en 20 conceptos: Conceptos 3 y 4'
date: 2014-03-02T05:39:00+00:00
author: ovalenzuela
layout: post
guid: https://ovalenzueladotcom.wordpress.com/2014/03/02/aprende-android-en-20-conceptos-conceptos-3-y-4
permalink: /2014/03/aprende-android-en-20-conceptos-conceptos-3-y-4.html
blogger_blog:
  - www.ovalenzuela.com
blogger_author:
  - Andrés Barrera
blogger_02f5be51301771664ae7c1c72bf29246_permalink:
  - 2151716100943836819
dsq_thread_id:
  - 4872395901
categories:
  - Google
---
[<img class="size-full wp-image-127338 aligncenter" alt="android desarrollo" src="http://www.elandroidelibre.com/wp-content/uploads/2014/02/android-desarrollo.jpg" width="614" height="425" />](http://www.elandroidelibre.com/wp-content/uploads/2014/02/android-desarrollo.jpg)

 

Como cada semana, hoy toca nueva sección de <a title="Aprende Android en 20 conceptos" href="http://www.elandroidelibre.com/tag/20conceptos" target="_blank">Aprende Android en 20 conceptos</a>.

La semana pasada vimos <a title="Aprende Android en 20 conceptos: Conceptos 1 y 2" href="http://www.elandroidelibre.com/2014/02/aprende-android-en-20-conceptos-conceptos-1-y-2.html" target="_blank">los fundamentos de una aplicación y los diferentes tipos de recursos</a> que podíamos tener en una aplicación Android. **Hoy pasamos a uno de los componentes de una aplicación (las actividades) y a sus homólogos (los fragmentos)**, fundamentales especialmente desde que Android se metió de lleno en las tablets, a partir de su versión 3.0 (Honeycomb).

## 3. <a title="Activities" href="http://developer.android.com/guide/components/activities.html" target="_blank">La clase Activity</a>

Una _Actividad_ es uno de los componentes de una aplicación, concretamente el encargado de ofrecer una **pantalla** **con la que los usuarios pueden interactuar**, con el único objetivo de hacer algo. Es por ello que **lleva asociada una interfaz de usuario.**

De hecho, una aplicación suele estar compuesta por varias actividades que están vinculadas unas a otras de alguna forma. Generalmente, toda aplicación tiene una actividad considerada la **actividad principal** (_main_), la cual es la que se muestra al usuario cuando se abre la aplicación por primera vez.

Como desarrolladores, podremos lanzar nuevas actividades desde otras actividades, de tal forma que la _actividad lanzadora_ es pausada, pero el sistema la mantiene en memoria en una cola denominada **_back_ _stack_**. Básicamente esta cola consiste en una **cola tipo LIFO **(Last In, First Out), o lo que es lo mismo, la última actividad que fue añadida, será la primera en la cola. Así, cuando el usuario pulse el botón atrás (_Back_), el sistema nos quitará la actividad actual y nos mostrará justo la anterior en la cola, aunque este comportamiento por defecto puede ser modificado según nuestro interés.

[<img class="size-full wp-image-129462 aligncenter" alt="activity 1" src="http://www.elandroidelibre.com/wp-content/uploads/2014/03/activity-1.png" width="409" height="319" />](http://www.elandroidelibre.com/wp-content/uploads/2014/03/activity-1.png)

[<img class="size-full wp-image-129475 aligncenter" alt="activity 13" src="http://www.elandroidelibre.com/wp-content/uploads/2014/03/activity-13.png" width="515" height="172" />](http://www.elandroidelibre.com/wp-content/uploads/2014/03/activity-13.png)

Varias actividades pertenecerán a una tarea (**task**), la cual se define como un conjunto de actividades destinados a un trabajo determinado. A nivel de Manifest podemos gestionas las tareas, con la definición de algunos atributos (_taskAffinity, launchMode, allowTaskReparenting, clearTaskOnLaunch, alwaysRetainTaskState, finishOnTaskLaunch)_ y _flags _o banderas (_FLAG\_ACTIVITY\_NEW\_TASK, FLAG\_ACTIVITY\_CLEAR\_TOP, FLAG\_ACTIVITY\_SINGLE_TOP_), de los cuales puedes consultar más información en la documentación.

Sin embargo, el **comportamiento por defecto **se puede entender bastante bien en este ejemplo:

  * La Actividad A lanza B
  * A para y guarda su estado
  * Le damos el botón _Home_
  * Se mantiene el estado de cada actividad en la tarea
  * Le damos a _Back_
  * La actividad actual de la sale de la pila backstack y se destruye

[<img class="aligncenter" alt="activity 14" src="http://www.elandroidelibre.com/wp-content/uploads/2014/03/activity-14.png" width="506" height="209" />](http://www.elandroidelibre.com/wp-content/uploads/2014/03/activity-14.png)

Como connotación final sobre la pila backstack, mencionar que **las actividades pueden ser instanciadas más de una vez**.

Para **crear una actividad**, basta con que creemos una clase que herede de la clase **Activity**. Además de heredar de esta clase, deberemos sobreescribir algunos métodos que pertenecen al **ciclo de vida de la actividad**. Este ciclo de vida consiste en los diferentes estados por los que puede pasar una actividad y los métodos que nos permiten cambiar de un estado a otro. De este modo, **podemos distinguir los siguientes estados**:

  * **_Resumed_**: En este estado, la actividad está en primer plano para el sistema
  * _**Paused**:_ La actividad está aún visible, pero el foco está en otro componente que está por encima de ésta
  * **_Stopped_**: La actividad aún está viva, pero está totalmente oculta

[<img class="size-full wp-image-129463 aligncenter" alt="activity 2" src="http://www.elandroidelibre.com/wp-content/uploads/2014/03/activity-2.png" width="588" height="257" />](http://www.elandroidelibre.com/wp-content/uploads/2014/03/activity-2.png)

De esta forma, podemos **distinguir 3 procesos principales en la actividad:**

  * **Tiempo de vida completo: **Entre _onCreate _y _onDestroy_
  * **Tiempo de vida visible: **Entre _onStart_ y _onStop_
  * **Tiempo de vida en primer plano: **Entre _onResume _ y _onPause_

Tal como he comentado, en los cambios de un estado a otro, la actividad irá ejecutando una serie de métodos. Estos métodos son los considerados pertenecientes al ciclo de vida de la misma. Para nosotros, **los dos más importantes son:**

  * **_onCreate_**: El sistema llama este método al iniciar una actividad, y en él deberemos iniciar todos los componentes de la actividad. Además, este método deberá llamar siempre al método **_setContentView_**, encargado de cargar la interfaz gráfica (un recurso _layout_, indicado a través de su ID) que la actividad utilizará.
  * **_onPause_**: Es el primer método que se llama cuando el usuario está abandonando la actividad. Es el método donde deberemos guardar todos los cambios que queramos que sean persistentes cuando el usuario abandone esta pantalla.

Pero cuando queremos optimizar nuestra aplicación, deberemos sobreescribir también otros métodos del ciclo de vida, los cuales son:

[<img class="size-full wp-image-129466 aligncenter" alt="activity 4" src="http://www.elandroidelibre.com/wp-content/uploads/2014/03/activity-4.png" width="396" height="509" />](http://www.elandroidelibre.com/wp-content/uploads/2014/03/activity-4.png) [<img class="size-full wp-image-129467 aligncenter" alt="activity 5" src="http://www.elandroidelibre.com/wp-content/uploads/2014/03/activity-5.png" width="441" height="441" />](http://www.elandroidelibre.com/wp-content/uploads/2014/03/activity-5.png)

Para **terminar una actividad**, basta con que llamemos al método _**finish**._

**Como componente de una aplicación que es, la actividad deberá ser registrada en el fichero Manifest**. Para ello, utilizaremos la etiqueta _****_** **dentro de la etiqueta **<_application_>_._ **Además, dentro de la actividad, podremos declarar todos los _****_** **que queramos, para identificar nuestra actividad y las acciones que puede realizar. Como ejemplo básico, la actividad considerada **main**, deberá llevar la categoría **LAUNCHER **y la acción **MAIN**:

[<img class="size-full wp-image-129465 aligncenter" alt="activity 3" src="http://www.elandroidelibre.com/wp-content/uploads/2014/03/activity-3.png" width="514" height="298" />](http://www.elandroidelibre.com/wp-content/uploads/2014/03/activity-3.png)

Llegados este punto, sabemos definir una actividad, incluirla en el Manifest e, incluso, establecerla como la actividad principal. Pero ¿**cómo lanzar una actividad?** Para ello tenemos dos posibles formas, pero siempre mediante el uso de **Intent  **y el método **_startActivity_**:

  * **Implícita: **Sabemos qué actividad vamos a lanzar, y suele ser una perteneciente a nuestra propia aplicación

[<img class="size-full wp-image-129468 aligncenter" alt="activity 6" src="http://www.elandroidelibre.com/wp-content/uploads/2014/03/activity-6.png" width="400" height="42" />](http://www.elandroidelibre.com/wp-content/uploads/2014/03/activity-6.png)

  * **Explícita: **Sabemos la funcionalidad que queremos hacer, pero al no conocer qué actividades pueden hacerlo (de nuestra aplicación o de otras), delegamos en el sistema operativo. Éste, según sus categorías, acciones… buscará las posibilidades y nos la dará a elegir. ¿Cómo distingue el sistema entre todas sus actividades? Pues precisamente mediante el uso de los _ _que hemos mencionado anteriormente.

[<img class="aligncenter" alt="activity 7" src="http://www.elandroidelibre.com/wp-content/uploads/2014/03/activity-7.png" width="430" height="72" />](http://www.elandroidelibre.com/wp-content/uploads/2014/03/activity-7.png)

Además, podemos necesitar **lanzar una actividad pero esperar un resultado para volver a nuestra actividad previa**. Para ello, en lugar de _startActivity_ utilizaremos **_startActivityForResult_**_. _De esta forma, podremos registrar los resultados que nosotros deseemos y nuestra actividad previa estará esperando a uno de estos resultados para lanzar alguna funcionalidad específica:

[<img class="size-full wp-image-129470 aligncenter" alt="activity 8" src="http://www.elandroidelibre.com/wp-content/uploads/2014/03/activity-8.png" width="400" height="205" />](http://www.elandroidelibre.com/wp-content/uploads/2014/03/activity-8.png) [<img class="size-full wp-image-129471 aligncenter" alt="activity 9" src="http://www.elandroidelibre.com/wp-content/uploads/2014/03/activity-9.png" width="507" height="221" />](http://www.elandroidelibre.com/wp-content/uploads/2014/03/activity-9.png)

Y **¿qué ocurre cuando una actividad es pausada pero aún no destruida?** Para ello, podemos hacer uso del salvado de estado de la actividad, sobreescribiendo el método **onSaveInstanceState**, gracias al cual podremos salvar todos aquellos datos que queramos, y serán recuperados al restaurar la actividad:

[<img class="size-full wp-image-129472 aligncenter" alt="activity 10" src="http://www.elandroidelibre.com/wp-content/uploads/2014/03/activity-10.png" width="550" height="303" />](http://www.elandroidelibre.com/wp-content/uploads/2014/03/activity-10.png)

Otras cosas que podemos hacer con la actividad es **registrar cambios en la misma**, tales como cambios de orientación, del estado del teclado, de idioma.. Para ello haremos uso del método **onConfigurationChanged**:

[<img class="size-full wp-image-129473 aligncenter" alt="activity 11" src="http://www.elandroidelibre.com/wp-content/uploads/2014/03/activity-11.png" width="499" height="189" />](http://www.elandroidelibre.com/wp-content/uploads/2014/03/activity-11.png)

Pero **este método sólo se disparará ante los eventos que hayamos registrado en el Manifest**, mediante el atributo _**android:configChanges.**_** **A continuación puedes ver un ejemplo de registro de eventos de teclado y de orientación del dispositivo:**   
** 

[<img class="size-full wp-image-129474 aligncenter" alt="activity 12" src="http://www.elandroidelibre.com/wp-content/uploads/2014/03/activity-12.png" width="486" height="70" />](http://www.elandroidelibre.com/wp-content/uploads/2014/03/activity-12.png)

Por último, mencionar que podemos hacer uso de los **Loaders**, cuando queramos poder precargar de forma asíncrona (tanto en actividades como en fragmentos) información proveniente de algún ContentProvider.

En el siguiente <a title="Managing the Activity Lifecycle" href="http://developer.android.com/training/basics/activity-lifecycle/index.html" target="_blank">enlace</a> tenéis **un ejemplo perfecto completo para comprender mejor las actividades y sus ciclos de vida**.

## 4. <a title="Fragments" href="http://developer.android.com/guide/components/fragments.html" target="_blank">La clase Fragment</a><a title="Activities" href="http://developer.android.com/guide/components/activities.html" target="_blank"><br /> </a>

Con la llegada de las **tablets**, las actividades parecían no satisfacer todas las necesidades que éstas traían consigo. ¿Por qué? La respuesta es sencilla: ahora tenemos más pantalla para mostrar más datos, pero no nos gustaría tener que rehacer el código haciendo actividades totalmente nuevas. Con toda esta idea, surge el concepto **fragmento** desde **Android HoneyComb 3.0 (API 11)**.

**Un fragmento representa una porción de interfaz de usuario o un comportamiento en una actividad.** De esta forma, podemos combinar varios fragmentos en una única actividad, de tal forma que podemos crear un panel multi interfaz y reusar un fragmento en diferentes actividades. ¿Quién no ha visto el típico caso de datos maestro (izquierda) – esclavo (derecha) en una tablet, que en su versión móvil son dos pantallas independientes, la cual la primera nos lleva a la segunda?

[<img class="size-full wp-image-129478 aligncenter" alt="fragment 1" src="http://www.elandroidelibre.com/wp-content/uploads/2014/03/fragment-1.png" width="409" height="234" />](http://www.elandroidelibre.com/wp-content/uploads/2014/03/fragment-1.png)

**Un fragmento debe siempre ser incluido en una actividad, y su ciclo de vida está totalmente relacionado con el ciclo de vida de la actividad que lo contiene**. De esta forma, por ejemplo, si una actividad es pausada, todos sus fragmentos lo serán también.

He comentado que los fragmentos fueron incluidos en HoneyComb, pero han resultado ser tan trascendentales, que Google nos ha facilitado una <a title="Support Library" href="http://developer.android.com/tools/support-library/index.html" target="_blank"><strong>librería de retrocompatibilidad</strong></a>, de modo que podamos usar los fragmentos en versiones anteriores, si deseamos que nuestra aplicación sea compatible (por ejemplo, con Gingerbread).

La transición de fragmentos dentro de una actividad se hace por medio de _**fragment** **transaction**__**,**_** **las cuales podemos añadir a la cola **backstack** de nuestra actividad. De esta forma, mediante el uso del botón _Back_** **podremos deshacer una transacción de fragmentos y volver a uno anterior, muy similar a como hacíamos con la gestión de la cola en las actividades.**   
** 

De todas formas, para gestionar los fragmentos dispondremos de diferentes métodos, tanto para encontrar  un fragmento concreto (_**findFragmentById /** **findFragmentByTag**_) o para gestionar la cola backstack (_**popBackStack**_  -el cual permite deshacer un cambio del backstack-/_ **addOnBackStackChangedListener**_)****_**.**_

Hemos hablado de que **los fragmentos tienen su propio ciclo de vida, pero íntimamente relacionado con el de su actividad contenedora.** Si bien esto es cierto, hay que decir que el ciclo de vida es muy similar al de la actividad, pero con **ligeras diferencias**. En el caso de los fragmentos, la inicialización de la interfaz gráfica o layout se hará en el método _**onCreateView,**_** ** y no será llamando al método _setContentView, _sino que el objeto de la clase _View _que devuelva _onCreateView _ será el objeto que se mostrará como interfaz gráfica. Para ello haremos uso de un _inflater._

[<img class="size-full wp-image-129479 aligncenter" alt="fragment 2" src="http://www.elandroidelibre.com/wp-content/uploads/2014/03/fragment-2.png" width="220" height="551" />](http://www.elandroidelibre.com/wp-content/uploads/2014/03/fragment-2.png)

**Los métodos que permiten coordinar el ciclo de vida de un fragmento con una actividad **son:

  * _onAttach: _Llamado cuando el fragmento ha sido asociado con la actividad
  * _onCreateView: _Llamado para crear la vista asociada con el fragmento
  * _onActivityCreated: _Llamado cuando termine el método _onCreate_ de la actividad
  * _onDestroyView: _Llamado cuando se elimina la vista asociada al fragmento
  * _onDetach: _Llamado cuando el fragmento está siendo eliminado de la actividad

No obstante, en todo momento tendremos acceso a la actividad contenedora de un fragmento mediante la llamada al método **_getActivity_.**

Otra opción muy importante es cuando queremos que un fragmento ejecute cierta funcionalidad asociada a la actividad, que desconoce y tan sólo quiere delegar en la actividad e indicarle que debe ejecutarla. Para ello haremos uso de _**callbacks.**_** **Un callback nos permite implementar una interfaz con nuestra actividad, y obtener una instancia de esa actividad implementada en nuestro fragmento y que sea este objeto quien llame a la funcionalidad en cuestión, la cual pertenecerá a la actividad.

**Los fragmentos tendrán los mismos estados que las actividades: **_resumed, paused, stopped._

[<img class="size-full wp-image-129480 aligncenter" alt="fragment 3" src="http://www.elandroidelibre.com/wp-content/uploads/2014/03/fragment-3.png" width="275" height="538" />](http://www.elandroidelibre.com/wp-content/uploads/2014/03/fragment-3.png)

Puesto que los fragmentos no son componentes de una aplicación, **éstos no deben ser declarados en el Manifest**. Pero, **¿cómo añadimos un fragmento a una actividad?** Para ello, tenemos **dos opciones**:

  * Declarando el fragmento de **manera estática** en el layout de una actividad

[<img class="size-full wp-image-129481 aligncenter" alt="fragment 4" src="http://www.elandroidelibre.com/wp-content/uploads/2014/03/fragment-4.png" width="477" height="276" />](http://www.elandroidelibre.com/wp-content/uploads/2014/03/fragment-4.png)

  * Añadiendo **dinámicamente** en código el fragmento a un objeto ViewGroup existente

[<img class="aligncenter" alt="fragment 5" src="http://www.elandroidelibre.com/wp-content/uploads/2014/03/fragment-5.png" width="559" height="163" />](http://www.elandroidelibre.com/wp-content/uploads/2014/03/fragment-5.png)

Por último, mencionar que Google, para hacernos las cosas más fáciles, nos ofrece algunos **fragmentos particulares ya creados**, de tal forma que nos resulta mucho más fácil desarrollar cierta funcionalidad. Entre ellos, encontramos:

  * _DialogFragment: _Es un fragmento que nos permite mostrar un diálogo
  * _ListFragment: _Fragmento para gestionar una lista de vistas que se repiten. Perfecto para cualquier lista
  * _PreferenceFragment: _Fragmento para gestionar preferencias de la aplicación. Hay que remarcar que este tipo de fragmento no está incluido dentro de los compatibles en la librería de retrocompatibilidad, por lo que no podremos hacer uso de ellos en versiones anteriores a Honeycomb.

Al igual que las actividades, la mejor forma de comprender los fragmentos es **un ejemplo completo de cómo funcionan**, el cual podéis encontrar <a title="Building a dynamic UI with Fragments" href="http://developer.android.com/training/basics/fragments/index.html" target="_blank">aquí</a>.

Con esto damos por terminada la sección por hoy, habiendo explicado cómo funcionan las pantallas que vemos en una aplicación, ya sean completas (actividades) o parciales (fragmentos). **El uso de estos dos conceptos es vital para el desarrollo de una buena aplicación, especialmente el conocimiento de sus ciclos de vida**. Llegará un punto que un _setContentView, _un _onResume_, etc… será más normal para vosotros que muchas cosas casi vitales de la vida misma.

**¿Con ganas de más conceptos?**

> <a title="Aprende Android en 20 conceptos" href="http://www.elandroidelibre.com/tag/20conceptos" target="_blank">Ver la sección Aprende Android en 20 conceptos</a>

El artículo [Aprende Android en 20 conceptos: Conceptos 3 y 4](http://www.elandroidelibre.com/2014/03/aprende-android-en-20-conceptos-conceptos-3-y-4.html) se publicó en [El Androide Libre](http://www.elandroidelibre.com) (El Blog Android de referencia. Aplicaciones, noticias, Juegos y smartphones Android Libres)


<img width="1" height="1" src="http://rss.feedsportal.com/c/34005/f/617036/s/37b0155f/sc/5/mf.gif" border="0" /> 

<div>
  <table border='0'>
    <tr>
      <td valign='middle'>
        <a href="http://share.feedsportal.com/share/twitter/?u=http%3A%2F%2Fwww.elandroidelibre.com%2F2014%2F03%2Faprende-android-en-20-conceptos-conceptos-3-y-4.html&t=Aprende+Android+en+20+conceptos%3A+Conceptos+3+y+4" target="_blank"><img src="http://res3.feedsportal.com/social/twitter.png" border="0" /></a> <a href="http://share.feedsportal.com/share/facebook/?u=http%3A%2F%2Fwww.elandroidelibre.com%2F2014%2F03%2Faprende-android-en-20-conceptos-conceptos-3-y-4.html&t=Aprende+Android+en+20+conceptos%3A+Conceptos+3+y+4" target="_blank"><img src="http://res3.feedsportal.com/social/facebook.png" border="0" /></a> <a href="http://share.feedsportal.com/share/linkedin/?u=http%3A%2F%2Fwww.elandroidelibre.com%2F2014%2F03%2Faprende-android-en-20-conceptos-conceptos-3-y-4.html&t=Aprende+Android+en+20+conceptos%3A+Conceptos+3+y+4" target="_blank"><img src="http://res3.feedsportal.com/social/linkedin.png" border="0" /></a> <a href="http://share.feedsportal.com/share/gplus/?u=http%3A%2F%2Fwww.elandroidelibre.com%2F2014%2F03%2Faprende-android-en-20-conceptos-conceptos-3-y-4.html&t=Aprende+Android+en+20+conceptos%3A+Conceptos+3+y+4" target="_blank"><img src="http://res3.feedsportal.com/social/googleplus.png" border="0" /></a> <a href="http://share.feedsportal.com/share/email/?u=http%3A%2F%2Fwww.elandroidelibre.com%2F2014%2F03%2Faprende-android-en-20-conceptos-conceptos-3-y-4.html&t=Aprende+Android+en+20+conceptos%3A+Conceptos+3+y+4" target="_blank"><img src="http://res3.feedsportal.com/social/email.png" border="0" /></a>
      </td>
      
      <td valign='middle'>
      </td>
    </tr>
  </table>
</div>

[<img src="http://da.feedsportal.com/r/186531272443/u/49/f/617036/c/34005/s/37b0155f/sc/5/rc/1/rc.img" border="0" />](http://da.feedsportal.com/r/186531272443/u/49/f/617036/c/34005/s/37b0155f/sc/5/rc/1/rc.htm)  
[<img src="http://da.feedsportal.com/r/186531272443/u/49/f/617036/c/34005/s/37b0155f/sc/5/rc/2/rc.img" border="0" />](http://da.feedsportal.com/r/186531272443/u/49/f/617036/c/34005/s/37b0155f/sc/5/rc/2/rc.htm)  
[<img src="http://da.feedsportal.com/r/186531272443/u/49/f/617036/c/34005/s/37b0155f/sc/5/rc/3/rc.img" border="0" />](http://da.feedsportal.com/r/186531272443/u/49/f/617036/c/34005/s/37b0155f/sc/5/rc/3/rc.htm)

[<img src="http://da.feedsportal.com/r/186531272443/u/49/f/617036/c/34005/s/37b0155f/a2.img" border="0" />](http://da.feedsportal.com/r/186531272443/u/49/f/617036/c/34005/s/37b0155f/a2.htm)
<img width="1" height="1" src="http://pi.feedsportal.com/r/186531272443/u/49/f/617036/c/34005/s/37b0155f/a2t.img" border="0" /> 

<div>
  <a href="http://feeds.feedburner.com/~ff/elandroidelibre?a=r7TlZmjWoQs:mgzdbIC57Rg:ecdYMiMMAMM"><img src="http://feeds.feedburner.com/~ff/elandroidelibre?d=ecdYMiMMAMM" border="0" /></a> <a href="http://feeds.feedburner.com/~ff/elandroidelibre?a=r7TlZmjWoQs:mgzdbIC57Rg:V_sGLiPBpWU"><img src="http://feeds.feedburner.com/~ff/elandroidelibre?i=r7TlZmjWoQs:mgzdbIC57Rg:V_sGLiPBpWU" border="0" /></a> <a href="http://feeds.feedburner.com/~ff/elandroidelibre?a=r7TlZmjWoQs:mgzdbIC57Rg:7Q72WNTAKBA"><img src="http://feeds.feedburner.com/~ff/elandroidelibre?d=7Q72WNTAKBA" border="0" /></a> <a href="http://feeds.feedburner.com/~ff/elandroidelibre?a=r7TlZmjWoQs:mgzdbIC57Rg:dnMXMwOfBR0"><img src="http://feeds.feedburner.com/~ff/elandroidelibre?d=dnMXMwOfBR0" border="0" /></a> <a href="http://feeds.feedburner.com/~ff/elandroidelibre?a=r7TlZmjWoQs:mgzdbIC57Rg:yIl2AUoC8zA"><img src="http://feeds.feedburner.com/~ff/elandroidelibre?d=yIl2AUoC8zA" border="0" /></a> <a href="http://feeds.feedburner.com/~ff/elandroidelibre?a=r7TlZmjWoQs:mgzdbIC57Rg:qj6IDK7rITs"><img src="http://feeds.feedburner.com/~ff/elandroidelibre?d=qj6IDK7rITs" border="0" /></a> <a href="http://feeds.feedburner.com/~ff/elandroidelibre?a=r7TlZmjWoQs:mgzdbIC57Rg:I9og5sOYxJI"><img src="http://feeds.feedburner.com/~ff/elandroidelibre?d=I9og5sOYxJI" border="0" /></a>
</div>

<img src="http://feeds.feedburner.com/~r/elandroidelibre/~4/r7TlZmjWoQs" height="1" width="1" />