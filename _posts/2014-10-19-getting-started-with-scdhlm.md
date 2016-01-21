---
layout: post
title: Getting started with scdhlm
date: October 19, 2014
---

Here are step-by-step instructions on how to download and install the scdhlm package for R. You'll need to have a [copy of R installed](http://cran.us.r-project.org/). There are two ways to do the installation: from the pre-compiled Windows binary available on [my website]({{site.url}}/software) or from the source code on Github. I describe each approach in turn.

### Option 1A: From my website, for Windows

Type the following sequence of commands at the R prompt:


{% highlight r %}
download.file("http://jepusto.github.io/files/software/scdhlm_0.2.1.zip", 
  destfile="./scdhlm_0.2.1.zip")
install.packages("scdhlm_0.2.1.zip", repo = NULL)
library(scdhlm)
{% endhighlight %}

### Option 1B: From my website, for Mac

Type the following sequence of commands at the R prompt:


{% highlight r %}
download.file("http://jepusto.github.io/files/software/scdhlm_0.2.1.tar.gz", 
  destfile="./scdhlm_0.2.1.tar.gz")
install.packages("scdhlm_0.2.1.tar.gz", repo = NULL, type = "source")
library(scdhlm)
{% endhighlight %}

### Option 2: Via Github

For this option, you will first need to install the devtools package:

{% highlight r %}
install.packages("devtools")
{% endhighlight %}
Once you have successfully installed this package, type the following:

{% highlight r %}
library(devtools)
install_github(repo = "scdhlm", username = "jepusto")
library(scdhlm)
{% endhighlight %}

### Further instructions

You'll only need to do the installation once. Once you've got the package installed, type the following in order to access the package within an R session: `library(scdhlm)`. 

To open the package documentation, type `package?scdhlm`. To access the documentation for an individual function in this package, just type `?` followed by the name of the function. For instance, one of the main functions in the package is called `g_REML`; to access its documentation, type `?g_REML`.
