### 多线程知识基础
##### 多线程的几个特性
1. 可见性：对变量的读，总是能看到（任意线程）对这个变量的操作，立刻看到对这个变量值的改变。
2. 原子性：一个或者多个不可分的操作。即一个操作或者多个操作是不会被任何因素打断。
3. 有序性：按照代码顺序执行。编译器不对代码进行重排序。Java内存模型中，为了加速程序的运行，允许编译器和处理器对代码进行重排。重排会保证代码逻辑不变。对于单线程，没影响；但会影响多线程的逻辑。

			

Synchronized
Synchronized能够实现原子性和可见性；在Java内存模型中，synchronized规定，线程在互斥代码时，先获得互斥锁→清空工作内存→在主内存中拷贝最新变量的副本到工作内存→执行完代码→将更改后的共享变量的值刷新到主内存中→释放互斥锁。

Volatile
Volatile能够实现可见性和有序性；Volatile实现内存可见性是通过store和load指令完成的；也就是对volatile变量执行写操作时，会在写操作后加入一条store指令，即强迫线程将最新的值刷新到主内存中；而在读操作时，会加入一条load指令，即强迫从主内存中读入变量的值。对任意单个volatile变量的读/写具有原子性，但不保证volatile变量复合操作的原子性。
 



### 线程池的失败策略 
 CallerRunsPolicy 由线程池所在的线程来执行 \
 AbortPolicy 抛异常 \
 DiscardOldestPolicy 忽略最久远的任务 \
 DiscardPolicy 直接忽略当前任务 

### 线程池的大小 
线程池分配线程的顺序： \
coreSize -> taskQueue -> maxSize  -> reject

### 线程池的方法：ExecutorService#
可以参考代码： ExecutorTerminalTest
1. shutdown
该方法开始关闭线程池，若线程池中有未完成的任务，则等待其完成。
该线程不会等待所有线程完成再结束。
2. shutdownNow
该方法试图停止当前正执行的task，但并不保证停止，只是发送一个interrupt信号。返回结果为未执行的任务列表。
3. isShutdown
只要调用过了shutdown或shutdownNow，就返回true。 
4. isTerminated
该方法判断线程池创建的线程都已经完成了，没有活着的线程了，总结下来，以下两种情况返回true：
	* 调用了 shutdown 方法，并且所有提交的任务完成;
	* 调用了 shutdownNow 方法，并且所有线程里的任务已经完成;

5. awaitTermination
等待执行完成，可以传入时间参数
6. submit	
重载了三个方法，可以传入callable、runnable、runnable+feature
7. invokeAll
执行所有
8. invokeAny
执行任意一个

参考源码：

	    /**
	     * Initiates an orderly shutdown in which previously submitted
	     * tasks are executed, but no new tasks will be accepted.
	     * Invocation has no additional effect if already shut down.
	     *
	     * <p>This method does not wait for previously submitted tasks to
	     * complete execution.  Use {@link #awaitTermination awaitTermination}
	     * to do that.
	    ....
	     */
	    void shutdown();
	
	 	/**
	     * Attempts to stop all actively executing tasks, halts the
	     * processing of waiting tasks, and returns a list of the tasks
	     * that were awaiting execution.
	     *
	     * <p>This method does not wait for actively executing tasks to
	     * terminate.  Use {@link #awaitTermination awaitTermination} to
	     * do that.
	     *
	     * <p>There are no guarantees beyond best-effort attempts to stop
	     * processing actively executing tasks.  For example, typical
	     * implementations will cancel via {@link Thread#interrupt}, so any
	     * task that fails to respond to interrupts may never terminate.
	     *
	     * @return list of tasks that never commenced execution
		...
	     */
    	List<Runnable> shutdownNow();

	    /**
	     * Returns {@code true} if this executor has been shut down.
	     *
	     * @return {@code true} if this executor has been shut down
	     */
	    boolean isShutdown();
	    /**
	     * Returns {@code true} if all tasks have completed following shut down.
	     * Note that {@code isTerminated} is never {@code true} unless
	     * either {@code shutdown} or {@code shutdownNow} was called first.
	     *
	     * @return {@code true} if all tasks have completed following shut down
	     */
	    boolean isTerminated();