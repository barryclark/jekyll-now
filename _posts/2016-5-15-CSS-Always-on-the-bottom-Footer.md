---
layout: post
title: CSS “Always on the bottom” Footer
---

I have been using the awesome [JekyllNow](https://github.com/barryclark/jekyll-now) template and really loved it!

However I feel that I don't quite like the footer styling that appears floating in the middle of the page when there are not much content yet in my blog.

After a few moment of googling, I found this [codepen](http://codepen.io/cbracco/pen/zekgx) that tells me exactly what I need to do.

### Here are some changes that I did based on the codepen:

Open the main css file of your site (I use the file named: `style.scss`)

Make sure you have the html structure similar to this:
    {% highlight html %}
    <html>
        <body>
        <div class="wrapper-header">
        <div class="wrapper-main">
        <div class="wrapper-footer">
        </body>
    </html>
    {% endhighlight %}
    
Add the following css rules:
    {% highlight css %}
    html {
        height: 100%;
        box-sizing: border-box;
    }
    *,
    *:before,
    *:after {
        box-sizing: inherit;
    }
    body {
        position: relative;
        margin: 0;
        padding-bottom: 6rem;
        min-height: 100%;
    }
    {% endhighlight %} 

And then, add the other css rule for your footer `<div>`
    {% highlight css %}
    .wrapper-footer{
        position: absolute;
        bottom: 0;
        width: 100%;
    } 
    {% endhighlight %}

That's it! Enjoy your "always on the bottom" footer!