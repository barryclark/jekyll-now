---
published: false
layout: post
title:  "特征工程（Feature Engineering）"
date:   2014-11-15 18:30
categories: machine_learning feature_engineering feature_learning
---




## 离散化续篇

在上节中我已经介绍了一些常用的离散化单个连续特征的方法，其中一个是*画图观察趋势*。画图观察趋势的好处是直观、可解释性强，坏处是很麻烦。当要离散化的特征很多时，这种方法可操作性较差。

机器学习中有个很好解释，速度也不错的模型——**决策树模型**。大白话说决策树模型就是一大堆的`if else`。它天生就可以对连续特征分段，所以把它用于离散化连续特征合情合理。我称这种方法为**决策树离散化**方法。

决策树离散化方法通常也是每次离散化一个连续特征，做法如下：

> 单独用此特征和目标值$$y$$训练一个决策树模型，然后把训练获得的模型内的特征分割点作为离散化的离散点。

这种方法当然也可以同时离散化多个连续特征，但是操作起来就更复杂了，实际用的不多。

接下来我们再介绍下[Facebook][fb]最近发表的利用**GBDT**模型来处理特征的方法[^fbgbdt]。

![Facebook GBDT][fb_gbdt]



### 使用决策树来抽取特征

[img_ori]: /images/nonlinear_function1.png "样本点"
[img_equal_dist]: /images/nonlinear_function2.png "等距离散离散法"
[img_equal_size]: /images/nonlinear_function3.png "等样本点离散离散法"
[img_watch]: /images/nonlinear_function4.png "画图观察趋势离散法"
[fb_gbdt]: /images/fb_gbdt.png "GBDT离散法"

[fb]: http://www.facebook.com "Facebook"


# References

[^esl]: Trevor Hastie et al, [The Elements of Statistical Learning](http://statweb.stanford.edu/~tibs/ElemStatLearn/), 2001.
[^fhash]: Kilian Weinberger et al, Feature Hashing for Large Scale Multitask Learning, 2010.
[^fbgbdt]: Xinran He et al, Practical Lessons from Predicting Clicks on Ads at Facebook, 2014



# 归一化：
  * 有些模型/优化
  * 方法的效果会强烈地依赖于特征是否归一化，如LogisticReg，SVM，NeuralNetwork，SGD等。
  * 有些模型则不受归一化影响，如DecisionTree。
  * 0/1取值的特征通常不需要归一化，归一化会破坏它的稀疏性


# 离散化：
 4. 单独用此特征和目标值来训练一个决策树，依据决策树的各节点的划分方法来离散化此特征
  * 特征离散化时不一定要保留所有的取值段对应的特征，可以通过特征选择或者领域知识去掉其中的一部分（经常是头部或尾部）
  * facebook用gbdt抽取特征
  * feature hashing：
    * 可以添加新的原始特征而保持hashing后的特征长度不变
    * 可以保持原始特征的稀疏性，既然hashing时只考虑非0原始特征
    * 可以只hashing其中的一部分原始特征，而保留另一部分原始特征（如那些出现collision就会很影响精度的重要特征）
    * 很适合有个性化的应用，因为此时要加入用户id的话会导致原始特征数量变为 (用户数+1)*特征数
    * The result is increased speed and reduced memory usage, at the expense of inspectability;
    * Paper: Feature Hashing for Large Scale Multitask Learning


# 特征抽取：
  * 尽可能人为删除特征里的非线性性，不要期待模型自己能很好地自动处理非线性性
  * 间接特征：通过其他模型抽取的特征
    * 如可以利用LDA的聚类结果作为特征
    * 用户画像
    * Predicting Positive and Negative Links in Online Social Networks
    * 如果有时间概念，一般临近时间内的用户行为会较像，可以考虑把前几天的用户行为作为特征
