## composer 学习

[composer中文网](https://www.phpcomposer.com/)

#### 1. 仅更新单个库
```js
composer update foo/bar
```

#### 2. 不编辑composer.json的情况下安装库
```js
composer require "foo/bar:1.0.0"
```

Linux下全局安装composer方法
//下载composer
curl -sS https://getcomposer.org/installer | php

//将composer.phar文件移动到bin目录以便全局使用composer命令
mv composer.phar /usr/local/bin/composer

//切换国内源
composer config -g repo.packagist composer https://packagist.phpcomposer.com

#### laravel项目下，使用composer install 报错：
* Problem 1
  - Installation request for facebook/webdriver 1.6.0 -> satisfiable by facebook/webdriver[1.6.0].
  - facebook/webdriver 1.6.0 requires ext-zip * -> the requested PHP extension zip is missing from your system.  
* Problem 2
  - facebook/webdriver 1.6.0 requires ext-zip * -> the requested PHP extension zip is missing from your system.
  - laravel/dusk v2.0.14 requires facebook/webdriver ~1.0 -> satisfiable by facebook/webdriver[1.6.0].
  - Installation request for laravel/dusk v2.0.14 -> satisfiable by laravel/dusk[v2.0.14].

To enable extensions, verify that they are enabled in your .ini files:
  - /usr/local/etc/php/conf.d/docker-php-ext-pdo_mysql.ini
  - /usr/local/etc/php/conf.d/docker-php-ext-sodium.ini
You can also run `php --ini` inside terminal to see which files are used by PHP in CLI mode.  
大概是需求zip扩展，于是安装zip  
解决方案：
进入php72容器，使用docker-php-ext-install zip命令安装php扩展，再报以下错误：  
checking for the location of zlib... configure: error: zip support requires ZLIB. Use --with-zlib-dir=<DIR> to specify prefix where ZLIB include and library are located  

看提示表明安装zip必须要有ZLIB依赖，于是打算先安装zlib，网上搜寻半天没找到解决方案。  
最后搜索关键字：docker php zlib
在博客中发现文章：
Dockerfile

FROM php:5.6.30-apache  
COPY sources.list /etc/apt/sources.list  
RUN apt-get update -y  
RUN apt-get install zlib1g-dev -y  
RUN docker-php-ext-install pdo_mysql  
RUN docker-php-ext-install zip  
RUN apt-get install libmcrypt-dev -y  
RUN docker-php-ext-install mcrypt  
RUN pecl install redis  
RUN docker-php-ext-enable redis  
RUN pecl install xdebug-2.5.5  
RUN docker-php-ext-enable xdebug  
RUN pecl install raphf-1.1.2  
RUN docker-php-ext-enable raphf  
RUN pecl install propro-1.0.2  
RUN docker-php-ext-enable propro  
RUN sh -c '/bin/echo -e "\n" | sh /usr/local/bin/pecl install pecl_http-2.6.0'  
RUN docker-php-ext-enable http  

于是依次执行：
apt-get update -y  
apt-get install zlib1g-dev -y  
docker-php-ext-install pdo_mysql  
docker-php-ext-install zip  
成功安装zlib和zip，再次执行composer install成功！
