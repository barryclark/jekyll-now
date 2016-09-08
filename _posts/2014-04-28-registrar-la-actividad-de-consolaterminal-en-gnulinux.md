---
id: 120
title: Registrar la actividad de consola/terminal en GNU/Linux
date: 2014-04-28T16:43:00+00:00
author: ovalenzuela
layout: post
guid: https://ovalenzueladotcom.wordpress.com/2014/04/28/registrar-la-actividad-de-consolaterminal-en-gnulinux
permalink: /2014/04/registrar-la-actividad-de-consolaterminal-en-gnulinux.html
blogger_blog:
  - www.ovalenzuela.com
blogger_author:
  - Andrés Barrera
blogger_02f5be51301771664ae7c1c72bf29246_permalink:
  - 780961830616375106
dsq_thread_id:
  - 4690876178
categories:
  - GNU con Linux
  - Google
  - Hacks y Mods
---
En muchas ocasiones se requiere guardar registro de lo que uno mismo u otras personas que tienen acceso a la misma cuenta ejecutan en la consola, y aunque sabía que podía hacerse en GNU/Linux no recordaba el comando que increíblemente se llama &#8220;_script_&#8220;, pero es bastante útil para usar en las ocasiones en que compartimos la misma cuenta con otra persona o simplemente para monitorear su actividad, aunque claro, puede ser en extremo peligroso si ejecutamos comandos incluyendo directamente una contraseña, así que como siempre **OJO PIOJO!**

Por ejemplo, para usarlo simplemente nos conectamos a nuestra consola, y ejecutamos el comando &#8220;_script_&#8220;, luego podemos tipear lo que se nos antoje y finalmente nos desconectamos: 

<pre style="color:#000000;"><br />[ovalenzuela@localhost ~]$ script<br /> Script iniciado; el fichero es typescript<br /> [ovalenzuela@localhost ~]$ echo hola<br /> hola<br /> [ovalenzuela@localhost ~]$ w<br /> 11:59:55 up 15 min, 3 users, load average: 0,06, 0,25, 0,24<br /> USER TTY LOGIN@ IDLE JCPU PCPU WHAT<br /> ovalenzu :0 11:45 ?xdm? 2:56 0.16s gdm-session-worker [pam/gdm-pas<br /> ovalenzu pts/0 11:51 3.00s 0.06s 0.00s script<br /> ovalenzu pts/1 11:59 3.00s 0.02s 0.00s w<br /> [ovalenzuela@localhost ~]$ exit<br /> exit<br /></pre>

Script terminado; el fichero es typescript  
Como puede apreciarse, el uso de &#8220;_script_&#8221; es bastante simple, y todo fue guardado en un archivo de texto llamado &#8220;_typescript_&#8221; que quedará almacenado en nuestro &#8220;_home_&#8220;, el cual puede ser consultado con el comando &#8220;_more_&#8220;:

<pre style="color:#000000;"><br />[ovalenzuela@localhost ~]$ more typescript<br /><br />Script iniciado (lun 28 abr 2014 11:59:52 CLT<br />)<br />[ovalenzuela@localhost ~]$ echo hola<br />hola<br />[ovalenzuela@localhost ~]$ w<br />11:59:55 up 15 min, 3 users, load average: 0,06, 0,25, 0,24<br />USER TTY LOGIN@ IDLE JCPU PCPU WHAT<br />ovalenzu :0 11:45 ?xdm? 2:56 0.16s gdm-session-worker [pam/gdm-pas<br />ovalenzu pts/0 11:51 3.00s 0.06s 0.00s script<br />ovalenzu pts/1 11:59 3.00s 0.02s 0.00s w<br />[ovalenzuela@localhost ~]$ exit<br />exit<br /><br />Script terminado (lun 28 abr 2014 11:59:57 CLT<br />)<br /></pre>

Como se despliega, todo lo que se ejecuto en la sesión de la terminal queda guardado, el contenido es agregado al final del archivo cada vez que se inicia el registro. Ahora, normalmente se usa el nombre de archivo &#8220;_typescript_&#8220;, pero podemos usar otro con la opción &#8220;_-a_&#8220;.

Ahora, la parte más genial, es que podemos usar &#8220;_script_&#8221; para registrar cualquier uso de la consola, simplemente agregando un par de lineas al &#8220;_~/.bash_profile_&#8220;, de forma que cada vez que se inicie la conexión a una consola se comienza a registrar la actividad en un archivo oculto, para lo cual agregamos las siguientes lineas a nuestro &#8220;_~/.bash_profile_&#8220;:

<pre style="color:#000000;"><br />script -a -q ~/.bash_script_$(date +%Y%m%d%H%M).log<br />exit<br /></pre>

Ahora bien, es importante destacar 3 cosas importantes. Lo ideal es que los archivos queden en un directorio oculto o algo así, eso lo dejo a su imaginación, segundo, realizar una limpieza de vez en cuando se vuelve obviamente algo importante y finalmente, solo mencionar que el archivo se crea una vez que la sesión finalice, osea, que el usuario se desconecte si esta usando ssh o algo así.  
Claramente esto no es la panacea en seguridad, pero dará una aproximación muy útil para ocasiones en que necesitamos realizar alguna auditoria.