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

<b>1. Install Jekyll for `Mac`:</b> It's not as simple as Jekyll claims. It may work out on a perfect system, but who has that? I have an old (2013) `macbook pro` and I had to jump through some hoops to get it to work. Try this first: (hint - copy everything after a `$` and paste it into Terminal and press Return. You can find the Terminal app in Applications/utilities.)


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

<b>2. Publish to Web using free Github Pages account:</b>


a. Create github account (<a href="https://github.com">https://github.com</a>)<br>
b. Fork <a href="https://github.com/howtoguy/howtoguy">howtoguy</a> to your account. Click the fork button (upper right) and it will ask where. Click your github account.<br>
c. navigage to "howtoguy", click "settings" and rename to "Yourusername.github.io"<br>
d. navigate to "yourusername.github.io" in a broswer. You should see "Hello World" in your new site.<br> 
e. Install Github for Desktop (<a href="https://desktop.github.com">https://desktop.github.com</a>)<br>
f. make sure you’re logged into github in github desktop (prefs/accounts) and clone repo to desktop (button on right in your github repo on github.com that looks like this: <img src="/junk/clone.png")
g. open all your files in <a href="https://www.sublimetext.com">Sublime Text</a><br>
h. edit _config.yml: this tells your site what to do and how to be.

{% highlight ruby %}
# My Site settings (for example)
title: howtoguy.tv
email: glen@howtoguy.tv
description: > # this means to ignore newlines until "baseurl:"
  Howtoguy knows everything. Howtoguy can teach you how to do anything. Need to know how to test and replace a condensor on a '77 Kawasaki 650 motorcycle or build a wordpress website? Howtoguy has you covered.
baseurl: "" # the subpath of your site, e.g. /blog
url: "http://howtoguy.tv" # the base hostname & protocol for your site
twitter_username: fotozfotoz
github_username:  howtoguy
port: 4001
Build settings: markdown: kramdown
{% endhighlight %}

Port: 4001 needs some explanation: the default when you installed Jekyll locally was port 4000 and you access it with localhost:4000. This is a new install. Change this to Port:4001 and access with localhost:4001. Now you have two separate sites.

When you save _config.yml you must `$ jekyll serve` again in terminal because this file is the only one that doesn't get automatically updated when you save.

i. make changes to other files and save<br>
j. commit changes in github desktop adding any comments<br>
k. sync in github desktop to publish to "yourusername.gihub.io"<br>
l. to work on it locally change config.yml (port: 4001 —> localhost:4001)<br>
13. drag folder into terminal<br>
14. `$ jekyll serve`<br>
15. open `localhost:4001` in your browser<br>

-----------------------------

If you're away from your local install and want to make changes, go to your github account, push edit on the file you want and save. Changes are reflected immediately. When you get back to your local machine open github desktop, open "username.github.io" and push sync. Changes you made on the web will reflect in your local directory. Now you can make changes there without any conflicts. Go back to git desktop, commit changes, and sync.

{% highlight ruby %}
# Some Other Goodies

display posts in a category:

<p>Posts in category "basic" are:</p>

<ul>
  {% for post in site.categories.basic %}
    {% if post.url %}
        <li><a href="{{ post.url }}">{{ post.title }}</a></li>
    {% endif %}
  {% endfor %}
</ul>
{% endhighlight %}

