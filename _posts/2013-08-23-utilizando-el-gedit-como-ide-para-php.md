---
id: 421
title: Utilizando el Gedit como IDE para PHP
date: 2013-08-23T00:40:00+00:00
author: ovalenzuela
layout: post
guid: https://ovalenzueladotcom.wordpress.com/2013/08/23/utilizando-el-gedit-como-ide-para-php
permalink: /2013/08/utilizando-el-gedit-como-ide-para-php.html
blogger_blog:
  - www.ovalenzuela.com
blogger_author:
  - Andrés Barrera
blogger_02f5be51301771664ae7c1c72bf29246_permalink:
  - 1228662004055782124
dsq_thread_id:
  - 3086968252
categories:
  - Desarrollo
  - Google
  - Hacks y Mods
---
Quienes desarrollamos con varios lenguajes, cada vez que nos toca trabajar con PHP, tenemos el inconveniente de no contar con una buena herramienta de desarrollo para edición, y si la hay, tal como Aptana o Netbeans, consumen tantos recursos que seguramente terminaremos usando el editor de texto para trabajar. Así es como llegue a completar una &#8220;jugosa&#8221; cantidad de recomendaciones para potenciar Gedit, el editor de texto de Gnome, como un IDE para PHP, por lo que sin más preámbulo, manos a la obra:

&#8211; Agregar los complementos para Gedit:

Gedit tiene varios complementos que en general no son muy conocidos, tanto porque vienen desactivados por defecto, como porque algunos en ciertas distribuciones hay que estar compilando e instalando a mano. Por suerte en Trisquel venían por defecto, así que le damos al APT-GET:

sudo apt-get install gedit-plugins libgnomeprint2.2-0 exuberant-ctags git gedit-developer-plugins libgnomeprintui2.2-0

Luego para dejar más amigable nuestro editor vamos a &#8220;Editar>Preferencias&#8221; y comenzamos la configuración. Lo primero será en la lengueta &#8220;Ver&#8221; deshabilitar la opción de backups o nos creará un archivo adicional por cada uno que usemos, una verdadera molestia, así que desmarcamos esa opción. Marcamos la opción para mostrar los números de linea, Resaltar la línea actual y Resaltar parejas de corchetes. En la siguiente lengüeta &#8220;Editor&#8221; marcamos &#8220;Activar sangría automática y Autoguardar cada 10 minutos. Y finalmente en la lengüeta &#8220;Complementos&#8221; marcamos &#8220;Completado de palabras&#8221;, &#8220;Completar paréntesis&#8221;, &#8220;Dibujar espacios&#8221;, &#8220;GDP Completions&#8221;, &#8220;GDP Find&#8221;, &#8220;GDP format&#8221;, &#8220;Herramientas externas&#8221;, &#8220;Lista de etiquetas&#8221;, &#8220;Panel del examinador de archivos&#8221; y &#8220;Recortes&#8221;. Es importante destacar que el autocompletar se ejecuta al escribir parte de una instrucción, y luego manteniendo presionado CTRL+Spacio. Y para gestionar los recortes, les invito a visitar la siguiente dirección:

<https://help.gnome.org/users/gedit/stable/gedit-plugins-snippets-guide.html.es>

Con esto ya contaremos con lo mínimo, así que ahora a agregar las nuevas opciones.

&#8211; Agregar PHP Beautifier:  
Suponiendo que ya contamos con Pear en nuestro sistema, después de todo se supone que desarrollamos en PHP, así que asumiremos que ya disponemos de este componente, procederemos a instalar PHP Beautifier, el que es un componente que dejará tu código hermosamente programado.

sudo pear install PHP_Beautifier-0.1.15

Una vez instalado, deberemos agregar el comando para que se ejecute en forma automática en Gedit con una simple combinación de teclas, para lo cual vamos a &#8220;Herramientas > Manejar herramientas externas&#8221; y en la ventana que se desplegará, agregamos una nueva entrada con el botón &#8220;+&#8221; y le ponemos al nombre &#8220;PHP Beautifier&#8221;, luego en las opciones usamos lo siguiente:

[<img class="size-full wp-image-365 aligncenter" src="http://ovalenzuela.com/wp-content/uploads/2013/08/gestionar_herramientas_externas.png" alt="gestionar_herramientas_externas" width="756" height="529" />](http://ovalenzuela.com/wp-content/uploads/2013/08/gestionar_herramientas_externas.png)

Y cerramos. Ahora podemos probar creando una clase a la pinta y luego ver el resultado al ejecutar el comando presionando al mismo tiempo &#8220;CTRL+Shift+b&#8221;:

[<img class="size-full wp-image-364 aligncenter" src="http://ovalenzuela.com/wp-content/uploads/2013/08/ejecucion_phpbeautifier.png" alt="ejecucion_phpbeautifier" width="590" height="266" />](http://ovalenzuela.com/wp-content/uploads/2013/08/ejecucion_phpbeautifier.png)

 

&#8211; Symbol Browser para Gedit3

Otro componente realmente espectacular es Symbol Browser que ahora que Gedit usa mayormente Python, fue reprogramado y se llama Source Code Browser, por lo que para instalar es bastante más sencillo de lo que anteriormente era instalar Symbol Browser. Para disponer entonces de este componente solo necesitaremos seguir las siguientes instrucciones:

cd  
git clone git://github.com/Quixotix/gedit-source-code-browser.git  
cd gedit-source-code-browser/  
mkdir -p ~/.local/share/gedit/plugins/  
mv sourcecodebrowser* ~/.local/share/gedit/plugins/

[<img class="size-full wp-image-370 aligncenter" src="http://ovalenzuela.xpertians.com/wp-content/uploads/2013/08/class_browser.png" alt="class_browser" width="526" height="154" />](http://ovalenzuela.xpertians.com/wp-content/uploads/2013/08/class_browser.png)

Ahora bien, el componente tiene algunas funcionalidades adicionales, que por defecto no estarán disponibles, por lo que para usar estas opciones deberemos compilar el esquema:

sudo su  
cd /home/ovalenzuela/.local/share/gedit/plugins/sourcecodebrowser/data/  
cp org.gnome.gedit.plugins.sourcecodebrowser.gschema.xml /usr/share/glib-2.0/schemas/  
glib-compile-schemas /usr/share/glib-2.0/schemas/

Por supuesto reemplazando donde sale mi usuario &#8220;ovalenzuela&#8221; por el que corresponde al usuario con que trabajas, si no lo conoces, un comando &#8220;id&#8221; te lo dirá, obviamente deben ejecutarlo antes de comenzar con el sudo su, o te dirá que eres root.