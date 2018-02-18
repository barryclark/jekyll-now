---
layout: post
title: Publishing blog posts to Wordpress using R/RMarkdown
date: 2017-11-23 03:11
author: dsbrown
comments: true
categories: [General, Technical Stuff]
---
<p>When I was getting this blog setup, I decided I needed to make creating new posts as easy as possible. I want to use my daily commute (which is about 1.5 hours each day) to create new content, and in order to make the barrier as small as possible it started looking into the options for posting from some kind of notebook format.</p>

<p>After a lot of researching the options, looking into the available libraries, trying things out, I arrived at the combination of <strong>Wordpress</strong>, <strong>R Markdown</strong>, and the awesome <strong>RWordpress</strong> library.</p>

<blockquote>
<p>For those just interested in the code, the github repository for RWordpress can be found <a href="https://github.com/duncantl/RWordPress">here</a>, and the script I use for posting my articles is on my github <a href="https://github.com/dorianbrown/blog_posts/blob/master/publish_post.R">here</a>.</p>
</blockquote>

<p>So how can you use RWordpress to make your life easier? To start things off you need to install a few libraries from github.</p>

<pre><code class="r">install.packages(&quot;devtools&quot;)
library(devtools)

install_github(&quot;duncantl/XMLRPC&quot;)
install_github(&quot;duncantl/RWordPress&quot;)
install.packages(&quot;knitr&quot;)

library(XMLRPC)
library(RWordPress)
library(knitr)
</code></pre>

<p>Next step, write your blog post. I&#39;m sure most of you are familiar with the 
RMarkdown format, but if not it&#39;s basically a superset of standard markdown, which allows the execution of code within the document (check out the <a href="http://rmarkdown.rstudio.com/">docs</a>). Once you&#39;ve go your draft ready, you can preview it with the preview/knit button in Rstudio. </p>

<p>So, you&#39;ve finished your post and you&#39;re eager to share it with the world. Running this R script will do the trick:</p>

<pre><code class="r">pw &lt;- readLines(file(&#39;../data/wp_password.txt&#39;))
options(WordpressLogin = c(dsbrown = pw),
        WordpressURL = &#39;http://www.findingsignal.xyz/xmlrpc.php&#39;)

rmd_file &lt;- args$file
# Post thumbnail
opts_knit$set(upload.fun = function(file){library(RWordPress);uploadFile(file)$url;})

knit2wp(rmd_file, 
        title = args$title,
        categories = cat,
        publish = TRUE)
</code></pre>

<p>And just like that, your article is live on Wordpress and visible to all your readers! The script is available <a href="https://github.com/dorianbrown/blog_posts/blob/master/publish_post.R">here</a>, and I hope this will make blogging easier for some of you.</p> 

<p>Happy posting!</p>
