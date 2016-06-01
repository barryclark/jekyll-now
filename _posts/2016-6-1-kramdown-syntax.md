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
    #this is a block of code
    int main(void)
    {
        exit(0);
    }
    
    #these are two blocks
    #include <stdio.h>
    ^
    #include <stdlib.h>
    
    
