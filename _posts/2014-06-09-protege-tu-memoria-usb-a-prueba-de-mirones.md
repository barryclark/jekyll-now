---
id: 86
title: Protege tu memoria USB a prueba de mirones!
date: 2014-06-09T23:12:00+00:00
author: ovalenzuela
layout: post
guid: https://ovalenzueladotcom.wordpress.com/2014/06/09/protege-tu-memoria-usb-a-prueba-de-mirones
permalink: /2014/06/protege-tu-memoria-usb-a-prueba-de-mirones.html
blogger_blog:
  - www.ovalenzuela.com
blogger_author:
  - Andrés Barrera
blogger_02f5be51301771664ae7c1c72bf29246_permalink:
  - 4718946861378210267
dsq_thread_id:
  - 3086968141
categories:
  - GNU con Linux
  - Google
  - Hacks y Mods
  - Noticias Destacadas
  - Opinión
---
Por diferentes razones he estado trabajando en proteger mis datos, es decir, encriptar mis datos críticos almacenados en mi pc, disco externo y memorias USB (Pendrive), así como comunicaciones por correo, chat, sms y mensajería desde equipos móviles. Y aunque muchos puedan pensar que es algo paranoico, cuando comienzas a pensar cuantas &#8220;manos&#8221; y &#8220;ojos&#8221; estan frente a tu información, comienzas a realizar cambios importantes, no solo en aspectos de tecnología, sino también en cuanto a costumbres de como usas dicha información. Es por esto que migré todo mi correo a una unidad de almacenamiento USB cuya partición esté encriptada, donde almaceno archivos con contenido sensible y mi correo, que por cierto ahora se almacena en un archivo cifrado y se conecta usando SSL, así también si algún día se me olvida o pierde, o me la roban, jamás podrán recuperar la información sin mi permiso. Ahora bien, como construir esta maravilla de repositorio seguro, pues de eso mismo se tratará este post.

[<img alt="encrypt-usb-drive" class="alignnone size-full wp-image-4431" src="http://ovalenzuela.com/wp-content/uploads/2014/06/encrypt-usb-drive.jpg" height="243" width="300" />](http://ovalenzuela.com/wp-content/uploads/2014/06/encrypt-usb-drive.jpg)

IMPORTANTE:  
Toda la información previamente almacenada en tu memoria USB será eliminada, por lo que si tienes algo importante, es la hora de respaldarla.

Lo primero, será identificar la unidad, esto se logra facilmente verificando el resultado del comando dmesg al insertar la unidad de memoria, para no confundirnos, se recomienda no tener otra unidad conectada.

`> su -<br />> tail -f /var/log/messages | grep "sd"`

Así descubrimeros que se despliega una unidad tipo sda, sdb o sdc. Con esto supondremos que nuestro dispositivo sería /dev/sdX y la primera partición entonces /dev/sdX1.

Luego, procederemos a particionar la unidad, para lo que podemos usar el programa &#8220;parted&#8221; o &#8220;fdisk&#8221; para consola o &#8220;gparted&#8221; para escritorio, y dependiendo de nuestras necesidades, con el cual podremos dimensonar las particiones según nuestro gusto. Por ejemplo, en este caso crearemos una partición de 5GB, y otra con todo el resto del espacio disponible, usando el programa &#8220;gparted&#8221; que por cierto debe ser ejecutado con privilegios de root (al igual que los pasos anteriores).

Listamos las particiones para verificar que sea nuestra unidad, reemplazando X por la letra correspondiente:  
`> parted /dev/sdX -l</p>
<p>Ahora ingresamos al modo "interactivo":<br />> parted /dev/sdX<br />(parted) mkpart primary 0.0 5GB<br />(parted) mkpartfs primary fat32 5GB -1s<br />(parted) quit`

Como puede apreciarse se han creado 2 particiones, la primera con un tamaño de 5GB (/dev/sdX1) que se utilizará para almacenar los datos encriptados, y una segunda partición con formato fat32 (/dev/sdX2) que inicia desde los 5GB hasta el último sector disponible. La segunda partición servirá para propositos generales, y en conjunto, la presentación final de nuestra memoria USB será similar a la que desplegaré (usando una memoria de 8GB):

`(parted) print<br />Model: Imation Atom USB Device (scsi)<br />Disk /dev/sdX: 8007MB<br />Sector size (logical/physical): 512B/512B<br />Partition Table: msdos</p>
<p>Number Start End Size Type File system Flags<br />1 512B 5000MB 5000MB primary<br />2 5001MB 8007MB 3006MB primary fat32 lba`

Hoy por hoy es bastante común encontrar empresas que se dedican especificamente a la recuperación de datos en unidades de almacenamiento digital (memorias SD, memorias USB, Discos Duros, etc). Y sin mencionar la labor de otras entidades de gobierno, es por esto que vamos a evitar a toda costa los ataques basados en reconocimiento de patrones de encriptación, por lo que escribiremos datos aleatorios a la partición antes de proceder con la encriptación. El comando &#8220;dd&#8221; puede ser utilizado para llenar de datos la partición, por supuesto esto puede tomar cierto tiempo, lo que depende exclusivamente de la &#8220;entropía&#8221; generada por nuestro sistema:

`> dd if=/dev/urandom of=/dev/sdX1 bs=1M`

El comando anterior puede requerir bastante tiempo en ejecutarse, por lo que recomiendo dejarlo sin interrumpir. Al finalizar, podremos continuar con el proceso, y el siguiente paso será encriptar la partición creada. Para este proposito usaremos la herramienta &#8220;cryptsetup&#8221;, la que desde luego debe ser instalada en su sistema usando el manejador de paquetes correspondientes (yum, apt, opkg, etc). El siguiente comando encriptara la partición /dev/sdX1 usando el algoritmo 256-bit AES XTS, el cual por cierto solo esta disponible en Linux desde la versión 2.6.24 del Kernel en adelante. El comando nos pedirá una contraseña, es importante usar una que sea robusta y recordable:  
`<br />> cryptsetup -h sha256 -c aes-xts-plain -s 256 luksFormat /dev/sdX1`

Con esto, la partición ya estará encriptada. Para que sea más fácil su gestión le asignaremos un nombre, en este caso será &#8220;private&#8221;:

`> cryptsetup luksOpen /dev/sdX1 private`

Con esto, la partición encriptada estara disponible en el sistema bajo el alias de /dev/mapper/private y procederemos a montar la partición y crear el sistema de archivos.

`> mkfs.ext2 /dev/mapper/private<br />> mkdir /mnt/private<br />> mount /dev/mapper/private /mnt/private`

Una vez disponible la nueva partición, asignaremos los permisos para poder usar los archivos. Considerando que nuestro usuario es &#8220;miusuario&#8221;, el comando respectivo será el siguiente:

`> chown -R miusuario:miusuario /mnt/private`

Ahora la partición encriptada esta disponible en el directorio /mnt/private. Si ya no se desea acceder a la memoria USB encriptada, deberemos desmontar la unidad utilizando &#8220;unmount&#8221; y luego usamos el comando &#8220;cryptsetup&#8221; para cerrar la protección establecida.

`> umount /mnt/private<br />> cryptsetup luksClose /dev/mapper/private`

Como ya nuestra unidad esta lista, podremos hacer uso de las herramientas de escritorio para montar adecuadamente la unidad, puesto que con todas las utilidades instaladas, al solo conectar la memoria USB al puerto, nos aparecerá una ventana emergente solicitando la contraseña para desbloquear la memoria USB.

[<img alt="2014-06-09-230056_1024x576_scrot" class="alignnone size-medium wp-image-4429" src="http://ovalenzuela.com/wp-content/uploads/2014/06/2014-06-09-230056_1024x576_scrot-300x218.png" height="218" width="300" />](http://ovalenzuela.com/wp-content/uploads/2014/06/2014-06-09-230056_1024x576_scrot.png)

Si por el contrario, nuestra distribución no cuenta con las herramientas necesarias, debemos utilizar los comandos anteriormente descritos, evitando por supuesto, el formatear la partición.

Y bueno, eso ha sido el artículo de seguridad de hoy, pronto veremos como construir nuestra propia PirateBox!