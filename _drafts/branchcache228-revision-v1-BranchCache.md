---
id: 300
title: BranchCache
date: '2022-01-14T19:23:44+00:00'
author: Ryan
layout: revision
guid: 'https://geekyryan.com/?p=300'
permalink: '/?p=300'
---

Branchcache is a technology unique to Windows 7 and Windows Server 2008 R2. It provides faster connection to shared files across wide area networks. Branchcache works by caching content hosted on remote servers on a local caching server in the LAN. When a client queries for data on a remote server, it first looks in the local caching server. If the data is not found there, the remote server is accessed and transfer’s the data to the local caching server, where it is then accessed by the client who originally made the request. That way, all future client requests will not have to go across the wide area network, rather opting to access the local caching server until the data changes.

Branchcache is only available on Windows 7 clients running Enterprise or Ultimate, and Windows Server 2008 R2. Branchcache becomes active when the round trip latency time from client to remote server exceeds 80 milliseconds.

Branchcache is available in two modes: distributed cache mode and hosted cache mode. What you just read above was the basics of hosted cached mode. Distributed cache mode works differently to achieve the same results. When a client accesses data across the WAN, it stores that data in its own cache. This way, if another client needs access to the data, it can retrieve it locally. Also, this allows each client to host part of the cache, rather than one machine hosting the entire cache.

There are two steps to configuring Branchcache on a Windows 7 client. I will not include the server configuration at this point in time.

<span style="mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;"><span style="mso-list: Ignore;">1)<span style="font: 7.0pt "Times New Roman";"> </span></span></span>Enable Branchcache (Hosted or Distributed, Server 08 R2 will be required for Hosted mode)

<span style="mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;"><span style="mso-list: Ignore;">2)<span style="font: 7.0pt "Times New Roman";"> </span></span></span>Configure the appropriate ports within the Windows Firewall

You can enable Branchcache from within Group Policy or by using the Netsh command. When using Group Policy, navigate to Computer Configuration &gt; Administrative Templates &gt; Network &gt; Branchcache. From here you can turn on Branchcache and enable the mode you want to use. You can also set the percentage of disk space to be used for caching. After this, open the Windows Firewall and unblock the Branchcache ports. You only need to do this when configuring Branchcache via Group Policy. Using the Netsh command automatically configures the firewall. Here are the basic commands for Netsh:

Netsh Branchcache set service mode=distributed

Netsh Branchcache reset

Netsh Branchcache show status

Netsh Branchcache set cachesize

\*Configuring Branchcache must be done from an administrative command prompt.