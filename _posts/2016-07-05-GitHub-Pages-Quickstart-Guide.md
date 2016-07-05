---
layout: post
title: GitHub-Pages Quickstart Guide
---

Using [github-pages](https://pages.github.com/) has many benefits. But setting it up can be painful for some configurations(at least for me). So, I'll be walking you through the setup. We'll be using a [docker](https://www.docker.com/) image to test our [jekyll](https://jekyllrb.com/) site locally.


### BEFORE WE START

+ #### What you need to know:

   `git, github, markdown, docker`

+ #### What you *don't* need to know:

   `ruby`

>**NOTE**: This blog post is meant to outline the process. If you feel like I missed a step, you can refer to the [jekyll-now](https://www.smashingmagazine.com/2014/08/build-blog-jekyll-github-pages/) blog post. The only difference is how I set up my local environment.


### LET'S DO THIS

1. #### Fork a starting point

   Fork [jekyll-now](https://github.com/barryclark/jekyll-now). Rename the forked repository to `yourusername.github.io`. Your website should be live immediately at `http://yourusername.github.io`. Don't worry if it isn't, the next step will force it to be built.

2. #### Customize your site

   You can now change your website’s name, description, avatar and other options by editing the _config.yml file. These custom variables have been set up for convenience and are pulled into your theme when your website gets built.

   Making a change to `_config.yml` (or any file in your repository) will force GitHub Pages to rebuild your website with Jekyll. The rebuilt website will be viewable a few seconds later at `http://yourusername.github.io`. If your website wasn’t live immediately after step 1, it will be after this step.

3. #### Publish your first blog post

   Your website is now customized, live and looking good. You just have to publish your first blog post:

   1. Edit `/_posts/2014-3-3-Hello-World.md`, deleting the placeholder content and entering your own. If you need a quick primer on writing in Markdown, check out [Adam Pritchard’s cheat sheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet).

   2. Change the file name to include today’s date and the title of your post. Jekyll requires posts to be named `year-month-day-title.md`.

   3. Update the title at the top of the Markdown file. Those variables at the top of the blog post are called front matter, which we’ll dig into a little later. In this case, they specify which layout to use and the title of the blog post. [Additional front-matter variables](http://jekyllrb.com/docs/frontmatter/) exist, such as permalink, tags and category.
   Go ahead and customize your website by updating the variables in your _config.yml file and then committing the changes.

4. #### Building your website locally

   So far we've used GitHub-Pages to build our website. But you may need to build it locally. To save the effort of configuring it, we'll use [docker](https://www.docker.com/).

   Follow the instructions provided at the [repo page](https://hub.docker.com/r/starefossen/github-pages/).

And we're done.
