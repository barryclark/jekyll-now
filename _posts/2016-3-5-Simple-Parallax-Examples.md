---
layout: post
title: Simple Parallax Examples
permalink: /blog/Simple-Parallax-Examples/
---

Parallax (noun): the apparent displacement of an observed object due to a change in the position of the observer.

Parallax on the web is all the rage! Typically, items on the page move at various speeds as the page is scrolled. I'm only going to cover a few types (NOTE: these techniques are unofficially named): parallax header, landing elements, and floating elements.

#### Parallax Header
You've seen it before. As the page is scrolled the header image appears as if it's being covered by the content below and the header text appears to be following your scroll. This is actually just a fixed background image and a translateY on the text node.

<img class="blog-gif" src="/images/header_parallax.jpg" alt="Header Parallax Effect">
<p class="caption">Hover over images to watch animation</p>

<strong>Markup (Jade)</strong>
{% highlight html linenos %}
 body
  header
    h2 <span>[&nbsp;</span>hooli<sup>XYZ</sup><span>&nbsp;]</span>
{% endhighlight %}

<strong>Style (Sass)</strong>
{% highlight Sass linenos %}
 header
  position: relative
  height: 600px
  background:
    image: url(../images/hooli.jpg)
    repeat: no-repeat
    size: cover
    attachment: fixed
  display: flex
  align-items: center
  justify-content: center
{% endhighlight %}

<strong>Code (jQuery)</strong>
{% highlight javascript linenos %}
 var headerHeight = $('header').height();

 // listen to scroll of window to tell what's moving whenever the window scrolls
 $(window).scroll(function() {
  // how far you've scrolled from the top of the window (position: 0)
  var wScroll = $(this).scrollTop();

  // if the header is still in view, translate the h2
  if (wScroll <= headerHeight) {
    $('header h2').css({'transform': 'translateY('+wScroll / 2 +'%)'});
  }
 });
{% endhighlight %}

#### Landing Elements
Landing elements are things that sort of appear when you scroll into a new area. They're great attention grabbers! In this example, we are using our styles to do most of the work. The jQuery code only adds a class to each html element we want to reveal, in order, every 180 milliseconds.

<img class="blog-gif" src="/images/landing_parallax.jpg" alt="Landing Parallax Effect">

<strong>Markup (Jade)</strong>
{% highlight html linenos %}
 section.content
  article
    h2 Who Are We

    p Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do...

    .corporate-icons
      .row.img-row
        figure.four.columns
          img(src="images/graphic_kanban.svg")
          figcaption
        figure.four.columns
          img(src="images/graphic_playbook.svg")
        figure.four.columns
          img(src="images/graphic_kanban.svg")
{% endhighlight %}

<strong>Style (Sass)</strong>
{% highlight Sass linenos %}
 .corporate-icons
  margin-bottom: 100px

  figure
    opacity: 0
    transform: translateY(100px)
    transition: all 0.4s ease-in-out

    &.is-showing
      opacity: 1
      transform: translateX(0px)
{% endhighlight %}

<strong>Code (jQuery)</strong>
{% highlight javascript linenos %}
 $(window).scroll(function() {
  // how far you've scrolled from the top of the window (position: 0)
  var wScroll = $(this).scrollTop();

  // look at how far corporate-icons is from the top.
  // if the distance scrolled from the top is greater than when the corporate-icons div is within 20% of the window height, add a class to the figures

  if (wScroll > $('.corporate-icons').offset().top - ($(window).height() / 1.2)) {
    // if we changed the conditional to if (wScroll > $('.corporate-icons').offset().top), the function below would execute when the corporate-icons div was at the very top of the window (completely in view)

    // Divided by 1.2 = 20% of window height
    $('.corporate-icons figure').each(function(i) {
      // every 180 milliseconds, add the "is-showing" class to the next figure
      setTimeout(function() {
        $('.corporate-icons figure').eq(i).addClass('is-showing');
      }, 180 * (i+1));
    });
  }
});
{% endhighlight %}

#### Floating Elements
One of my favorites! Floating elements can be done in a variety of ways. The commonality is that floating elements are controlled by your scroll. Things move around on the screen based on scroll speed and scroll position. In the code we simply translate the position of our spaceship with each pixel scrolled.

<img class="blog-gif" src="/images/floating_parallax.jpg" alt="Floating Parallax Effect">

<strong>Markup (Jade)</strong>
{% highlight html linenos %}
 .corporate-icons
 // previous code here....
 .main-window
{% endhighlight %}

<strong>Style (Sass)</strong>
{% highlight Sass linenos %}
 .main-window
  height: 100px
  width: 100px
  position: absolute
  left: 0
  right: 0
  background:
    image: url(../images/spaceship.png)
    position: left center
    repeat: no-repeat
  overflow: hidden
{% endhighlight %}

<strong>Code (jQuery)</strong>
{% highlight javascript linenos %}
 $(window).scroll(function() {
  // how far you've scrolled from the top of the window (position: 0)
  var wScroll = $(this).scrollTop();

  // from the bottom of the window
  if (wScroll > $('.main-window').offset().top - ($(window).height())) {
    $('.main-window').css({'transform': 'translate('+wScroll / 0.8 +'%,-'+wScroll / 8 +'%)'});
  }
});
{% endhighlight %}

...And that's it: three easy parallax techniques, done!

####Some Important Things to Note
As previously mentioned, there are downsides to using parallax design (these downsides are completely situational and might not necessarily apply to what you're trying to achieve). <strong>First</strong>, many sites that use parallax design also sport a single page layout. This is not so good for SEO as there's only one set of meta information, one title, one header, etc. <strong>Second</strong>, page load time can be increased and scroll speed/smoothness decreased. It's important not to be heavy handed with large images and parallax-based animation. <strong>Third</strong>, there is a chance for some incompatibility when used with mobile and responsive design.

Parallax is a fun way to make your site more interactive by telling a story, adding depth, and highlighting call to actions. Keep it simple!

 <span>*</span>If you're following along with this example and wondering why your page might not look exactly like mine it's because the code snippets leave out some base styles/markup/code. <a href="https://drive.google.com/folderview?id=0B0y-J1kbjmP6bG9ESmZvLUkxMUk&usp=sharing">Click here to get the whole project</a>.
