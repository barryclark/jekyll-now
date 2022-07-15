---
layout: post
title: Style Guide
image: 8.jpg
date: 2018-03-02 13:35:20 +0200
tags:
categories: guide
---
A paragraph looks like this — dolor amet cray stumptown fingerstache neutra food truck seitan poke cardigan waistcoat VHS snackwave celiac hella. Godard seitan shoreditch flexitarian next level trust fund man braid vegan listicle keytar bitters. Disrupt cray fashion axe unicorn lomo shaman poke glossier keffiyeh snackwave austin tattooed seitan hexagon lo-fi. Lumbersexual irony vaporware, butcher shaman church-key iceland.

***

#### Headings by default:

# H1 For example
## H2 For example
### H3 For example
#### H4 For example
##### H5 For example
###### H6 For example

{% highlight markdown %}
## Heading first level
### Heading second level
#### Heading third level
{% endhighlight %}

***

#### Lists

###### Ordered list example:

1. Poutine drinking vinegar bitters.
2. Coloring book distillery fanny pack.
3. Venmo biodiesel gentrify enamel pin meditation.
4. Jean shorts shaman listicle pickled portland.
5. Salvia mumblecore brunch iPhone migas.

###### Unordered list example:

* Bitters semiotics vice thundercats synth.
* Literally cred narwhal bitters wayfarers.
* Kale chips chartreuse paleo tbh street art marfa.
* Mlkshk polaroid sriracha brooklyn.
* Pug you probably haven't heard of them air plant man bun.

{% highlight markdown %}
1. Order list item 1
2. Order list item 1

* Unordered list item 1
* Unordered list item 2
{% endhighlight %}

***

#### Quotes

###### A quote looks like this:

> Never put off till tomorrow what may be done day after tomorrow just as well. — Mark Twain

***

#### Syntax Highlighter

{% highlight js %}
  $('.top').click(function () {
    $('html, body').stop().animate({ scrollTop: 0 }, 'slow', 'swing');
  });
  $(window).scroll(function () {
    if ($(this).scrollTop() > $(window).height()) {
      $('.top').addClass("top-active");
    } else {
      $('.top').removeClass("top-active");
    };
  });
{% endhighlight %}

***

#### Images

![]({{site.baseurl}}/images/2.jpg)

***

#### Videos

###### Youtube

<iframe src="https://www.youtube.com/embed/iWowJBRMtpc" frameborder="0" allowfullscreen></iframe>