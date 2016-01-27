---
title: "HTTP 头和 PHP header() 函数"
layout: post
category: translation
tags: [php, http]
excerpt: "许多初级到中级的的 PHP 程序员把 header() 函数当作某种神秘巫术. 他们可以照着代码示例把功能实现, 但是还是不知道到底它是如果运作的. 我最开始就是这样的.


实际上它非常简单. 在这篇文章中, 我会解释 HTTP 头(header) 是如何运作的, 它们与 PHP 的关系, 以及它们的 meta 标签 equivalents(对应物)"
---
_原文链接: <http://www.nicholassolutions.com/tutorials/php/headers.html>_

_版权: 本文受 Creative Commons License 版权保护, 你可以在 Creative Commons Attribution NonCommercial NoDerives 2.5 License 下分发该文_


#引言

许多初级到中级的的 PHP 程序员把 [header()][header reference] 函数当作某种神秘巫术. 他们可以照着代码示例把功能实现, 但是还是不知道到底它是如果运作的. 我最开始就是这样的.

实际上它非常简单. 在这篇文章中, 我会解释 HTTP 头(header) 是如何运作的, 它们与 PHP 的关系, 以及它们的 meta 标签 equivalents(对应物)

希望你读完之后, 能更顺手的使用 header() 函数, 甚至想出一些更多利用它的地方. 我们也会讲到其他一些关于 HTTP 和 PHP 的重要话题. 但是在我们开始讲任何程序相关的东西之前, 我们需要先快速(并且不完整的)过一遍 HTTP (HyperTex Transfer Protocol) 运作原理

#HTTP 概览

##Headers: 对话中的词语

[HTTP][http] 是 web 服务器和客户端浏览器之间的数据传输(比如 web 页面中的 HTML, 图片, 文件)协议('规则'集合), 并且通常使用 80 [端口][port]. 这就是网站 URL 前面 '`http://`' 的来源

很多人最开始制作 web 页面的时候, 他们先在本地电脑上写 HTML, 在本地浏览器查看是否符合预期, 然后上传到服务器, 就可以在网上浏览这些页面了. 看起来好像在无论在本地查看与在服务器上查看的页面都一样, 传输的数据只有这些 HTML 以及它包含的图片. 但是实际上还有另外一些许多你没看到的信息 - 头信息.

头信息可以分为两大类: 你浏览器向服务器请求文件时发出的请求头信息, 服务器提供文件给浏览器时发出的响应头信息. 把这些头信息当作浏览器和服务器对话时的词语. 我喜欢把服务器想象为图书管理员, 把浏览器想象成正在请求图书资源的学者. 浏览器走向位于服务台 (80 端口) 的服务器, 说道, "Hi, 我是 Mozilla, 我正在找这个编目号是 'www.expertsrt.com' 的资源. 你可以帮我找到它吗?" 服务器听到后回应 "是的, 我找到了, 让我把它给你. 这里面是 HTML 文本, 它写的是 '`<html>...`'" 浏览器开始从头到尾的读它, 并且遇到了一个图片标签, 所以向服务器要位于 src 属性指定处的图片. 服务器进行查找, 找到这个文件然后说道 "这是个 PNG 图片, 它的数据是..." 你懂的.

<p id="secondConv">另一个对话可能像这样:</p>

>浏览器: Hi, 我是 Mozilla, 能给我在 'www.expertsrt.com/moved.html' 这里的文件吗?.

>服务器: 那个文件已经不在那儿了, 他现在在 'www.expertsrt.com/newloc.html'.

>浏览器: Hi, 我是 Mozilla, 能给我在 'www.expertsrt.com/newloc.html' 这里的文件吗?

>服务器: 我找到这个文件了. 查看它 10 秒钟然后再向我问一次. 它是一个 HTML 文本文件, 它有这些内容...

...10 秒钟...

>浏览器: Hi, 我是 Mozilla, 能给我在 'www.expertsrt.com/newloc.html' 这里的文件吗?

>服务器: 我找到这个文件了. 查看它 10 秒钟然后再向我问一次. 它是一个 HTML 文本文件, 它有这些内容...

...10 秒钟...

>浏览器: Hi, 我是 Mozilla, 能给我在 'www.expertsrt.com/newloc.html' 这里的文件吗?

>服务器: 我找到这个文件了. 查看它 10 秒钟然后再向我问一次. 它一个 HTML 文本文件, 它有这些内容...

...诸如这般, 直到浏览器被用户重新定向...

正如你所看到的, 使用头信息可以控制许多事情. 使用 header() 函数, 你可以让服务器发送你所需的头信息, 这样你可以做除了发送 HTML 之外许多很酷的事情.

##看看整个对话过程

在继续之前, 让我们先不使用浏览器来查看一个 web 页面, 这样我们可以看到整个对话, 更好的了解 HTTP 头的工作. 先打开命令行 (在 windows 中, 点击开始菜单->运行, 输入 `cmd`, 然后点击 "OK"...如果你正使用 linux, 你或许已经知道怎么打开了). 在命令行中输入:

    telnet expertsrt.com 80

然后回车. 这会链接到 expersrt.com 的 80 端口. 然后, 复制并粘贴下面的文字:

    GET / HTTP/1.1
    Host: expertsrt.com

如果你输入或粘贴这些文字的时候, 命令行除了光标的闪烁没看到任何动静的话, 不要担心 -- 它们确实被发送到服务器了. 第一行说明你使用 GET 请求方法去获取资源 / (这里是目标主机上基目录里的文件), 并且你在使用 HTTP 1.1 版本. 第二行告诉服务器你想要连接到哪台主机. 当你输入 'expertsrt.com' 后, 回车两次 (只需两次). 你应当立刻得到类似下面的响应:

    HTTP/1.1 301 Moved Permanently
    Date: Wed, 08 Feb 2006 07:44:07 GMT
    Server: Apache/2.0.54 (Debian GNU/Linux) mod_auth_pgsql/2.0.2b1 mod_ssl/2.0.54 OpenSSL/0.9.7e
    Location: http://www.expertsrt.com/
    Content-Length: 233
    Content-Type: text/html; charset=iso-8859-1

    <!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">
    <html><head>
    <title>301 Moved Permanently</title>
    </head><body>
    <h1>Moved Permanently</h1>
    <p>The document has moved <a href="http://www.expertsrt.com/">here</a>.</p>
    </body></html>

哎呀! 看起来好像我们请求的文件已经不在那儿了; 它已经被移到新的地方了: `http://www.expertsrt.com`. 如果你使用浏览器, 你只会看到 HTML - 在第一个空白行之前的都是头信息. 实际上, 现代浏览器比这更智能 - 当他们看到第三行的新的 URL 时, 会自动转向那里, 这样你就不用手动再输入这个新的 URL 了. 让我们去这个新的 URL. 这时可能你已经断开连接了. 如果这样, 只需按向上键, telnet 命令会出现, 然后回车以重新连接. 如果你没有断开连接, 那直接输入下面的文字就行:

    GET / HTTP/1.1
    Host: www.expertsrt.com

然后回车两次. 你会看到另一个类似的响应, 告诉你那个页面实际上在 `http://www.expertsrt.com/index.php`. 服务器真挑剔是不是? ;-) 重复上面的操作, 不过这次输入

    GET /index.php HTTP/1.1
    Host: www.expertsrt.com

注意我们想要的文件名在第一行. 这一次我们屏幕被文字刷满了: 这就是来自 ERT 主页的 HTML. 这里的头信息看起来是这样的

    HTTP/1.1 200 OK
    Date: Wed, 08 Feb 2006 08:20:07 GMT
    Server: Apache/2.0.54 (Debian GNU/Linux) mod_auth_pgsql/2.0.2b1 mod_ssl/2.0.54 OpenSSL/0.9.7e
    X-Powered-By: PHP/4.4.0
    Transfer-Encoding: chunked
    Content-Type: text/html

很简单是不是? 我们来继续探讨这跟你编程有什么关系. 如果你不明白我们讲到的所有事情也没有关系. 重要的是对浏览器和服务器如何交互的有个大致印象, 以及意识到并没有什么魔法在里面. 最终就是这些

1. 浏览器和服务器通过使用头信息来进行交互
2. 头信息在主要内容之前发送, 并且用两个 [CRLF][crlf]/换行符 来和主要内容分割开
3. 在头信息部分, 每一行就是一个头. 首先是头的名字, 然后是一个冒号一个空格, 然后是这个头的名/值

    头名: 头值

4. 头信息可以包括许多类型的信息和指示, 以便浏览器和服务器用来告知对方接下来该做什么

**提示**: 如果你是那种刨根问底的人, 你可以看看 [RFC 2616][rfc2616], 那是 HTTP/1.1 的完整规范. 尤其是 [14 章][section14], 包含每一个头的完整定义

#PHP header(): 基础

注意在我们最终得到的主页中的 X-Powered-By: PHP/4.4.0 和 Content-Type: text/html 这两个头信息. PHP 一开始就被设计成输出 HTML ( PHP 中的 H 即代表 'Hypertext'), 并且在 PHP 脚本第一次生成输出(比如, 使用 echo)时, 会自动为你包含这些头信息. 这非常方便, 但也造成许多 PHP 新手对头信息的困惑 - 在像 Perl 这样不是一开始就被设计成用于 web 开发的语言中, 不包含你自己的头而直接发送输出会产生 '500 Internal Server Error' 错误, 所以 Perl 的 web 开发者不得不立即学习关于头信息的知识

[`header()`][header reference] 函数发送 HTTP 响应头信息, 而且只做这件事

使用这个函数, 你可以让你的脚本发送你选择的头信息给浏览器, 创造一个非常有用的动态结果. 但是, 你需要知道关于 `header()` 函数的第一件事就是你必须在 PHP 发送任何输出(这会使 PHP 自动发送默认的头信息)**之前**使用它

我怀疑有哪个 PHP 程序员没有见到过如下的错误消息

    Warning: Cannot modify header information - headers already sent by.....

如我们所说的, 响应头信息用一个空白行和主要内容分割. 这意味你仅可以发送头信息一次, 如果你的脚本有任何输出 (即使一个在 `<?php` 标签之前的空白行或空格), PHP 就会自动发送头信息. 例如, 看一下下面这个脚本, 看起来逻辑上很正常:

```php
Welcome to my website!<br />
<?php
  if($test){
   echo "You're in!";
  }
  else{
    header('Location: http://www.mysite.com/someotherpage.php');
  }
?>
```

这个脚本判断 `$test` 是否为 true, 如果不是则使用 `Location` 头重定向访问者. 看到问题所在了吗? 'Welcome...' 文字始终会发送出去, 所以默认的头信息会自动被发送. 在调用 `header()` 时已经太晚了: 用户只看到一条错误消息 (如果你把错误报告关掉了, 则只会看到 'Welcome...' 文字), 而不是被重定向

基本上有两种解决方法. 第一个就是重写代码

```php
<?php
  if($test){
   echo 'Welcome to my website<br />You're in!';
  }
  else{
    header('Location: http://www.mysite.com/someotherpage.php');
  }
?>
```

第二个就是使用[输出缓冲][outputBuffering], 这个解决方法更为优雅易用. 在我们上面的例子中, 重写代码并不困难, 但是试想一下如果有很多 HTML 需要移动位置 - 这样做就会很麻烦, 也会让我们的代码更难追踪. 虽然我们第一个示例导致了错误, 但是逻辑上是没错的. 输出缓冲可以让你一直保留('缓冲')输出(即使是 PHP 代码之外的 HTML)直到你明确指示了把输出发送给浏览器. 这样你就可以随意编写你的代码, 知道你指定了你需要指定的头信息, 然后明确指示发送这些输出. 两个相关的函数是 [`ob_start()`][ob_start] 和 [`ob_flush()`][ob_flush], `ob_start() `用于打开输出缓冲, `ob_flush()` 会发送缓冲了的输出:

```php
<?php
 ob_start();  //开始输出缓冲
?>
Welcome to my website!
<?php
  if(true){
   echo "You're in!";
  }
  else{
    header('Location: http://www.mysite.com/someotherpage.php');
  }

  ob_flush(); //输出缓冲中的数据
?>
```

我鼓励你读一下所有关于输出缓冲的函数, 非常有用. 你应当尽早的把输出缓冲发送出去, 尤其当你有许多东西想要发送的时候. 否则你的页面会看起来加载的很慢, 因为所有的内容只有被组装完毕后才发送, 而不是当可用的时候立即就被发送出去.

**提示: 第二个参数** 如果你调用 header() 不止一次发送同一个头, 这个头的值将会是_最后_调用的 header() 中设置的值. 如,

```php
<?php
header('Some-Header: Value-1');
header('Some-Header: Value-2');
?>
```

会产生 `Some-Header: Value-2` 这个结果. 你可以通过设置第二个参数来发送同一个头两次. 这个参数默认是 true. 如果你设置其为 false, 那么第二个头值不会替换第一个, 而是两个都被发送. 所以下面的代码

```php
<?php
header('Some-Header: Value-1');
header('Some-Header: Value-2', false); //不要替换第一个
?>
```

将会产生 `Some-Header: Value-1, Value-2` 这个结果. 你很少会用到这个, 但是知道它也不错.

知道了 HTTP header 和 PHP 如何配合之后, 让我们来看一些更为具体的例子.

#PHP header(): 一些例子

**提示**: 下面这个代码片断都是截取自完整的工作代码. 当你在自己的程序中包含他们的时候, 记得定义所有你自己的变量, 赋给他们默认值, 以及遵循其他最佳实践.

##使用 `Location` 头重定向

我们已经在上面看到过几次了: 它会重定向浏览器.

```php
<?php
header('Location: http/www.mysite.com/new_location.html');
?>
```

虽然你给它一个相对 URL 没准也能工作, 但是根据 HTTP 规范, 你真的应该使用一个绝对 URL.

一个容易犯的错误就是在使用了 Location header 之后不立即使用 [`exit`][exit] 以结束执行 (你可能不是总是想要结束执行, 但是大部分时间是的). 之所以这是一个错误是因为 PHP 代码会继续执行, 即使用户已经被重定向到新的 URL. 在最好的情况下, 这会不必要的使用系统资源. 在最坏的情况下, 你可能会执行一些让自己后悔的操作. 看一下下面的代码:

```php
<?php
//重定向访问级别低于 4 的用户
if (check_access_level($username) < 4){
  header('Location: http://www.mysite.com/someotherpage.php');
}

//向高于访问级别 4 的用户发送秘密邮件
mail_secret_code($username);
echo 'The secret email is on its way!';
?>
```

未授权用户的确被重定向了, 但是因为代码会继续执行, 他们同样会收到邮件. 为了避免这种情况, 针对已授权用户的代码可以写到 `else{}` 声明中, 但是直接在 `header()` 后面使用 `exit` 来结束代码执行会更为干净容易一些.

```php
<?php
//重定向访问级别低于 4 的用户
if (check_access_level($username) < 4){
  header('Location: http://www.mysite.com/someotherpage.php');
  exit; //停止代码执行
}

//向高于访问级别 4 的用户发送秘密邮件
mail_secret_code($username);
echo 'The secret email is on its way!';
?>
```

##使用 `Refresh` 头重定向

`Refresh` 和 `Location` 一样可以重定向用户, 但是你可以延迟重定向. 例如, 下面的代码会在显示当前页面 10 秒钟后重定向用户到新的页面:

```php
<?php
header('Refresh: 10; url=http://www.mysite.com/otherpage.php');
echo 'You will be redirected in 10 seconds';
?>
```

另一个常见的用途就是通过重复的'重定向'一个页面到它自身来强制更新页面 (参见[上面][secondConv]的第二个 '对话'). 例如, 这里是一个简单的例子, 页面会从 10 开始向下数, 每个数字之间有 3 秒间隔:

```php
<?php
if(!isset($_GET['n'])){
    $_GET['n'] = 10;
}

if($_GET['n'] > 0){
  header('Refresh: 3; url=' . $_SERVER['PHP_SELF'].'?n=' . ($_GET['n']-1)  );
  echo $_GET['n'];
}
else{
  echo 'BLAST OFF!';
}
?>
```

**提示**: 如果刷新时间设置成 0, 则 `Refresh` 头实际上和 `Location` 头完全一样

##使用 `Content-Type` 头来提供不同类型的文件以及生成动态内容

服务器用 `Content-Type` 头告诉浏览器自己将要发送什么类型的数据. 使用这个头信息, 你可以让 PHP 脚本输出任何类型的文件, 从纯文本文件到图片文件到 zip 文件等等. 下面的表格列举了最常用的一个 [MIME 类型][mimeType]:

**常用 MIME 类型:**

|类型    |描述|
|--------|----|
|text/html|   HTML (PHP 默认)|
|text/plain|  纯文本|
|image/gif| GIF 图片|
|image/jpeg|  JPEG 图片|
|image/png|   PNG 图片|
|video/mpeg|  MPEG 视频|
|audio/wav|   WAV 音频|
|audio/mpeg|  MP3 音频|
|video/mov| mov 视频|
|video/quicktime| Quicktime 视频|
|video/x-ms-wmv|  Windows WMV 视频|
|audio/x-ms-wma|  Windows WMA 音频|
|audio/x-realaudio|   RealPlayer 音频/视频 (.rm)|
|audio/x-pn-realaudio|    RealPlayer 音频/视频 (.ram)|
|video/x-msvideo| ms 视频|
|video/avi|   AVI 视频|
|application/pdf| PDF 文档|
|application/msword|  MS Word .doc 文件|
|application/zip| Zip 文件|
|application/octet-stream|    其他. 数据. 用于强制下载或使用应用打开.*|
|x-foo/x-bar| 其他. 数据. 用于强制下载或使用应用打开.*|

你可以用此来做一些有趣的事情. 比如, 你可能想要向用户发用一个预先格式化过的文本文件, 而不是 HTML:

```php
<?php
header('Content-Type: text/plain');
echo $plain_text_content;
?>
```

另或者你想要提示用户下载文件, 而不是在浏览器中查看它. 使用 `Content-Disposition` 头, 这很容易, 你甚至可以推荐一个文件名给用户:

```php
<?php
header('Content-Type: application/octet-stream');
header('Content-Disposition: attachment; '
       .'filename="plain_text_file.txt"');
echo $plain_text_content;
?>
```

另或者你需要提供文件文件, 但是又希望隐藏文件的真实路径和名字, 并且只让已登录的用户下载:

```php
<?php
if($b_is_logged_in){
   header('Content-Type: application/octet-stream');
   header('Content-Disposition: attachment; '
           .'filename="'.$different_filename.'"');
   readfile('/path/to/files/' . $filename);
}
else{
   echo 'You are not authorized to view this file';
}
?>
```

又或者你已经使用 PHP 的[图片函数][imageFunction]动态生成了一个图片, 想要展示给用户. 你可以创建一个 `build_image.php` 文件, 像这样

```php
<?php
   //生成图片, 然后
   header('Content-Type: image/jpeg');
   imagejpeg($image_resouce);
?>
```

**提示**: 当心 [`magic_quotes`][magicQuotes]! PHP 会自动使用反斜杠转移特殊字符, 这一开始看起来是个好主意, 但是大多数好的程序员认为 (a) 这会鼓励不去验证输入的粗心代码, 并且 (b) 在良好的代码中会产生本不该有 (如果 `magic_quote` 关闭) 的麻烦. 其中一个麻烦就是二进制数据被破坏. 在上面这个例子中, 如果 [`magic_quotes_runtime`][magicQuotesRuntime]被启用, 则 `readfile()` 输出的数据可能被添加反斜杠, 导致发送给用户的文件被破坏. 完美情况下, 你应该在 `php.ini` 文件中关闭 `magic_quotes_runtime` 选项, 但是如果你没有权限访问这个配置文件, 你可以使用 [`set_magic_quotes_runtime()`][setMagicQuotesRuntime] 函数 (给它传个数字 0) 关闭它.

令人高兴的是, 最近的一次 PHP [开发者会议][meeting]显示, 在未来版本(6+) 的 PHP 中 `magic quotes` 会被弃用. 但是在所有人升级到这个版本的 PHP 之前, 记住这个导致的问题会节省你很多麻烦和疑问.

你可以在 URL 中传递生成图片所需的参数, 然后使用 $_GET 获取它们. 然后在另一个页面, 你可以使用 img 标签来包含这个图片:

```php
<img src="build_image.php<?php echo "?$user_id&amp;$caption"; ?>">
```

可用的地方几乎讲不完. 你 PHP 变成越多, 越会发现 `Content-Type` 头真的是你的好朋友

**提示**: 浏览器处理各式 `MIME类型` 的_预期_方式以及_实际_方式可能并不一致 (尤其是 Internet Explorer), 所以你最好是在你需要支持的浏览器中测试一下. PHP 参考中的[用户评论][userComment]有许多关于此的技巧.

##防止页面缓存

PHP 页面通常会生成非常动态的内容, 为了防止用户因为页面缓存而错过了更新过的页面, 告诉浏览器不要缓存特定的页面通常非常有用. 下面的代码在可能会访问你网站的浏览器中工作的很好:

```php
<?php
header('Cache-Control: no-cache, no-store, must-revalidate'); //HTTP/1.1
header('Expires: Sun, 01 Jul 2005 00:00:00 GMT');
header('Pragma: no-cache'); //HTTP/1.0
?>
```

`Expires` 头可以是任何已经过去的日期. 对于 `MIME 类型`, 浏览器 (尤其是较老的) 可能不会总是正确的理解你的缓存指示 (虽然大部分现代浏览器会).

##其他应用

还有另外一个可以使用头信息的地方, 比如设置 [HTTP 响应码][httpResponseCode], 或者执行 [HTTP 认证][httpAuth] (如果你作为 `Apache` 模块来使用 PHP 的话). 现在, 你了解了 header() 如何工作及怎么使用它, 你可以用它做你之前想都没想到的许多事情了.

#PHP 中的请求头信息

我们讲了怎么使用响应头信息了. 我们还可以从浏览器发给服务器的请求头信息中获取很多信息. 有两种方法来获取. 第一, 许多 [`$_SERVER`数组][server]中的值都是由传来的请求头信息决定的. 第二, 如果 PHP 是作为 `Apache` 模块使用的, [`apache_request_headers()`][apacheRequestHeader] 会返回一个包含所有请求头信息的数组 (甚至那些不在 `$_SERVER` 中的).

##安全第一: 不要信任请求头信息

因为请求头信息发自浏览器, 浏览器又可以在客户端被控制, 所以你**永远不要信任来自请求头, 又和你站点安全紧密相关的头信息**. 一个很好的例子就是 `$_SERVER['HTTP_REFERER']`变量, 这个变量应该包含一个用户转自的源 URL. 一个新手的常见错误就是认为他们可以使用这个来确保用户只会通过特定路径来访问页面, 因此他们便无需关心服务器端的数据验证. 例如, 看看下面的代码, 它试着去确保数据是从一个特定的页面发送过来的, 而不是从另一个站点

```php
<?php
 if($_SERVER['HTTP_REFERER'] != 'http://www.mysite.com/myform.html'){
   header('Refresh: 5; url=http://www.mysite.com/myform.html');
   echo 'You must use the form on my site...redirecting now.';
 }
 else{
   insert_data($_POST['var1'], $_POST['var2']);
 }
?>
```

这或许会阻止那些不是很精通的黑客通过他的浏览器提交一个自定义的表单来提交数据, 但是任何一个稍微高深一些的黑客都可以通过使用 `telnet` 来提交数据, 包括请求头信息

    Referer: http://www.mysite.com/myform.html

然后轻易的躲过这层保护机制. 这里所要讲的重点是: 使用 HTTP 请求头信息来统计一些数据以便提供更好的用户体验 - 大部分的请求头信息都是发自真实的浏览器而且可以被信任...但是**不要**在有关安全的问题上依赖任何请求 header

##使用 HTTP 请求头信息

你可以用它做几件事. 使用 `$_SERVER['HTTP_USER_AGENT']`你可以探测用户生成他使用的什么浏览器. 你可以检查 `$_SERVER['HTTP_ACCEPT_LANGUAGE']` (可能要配合 `$_SERVER['HTTP_ACCEPT_CHARSET']` 和一些 [IP 地理位置][ipGeolocation] ) 来决定向用户展示什么语言. 虽然 `$_SERVER['HTTP_REFERER']` 对于安全目的并不能被依赖, 但是可以用来统计你网站的流量, 或者根据用户的访问路径来定制显示内容. 如果因为某些原因你想要操作原始的请求字符串, 你可以使用 `$_SERVER['QUERY_STRING']`. 查看 `$_SERVER['REQUEST_METHOD']` 可以知道你的页面是通过 `GET` 还是 `POST` 方法访问的. 还有很多可以帮助你做许多有创意的事情的信息等着你去发现.

#HTML `meta` 标签中的 HTTP 头信息 equivalents(对应物)

很有可能在阅读本文之前, 你已经用过下面的 HTML meta 标签重定向用户了:

```html
<meta http-equiv="refresh" content="0;http://www.mysite.com/somepage.html" />
```

看起来很熟悉? 'http-equiv' `meta` 标签即 HTTP 响应头的'对应物', 引入它们是为了让没有服务器端编程能力的人在写 HTML 页面的时候也能使用强大的头信息功能. 使用这些 meta 标签很简单: 它们可以被放在文档 `<head>` 中的任何地方, `http-equiv` 属性包含头名, `content` 属性包含头值.

我发现这些 meta 标签最开始也会和 HTTP 头一样让人困惑, 但是现在它们在你看来应该很简单了. 虽然我更喜欢使用 PHP 的 `header()` 函数, 但是 `meta` 标签的 HTTP equivalents 对于像指定字符集这样的事情会更顺手一些. 比如, 我经常在 HTML 页面中使用 (有时候 PHP 页面中也会用到):

```html
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
```

**提示**: 使用 `meta` 标签来指定头信息并不被一致的支持, 所以通常来讲使用头信息本身会更加安全和快速. 另外很明显, 还有一些头的名值对并不能用 `meta equivalents` 来指定: 在真正的头信息被发送, 浏览器已经把文档读取为 HTML 之后, 你是不能再去设置 `Content-Type` 成 `image/png` 的 ;-)

#结语

现在我们讲完了, 你应该对 HTTP 的工作原理以及如何使用响应请求头信息以及如何把它们应用到自己的代码中有了很好的认识. 这些知识也会让你在 web 应用的效率和安全方面有更审慎的思考. 我希望在你继续编程的时候, 会发现你使用 HTTP 头信息更加顺手了, 也能通过使用它们让你的工作更加轻松, 你的页面更好了.

还有额外一点, 记住头信息就像是词语: 它们交流信息并请求某些操作被执行, 但是本身并不强制任何事情. 99.9% 的情况下, 浏览器和服务器和谐合作, 事情发展很顺利. 但记住在现实中, 是不是你会遇到一些混蛋 (黑客), 或者一些只想按照自己意愿做事的东西 (Internet Explorer). web 开发从很多角度讲是一个客服性质的工作, 所以你应该尽全力避免这些东西, 满足客户的 '特殊需要' :-)

---

[header reference]: http://www.php.net/manual/function.header.php
[http]: http://en.wikipedia.org/wiki/HyperText_Transfer_Protocol
[port]: http://en.wikipedia.org/wiki/Port_%28computing%29#Network_port
[crlf]: http://www.google.com/search?q=define%3ACRLF
[rfc2616]: http://www.w3.org/Protocols/rfc2616/rfc2616.html
[section14]: http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14
[outputBuffering]: http://www.php.net/outcontrol
[ob_start]: http://www.php.net/manual/function.ob-start.php
[ob_flush]: http://www.php.net/manual/function.ob-flush.php
[exit]: http://www.php.net/manual/function.exit.php
[secondConv]: #secondConv
[mimeType]: http://en.wikipedia.org/wiki/Mime_type
[imageFunction]: http://www.php.net/manual/ref.image.php
[magicQuotes]: http://www.php.net/magic_quotes
[magicQuotesRuntime]: http://www.php.net/manual/en/ref.info.php#ini.magic-quotes-runtime
[setMagicQuotesRuntime]: http://www.php.net/manual/en/function.set-magic-quotes-runtime.php
[meeting]: http://www.php.net/~derick/meeting-notes.html#magic-quotes
[userComment]: http://www.php.net/manual/function.header.php#usernotes
[httpResponseCode]: http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html
[httpAuth]: http://www.php.net/manual/features.http-auth.php
[$server]: http://www.php.net/reserved.variables
[apacheRequestHeader]: http://www.php.net/manual/function.apache-request-headers.php
[ipGeolocation]: http://www.expertsrt.com/articles/Rod/city_country_IP.php