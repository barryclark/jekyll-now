---
layout: post
title: Why do I love Bayesian Inference
---

Over the last few years I've been working mostly in Bayesian Inference. In my daily job, in fact, I often work with large and sparse datasets. In such context, I've came to realize, most of the popular algorithms (i.e. gradient boosting, deep learning, etc) fail. Fortunately, one succeed. Such framework is called Bayesian Inference.

Bayesian Inference is a framework that let you build a generative model which represents the world, or a very simple approximation of it, and updates the expectation as soon as new data is collected. This is very interesting. For instance, let's say your working in biology and are trying to infer the area of a leaf based on some characteristics of the tree. Let's say you know the type of tree, it's age, the height, etc. In a classic Machine Learning context, you might simply pass some data to an estimator (i.e. linear regression) and hope the algorithm will be able to tell apart which are the meaningful features from those that are not.

Unfortunately, we are going to lose a very important piece of information, which is the scientist prior knowledge. You could argue the scientist could embbed his knowledge through feature engineering, but this is only a very indirect way of doing it. In addition to that, very few scientists know how to build features that enpower the algorithm, and often generate hundred of features mechanically in the hope one of such features will be relevant, and improve the performance of the estimator.

On the other hand, geometry tought us something. The area of a parallelogram is `A = b * h`. If we knew the length and width of a leaf, we might immediately an estimate of the max area. This could then be improved adding some additional features, like the type of tree, it's exposure to light, etc...

In Bayesian inference you could model something like that in a very easy to interpret way.

$$
\begin{align*}
    y_i &~ Normal(area_i, \sigma) \\
    area_i &= maxarea_i + \beta x_i \\
    maxarea_i &= lenght_i * base_i \\
\end{align*}
$$

How elegant is that? In the first line of this system of equations we defined the likelihood. We are saying that $y_i$, the observed area of the leaf $i$, is normally distributed around a mean $area_i$, with standard error $\signa_i$. $area_i$ is defined as the linear combination of $maxarea_i$ plus some other stuff. In the third line, we baked into the model the geometry knowledge we mentioned before.



I must admit, I'm deeply in love with Bayesian Inference. After reading books lieke `Statistical Rethinking` and `Bayesian Data Analysis`, it's hard not to be fashinated with what you can do.  


# Generative model
# Separate inference from modeling 
# Introduce prior knowledge into the model in a clear way
# Little data vs Big Data





Next you can update your site name, avatar and other options using the _config.yml file in the root of your repository (shown below).

![_config.yml]({{ site.baseurl }}/images/config.png)

The easiest way to make your first post is to edit this one. Go into /_posts/ and update the Hello World markdown file. For more instructions head over to the [Jekyll Now repository](https://github.com/barryclark/jekyll-now) on GitHub.
