---
layout: post
title: PROBLEMAS SP1 EN EXCHANGE 2010
date: 2010-10-15 09:05
author: agarciaizquierdo
comments: true
categories: [BACKUP EXEC, EXCHANGE, Sin categoría, WINDOWS 2008]
---
Buenas a todos, esta semana la cosa va de exchange por lo que parece. Esta misma semana he tenido problemas al instalar el SP1 de exchange 2010 en un cliente, la verdad que nunca había tenido ningún problema en este proceso. La cosa es que tras instalar los típicos hotfix (que ademas nos hacen reiniciar la maquina). Me lanzo a actualizarlo y descubro un error bastante raro:<br /><br /><i><b>Setup cannot continue with the upgrade because the ‘beremote’ () process (ID: 3940) has open files.  Close the process and restart Setup.</b></i><br /><br />Este error me daba en la comprobación que hace el exchange en los roles de HUB, CAS y MAILBOX, para variar y tras investigar un poco parece ser que era un error que tenia con el agente de backup exec , y este error también estaba reportado con exchange 2007. La solucion sencilla, detener los servicios de backuo exec y a funciona!<br /><br />Como reflexión personal, no entiendo que se este dando este problema desde exchange 2007 y no se haya solucionado
