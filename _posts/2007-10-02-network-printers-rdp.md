---
layout: post
title: Network printers & RDP
permalink: /microsoft/network-printers-rdp
post_id: 13
categories:
- How to
- Howto
- IP
- Microsoft
- network
- printer
- RDP
---

Setting up a remote user today, who has a network printer on their local network which they want available to the RDP session (over VPN).

RDP doesn't by default redirect non COM/LPT/USB ports - i.e. an IP port.

Thankfully, a [simple registry edit noted in MS KB 302361 makes it easy to tell XP to redirect other ports](http://support.microsoft.com/default.aspx?scid=kb;en-us;302361).
