---
published: true
layout: post
title:  "也说说EM"
date:   2012-08-12 14:12
categories: machine_learning algorithms theory
---

前几天看Andrew Ng 讲EM的视频，又温习了一遍这玩意。 

EM的想法其实也比较简单。我要最大化似然函数（或者后验概率），但是直接最大化很难。

所以，我找一个似然函数的近似函数，这个近似函数小于等于似然函数，而且局部上充分逼近似然函数（保证至少在某个点两个函数有相同的函数值），而且这个函数比较容易最大化。

要找到一个全局逼近原来似然函数的简单函数（简单是说容易找其最大值点）显然非常不容易。EM本身是迭代找解的，它的解决方法是找局部近似函数。在初始化模型参数后，EM首先获得一个在此初始参数附近很逼近似然函数的简单函数，然后找此简单函数的最大化值点，而后模型参数更新到找到的最大化值点；之后我们又获得一个新的简单函数，它在新的参数值附近很逼近似然函数，而后就又找此简单函数的最大化值点；如此循环下去……

所以简单说，EM就是一个找局部近似函数，而后找此近似函数的最大化值点的迭代过程。

![EM 算法推导过程][em_draft]


[em_draft]: /images/em_draft.jpg "EM 算法推导过程"



# References

[^ml_things]: Pedro Domingos. [A few useful things to know about machine learning](http://homes.cs.washington.edu/~pedrod/papers/cacm12.pdf), 2012.