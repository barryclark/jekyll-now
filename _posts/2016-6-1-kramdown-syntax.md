---
layout: post
title: kramdown syntax(kramdown 语法)
---

形成有效段落
---

    - 一行或多行空行
    - 行尾使用 \\
    - `<br />`

This⋅para⋅line⋅starts⋅at⋅the⋅first⋅column.⋅However,
⋅⋅⋅⋅⋅⋅the⋅following⋅lines⋅can⋅be⋅indented⋅any⋅number⋅of⋅spaces/tabs.
⋅⋅⋅The⋅para⋅continues⋅here.

⋅⋅This⋅is⋅second⋅paragraph,⋅not⋅connected⋅to⋅the⋅above⋅one.⋅But⋅⋅
with⋅a⋅hard⋅line⋅break.⋅    
  And⋅third⋅one.<br />And⋅forth⋅one.\\The last.

主题的两种表达方法:
1.Setext header. 

First level header
==================

Second level header
------

   Other first level header
=

This is a normal
paragraph.

And A Header
------------
And a paragraph

> This is a blockquote.

And A Header
------------
2.atx style 
# First level header

### Third level header    ###

## Second level header ######

\#必须顶格,主题字符和最后一个# 之间要有空格,下面都是错误的
    # First level header

###Third level header    ###

    ## Second level header ######

块引用
---
注意换行的情况
===

> This is a blockquote.
> what about this?
>     on multiple lines
that may be lazy.
>
> This is the second paragraph.

> This is a paragraph.
>
> > A nested blockquote.
>
> ## Headers work
>
> * lists too
>
> and all other block-level elements

> A code block:
>
>     ruby -e 'puts :works'

> This is a paragraph inside
a blockquote.
>
> > This is a nested paragraph
that continues here
> and here
> > and here.

代码块
---
> 标准代码块, 需要缩进4个空格或1个tab

> 顶格的^可以分割2块代码

    // this is a block of code
    #include <stdio.h>
    #include <stdlib.h>
^
    // another block
    int main(void)
    {
        exit(0);
    }
// 这里仍然是 codeblock    

> Fenced Code Blocks,可以指定语言类型,支持语法高亮

~~~c
void test(void)
{
    prrintf("hello world\n");
}
~~~

列表 list
---
有序列表指明的数字是无意义的,自动从1开始


* kram
+ down
* kram1
- now
- now1

5. haha
1. kram
2. down
3. now
    
* This is the first line. Since the first non-space characters appears in
  column 3, all other indented lines have to be indented 2 spaces.
However, one could be lazy and not indent a line but this is not
recommended.
*       This is the another item of the list. It uses a different number
   of spaces for indentation which is okay but should generally be avoided.
   * The list item marker is indented 3 spaces which is allowed but should
     also be avoided and starts the third list item. Note that the lazy
     line in the second list item may make you believe that this is a
     sub-list which it isn't! So avoid being lazy!

* This is the first list item bla blabla blabla blabla blabla blabla
  blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla
  blabla blabla blabla bla
* This is the another item of the list. bla blabla blabla blabla blabla
  blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla

*   Using a tab to indent this line, the tab only counts as three spaces
    and therefore the overall indentation is four spaces.

   1.   The tab after the marker counts here as three spaces. Since the
        indentation of the marker is three spaces and the marker itself
        takes two characters, the overall indentation needed for the
        following lines is eight spaces or two tabs.

* kram

* down
* now

* Not wrapped in a paragraph
* Wrapped in a paragraph due to the following blank line.

* Also wrapped in a paragraph due to the
  following blank line and the EOB marker.

^
*   First item

    A second paragraph

    * nested list

    > blockquote

*   Second item
*   This is a list item.

    The second para of the list item.
^
    A code block following the list item.
    
*
        This⋅is⋅a⋅code⋅block⋅(indentation⋅needs⋅to⋅be⋅4(1)+4(1)
        spaces⋅(tabs)).
