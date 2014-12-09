---
layout: post
title: System.nanoTime()的实现分析
---

#System.currentTimeMillis和System.nanoTime的实现分析

分析这个的初衷是收到两个信息，一个是有同学说System.nanoTime要比System.currentTimeMillis效率高一点；一个是在业务实现是对时间判断比较频繁，想了解一下有没有高效的方式。

在业务实现的时候，从谷歌和度娘处获知System.currentTimeMillis的性能不好，尤其是在多线程并发调用的情况下。于是有人给出了这样的解法，主要思路就是缓存currentTimeMillis，减少系统调用。于是就好奇的想看看系统时钟具体是怎么实现的，到底慢在哪里，顺便也了解一下nanoTime和currentTimeMillis的实现区别。

```
public class SystemTimer {
	private final static ScheduledExecutorService executor = Executors.newSingleThreadScheduledExecutor();
	
	private static final long tickUnit = Long.parseLong(System.getProperty("commons.systimer.tick", "10"));
	private static volatile long time = System.currentTimeMillis();
	private static class TimerTicker implements Runnable {
		public void run() {
			time = System.currentTimeMillis();
		}
	}

	public static long currentTimeMillis() {
		return time;
	}

	static {
		executor.scheduleAtFixedRate(new TimerTicker(), tickUnit, tickUnit, TimeUnit.MILLISECONDS);
		Runtime.getRuntime().addShutdownHook(new Thread() {
			@Override
			public void run() {
				executor.shutdown();
			}
		});
	}
}
```

##JVM实现
System.currentTimeMills和System.nanoTime到底发生了什么，这是个问题。于是翻了翻Hotspot实现，在System.c文件中注册了两个函数JNI调用，这里只是注册了一个JVM_NanoTime函数地址，这个函数是在jvm.h头文件中定义的，但是在openjdk中并没有具体实现：

```
static JNINativeMethod methods[] = {
    {"currentTimeMillis", "()J",              (void *)&JVM_CurrentTimeMillis},
    {"nanoTime",          "()J",              (void *)&JVM_NanoTime},
    {"arraycopy",     "(" OBJ "I" OBJ "II)V", (void *)&JVM_ArrayCopy},
};

undef OBJ

JNIEXPORT void JNICALL
Java_java_lang_System_registerNatives(JNIEnv *env, jclass cls)
{
    (*env)->RegisterNatives(env, cls,
                            methods, sizeof(methods)/sizeof(methods[0]));
}
```

具体的实现是在hotspot的jdk7/hotspot/src/share/vm/prims/jvm.cpp中，实现了jvm.h头文件中定义的函数：

```
JVM_LEAF(jlong, JVM_CurrentTimeMillis(JNIEnv *env, jclass ignored))
 JVMWrapper("JVM_CurrentTimeMillis");
 return os::javaTimeNano();
JVM_END
```

具体的实现是os::javaTimeNano()函数，这个函数定义在jdk7u-hotspot/src/os/linux/vm/os_linux.cpp中。在实现中存在两个分支，当Linux::supports_monotonic_clock()不存在时，则通过系统调用gettimeofday实现，当然这个效率就很低了。那Linux::supports_monotonic_clock是个什么东东呢？

```
jlong os::javaTimeNanos() {
  if (Linux::supports_monotonic_clock()) {
    struct timespec tp;
    int status = Linux::clock_gettime(CLOCK_MONOTONIC, &tp);
    assert(status == 0, "gettime error");
    jlong result = jlong(tp.tv_sec) * (1000 * 1000 * 1000) + jlong(tp.tv_nsec);
    return result;
  } else {
    timeval time;
    int status = gettimeofday(&time, NULL);
    assert(status != -1, "linux error");
    jlong usecs = jlong(time.tv_sec) * (1000 * 1000) + jlong(time.tv_usec);
    return 1000 * usecs;
  }
}
```

System.currentTimeMillis的实现比较简单，就是通过```gettimeofday```来实现

```
jlong os::javaTimeMillis() {
  timeval time;
  int status = gettimeofday(&time, NULL);
  assert(status != -1, "linux error");
  return jlong(time.tv_sec) * 1000  +  jlong(time.tv_usec / 1000);
}
```

supports_monotonic_clock的实现是判断了一个```_clock_gettime```函数指针是否存在，同时```Linux::clock_gettime```实现也是调用这个函数指针，这个函数指针是在os_linux.hpp中定义的：

```
static int (*_clock_gettime)(clockid_t, struct timespec *);

static bool supports_monotonic_clock() {
  return _clock_gettime != NULL;
}

static int clock_gettime(clockid_t clock_id, struct timespec *tp) {
  return _clock_gettime ? _clock_gettime(clock_id, tp) : -1;
}
```

这个函数指针的初始化在os_linux.cpp中完成，默认是空。当Linux内核存在librt.so，且存在clock_gettime函数定义，且clock_gettime_func支持单调时钟（librt.so是POSIX.1b Realtime Extensions library实现库）。那么问题是这个rt库的实现比```gettimeofday```系统调用优化在哪里？

```
int (*os::Linux::_clock_gettime)(clockid_t, struct timespec *) = NULL;

void os::Linux::clock_init() {
  // we do dlopen's in this particular order due to bug in linux
  // dynamical loader (see 6348968) leading to crash on exit
  void* handle = dlopen("librt.so.1", RTLD_LAZY);
  if (handle == NULL) {
    handle = dlopen("librt.so", RTLD_LAZY);
  }

  if (handle) {
    int (*clock_getres_func)(clockid_t, struct timespec*) =
           (int(*)(clockid_t, struct timespec*))dlsym(handle, "clock_getres");
    int (*clock_gettime_func)(clockid_t, struct timespec*) =
           (int(*)(clockid_t, struct timespec*))dlsym(handle, "clock_gettime");
    if (clock_getres_func && clock_gettime_func) {
      // See if monotonic clock is supported by the kernel. Note that some
      // early implementations simply return kernel jiffies (updated every
      // 1/100 or 1/1000 second). It would be bad to use such a low res clock
      // for nano time (though the monotonic property is still nice to have).
      // It's fixed in newer kernels, however clock_getres() still returns
      // 1/HZ. We check if clock_getres() works, but will ignore its reported
      // resolution for now. Hopefully as people move to new kernels, this
      // won't be a problem.
      struct timespec res;
      struct timespec tp;
      if (clock_getres_func (CLOCK_MONOTONIC, &res) == 0 &&
          clock_gettime_func(CLOCK_MONOTONIC, &tp)  == 0) {
        // yes, monotonic clock is supported
        _clock_gettime = clock_gettime_func;
      } else {
        // close librt if there is no monotonic clock
        dlclose(handle);
      }
    }
  }
}
```

##系统实现

先来看一下Linux下各种获取时间方法的耗时分布：

```
time (s) => 4ns
ftime (ms) => 39ns
gettimeofday (us) => 30ns
clock_gettime (ns) => 26ns (CLOCK_REALTIME)
clock_gettime (ns) => 8ns (CLOCK_REALTIME_COARSE)
clock_gettime (ns) => 26ns (CLOCK_MONOTONIC)
clock_gettime (ns) => 9ns (CLOCK_MONOTONIC_COARSE)
clock_gettime (ns) => 170ns (CLOCK_PROCESS_CPUTIME_ID)
clock_gettime (ns) => 154ns (CLOCK_THREAD_CPUTIME_ID)
cached_clock (s) => 0ns
```

而实测应该在850ns左右的性能，主要是加上了系统调用的开销：

```
gettimeofday=790.645000
clock_gettime=854.562000

#include <include/linux/time.h>

int main(char **args) {
    struct timespec start;
    struct timespec end;
    clock_gettime(CLOCK_MONOTONIC, &start);
    int i = 0;
    int count = 1000000;
    for (i = 0; i < count; i++) {
  	struct timeval tvl;
   	gettimeofday(&tvl);
    }
    clock_gettime(CLOCK_MONOTONIC, &end);
    printf("gettimeofday=%f\n", ((end.tv_sec - start.tv_sec) * 1000 * 1000 * 1000 + (end.tv_nsec - start.tv_nsec)) * 1.0/count);
    
    clock_gettime(CLOCK_MONOTONIC, &start);
    for (i = 0; i < count; i++) {
        struct timespec tp;
        clock_gettime(CLOCK_REALTIME, &tp);
    }
    clock_gettime(CLOCK_MONOTONIC, &end);
    printf("clock_gettime=%f\n", ((end.tv_sec - start.tv_sec) * 1000 * 1000 * 1000 + (end.tv_nsec - start.tv_nsec)) * 1.0/count);
}
```

对比一下gettimeofday和clock_gettime的实现，实际上都是通过加锁方式访问全局变量。单独从复杂性上来看应该clock_gettime的CLOCK_MONOTONIC级别会更慢一点。

```
gettimeofday：

void do_gettimeofday(struct timeval *tv)
{
    unsigned long flags;
    unsigned long seq;
    unsigned long usec, sec;

    do {
        seq = read_seqbegin_irqsave(&xtime_lock, flags);
        usec = system_timer->offset();
        sec = xtime.tv_sec;
        usec += xtime.tv_nsec / 1000;
    } while (read_seqretry_irqrestore(&xtime_lock, seq, flags));
    
    /* usec may have gone up a lot: be safe */
    while (usec >= 1000000) {
        usec -= 1000000;
        sec++;
    }

    tv->tv_sec = sec;
    tv->tv_usec = usec;
}

```

```
monotonic：

notrace static int __always_inline do_monotonic(struct timespec *ts) 252 {
    unsigned long seq;
    u64 ns;
    int mode;

    do {
        seq = gtod_read_begin(gtod);
        mode = gtod->vclock_mode;
        ts->tv_sec = gtod->monotonic_time_sec;
        ns = gtod->monotonic_time_snsec;
        ns += vgetsns(&mode);
        ns >>= gtod->shift;
    } while (unlikely(gtod_read_retry(gtod, seq)));

    ts->tv_sec += __iter_div_u64_rem(ns, NSEC_PER_SEC, &ns);
    ts->tv_nsec = ns;

    return mode;
}
```

那么为什么CLOCK_MONOTONIC_COARSE就快了呢，可以看到粗略时钟实现更为简单，猜测应该主要是避免了```vgetsns```的耗时，但无从考证

```
notrace static void do_monotonic_coarse(struct timespec *ts)
{
    unsigned long seq;
    do {
        seq = gtod_read_begin(gtod);
        ts->tv_sec = gtod->monotonic_time_coarse_sec;
        ts->tv_nsec = gtod->monotonic_time_coarse_nsec;
    } while (unlikely(gtod_read_retry(gtod, seq)));
}
```

##总结

所以System.currentTimeMillis和System.nanoTime本质上没有区别，只是nanoTime提供了一种更高精度的时钟（```CLOCK_MONOTONIC```），而这种高精度会带来50ns的性能损耗。

同时JVM内部没有暴漏CLOCK_MONOTONIC_COARSE的时钟，所以没有更快的实现。

##Reference

http://www.javacodegeeks.com/2012/02/what-is-behind-systemnanotime.html
http://lxr.free-electrons.com/source/arch/x86/vdso/vclock_gettime.c
http://www.cs.fsu.edu/~baker/devices/lxr/http/source/linux/kernel/time.c
http://linuxmogeb.blogspot.com/2013/10/how-does-clockgettime-work.html
http://stackoverflow.com/questions/6498972/faster-equivalent-of-gettimeofday
