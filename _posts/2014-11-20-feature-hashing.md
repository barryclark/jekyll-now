---
published: false
layout: post
title:  "特征哈希（Feature Hashing）"
date:   2014-11-20 21:41
categories: machine_learning feature_engineering feature_learning
---

在[特征处理（Feature Processing）][fproc]中我介绍了利用笛卡尔乘积的方法来构造组合特征。这种方法虽然简单，但麻烦的是会使得特征数量爆炸式增长。比如一个可以取N个不同值的类别特征，与一个可以去M个不同值的类别特征做笛卡尔乘积，就能构造出N\*M个组合特征。 

特征太多这个问题在具有*个性化*的问题里尤为突出。如果*把用户id看成一个类别特征*，那么它可以取的值的数量就等于用户数。把这个用户id特征与其他特征做笛卡尔积，就能产生庞大的特征集。做广告算法的公司经常宣传自己模型里有几十上百亿的特征，基本都是这个搞出来的。

当然，特征数量多的问题自古有之，目前也已经有很多用于降维的方法。比如聚类、PCA等都是常用的降维方法[^esl]。但这类方法在特征量和样本量很多的时候本身就计算量很大，所以对大问题也基本无能为力。

本文介绍一种很简单的降维方法——**特征哈希（Feature Hashing）**法[^fhash] [^fhash2]。

特征哈希的好处：

* 可以添加新的原始特征而保持hashing后的特征长度不变；
* 可以保持原始特征的稀疏性，既然hashing时只考虑非0原始特征；
* 可以只hashing其中的一部分原始特征，而保留另一部分原始特征（如那些出现collision就会很影响精度的重要特征）；
* 很适合有个性化的应用，因为此时要加入用户id的话会导致原始特征数量变为 (用户数+1)*特征数；
* The result is increased speed and reduced memory usage, at the expense of inspectability;



[fb_gbdt]: /images/fb_gbdt1.png "GBDT离散法"
[jy_no_gbdt]: /images/jiayuan_no_gbdt1.png "仅使用原始特征"
[jy_have_gbdt]: /images/jiayuan_have_gbdt1.png "原始特征加GBDT新特征"

[fproc]: ../../../2014/11/15/breezedeus-feature-processing.html "特征处理（Feature Processing）"
[fb]: http://www.facebook.com "Facebook"


#References

[^fhash]: Kilian Weinberger et al. Feature Hashing for Large Scale Multitask Learning, 2010.
[^fhash2]: Joshua Attenberg et al. Collaborative Email-Spam Filtering with the Hashing-Trick, 2009.

[^esl]: Trevor Hastie et al. [The Elements of Statistical Learning](http://statweb.stanford.edu/~tibs/ElemStatLearn/), 2001.

