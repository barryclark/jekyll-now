---
title: 3.2.3 Android & Java性能优化工具锦集
layout: categories
tags:
  - Android
  - Java
  - 多线程
categories:
  - Java
  - Android
---


### 磁盘

#### 工具集

| 工具                   | 问题                     | 能力      |
| -------------------- | ---------------------- | ------- | ---- |
| Systrace / Strace    | 主线程I/O、I/O操作耗时过长       | 发现      |     
| StrictMode           | 主线程I/O                 | 发现 + 定位 |      

### 内存

#### 工具集

| 工具                             | 问题                                       | 能力      | 场景   |
| ------------------------------ | ---------------------------------------- | ------- | ---- |
| top/procrank                   | 内存占用过大，内存泄露                              | 发现      |     初步发现内存泄露 |
| StrictMode                     | Activity泄露                               | 发现      |     初步发现内存泄露 |
| meminfo                        | Native内存泄露、是否存在Activity、ApllicationContext泄露、数据库缓存命中率低 | 发现+初步定位 |     初步发现Native内存泄露 |
| MAT、Finder、JHAT                | Java层的重复内存、不合理图片解码、内存泄露等                 | 发现+定位   |     定位内存泄露和OOM |
| libc_malloc_debug_leak.so      | Native内存泄露（JNI层）                         | 发现+定位   |      |
| LeakCanary                     | Activity内存泄露                             | 自动发现+定位 |     初步发现内存泄露, 获取堆栈 |
| APT                            | 内存占用过大，内存泄露                              | 发现      |      |
| GC Log from Logcat、 GC Log生产图标 | 人工触发GC for Explicit而导致的卡顿，Heap内存不足触发GC for Alloc 而导致的卡顿 | 发现+初步定位 |      |
| Systrace                       | GC导致的卡顿                                  | 发现      |      |
| Allocation Tracker              | 申请内存次数过多和过大、辅助定位GC Log发现的问题              | 发现 + 定位 |    定位[引发大量GC引起的卡顿或者内存问题|
| chrome devtool                 | HS的内存问题                                  | 发现+定位   |      |

### 网络

#### 工具集

| 工具              | 问题                                       | 能力      | 场景   |
| --------------- | ---------------------------------------- | ------- | ---- |
| Wireshark       | 最专业的网络分析工具，全部网络性能问题的分析定位都可以查看它           | 发现+定位   |      网络问题全能冠军|
| Fiddler/charles | 主要针对HTTP，帮助发现HTTP众多性能问题，还能模拟错误和延时的HTTP返回 | 发现+定位   |     模拟和定位HTTP问题 |
| mitmproxy | 中间人代理工具, 可用于抓包| 发现+定位|  定位HTTP问题|
| Tcpdump         | 抓包工具，要Root权限                             | 发现+定位   |      |
| traceroute      | 定位网络路由问题，包括就近接入、跨运营商问题                   | 发现+定位   |      |
| ARO             | 无压缩、重复下载、缓存失效等等                          | 自动发现+定位 |      |
| tPackageCapture | 无Root抓包                                  | 定位      |      |

### CPU

#### 工具集

| 工具              | 问题      | 能力   |
| --------------- | ------- | ---- |
| Top             |         | 发现   |  
| ps              |         | 发现   |      
| dumpsys cpuinfo |         | 发现   |      
| Systrace       |         | 定位   |      
| TraceView       |         | 定位   |      
| Trepn           | 耗电的分析工具, 显示电池耗电量, 获取骁龙芯片GPU的频率和负载 | 发现   |      

### 性能分析

#### 工具集

| 工具                              | 问题                                       | 能力      | 场景   |
| ------------------------------- | ---------------------------------------- | ------- | ---- |
| TinyDancer                        | FPS                         | 发现      |     初步发现帧率问题 |
| Systrace                        | 分析绘制时流程导致的卡顿，能大概定位是GC、I/O、贴图太大，还是没用ViewHolder的问题 | 发现+初步定位 |      |
| TraceView                       | 能深入定位分析各种流畅度与时延问题，但是只能初步定位XML布局和OpenGL绘制的性能问题 | 发现+定位   |      |
| Gfxinfo/Slickr                  | 定位硬件加速下的性能问题                             | 发现+初步定位 |      |
| Hierarchy Viewer                | 定位XML布局导致的性能问题                           | 自动发现+定位 |      |
| Tracer for OpenGl/Adreno/UXTune | 具体定位绘制性能问题                               | 发现+定位   |      |
| Chrome Devtool                  | 定位具体的H5卡顿问题                              | 发现+定位   |      |

### 问题场景与定位经验
- Crash
    - 出现捕获不了日志或者崩溃堆栈比较奇怪的crash
        - 定位
            - 在该场景下, 使用内存压测, 看看内存(显存, Java内存和Native内存)上涨(暴涨)情况,  如出现泄露或者暴涨, 获取可分析的数据(内存dump文件)
        - 分析, 解决
            - Java内存可通过获取hprof
            - Native内存可通过DDMS的Native Heap
- OOM
    - 定位
        - 挖掘特征, 包括但不限于代码改动、机器特征、时间特征等，必要时还需要做一定的统计分析
        - 根据特征寻找复现路径, 使用内存压测
        - 获取可分析的数据 (内存dump文件)
    - 分析, 解决
        - 使用MAT分析和定位
- ANR/死锁
    - 定位
        - 获取logcat日志以及trace.txt
    - 分析, 解决
        - [分析教程](http://cf.meitu.com/confluence/pages/viewpage.action?pageId=21039707)

### 使用教程
- [MAT查找泄露教程](http://memoryanalyzer.blogspot.jp/2008/05/automated-heap-dump-analysis-finding.html)
- [MAT使用技巧](https://eclipsesource.com/blogs/2013/01/21/10-tips-for-using-the-eclipse-memory-analyzer/), [中文版本使用教程](http://www.lightskystreet.com/2015/09/01/mat_usage/)
- [Allocation Tracker](https://developer.android.com/studio/profile/am-allocation.html)
- [Trepn Power Profiler](https://developer.qualcomm.com/software/trepn-power-profiler)
- [Systrace](https://developer.android.com/studio/profile/systrace-commandline.html)
- [dumpsys](http://gityuan.com/2016/05/14/dumpsys-command/)

### 参考资料
- [Android移动性能实战](https://book.douban.com/subject/27021800/)
- [Android OOM案例分析](https://tech.meituan.com/oom_analysis.html)
