---
layout: post
title: The Elusive Custom GitHub 404 Page
tags: [javascript, github]
---

So you want a custom 404 page for your project page, or just any subdirectory? Well, according the GitHub help page, ["you must use a custom domain."](https://help.github.com/articles/custom-404-pages/)

It's a much desired thing. [Google "github custom 404"](https://www.google.com/search?q=github+custom+404) and you'll very likely come accross [this discussion](http://stackoverflow.com/questions/14908512/how-can-i-set-the-customer-404-page-on-gh-pages). Everyone says you can't.

But I beg to differ. In fact, I did it. All you need is a simple redirect JavaScript on your normal 404 page.

Here's how I did it:

1. Create your normal 404 per the [GitHub guide](https://help.github.com/articles/custom-404-pages/).
2. Create your custom 404 page wherever you want it to be. I have one in my `tags/` subfolder.
3. Add the following script to your normal 404 page:
{% highlight javascript %}
    var url = window.location.href;
    
    var isTagSubdirectory = url.search("http://hendrixjoseph.github.io/tags");
    
    if (isTagSubdirectory > -1) {
      window.location.replace("http://hendrixjoseph.github.io/tags/404.html");
    }
{% endhighlight %}

Obviously, chang the URLs to match where you want it to go. And you could use `if...else if...else if` etc. to have multiple 404s.

Enjoy!

<h2>Update!</h2>

To make multiple (more than two) 404's easier, I updated the code to look like the following:

{% highlight javascript %}
    var url = window.location.href;
    
    var subDirs = [
                    "{{ site.url }}/tags"
                ];
                
    for (i = 0; i < subDirs.length; i++) {
        subDir = subDirs[i];
        
        var isTagSubdirectory = url.search(subDir);
        
        if (isTagSubdirectory > -1) {
            window.location.replace(subDir.concat("/404.html"));
        }
    }
{% endhighlight %}

Just put all the subDirs in the JavaScript array subDirs. Careful! Make sure you make the custom 404 page, otherwords you might end up with endless forwards. Also, if you have too many custom 404's, this script might slow down. Perhaps sort subDirs manually and use a binary search instead of the simple for loop?
