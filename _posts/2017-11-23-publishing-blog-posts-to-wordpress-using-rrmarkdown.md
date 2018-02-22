---
layout: post
title: Publishing blog posts to Wordpress using R/RMarkdown
date: 2017-11-23 03:11
comments: true
categories: [General, Technical Stuff]
img: images\wp-updates.png
excerpt: When I was getting this blog setup, I decided I needed to make creating new posts as easy as possible. I want to use my daily commute (which is about 1.5 hours each day) to create new content, and in order to make the barrier as small as possible it started looking into the options for posting from some kind of notebook format.
---
When I was getting this blog setup, I decided I needed to make creating new posts as easy as possible. I want to use my daily commute (which is about 1.5 hours each day) to create new content, and in order to make the barrier as small as possible it started looking into the options for posting from some kind of notebook format.

After a lot of researching the options, looking into the available libraries, trying things out, I arrived at the combination of **Wordpress**, **R Markdown**, and the awesome **RWordpress** library.

> For those just interested in the code, the github repository for RWordpress can be found [here](https://github.com/duncantl/RWordPress), and the script I use for posting my articles is on my github [here](https://github.com/dorianbrown/blog_posts/blob/master/publish_post.R).

So how can you use RWordpress to make your life easier? To start things off you need to install a few libraries from github.

```r
install.packages("devtools")
library(devtools)

install_github("duncantl/XMLRPC")
install_github("duncantl/RWordPress")
install.packages("knitr")

library(XMLRPC)
library(RWordPress)
library(knitr)
```

Next step, write your blog post. I'm sure most of you are familiar with the 
RMarkdown format, but if not it's basically a superset of standard markdown, which allows the execution of code within the document (check out the [docs](http://rmarkdown.rstudio.com/")). Once you've got your draft ready, you can preview it with the preview/knit button in Rstudio.

So, you've finished your post and you're eager to share it with the world. Running this R script will do the trick:

```r
pw <- readLines(file("../data/wp_password.txt"))
options(WordpressLogin = c(dsbrown = pw),
        WordpressURL = "http://www.findingsignal.xyz/xmlrpc.php")

rmd_file <- args$file
# Post thumbnail
opts_knit$set(upload.fun = function(file){library(RWordPress);uploadFile(file)$url;})

knit2wp(rmd_file, 
        title = args$title,
        categories = cat,
        publish = TRUE)
```

And just like that, your article is live on Wordpress and visible to all your readers! The script is available [here](https://github.com/dorianbrown/blog_posts/blob/master/publish_post.R), and I hope this will make blogging easier for some of you. 

Happy posting!
