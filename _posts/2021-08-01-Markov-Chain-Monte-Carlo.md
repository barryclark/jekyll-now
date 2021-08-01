The goal of this post is to learn about Markov Chain Monte Carlo. What is it, why does it exist, how do we "do it", and how can we apply it to a real problem?

#### What is Markov Chain Monte Carlo?
Markov Chain Monte Carlo (MCMC) _sounds_ cool. Maybe you know what Markov chains are and/or maybe you know what Monte Carlo methods are. 
I was familiar with both, but I had no idea what MCMC is. 

In a frustratingly short description - MCMC is a way to approximate an integral. There's so much more to it than that, but that is essentially the heart of it. 

But what is it _really_? Where does it get its name from? Why does it pop up in statistics? To understand that, we'll need to understand a few things first. 
So I'll try to describe it, and then we can work through the explanations that hopefully get us to understanding the description.

MCMC is a way of estimating an intractable integral. It turns out that this is very useful for sampling from distributions in Bayesian statistics.
Its name comes from the fact that it uses Monte Carlo sampling to estimate an integral, and the process for generating the Monte Carlo samples 
is actually a Markov chain.

But I didn't even know what that meant at first.
- What makes an integral intractable?
- Why is estimating an integral useful in Bayesian statistics?
- What even is Bayesian statistics; how is it meaningfully different from general "statistics"?

**What makes an integral intractable?** Well, there's sort of two, overloaded definitions here:

1. the integral cannot be solved analytically
2. the integral cannot be computed in closed form (i.e it involves some infinite summation)

If the integral could be solved analytically, we wouldn't need extensive computation. If it's not analyticall solvable, _and_ it involves some infinite summation,
then you can't compute that finitely. So you need to approximate the integral. 

**Why is this useful in Bayesian statistics?** Because of Bayes' formula. 

$$P(H | D) = \dfrac{P(D | H)P(H)}{P(D)}$$

Where $$H$$ is our hypothesis and $$D$$ is our data. 
Basically this is saying, if you have some prior hypothesis $$H$$, you can make a better, updated hypothesis once you've seen some data $$D$$.
It turns out that actually calculating this ($$P(D)$$ in particular) invovles an often times intractable integral. 

So here's a usecase for estimating an integral. 
I was often confused in MCMC describers because they so often presented MCMC exclusively in this posterior distribution context. 
MCMC _is_ useful for determining a posterior distribution, but it's not used exclusively for that. MCMC can be used to estimate an integral and it so turns out
that we need to do just that when determining a posterior distribution. A posterior distribution is basically just fitting a model to data, kind of like how we fit a linear regression model to data.

So MCMC can do two things for us. First, it helps us avoid calculating $$P(D)$$ directly, which allows us to get $$P(H|D)$$ more easily. 
Second, it allows us to sample from $$P(H|D)$$ as well. 

To appreciate the second point, it's important to understand that sampling from a distribution is non-trivial.

How would you sample from a uniform distribution? What about a normal distribution? TODO

Now that we appreciate the difficult in sampling from a distribution, we can appreciate the motivation behind the development of MCMC. 

TODO

I found it useful to think of the Markov chain part of MCMC as kind of just a coincidence? I mean, it's probably not coincidental, but I like to think that when Metropolis was originally developing this method, he basically just wanted to get at the Monte Carlo samples however he could. Rejection sampling is a nice way of shaking out the proper ratio that you want, and it just so happens that rejection sampling in this way can be perfectly described as a Markov process. I don't think he was actively thinking of Markov chains and how could he apply it to this problem. I mention this because I initially found the MCMC name confusing. How could someone possibly use a Markov chain with this stuff? But I think it's more of an after-the-fact description. It could've been called rejection-sampling Monte Carlo, until someone quickly realized that this is actually a Markov process. 
