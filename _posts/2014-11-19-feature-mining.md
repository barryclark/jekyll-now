---
published: false
layout: post
title:  "特征挖掘（Feature Mining）"
date:   2014-11-19 17:17
categories: machine_learning feature_engineering feature_learning
---

实际问题中，可直接用于机器学习模型的特征往往并不多。能否从“混乱”的原始log中挖掘到有用的特征，将会决定机器学习模型效果的好坏。引用下面一句流行的话：

> 特征决定了效果的上限，而不同的算法只是离这个上限的距离不同而已。

本文中我介绍一些挖掘（构造）特征的方法。

#使用GBDT构造特征

接下来我们介绍下[Facebook][fb]最近发表的利用**GBDT**模型来构造特征的方法[^fbgbdt]。

这篇文章最核心的贡献是提出了把GBDT模型学习到的树作为附加特征，加入原有特征一起训练模型。比如下面的图中的两棵树是GBDT学习到的，第一棵树有3个叶子结点，而第二棵树有2个叶子节点。如果一个样本x过来，它在第一棵树最后落在其中的第二个叶子结点，而在第二棵树里最后落在其中的第一个叶子结点，那么通过GBDT获得的特征为[0, 1, 0, 1, 0]。这种方法最终获得的特征数量等于所有数叶子结点的总数量。

![Facebook GBDT][fb_gbdt]

问题来了，GBDT中需要多少棵树能达到效果最好呢？具体数字显然是依赖于你的应用以及你拥有的数据量。一般数据量较少时，树太多会导致过拟合。在作者的应用中，大概500棵左右效果基本不改进了。另外，作者在建GBDT时也会对每棵树的叶子结点数做约束——不多于12个叶子结点。


[fb_gbdt]: /images/fb_gbdt.png "GBDT离散法"

[fb]: http://www.facebook.com "Facebook"


#References

[^esl]: Trevor Hastie et al. [The Elements of Statistical Learning](http://statweb.stanford.edu/~tibs/ElemStatLearn/), 2001.
[^fhash]: Kilian Weinberger et al. Feature Hashing for Large Scale Multitask Learning, 2010.
[^fbgbdt]: Xinran He et al. Practical Lessons from Predicting Clicks on Ads at Facebook, 2014.
