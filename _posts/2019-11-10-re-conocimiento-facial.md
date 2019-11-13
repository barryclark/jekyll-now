---
title: Reconocimiento Facial
layout: post
author: dactrtr
titledesc: Como burlar a los robots
feature: https://media.giphy.com/media/rQG7d0Tzau6wo/source.gif
---

## Nos estan mirando

---

**disclaimer:** *este post probablemente tenga un montón de información ñoña, **jargon** y **mumbo jumbo**, pero el conocimiento es lo necesario para poder entender y **burlar** algunas cosas.*

---

A estas alturas del partido todos sabemos que es el reconocimiento facial, lo hemos visto en series, películas, usado en nuestras cámaras e incluso usado para desbloquear nuestro teléfono. *¿Me dices que mi teléfono reconoce mi cara o que la detecta?* ah! muy buena pregunta.

## ¿Detección o Reconocimiento? 

**Si**, **no** es lo mismo, pero una es fundamental para la otra. Lo que hace nuestra cámara al momento de sacar una foto es **detectar** un rostro, esto significa que busca **patrones reconocibles** como ojos, nariz, boca en todo ese espacio negativo en tu rostro *por el exceso de pizzas de la semana pasada*, mediante una serie de pruebas, en una especie de arbol de desiciones, en la que se van buscando estos rasgos en rectangulos de zonas definidas, hasta decir, si, esta es una cara. Este proceso es un algoritmo conocido como 📼[Algoritmo Viola Jones](https://www.youtube.com/watch?v=uEJ71VlUmMQ) y es tan efectivo que se sigue usando por sobre usar **Deep Learning** o **Machine Learning** o alguna otra **Cosa Learning**.

 Una vez que se ha detectado una cara empieza el proceso de **reconocimiento**, les suena común, obvio es lo que hacemos siempre para reconocer a nuestros amigos cuando nos dicen *voy llegando*. Al fin del día los algoritmos son las versiones *matematizadas* de los procesos que hacemos día a día, la habilidad de reconocer y ver rostros es algo que como humanos llevamos <s>años</s> siglos haciendo, si también estoy pensando en esa tostada que me comí en la mañana que tenía la cara de <s>Karol Dance</s> Kike Morandé (chúpalo).

<iframe width="560" height="315" src="https://www.youtube.com/embed/t4DT3tQqgRM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

> " I think my blackness is interfiring with..."

HP COMPUTERS ARE RACIST

Al día de hoy esta tecnología a avanzado mucho desde sus inicios y esta full integrada a nuestras vidas. No, [no voy](https://www.welivesecurity.com/la-es/2015/08/27/tecnologia-de-reconocimiento-facial/) a [hacer un post](https://medium.com/@spot_blog/una-breve-historia-del-reconocimiento-facial-vision-blog-5a76fdfe4865) latero con la historia del reconocimiento facial, ya mucha gente lo ha hecho, pero si una leve explicación de como funciona esta técnologia y como burlarla, solo porque me da una razón para escribir y usar gifs, 2 de mis 3 cosas favoritas.



**Aprendizaje** Si no pueden detectar tu cara no la pueden reconocer (obvio) y los gifs son bkns.

## ¿Cómo funciona?

### 2Dedos de frente

Cada cara tiene rasgos distintivos, digamos que parte de nuestro cerebro ha estado entrenado durante <s>años</s> siglos para hacer esto, si algunos somos mas malos que otros y confundimos gente, ya lo dije [no voy](https://www.wired.com/2012/01/brain-face-recognition/) a [divagar](https://www.smithsonianmag.com/science-nature/how-does-your-brain-recognize-faces-180963583/), pero [les dejo](https://www.bbc.com/future/article/20140730-why-do-we-see-faces-in-objects) algunos enlaces sobre [Pareidolia](https://es.wikipedia.org/wiki/Pareidolia).

<figure class="figimg">
   <img src="https://miro.medium.com/max/1500/0*Uaq5M_Vh35yI1i1I" alt="maths kids">
<figcaption>
"nunca voy a usar matemáticas fuera del colegio" si, caleta.
</figcaption>
</figure>

El software de reconocimiento facial reconoce estos rasgos, al igual que nosotros, solo que de una manera mucho más... si, lo adivinaste, **Matemáticas** esa cosa que juraste nunca mas usar después de cuarto medio y que **pensaste que era inútil**, hasta que te toco calcular el sueldo bruto, el líquido y el porcentaje de la isapre y otros robos con *fancy names*. El software reconoce ciertas carácteristicas como:

- Distancia entre los **ojos**.
- Ancho de la **nariz**.
- Profundidad de la **cavidad ocular**.
- La forma de las **mejillas**.
- El largo de la **mandídubla**.

Y un largo etcetéra, entre 60 a 80, rasgos faciales, lo se, estas pensando en ese filtro de **instagram** tan chistoso que hace que te veas como **Felipito** o te pone una **corona de flores**, eso es detección facial, lo que hace es "detectar una cara" no "detectar **tu** cara" (reconocimiento). 

Estas distancias son transformadas en una formula matemática y, si hay una base de datos, **las hay**, se hace una comparación y pum, según el poder de las matématicas, no es primera vez que pasas por este aeropuerto.

Cuando digo que hay **bases de datos** no es para volverse loco, pero, [Facebook tiene una base de datos muy grande](https://www.theguardian.com/technology/2019/aug/09/facebook-facial-recognition-lawsuit-can-proceed-us-court), y cada vez que etiquetan a un amigo o un amigo los etiqueta ayudan a esa base de datos a crecer y obtener mas presición, si, nosotros mismos hemos estado entrenando y mejorando estos algoritmos.

### El futuro es TRI-DI

Actualmente la moda, es el 3D, en vez de usar imágenes 2D se usan modelos 3D de la superficie de la cara, principalmente es como funciona **FaceId de Apple**, esta es la parte donde pelo el cable ya que es básicamente una 📼[Xbox Kinect](https://www.youtube.com/watch?v=uq9SEJxZiUg) en miniatura que usa cientos de *mini lasers* para generar un modelo 3D de tu rostro lo cual es mucho más preciso y *wow la wea bkn*.

<iframe width="560" height="315" src="https://www.youtube.com/embed/g4m6StzUcOw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

El **reconocimiento facial con 3D**, támbien se puede hacer a base de videos y funciona a tráves del analísis cuadro por cuadro de las facciones, básicamente es un analisis 2D muchas veces. 

Ambos sistemas funcionan a base de contrastes y bueno detección de ciertas carácteristicas faciales, **podría haber ahorrado todo lo anterior solo diciendo que el reconocimiento facial funciona a base de contrastes**, pero me gusta dar un poco más de detalles, lo cual nos lleva a la parte divertida.


## ¿Me ves? ya no! 👀

<figure class="figimg">
   <img src="https://media.giphy.com/media/fceh5CXz9mjHa/source.gif" alt="TINFOIL">
<figcaption>
TIN FOIL HAT ALWAYS DO THE JOB.
</figcaption>
</figure>

Y sabemos básicamente como funcionan la detección facial y el reconocimiento facial, como no somos un grupo de hackers que puede destruir las bases de datos de caras en el mundo, solo podemos apelar a evitar que detecten nuestras caras. 

#### Survivor Starter Kit

##### Usa un gorro y lentes de sol.

<figure class="figimg">
   <img src="https://media.giphy.com/media/U8MnmuVDpK264/source.gif" alt="error 404">
<figcaption>
"no puedo detectar humanos, all systems fails".
</figcaption>
</figure>

Además de evitar que esos **malignos robots te detecten** va justo adhoc con la temporada veraniega, si cambias los **lentes de sol** por antiparras, además de no ser detectado y capear el sol puedes **proteger tus ojos**.

##### Vuelve a tus raices EMO

<figure class="figimg">
   <img src="https://media.giphy.com/media/Tj7m9HrHaPmQE/source.gif" alt="">
<figcaption>
"weona volvió MCR"
"no y RATM?".
</figcaption>
</figure>

Si, **si vuelves a tu peinado emo** lograras tapar parte de tu cara y hacer que sea mas dificil de reconocer, **+10 stealth**, **+5 depression**, **+4 MCR**, **-15 mobility**. Además [MCR vuelve](https://www.distractify.com/p/is-my-chemical-romance-back-together) y que mejor momento de volver a tus raíces.

##### Maquillaje

<figure class="figimg">
   <img src="https://pbs.twimg.com/media/DhDrCwdVAAAwvEW?format=jpg&name=medium" alt="INSANE CLOWN POSE">
<figcaption>
Miracles!.
</figcaption>
</figure>

Así es usa maquillaje, pero con patrones que redefinan parte de tu cara, como es la mandíbula, las cejas, el puente de la nariz o usar el infalible [Juggalo](https://twitter.com/tahkion/status/1013304616958607360?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E1013304616958607360&ref_url=https%3A%2F%2Fconsequenceofsound.net%2F2019%2F07%2Fjuggalo-makeup-facial-recognition%2F) de 📼[Insane Clown pose](https://www.youtube.com/watch?v=8GyVx28R9-s) siempre puedes ser un poco mas expresiv@ y llevarlo al [siguiente nivel](https://cvdazzle.com/).

#### Survivor Profesional Kit

##### Ropa o accesorios con NIR LEDS

<figure class="figimg">
   <img src="https://www.survivopedia.com/wp-content/uploads/2016/04/goggles.jpg" alt="snapchat lens pro">
<figcaption>
google glass volvío.
</figcaption>
</figure>

Les dije esto es **PRO**, estamos hablando de lentes con luces **Near Infra Red**, que sobrecargan los censores de luz de las cámaras digitales, creando imágenes imposibles de usar para Reconocimiento Facial.

##### Ropa retro-reflectante

<figure class="figimg">
   <img src="https://www.survivopedia.com/wp-content/uploads/2016/04/android1.jpg" alt="snapchat lens basic">
<figcaption>
DAT STYLE.
</figcaption>
</figure>

No, no es una excusa para vestirse de chaqueta amarilla, pero si para usar unos lentes **ridículos**, pero altamente efectivos, funciona de la misma manera que las **tecno-antiparras** sobre cargando los sensores de luz.

Hay otros métodos como usar detectores de cámaras y otros artilugios dignos de <s>James Bond</s> Snake y que van mas de la onda de evadir en vez de burlar, onda muy paranoia *me leí todos los libros de [Mitnick](https://www.youtube.com/watch?v=K-96JmC2AkE)*.

Ahora les dejo la <s>discografía</s> **Bibliografía** y marcados con una pizza los articulos o videos interesantes.

### Bibliografía

- [How Facial recognition software works](https://us.norton.com/internetsecurity-iot-how-facial-recognition-software-works.html)
- [Facial Recognition](https://electronics.howstuffworks.com/gadgets/high-tech-gadgets/facial-recognition.htm)
- [6 ways to defeat facial recognition](https://www.survivopedia.com/6-ways-to-defeat-facial-recognition/)
- [Anti-Surveillance Camouflage for Your Face](https://www.theatlantic.com/technology/archive/2014/07/makeup/374929/)
- [Anti-facial recognition-makeup](https://www.popsci.com/read/anti-facial-recognition-makeup)
- [How to avoid facial recognition in public](https://www.technadu.com/how-to-avoid-facial-recognition-in-public/29462/)
- 🍕📼[Detecting Faces (Viola Jones Algortihm)](https://www.youtube.com/watch?v=uEJ71VlUmMQ&)
- 📼[How Face ID works... Probably](https://www.youtube.com/watch?v=mwTaISbA87A&)
- 🍕[How your brain recognize all those faces](https://www.smithsonianmag.com/science-nature/how-does-your-brain-recognize-faces-180963583/)
- [Why do we see faces in objects](https://www.bbc.com/future/article/20140730-why-do-we-see-faces-in-objects)
- 📼[How the kinect depth sensor works in 2 minutes](https://www.youtube.com/watch?v=uq9SEJxZiUg)
- 📼[12.1 What is the Kinect? - Kinect and Processing tutorial](https://www.youtube.com/watch?v=QmVNgdapJJM)

La sección de comentarios queda abierta para que dejen su odio, digan todas las tildes que no use y esas cosas clásicas del internet.

*siempre pienso en que debería tener alguna especie de despedida a lo truman show*