---
layout: post
title: Виртуальный хост Apache
---

Пример конфигруации для виртуального хоста сервера Apache


{% highlight apache %}
<VirtualHost *:80>
 
  ServerName dev.local
  ServerAdmin dev@localhost
  DocumentRoot /home/ruzel/www/dev.local
  LogLevel debug
  ErrorLog /home/ruzel/www/dev.local/error.log
  CustomLog /home/ruzel/www/dev.local/access.log combined
 
  <Directory /home/ruzel/www/dev.local>
    Options Indexes FollowSymLinks MultiViews
    AllowOverride All
    Order allow,deny
    allow from all
    Require all granted
  </Directory>
 
  <IfModule mod_php7.c>
        #php_admin_value mbstring.func_overload 2
  </IfModule>
 
</VirtualHost> 
{% endhighlight %}

