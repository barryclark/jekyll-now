---
layout: post
title: New Commenting System - StaticMan
tags: [technology, web, github]
keywords: [facebook comments, static blog comments, static blog, jekyll comments, github comments, github pages comments, comments, staticman]
---

Out with the old, and in with the new.

I had previously used the Facebook commenting system for my blog (and [my dog-oriented blog](http://www.puppy-snuggles.com/)), but I didn't like it for a couple reasons. One, it required a Facebook account to use, even though almost everyone has a Facebook (well, not anymore, it seems the younger crowd isn't interested in Facebook). Two, I've seemed to lose comments as the Facebook API versions increase (for instance, I had a number of interesting comments [this Java programming post](http://hendrixjoseph.github.io/four_java_limitations_you_may_never_encounter/) that just... vanished). Three, and this is more a benefit to the commenters, is that the Facebook comments provided little value in the way of backlinks. Essentially, I had little control over the comments and no way to back them up.

Why was I using Facebook comments? Well, this blog is a Jekyll blog - a static blog hosted on Github Pages (hence the github.io part of the URL) with essentially no backend - neither PHP nor Wordpress - so I didn't have a database to store them or even a system to process them. Essentially I'm limited to using third-party systems.

I've searched before, but recently I decided to search again. If you're curious, the Google search I used was "[best comment system for static blogs](https://www.google.com/search?q=best+comment+system+for+static+blogs)." That search led me to a year-old blog post entitled "[Going Static: Episode II — Attack of the Comments](https://mademistakes.com/articles/jekyll-static-comments/)" which discussed a new(ish) service called [Staticman](https://staticman.net/) that would accomplish what I want.

To use Staticman, I have to add [the Staticman app](https://github.com/staticmanapp) as a contributor to [this blog's repository on Github](https://github.com/hendrixjoseph/hendrixjoseph.github.io). When someone makes a comment on a post, it sends a POST request with the required information to the Staticman API, which then makes a [pull request](https://github.com/hendrixjoseph/hendrixjoseph.github.io/pulls) with the new comment. From there I either approve or deny the pull request, which will either post or delete the comment. I could have it auto-post the comment, but I want to filter out spam.

There is one potential drawback to this - adding Staticman as a contributor to the blog's repository. I don't think the app will get hacked (it's not a big target) or that it would do anything malicious, to begin with. In either case, it's a contributor, not the owner of the blog repository, so I could easily just deny access. Staticman is [FOSS](https://en.wikipedia.org/wiki/Free_and_open-source_software), so I could also host my own instance of Staticman. I'm just too lazy.

Hey, comment below to see it work! Just remember it won't show right away as I currently need to approve comments.