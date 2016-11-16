---
layout: post
title: Study-Notes-Weekly-No.3(odbcconf & Get-Exports & ETW USB Keylogger)
---


**About:**

- Use odbcconf to load dll

- Use powershell to get dll exports

- Use Event Tracing for Windows to log keystrokes from USB keyboards

**目录：**

- 介绍为什么通过odbcconf加载dll可以绕过在命令行下对regsvr32的拦截

- 比ExportsToC++更方便的批量输出dll导出函数的工具——ExportsToC++

- 通过ETW实现对USB键盘的键盘记录，记录测试心得


## 0x01 Use odbcconf to load dll
---

**Reference:**

https://twitter.com/subTee/status/789459826367606784

### 简介


![Alt text](https://raw.githubusercontent.com/3gstudent/BlogPic/master/2016-10-26/1-1.png)


如图，Casey Smith在twitter分享的一个技巧，如果将执行regsvr32加载dll的代码写在.rsp文件中，再通过odbcconf.exe去调用，这样可以绕过在命令行下对regsvr32的拦截。本文将要介绍为什么可以绕过在命令行下对regsvr32的拦截。


**odbcconf：**

用于配置ODBC驱动和数据源

详细说明见如下链接：

https://msdn.microsoft.com/en-us/library/ee388579(v=vs.85).aspx

用法如图

![Alt text](https://raw.githubusercontent.com/3gstudent/BlogPic/master/2016-10-26/2-1.png)


值得注意的是odbcconf包含一个注册dll的功能，我在之前的文章《Code Execution of Regsvr32.exe》中具体介绍过如何开发可被regsvr32调用的dll，编写一个测试dll进行测试(此处略，不再重复介绍)。

cmd下运行：

```
odbcconf.exe /a {regsvr c:\test\odbcconf.dll}
```

如图，成功调用dll，弹出对话框

![Alt text](https://raw.githubusercontent.com/3gstudent/BlogPic/master/2016-10-26/2-2.png)


站在防御者的角度，为了防止利用regsvr32调用dll的方法被滥用，常常会选择监控命令行的输入(如通过EMET创建规则),只要发现命令行中包括regsvr的字符就会对其拦截

当然，上述操作包含了字符regsvr，将会被拦截


使用Process Explorer查看odbcconf进程的命令行，包含字符`regsvr`

如图

![Alt text](https://raw.githubusercontent.com/3gstudent/BlogPic/master/2016-10-26/2-3.png)



但是，使用odbcconf的另一个功能却可以绕过，那就是/F参数

**用法：**

```
odbcconf.exe /f my.rsp
```

my.rsp为响应文件，里面包含执行的操作：

```
REGSVR c:\test\odbcconf.dll
```

**注：**

这里需要填入dll的绝对路径


如图，成功调用dll，弹出对话框

![Alt text](https://raw.githubusercontent.com/3gstudent/BlogPic/master/2016-10-26/2-4.png)


使用Process Explorer再次查看命令行，不包含字符regsvr

如图

![Alt text](https://raw.githubusercontent.com/3gstudent/BlogPic/master/2016-10-26/2-5.png)



NickTyrer根据这个方法分享了他的代码，实现了在dll中运行powershell命令，地址如下：

https://gist.github.com/NickTyrer/6ef02ce3fd623483137b45f65017352b

编译工程之前，需要如下设置：

- 设置编译平台为x86或者x64

- 安装UnmanagedExports和System.Management.Automation
  在Visual Studio控制面板选择TOOLS-Library Package Manager-Package Manager Console，输入：
  Install-Package UnmanagedExports
  Install-Package System.Management.Automation



## 0x02 Use powershell to get dll exports
---

**Reference:**

https://github.com/FuzzySecurity/PowerShell-Suite/blob/master/Get-Exports.ps1

### 简介

在《Study-Notes-Weekly-No.1(Monitor-WMI-ExportsToC++-Use-DiskCleanup-bypass-UAC)》(文章链接：https://3gstudent.github.io/3gstudent.github.io/Study-Notes-Weekly-No.1(Monitor-WMI-ExportsToC++-Use-DiskCleanup-bypass-UAC)/)介绍过一款批量输出dll导出函数的工具——ExportsToC++ ，运行的前提是需要.NET Framework 2.0和安装Microsoft Visual Studio

b33f@FuzzySecurity对此作了改进，开源了powershell下的Get-Exports，特点是不再需要Microsoft Visual Studio的开发环境，更简便快捷，同时支持32位和64位的dll


测试代码如下：

```
Get-Exports -DllPath c:\Windows\system32\dimsjob.dll -ExportsToCpp C:\test\export.txt
```



运行后如图，显示导出函数信息

![Alt text](https://raw.githubusercontent.com/3gstudent/BlogPic/master/2016-10-26/3-1.png)


同时生成可供使用的c++代码并保存在C:\test\export.txt下，如图

![Alt text](https://raw.githubusercontent.com/3gstudent/BlogPic/master/2016-10-26/3-2.png)




## 0x03 Use Event Tracing for Windows to log keystrokes from USB keyboards
---
**Reference:**

https://www.cyberpointllc.com/srt/posts/srt-logging-keystrokes-with-event-tracing-for-windows-etw.html

### 简介

CyberPoint SRT在Ruxcon介绍了他们对ETW的新用法，实现了对USB键盘的键盘记录，并且公布了一个测试POC，本文将对其进行测试，分析测试心得。

**ETW：**

- 是Event Tracing for Windows的缩写

- 提供了一种对用户层应用程序和内核层驱动创建的事件对象的跟踪记录机制

- 通常用于协助管理员和开发人员解决和测量系统和应用程序的性能

- 公开资料显示尚未有利用ETW实现键盘记录的方法


介绍ETW的一些学习资料：

https://randomascii.wordpress.com/2015/09/24/etw-central/


POC下载地址：

https://github.com/CyberPoint/Ruxcon2016ETW/tree/master/KeyloggerPOC

**注：**

该POC已经被杀毒软件查杀，测试需要放行

要求：

- Windows 7  (USB 2.0) 
- Windows 8+(USB 2.0 and USB 3.0)
- 管理员权限运行

**注：**

不支持PS/2接口的键盘

测试环境：

- Win8.1 x86
- vs2013
- 安装.NET Framework .net 4.5.2
- Install-Package Microsoft.Diagnostics.Tracing.TraceEvent
- USB 2.0的键盘

管理员权限运行exe，记录测试如图

![Alt text](https://raw.githubusercontent.com/3gstudent/BlogPic/master/2016-10-26/4-1.png)


POC最大的不足：

- 记录存在延迟
- 不稳定，常常报错[!] ignoring non-usb keyboard device: 0xFFFFFFFF8CFF6070

从POC到工具还有很长的的一段路要走，但这个思路值得学习，ETW的利用方法值得总结，期待CyberPoint SRT的后续文章


---

[LEAVE A REPLY](https://github.com/3gstudent/feedback/issues/new)
