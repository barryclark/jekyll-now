---
layout: post
title: Splunk Forwarder
date: 2018-09-29 10:47
author: agarciaizquierdo
comments: true
categories: [heavy forwarder, Sin categoría, Splunk, Splunk Español, splunk forwarder, universal forwarder]
---
Un componente casi imprescindible, pero no obligatorio en casi cualquier despliegue de <b>Splunk </b>es el F<b>orwarder (FW).</b><br />Este componente es el encargado de recolectar, enrutar, filtrar información... sobre nuestros datos, se puede instalar en maquinas Windows y Unix, puede recoger información de una BBDD o de una web, vía REST API, por ejemplo, y enviarlo directamente a nuestro indexador o incluso a otro FW.<br />Por supuesto puede enviar la información cifrada, comprobar si ha llegado al destino, dispone de una cache que puede retener los datos (muy útil cuando trabajamos con eventos enviados por un router, firewall o dispositivo IOT) y muchas otras funcionalidades que lo hacen tan interesante, pero lo que <b>no pueden hacer, es indexar información</b><br />En nuestra arquitectura podemos tener cientos de FW desplegados, en este caso lo ideal es montar un <b><a href="http://docs.splunk.com/Documentation/Splunk/7.1.3/Updating/Deploymentserverarchitecture" target="_blank" rel="noopener noreferrer">Deploytment Server</a></b>, el cual se encarga de enviar configuraciones a nuestros FW, y así nos evitamos tener que ir uno a uno.<br />Si hablamos de FW, debemos hacer diferenciar entre dos tipos:<br /><br /><ul><li><b>Heavy Forwarder.</b></li><li><b>Universal Forwarder</b></li></ul><div>En el próximo post hablaremos de la diferencia entre ambos y cuando es mejor aplicar uno u otro</div><br /><b><br /></b>
