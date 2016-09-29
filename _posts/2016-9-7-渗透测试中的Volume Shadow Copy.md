---
layout: post
title: 渗透测试中的Volume Shadow Copy
---

## 0x00 前言
---
之前在《导出当前域内所有用户hash的技术整理》中研究过如何通过Volume Shadow Copy实现对ntds.dit文件的复制， 可用来导出域内所有用户hash。而最近在Carbon Black的博客上面又学到了一些新的利用方法，于是整理成文。

**学习链接：**

https://www.carbonblack.com/2015/08/05/bit9-carbon-black-threat-research-team-unveils-nefarious-intents-of-volume-shadows-copies/


## 0x01 简介
---

本文将详细介绍以下两方面内容：

1. 通过Volume Shadow Copy恢复系统自动还原点内保存的文件

2. 通过Volume Shadow Copy创建一个无文件的进程

	流程如下：

- 创建当前卷影镜像
- 启动镜像内的程序
- 删除卷影镜像文件
- 程序源文件被删除
- 该进程实现无文件

## 0x02 背景知识
---

### Volume Shadow Copy Service

- 用于数据备份
- 支持Windows Server 2003 及以上操作系统
- 系统默认在特定条件下自动创建数据备份，如补丁安装后。在Win7系统大概每隔一周自动创建备份，该时间无法确定
- 禁用VSS会影响系统正常使用，如 System Restore和 Windows Server Backup
- 可使用VShadow在命令行下手动创建卷影镜像
- 系统默认不支持VShadow，可在Microsoft Windows Software Development Kit (SDK)中获得该工具

**注：**


Windows Server 2003和XP系统需要Volume Shadow Copy Service SDK 7.2，下载地址如下：

https://www.microsoft.com/en-us/download/details.aspx?id=23490

Windows Server 2008 R2和Windows 7系统需要对应的SDK版本(该版本Win8也适用)，下载地址如下：

https://www.microsoft.com/en-us/download/details.aspx?id=3138

## 0x03 恢复系统自动还原点内保存的文件
---

### 常用命令

通过vssadmin查看卷影镜像：

```
vssadmin list shadows
```

**注：**
vssadmin系统自带

如图

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-9-7/2-1.png)



通过wmic查看卷影镜像：

```
wmic /NAMESPACE:"\\root\CIMV2" PATH Win32_ShadowCopy GET /all /FORMAT:list
```

如图

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-9-7/2-2.png)


提取出关键的信息DeviceObject、ID和InstallDate，对应wmic命令如下：

```
wmic /NAMESPACE:"\\root\CIMV2" PATH Win32_ShadowCopy GET DeviceObject,ID,InstallDate /FORMAT:list
```

如图

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-9-7/2-3.png)


**注：**

在删除某个卷影镜像时需要填入该卷影镜像的ID

### 创建符号链接

将卷影镜像和文件夹建立虚拟关联，类似于通过快捷方式可访问卷影镜像中保存的文件，使用mklink命令，系统自带，需要`管理员权限`
格式如下：

```
mklink /d 指定快捷方式路径 [Shadow copy device name]\
```

**注：**

[Shadow copy device name]后要带一个\
如果不小心漏掉\,在建立关联后无法对其进行后续操作，可直接删除该关联再重新建立

例如，选取`\\?\GLOBALROOT\Device\HarddiskVolumeShadowCopy4`，对应的命令如下：

```
mklink /d c:\testvsc \\?\GLOBALROOT\Device\HarddiskVolumeShadowCopy4\
```

如图，成功创建

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-9-7/2-4.png)
![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-9-7/2-5.png)




`\\?\GLOBALROOT\Device\HarddiskVolumeShadowCopy4`对应的时间点为InstallDate=20160907160419.347805+480，于是c:\testvsc中保存的即为此时间点系统中保存的文件


## 0x04 创建一个无文件的进程
---
测试系统： Win 8.1 x86

测试exe： Win32Project1.exe 

执行后弹框，如图

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-9-7/2-6.png)


### 1. 创建卷影镜像
上传Win32Project1.exe和VShadow.exe，为当前系统创建卷影镜像，管理员权限执行如下命令：

```
vshadow.exe -p c:\
```

如图，为C盘创建卷影镜像，DeviceName为`\\?\GLOBALROOT\Device\HarddiskVolumeShadowCopy5`，ID为{10f63e0b-e47d-4121-969f-87fa458c5043}

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-9-7/3-1.png)

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-9-7/3-2.png)


### 2. 创建符号链接
命令行执行：

```
mklink /d c:\vscfiletest \\?\GLOBALROOT\Device\HarddiskVolumeShadowCopy5\
```

创建文件夹c:\vscfiletest，执行其中的测试文件Win32Project1.exe
如图

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-9-7/3-3.png)


使用Process Explorer查看Win32Project1.exe，路径显示为c:\vscfiletest\test\Win32Project1.exe

如图

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-9-7/3-4.png)


### 3. 删除符号链接
删除快捷方式文件夹就好，命令行参数如下：

```
rmdir c:\vscfiletest\
```

**注：**

即使文件夹中的Win32Project1.exe正在运行，仍可删除

### 4、删除卷影镜像

通过wmic找到卷影镜像对应的ID：

```
wmic /NAMESPACE:"\\root\CIMV2" PATH Win32_ShadowCopy GET DeviceObject,ID,InstallDate /FORMAT:list
```

`\\?\GLOBALROOT\Device\HarddiskVolumeShadowCopy5\`对应的ID为{10f63e0b-e47d-4121-969f-87fa458c5043}

完整的删除代码为：

```
vssadmin delete shadows /shadow={10f63e0b-e47d-4121-969f-87fa458c5043} /quiet
```

**注：**

加入/quiet是为了强制删除，省去输入Y确认

如图

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-9-7/3-5.png)


**补充：**
删除所有卷影镜像的命令为：

```
vssadmin delete shadows /all /quiet
```

此时，Win32Project1.exe仍在后台运行，而源文件c:\vscfiletest\test\Win32Project1.exe已经不存在

如图

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-9-7/3-6.png)



## 0x05 防御
---
- 利用Volume Shadow Copy的前提是需要获得管理员权限，所以首先需要防止攻击者获得管理员权限
- 对于个人用户主机，建议直接禁用Volume Shadow Copy服务
- Carbon Black的博客上面提供的防御方法如下：

> Search by hashes:
> 
> process_md5:3e1360a23ea5f9caf4987ccf35f2fcaf OR
> process_md5:576b379a59d094fb7b06c261a96034a6 OR
> process_md5:d0cd7ad91b2ff568275d497214ff185c OR
> process_md5:97fd0f3c05f1707544a9a6a0c896b43e OR
> process_md5:d560c155b68121d98f8370e7deafbc4d OR
> process_md5:c5d2992c8cba0771f71fe4d7625a0b8b OR
> process_md5:53d3e33ad31af6716559f29e889aca49
> 
> Search for Vshadow being executed:
> 
> modload:vss_ps.dll cmdline:”-p C:\”
> 
> modload:vss_ps.dll cmdline:”-p” -path:System32\werfault.exe
> 
> Search for mklink being executed via a shell out:
> 
> cmdline:””C:\Windows\system32\cmd.exe” /c mklink /D”
> 
> Search for processes being executed from the volume shadow copy
> locations:
> 
> path:device/harddiskvolumeshadowcopy*
> 
> path:device/harddiskvolume*

以上引用自https://www.carbonblack.com/2015/08/05/bit9-carbon-black-threat-research-team-unveils-nefarious-intents-of-volume-shadows-copies/



## 0x06 小结
--- 
总结一下渗透测试中Volume Shadow Copy的作用：


1. 通过Volume Shadow Copy恢复系统自动还原点内保存的文件

2. 通过Volume Shadow Copy创建一个无文件的进程

3. 复制正被程序占用的文件，如ntds.dit，当然powershell版的NinjaCopy也能实现相同的功能,可参照https://github.com/3gstudent/NinjaCopy



**更多学习资料：**

https://www.carbonblack.com/2015/08/03/new-crypto-ransomware-lurks-in-the-shadows/
http://securityweekly.com/2012/10/15/volume-shadow-copies-the-los/
https://technet.microsoft.com/en-us/library/ee923636.aspx

---

[LEAVE A REPLY](https://github.com/3gstudent/feedback/issues/new)
