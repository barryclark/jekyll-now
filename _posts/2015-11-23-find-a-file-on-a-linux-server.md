---
layout: post
title: Find a file on a linux server
permalink: /general/find-a-file-on-a-linux-server
post_id: 1343
categories:
- General
- Linux
---

From the command line

`find / -name 'index.html' 2>/dev/null`

This will find and display all occurances of index.html and all the errors will not display.
