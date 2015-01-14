---
layout: post
title: Unity3D Research
published: true
---

##  代码加密保护
- 混淆代码 （尝试CodeGuard进行导出后的混淆）
- 增加数据验证
- 关键代码可以考虑写C++plugin，进行保护。

## 界面
- GUI（老式的Unity自带解决方案，低效率）
- UGUI（4.6新发布的UI解决方案，运行效率高，开发便捷堪比NGUI）
- NGUI（第三方收费插件）
    
## 热更新
- 资源（easydown更新插件，对每个更新文件记录一张sha1信息表，缺什么文件更新下载什么文件）
- 脚本（CSLight插件，加载运行类似C#语法文本作为外部脚本）