---
layout: post
title: How to audit a file
date: '2012-02-01 17:00:00'
---

A few days ago, I was having an issue were for some reason a file in the system was being deleted, at the moment I did not know what was causing it, or why it was occurring, but after investigating a while we were able to kind of point the issue to when the system was restarting, but the thing is that if you know Blackboard you know that there are a few things that get restarted at once.

So we put a script that alerted us on when the file was getting deleted which tied it to most of the cases when the system was restarted, but again, that was not enough, so investigating I found a nice article about a unix utility called:

	auditctl
It's a pretty awesome tool.
What you can do with it?

* See if a file is edited
* See if a file is accessed
* See if a file is deleted
* Monitor anything that you wanted
* other stuff .. 

At the end there is endless opportunities that you can find with this tool.
What you need to do?
Well, the first thing is to download it and install it, http://bit.ly/xFhRGI - _I bet you can Google, on how to install this tool in your desire OS, in RedHat machine that I was using, it was already installed, but in CentOS you can yum install it._

Afterwards, you can see if there is any audit setup in your machine running the following command:

	auditctl -l
If you need more options and are eager to learn more about this tool you can type:

	[root@enriquemanuel ~]# auditctl --help
    usage: auditctl [options]
    -a Append rule to end of ist with <a>ction
    -A Add rule at beginning of ist with </a><a>ction
    -b Set max number of outstanding audit buffers
    allowed Default=64
    -d Delete rule from ist with </a><a>ction
    l=task,entry,exit,user,watch,exclude
    a=never,possible,always
    -D Delete all rules and watches
    -e [0..2] Set enabled flag
    -f [0..2] Set failure flag
    0=silent 1=printk 2=panic
    -F f=v Build rule: field name, operator(=,!=,,=,&,&=) value
    -h Help
    -i Ignore errors when reading rules from file
    -k Set filter key on audit rule
    -l List rules
    -m text Send a user-space message
    -p [r|w|x|a] Set permissions filter on watch
    r=read, w=write, x=execute, a=attribute
    -q make subtree part of mount point's dir watches
    -r Set limit in messages/sec (0=none)
    -R read rules from file
    -s Report status
    -S syscall Build rule: syscall name or number
    -t Trim directory watches
    -v Version
    -w Insert watch at -W Remove watch at 
Or go to: http://linux.die.net/man/8/auditctl Well to what I actually did: 

#### My Solution:
Created my audit with the following.

	auditctl -w /login.jsp -p warx -k login-file
Then: 

* Waited until things finish or disappear
* Wait until you feel there is was a change
* Now the fun part, lets audit the file

Lets Start searching:

	ausearch -f /login.jsp
This will provide a result like this:

	time->Tue Jan 31 02:17:50 2012
    
	type=PATH msg=audit(1327994270.505:474667): item=0 name="/usr/local/blackboard/webapps/login/custom/bb_bb60/login.jsp" inode=13154064 dev=00:17 mode=0100664 ouid=500 ogid=500 rdev=00:00
    
	type=CWD msg=audit(1327994270.505:474667): cwd="/usr/local/blackboard/apps/service-wrapper/bin"
    
	type=SYSCALL msg=audit(1327994270.505:474667): arch=c000003e syscall=2 per=400000 success=yes exit=336 a0=56fb32b0 a1=0 a2=0 a3=2b99998f1e58 items=1 ppid=30883 pid=1413 auid=2970 uid=500 gid=500 euid=500 suid=500 fsuid=500 egid=500 sgid=500 fsgid=500 tty=(none) ses=78047 comm="java" exe="/usr/local/blackboard/jdk/bin/java" key="login_page"

In order to read this, you will need to understand a bit of syscall's (fortunately i didn't know anything about this, so go to the system call code page (http://bluemaster.iu.hio.no/edu/dark/lin-asm/syscalls.html)

### Explanation:
So to explain a bit further the auditctl and ausearch, here is what they mean.

	auditctl -w /login.jsp -p warx -k login-file
Step by Step:

* **auditctl** = the command
* **-w** = add a new rule
* **/login.jsp** = path and file that you want to be monitored
* **-p warx** = rules that you want to apply, in this case all (write, access, read, execute)
* **-k login-file** = alias of the rule when using auditctl -l

All of this information is based on http://www.cyberciti.biz/tips/linux-audit-files-to-see-who-made-changes-to-a-file.html - >Linux NixCraft site tutorial that helped me understand it better.

I hope all the resources here help someone and will provide more troubleshooting steps to someone who needs it.
enjoy!

