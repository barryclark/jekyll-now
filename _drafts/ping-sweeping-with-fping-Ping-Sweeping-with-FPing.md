---
id: 210
title: 'Ping Sweeping with FPing'
date: '2015-03-09T01:08:00+00:00'
author: Ryan
layout: post
permalink: '/?p=210'
image: /wp-content/uploads/2015/03/2015-03-08_21h04_50.png
categories:
    - Uncategorized
tags:
    - Linux
    - Scripts
    - Security
    - Tools
---

I generally use NMAP for any type of host discovery, but recently started experimenting with FPing. One thing I found is that, when performing a ping sweep, not only do I see the hosts that replied to the ping, but FPing also sends any unreachable IP addresses to stdout (which is super annoying and ugly if you ask me…).

[![](https://geekyryan.com/wp-content/uploads/2015/03/2015-03-08_21h04_50.png)](https://geekyryan.com/wp-content/uploads/2015/03/2015-03-08_21h04_50.png)

Anyway, after a bit of research, I found a nifty way to suppress these messages. Linux allows us to redirect all error messages to /dev/null. So instead of just running the vanilla fping -a -g…. you would run the program and output all error messages /dev/null, like so:

[![](https://geekyryan.com/wp-content/uploads/2015/03/2015-03-08_21h07_14.png)](https://geekyryan.com/wp-content/uploads/2015/03/2015-03-08_21h07_14.png)