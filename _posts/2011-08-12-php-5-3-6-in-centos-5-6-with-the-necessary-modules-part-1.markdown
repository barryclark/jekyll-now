---
layout: post
title: php 5.3.6 in Centos 5.6 with the NECESSARY MODULES (part 1)
date: '2011-08-12 16:00:00'
---

Hey, me again.

Well i have been using Centos 5.6 for a few months now and all the time i never got the hang and still havent got it on the yum installs and the repositories, but i was struggling on how to get my php to work properly. I tried different versions and tried different things, different versions, different ways.. read on and you might find what can be accomplish looking around and wanting to do things<!--more-->

Hey, you came back. here is the info that you were looking for.

I started installing my php with yum
<pre class="brush: bash; gutter: true"> php php-dba php-mysql php-soap php-gd php-odbc php-xml php-imap php-pdo php-xmlrpc php-process php-mbstring php-snmp php-mcrypt</pre>
So this will install your php right? and its supposed to install the "latest" stable and version available.. <span style="color: #ff0000;"><strong>WRONG</strong></span> but you are close... this will install php 5.1 which isnt bad and has great compatibility with modules like mcrypt and pdo connectons and it doesnt has major bugs as the newer releases that i will mention a bit below.

if you search in yum for another packages in yum with php doing this:
<pre class="brush: bash; gutter: true">yum search php</pre>
You will be prompted with several (more than 50) packages that have the php tag on it, but if you notice closely you see something like
<pre class="brush: bash; gutter: true">php53-XX
XX states for whatever package it is</pre>
Well if you run the installer for all those that you might need you will be installing something like this:
<pre class="brush: bash; gutter: true">yum install php53 php53-cli php53-common php53-dba php53-gd php53-mbstring php53-mysql php53-odbc php53-pdo php53-xml php53-xmlrpc</pre>
But as another <a title="Chris Jean Blog" href="http://chrisjean.com/2011/06/24/upgrade-php-5-1-or-5-2-to-5-3-on-centos/" target="_blank">blogger  / poster</a> mentioned you are missing some major components like mcrypt (hey, if you didnt notice no big issue, at first i missed it and some of my pages didnt worked at all), so after following this post <a title="Upgrade Centos and install Mcrypt" href="http://chrisjean.com/2011/06/24/upgrade-php-5-1-or-5-2-to-5-3-on-centos/" target="_blank">http://chrisjean.com/2011/06/24/upgrade-php-5-1-or-5-2-to-5-3-on-centos/</a> i learned that after installing the new php53 with yum you are still 3 releases behind (5.3.3)  and i urgently needed the MCrypt module, follow this commands to install the module

First you need this libraries
<pre class="brush: bash; gutter: true">sudo yum install php53-devel libmcrypt-devel</pre>
Then you need to download the php, i did this in my home
<pre class="brush: bash; gutter: true">wget http://us2.php.net/get/php-5.3.3.tar.gz/from/us.php.net/mirror</pre>
Uncompress it, get into the folder and phpize it, so everything will be good to go
<pre class="brush: bash; gutter: true">./configure
make
make test
sudo make install</pre>
Here i got an error. If you do so. <span style="color: #0000ff;">CORRECT IT</span> before going on, probably is a missing library, so just do yum install whatever library

Now its time to configure it, make it and finish it.
<pre class="brush: bash; gutter: true">./configure
make
make test
sudo make install</pre>
If at any time you need to insert a value, probably they will be a Y and your email. follow the instructions there is no way to go bad at it. and if you do it bad, leave me a comment, hopefully i can help you out.. or remember, google is your best friend.

This will probably install the do the entire installation of the mcrypt module but now you need to install it. Since the new php are loaded via ini files you will need to do so like this:
<pre class="brush: bash; gutter: true">echo -e &quot;; Enable mcrypt extension module\nextension=mcrypt.so&quot; | \
 sudo tee /etc/php.d/mcrypt.ini</pre>
And that is done!!! wuhu.. but wait.. that is not the latest php .. ding.. well at least everything was working fine, but what if i want all the neat things and tricks that php 5.3.6 can do for me..

I will let you now in the follow up.
