---
layout: post
title: Improve MYSQL Performance
permalink: /general/improve-mysql-performance
post_id: 56
categories:
- Don'tTryThisAtHome
- Humour
---

I've just been reliably informed that one quick way to improve MYSQL Database performance is to issue the following command:

mysql -u uname -e "show databases" | grep -v Database | grep -v "+" | \ gawk '{print "drop database " $1 ";"}' | mysql -u uname

After this, the MYSQL Server will be screaming along. Of course there may be some '
other' screaming going on... ;-) - So kids, don't try this at home without some adult supervision.
