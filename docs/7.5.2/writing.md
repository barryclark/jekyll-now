---
layout: page
title: Writing
description: >
  Hydejack offers a few additional features to markup your markdown.
  Don't worry, these are merely CSS classes added via the standard `{:.my-class}` syntax,
  so that your posts remain compatible with other Jekyll themes.
---

Hydejack offers a few additional features to markup your markdown.
Don't worry, these are merely CSS classes added via the standard `{:.my-class}` syntax,
so that your posts remain compatible with other Jekyll themes.

**NOTE**: For an introduction to markdown in general, see [Mastering Markdown][mm] and [kramdown Syntax][ksyn].
{:.message}

## Table of Contents
{:.no_toc}
0. this unordered seed list will be replaced by toc as unordered list
{:toc}

## A word on building speeds
If building speeds are a problem, try using the `--incremental` flag, e.g.

    bundle exec jekyll serve --incremental

From the [Jekyll docs](https://jekyllrb.com/docs/configuration/#build-command-options) (emphasis mine):

> Enable the experimental incremental build feature. Incremental build only re-builds posts and pages that have changed, resulting in significant performance improvements for large sites, *but may also break site generation in certain cases*.

The breakage occurs when you create new files or change filenames.
Also, changing the title, category, tags, etc. of a page or post will not be reflected in pages
other then the page or post itself.
This makes it ideal for writing new posts and previewing changes, but not setting up new content.

## Adding a table of contents
You can add a generated table of contents to any page by adding `{:toc}` below a list.

Example: see above

Markdown:
~~~md
* this unordered seed list will be replaced by toc as unordered list
{:toc}
~~~

## Adding message boxes
You can add a message box by adding the `message` class to a paragraph.

Example:

**NOTE**: You can add a message box.
{:.message}

Markdown:
~~~markdown
**NOTE**: You can add a message box.
{:.message}
~~~

## Adding large text
You can add large text by adding the `lead` class to the paragraph.

Example:

You can add large text.
{:.lead}

Markdown:
~~~markdown
You can add large text.
{:.lead}
~~~

## Adding large images
You can make an image span the full width by adding the `lead` class.

Example:

![Full-width image](https://placehold.it/800x100){:.lead}

Markdown:
~~~markdown
![Full-width image](https://placehold.it/800x100){:.lead}
~~~

## Adding large quotes
You can make a quote "pop out" by adding the `lead` class.

Example:

> You can make a quote "pop out".
{:.lead}

Markdown:
~~~
> You can make a quote "pop out".
{:.lead}
~~~

## Adding faded text
You can gray out text by adding the `faded` class.

Use this sparingly and for information that is not essential
--- or you don't want viewers to read at all, like when you pull a line form a dirty rap song..

Example:

I'm faded, faded, faded.
{:.faded}

Markdown:
~~~md
I'm faded, faded, faded.
{:.faded}
~~~

## Adding tables
Adding tables is straightforward and works just as described in the [kramdown docs][ksyntab], e.g.

| Default aligned |Left aligned| Center aligned  | Right aligned  |
|-----------------|:-----------|:---------------:|---------------:|
| First body part |Second cell | Third cell      | fourth cell    |

Markdown:
~~~md
| Default aligned |Left aligned| Center aligned  | Right aligned  |
|-----------------|:-----------|:---------------:|---------------:|
| First body part |Second cell | Third cell      | fourth cell    |
~~~

However, it gets tricker when adding large tables.
In this case, Hydejack will break the layout and grant the table the entire available screen width to the right:

| Default aligned |Left aligned| Center aligned  | Right aligned  | Default aligned |Left aligned| Center aligned  | Right aligned  | Default aligned |Left aligned| Center aligned  | Right aligned  | Default aligned |Left aligned| Center aligned  | Right aligned  |
|-----------------|:-----------|:---------------:|---------------:|-----------------|:-----------|:---------------:|---------------:|-----------------|:-----------|:---------------:|---------------:|-----------------|:-----------|:---------------:|---------------:|
| First body part |Second cell | Third cell      | fourth cell    | First body part |Second cell | Third cell      | fourth cell    | First body part |Second cell | Third cell      | fourth cell    | First body part |Second cell | Third cell      | fourth cell    |
| Second line     |foo         | **strong**      | baz            | Second line     |foo         | **strong**      | baz            | Second line     |foo         | **strong**      | baz            | Second line     |foo         | **strong**      | baz            |
| Third line      |quux        | baz             | bar            | Third line      |quux        | baz             | bar            | Third line      |quux        | baz             | bar            | Third line      |quux        | baz             | bar            |
| Second body     |            |                 |                | Second body     |            |                 |                | Second body     |            |                 |                | Second body     |            |                 |                |
| 2 line          |            |                 |                | 2 line          |            |                 |                | 2 line          |            |                 |                | 2 line          |            |                 |                |
| Footer row      |            |                 |                | Footer row      |            |                 |                | Footer row      |            |                 |                | Footer row      |            |                 |                |

### Scroll table
If the extra space still isn't enough, the table will receive a scrollbar.
It is browser default behavior to break the lines inside table cells to fit the content on the screen.
By adding the `scroll-table` class on a table, the behavior is changed to never break lines inside cells, e.g:

| Default aligned |Left aligned| Center aligned  | Right aligned  | Default aligned |Left aligned| Center aligned  | Right aligned  | Default aligned |Left aligned| Center aligned  | Right aligned  | Default aligned |Left aligned| Center aligned  | Right aligned  |
|-----------------|:-----------|:---------------:|---------------:|-----------------|:-----------|:---------------:|---------------:|-----------------|:-----------|:---------------:|---------------:|-----------------|:-----------|:---------------:|---------------:|
| First body part |Second cell | Third cell      | fourth cell    | First body part |Second cell | Third cell      | fourth cell    | First body part |Second cell | Third cell      | fourth cell    | First body part |Second cell | Third cell      | fourth cell    |
| Second line     |foo         | **strong**      | baz            | Second line     |foo         | **strong**      | baz            | Second line     |foo         | **strong**      | baz            | Second line     |foo         | **strong**      | baz            |
| Third line      |quux        | baz             | bar            | Third line      |quux        | baz             | bar            | Third line      |quux        | baz             | bar            | Third line      |quux        | baz             | bar            |
| Second body     |            |                 |                | Second body     |            |                 |                | Second body     |            |                 |                | Second body     |            |                 |                |
| 2 line          |            |                 |                | 2 line          |            |                 |                | 2 line          |            |                 |                | 2 line          |            |                 |                |
| Footer row      |            |                 |                | Footer row      |            |                 |                | Footer row      |            |                 |                | Footer row      |            |                 |                |
{:.scroll-table}

You can add the `scroll-table` class to a markdown table by putting `{:.scroll-table}` in line directly below the table.
To add the class to a HTML table, add the it to the `class` attribute of the `table` tag, e.g. `<table class="scroll-table">`.

### Flip table
Alternatively, you can "flip" (transpose) the table.
Unlike the other approach, this will keep the table head (now the first column) fixed in place.

You can enable this behavior by adding `flip-table` or `flip-table-small` to the CSS classes of the table.
The `-small` version will only enable scrolling on "small" screens (< 1080px wide).

**NOTE**: This approach only works on simple tables that have a single `tbody` and an optional `thead`.
{:.message}

Example:

| Default aligned |Left aligned| Center aligned  | Right aligned  | Default aligned |Left aligned| Center aligned  | Right aligned  | Default aligned |Left aligned| Center aligned  | Right aligned  | Default aligned |Left aligned| Center aligned  | Right aligned  |
|-----------------|:-----------|:---------------:|---------------:|-----------------|:-----------|:---------------:|---------------:|-----------------|:-----------|:---------------:|---------------:|-----------------|:-----------|:---------------:|---------------:|
| First body part |Second cell | Third cell      | fourth cell    | First body part |Second cell | Third cell      | fourth cell    | First body part |Second cell | Third cell      | fourth cell    | First body part |Second cell | Third cell      | fourth cell    |
| Second line     |foo         | **strong**      | baz            | Second line     |foo         | **strong**      | baz            | Second line     |foo         | **strong**      | baz            | Second line     |foo         | **strong**      | baz            |
| Third line      |quux        | baz             | bar            | Third line      |quux        | baz             | bar            | Third line      |quux        | baz             | bar            | Third line      |quux        | baz             | bar            |
| 4th line        |quux        | baz             | bar            | 4th line        |quux        | baz             | bar            | 4th line        |quux        | baz             | bar            | 4th line        |quux        | baz             | bar            |
| 5th line        |quux        | baz             | bar            | 5th line        |quux        | baz             | bar            | 5th line        |quux        | baz             | bar            | 5th line        |quux        | baz             | bar            |
| 6th line        |quux        | baz             | bar            | 6th line        |quux        | baz             | bar            | 6th line        |quux        | baz             | bar            | 6th line        |quux        | baz             | bar            |
| 7th line        |quux        | baz             | bar            | 7th line        |quux        | baz             | bar            | 7th line        |quux        | baz             | bar            | 7th line        |quux        | baz             | bar            |
| 8th line        |quux        | baz             | bar            | 8th line        |quux        | baz             | bar            | 8th line        |quux        | baz             | bar            | 8th line        |quux        | baz             | bar            |
| 9th line        |quux        | baz             | bar            | 9th line        |quux        | baz             | bar            | 9th line        |quux        | baz             | bar            | 9th line        |quux        | baz             | bar            |
| 10th line       |quux        | baz             | bar            | 10th line       |quux        | baz             | bar            | 10th line       |quux        | baz             | bar            | 10th line       |quux        | baz             | bar            |
{:.flip-table}

You can add the `flip-table` class to a markdown table by putting `{:.flip-table}` in line directly below the table.
To add the class to a HTML table, add the it to the `class` attribute of the `table` tag, e.g. `<table class="flip-table">`.

### Small tables
If a table is small enough to fit the screen even on small screens, you can add the `stretch-table` class
to force a table to use the entire available content width. Note that stretched tables can no longer be scrolled.

| Default aligned |Left aligned| Center aligned  | Right aligned  |
|-----------------|:-----------|:---------------:|---------------:|
| First body part |Second cell | Third cell      | fourth cell    |
{:.stretch-table}

You can add the `stretch-table` class to a markdown table by putting `{:.stretch-table}` in line directly below the table.
To add the class to a HTML table, add the it to the `class` attribute of the `table` tag, e.g. `<table class="stretch-table">`.

## Adding code blocks
To add a code block without syntax highlighting, simply indent 4 spaces (regular markdown).
For code blocks with code highlighting, use `~~~<language>`. This syntax is also supported by GitHub.
For more information and a list of supported languages, see [Rouge](http://rouge.jneen.net/).

Example:

~~~js
// Example can be run directly in your JavaScript console

// Create a function that takes two arguments and returns the sum of those
// arguments
var adder = new Function("a", "b", "return a + b");

// Call the function
adder(2, 6);
// > 8
~~~

Markdown:

    ~~~js
    // Example can be run directly in your JavaScript console

    // Create a function that takes two arguments and returns the sum of those
    // arguments
    var adder = new Function("a", "b", "return a + b");

    // Call the function
    adder(2, 6);
    // > 8
    ~~~

**NOTE**: DO NOT use Jekyll's `{ % highlight % } ... { % endhighlight % }` syntax, especially together with the `linenos` option.
The generated `table` to render the line numbers does not have a CSS class or any other way of differentiating it from regular tables,
so that the styles above apply, resulting in a broken page.
What's more, the output from `highlight` tags isn't even valid HTML, nesting `pre` tags inside `pre` tags,
which will in break the site during minification.
You can read more about it [here](https://github.com/penibelst/jekyll-compress-html/issues/71) and
[here](https://github.com/jekyll/jekyll/issues/4432).
{:.message}

## Adding math
Hydejack supports [math blocks][ksynmath] via [KaTeX][katex].

Why KaTeX instead of MathJax? KaTeX is faster and more lightweight at the cost of having less features, but
for the purpose of writing blog posts, this should be a favorable tradeoff.

Before you add math content, make sure you have the following in your config file:

```yml
kramdown:
  math_engine:         mathjax # this is not a typo
  math_engine_opts:
    preview:           true
    preview_as_code:   true
```

### Inline
Example:

Lorem ipsum $$ f(x) = x^2 $$.

Markdown:
~~~md
Lorem ipsum $$ f(x) = x^2 $$.
~~~

### Block
Example:

$$
\begin{aligned}
  \phi(x,y) &= \phi \left(\sum_{i=1}^n x_ie_i, \sum_{j=1}^n y_je_j \right) \\[2em]
            &= \sum_{i=1}^n \sum_{j=1}^n x_i y_j \phi(e_i, e_j)            \\[2em]
            &= (x_1, \ldots, x_n)
               \left(\begin{array}{ccc}
                 \phi(e_1, e_1)  & \cdots & \phi(e_1, e_n) \\
                 \vdots          & \ddots & \vdots         \\
                 \phi(e_n, e_1)  & \cdots & \phi(e_n, e_n)
               \end{array}\right)
               \left(\begin{array}{c}
                 y_1    \\
                 \vdots \\
                 y_n
               \end{array}\right)
\end{aligned}
$$

Markdown:

~~~latex
$$
\begin{aligned}
  \phi(x,y) &= \phi \left(\sum_{i=1}^n x_ie_i, \sum_{j=1}^n y_je_j \right) \\[2em]
            &= \sum_{i=1}^n \sum_{j=1}^n x_i y_j \phi(e_i, e_j)            \\[2em]
            &= (x_1, \ldots, x_n)
               \left(\begin{array}{ccc}
                 \phi(e_1, e_1)  & \cdots & \phi(e_1, e_n) \\
                 \vdots          & \ddots & \vdots         \\
                 \phi(e_n, e_1)  & \cdots & \phi(e_n, e_n)
               \end{array}\right)
               \left(\begin{array}{c}
                 y_1    \\
                 \vdots \\
                 y_n
               \end{array}\right)
\end{aligned}
$$
~~~

**NOTE**: KaTeX does not support the `align` and `align*` environments.
Instead, `aligned` should be used, e.g. `\begin{aligned} ... \end{aligned}`.
{:.message}

Continue with [Scripts](scripts.md){:.heading.flip-title}
{:.read-more}


[mm]: https://guides.github.com/features/mastering-markdown/
[ksyn]: https://kramdown.gettalong.org/syntax.html
[ksyntab]:https://kramdown.gettalong.org/syntax.html#tables
[ksynmath]: https://kramdown.gettalong.org/syntax.html#math-blocks
[katex]: https://khan.github.io/KaTeX/
[rtable]: https://dbushell.com/2016/03/04/css-only-responsive-tables/
