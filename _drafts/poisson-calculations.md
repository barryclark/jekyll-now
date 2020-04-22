---
layout: post
tags: bayesian-probability-theorie math games
#categories: []
date: 2020-05-20
#excerpt: ''
#image: 'BASEURL/assets/blog/img/.png'
#description:
#permalink:
title: 'Estimating the Mean from a Sum of Poisson Distributed Count Data'
#comments_id: 
---

!!!!INTRODUCTION GOES HERE !!!!! Two ways of calculating the rate parameter from the 

# The Problem

Assume we have a set of size $$N$$ of count data $${k_j} \in \mathbb{N}$$. The counts are indepentent and identically distributed (i.i.d.) with a Poisson distribution with an (unknown) mean $$\mu \in \mathbb{R}^+$$: 

$$k_j \sim \text{Pois}(\mu), j=1,...,N$$

I am interested in estimating the mean from the *sum of all observed counts* $$K = \sum_j k_j$$. The sum of poisson distributed random variables [is again Poisson distributed](https://en.wikipedia.org/wiki/Poisson_distribution#Sums_of_Poisson-distributed_random_variables). The [mean of the resulting distribution](https://math.stackexchange.com/questions/221078/poisson-distribution-of-sum-of-two-random-independent-variables-x-y) $$C$$ is the sum of the means of the distributions for $$k_j$$. Since all distributions here have the same mean, the resulting mean is just $$N\mu$$:

$$C \sim \text{Pois}(N\mu)$$

# The Posterior Distribution

We are interested in the posterior probability of $$\mu$$ given the sum of counts $$C$$ and the number of experiments $$N$$.

$$P(\mu \vert K,N,I) = \frac{P(K\vert \mu, N, I) \cdot P(\mu\vert I)}{P(K\vert N, I)}$$

All probabilities are conditioned on $$I$$ which is the accumulation of our a priori state of knowledge. The *likelihood* $$P(K\vert \mu, N, I)$$ is given by the poisson distribution with mean $$N\mu$$:

$$P(K\vert \mu,N,I) = \frac{(N\mu)^K}{K!} \exp(-N\mu)$$

The *prior* probability of $$\mu$$ having a certain value does not depend on the number of experiments. Thus, I can write it as $$P(\mu \vert N,I)=P(\mu\vert I)$$. Our prior state of knowledge will play a key role in expresing the prior probability. In the next sections I will explore different priors. The *evidence* (or marginal likelihood) term in the denominator acts as a normalization constant with respect to $$\mu$$. It can be calculated as the integral of the numerator over all possible valuse of $$\mu$$:

$$P(K\vert N, I) = \int_0^\infty d\mu\, P(K,\mu\vert N,I) = \int_0^\infty d\mu\, P(K\vert \mu, N,I)\cdot P(\mu \vert I)$$

Since this expression also depends on the prior, I will calculate it in the later sections. If we are just interested in the maximum of the posterior distribution we need not calculate the evidence term, because it does not depend on $$\mu$$.

# Estimating the Mean
In the following I calculate the value $$\hat{\mu}$$ for which the posterior distribution is maximal. 

## Flat Priors and Maximum Likelihood
I will gloss over this somewhat quickly, because other prior distributions are more interesting. A flat prior looks like this

$$P(\mu\vert I) = \left\{\begin{array}{ll} 1/(\mu_{max}-\mu_{min}), & \mu\in[\mu_{min},\mu_{max}]\\ 0, & else\end{array}\right.,$$

and confines the range of $$\mu$$ to a *finite interval*. Two things are worth noting: First, the interval cannot be infinite and secondly the interval might clip the maximum of the likelihood function. If we just want to use the flat prior as a justification of the maximum likelihood method, we can just say the interval is "suitably large" and estimate the maximum a posteriori  value $$\hat{\mu}$$ as the maximum of the likelihood function. This leads us to

$$\hat{\mu}=\frac{K}{N}.$$

So the maximum likelihood estimate for the mean is just the average observed count, which is a very intuitive result. The caveat here is that this result only holds if $$\hat{\mu} \in [\mu_{min},\mu_{max}]$$.

ERGEBNIS VOM FLAT PRIOR EINBRINGEN MIT CONSTANTE, SIE SICH WEGKÜRZT

## Jeffreys' Prior
[Harold Jeffreys himself recommended](https://royalsocietypublishing.org/doi/abs/10.1098/rspa.1946.0056) $$P(\mu\vert I) \propto 1/\mu$$ as an uninformative prior for the Poisson distribution[^1]. I will refer to this prior as Jeffreys' prior. This is different from the prior that results when applying [Jeffreys' Rule](https://www.statisticshowto.com/jeffreys-prior/). It is worth noting that the prior, like the flat prior cannot be normalized on an infinite interval. Thus, similar considerations as above apply. However, we will see that it can still lead to a well behaved posterior for $$\mu\in[0,\infty)$$ nonetheless[^2].

We can write the posterior distribution as

$$\begin{eqnarray}
P(\mu \vert K,N,I) &=& \frac{\frac{(N\mu)^K}{K!} \exp(-N\mu)\cdot \mu^{-1}}{\int_0^\infty d\mu\,\frac{(N\mu)^K}{K!} \exp(-N\mu)\cdot \mu^{-1}} \\
 &=& \frac{\mu^{K-1}\exp(-N\mu)}{\int_0^\infty d\mu\,\mu^{K-1}\exp(-N\mu)}.
\end{eqnarray}$$

Using some [help from Wolfram Alpha](https://www.wolframalpha.com/input/?i=int%28mu%5E%28K-1%29*exp%28-N*mu%29%2Cmu%29) we can see that the integral in the denominator is $$\int_0^\infty d\mu\,\mu^{K-1}\exp(-N\mu)=N^{-K} \Gamma(K)$$. So finally we have our posterior:

$$P(\mu \vert K,N,I)=\frac{N^K}{\Gamma(K)}\cdot \mu^{K-1} \exp(-N\mu)$$

This is a [Gamma distribution](https://en.wikipedia.org/wiki/Gamma_distribution) with shape $$K$$ and rate $$N$$. To find the parameter $$\hat{\mu}$$ that maximizes the posterior, it makes sense to look at the logarithm of the posterior:

$$L := \log P(\mu\vert K,N,I) = K \log(N)-\log(\Gamma(K))+(K-1)\log(\mu)-N\mu$$

Finding the maximum by setting $$\partial L / \partial \mu \vert_{\mu=\hat{\mu}}=0$$ leads us to

$$\hat{\mu} = \frac {K-1}{N}.$$

For large sums $$K$$ this will tend to the same estimate as the flat prior.





## Conjugate Prior
The [conjugate prior for the Poisson distribution](https://en.wikipedia.org/wiki/Conjugate_prior#Table_of_conjugate_distributions)[^3] is a Gamma distribution: 

$$P(\mu \vert I) = \frac{\beta^\alpha}{\Gamma(\alpha)} \mu^{\alpha-1}\exp(-\beta\mu).$$

SIND DIE ANDEREN PRIORS SPEZIALFÄLLE VOM GAMMA PRIOR? jeffreys is a=0 b=0 (mit 0^0=1), constant prior kann man so nicht produzieren

# Endnotes
[^1]: The astute reader will have noticed that Jeffreys' prior is meant for a Poisson distribution with mean $$\mu$$ and not $$N\mu$$ like we have here. However, transforming these functions would only [introduce a constant](https://math.stackexchange.com/questions/1325284/find-the-distribution-of-linear-combination-of-independent-random-variables/1325545) for this particular prior, if I am not mistaken. The constant would cancel out because it appears in the integral in the denominator as well as the numerator.
[^2]: This is also true for the flat prior. Both are called [improper priors](https://en.wikipedia.org/wiki/Prior_probability#Improper_priors).
[^3]: The same considerations as in the footnote above[^1] apply.
