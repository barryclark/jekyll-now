---
layout: post
title: Binary Network
---

Binary and XNOR Network



# Reference Paper

[Binary Network](https://arxiv.org/pdf/1602.02830.pdf)

[XNOR Network](https://arxiv.org/pdf/1603.05279.pdf)

[算法推导及介绍](https://github.com/duanyzhi/duanyzhi.github.io/blob/master/images/Binary%20Network%20and%20XNOR%20Network.pdf)





# 思想

二值化网络是希望将卷积核里的权重值量化为+1，0，-1等固定值的形式来减少卷机的计算。因为量化为+1，-1之后之前的乘法运算就可以转换为加减法运算。可以节约很多资源。尤其是目前大家都希望使用FPGA这种低消耗的硬件来实现深度学习网络而不是用TX2等大功率的设备。因此，深度学习网络的优化是一个很大的问题和方向。这里讨论上面两篇比较经典的论文方法。

## Binary Network

Binary Network的思想就是将卷积核权重转化为+1, -1的形式。怎么转化呢，每个卷积核权重正的变为1，负的变为-1.

