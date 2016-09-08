---
id: 413
title: Solución a bug (crush) en Eclipse y derivados
date: 2013-09-15T21:17:00+00:00
author: ovalenzuela
layout: post
guid: https://ovalenzueladotcom.wordpress.com/2013/09/15/solucion-a-bug-crush-en-eclipse-y-derivados
permalink: /2013/09/solucion-a-bug-crush-en-eclipse-y-derivados.html
blogger_blog:
  - www.ovalenzuela.com
blogger_author:
  - Andrés Barrera
blogger_02f5be51301771664ae7c1c72bf29246_permalink:
  - 8748974327214744258
categories:
  - Amigos
---
Me es cómodo trabajar con Eclipse, creo que ya es la costumbre, utilizo este IDE tanto para programar en el trabajo como varios de sus derivados para realizar proyectos (clientes de base de datos, JBoss, PHP, etc). El único problema es que algunos de estos forks (no me ha ocurrido en la última versión Kepler) mientras programaba ocurría un “crush” y se cerraba el programa sin motivo aparente. El error en si está reportado en el siguiente <a href="https://bugs.eclipse.org/bugs/show_bug.cgi?id=404776#c6" target="_blank">link.</a>

El log que produce el entorno (hs\_err\_pidNN.log) coincide:

\# A fatal error has been detected by the Java Runtime Environment:  
#  
\# SIGSEGV (0xb) at pc=0x00007f9d1d523d39, pid=8255, tid=140315299092224  
#  
\# JRE version: 7.0_17-b02  
\# Java VM: Java HotSpot(TM) 64-Bit Server VM (23.7-b01 mixed mode Debian GNU/Linux-amd64 compressed oops)  
\# Problematic frame:  
\# C [libsoup-2.4.so.1+0x72d39] soup\_session\_feature_detach+0×19

En la excepción arrojada en el log dice (extracto):

<pre>Stack: [0x00007f9db37f1000,0x00007f9db38f2000],  sp=0x00007f9db38ef2c0,  free space=1016k<br />Native frames: (J=compiled Java code, j=interpreted, Vv=VM code, C=native code)<br />C  [libsoup-2.4.so.1+0x72d39]  soup_session_feature_detach+0x19<br /><br />Java frames: (J=compiled Java code, j=interpreted, Vv=VM code)<br />j  org.eclipse.swt.internal.webkit.WebKitGTK._soup_session_feature_detach(JJ)V+0<br />j  org.eclipse.swt.internal.webkit.WebKitGTK.soup_session_feature_detach(JJ)V+9<br />j  org.eclipse.swt.browser.WebKit.create(Lorg/eclipse/swt/widgets/Composite;I)V+920<br />j  org.eclipse.swt.browser.Browser.(Lorg/eclipse/swt/widgets/Composite;I)V+81<br />j  org.eclipse.jface.internal.text.html.BrowserInformationControl.isAvailable(Lorg/eclipse/swt/widgets/Composite;)Z+12<br />j  org.eclipse.jdt.internal.ui.text.java.hover.JavadocHover$HoverControlCreator.doCreateInformationControl(Lorg/eclipse/swt/widgets/Shell;)Lorg/eclipse/jface/text/IInformationControl;+18<br />j  org.eclipse.jface.text.AbstractReusableInformationControlCreator.createInformationControl(Lorg/eclipse/swt/widgets/Shell;)Lorg/eclipse/jface/text/IInformationControl;+20<br />j  org.eclipse.jface.text.AbstractInformationControlManager.getInformationControl()Lorg/eclipse/jface/text/IInformationControl;+176<br />j  org.eclipse.jface.text.AbstractInformationControlManager.internalShowInformationControl(Lorg/eclipse/swt/graphics/Rectangle;Ljava/lang/Object;)V+18<br />j  org.eclipse.jface.text.AbstractInformationControlManager.presentInformation()V+70<br />j  org.eclipse.jface.text.AbstractHoverInformationControlManager.presentInformation()V+64<br />j  org.eclipse.jface.text.TextViewerHoverManager.doPresentInformation()V+1<br />j  org.eclipse.jface.text.TextViewerHoverManager$5.run()V+4</pre>

Por lo que al parecer es un error con webkit. La solución propuesta (como dice en la lista del bug) es editar el archivo .ini donde está la configuración (en mi caso es eclipse.ini, pero puede variar según el fork que estén usando) y agregar la siguiente línea al final:

<pre>-Dorg.eclipse.swt.browser.DefaultType=mozilla</pre>

 

_Artículo original en [Psep.cl](http://www.psep.cl/2013/09/08/solucion-a-bug-crush-en-eclipse-y-derivados/ "Solución a bug (crush) en Eclipse y derivados - Psep.cl"), puede ser distribuido y modificado mientras incluya esta nota según Licencia <a title="CC by-sa 3.0" href="http://creativecommons.org/licenses/by-sa/3.0/deed.es" target="_blank">CC</a>._