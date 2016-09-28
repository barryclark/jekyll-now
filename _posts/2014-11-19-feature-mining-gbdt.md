---
published: true
layout: post
title:  "利用GBDT模型构造新特征"
date:   2014-11-19 17:17
categories: machine_learning feature_engineering feature_learning
---

实际问题中，可直接用于机器学习模型的特征往往并不多。能否从“混乱”的原始log中挖掘到有用的特征，将会决定机器学习模型效果的好坏。引用下面一句流行的话：

> 特征决定了所有算法效果的上限，而不同的算法只是离这个上限的距离不同而已。

本文中我将介绍[Facebook][fb]最近发表的利用GBDT模型构造新特征的方法[^fbgbdt]。

论文的思想很简单，就是先用已有特征训练GBDT模型，然后利用GBDT模型学习到的树来构造新特征，最后把这些新特征加入原有特征一起训练模型。构造的新特征向量是取值0/1的，向量的每个元素对应于GBDT模型中树的叶子结点。当一个样本点通过某棵树最终落在这棵树的一个叶子结点上，那么在新特征向量中这个叶子结点对应的元素值为1，而这棵树的其他叶子结点对应的元素值为0。新特征向量的长度等于GBDT模型里所有树包含的叶子结点数之和。

举例说明。下面的图中的两棵树是GBDT学习到的，第一棵树有3个叶子结点，而第二棵树有2个叶子节点。对于一个输入样本点x，如果它在第一棵树最后落在其中的第二个叶子结点，而在第二棵树里最后落在其中的第一个叶子结点。那么通过GBDT获得的新特征向量为[0, 1, 0, 1, 0]，其中向量中的前三位对应第一棵树的3个叶子结点，后两位对应第二棵树的2个叶子结点。

![Facebook GBDT][fb_gbdt]

那么，GBDT中需要多少棵树能达到效果最好呢？具体数字显然是依赖于你的应用以及你拥有的数据量。一般数据量较少时，树太多会导致过拟合。在作者的应用中，大概500棵左右效果就基本不改进了。另外，作者在建GBDT时也会对每棵树的叶子结点数做约束——不多于12个叶子结点。

下面是这种方法在我们世纪佳缘的一个概率预测问题上的实际效果。我们只使用了30棵树。第一个图是只使用原始特征的结果，第二个图是原始特征加GBDT新特征的结果。图中横坐标表示预测概率值，纵坐标表示真实概率值。所以预测的点越靠近$$y=x$$这条参考线越好。显然，使用了GBDT构造的新特征后，模型的预测效果好不少。

![仅使用原始特征][jy_no_gbdt]
![原始特征加GBDT新特征][jy_have_gbdt]


对了，已经有人利用这种方法赢得了Kaggle一个CTR预估比赛的冠军，代码可见<https://github.com/guestwalk/kaggle-2014-criteo>，里面有这种方法的具体实现。


[fb_gbdt]: /images/fb_gbdt1.png "GBDT离散法"
[jy_no_gbdt]: /images/jiayuan_no_gbdt1.png "仅使用原始特征"
[jy_have_gbdt]: /images/jiayuan_have_gbdt1.png "原始特征加GBDT新特征"

[fb]: http://www.facebook.com "Facebook"


# References

[^esl]: Trevor Hastie et al. [The Elements of Statistical Learning](http://statweb.stanford.edu/~tibs/ElemStatLearn/), 2001.
[^fhash]: Kilian Weinberger et al. Feature Hashing for Large Scale Multitask Learning, 2010.
[^fbgbdt]: Xinran He et al. Practical Lessons from Predicting Clicks on Ads at Facebook, 2014.
