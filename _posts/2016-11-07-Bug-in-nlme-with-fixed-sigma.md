---
layout: post
title: "Possible bug in nlme::lme with fixed sigma"
date: November 7, 2016
tags: [programming]
permalink: Bug-in-nlme-with-fixed-sigma
---

About one year ago, the `nlme` package introduced a feature that allowed the user to specify a fixed value for the residual variance in linear mixed effect models fitted with `lme()`. This feature is interesting to me because, when used with the `varFixed()` specification for the residual weights, it allows for estimation of a wide variety of meta-analysis models, including basic random effects models, bivariate models for estimating effects by trial arm, and other sorts of multivariate/multi-level random effects models. However, in kicking the tires on this feature, I noticed that the results that it produces are not quite consistent with the results produced by `metafor`, which is the main package I use for fitting meta-analytic models. 

In this post, I document several examples of discrepant estimates between `lme()` and `rma.mv()`, using standard datasets included in the `metafor` package. The main take-aways are:

1. The discrepancies arise only with `REML` estimation (not with `ML` estimation). 
2. The discrepancies are present whether or not the `varFixed` specification is used.
3. The discrepancies are mostly small (with minimal impact on the standard errors of the fixed effect estimates), but are larger than I would expect from computational/convergence differences alone.

Another example, based on a different dataset, is documented in [this bug report](https://bugs.r-project.org/bugzilla3/show_bug.cgi?id=16975). 

### Basic random effects model

This example fits a basic random effects model to the BCG vaccine data, available within `metafor`:


{% highlight r %}
library(metafor)
library(nlme)

bcg_example <- function(method, constant_var = FALSE) {
  
  data(dat.bcg)
  dat <- escalc(measure="OR", ai=tpos, bi=tneg, ci=cpos, di=cneg, data=dat.bcg)
  
  v_bar <- mean(dat$vi)
  if (constant_var) dat$vi <- v_bar
  
  # random-effects model using rma.uni()
  LOR_uni <- with(rma(yi, vi, data=dat, method = method), 
                  data.frame(f = "rma.uni", est = as.numeric(b), se = se, tau = sqrt(tau2)))
  
  # random-effects model using rma.mv()
  LOR_mv <- with(rma.mv(yi, vi, random = ~ 1 | trial, data=dat, method = method), 
                 data.frame(f = "rma.mv", est = as.numeric(b), se = se, tau = sqrt(sigma2)))
  
  # random-effects model using lme()
  if (constant_var) {
    LOR_lme_fit <- lme(yi ~ 1, data = dat, method = method, 
                       random = ~ 1 | trial,
                       control = lmeControl(sigma = sqrt(v_bar)))
    tau <- sqrt(as.numeric(coef(LOR_lme_fit$modelStruct$reStruct, unconstrained = FALSE)) * v_bar) 
  } else {
    LOR_lme_fit <- lme(yi ~ 1, data = dat, method = method, 
                       random = ~ 1 | trial,
                       weights = varFixed(~ vi),
                       control = lmeControl(sigma = 1))
    tau <- sqrt(as.numeric(coef(LOR_lme_fit$modelStruct$reStruct, unconstrained = FALSE)))
  }
  LOR_lme <- data.frame(f = "lme", 
                        est = as.numeric(fixef(LOR_lme_fit)), 
                        se = as.numeric(sqrt(vcov(LOR_lme_fit))), 
                        tau = tau)
  
  rbind(LOR_uni, LOR_mv, LOR_lme)
  
}

bcg_example("REML", constant_var = FALSE)
{% endhighlight %}



{% highlight text %}
##         f        est        se       tau
## 1 rma.uni -0.7451778 0.1860279 0.5811816
## 2  rma.mv -0.7451778 0.1860280 0.5811818
## 3     lme -0.7471979 0.1916902 0.6030524
{% endhighlight %}



{% highlight r %}
bcg_example("REML", constant_var = TRUE)
{% endhighlight %}



{% highlight text %}
##         f        est        se       tau
## 1 rma.uni -0.7716272 0.1977007 0.5911451
## 2  rma.mv -0.7716272 0.1977007 0.5911452
## 3     lme -0.7716272 0.1899448 0.5571060
{% endhighlight %}



{% highlight r %}
bcg_example("ML", constant_var = FALSE)
{% endhighlight %}



{% highlight text %}
##         f        est        se       tau
## 1 rma.uni -0.7419668 0.1779534 0.5499605
## 2  rma.mv -0.7419669 0.1779534 0.5499608
## 3     lme -0.7419668 0.1779534 0.5499605
{% endhighlight %}



{% highlight r %}
bcg_example("ML", constant_var = TRUE)
{% endhighlight %}



{% highlight text %}
##         f        est        se       tau
## 1 rma.uni -0.7716272 0.1899447 0.5571059
## 2  rma.mv -0.7716272 0.1899447 0.5571059
## 3     lme -0.7716272 0.1899447 0.5571060
{% endhighlight %}

### Bi-variate random effects model

This example fits a bi-variate random effects model, also to the BCG vaccine data:


{% highlight r %}
bcg_bivariate <- function(method, constant_var = FALSE) {
  data(dat.bcg)
  dat_long <- to.long(measure="OR", ai=tpos, bi=tneg, ci=cpos, di=cneg, data=dat.bcg)
  levels(dat_long$group) <- c("exp", "con")
  dat_long$group <- relevel(dat_long$group, ref="con")
  dat_long <- escalc(measure="PLO", xi=out1, mi=out2, data=dat_long)

  v_bar <- mean(dat_long$vi)
  
  if (constant_var) dat_long$vi <- v_bar
  
  # bivariate random-effects model using rma.mv()
  
  bv_rma_fit <- rma.mv(yi, vi, mods = ~ group, 
                       random = ~ group | study, 
                       struct = "UN", method = method,
                       data=dat_long)
  bv_rma <- with(bv_rma_fit, data.frame(f = "rma.mv",
                                        logLik = fit.stats[1,2],
                                        tau1 = sqrt(tau2[1]),
                                        tau2 = sqrt(tau2[2])))
  
  # bivariate random-effects model using lme()
  if (constant_var) {
    bv_lme_fit <- lme(yi ~ group, data = dat_long, method = method, 
                      random = ~ group | study,
                      control = lmeControl(sigma = sqrt(v_bar)))
    tau_sq <- colSums(coef(bv_lme_fit$modelStruct$reStruct, unconstrained = FALSE) * matrix(c(1,0,0, 1,2,1), 3, 2)) * v_bar
    
  } else {
    bv_lme_fit <- lme(yi ~ group, data = dat_long, method = method, 
                      random = ~ group | study,
                      weights = varFixed(~ vi),
                      control = lmeControl(sigma = 1))
    
    tau_sq <- colSums(coef(bv_lme_fit$modelStruct$reStruct, unconstrained = FALSE) * matrix(c(1,0,0, 1,2,1), 3, 2))
    
  }
  
  bv_lme <- data.frame(f = "lme",
                       logLik = bv_lme_fit$logLik,
                       tau1 = sqrt(tau_sq[1]),
                       tau2 = sqrt(tau_sq[2]))
  
  rbind(bv_rma, bv_lme)
  
}

bcg_bivariate("REML", constant_var = FALSE)
{% endhighlight %}



{% highlight text %}
##        f    logLik     tau1     tau2
## 1 rma.mv -31.50167 1.617807 1.244429
## 2    lme -32.32612 1.631619 1.254437
{% endhighlight %}



{% highlight r %}
bcg_bivariate("REML", constant_var = TRUE)
{% endhighlight %}



{% highlight text %}
##        f    logLik     tau1     tau2
## 1 rma.mv -31.09623 1.644897 1.191679
## 2    lme -37.06035 1.578435 1.142260
{% endhighlight %}



{% highlight r %}
bcg_bivariate("ML", constant_var = FALSE)
{% endhighlight %}



{% highlight text %}
##        f    logLik     tau1     tau2
## 1 rma.mv -31.54211 1.551558 1.196399
## 2    lme -33.08793 1.551558 1.196399
{% endhighlight %}



{% highlight r %}
bcg_bivariate("ML", constant_var = TRUE)
{% endhighlight %}



{% highlight text %}
##        f     logLik     tau1    tau2
## 1 rma.mv -31.135713 1.578434 1.14226
## 2    lme  -2.237355 1.578434 1.14226
{% endhighlight %}

### Three-level random-effects model

This example fits a three-level random-effects model to the data from Konstantopoulos (2011):


{% highlight r %}
Konstantopoulos <- function(method, constant_var = FALSE) {
  
  dat <- get(data(dat.konstantopoulos2011))
  v_bar <- mean(dat$vi)
  if (constant_var) dat$vi <- v_bar
  
  # multilevel random-effects model using rma.mv()
  ml_rma_fit <- rma.mv(yi, vi, random = ~ 1 | district/school, data=dat, method = method)
  
  ml_rma <- with(ml_rma_fit, 
                 data.frame(f = "rma.mv", 
                            logLik = fit.stats[1,2],
                            est = as.numeric(b), 
                            se = se, 
                            tau1 = sqrt(sigma2[1]), 
                            tau2 = sqrt(sigma2[2])))
  
  # multilevel random-effects model using lme()
  if (constant_var) {
    ml_lme_fit <- lme(yi ~ 1, data = dat, method = method, 
                      random = ~ 1 | district / school,
                      control = lmeControl(sigma = sqrt(v_bar)))
    tau <- sqrt(as.numeric(coef(ml_lme_fit$modelStruct$reStruct, unconstrained = FALSE)) * v_bar)
    
  } else {
    ml_lme_fit <- lme(yi ~ 1, data = dat, method = method, 
                      random = ~ 1 | district / school,
                      weights = varFixed(~ vi),
                      control = lmeControl(sigma = 1))
    tau <- sqrt(as.numeric(coef(ml_lme_fit$modelStruct$reStruct, unconstrained = FALSE)))
    
  }  
  ml_lme <- data.frame(f = "lme",
                       logLik = ml_lme_fit$logLik,
                       est = as.numeric(fixef(ml_lme_fit)),
                       se = as.numeric(sqrt(diag(vcov(ml_lme_fit)))),
                       tau1 = tau[2],
                       tau2 = tau[1])
  
  rbind(ml_rma, ml_lme)
  
}

Konstantopoulos("REML", constant_var = FALSE)
{% endhighlight %}



{% highlight text %}
##        f     logLik       est         se      tau1      tau2
## 1 rma.mv  -7.958724 0.1847132 0.08455592 0.2550724 0.1809324
## 2    lme -10.716781 0.1841827 0.08641374 0.2605790 0.1884588
{% endhighlight %}



{% highlight r %}
Konstantopoulos("REML", constant_var = TRUE)
{% endhighlight %}



{% highlight text %}
##        f     logLik       est         se      tau1      tau2
## 1 rma.mv  -9.724839 0.1724309 0.08052701 0.2401816 0.1878155
## 2    lme -16.119274 0.1724309 0.07980479 0.2380275 0.1848778
{% endhighlight %}



{% highlight r %}
Konstantopoulos("ML", constant_var = FALSE)
{% endhighlight %}



{% highlight text %}
##        f    logLik       est         se      tau1      tau2
## 1 rma.mv -7.983047 0.1844554 0.08048168 0.2402881 0.1812865
## 2    lme -8.394936 0.1844554 0.08048168 0.2402881 0.1812865
{% endhighlight %}



{% highlight r %}
Konstantopoulos("ML", constant_var = TRUE)
{% endhighlight %}



{% highlight text %}
##        f   logLik       est         se      tau1      tau2
## 1 rma.mv -9.75044 0.1712365 0.07645094 0.2250687 0.1881229
## 2    lme 90.21692 0.1712365 0.07645093 0.2250687 0.1881228
{% endhighlight %}

