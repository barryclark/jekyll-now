---
layout: post
title:  "How to install Jekyll!"
date:   2016-01-08 20:22:50 -0800
categories: jekyll
permalink: /how-to-install-jekyll/

---

<-- [Previous](/about-jekyll-and-github/) --- [Next](/getting-started-with-jekyll/) -->

<b>Install Jekyll for `Windows`:</b> don't know about it, j/k. Jekyll is really made for Mac, but <a href="http://jekyll-windows.juthilo.com/" target="_blank">Try this guy.

<b>Install Jekyll for `Mac`:</b> It's not as simple as Jekyll claims. It may work out on a perfect system, but who has that? I have an old (2013) `macbook pro` and I had to jump through some hoops to get it to work. Try this first: (hint - copy everything after a `$` and paste it into Terminal and press Return. You can find the Terminal app in Applications/utilities.)


Quick-start Instructions:
{% highlight ruby %}

~ $ gem install jekyll

~ $ jekyll new my-awesome-site

~ $ cd my-awesome-site

~ $ jekyll serve

# => Now browse to http://localhost:4000
{% endhighlight %}  

Now, that probably didn't work. If it did, great! Let's get started building our Jekyll site. If you ran into problems (file permissions, write permissions, etc...) try my solution below:

{% highlight ruby %}
Update Mac OS
Update Xcode
Run Xcode (agree to service)
quit xcode
$ sudo gem install -n /usr/local/bin jekyll
if you need command line tools use: $ xcode-select --install

$ jekyll new my-awesome-site
$ cd my-awesome-site
$ jekyll serve

# => Now browse to http://localhost:4000

{% endhighlight %}

`if you change the _config.yml file: $ jekyll serve`

If you {% highlight ruby %}
run into some troubles: and def need_a_break(watchTV)
{% endhighlight %}

http://example.com


<center><iframe width="640" height="480" src="https://www.youtube.com/embed/kvGQPrnQYhk" frameborder="0" allowfullscreen></iframe></center>

Colons can be used to align columns.

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |


The outer pipes pipes are optional, and you don't need to make the raw Markdown line up prettily. You can also use inline Markdown.


  Markdown |   Less |   Pretty
----- | ----- | -----
*Still* | `renders` | **nicely**
1 | 2 | 3

<br>

---

<br>

> This is a very long line that will still be quoted properly when it wraps. Oh boy let's keep writing to make sure this is long enough to actually wrap for everyone. Oh, you can *put* **Markdown** into a blockquote. 

You’ll find this post in your `_posts` directory. Go ahead and edit it and re-build the site to see your changes. You can rebuild the site in many different ways, but the most common way is to run `jekyll serve`, which launches a web server and auto-regenerates your site when a file is updated.

To add new posts, simply add a file in the `_posts` directory that follows the convention `YYYY-MM-DD-name-of-post.ext` and includes the necessary front matter. Take a look at the source for this post to get an idea about how it works.

Jekyll also offers powerful support for code snippets:

{% highlight ruby %}
def print_hi(name)
  puts "Hi, #{name}"
end
print_hi('Tom')
#=> prints 'Hi, Tom' to STDOUT.
{% endhighlight %}

Check out the [Jekyll docs][jekyll-docs] for more info on how to get the most out of Jekyll. File all bugs/feature requests at [Jekyll’s GitHub repo][jekyll-gh]. If you have questions, you can ask them on [Jekyll Talk][jekyll-talk].

[jekyll-docs]: http://jekyllrb.com/docs/home
[jekyll-gh]:   https://github.com/jekyll/jekyll
[jekyll-talk]: https://talk.jekyllrb.com/

<-- [Previous](/about-jekyll-and-github/) --- [Next](/getting-started-with-jekyll/) -->
