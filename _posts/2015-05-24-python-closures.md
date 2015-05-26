---
layout: post
title: Python 点滴
---

Python 学习笔记--Closures


1. **Closures 本质**

	Closures 即闭包，其本质是可以为一个函数提供一个额外的变量名字空间——即介于闭包函数（内嵌含数）和外函数之间的包含自由变量的名字空间——进行操作，从而为普通函数的功能提供了一定的扩展。

	当内嵌函数引用外函数名字空间的变量时，内嵌含数即称为闭包。该变量称为自由变量。由这些自由变量组成的名字空间将一直伴随闭包“流浪”。
    
    可总结为： clorures = 内嵌函数 + 自由变量名字空间。
    
    其中外函数提供这些自由变量的定义。而内嵌函数对外函数定义的引用使其最终转化为自由变量，并形成这个特殊的自由变量名字空间。
    
	```
    def logger_facroty(prefix="", with_prefix=True):
    	if with_prefix:
        	def logger(msg):
            	print prefix + msg
        	return logger
    	else:
        	def logger(msg):
            	print msg
        	return logger
   ## 该例中if语句块中定义的内嵌函数logger即为闭包，因为其引用了自由变量prefix；而else 语句块中的则不能称为闭包。
	```

2. **Clousers 和普通函数的区别**

	闭包带有不同于一般函数的名字空间：即带有全局的名字空间；局部名字空间；和介于闭包函数和外函数之间的名字空间。该空间的变量称为自由变量，即这些变量不随定义其的外函数执行的结束而被释放，而是自由地存放，随闭包函数的实例而处于“流浪”状态；可共闭包函数随时访问。
    
    上例中当调用闭包 logger 时，prefix 变量并不随 logger_factory 函数执行的结束而被释放，而是一直伴随着闭包。

	闭包函数在使用方式上有些类似与回调函数，不过由于闭包多出来了这个名字空间，使其拥有比回调强大得多的功能。 Python 装饰器采用闭包实现。

3. **Closures和类的相似及区别**

	闭包带有额外的名字空间的这个特点和类有点相像，类方法可以访问类名字空间定义的变量，而不仅仅局限于全局和局部名字空间。

	不过类属性所在的空间也是一个局部名字空间，是属于类的。

	闭包函数之所以强大就是因为其多出的这个名字空间，使其具备了一定类似于类操作的功能。 类思想是不是由此生发扩展而来的（臆想）？

4. **Closures 和装饰器**

	Python 装饰器 = Closeure + @语法糖；
    
	````
    ## @语法糖的作用：
    
    def str(s):
    	print "global str()"

	def bar():
    	str("hello, world")

    @bar
	def foo():
		print "foo"

    #等价于

   	def foo():
		print "foo"
	foo = bar(foo)
	```
    
    带参数的装饰器实现：
    带参数的装饰器需要用到多层内嵌函数定义的闭包来实现，如下例子所示：
    
    ```
	import time

	def function_performance_statistics(trace_this=True):
    	if trace_this:
       		def performace_statistics_delegate(func):
            	def counter(*args, **kwargs):
               		start = time.clock()
                	func(*args, **kwargs)
                	end =time.clock()
                	print 'used time: %d' % (end - start, )
            	return counter
    	else:
       		def performace_statistics_delegate(func):
           		return func
    			return performace_statistics_delegate
    
	@function_performance_statistics(True)
	def add(x, y):
    	time.sleep(3)
    	print 'add result: %d' % (x + y,)
	
	@function_performance_statistics(False)
	def mul(x, y=1):
    	print 'mul result: %d' % (x * y,)
        
	add(1, 1)
	mul(10)
    
	##等价于
    add = function_performance_statistics(True)(add(1, 1))
	mul = function_performance_statistics(False)(mul(10))
    
    ##其中 counter 是闭包
	```
    [盛江涛的 Blog][] inline link.

[盛江涛的 Blog]: http://qiaqiaqia.github.io/ "Blog site"