---
layout: post
title: Technical Terms 
---

##### Where are environment variables stored for cloud
For cloud each cloud provider provides place to store environment variables. 

[Environment Variables](https://www.twilio.com/blog/2017/01/how-to-set-environment-variables.html)


##### When developing on your local 
Store these in local. e.g. PATH, User Variable etc. 

##### When developing on docker
In docker these are created in dockerfile using 
```
    ENV <key> <value>
    ENV <key>=<value> ...
    ENV abc=hello
    ENV abc=bye def=$abc
    ENV ghi=$abc
``` 

