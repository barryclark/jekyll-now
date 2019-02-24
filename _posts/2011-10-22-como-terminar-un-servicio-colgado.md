---
layout: post
title: COMO TERMINAR UN SERVICIO COLGADO
date: 2011-10-22 12:13
author: agarciaizquierdo
comments: true
categories: [COMANDOS, SC QUERYEX, SERVICIO COLGADO, SERVICIOS, Sin categoría, WINDOWS 2003, WINDOWS 2008, WINDOWS 7]
---
Buenas, en este post voy a explicar como terminar con un servicio el cual se nos ha quedado "pillado", con el tipico "<b>stopping</b>" y que no hace nada, el método es sencillo, con un par de comandos lo tendremos funcionando.<br /><br /><ul><li>Primero deberemos saber el identificador del servicio (<b>PID</b>) del servicio. Para ello dependiendo de la version de nuestro sistema operativo podremos ir al administrador de tareas, e ir a la pestaña servicios, pero en el caso de que tengamos un Windows XP, por ejemplo, podemos ejecutar el siguiente comanado: <b>sc queryex &gt; c:\servicios.txt, </b>con esto mandaremos  a un archivo de texto todos nuestros servicios con su correspondiente <b>PID</b></li><li>Luego ejecutaremos el comando: <b>taskkill /PID xxxx /F </b>y tendremos nuestro servicio detenido totalmente y listo para volverlo a arrancar si lo creemos oportuno</li></ul><div>Un saludo!</div>
