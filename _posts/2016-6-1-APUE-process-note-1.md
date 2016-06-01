---
layout: post
title: APUE Process note 1 (进程相关笔记1)
---

### 进程终止的8种方式 ###
- 正常终止
    1. 从main return, 等效于 调用 exit
    2. 调用 exit(), 不处理描述符,多进程以及作业控制,所以对unix 是不完整的
    3. 调用 _exit() 或 _Exit(), 具体实现中,不冲洗标准IO流
        - _Exit() 由ISO C 定义,提供一种无需运行终止处理程序或信号处理程序而终止的方法
        - _exit() 由POSIX.1说明,被exit()调用,处理unix中的特定细节
    4. 最后一个线程从启动例程 return,该线程返回值不用做进程返回值,进程以最终状态0返回
    5. 从最后一个线程中调用 pthread_exit(),进程以最终状态0返回
- 异常终止
    1. 调用abort()
    2. 收到一个信号
    3. 最后一个线程对取消请求做出响应

- 不管进程如何终止,都会执行内核中的同一段代码,为相应进程关闭所有打开的描述符,释放它所使用的存储器等.
***
### C 程序总是从 main() 开始执行 ###
- 而内核在执行C程序前,先调用一个特殊的启动例程(唯一方法 exec()),编译器将此例程作为程序的启动地址.
- 例程从内核获得环境变量和命令行参数,然后调用main().
- 例程在main()返回后,立即调用 exit(), 过程类似 exit(main(argc, argv)).
***
### 终止函数 ###
    #include <stdlib.h>
    void exit(int status)
    void _Exit(int status)
    #include <unistd.h>
    void _exit(int status)
    以下行为是未定义的:
        1. 不带参数调用终止函数
        2. 无返回值的 return
        3. 不指明 main() 的返回类型
        4. c99 以后,在指明 main() 返回类型的情况下,可以不显示调用 return/exit,如果要显示一定要指明终止参数
    三个函数的区别:
        1. 看头文件就知道由不同的协议维护,ISO C 和 POSIX.1
        2. _Exit, _exit 直接返回内核
        3. exit 返回前总执行IO流的关闭清理操作(先执行登记的终止清理函数,然后执行io清理,最后_exit()或_Exit() 返回内核)
***
### 登记终止处理函数 ###
    #include <stdlib.h>
    int atexit(void (*func)(void))
    在调用 exit() 时自动调用, 一次最多32个, 调用顺序和登记顺序相反, 多次登记多次调用
    返回值:
        成功返回0,出错非0
    参数:
        func: 终止处理函数指针
***
### C 程序存储空间布局(典型布局) ###
    低  文本段(text segment): CPU 执行的机器指令, 可共享,只读防恶意修改
    |   初始化数据段(Initialized data segment):存放需要显式初始化的变量
    |   未初始化数据段(Uninitialized data segment):程序执行时,内核将此处的变量初始化为0或NULL
    v   堆(Heap):动态分配的空间
        栈(Stack):自动变量以及每次函数调用时需要保存的信息,增长方向从高向低
    高  命令行参数和环境变量

    size 显式可执行文件的段大小
    # size /usr/bin/cc
    text    data     bss     dec     hex filename
    570546  3864    7208  581618   8dff2 /usr/bin/cc
***
### 共享库 ###
    优点:
        1. 减小二进制文件的大小
        2. 修改共享库不需要对使用该库的程序重新编译
    缺点:
        1. 第一次调用共享库时,运行时间开销增加

    # gcc -static test.c -o test  // 不使用共享库
    # size pnote_s
    text    data     bss     dec     hex filename
    702538    3600   12552  718690   af762 test

    # gcc test.c -o test           // 使用共享库
    # size pnote
    text    data     bss     dec     hex filename
    1464     560       8    2032     7f0 test
***
### 动态分配函数 ###
    #include <stdlib.h>
    void *malloc(size_t size)
    分配指定字节数的存储区,该区中的数据不确定
    返回值:
        成功返回指针,出错NULL

    void *calloc(size_t nobj, size_t size)
    分配指定数量指定长度的存储区,该区中的数据每一位初始化为0
    返回值:
        成功返回指针,出错NULL

    void *realloc(void *ptr, size_t size)
    增加或减少之前分配的空间,如果增加,则新空间内的数据不确定
    返回值:
        成功返回指针,出错NULL

    void free(void *ptr)
    释放分配的空间
    注意致命错误:
        1. 重复释放空间
        2. 参数不是由上面3个函数产生的
        3. 调用上面3个函数,忘记 free
***
