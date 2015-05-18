---
layout: post
title: form/post ajax cros
---

同源策略：same-orgin policy

【名词解释】

跨域：https://developer.mozilla.org/en-US/docs/JavaScript/Same_origin_policy_for_JavaScript

同源策略（注意Network Access这一节）：http://www.w3.org/Security/wiki/Same_Origin_Policy

【问题描述】
浏览器出于安全的考量

（避免恶意网站轻易读取其他网站显示的内容，因为该内容可能含有敏感信息，想象iframe嵌套银行网页）

原则上允许跨域写而限制了跨域读。

写是指数据的上行/发送（sending request），

读是指数据的下行/接收（receiving response）。

（然而跨域写也是很不安全的，容易导致CSRF/clickjacking攻击。

浏览器已经限制了跨域读，再限制跨域写的话，那互联网的每个页面都成了孤岛。

避免非法跨域写需要用到token，本文不做讨论。）


考虑下述情况：

指向外部域名的link和通过表单的向外部域发起get请求是一样的，

也都是允许的，点击那一刻起，浏览器的当前域名转向了目标网站，

也就完全是域内写、读了。
通过表单向外部域发起post请求也是允许的，理由同上，源网站无法读取目标网站的任何内容。
AJAX（借助XMLHttpRequest对象）跨域get/post是禁止的，因为使用AJAX就是为了读取响应的内容，这触碰了跨域读的限制。
JSONP属于跨域读，且形式限制为get请求，因为它利用了script标签的特性（浏览器认为跨域读脚本是例外，类似的还有img、iframe等等，注意它们共有的src属性）。


因此对于浏览器而言：1和2没有跨域；3遵循了限制跨域读的原则；4属于允许的例外。


虽然JSONP很好用，但它注定是get请求，get请求有语义要求（幂等）、

长度限制（为了兼容限制255字节）、

安全隐患（容易受到csrf攻击，csrf的解决必须是post请求配合token使用）。


那么，如何实现跨域post请求呢？

【解决方案】
1、CORS
概述：Cross-Origin Resource

Sharing，W3C制定的跨站资源分享标准。

post前会产生一次options嗅探（称之为preflight，但简单请求不会出现）来确认有否跨域请求的权限；

客户端post时会带上Origin头指示来源网站，服务端响应时需带上Access-Control-Allow-Origin头与Origin头的值匹配，以示许可。

ie8提供了封装好的XDomainRequest对象，部分实现了该标准；

而其它浏览器则提供了XMLHttpRequest（Level 2）对象。

要求：ie8（XDomainRequest）/ie10/safari4/GC/FF3.5

参考：cross-site xmlhttprequest with CORS

参考：https://developer.mozilla.org/en-US/docs/HTTP/Access_control_CORS 

参考（中文）：http://www.zfkun.com/394.html （simple reuest的定义描述不完整）

优点：W3C标准方案

缺点：不兼容老浏览器，移动浏览器尚未支持。   桌面和移动浏览器兼容性

注意：若在多个iframe之间跨域通信，优先考虑 window.postMessage

2、invisible iframe
概述：通过js动态生成不可见表单和iframe，将表单的target设为iframe的name以此通过iframe做post提交。提交后由于跨域，无法直接读取响应内容。一般的做法是，iframe内通过js改变自身location的fragment，外部则监听iframe的onload事件，读取fragment的内容。有现成的跨域iframe通信类库，如jQuery PostMessage Plugin。
要求：ie6/safari/GC/FF4
参考：http://stackoverflow.com/questions/298745/how-do-i-send-a-cross-domain-post-request-via-javascript#answer-6169703
参考：http://softwareas.com/cross-domain-communication-with-iframes
参考：http://thomas.bindzus.me/2007/12/24/adding-dynamic-contents-to-iframes/
优点：兼容性佳，facebook，google，新浪已/曾采用
缺点：依赖hack实现，响应数据量大时需要切片、多次设置fragment并轮询，响应频繁时可能失效。

3、server proxy 
概述：当前域实现一个代理，所有向外部域名发送的请求都径由该代理中转。
缺点：每个使用方都需要部署代理，数据中转低效，对js有侵入。

4、flash proxy
概述：利用不可见的swf跨域post提交数据，需要部署crossdomain.xml。例如alirte会自动检测，若用户安装了flash，则以此实现跨域通信。
要求：flash9
参考：http://flxhr.flensed.com/
优点：ADOBE标准方案，相对CORS兼容性佳，相对invisible iframe响应数据量较大时优势明显。
缺点：依赖flash。

原文：http://blog.csdn.net/doraeimo/article/details/7329779
