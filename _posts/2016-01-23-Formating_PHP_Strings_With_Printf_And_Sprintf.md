---
title: "使用 php printf() 和 sprintf() 格式化字符串"
layout: post
category: translation
tags: [php]
excerpt: "和其他许多编程语言一样, PHP 也有功能强大的 printf() 和 sprintf() 函数, 它们提供了很多格式化字符串的方式. 当你想要某些数据更易读, 或者需要传递数据给其他程式的时候, 这两个函数很有用.
这篇教程就会教你如何使用 printf() 和 sprintf() 来格式化字符串."
---
_原文在 2009/11/19 发表于 <http://www.elated.com/articles/formatting-php-strings-printf-sprintf/>_

和其他许多编程语言一样, PHP 也有功能强大的 [`printf()`][printf] 和 [`sprintf()`][sprintf] 函数, 它们提供了很多格式化字符串的方式. 当你想要某些数据更易读, 或者需要传递数据给其他程式的时候, 这两个函数很有用.

PHP 也有许多专门用途的格式化字符串的函数 - 比如 [`date()`][date] 函数, 适合用于格式化日期字符串. 而 `printf()` 和 `sprintf()` 则适合更为通用的格式化.

这篇教程就会教你如何使用 `printf()` 和 `sprintf()` 来格式化字符串.

#一个简单的 `printf()` 示例

了解 `printf()` 的最简单方式就是通过示例. 下面这个例子打印一个包含了两个数字的字符串:

```php
<?php
// 打印 "Australia comprises 6 states and 10 territories"
printf( "Australia comprises %d states and %d territories", 6, 10 );
?>
```

注意这个字符串在被打印出的时候, 第一个 `%d` 被第二个参数 `6` 替换, 第二个 `%d` 则被第三个参数 `10` 替换. 其工作原理即:

- 第一个参数必须是一个字符串, 我们称之为目标字符串. 目标字符串包含普通的字符, 和一些可选的格式说明符 (比如 `%d`)

- 所有格式说明符都以 `%` 开头. 它按对应的顺序以特定方式格式化目标字符串之后的参数, 然后将其插入到最终的字符串中, 并显示到网页.

__NOTE:__ 如果想要打印 `%` 符, 使用 `%%`.

#类型说明符

上面那个例子使用的 `%d` 这个格式说明符, 会将参数按照有符号十进制数字格式化. 这个 `d` 被称为类型说明符. `printf()` 支持很多类型说明符. 下面是类型说明符的完整列表:

|类型说明符|备注|
|----------|----|
| `b` | 将参数作为二进制数字(如 `10010110`)格式化 |
| `c` | 将参数作为 ASCII 码值格式化为对应的字符 |
| `d` | 将参数作为有符号十进制数字格式化 |
| `e` | 将参数作为科学计数法(如 `1.234e+3`)格式化 |
| `f` | 将参数作为浮点数字, 并且使用地区设定(如在法国, 逗号被用作小数点)格式化 |
| `F` | 和上面相同, 不过不使用地区设定 |
| `o` | 将参数作为八进制数字格式化 |
| `s` | 将参数作为字符串格式化 |
| `u` | 将参数作为无符号十进制数字格式化 |
| `x` | 将参数作为小写十六进制数字(如 `4fdf87`)格式化 |
| `X` | 将参数作为大写十六进制数字(如 `4FDF87`)格式化 |

下面是一些类型说明符的示例:

```php
<?php 
printf( "Here's the number %s as a float (%f), a binary integer (%b), an octal integer (%o), and a hex integer (%x).", 543.21, 543.21, 543.21, 543.21, 543.21 );
?>
```

这段代码会输出:

```
Here's the number 543.21 as a float (543.210000), a binary integer (1000011111), an octal integer (1037), and a hex integer (21f).
```

#符号说明符

默认情况下, `printf()` 只会在负数前加正负符号:

```php
<?php 
printf( "%d", 36 );   // 输出 "36"
printf( "%d", -36 );  // 输出 "-36"
?>
```

如果你也想让 `printf()` 在正数前加符号, 可以在类型说明符前指定一个符号说明符 `+`:

```php
<?php 
printf( "%+d", 36 );   // 输出 "+36"
printf( "%+d", -36 );  // 输出 "-36"
?>
```

#填充

`printf()` 允许你填充目标字符串到指定的长度. 你可以使用任何字符做填充字符, 也可以指定填充左边还是右边. 如果你希望在数字前补 `0` 或让字符串右对齐, 填充就派上用场了.

通过在 `%` 前面插入一个填充说明符来指定填充规则. 填充说明符使用以下格式:

<填充符><宽度>:

- <填充符> 可以是 `0` 或空格. 如果你不指定则默认使用空格. 如果你想要指定其他填充符, 需在它之前加一个 `'` 字符.

- <宽度> 即想要填充到的宽度. 整数代表左填充, 负数代表右填充.

这是些填充说明符示例:

```php
<?php 
printf( "%04d", 12 );          // 输出 "0012"
printf( "%04d", 1234 );        // 输出 "1234"
printf( "%04d", 12345 );       // 输出 "12345"
printf( "% 10s", "Hello" );    // 输出 "     Hello"
printf( "%10s", "Hello" );     // 输出 "     Hello"
printf( "%'*10s", "Hello" );   // 输出 "*****Hello"
printf( "%'*-10s", "Hello" );  // 输出 "Hello*****"
?>
```

留意第三个示例, 填充说明符并不会导致目标字符串被截断为 4 个字符. __填充只会在必要处增加字符__

#数字精度

当使用 `f` 或者 `F` 类型说明符格式化浮点数时, PHP 默认会取到小数点后面 6 位:

```php
<?php 
printf( "%f", 123.456 );  // 输出 "123.456000"
?>
```

如果要指定不同的精度, 就要用到精度说明符了. 精度说明符是一个 `.` 号后跟一个数字, 并应放到类型说明符之前. 如:

```php
<?php 
printf( "%.2f", 123.456 );   // 输出 "123.46"
printf( "%.10f", 123.456 );  // 输出 "123.4560000000"
printf( "%.0f", 123.456 );   // 输出 "123"
 ?>
```

如果你既指定了填充说明符又指定了精度说明符, `printf()` 会将整个数字(包括整数和小数部分)填充到指定长度:

```php
<?php 
printf( "%08.2f", 123.456 );  // 输出 "00123.46"
 ?>
```

如果你同时使用 `s` 类型说明符和精度说明符, `printf()` 会截断目标字符串到指定的长度:

```php
<?php 
printf( "%.2s", "Hello" );  // 输出 "He"
 ?>
```

#参数交换

默认情况下, 目标字符串的第一个格式说明符会格式化该字符串后的第一个参数, 目标字符串的第二个格式说明符会格式化该字符串后的第二个参数, 以此类推. 但是你可以更改这个顺序.

要这样做, 在 `%` 符和类型说明符之间插入一个 `$` 号. 如:

```php
<?php 
// 输出 "Australia comprises 10 territories and 6 states"
printf( 'Australia comprises %2$d territories and %1$d states', 6, 10 );
 ?>
```

在上面的例子中, 第一个格式说明符是 `%2$d`. 意即: "将目标字符串后的第二个参数作为十进制整数格式化". 第二个格式说明符 `%1$d` 即: "将目标字符串后的第一个参数作为十进制整数格式化". 这样, 参数便以不同与默认的顺序格式化.

在上面的例子中, 格式字符串使用单引号而非双引号包围. 这样是为了阻止 `$` 符号被 PHP 解释为变量名.

#保存格式化后的结果

那 `sprintf()` 又是干嘛的呢? 这个函数和 `printf()` 只有一点不同: 它会将格式化后的结果返回, 而不是直接输出. 这样你就可以将结果赋给变量, 进行其他操作等. 如果你想要在输出它之前进行额外的处理, 或者保存到数据库等, 那这点会很有用. 下面是示例:

```php
<?php 
$result = sprintf( "Australia comprises %d states and %d territories", 6, 10 );

// 输出 "Australia comprises 6 states and 10 territories"
echo $result;
 ?>
```

#相关函数

其他相关的函数包括 [`fprintf()`][fprintf], 用于将结果写到流(如文件). 还有 [`vprintf()`][vprintf]/[`vsprintf()`][vsprintf]/[`vfprintf()`][vfprintf], 它们使用一个数组参数, 而非参数列表.

[printf]: http://php.net/manual/en/function.printf.php
[date]: http://php.net/manual/en/function.date.php
[sprintf]: http://php.net/manual/en/function.sprintf.php
[fprintf]: http://php.net/manual/en/function.fprintf.php
[vprintf]: http://php.net/manual/en/function.vprintf.php
[vsprintf]: http://php.net/manual/en/function.vsprintf.php
[vfprintf]: http://php.net/manual/en/function.vfprintf.php