## lnmp集成环境一键安装包学习
* [LNMP安装了哪些软件？安装目录在哪？](https://lnmp.org/faq/lnmp-software-list.html)
* [LNMP状态管理命令](https://lnmp.org/faq/lnmp-status-manager.html)
因为业务需要，使用LNMP自带的升级方向，把php从5.4升级到5.6(注意升级前务必更改软件下载源，否则因为墙的原因一直下载不了导致升级失败)。
升级后redis可以访问，但是php扩展却不支持了。查到需要手动make &config一下再在php.ini添加extension = "redis.so"
感觉特别麻烦，于是尝试使用方法：./addons.sh {install|uninstall} {eaccelerator|xcache|memcached|opcache|redis|imagemagick|ioncube|apcu}重装一下，成功了。