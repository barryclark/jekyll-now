---
id: 318
title: 'Azure AD Connect No-Start-Connection'
date: '2022-01-14T21:52:35+00:00'
author: Ryan
layout: revision
guid: 'https://geekyryan.com/?p=318'
permalink: '/?p=318'
---

This morning, I ran into an issue with Azure AD Connect that I had never seen before. I received an email alert from Azure AD stating that Password Synchronization was not working for my forest, and the suggested fix was to restart the ADSync service on the server. I restarted the service and then forced a sync to verify it was working.

After forcing the sync, I opened miisclient and noticed some strange errors. We sync multiple on-prem AD forests to Azure AD, and the status for one of them was “no-start-connection”. That error in itself does not seem significant to me. However, after clicking on the “failed-connection” link in the Connection Status pane, things became much more clear.

[![](https://geekyryan.com/wp-content/uploads/2018/07/2018-07-26_08h03_05.png)](https://geekyryan.com/wp-content/uploads/2018/07/2018-07-26_08h03_05.png)

[![](https://geekyryan.com/wp-content/uploads/2018/07/2018-07-26_08h03_18.png)](https://geekyryan.com/wp-content/uploads/2018/07/2018-07-26_08h03_18.png)

The domain controllers for the forest in question are in a datacenter that is geographically separated from the datacenter that our Azure AD Sync server lives in. The two sites are connected via a S2S VPN.

There was obviously some type of connection issue between our two datacenters. In my case, the issue was transient, and resolved itself after a few minutes. But if you’re experiencing this error message, check your L2/L3 connection. Also, verify DNS is working and someone didn’t make changes to your firewall(s). Just walk up or down the OSI model and you’ll eventually find the problem.