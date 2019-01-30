
# Rho's Data Science Blog 

This repo hosts Rho's public data science posts and awesome underlying [Jekyll Now](https://github.com/barryclark/jekyll-now) engine.

# Creating a Post

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
