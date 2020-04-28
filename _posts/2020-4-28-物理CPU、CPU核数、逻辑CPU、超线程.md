---
layout: post
title: 物理CPU、CPU核数、逻辑CPU、超线程
---

* 物理 CPU：  
            物理 CPU 就是插在主机上的真实的 CPU 硬件，在 Linux 下可以数不同的 physical id 来确认主机的物理 CPU 个数。

* 核心数：  
            物理 CPU 下一层概念就是核心数，我们常常会听说多核处理器，其中的核指的就是核心数。在 Linux 下可以通过 cores 来确认主机的物理 CPU 的核心数。

* 逻辑 CPU：  
            核心数下一层的概念是逻辑 CPU，逻辑 CPU 跟超线程技术有联系，假如物理 CPU 不支持超线程的，那么逻辑 CPU 的数量等于核心数的数量；  
            如果物理 CPU 支持超线程，那么逻辑 CPU 的数目是核心数数目的两倍。在 Linux 下可以通过 processors 的数目来确认逻辑 CPU 的数量。

* 超线程：  
            超线程是英特尔开发出来的一项技术，使得单个处理器可以象两个逻辑处理器那样运行，这样单个处理器以并行执行线程。  
            这里的单个处理器也可以理解为 CPU 的一个核心；这样便可以理解为什么开启了超线程技术后，逻辑 CPU 的数目是核心数的两倍了。

  
   
     
     

---
  
  
#### 在Linxu下查看物理cpu、核心数、逻辑CPU和是否支持超线程

关于CPU的一些信息可在 /proc/cpuinfo 这个文件中查看
```
cat  /proc/cpuinfo
```

可以看到里面的内容是以 processor （也就是逻辑CPU）为基本单元进行划分的，  
processor 下的 core id表示这个逻辑CPU属于哪个核心，  
而physical id则表示这个核心或者说逻辑CPU属于哪个物理CPU。

了解这些信息，便可以方便地查看上面说到的那些参数。

* 查看物理CPU数量  

    物理CPU就是不同的phycical id的个数，可通过下面命令实现：
```
cat /proc/cpuinfo | grep 'physical id' | uniq |wc -l
```

uniq是为了去掉多个逻辑CPU属于同一个物理CPU的重复记录。

* 查看核心数  

    核心数就是不同core id的个数，可通过下面的命令实现
```
cat /proc/cpuinfo | grep 'core id' | uniq |wc -l
```

* 查看逻辑CPU数目  

    逻辑CPU就是processor的数目
```
cat /proc/cpuinfo | grep 'processor' | wc -l
```

查看逻辑CPU时不需要去重

* 查看是否支持超线程  

    如果支持超线程就是说同一个core下会有两个processors，这样可以简单地观察/proc/cpuinfo中的内容，  

    如果两个的processor下的core id相同，那么说明支持超线程。  

    还有另外一种方法是查看siblings和cpu cores的数值是否一致，评判方法如下

++如果”siblings”和”cpu cores”一致，则说明不支持超线程，或者超线程未打开。  
如果”siblings”是”cpu cores”的两倍，则说明支持超线程，并且超线程已打开。++

另外，top命令中看到的CPU数目是逻辑CPU（输入top后再按1）。


- 总核数 = 物理CPU个数 X 每颗物理CPU的核数  
- 总逻辑CPU数 = 物理CPU个数 X 每颗物理CPU的核数 X 超线程数  


查看物理 CPU 个数 cat /proc/cp...
```
cat /proc/cpuinfo| grep "physical id"| sort| uniq| wc -l

cat /proc/cpuinfo| grep "cpu cores"| uniq

cat /proc/cpuinfo| grep "processor"| wc -l

# 查看 CPU 信息（型号）  
cat /proc/cpuinfo | grep name | cut -f2 -d: | uniq -c
```
