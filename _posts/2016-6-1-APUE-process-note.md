---
layout: post
title: APUE Process note (进程相关笔记)
---

进程终止的8种方式
    * 正常终止
        1.从main return, 等效于 调用 exit
        2.调用 exit(), 不处理描述符,多进程以及作业控制,所以对unix 是不完整的
        3.调用 _exit() 或 _Exit(), 具体实现中,不冲洗标准IO流
            _Exit() 由ISO C 定义,提供一种无需运行终止处理程序或信号处理程序而终止的方法
            _exit() 由POSIX.1说明,被exit()调用,处理unix中的特定细节
        4.最后一个线程从启动例程 return,该线程返回值不用做进程返回值,进程以最终状态0返回
        5.从最后一个线程中调用 pthread_exit(),进程以最终状态0返回
    * 异常终止
        1.调用abort()
        2.收到一个信号
        3.最后一个线程对取消请求做出响应

    * 不管进程如何终止,都会执行内核中的同一段代码,为相应进程关闭所有打开的描述符,释放它所使用的存储器等.
***

C 程序总是从 main() 开始执行, 而内核在执行C程序前,先调用一个特殊的启动例程(唯一方法 exec()),编译器将此例程作为程序的启动地址.
* 例程从内核获得环境变量和命令行参数,然后调用main().
* 例程在main()返回后,立即调用 exit(), 过程类似 exit(main(argc, argv)).
***

终止函数
    #include <stdlib.h>
    void exit(int status)
    void _Exit(int status)
    #include <unistd.h>
    void _exit(int status)
    参数:
        以下行为是未定义的:
            1.不带参数调用终止函数
            2.无返回值的 return
            3.不指明 main() 的返回类型
        c99 以后,在指明 main() 返回类型的情况下,可以不显示调用 return/exit,如果要显示一定要指明终止参数
    区别:
        1.看头文件就知道由不同的协议维护,ISO C 和 POSIX.1
        2._Exit, _exit 直接返回内核
        3.exit 返回前总执行IO流的关闭清理操作(先执行登记的终止清理函数,然后执行io清理,最后_exit()或_Exit() 返回内核)

    #include <stdlib.h>
    int atexit(void (*func)(void))
    登记终止处理函数,在调用 exit() 时自动调用, 一次最多32个, 调用顺序和登记顺序相反, 多次登记多次调用
    返回值:
        成功返回0,出错非0
    参数:
        func: 终止处理函数指针

C 程序存储空间布局(典型布局)
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

共享库
    优点:
        1.减小二进制文件的大小
        2.修改共享库不需要对使用该库的程序重新编译
    缺点:
        第一次调用共享库时,运行时间开销增加

    # gcc -static Process_note.c -o pnote_s  // 不使用共享库
    # size pnote_s
    text    data     bss     dec     hex filename
    702538    3600   12552  718690   af762 pnote_s
    # gcc Process_note.c -o pnote           // 使用共享库
    # size pnote
    text    data     bss     dec     hex filename
    1464     560       8    2032     7f0 pnote

动态分配函数
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
        1.重复释放空间
        2.参数不是由上面3个函数产生的
        3.调用上面3个函数,忘记 free

环境变量
    存放于 environ 中, 形式: name = value, 使用下面函数读写
    这些函数的修改只影响当前进程以及以后生成或调用的任何子进程环境,不会影响父进程
    #include <stdlib.h>
    char *getenv(const char *name)
    返回值:
        name 对应的内容, 找不到返回 NULL

    int putenv(char *str)
    将 str 放入环境表,如果name 存在,则删除原有的
    老版本库中,不会拷贝str 里的内容到环境表,所以如果修改str或销毁,环境变量也会改变,建议使用setenv()
    返回值:
        成功返回0, 错误非0
    参数:
        str: name = value 格式

    int setenv(const char *name, const char *value, int rewrite)
    返回值:
        成功返回0, 错误 -1
    参数:
        rewrite: 如果 name 已在环境表中, 如果非0,删除原有的定义,如果0,不修改name的值,也不出错

    int unsetenv(const char *name)
    删除 name 的定义
    返回值:
        成功返回0, 错误 -1

    POSIX.1 和 XML 定义的环境变量:
    COLUMNS         终端宽度
    LINES           终端高度
    LOGNAME         登录名
    PATH            搜索可执行文件路径前缀列表
    PWD             当前工作目录的绝对路径名
    SHELL           用户首选 shell 名
    TERM            终端类型
    HOME            home 起始目录
    LANG            本地名
    LC_ALL          本地名
    LC_COLLATE      本地排序名
    LC_CTYPE        本地字符分类名
    LC_MESSAGES     本地消息名
    LC_MONETARY     本地货币编辑名
    LC_NUMERIC      本地数字编辑名
    LC_TIME         本地时间/日期格式名
    NLSPATH         消息类模板序列
    TMPDIR          在其中创建临时文件的目录名
    TZ              时区信息
    DATEMSK(XML)    getdate(3) 模板文件路径名
    MSGVERB(XML)    fmtmsg(3)处理的消息组成部分

跨函数跳转
    #include <setjmp.h>
    int setjmp(jmp_buf env)
    返回值:
        直接调用返回0, 从longjmp 返回非0
    参数:
        env:保存当前栈状态信息, 因为需要在多个函数中使用,通常是一个全局变量

    void longjmp(jmp_buf env, int val)
    参数:
        env:setjmp 的参数
        val:跳转后,作为 setjmp 的返回值,非0,多个 longjmp 时,通过该值区分

    跳转时,自动变量(automatic),寄存器变量(register)的值是不确定的,如果不想回滚变量的值,可以将变量声明为易失(Volatile)变量,全局和静态变量不会回滚

进程资源限制
    #include <sys/resource.h>
    int getrlimit(int resource, struct rlimit *rlptr)
    返回值:
        成功返回0,出错非0

    int setrlimit(int resource, const struct rlimit *rlptr)
    返回值:
        成功返回0,出错非0
    参数:
        resource:下面选项中的一个
            RLIMIT_AS       进程总的可用存储空间的最大长度.影响 sbrk() 和 mmap()
            RLIMIT_CORE     CORE 文件的最大字节数,0阻止创建 CORE 文件
            RLIMIT_CPU      CPU 时间的最大量值,超过此 soft limit, 向进程发送 SIGXCPU 信号
            RLIMIT_DATA     数据段(初始化段,未初始化段,堆的总和)的最大字节长度
            RLIMIT_FSIZE    可创建的文件的最大字节长度,超过此 soft limit, 向进程发送 SIGXFSZ 信号
            RLIMIT_NOFILE   每个进程能打开的最多文件数量.影响 sysconf() 在 _SC_OPEB_MAX 中的返回值
            RLIMIT_STACK    栈的最大字节长度
            // 上面7个 XML 要求的,下面的可选
            RLIMIT_MEMLOCK  一个进程在使用 mlock(2) 时锁定在存储空间中的最大字节数长度
            RLIMIT_MSGQUEUE 一个进程为 POSIX 消息队列可分配的最大字节数
            RLIMIT_NICE     调整进程优先级时,设置的最大限制
            RLIMIT_NPROC    每个实际用户ID可拥有的最大子进程数量,影响 sysconf() 在 _SC_CHILD_MAX 中的返回值
            RLIMIT_NPTS     每个用户可打开的伪终端的最大数量
            RLIMIT_RSS      最大驻内存集长度
            RLIMIT_SBSIZE   任一给定时刻,用户可以占用的套接字缓冲区的最大字节长度
            RLIMIT_SIGPENDING   一个进程可排队的最大信号数量.由 sigqueue 函数实施
            RLIMIT_SWAP     用户可消耗的交换空间的最大字节长度
            RLIMIT_VMEM     同 RLIMIT_AS

    struct rlimit
    {
        rlim_t rlim_cur; // soft limit:current limit
        rlim_t rlim_max; // hard limit:max value for current limit
    };
    修改的3条原则:
        1.任何进程都可以更改 soft limit ,但必须小于等于 hard limit
        2.任何进程都可以降低 hard limit ,但必须大于等于 soft limit, 对于普通用户改过程不可逆
        3.超级用户可以提高 hard limit

    资源设置影响到调用进程并由子进程继承,所以为了影响用户所有的后序进程,必须将限制设置在shell内

进程标示
    每一个进程都一个非负整形标示唯一ID,延迟复用
    ID 为0的是调度进程,也称为交换进程(swapper),是内核的一部分,不执行磁盘上的程序,又叫系统进程
    ID 为1的 init 进程,程序文件/etc/init /sbin/init, 不是内核中的系统进程,以超级用户特权运行的普通用户进程,
        通常读取与系统有关的初始化文件 /etc/rc* /etc/inittab /etc/init.d, 该进程绝不会停止
    ID 为2的是页守护进程(page deamon),负责支持虚拟存储器系统的分页操作
    #include <unistd.h>
    pid_t getpid(void);
    调用进程的进程ID
    pid_t getppid(void)
    调用进程的父进程ID
    uid_t getuid(void)
    调用进程的实际用户ID
    uid_t geteuid(void)
    调用进程的有效用户ID
    gid_t getgid(void)
    调用进程的实际组ID
    gid_t getegid(void)
    调用进程的有效组ID

创建子进程
    #include <unistd.h>
    pid_t fork(void)
    一次调用,两次返回,父进程和子进程共享文本段,子进程获得父进程的数据空间,堆,栈的副本
    返回值:
        父进程返回子进程ID,子进程返回0,出错返回-1

    父进程和子进程哪个优先执行时不确定的

    父进程所有打开的文件描述符都被复制到子进程,每个相同的打开描述符共享文件表项

    fork 后文件描述符的使用:
        1.父进程等待子进程完成
        2.父和子各自执行不同的程序段,分别关闭自己不用的描述符,互不干扰,常用语网络进程

    由子进程继承的属性:
        1.打开的文件描述符
        2.实际用户ID,实际组ID,有效用户ID,有效组ID
        3.附属组ID
        4.进程组ID
        5.会话ID
        6.控制终端
        7.设置用户ID标志和设置组ID标志
        8.当前工作目录
        9.根目录
        10.文件模式创建屏蔽字
        11.信号屏蔽与安排
        12.对任一打开文件描述符的执行时关闭标志
        13.环境
        14.连接的共享存储段
        15.存储映像
        16.资源限制

    父子进程的区别:
        1.fork() 返回值不同
        2.进程ID不同
        3.子进程的 tms_utime tms_stime tms_cutime tms_ustime 的值设置为0
        4.子进程不继承父进程设置的文件锁
        5.子进程的未处理闹钟被清除
        6.子进程的未处理信号集设置为空集

    fork() 失败的原因:
        1.系统进程数太多
        2.该实际用户ID的进程总数超过了系统限制

    fork() 的用法:
        1.父进程复制自己,和子进程执行不同的代码,如网络服务进程
        2.一个进程要执行一个不同的程序,如shell,fork 后立即调用 exec, spawn 是这2个操作的组合

    对于父进程已经终止的所有进程,其父进程改变为 init 进程

    一个已经终止但父进程未对其进行善后处理(获取进程终止状态,释放它所占有的资源)的进程为僵尸进程

    一个进程正常或意外终止时,内核会向其父进程发送 SIGCHLD,父进程可以选择忽略或定义信号处理程序

检查子进程返回状态
    #include <sys/wait.h>

    pid_t wait(int *statloc)
        1.如果所有子进程正在运行,则父进程阻塞
        2.如果一个子进程已终止,正等待父进程获取终止状态,则立即取得该子进程的终止状态返回
        3.没有任何子进程,出错返回
    返回值:
        成功返回子进程pid,失败返回 0 或 -1
    参数:
        statloc:用于存放子进程的返回状态, 如果不关系可以为NULL
                        判断返回状态            取得相关信息
        子进程正常终止 WIFEXITED(statloc)      WEXITSTATUS(statloc) 返回子进程传给 exit() 或 _exit() 的参数低8位
        子进程异常终止 WIFSIGNALED(statloc)    WTERMSIG(statloc) 获取使子进程终止的信号编号
        暂停子进程     WIFSTOPPED(statloc)     WSTOPSIG(statloc) 获取使子进程暂停的信号编号
        在作业控制暂停后继续执行的子进程返回的状态   WIFCONTINUED(statloc) 仅用于 waitid

    pid_t waitpid(pid_t pid, int *statloc, int options)
        同 wait 区别:
            1.可以指定子进程
            2.不一定阻塞
            3.通过 WUNTRANCED WCONTINUED 选项支持作业控制
    返回值:
        成功返回子进程pid,失败返回 0 或 -1
    参数:
        statloc:同上
        pid:
            == -1   等待任一子进程
            > 0     等待 pid 进程返回
            == 0    等待组 ID 相同的任一子进程
            < -1    等待组 ID 等于pid绝对值的任一子进程
        options:
            WCONTINUED  若实现支持作业控制,符合pid条件的子进程停止后已近继续,尚未报告状态,则返回其状态
            WNOHANG     若符合pid条件的子进程不是立即可用,则不阻塞,返回0
            WUNTRANCED  若实现支持作业控制,符合pid条件的子进程已处于停止状态,尚未报告状态,则返回其状态
            0

    int waitid(idtype_t idtype, id_t id, siginfo_t *info, int options)
    返回值:
        成功0, 错误 -1
    参数:
        idtype:
            P_PID   等待一特定子进程, id 指定PID
            P_PGID  等待一特定组中任一子进程, id 指定GID
            P_ALL   等待任一子进程, 忽略 id
        options:
            WEXITED     等待已退出的进程
            WSTOPPED    等待处于停止状态,但尚未报告状态
            WCONTINUED  等待曾经停止过,但现在已经恢复,但尚未报告状态
            上面三个必须选一
            WNOHANG     如无可用的子进程终止状态,则立即返回不阻塞
            WNOWAIT     不破坏子进程的终止状态,其状态可以由后续 wait waitpid waitid 取得
        info:
            siginfo 结构指针,包含造成进程状态改变的信号信息

竞争条件
    当多个进程对共享数据进行处理,但最终结果受到执行顺序的影响.即使使用 sleep,也不能保证
    模型:
    void function(void)
    {
        TELL_WAIT();            // 初始化
        if((pid = fork()) < 0)
            error;
        else if (pid == 0)
            WAIT_PARENT();      // 等待父进程优先处理
            doCSth();
        else
            doPSth();
            TELL_CHILD();       // 父进程处理完成,通知子进程继续
    }

函数 exec
    当进程调用 exec 函数时,该进程执行的程序完全由新进程替换,从新程序的main()开始执行,但不创建新的PID,只是使用新程序替换了文本段,数据段,堆,栈

    #include <unistd.h>
    int execl(const char *pathname, const char *arg0, .../* (char *)0 */)
    int execlp(const char *filename, const char *arg0, .../* (char *)0 */)
    int execle(const char *pathname, const char *arg0, .../* (char *)0, char *const envp[] */)
    int execv(const char *pathname, char *const argv[])
    int execvp(const char *filename, char *const argv[])
    int execve(const char *pathname, char *const argv[], char *const envp[])
    int fexecve(int fd, char *const argv[], char *const envp[])
    返回值:
        成功不返回,出错-1
    参数:
        pathname    路径名
        filename    文件名,如果包含'/',就识别为路径,否则在 PATH 定义的路径下搜索,如果找到的可执行文件,不是编译器产生的机器可执行文件,则识别为shell 脚本,调用 /bin/sh,以该文件作为 shell的输入
        fd          文件描述符,可有效避免寻找正确的执行文件,
        envp        环境表,没有该参数的函数,复制当前调用者环境 environ
        argv        参数数组
        const char *arg0, .../* (char *)0 */    参数列表,并且最后一个参数是 (char *)0

        新程序继承的属性:
            进程ID和父进程ID
            实际用户ID和实际组ID
            附属组ID
            进程组ID
            会话ID
            控制终端
            闹钟剩余实际
            当前工作目录
            根目录
            文件创建模式掩码
            文件锁
            进程信号掩码
            未处理的信号
            资源限制
            Nice 优先级
            tms_utime, tms_stime, tms_cutime, tms_cstime
            对于打开的文件处理和文件描述符的执行时关闭(close-on-exec)标志有关,如果 fcntl 设置了标签,则关闭该描述符,默认仍保持打开

    7个函数的关系:
        大多数系统中,execve() 是系统调用,其他都是库函数,最终实现都是通过 execve

            execlp ==> execl ==> execle
               |         |         |     <== 建立 argv
               V         V         V
            execvp --> execv --> execve(system call)   <-------- fexecve
                    ^         ^                ^
                    |         |                |
                搜索 path   使用 environ    建立路径 /proc/self/fd

更改用户id 和组id
    实际用户(组)ID:
        我们实际上是谁,登陆时由login(1)程序设置,只有超级用户可以更改
    有效用户(组)ID,附属组ID:
        用于文件访问权限检查
        若设置了用户(组)ID位,exec 将有效用户(组)ID设置为文件所有用户(组)ID,否则不设置
        但任何情况下调用 setu(g)id() 都可以设置为实际用户(组)ID或保存的设置用户(组)ID
    保存的设置用户(组)ID:
        由 exec 函数设置,保存了有效用户(组)ID的副本,超级用户可以使用 setu(g)id 修改

    通常程序执行时,有效用户(组)ID就是实际用户(组)ID, 但在文件模式(st_mod)存在2个特殊位,可以使程序执行时将有效用户(组)ID设置为文件所有用户(组)ID,称为设置用户(组)ID位,此时程序拥有所有者权限

    #include <unistd.h>
    int setuid(uid_t uid)
    返回值:
        成功返回0,出错-1

    int setgid(gid_t gid)
    返回值:
        成功返回0,出错-1

    修改用户id 规则:
        1.如果进程拥有超级用户权限,则setu(g)id(id)设置实际用户(组)ID,有效用户(组)ID,保存的设置用户(组)ID(saved set-userid) 为id
        2.如果进程没有超级用户权限,但 id 等于实际用户(组)ID或保存的设置用户(组)ID,则只修改有效用户(组)ID为 id
        3.如果上述2个条件都不满足,则设置 errno 为EPERM, 返回-1

解释器文件
    文本文件, 通常首行以 #! 开始, 还需要设置执行权限
    #! pathname[optional-argument]
    pathname 绝对路径, 作为 exec 的参数
    optional-arg 参数排在 exec 函数参数的前面,且脚本文件也做一个参数

函数 system
    #include <stdlib.h>
    int system(const char *cmdstring)
    返回值:
        1.如果 fork 出错或 waitpid 返回除 EINTR 之外的错误,返回-1,并设置 errno
        2.如果 exec 出错(不能执行 shell),_exit(127)
        3.否则执行成功,返回 shell 的终止状态,wait 函数的参数 statloc
    注意:
        在设置用户(组)ID的程序中,最好使用 fork, exec

用户标示
    #include <unistd.h>
    char *getlogin(void)
    获取登陆名
    返回值:
        返回指向登录名的指针,出错返回NULL

进程调度
    #include <unistd.h>
    int nice(int incr)
    将 incr 增加到 NZERO 上,返回合法值
    返回值:
        返回新的nice值(相对于NZERO),出错-1,需要检查errno,区分合法-1

    #include <sys/resource.h>
    int getpriority(int which, id_t who)
    返回值:
        -NZERO ~ NZERO - 1 的nice值,出错-1,如果对应多个进程,返回最高优先级(最小nice)
    参数:
        which:
            PRIO_USER       用户ID
            PRIO_PROCESS    进程ID
            PRIO_PGRP       进程组ID
        who:
            对应 which,如果为0,则为调用进程的用户,进程(组)ID

    int setpriority(int which, id_t who, int incr)
    返回值:
        成功返回0,出错-1

进程时间
    #include<sys/times.h>
    clock_t times(struct tms *buf)
    返回值:
        返回时钟时间,单位滴答数(sysconf(_SC_CLK_TCK)),出错-1
    参数:
        struct tms
        {
            clock_t tms_utime; // 用户CPU时间
            clock_t tms_stime; // 系统CPU时间
            clock_t tms_cutime; // 子进程,用户CPU时间
            clock_t tms_cstime; // 子进程:系统CPU时间
        };

进程组
    在同一个作业中结合起来的一个或多个进程,接受同一个终端的信号,进程组ID等于进程组组长进程ID
    进程组生命周期和组长无关,从创建直到最后一个进程结束或离开
    #include <unistd.h>
    pid_t getpgrp(void)
    返回值:
        调用进程的进程组ID

    int setpgid(pid_t pid, pid_t pgid)
    加入一个现有的进程组或创建一个新进程组
    进程只能为自己或子进程(调用 exec 前)设置进程组
    返回值:
        成功返回0,失败返回-1
    参数:
        pid:指定该pid所在组为修改目标,如果为0,则使用调用进程的pid
        pgid:修改指定组gid 为 pgid,如果为0,则使用第一个参数pid作为pgid,如果pid == pgid,则pid进程为组长

会话:
    一个或多个进程组组成,一个组内的进程通过shell的管道连接
    1.一个会话有一个控制终端(终端设备或伪终端设备)
    2.会话首进程创建与控制终端的连接,又称为控制进程
    3.会话可以分为一个前台进程组和一个或多个后台进程组
    4.会话如果有一个控制终端,则它有一个前台进程组,其他组为后台进程组
    5.无论何时键入终端的中断键(delete, Ctrl + c),都会将中断信号发送给前台进程组中的所有进程
    6.无论何时键入终端的退出键(Ctrl + \),都会将退出信号发送给前台进程组中的所有进程
    7.如果终端检测到调式解调器(网络)断开,则将断开信号发送给控制进程
    #include <unistd.h>
    pid_t setsid(void)
    创建一个新会话,且:
        1.调用进程称为会话首进程(创建会话的进程)
        2.该进程成为新进程组组长,pgid = pid
        3.该进程没有控制终端,若之前有,则切断
    返回值:
        成功返回进程组ID,出错返回-1,如果调用进程已经是一个组长,则报错,通常使用fork出的子进程调用

    pid_t getsid(pid_t pid)
    返回值:
        pid所在会话的首进程的进程组ID,出错 -1
    pid:
        pid 必须和调用进程处于同一会话,如果为0,则使用调用者pid

    pid_t tcgetpgrp(int fd)
    返回值:
        返回与 fd 关联终端的前台进程组ID,出错返回-1

    int tcsetpgrp(int fd, pid_t pgid)
    设置pgid进程组为前台进程组
    返回值:
        成功0,出错-1

    pid_t tcgetsid(int fd)
    返回值:
        会话的首进程的进程组ID,出错 -1

作业控制
    在一个终端启动多个作业(进程组),该机制控制哪些进程组可以继续访问该终端,哪些可以后台运行
    需要的支持:
        1.支持作业控制的shell
        2.内核中的终端驱动程序必须支持作业控制
        3.内核支持作业控制需要的信号

孤儿进程组:
    会话中的每一个进程,其父进程要么是同组的成员,要么不是改组所在会话的成员
    如果子进程先于父进程结束,父进程需要使用wait函数善后,否则产生僵尸进程
    如果父进程先于子进程结束,则由 init进程接管,在作业调度的机制下,会转为后台进程组

FreeBSD 的实现
    当创建一个新会话时,(setsid),会分配一个 session 结构:
        s_count     会话中的进程组数,0时可以释放该结构
        s_leader    会话首进程 proc 结构指针
        s_ttyvp     会话控制终端 vnode 结构指针
        s_ttyp      会话控制终端 tty 结构指针
        s_sid       "会话ID"
    tty 结构(s_ttyp):
        t_session   指向将此终端作为控制终端的 session 结构
        t_pgrp      指向前台进程组的 pgrp 结构
        t_termios   包含特殊字符和终端信息
        t_winsize   终端大小的 winsize 结构
    pgrp 结构(t_pgrp):
        pg_id       进程组id
        pg_session  指向此进程组所属会话的 session 结构
        pg_members  指向进程组成员表 proc 结构
    proc 结构(pg_members)
        p_id        进程id
        p_pptr      指向父进程的 proc 结构
        p_pgrp      指向此进程所属进程组的 pgrp 结构
        p_pglist    双向链表,上一个进程和下一个进程
    vnode 结构:
        打开控制终端设备时分配,进程对 /dev/tty 的所有访问都通过该结构

