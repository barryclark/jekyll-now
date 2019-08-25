---
layout: post
title: Notificaciones en Telegram
categories: [notificaciones, telegram]
tags: [Telegram, notificaciones, scripts, bash, raspberry pi, linux, raspbian, debian]
url_webhook: https://es.wikipedia.org/wiki/Webhook
url_script: /scripts/publishMessageToRaspiBot.sh
image_example: /images/example_notification_to_telegram.png
published: true
---

Soy un usuario asiduo de [Telegram](telegram.org) y desde que habilitó la opción de los _bot_ no he parado de buscar y entender cómo funcionan 
y cómo puedo sacarle partido. Entre mis proyectos se encontró el de programar uno para gestionar mi Raspberry Pi. Pero puesto que eso era 
un proyecto que requería más tiempo del que disponía, busqué una alternativa: Los **_webhook_**.

Los [**_webhook_**]({{ page.url_webhook }}) no son más ni menos que eventos que desecandenan acciones. En el caso de Telegram y sus _bot_, 
entre otras opciones, tenemos la posibilidad de acceder a una API-REST que nos permite invocar dichos _webhook_ y desencadenar eventos 
sobre nuestros _bot_, sin la necesidad de tener uno funcionando constantemente en un servidor.

Con esta opción en mente, decidí programar un _script_ en _bash_ que me permitiera, de una manera fácil y sencilla, publicar un mensaje 
con mi _bot_ de notificaciones sin necesidad de ocuparme de su mantenimiento y con el único fin de automatizar ciertos eventos 
en mi RPi y recibir notificaciones de eventos. 

Así pues, haciendo uso del script [publishMessageToRaspiBot.sh]({{ page.url_script }}), seteando las variables `CHAT_ID` 
y `API_KEY` con los valores correspondientes al `chat_id` de nuestra cuenta de Telegram donde queramos recibir la notificación y el 
_token_ del _bot_ que vamos a usar, bastará con invocar la orden (con el mensaje entre comillas):

```
./publishMessageToRaspiBot.sh "Este mensaje ha sido enviado desde la consola ejecutando el script \`publishMessageToRaspiBot.sh\`."
```

Y acto seguido en la cuenta de telegram se recibirá dicho mensaje:
![Ejemplo de notificación enviada a Telegram]({{ page.image_example }})

Así, bastará con invocar dicho _script_ en cada notificación de la RPi que queramos enviar con la información (siempre que no supere 
los 1024 caracteres). Además, haciendo uso del formato _Markdown_, podremos darle incluso cierto formato (también está la opción de usar HTML, pero de momento me basta con esto).
