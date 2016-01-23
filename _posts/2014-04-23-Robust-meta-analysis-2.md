---
layout: post
title: Another meta-sandwich
date: April 23, 2014
permalink: Robust-meta-analysis-2
---

In [a previous post]({{site.url}}/Robust-meta-analysis-1/), I provided some code to do robust variance estimation with `metafor` and `sandwich`. 
Here's another example, replicating some more of the calculations from [Tanner-Smith & Tipton (2013)](http://doi.org/10.1002/jrsm.1091). 
([See here](https://gist.github.com/jepusto/11147304) for the complete code.)

As a starting point, here are the results produced by the `robumeta` package:

{% highlight r %}
library(grid)
library(robumeta)

data(corrdat)
rho <- 0.8

HTJ <- robu(effectsize ~ males + college + binge,
            data = corrdat, 
            modelweights = "CORR", rho = rho,
            studynum = studyid,
            var.eff.size = var, small = FALSE)
HTJ
{% endhighlight %}



{% highlight text %}
## RVE: Correlated Effects Model  
## 
## Model: effectsize ~ males + college + binge 
## 
## Number of studies = 39 
## Number of outcomes = 172 (min = 1 , mean = 4.41 , median = 4 , max = 18 )
## Rho = 0.8 
## I.sq = 75.08021 
## Tau.sq = 0.1557645 
## 
##             Estimate  StdErr t-value dfs P(|t|>) 95% CI.L 95% CI.U Sig
## 1 intercept  0.31936 0.27784   1.149  35   0.258  -0.2447  0.88340    
## 2     males -0.00331 0.00376  -0.882  35   0.384  -0.0109  0.00431    
## 3   college  0.41226 0.18685   2.206  35   0.034   0.0329  0.79159  **
## 4     binge  0.13774 0.12586   1.094  35   0.281  -0.1178  0.39326    
## ---
## Signif. codes: < .01 *** < .05 ** < .10 *
## ---
{% endhighlight %}

To exactly re-produce the results with `metafor`, I'll need to use the weights proposed by HTJ. In their approach to the correlated effects case, effect size $$i$$ from study $$j$$ receives weight equal to $$\left[\left(v_{\cdot j} + \hat\tau^2\right)(1 + (k_j - 1) \rho)\right]^{-1}$$, where $$v_{\cdot j}$$ is the average sampling variance of the effect sizes from study $$j$$, $$\hat\tau^2$$ is an estimate of the between-study variance, $$k_j$$ is the number of correlated effects in study $$j$$, and $$\rho$$ is a user-specified value of the intra-study correlation. However, it appears that `robumeta` actually uses a slightly different set weights, which are equivalent to taking $$\rho = 1$$. I calculate the latter weights, fit the model in `metafor`, and output the robust standard errors and $$t$$-tests:


{% highlight r %}
devtools::source_gist("https://gist.github.com/jepusto/11144005")

corrdat <- within(corrdat, {
  var_mean <- tapply(var, studyid, mean)[studyid]
  k <- table(studyid)[studyid]
  var_HTJ <- as.numeric(k * (var_mean + as.numeric(HTJ$mod_info$tau.sq)))
})

meta1 <- rma.mv(effectsize ~ males + college + binge, 
                V = var_HTJ, 
                data = corrdat, method = "FE")
meta1$cluster <- corrdat$studyid
RobustResults(meta1)
{% endhighlight %}



{% highlight text %}
## 
## t test of coefficients:
## 
##           Estimate Std. Error t value Pr(>|t|)  
## intrcpt  0.3193588  0.2778361  1.1495  0.25816  
## males   -0.0033143  0.0037573 -0.8821  0.38374  
## college  0.4122615  0.1868491  2.2064  0.03401 *
## binge    0.1377392  0.1258638  1.0944  0.28128  
## ---
## Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1
{% endhighlight %}

One could specify a similar (though not exactly identical model) in `metafor` as follows. In the HTJ approach, $$\rho$$ represents the total correlation induced by both the within-study sampling error and intra-study correlation in true effects. In contrast, the `metafor` approach would take $$\rho$$ to be correlation due to within-study sampling error alone. I'll first need to create a block-diagonal covariance matrix given a user-specified value of $$\rho$$. 

{% highlight r %}
library(Matrix)
equicorr <- function(x, rho) {
  corr <- rho + (1 - rho) * diag(nrow = length(x))
  tcrossprod(x) * corr 
} 
covMat <- as.matrix(bdiag(with(corrdat, tapply(var_mean, studyid, equicorr, rho = 0.8, simplify = FALSE))))
{% endhighlight %}

Passing this block-diagonal covariance matrix to `rma.mv`, I now estimate the model 

$$T_{ij} = \mathbf{X}_{ij} \beta + \nu_i + e_{ij},$$

where $$Var(\nu_i) = \sigma^2$$, $$Var(e_{ij}) = v_{ij}$$, and $$Cor(e_{ij}, e_{ik}) = \rho$$. Note that $$\sigma^2$$ is now estimated via REML.


{% highlight r %}
meta2 <- rma.mv(yi = effectsize ~ males + college + binge, 
                V = covMat, random = ~ 1 | studyid, 
                data = corrdat,
                method = "REML")
c(sigma.sq = meta2$sigma2)
{% endhighlight %}



{% highlight text %}
##  sigma.sq 
## 0.2477825
{% endhighlight %}

The between-study heterogeneity estimate is considerably larger than the moment estimate from `robumeta`. Together with the difference in weighting, this leads to some changes in the coefficient estimates and their estimated precision:


{% highlight r %}
RobustResults(meta2)
{% endhighlight %}



{% highlight text %}
## 
## t test of coefficients:
## 
##           Estimate Std. Error t value Pr(>|t|)   
## intrcpt -0.8907096  0.4148219 -2.1472 0.038783 * 
## males    0.0163074  0.0055805  2.9222 0.006052 **
## college  0.3180139  0.2273396  1.3988 0.170658   
## binge   -0.0984026  0.0897269 -1.0967 0.280265   
## ---
## Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1
{% endhighlight %}

It is important to keep in mind that the estimate of between-study heterogeneity depends on the posited model for the covariance structure, including the assumed value of $$\rho$$. HTJ recommend conducting sensitivity analysis across a range of values for the within-study effect correlation. Re-calculating the value of $$\sigma^2$$ for $$\rho$$ between 0.0 and 0.9 yields the following:


{% highlight r %}
sigma2 <- function(rho) {
  covMat <- as.matrix(bdiag(with(corrdat, tapply(var_mean, studyid, equicorr, rho = rho, simplify = FALSE))))
  rma.mv(yi = effectsize ~ males + college + binge, 
                  V = covMat, random = ~ 1 | studyid, 
                  data = corrdat,
                  method = "REML")$sigma2
}
rho_sens <- seq(0,0.9,0.1)
sigma2_sens <- sapply(rho_sens, sigma2)
cbind(rho = rho_sens, sigma2 = round(sigma2_sens, 4))
{% endhighlight %}



{% highlight text %}
##       rho sigma2
##  [1,] 0.0 0.2519
##  [2,] 0.1 0.2513
##  [3,] 0.2 0.2507
##  [4,] 0.3 0.2502
##  [5,] 0.4 0.2497
##  [6,] 0.5 0.2492
##  [7,] 0.6 0.2487
##  [8,] 0.7 0.2482
##  [9,] 0.8 0.2478
## [10,] 0.9 0.2474
{% endhighlight %}

The between-study heterogeneity is quite insensitive to the assumed value of $$\rho$$. 

The difference between the results based on `metafor` versus on `robumeta` appears to be due to the subtle difference in the weighting approach: `metafor` uses block-diagonal weights that contain off-diagonal terms for effects drawn from a common study, whereas `robumeta` uses entirely diagonal weights.
