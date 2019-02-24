---
title: JS与Android交互
permalink: /year-archive/
layout: posts
last_modified_at: 2018-12-20T09:45:06-05:00
tags:
  - 前端
categories:
  - 前端
---

### Android调用JS函数

```java
// 输出js性能相关数据..
mWebView.loadUrl("javascript:(function() { " +
                        "var time = performance.timing;"
                        + "var timingObj = {};"
                        + "var loadTime = (time.loadEventEnd - time.loadEventStart) / 1000;"
                        + "timingObj['重定向时间'] = (time.redirectEnd - time.redirectStart) / 1000;"
                        + "timingObj['DNS解析时间'] = (time.domainLookupEnd - time.domainLookupStart) / 1000;"
                        + "timingObj['TCP完成握手时间'] = (time.connectEnd - time.connectStart) / 1000;"
                        + "timingObj['HTTP请求响应完成时间'] = (time.responseEnd - time.requestStart) / 1000;"
                        + "timingObj['DOM开始加载前所花费时间'] = (time.responseEnd - time.navigationStart) / 1000;"
                        + "timingObj['DOM加载完成时间'] = (time.domComplete - time.domLoading) / 1000;"
                        + "timingObj['DOM结构解析完成时间'] = (time.domInteractive - time.domLoading) / 1000;"
                        + "timingObj['脚本加载时间'] = (time.domContentLoadedEventEnd - time.domContentLoadedEventStart) / 1000;"
                        + "timingObj['onload事件时间'] = (time.loadEventEnd - time.loadEventStart) / 1000;"
                        + "timingObj['页面完全加载时间'] = (timingObj['重定向时间'] + timingObj['DNS解析时间'] + timingObj['TCP完成握手时间'] + timingObj['HTTP请求响应完成时间'] + timingObj['DOM结构解析完成时间'] + timingObj['DOM加载完成时间']);"
                        + "for(item in timingObj) {\n" +
                        "\t\t\t\tconsole.log(item + \":\" + timingObj[item] + '毫秒(ms)');\n" +
                        "\t\t\t}\n"
                        + "console.log(performance.timing);" +
                        "})()");
```

### 参考
[前端性能监控：window.performance](https://juejin.im/entry/58ba9cb5128fe100643da2cc)
