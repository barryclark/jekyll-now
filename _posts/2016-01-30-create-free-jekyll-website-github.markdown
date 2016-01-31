---
layout: post
title:  "Create Free Jekyll Static Website on Github"
date:   2016-01-30 01:22:48 -0800
categories: jekyll
permalink: /create-free-jekyll-website-on-github/

---

This site is built on `Jekyll` and is hosted for free on `Github`. Why? Because I got tired of my Wordpress sites getting hacked, out of date, and otherwise obsolete. What is Jekyll? This is the main post that will direct you how to create, edit and host your Jekyll website on Github for free!

Jekyll is an `opensource`, blog aware, static site generator. Installing Jekyll allows you to locally create a website from text files using `Markdown` or `Textile` or `HTML` and the program compiles a complete static HTML website suitable for your favorite host or FREE on Github. No database to manage. No CMS to constantly update. No data breech or hosting malfunctions. It's perfect for a blog or how-to site, but not so great for anything that requires dynamic content. That would require a database. Jekyll is super fast, super simple, super clean and represents the way forward in web-development.

--------------------

Do the following if you want to install Jekyll on your local machine.

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

<center><iframe width="640" height="480" src="https://www.youtube.com/embed/kvGQPrnQYhk" frameborder="0" allowfullscreen></iframe></center>

-----------------------------

1. Create github account
2. Install Github for Desktop

-----------------------------

display posts in a category:

<p>Posts in category "basic" are:</p>

<ul>
  {% for post in site.categories.basic %}
    {% if post.url %}
        <li><a href="{{ post.url }}">{{ post.title }}</a></li>
    {% endif %}
  {% endfor %}
</ul>


create username.github.io
in github.com click save to computer button
replace local file with jekyll pages (don't replace .git or .gitignore)?
commit
sync