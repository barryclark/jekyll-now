---
id: 172
title: 'New Script &#8211; Moves All Disabled AD Objects to a Specified OU'
date: '2016-10-06T03:03:00+00:00'
author: Ryan
layout: post
permalink: '/?p=172'
categories:
    - Uncategorized
tags:
    - Scripts
    - Tools
    - WindowsServer
---

The title says it all. This script will move all disabled AD objects to a specified OU. This script accepts parameters that will allow you to specify whether you want to move Users or Computers and the destination OU. It also accepts a “test mode” parameter that will run the script and output the results, without actually modifying Active Directory.

This is revision 1 of the script. There are still several improvements I would like to make, including better error handling and recovery.

If you have any suggestions or requests, please leave a comment.

[Download Here](https://drive.google.com/open?id=0B2K6VOnt6zeXMVFleWZISHZBTnc)