---
layout: post
title: How to remove unwanted software
permalink: /microsoft/how-to-remove-unwanted-software
post_id: 45
categories:
- How to
- Howto
- Microsoft
- Symantec
- Uninstall
---

Like Symantec Anti-virus. At a friends house right now, and trying to uninstall the product, it won't - it keeps saying that something else wants to keep it there. Very unhelpful error message by the
y way (if Symantec is listening).

Found a great page that explains how to remove unwanted software (surprise, they also trying to remove Symantec... hmmm....).

Here it is at
[it.toolbox.com/blogs/locutus](http://it.toolbox.com/blogs/locutus/how-to-silently-and-remotely-remove-symantec-antivirus-14625).

In a nutshell this is how:*Open regedit, browse to HKEY_LOCAL_MACHINE\SOFTWARE\MICROSOFT\ WINDOWS\CURRENT VERSION\UNINSTALL


*Then do a search for
Symantec (or the name of the software you want to be rid of)


*Copy the value of
UninstallString


*Open a command prompt (Start | Run | CMD) and paste the UninstallString here and add
REMOVE=ALL to the end of that string, press enter.
It will look
similar to this:
MsiExec.exe /X{DBA4DB9D-EE51-4944-A419-98AB1F1249C8} REMOVE=ALL


*Done.
