---
published: true
layout: post
title:  "L1正则化优化问题的一种求解方法"
date:   2015-07-11 20:05
categories: 机器学习 最优化 L1正则项
---

所谓的**L1正则化**优化问题，就是如下带$L_1$正则化的最小化问题：

$$
\begin{aligned}
&\min\limits_{\theta} \left[ J(\theta) + \lambda \| \theta \|_1 \right] \\
&\triangleq \min\limits_{\theta} F(\theta) \ \ \text{。} 
\end{aligned}
$$

因为$L_1$正则项的不可微性，使得利用梯度相关方法直接求解上面的优化问题有困难。下面介绍的方法，是把这个$L_1$优化问题，变换为多个$L_2$正则化优化问题逐步迭代求解。

把不等式$\|ab\| \leq \frac12 \left( a^2 + b^2 \right)$应用到$\theta$向量中的每个元素：

$$
|\theta_j| \leq \frac12 \left( \frac{\theta_j^2}{c_j} + c_j \right), \ \ \text{其中 } c_j > 0 \text{，}
$$

就有：

$$
\| \theta \|_1 \leq \frac12 \left( \theta^T \mathbf{C}^{-1} \theta + \mathbf{C} \right)\ ,
$$

其中$\mathbf{C}\triangleq \text{diag}(c)$为对角值为$c_j$的对角矩阵，而$\mathbf{C}^{-1}$表示它的逆矩阵。此不等式在所有的$\|\theta_j\| = c_j$时成为等式。

记：

$$
\tilde{F}(\theta; c) \triangleq J(\theta) + \frac{\lambda}{2} \left( \theta^T \mathbf{C}^{-1} \theta + \mathbf{C} \right) \ \ ,
$$

根据前面的不等式，有$F(\theta) \leq \tilde{F}(\theta; c)$。所以可以通过最小化$\tilde{F}(\theta; c)$来达到降低$F(\theta)$的目的。

总结下，我们可以通过以下的迭代求解方法来最小化$F(\theta)$：

1. 选定初始的参数$\theta^{(0)}$；
2. 对于第$k$次（$k \geq 1$）迭代，求解下面的$L_2$正则优化问题来获得新的$\theta_k$：
	
	$$
	\begin{aligned}
	\theta^{(k)} &= \arg\min\limits_{\theta} \tilde{F}(\theta; |\theta^{(k-1)}|) \\
	&= \arg\min\limits_{\theta} \left[ J(\theta) + \frac{\lambda}{2} \theta^T \mathbf{\Theta^{(k-1)}}^{\dagger} \theta \right]
	\ \ \text{。}
	\end{aligned}
	$$
	
	也就是把前面不等式中的$c$取为迭代前一步的解的绝对值$\|\theta^{(k-1)}\|$。因为$\theta^{(k-1)}$的元素可能为0，所以$\tilde{F}(\theta; \|\theta^{(k-1)}\|)$中的逆对角矩阵$\mathbf{\Theta^{(k-1)}}^{-1}$要替换为$\mathbf{\Theta^{(k-1)}}^{\dagger}$，也即$\mathbf{\Theta^{(k-1)}}$的**广义逆矩阵**[^g_inverse_matrix]。因为$\mathbf{\Theta^{(k-1)}}$是对角矩阵，所以$\mathbf{\Theta^{(k-1)}}^{\dagger}$也是对角矩阵，而且它的第$j$个对角元素为：
	
	$$
	{\theta^{(k-1)}}^{\dagger}_j = \begin{cases} |\theta^{(k-1)}_j|^{-1}, & \quad \text{if } \theta^{(k-1)}_j \neq 0 \ ;\\ 
	0, & \quad \text{if } \theta^{(k-1)}_j = 0  \ 。
	\end{cases}
	$$
	
3. 重复上一步迭代过程，直到收敛。

因为有：
	
$$
F(\theta^{(k-1)}) = \tilde{F}(\theta^{(k-1)}; |\theta^{(k-1)}|) \geq \tilde{F}(\theta^{(k)}; |\theta^{(k-1)}|) \geq F(\theta^{(k)}) \ \ \text{，}
$$
	
所以上面的迭代算法能保证目标函数$F(\theta)$单调下降。下面的图给出了直观理解：

![迭代算法直观解释][l1tol2]

当然，因为是迭代求解，整个求解算法可能效率并不高。欢迎有经验的同学给出更详细的说明。


更详细的资料可见参考文献[^graph_ml]。


[l1tol2]: /images/l1tol2.png "迭代算法直观解释"

# References

[^g_inverse_matrix]: [广义逆矩阵](http://baike.baidu.com/view/2597901.htm)。
[^graph_ml]: 杉山将，《图解机器学习》第5.2节，2015。



