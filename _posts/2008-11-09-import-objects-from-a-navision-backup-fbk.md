---
title: 'Import Objects from a Navision backup (.fbk)'
date: Sun, 09 Nov 2008 21:55:34 +0000
draft: false
tags: [fbk, Microsoft Dynamics NAV, NAV, Navision, objects]
---

Not sure where I originally saw this tip but it's been so handy for me I think it needs to exist in more than one location.  If you've done a NAV backup and need to grab a couple objects out of the backup, instead of doing a full restore and then exporting select objects, you can point the object designer import process at the .fbk backup file. NAV will scan through and present a list of conflicting objects, which should be all objects.  Skipping the full restore is a HUGE time saver. Shift + F12 to open object designer.  File -> Import.  You'll have to change the file type to 'All Files (*.*)'. ![000a]({{ site.baseurl }}/images/2008/11/000a.jpg) It'll scan through the .fbk and present the Import Worksheet.

![002]({{ site.baseurl }}/images/2008/11/002.jpg)

Here you can CTRL+F1 to select individual objects that you'd like to replace or import.  On the menu View -> 'Marked Only' will show the marked objects, or you can save them as .fob files.