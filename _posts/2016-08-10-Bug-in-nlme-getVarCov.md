---
layout: post
title: "Bug in nlme::getVarCov"
date: August 10, 2016
tags: [programming]
permalink: Bug-in-nlme-getVarCov
---

I have recently been working to ensure that [my `clubSandwich` package](https://github.com/jepusto/clubSandwich) works correctly on fitted `lme` and `gls` models from the `nlme` package, which is one of the main R packages for fitting hierarchical linear models. In the course of digging around in the guts of `nlme`, I noticed a bug in the `getVarCov` function. The purpose of the function is to extract the estimated variance-covariance matrix of the errors from a fitted `lme` or `gls` model. 

It seems that this function is sensitive to the order in which the input data are sorted. [This bug report](https://bugs.r-project.org/bugzilla3/show_bug.cgi?id=16744) noted the problem, but unfortunately their proposed fix doesn't seem to solve the problem. In this post I'll demonstrate the bug and a solution. (I'm posting this here because the R project's bug reporting system is currently closed to people who were not registered as of early July, evidently due to some sort of spamming problem.)

# The issue

Here's a simple demonstration of the problem. I'll first fit a `gls` model with a heteroskedastic variance function and an AR(1) auto-correlation structure (no need to worry about the substance of the specification---we're just worried about computation here) and then extract the variances for each of the units.


{% highlight r %}
library(nlme)
data(Ovary)

gls_raw <- gls(follicles ~ sin(2*pi*Time) + cos(2*pi*Time), data = Ovary,
               correlation = corAR1(form = ~ 1 | Mare),
               weights = varPower())

Mares <- levels(gls_raw$groups)
V_raw <- lapply(Mares, function(g) getVarCov(gls_raw, individual = g))
{% endhighlight %}

Now I'll repeat the process using the same data, but sorted in a different order

{% highlight r %}
Ovary_sorted <- Ovary[with(Ovary, order(Mare, Time)),]
gls_sorted <- update(gls_raw, data = Ovary_sorted)

V_sorted <- lapply(Mares, function(g) getVarCov(gls_sorted, individual = g))
{% endhighlight %}

The variance component estimates are essentially equal:

{% highlight r %}
all.equal(gls_raw$modelStruct, gls_sorted$modelStruct)
{% endhighlight %}



{% highlight text %}
## [1] TRUE
{% endhighlight %}

However, the extracted variance-covariance matrices are not:


{% highlight r %}
all.equal(V_raw, V_sorted)
{% endhighlight %}



{% highlight text %}
## [1] "Component 1: Mean relative difference: 0.03256"   
## [2] "Component 3: Mean relative difference: 0.05830791"
## [3] "Component 4: Mean relative difference: 0.1142209" 
## [4] "Component 5: Mean relative difference: 0.03619692"
## [5] "Component 6: Mean relative difference: 0.09260648"
## [6] "Component 8: Mean relative difference: 0.08650327"
## [7] "Component 9: Mean relative difference: 0.07627162"
## [8] "Component 10: Mean relative difference: 0.018103" 
## [9] "Component 11: Mean relative difference: 0.1020658"
{% endhighlight %}

Here's the code of the relevant function:

{% highlight r %}
nlme:::getVarCov.gls
{% endhighlight %}



{% highlight text %}
## function (obj, individual = 1, ...) 
## {
##     S <- corMatrix(obj$modelStruct$corStruct)[[individual]]
##     if (!is.null(obj$modelStruct$varStruct)) {
##         ind <- obj$groups == individual
##         vw <- 1/varWeights(obj$modelStruct$varStruct)[ind]
##     }
##     else vw <- rep(1, nrow(S))
##     vars <- (obj$sigma * vw)^2
##     result <- t(S * sqrt(vars)) * sqrt(vars)
##     class(result) <- c("marginal", "VarCov")
##     attr(result, "group.levels") <- names(obj$groups)
##     result
## }
## <bytecode: 0x0000000010e3b790>
## <environment: namespace:nlme>
{% endhighlight %}

The issue is in the 4th line of the body. `getVarCov.gls` assumes that `varWeights(obj$modelStruct$varStruct)` is sorted in the same order as `obj$groups`, which is not necessarily true. Instead, `varWeights` seem to return the weights sorted according to the grouping variable. For this example, that means that the `varWeights` will not depend on the order in which the groups are sorted.

{% highlight r %}
identical(gls_raw$groups, gls_sorted$groups)
{% endhighlight %}



{% highlight text %}
## [1] FALSE
{% endhighlight %}



{% highlight r %}
identical(varWeights(gls_raw$modelStruct$varStruct), 
          varWeights(gls_sorted$modelStruct$varStruct))
{% endhighlight %}



{% highlight text %}
## [1] TRUE
{% endhighlight %}

# Fix for `nlme:::getVarCov.gls`

I think this can be solved by either 

* putting the `varWeights` back into the same order as the raw data or
* sorting `obj$groups` before identifying the rows corresponding to the specified `individual`. 

Here's a revised function that takes the second approach:


{% highlight r %}
getVarCov_revised_gls <- function (obj, individual = 1, ...) {
    S <- corMatrix(obj$modelStruct$corStruct)[[individual]]
    if (!is.null(obj$modelStruct$varStruct)) {
        ind <- sort(obj$groups) == individual
        vw <- 1 / varWeights(obj$modelStruct$varStruct)[ind]
    }
    else vw <- rep(1, nrow(S))
    vars <- (obj$sigma * vw)^2
    result <- t(S * sqrt(vars)) * sqrt(vars)
    class(result) <- c("marginal", "VarCov")
    attr(result, "group.levels") <- names(obj$groups)
    result
}
{% endhighlight %}

Testing that it works correctly:

{% highlight r %}
V_raw <- lapply(Mares, function(g) getVarCov_revised_gls(gls_raw, individual = g))
V_sorted <- lapply(Mares, function(g) getVarCov_revised_gls(gls_sorted, individual = g))
all.equal(V_raw, V_sorted)
{% endhighlight %}



{% highlight text %}
## [1] TRUE
{% endhighlight %}

# Fix for `nlme:::getVarCov.lme`

The same issue comes up in `getVarCov.lme`. Here's the fix and verification:

{% highlight r %}
getVarCov_revised_lme <- function (obj, individuals, type = c("random.effects", "conditional", "marginal"), ...) {
    type <- match.arg(type)
    if (any("nlme" == class(obj))) 
        stop("not implemented for \"nlme\" objects")
    if (length(obj$group) > 1) 
        stop("not implemented for multiple levels of nesting")
    sigma <- obj$sigma
    D <- as.matrix(obj$modelStruct$reStruct[[1]]) * sigma^2
    if (type == "random.effects") {
        result <- D
    }
    else {
        result <- list()
        groups <- sort(obj$groups[[1]])
        ugroups <- unique(groups)
        if (missing(individuals)) 
            individuals <- as.matrix(ugroups)[1, ]
        if (is.numeric(individuals)) 
            individuals <- ugroups[individuals]
        for (individ in individuals) {
            indx <- which(individ == ugroups)
            if (!length(indx)) 
                stop(gettextf("individual %s was not used in the fit", 
                  sQuote(individ)), domain = NA)
            if (is.na(indx)) 
                stop(gettextf("individual %s was not used in the fit", 
                  sQuote(individ)), domain = NA)
            ind <- groups == individ
            if (!is.null(obj$modelStruct$corStruct)) {
                V <- corMatrix(obj$modelStruct$corStruct)[[as.character(individ)]]
            }
            else V <- diag(sum(ind))
            if (!is.null(obj$modelStruct$varStruct)) 
                sds <- 1/varWeights(obj$modelStruct$varStruct)[ind]
            else sds <- rep(1, sum(ind))
            sds <- obj$sigma * sds
            cond.var <- t(V * sds) * sds
            dimnames(cond.var) <- list(1:nrow(cond.var), 1:ncol(cond.var))
            if (type == "conditional") 
                result[[as.character(individ)]] <- cond.var
            else {
                Z <- model.matrix(obj$modelStruct$reStruc, getData(obj))[ind, 
                  , drop = FALSE]
                result[[as.character(individ)]] <- cond.var + 
                  Z %*% D %*% t(Z)
            }
        }
    }
    class(result) <- c(type, "VarCov")
    attr(result, "group.levels") <- names(obj$groups)
    result
}

lme_raw <- lme(follicles ~ sin(2*pi*Time) + cos(2*pi*Time), 
               random = ~ 1 | Mare,
               correlation = corExp(form = ~ Time),
               weights = varPower(),
               data=Ovary)

lme_sorted <- update(lme_raw, data = Ovary_sorted)

all.equal(lme_raw$modelStruct, lme_sorted$modelStruct)
{% endhighlight %}



{% highlight text %}
## [1] TRUE
{% endhighlight %}



{% highlight r %}
# current getVarCov
V_raw <- lapply(Mares, function(g) getVarCov(lme_raw, individual = g, type = "marginal"))
V_sorted <- lapply(Mares, function(g) getVarCov(lme_sorted, individual = g, type = "marginal"))
all.equal(V_raw, V_sorted)
{% endhighlight %}



{% highlight text %}
##  [1] "Component 1: Component 1: Mean relative difference: 0.003989954" 
##  [2] "Component 3: Component 1: Mean relative difference: 0.003784181" 
##  [3] "Component 4: Component 1: Mean relative difference: 0.003028662" 
##  [4] "Component 5: Component 1: Mean relative difference: 0.0005997944"
##  [5] "Component 6: Component 1: Mean relative difference: 0.002350456" 
##  [6] "Component 7: Component 1: Mean relative difference: 0.007103733" 
##  [7] "Component 8: Component 1: Mean relative difference: 0.001887638" 
##  [8] "Component 9: Component 1: Mean relative difference: 0.0009601843"
##  [9] "Component 10: Component 1: Mean relative difference: 0.004748783"
## [10] "Component 11: Component 1: Mean relative difference: 0.001521097"
{% endhighlight %}



{% highlight r %}
# revised getVarCov 
V_raw <- lapply(Mares, function(g) getVarCov_revised_lme(lme_raw, individual = g, type = "marginal"))
V_sorted <- lapply(Mares, function(g) getVarCov_revised_lme(lme_sorted, individual = g, type = "marginal"))
all.equal(V_raw, V_sorted)
{% endhighlight %}



{% highlight text %}
## [1] TRUE
{% endhighlight %}

# Session info


{% highlight r %}
sessionInfo()
{% endhighlight %}



{% highlight text %}
## R version 3.2.5 (2016-04-14)
## Platform: x86_64-w64-mingw32/x64 (64-bit)
## Running under: Windows 7 x64 (build 7601) Service Pack 1
## 
## locale:
## [1] LC_COLLATE=English_United States.1252 
## [2] LC_CTYPE=English_United States.1252   
## [3] LC_MONETARY=English_United States.1252
## [4] LC_NUMERIC=C                          
## [5] LC_TIME=English_United States.1252    
## 
## attached base packages:
## [1] stats     graphics  grDevices utils     datasets  methods   base     
## 
## other attached packages:
## [1] lubridate_1.3.3 stringr_1.0.0   knitr_1.13      nlme_3.1-128   
## 
## loaded via a namespace (and not attached):
##  [1] Rcpp_0.12.5        lattice_0.20-33    digest_0.6.9      
##  [4] grid_3.2.5         plyr_1.8.4         magrittr_1.5      
##  [7] evaluate_0.9       stringi_0.4-1      rmarkdown_1.0.9002
## [10] tools_3.2.5        yaml_2.1.13        rsconnect_0.3.78  
## [13] memoise_1.0.0      htmltools_0.2.6
{% endhighlight %}

