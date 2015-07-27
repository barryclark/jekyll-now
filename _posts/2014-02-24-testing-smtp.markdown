---
layout: post
title: Testing SMTP
date: '2014-02-24 21:58:11'
---

A few days ago some folks requested me to test if SMTP was working. After doing some research and analyzing what I can with the limited set of permissions that I have, I thought in creating a script to do a few things.

##The idea
Well the simple idea was to build a script to send me a few emails every a few minutes apart to test it out. 

###Why?
Well my simplest thought was not that the SMTP was broken but that the script that was being executed overlapped itself and provoked some sort of glitch catching the memory of the system and at the end having the emails not being sent.

###Concluding
So, to the simplest point what I did was crete a batch process that will send emails. You can accomodate this to your needs and use it at your own risk. The program can run in the background or from the cron, but if you run it from the CLI at the end, it will not quit until it finishes.
<pre class="language-shell">for i in {0..10}
do
	DATE=`date`
	echo "time is: $DATE" > now.txt
	sendmail -v enrique@enriquemanuel.com < now.txt
	sleep 300
done
</pre>
####How to Execute it?

1. Create the file using `vi` or uploading it:
<pre class='language-bash'><code>vi test.sh</code></pre>
2. Provide the right permissions to the file:
<pre class='language-bash'><code>chmod 755 test.sh</code></pre>
3. Execute it or run it from the cron (in this case from the CLI).
<pre class='language-bash'><code>./test.sh</code></pre>

####Output
You will get some output like the following:
<pre class="language-bash">enrique@enriquemanuel.me... Connecting to [127.0.0.1] via relay...
	220 host ESMTP Sendmail 8.13.8/8.13.8; Fri, 21 Feb 2014 12:16:48 -0500
	>>> EHLO host
	250 host Hello localhost [127.0.0.1], pleased to meet you
	250-ENHANCEDSTATUSCODES
	250-PIPELINING
	250-8BITMIME
	250-SIZE
	250-DSN
	250-ETRN
	250-DELIVERBY
	250 HELP
	>>> MAIL From:<root@host> SIZE=38
	250 2.1.0 <root@host>... Sender ok
	>>> RCPT To:<enrique@enriquemanuel.m>
	>>> DATA
	250 2.1.5 <enrique@enriquemanuel.me>... Recipient ok
	354 Enter mail, end with "." on a line by itself
	>>> .
	250 2.0.0 s1LHGmir026050 Message accepted for delivery
	enrique@enriquemanuel.me... Sent (s1LHGmir026050 Message accepted for delivery)
	Closing connection to [127.0.0.1]
	>>> QUIT
	221 2.0.0 host closing connection
</pre>

For the obvious reasons it can be improved, but it was a simplest thing to catch my eye and run it faster.
Hope it helps everybody if you are having some sort of this issue.	