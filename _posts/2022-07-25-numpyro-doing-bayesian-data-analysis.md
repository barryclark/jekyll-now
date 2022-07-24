---
title: Doing Bayesian Data Analysis in Numpyro
layout: post
---

I'm a big fan of Bayesian data analysis using probabilistic programming.
Recently, I took a course about Bayesian Data Analysis using
the book [Doing Bayesian Data Analysis](https://sites.google.com/site/doingbayesiandataanalysis/)
2nd edition by John K. Kruschke.
It's a great book,
and it covers many topics about data analysis using bayesian approach.
I highly recommend the book to anyone who wants to learn about bayesian data analysis.
The implementations in the book are in R and JAGS/Stan.
Thus, I think this will be a good practice to port the models
described in the book to Python/Numpyro.

The choice between PyMC3 and Numpyro for this port boils down to speed.
My previous experiences with PyMC3 have been a let down since PyMC3 was slow for what I did.
Numpyro, on the other hand, is blazing fast!
In addition, there is already a great [port](https://github.com/JWarmenhoven/DBDA-python)
of the models in the book to Python/PyMC3.

Without further ado, here are the chapters:

* [Chapter 9: Hierarchical Models](/numpyro-doing-bayesian/chapter_09)
* [Chapter 10: Model Comparison and Hierarchical Modeling](/numpyro-doing-bayesian/chapter_10)
* [Chapter 12: Bayesian Approaches to Testing a Point ("Null") Hypothesis](/numpyro-doing-bayesian/chapter_12)
* [Chapter 16: Metric-Predicted Variable on One or Two Groups](/numpyro-doing-bayesian/chapter_16)
* [Chapter 17: Metric Predicted Variable with one Metric Predictor](/numpyro-doing-bayesian/chapter_17)
* [Chapter 18: Metric Predicted Variable with Multiple Metric Predictors](/numpyro-doing-bayesian/chapter_18)
* [Chapter 19: Metric Predicted Variable with One Nominal Predictor](/numpyro-doing-bayesian/chapter_19)
* [Chapter 20: Metric Predicted Variable with Multiple Nominal Predictors](/numpyro-doing-bayesian/chapter_20)
* [Chapter 21: Dichotomous Predicted Variable](/numpyro-doing-bayesian/chapter_21)
* [Chapter 22: Nominal Predicted Variable](/numpyro-doing-bayesian/chapter_22)
* [Chapter 23: Ordinal Predicted Variable](/numpyro-doing-bayesian/chapter_23)
* [Chapter 24: Count Predicted Variable](/numpyro-doing-bayesian/chapter_24)

If you want to take a look at the source code,
here is the [repository](https://github.com/beekill95/numpyro-doing-bayesian).
As I'm learning about bayesian data analysis and Numpyro,
there will be bugs and unoptimized ways of doing things in the code.
Any suggestions for improvement and bug fixes are welcome!
