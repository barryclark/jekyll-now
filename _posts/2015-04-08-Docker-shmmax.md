---
layout: post
title: Docker里莫名其妙的/proc/sys/kernel/shmmax
---

Docker部署重型应用，比如数据库，是否有坑？今天还真发现了一个。

在部署数据库的时候，可能需要调整一些内核参数，比如/proc/sys/kernel/shmmax这个参数，这个参数是用来限制内核共享内存大小。共享内存这个东西有什么用呢？比如Oracle的SGA实现就是使用的共享内存，多个Session可以共享一块公共的内存空间，从而降低整体内存占用率。Java应用也有一些尝试，比如多个JVM之间可以共享内存，不过不太成熟。

但是在Docker容器里 (kernel 2.6.32)，这个值就是33554432，也就是32M，所以如果你的应用很依赖共享内存的大小，就要谨慎了。

### 莫名其妙的/proc/sys/kernel/shmmax

如果你想在自己的环境里验证一下，可以按如下步骤验证：

On Host: 

```
# cat /proc/sys/kernel/shmmax
68719476736
# ipcs -lm
------ Shared Memory Limits --------
max number of segments = 4096							#SHMMNI
max seg size (kbytes) = 67108864						#SHMMAX
max total shared memory (kbytes) = 17179869184			#SHMALL
min seg size (bytes) = 1
```

In Container:

```
# docker run -it --rm ubuntu cat /proc/sys/kernel/shmmax
33554432
# docker run -it --rm ubuntu ipcs -lm
------ Shared Memory Limits --------
max number of segments = 4096
max seg size (kbytes) = 32768
max total shared memory (kbytes) = 8388608
min seg size (bytes) = 1
```
如果是boot2docker上，容器的shmmax值又很大，表示奇怪：

```
# boot2docker version
Boot2Docker-cli version: v1.5.0
Git commit: ccd9032
docker@boot2docker:~$ cat /proc/sys/kernel/shmmax
18446744073692774399
docker@boot2docker:~$ docker run -it --rm ubuntu:14.04 cat /proc/sys/kernel/shmmax
18446744073692774399
```

### 第一个疑问：容器为什么没有继承宿主机的shmmax值

第一反应，docker容器复用的内核，这个值应该跟宿主机的值一样才对。搜了半天，终于在Kernel的Google Groups发现了原因。原来是IPC Namespace的创建实现，在初始化shm的过程中使用的是SHMALL，SHMMAX两个宏定义，也就是默认值。这个默认值是多少呢？坑爹的，还真是32M。

```
#define SHMMAX 0x2000000
```

这就能解释为什么docker容器在创建后，并没有继承父容器（也就是宿主机）的shmmax值。而能不能继承呢？实际上也有人提过，[[PATCH] IPC initialize shmmax and shmall from the current value not the default](https://groups.google.com/forum/#!topic/linux.kernel/b5PAWl7kNls)，就是在```shm_init_ns```的时候判断一下，代码是这样的：

```
--- 
  ipc/shm.c | 9 +++++++-- 
  1 file changed, 7 insertions(+), 2 deletions(-) 

diff --git a/ipc/shm.c b/ipc/shm.c 
index 7a51443..b7a4728 100644 
--- a/ipc/shm.c 
+++ b/ipc/shm.c 
@@ -74,8 +74,13 @@ static int sysvipc_shm_proc_show(struct seq_file *s, void *it); 

  void shm_init_ns(struct ipc_namespace *ns) 
  { 
-       ns->shm_ctlmax = SHMMAX; 
-       ns->shm_ctlall = SHMALL; 
+       if (ns == &init_ipc_ns) { 
+               ns->shm_ctlmax = SHMMAX; 
+               ns->shm_ctlall = SHMALL; 
+       } else { 
+               ns->shm_ctlmax = init_ipc_ns.shm_ctlmax; 
+               ns->shm_ctlall = init_ipc_ns.shm_ctlall; 
+       } 
         ns->shm_ctlmni = SHMMNI; 
         ns->shm_rmid_forced = 0; 
         ns->shm_tot = 0; 
-- 
1.8.4 
```

效果呢，就是这个样子滴：

```
[root@sp2 ~]# sysctl -a|grep shmmax 
kernel.shmmax = 68719476736 
[root@sp2 ~]# lxc-attach -n cent_plain 
[root@localhost ~]# sysctl -a|grep shmmax 
kernel.shmmax = 68719476736 
[root@localhost ~]# halt 
[root@sp2 ~]# sysctl -a|grep shmmax 
kernel.shmmax = 68719476736 
[root@sp2 ~]# sysctl kernel.shmmax=34359738368 
kernel.shmmax = 34359738368 
[root@sp2 ~]# lxc-start -n cent_plain -d 
[root@sp2 ~]# lxc-attach -n cent_plain 
[root@localhost ~]# sysctl -a|grep shmmax 
kernel.shmmax = 34359738368 
[root@localhost ~]# 
```

回头来问，继承这个解决方案是不是一个好方案呢？个人认为未必，而且由于container是共用内核，这样默认情况下就会导致所有container都会继承相同的值，而实际上有可能各container对这个值的需求是不一样的。

### 第二个疑问：为什么boot2docker的shmmax值这么大

第一反应是boot2docker是不是做了什么修改。偶然间发现，是kernel有人提了patch[ipc/shm.c: increase the defaults for SHMALL, SHMMAX](https://git.kernel.org/cgit/linux/kernel/git/mhocko/mm.git/commit/include/uapi/linux/shm.h?id=060028bac94bf60a65415d1d55a359c3a17d5c31)

```
diff --git a/include/uapi/linux/shm.h b/include/uapi/linux/shm.h
index 78b6941..74e786d 100644
--- a/include/uapi/linux/shm.h
+++ b/include/uapi/linux/shm.h
@@ -9,15 +9,13 @@
 
 /*
  * SHMMAX, SHMMNI and SHMALL are upper limits are defaults which can
- * be increased by sysctl
+ * be modified by sysctl.
  */
 
-#define SHMMAX 0x2000000		 /* max shared seg size (bytes) */
 #define SHMMIN 1			 /* min shared seg size (bytes) */
 #define SHMMNI 4096			 /* max num of segs system wide */
-#ifndef __KERNEL__
-#define SHMALL (SHMMAX/getpagesize()*(SHMMNI/16))
-#endif
+#define SHMMAX (ULONG_MAX - (1L<<24))	 /* max shared seg size (bytes) */
+#define SHMALL (ULONG_MAX - (1L<<24))	 /* max shm system wide (pages) */
 #define SHMSEG SHMMNI			 /* max shared segs per process */
```

boot2docker使用的内核比较新，应该是包含了这个更新，所以shmmax值这么大

```
docker@boot2docker:~$ uname -a
Linux boot2docker 3.18.5-tinycore64 #1 SMP Sun Feb 1 06:02:30 UTC 2015 x86_64 GNU/Linux
```

### 第三个疑问：这个值在容器里能改吗

既然这个值在生产环境的系统中有坑，那能够在容器里进行定制化吗？简单方式肯定不行，因为docker容器默认/proc是只读挂载的，所以无法在运行期进行修改：

```
root@98dd6e62ff18:/# echo "18446744073692774398" > /proc/sys/kernel/shmmax
bash: /proc/sys/kernel/shmmax: Read-only file system
```

针对这个问题，也有相关的issue，像[how can i change the value of /proc/sys/kernel/shmmax in a container?](https://github.com/docker/docker/issues/10176)和[sysctl tunables](https://github.com/docker/docker/issues/4717)

目前看起来可行的两个方案：

- --ipc=host，这个参数在docker的1.3.2版本中不支持
- --privileged=true，不过这个比较危险

```
docker@boot2docker:~$ docker run -it --rm --privileged=true ubuntu:14.04 bash
root@6d8525137fb9:/# echo "18446744073692774398" > /proc/sys/kernel/shmmax
root@6d8525137fb9:/# cat /proc/sys/kernel/shmmax
18446744073692774398
root@6d8525137fb9:/# exit
docker@boot2docker:~$ cat /proc/sys/kernel/shmmax
18446744073692774399
```
