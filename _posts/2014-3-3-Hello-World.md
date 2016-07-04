---
layout: post
title: GitHub-Pages 101
---

Using [github-pages](https://pages.github.com/) has many benefits. But setting it up can be painful for some configurations(at least for me). So, I'll be walking you through the setup. We'll be using a [docker](https://www.docker.com/) image to test our [jekyll](https://jekyllrb.com/) site locally.

### LET'S DO THIS

1. #### Fork a starting point

   Fork [jekyll-now](https://github.com/barryclark/jekyll-now). Rename the forked repository to `yourusername.github.io`. Your website should be live immediately at `http://yourusername.github.io`. Don't worry if it isn't, the next step will force it to be built.

2. #### Customize your site

   You can now change your website’s name, description, avatar and other options by editing the _config.yml file. These custom variables have been set up for convenience and are pulled into your theme when your website gets built.

   Making a change to `_config.yml` (or any file in your repository) will force GitHub Pages to rebuild your website with Jekyll. The rebuilt website will be viewable a few seconds later at `http://yourusername.github.io`. If your website wasn’t live immediately after step 1, it will be after this step.

   Go ahead and customize your website by updating the variables in your _config.yml file and then committing the changes.



Using the [jekyll-now](https://www.smashingmagazine.com/2014/08/build-blog-jekyll-github-pages/) repo made it way easier. Been trying to make `github-pages` work locally for the past 2 hours. So frustrating.
