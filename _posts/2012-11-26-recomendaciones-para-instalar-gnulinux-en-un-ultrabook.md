---
id: 474
title: Recomendaciones para instalar GNU/Linux en un Ultrabook
date: 2012-11-26T13:52:00+00:00
author: ovalenzuela
layout: post
guid: https://ovalenzueladotcom.wordpress.com/2012/11/26/recomendaciones-para-instalar-gnulinux-en-un-ultrabook
permalink: /2012/11/recomendaciones-para-instalar-gnulinux-en-un-ultrabook.html
blogger_blog:
  - www.ovalenzuela.com
blogger_author:
  - Andrés Barrera
blogger_02f5be51301771664ae7c1c72bf29246_permalink:
  - 4595394839386401455
dsq_thread_id:
  - 3086968323
categories:
  - GNU con Linux
  - Google
---
<div>
  <div>
    <a href="http://www.ovalenzuela.com/wp-content/uploads/2016/02/a9cf2-acer_aspire_s3.jpg"><img border="0" src="http://www.ovalenzuela.com/wp-content/uploads/2016/02/a9cf2-acer_aspire_s3.jpg?w=300" height="103" width="200" /></a>
  </div>
  
  <p>
    Varios han estado migrando a computadores con formato Ultrabook. Muy delgados y livianos, pero que tienen una capacidad de procesamiento bastante bueno. Para ellos, quiero compartir un par de TIPs que creo pueden ser útiles al momento de instalar y configurar su equipo, claro, no pretendo abarcar todo, pero serán algunos básicos que pueden servir al momento de incrementar la velocidad en la operación y día a día.
  </p>
  
  <p>
    Vuelvo a aclarar, que no describiré el proceso básico de instalación del sistema operativo, puesto que supongo que si llegó aquí es porque tiene el conocimiento para hacerlo, en cambio, pretendo describir solo aquellos aspectos que permitirán mejorar el performance del equipo.
  </p>
  
  <p>
    <b>Usando nuestro disco SSD durante la instalación</b>
  </p>
  
  <p>
    Los ultrabooks generalmente incorporan 2 discos, uno de estado solido conocido como SSD (Solid State Drive) y uno normal, el SSD se utiliza para mejorar el tiempo de lectura de datos, y es bastante lento al momento de escribir en esta unidad, por lo que se recomienda utilizar para instalar el sistema base y el intercambio de memoria, más que como sistema de almacenamiento. 
    
    <div>
      <a href="http://www.ovalenzuela.com/wp-content/uploads/2016/02/c3ea9-samsung-256gb-mlc-flash-based-ssd-drive.jpg"><img border="0" src="http://www.ovalenzuela.com/wp-content/uploads/2016/02/c3ea9-samsung-256gb-mlc-flash-based-ssd-drive.jpg?w=300" height="220" width="320" /></a>
    </div>
    
    <p>
      Teniendo esto en mente y ya que durante la instalación nuestro sistema reconoce el disco duro normal como /dev/sda y el SSD como /dev/sdb, usaremos este último para almacenamiento del sistema y de nuestro SWAP, sin embargo, para lograr esta configuración, requeriremos configurar las particiones a mano.<br />Primero, crearemos una partición ext3 o ext4 (de acuerdo a la disponibilidad del sistema operativo) del 75% de la capacidad de nuestro SSD, es decir, si tenemos un disco de 20gb, creamos una partición de 15GB, esta tendrá el punto de montaje / o raíz. El resto del disco SSD, lo usaremos para SWAP, por lo que creamos una partición SWAP y dejamos ahí. En lo personal, al momento de instalar servidores considero practico y muy eficiente crear particiones para todo, pero como no es el caso, usaremos una única partición para nuestros datos, y por tanto creamos una partición ext3 o ext4 de todo el disco /dev/sda o de todo el espacio disponible si mantendremos alguna otra partición con winshit, y asignamos esa partición a /home.<br />Luego, como el instalador entenderá que la base del sistema esta en nuestro disco SDD, entonces podría intentar instalar el gestor de arranque en esta unidad, si sucede, debemos cambiarlo a que sea instalado en nuestro disco /dev/sda, esto es muy importante, o el sistema no partirá. El resto, es igual que siempre 😉
    </p>
    
    <p>
      <b>Control de Brillo para la pantalla</b>
    </p>
    
    <p>
      Otro tema medio extraño, es el reconocimiento de las funciones para ajustar el brillo de la pantalla usando las teclas de función (FN+flecha izquierda/derecha en mi caso). Esto se debe a que el sistema debe ser ajustado para reconocer el funcionamiento del Hardware desde el mismo arranque, por lo que bastará agregar unos datos al GRUB. Entonces, abrimos una terminal y tipeamos:
    </p>
    
    <p>
      nano /etc/default/grub
    </p>
    
    <p>
      Se abrirá grub.conf y buscamos la linea similar a esto:
    </p>
    
    <p>
      GRUB_CMDLINE_LINUX=&#8221;&#8221;
    </p>
    
    <p>
      Si tiene datos, agregamos lo sugerido al final de los datos, y si esta vacío le agregamos lo siguiente:
    </p>
    
    <p>
      GRUB_CMDLINE_LINUX=&#8221;acpi_osi=Linux acpi_backlight=vendor&#8221;
    </p>
    
    <p>
      Para su información, lo que considera la instrucción anterior es lo siguiente:
    </p>
    
    <p>
      &#8220;acpi_osi=Linux&#8221; le indica al Hardware que estas corriendo GNU/Linux, así que el Hardware se comportará de acuerdo a lo esperado para este sistema operativo.<br />&#8220;acpi_backlight=vendor&#8221; le da prioridad al modulo del fabricante, por ejemplo en mi caso uso un Acer S3, por lo que se dará prioridad al modulo acer_acpi por sobre el acpi por defecto.
    </p>
    
    <p>
      Para que los cambios tengan efecto, será necesario regenerar nuestra configuración grub, lo que se logra ejecutando como root &#8220;update-grub&#8221; o &#8220;grub2-mkconfig -o /boot/grub2/grub.cfg&#8221;, según sea el caso.
    </p>
    
    <p>
      Finalmente, para activar los cambios, será necesario reiniciar el equipo, después de todo, son cambios que se ejecutan al inicio del sistema.
    </p>
    
    <p>
      <b>Reducir el uso del SSD para incrementar la velocidad</b>
    </p>
    
    <p>
      Normalmente Linux (el kernel) mantiene un registro de que archivos han sido &#8220;leídos&#8221; y cuando, por lo que si no necesitamos esta información, entonces agregaremos la siguiente opción a nuestro archivo fstab:
    </p>
    
    <p>
      nano /etc/fstab
    </p>
    
    <p>
      Y agregamos noatime y nodiratime para los puntos de montaje / y /home, y debería quedar algo similar a esto:
    </p>
    
    <p>
      /dev/sdb1 / ext4 noatime,nodiratime,rw,errors=remount-ro 0 1<br />/dev/sdb5 swap swap sw 0 0<br />/dev/sda5/home    ext4    noatime,nodiratime,nodev,nosuid 0 2
    </p>
    
    <p>
      Como había mencionado antes, los SSD son muy rapidos para leer información desde ellos, pero la escritura es bastante más lenta y si se repite la escritura en el mismo sector, se tiende a hacer aún más lenta la tarea. Además, escribir y escribir en el disco, siempre necesitará más batería, por lo que una buena recomendación es mover los archivos temporales y logs a RAM.
    </p>
    
    <p>
      Nuevamente editamos el archivo fstab:
    </p>
    
    <p>
      nano /etc/fstab
    </p>
    
    <p>
      Y agregamos:
    </p>
    
    <p>
      none /var/log tmpfs defaults 0 2<br />none /var/tmp tmpfs defaults 0 2<br />none /tmp tmpfs defaults 0 2
    </p>
    
    <p>
      O si preferimos, podríamos mover los archivos temporales y logs a una carpeta dentro de nuestro disco normal, pero sigue usándose batería. Entonces, en vez de agregar las lineas anteriores, simplemente ejecutamos los siguientes comandos:
    </p>
    
    <p>
      sudo mkdir /home/.tmp<br />sudo chmod a+rwx /home/.tmp<br />sudo rm /tmp<br />sudo ln -s /home/.tmp tmp
    </p></div> 
    
    <div>
      Publicado originalmente por Oscar Valenzuela en http://ovalenzuela.xpertians.com &#8211; Puede ser compartido y copiado libremente, mientras mantenga esta nota.
    </div>