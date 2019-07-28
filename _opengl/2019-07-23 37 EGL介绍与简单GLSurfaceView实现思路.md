---
title: EGL介绍与简单GLSurfaceView实现思路
permalink: /opengl/egl/glsurfaceview
layout: posts
last_modified_at: 2019-07-23T09:45:06-05:00
tags:
  - EGL GLSurfaceView
categories:
  - EGL GLSurfaceView
---

### EGL
![来自网上](http://mtqiniu.qiujuer.net/egl_framework_02.png)
- `EGLDisplay`: 系统显示ID或者句柄, 是对显示设备的抽象, 可以理解为前端显示窗口(Front Display)
- `EGLContext`: OpenGL ES图形图形上下文, 代表OpenGL状态机, OpenGL指令的执行环境
- `EGLSurface`: 系统窗口或`FrameBuffer`(包含Color Buffer, Stencil Buffer, Depth Buffer)句柄, 可以理解为后端渲染目标窗口(Back Surface)
- `EGLConfig`: 创建`EGLContext`和`EGLSurface`所需的配置。一般我们会在这配置`EGLSurface` Color Buffer里RGBA各个颜色所占的位数、Stencil Buffer和Depth Buffer的位数, 以及指定能绘制到Surface的渲染api(OpenGL ES, OpenGLVG等)

### EGL的基本用法
1. 获得app或者显示屏的`display`
2. 初始化`display`
3. 创建`surface`
4. 创建`context`, 并与`display`关联起来, 这个`context`会保存OpenGL的状态
5. 将`context#makeCurrent()`, 后续的OpenGL操作将影响当前context的状态
6. 使用OpenGL渲染
7. 调用`flush`或者`swap buffers`, EGL告诉系统或者window system展示渲染好的surface

- EGL Commands
![EGL Commands来自网络](http://mtqiniu.qiujuer.net/egl_command.png)

- 如何选择`surface`, `surface`实际是`FrameBuffer`, 即渲染的地方
  * 上屏渲染: EGL window, 使用`eglCreateWindowSurface`创建。在Android中`eglCreateWindowSurface`接口所需参数之一`EGLNativeWindow`, 一般建议用`SurfaceTexture`(可以从`SurfaceView`或者`TextureView`获得)
  * 离屏渲染: EGL Pbuffers(Pixel buffer). 使用`eglCreatePbufferSurface`创建。另外可用`pixmap`, 但缺点是绘制的图保存在内存, 且跨平台支持差。Pbuffersurface绘制的图保存在显存中, 推荐使用

### 参考
- [已离职刘老师的分享]()
- [Khronos Native Platform Graphics Interface](https://www.khronos.org/registry/EGL/specs/eglspec.1.4.pdf)
