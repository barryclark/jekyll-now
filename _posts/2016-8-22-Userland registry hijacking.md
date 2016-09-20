---
layout: post
title: Userland registry hijacking
---
## 0x00 前言
---
之前我在研究"Use SCT to Bypass Application Whitelisting Protection"的时候曾有过一个想法：在执行regsvr32命令注册COM组件的过程中，在注册表HKEY_CLASSES_ROOT\CLSID\下会同步创建COM组件的键值，并且classid的子项InprocServer32下会包含scrobj.dll的绝对路径，那么如果修改了子项InprocServer32的键值，能否实现对某些操作的劫持？


然而实际修改HKCR\CLSID\下的键值需要管理员权限，因此没有对这个想法深入研究。直到最近，Matt Nelson@enigma0x3的博客给了我新的思路，只需要普通用户权限就可以实现对高权限系统注册表键值的劫持，让我对userland registry hijacking有了新的认识。

## 0x01 简介
---
本文将对userland registry hijacking的原理进行介绍，实例分析在Userland Persistence和BypassUAC两方面的具体应用，借助Process Monitor，介绍一种寻找BypassUAC的方法。



## 0x02 Userland registry hijacking原理
---

### 1、键值同步

修改HKCU:\Software\Classes\下的键值中默认名称的数据，可以同时修改HKCR:\下对应键值默认名称的数据(前提是HKCR:\已存在此注册表项)

例如：

编辑HKEY_CURRENT_USER\Software\Classes\mscfile\shell\open\command的默认值为c:\test\admin.exe

如图

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-8-22/1-1.png)

**注：**

默认HKEY_CURRENT_USER\Software\Classes\下不存在mscfile\shell\open\command，需要自己创建

定位到HKEY_CLASSES_ROOT\mscfile\shell\open\command下，发现默认值被自动修改为c:\test\admin.exe

如图

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-8-22/1-2.png)

**注：**

在HKCU:\Software\Classes\CLSID下新建一个HKCR:\CLSID不存在的键值，并不会更新HKCR:\CLSID的数据

如图

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-8-22/1-3.png)

新建HKEY_CURRENT_USER\Software\Classes\mscfile\shell\open\command\1，默认名称的数据设为1，然而HKEY_CLASSES_ROOT\mscfile\shell\open\command并不会新建子项1

### 2、权限

- 修改HKCU下的键值只需要普通用户权限

- 修改HKCR下的键值需要管理员权限

综上，只需要以普通用户的权限编辑HKCU:\Software\Classes\下的键值就可以同步修改对应管理员权限HKCR下的键值。

根据以上介绍的原理，可具体应用在Userland Persistence和BypassUAC两方面：

## 0x03 Userland Persistence With Scheduled Tasks
---

如果劫持系统某个计划任务对应的注册表键值，修改其中要启动的dll绝对路径，那么仅需普通用户权限就能实现一个后门，具体操作如下：

### 1、查看计划任务同注册表的对应关系

系统中的计划任务同注册表HKCU:\Software\Classes\CLSID\下的键值存在对应关系，可借助`Matt Nelson@enigma0x3`分享的脚本直接查看

**下载地址：**

https://github.com/enigma0x3/Misc-PowerShell-Stuff/blob/master/Get-ScheduledTaskComHandler.ps1

**注：**

通过计划任务面板查看的信息不完全，计划任务面板的打开方式为：我的电脑-右键-管理，找到计划任务，如图

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-8-22/1-4.png)


ps脚本获取的部分对应关系如图

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-8-22/1-5.png)

可获得每个计划任务对应注册表键值的位置和启动的dll

### 2、修改对应键值中的dll位置

找到对应关系后，需要定位具体的注册表键值位置，即HKEY_CURRENT_USER\Software\Classes\CLSID\{CLSID},通常情况HKCU下该键值不存在，需要手动建立，默认值设为需要运行的测试dll的绝对路径，键值创建后HKCR下的键值会同步更新，计划任务启动的dll随之被修改。

**实例：**

1、查看计划任务同注册表的对应关系

运行Get-ScheduledTaskComHandler找到可被劫持的dll，挑选一个通用的计划任务——UserTask，详细信息如下：

TaskName      : UserTask

CLSID         : {58fb76b9-ac85-4e55-ac04-427593b1d060}

Dll           : C:\Windows\system32\dimsjob.dll

Logon         : True

IsUserContext : True


**注：**

此操作需要查找HKCR下的键值，所以需要管理员权限才可以获得

2、修改对应键值中的dll位置

在HKEY_CURRENT_USER\Software\Classes\CLSID\下新建项{58fb76b9-ac85-4e55-ac04-427593b1d060}

接着新建项InprocServer32

值设定为c:\test\MessageBox32.dll

**注：**

注册表项{58fb76b9-ac85-4e55-ac04-427593b1d060}通用，不同系统下键值名称相同

MessageBox32.dll下载地址为：

https://github.com/enigma0x3/MessageBox

实际测试发现https://github.com/enigma0x3/MessageBox/tree/master/bin的dll在win7下失效，使用源代码重新编译生成新的dll可以使用

此时查看HKEY_CLASSES_ROOT\CLSID\{58fb76b9-ac85-4e55-ac04-427593b1d060}\InprocServer32，默认值被修改为c:\test\MessageBox32.dll，如图

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-8-22/2-0.png)

注销用户，重新登录，MessageBox32.dll被加载，弹框

但是在Scheduled Task面板的日志中会提示DLL中出错(0x800401F9)，如图

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-8-22/2-1.png)

猜测是导出函数的问题导致dll加载报错，使用dumpbin查看计划任务UserTask对应的原dll的导出函数，执行：

dumpbin /exports C:\Windows\system32\dimsjob.dll

**注：**
UserTask对应的原dll的绝对路径为C:\Windows\system32\dimsjob.dll

获得dimsjob.dll的导出函数表，如图

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-8-22/2-2.png)

所以需要为dll添加新的导出函数：

- DllCanUnloadNow
- DllGetClassObject
- DllRegisterServer
- DllUnregisterServer

**注：**

具体为dll添加导出函数的方法在《Code Execution of Regsvr32.exe》做了详细介绍，此处略过

添加成功后，dumpbin查看结果如图

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-8-22/2-3.png)

替换旧的MessageBox32.dll，注销用户，重新登录，新的MessageBox32.dll被加载，弹框

查看Scheduled Task面板的日志，问题解决，操作成功完成，如图

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-8-22/2-4.png)

以上操作可通过powershell自动实现，修改UserTask的代码如下：

```
function Invoke-ScheduledTaskComHandlerUserTask
{
    [CmdletBinding(SupportsShouldProcess = $True, ConfirmImpact = 'Medium')]
    Param (
        [Parameter(Mandatory = $True)]
        [ValidateNotNullOrEmpty()]
        [String]
        $Command,

        [Switch]
        $Force
    )
    $ScheduledTaskCommandPath = "HKCU:\Software\Classes\CLSID\{58fb76b9-ac85-4e55-ac04-427593b1d060}\InprocServer32"
    if ($Force -or ((Get-ItemProperty -Path $ScheduledTaskCommandPath -Name '(default)' -ErrorAction SilentlyContinue) -eq $null)){
        New-Item $ScheduledTaskCommandPath -Force |
            New-ItemProperty -Name '(Default)' -Value $Command -PropertyType string -Force | Out-Null
    }else{
        Write-Verbose "Key already exists, consider using -Force"
        exit
    }

    if (Test-Path $ScheduledTaskCommandPath) {
        Write-Verbose "Created registry entries to hijack the UserTask"
    }else{
        Write-Warning "Failed to create registry key, exiting"
        exit
    }  
}
Invoke-ScheduledTaskComHandlerUserTask -Command "C:\test\testmsg.dll" -Verbose

```
测试系统： Win7 x86

在运行后，当用户重新登录后，加载dll，实际演示如图

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-8-22/2-5.gif)

依次执行DLL_PROCESS_ATTACH()和DllGetClassObject(),由于DllGetClassObject()仅作弹框，所以之后会显示taskhost.exe报错

**注：**
此处仅作演示，暂不介绍具体解决方法

至此，成功劫持计划任务UserTask，在系统启动时加载testmsg.dll

## 0x04 UACBypass
---
计划任务同注册表HKCR:\下的键值存在对应关系，同样一些高权限的程序也会调用HKCR:\下的键值，这就为Bypass UAC带来了可能。

同样的原理，通过修改HKEY_CURRENT_USER\Software\Classes\下的键值同步修改HKCR:\下的键值，如果高权限的程序在运行过程中调用此处被修改过的键值，自然就实现了Bypass UAC，以高权限启动我们设定的程序。

此处的难点在于找到这个高权限的程序

**方法：**
借助Process Monitor，可以查看程序运行过程中的注册表、文件、网络、进程间的调用关系

接下来使用Process Monitor复现一下Matt Nelson@enigma0x3发现的过程

### 1、找到高权限的exe
Matt Nelson@enigma0x3的方法为使用sigcheck查看exe的manifest

参数如下：

sigcheck.exe -m c:\windows\system32\eventvwr.exe

返回结果如图

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-8-22/3-1.png)

从level="highestAvailable"得知eventvwr.exe的权限为高权限

**注：**

提供一个更加直观的判断方法：

查看文件图标，如果带有UAC标志，那么一定是高权限的程序，如图

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-8-22/3-2.png)


### 2、使用Process Monitor查看进程调用关系

启动Process Monitor

运行eventvwr.exe

Process Monitor选择Tools-Process Tree，找到eventvwr.exe，右键-Go To Event，如图

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-8-22/3-3.png)

仔细查看进程调用关系，如图

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-8-22/3-4.png)

找到如下信息：

- eventvwr.exe的权限为high

- eventvwr.exe首先查询键值HKCU\Software\Classes\mscfile\shell\open\command，查询结果为NAME NOT FOUND

- eventvwr.exe接着查询键值HKCR\mscfile\shell\open\command，结果为SUCCESS

### 3、修改测试

如果修改键值HKCU\Software\Classes\mscfile\shell\open\command，使其查询结果为SUCCESS，会如何呢？

下面首先修改键值HKCU\Software\Classes\mscfile\shell\open\command，值为calc.exe

再次运行eventvwr.exe，发现启动了calc.exe

使用Process Monitor查看进程调用关系，如图

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-8-22/3-5.png)

此时对键值HKCU\Software\Classes\mscfile\shell\open\command的查询结果为SUCCESS

至此，成功通过修改HKCU\Software\Classes\mscfile\shell\open\command，实现BypassUAC，获得了高权限

calc.exe的权限为high，如图

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-8-22/3-6.png)


### 4、更多结论

修改HKCU\Software\Classes\mscfile\shell\open\command后，会劫持所有.msc文件的运行，如gpedit.msc,如图

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-8-22/2-6.png)

按照这个方法，我对system32下的所有高权限exe进行了测试，尚未发现根据同样的方法利用command键值实现的UACBypass，但是其他键值仍值得测试。

## 0x05 防御
---
Win10系统已对该处做了修复，低版本Windows系统尚未修复，防御建议：

- set the UAC level to “Always Notify”

- remove the current user from the Local Administrators group

- alert on new registry entries in HKCU\Software\Classes\

> 引用自https://enigma0x3.net/2016/08/15/fileless-uac-bypass-using-eventvwr-exe-and-registry-hijacking/

## 0x06 小结
---
计划任务中可被用作persistence的dll有很多，在防御上建议对此进行监控。
通过Process Monitor寻找BypassUAC的方法值得继续研究，一定会有新的发现。

**相关学习资料：**

https://enigma0x3.net/2016/08/15/fileless-uac-bypass-using-eventvwr-exe-and-registry-hijacking/

https://enigma0x3.net/2016/05/25/userland-persistence-with-scheduled-tasks-and-com-handler-hijacking/

https://blog.gdatasoftware.com/2014/10/23941-com-object-hijacking-the-discreet-way-of-persistence

---

[LEAVE A REPLY](https://github.com/3gstudent/feedback/issues/new)
