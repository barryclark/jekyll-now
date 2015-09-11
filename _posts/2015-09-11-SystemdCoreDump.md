---
layout: post
title: Docker容器里的CoreDump跑哪里去了
---

今天被网友问到一个问题，第一反应感觉像是启动方式问题之类的，但验证了一下确实不是这么回事。问题是这样的：

> 请问下docker里面的生成的core文件为什么会到同台机器的另一个container

如果这个问题成立，那问题确实比较严重，其他容器可以通过某种手段来偷窥其他容器里面的内容，所以就顺手实验了一下。搭建了一下环境，如下：

```
宿主机：MAC OS X Yosemite
虚拟机：Vagrant + VirtualBox + CoreOS v633.1.0
容器：ubuntu14.04
```

## 共用内核

用一段小程序模拟一下CoreDump，模拟一下CoreDump，结果发现在容器内部并看不到core文件，虽然```/proc/sys/kernel/core_pattern```表明coredump会转存到```/usr/lib/systemd/systemd-coredump```，可是并没有。

```
root@1d712571f5d6:/# ls
a.out  bin  boot  coredump.c  dev  etc  home  lib  lib64  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
```

从宿主机上查看发现core文件被转存到了```/var/lib/systemd/coredump/core.a\x2eout.0.d771dd6739d24ff58f85ac4738d2b528.41.1441729321000000.xz```

```
core@core-01 /etc/systemd $ coredumpctl info
           PID: 41 (a.out)
           UID: 0 (root)
           GID: 0 (root)
        Signal: 11 (SEGV)
     Timestamp: Wed 2015-09-09 00:22:01 CST (29min ago)
       Boot ID: d771dd6739d24ff58f85ac4738d2b528
    Machine ID: 8d560486d5be4e1cadcafe909dcdfb55
      Hostname: core-01
      Coredump: /var/lib/systemd/coredump/core.a\x2eout.0.d771dd6739d24ff58f85ac4738d2b528.41.1441729321000000.xz
       Message: Process 41 (a.out) of user 0 dumped core.
```

到这才反应过来，coredump是由kernel捕获的，由于容器之间是共用kernel的，所以网友的那个问题在理论上是存在的，只要容器对宿主的coredump路径可见，就可以看到其他容器的coredump内容。

这个问题还有另外一个潜在安全风险，利用这个渠道容器内部可以通过一些特殊手段绕过Docker Volume的限制，向宿主机写入数据。

## 规避

避免这个问题，第一反应很简单，把LimitCore设置为0就可以关闭coredump的转存了，可事实并非如此

```
core@core-01 ~ $ ulimit -a
core file size          (blocks, -c) 0

core@core-01 ~ $ ./a.out
Segmentation fault (core dumped)

core@core-01 ~ $ coredumpctl info
           PID: 30001 (a.out)
           UID: 500 (core)
           GID: 500 (core)
        Signal: 11 (SEGV)
     Timestamp: Fri 2015-09-11 22:36:35 CST (20s ago)
  Command Line: ./a.out
    Executable: /home/core/a.out
 Control Group: /system.slice/system-sshd.slice/sshd@6-10.0.2.15:22-10.0.2.2:52356.service
          Unit: sshd@6-10.0.2.15:22-10.0.2.2:52356.service
         Slice: system-sshd.slice
       Boot ID: d771dd6739d24ff58f85ac4738d2b528
    Machine ID: 8d560486d5be4e1cadcafe909dcdfb55
      Hostname: core-01
      Coredump: /var/lib/systemd/coredump/core.a\x2eout.500.d771dd6739d24ff58f85ac4738d2b528.30001.1441982195000000.xz
       Message: Process 30001 (a.out) of user 500 dumped core.
```

那简单，在CoreOS系统下面修改```/etc/systemd/coredump.conf```，把```Storage=none```应该就可以关闭coredump了，然后并没有......。翻来翻去还真找到一个issue说这个事[Allow fully disabling systemd-coredump](https://github.com/systemd/systemd/issues/659)，推荐的做法是```ln -s /dev/null /etc/sysctl.d/50-coredump.conf```，注意下面的```coredumpctl```输出，已经没有了```Coredump```转存文件了

```
           PID: 30439 (a.out)
           UID: 500 (core)
           GID: 500 (core)
        Signal: 11 (SEGV)
     Timestamp: Fri 2015-09-11 23:06:33 CST (6s ago)
  Command Line: ./a.out
    Executable: /home/core/a.out
 Control Group: /system.slice/system-sshd.slice/sshd@7-10.0.2.15:22-10.0.2.2:52375.service
          Unit: sshd@7-10.0.2.15:22-10.0.2.2:52375.service
         Slice: system-sshd.slice
       Boot ID: d771dd6739d24ff58f85ac4738d2b528
    Machine ID: 8d560486d5be4e1cadcafe909dcdfb55
      Hostname: core-01
       Message: Process 30439 (a.out) of user 500 dumped core.
```
