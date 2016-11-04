---
layout: post
title: What is Tau-U?
date: November 3, 2016
tags: [effect-sizes, single-case-research]
permalink: What-is-Tau-U
---

[Parker, Vannest, Davis, and Sauber (2011)](http://dx.doi.org/10.1016/j.beth.2010.08.006) proposed the Tau-U index---actually several indices, rather---as effect size measures for single-case designs. The original paper describes several different indices that involve corrections for trend during the baseline phase, treatment phase, both phases, or neither phase. Without correcting for trends in either phase, the index is equal to the Mann-Whitney $$U$$ statistic calculated by comparing every pair of observations containing one point from each phase, scaled by the total number of such pairs. This version, which I'll call just "Tau", is simply a [linear re-scaling of the NAP statistic]({{site.url}}/NAP-SEs-and-CIs) to the range [-1,1]. 

To correct for baseline trend, the original paper proposes to calculate Kendall's rank correlation ($\tau_A$) between the phase A outcome data and the session numbers and use the result to make an adjustment to Tau. The other analyses presented in the original paper (incorporating adjustments for time trends during the treatment phase) are not presented in subsequent review papers, nor are they implemented in [the web-calculator](http://singlecaseresearch.org/calculators) created by the authors, and so I won't discuss them further here. Instead, in this post I will examine the calculation of the version of Tau-U that incorporates a baseline trend correction. This version seems to be the most widely applied in practice (likely due to the availability of the web-calculator) and is presented in several review papers by the same authors. It turns out though, that the definition of the index has shifted from the original paper to subsequent presentations. 

To make this concrete, let me first define a couple of things. Suppose that we have data from the baseline and treatment phases for a single case, where the baseline phase has $$m$$ observations and treatment phase has $$n$$ observations. Let $$y^A_1,...,y^A_m$$ denote the baseline phase data and $$y^B_1,...,y^B_n$$ denote the treatment phase data. Let $$S_P$$ denote Kendall's S statistic calculated for the comparison between phases and $$S_A$$ denote Kendall's S statistic calculated on the baseline trend. More precisely,

$$
\begin{aligned}
S_P &= \sum_{i=1}^m \sum_{j=1}^n \left[I\left(y^B_j > y^A_i\right) - I\left(y^B_j < y^A_i\right)\right] \\
S_A &= \sum_{i=1}^{m - 1} \sum_{j = i + 1}^m \left[I\left(y^A_j > y^A_i\right) - I\left(y^A_j < y^A_i\right)\right].
\end{aligned}
$$

Note that $$S_P$$ is calculated from $$m \times n$$ pairs of observations, and Tau (without trend correction) is equal to $$\text{Tau} = S_P / (m n)$$. Furthermore, $$S_A$$ is calculated from $$m (m - 1) / 2$$ pairs of observations and Kendall's rank correlation coefficient for the baseline phase observations is $$t_A = S_A / [m (m - 1) / 2]$$. 

## The original version

In the original paper, the authors explain that values of Tau-U can be calculated by adding or substracting values of $$\tau$$, weighted by the corresponding number of pairs. Thus, Tau-U would be calculated as

$$
\text{Tau-U} = \frac{S_P - S_A}{mn + m(m - 1) / 2} = \frac{2n}{2n + m - 1} \text{Tau} - \frac{m - 1}{2n + m - 1} t_A.
$$

Both $$\text{Tau}$$ and $$t_A$$ have range [-1,1], and so Tau-U has the same range. This version of Tau-U can be calculated using [this web app by Rumen Manolov](https://manolov.shinyapps.io/Overlap/), which is based on [this R code by Kevin Tarlow](https://dl.dropboxusercontent.com/u/2842869/Tau_U.R). (The app and the R script also provide the other variants of Tau-U described in [Parker, Vannest, Davis, and Sauber (2011)](http://dx.doi.org/10.1016/j.beth.2010.08.006).)

## The revised (?) version

[Parker, Vannest, and Davis (2011)](http://dx.doi.org/10.1177/0145445511399147) reviewed nine different non-overlap indices for use with data from single-case designs, including Tau-U. Rather than describing all four variations from the original paper, the authors define the index as follows:

> Tau-U (Parker et al., in press) extends [Tau] to control for undesirable positive baseline trend (monotonic trend). Monotonic trend is the upward progression of data points in any configuration, whether linear, curvilinear, or even in a mixed pattern of "fits and starts" (p. 11).

In this and subsequent review articles, Tau-U seems to refer exclusively to the variant involving comparison between phases A and B, with an adjustment for phase A trend. That seems a sensible enough choice, which could have been due to space limitations, guidance from the journal editor, or further refinement of the methods (i.e., recognizing which of the variants would be most useful in application). However, the presentation of Tau-U in this article involved more than a change in emphasis---the definition of the index also changed. Following the notation above, Tau-U was now defined as

$$
\text{Tau-U} = \frac{S_P - S_A}{mn} = \text{Tau} - \frac{m - 1}{2n} t_A.
$$

The logical range of this version of the index is from $$-(2n + m - 1) / (2n)$$ to $$(2n + m - 1) / (2n)$$.

This is the version of Tau-U implemented in the [singlecaseresearch.org](http://singlecaseresearch.org/calculators) web calculator. It is also the version described in a later chapter by the same authors ([Parker, Vannest, & Davis, 2014](http://dx.doi.org/10.1037/14376-005)) and a review article by [Rakap (2015)](http://dx.doi.org/10.1111/1467-8578.12091). [My previous post about Tau-U]({{site.url}}/Tau-U) also presented this version of the index and noted that its magnitude is sensitive to the lengths of the baseline and treatment phases, which makes it rather difficult to interpret the Tau-U index as a measure of treatment effect magnitude. 

## Comparison

Here is an R function for calculating the original or revised versions of Tau-U:


{% highlight r %}
Tau_U <- function(A_data, B_data, version = "revised") {
    m <- length(A_data)
    n <- length(B_data)
    Q_A <- sapply(A_data, function(j) (j > A_data) - (j < A_data))
    Q_P <- sapply(B_data, function(j) (j > A_data) - (j < A_data))
    
    if (version=="original") {
      (sum(Q_P) - sum(Q_A[upper.tri(Q_A)])) / (m * n + m * (m - 1) / 2)
    } else {
      (sum(Q_P) - sum(Q_A[upper.tri(Q_A)])) / (m * n)
    }
}
{% endhighlight %}

The papers I've mentioned above all provide examples of the calculation of Tau-U. The following table reports the data from each of these examples ([Parker, Vannest, Davis, and Sauber, 2011a](http://dx.doi.org/10.1016/j.beth.2010.08.006); [Parker, Vannest, and Davis, 2011b](http://dx.doi.org/10.1177/0145445511399147); [Parker, Vannest, & Davis, 2014](http://dx.doi.org/10.1037/14376-005)), along with the value of Tau-U based on the original and revised formulas. The differences in magnitude are non-trivial.


|Source           |Phase A data           |Phase B data               |  original|   revised|
|:----------------|:----------------------|:--------------------------|---------:|---------:|
|2011a, Figure 2  |2, 3, 5, 3             |4, 5, 5, 7, 6              | 0.5000000| 0.6500000|
|2011b, Figure 1  |20, 20, 26, 25, 22, 23 |28, 25, 24, 27, 30, 30, 29 | 0.5438596| 0.7380952|
|2011b, Table 1   |3, 3, 4, 5             |4, 5, 6, 7, 7              | 0.4230769| 0.5500000|
|2014, Figure 4.1 |22, 21, 23, 23, 23, 22 |24, 22, 23, 23, 24, 26, 25 | 0.4385965| 0.5952381|

## Implications

Rather than one effect size index called "Tau-U", there are instead two different definitions, which can lead to quite different values of the index. Given this, researchers who apply Tau-U should endeavor to __be clear and unambiguous about which version of the index they use__. This can be done by stating exactly which software routine, web-app, or formula was used in making the calculations. If the calculations are done using a computer script, then the script should be made available (e.g., through the [Open Science Framework](https://osf.io/)) so that other researchers can replicate the calculations. 

Furthermore, researchers need to __be careful about applying interpretive guidelines for Tau-U__, since those guidelines will not apply uniformly across the different versions of the index. 

Finally, I would recommend that any researchers who conduct a meta-analysis of single-case research __make available the raw data used for effect size calculations__, so that other researchers can scrutinize, replicate, and extend their analyses. The whole enterprise of research synthesis rests on the availability of data from primary studies (at least in summary form). It seems to me that meta-analysts thus have a duty to make the data that they assemble and organize readily accessible for others to use. Particularly in the context of meta-analysis of single-case research---where new methods are developing rapidly and there is not currently consensus around best practices---it seems especially appropriate and prudent to make one's data available for future re-analysis. 
