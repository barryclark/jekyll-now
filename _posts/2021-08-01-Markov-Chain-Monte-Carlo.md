The goal of this post is to learn about Markov Chain Monte Carlo. What is it, why does it exist, how do we "do it", and how can we apply it to a real problem?

#### What is Markov Chain Monte Carlo?
Markov Chain Monte Carlo (MCMC) _sounds_ cool. Maybe you know what Markov chains are and/or maybe you know what Monte Carlo methods are. 
I was familiar with both, but I had no idea what MCMC is. 

In a frustratingly short description - MCMC is a way to sample from a probability distribution. There's so much more to it than that, but that is essentially the heart of it. 

But what is it _really_? Where does it get its name from? To understand that, we'll need to understand a few things first. 
So I'll try to describe it, and then we can work through the explanations that hopefully get us to understanding the description.

MCMC is a way of estimating an intractable integral. It turns out that this is very useful for sampling from distributions in Bayesian statistics. 
But I didn't even know what that meant at first. What makes an integral intractable? Well, there's sort of two, overloaded definitions here:

1. the integral cannot be solved analytically
2. the integral cannot be computed in closed form (i.e it involves some infinite summation)

If the integral could be solved analytically, we wouldn't need extensive computation. If it's not analyticall solvable, _and_ it involves some infinite summation,
then you can't compute that finitely. So you need to approximate the integral. 

Why is this useful in Bayesian statistics? Because of Bayes' formula. 

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
