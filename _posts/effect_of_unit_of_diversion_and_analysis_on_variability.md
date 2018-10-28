---
layout: post
title: The effect of using different units of diversion and analysis on the variability of your metrics in A/B Testing
---

#### Introduction
Session level metrics are commonly used to measure website performance. It is therefore natuaral for these websites to use these session-level metrics when running online experiments. The most common online experiment is an A/B Test. Determining which users see one version of the website (the A) and which users see the other (the B) requires some splitting criterion, called the unit of diversion; one of the most commonly used is a cookie. A regular experimental setup will therefore split traffic on a cookie and measure the performance of an experiment using a session-level metric (e.g. $\frac{conversions}{session}$)

Once the experiment has run for the predetermined length of time, a statistical test will often be used to compare the performance of some test metric (e.g. $\frac{conversions}{session}$) across both groups. This analysis is used to inform whether or not the change tested is launched and can help refine your understanding of user behaviour on the website. The statistical tests commonly used to analyse these results (e.g. $\chi^2 \text{ test, } Z \text{-test, }t \text{-test, } etc.$) make many assumptions, and the robustness of any conclusions derived from these tests depends on the extent to which these assumptions are satisfied. The most stringent assumption is that each observation is independent. In the experimental setup described above, the unit of observation is a session because each session corresponds to an observation. And is each session independent? Not necessarily. 

Diverting traffic into each group using a cookie means that any returning traffic is allocated to the test bucket that it was originally placed in. And the behaviour of a given user across sessions is likely to be correlated; you may have a particular user who clicks a lot on your website whilst another may only be there to browse. Diverting these users results in groups of correlated sessions appearing in each test bucket. This can significantly increase the variability of your metrics; resulting in your true empirical variability far exceeding your analytical variability. Using this analytical variability in your significance tests and the construction of confidence intervals will lead to an increase in false positives. 

#### Simulation

One way to understand the effect of using different units of diversion and observation is through simulation. In this case, we will simulate an experiment where $\frac{conversions}{session}$ is our test metric and traffic is diverted to either group using a cookie. We'll use the bootstrap technique to construct a sampling distribution and compare this to the expected sampling distribution when we use the analytical variability.


#### Acknowledements

I appreciate that this topic has been covered elsewhere I'm under no illusion that this idea is original. Some of the resources I found most useful include:
- [The second Ghost of Experimentation: The fallacy of session based metrics](https://towardsdatascience.com/the-second-ghost-of-experimentation-the-fallacy-of-session-based-metrics-fb65006d30ff) by Skyscanner Engineering
- Udacity A/B Testing Course
