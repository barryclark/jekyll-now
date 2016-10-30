---
layout: post
status: publish
published: true
title: How to configure Eclipse 3.5 to work with Tomcat6 on Ubuntu?
author:
  display_name: Gunith
  login: admin
  email: gunith@gmail.com
  url: ''
author_login: admin
author_email: gunith@gmail.com
wordpress_id: 17
wordpress_url: http://www.beta.gunith.com/?p=17
date: '2010-11-21 13:11:37 +0530'
date_gmt: '2010-11-21 07:41:37 +0530'
categories:
- Linux
- Java
- Tomcat
- Eclipse
tags:
- Java
- linux
- ubuntu
- eclipse
- tomcat
- jee
comments: []
---
When I was trying to add Tomcat 6 on Eclipse's server list I got the following error message,

`Cannot create a server using the selected type`

The fix is as follows,
```shell
sudo apt-get install tomcat6
cd /usr/share/tomcat6
sudo ln -s /var/lib/tomcat6/conf conf
sudo ln -s /etc/tomcat6/policy.d/03catalina.policy conf/catalina.policy
sudo ln -s /var/log/tomcat6 log
sudo chmod -R 777 /usr/share/tomcat6/conf
```

This links all the files which are all over the place to /usr/share/tomcat6, which is awesome

Sources:

[http://ubuntuforums.org/showthread.php?p=8541057](http://ubuntuforums.org/showthread.php?p=8541057) and

[http://www.coderanch.com/t/426312/Linux-UNIX/running-Tomcat-with-eclipse-Ubuntu](http://www.coderanch.com/t/426312/Linux-UNIX/running-Tomcat-with-eclipse-Ubuntu)
