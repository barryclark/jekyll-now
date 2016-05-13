---
layout: post
title: Assigning after dplyr
date: May 13, 2016
tags: [programming, R]
permalink: assigning-after-dplyr
---

Hadley Wickham's [dplyr](https://github.com/hadley/dplyr) and [tidyr](https://github.com/hadley/tidyr) packages completely changed the way I do data manipulation/munging in R. These packages make it possible to write shorter, faster, more legible, easier-to-intepret code to accomplish the sorts of manipulations that you have to do with practically any real-world data analysis. The legibility and interpretability benefits come from

* using functions that are simple verbs that do exactly what they say (e.g., `filter`, `summarize`, `group_by`)
* chaining multiple operations together, through the pipe operator `%>%` from the [magrittr](https://cran.r-project.org/web/packages/magrittr/vignettes/magrittr.html) package. 

Chaining is particularly nice because it makes the code read like a story. For example, here's the code to calculate sample means for the baseline covariates in little experimental dataset I've been working with recently:


{% highlight r %}
library(dplyr)
# dat <- read.csv("http://jepusto.github.io/data/Mineo_2009_data.csv")
dat <- read.csv("../data/Mineo_2009_data.csv")
{% endhighlight %}



{% highlight text %}
## Warning in file(file, "rt"): cannot open file '../data/
## Mineo_2009_data.csv': No such file or directory
{% endhighlight %}



{% highlight text %}
## Error in file(file, "rt"): cannot open the connection
{% endhighlight %}



{% highlight r %}
dat %>%
  group_by(Condition) %>%
  select(Age, starts_with("Baseline")) %>%
  summarise_each(funs(mean)) ->
  baseline_means
{% endhighlight %}

Each line of the code is a different action: first group the data by `Condition`, then select the relevant variables, then summarise each of the variables with its sample mean in each group. The results are stored in a dataset called `baseline_means`.

In writing code like this, I've adopted the style of using the backwards assignment operator (`->`) to store the results of a chain of manipulations. This is perhaps a little bit odd---in all the rest of my code I stick with the forward assignment operator (`<-`) with the object name on the left---but the alternative is to break the "flow" of the story, effectively putting the punchline before the end of the joke. Consider: 


{% highlight r %}
baseline_means <- dat %>%
  group_by(Condition) %>%
  select(Age, starts_with("Baseline")) %>%
  summarise_each(funs(mean))
{% endhighlight %}

That's just confusing to me. So fine, backward assignment operator it is. The only problem with this convention is that, with complicated chains of manipulations, I often find that I need to tweak the order of the verbs in the chain. For example, I might want to summarize _all_ of the variables, and only then select which ones to store: 


{% highlight r %}
dat %>%
  group_by(Condition) %>%
  summarise_each(funs(mean)) %>%
  select(Age, starts_with("Baseline")) ->
  baseline_means
{% endhighlight %}

In revising the code, it's necessary to change the symbols at the end of the second and third steps, which is a minor hassle. It's possible to do it by very carefully cutting-and-pasting the end of the second step through everything but the `->` after the third step, but that's a delicate operation, prone to error if you're programming after hours or after a beer. Wouldn't it be nice if every step in the chain ended with `%>%` so that you could move around whole lines of code without worrying about the bit at the end?

### Assigning as a verb

Here's one crude way to end each line of manipulation with a pipe:


{% highlight r %}
dat %>%
  group_by(Condition) %>%
  select(Age, starts_with("Baseline")) %>%
  summarise_each(funs(mean)) %>%
  identity() -> baseline_means
{% endhighlight %}

But this is still pretty ugly---it's got an extra function call that's not a verb, and the name of the resulting object is tucked away in the middle of a line. What I need is a verb to take the results of a chain of operations and assign to an object. Base R has a suitable candidate here: the `assign` function. How about the following? 


{% highlight r %}
dat %>%
  group_by(Condition) %>%
  select(Age, starts_with("Baseline")) %>%
  summarise_each(funs(mean)) %>%
  assign("baseline_means_new", .)

exists("baseline_means_new")
{% endhighlight %}



{% highlight text %}
## [1] FALSE
{% endhighlight %}

This doesn't work because of some subtlety with the environment into which `baseline_means_new` is assigned. A brute-force fix would be to specify that the assign should be into the global environment. This will probably work 90%+ of the time, but it's still not terribly elegant. Here's a function that searches the call stack to find the most recent invocation of itself that does not involve non-standard evaluation, then assigns to its parent environment:


{% highlight r %}
put <- function(x, name, where = NULL) {
  if (is.null(where)) {
    sys_calls <- sys.calls()
    put_calls <- grepl("\\<put\\(", sys_calls) & !grepl("\\<put\\(\\.",sys_calls)
    where <- sys.frame(max(which(put_calls)) - 1)
  }
  assign(name, value = x, pos = where)
}
{% endhighlight %}

Here are my quick tests that this function is assigning to the right environment:


{% highlight r %}
put(dat, "dat1")
dat %>% put("dat2")

f <- function(dat, name) {
  put(dat, "dat3")
  dat %>% put("dat4")
  put(dat, name)
  c(exists("dat3"), exists("dat4"), exists(name))
}

f(dat,"dat5")
{% endhighlight %}



{% highlight text %}
## [1] TRUE TRUE TRUE
{% endhighlight %}



{% highlight r %}
grep("dat",ls(), value = TRUE)
{% endhighlight %}



{% highlight text %}
## [1] "dat1"     "dat2"     "date"     "dateline"
{% endhighlight %}

This appears to work even if you've got multiple nested calls to `put`:


{% highlight r %}
put(f(dat, "dat6"), "dat7")
grep("dat",ls(), value = TRUE)
{% endhighlight %}



{% highlight text %}
## [1] "dat1"     "dat2"     "dat7"     "date"     "dateline"
{% endhighlight %}



{% highlight r %}
dat7
{% endhighlight %}



{% highlight text %}
## [1] TRUE TRUE TRUE
{% endhighlight %}

To be consistent with the style of dplyr, I'll tweak the function to allow `name` to be the unquoted object name: 


{% highlight r %}
put <- function(x, name, where = NULL) {
  name_string <- deparse(substitute(name))
  if (is.null(where)) {
    sys_calls <- sys.calls()
    put_calls <- grepl("\\<put\\(", sys_calls) & !grepl("\\<put\\(\\.",sys_calls)
    where <- sys.frame(max(which(put_calls)) - 1)
  }
  assign(name_string, value = x, pos = where)
}
{% endhighlight %}

### It works! (I think...)

Returning to my original chain of manipulations, here's how it looks with the new function:


{% highlight r %}
dat %>%
  group_by(Condition) %>%
  select(Age, starts_with("Baseline")) %>%
  summarise_each(funs(mean)) %>%
  put(baseline_means_new)

print(baseline_means_new)
{% endhighlight %}



{% highlight text %}
## Source: local data frame [3 x 4]
## 
##   Condition      Age Baseline.Gaze Baseline.Vocalizations
## 1   OtherVR 122.4286      91.92857               2.857143
## 2   SelfVid 121.3571     102.42857               1.857143
## 3    SelfVR 139.1429      95.50000               1.428571
{% endhighlight %}

If you've been following along, let me know what you think of this. Is it a good idea, or is it dangerous? Are there cases where this will break? Can you think of a better name?
