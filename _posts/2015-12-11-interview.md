---
layout: post
title: 前端知识体系
---

1. [JS语法](#js-language)
1. [ES5](#es5)
1. [ES6](#es6)
1. [CSS布局](#css-layout)
1. [CSS3特性](#css3)
1. [CSS动画](#css-animation)
1. [H5特性](#h5)
1. [浏览器兼容性](#compatibility)
1. [移动Web](#mobile)
1. [设计模式](#design-mode)
1. [jQuery知识](#jquery)
1. [jQuery插件](#jquery-plugin)
1. [MVC](#mvc)
1. [Node.js知识](#nodejs)
1. [页面性能优化](#performance)
1. [构建工具](#build)
1. [HTTP知识](#http)
1. [版本管理工具](#version)
1. [调试工具](#debug)
1. [标准规范](#standard)
1. [前端单元测试](#unit-test)
1. [SEO](#seo)
1. [代码架构](#framework)
1. [安全](#security)


<h2 id="js-language">JS语法</h2>

推荐阅读汤姆大叔的
[深入理解Javascript系列](http://www.cnblogs.com/TomXu/archive/2011/12/15/2288411.html)

知识点

* 函数
* 原型链
* 继承

<h2 id="es5">ES5</h2>

<h2 id="es6">ES6</h2>

推荐阅读阮一峰的
[ES6入门](http://es6.ruanyifeng.com/)

<h2 id="css-layout">CSS布局</h2>

<h2 id="css-animation">CSS动画</h2>

<h2 id="css3">CSS3特性</h2>

[CSS属性速查表](http://www.w3chtml.com/css3/properties/)

CSS3新特性一览

1. 不依赖图片的视觉效果
2. 盒容器变形
3. 独一无二的字体
4. 更强大的选择器 
5. 过渡与动画
6. 媒体信息查询
7. 多列布局

###不依赖图片的视觉效果

CSS3可以实现一些以前通过图片才能实现的视觉效果，例如：

* 圆角

```css
border-radius: 5px;
```

* 阴影

```css
box-shadow: 1px 1px 5px #CCC; 
text-shadow: 0 0 3px #000;
```

* 半透明背景

```css
background: hsla(182, 44%, 76%, .5);
```

* 渐变

```css
background-image: linear-gradient(
    hsla(0, 0%, 100%, .6),
    hsla(0, 0%, 100%, 0) 30px
    )
```

* 图片边框

```css
border-width: 30px 20px 30px 20px;
border-image: url(clouds.png) 30 20 30 20 stretch;
```


###盒容器变形（Transforms）

CSS3可以在2D或者3D的控件里操作盒容器的位置和形状，比如旋转、缩放、移动。

我们把这些特效称为2D变形或者3D变形。



###独一无二的字体


###更强大的选择器 


###过渡与动画


###媒体信息查询

媒体查询可以根据用户使用的设备或显示器的特性来自定义样式。

这些特性包括：

* orientation         (横屏还是竖屏)
* min-width           (页面可见区域宽度)
* max-width
* min-device-width    (屏幕可见区域宽度)
* max-device-width
* color               (是否支持彩色显示)
* resolution          (设备的分辨率，如96dpi、118dpcm)

示例：

```css
@media screen and (max-width: 600px){
    body{
        font-size: 88%;
    }
    #content-main{
        float: none;
        width: 100%;
    }
}
```


###多列布局


<h2 id="h5">H5特性</h2>

[w3教程](http://www.w3chtml.com/html5/course/)

###主要特性

```
* 视频、音频
* 拖放
* Canvas
* SVG
* 地理位置
* 客户端存储
* manifest缓存
* Web Worker
* Web Socket
* Server Sent
```

###废弃的标签：

```html
<acronym>
<applet>
<basefont>
<big>
<center>
<dir>
<font>
<frame>
<frameset>
<noframes>
<s>
<strike>
<tt>
<u> 
<xmp>
```

###更加语义化的新增标签：

```html
<article>
<section>
<aside>
<hgroup>
<header>
<footer>
<nav>
<time>
<mark>
<figure>
<figcaption>
```

<h2 id="compatibility">浏览器兼容性</h2>

<h2 id="mobile">移动Web</h2>

* 知识点

```
* 布局视口
* 视觉视口
* 理想视口
* 缩放
* 物理分辨率
* 设备像素比
* meta视口
* 媒体查询
* orientationchange事件
* resize事件
* vm和vh
* 过渡和动画
* 触摸事件
* 指针事件
* 等价事件
```


* 布局视口

移动设备中页面的宽高

* 视觉视口

移动设备屏幕的宽高

* 理想视口

当布局视口等于视觉视口时，即当`<head>`中加入以下代码时：

```html
<meat name="device" content="width=device-width">
```

就是理想视口。

* 缩放

禁止缩放

```html
<meta name="viewport" content="user-scalable=no">
```


* 物理分辨率



* 设备像素比

```js
if(window.devicePixelRatio >= 2){
    // 当设备像素比大于等于2时执行
}
```

```css
@media all and (-webkit-min-device-pixel-ratio: 2){
    /* 当设备像素比大于2时生效 */
}
```


* meta视口

格式：

```html
<meta name="viewport" content="name=value, name2=value2">
```

name可以是：

```
1. width
2. init-scale
3. mininum-scale
4. maxinum-scale
5. user-scalable
```

* 媒体查询



* orientationchange事件



* resize事件



* vm和vh



* 过渡和动画



* 触摸事件



* 指针事件



* 等价事件

<h2 id="design-mode">设计模式</h2>

创建型模式

* 单例模式
* 工厂方法
* 抽象工厂
* 建造模型

结构型模式

* 适配器模式
* 桥接模式
* 装饰模式
* 组合模式
* 外观模式
* 享元模式
* 代理模式

行为型模式

* 观察者模式
* 中介者模式
* 迭代器模式

<h2 id="jquery">jQuery知识</h2>

<h2 id="jquery-plugin">jQuery插件</h2>

<h2 id="mvc">MVC</h2>

<h2 id="nodejs">Node知识</h2>

<h2 id="performance">页面性能优化</h2>

<h2 id="build">构建工具</h2>

<h2 id="http">HTTP知识</h2>

###三次握手

```
* Client端发送连接请求SYN报文

* Server段接受连接后回复SYN+ACK报文，
  并为这次连接分配资源

* Client端接收到ACK报文后也向Server段发生ACK报文，
  并分配资源，这样TCP连接就建立了。
```

###四次挥手（以Client端发起中断连接请求为例）

```
* Client端发送FIN报文。
  意思是说："我没有数据要发给你了，
  如果你还有数据没有发送完成，你可以继续发"。

* Server端确定数据发送完了，则向Client端发送FIN报文。
  意思是说：“我这边数据发完了，准备好关闭连接了"

* Client端发送ACK，然后进入TIME_WAIT状态，
  如果Server端没有收到ACK则可以重传。

* Server端收到ACK后就直接断开连接了。
```

Client端等待了2MSL后依然没有收到回复，则证明Server端已正常关闭，那好，我Client端也可以关闭连接了。

TCP连接就这样关闭了！


###常用的HTTP状态码

```
* 200：成功
* 301：永久重定向
* 302：临时重定向
* 304：未修改
* 400：请求的语义有误，当前的服务器不能理解
* 401：需要用户验证
* 403：拒绝访问
* 404：未找到资源
* 500：服务器内部错误
* 503: 服务器临时维护或者过载，请在一段时间后重试
```

###不那么常用的HTTP状态码

```
* 202：服务器已接收请求，但还未执行
* 204：服务器成功处理了请求，但无需返回任何实体，只返回HTTP头部
* 303：用户请求的资源在另一个URI上
* 304：被请求的资源必须通过Location指定代理才能访问
* 405：请求的方法不能用于访问当前的资源，
       例如，PUT、DELETE方法会被大部分服务器返回405
* 410：被请求的资源在服务器上已经不再可用
* 413：服务器拒绝处理该请求，因为提交的实体内容过大
* 503：服务器的HTTP版本与请求的版本不一致
* 509：服务器达到贷款限制
```

###常用的HTTP请求头属性

```
* Accept： 指定客户端能够接收的内容类型
* Accept-Charset： 浏览器可以接受的字符编码集。
* Authorization： HTTP授权的授权证书
* Cache-Control： 指定请求和响应遵循的缓存机制
* Connection： 表示是否需要持久连接。（HTTP 1.1默认进行持久连接）
* Cookie： HTTP请求发送时会把保存在该请求域名下的
           所有cookie值一起发送给web服务器。
* Content-Length： 请求的内容长度
* Content-Type： 请求的与实体对应的MIME信息
* Host： 指定请求的服务器的域名和端口号
* If-Match： 只有请求内容与实体相匹配才有效
* If-Modified-Since： 如果请求的部分在指定时间之后被修改则请求成功，
                      未被修改则返回304代码
* Pragma： 用来包含实现特定的指令
* Range： 只请求实体的一部分，指定范围
* Referer： 先前网页的地址，当前请求网页紧随其后,即来路
* User-Agent： User-Agent的内容包含发出请求的用户信息
```

[更多参考](http://tools.jb51.net/table/http_header)

###常用的HTTP响应头属性

```
* Age： 从原始服务器到代理缓存形成的估算时间（以秒计，非负）
* Allow： 对某网络资源的有效的请求行为，不允许则返回405
* Cache-Control： 告诉所有的缓存机制是否可以缓存及哪种类型
* Content-Length： 响应体的长度
* Content-Location： 请求资源可替代的备用的另一地址
* Content-MD5： 返回资源的MD5校验值
* Content-Type： 返回内容的MIME类型
* Date： 原始服务器消息发出的时间
* ETag： 请求变量的实体标签的当前值
* Expires： 响应过期的日期和时间
* Last-Modified： 请求资源的最后修改时间
* Location： 用来重定向接收方到非请求URL的位置来完成请求或标识新的资源
* Pragma： 包括实现特定的指令，它可应用到响应链上的任何接收方
* Refresh： 应用于重定向或一个新的资源被创造，
  在5秒之后重定向（由网景提出，被大部分浏览器支持）
* Server： Web服务器软件名称
* Set-Cookie： 设置Http Cookie
```

[更多参考](http://tools.jb51.net/table/http_header)

###常用的HTTP请求方法

```
* GET：请求指定URI上的资源，服务器会返回实体
* POST：请求指定URI，并发送实体
* PUT：用客户端发送的数据取代服务器上指定位置的内容
* DELETE：删除服务器上指定位置的内容
* HEAD：类似GET，但不需返回实体，用于获取报头
* OPTIONS：允许客户端查看服务器性能
* CONNECT：HTTP/1.1协议中预留给能够将连接改为管道方式的代理服务器。
```

[更多参考](http://tools.jb51.net/table/http_request_method)


###下面是与缓存有关的HTTP头

###Expires

下例告诉客户端：“你拿着这个资源吧，2020年前都不要再请求了”。

直到缓存被挤出或者手动清除，浏览器都不会再向服务器请求这个资源。

对于确定永远不会发生更改的资源才用这个响应头。

```
Expires: Thu, 15 Apr 2020 20:00:00 GMT
```

###Last-Modified

下例告诉客户端：这个资源是2014年3月1日修改的，86400秒（1天）内这个资源都不会发生改变。

然后客户端在3月2日之前都不会再请求这个资源。

```
Last-Modified: Sat, 01 Mar 2014 08:00:00 GMT
Cache-Control: max-age=86400
```

###If-Modified-Since

下例告诉服务器，如果请求的资源在2014年3月1日后发生了修改，就返回新的内容给我，否则不需要返回实体

```
If-Modified-Since: Sat, 01 Mar 2014 08:00:00 GMT
```

###Cache-Control

下例告诉服务器：“不要返回缓存，我要最新的内容”

```
Cache-Control: no-cache
```

下例告诉客户端：“你不要缓存这个资源，每次使用都应该向我请求最新的”

```
Cache-Control: no-cache
```

下例告诉客户端：“从现在起，1天之内这个资源都不会发生改变，这段时间内你使用缓存中的版本就可以了”

```
Cache-Control: max-age=86400
```


###Pragma

服务端和客户端都可以使用这个头，表示禁止缓存

```
Pragma: no-cache
```


###http-equiv

在HTML页面中设置请求头。

```
<meta http-equiv="Cache-Control" content="max-age=7200" />
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="Mon, 20 Jul 2009 23:00:00 GMT" />
```

http-equiv仅对当前页面的请求有效，而对页面中引用的js、css、图片无效。

<h2 id="version">版本管理工具</h2>

<h2 id="debug">调试工具</h2>

<h2 id="standard">标准规范</h2>

<h2 id="unit-test">前端单元测试</h2>

<h2 id="seo">SEO</h2>

<h2 id="framework">代码架构</h2>

<h2 id="security">安全</h2>
