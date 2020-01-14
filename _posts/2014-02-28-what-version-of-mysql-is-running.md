---
layout: post
title: What version of MySQL is running?
permalink: /sql/what-version-of-mysql-is-running
post_id: 1137
categories:
- CentOS
- mysql
- SQL
---

On a CentOS 6.x linux box, typing the following will show the MySQL version

mysql -v

or if not the root user, then

mysql -u root -p -v
(Which says user the root user, prompt for the password, then get the version).
