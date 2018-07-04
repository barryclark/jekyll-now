---
title: Apache httpd, futex and thundering herd problem.
---
**TL;DR Version** 

if apache httpd stalls, i.e. there are workers running, but site is unresponsive, curl is able to connnect 
but just stucks instead of spitting an output, try attaching a strace on couple of workers. Are all workers 
stucked in futex syscall ? If yes, chances are, that httpd is being victim of [this bug.](https://groups.google.com/forum/#!topic/mechanical-sympathy/QbmpZxp6C64)

But afraid not, there is a quick fix. try putting below snippent in your httpd.conf file.

``` Mutex sysvsem ``` 

Also, take a look at httpd's [Mutex](https://httpd.apache.org/docs/2.4/mod/core.html#mutex) directive. 

restart apache, it should now be using system V semaphore rather than futex, and it should survive. 

**Long Version**

So, why does httpd use synchronization primitives anyway? Because to avoid thundering herd problem 
that used to exist in TCP/IP stack implementation in kernel. Newer event mpm (put link to event mpm here) 
uses different mechanism, so it might not get affected by this. 

**Thundering herd problem**

Assume that, out of N + 1 process,  N process are waiting to enter a critical section, they cannot, because
one process is already inside critical section, the moment that process comes outside critical section, one process
out of N waiting should enter critical section, there are various algorithem which decides which process should enter 
critical section, out of N waiting process. However, some implementation, rather follows a simple algorithem: All process
waiting to enter critical section are waken up, and each of them try their luck. out on N, 1 wins, N - 1 go back and try 
their luck next time. This waste CPU cycles. In ideal situation, only one process should be woken up to let in into critical 
section, but Thundering herd approch might be simple to implement. 


**Thundering herd and accept system call** 

To make this discussion simpler, Let's assume that prefork MPM is being used in httpd. To the best of my knowledge, 
most of the mod_php and mod_perl app configuration uses prefork mpm.

when httpd starts, following things happens. 

1.  parent process binds to Listening port. ( 80 and 443 , mostly). Assume httpd in this example serves only to port 80.
bind on port would get that process a new descriptor on which accept call can be invoked to accept new connection coming
to that port. For a sake of clarification, httpd will not noe issue accept call, instead, it will fork number of childern
based upon configuration. 

2.  each process would get descriptor from parent, which parent has gotten from OS by issuing bind Listen call in step 1.

3.  each process now can invoke accept system call, which would block them till a new connection arrives. 

4.  Lets assume that when httpd starts, there is no incoming request. All N + 1 children are stucked in accept call.

5.  At time T0, new request arrives, which eventuly unblocks one and only child, out of N + 1 waiting, so now there is a 
one process serving a connection and N are still blocked.

6.  Assuming that there is no new request, and the one arrived at T0 is successfully served. Child serving this connection would now
once again issue accept, the way it did in step 3. 

7.  Once again there will be N + 1 process are stucked in accept call. 

8. In reality, there would be constantly new request coming, and process would get unblocked as and when new request come. 
So at time T0, new request R0 comes which would be served P0. Now when new request R1 comes at time T1, as P0 is already busy serving 
R0, any of P1 to PN might get unblocked to handle R1. Lets assume that P1 gets R1. So now there are only N - 1 process stucked in accept call. 

9. The way accept system call is implemented in various OS, whenever a new connection arrives, all process stcuked in accept are waken up, 
but only one gets a new connection and rest of are once again blocked in accept call. This waste CPU. httpd wansts to minimize wastage of CPU. 
think of a situtation when 100 httpd process are waken up and only one gets a new connection. 


**Workaround that httpd uses** 
1.  One way to avoid this scenario is to serialize access to accept system call. If only process is stucked in 
accept system call, there will be only one to get unblocked when new connection arrives. This is analogus to say 
that an array which holds only one element is always sorted.

2. To implement this, accept call is put inside critical section. At any given moment, only once process can enter critical section, and get 
stucked in accept. 

3. Starting with httpd 2.4, a mechanism which can be used to implement a critical section can be specified. Couple of mechanisms are 
sysvsem, futex, posixsem, flock and fcntl. 

**problem with Futex mechanism**

As mentioned earier in the article before, futex implementation was broken for sometime. If that bug exists on a machine on which 
httpd runs, and mechanism which uses futex is chosen, httpd child process might get stucked into deadlock. Solution to fix this 
problem would be to update/upgrade distro being used, or if it is not too obvious to do, use different mechanism, like sysvsem, 
by mentionting 

```Mutex sysvsem```

in httpd.conf file. This is a workaround. Futex might be more efficeint then sysvsem, so in a long run better upgrade a distro to make 
most of your hardware. 

