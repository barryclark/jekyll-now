---
layout: post
title: What Version of Microsoft Installer?
permalink: /act/what-version-of-microsoft-installer
post_id: 501
categories:
- ACT!
- Installer
- Microsoft
- Script
---

Sage ACT! 2011 and 2012 require Microsoft Installer 4.5 or better to be installed. I like to know prior to running the Sage ACT! installer just which version is installed as the Sage ACT! installer will install it if it's required and then do a reboot. And we all know that reboots are often not welcome.

Thus for one an all's installation enjoyment, here is the code for determining just which version of the Microsoft Installer is present.

<pre><code>
@Echo off
:: Created by Ben Hamilton ACT! CRM Certified Consultant
:: to display which version of the Microsoft Installer is installed.
:: http://ben.hamilton.id.au
Echo set args = WScript.Arguments >fvi.vbs
Echo Set fso = CreateObject("Scripting.FileSystemObject") >>fvi.vbs
Echo WScript.Echo fso.GetFileVersion(args(0)) >>fvi.vbs
Echo Wscript.Quit >>fvi.vbs
for /f "skip=2 " %%G IN ('cscript fvi.vbs %systemroot%\system32\msi.dll') DO (Set MSIVersion=%%G)
Echo Microsoft Installer %MSIVersion:~0,3% is installed.
del fvi.vbs /q
pause
</code></pre>

Hope you find it as useful as I do.
