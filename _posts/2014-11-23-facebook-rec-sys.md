---
published: true
layout: post
title:  "Facebook的朋友推荐系统"
date:   2012-08-25 11:53
categories: industrial_system recommender_system
---


Facebook的新朋友关系中有92%来自于**朋友的朋友（FOFs）**，来自于Facebook的数据科学家Lars Backstrom在[eswc2011的talk](http://videolectures.net/eswc2011_backstrom_facebook/ "eswc2011的talk")中介绍了他们是如何对FOFs进行排序，并最终为用户产生朋友推荐的全过程。上不了videolectures.net的童鞋也可以在[这里][slides]下载对应的slides。
 
下面这幅图摘自演讲[slides][slides]，是整个FOFs推荐系统的一个流程图。

![Facebook的朋友推荐系统][friends_rec]

例如系统要为用户Lars最终产生2个朋友推荐，那么操作步骤如下：

1. 首先获得Lars的所有FoFs，比如包括Greg，Shelly等。
2. 然后针对Lars与每个FoF，获得一些相关属性，比如Lars与此FOF各自的性别、年龄，以及他们的共同朋友数量等等。
3. 利用上面获得的属性训练模型（如Bagged Decision Trees，其训练数据来自于之前用户对推荐结果的反馈），并最终获得Lars对每个FOF的分数，比如Score(Lars, Greg)=0.045，Score(Lars, Shelly)=0.021。这里的训练因为数据量巨大，它的更新周期会比较长（如2天更新一次）。这里获得的分数会被保存下来，作为一个特征被用在接下来的较轻量级的实时更新的重排序模型当中。
4. 在每次为用户展示了一些候选推荐后，下次为此用户的推荐就会考虑到此次展示的“后果”，比如直觉上对上次展示过的候选人要降低其排序分数等。所以在每次展示后，系统会利用一些简单的特征（比如上一步获得的分数值Score(Lars, Greg)=0.045，展示次数Impressions(Lars, Greg)=3，Greg的朋友数量等），使用Logistic Regression模型对候选人进行重排序。这个talk里没有细讲到底是每次展示后都重新训练模型，还是只是重新获得预测值；以及每次是对所有候选人进行重排序，还是只对上一步的TopN进行重排。如何在这些可能的选择中进行选择可能依赖于我们真实应用的需求，以及我们系统所能承受的计算量。Anyway，经过这一步的重排序，系统最终获得了对Lars的Top2推荐:)。
5. 当然，用户对推荐结果的反馈数据又会被用在第3步与第4步中的模型训练当中，见图中的虚线。



[friends_rec]: /images/fb_friends_rec.png "Facebook的朋友推荐系统"
[slides]: http://pan.baidu.com/s/1jG7RL34 "Slides"