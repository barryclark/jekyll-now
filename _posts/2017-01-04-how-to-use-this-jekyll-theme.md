---
layout: post
title:  如何使用LessOrMore这个Jekyll模版
date:   2017-01-04 01:08:00 +0800
categories: document
tag: 教程
---

* content
{:toc}



致谢
====================================
+ 感谢[Less官网](http://lesscss.cn/)的样式，本Jekyll框架的样式都是基于Less官网的样式直接拷贝过来的。只是重构了JS，并且加入了Jekyll语法而已。
+ 感谢[Github](https://github.com/)提供的代码维护和发布平台
+ 感谢[Jekyll](https://jekyllrb.com/)团队做出如此优秀的产品
+ 感谢Freud能够将样式优化得如此nice,本框架大部分都是基于http://www.hifreud.com/的样式修改的。



使用
====================================


下载
------------------------------------

使用git从[LessOrMore](https://github.com/luoyan35714/LessOrMore.git)主页下载项目

{% highlight bash %}
git clone https://github.com/luoyan35714/LessOrMore.git
{% endhighlight %}


配置
------------------------------------

`LessOrMore`项目需要配置的只有一个文件`_config.yml`，打开之后按照如下进行配置。

> 特别注意`baseurl`的配置。如果是`***.github.io`项目，不修改为空''的话，会导致JS,CSS等静态资源无法找到的错误

{% highlight bash %}
name: 博客名称
email: 邮箱地址
author: 作者名
url: 个人网站
### baseurl修改为项目名，如果项目是'***.github.io'，则设置为空''
baseurl: "/LessOrMore"
resume_site: 个人简历网站
github: github地址
github_username: github用户名称
FB:
  comments :
    provider : duoshuo
    duoshuo:
        short_name : 多说账户
    disqus :
        short_name : Disqus账户
{% endhighlight %}


如何写文章
------------------------------------

在`LessOrMore/_posts`目录下新建一个文件，可以创建文件夹并在文件夹中添加文件，方便维护。在新建文件中粘贴如下信息，并修改以下的`titile`,`date`,`categories`,`tag`的相关信息，添加`* content {:toc}`为目录相关信息，在进行正文书写前需要在目录和正文之间输入至少2行空行。然后按照正常的Markdown语法书写正文。


{% highlight bash %}
---
layout: post
#标题配置
title:  标题
#时间配置
date:   2016-08-27 01:08:00 +0800
#大类配置
categories: document
#小类配置

tag: 教程
---

* content
{:toc}


我是正文。我是正文。我是正文。我是正文。我是正文。我是正文。
{% endhighlight %}


执行
------------------------------------

{% highlight bash %}
jekyll server
{% endhighlight %}


效果
------------------------------------
打开浏览器并输入URL`http://localhost:4000/`,回车。


为什么要搭建这个blog
====================================

我是14年接触github的，从14年到现在也断断续续在github上面上传了一些自己写的东西，不算是精华倒也是可以记录自己的学习过程。斯以为写的东西如果能够分享出来，一方面可以提升整理自己的知识体系，更重要的可以督促自己继续写一些东西，好记性毕竟不如烂笔头。明年，哦不对，是今年(现在已经是17年了，两年半的研究生生涯太短了)，马上就要面临找工作了。。。


关于作者
====================================

喜欢折腾的Java程序，伪Python程序员，主攻的数据挖掘和大数据分析方面的研究，业余喜欢看电影，玩Dota。


关于打赏
====================================

如果你也像我一样在寻觅一个简洁的博客主题。不妨试下LessOrMore。

当然你也可以为了我的工作打赏！以激励我做出更好的东西。


支付宝
----------------

<img src="{{ '/styles/images/zhifubao.PNG' | prepend: site.baseurl }}" alt="支付宝二维码付款给iris" width="310" />


微信
----------------
![微信二维码付款给Freud]({{ '/styles/images/weixin.png' | prepend: site.baseurl }})
