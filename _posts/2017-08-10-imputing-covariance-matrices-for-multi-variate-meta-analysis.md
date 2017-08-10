---
layout: post
title: Imputing covariance matrices for meta-analysis of correlated effects
date: August 10, 2017
tags: [meta-analysis, sandwiches, R, programming]
permalink: imputing-covariance-matrices-for-multi-variate-meta-analysis
---

In many systematic reviews, it is common for eligible studies to contribute effect size estimates from not just one, but _multiple_ relevant outcome measures, for a common sample of participants. If those outcomes are orrelated, then [so too will be the effect size estimates]({{ site.url }}/Correlations-between-SMDs). To estimate the degree of correlation, you would need the sample correlation among the outcomes---information that is woefully uncommon for primary studies to report (and best of luck to you if you try to follow up with author queries). Thus, the meta-analyst is often left in a situation where the sampling _variances_ of the effect size estimates can be reasonably well approximated, but the sampling _covariances_ are unknown for some or all studies. 

Several solutions to this conundrum have been proposed in the meta-analysis methodology literature. One possible strategy is to just impute a correlation based on subject-matter knowledge (or at least feigned expertise), and assume that this correlation is constant across studies. This analysis could be supplemented with sensitivity analyses to examine the extent to which the parameter estimates and inferences are sensitive to alternative assumptions about the inter-correlation of effects within studies. A related strategy, described by [Wei and Higgins (2013)](https://dx.doi.org/10.1002/sim.5679), is to meta-analyze any available correlation estimates and then use the results to impute correlations for any studies with missing correlations. 

Both of these approaches require the meta-analyst to calculate block-diagonal sampling covariance matrices for the effect size estimates, which can be a bit unwieldy. I often use the impute-the-correlation strategy in my meta-analysis work and have written a helper function to compute covariance matrices, given known sampling variances and imputed correlations for each study. In the interest of not repeating myself, I've added the function to the latest version of my clubSandwich package. In this post, I'll explain the function and demonstrate how to use it for conducting meta-analysis of correlated effect size estimates. 

## An R function for block-diagonal covariance matrices

Here is the function: 


{% highlight r %}
library(clubSandwich)
impute_covariance_matrix
{% endhighlight %}



{% highlight text %}
## function (vi, cluster, r, return_list = identical(as.factor(cluster), 
##     sort(as.factor(cluster)))) 
## {
##     vi_list <- split(vi, cluster)
##     r_list <- rep_len(r, length(vi_list))
##     vcov_list <- Map(function(V, rho) (rho + diag(1 - rho, nrow = length(V))) * 
##         tcrossprod(sqrt(V)), V = vi_list, rho = r_list)
##     if (return_list) {
##         return(vcov_list)
##     }
##     else {
##         vcov_mat <- metafor::bldiag(vcov_list)
##         cluster_index <- order(order(cluster))
##         return(vcov_mat[cluster_index, cluster_index])
##     }
## }
## <environment: namespace:clubSandwich>
{% endhighlight %}

The function takes three required arguments: 

* `vi` is a vector of sampling variances.
* `cluster` is a vector identifying the study from which effect size estimates are drawn. Effects with the same value of `cluster` will be treated as correlated.
* `r` is the assumed value(s) of the correlation between effect size estimates from each study. Note that `r` can also be a vector with separate values for each study. 

Here is a simple example to demonstrate how the function works. Say that there are just three studies, contributing 2, 3, and 4 effects, respectively. I'll just make up some values for the effect sizes and variances:

{% highlight r %}
dat <- data.frame(study = rep(LETTERS[1:3], 2:4), 
                  yi = rnorm(9), 
                  vi = 4:12)
dat
{% endhighlight %}



{% highlight text %}
##   study         yi vi
## 1     A  1.5684473  4
## 2     A -0.7277218  5
## 3     B -0.4700095  6
## 4     B -1.1516367  7
## 5     B -1.2375938  8
## 6     C -0.7903151  9
## 7     C  0.7269549 10
## 8     C  0.1689559 11
## 9     C  1.5180190 12
{% endhighlight %}

I'll assume that effect size estimates from a given study are correlated at 0.7:

{% highlight r %}
V_list <- impute_covariance_matrix(vi = dat$vi, cluster = dat$study, r = 0.7)
V_list
{% endhighlight %}



{% highlight text %}
## $A
##          [,1]     [,2]
## [1,] 4.000000 3.130495
## [2,] 3.130495 5.000000
## 
## $B
##          [,1]     [,2]     [,3]
## [1,] 6.000000 4.536518 4.849742
## [2,] 4.536518 7.000000 5.238320
## [3,] 4.849742 5.238320 8.000000
## 
## $C
##          [,1]      [,2]      [,3]      [,4]
## [1,] 9.000000  6.640783  6.964912  7.274613
## [2,] 6.640783 10.000000  7.341662  7.668116
## [3,] 6.964912  7.341662 11.000000  8.042388
## [4,] 7.274613  7.668116  8.042388 12.000000
{% endhighlight %}

The result is a list of matrices, where each entry corresponds to the variance-covariance matrix of effects from a given study. To see that the results are correct, let's examine the correlation matrix implied by these correlation matrices:


{% highlight r %}
cov2cor(V_list$A)
{% endhighlight %}



{% highlight text %}
##      [,1] [,2]
## [1,]  1.0  0.7
## [2,]  0.7  1.0
{% endhighlight %}



{% highlight r %}
cov2cor(V_list$B)
{% endhighlight %}



{% highlight text %}
##      [,1] [,2] [,3]
## [1,]  1.0  0.7  0.7
## [2,]  0.7  1.0  0.7
## [3,]  0.7  0.7  1.0
{% endhighlight %}



{% highlight r %}
cov2cor(V_list$C)
{% endhighlight %}



{% highlight text %}
##      [,1] [,2] [,3] [,4]
## [1,]  1.0  0.7  0.7  0.7
## [2,]  0.7  1.0  0.7  0.7
## [3,]  0.7  0.7  1.0  0.7
## [4,]  0.7  0.7  0.7  1.0
{% endhighlight %}
As requested, effects are assumed to be equi-correlated with r = 0.7.

If the data are sorted in order of the cluster IDs, then the list of matrices returned by `impute_covariance_matrix()` can be fed directly into the `rma.mv` function in metafor (as I demonstrate below). However, if the data are not sorted by `cluster`, then feeding in the list of matrices will not work correctly. Instead, the full $$N \times N$$ variance-covariance matrix (where $$N$$ is the total number of effect size estimates) will need to be calculated so that the rows and columns appear in the correct order. To address this possibility, the function includes an optional argument, `return_list`, which determines whether to output a list of matrices (one matrix per study/cluster) or a single matrix corresponding to the full variance-covariance matrix across all studies. By default, `return_list` tests for whether the `cluster` argument is sorted and returns the appropriate form. The argument can also be set directly by the user. 

Here's what happens if we feed in the data in a different order:

{% highlight r %}
dat_scramble <- dat[sample(nrow(dat)),]
dat_scramble
{% endhighlight %}



{% highlight text %}
##   study         yi vi
## 3     B -0.4700095  6
## 8     C  0.1689559 11
## 4     B -1.1516367  7
## 1     A  1.5684473  4
## 9     C  1.5180190 12
## 5     B -1.2375938  8
## 7     C  0.7269549 10
## 6     C -0.7903151  9
## 2     A -0.7277218  5
{% endhighlight %}



{% highlight r %}
V_mat <- round(impute_covariance_matrix(vi = dat_scramble$vi, cluster = dat_scramble$study, r = 0.7), 3)
V_mat
{% endhighlight %}



{% highlight text %}
##        [,1]   [,2]  [,3] [,4]   [,5]  [,6]   [,7]  [,8] [,9]
##  [1,] 6.000  0.000 4.537 0.00  0.000 4.850  0.000 0.000 0.00
##  [2,] 0.000 11.000 0.000 0.00  8.042 0.000  7.342 6.965 0.00
##  [3,] 4.537  0.000 7.000 0.00  0.000 5.238  0.000 0.000 0.00
##  [4,] 0.000  0.000 0.000 4.00  0.000 0.000  0.000 0.000 3.13
##  [5,] 0.000  8.042 0.000 0.00 12.000 0.000  7.668 7.275 0.00
##  [6,] 4.850  0.000 5.238 0.00  0.000 8.000  0.000 0.000 0.00
##  [7,] 0.000  7.342 0.000 0.00  7.668 0.000 10.000 6.641 0.00
##  [8,] 0.000  6.965 0.000 0.00  7.275 0.000  6.641 9.000 0.00
##  [9,] 0.000  0.000 0.000 3.13  0.000 0.000  0.000 0.000 5.00
{% endhighlight %}

To see that this is correct, check that the diagonal entries of `V_mat` are the same as `vi`:

{% highlight r %}
all.equal(dat_scramble$vi, diag(V_mat))
{% endhighlight %}



{% highlight text %}
## [1] TRUE
{% endhighlight %}

## An example with real data

[Kalaian and Raudenbush (1996)](https://dx.doi.org/10.1037/1082-989X.1.3.227) introduced a multi-variate random effects model, which can be used to perform a joint meta-analysis of studies that contribute effect sizes on distinct, related outcome constructs. They demonstrate the model using data from a synthesis on the effects of SAT coaching, where many studies reported effects on both the math and verbal portions of the SAT. The data are available in the `clubSandwich` package:


{% highlight r %}
library(dplyr, warn.conflicts=FALSE)
data(SATcoaching)

# calculate the mean of log of coaching hours
mean_hrs_ln <- 
  SATcoaching %>% 
  group_by(study) %>%
  summarise(hrs_ln = mean(log(hrs))) %>%
  summarise(hrs_ln = mean(hrs_ln, na.rm = TRUE))

# clean variables, sort by study ID
SATcoaching <- 
  SATcoaching %>%
  mutate(
    study = as.factor(study),
    hrs_ln = log(hrs) - mean_hrs_ln$hrs_ln
  ) %>%
  arrange(study, test)

SATcoaching %>%
  select(study, year, test, d, V, hrs_ln) %>%
  head(n = 20)
{% endhighlight %}



{% highlight text %}
##                    study year   test     d      V      hrs_ln
## 1  Alderman & Powers (A) 1980 Verbal  0.22 0.0817 -0.54918009
## 2  Alderman & Powers (B) 1980 Verbal  0.09 0.0507 -0.19250515
## 3  Alderman & Powers (C) 1980 Verbal  0.14 0.1045 -0.14371499
## 4  Alderman & Powers (D) 1980 Verbal  0.14 0.0442 -0.19250515
## 5  Alderman & Powers (E) 1980 Verbal -0.01 0.0535 -0.70333077
## 6  Alderman & Powers (F) 1980 Verbal  0.14 0.0557 -0.88565233
## 7  Alderman & Powers (G) 1980 Verbal  0.18 0.0561 -0.09719497
## 8  Alderman & Powers (H) 1980 Verbal  0.01 0.1151  1.31157225
## 9              Burke (A) 1986 Verbal  0.50 0.0825  1.41693276
## 10             Burke (B) 1986 Verbal  0.74 0.0855  1.41693276
## 11                Coffin 1987   Math  0.33 0.2534  0.39528152
## 12                Coffin 1987 Verbal -0.23 0.2517  0.39528152
## 13            Curran (A) 1988   Math -0.08 0.1065 -0.70333077
## 14            Curran (A) 1988 Verbal -0.10 0.1066 -0.70333077
## 15            Curran (B) 1988   Math -0.29 0.1015 -0.70333077
## 16            Curran (B) 1988 Verbal -0.14 0.1007 -0.70333077
## 17            Curran (C) 1988   Math -0.34 0.1104 -0.70333077
## 18            Curran (C) 1988 Verbal -0.16 0.1092 -0.70333077
## 19            Curran (D) 1988   Math -0.06 0.1089 -0.70333077
## 20            Curran (D) 1988 Verbal -0.07 0.1089 -0.70333077
{% endhighlight %}

The correlation betwen math and verbal test scores are not available, but it seems reasonable to use a correlation of r = 0.66, as reported in the SAT technical information. To synthesize these effects, I'll first compute the required variance-covariances:

{% highlight r %}
V_list <- impute_covariance_matrix(vi = SATcoaching$V, 
                                   cluster = SATcoaching$study, 
                                   r = 0.66)
{% endhighlight %}

This can then be fed into `metafor` to estimate a fixed effect or random effects meta-analysis or meta-regression models:


{% highlight r %}
library(metafor, quietly = TRUE)
{% endhighlight %}



{% highlight text %}
## Loading 'metafor' package (version 1.9-9). For an overview 
## and introduction to the package please type: help(metafor).
{% endhighlight %}



{% highlight r %}
# bivariate fixed effect meta-analysis
MVFE_null <- rma.mv(d ~ 0 + test, V = V_list, data = SATcoaching)
MVFE_null
{% endhighlight %}



{% highlight text %}
## 
## Multivariate Meta-Analysis Model (k = 67; method: REML)
## 
## Variance Components: none
## 
## Test for Residual Heterogeneity: 
## QE(df = 65) = 72.1630, p-val = 0.2532
## 
## Test of Moderators (coefficient(s) 1,2): 
## QM(df = 2) = 19.8687, p-val < .0001
## 
## Model Results:
## 
##             estimate      se    zval    pval   ci.lb   ci.ub     
## testMath      0.1316  0.0331  3.9783  <.0001  0.0668  0.1965  ***
## testVerbal    0.1215  0.0313  3.8783  0.0001  0.0601  0.1829  ***
## 
## ---
## Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1
{% endhighlight %}



{% highlight r %}
# bivariate fixed effect meta-regression
MVFE_hrs <- rma.mv(d ~ 0 + test + test:hrs_ln, V = V_list, 
                   data = SATcoaching)
{% endhighlight %}



{% highlight text %}
## Warning in rma.mv(d ~ 0 + test + test:hrs_ln, V = V_list, data =
## SATcoaching): Rows with NAs omitted from model fitting.
{% endhighlight %}



{% highlight r %}
MVFE_hrs
{% endhighlight %}



{% highlight text %}
## 
## Multivariate Meta-Analysis Model (k = 65; method: REML)
## 
## Variance Components: none
## 
## Test for Residual Heterogeneity: 
## QE(df = 61) = 67.9575, p-val = 0.2523
## 
## Test of Moderators (coefficient(s) 1,2,3,4): 
## QM(df = 4) = 23.7181, p-val < .0001
## 
## Model Results:
## 
##                    estimate      se    zval    pval    ci.lb   ci.ub    
## testMath             0.0946  0.0402  2.3547  0.0185   0.0159  0.1734   *
## testVerbal           0.1119  0.0341  3.2762  0.0011   0.0449  0.1788  **
## testMath:hrs_ln      0.1034  0.0546  1.8946  0.0581  -0.0036  0.2103   .
## testVerbal:hrs_ln    0.0601  0.0442  1.3592  0.1741  -0.0266  0.1467    
## 
## ---
## Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1
{% endhighlight %}



{% highlight r %}
# bivariate random effects meta-analysis
MVRE_null <- rma.mv(d ~ 0 + test, V = V_list, data = SATcoaching, 
                 random = ~ test | study, struct = "UN")
MVRE_null
{% endhighlight %}



{% highlight text %}
## 
## Multivariate Meta-Analysis Model (k = 67; method: REML)
## 
## Variance Components: 
## 
## outer factor: study (nlvls = 47)
## inner factor: test  (nlvls = 2)
## 
##             estim    sqrt  k.lvl  fixed   level
## tau^2.1    0.0122  0.1102     29     no    Math
## tau^2.2    0.0026  0.0507     38     no  Verbal
## 
##         rho.Math  rho.Vrbl    Math  Vrbl
## Math           1   -1.0000       -    no
## Verbal   -1.0000         1      20     -
## 
## Test for Residual Heterogeneity: 
## QE(df = 65) = 72.1630, p-val = 0.2532
## 
## Test of Moderators (coefficient(s) 1,2): 
## QM(df = 2) = 18.1285, p-val = 0.0001
## 
## Model Results:
## 
##             estimate      se    zval    pval   ci.lb   ci.ub     
## testMath      0.1379  0.0434  3.1783  0.0015  0.0528  0.2229   **
## testVerbal    0.1168  0.0337  3.4603  0.0005  0.0506  0.1829  ***
## 
## ---
## Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1
{% endhighlight %}



{% highlight r %}
# bivariate random effects meta-regression
MVRE_hrs <- rma.mv(d ~ 0 + test + test:hrs_ln, V = V_list, 
                   data = SATcoaching,
                   random = ~ test | study, struct = "UN")
{% endhighlight %}



{% highlight text %}
## Warning in rma.mv(d ~ 0 + test + test:hrs_ln, V = V_list, data =
## SATcoaching, : Rows with NAs omitted from model fitting.
{% endhighlight %}



{% highlight r %}
MVRE_hrs
{% endhighlight %}



{% highlight text %}
## 
## Multivariate Meta-Analysis Model (k = 65; method: REML)
## 
## Variance Components: 
## 
## outer factor: study (nlvls = 46)
## inner factor: test  (nlvls = 2)
## 
##             estim    sqrt  k.lvl  fixed   level
## tau^2.1    0.0152  0.1234     28     no    Math
## tau^2.2    0.0014  0.0373     37     no  Verbal
## 
##         rho.Math  rho.Vrbl    Math  Vrbl
## Math           1   -1.0000       -    no
## Verbal   -1.0000         1      19     -
## 
## Test for Residual Heterogeneity: 
## QE(df = 61) = 67.9575, p-val = 0.2523
## 
## Test of Moderators (coefficient(s) 1,2,3,4): 
## QM(df = 4) = 23.6459, p-val < .0001
## 
## Model Results:
## 
##                    estimate      se    zval    pval    ci.lb   ci.ub    
## testMath             0.0893  0.0507  1.7631  0.0779  -0.0100  0.1887   .
## testVerbal           0.1062  0.0357  2.9738  0.0029   0.0362  0.1762  **
## testMath:hrs_ln      0.1694  0.0725  2.3354  0.0195   0.0272  0.3116   *
## testVerbal:hrs_ln    0.0490  0.0459  1.0681  0.2855  -0.0409  0.1389    
## 
## ---
## Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1
{% endhighlight %}

The results of fitting this model using restricted maximum likelihood with metafor are actually a bit different from the estimates reported in the original paper, potentially because Kalaian and Raudenbush use a Cholesky decomposition of the sampling covariances, which alters the interpretation of the random effects variance components. The metafor fit is also a bit goofy because the correlation between the random effects for math and verbal scores is very close to -1, although evidently it is not uncommon to obtain such degenerate estimates of the random effects structure. 

## Robust variance estimation.

Experienced meta-analysts will no doubt point out that a further, alternative analytic strategy to the one described above would be to use robust variance estimation methods (RVE; [Hedges, Tipton, & Johnson](https://dx.doi.org/10.1002/jrsm.5)). However, RVE is not so much an alternative strategy as it is a complementary technique, which can be used in combination with any of the models estimated above. Robust standard errors and hypothesis tests can readily be obtained with the [clubSandwich package](https://cran.r-project.org/package=clubSandwich). Here's how to do it for the random effects meta-regression model:


{% highlight r %}
library(clubSandwich)
coef_test(MVRE_hrs, vcov = "CR2")
{% endhighlight %}



{% highlight text %}
##                Coef Estimate     SE  d.f. p-val (Satt) Sig.
## 1          testMath   0.0893 0.0360 20.75       0.0218    *
## 2        testVerbal   0.1062 0.0215 16.45       <0.001  ***
## 3   testMath:hrs_ln   0.1694 0.1010  7.90       0.1325     
## 4 testVerbal:hrs_ln   0.0490 0.0414  7.57       0.2725
{% endhighlight %}

RVE is also available in the  [robumeta R package](https://CRAN.R-project.org/package=robumeta), but there are several differences between the implementation there and the method I've demonstrated here. From the user's perspective, an advantage of robumeta is that it does all of the covariance imputation calculations "under the hood," whereas with metafor the calculations need to be done prior to fitting the model. Beyond this, differences include:

* robumeta uses a specific random effects structure that can't be controlled by the user, whereas metafor can be used to estimate a variety of different random effects structures;
* robumeta uses a moment estimator for the between-study variance, whereas metafor provides FML or REML estimation;
* robumeta uses semi-efficient, diagonal weights when fitting the meta-regression, whereas metafor uses weights that are fully efficient (exactly inverse-variance) under the working model. 

The advantages and disadvantages of these two approaches involve some subtleties that I'll get into in a future post. 
