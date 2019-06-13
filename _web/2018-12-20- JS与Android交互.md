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
        + "var loadTime = (time.loadEventEnd - time.loadEventStart);"
        + "timingObj['重定向时间'] = (time.redirectEnd - time.redirectStart);"
        + "timingObj['DNS解析时间'] = (time.domainLookupEnd - time.domainLookupStart);"
        + "timingObj['TCP完成握手时间'] = (time.connectEnd - time.connectStart);"
        + "timingObj['HTTP请求响应完成时间'] = (time.responseEnd - time.requestStart);"
        + "timingObj['DOM开始加载前所花费时间'] = (time.responseEnd - time.navigationStart);"
        + "timingObj['DOM加载完成时间'] = (time.domComplete - time.domLoading);"
        + "timingObj['DOM结构解析完成时间'] = (time.domInteractive - time.domLoading) ;"
        + "timingObj['脚本加载时间'] = (time.domContentLoadedEventEnd - time.domContentLoadedEventStart) ;"
        + "timingObj['onload事件时间'] = (time.loadEventEnd - time.loadEventStart);"
        + "timingObj['页面总时间'] = (time.loadEventEnd - time.navigationStart);" +
        "\t\t\t\tconsole.log('前端性能监控: ' + item + \":\" + timingObj[item] + '毫秒(ms)');\n" +
        "\t\t\t}\n"
        + "console.log(performance.timing);" +
        "})()");
```

### 参考
[前端性能监控：window.performance](https://juejin.im/entry/58ba9cb5128fe100643da2cc)
