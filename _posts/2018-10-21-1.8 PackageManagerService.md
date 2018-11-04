---
title: 1.8 PackageManagerService
layout: categories
tags:
  - Android
  - Framework
categories:
  - Android
---

### 1.8.1 启动流程
    1. `mSystemServiceManager#startService(Installer.class)` 启动`installer`服务 -> `PackageManagerService#main()`创建`PackageManager`服务并注册到ServiceManager
    2. 创建PackageManagerService包含五个阶段, 阶段一、`PMS_START`保存`installer`对象, 创建dex优化`PackageDexOptimizer` -> 创建"data", "app", "app-lib"等目录 -> 创建`Settings`, `package.xml`记录所有安装app的信息 -> `SystemConfig#getInstance()` -> `SystemConfig#readPermissions()`解析指定目录下具有可读权限且以xml后缀的文件
    3. 阶段二、`PMS_SYSTEM_SCAN_START`包含以下操作
        1. 将环境变量`BOOTCLASSPATH`, `SYSTEMSERVERCLASSPATH`记录到alreadyDexOpted
        2. 扫描apk文件, `mInstaller#dexopt()`执行dexopt操作
        3. `scanDirLI()`扫描指定目录的`apk`文件最终调用`PackageParser#parseBaseApk()`解析`AndroidManifest.xml`, 生成`Application`、`Activity`、`Service`、`BroadcastReceiver`、`ContentProvider`等信息
    4. 阶段三、`PMS_DATA_SCAN_START`, `scanDirLi`收集"/data/app"和"/data/app-private"包名
    5. 阶段四、`PMS_SCAN_END`, `updatePermissionsLPw()`当sdk版本不一致,更新权限, 更新完权限和默认项后 -> `mSetting#writeLPr()`信息写回`package.xml`
    6. 阶段五、`PMS_READY`, `new PackageInstallerService()`创建`PackageInstaller`服务

### 1.8.2 操作`PackageManager`
    * `ContextImpl#getPackageManager()` -> `ActivityThread#getPackageManager()` -> `ServiceManager#getService("package")` 获取`PackageManager`服务

 ### 1.8.3 Installd守护进程
    * 启动流程
        * `android_get_control_socket()` 监听接受socket消息
        * `initialize_directories()`将/data/user/0链接到/data/data
        * `execute()`执行指令, 指令包括: {"ping", "install", "dexopt"}
    * Installer
        * `trasact()`先`connect()`判断是否建立socket连接, 通过`writeCommand()`命令写入socket`mOut`通道
