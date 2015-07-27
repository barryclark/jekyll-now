---
layout: post
title: php 5.3.6 in Centos 5.6 with the NECESSARY MODULES (part 2) - final
date: '2011-08-13 16:00:00'
---

Well here we go again.

The most awaited second part? maybe not.. no comments yet hehe, but its ok, this is for my purposes only so the rest can go to ..... piiiiiiii hehehe, just kidding.

So in the last post we finish saying that finally just had all the modules in the php 5.3.3 but what happens if you really want the *new* features in 5.3.6 or just want it for security purposes.. well if you are like  me, tend to have the latest and greatest things just because, why? well in some cases you are using some new features in some platforms or developer frameworks that use some different things (cakePHP, CodeIgnitor and others to mention a few).<!--more-->

So well there is no easy way with the normal repositories to install the latest version, you can start saying heck i can probably configure it, make it, and with that compile the PHP that you want and have it there, well, i start doing that but preferred not to.. there is a<strong> <span style="color: #000080;">repository</span></strong> but if you are like me, you really didnt knew how to install them or even how to get them to work, so for those <strong><span style="color: #000080;">new guys</span></strong> this is for you.

So well, after reading a few places there is one that looks the most <strong><span style="color: #000080;">reliable</span></strong> and that site is: <a title="IUS Community" href="http://iuscommunity.org/" target="_blank">IUS Community</a>, there is a nice set of documents but for someone new as me, it was a bit confusing so i tried to document what i did and maybe if someone comes around this, it will help.

First of all you need to know what Centos you are using, if you dont know how to do this, you can do it this way:
<pre class="brush: bash; gutter: true">[root@enriquemanuel ~]# cat /etc/redhat-release
CentOS release 5.6 (Final)</pre>
Also you need to know the architecture doing this:
<pre class="brush: bash; gutter: true">[root@enriquemanuel ~]# uname -a
Linux enriquemanuel.net 2.6.18-028stab089.1 #1 SMP Thu Apr 14 13:46:04 MSD 2011 x86_64 x86_64 x86_64 GNU/Linux</pre>
Nice, we have Centos 5.6, so lets go to the site of IUS Community and see what they can give us. <a title="Centos 5.6 x86 Repository" href="http://dl.iuscommunity.org/pub/ius/stable/Redhat/5/x86_64/repoview/" target="_blank">Repository for my version</a> | <a title="All Repositories" href="http://iuscommunity.org/Repos" target="_blank">All Version Repositories</a>

COOL!!!! we have several things that we were looking for. so lets install them.. how? follow the force Luke hehehe

Before we started I need to guide you to the links that i used so here they are:
<ul>
	<li>Getting Started - <a title="Getting Started" href="http://iuscommunity.org/Docs/GettingStarted" target="_blank">http://iuscommunity.org/Docs/GettingStarted</a></li>
	<li>Client Usage Guide - <a title="Client Usage Guide" href="http://iuscommunity.org/Docs/ClientUsageGuide" target="_blank">http://iuscommunity.org/Docs/ClientUsageGuide</a></li>
</ul>
Start your engines:

First of all you will need to add the repository to your list of repositories and you <strong><span style="color: #000080;">will need 2</span></strong>

Remember that i told you to get the repository of your version, well there you will find two links like this:
<pre class="brush: bash; gutter: true">epel-release-5-4.noarch.rpm
ius-release-1.0-8.ius.el5.noarch.rpm</pre>
I went to my home directory and downloaded them both:
<pre class="brush: bash; gutter: true">wget http://dl.iuscommunity.org/pub/ius/stable/Redhat/5/x86_64/epel-release-5-4.noarch.rpm
wget http://dl.iuscommunity.org/pub/ius/stable/Redhat/5/x86_64/ius-release-1.0-8.ius.el5.noarch.rpm</pre>
Then you need to install them in your machine, so rpm command comes in handy (oh sheez, what rpm command, no worries, run the following)
<pre class="brush: bash; gutter: true">rpm -Uvh ius-release*.rpm epel-release*.rp</pre>
That command <strong><span style="color: #000080;">will install both</span></strong> rpms (first the ius, then the epel) the ius is needed for the epel, so its ok.

Then, lets say that you only want to upgrade php (that is what i wanted and this tutorial is about). The guys at IUS Community developed a nice feature called yum-plugin-replace so lets start using it. Install it using the following command:
<pre class="brush: bash; gutter: true">yum install yum-plugin-replace</pre>
then lets list all the php that we have install running the following command:
<pre class="brush: bash; gutter: true">[root@enriquemanuel ~]# rpm -qa | grep php</pre>
just for the sake of it, i will "save' that.

Then we want to <strong><span style="color: #000080;">replace that php 5.3.3 with the new php 5.3.6</span></strong> wuhu!! here we go, final stage

With the newly install tool and with everything in place, run the commands one at the time, i will explain them after.
<pre class="brush: bash; gutter: true">[root@enriquemanuel ~]# /etc/init.d/httpd stop
[root@enriquemanuel ~]# yum replace php53 --replace-with php53u
This may be normal depending on the package.  Continue? [y/N] y</pre>
This will stop your apache service as you might notice.. why? well for the sake of having a clean install we just do that. Then with the newly install package we replace all the php53 with the new php53u (from the IUS Community) -- this is the new release.
It will ask us if we want to continue and of course we select yes.

then we can just check if it has been correctly installed running a phpinfo in a php or easier in the same console doing this:
<pre class="brush: bash; gutter: true">[root@enriquemanuel ~]# php -v
PHP 5.3.6 (cli) (built: Apr 25 2011 10:45:59)
Copyright (c) 1997-2011 The PHP Group
Zend Engine v2.3.0, Copyright (c) 1998-2011 Zend Technologies</pre>
Wuuu!! the php 5.3.6 is now installed.

HEY we finished... but wait.. i had some issues and it says that some dependencies are there and to run some package-cleanup where the heck is that? .. yeah.. i run in the same issue hehe, no worries.. follow the following and install the php by hand and not by the replace function .. uspi.. sorry if you were not able to used it.

To install the package cleanup you need to run the following:
<pre class="brush: bash; gutter: true">[root@enriquemanuel ~]# yum install yum-utils</pre>
Now the utils of yum have been installed. Then run the package cleanup.. how? here:
<pre class="brush: bash; gutter: true">package-cleanup --leaves
package-cleanup --orphans
package-cleanup --problems</pre>
The leaves are unused packages
The orphans are lost packages
The problems.. well are trouble makers :P

Then you will need to uninstall them using the
<pre class="brush: bash; gutter: true">yum remove package</pre>
After all is done, next install the php (hey, before continuing you had to already remove all the php53 to install the php53u).
<pre class="brush: bash; gutter: true">yum install php53u php53u-pear php53u-cli  php53u-common php53u-dba php53u-debuginfo php53u-devel php53u-gd php53u-intl php53u-mcrypt php53u-mbstring php53u-mysql php53u-odbc php53u-pdo php53u-soap php53u-xml php53u-xmlrpc</pre>
And now we have correctly install our php5.3.6.

Lets start services:
<pre class="brush: bash; gutter: true">[root@enriquemanuel ~]# /etc/init.d/httpd start</pre>
And you are all set.

Hope you enjoy it... in the next one, i will tell you one of the most errors that i got using this new php with MySQL and how i solved it :P
