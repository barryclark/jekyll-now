---
layout: post
title:  github搭建个人静态Blog简明教程
date:   2017-01-04 20:20:00 +0800
categories: document
tag: 教程
---

* content
{:toc}

# 写在前面

本文是一篇使用github进行个人静态的Blog搭建的教程，在使用本教程之前确保你有github的账号。搭建个人博客的步骤总体来说有如下几步：

* 创建github新仓库
* 对新的仓库进行配置
* 将远程Clone到本地仓库
* 下载中意的jekyll主题
* 进行主题替换
* 将本地仓库和远程仓库进行同步

下面将针对各步进行介绍。

# 创建github新仓库

创建一个名字是github账户名.github.io的新仓库，比如说你的github账号是githubUsername，你新建的github仓库名就是githubUsername.github.io，如下图所示，我这账户里头已经有这个仓库所以会警告，其他选项默认即可，点击   **create repository**   

<img src="{{ '/styles/images/2017-1-4-createRepository.png' | prepend: site.baseurl }}" width="310" />

# 配置仓库

对新建的仓库进行设置，点击 **Setting**，

<img src="{{ '/styles/images/2017-1-4-setRepository.png' | prepend: site.baseurl }}" width="310" />

进去后往下拉，点击**Choose a theme**

<img src="{{ '/styles/images/2017-1-4-ChooseTheme.png' | prepend: site.baseurl }}" width="310" /> 

选择自己喜欢的主题**select theme**

<img src="{{ '/styles/images/2017-1-4-ChoosedTheme.png' | prepend: site.baseurl }}" width="310" />

# Clone 远程仓库到本地

打开本地的github for windows客户端（前提是客户端已经和你的github账号绑定了），将刚刚新建的仓库Clone到本地

，譬如说Clone到了本地的D:\blog文件夹下了

<img src="{{ '/styles/images/2017-1-4-CloneRepo.png' | prepend: site.baseurl }}" width="310" />

# 主题下载

下载新的主题  http://jekyllthemes.org/，点击喜欢的主题点击**Download**

​     <img src="{{ '/styles/images/2017-1-4-DownloadTheme.png' | prepend: site.baseurl }}" width="310" />

# 主题替换

删除Clone到本地的仓库里头的除了.git和.gitgnore文件外的所有文件，将解压之后的主题文件里面的所有文件拷贝到刚刚删除文件的目录下

# 同步

在github 客户端进行远程同步

​     <img src="{{ '/styles/images/2017-1-4-syn.png' | prepend: site.baseurl }}" width="310" />

​        至此，就可以通过githubUsername.github.io对Blog进行访问了。当然搭建的过程中还会涉及到github的操作和下载主题的目录结构修改问题就需要自行解决了。接下来，博主还会介绍如何将自己申请的域名和github博客进行绑定。

​        

​	









