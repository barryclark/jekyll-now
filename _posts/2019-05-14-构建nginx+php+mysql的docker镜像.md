## 构建nginx+php+mysql的docker镜像过程

### 一、环境
VMware Workstation   
ubuntu    
docker    

配置思路：
1. 安装docker
2. 源码安装nginx、php、mysql
3. 使用Dockerfile 启动nginx、php
4. 提交容器

这里暂不安装mysql

### 二、构建容器
##### 1.获取一个centos镜像作为基础镜像
```
docker pull centos
```
##### 2.运行并进入容器
```
docker run -i -t centos:centos7 /bin/bash
```

##### 3.更改时区

##### 4.用yum安装以下内容：
```
yum -y update && \
    yum install -y gcc automake autoconf libtool make gcc-c++ vixie-cron  wget zlib  file openssl-devel sharutils zip  bash vim cyrus-sasl-devel libmemcached libmemcached-devel libyaml libyaml-devel unzip libvpx-devel openssl-devel ImageMagick-devel  autoconf  tar gcc libxml2-devel gd-devel libmcrypt-devel libmcrypt mcrypt mhash libmcrypt libmcrypt-devel libxml2 libxml2-devel bzip2 bzip2-devel curl curl-devel libjpeg libjpeg-devel libpng libpng-devel freetype-devel bison libtool-ltdl-devel net-tools && \
    yum clean all
```
   
##### 5.安装PHP 
```
cd /tmp && \
  wget http://cn2.php.net/distributions/php-7.3.5.tar.gz && \
  tar xzf php-7.3.5.tar.gz && \
  cd /tmp/php-7.3.5 && \
  ./configure \
    --prefix=/usr/local/php \
    --with-mysqli --with-pdo-mysql --with-iconv-dir --with-freetype-dir --with-jpeg-dir --with-png-dir --with-zlib --with-libxml-dir --enable-simplexml --enable-xml --disable-rpath --enable-bcmath --enable-soap --enable-zip --with-curl --enable-fpm --with-fpm-user=nobody --with-fpm-group=nobody --enable-mbstring --enable-sockets  --with-gd --enable-gd-native-ttf --with-openssl --with-mhash --enable-opcache && \
    make && \
    make install
```

碰到第一个报错信息

configure: error: Please reinstall the libzip distribution

解决方法：
```
wget https://nih.at/libzip/libzip-1.2.0.tar.gz
tar -zxvf libzip-1.2.0.tar.gz
cd libzip-1.2.0
./configure
make && make install
```

碰到第二个报错信息

configure: error: off_t undefined; check your library configuration

解决方法:
```
# 添加搜索路径到配置文件
echo '/usr/local/lib64
/usr/local/lib
/usr/lib
/usr/lib64'>>/etc/ld.so.conf
# 更新配置
ldconfig -v
```

碰到第三个报错信息

/usr/local/include/zip.h:59:21: fatal error: zipconf.h: No such file or directory

解决方法：手动复制过去
```
cp /usr/local/lib/libzip/include/zipconf.h /usr/local/include/zipconf.h
```
至此编译成功。


复制文件
```
cp /tmp/php-7.3.5/php.ini-production /usr/local/php/lib/php.ini && \
    cp /usr/local/php/etc/php-fpm.conf.default /usr/local/php/etc/php-fpm.conf && \
    cp /usr/local/php/etc/php-fpm.d/www.conf.default /usr/local/php/etc/php-fpm.d/www.conf
```

复制启动脚本(选做)
```
cp ./sapi/fpm/init.d.php-fpm /etc/init.d/php-fpm
chmod +x /etc/init.d/php-fpm
```
修改php-fpm配置文件
```
cd /usr/local/php/etc
cp php-fpm.conf.default php-fpm.conf
vim php-fpm.conf
```
去掉pid = run/php-fpm.pid前面的分号。:wq! 保存并退出。

##### 6.配置php
```
RUN sed -i -e 's/listen = 127.0.0.1:9000/listen = 9000/' /usr/local/php/etc/php-fpm.d/www.conf
```

启动php：

方式一（复制启动脚本情况下）：
```
/etc/init.d/php-fpm start       #php-fpm启动命令
/etc/init.d/php-fpm stop        #php-fpm停止命令
/etc/init.d/php-fpm restart     #php-fpm重启命令
ps -ef | grep php               #查看是否已经成功启动PHP
```

方式二：
```
#启动
/usr/local/php/sbin/php-fpm
#查看是否启动
ps aux | grep php-fpm
#查看php版本
/usr/local/php/bin/php -v
#查看php的扩展
/usr/local/php/bin/php -m
```

##### 8.安装nginx-1.8.0
```
cd /tmp && \
  wget http://nginx.org/download/nginx-1.8.0.tar.gz && \
  tar xzf nginx-1.8.0.tar.gz && \
  cd /tmp/nginx-1.8.0 && \
  ./configure \
    --prefix=/usr/local/nginx \
    --with-http_ssl_module --with-http_sub_module --with-http_dav_module --with-http_flv_module \
    --with-http_gzip_static_module --with-http_stub_status_module --with-debug && \
    make && \
    make install
```

创建用户和组
```
/usr/sbin/groupadd -f www
/usr/sbin/useradd -g www www
```

修改nginx.conf配置文件的user为www

启动nginx
```
/usr/local/nginx/sbin/nginx
```

安装supervisor
```
yum install -y python-setuptools
easy_install supervisor
```

##### 9.保存容器
```
docker commit -m "nginx1.8.0-php7.3.5" eccc406da92e ljw/lnmp-env:v1
# 3b69aed8bb00856babc318c0f9488d29d749c084c200bb3bdbfd8d8ed53356a5
```

#### 10.配置镜像运行
宿主机也要安装
```
sudo apt-get install supervisor
```

创建目录/home/andresen/docker-lnmp并在此目录下分别创建文件Dockefile和supervisor.conf

Dockefile如下：
```
vim Dockefile
FROM ljw/lnmp-env:v1
ADD supervisor.conf /etc/supervisord.conf
EXPOSE 80 443
CMD ["/usr/bin/supervisord"]
```
supervisor.conf如下：
```
vim supervisor.conf
[supervisord]
nodaemon=true
[program:nginx]
command=/usr/local/nginx/sbin/nginx
[program:php-fpm]
command=/usr/local/php/sbin/php-fpm -c /etc/php.ini -y /usr/local/php/etc/php-fpm.conf
```

执行命令：
```
docker build -t ljw/lnmp-env:v1 .
```

返回如下内容表示成功：
```
Sending build context to Docker daemon 3.072 kB
Step 1 : FROM zmd/lnmp-env:v1
 ---> 074f127f035a
Step 2 : ADD supervisor.conf /etc/supervisord.conf
 ---> 8afde0d6ad52
Removing intermediate container 9ee373349574
Step 3 : EXPOSE 80 443
 ---> Running in f97e3f0d9be8
 ---> fda6eccbf525
Removing intermediate container f97e3f0d9be8
Step 4 : CMD /usr/bin/supervisord
 ---> Running in 49879d3cb313
 ---> a1c74f4a411c
Removing intermediate container 49879d3cb313
Successfully built a1c74f4a411c
```

到此已经完成镜像构建。
