---
id: 229
title: Splunk tuning
date: 2019-05-20T10:47:00+02:00
author: Alvaro Garcia Izquierdo
layout: post
guid: http://alvarogarcia.home.blog/2019/05/20/splunk-tuning/
permalink: /2019/05/20/splunk-tuning/
categories:
  - Sin categoría
tags:
  - Splunk
  - Splunk Español
  - Splunk tuning
  - Splunk ulimits
---
<div class="separator" style="clear:both;text-align:center;">
  <a href="https://agarciaizquierdo.github.io/2019/05/20/splunk-tuning/" style="margin-left:1em;margin-right:1em;"><img border="0" height="243" src="https://3.bp.blogspot.com/-UveTvDXRjBU/XNrT03LazQI/AAAAAAABPRY/ok--aW6MAcMxsByDlh8KYZ0pB_aPOIUwACLcBGAs/s320/performance-tunning_0.jpg" width="320" /></a>
</div>

Siempre que realizamos una implementación de **Splunk**, u otro producto, una de las cosas que debemos cuidar es el tuning y aplicar las mejores practicas recomendadas por el fabricante.  
A continuación os pongo unas configuraciones básicas que siempre realizo al desplegar/montar un sistema Splunk



  * **Ulimits**
  * <https://answers.splunk.com/answers/13313/how-to-tune-ulimit-on-my-server.html>
  * <https://docs.splunk.com/Documentation/Splunk/7.2.6/Troubleshooting/ulimitErrors>

  * **HTTP thread**
  * <https://docs.splunk.com/Documentation/Splunk/7.2.6/Troubleshooting/HTTPthreadlimitissues>

  * **Transparent huge memory**
  * <https://docs.splunk.com/Documentation/Splunk/7.2.6/ReleaseNotes/SplunkandTHP>

<div>
  <a href="https://docs.splunk.com/Documentation/Splunk/7.2.6/Admin/OptimizeSplunkforpeakperformance" target="_blank" rel="noopener noreferrer">Aquí </a>se explican algunas consideraciones básicas
</div>
