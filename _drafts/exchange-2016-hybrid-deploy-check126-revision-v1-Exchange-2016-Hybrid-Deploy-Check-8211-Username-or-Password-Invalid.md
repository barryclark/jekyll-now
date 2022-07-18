---
id: 258
title: 'Exchange 2016 Hybrid Deploy Check &#8211; Username or Password Invalid'
date: '2022-01-14T19:23:19+00:00'
author: Ryan
layout: revision
guid: 'https://geekyryan.com/?p=258'
permalink: '/?p=258'
---

These days, it seems every Microsoft product comes with its own unique set of head scratchers. Microsoft Exchange Server is no exception to this. I was installing Exchange 2016 earlier today, to be used as a hybrid configuration server for Office 365 (no local mailboxes). I downloaded the self depackaging executable from Microsoft, and attempted to install it. If you currently have a hybrid configuration (which we did, with Exchange 2010), the Exchange 2016 installer will detect this and run some tests to verify that the Office 365 tenant is ready for Exchange 2016 (more info here: <https://technet.microsoft.com/en-us/library/ms.exch.setup.hybridconfigurationstatuspage(v=exchg.160).aspx>). You’ll be prompted for Office 365 credentials (the user must have the Organization Management role). Seems simple enough, right? Wrong.

After typing in the username and *pasting* the password into the password field, setup came back with an error message stating the username or password was wrong. I then clicked the back button, and it crashed. I ran through this process a few more times, all with the same outcome. I even rebooted the server, which (in my opinion) should never be the resolution to a software problem. I looked through setup logs and found no indication of what the problem could be…

![](https://geekyryan.com/wp-content/uploads/2017/11/2017-11-07_12h57_08.png)

It was on the fourth try that I typed in the password, and this seemed to work. I didn’t receive any error messages about the credentials being wrong. The Exchange setup seemed to continue on successfully. However, it then failed with a different error:

![](https://geekyryan.com/wp-content/uploads/2017/11/2017-11-07_13h12_02.png)

I again looked through the setup logs and found that this error happened anytime setup tried to run the “Get-OrganizationConfig” cmdlet. After troubleshooting for a little while, and no resolution in sight, I turned to Google. One of the posts I came across said that this is a bug in the Exchange installer, and to try and use the Cumulative Update installer instead. Apparently, with Exchange 2016, the Cumulative Update installer’s include all of the Exchange binaries, not just the updated binaries. I downloaded the installer for CU7 (all 6 gigabytes of it…) and successfully installed Exchange 2016. Hope this helps anyone out there struggling with this.