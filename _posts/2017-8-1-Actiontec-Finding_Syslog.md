---
layout: post
title: Actiontec - Finding syslog..SIG 11 ?!
---

After dumping the firmware, I could see the filesystem and all web pages. There were hidden options that I could go directly to if I knew the URL [Hidden Menus](https://github.com/gclair/ActionTecR1000#hidden-menu-options).

 One was the syslog entry! [Syslog](https://github.com/gclair/ActionTecR1000#syslog---hidden-menu)
 
 ![Syslog](https://github.com/gclair/ActionTecR1000/raw/master/images/Syslog.png "Syslog")

Through that I found that the httpd had died with a possible SIG 11 [Signals](http://man7.org/linux/man-pages/man7/signal.7.html). 

Further investigation and some terrible 'fuzzing' techniques with python showed I could overflow a buffer without crashing the daemon and have that output show up persistently via the WebGUI. Unauthenticated.