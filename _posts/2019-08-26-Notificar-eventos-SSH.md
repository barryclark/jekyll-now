---
layout: post
title: Notificar eventos SSH
categories: [notificaciones, telegram, seguridad]
tags: [Telegram, notificaciones, scripts, bash, raspberry pi, linux, raspbian, debian, ssh, sshd, seguridad]
url_script: /scripts/ssh_alert_script_pam.sh
image_notificacion_tg_login_ssh: /images/notificacion_tg_login_ssh.png
image_notificacion_tg_logout_ssh: /images/notificacion_tg_logout_ssh.png
published: true
---

En cierto modo, soy un paranoico de la seguridad. Constantemente estoy monitorizando mis dispositivos conectados a la red con el fin de 
detectar posibles intrusiones o envíos de datos _no permitidos_. Así pues, empleo varias herramientas para ello, pero además, soy 
fan declarado de las notificaciones de eventos, por lo que no podía dejar escapar esta oportunidad de fusionar ambas "manías".

Además de las medidas de seguridad que tengo en mi entorno digital (de las que pondré algún _post_), he dedicido implantar un 
sistema de notificaciones que me avise cada vez que alguien (idealmente sólo yo mismo...) se logue en mi RPi a través de SSH. 

¿Y por qué sólo a través de SSH? Porque en mi casa es la única manera de acceder a ella, ya que no tiene conectado ni teclado, ni ratón, 
ni monitor... sólo la toma de red y de corriente.

Así pues, decidí notificar estos eventos haciendo uso de mi cuenta de Telegram y el _script_ de notificaciones que describí 
[aquí]({% post_url 2019-08-25-Notificaciones-en-Telegram %}). Buscando información en internet, descubrí que la mejor manera de 
tratar los eventos SSH es haciendo uso del PAM. Con esto en mente, creé el _script_ 
[ssh_alert_script_pam.sh]({{ site.base_url }}/scripts/ssh_alert_script_pam.sh) y le metí los manejadores para `open_session` y 
`close_session` solamente, con el fin de crear un mensaje que posteriormente pasaría a mi _script_ de notificación.

Una vez creado lo ubiqué en la carpeta `/etc/pam.scripts/` (que previamente tuve que crear, para tener todos mis _scripts_ de PAM agrupados) 
y ejecuté las siguientes órdenes:

```bash
# chown root:root ssh_alert_script_pam.sh
# chmod 0700 ssh_alert_script_pam.sh
```

Ya tenemos listo el _script_ para gestionar los eventos PAM de _login_ y _logout_ y sólo nos queda referenciarlo en el PAM para que lo 
ejecute. Así pues, en `/etc/pam.d/sshd` al final del archivo añadimos lo siguiente:

{% highlight batchfile %}
# SSH Alert script
session required pam_exec.so /etc/pam.scripts/ssh_alert_script_pam.sh
{% endhighlight %}

¡Y listo!

La próxima vez que alguien se logue en mi RPi, recibiré en mi Telegram una notificación como la siguiente:

![Notificación a Telegram de login SSH]({{ page.image_notificacion_tg_login_ssh }})

Y, cuando me salga, algo como:

![Notificación a Telegram de logout SSH]({{ page.image_notificacion_tg_logout_ssh }})

Y mientras esto coincida con las veces que yo entro y salgo del sistema, todo bien :)
