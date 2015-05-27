---
layout: post
title:  "Tufte-style Jekyll blog"
date:   2015-02-19 21:46:04
categories: jekyll css
---
## Introduction

{% newthought 'The Tufte Jekyll theme' %} is an attempt to create a website design with the look and feel of Edward Tufte's books and handouts. Tufte’s style is known for its extensive use of sidenotes, tight integration of graphics with text, and well-set typography.<!--more--> The idea for this project is essentially cribbed wholesale from Tufte and R Markdown's Tufte Handout format{% sidenote 1  'See [code.google.com/p/tufte-latex](https://code.google.com/p/tufte-latex') and [rmarkdown.rstudio.com/tufte_handout_format](http://rmarkdown.rstudio.com/tufte_handout_format.html) %} This page is an adaptation of the [Tufte Handout PDF](http://rmarkdown.rstudio.com/examples/tufte-handout.pdf).

## Jekyll customizations

This Jekyll blog theme is based on a github repository by Dave Liepmann [here](https://github.com/daveliepmann/tufte-css), which in turn was based on the [R Markdown Tufte Handout](http://rmarkdown.rstudio.com/examples/tufte-handout.pdf). I borrowed freely from Dave's repo and have transformed many of the typographic and page-structural features into a set of custom Liquid tags that make creating content using this style much easier than writing straight HTML. Essentially, if you know markdown, and mix in a few custom Liquid tags, you can be creating a website with this document style in short order. 

## Basics

### Color

Although paper handouts obviously have a pure white background, the web is better served by the use of slightly off-white and off-black colors. I picked ```#fffff8``` and ```#111111``` because they are nearly indistinguishable from their 'pure' cousins, but dial down the harsh contrast. Tufte's books are a study in spare, minimalist design. In his book [The Visual Display of Quantitative Information](http://www.edwardtufte.com/tufte/books_vdqi), he uses a red ink to add some visual punctuation to the buff colored paper and dark ink. In that spirit, links are styled using a similar red color. 
  
### Headings

Tufte CSS styles headings ```h1```, ```h2```, and ```h3```, making them nearly identical except for font size. The ```h1``` should be used as a title, the ```h2```for section headings, and ```h3``` for subsection headings.

While this Jekyll theme supports more specific headings, if you feel the urge to reach for a heading of level 4 or higher, consider redesigning your document.

{% newthought 'In his later books' %}{% sidenote 2 '[http://www.edwardtufte.com/tufte/books_be](http://www.edwardtufte.com/tufte/books_be)'%}, Tufte starts each section with a bit of vertical space, a non-indented paragraph, and sets the first few words of the sentence in small caps. To accomplish this using this style, enclose the sentence fragment you want styled with small caps in a custom Liquid tag called 'newthought' like so:

```
{{ "{% newthought 'In his later books'" }} %}
```

### Font

In print, Tufte uses the proprietary Monotype Bembo{% sidenote 3 '[http://www.edwardtufte.com/bboard](http://www.edwardtufte.com/bboard/q-and-a-fetch-msg?msg_id=0000Vt)' %} font. Electronically he uses ETBembo, available under the MIT license through Edward Tufte, Adam Schwartz, and Marc Neuwirth's [*Presenter*](https://github.com/edwardtufte/presenter) project. The Tufte Jekyll Theme CSS uses ETBembo through the use of ```@font-face```.

Code snippets ape GitHub's font selection using Microsoft's [*Consolas*](http://www.microsoft.com/typography/ClearTypeFonts.mspx) and the sans-serif font uses Tufte's choice of Gill Sans. Since this is not a free font, and some systems will not have it installed, the free google font [*Lato*](https://www.google.com/fonts/specimen/Lato) is designated as a fallback.

## Figures

### Margin Figures

{% marginfigure /assets/img/figure1.png 'Figure 1: Sepal length vs. petal length, colored by species'  %}Images and graphics play an integral role in Tufte’s work. To place figures in the margin, use the custom margin figure liquid tag included in the ```_plugins``` directory like so: 

```{{ "{% marginfigure /assets/img/figure1.png 'Figure 1: Sepal length vs. petal length, colored by species' "}} %}```. 

Note that the caption *must* be enclosed in quotes for the simple liquid tag to work!

### Equations

The Markdown parser being used by this Jekyll theme is Kramdown, which contains some built-in [Mathjax](//www.mathjax.org) support. Both inline and block-level mathematical figures can be added to the content.

For instance, the following inline sequence: 

*When {% m %}a \ne 0{% em %}, there are two solutions to {% m %}ax^2 + bx + c = 0{% em %}* 

is written by enclosing a Mathjax expression with a *Liquid inline tag pair* ('m' and 'em') like so: 

```When {{ "{% m "}}%} a \ne 0{{ "{% em "}}%}, there are two solutions to {{ "{% m " }}%}ax^2 + bx + c = 0{{ "{% em " }}%}```

Similarly, this block-level Mathjax expression: {% math %}x = {-b \pm \sqrt{b^2-4ac} \over 2a}.{% endmath %}

is written by enclosing the expression with a *Liquid block tag pair* ('math' and 'endmath') like so:

```{{ "{% math "}}%}x = {-b \pm \sqrt{b^2-4ac} \over 2a}.{{ "{% endmath "}} %}```

You can get pretty fancy, for instance, the wave equation's nabla is no big thing{% math %}\frac{\partial^2 y}{\partial t^2}= c^2\nabla^2u{% endmath %}

All of the standard Latex equation markup is available to use inside these block tags. 

### Full Width Figures

If you need a full-width image or figure, another custom liquid tag is available to use. Oddly enough, it is named 'fullwidth', and this markup:

```{{ "{% fullwidth /assets/img/figure2.png 'Full width figure' "}} %}```

Yields this:

{% fullwidth /assets/img/figure2.png 'Full width figure' %}

```qplot(wt, mpg, data = mtcars, colour = factor(cyl) )```


### Main Column Figures

Besides margin and full width figures, you can of course also include figures constrained to the main column. Yes, you guessed it, a custom liquid tag rides to the rescue once again:

```{{ "{% maincolumn /assets/img/figure3.png 'This is a caption for the image to the left' "}} %}```

yields this:

{% maincolumn /assets/img/figure3.png 'This is a caption for the image to the left' %}

## Sidenotes and Margin notes

One of the most prominent and distinctive features of Tufte's style is the extensive use of sidenotes and margin notes. Perhaps you have noticed their use in this document already. You are very astute.

There is a wide margin to provide ample room for sidenotes and small figures. I have preserved a slight semantic distinction between *sidenotes* and *marginnotes*. 

### Sidenotes

Sidenotes{% sidenote 3 'This is a sidenote and *contains a superscript*'%} contain a superscript. Right now, it is up to you to maintain the numbering system with these Liquid tags. Perhaps some clever person who takes a shine to this Jekyll theme will fork the repository and use some Ruby-fu and modify the ```sidenote.rb``` plugin to keep track of the numbering for you. But right now, a sidenote like the one here is created with the following markup in Markdown (what?):

```{{ "{% sidenote 3 'This is a sidenote and *contains a superscript*'" }}%}```

### Margin notes

Margin notes{% marginnote 'This is a margin note *without* a superscript' %} are similar to sidenotes, but do not contain a superscript. You can place anything you want in a margin note. Well, anything that is an inline element. Block level elements can make the Kramdown parser do strange things. Same sort of markup as a sidenote, but without a number involved:

```{{ "{% marginnote 'This is a margin note *without* a superscript'" }} %}```


## Tables

Tabular data is presented with right-aligned text and minimal grid lines. Table captions are placed inside a *marginnote* Liquid Tag above the table. Be careful to leave a blank line between the marginnote and the beginning of the table to avoid goofy shit happening during the parsing step. 

Of course, a table can be created using the usual html markup (```<table><thead><tbody<tr><td> etc..```)

 {% marginnote 'Table 1: first row of metcars' %}

<table>
  <thead><th></th><th>mpg</th><th>cyl</th><th>disp</th><th>hp</th><th>drat</th><th>wt</th></thead>
  <tbody>
    <tr><td>Mazda RX4</td><td>21.00</td><td>6.00</td><td>160.00</td><td>110.00</td><td>3.90</td><td>2.62</td></tr>
    <tr><td>Mazda RX4 Wag</td><td>21.00</td><td>6.00</td><td>160.00</td><td>110.00</td><td>3.90</td><td>2.88</td></tr>
    <tr><td>Datsun 710</td><td>22.80</td><td>4.00</td><td>108.00</td><td>93.00</td><td>3.85</td><td>2.32</td></tr>
    <tr><td>Hornet 4 Drive</td><td>21.40</td><td>6.00</td><td>258.00</td><td>110.00</td><td>3.08</td><td>3.21</td></tr>
    <tr><td>Hornet Sportabout</td><td>18.70</td><td>8.00</td><td>360.00</td><td>175.00</td><td>3.15</td><td>3.44</td></tr>
    <tr><td>Valiant</td><td>18.10</td><td>6.00</td><td>225.00</td><td>105.00</td><td>2.76</td><td>3.46</td></tr>
  </tbody>
</table>

{% newthought Or %} you can avail yourself of the Markdown Extra features built into Kramdown, and use the Markdown Extra table syntax to make the very same thing:

{% marginnote 'Table 2: same table with Markdown Extra markup and sane numerical precision' %}

|                 |mpg  | cyl  |  disp  |   hp   |  drat  | wt  |
|----------------:|----:|-----:|-------:|-------:|-------:|----:|
|Mazda RX4        |21   |6     |160     |110     |3.90    |2.62 |
|Mazda RX4 Wag    |21   |6     |160     |110     |3.90    |2.88 |
|Datsun 710       |22.8 |4     |108     |93      |3.85    |2.32 |
|Hornet 4 Drive   |21.4 |6     |258     |110     |3.08    |3.21 |
|Hornet Sportabout|18.7 |8     |360     |175     |3.15    |3.44 |
|Valiant          |18.1 |6     |160     |105     |2.76    |3.46 |

Using the following markup(down):

```
|                 |mpg  | cyl  |  disp  |   hp   |  drat  | wt  |
|----------------:|----:|-----:|-------:|-------:|-------:|----:|
|Mazda RX4        |21   |6     |160     |110     |3.90    |2.62 |
etc..
```

## Code

Code samples use a monospace font using the 'code' class. The Kramdown parser has the 'GFM' option enabled, which stands for 'Github Flavored Markdown', and this means that both inline code such as ```#include <stdio.h>``` and blocks of code can be delimited by surrounding them with 3 backticks:

```
(map tufte-style all-the-things)
```
is created by the following markup:
<pre><code>```(map tufte-style all-the-things)```</code></pre>

In theory, one should be able to append the language name right after the first three backticks and get some sexy code syntax highlighting, but for some reason, the only way I can make this work with the Kramdown and Rouge highlighting turned on is to enclose a block of code in the some Liquid tags. For instance, here is the Ruby code for one of the plugins included with this theme:

{% highlight ruby %}
module Jekyll
  class RenderFullWidthTag < Liquid::Tag
require "shellwords"

    def initialize(tag_name, text, tokens)
      super
      @text = text.shellsplit
    end

    def render(context)
      "<div><img class='fullwidth' src='#{@text[0]}'/></div> " +
      "<p><span class='marginnote'>#{@text[1]}</span></p>"
    end
  end
end

Liquid::Template.register_tag('fullwidth', Jekyll::RenderFullWidthTag)
{% endhighlight %}

Which is created by surrounding the code with the *highlight* tag block pair:

```
{{ "{% highlight ruby" }} %}
module Jekyll 
  blah, blah...
Liquid::Template.register_tag('fullwidth', Jekyll::RenderFullWidthTag)
{{ "{% endhighlight" }} %}
```
For some reason, the *linenos* tag modifier in the highlight tag totally screws up the code alignment, and I don't feel like sorting it out at the moment. So either don't use it, or figure it out and tell me what is going on so I can fix it.
