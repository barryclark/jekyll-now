---
title: 'pgstat: a database utility like iostat'
author: kgorman
layout: post
permalink: pgstat-a-database-utility-like-iostat
fave-post_views:
  - 109
categories:
  - PostgreSQL
tags:
  - postgresql
  - Python
  - tools
---
I needed a utility for capturing various data-points about a PostgreSQL database as I performed load tests. I copied a utility I have used previously on Oracle that worked quite well. The new utility is called <del datetime="2009-02-25T03:21:53+00:00">pgd</del> pgstat. This utility spits out various DB metrics on the command line similar to iostat. It&#8217;s good for quick diagnosis, performance testing, etc. The output is suitable for import/graphing in excel as well, just use space delimited format when importing the data. Here is a screenshot of how the output appears. You can <a href=http://pgfoundry.org/projects/pgstat2/>download the utility</a> and give it a whirl.

<a href=http://www.kennygorman.com/wordpress/wp-content/uploads/2008/10/pgd_image.jpg target=1><img src=http://www.kennygorman.com/wordpress/wp-content/uploads/2008/10/pgd_image.jpg width=450></a>
