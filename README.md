Jekyll Light
=============

一个优雅的Jekyll主题。。。(第一次做主题，虽然代码不优雅，关键是看起来很优雅:stuck_out_tongue_closed_eyes:)

[![Version][version-image]][version-url]
[![License][license-image]][license-url]

----------

## 简介

这是一款Jekyll博客主题，叫做Jekyll Light。这是我花了两天时间才重新做好的主题。没有用到任何CSS框架，简洁美观。  
PS: 应该说我不会用CSS框架。。。

### 关于主题
* 支持多说评论框
* 支持百度统计
* 支持FancyBox图片盒子
* 支持MathJax数学公式
* NProgress进度条
* 小火箭返回顶部动画
* 时间轴样式的归档页面
* 简版页面(渐变特效)
* 响应式布局
* 相信用WebKit内核的浏览器浏览，效果会有加成的...


## 使用

### 站点配置
在`_config.yml`配置你的站点信息，详细配置如下：

	blog:
		name:                  # 博客名称
		description:           # 博客描述
		title:                 # 网页标题
		url:                   # 博客地址
		duoshuo:               # 多说ID
		tongji:                # 百度统计ID
		qiniu:                 # 七牛云地址
	author:
		name:                  # 作者名称
		email:                 # 邮箱地址
		weibo:                 # 微博地址
		github:                # GitHub地址
		logo:                  # logo地址
		douban:
			name:              # 豆瓣地址名称
			key:               # 豆瓣API Key

把以上这些选项的信息全改成你自己的，就配置完成了。

### 多说评论框
_posts文章默认开启评论框，而简版页面默认关闭。  
_posts文章可以在开头设置`duoshuo: false`来关闭。  
简版页面可以在开头设置`duoshuo: true`来开启。

### MathJax数学公式
需要在页面开头添加`math: true`来开启

在需要用到公式的地方用`\[ \]`或`$$ $$`括起来

例如：

	行内公式：
	\\E=mc^2\\

	行间公式：
	$$E=mc^2$$

### 创建文章/页面
定位到博客目录，可以运行以下命令

* 创建文章：`rake post title="Post Name"` 
* 创建简版页面：`rake life title="Page Name"`
* 创建页面： `rake page title="Page name"`

### 页面的使用
修改的都是`markdown文件`

* 普通页面  
layout项改为`blog`
* 简版页面  
layout项改为`life`
* 文章  
_posts文件夹下的markdown文件的layout项改为`post`，使用简版页面就改成`life`

### 生成静态博客
把你的博客推送到GitHub或者其它支持Jekyll的代码托管网站就可以了。  
具体可以到[Jekyll官网](http://jekyllrb.com/)或[GitHub Pages](https://pages.github.com/)查看详细教程。


## 下载

**Download: [Jekyll Light](https://github.com/pexcn/Jekyll-Light/releases)**

**Source: [GitHub](https://github.com/pexcn/Jekyll-Light)**

**DEMO: [Pexcn Blog](http://pexcn.tk)**


## 截图

![01](https://raw.githubusercontent.com/pexcn/Jekyll-Light/master/DEMO/01.jpg)
![02](https://raw.githubusercontent.com/pexcn/Jekyll-Light/master/DEMO/02.jpg)
![03](https://raw.githubusercontent.com/pexcn/Jekyll-Light/master/DEMO/03.jpg)
![04](https://raw.githubusercontent.com/pexcn/Jekyll-Light/master/DEMO/04.jpg)
![05](https://raw.githubusercontent.com/pexcn/Jekyll-Light/master/DEMO/05.jpg)

## 许可证

[![License][license-image]][license-url]


[version-url]: https://github.com/pexcn/Jekyll-Light/releases
[version-image]: https://img.shields.io/badge/version-1.3.3-green.svg?style=flat
[license-url]: http://www.gnu.org/licenses/gpl-3.0.html
[license-image]: https://img.shields.io/badge/License-GPLv3-blue.svg?style=flat
