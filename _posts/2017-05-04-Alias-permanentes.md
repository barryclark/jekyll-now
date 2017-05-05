---
layout: post
title: Alias permanentes
---

De los temas que más ha dificultado la implantación de linux en el escritorio es la necesidad de utilizar la línea de comandos para operaciones habituales. Sin embargo, esto gracias a la mejora de los entornos gráficos como Gnome o KDE esto cada vez en menos frecuente. No obstante, si queremos dedicarnos a la administración de sistemas no queda otra que utilizar comandos. Aunque una vez que se adquiere experiencia la dificultad no es recordar los comandos y su funcionalidad, si no la longitud que pueden adquirir dichas líneas.

Para ayudar a mejorar la curva de aprendizaje o para aligerar la longitud de las líneas a escribir, podemos hacer uso del comando llamado **alias**. Dicho comando lo que nos permite es renombrar la instrucción que queramos por la cadena que queramos.

Ejemplo:
    ``` bash
    alias actualizar =  'sudo apt update && sudo apt upgrade -y'
    ````

Si escribimos la línea anterior en consola, a partir de ese momento al escribir actualizar, actualizará los repositorios y paquetes de nuestro sistema (basado en) [Debian](https://www.debian.org/) sin pedir confirmación. Sin embargo, una vez que volvemos a encender nuestro ordenador dicho alias ya no existe. De modo que ¿es necesario definir los alais cada vez que queramos usarlos? Afortunadamente no, ya que en ese caso no ganaríamos mucho con este comando. Si queremos hacerlo permanente hay que añadir el ejemplo anterior al final del archivo **~/.bashrc**. Hay que recordar que **~** indica nuestra carpeta personal.

    ``` bash
    # Definiion de alias
    alias actualizar = 'sudo apt update && sudo apt upgrade -y'
    alias limpiar = 'sudo apt autoclean && sudo apt autoremove -y'
    ```

En el ejemplo anterior la primera línea comienza por # porque queremos que sea un comentario.

De esta forma tan sencilla ya podemos definir todos los alias permanentens que queramos.
