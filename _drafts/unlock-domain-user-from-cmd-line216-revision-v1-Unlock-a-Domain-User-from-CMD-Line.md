---
id: 295
title: 'Unlock a Domain User from CMD Line'
date: '2022-01-14T19:23:35+00:00'
author: Ryan
layout: revision
guid: 'https://geekyryan.com/?p=295'
permalink: '/?p=295'
---

To unlock a domain user from the command line, use this command:

*net user &lt;username&gt; /domain /active:yes*

This can also be done using Powershell:  
  
Unlock-ADAccount -identity “CN=John,OU=myUsers,DC=myDomain,DC=local”*