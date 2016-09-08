---
id: 443
title: Fake SMS en el Emulador de Android
date: 2013-03-18T20:58:00+00:00
author: ovalenzuela
layout: post
guid: https://ovalenzueladotcom.wordpress.com/2013/03/18/fake-sms-en-el-emulador-de-android
permalink: /2013/03/fake-sms-en-el-emulador-de-android.html
blogger_blog:
  - www.ovalenzuela.com
blogger_author:
  - Andrés Barrera
blogger_02f5be51301771664ae7c1c72bf29246_permalink:
  - 6029335102718170436
dsq_thread_id:
  - 3115740452
categories:
  - Android
  - Google
  - Hacks y Mods
---
<div>
  <span>Siguiendo con los TIPs, otra pregunta clásica, es como probar funcionalidades tales como envío o recepción de SMS, durante el desarrollo de aplicaciones donde usamos el emulador para probarlas, bueno, es posible probar dichas funcionalidades usando TELNET, o yes, TELNET. Por ejemplo, para verificar el funcionamiento de una aplicación que hace BroadcastReceiver para la recepción de mensajes SMS, podremos usar el siguiente comando para simular el evento:</span>
</div>

<div>
  <span><br /></span>
</div>

<div>
  <span>Lo primero, nos conectamos usando TELNET contra el puerto que corre nuestro emulador, en mi caso será el puerto 5554, y desde ahí ejecutamos los comandos que se describen a continuación en negrita, el resto, es la respuesta que nos da la consola:</span>
</div>

<div>
  <span><br /></span>
</div>

<div>
  <span>[ovalenzuela@localhost ~]$ telnet localhost 5554</span>
</div>

<div>
  <span>Trying 127.0.0.1&#8230;</span>
</div>

<div>
  <span>Connected to localhost.</span>
</div>

<div>
  <span>Escape character is &#8216;^]&#8217;.</span>
</div>

<div>
  <span>Android Console: type &#8216;help&#8217; for a list of commands</span>
</div>

<div>
  <span>OK</span>
</div>

<div>
  <b><span>sms send +56XXXXXXXXX hola</span></b>
</div>

<div>
  <span>OK</span>
</div>

<div>
  <span><br /></span>
</div>

<div>
  <span>Y entonces recibiremos en el emulador un SMS proveniente del numero +56XXXXXXXXX con el texto &#8220;HOLA&#8221;</span>
</div>

<div>
  <span><br /></span>
</div>

<div>
  <span>También podremos usar el ADB:</span>
</div>

<div>
  <span><br /></span>
</div>

<div>
  <span>adb shell am start -a android.intent.action.SENDTO -d sms:+56XXXXXXXXX &#8211;es sms_body &#8220;SMS BODY GOES HERE&#8221; &#8211;ez exit_on_sent true</span>
</div>

<div>
  <span>adb shell input keyevent 22</span>
</div>

<div>
  <span>adb shell input keyevent 66</span>
</div>

<div>
  <span><br /></span>
</div>

<div>
  <span>O incluso, usando un service:</span>
</div>

<div>
  <span><br /></span>
</div>

<div>
  <span>adb shell service call isms 5 s16 &#8220;+56XXXXXXXXX&#8221; i32 0 i32 0 s16 &#8220;SMS TEXT HERE&#8221;</span>
</div>

<div>
  Publicado originalmente por Oscar Valenzuela en http://ovalenzuela.xpertians.com &#8211; Puede ser compartido y copiado libremente, mientras mantenga esta nota.
</div>