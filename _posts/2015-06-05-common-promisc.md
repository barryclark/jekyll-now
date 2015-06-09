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
    
2. 