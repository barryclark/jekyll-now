---
layout: post
title: Moving blog to static site generator
tags: jekyll blog github-page Software Wyam
---
I previously maintained a blog, which was hosted on Github and consisted of raw html and css files. Obviously, this method is rather tiresome and difficult to maintain consistency across the site.

I then branched off into trying to setup the blog with ASP.net MVC and then ASP.Net core Razor pages. Both of those options are massive overkill for a static blog, so enthusiasm kinda died. The other problem with a fully fledged ASP.NET site was hosting the website and the associated cost.

Enter static website generators, which are a more appropriate tool for the job. One of the most popular is Github's Jekyll, but I dont speak Ruby.. So, I decided to try Wyam instead, which is a static content generator written in c#, which supports Razor syntax or Github style Markdown. The other attraction is that the wyam documentation provides instructions for configuring a pipeline so that pushing to your github repo triggers a build which then modifies your github hosted site. The hope is that this will make it super easy to update the blog more regularly.

Unfortunately, there were a number of teething problems, as documented here and here. I also needed to update the Path variable used by powershell and cmder, something which I had not done before, but which was explained nicely here.

Frustrated, I then decided to give Jekyll a try. After a bit of research, I found a [great starting point for Jekyll](https://github.com/barryclark/jekyll-now)

If you're reading this, then I guess that I managed to get everything running!
