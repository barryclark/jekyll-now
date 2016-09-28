---
published: true
layout: post
title:  "L2约束与L2正则项优化问题的关系"
date:   2015-07-11 09:52
categories: 机器学习 最优化 L2正则项
---

所谓的**L2约束问题**，就是带L2约束的优化问题，见下式：

$$
\begin{aligned}
\min& \ \ J(\theta) \\
s.t. &\| \theta \|^2 \leq R
\end{aligned} \ \ \text{。} 
$$

而带**L2正则项**的优化问题则为：

$$
\min\limits_{\theta} \left[ J(\theta) + \frac{\lambda}{2} \| \theta \|^2 \right] \ \ \text{。} 
$$

下面说明

> 带L2约束的优化问题可以近似转化为L2正则项的优化问题。

上面的L2约束优化问题等价于：

$$
\min\limits_{\theta} \max\limits_{\lambda\geq 0} \left[ J(\theta) + \frac{\lambda}{2} \left( \| \theta \|^2 - R \right) \right] \ \ \text{。} 
$$

而与它等价的对偶问题为：

$$
\begin{aligned}
&\max\limits_{\lambda\geq 0} \min\limits_{\theta} \left[ J(\theta) + \frac{\lambda}{2} \left( \| \theta \|^2 - R \right) \right] \\
&=\max\limits_{\lambda\geq 0} \left\{ \min\limits_{\theta} \left[ J(\theta) + \frac{\lambda}{2}  \| \theta \|^2 \right] - \frac 1 2 \lambda R \right\} \\
&\triangleq \max\limits_{\lambda\geq 0} g(\lambda ;\ R) \\
&\triangleq g(\lambda^* ; \ R) \ \ \text{，} 
\end{aligned}
$$

其中$\lambda^{\*}$为这个优化问题的最优解，显然$\lambda^*$是依赖于$R$的。所以上面的对偶问题变为：

$$
\min\limits_{\theta} \left[ J(\theta) + \frac{\lambda^*}{2}  \| \theta \|^2 \right] - \frac 1 2 \lambda^* R \ \ \text{。} 
$$

如果我们不求解最优的$\lambda^*$，而是直接指定某个值$\lambda_0$，那对偶问题的求解就等价于带L2正则项的最小化优化问题了：

$$
\min\limits_{\theta} \left[ J(\theta) + \frac{\lambda_0}{2} \| \theta \|^2 \right] \ \ \text{。} 
$$

更详细的资料可见参考文献[^graph_ml]。

> 上面的推导不仅适用于$L_2$约束，它其实适用于所有的$L_p$约束（$p\geq 1$），因为上面的推导过程只用到了$L_p$是凸函数的条件。

# References

[^graph_ml]: 杉山将，《图解机器学习》第4.2节，2015。



