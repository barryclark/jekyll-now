---
layout: post
title: Forwarder VS Heavy Forwarder.
date: 2018-10-14 08:37
author: agarciaizquierdo
comments: true
categories: [heavy forwarder, Sin categoría, Splunk, Splunk Español, splunk forwarder, universal forwarder]
---
Una duda típica a la hora de recoger/enviar eventos a los indexadores, es que tipo de forwarder usar.<br />Como norma general lo ideal es usar siempre <b>Universal Forwarder (UF)</b>,  este es un agente muy ligero, que apenas consume recursos del host donde se instala, incluso existe una versión para Raspberry Pi, <a href="https://www.splunk.com/blog/2013/10/21/how-to-splunk-data-from-a-raspberry-pi-three-easy-steps.html" target="_blank" rel="noopener noreferrer">aquí</a>.<br />Existe otro tipo, llamado <b>Heavy Forwarder (HF),</b> este es mas pesado, pero dispone de funcionalidades adicionales, como:<br /><br /><ul><li>Posibilidad de filtrar/descartar eventos</li><li>Posibilidad de conectarte a varias DB a través de la App <a href="https://splunkbase.splunk.com/app/2686/" target="_blank" rel="noopener noreferrer">DB Connect</a></li><li>Realizar enrutado de información compleja.</li></ul><div>Esto son grandes ventajas, pero a cambio, el envío de información es mas pesado, y puede sobrecargar la red, ya que el <b>HF </b>parsea los eventos, y esto hace que incrementen su tamaño.</div><div><br /></div><div>Por esto, siempre es recomendable usar <b>UF, </b>salvo que no que nos encontremos en alguno de los tres casos anteriores.</div><div><br /></div><div>Aquí is dejo un enlace del blog de <b>Splunk </b>donde lo explican en detalle, <a href="https://www.splunk.com/blog/2016/12/12/universal-or-heavy-that-is-the-question.html" target="_blank" rel="noopener noreferrer">Universal or Heavy, that is the question?</a></div>
