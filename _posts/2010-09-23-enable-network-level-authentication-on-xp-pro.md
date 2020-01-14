---
layout: post
title: Enable Network Level Authentication on XP Pro
permalink: /microsoft/enable-network-level-authentication-on-xp-pro
post_id: 291
categories:
- Microsoft
- Microsoft Windows
- MSTSC
---

I just tried to remotely control a server via RDP and got the error

>The remote computer requires Network Level Authentication, which your computer does not support.

A quick search uncovered [Microsoft KB 951608](http://support.microsoft.com/kb/951608/) which shows which two registry keys need editing to enable it. After you reboot of course.

- Click **Start**, click **Run**, type `regedit`, and then press *ENTER*.
- In the navigation pane, locate and then click the following registry subkey:
    `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Lsa`
- In the details pane, right-click **Security Packages**, and then click **Modify**.
- In the Value data box, type `tspkg`. Leave any data that is specific to other SSPs, and then click **OK**.
- In the navigation pane, locate and then click the following registry subkey:
    `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\SecurityProviders`
- In the details pane, right-click **SecurityProviders**, and then click **Modify**.- In the Value data box, type `credssp.dll`. Leave any data that is specific to other SSPs, and then click **OK**.
- Exit Registry Editor.
- Restart the computer.

Now I've been able to connect to the remote site and get the job done.
