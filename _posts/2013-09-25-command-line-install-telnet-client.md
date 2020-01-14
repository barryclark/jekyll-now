---
layout: post
title: Command Line Install Telnet Client
permalink: /microsoft/command-line-install-telnet-client
post_id: 874
categories:
- How to
- Microsoft
- Telnet
- Windows
---

I often use telnet to test if a port is open or not. However, on Windows Vista and up, and Windows Server 2008 and up the telnet client isn't installed by default.

To install it, do the following from a command line:pkgmgr /iu:"TelnetClient"
Source:
[Microsoft Technet](http://technet.microsoft.com/en-us/library/cc771275(v=ws.10).aspx)
