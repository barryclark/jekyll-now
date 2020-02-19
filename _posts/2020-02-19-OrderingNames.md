---
layout: post
title: Ordering names
#date: # 2017-09-12 13:32:20 +0300
description: Using javscript to order lists # You’ll find this post in your `_posts` directory. Go ahead and edit it and re-build the site to see your changes. # Add post description (optional)
img: ordering.png # Add image post (optional)
fig-caption: # Add figcaption (optional)
tags: [Javascript, FileReader, Events]
jquery: true
script: ordering.js
---

This is a sample block to read a list of names, order them and also create a random ordered list. The code even allows to drag and drop files into the text area for easier manipulation of long lists, and also to avoid storing any data on our server - because there is no need to do it.

The working area is next and [below](#description-of-the-code) that is the description of the code

<label for="names">Enter a list of names:</label>

<textarea id="names" rows="10" cols="50" placeholder="Enter each name in a line"></textarea>

<button class="ui-button ui-widget ui-corner-all" id='order'>Go</button>

<div class="grid-container">
<div class="grid-input" >
<h4>Ordered</h4>
</div>
<div class="grid-input" >
<h4>Randomized</h4>
</div>

<div class="grid-text" id="ordered">
</div>
<div class="grid-text" id="random">
</div>
</div>

### Description of the code

Javascript file in [github](https://github.com/FrSanchez/frsanchez.github.io/blob/master/assets/js/ordering.js)

To read the names, the code takes the contents of the textarea and puts it into an array line by line to be able to manipulate it. JQuery makes it easy by using the textarea locator, retrieving the value and the using split() by newline, then sorting is native in javascript for an array:

{% highlight javascript %}
var names = $('#names').val().split("\n");
names.sort();
{% endhighlight %}

Javascript provides a pseudo-random number generator that produces number in the range (0, 1). For the case presented here we need an integer number in the range [0, names.length] for that we can write a simple function to take an upper boundary and produce a pseudo-random integer in that range:

{% highlight javascript %}
random = function(bound) {
  return Math.floor(Math.random() * bound);
}
{% endhighlight %}

To be able to generate a random list, the code needs to iterate through the whole list of names and randomly select a new position for every entry:

{% highlight javascript %}
for(i = 0; i < names.length; i++) {
  var dest = random(names.length);
  if (dest != i) {
    var t = names[dest];
    names[dest] = names[i];
    names[i] = t;
  }
}
{% endhighlight %}

### Handling files
To be able to manipulate files, the browser will generate events related to drag and drop, for which the program needs to handle *dragOver*, *dragEnter*, and *drop*. Within the drop handler, the program can instantiate the HTML5 FileReader object, that will read the local file. The reader works on events to avoid blocking the main (and only) thread executing the script. Within the handler of the reader, I load the contents of the file into the textarea using JQuery $.text() method.

{% highlight javascript %}
var reader = new FileReader();
reader.addEventListener("load", function () {
    var fileText = reader.result;
    $('#names').text(fileText);
}, false);
reader.readAsText(file);
{% endhighlight %}

## Conclusion

Reading a file is now part HTML5, array manipulation is done easily with javascript, and that includes the sort method, as well as a pseudo-random number generator. Javascript provides also handling of the DOM but in this case I opted for JQuery which in my opinion is easier to read.
