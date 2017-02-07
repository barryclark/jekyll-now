---
published: false
id: 201216
title: 'Usando Amazon Lightsail VPS'
date: 2016-12-20T00:00:00+00:00
author: ovalenzuela
layout: post
guid: http://ovalenzuela.com/?p=201216
permalink: /2016/12/usando-amazon-lightsail.html
categories:
  - General
tags:
  - amazon
---
#connect to the host
sudo apt-get update && sudo apt-get upgrade -y
sudo apt-get install php-curl php-gd php-mbstring php-mcrypt php-xml php-xmlrpc php-curl php-mysql apache2 tor curl php-cli libapache2-mod-php php php7.0-sqlite3 php-sqlite3 git -y
sudo service apache2 restart

sudo rm -rf /var/www/html/index.html
echo "<?php echo time(); ?>" > /tmp/index.php
sudo mv /tmp/index.php /var/www/html/
sudo service apache2 restart

cd /var/www/
sudo git clone https://github.com/oscarvalenzuelab/warpit.git
cd warpit/
sudo git checkout v20
#sudo mv  warpit/ framework
#cd framework/
#sudo git checkout v13

#cd /var/www/
#sudo git clone https://github.com/oscarvalenzuelab/multidata.git
#sudo mv  multidata/ warpit
#cd warpit/
#sudo git checkout v29

#sudo ln -s /var/www/framework/index.php /var/www/warpit/index.php
#sudo ln -s /var/www/framework/Apps/ /var/www/warpit/Apps
#sudo ln -s /var/www/warpit/config.php /var/www/warpit/Apps/config.php
#sudo chmod -R 755 /var/www
#sudo chmod -R 777 /var/www/framework/Apps/Cache/

sudo echo "<VirtualHost *:80>" > /tmp/000-default.conf
sudo echo " ServerAdmin webmaster@localhost" >> /tmp/000-default.conf
sudo echo " DocumentRoot /var/www/warpit/" >> /tmp/000-default.conf
sudo echo " ErrorLog ${APACHE_LOG_DIR}/error.log" >> /tmp/000-default.conf
sudo echo " CustomLog ${APACHE_LOG_DIR}/access.log combined" >> /tmp/000-default.conf
sudo echo "</VirtualHost>" >> /tmp/000-default.conf
sudo echo " " >> /tmp/000-default.conf
sudo echo "<Directory /var/www/warpit/>" >> /tmp/000-default.conf
sudo echo " Options Indexes FollowSymLinks MultiViews" >> /tmp/000-default.conf
sudo echo " AllowOverride All" >> /tmp/000-default.conf
sudo echo " Order allow,deny" >> /tmp/000-default.conf
sudo echo " allow from all" >> /tmp/000-default.conf
sudo echo " php_flag  display_errors off" >> /tmp/000-default.conf
sudo echo "</Directory>" >> /tmp/000-default.conf

sudo mv /etc/apache2/sites-available/000-default.conf /etc/apache2/sites-available/000-default.conf.bk
sudo mv /tmp/000-default.conf /etc/apache2/sites-available/000-default.conf
sudo chown root:root /etc/apache2/sites-available/000-default.conf
sudo a2enmod rewrite
sudo service apache2 restart

sed 's/error_reporting = E_ALL & ~E_DEPRECATED & ~E_STRICT/error_reporting = E_ALL & ~E_USER_DEPRECATED & ~E_DEPRECATED & ~E_STRICT/g' </etc/php/7.0/apache2/php.ini >/tmp/php.ini
sudo mv /etc/php/7.0/apache2/php.ini /etc/php/7.0/apache2/php.ini.bk
sudo mv /tmp/php.ini /etc/php/7.0/apache2/php.ini
sudo service apache2 restart

sudo echo "ControlPort 9051" > /tmp/torrc
sudo echo "HashedControlPassword 16:F08E70492613CB4260D6D6B61AF65D230D6D4FF3A17EAD8BE580864FB1" >> /tmp/torrc
sudo mv /etc/tor/torrc /etc/tor/torrc.bk
sudo mv /tmp/torrc /etc/tor/torrc
sudo /etc/init.d/tor restart

cd /var/www/warpit/Vendors/c4/
php C4Test.php &



/usr/bin/expect <<EOD
spawn git pull
expect "password:"
send "this_is_my_password_unsafely_stored_in_a_bash_script\r"
interact
EOD

076d329ee26eb08f892e0f4a777a5cff15368de0
