---
layout: post
title: The Transition to Native Javascript
---

Over the past several years, jQuery has "replaced" JavaScript as the industry standard for developing advanced interaction in Web Applications. There are a lot of benefits to using jQuery that have contributed to the framework's top-dog position that we'll take a look at - I may even attempt to argue against a few. We'll also discuss some ways to emulate common jQuery functionality in Vanilla JS to make the transition less daunting.

## Why use jQuery instead of Javascript?

First and foremost, jQuery provides excellent cross-browser compatibility. In the past different browsers were prone to using their own unique implementations of javascript. This caused plenty of headaches in the web development industry as each browser's quirks needed to be taken into account when authoring javascript.

![jQuery: Write Less, Do More](https://drupal.org/files/images/OQAAAI1PPrJY0nBALB7mkvju3mkQXqLmzMhxEjeb4gp8aujEUQcLfLyy-Sn4gZdkAas6-k8eYbQlGDE-GCjKfF5gIrUA15jOjFfLRv77VBd5t-WfZURdP9V3PdmT.png)

As we near the end of 2013, however, this has become less the case as our industry has demanded better standards compliance from the various browser vendors. While front-end developers do still need to factor compatibility into their work, the problems that jQuery solves are disappearing. Take a look at this page outlining support for the [DOM Core API on Quirksmode](http://www.quirksmode.org/dom/core/). Just about everything has full support as of IE9, and so there really isn't much of a reason to choose jQuery over vanilla JS (for compatibility reasons) unless you absolutely _have_ to support IE8 or lower ([which you soon shouldn't have to!](http://zurb.com/article/1265/ie8-is-going-the-way-of-the-dodo-so-why-s)).

jQuery boasts being lightweight, which is relatively true: minified and gzipped it weighs in at just about 32kb. However, that 32kb is still an added HTTP request that brings its own weight to the table. Imagine you're developing locally, and all of your JavaScripts rely on jQuery. If you choose to pull jQuery in via a CDN (which I usually do), then you are at the mercy of both that CDN and your own internet connection. A forward thinking dev probably has a copy of jQuery saved locally somewhere to work with, but in the rare case that you have no internet connection, you're pretty much SOL.

Still not convinced? Fair enough. jQuery is a fantastic library, and is a great abstraction to many of the common interactions that JavaScript is used for in the browser. There are literally thousands of plugins that would be worthless without it, and odds are you don't want to roll your own using vanilla JS. If I have convinced you to at least _attempt_ to distance yourself from a jQuery <strike>addiction</strike> <strike>dependency</strike> reliance, then read on for some techniques to get you started.

## Making the switch to plain Javascript

### .querySelector

For the longest time, the DOM API was unbearable. However, the years have been good to the API, and we are no longer limited to simply `document.getElementById(..)`. Instead, we are given a whole suite of new selector functions - not the least of which is `.querySelector`.

`.querySelector()` functions very similarly to jQuery's standard `$()`. It can be called on a DOM element, or the document as a whole, and returns the first element it finds that matches the querystring parameter. Even better, query syntax mimics that of CSS (you can even use CSS3 selectors!) Finally, if you want to grab all elements from the DOM that match your query, just use `.querySelectorAll`. Here is an example:

{% highlight javascript linenos %}
(function(){

    // Get a single element by its ID
    var elemByID = document.querySelector('#uniqueID');

    // Get a list of all elements with the class "link"
    var elemsByClass = document.querySelectorAll('.link');

}())
{% endhighlight %}

There are a few things to keep in mind when using these functions however: note that you even though CSS3 selectors are supported, pseudo-element selectors will return null. Also, when you can get by with using `document.getElementById(..)`, you should. It is faster and has much deeper browser support. Only use the new querySelector syntax when you need to.

### Simpler Events

jQuery does a great job of simplifying the process of adding events to DOM elements. With it, you can be as specific as `$('#elem').click(function(){..})`
, or simply use `$('#elem').bind('action', function(){..});`. If you're like me and come from a more programming-focused background, you might be more comfortable with EcmaScript's `.addEventListener(event, eventHandler)` syntax.</p>

{% highlight javascript linenos %}
var div = document.querySelector('.clickable');

var div_clickHandler = function(){
  div.innerHTML = (div.innerHTML == "1") ? "0" : "1";
};

div.addEventListener("click", div_clickHandler);
{% endhighlight %}

I personally find this to be a bit easier to read and keep track of. While the abstractions that jQuery provides can be very useful, I find that they quickly lead to difficult to read spaghetti code.

### .getBoundingClientRect()

If you choose to forego using jQuery, you are also going to have to write a good amount of custom animation code. I've found that this is much easier with `elem.getBoundingClientRect()`. This function returns a [rectangle](https://developer.mozilla.org/en-US/docs/XPCOM_Interface_Reference/nsIDOMClientRect) object that makes creating animations a breeze.

## Putting it all together

Lets take everything we've learned so far, and create a simple javascript animation. I won't walk through everything a second time, but you should be able to follow this pen.

{% highlight javascript linenos %}
var boxOne = document.querySelector('#boxOne');
var boxTwo = document.querySelector('#boxTwo');

var timeout;
var button = document.querySelector('#toggleBtn');

var MOVING_IN = true;

var animate = function(){
  var boxOneRect = boxOne.getBoundingClientRect();
  var boxTwoRect = boxTwo.getBoundingClientRect();

  if (boxOneRect.right == boxTwoRect.left)
    MOVING_IN = false;

  if ((boxTwoRect.left - boxOneRect.right) > 200)
    MOVING_IN = true;

  if (MOVING_IN)
  {
    boxOne.style.left = (boxOneRect.left + 1) + "px";
    boxTwo.style.left = (boxTwoRect.left - 1) + "px";
  }
  else
  {
    boxOne.style.left = (boxOneRect.left - 1) + "px";
    boxTwo.style.left = (boxTwoRect.left + 1) + "px";
  }

  console.log(boxOne.style.left);
  timeout = window.setTimeout(animate, 10);
}

var toggleBtn_clickHandler = function(){
  if (button.class == "on") //Turn Off
  {
    button.class = "off";
    button.innerHTML = "Start Animation";
    window.clearTimeout(timeout);
  }
  else //Turn On
  {
    button.class = "on";
    button.innerHTML = "Stop Animation";
    animate();
  }
};

button.addEventListener('click', toggleBtn_clickHandler);
{% endhighlight %}

See the Pen [xJEqi](http://codepen.io/JordanForeman/pen/xJEqi) by Jordan Foreman ([@JordanForeman](http://codepen.io/JordanForeman)) on [CodePen](http://codepen.io)

And look at that! No jQuery - except for that used by Codepen :p - to make that linear animation. I hope this post has been helpful, and if I can clear anything up please let me know in the comments!