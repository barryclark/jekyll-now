**TL;DR Version** 

if apache httpd stalls, i.e. there are workers running, but site is unresponsive, curl is able to connnect 
but just stucks instead of spitting an output, try attaching a strace on couple of workers. Does all workers 
are stuck in futex syscall ? If yes, chances are, that httpd is being victim of [this bug.](https://groups.google.com/forum/#!topic/mechanical-sympathy/QbmpZxp6C64)

But afraid not, there is a quick fix. try putting below snippent in your httpd.conf file. 
``` Mutex sysvsem ``` 

Also, take a look at httpd's [Mutex](https://httpd.apache.org/docs/2.4/mod/core.html#mutex) directive. 

restart apache, it should now be using system V semaphore rather than futex, and it should survive. 

** Long Version ** 
