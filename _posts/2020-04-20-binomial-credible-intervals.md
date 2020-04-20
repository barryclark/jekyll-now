---
layout: post
tags: bayesian-probability-theorie math games
#categories: []
date: 2020-04-20
#excerpt: ''
#image: 'BASEURL/assets/blog/img/.png'
#description:
#permalink:
title: 'Binomial Distribution: Credible Intervals under Normal Approximation'
comments_id: 7
---

These are my calculations to understand the credible intervals for a Binomial Distribution under the Normal approximation from a Bayesian perspective.

# The Posterior Probability
Let $$p \in (0,1)$$ be the unknown chance of success in Bernoulli experiment. Then the likelihood of obtaining $$k$$ successes in $$n$$ trials is given by the Binomial Distribution:

$$P(k\vert p, n, I) = {n \choose k} \, p^k (1-p)^{n-k}$$


We are interested in the *posterior probability* of $$p$$ having a certain value given the data. Bayes Theorem tells us that the posterior probability is proportional to the likelihood multiplied by the *prior probability* $$P(p \vert n, I)$$:

$$P(p \vert k, n, I) \propto P(k\vert p, n, I) \cdot P(p \vert n, I)$$

The propotionality constant is a factor that normalizes the probability to $$1$$ over the whole definition range of $$p$$. For a more in detph explanation with applications to simple games see [here](/blog/2020/02/08/bayesian-game-analysis-part1/).

# Simplifying Assumptions
Let's say we have a Binomial Distribution with a very large number $$n$$ of trials, say e.g. $$n>10^6$$. This means the functional form of the Binomial Distribution becomes hard to calculate numerically due to large exponents and faculties. So we want to make a couple of simplifying assumptions. Those become part of our background knowledge $$I$$:

1. The conditions $$n>9 \cdot (1-p)/p$$ and $$n>9 \cdot p/(1-p)$$ are satisfied, so we can [approximate the likelihood](https://en.wikipedia.org/wiki/Binomial_distribution#Normal_approximation) by a Gaussian Distribution.
2. On the interval where the above condition is satisfied, we assume a flat prior.
3. The width of the distribution is small: it approaches zero fast outside a small interval around the peak.


The first and second assumption can be directly translated to the prior:

$$P(p \vert n, I) = \left\{\begin{array}{ll} const., & n>9 \cdot (1-p)/p \land n>9 \cdot p/(1-p) \\ 0, & else\end{array}\right.$$

# Approximations
Our assumptions allow us to approximate the likelihood by a Gaussian distribution with mean $$np$$ and variance $$np(1-p)$$. That means the posterior probability is:

$$P(p \vert k, n, I) \approx const. \cdot \frac{1}{\sqrt{2\pi n p (1-p)}}\exp\left(-\frac{(k-np)^2}{2np(1-p)}\right)$$

for $$n>9 \cdot (1-p)/p \land n>9 \cdot p/(1-p)$$ and zero outside the interval because of the piecewise prior. The likelihood function is a Gaussian distribution, but the posterior distribution is *not*, because it is a function of $$p$$ and not of $$k$$.

As per assumption three above, the width of the distribution is very narrow. So the distribution will have significant nonzero values only in an interval around the expected value. So we write $$p = \hat{p}+\delta$$ with $$\hat{p}=k/n$$ and $$\vert\delta\vert \ll \hat{p}$$. Outside this interval the function should be close to zero, because of the assumed narrowness. Then we can write for the numerator of inside the exponential:

$$(k-np)^2 = (n\delta)^2 = n^2 \cdot (p-\hat{p})^2$$

For the denominator inside the exponential we can write

$$p (1-p) = \hat{p}-\hat{p}^2-2\hat{p}\delta+\delta-\delta^2 = \hat{p}\cdot(1-\hat{p}-2\delta+\delta/\hat{p})+\delta^2.$$

We can neglect $$\delta^2$$ and $$\delta/\hat{p}$$. Further we approximate $$-\hat{p}-2\delta\approx-\hat{p}$$. So that finally:

$$p(1-p)\approx \hat{p}(1-\hat{p}) = const.$$

Plugging these approximations into the likelihood and using gives us

$$P(p \vert k, n, I) \approx const.\cdot \exp\left(-\frac{(p-\hat{p})^2}{2\frac{\hat{p}(1-\hat{p})}{n}}\right).$$

on the interval where the prior is nonzero and zero outside. Since the width of the distribution is small, it goes close to zero before being cropped by the prior. So the distribution is sufficiently close to a Gaussian distribution for $$p$$ with mean $$\hat{p} = k/n$$ and variance of $$\sigma^2 = \frac{\hat{p}(1-\hat{p})}{n}$$. This means we can now use this approximation to give the credible interval of $$p$$ using what we know about $$\sigma$$-intervals of the Gaussian Distribution. For example we know that the 95% CI of a Gaussian distribution is in an interval $$[\hat{p}-z\sigma, \hat{p}+z\sigma] $$ with $$z\approx1.96$$. 

This derivation might not have been pretty, but at least it reproduces common frequentist results, seen e.g. [here](https://en.wikipedia.org/wiki/Binomial_proportion_confidence_interval#Normal_approximation_interval).
