---
layout: post
title: Using GeekTool to display key timezones
permalink: /how-to/using-geektool-to-display-key-timezones
post_id: 1093
categories:
- GeekTool
- GTD
- How to
---

I'm using 
[GeekTool](http://projects.tynsoe.org/en/geektool/) to display some key time zones on my wallpaper, which happens to include world map.

[![Desktop with Geeklets to show time zone info](/images/Desktop-300x189.png)](/images/Desktop.png)
The key to this is to add Shell Geeklets using a command similar to this:


env TZ=
**Pacific/Auckland**
 date +'%l:%M %p %A'

Use the
[appropriate timezone code](http://en.wikipedia.org/wiki/List_of_tz_database_time_zones) and the
[date string formatting codes](http://www.freebsd.org/cgi/man.cgi?query=strftime&sektion=3&apropos=0&manpath=FreeBSD+10.0-RELEASE) to display the time and date the way you want.
