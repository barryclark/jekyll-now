---
published: true
layout: post
title:  "特征哈希（Feature Hashing）"
date:   2014-11-20 21:41
categories: machine_learning feature_engineering feature_learning dimensionality_reduction
---

在[特征处理（Feature Processing）][fproc]中我介绍了利用笛卡尔乘积的方法来构造组合特征。这种方法虽然简单，但麻烦的是会使得特征数量爆炸式增长。比如一个可以取N个不同值的类别特征，与一个可以去M个不同值的类别特征做笛卡尔乘积，就能构造出N\*M个组合特征。 

特征太多这个问题在具有*个性化*的问题里尤为突出。如果*把用户id看成一个类别特征*，那么它可以取的值的数量就等于用户数。把这个用户id特征与其他特征做笛卡尔积，就能产生庞大的特征集。做广告算法的公司经常宣称自己模型里有几十上百亿的特征，基本都是这么搞出来的。

当然，特征数量多的问题自古有之，目前也已经有很多用于降维的方法。比如聚类、PCA等都是常用的降维方法[^esl]。但这类方法在特征量和样本量很多的时候本身就计算量很大，所以对大问题也基本无能为力。

本文介绍一种很简单的降维方法——**特征哈希（Feature Hashing）**法[^fhash] [^fhash2]。

>特征哈希法的目标是把原始的高维特征向量压缩成较低维特征向量，且尽量不损失原始特征的表达能力。


记哈希前的特征向量为$x \in \sf{R}^N$。我们要把这个原始的N维特征向量压缩成M维（M < N）。
记$h(n): \\{1, ..., N\\} \rightarrow \\{1, ..., M\\} $为一个选定的均匀哈希函数，而$\xi(n): \\{1, ..., N\\} \rightarrow \\{-1, 1\\}$为另一个选定的均匀哈希函数。$h(n)$和$\xi(n)$是独立选取的，它们没关系。按下面方式计算哈希后的M维新特征向量$\phi \in \sf{R}^M$的第$i$个元素值（$\phi$是依赖于$x$的，所以有时候也把$\phi$写成$\phi(x)$）：

$$
\phi_i = \sum_{j:\ h(j)=i} \xi(j) \ x_j \ \ \text{。}
$$

可以证明，按上面的方式生成的新特征$\phi$在概率意义下保留了原始特征空间的内积，以及距离[^fhash]：

$$
\begin{eqnarray}
	x^T x' &\approx& \phi^T \phi' \ \ \text{，} \\
	\parallel x - x' \parallel &\approx& \parallel \phi - \phi' \parallel \ \ \text{，}
\end{eqnarray}
$$

其中$x$和$x'$为两个原始特征向量，而$\phi$和$\phi'$为对应的哈希后的特征向量。

利用上面的哈希方法把$x$转变成$\phi$后，就可以直接把$\phi$用于机器学习算法了。这就是利用特征哈希法来降低特征数量的整个过程。需要说的是，这里面的两个哈希函数$h$和$\xi$并不要求非要是把整数哈希成整数，其实它们只要能把原始特征均匀哈希到新特征向量上就行。例如在NLP里，每个特征代表一个单词，那么只要保证$h$和$\xi$把单词均匀哈希到$\\{1, ..., M\\}$和$\\{-1, 1\\}$就行。

下面具体说明如何把特征哈希法应用于**多任务学习（multitask learning）**问题。所谓多任务学习，就是同时求解多个问题。个性化问题就是一种典型的多任务学习问题，它同时学习多个用户的兴趣偏好。

在世纪佳缘我们使用*Logistic Regression (LogReg)* 模型学习每个男性用户的交友兴趣以便预测他给具有某些特征的女性的发信概率。这时候学习一个男性用户的交友兴趣就是一个学习任务。记男性用户集合为$\bf U$，抽取出的女性特征维度为$d$。我们为每个用户$u \in \bf U$学习一组参数$w_u \in \sf{R}^d$。再加上一组全局参数$w_0$，总共有$N \triangleq d \cdot (1+\mid \bf{U} \mid)$个参数。这种表达方式就是把男性用户id与所有特征$x$做了笛卡尔积。下图给出了一个有3个用户且$x$长度为2时扩展后各个用户对应特征向量的示例图。LogReg模型通过计算$(w_0 + w_u)^T x$来获得最终的预测概率值。

![各个用户的特征向量][fhash_fs]

这个问题也可以转化到特征哈希后的空间来看。我们为每个用户引入一个不同的转换函数$\phi_u(x)$。一般取$\phi_u(x)=\phi((u, x))$即可。那么用户$u$对应的扩展向量通过哈希转换后为

$$
x^h_u \triangleq \phi_0(x)+\phi_u(x) \ \ \text{；}
$$

扩展向量对应的权重参数$[w_0^T, \ldots, w_{\mid \bf{U} \mid}^T]$通过哈希转换后为

$$
w^h \triangleq \phi_0(w_0) + \sum_{u \in \bf{U}} \phi_u(w_u) \ \ \text{。}
$$

那么在哈希转换后的空间里，

$$
\begin{aligned}
(w^h)^T x^h_u \ &= \left(\phi_0(w_0) + \sum_{u \in \bf{U}} \phi_u(w_u)\right)^T \left(\phi_0(x)+\phi_u(x)\right) \\
&\approx \phi_0(w_0)^T \phi_0(x) + \phi_u(w_u)^T \phi_u(x) \\
&\approx w_0^T x + w_u^T x \\
&= (w_0 + w_u)^T x  \ \ \text{。}
\end{aligned}
$$

这从理论上证明了特征哈希可用于此多任务学习问题。
上面公式中第一个近似等式利用了不同任务之间哈希转换后的参数$\phi_u(w_u)$与特征$\phi_{u'}(x)$近似不相关[^fhash]的结论，即：

$$
\phi_u(w_u)^T \phi_{u'}(x) \approx 0 , \ \forall u \neq u' \ \ \text{。}
$$

具体实现算法时，我们并不需要关心$w^h$，只需要把原始特征$x$通过哈希转换成$x^h_u$即可。剩下的就是标准机器学习流程了。

特征哈希法可以降低特征数量，从而加速算法训练与预测过程，以及降低内存消耗；但代价是通过哈希转换后学习的模型变得很难检验，我们很难对训练出的模型参数做出合理解释。特征哈希法的另一个问题是它会把多个原始特征哈希到相同的位置上，出现哈希里的collision现象。但实际实验表明这种collision对算法的精度影响很小[^fhash2]。

最后，总结下特征哈希法相对于其他机器学习降维算法的优势：

* 实现简单，所需额外计算量小；
* 可以添加新的任务（如新用户），或者新的原始特征而保持哈希转换后的特征长度不变，很适合任务数频繁变化的问题（如个性化推荐里新用户，新item的出现）；
* 可以保持原始特征的稀疏性，既然哈希转换时只有非0原始特征才起作用；
* 可以只哈希转换其中的一部分原始特征，而保留另一部分原始特征（如那些出现collision就会很影响精度的重要特征）。




[fhash_fs]: /images/feature_hashing1.png "各个用户的特征向量"
[jy_no_gbdt]: /images/jiayuan_no_gbdt1.png "仅使用原始特征"
[jy_have_gbdt]: /images/jiayuan_have_gbdt1.png "原始特征加GBDT新特征"

[fproc]: ../../../2014/11/15/breezedeus-feature-processing.html "特征处理（Feature Processing）"
[fb]: http://www.facebook.com "Facebook"


# References

[^fhash]: Kilian Weinberger et al. Feature Hashing for Large Scale Multitask Learning, 2010.
[^fhash2]: Joshua Attenberg et al. Collaborative Email-Spam Filtering with the Hashing-Trick, 2009.

[^esl]: Trevor Hastie et al. [The Elements of Statistical Learning](http://statweb.stanford.edu/~tibs/ElemStatLearn/), 2001.

