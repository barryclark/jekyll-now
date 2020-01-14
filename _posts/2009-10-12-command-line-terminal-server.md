---
layout: post
title: Command line terminal server
permalink: /general/command-line-terminal-server
post_id: 185
categories:
- General
- Microsoft
- RDP
- Terminal Server
---

I've just come across a terminal server that wouldn't let me log on. Turns out the maximum number of users the terminal server is licensed for has been exceeded.

Thusly, from another machine on the network, we open a command prompt and type

`qwinsta /server:<servername>`

This will give a list of the terminal server sessions on that server, note the ID number (aka sessionid) as we use them in the following commands.

We can reset a session by using

`rwinsta <sessionid> /server:<servername>`

or we can disconnect the session with

`tsdiscon <sessionid> /server:<servername>`

or we can logoff a session with

`logoff <sessionid> /server:<servername>`


[Dan Rigsby has more info](http://www.danrigsby.com/blog/?p=378) as does [Scott Forsyth](http://weblogs.asp.net/owscott/archive/2003/12/30/46776.aspx).
