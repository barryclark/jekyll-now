---
layout: post
title: Nice url not working - mod_rewrite
date: '2012-08-12 16:00:00'
---

A few days ago (maybe more than a month - upsi sorry) i started my special project of moving everything from my hosting space http://mediatemple.net/webhosting/gs/ Grid Server @ MediaTemple to a Dedicated Virtual http://mediatemple.net/webhosting/dv/ dv 4.0 @ MediaTemple main advantages? well i will probably have my dedicated server, own configurations of PHP, MySQL and other stuff.

Well it didnt went that well since when i started playing with it, that plan came with the "Plesk" software that really it was a tought to manage and move things around. I really didnt like it that much, so i asked for a new server. What type? Well the only way to go was the Virtual Environment http://mediatemple.net/webhosting/ve/ ve @ MediaTemple -- _[hey BTW, wow with the people from MediaTemple, they are the best at what they do, they are fast, realiable and always there to help you. I have been with several hosting companies and by far MediaTemple rules]_

So, end of the story...

I changed everything or started moving everything to my third server in 2 months, so moving the domains, creating everything was more or less no pain when "knowing how" but for me was a new world. I will add a post to that subject of configuring apache / mysql / php and other stuff but this post is not for that.

After installing my sites, creating the databases and moving everything around, for some reason the Joomla sites that used the - mod_rewrite - from the Apache was not working and in none of the post that I read it stated why.

The reason? well in your configuration for your folder you will need to add a directive:

	AllowOverride all

This directive will state to "listen" to the .htaccess files and within them you can state the RewriteRule and RewriteCond that you need.

So the Configuration file will be something like this

	<Directory "path/to/folder">
    	AllowOverride all
		allow from all
		Options -Indexes +FollowSymLinks +ExecCGI
		Order allow,deny
	</Directory>
and the htaccess will look something like this for wordpress at least:

	<IfModule mod_rewrite.c>
		RewriteEngine On
		RewriteBase /
		RewriteRule ^index\.php$ - [L]
		RewriteCond %{REQUEST_FILENAME} !-f
		RewriteCond %{REQUEST_FILENAME} !-d
		RewriteRule . /index.php [L]
	</ifModule>

This way all that you have needed to have those tidy night links or nice urls will work without any issue if the rest of the configuration is fine as well.
