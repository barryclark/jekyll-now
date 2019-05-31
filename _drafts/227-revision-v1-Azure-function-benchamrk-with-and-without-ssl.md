---
id: 228
title: Azure function benchamrk with and without ssl
date: 2017-10-23T20:27:35+02:00
author: Janusz Nowak
layout: revision
guid: http://blog.janono.pl/2017/10/227-revision-v1/
permalink: /2017/10/227-revision-v1/
---
~$ ab -n 5000 -c 150 -l https://funappbenchs1.azurewebsites.net/api/Function1  
This is ApacheBench, Version 2.3 <$Revision: 1706008 $>  
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/  
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking funappbenchs1.azurewebsites.net (be patient)  
Completed 500 requests  
Completed 1000 requests  
Completed 1500 requests  
Completed 2000 requests  
Completed 2500 requests  
Completed 3000 requests  
Completed 3500 requests  
Completed 4000 requests  
Completed 4500 requests  
Completed 5000 requests  
Finished 5000 requests

&nbsp;

Server Software: Microsoft-IIS/8.0  
Server Hostname: funappbenchs1.azurewebsites.net  
Server Port: 443  
SSL/TLS Protocol: TLSv1.2,ECDHE-RSA-AES256-SHA384,2048,256

Document Path: /api/Function1  
Document Length: Variable

Concurrency Level: 150  
Time taken for tests: 21.282 seconds  
Complete requests: 5000  
Failed requests: 0  
Total transferred: 1754346 bytes  
HTML transferred: 369346 bytes  
Requests per second: 234.94 \[#/sec\] (mean)  
Time per request: 638.461 \[ms\] (mean)  
Time per request: 4.256 \[ms\] (mean, across all concurrent requests)  
Transfer rate: 80.50 [Kbytes/sec] received

Connection Times (ms)  
min mean[+/-sd] median max  
Connect: 96 126 67.8 115 3114  
Processing: 64 508 291.7 424 2252  
Waiting: 57 502 292.8 420 2252  
Total: 278 633 294.2 553 3583

Percentage of the requests served within a certain time (ms)  
50% 553  
66% 623  
75% 683  
80% 734  
90% 862  
95% 1343  
98% 1698  
99% 1817  
100% 3583 (longest request)