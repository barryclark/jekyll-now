---
layout: post
title: Setting up the blog 🎉
---

Location: Yangon  
Welcome to my very first post!  
So what did I just do? ကျနော်ဘာလုပ်မိလိုက်ပါလိမ့်။

Here is a simple instruction on how to create a blog like this. (Just in case if I forget how I built this. lol.) 
* Go to <https://www.github.com> and register an account
* Create your first repository and name it yourname.github.io
  * It will create a [Github Page](https://pages.github.com/) with above URL
  * Add an HTML file and make some changes
* Create another repository 
  * Name it **something**
  * Now go to repo Setting >> under Github Pages >> change Source to master branch
  * After a while, you can see the content in **something** repo at yourname.github.io/something
* In my case, what I did was, I just forked [jekyll-now](https://github.com/barryclark/jekyll-now) and renamed it to [blog](https://github.com/sawthinkar/blog). 
  * What is [Jekyll](https://jekyllrb.com/)? Jekyll is a simple, blog-aware, static site generator

note: make sure you don't have any folder with the name **something** under former repo; yourname.github.io 

## Images
### Profile Photo
* My profile photo is hosted on Amazon S3 with a size of 140 x 140 px. In the future, I might probably be hosting all my photos there. I will need to read more about it. 

### Quora icon
* The Quora icon next to the Youtube icon is not showing up, but you can ... (Nevermind, it appears now. Like after several minutes.)
  * I downloaded this [Quora logo](https://goo.gl/images/EeXytb) which is a png. 
  * I use this [converter](https://image.online-convert.com/convert-to-svg) or [this](https://convertio.co/png-svg/) to convert it to SVG. 
  * Then in the SVG file, I changed width to 31.100000pt, height to 31.100000pt, and color to [#AA2200][1]. 
  * Change SVG to base64 [here](https://www.base64-image.de/).
  * You might want to read this [09: SVG with Data URIs][2]

## Notes
* In 2015, I guess, it was my first attempt to follow this [tutorial](http://jmcglone.com/guides/github-pages/) to create something similar but failed. <http://hankquinlan.github.io/blog/>

## More to read

#### Jekyll and Github Pages

* [Github Pages Basics](https://help.github.com/categories/github-pages-basics/)
* [How does Jekyll work?](https://www.bytesandwich.com/jekyll/software/blogging/2016/09/14/how-does-jekyll-work.html)
* [How does a static site generator like Jekyll work?](https://www.quora.com/How-does-a-static-site-generator-like-Jekyll-work)
* [Build A Blog With Jekyll And GitHub Pages](https://www.smashingmagazine.com/2014/08/build-blog-jekyll-github-pages/)

#### Github and Git

* [Configuring a publishing source for GitHub Pages](https://help.github.com/articles/configuring-a-publishing-source-for-github-pages/)
* [Proper Git commit messages](https://chris.beams.io/posts/git-commit/)
* [Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet#images)

#### Alternatives to Github Pages

* [Example: Setting up a Static Website Using a Custom Domain](https://docs.aws.amazon.com/AmazonS3/latest/dev/website-hosting-custom-domain-walkthrough.html#website-hosting-custom-domain-walkthrough-domain-registry)
* [Hosting on Gitlab.com with GitLab Pages](https://about.gitlab.com/2016/04/07/gitlab-pages-setup/)

[1]: https://www.quora.com/What-HEX-color-does-Quora-use-for-its-logo
[2]: https://css-tricks.com/lodge/svg/09-svg-data-uris/

<!-- ![_config.yml]({{ site.baseurl }}/images/config.png) -->
Just a photo taken at Yathae Pyan Cave, Hpa-An, Karen State of Myanmar:  
![alt text](https://s3-ap-southeast-1.amazonaws.com/cdn.sawthinkar/YathaePyanCave.JPG "Yathae Pyan Cave")