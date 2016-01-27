---
title: "理解 diff 命令"
layout: post
category: translation
tags: [linux]
excerpt: "Unix 系统管理员来经常需要去知道两个文件之间有什么差异. diff 命令就是干这个的. 我现在就准备讲讲 diff. 它是一个经常被用到却不是很被了解的命令. 我希望 Unix 使用者在读完这篇文章之后能够正确了解这个命令的用途并从中获益."
---
_原文在 2009/04/17 发表于 <http://unix.worldiswelcome.com/understanding-the-diff-command-in-unix>_

Unix 系统管理员来经常需要去知道两个文件之间有什么差异. `diff` 命令就是干这个的. 我现在就准备讲讲 `diff`. 它是一个经常被用到却不是很被了解的命令. 我希望 Unix 使用者在读完这篇文章之后能够正确了解这个命令的用途并从中获益. 另外一个有用的命令是: [`comm`][comm] 命令. 我们开始吧...

示例文件分别是 _first_ 文件和 _second_ 文件. 如下:

```
wiw_labs:$ nl first
1 computer
2 modem
3 monitor
4 phone
5 switch

wiw_labs:$ nl second
1 cable
2 mobile
3 screen
4 modem
5 phone
6 server
```

`diff` 命令用来比较这两个文件之间的差异

#diff 命令的用法

我命先从 `diff` 的用法说起. `diff` 通常这样使用:

    diff first_file second_file

这条命令意即: first_file 和 second_file 有什么不同

#diff 命令如何工作

`diff` 命令的运作原理就是, 想法设法的让 _first_ 文件和 _second_ 文件一样. 它希望通过更改(c), 删除(d) _first_ 文件中的行以使其和 _second_ 文件一模一样. 如果需要, 它还会把 _second_ 文件中的行附加到 _first_ 文件中. 如果你明白我说的什么, 很好, 如果不明白也随便. 当我使用示例给你解释的时候你就会明白的.

`diff` 就是通过下面的这些步骤来生成这两个文件的差异报告的:

1. 它从 _first_ 文件和 _second_ 文件的第 1 行开始. 如果它们不一样, `diff` 便顺着 _first_ 文件往下找, 直到找到和 _second_ 文件中相似的条目.

2. 如果在 _first_ 文件中没有找到和 _second_ 文件第 1 行相同的行, 它就再从 _second_ 文件的第 2 行开始. 它会在 _first_ 文件中开始找. 然后提议做什么(附加, 更改或删除)

#示例
理论讲得够多了. 我们来点实际例子好解释的更通透一点.
我把这两个文件并排来放, 好理解起来更容易一些. 另外行号也一并显示了出来.

```
wiw_labs:$ paste first second|nl
1 computer cable
2 modem mobile
3 monitor screen
4 phone modem
5 switch phone
6           server

wiw_labs:$ diff first second
1c1,3
< computer
—
> cable
> mobile
> screen
3d4
< monitor
5c6
< switch
—
> server
```

现在, 看一下上面 `paste` 命令带行号的输出. 注意下面几点:

- _first_ 文件的第 2 行(modem) 和 _second_ 文件的第 4 行(modem) 一致. 所以, 如果我们把 _first_ 文件中的第 1 行换成 _second_ 文件中的 1 到 3 行, 这两个文件的第一部分便都一样了. 输出看起来就会是这样的:

```
wiw_labs:$ paste first second|nl
1 cable cable
2 mobile mobile
3 screen screen
4 modem modem
5 monitor phone
6 phone server
7 switch
```

- _first_ 文件的第 4 行(phone) 和 _second_ 文件的第 5 行一致. 这意味着如果我们删除 _first_ 文件中的第 3 行(也就是目前的第 4 行), 这两个文件的第二部分便都一样了.

```
wiw_labs:$ paste first second|nl
1 cable cable
2 mobile mobile
3 screen screen
4 modem modem
5 phone phone
6 switch server
```

- _first_ 文件的第 5 行(switch)可用 _second_ 文件的第 6 行(server)替换. 至此, 这两个文件完全一样了.

```
wiw_labs:$ paste first second|nl
1 cable cable
2 mobile mobile
3 screen screen
4 modem modem
5 phone phone
6 server server
```

现在, `diff` 命令的输出更容易理解了:

>**1c1,3**: 更改 _first_ 文件的第一行为 _second_ 文件的 1 到 3 行
>
>**3d4**: 从 _first_ 文件中删除第 3 行(modem).
>
>**5c6**: 更改 _first_ 文件中的第 5 行(switch) 为 _second_ 文件中的第 6 行(server)


现在, 反过来再看一下:

```
wiw_labs:$ paste second first | nl
1 cable computer
2 mobile modem
3 screen monitor
4 modem phone
5 phone switch
6 server

wiw_labs:$ diff second first
1,3c1
< cable
< mobile
< screen
—
> computer
4a3
> monitor
6c5
< server
—
> switch
```

- 我们看到 _first_ 文件的第 4 行(modem) 和 _second_ 文件的第 2 行一致. 所以如果我们把 _first_ 文件的 1 到 3 行替换为 _second_ 文件的第 1 行, 我们得到如下输出:

```
wiw_labs:$ paste second first | nl
1 computer computer
2 modem modem
3 phone monitor
4 server phone
5 switch
```

- 现在, _second_ 文件的第 3 行(monitor) 在 _first_ 文件中并不存在. 所以, 把它附加到 _first_ 文件的第 4 行(modem)后面. 要记住 `diff` 命令的输出中的行号永远指的是原始的行号. 现在, 输出看起来是这样的:

```
wiw_labs:$ paste second first | nl
1 computer computer
2 modem modem
3 monitor monitor
4 phone phone
5 server switch
```

- _first_ 文件的第 6 行(server)需要改成 _second_ 文件的第 5 行(switch). 更改之后, 两个文件便都一样了:

```
1 computer computer
2 modem modem
3 monitor monitor
4 phone phone
5 switch switch
```

现在, 更容易理解 `diff` 命令的输出了:

>**1,3c1**: 把 _first_ 文件的第 1 到 3 行改为 _second_ 文件的第 1 行.
>
>**4a3**: 在 _first_ 文件的第 4 行(modem)后面附加上 _second_ 文件的第 3 行(monitor).
>
>**6c5**: 把 _first_ 文件的第 6 行(server)改为 _second_ 文件的第 5 行(switch).

[comm]: http://unix.worldiswelcome.com/how-to-find-common-lines-between-two-text-files-in-unix