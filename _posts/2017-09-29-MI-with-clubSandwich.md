---
layout: post
title: Pooling clubSandwich results across multiple imputations
date: September 29, 2017
tags: [sandwiches, R]
permalink: MI-with-clubSandwich
---

A colleague recently asked me about how to apply cluster-robust hypothesis tests and confidence intervals, as calculated with the [clubSandwich package](https://CRAN.R-project.org/package=clubSandwich), when dealing with multiply imputed datasets.
Standard methods (i.e., Rubin's rules) for pooling estimates from multiple imputed datasets are developed under the assumption that the full-data estimates are approximately normally distributed. However, this might not be reasonable when working with test statistics based on cluster-robust variance estimators, which can be imprecise when the number of clusters is small or the design matrix of predictors is unbalanced in certain ways. [Barnard and Rubin (1999)](https://doi.org/10.1093/biomet/86.4.948) proposed a small-sample correction for tests and confidence intervals based on multiple imputed datasets. In this post, I'll show how to implement their technique using the output of `clubSandwich`, with multiple imputations generated using the [`mice` package](https://cran.r-project.org/package=mice). 

### Setup

To begin, let me create missingness in a dataset containing multiple clusters of observations:


{% highlight r %}
library(mlmRev)
library(mice)
library(dplyr)

data(bdf)

bdf <- bdf %>%
  select(schoolNR, IQ.verb, IQ.perf, sex, ses, langPRET, aritPRET, aritPOST) %>%
  mutate(
    schoolNR = factor(schoolNR),
    sex = as.numeric(sex)
    ) %>%
  filter(as.numeric(schoolNR) <= 30) %>%
  droplevels()

bdf_missing <- 
  bdf %>% 
  select(-schoolNR) %>%
  ampute(run = TRUE)

bdf_missing <- 
  bdf_missing$amp %>%
  mutate(schoolNR = bdf$schoolNR)

summary(bdf_missing)
{% endhighlight %}



{% highlight text %}
##     IQ.verb         IQ.perf            sex             ses       
##  Min.   : 4.00   Min.   : 5.333   Min.   :1.000   Min.   :10.00  
##  1st Qu.:10.50   1st Qu.: 9.333   1st Qu.:1.000   1st Qu.:20.00  
##  Median :11.50   Median :10.667   Median :1.000   Median :28.00  
##  Mean   :11.69   Mean   :10.779   Mean   :1.468   Mean   :28.81  
##  3rd Qu.:13.00   3rd Qu.:12.333   3rd Qu.:2.000   3rd Qu.:38.00  
##  Max.   :18.00   Max.   :16.667   Max.   :2.000   Max.   :50.00  
##  NA's   :30      NA's   :33       NA's   :38      NA's   :42     
##     langPRET        aritPRET        aritPOST        schoolNR  
##  Min.   :15.00   Min.   : 1.00   Min.   : 2.00   40     : 35  
##  1st Qu.:29.00   1st Qu.: 9.00   1st Qu.:12.00   54     : 31  
##  Median :34.00   Median :11.00   Median :18.00   55     : 30  
##  Mean   :33.78   Mean   :11.59   Mean   :17.63   38     : 28  
##  3rd Qu.:39.00   3rd Qu.:14.00   3rd Qu.:23.00   1      : 25  
##  Max.   :48.00   Max.   :20.00   Max.   :30.00   18     : 24  
##  NA's   :50      NA's   :33      NA's   :44      (Other):354
{% endhighlight %}

Now I'll use `mice` to create 10 multiply imputed datasets:


{% highlight r %}
Impute_bdf <- mice(bdf_missing, m=10, meth="norm.nob", seed=24)
{% endhighlight %}

Am I imputing while ignoring the hierarchical structure of the data? Yes, yes I am. Is this is a good way to do imputation? Probably not. But this is a quick and dirty example, so we're going to have to live with it. 

### Model

Suppose that the goal of our analysis is to estimate the coefficients of the following regression model:

$$
\text{aritPOST}_{ij} = \beta_0 + \beta_1 \text{aritPRET}_{ij} + \beta_2 \text{langPRET}_{ij} + \beta_3 \text{sex}_{ij} + \beta_4 \text{SES}_{ij} + e_{ij},
$$
where $$i$$ indexes students and $$j$$ indexes schools, and where we allow for the possibility that errors from the same cluster are correlated in an unspecified way. With complete data, we could estimate the model by ordinary least squares and then use `clubSandwich` to get standard errors that are robust to within-cluster dependence and heteroskedasticity. The code for this is as follows:


{% highlight r %}
library(clubSandwich)
lm_full <- lm(aritPOST ~ aritPRET + langPRET + sex + ses, data = bdf)
coef_test(lm_full, cluster = bdf$schoolNR, vcov = "CR2")
{% endhighlight %}



{% highlight text %}
##          Coef Estimate     SE d.f. p-val (Satt) Sig.
## 1 (Intercept)  -2.1921 1.3484 22.9       0.1177     
## 2    aritPRET   1.0053 0.0833 23.4       <0.001  ***
## 3    langPRET   0.2758 0.0294 24.1       <0.001  ***
## 4         sex  -1.2040 0.4706 23.8       0.0173    *
## 5         ses   0.0233 0.0266 20.5       0.3909
{% endhighlight %}

If cluster dependence were no concern, we could simply use the model-based standard errors and test statistics. The `mice` package provides functions that will fit the model to each imputed dataset and then combine them by Rubin's rules. The code is simply:


{% highlight r %}
with(data = Impute_bdf, 
     lm(aritPOST ~ aritPRET + langPRET + sex + ses)
     ) %>%
  pool(method = "Rubin") %>%
  summary() %>%
  round(3)
{% endhighlight %}



{% highlight text %}
##                est    se      t       df Pr(>|t|)  lo 95  hi 95 nmis   fmi
## (Intercept) -1.813 1.197 -1.515  430.240    0.130 -4.165  0.539   NA 0.149
## aritPRET     0.996 0.069 14.473 1298.298    0.000  0.861  1.131   33 0.085
## langPRET     0.279 0.038  7.353  467.018    0.000  0.205  0.354   50 0.142
## sex         -1.398 0.415 -3.365  924.662    0.001 -2.213 -0.582   38 0.101
## ses          0.021 0.020  1.046 1291.209    0.296 -0.018  0.059   42 0.085
##             lambda
## (Intercept)  0.145
## aritPRET     0.083
## langPRET     0.139
## sex          0.099
## ses          0.083
{% endhighlight %}

However, this approach ignores the possibility of correlation in the errors of units in the same cluster, which is clearly a concern in this dataset:

{% highlight r %}
# ratio of CRVE to conventional variance estimates
diag(vcovCR(lm_full, cluster = bdf$schoolNR, type = "CR2")) / 
  diag(vcov(lm_full))
{% endhighlight %}



{% highlight text %}
## (Intercept)    aritPRET    langPRET         sex         ses 
##   1.5296837   1.5493134   0.6938735   1.4567650   2.0053186
{% endhighlight %}

So we need a way to pool results based on the cluster-robust variance estimators, while also accounting for the relatively small number of clusters in this dataset. 

### Barnard & Rubin (1999)

[Barnard and Rubin (1999)](https://doi.org/10.1093/biomet/86.4.948) proposed a small-sample correction for tests and confidence intervals based on multiple imputed datasets that seems to work in this context. Rather than using large-sample normal approximations for inference, they derive an approximate degrees-of-freedom that combines uncertainty in the standard errors calculated from each imputed dataset with between-imputation uncertainty. The method is as follows. 

Suppose that we have $$m$$ imputed datasets. Let $$\hat\beta_{(j)}$$ be the estimated regression coefficient from imputed dataset $$j$$, with (in this case cluster-robust) sampling variance estimate $$V_{(j)}$$. Further, let $$\eta_{(j)}$$ be the degrees of freedom corresponding to $$V_{(j)}$$. To combine these estimates, calculate the averages across multiply imputed datasets:
$$
\bar\beta = \frac{1}{m}\sum_{j=1}^m \hat\beta_{(j)}, \qquad \bar{V} = \frac{1}{m}\sum_{j=1}^m V_{(j)}, \qquad \bar\eta = \frac{1}{m}\sum_{j=1}^m \eta_{(j)}.
$$
Also calculate the between-imputation variance 
$$
B = \frac{1}{m - 1} \sum_{j=1}^m \left(\hat\beta_{(j)} - \bar\beta\right)^2
$$
And then combine the between- and within- variance estimates using Rubin's rules:
$$
V_{total} = \bar{V} + \frac{m + 1}{m} B.
$$
The degrees of freedom associated with $$V_{total}$$ modify the estimated complete-data degrees of freedom $$\bar\eta$$ using quantities that depend on the fraction of missing information in a coefficient. The fraction of missing information is given by
$$
\hat\gamma_m = \frac{(m+1)B}{m V_{total}}
$$
The degrees of freedom are then given by
$$
\nu_{total} = \left(\frac{1}{\nu_m} + \frac{1}{\nu_{obs}}\right)^{-1},
$$
where
$$
\nu_m = \frac{(m - 1)}{\hat\gamma_m^2}, \quad \text{and} \quad \nu_{obs} = \frac{\bar\eta (\bar\eta + 1) (1 - \hat\gamma)}{\bar\eta + 3}.
$$
Hypothesis tests and confidence intervals are then based on the approximation
$$
\frac{\bar\beta - \beta_0}{\sqrt{V_{total}}} \ \stackrel{\cdot}{\sim} \ t(\nu_{total})
$$

### Implementation 

Here is how to carry out these calculations using the results of `clubSandwich::coef_test` and a bit of `dplyr`:


{% highlight r %}
# fit results with clubSandwich standard errors
vcov.robust <- function(object, ...) object$vcov

robustify <- function(x) {
  V_mat <- vcovCR(x, cluster = bdf$schoolNR, type = "CR2")
  x$vcov <- V_mat
  class(x) <- c("robust", class(x))
  return(x)
}

models_robust <- with(data = Impute_bdf, 
                      lm(aritPOST ~ aritPRET + langPRET + sex + ses) %>% 
                         coef_test(cluster=bdf$schoolNR, vcov="CR2")
                      ) 


# pool results with clubSandwich standard errors

robust_pooled <- 
  models_robust$analyses %>%
  
  # add coefficient names as a column
  lapply(function(x) {
    x$coef <- row.names(x)
    x
  }) %>%
  bind_rows() %>%
  as.data.frame() %>%
  
  # summarize by coefficient
  group_by(coef) %>%
  summarise(
    m = n(),
    B = var(beta),
    beta_bar = mean(beta),
    V_bar = mean(SE^2),
    eta_bar = mean(df)
  ) %>%
  
  mutate(
    
    # calculate intermediate quantities to get df
    V_total = V_bar + B * (m + 1) / m,
    gamma = ((m + 1) / m) * B / V_total,
    df_m = (m - 1) / gamma^2,
    df_obs = eta_bar * (eta_bar + 1) * (1 - gamma) / (eta_bar + 3),
    df = 1 / (1 / df_m + 1 / df_obs),
    
    # calculate summary quantities for output
    se = sqrt(V_total),
    t = beta_bar / se,
    p_val = 2 * pt(abs(t), df = df, lower.tail = FALSE),
    crit = qt(0.975, df = df),
    lo95 = beta_bar - se * crit,
    hi95 = beta_bar + se * crit
  )

robust_pooled %>%
  select(coef, est = beta_bar, se, t, df, p_val, lo95, hi95, gamma) %>%
  mutate_at(vars(est:gamma), round, 3)
{% endhighlight %}



{% highlight text %}
## # A tibble: 5 x 9
##          coef    est    se      t     df p_val   lo95   hi95 gamma
##         <chr>  <dbl> <dbl>  <dbl>  <dbl> <dbl>  <dbl>  <dbl> <dbl>
## 1 (Intercept) -1.813 1.331 -1.362 17.838 0.190 -4.612  0.986 0.117
## 2    aritPRET  0.996 0.086 11.555 20.098 0.000  0.816  1.176 0.053
## 3    langPRET  0.279 0.035  8.087 17.423 0.000  0.207  0.352 0.168
## 4         ses  0.021 0.026  0.791 17.944 0.439 -0.034  0.075 0.048
## 5         sex -1.398 0.464 -3.010 19.760 0.007 -2.367 -0.428 0.079
{% endhighlight %}



It is instructive to compare the calculated `df` to `eta_bar` and `df_m`: 

{% highlight r %}
robust_pooled %>%
  select(coef, df, df_m, eta_bar) %>%
  mutate_at(vars(df, df_m, eta_bar), round, 1)
{% endhighlight %}



{% highlight text %}
## # A tibble: 5 x 4
##          coef    df   df_m eta_bar
##         <chr> <dbl>  <dbl>   <dbl>
## 1 (Intercept)  17.8  659.5    22.5
## 2    aritPRET  20.1 3196.0    23.1
## 3    langPRET  17.4  319.2    23.9
## 4         ses  17.9 3936.0    20.7
## 5         sex  19.8 1443.6    23.5
{% endhighlight %}

Here, `eta_bar` is the average of the complete data degrees of freedom, and it can be seen that the total degrees of freedom are somewhat less than the average complete-data degrees of freedom. This is by construction. Further `df_m` is the conventional degrees of freedom used in multiple-imputation, which assume that the complete-data estimates are normally distributed, and in this example they are way far off. 

### Further thoughts

How well does this method perform in practice? I'm not entirely sure---I'm just trusting that Barnard and Rubin's approximation is sound and would work in this setting (I mean, they're smart people!). Are there other, better approaches? Totally possible. I have done zero literature review beyond the Barnard and Rubin paper. In any case, exploring the performance of this method (and any other alternatives) seems like it would make for a very nice student project. 

There's also the issue of how to do tests of multi-dimensional constraints (i.e., F-tests). The `clubSandwich` implements Wald-type tests for multi-dimensional constraints, using a small-sample correction that we developed ([Tipton & Pustejovsky, 2015](http://journals.sagepub.com/doi/abs/10.3102/1076998615606099); [Pustejovsky & Tipton, 2016](http://www.tandfonline.com/doi/full/10.1080/07350015.2016.1247004)). But it would take some further thought to figure out how to handle multiply imputed data with this type of test... 
