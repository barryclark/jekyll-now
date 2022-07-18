---
id: 296
title: 'The Case of Transitive Trusts and Dropped RPC Connections'
date: '2022-01-14T19:23:35+00:00'
author: Ryan
layout: revision
guid: 'https://geekyryan.com/?p=296'
permalink: '/?p=296'
---

I was at a client earlier this morning, working to get a transitive forest trust setup between their two domains. Setting up the trust on ServerA to DomainB went without issue. However, when trying to create the trust between ServerB and DomainA, I received this error: The secure channel reset on Active Directory Domain Controller (Your domain controller) of domain (Your domain) to domain (your other domain) failed with error: RPC server is unavailable.

Troubleshooting (as always) started off with the basics: is the firewall on or off, are the services running, are the names being properly resolved, etc. Well, the Windows Firewall on both servers was off and  
the RPC services were running. So what now?? I fired up NMAP on ServerB and did a syn scan on ServerA. After reviewing the output, I could see that the ports were open. I then went over to ServerA and opened up the Services MSC console. The RPC services appeared to be running. Being that they are system services and you cannot manually interact with them, I was unable to manually restart them. Just out of curiosity,

I opened a command prompt while connected to that server and ran Netstat -A. This is when I had the “AHA!” moment. Nothing was listening on any of the RPC ports! I rebooted the server (something I don’t really like to do..), logged in and ran Netstat -A again. This time, RPC was listening. I went back over to ServerB, walked through the New Trust Wizard, and success! Oh, the feeling of victory!