---
layout: post
title: Apache and Blackboard version
date: '2013-11-10 17:00:00'
---

Sometimes you are looking to get out of past, just to know what server you are on or maybe get the apache version that the server is running.

We already know that Blackboard comes with Apache 1.3 for the most part, but you know that you can always customize it to have Apache 2.0 or any Apache.

I won't go into detail into how to install the different versions of Apache or even how to configure with what you want, but this is more of a quick tip.

**Quick Tip**

Get the Apache and Blackboard Version with one command:

	grep "bbconfig.version.number" /usr/local/blackboard/config/bb-config.properties && ps -ef | grep httpd | grep " 1 " | awk '{system ( $8 " -v")}'

Or if you are looking for only the Apache version you can do any of the following:

	# get the entire verbose
	ps -ef |grep httpd| grep " 1 " |awk '{system ( $8 " -V")}'
 
	#get the minimal verbose
	ps -ef |grep httpd| grep " 1 " |awk '{system ( $8 " -v")}'
    
enjoy!