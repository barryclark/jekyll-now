---
layout: post
title: Markdown Style Guide
---

A demo of all styled markdown elements in Jekyll Boilerplate. 

This is a paragraph, it's surrounded by whitespace. Next up are some headers, they're heavily influenced by GitHub's markdown style.

## Header 2 (H1 is reserved for post titles)##
### Header 3 ###
#### Header 4 ####
##### Header 5 #####
 
A link to [Jekyll Boilerplate](http://github.com/barryclark/jekyll-boilerplate/). A big ass literal link <http://github.com/barryclark/jekyll-boilerplate/>
  
An image, located within /images

![an image alt text](/images/omg-code.jpg "an image title")

* A bulletted list
- alternative syntax 1
+ alternative syntax 2
  - an indented list item

1. An
2. ordered
3. list

Inline markup styles: 

- _italics_
- **bold**
- `code()` 
 
> Blockquote
>> Nested Blockquote 
 
Syntax highlighting can be used by wrapping your code in a liquid tag like so:

{{ "{% highlight javascript " }}%}  
/* Some pointless Javascript */
var rawr = ["r", "a", "w", "r"];
{{ "{% endhighlight " }}%}  

creates...

{% highlight javascript %}
 
/* Some pointless Javascript */
var rawr = ["r", "a", "w", "r"];

{% endhighlight %}
 
Use two trailing spaces  
on the right  
to create linebreak tags  
 
Finally, horizontal lines
 
----
****

Enjoy!