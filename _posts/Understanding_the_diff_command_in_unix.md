It’s not an uncommon requirement for Unix system administrators to know the difference between two files. The diff command in Unix serves the purpose. Here I am going to discuss the diff command. It’s quite common but little understood command. I hope after reading this article, the Unix visitors will be able to understand the usage properly and benefit from it. The other usefule command is: comm command. Here you go…
Unix 系统管理员来经常需要去知道两个文件之间有什么差异. diff 命令就是干这个的. 我现在就准备讲讲 diff. 它是一个经常被用到却不是很被了解的命令. 我希望 Unix 使用者在读完这篇文章之后能够正确了解这个命令的用途并从中获益. 另外一个有用的命令是: comm 命令. 我们开始吧...

The example files are first and second. The example files are listed below:
示例文件分别是 first 文件和 second 文件. 如下:

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

The diff command is used to differentiate between the files.
diff 命令用来比较这两个文件之间的差异

How diff Command Works
diff 命令是如何工作的
Let’s start by describing the usage of diff command. The diff command general usage is:
我命先从 diff 的用法说起. diff 通常这样使用:
diff first_file second_file

So, you can read the command as:
你可以这样理解:
How first_file is different from second_file.
first_file 和 second_file 有什么不同

Philosophy of diff Command
diff 命令的哲学
The diff command works on the philosophy of changing the first file in any way to make it appear like second file. It wants the lines of the first file to be changed(c), deleted(d) to make it ditto as second file. If need be, it instructs to append the lines from second file to the first file. If you got what I said is okay, otherwise leave it, You’ll understand when I explain it with example.
diff 命令的运作原理就是, 想法设法的让 first 文件和 second 文件一样. 它希望通过更改(c), 删除(d) first 文件中的行以使其和 second 文件一模一样. 如果需要, 它还会把 second 文件中的行附加到 first 文件中. 如果你明白我说的什么, 很好, 如果不明白也随便. 当我使用实例给你解释的时候你就会明白的.

Here are the steps which diff command follows to produce the difference between the files:
diff 就是通过下面的这些步骤来生成这两个文件的差异报告的:

1. It starts with the first line of the first file and second file. If these match then it’s okay otherwise it keeps on traveling down the first file till it finds the similar entry in second file.
它从 first 文件和 second 文件的第 1 行开始. 如果它们不一样, diff 便顺着 first 文件往下找, 直到找到和 second 文件中相似的条目.
2. If first line of second file is not found in the first file, it’ll start with the second line of the second file. It’ll start it’s search in the first file. Then it’ll suggest what to do(append, change or delete).
如果在 first 文件中没有找到和 second 文件第 1 行相同的行, 它就再从 second 文件的第 2 行开始. 它会在 first 文件中开始找. 然后提议做什么(附加, 更改或删除)

Enough about theory. Let’s come to practical example to make it clear.
理论讲得够多了. 我们来点实际例子好解释的更通透一点.
I have pasted the files side by side to make it easy to understand. Besides line numbers are also printed.
我把这两个文件并排来放, 好理解起来更容易一些. 另外行号也一并显示了出来.

wiw_labs:$ paste first second|nl
1 computer cable
2 modem mobile
3 monitor screen
4 phone modem
5 switch phone
6        server

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

Now, take a look at numbered output of paste command above. The things to be noted are:
现在, 看一下上面 paste 命令带行号的输出. 注意下面几点:

The second line(modem) of first file matches with the fourth line(modem) of second file. So, if we replace the first line of first file with first three lines of second file then first part of both file becomes same. The output will resemble as below:
first 文件的第 2 行(modem) 和 second 文件的第 4 行(modem) 一致. 所以, 如果我们把 first 文件中的第 1 行换成 second 文件中的 1 到 3 行, 这两个文件的第一部分便都一样了. 输出看起来就会是这样的:
wiw_labs:$ paste first second|nl
1 cable cable
2 mobile mobile
3 screen screen
4 modem modem
5 monitor phone
6 phone server
7 switch

The fourth line(phone) of first file matches with fifth line(phone) of the second file. That means if we delete the third line of first file(which is the fourth line at present), the second part of files will match.
first 文件的第 4 行(phone) 和 second 文件的第 5 行一致. 这意味着如果我们删除 first 文件中的第 3 行(也就是目前的第 4 行), 这两个文件的第二部分便都一样了.
wiw_labs:$ paste first second|nl
1 cable cable
2 mobile mobile
3 screen screen
4 modem modem
5 phone phone
6 switch server

The fifth line(switch) of first file can be replace with 6th line(server) of second file. So, both of the files match fully.
frist 文件的第 5 行(switch)可用 second 文件的第 6 行(server)替换. 至此, 这两个文件完全一样了.



wiw_labs:$ paste first second|nl
1 cable cable
2 mobile mobile
3 screen screen
4 modem modem
5 phone phone
6 server server

Now, its easier to understand the output of diff command.
现在, diff 命令的输出更容易理解了.
1c1,3: Change the first line of first file with lines 1 to 3 of second file.
1c1,3: 更改 first 文件的第一行为 second 文件的 1 到 3 行
3d4: Delete the line 3(modem) from first file.
3d4: 从 first 文件中删除第 3 行(modem).
5c6: Change the 5th line(switch) of first file with 6th line(server) of second file.
5c6: 更改 first 文件中的第 5 行(switch) 为 second 文件中的第 6 行(server)


Now, take the reverse case:
现在, 反过来再看一下:

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

Now, see the 4th line(modem) of the first file matches with the 2nd line of the second file. So, if we replace the lines 1st through 3rd of first file with the 1st line of second file we get the following output:
我们看到 first 文件的第 4 行(modem) 和 second 文件的第 2 行一致. 所以如果我们把 first 文件的 1 到 3 行替换为 second 文件的第 1 行, 我们得到如下输出:
wiw_labs:$ paste second first | nl
1 computer computer
2 modem modem
3 phone monitor
4 server phone
5 switch

Now, 3rd line (monitor) of second file does not exist in first file. So, append it after 4th line(modem) of first file. Do remember that line numbers specified in output of diff command are always the original line number. So, output will be something like this.
现在, second 文件的第 3 行(monitor) 在 first 文件中并不存在. 所以, 把它附加到 first 文件的第 4 行(modem)后面. 要记住 diff 命令的输出中的行号永远指的是原始的行号. 现在, 输出看起来是这样的:
wiw_labs:$ paste second first | nl
1 computer computer
2 modem modem
3 monitor monitor
4 phone phone
5 server switch

The last line, 6th line(server) of first file now needs to be changed with the last line 5th line of second file(switch). After doing so, we get first file as second file.
first 文件的第 6 行(server)需要改成 second 文件的第 5 行(switch). 更改之后, 两个文件便都一样了.
1 computer computer
2 modem modem
3 monitor monitor
4 phone phone
5 switch switch

Now, its easier to understand the output of diff command.
现在, 更容易理解 diff 命令的输出了:
1,3c1: Change the 1st through 3rd line of first file with lines 1st of second file.
1,3c1: 把 first 文件的第 1 到 3 行改为 second 文件的第 1 行.
4a3: Append the line 3(monitor) from second file after 4th line(modem) of first file.
4a3: 在 first 文件的第 4 行(modem)后面附加上 second 文件的第 3 行(monitor).
6c5: Change the 6th line(server) of first file with 5th line(switch) of second file.
6c5: 把 first 文件的第 6 行(server)改为 second 文件的第 5 行(switch).