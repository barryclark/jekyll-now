---
layout: post
title: Switching from Medium.com to GitHub Pages
---



![time](/images/timeheader.jpg)

I've gone hacker!

Well, *sort of.* 

I have been on [Medium.com](https://medium.com/) for quite awhile. When I first signed up for it it was a breath of fresh air. A beautiful and easy to read content platform that encouraged sharing. I was in love. 

As a restless creative type I started getting sick of it for many reasons. One of the main ones simply being that I couldn't tweak it and make it my own.

I also didn't like that I couldn't really control things that affect SEO and usability. I also like to mess with things and I wanted my website to be a sort of "test bed" for new projects and ideas. You can't really do that on Medium. 

Enter GitHub Pages. 

GitHub pages is a free service offered by GitHub that allows you to host a static website. 

What? 

You might ask. But, this is a blog! 

You're right. It is. It is a static blog. I am using Jeckyll to take markdown in GitHub and turn it into static HTML. This means the website is lightning quick and accessible. 

It was a bit of a learning curve to get to this point. I had to learn how to use GitHub for one (a very usefull skill!) and learn how the themeing works, posting, markdown etc. 

I built the site using the lazy way: I forked a blog that's already built. You can find the repository [here.](https://github.com/barryclark/jekyll-now). 

I then went on the fun journey of learning to edit the thing and tweak it to what I wanted. This included figuring out how to add pagination (only 5 posts will show on my home page and you have "next" and "previous" for other posts), installing bootstrap, fixing a million things in the css and more. 

The next step was my domain name. Setting up a custom domain with GitHub pages isn't too hard, it's just a few clicks. You can find out more [here.](https://help.github.com/articles/using-a-custom-domain-with-github-pages/)

The problem is SSL won't work properly. It'll show up as the wrong certificate giving your users a big red error. To get around this I used Cloudflare. You can find a post on getting it up and running [here.](https://blog.cloudflare.com/secure-and-fast-github-pages-with-cloudflare/) I also get all the other added benefits of using Cloudflare including caching and protection. 

As an fyi if you don't want to use Cloudflare the only way to use ssl is if you either have your own domain or your domain host can use ANAME or flattened CNAME. 

In the end I've hacked together what I think is an easy to read, good looking website that I can edit from anywhere and is free! 

If you prefer the design of my site over the original I forked, the repository is [here.](https://github.com/kolemcrae/kolemcrae.github.io)








