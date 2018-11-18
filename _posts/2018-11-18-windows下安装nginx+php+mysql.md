## windows 下安装nginx+php+mysql
### 1. 下载相关软件
1. nginx-1.15.6[官网下载地址](http://nginx.org/en/download.html)
2. php-5.6[官网下载地址](http://windows.php.net/download/)
3. MySql5.6[官网下载地址](http://www.mysql.com/downloads/mysql/)

然后依次解压到安装位置。我这里是D:\usr\local\ 因为平时用Linux习惯了。

### 2. 安装MySql
cd到mysql的bin目录下以管理员的权限执行mysqld -install命令，然后就可以 net start mysql 开启Mysql服务了。

### 3. 配置PHP
常规的一些配置参数：
```
extension_dir = "D:\usr\local\php\ext"
date.timezone = Asia/Shanghai

// 开启扩展
extension = php_mysql.dll
extension = php_mysqli.dll
```

由于Nginx要求cgi方式的php，还要修改以下配置
```
enable_dl = On
cgi.force_redirect = 0
cgi.fix_pathinfo=1
fastcgi.impersonate = 1
cgi.rfc2616_headers = 1  
```

以cgi运行php
```
php-cgi.exe -b 127.0.0.1:9000
```

我是刚重装的win7_x64位系统，此时提示错误：无法启动此程序因为计算机中丢失msvcp110.dll   
网上给出可解决的方案是下载并安装微软VC++2012版运行库
英文全称：[Microsoft Visual C++ 2012 Redistributable Package](http://www.microsoft.com/zh-CN/download/details.aspx?id=30679)选择与系统相应的版本安装成功即可。

### 4. 配置Nginx
主要是使nginx支持php。先将前面的“#”去掉，同样将root  html;改为root  D:/usr/webroot;。再把“/scripts”改为“$document_root”，这里的“$document_root”就是指前面“root”所指的站点路径，这是改完后的：
```
# pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
#
#location ~ \.php$ {
#    root           D:/usr/webroot;
#    fastcgi_pass   127.0.0.1:9000;
#    fastcgi_index  index.php;
#    fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
#    include        fastcgi_params;
#}
```

#### nginx相关命令

1.启动
start nginx.exe

2.重启
nginx -s reload

3.关闭nginx

如果使用cmd命令窗口启动nginx，关闭cmd窗口是不能结束nginx进程的，可使用两种方法关闭nginx

1. 输入nginx命令  nginx -s stop(快速停止nginx)  或  nginx -s quit(完整有序的停止nginx)
2. 使用taskkill   taskkill /f /t /im nginx.exe

4.测试nginx配置是否成功
nginx -t
