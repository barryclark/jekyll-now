---
published: true
layout: post
title:  "aDev第13期#个性化推荐技术#总结（Part I：袁全@一淘）"
date:   2012-11-01 01:36
categories: 企业推荐系统 推荐算法 一淘
---

# Talk1：Large-scale Ecommerce RS in Etao，袁全@一淘

【[ppt下载地址][yuanquan]】



 
1. 关于用户的行为数据，作者的经验是用户的点击与购买数据比收藏、打分与观看更有用。与购买数据相比，点击数据在做*相关性推荐*时（如用户在查看泳衣时给他推荐其他款泳衣）更有效，而做*补充性推荐*时（如用户购买了泳衣后就给他推荐泳镜）则是购买数据比点击数据更有效。想想用户产生这两种数据时的意图，这个经验还是很reasonable的。关于content数据，作者的经验是产品的品类树数据会比产品的标题和描述，以及用户的demographics和评语更有用。这个结论完全依赖于数据来源的，不同的环境可能会不同。


2. 下面的图不是源自作者，原始出处是Grouplens在IUI’09上的论文“Tagsplanations: Explaining Recommendations Using Tags”[^explain]（注：下面的图右边的三个箭头反了，原论文里的图是正确的），但我很喜欢作者的这句话总结：
   
   > “Link user with items in a reasonable way”。
   
   作者后来也再次强调过说推荐解释很重要，它可以提升CTR20+%。

   ![推荐流程图][flow]

3. 理解用户的行为意图很重要。用户处在购买流程的不同步骤，其意图不尽相同。比如用户通过搜索页搜索然后进入产品详细页，这个时候他的购买意图比较明确，所以可以多给他推一些同类型不同款的产品（相关性推荐）；在以后已经购买了某个产品后，接下来应该多给他推荐一些不同类型的产品（补充性推荐）。例子见第1点中的泳衣与泳镜。数学表达为：

   ![推荐模型][model]

   上面公式里的c（category）我还没有说到。作者发现对于不同种类的产品，当用户处在同一购物流程时，其理想的相关性推荐/补充性推荐的概率也差别很大。比如在购买家居饰品时，用户的目的很容易被转移，所以应该以相关性推荐为主；而在购买品牌手表时，用户的目的很坚定，所以应该以补充性推荐为主。
 

4. 用户收藏后并不一定会购买。作者的统计表明在收藏后男性比女性购买的概率更高（高了差不多20%），这个就不解释了，元芳都知道。另一个结论是随着产品价格的升高，其收藏后购买的概率也在逐渐下降。下图给出了收藏后/点击后购买的概率随着log(价格)的走向图：

   ![推荐结果][result]

   作者把不同产品类别按照收藏后购买的概率排了个序，发现“网络游戏点卡”的概率最大，而“珠宝/钻石/翡翠/黄金”的概率最低。作者认为收藏后购买的概率对应着“刚需”程度:)。说了这么多，有什么用呢？作者认为这个结论可以指导产品的同学对不同类别产品使用不同营销策略进行售卖：对于“刚需”程度很高的类别产品，可以使用up-selling策略（比如原来用户想买20块钱的点卡，可以给他推荐50块的）；对于“刚需”程度很低的类别产品，可以使用打折和促销策略。那么，对于程度不大不小的类别产品呢？No idea。


5. 算法评估方面，作者给出了三个评估步骤：1) 利用线下给定的度量；2) 开发人员自己先体验，觉得行就发布给线上少数（几千）规模用户试用；3)线上大规模A/B测试。从我自己的经验看，这里面如何找线下度量，使得它与线上效果正相关是件不容易的事情。这个问题Netflix的Xavier Amatriain也在[他RecSys'12的talk][xavier]里提到了。作者在一淘的经验是线下的recall度量一般比较靠谱。关于算法的对比，作者的经验是ItemCF不论线下还是线上效果都不错而且比较稳定。IMF(Implicit matrix factorization)-pointwise线下效果不错，但线上效果就比ItemCF差。

 
6. 对于多个算法结果的组合（Recommendation Ensemble），常用的方法就是线性回归。作者使用了Mixture Logistic Regression (MLR)。MLR据说是一淘的Gai Kun同学发明的，好像还没发表吧。据作者介绍，MLR是用来拟合非线性数据的非线性模型，但它的复杂度可以被控制，所以可以把它用在大数据上。据称MLR用在广告的CTR预测上其准确率提升了30+%。好吧，MLR还只是个传说……


[flow]: /images/yuanquan_flow.png "推荐流程图"
[model]: /images/yuanquan_model.png "推荐模型"
[result]: /images/yuanquan_result.png "推荐结果"

[yuanquan]: http://pan.baidu.com/s/1o69LVFs "袁泉的slides"
[xavier]: http://www.cnblogs.com/breezedeus/archive/2012/08/12/2634462.html "Xavier Amatriain @ RecSys'12"


# References

[^explain]: [Tagsplanations: Explaining Recommendations Using Tags](http://www.grouplens.org/system/files/vig-iui2009-tagsplanations.pdf).

