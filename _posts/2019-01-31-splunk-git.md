---
layout: post
title: Splunk GIT
date: 2019-01-31 17:53
author: agarciaizquierdo
comments: true
tags: control versiones, Sin categoría, Splunk, Splunk Apps, Splunk Español
---
Uno de los mayores problemas de <b>Splunk</b> es el control de versiones de una App o un <b>dashboard</b>, hablando siempre de la parte de presentación, ya que la parte de indexación apenas suele tener cambios.<br /><br />Esto se complica cuando ademas tenemos sobre una misma App a varias personas creando dashboards o reports. Splunk por desgracia no dispone de un sistema nativo de control de versiones.<br /><br />Hace unos meses, pusieron en Splunk base la siguiente <a href="https://splunkbase.splunk.com/app/4182/#/overview" target="_blank" rel="noopener noreferrer">App</a>, la cual nos permite llevar un control de versiones, yo no la he podido probar aún, pero si alguno la probáis, podéis poner vuestros comentarios.<br /><br />Hace tiempo, cuando me encontré con este problema, después de buscar, encontré la  esta <a href="https://www.function1.com/2017/09/using-git-to-manage-splunk" target="_blank" rel="noopener noreferrer">solución</a>, esta muy bien si tenemos un Deployment Server, en caso de no disponer de uno, podemos intentar adaptarlo a nuestro entorno, desplegando directamente sobre el SH, o nuestro entorno StandAlone
