---
layout: post
title: Hello World!
published: true
---

Hello World!

I've started publishing a website, something that I've toyed around with doing for quite a while now. With this, I'll be documenting projects that I work on for posterity and hopefully others will get some use out of it. I've had lots of little things that I've done over the years that I forget the steps for, so even though I've figured it out once I have to learn it all over again if I want to duplicate or improve it.

Naturally, the first project that I document will be this site itself! I've split the site into two parts, projects and the blog.  I envision the projects section having polished, "timeless" documentation on how I did my project, while the blog section, in addition to regular bloggy things, can show the chronology and meandering paths and decisions that I took to accomplish it.

For this site, I had the general idea that I wanted to author in the [Markdown](https://daringfireball.net/projects/markdown/syntax#overview) format since it's easy to add formatting to text without it getting in your way (don't have to open and close a lot of tags) and it converts to HTML and [other formats](http://pandoc.org/) easily. Another idea was that I wanted to be able to be able to easily keep a copy of my content so that I could easily move between hosting providers and content management systems if one did not meet my needs.

I tried the [Ghost](https://ghost.org/) platform by spinning up a quick [Sandstorm](https://sandstorm.io/) instance. Sandstorm is nice because it runs each application inside a container, and you can easily export and save the container as a simple backup. Then to move providers, you just install sandstorm and restore. I like a lot of the features and preview capabilities of Ghost, but it still largely traps your content behind the CMS.

I thought I could do better, but at this point I probably could have stuck with Ghost and had a passable solution that met most of my needs.  It can export your content in JSON, so if I needed to migrate I could make my own migration tool.

I was still interested in minimizing my maintenance needs, so I tossed Ghost by the wayside. The idea of a static site generator was top of mind: you keep flat markdown files and then generate your website using a script. This site can then be hosted anywhere, be it S3, 1&1 shared hosting, or a dedicated server just by copying the files it outputs. This means that it's easy to use version control tools that I love, and I should be able to change tools to generate the site easily since my source files are flat.

I toyed with the idea of using Pandoc to generate sites from templates using a perl script. Generating the individual blog and project pages is easy to do, but keeping front pages up to date requires some extra work. The script would need to parse the metadata (date, title, tags, etc.) as well as the content for a preview, sort the posts, maintain tag pages... It's not insurmountable by any means but it would have been more effort than it was worth just to start publishing. Despite that, I started in on the task to see how far I could get in a reasonably amount of time.  It's tempting to re-invent a wheel that you can understand.

Enter [Jekyll](https://jekyllrb.com/).  I ran across it while looking at other blogs for design ideas for a template.  Jekyll is a static site generator that is dead easy to use.  Just author a Markdown file in the posts folder and you're off. With [Jekyll Now](http://www.jekyllnow.com/) you can get started in a minute, just fork their github repository, rename your site to your github page url (_username_.github.io), and make a commit. Bam, your site is live. You could just make a new site locally with Jekyll and push the commit, but I like their default theme better than the base Jekyll theme and the social media icons are helpful and included.

Jekyll ticks all of my boxes:
* I can run it forever by staying with the same version (in a VM at worst) on my local system and push the site files to arbitrary hosting
* It's practically designed to work with Git version control, so it's easy to keep a history and back up of my whole site
* It generates from flat files with metadata embedded at the top of each post, so porting to another platform is trivial

So ended my quest for the solution to my site.  It was trivial to customize and add a second category for projects and generate the index page for, and I was off to the races.  See the [project](/projects/Jekyll-Blog/) page for the rest of the implementation details.
