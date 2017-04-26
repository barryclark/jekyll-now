---
layout: post
title: You're up and running!
---

## 常用的统计语法

## 获取来源统计
    cat web_notice_25.log|fgrep '39.83.250.166'|sed -rn 's/.*uri\[\/notification\/checknotification\].*refer\[(.*)\]\ brower.*/\1/p'|sort|uniq -c|sort -n

## 获取浏览器统计
    cat web_notice_25.log|fgrep '39.83.250.166'|sed -rn 's/.*uri\[\/notification\/checknotification\].*brower\[(.*)\]\ timeLog.*/\1/p'|sort|uniq -c|sort -n
