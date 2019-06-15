---
id: 235
title: Splunk Data Model
date: 2019-03-11T21:23:00+02:00
author: Alvaro Garcia Izquierdo
layout: post
guid: https://agarciaizquierdo.github.io/2019/03/11/splunk-data-model/
permalink: /2019/03/11/splunk-data-model/
categories:
  - Sin categoría
tags:
  - modelos de datos acelerados
  - Splunk Data Model
  - Splunk Español
---
<div class="separator" style="clear:both;text-align:center;">
  <a href="https://2.bp.blogspot.com/-gX_U0IJsqv0/XIbQUsC6IcI/AAAAAAABOwk/V8Lnut2wbckcudBXgnFTZJ-Pma_LVBmoACLcBGAs/s1600/data_model.jpg" style="margin-left:1em;margin-right:1em;"><img border="0" height="225" src="https://2.bp.blogspot.com/-gX_U0IJsqv0/XIbQUsC6IcI/AAAAAAABOwk/V8Lnut2wbckcudBXgnFTZJ-Pma_LVBmoACLcBGAs/s1600/data_model.jpg" width="400" /></a>
</div>

Los &#171;**Data Model**&#187; de **Splunk**  nos pueden servir de gran ayuda en muchos proyectos, en el caso de tener un gran cantidad de registros (miles de millones). Aunque esta es una novedad introducida hace tiempo, aún existen despliegues donde no se usan, es bastante habitual verlo en las App de seguridad, como por ejemplo **<a href="https://splunkbase.splunk.com/app/491/" target="_blank" rel="noopener noreferrer">Palo Alto</a>**  
Algunas de las ventajas de disponer de nuestro **Data Model**

  * Nos permite crear modelos de datos acelerados, podemos elegir por ejemplo disponer de los últimos 30 días acelerados.
  * Además, poder crear campos ad hoc, crear extracciones, enriquecer la información con lookups&#8230;, y todo esto mantenerlo en un modelo aparte a los datos raw.
  * Con esta información enriquecida, podemos usar los **Pivot**, estos nos permite dar acceso a usuarios a construirse sus propios informes, de una manera muy sencilla y visual, sin tener que conocer SPL, aquí os dejo un par de links
  * <a href="https://docs.splunk.com/Documentation/Splunk/7.2.4/Pivot/IntroductiontoPivot" target="_blank" rel="noopener noreferrer">Doc oficial</a> 
  * <a href="https://www.youtube.com/watch?v=MdjDrDTXYWQ&t=393s" target="_blank" rel="noopener noreferrer">Video</a>

<div>
  De esta manera podemos conseguir acceder a nuestra información de manera mucho mas rápida, pero siempre es importante hacer un filtrado de los campos, en la medida de lo posible, sobre los datos raw, y disponer en nuestro <b>Data Model</b> únicamente, de los campos necesarios.
</div>

<div>
</div>

<div>
  Como suele ocurrir en muchos casos, podemos encontrar algún inconveniente, disponer de esta información acelerada, aumenta el consumo de nuestros recursos, por lo que es algo que debemos tener en cuenta.
</div>

<div>
  Como siempre, las pruebas con gaseosa, lo ideal es probarlo en nuestro entorno de pruebas, ya que además, podemos exportar/importar nuestro <b>Data Model</b> de una manera muy sencilla
</div>

<div>
  <ul>
    <li>
      Exportar:
    </li>
  </ul>
</div>

<div class="separator" style="clear:both;text-align:center;">
  <a href="https://4.bp.blogspot.com/-iRhCr-HM9Ns/XIbPpu1jjTI/AAAAAAABOwU/HXWIuoPhpJkCCJbEgmLEKR-bM-EtMqIKQCLcBGAs/s400/data_mode_export.png" style="margin-left:1em;margin-right:1em;"><img border="0" height="27" src="https://4.bp.blogspot.com/-iRhCr-HM9Ns/XIbPpu1jjTI/AAAAAAABOwU/HXWIuoPhpJkCCJbEgmLEKR-bM-EtMqIKQCLcBGAs/s400/data_mode_export.png" width="400" /></a>
</div>

<div class="separator" style="clear:both;text-align:center;">
</div>

<li style="text-align:left;">
  Importar:
</li>



<div class="separator" style="clear:both;text-align:center;">
  <a href="https://1.bp.blogspot.com/-QuUUeQ-kYR8/XIbPyeQA4_I/AAAAAAABOwY/vcX5reua9Lk4SSWant3qb0h09qnS6sDOgCLcBGAs/s400/data_mode_import.png" style="margin-left:1em;margin-right:1em;"><img border="0" height="18" src="https://1.bp.blogspot.com/-QuUUeQ-kYR8/XIbPyeQA4_I/AAAAAAABOwY/vcX5reua9Lk4SSWant3qb0h09qnS6sDOgCLcBGAs/s400/data_mode_import.png" width="400" /></a>
</div>

<div class="separator" style="clear:both;text-align:center;">
</div>

<div class="separator" style="clear:both;text-align:center;">
</div>

<div>
</div>
