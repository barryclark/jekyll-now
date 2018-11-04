---
title: 1.13 ContentProvider机制
layout: categories
tags:
  - Android
  - Framework
categories:
  - Android
---

### ContentProvider机制
1. client进程: 向system_server请求对应的provider
2. system进程: 如果目标provider未启动, system_Server调用`startProcessLocked`启动provider进程
3. provider: 进程启动后attach到system_server, 紧接着bindApplication, 在这个过程会installProvider以及publishContentProviders, 再binder call到system_server进程
4. system进程: 发布provider信息, 通过notify机制, 唤醒前面处于wait状态的binder线程, 并将`getContentProvider()`返回给client进程
5. client进程: 执行installProvider操作, 安装providers的对象记录, 引用技术维护等工作
