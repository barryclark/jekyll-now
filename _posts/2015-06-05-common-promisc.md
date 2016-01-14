---
layout: post
title: 技术百宝箱
tags: [common]
---

技术百宝箱 —— *技术点滴*
		
1. **Php扩展**
	
    ```
	1. 在 php/ext 下执行 ./ext_skel   --extname=module 扩展支持 C 的模块module
	2. 修改 module/config.m4 (使能*--with-module*或者*--enable-module*， 添加子目录等)
	3. 在 php 目录下执行/buildconf --force 生成php根目录下的configure文件
	4. 执行php下的configure 命令时加上 --witch-module（或者 --enable-module） 选项生成Makefile，并make
	5. 
	```
	**注：** *Php扩展支持调用c函数P， 当在扩展目录中添加子目录后，需要删掉php目录下configure 及其缓存项，然后再buildconfig生成新的configure文件才能生效。*
    
    [php 调用 C 函数详解](http://blog.csdn.net/oyd/article/details/3168417)
    
2. **Linux 相关**

	[linux下限制进程在多核cpu中指定cpu上运行](http://blog.sina.com.cn/s/blog_a39910330101dgqe.html)
    
3. **ssh 命令 相关**
	
    [ssh 免密码登陆](http://www.tuicool.com/articles/v2amAva)
    
    [25 个必须记住的ssh命令](http://www.cnblogs.com/weafer/archive/2011/06/10/2077852.html)
    
    [linux下expect安装](http://blog.163.com/023_dns/blog/static/118727366201291142252757/)
    
    [linux expect的使用详解](http://www.2cto.com/os/201305/209909.html)
    
    [移植 expect5.45](http://www.csdn123.com/html/topnews201408/51/14751.htm)
    [Expect+TCL8.6交叉编译 arm-linux](http://blog.sina.com.cn/s/blog_43ffbf3e0101afir.html)
    
4. **Python 相关**
	
	[交叉编译Python 3.3](http://xiaoxia.org/2013/09/13/python-on-tomato/)
    
    [交叉编译 Python](http://randomsplat.com/id5-cross-compiling-python-for-embedded-linux.html)
    
    [交叉编译 Python 支持sqlite3](http://www.java123.net/v/988575.html)
    
    [Python sqlite3 完整篇](http://www.cnblogs.com/hongten/p/hongten_python_sqlite3.html)
    
5. **兴趣**
	
    [创业必读的7本书](http://www.fortunechina.com/business/c/2015-09/02/content_246408.htm?source=yd)
    
    [大牛常访问论坛](http://www.oschina.net/question/2250952_2138973)
    
    [linux-网桥原理分析](http://blog.csdn.net/mrwangwang/article/details/8393973)
    
    [可执行文件及可连接文件的格式](http://www.360doc.com/content/14/0626/20/7377734_390077391.shtml)
    
    [可执行文件格式](http://blog.chinaunix.net/uid-27004952-id-3361448.html)
    
    [java 实战视频](http://www.ulewo.com/)
    
    [python 搭建微信公众平台](http://my.oschina.net/yangyanxing/blog/159215)