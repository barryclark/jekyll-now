---
title: 1.5 SystemServer启动流程
layout: categories
tags:
  - Android
  - Framework
categories:
  - Android
---

### 启动流程
1. 创建SystemServer进程
2. 创建AMS, PMS, LS, DMS服务
3. 创建PMKS, WMS, IMS, NMS, DBMS, FPS等服务
4. AMS, PMS, LS, DMS调用systemReady
5. 启动systemUI, 剩余服务调用systemReady, 启动WatchDog
6. 其它服务调用systemRunning方法, AMS调用finishBooting
