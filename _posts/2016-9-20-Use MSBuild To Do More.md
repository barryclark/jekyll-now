---
layout: post
title: Use MSBuild To Do More
---

## 0x00 前言
---
最近Casey Smith@subTee更新了一系列关于"MSBuild"的研究进展，对我有很大启发。
本文将基于他公开的POC，并结合我的研究心得，介绍以下`MSBuild`的应用技巧：

- Execute PowerShell Commands
- Execute PE file
- Execute Shellcode
- VisualStudio Persistence

## 0x01 简介
---

MSBuild是Microsoft Build Engine的缩写，代表Microsoft和Visual Studio的新的生成平台

MSBuild可在未安装Visual Studio的环境中编译.net的工程文件

MSBuild可编译特定格式的xml文件

更多基本知识可参照以下链接：

https://msdn.microsoft.com/en-us/library/dd393574.aspx


## 0x02 常规用法
---

### 1. 编译xml文件并执行代码

```
<?xml version="1.0" encoding="utf-8" ?>
<Project xmlns="http://schemas.microsoft.com/developer/msbuild/2003">
  <Target Name="PrintCurrentDateTime">
    <Message Text="The current date and time is: $(&#91;System.DateTime&#93;::Now)." />
  </Target>
</Project>
```

保存为test.csproj

cmd下执行：

```
C:\Windows\Microsoft.Net\Framework\v4.0.30319\msbuild.exe test.csproj
```

在cmd下会输出显示当前时间，如图
![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-9-20/2-1.png)



### 2. 编译xml文件生成exe

```
using System;
class Test
{
    static void Main()
    {
        Console.WriteLine("Hello world");
    }
}
```

保存为hello.cs

```
<Project xmlns="http://schemas.microsoft.com/developer/msbuild/2003">
    <Target Name="Compile">
        <CSC Sources="hello.cs" OutputAssembly="hello.exe" />
    </Target>
</Project>
```

保存为hello.csproj

hello.cs和hello.csproj放于同一目录

cmd下执行：

```
C:\Windows\Microsoft.Net\Framework\v4.0.30319\msbuild.exe hello.csproj
```

可以编译生成hello.exe

如图

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-9-20/2-2.png)



**注：**

编译文件满足xml文件格式即可，后缀名任意

## 0x03 扩展用法
---
在.NET Framework 4.0中支持了一项新功能"Inline Tasks"，被包含在元素UsingTask中，可用来在xml文件中执行c#代码

详细介绍可参考如下链接：

https://msdn.microsoft.com/en-us/library/dd722601.aspx?f=255&MSPPError=-2147217396

### 1. HelloWorld示例

以下代码保存为helloworld:

```
<Project ToolsVersion="4.0" xmlns="http://schemas.microsoft.com/developer/msbuild/2003">
  <Target Name="Hello">
   <HelloWorld />
  </Target>
  <UsingTask
    TaskName="HelloWorld"
    TaskFactory="CodeTaskFactory"
    AssemblyFile="C:\Windows\Microsoft.Net\Framework\v4.0.30319\Microsoft.Build.Tasks.v4.0.dll" >
    <ParameterGroup/>
    <Task>
      <Using Namespace="System" />  
      <Code Type="Fragment" Language="cs">
        <![CDATA[
			    Console.WriteLine("Hello World");		
        ]]>
      </Code>
    </Task>
    </UsingTask>
</Project>
```

**注：**

保存的文件名任意

cmd下执行：

```
C:\Windows\Microsoft.NET\Framework\v4.0.30319\msbuild.exe helloworld
```

cmd输出helloworld

如图

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-9-20/2-3.png)



### 2. 执行powershell命令

可参照Casey分享的POC，地址如下：

https://gist.github.com/subTee/6b236083da2fd6ddff216e434f257614

该POC已将c#代码转换成xml文件的格式，编写需要注意的部分如下：

如图

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-9-20/3-1.png)


标记1TaskName可修改，但两个位置的名称需要对应

标记2为固定格式:`TaskFactory="CodeTaskFactory"`

标记3的路径在不同系统可能会有区别，准确的为：

`"$(MSBuildToolsPath)\Microsoft.Build.Tasks.v4.0.dll"`

系统默认安装路径为:

`"C:\Windows\Microsoft.Net\Framework\v4.0.30319\Microsoft.Build.Tasks.v4.0.dll"`

标记4为一个简单的输出helloworld实例

如图

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-9-20/3-2.png)


标记5为固定格式，定义为`public class ClassExample :  Task, ITask`



实际测试POC如图,成功执行powershell命令

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-9-20/3-3.png)




### 3. 执行PE文件
Casey分享的POC地址如下：

https://gist.github.com/subTee/ca477b4d19c885bec05ce238cbad6371

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-9-20/3-4.png)

但是上传的文件被截断，导致部分代码无法查看，于是尝试自己实现

结合之前研究过的代码，地址如下：

https://gist.github.com/subTee/00cdac8990584bd2c2fe

对照上文提到的xml格式，编写代码实现在Inline Tasks中内存加载64位的mimikatz.exe，实现代码的下载地址为：

https://github.com/3gstudent/msbuild-inline-task/blob/master/executes%20mimikatz.xml



cmd下执行：

```
C:\Windows\Microsoft.NET\Framework\v4.0.30319\msbuild.exe aa
```

报错，如图

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-9-20/4-1.png)


**解决方法：**

需要换用64位的.net Framework，原代码无需修改，只需要使用64位的.net Framework加载就好

cmd下执行：

```
C:\Windows\Microsoft.NET\Framework64\v4.0.30319\msbuild.exe aa
```

加载成功，如图

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-9-20/4-2.png)




### 4. 执行shellcode
 

参考自https://gist.github.com/subTee/a06d4ae23e2517566c52

使用msf生成32位shellcode：

```
use windows/exec
set CMD calc.exe
set EXITFUNC thread
generate -t csharp
```

同样结合上文提到的xml格式，编写代码实现在Inline Tasks中执行shellcode，实现代码的下载地址为：


https://github.com/3gstudent/msbuild-inline-task/blob/master/executes%20shellcode.xml




保存为SimpleTasks.csproj，在cmd下执行：

```
C:\Windows\Microsoft.NET\Framework\v4.0.30319\msbuild.exe SimpleTasks.csproj
```

如图，成功执行shellcode弹出计算器

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-9-20/4-3.png)



在64位系统下，先将shellcode替换为64位，然后换用64位的.net Framework执行即可，代码下载地址为：

https://github.com/3gstudent/msbuild-inline-task/blob/master/executes%20x64%20shellcode.xml

如图，成功执行64位shellcode

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-9-20/4-4.png)



### 5. VisualStudio Persistence

在《Pay close attention to your download code——Visual Studio trick to run code when building》中介绍过利用VisualStudio的.csproj文件实现的代码执行，同样Inline Tasks也可用到此处，实现代码已上传，地址为：

https://github.com/3gstudent/msbuild-inline-task/blob/master/executes%20shellcode%20when%20visual%20studio%20is%20afterBuild.csproj

修改vs工程中的.csproj文件，添加上述代码，能够实现在vs工程编译过程中执行shellcode

如图

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-9-20/5-1.png)



## 0x04 小结
---
利用MSBuild实现的代码执行，有如下特点：

- 可绕过应用程序白名单
- 提供一种直接执行shellcode的方法
- 在内存中执行PE文件
- 结合VisualStudio实现的钓鱼和后门

所以建议对系统中的msbuild.exe进行更多的监控和限制。

**注：**

文中相关POC代码已上传至github，地址为：

https://github.com/3gstudent/msbuild-inline-task


---

[LEAVE A REPLY](https://github.com/3gstudent/feedback/issues/new)
