---
layout: post
title: One Shot Learning
---

One Shot Lerning

# Reference
[Matching Networks for One Shot Learning](https://arxiv.org/abs/1606.04080)  
[算法详解](https://github.com/duanyzhi/duanyzhi.github.io/blob/master/images/One%20Shot%20Learning%20with%20Memory-Augment%20Neural%20Networks.pdf)  
[Code](https://github.com/duanyzhi/one_shot_learning)    

# 算法介绍
One Shot Learning是一种匹配学习的思想，遇到下面两种情况可以考虑使用One Shot的思想：  
1. 数据特别少，每一类只有几个数据  
2. 测试集的类别和训练集的类别完全不同  


One Shot Learning比较有趣的就是完全可以用其他数据的学习经验来做不同测试集的测试，算法本身学习的是相似的思想，即我的target到底和哪一个Memory比较相似，而不是具体归位哪一个分类信息。具体算法可以参考上面的算法详解。   


