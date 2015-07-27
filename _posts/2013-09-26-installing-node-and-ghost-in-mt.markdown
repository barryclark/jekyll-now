---
layout: post
title: Installing Node and Ghost in [mt]
date: '2013-09-26 02:47:49'
---

After installing Node and Ghost, my suggestion is initially you follow the following 
### Steps to install Ghost
List:
1. Update everything available via yum `yum update`
2. Get Node into a temp folder where you are going to compile it 
<pre>
    cd /temp/
	curl -O http://nodejs.org/dist/v0.10.19/node-v0.10.19.tar.gz
</pre>
3. Gunzip the folder `tar -zxvf node-v0.10.19.tar.gz`
4. Get inside the folder `cd node-v0.10.19`
5. Then compile it doing the following:
<pre>
    ./configure
    make
    make install
</pre>
### Steps to install Ghost
List:
1. Hopefully you were one of the guys that back them too, but if not, Ghost will release their Blogging software soon enough.
2. Go in to the site and download your copy.
3. Create a folder, I choose to install it where the Apache is located so it can be related so `cd /var/www/`
4. Make the folder for my site `mkdir enriquemanuel.me`
5. Now navigate inside that folder `cd /var/www/enriquemanuel.me`
6. Here you will upload the copy of Ghost.
7. Unzip the folder `unzip ghost-0.3.0.zip`
8. Then install it by doing `npm install`

**Ta-da! its installed!!**

Now lets configure Apache to work with NodeJS
### Steps to configure Apache with NodeJS
List:
1. Hopefully you have configured vhosts, my folder is `cd /etc/httpd/vhosts`
2. Create my file for my domain `vi enriquemanuel.conf`
3. Here if you know your IP (you should | if not do a tracerout to your domain and get the Public IP attached to it) create the directive:
`<VirtualHost 1.2.3.4:80>` This includes the Port that Apache is displaying content.
4. Then create the following content inside that directive

    ServerName enriquemanuel.me
    ProxyRequests off
    
    <Proxy *>
		Order deny,allow
		Allow from all
	</Proxy>
	<Location >
		ProxyPass http://localhost:2368/
        ProxyPassReverse http://localhost:2368/
	</Location>
5. Now close the `VirtualHost` directive.

**Please be aware that you need to change the servername to yours and also change the virtualhost directive with your IP**

### Now lets configure and start everything
List:
1. Lets restart apache if not already done by doing

    service httpd restart 
    /etc/init.d/httpd restart
2. Either of the options above do the same thing, so its up to you.
3. Now lets configure and start NodeJS, go to your domain or where you create the folder in our case is `cd /var/www/enriquemanuel.me`
4. Lets copy the configuration and make our own `cp config.example.js config.js`
5. Now lets open the `config.js` and make it our own
`vi config.js`
6. Change the domain name to your own, in my case it was `enriquemanuel.me` so we change it accordingly
<pre>
    url: 'http://enriquemanuel.me',
</pre>
In the different sections that its needed.

**IMPORTANT NOTE**
Please be aware that most of the links that start with http:// are creating the link `<a href` if you see this in the end content, please remove it or just use the direct url removing this.

### End?
Not for me by any means, I'm still trying to move everything here. I have use a varierity of Blog Systems before including: Wordpress, Joomla, Mambo, Concrete 5, Jekyll, NestaCMS and other stuff but for one in the time its good to use one that is solely made to Bloggin.

And to finalize this blog post, I need to migrate all my content from my previous posts, so wait for more posts to hit the page.

If you have access to the Ghost System you should got an email how to install it in Centos, I use that as a starter on how to do this. So you can use both to guide you.

#### Sources
* [NodeJS Download](http://nodejs.org/download/)
* [Ghost Blog System](http://ghost.org/)
* [Mediatemple](http://mediatemple.net)