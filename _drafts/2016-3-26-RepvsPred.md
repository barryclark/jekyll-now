---
layout: post
title: Representation vs Prediction
---

So, if predictive learning is commonly supervised (regression and classification) and representation learning is commonly unsupervised (clustering and data visualsations), what would _unsupervised predictive learning_ or _supervised representation learning_ look like?

Firstly, lets go through some basic definitons.

* Predictive learning is when, given the past, you want to guess what the future will be like. (Extrapolations from known data)
* Representation learning is when you want to extract some underlying structure and/or patterns from your data. (Links and relationships between known data points)

Interestingly, both require internal models of their environments.

##### Supervised representation learning

Given that we want (Italy) + (Capital) = (Rome), or (royal) + (daughter) = (princess), ...

Word2vec already manages to caputre some of these relations. But would a supervised model be better?

In my opinion, we do this a lot. The 'supervision' that these nets get is more at a meta level where the researchers designing the learner supervise the sorts of relation they think is important

##### Unsupervised predictive learning

This is really the ultimate goal. To have a system that we can just place in an environment, where it can gather data, and it eventually learns to predict its environment

*****

Inspired by Roger Grosse's [post](https://hips.seas.harvard.edu/blog/2013/02/04/predictive-learning-vs-representation-learning/) on the HIPS blog.
