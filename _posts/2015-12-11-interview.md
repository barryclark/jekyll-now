---
layout: post
title: 面试必读
---

虽然面试是否成功常常跟运气有很大关系，但是技术水平仍然是起决定作用的。

本文对我所了解的前端技术做一个总结，面试前梳理一次，以便在笔试和面试中发挥自己的最佳水平。

目录

1. [JS语法](#js-language)
1. [ES5](#es5)
1. [ES6](#es6)
1. [CSS布局](#css-layout)
1. [CSS动画](#css-animation)
1. [CSS3特性](#css3)
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

<h2 id="es5">ES5</h2>

<h2 id="es6">ES6</h2>

<h2 id="css-layout">CSS布局</h2>

<h2 id="css-animation">CSS动画</h2>

<h2 id="css3">CSS3特性</h2>

<h2 id="h5">H5特性</h2>

<h2 id="compatibility">浏览器兼容性</h2>

<h2 id="mobile">移动Web</h2>

<h2 id="design-mode">设计模式</h2>

<h2 id="jquery">jQuery知识</h2>

<h2 id="jquery-plugin">jQuery插件</h2>

<h2 id="mvc">MVC</h2>

<h2 id="nodejs">Node知识</h2>

<h2 id="performance">页面性能优化</h2>

<h2 id="build">构建工具</h2>

<h2 id="http">HTTP知识</h2>

*常用的HTTP状态码*

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

*不那么常用的HTTP状态码*

* 202：服务器已接收请求，但还未执行
* 204：服务器成功处理了请求，但无需返回任何实体，只返回HTTP头部
* 303：用户请求的资源在另一个URI上
* 304：被请求的资源必须通过Location指定代理才能访问
* 405：请求的方法不能用于访问当前的资源，例如，PUT、DELETE方法会被大部分服务器返回405
* 410：被请求的资源在服务器上已经不再可用
* 413：服务器拒绝处理该请求，因为提交的实体内容过大
* 503：服务器的HTTP版本与请求的版本不一致
* 509：服务器达到贷款限制

*HTTP请求头属性*

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

* Accept： 指定客户端能够接收的内容类型
* Accept-Charset： 浏览器可以接受的字符编码集。
* Accept-Encoding： 指定浏览器可以支持的web服务器返回内容压缩编码类型。
* Accept-Language： 浏览器可接受的语言
* Accept-Ranges： 可以请求网页实体的一个或者多个子范围字段
* Authorization： HTTP授权的授权证书
* Cache-Control： 指定请求和响应遵循的缓存机制
* Connection： 表示是否需要持久连接。（HTTP 1.1默认进行持久连接）
* Cookie： HTTP请求发送时，会把保存在该请求域名下的所有cookie值一起发送给web服务器。
* Content-Length： 请求的内容长度
* Content-Type： 请求的与实体对应的MIME信息
* Date： 请求发送的日期和时间
* Expect： 请求的特定的服务器行为
* From： 发出请求的用户的Email
* Host： 指定请求的服务器的域名和端口号
* If-Match： 只有请求内容与实体相匹配才有效
* If-Modified-Since： 如果请求的部分在指定时间之后被修改则请求成功，未被修改则返回304代码
* If-None-Match： 如果内容未改变返回304代码，参数为服务器先前发送的Etag，与服务器回应的Etag比较判断是否改变
* If-Range： 如果实体未改变，服务器发送客户端丢失的部分，否则发送整个实体。参数也为Etag
If-Unmodified-Since 只在实体在指定时间之后未被修改才请求成功
* Max-Forwards： 限制信息通过代理和网关传送的时间
* Pragma： 用来包含实现特定的指令
* Proxy-Authorization： 连接到代理的授权证书
* Range： 只请求实体的一部分，指定范围
* Referer： 先前网页的地址，当前请求网页紧随其后,即来路
* TE： 客户端愿意接受的传输编码，并通知服务器接受接受尾加头信息
* Upgrade： 向服务器指定某种传输协议以便服务器进行转换（如果支持）
* User-Agent： User-Agent的内容包含发出请求的用户信息
* Via： 通知中间网关或代理服务器地址，通信协议
* Warning： 关于消息实体的警告信息

*HTTP响应头属性*

* Accept-Ranges： 表明服务器是否支持指定范围请求及哪种类型的分段请求
* Age： 从原始服务器到代理缓存形成的估算时间（以秒计，非负）
* Allow： 对某网络资源的有效的请求行为，不允许则返回405
* Cache-Control： 告诉所有的缓存机制是否可以缓存及哪种类型
* Content-Encoding： web服务器支持的返回内容压缩编码类型。
* Content-Language： 响应体的语言
* Content-Length： 响应体的长度
* Content-Location： 请求资源可替代的备用的另一地址
* Content-MD5： 返回资源的MD5校验值
* Content-Range： 在整个返回体中本部分的字节位置
* Content-Type： 返回内容的MIME类型
* Date： 原始服务器消息发出的时间
* ETag： 请求变量的实体标签的当前值
* Expires： 响应过期的日期和时间
* Last-Modified： 请求资源的最后修改时间
* Location： 用来重定向接收方到非请求URL的位置来完成请求或标识新的资源
* Pragma： 包括实现特定的指令，它可应用到响应链上的任何接收方
* Proxy-Authenticate： 它指出认证方案和可应用到代理的该URL上的参数
* Refresh： 应用于重定向或一个新的资源被创造，在5秒之后重定向（由网景提出，被大部分浏览器支持）
* Retry-After： 如果实体暂时不可取，通知客户端在指定时间之后再次尝试
* Server： web服务器软件名称
* Set-Cookie： 设置Http Cookie
* Trailer： 指出头域在分块传输编码的尾部存在
* Transfer-Encoding： 文件传输编码
* Vary： 告诉下游代理是使用缓存响应还是从原始服务器请求

<h2 id="version">版本管理工具</h2>

<h2 id="debug">调试工具</h2>

<h2 id="standard">标准规范</h2>

<h2 id="unit-test">前端单元测试</h2>

<h2 id="seo">SEO</h2>

<h2 id="framework">代码架构</h2>

<h2 id="security">安全</h2>
