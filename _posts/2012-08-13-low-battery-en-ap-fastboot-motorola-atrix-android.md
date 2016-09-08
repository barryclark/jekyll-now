---
id: 530
title: Low Battery en Ap Fastboot Motorola Atrix Android
date: 2012-08-13T05:20:00+00:00
author: ovalenzuela
layout: post
guid: https://ovalenzueladotcom.wordpress.com/2012/08/13/low-battery-en-ap-fastboot-motorola-atrix-android
permalink: /2012/08/low-battery-en-ap-fastboot-motorola-atrix-android.html
blogger_blog:
  - www.ovalenzuela.com
blogger_author:
  - Andrés Barrera
blogger_02f5be51301771664ae7c1c72bf29246_permalink:
  - 975629405728509538
dsq_thread_id:
  - 4628972802
categories:
  - Android
  - Google
  - Hacks y Mods
---
<span><span>Bueno, el tema es así: brickie como 5 veces mi razr e intentando repararlo me arrojo el mensaje que no podia seguir flasheandolo debido a que tenia baja bateria, como saben, es el sistema el que realiza la carga de la bateria, por tanto si estaba brickeado no cargaría.</span></span>  
<span><span>Algunos por ahi hablan de instalar un software, lo cual es peligroso debido a que como cualquier memoria EEPROM el sistema utiliza la carga de la bateria para escribir las celdas de memoria, por mucho que se oculte el mensajito ese, si intentamos grabar y no tenemos suficiente energia, podemos hacer un daño mayor. Luego, el telefono no es nada barato para estar abriendole, y dañando la circuiteria o la tapita, por tanto la mejor solución que encontre fue fabricar algo llamado Factory Cable, que es similar al usado cuando estan programando el celu en la fabrica XD, por lo que paso a detallar como se hace.</span></span>  
<span><span>Lo primero es hacernos de un cable de datos, yo la primera vez me jodi un cable motorola adicional que tenia, por tanto lo que use finalmente fue un cable de un lg, que me salio barato, este cable hay que pelar con muchisimo cuidado el lado del microusb, con cuidado porque un movimiento fuerte desconectara los cables o cortara las uniones.</span></span>  
<span><span>Luego de dejar al descubierto los conectores, podremos ver que uno de los conectores no es usado, el 4to conector, este lo usaremos para inyectar energía al celu mientras flashiamos.</span></span>  
<span><span>Con un soldador electrico de baja potencia, soldaremos un cablecito o alambre desde el conector libre (4) al conector positivo, que generalmente tiene un cable rojo y es el conector (1) en el microusb, cuidado de no unir otros conectores en el proceso.</span></span>  
<span><span>En este paso, y teniendo listo el cable, les recomiendo usar un tester electrico o alguna ampolleta de 3v con pilas para probar continuidad y verificar que los cables no hayan quedado sobrepuestos o haciendo puente debido a nuestro trabajo, asi tambien sería bueno verificar que la conexion desde un conector a otro se mantiene, de acuerdo al diagrama adjunto.</span></span>  
<span><span>Con todo esto, ya tenemos nuestro Factory Cable, y ahora al conectarlo podremos grabar sin peligro ni anuncio de Batery Low en el Fastboot.</span></span>  
<span><span>No recomiendo usar este cable para cargar, o uso diario, ya que podria sobrecargar algo, recordemos que estamos inyectando energia donde no deberiamos inyectar en el uso comun.</span></span>  
<span><span><br /></span></span> 

<div>
  <a href="http://www.ovalenzuela.com/wp-content/uploads/2016/02/7c162-2012-05-20_11-51-01_225.jpg"><img border="0" height="240" src="http://www.ovalenzuela.com/wp-content/uploads/2016/02/7c162-2012-05-20_11-51-01_225.jpg?w=300" width="320" /></a>
</div>

<div>
  <a href="http://www.ovalenzuela.com/wp-content/uploads/2016/02/9c9f5-2012-05-20_11-52-41_563.jpg"><img border="0" height="240" src="http://www.ovalenzuela.com/wp-content/uploads/2016/02/9c9f5-2012-05-20_11-52-41_563.jpg?w=300" width="320" /></a>
</div>

<div>
  <a href="http://www.ovalenzuela.com/wp-content/uploads/2016/02/b66dc-diagrama.jpg"><img border="0" height="125" src="http://www.ovalenzuela.com/wp-content/uploads/2016/02/b66dc-diagrama.jpg?w=300" width="320" /></a>
</div>

<span><span><br /></span></span><span><span>Esto lo saque de varios post en XDA, asi que a ellos va el agradecimiento.</span></span>  
<span><span>.</span></span> 

<div>
  Publicado originalmente por Oscar Valenzuela en http://ovalenzuela.xpertians.com &#8211; Puede ser compartido y copiado libremente, mientras mantenga esta nota.
</div>