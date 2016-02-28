---
layout: post
title: Jade + Sass Workflow
permalink: /blog/Jade+Sass-Workflow/
---

Every few months some amazing tool or software comes out that makes the lives of devs easier. I know I'm late to the party but I just discovered <a href="http://jade-lang.com">Jade</a> &ndash; and I'm excited to share how it improves my workflow!

Certainly influenced by <a href="">HAML</a>, Jade is a templating engine designed (though not required) to be used with Node.js.

#### So What Can it Do?

It can transform this:
{% highlight html linenos %}
 <footer>
  <div class="row footer-stuff">
    <div class="columns three"><strong>FIND US ON </strong>
      <ul>
        <li><a href="">Twitter</a></li>
        <li><a href="">Facebook</a></li>
        <li><a href="">Pinterest</a></li>
        <li><a href="">Instagram</a></li>
      </ul>
    </div>
  </div>
 </footer>
{% endhighlight %}

Into this:
{% highlight jade linenos %}
 footer
  .row.footer-stuff
    .columns.three
      strong FIND US ON
      ul
        li: a(href="") Twitter
        li: a(href="") Facebook
        li: a(href="") Pinterest
        li: a(href="") Instagram
{% endhighlight %}

Let's review that: With Jade I didn't have to use those cursed angle brackets, specifying class name required just adding a '.', nesting of elements just requires indention, and I didn't have to close any elements.

This is just a small example of the the things made possible with Jade. You can also extend other Jade files to "cut-and-paste" markup, add your own mixins for repeated markup, write inline Javascript, and so much more.

All this results in more whitespace which your eyes will thank you for, faster development, and ultimately, time saved.

#### Sass over SCSS
<a href="http://sass-lang.com">Sass</a> is incredible. Though SCSS is newer, the syntax of Sass is similar to Jade in the sense that it is minimalist. Let me show you:

SCSS:
{% highlight scss linenos %}
 nav {
   ul {
     margin: 0;
     padding: 0;
     list-style: none;
   }

   li { display: inline-block; }

   a {
     display: block;
     padding: 6px 12px;
     text-decoration: none;
   }
 }
{% endhighlight %}

Sass:
{% highlight sass linenos %}
 nav
  ul
    margin: 0
    padding: 0
    list-style: none

  li
    display: inline-block

  a
    display: block
    padding: 6px 12px
    text-decoration: none
{% endhighlight %}

#### I've been sold.

To leverage both of these technologies I use either GruntJS or CodeKit to minify and/or compile. CodeKit is new for me but it might beat out GruntJS for most applications. Grunt might have flexibility and customizability but CodeKit has simplicity and speed; for me, the latter wins.

This workflow is all about simplicity and speed, not customizability. It allows me to build out a site or even prototype quickly. But hey, in a few months, it might change again. That's the fun in trying out new tech!
