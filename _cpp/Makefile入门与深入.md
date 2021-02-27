---
title: 35 Makefile入门与深入
permalink: /cpp/makefile/
last_modified_at: 2020-01-02T09:45:06-05:00
tags:
  - cpp makefile
categories:
  - cpp makefile
---

### 跟我一起写 Makefile（一）
- `makefile`定义整个工程的编译规则, 好处是"自动化编译", `make`则是解析`makefile`的命令工具
- 程序的编译和链接
  - 把源文件(`.c, .cpp`)编译成中间代码文件(UNIX下为`.o`文件)的过程称为编译(compile); 将大量中间文件(Object File)合成执行文件称为链接(link); 为了编译方便, 一般会给中间文件打包(UNIX下是Archive File即`.a`文件)
- `makefile`的规则

  ```
    target ... : prerequisites ...
          command
          ...
          ...
  ```

  - target即目标文件(Object File), 也可以是执行文件或标签(label)
  - prerequisites即生成target所需的文件或目标
  - command即`make`需要执行的命令
  - target这一或多个目标文件依赖于prerequisties中的文件, 其生成规则定义在command中
- Example

```
  # edit 为target, main.o为prerequisties
  # cc -o 为command
  edit : main.o ...
          cc -o edit main.o...
  main.o : main.c defs.h
          cc -c main.c
  ...
  clean:
          rm edit main.o...
```

### 跟我一起写 Makefile（二）
- `make`是如何工作
  1. `make`会在当前目录找`Makefile`或`makefile`的文件
  2. 找到后, 会找文件中的第一个目标文件(target), 上述例子中会找到`edit`, 并作为最终目标文件
  3. 如果`edit`文件不存在或`edit`依赖的`.o`修改文件更新, 则执行后面命令生成`edit`
  4. 如果`edit`依赖的`.o`文件存在, 那么`make`会在当前文件找目标`.o`文件的依赖性,如果找到再根据规则生成`.o`文件
  5. `.c`和`.h`文件存在, `make`生成`.o`,再用`.o`文件生成最终的`target`即`eidt`文件

- `makefile`使用变量
  - 使用变量优化
```
  # 使用变量优化后
  objects = main.o ...
  # edit 为target, main.o为prerequisties
  # cc -o 为command
  edit : $(objects)
          cc -o edit $(objects)
  main.o : main.c defs.h
          cc -c main.c
  ...
  clean:
          rm edit $(objects)
```

- `make`自动推导
  - `make`可以自动推导文件以及文件的依赖关系后面的命令, 例如target`main.o`, `make` 自动把`make.c`加在依赖关系, 且`cc -c main.c`也会被推导加入

  ```
    # 这即是`make`的隐晦规则
    # 使用变量优化后 & 自动推导优化后..
    objects = main.o ...
    # edit 为target, main.o为prerequisties
    # cc -o 为command
    edit : $(objects)
            cc -o edit $(objects)
    main.o : defs.h
    ...
    # .PHONY 表示clean是个伪目标文件
    .PHONY : clean
    clean:
            rm edit $(objects)
  ```

- 清空目标文件规则
  - 稳健的`clean`应该写为`  .PHONY : clean \n clean: \n -rm edit $(objects)`
  - rm命令前面的减号意思是某文件出现问题, 忽略且继续后面的事
  - `clean`默认放到文件最后

### 跟我一起写 Makefile（三）
- `Makefile`包含了什么
  1. 显示规则, 显示规则说明如何生成一个或多个目标文件, 写`Makefile`需要明显指出要生成的文件, 文件的依赖文件, 生成的命令
  2. 隐晦规则, 由于`make`有自动推导的功能, 隐晦规则可以实现更简略地书写`Makefile`
  3. 变量的定义, 在`Makefile`中定义的变量, 变量一般是字符串, 类似C语言的宏, 当`Makefile`被执行, 变量都会被扩展相应的引用为止上
  4. 文件指示, 包含三部分: 1).在`Makefile`中引用其它`Makefile`, 类似C语言的`include`; 2). 根据某些情况指定`Makefile`中的有效部分, 类似C语言的预编译`#if`; 3). 定义多行命令
  5. 注释, `Makefile`只有行注释, 使用`#`字符

- 引用`Makefile`
  - 语法`include <filename>`, `filename`可以是当前操作系统的Shell的文件模式(可以包含路径和通配符)
  - `include foo.make *.mk $(bar)`, 变量`$(bar)`包含`e.mk`和`f.mk`, 即等价于`include foo.make a.mk b.mk c.mk e.mk f.mk`
  - 查找规则
    1. 在当前目录找, 找不到则从以下目录找
    2. `make`执行有`-I`或`--include-dir`参数, 则在指定目录查找
    3. 如果目录`<prefix>/include`存在(一般为`/usr/local/bin`或`/usr/include`), `make`也会查找
    4. 如果均未找则生成警告, 一旦完成`Makefile`读取, `make`会再重试查找, 如果还是不行, `make`才会出现致命信息
    5. 在`-include`前增加减号, 可忽略无法找到文件继续执行

- 环境变量 `MAKEFILES`
  - 当前环境定义了环境变量`MAKEFILES`, `make`会把该变量做类似`include`操作, 这个变量的值是其它的`Makefile`, 用空格分割; 从环境变量引入的`Makefile`目标不会起作用, 且环境变量定义的文件发生错误, `make`会忽略
  - **该环境变量不建议使用**

- `make`(GNU)工作流程
  1. 读取所有的`makefile`
  2. 读入被`include`的其它`Makefile`
  3. 初始化文件中的变量
  4. 推导隐晦规则, 并分析所有规则
  5. 为所有的目标文件创建依赖关系链
  6. 根据依赖关系, 决定哪些目标要重新生成
  7. 执行生成命令

### 跟我一起写 Makefile（四）
- 书写规则
  - 规则包含依赖关系以及生成目标方法
  - `Makefile`中规则的顺序非常重要, `Makefile`只应有一个最终目标, 第一条规则将确定为最终目标

- 规则的语法
  - `targets`是文件名, 以空格分开, 可以使用通配符
  - `command`是命令行
  - `prerequisites`为目标依赖的文件(或依赖目标)
  - 规则告诉`make`文件的依赖关系和如何生成目标文件
  ```
    targets ... : prerequisites ...
          command
          ...
          ...
  ```

- 在规则中使用通配符
  - `*`, `?`, `[...]`

- 文件搜索
  - 特殊变量`VPATH`, 如果定义该变量, `make`在当前目录找不到, 则会到所指定的目录中寻找文件; 例如`VPATH = src:../headers`, 定义了两个指定目录, "src"和"../headers", 目录以冒号分隔
  - `vpath`关键字, 和`VPATH`变量类似但更灵活, 使用方法如下:
    1. `vpath <pattern> <directories>`, 为符合模式`<pattern>`的文件指定搜索目录`directories`
    2. `vpath <pattern>` 清除符合模式`<pattern>`的文件搜索目录
    3. `vpath` 清除所有已被设置好的文件搜索目录
  - `<pattern>`包含的`%`字符表示匹配零或若干字符, 例如`vpath %.h ../headers`, 表示要求`make`在`..headers`目录下搜索所有以`.h`结尾的文件

- 伪目标
  - 伪目标并不是文件, 只是标签, 由于伪目标不是文件, `make`无法生成它的依赖关系和决定它是否执行, 需要显示指明该目标才能生效, 另伪目标不能和文件名重名; 如`clean`
  - `.PHONY clean`显示声明目标是伪目标, 可避免文件重名的情况
  - 伪目标一般没有依赖文件, 但可以给它指定所依赖的文件, 伪目标也可以作为"默认目标", 只要将它在第一个。如果`Makefile`需要一口气生成若干可执行文件, 敲下`make`搞定, 且所有目标文件都写在一个`Makefile`中, 那么可使用"为目标"特性:

  ```
    # Makefile首个目标会作为默认目标, 这里声明all伪目标, 且依赖其它三个目标, 伪目标特性是总是被执行的, 因而其依赖的三个目标总是不如all目标新, 所以其它三个目标则总是会被决议, 也就达成一次生成多个目标的目的
    all : prog1 prog2 ..
    .PHONY : all

    prog1: pro1.o
           cc -o prog1 prog1.o
    prog2: pro2.o
           cc -o prog2 prog2.o
    ..

  ```

### 跟我一起写 Makefile（五）
- 多目标
  - `Makefile`支持多目标, 当多个目标同时依赖一个文件, 且生成命令大体类似, 即可合并; 例如:
  ```
    bigoutput littleouput : text.g
          #-$(subst output,,$@)中$表示执行`Makefile`函数, 函数名为subst, 后面为参数; $@表示目标的集合, 类似数组, $@依次取出目标, 并执于命令
          generate text.g -$(subst output,,$@) > $@
    # 等价于上述规则
    bigoutput : text.g
          generate text.g -big ? bigoutput
    littleoutput : text.g
          generate text.g -little > littleoutput
  ```

- 静态模式
  - `targets`定义一系列目标文件, 可以有通配符
  - `target-pattern`指明`targets`模式, 即目标模式
  - `prereq-patterns`是目标的依赖模式, 它对`target-pattern`形成的模式再进行一次依赖目标的定义

  ```
  <targets ...>: <target-pattern>: <prereq-patterns ...>
          <commands>
          ...
  ```
  - 例如:

  ```
    objects = foo.o bar.o
    all: $(objects)
    # 表示目标从$objects获取, %.o表示所有.o结尾的目标, 即foo.o和bar.o, 而依赖模式%.c则取模式%.o的%, 即foo和bar, 并加上.c的后缀, 即依赖目标为foo.c和bar.c; $<和$@为自动变量, $<表示所有依赖目标集(即foo.c和bar.c), $@表示目标集(即foo.o和bar.o)
    $(objects): %.o: %.c
                $(CC) -c $(CFLAGS) $< -o $@
  ```

- 自动生成依赖性
  - 大多C/C++支持`-M`选项, 即自动寻找源文件中包含的头文件, 并生成依赖关系; 如果使用GNU的C/C++编译器需要用`-MM`选项, 即`CC -M main.c`, 其输出`main.o : main.c defs.h`
  - GNU组织建议把编译器为每一个源文件的自动生成的依赖关系放到一个文件中, 并为`name.c`文件生成`name.d`的`Makefile`文件, `.d`文件存放对应`.c`文件的依赖关系

```
  # 自动生成.d文件并包含在主Makefile中, 即可自动化生成每个文件的依赖关系
  # 所有.d依赖.c
  %.d: %.c
          # 删除所有的目标
          @set -e; rm -f $@; /
          # 为每个依赖文件$<, 即.c文件生成依赖文件, $@表示模式%.d文件
           $(CC) -M $(CPPFLAGS) $< > $@.
; /
          # sed命令为替换命令
          sed 's,/($*/)/.o[ :]*,/1.o $@ : ,g' < $@.
> $@; /
          # 删除临时文件
          rm -f $@.

```
  - 将自动生成的规则.d文件放入主`Makefile`, 使用`include`命令,即`include $(source:.c=.d)`, 即所有.c的字符串替换成.d

### 跟我一起写 Makefile（六）
- 书写命令
  - 命令行必须以[Tab]开头, 除非命令是紧跟在依赖规则后面的分号后

- 显示命令
  - make默认将执行命令输出到屏幕
  - 命令前加`@`, 命令则不展示
  - `make` + `-n`或`--just-print`则只显示命令, 但不执行
  - `make` + `-s`或`--slient`则全面禁止命令显示

- 命令执行
  - 如果上一条命令的结果应用于下一条命令, 使用分号隔开两条命令, 例如: `exec: cd /home/xx; pwd`

- 命令报错
  - 命令出错, `make`会终止当前规则, 这将有可能终止所有规则的执行; 部分命令出错不代表错误, 可在命令前加`-`表示忽略错误; 全局忽略可使用`make`+`-i`或`--ignore-errors`, 还可指明`.IGNORE`作为目标, 该规则中所有命令将忽略错误;`make` + `-k`或`--keep-going`表示某规则命令出错, 则终结该规则执行, 但继续执行其它规则

- 嵌套执行`make`
  - 工程子目录执行`make`, 可在总控`Makefile`加入`subsystem: cd subdir && $(MAKE)`
  - 传递变量到下级`Makefile`, 声明为`export <variable ...>`; 不传递则可声明`unexport <variable ...>`
  - `SHELL`和`MAKEFLAGS`变量默认传递到下层`Makefile`

- 定义命令包

  ```
    # 命令序以define开始, endif结束
    # run-yacc为命令包名
    define run-yacc
    yacc $(firstword $^)
    mv y.tab.c $@
    endef

    # 在Makefile中
    foo.c : foo.y
            # 类似变量用法
            $(run-yacc)
  ```

### 跟我一起写 Makefile（七）
- 使用变量
  - 变量可在目标, 依赖目标, 命令或`Makefile`其它部分使用
  - 变量命名可包含字符, 数字, 下划线; 但不能用`:`, `#`, `=`或空字符, 且大小写敏感

- 变量的基础
  - 使用变量时需要在前加`$`符号, 最好用`()`或`{}`括起来

- 变量中的变量
  - 定义变量的值, 可使用其它变量构造变量的值, 例如`foo = $(bar);`, 该定义可能出现递归定义, 如`A = $(B) B = $(A)`; 另可使用`:=`操作符

  ```
    x := foo
    y := $(x) bar
    x := later
    # 等价于
    y := foo bar
    x := later
  ```

  - `?=`操作符, 如`foo ?= bar`, 若`foo`变量没定义过, 则值为`bar`, 否则这条语句什么都不做

- 变量的高级用法
  - 变量值的替换, 如`$(var:a=b)`或`${var:a=b}`, 即把变量`var`中所有以`a`字符结尾的`a`替换成`b`字符, 结尾的意思是空格或结束符

  ```
    foo := a.o b.o c.o
    # bar的值为a.c b.c c.c
    bar := $(foo:.o=.c)
  ```
  - 静态模式, 依赖于被替换字符串有相同的模式, 模式中必须包含`%`字符

  ```
    foo := a.o b.o c.o
    # bar的值为a.c b.c c.c
    bar := $(foo:%.o=%.c)
  ```
  - 把变量的值当成变量

  ```
    # 例1
    x = y
    y = z
    # $(x)的值为y, $($(x))即$(y), a的值即z
    a := $($(x))

    # 例2
    # $(z)即为y, 即$($(y)), 而y表示$(x)的1字符替换成2, 即variable2, 即$(variable2), 因而a的值为Hello
    x = variable1
    variable2 := Hello
    y = $(subst 1,2,$(x))
    z = y
    a := $($($(z)))
  ```

- 追加变量值
  - `+=`操作符可给变量追加值

- `override`指示符
  - `make`命令行参数设置的变量, `Makefile`会忽略该变量的赋值, 想在`Makefile`中设置该类参数的值, 可使用`override`, 如`override <variable> = <value>`, 或`override <variable> := <value>`

### 跟我一起写 Makefile（八）
- 多行变量
  - `define`可用于设置变量, 设置变量的值可以换行, 可定义一系列命令, 也可用于命令包

- 环境变量
  - `Makefile`定义环境变量`CFLAGS`则使用该变量, 否则使用系统环境变量
  - `make`嵌套调用, 上层`Makefile`的变量以系统环境变量传递到下层`Makefile`, 默认情况只有命令行设置的变量会传递, `Makefile`中的变量往下传递需要`export`声明

- 目标变量
  - 给某个目标设置局部变量, 变量称为'Target-specific Variable', 可与全局变量同名, 语法规则:  
    - `<target ...> : <variable-assignment>`
    - `<target ...> : override <variable-assignment>`
  - 例如

  ```
    # 设置目标变量后, 不管全局变量CFLAGS的值, 在prog及引发的所有规则中, $(CFLAGS)的值均为-g
    prog : CFLAGS = -g
    prog : prog.o ...
            $(CC) $(CFLAGS) prog.o ...
    prog.o : prog.c
            $(CC) $(CFLAGS) prog.c
    ...
  ```

- 模式变量
  - 模式变量('Pattern-specific Variable')支持变量定义在符合该模式的所有目标上, 语法规则:
    - `<pattern ...> : <variable-assignment>`
    - `<pattern ...> : override <variable-assignment>`

- 使用条件判断
  - `ifeq` + `(条件表达式)`包含两个参数, 以逗号分隔, `else` + `endif`, 例如:

  ```
    ...

    ## 变量$(CC)的值与gcc匹配
    ifeq ($(CC), gcc)
      ...
    else
      ...
    endif
      ...
    ...
  ```

### 跟我一起写 Makefile（九）
- 函数的用法
  - 语法如下
    - `$(<function> <arguments>)`
    - `${<function> <arguments>}`

- 字符串处理函数
  1. `$(subst <from>, <to>, <text>)`字符串替换函数, 即把字符串`<text>`中的`<from>`字符替换成`<to>`字符
  2. `$(patsubst <pattern>,<replacement>,<text>)`模式字符串替换函数, 查找`<text>`中的单词是否符合模式`<pattern>`, 匹配则以`<replacement>`替换, 例如: `$(patsubst %.c,%.o,x.c.c bar.c)`, 即把字符串`x.c.c bar.c`中符合模式`%.c`的单词替换成`%.o`, 即`x.c.o bar.o`
  3. `$(strip <string>)`去空格函数, 即去掉`<string>`字符串开头和结尾的空字符
  4. `$(findstring <find>,<in>)`查找字符串函数, 即在字符串`<in>`中查找`<find>`字符串, 例如`$(findstring a, a b c)`, 即返回`a`字符串
  5. `$(filter <pattern...>, <text>)`过滤函数, 即以`<pattern>`模式过滤`<text>`字符串中的单词, 保留符合模式`<pattern>`的单词, 例如:

  ```
    sources := foo.c bar.c baz.s ugh.h
    # $(filter %.c %.s, $(sources))返回的值为foo.c bar.c baz.s
    foo: $(sources)
          cc $(filter %.c %.s, $(sources)) -o foo

  ```     
  6. `$(filter-out <pattern...>,<text>)`反过滤函数, 以`<pattern>`模式过滤`<text>`字符串中的单词, 去除符合模式`<pattern>`的单词
  7. `$(sort <list>)`排序函数, 即给定字符串`<list>`的单词排序(升序)
  8. `$(word <n>, <text>)`取单词函数, 即取字符串`<text>`中第`<n>`个单词, 例如: `$(word 2, foo bar baz)`返回值为`bar`
  9. `$(wordlist <s>,<e>,<text>)`取单词串函数, 即从字符串`<text>`中取`<s>`到`<e>`的单词串, `<s>`和`<e>`为数字, 例如: `$(wordlist 2, 3, foo bar baz)`返回`bar baz`
  10. `$(words <text>)`单词个数统计函数
  11. `$(firstword <text>)`首单词函数, 即取字符串`<text>`中的第一个单词

- 文件名操作函数
  1. `$(dir <names...>)`取目录函数, 从文件名序列`<names>`中取出目录部分, 目录部分指最后一个反斜杠`/`之前的部分, 如果没有反斜杠, 则返回`./`, 例如: `$(dir src/foo.c hacks)` 返回值为`src/ ./`
  2. `$(notdir <names..>)`取文件函数, 例如: `$(notdir src/foo.c hacks)`返回`foo.c hacks`
  3. `$(suffix <names...>)`取文件名后缀函数
  4. `$(basename <names...>)`取文件名前缀函数
  5. `$(addsuffix <suffix>,<names...>)`加后缀函数, 把后缀`<suffix>`加到`<names>`单词后面
  6. `$(addprefix <prefix>,<names...>)`加前缀函数, 把前缀`<prefix>`加到`<names>`单词前面
  7. `$(join <list1>,<list2>)`连接函数, 把`<list2>`单词加到`<list1>`单词后, 例如: `$(join aaa bbb , 111 222 333)`返回值为`aaa111 bbb222 333`

### 跟我一起写 Makefile（十）
- `foreach`函数, 用于循环, 语法如下: `$(foreach <var>,<list>,<text>)`, 即把参数`<list>`中单词逐一取出放到`<var>`指定变量中, 再执行`<text>`所包含的表达式; 例如:

```
  names := a b c d
  # 把$(names)逐个取出, 并保存到变量n中, $(n).o每次根据$(n)计算出一个值, 即a.o b.o c.o d.o
  files := $(foreach n,$(names),$(n).o)
```

- `if`函数, 语法如下: `$(if <condition>,<then-part>)`或`$(if <condition>,<then-part>,<else-part>)`

- `call`函数, 唯一可创建新的参数化的函数, 语法如下: `$(call <expression>,<parm1>,<parm2>,<parm3>...)`,例如

```
  reverse = $(1) $(2)
  # make执行时, expression的变量如$(1) $(2)会被参数<parm1>,<parm2>..一次取代, expression的返回值即call函数的返回值, 即foo的值为a b
  foo = $(call reverse,a,b)
```

- `origin`函数, 即变量的来源, 语法如下: `$(origin <variable>)`, 包含如下情况:
  1. 变量未定义, 则返回`undefined`
  2. 变量为默认定义, 则返回`default`
  3. 环境变量, 则返回`environment`
  4. 在`Makefile`定义的变量, 则返回`file`
  5. 被命令行定义的变量, 则返回`command line`
  6. `override`指示符定义, 则返回`override`
  7. 自动化变量, 则返回`automatic`

- `shell`函数, 即把执行操作系统命令后的输出作为函数返回, 例如: `files := $(shell echo *.c)`

- 控制`make`的函数
  - `$(error <text...>)`, 产生致命错误, `<text>`是错误信息
  - `$(warning <text...>)`, 产生警告信息

### 跟我一起写 Makefile（十一）
- `make`的退出码, 1). 0-表示成功执行, 2). 1-表示`make`运行时出现错误, 3). 2-`make`的`-q`选项, 且`make`使得一些目标不需要更新
- 指定`Makefile`
	- `make -f xxx.mk`指定`Makefile`
- 指定目标
	- `make + target`完成指定目标, 例如`make clean`
	- `MAKECMDGOALS`该变量保存终极目标的列表
	- `all`该伪目标是所有目标的目标, 即编译所有的目标
	- `clean`该伪目标是删除所有被`make`创建的文件
	- `install`该伪目标即安装已编译好的程序, 把目标执行文件拷贝到指定的目标中
	- `print`该伪目标是列出改变过的源文件
	- `tar`该伪目标是把源码程序打包备份
	- `dist`该伪目标是创建压缩文件
	- `TAGS`该伪目标是更新所有目标, 以备完整地重编译
	- `check`和`test`, 这俩伪目标用于测试`Makefile`流程

### 跟我一起写 Makefile（十二）
- 隐含规则
	1. 编译C程序的隐含规则: `n.o`的目标的依赖目标会自动推导为`n.c`, 并且生成命令是`$(CC) -c $(CPPFLAGS) $(CFLAGS)`
	2. 编译C++程序的隐含规则: `n.o`的目标的依赖目标会自动推导为`n.cc`或`n.c`, 并且生成命令是`$(CXX) -c $(CPPFLAGS) $(CFLAGS)`
	…
	8. 链接`Object`文件的隐含规则: `<n>`目标依赖于`n.o`, 通过运行C的编译器来运行链接程序生成, 其生成命令是`$(CC $(LDFLAGS) <n>.o $(LOADLIBES) $(LDLIBS)`

	```
		x : y.o z.o
		# 以上规则且x.c & y.c & z.c存在, 隐含规则将执行如下命令
		cc -c x.c -o x.o
		…
		cc x.o y.o z.o -o x
		rm -f x.o
		…
	```

- 隐含规则使用的变量
	- 编译C程序的隐含规则命令是`$(CC) -c $(CFLAGS) $(CPFLAGS)`, `make`默认的编译命令是`cc`,
	- 关于命令的变量
		1. `AR`: 函数库打包程序, 默认命令是`ar`
		2. `AS`: 汇编编译程序, 默认命令是`as`
		3. `CC`: C语言编译程序, 默认命令是`cc`
		4. `CXX`: C++编译程序, 默认命令是`g++`
		5. `CPP` : C语言的预处理器, 默认命令是`$(CC) -E`
		6. `RM` : 删除文件命令, 默认命令是`rm -f`
	- 关于命令参数的变量
		1. `ARFLAGS` : 函数库打包程序`AR`命令的参数, 默认值是`rv`
		2. `CFLAGS` : C语言编译器参数
		3. `CXXFLAGS` : C++语言编译器参数
		4. `CPPFLAGS` : C预处理器参数

### 跟我一起写 Makefile（十三）
- 模式规则介绍
	- 模式规则的目标至少包含`%`, 否则为一般规则
	- 目标的`%`定义表示对文件名的匹配, `%`表示长度任意的非空字符串

- 自动化变量
	- 自动化变量即把模式中所定义的一系列文件自动地每个取出, 直到所有的符合模式的文件都取完
	1. `$@`: 表示规则中的目标文件集, 在模式规则中, 如果有多个目标, 则匹配于目标中模式定义的集合
	2. `$%`: 表示仅当目标是库函数文件中, 表示规则中的目标成员名, 例如目标是`foo.a(bar.o)`, `$%`为`bar.o`, `$@`为`foo.a`, 如果目标不是库函数文件则值为空
	3. `$<`: 表示依赖目标中的第一个目标名字, 如果依赖目标是以模式(`%`)定义的, 那么`$<`将是符合模式的一系列的文件集。注意, 其是一个个取出
	4. `$?`: 表示所有比目标新的依赖目标的集合, 以空格分割
	5. `$^`: 表示所有依赖目标的集合, 以空格分割, 会去重依赖目标
	6. `$+`: 表示所有依赖目标的集合但不去重
	7. `$*`: 变量表示目标模式中`%`及其之前的部分, 如目标是`dir/a.foo.b`, 且目标模式是`a.%.b`, 则`$*`值为`dir/a.foo`
	8. `$(@D)`, 表示`$@`的目录部分, 如`$@`的值是`dir/foo.o`, 则`$(@D)`值为`dir`; `$(@F)`则表示文件部分, 即值为`foo.o`
	9. `$(*D)`, `$(*F)`; `$(%D)`, `$(%F)`; `$(<D)`, `$(<F)`; `$(^D)`, `$(^F)`; `$(+D)`, `$(+F)`; `$(?D)`, `$(?F)`与上述同理

### 跟我一起写 Makefile（十四）
- 函数库文件的成员
  - `archive(member)`指定函数库文件, 这不是命令, 而是目标和依赖的定义, 基本为`ar`命令服务

  ```
    foolib(hack.o) : hack.o
              ar cr foolib hack.o
  ```

- 函数库成员的隐含规则
  - 当`make`搜搜目标的隐含规则, 如果目标是`a(m)`形式的, 其会把目标变成`(m)`, 如果成员是`%.o`的模式定义, 且如果我们使用`make foo.a(bar.o)`调用`Makefile`, 隐含规则会去找`bar.o`的规则, 如果没有定义`bar.o`规则, 那么内建隐含规则生效, `make`会去找`bar.c`文件生成`bar.o`, 如果找到, `make`执行命令如下:

  ```
    cc -c bar.c -o bar.o
    ar r foo.a bar.o
    rm -f bar.o
  ```

- 函数库文件的后缀规则
  - 可使用后缀规则和隐含规则生成函数库打包文件

  ```
    .c.a :
      ...
    # 等价于
    (%.o) : %.c
      ...
  ```

### 参考
- [跟我一起写 Makefile（一）](https://blog.csdn.net/haoel/article/details/2886)
- [跟我一起写 Makefile（二）](https://blog.csdn.net/haoel/article/details/2887)
- [跟我一起写 Makefile（三）](https://blog.csdn.net/haoel/article/details/2888)
- [跟我一起写 Makefile（四）](https://blog.csdn.net/haoel/article/details/2889)
- [跟我一起写 Makefile（五）](https://blog.csdn.net/haoel/article/details/2890)
- [跟我一起写 Makefile（六）](https://blog.csdn.net/haoel/article/details/2891)
- [跟我一起写 Makefile（七）](https://blog.csdn.net/haoel/article/details/2892)
- [跟我一起写 Makefile（八）](https://blog.csdn.net/haoel/article/details/2893)
- [跟我一起写 Makefile（九）](https://blog.csdn.net/haoel/article/details/2894)
- [跟我一起写 Makefile（十）](https://blog.csdn.net/haoel/article/details/2895)
- [跟我一起写 Makefile（十一）](https://blog.csdn.net/haoel/article/details/2896)
- [跟我一起写 Makefile（十二）](https://blog.csdn.net/haoel/article/details/2897)
- [跟我一起写 Makefile（十三）](https://blog.csdn.net/haoel/article/details/2898)
- [跟我一起写 Makefile（十四）](https://blog.csdn.net/haoel/article/details/2899)
- [makefile介绍](https://seisman.github.io/how-to-write-makefile/introduction.html#)
