
# Rho's Data Science Blog 

## Overview 

This repo hosts Rho's public data science posts and awesome underlying [Jekyll Now](https://github.com/barryclark/jekyll-now) engine.

## Creating a Post

A follow these steps to create a new post entirely in the github user interface. This [nice article](https://www.smashingmagazine.com/2014/08/build-blog-jekyll-github-pages/) provides a lot more detail. 

  1. Navigate to the [posts folder](https://github.com/RhoInc/blog/tree/master/_posts)
  2. Click the "Create a new file" button 
  3. Name your new file using the following convention: "YYYY-MM-DD-Blog-Post-Title.md"
  4. Add the following header to the file: 

```
---
layout: post
title: Blog Post Title
---
```

5. Write your post using [markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet#images).  
6. Click "Create a new branch for this commit and start a pull request", and give the PR an informative name
7. Click Propose File change to save your post
8. Open the PR you just created and request a review (Ryan or Jeremy can do it unless you've got someone specific in mind). 
9. Once the reviewer approves the PR, click merge to master. 
10. Do a final QC to make sure the post looks good on https://rhoinc.github.io/blog/

You can also create a post locally and then send it to github following [these steps](https://github.com/barryclark/jekyll-now#local-development).

## FAQ

#### Q: How do I add an image to a post?

Upload your image to the `/images` folder in the repo using the drag and drop interface in github, or command line), and then add the following to your post: ` <img src="{{ site.baseurl }}/images/myImage.png"/> `. The `{{ site.baseurl }}` bit is using [Jekyll's liquid templating language](https://jekyllrb.com/docs/step-by-step/02-liquid/) and is required to make the image render correctly on the live website, **but** it breaks the images in the "preview" section of the editor. As such, you might want to add the curly brace bit at the end so that you can be sure the preview looks good. 

#### Q: How do I add an interactive graphic?

Make a stand-alone example page and link to it. Also consider adding a screenshot to the blog post. Ask Jeremy or Ryan if you're not sure where the example should live (Hint: Strongly consider hosting the example page along with the core library used to create it). 
