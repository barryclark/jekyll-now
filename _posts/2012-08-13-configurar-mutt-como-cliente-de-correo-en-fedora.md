---
id: 535
title: Configurar Mutt como cliente de correo en Fedora
date: 2012-08-13T05:13:00+00:00
author: ovalenzuela
layout: post
guid: https://ovalenzueladotcom.wordpress.com/2012/08/13/configurar-mutt-como-cliente-de-correo-en-fedora
permalink: /2012/08/configurar-mutt-como-cliente-de-correo-en-fedora.html
blogger_blog:
  - www.ovalenzuela.com
blogger_author:
  - Andrés Barrera
blogger_02f5be51301771664ae7c1c72bf29246_permalink:
  - 5618598739740039537
dsq_thread_id:
  - 4707005245
categories:
  - GNU con Linux
  - Google
---
<div>
</div>

<div>
  <span><span>Antiguamente utilizaba Evolution como cliente de correo, tanto para la cuenta de mi trabajo, como para mi cuenta personal, sin embargo el volumen de correos que llegaban a mi cuenta personal era superior a los 300 correos diarios, es decir, un almacenamiento de aproximadamente 3 o 4 Gigas mensuales.</span></span>
</div>

<div>
  <span><span>Evolution como cliente funciona muy bien, pero al tener un volumen tan alto de nuevos correos, el registro interno que posee Evolution para indexar el contenido comienza a tener problemas, se corrompe y comienza a fallar seguido. </span></span><span>Incluso en una ocasion tuve que borrar todo registro en Evolution y hacer que reindexara todo mi correo para poder continuar trabajando, lo que demora alrededor de 2 horas.</span>
</div>

<div>
  <span><span>Por esto, tomé la decisión de continuar utilizando Evolution como cliente para gestionar el calendario y correo de la pega, ya que la organización donde trabajo utiliza un servidor de correo privativo, y Evolution es capaz de conectarse a ese motor utilizando DavMail. Para mi cuenta personal, decidí entonces que lo mejor era migrar a un cliente, liviano, simple y poderoso, osea, lo más cercano al ideal de cualquier Nerd, el cliente Mutt.</span></span>
</div>

<div>
  <span><span>Hoy, debo decir que el sistema funciona excelente, y para quienes deseen probarlo, pueden utilizar la siguiente configuración. Les recuerdo que yo configuro en Fedora por lo que es posible que la configuración pueda variar entre diferentes distribuciones.</span></span>
</div>

<div>
  <span><span><br /></span></span>
</div>

<div>
  <span><span>Lo primero es descargarnos el software que utilizaremos:</span></span>
</div>

<div>
  <span><span><br /></span></span>
</div>

<div>
  <span><span>yum install mutt fetchmail spamassassin nano esmtp aspell aspell-es</span></span>
</div>

<div>
  <span><span><br /></span></span>
</div>

<div>
  <span><span>Luego, creamos una carpeta de trabajo y algunos archivos:</span></span>
</div>

<div>
  <span><span><br /></span></span>
</div>

<div>
  <span><span>mkdir ~/mail/</span></span>
</div>

<div>
  <span><span>touch ~/mail/.aliases</span></span>
</div>

<div>
  <span><span>touch ~/mail/.signature</span></span>
</div>

<div>
  <span><span><br /></span></span>
</div>

<div>
  <span><span>En el archivo .aliases guardaremos nuestra libreta de direcciones y en .signature podremos luego agregar una firma para nuestro correo. Luego crearemos un archivo de configuracion para fetchmail, el software que nos permitirá descargar el correo y lo almacenará en nuestro directorio de trabajo.</span></span>
</div>

<div>
  <span><span><br /></span></span>
</div>

<div>
  <span><span># nano ~/.fetchmailrc</span></span>
</div>

<div>
  <span><span>set daemon 300</span></span>
</div>

<div>
  <span><span>set postmaster &#8220;ovalenzuela&#8221;</span></span>
</div>

<div>
  <span><span>set bouncemail</span></span>
</div>

<div>
  <span><span>set no spambounce</span></span>
</div>

<div>
  <span><span>set properties &#8220;&#8221;</span></span>
</div>

<div>
  <span><span>poll MISERVIDORPOP protocol pop3 username &#8220;NOMBREUSUARIO&#8221; password &#8220;MICLAVE&#8221; no keep fetchall mda &#8220;procmail -d %T&#8221;</span></span>
</div>

<div>
  <span><span><br /></span></span>
</div>

<div>
  <span><span>Fijarse, la primera opción define el periodo cada cual el sistema verifica si hay nuevo correo. El parametro que aparece al lado de postmaster corresponde al usuario del sistema que utilizaremos. Adicionalmente deberemos cambiar MISERVIDORPOP por la ip o nombre del servidor, NOMBREUSUARIO y MICLAVE por los datos de nuestra cuenta pop3 (debemos mantener las comillas dobles).</span></span>
</div>

<div>
  <span><span>Como notaron, utilizamos procmail para realizar la distribución, y podremos aprovecharnos de esta funcionalidad para filtrar correos mediante spamassassin. Para esto, creamos la siguiente configuración:</span></span>
</div>

<div>
  <span><span><br /></span></span>
</div>

<div>
  <span><span>MAILDIR=/home/ovalenzuela/mail/</span></span>
</div>

<div>
  <span><span>DEFAULT=$MAILDIR/mbox</span></span>
</div>

<div>
  <span><span>LOGFILE=$MAILDIR/from-log</span></span>
</div>

<div>
  <span><span>LOCKFILE=$MAILDIR/.lock</span></span>
</div>

<div>
  <span><span>:0fw: spamassassin.lock</span></span>
</div>

<div>
  <span><span>* < 256000</span></span></span>
</div>

<div>
  <span><span>| spamassassin</span></span>
</div>

<div>
  <span><span>:0</span></span>
</div>

<div>
  <span><span>* ^^rom[ ]</span></span>
</div>

<div>
  <span><span>{</span></span>
</div>

<div>
  <span><span>  LOG=&#8221;*** Dropped F off From_ header! Fixing up. &#8220;</span></span>
</div>

<div>
  <span><span>  :0 fhw</span></span>
</div>

<div>
  <span><span>  | sed -e &#8216;1s/^/F/&#8217;</span></span>
</div>

<div>
  <span><span>}</span></span>
</div>

<div>
  <span><span><br /></span></span>
</div>

<div>
  <span><span>Realizadas estas configuraciones, lanzamos fetchmail para que comience a descargar nuestro correo:</span></span>
</div>

<div>
  <span><span><br /></span></span>
</div>

<div>
  <span># </span><span><span>fetchmail</span></span>
</div>

<div>
  <span><span><br /></span></span>
</div>

<div>
  <span><span>Luego, deberemos crear una configuración adicional para el servicio esmtp, el cual será utilizado para enviar los correos.</span></span>
</div>

<div>
  <span><span><br /></span></span>
</div>

<div>
  <span><span># nano ~/.esmtprc</span></span>
</div>

<div>
  <span><span>identity MICUENTA@CORREO</span></span>
</div>

<div>
  <span><span>   hostname MISERVIDORSMTP:25</span></span>
</div>

<div>
  <span><span>   starttls = enabled</span></span>
</div>

<div>
  <span><span>   username = &#8220;MICUENTA@CORREO&#8221;</span></span>
</div>

<div>
  <span><span>   password = &#8220;MICLAVE&#8221;</span></span>
</div>

<div>
  <span><span>Finalmente, configuramos mutt:</span></span>
</div>

<div>
  <span><span>nano ~/.muttrc</span></span>
</div>

<div>
  <span><span>set folder = ~/mail/</span></span>
</div>

<div>
  <span><span>set spoolfile = &#8220;~/mail/mbox&#8221;</span></span>
</div>

<div>
  <span><span>set mbox = &#8220;~/mail/read&#8221;</span></span>
</div>

<div>
  <span><span>set record=&#8221;~/mail/send&#8221;</span></span>
</div>

<div>
  <span><span>set postponed=&#8221;~/mail/postponed&#8221;</span></span>
</div>

<div>
  <span><span>set sort=date</span></span>
</div>

<div>
  <span><span>set copy= yes</span></span>
</div>

<div>
  <span><span>set mark_old= yes</span></span>
</div>

<div>
  <span><span>set move=yes</span></span>
</div>

<div>
  <span><span>set postpone=ask-no</span></span>
</div>

<div>
  <span><span>set status_on_top = yes</span></span>
</div>

<div>
  <span><span>set mail_check =5</span></span>
</div>

<div>
  <span><span>set delete=yes</span></span>
</div>

<div>
  <span><span>set fast_reply=yes</span></span>
</div>

<div>
  <span><span>set editor=&#8221;nano +7&#8243;</span></span>
</div>

<div>
  <span><span>set abort_nosubject=ask-yes</span></span>
</div>

<div>
  <span><span>set include</span></span>
</div>

<div>
  <span><span>set include=yes</span></span>
</div>

<div>
  <span><span>set indent_string=&#8221;> &#8220;</span></span>
</div>

<div>
  <span><span>set send_charset=&#8221;utf-8&#8243;</span></span>
</div>

<div>
  <span><span>set assumed_charset=&#8221;iso-8859-1&#8243;</span></span>
</div>

<div>
  <span><span>set quit=ask-yes</span></span>
</div>

<div>
  <span><span># desplazar únicamente una línea en lugar de una página entera</span></span>
</div>

<div>
  <span><span>set menu_scroll=yes</span></span>
</div>

<div>
  <span><span># queremos ver algunos tipos MIME en línea, mire más abajo en esta misma</span></span>
</div>

<div>
  <span><span># guía para ver una explicación de esto</span></span>
</div>

<div>
  <span><span>auto_view application/msword</span></span>
</div>

<div>
  <span><span>auto_view application/pdf</span></span>
</div>

<div>
  <span><span># hacer que el patrón de búsqueda por defecto busque en los campos: To,</span></span>
</div>

<div>
  <span><span># Cc y Subject (destinatario, copia y asunto)</span></span>
</div>

<div>
  <span><span>set simple_search=&#8221;~f %s | ~C %s | ~s %s&#8221;</span></span>
</div>

<div>
  <span><span># preferencias sobre hilos, ordenar por hilos</span></span>
</div>

<div>
  <span><span>set sort=threads</span></span>
</div>

<div>
  <span><span>set strict_threads=yes</span></span>
</div>

<div>
  <span><span># mostrar la puntuación de spam cuando se lea un mensaje (solo válido para</span></span>
</div>

<div>
  <span><span># SpamAssassin)</span></span>
</div>

<div>
  <span><span>spam &#8220;X-Spam-Score: ([0-9.]+).*&#8221; &#8220;SA: %1&#8221;</span></span>
</div>

<div>
  <span><span>set pager_format = &#8221; %C &#8211; %[%H:%M] %.20v, %s%* %?H? [%H] ?&#8221;</span></span>
</div>

<div>
  <span><span># no mostrar todos los campos de la cabecera del mensaje, solo algunos</span></span>
</div>

<div>
  <span><span>ignore          *</span></span>
</div>

<div>
  <span><span>unignore        From To Cc Bcc Date Subject</span></span>
</div>

<div>
  <span><span># y en este orden</span></span>
</div>

<div>
  <span><span>unhdr_order     *</span></span>
</div>

<div>
  <span><span>hdr_order       From: To: Cc: Bcc: Date: Subject:</span></span>
</div>

<div>
  <span><span># iluminar con colores, para más ejemplos de colores, visite:</span></span>
</div>

<div>
  <span><span># http://aperiodic.net/phil/configs/mutt/colors</span></span>
</div>

<div>
  <span><span>color normal      white          black</span></span>
</div>

<div>
  <span><span>color hdrdefault  green          default</span></span>
</div>

<div>
  <span><span>color quoted      green          default</span></span>
</div>

<div>
  <span><span>color quoted1     yellow         default</span></span>
</div>

<div>
  <span><span>color quoted2     red            default</span></span>
</div>

<div>
  <span><span>color signature   cyan           default</span></span>
</div>

<div>
  <span><span>color indicator   brightyellow   red</span></span>
</div>

<div>
  <span><span>color error       brightred      default</span></span>
</div>

<div>
  <span><span>color status      brightwhite    blue</span></span>
</div>

<div>
  <span><span>color tree        brightmagenta  black</span></span>
</div>

<div>
  <span><span>color tilde       blue           default</span></span>
</div>

<div>
  <span><span>color attachment  brightyellow   default</span></span>
</div>

<div>
  <span><span>color markers     brightred      default</span></span>
</div>

<div>
  <span><span>color message     white          black</span></span>
</div>

<div>
  <span><span>color search      brightwhite    magenta</span></span>
</div>

<div>
  <span><span>color bold        brightyellow   default</span></span>
</div>

<div>
  <span><span># ajustes de personalidad</span></span>
</div>

<div>
  <span><span>set realname = &#8220;MINOMBREREAL&#8221;</span></span>
</div>

<div>
  <span><span>set from = &#8220;MICORREO&#8221;</span></span>
</div>

<div>
  <span><span>alternates &#8220;MICORREO|MICORREO&#8221;</span></span>
</div>

<div>
  <span><span>set use_from=yes</span></span>
</div>

<div>
  <span><span>set envelope_from=&#8221;yes&#8221;</span></span>
</div>

<div>
  <span><span>set sendmail=&#8221;/usr/bin/esmtp&#8221;</span></span>
</div>

<div>
  <span><span>set sendmail_wait=0</span></span>
</div>

<div>
  <span><span># el siguiente fichero debe existir, contiene la firma, comente la línea</span></span>
</div>

<div>
  <span><span># si no quiere utilizar una firma</span></span>
</div>

<div>
  <span><span>set sig_dashes</span></span>
</div>

<div>
  <span><span>set signature = ~/mail/.signature</span></span>
</div>

<div>
  <span><span># alias (parecido a una libreta de contactos)</span></span>
</div>

<div>
  <span><span>set alias_file= ~/mail/.aliases</span></span>
</div>

<div>
  <span><span>set sort_alias= alias</span></span>
</div>

<div>
  <span><span>set reverse_alias=yes</span></span>
</div>

<div>
  <span><span>source $alias_file</span></span>
</div>

<div>
  <span><span>#SOLO SI DESEAMOS UTILIZAR GNUPG</span></span>
</div>

<div>
  <span><span>source ~/mail/crypto</span></span>
</div>

<div>
  <span><span># los buzones de correo en los que queremos comprobar si ha entrado correo</span></span>
</div>

<div>
  <span><span>mailboxes &#8220;=&#8221;</span></span>
</div>

<div>
  <span><span>mailboxes &#8220;=Lists&#8221;</span></span>
</div>

<div>
  <span><span><br /></span></span>
</div>

<div>
  <span><span>Editando las variables MICORREO y MINOMBREREAL deberemos tener disponible nuestro nuevo cliente de correo configurado y funcionando. Fijarse que estamos incluyendo el archivo crypto, ahí podremos agregar nuestra configuración para utilizar gnupg, si no desean utilizarlo es cosa de comentar la linea agregando un caracter &#8220;#&#8221; o eliminarla. Un ejemplo del archivo crypto podría ser el siguiente, reemplazando los ID con los de tu clave:</span></span>
</div>

<div>
  <span><span><br /></span></span>
</div>

<div>
  <span><span>set pgp_decode_command=&#8221;gpg %?p?&#8211;passphrase-fd 0? &#8211;no-verbose &#8211;batch &#8211;output &#8211; %f&#8221;</span></span>
</div>

<div>
  <span><span>set pgp_verify_command=&#8221;gpg &#8211;no-verbose &#8211;batch &#8211;output &#8211; &#8211;verify %s %f&#8221;</span></span>
</div>

<div>
  <span><span>set pgp_decrypt_command=&#8221;gpg &#8211;passphrase-fd 0 &#8211;no-verbose &#8211;batch &#8211;output &#8211; %f&#8221;</span></span>
</div>

<div>
  <span><span>set pgp_sign_command=&#8221;gpg &#8211;no-verbose &#8211;batch &#8211;output &#8211; &#8211;passphrase-fd 0 &#8211;armor &#8211;detach-sign &#8211;textmode %?a?-u %a? %f&#8221;</span></span>
</div>

<div>
  <span><span>set pgp_clearsign_command=&#8221;gpg &#8211;no-verbose &#8211;batch &#8211;output &#8211; &#8211;passphrase-fd 0 &#8211;armor &#8211;textmode &#8211;clearsign %?a?-u %a? %f&#8221;</span></span>
</div>

<div>
  <span><span>set pgp_encrypt_only_command=&#8221;pgpewrap gpg &#8211;batch &#8211;quiet &#8211;no-verbose &#8211;output &#8211; &#8211;encrypt &#8211;textmode &#8211;armor &#8211;always-trust &#8211;encrypt-to 0x7F7F7F7F &#8212; -r %r &#8212; %f&#8221;</span></span>
</div>

<div>
  <span><span>set pgp_encrypt_sign_command=&#8221;pgpewrap gpg &#8211;passphrase-fd 0 &#8211;batch &#8211;quiet &#8211;no-verbose &#8211;textmode &#8211;output &#8211; &#8211;encrypt &#8211;sign %?a?-u %a? &#8211;armor &#8211;always-trust &#8211;encrypt-to 0x7F7F7F7F &#8212; -r %r &#8212; %f&#8221;</span></span>
</div>

<div>
  <span><span>set pgp_import_command=&#8221;gpg &#8211;no-verbose &#8211;import -v %f&#8221;</span></span>
</div>

<div>
  <span><span>set pgp_export_command=&#8221;gpg &#8211;no-verbose &#8211;export &#8211;armor %r&#8221;</span></span>
</div>

<div>
  <span><span>set pgp_verify_key_command=&#8221;gpg &#8211;no-verbose &#8211;batch &#8211;fingerprint &#8211;check-sigs %r&#8221;</span></span>
</div>

<div>
  <span><span>set pgp_list_pubring_command=&#8221;gpg &#8211;no-verbose &#8211;batch &#8211;with-colons &#8211;list-keys %r&#8221; </span></span>
</div>

<div>
  <span><span>set pgp_list_secring_command=&#8221;gpg &#8211;no-verbose &#8211;batch &#8211;with-colons &#8211;list-secret-keys %r&#8221;</span></span>
</div>

<div>
  <span><span># specify the uid to use when encrypting/signing</span></span>
</div>

<div>
  <span><span>set pgp_sign_as=0x7F7F7F7F</span></span>
</div>

<div>
  <span><span># this set the number of seconds to keep in memory the passpharse used to encrypt/sign</span></span>
</div>

<div>
  <span><span># the more the less secure it will be</span></span>
</div>

<div>
  <span><span>set pgp_timeout=60</span></span>
</div>

<div>
  <span><span># it&#8217;s a regexp used against the GPG output: if it matches some line of the output</span></span>
</div>

<div>
  <span><span># then mutt considers the message a good signed one (ignoring the GPG exit code)</span></span>
</div>

<div>
  <span><span>set pgp_good_sign=&#8221;^gpg: Good signature from&#8221;</span></span>
</div>

<div>
  <span><span># mutt uses by default PGP/GPG to sign/encrypt messages</span></span>
</div>

<div>
  <span><span># if you want to use S-mime instead set the smime_is_default variable to yes</span></span>
</div>

<div>
  <span><span># automatically sign all outcoming messages</span></span>
</div>

<div>
  <span><span>set crypt_autosign</span></span>
</div>

<div>
  <span><span># sign only replies to signed messages</span></span>
</div>

<div>
  <span><span>set crypt_replysign</span></span>
</div>

<div>
  <span><span># automatically encrypt outcoming messages</span></span>
</div>

<div>
  <span><span>set crypt_autoencrypt=yes</span></span>
</div>

<div>
  <span><span># encrypt only replies to signed messages</span></span>
</div>

<div>
  <span><span>set crypt_replyencrypt=yes</span></span>
</div>

<div>
  <span><span># encrypt and sign replies to encrypted messages</span></span>
</div>

<div>
  <span><span>set crypt_replysignencrypted=yes</span></span>
</div>

<div>
  <span><span># automatically verify the sign of a message when opened</span></span>
</div>

<div>
  <span><span>set crypt_verify_sig=yes</span></span>
</div>

<div>
  <span><span>set pgp_autosign=yes</span></span>
</div>

<div>
  <span><span><br /></span></span>
</div>

<div>
  <span><span>Y con esto, abrimos mutt y presionamos la tecla m para enviar un nuevo correo. El resto, pues en la ayuda de Mutt, sino este post será interminable.</span></span>
</div>

<div>
  Publicado originalmente por Oscar Valenzuela en http://ovalenzuela.xpertians.com &#8211; Puede ser compartido y copiado libremente, mientras mantenga esta nota.
</div>