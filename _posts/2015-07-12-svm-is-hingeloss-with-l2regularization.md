---
published: true
layout: post
title:  "SVM等于Hinge损失 + L2正则化"
date:   2015-07-12 08:38
categories: 机器学习 SVM Hinge L2
---

这里说的SVM是指最原始的2分类SVM，不考虑SVM的其他各种扩展。为简单起见，我们也只考虑线性SVM，对于带核函数的SVM，利用相似的推导我们可以获得相同的结论：

> 2分类SVM等于Hinge损失 + L2正则化。

下面是线性SVM的一般形式，其中目标分类$y \in \\{-1, 1\\}$，$C$为给定的惩罚系数：

$$
\begin{aligned}
\min\limits_{\omega, \gamma, \xi}& \left[ 
\frac12 \|\omega\|^2_2 + C \sum_{i=1}^n \xi_i
\right] \\
s. t. \ & (\omega^T x_i + \gamma) y_i \geq 1 - \xi_i, \ \forall i = 1, \ldots, n \\
& \xi_i \geq 0 , \ \forall i = 1, \ldots, n
\end{aligned}
$$

记$m \triangleq f_{\theta}(x) y$（其中$y \in \\{-1, 1\\}$），那么对于2分类问题，最理想的损失函数是**0/1损失**函数。也就当$f\_{\theta}(x)$与$y$有相同符号时，损失为0；而当$f\_{\theta}(x)$与$y$有不同符号时，损失为1。但0/1损失函数既不是处处可微，又不是凸函数，所以直接最小化0/1损失函数很困难。**Hinge损失**是0/1损失的一种近似（见下图）：

$$
J_{\text{hinge}}(m) = \max \{0, 1-m\} \ \ \text{。}
$$

![0/1损失与Hinge损失函数][hingeloss]

Hinge损失的名字是源自它跟打开135度的折叶（hinge）长得很像。

![0/1损失与Hinge损失函数][hinge]


带有L2正则项的Hinge损失优化问题如下：

$$
\min\limits_{\omega, \gamma} \left[ 
C \sum_{i=1}^n \max \left\{ 0, 1 - (\omega^T x_i + \gamma) y_i \right\} 
+ \frac12 \|\omega\|^2_2 
\right] \ \ \text{。}
$$

为了与前面的SVM表达式对应，我们把L2正则项中的惩罚系数挪到前面的Hinge损失上了。Hinge损失函数有如下的等价定义：

$$
\max \{0, 1-m\} = 

\underset{
\begin{aligned}
s.t.& \ \xi \geq 1-m \\
& \xi \geq 0
\end{aligned}
}{\min \xi}
$$

利用上面的等价定义，我们可以重写带有L2正则项的Hinge损失优化问题为：

$$
\begin{aligned}
\min\limits_{\omega, \gamma, \xi}& \left[ 
C \sum_{i=1}^n \xi_i + \frac12 \|\omega\|^2_2 
\right] \\
s.t.& \  \xi_i \geq 1 - (\omega^T x_i + \gamma)y_i , \ \forall i = 1, \ldots, n \\
& \xi_i \geq 0 , \ \forall i = 1, \ldots, n
\end{aligned}
$$

嗯，上式就是本文最开始给出的SVM优化问题了。


更详细的资料可见参考文献[^graph_ml]。


[hingeloss]: /images/hingeloss.png "0/1损失与Hinge损失"
[hinge]: /images/hinge.png "折叶（hinge）"

# References

[^graph_ml]: 杉山将，《图解机器学习》第8.5节，2015。



