---
published: true
layout: post
title:  "Xavier带来的10个新机器学习认识"
date:   2015-11-25 22:19
categories: 实际问题 机器学习 推荐系统 特征工程 Quora Xavier
---

[Xavier Amatriain](https://www.quora.com/profile/Xavier-Amatriain)今年年初从Netflix跑到Quora去当副总裁了，不过依旧发扬着他的分享精神。这篇文章我主要跟着他最近分享的slides[^lessons15]并结合自己的看法来简单说说。这个slides其实已经是Xavier这个系列的第二部分了，第一部分[^lessons14]是他2014年底给出的。

实际工作中面对一个新项目，首先是要设定好项目目标，然后调研涉及到的各方各面，比如公司内是不是有类似项目可供参考，技术上该怎么做，落实到算法就是要使用什么数据，使用什么算法，抽取什么特征等。如果和下面类似画张产品数据关系图，使用什么数据这个问题就清楚多了。

{:.center}
![Quora中各种数据的关系网][relation]

# 隐式数据“几乎总是”能打败显式数据

这是Xavier给出的第一个认识，也即隐式数据通常都会比显式数据更有用。

先说说什么叫显式数据和隐式数据。**显式数据**是指数据对应的用户行为就是为了让用户直接表达对产品的喜好。比如佳缘里用户填写的择偶条件，Netflix上对电影的打分，网易云音乐里的加红心就是典型的显式数据。

{:.center}
![显式数据][explict_data]

而**隐式数据**是指数据对应的用户行为本身并不是为了让用户表达对产品的喜好而是为了满足用户的其他需求。比如在淘宝上的浏览、购买，在微博上的关注等就是典型的隐式数据。在淘宝上买避孕套不一定能说明喜欢，可能只是因为它是必须品。在微博上关注一个公知不一定就喜欢或者认同他，可能就是想偶尔脑洞大开下。

{:.center}
![隐式数据][implict_data]

看过我上面的解释，相信有些同学对这一认识已经有所感悟了。企业产品的目标都不是为了学习用户的兴趣，而是为了各种各样的其他目的（如转化、活跃）。学习用户兴趣只是达成产品目标的一种手段。

Netflix上的目标是为了让用户更容易找到满意的电影，用的爽后你就可以会继续付费包月使用。总是给用户推他感兴趣但很熟悉的电影显然体验不好。网易云音乐的目标也是让用户用的爽然后继续（付费）使用。但是有些隐式数据反而能直接映射到产品目标上，比如淘宝的购买数据就可以映射到他们的产品目标（转化率）上。

> 显式数据往往并不能直接映射到产品目标上，而有些隐式数据（如购买）却可以。

第二个原因是数据规模不同。显式数据需要用户付出额外的代价才能获得，自然量多不了。而隐式数据就刚好相反，它对用户是透明的，所以能触达更多的用户，更全面地刻画用户。1比1 pk隐式数据可能玩不过，100比1就不一定了。

另一个原因是显式数据是可以作弊的。用户可以构造一些虚假的显式数据来隐瞒他的真实兴趣。比如在佳缘上一个30岁的男性在填写择偶条件时可以把年龄段写成25~30岁，但他真实的发信对象年龄段却集中在18~25岁的女性。大家稍微想想就能想到很多类似的场景，大部分人自己就干过。

当然，隐式数据也没那么好，它的一个大问题是噪音大。很多行为场景下（如浏览）用户的感知很弱，在这种情况下产生的隐式数据噪音也比较大。所以在使用隐式数据时需要格外注意对数据的清洗降噪流程。

实际项目里通常是显式和隐式数据结合着使用，不会那么界限分明。具体怎么结合，主要依赖项目，有机会再细说。


# 度量指标：模型只会朝着你指定的方向学习

这个话题Xavier在他的两个slides[^lessons14] [^lessons15]里都说到，也是他认为最最重要的一点[^lessons14_detail]。模型的优化指标没选对，那模型优化得越好只会离正确的道路（改善业务）越远。

这个话题在我之前的博文[^meituan_ml]里已经说过，就不再细说了。总结一句话，

> 选对优化目标非常非常地重要，虽然非常非常地难！

{:.center}
![实际问题中的各个环节][modules]


# 融合无处不在

自从Netflix Prize后，**融合（Ensemble）**不仅是竞赛必备，在工业界也成标配了。最开始融合的概念主要指在最后一步融合多个模型的结果进一步提升效果，但现在这个概念的意义其实已经更广泛了。融合可以在多个层面进行：

* **数据层面**：半监督学习是把无监督数据融合进有监督数据，通常做法是在无监督数据上训练降维（PCA）或聚类（LDA、NMF）模型，然后把模型结果融合进有监督模型中（作为特征输入或者先验信息）；迁移学习（Transfer Learning）是把其他地方的数据融合到当前应用的数据中。
* **特征层面**：一个模型的预测结果作为特征输入进另一个模型，例如把MF的预测结果作为特征输入到LR。
* **模型层面**：利用新模型（如简单的LR，最流行的GBDT和RF）来融合多个模型的预测结果。比如在佳缘我们会融合发信、读信和回信模型的结果来为用户产生推荐。GBDT和RF的特点可以参见[Quora上的讨论](https://www.quora.com/When-would-one-use-Random-Forests-over-Gradient-Boosted-Machines-GBMs)和我之前的博文[^bb_rf]。

所以，泛了说，融合几乎是无处不在的。

{:.center}
![融合无处不在][ensemble]


# 特征和模型要对所有人透明

这条是大部分人都容易忽略的，包括我自己。绝大多数时候机器学习模型对产品、运营，甚至是开发工程师自己，都是黑盒状态。为什么给当前用户展示这些结果？不知道，算法排完就是这样！理直气壮。

对于特征，Xavier认为必须是**可解释**，以及**可靠的**。只有理解了某个特征的意义，我们才能适当地对它进行处理以适应当前的模型，才能在更多的模型中适当地使用它。可靠是说需要实时地监控这个特征在实时模型里的状态：这个特征的取值有没有超出正常范围，它的分布图是不是正常。有了可解释性和可靠性，这个特征对工程师和其他人就是透明的了。

更进一步，由多个特征组合而成的模型也必须是**可调试的**。监控模型的实时状态，包括使用的各个特征以及对应的参数、模型的输出结果等。尤其是在更新模型后需要监控与旧模型的差异，这样才能保证新模型没有受到异常数据的影响。只有对模型进行了细致的监控，才能保证模型是可调试的，这也让模型变得透明。模型可调试意味着我们可以查看当前模型为什么在当前场景下给当前用户展示了这几个结果，它们都是因为什么特征表现出众而被排在最前面的。模型只有透明了，才能打消产品和运营同事对模型的顾虑（想象下美国为什么害怕朝鲜），工程师晚上睡觉也会少做噩梦。

下图是Xavier给出的Quora内部查看模型的系统截图[^lessons15]。

{:.center}
![模型要可调试][model_debug]

# 番外篇

对于机器学习系统，我现在一般更关注模型和算法之外的东西，因为它们是技术和艺术，而模型和算法则是科学。

建议大家关注下Quora上关于[机器学习中经常被忽略的主题](https://www.quora.com/Machine-Learning/What-are-the-most-common-topics-omitted-from-machine-learning-courses)这个问答，里面也有Xavier的经典回复，截图如下：

{:.center}
![机器学习中经常被忽略的主题][omitted]


OK，这次就串讲到这，更详细的内容可以去看看Xavier的新老slides[^lessons15] [^lessons14]以及他的这篇博文[^lessons14_detail]。如果不知道怎么继续优化一个机器学习/推荐系统，可以看看下面Xavier建议的四个方向。

{:.center}
![机器学习系统][system]

欢迎大家留言交流。


[relation]: /images/quora_data_relations.png "Quora中各种数据的关系网"
[explict_data]: /images/explict_data.png "显式数据"
[implict_data]: /images/implict_data.png "隐式数据"
[modules]: /images/problem_modules.png "实际问题中的各个环节"
[ensemble]: /images/master_ensemble.png "融合无处不在"
[model_debug]: /images/quora_model_debug.png "模型要可调试"
[omitted]: /images/omitted_ml_topics.png "机器学习中经常被忽略的主题"
[system]: /images/xavier_system.png "机器学习系统"



#References
[^lessons14_detail]: Xavier Amatriain, [(Blog) 10 Lessons Learned from Building Machine Learning Systems](http://technocalifornia.blogspot.com/2014/12/ten-lessons-learned-from-building-real.html), 2014。
[^lessons14]: Xavier Amatriain, [(Slides) 10 Lessons Learned from Building Machine Learning Systems](http://pan.baidu.com/s/1hqloae4), 2014。
[^lessons15]: Xavier Amatriain, [(Slides) 10 More Lessons Learned from Building Real-life Machine Learning Systems](http://pan.baidu.com/s/1sjKh4k9), 2015。
[^meituan_ml]: breezedeus，[实际问题中如何使用机器学习模型](../../../2015/07/29/breezedeus-meituan-ml.html), 2015。
[^bb_rf]: breezedeus，[Bagging, Boosting & Random Forests](../../../2011/02/10/breezedeus-dt.html), 2011。