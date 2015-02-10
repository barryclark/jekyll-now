---
layout: post
title: Personal Learning Portfolio Setup
tags: jekyll
---

![jekyll logo](https://dl.dropboxusercontent.com/u/259275/blog/images/jekyll-logo-transparent.png)

This website was created for the purpose of building my Personal Learning Portfolio. This project runs on [Jekyll](http://jekyllrb.com/) and hosted on [Github Pages](https://pages.github.com/).

The initial idea was to host this project on my [DigitalOcean droplet](http://www.muranddesign.com/) using [htmly](https://www.htmly.com/) (*a small flat file blogging service*), but after some short research I found that to combat security holes they recently added a [reCAPTCHA service to the admin login interface](https://www.htmly.com/2014/12/htmly-version-24-security) (not too encouraging about their security measures) to add to the fact that the password is stored by default in plain text. 

Thus, I turned towards static site generators. I took a look at [Egg Freckles](http://eggfreckles.net/) as I know Thomas Brand uses one. I discovered that, he used [PieCrust](http://bolt80.com/piecrust/), which didn't seem too appealing to me (*there were warnings of limited functionality on the project page*). However, this made me remember Jekyll which I did have previous knowledge of. (both use John Grubers [Markdown](http://daringfireball.net/projects/markdown/) for the syntax which suits me just fine - this I have used before in conjunction with the [Ghost blogging platform](https://ghost.org/) and htmly). 

The fact that Jekyll is *blog-aware* and works on Github Pages is a huge plus as well. Since [Barry Clark](http://www.barryclark.co/) has created an easy install via his [Jekyll Now](https://github.com/barryclark/jekyll-now) theme the installation only took a minute and I got up and running.

The fun thing about Jekyll is that the initial setup is not exactly how I'd like it to be - thus modifying it is necessary and the only way to do that is via learning the system and coding, best.