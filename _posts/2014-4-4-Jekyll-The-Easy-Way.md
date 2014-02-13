---
layout: post
title: Jekyll The Easy Way
---

I just migrated my blog over to this Jekyll powered static site that you're currently reading. Finding a good workflow with Jekyll took me longer than I expected. 

When you understand how Jekyll works, it's _extremely_ fast to set up. However when learning I came across lot of articles, repos and stack overflow threads that made the setup much more complicated than it needs to be. 

![cool code image aww yea](/images/omg-code.jpg)   

### Jekyll is built for one specific purpose

Tom Preston Warner of Github build Jekyll to [[INSERT HERE EXCERT FROM TPW's blog]]

This also the way that Jekyll was built to be used! 

It was built for one purpose. To make blogging on Github Pages extremely quick and easy. 

If you want more than a simple blog hosted on Github Pages, don't use Jekyll! Sure, it can be used for other things too. But if you try to use them for those, you're probably going to have a bad time. 

### Use your named account on Github Pages (barryclark.github.io)

This eliminates the need for a seperate gh-pages branch workflow, making things really simple!

You just commit your Jekyll layout files and your markdown blog posts and content to the master branch of your barryclark.github.io, and Github Pages AUTOMATICALLY compiles it. 

Fun fact: Github Pages processes ALL files through Jekyll. You mostly just don't notice this if you're using Github Pages for static content as flat .html content just passes through and doesn't get compiled. 

If you wanted to, you wouldn't actually ever hard to install or run jekyll locally. You could just push up to your barryclark.github.io and everything would be taken care of for you. 

That is awesome. And that's the first way that Jekyll is supposed to be used. 

### Don't use plugins

Github Pages builds Jekyll sites in "safe mode". This means that when compiling your site, Github Pages won't run any of your plugins, it'll only use the standard Jekyll build. If you want to use plugins to

That means you can't compile SASS, etc, etc. 

Using plugins means that you can't use your Github Pages account. There are other ways to do this. But they add lots of extra complexity. 

### Pre-process css/js yourself

Use a guard or grunt script while you're theming. Don't try to do it within the jekyll build process. 

You should be using grunt anyway. 

Then just push the .css and .js and Jekyll will have no problems with it. No need to install jekyll-asset-manager, which has a whole host of complications with it. 

### Have a workflow for blogging, and a separate workflow for theming

Updating content is CRAZY easy... and that's the whole point of Jekyll. You just write a markdown post and commit it to the repo, and you're done. Amazing. 

2 of the simplest theming workflows I found:

- Build your site statically and theme that. 
- 

Don't try to mix things in to the jekyll build process. It's not worth it, and you likely won't be able to use that workflow on barryclark.github.io

### To get started, fork a good repo

Following all of the about tips, you'll have a much easier time setting up Jekyll... and hell, if you want to do some fancy things, add them in later. 

There are a number of repos that already follow the rules above. Forking one of them will put you on the right tracks, and save you a TON of time. You'll be able to get up and running extremely quickly.

Give a list of my favorite repos to fork. 

- Tom Preston Warner
- Zach Holman

I've also shared my base theme repo, which abides by each of the things I've covered in this post. It includes grunt scripts to do your pre-processing, and the same layout as you see here on this blog, with easy options for customization. 

- Mine (Jekyllstrap? Jekyll-base?) :>

### Forking Jekyllstrap

Give instructions on exactly how to fork the repo. Step through each step to have your Jekyll site running on your name.com domain name. 

1. Fork
2. Write your CSS
3. 

I should create this, and fork my own repo. 

