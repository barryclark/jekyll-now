---
layout: post
title: Resurrecting Terminal Server
permalink: /microsoft/resurrecting-terminal-server
post_id: 52
categories:
- How to
- Howto
- Microsoft
- Registry
- Server
- Windows
---

A Terminal Server I was attempting to work on today gave quite a lot of grief. The first hint was that users were unable to login to it. When I then tried to login, it gave an error message of:

Login Failed


You are connected to the remote computer. Howerver, an error occured while an initial user program was starting, so you are being logged off. Contact the system administrator for assistance.

So I rebooted it remotely using the command
shutdown /r /f /m \\TSERVER1 while having a continuous ping running, from the ping results I could see it go down, come back up. However on trying to login now, after entering a username/password I could see the logon script run, but no taskbar, start button appeared. Right clicking the desktop didn't give any menu.

I could however navigate to the hard drive on that machine by pointing
**My Computer**
 to
\\tserver1\c$\.

Copying some of the tools at
[live.sysinternals.com](http://live.sysinternals.com) I was able to view the event logs, no issues apparent, check status of various services, all ok.

So I connected via RDP once more (
mstsc /v:tserver1 /console) and viewed the background (still no start button or taskbar) and pressed
CTRL-ALT-END which allowed me to start the Task Manager. This allowed me to run a new task (
File | New tas (run...)) so now I was able to copy the sysinternals
autoruns program to the root of the C: partition, and run it from the affected terminal server. Running
c:\windows\explorer.exe didn't work tho.

Delving into it's depths I found an entry for
HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\Explorer - renaming this entry then allowed Explorer to run. So I've exported the key (in case I do want it sometime) and then deleted it.

Rebooted the server once more and bingo, it lets everyone log in. Very satisfying after a couple of hours of mad hair tearing.
