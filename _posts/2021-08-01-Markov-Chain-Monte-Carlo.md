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

### Next section
So now we know why we want MCMC. We have a model and we have some data. We want to fit the model to the data. We are obstructed by the evidence.
Note that if we ignore the evidence component, then we at least have a function that is proportional to our desired posterior distribution. 
If it were a discrete distribution, it'd be quite easy to make statements about it because we could easily compute the relative probabilities of the outputs.
But because it's continuous we don't get so lucky. 

TODO explain why we only need a function that is proportional to posterior. Does it need to sum to 1? How is that any different than normalizing constant?

### A quick aside about Bayesian stats and inference

I was familiar with Bayes' formula, but I don't think I appreciated the meaning of the equation in the context of MCMC originally.

When I describe Bayesian inference to some friends, their eyes glaze over. Writing the formula down is one thing, but trying to describe it verbally is an awful mouthful.
I think it's helpful to point out that we all do Bayesian inference all the time - just without realizing it necessarily.
For anyone that's played competitive sports, we typically use such inference. For example, say you're a defender in soccer. You know that like 90% of people are right-footed. So by default, when you play against someone new, you're going to defend them as if they're right-footed: force them onto their left etc. But say you're playing against someone one day, and you notice that they're dribbling against you with their left foot. 
You don't know for sure, but there's a better chance than usual that they're left-footed. If you watched them warmup and they used their left foot mostly, you can probably guess even before you play that they're left-footed. 
This is essentially Bayesian inference. In general, we know from experience that most people are right-footed. But in this particular case, now that we've collected data from our opponent's warmup, we have reason to believe that they're actually left-footed. 

- what do the symbols really mean?
- what is the likelihood function, really?
- wtf is the evidence / marginal probability?

### Sampling from a distribution

- uniform distro: Mersenne twister or linear feedback (simplest)
- normal distro
- general distro

## A real world example

I struggled to understand many of the blogs because they didn't use an example. So I hope to illustrate MCMC using a concrete example. 

Let's say we want to model daily SPY returns. For starters, we can say daily returns are normally distributed. We don't have any data to look at right now, but we have some rough assumptions about how markets work, so let's go from there: we could say the mean $$\mu$$ is 0 and the standard deviation $$\sigma$$ is 0.0001 - or, in other words, 1 basis point. 

TODO - plot of normal here?

But let's be a bit more realistic. We definitely _don't_ know the best values for $$\mu$$ and $$\sigma$$. Why should we pretend that we do by choosing a single value for each? Instead, let's admit uncertainty and instead describe $$\mu$$ and $$\sigma$$ probabilistically. 

We can assume for now that their distributions are normal. Note that these normal distributions are _not_ related to our normal distribution of the data. The data distribution model family could be anything - skew-normal, beta, etc - and we'd still probably want to model our parameters as normally distributed. 
Unless you have some reason to think your guess about your parameters is biased, then a normal distribution is a very reasonable "shape" to describe your parameters.

So let's say $$\mu ~ \mathcal{N}(0, 0.0001)$$ and $$\sigma ~ \mathcal{N}(0.0001, 0.0001)$$. 

Why did I pick those values? I don't really know! They're just a best guess for now. I know from previous experience that the mean can't be _that_ far from 0, and I know that the standard deviation can't be _that_ far from 1 basis point. 

TODO - plot of hierchical model here: what does the ultimate distro look like for data?

So basically we're saying that on average, we expect the daily return for SPY to be 0, with a standard deviation of 0.01% (i.e 1 basis point). This might not be a very good guess, but we don't have much to go off of yet except for our own past experience. 
Once we fit it with data and generate a posterior, we'll have a better model. And that's the whole point, after all.

So let's say we've collected data. We have the daily returns for SPY going back the last 10 years. If we plot them as a histogram:

![prior-vs-data](https://user-images.githubusercontent.com/1283020/127783739-43b27cb3-0a66-4006-a1db-534019ac9faa.png)

We can see clearly that this doesn't align well with our prior model at all.

So now we can start computing our posterior. (TODO how do you handle multiple params? one at a time or what?)

- TOOO actually do the posterior fitting now. what do we have to do? 
- we admit that we can't figure out P(D)... 
- how tf does the rejection sampling provably work? like why is that validly equivalent?
- how do you even compute likelihood? wtf does that mean? for every value in the data, calculate likelihood if we fix mean to that one proposed value? and average that or something?
- so if you do that enough times, you should have a distro of your mean
- and then you can plug that new mean distro into your model and see different result
- BUT AGAIN why is the ratio even valid to do? like where tf does the ratio come from? why can we do that?

So we want $$P(D|H)P(H)$$. Even as I was writing this, I kind of got confused: wait, what does $$P(H)$$ even _mean_? How do we calculate that? Let's say for now that we're just focusing on $$\mu$$. Then this means that we're looking for $$P(D|\mu)P(\mu)$$. 
This should hopefully be more clear. We said earlier that for our prior model, we were modeling $$\mu$$ as normally distributed. That's our $$P(\mu)$$!

What about $$P(D|\mu)$$? This is the likelihood function. TODO

So we said that computing $$P(D)$$ is too difficult. Instead we'll get at $$P(\mu|D)$$ by using rejection sampling. 

TODO - if we're really just doing it per parameter, which we assume is normal - then why do we need MCMC? and _can_ we even do the params separately?

The sampling is pretty straightforward (for our example - there are more sophisticated sampling methods). 

(TODO - you're kind of explaining the theory here b/c you haven't written it down yet. consider whether you want to separate the theory and assume reader
is familiar at this point by the time we do example)

We will basically be generating a stream of numbers from a normal distribution (this distribution doesn't have any relation to our data or models). 
For each of these numbers, we compute the likelihood function using this number as the new $$\mu$$. We then compare this likelihood to the likelihood
of the previously selected $$\mu$$. If it's better, we accept it. If it's worse, we accept it with probability (TODO whatever the ratio equation is).

TODO - do the series of probability selections

We do this for a long time until the distribution has converged (think - if we picked some insane starting value for the $$\mu$$ proposal, then 
we'd accept most of the subsequent proposals, which could warp the distribution). 

So now we have a new model for $$\mu$$, which essentially means that we have a new model for our data. 

### Random things I haven't worked into writing yet

I found it useful to think of the Markov chain part of MCMC as kind of just a coincidence? I mean, it's probably not coincidental, but I like to think that when Metropolis was originally developing this method, he basically just wanted to get at the Monte Carlo samples however he could. Rejection sampling is a nice way of shaking out the proper ratio that you want, and it just so happens that rejection sampling in this way can be perfectly described as a Markov process. I don't think he was actively thinking of Markov chains and how could he apply it to this problem. I mention this because I initially found the MCMC name confusing. How could someone possibly use a Markov chain with this stuff? But I think it's more of an after-the-fact description. It could've been called rejection-sampling Monte Carlo, until someone quickly realized that this is actually a Markov process. 

One of the things that really frustrated me initially came from me misunderstanding what MCMC actually does. I naively thought it was just a way of getting "some" model to arise for your data. But that doesn't really make sense. The "best" model for you data would just be the histogram itself in some sense, but we know that's definitely overfitting. But unless you describe some function, there's no _model_ to actually be fitting to the data. So you _need_ to have a model describable by some parameters.
This could be a normal distribution, or a skew-normal, or something else. But your prior model will be described by some parameters. And these parameters could just be a best guess! And the cool part is - you don't even need to pick a single value for your parameters. That's kind of the neat thing going on here that I didn't appreciate initially.
A lot of the blogs would do the MCMC stuff and then show some graph of the distribution of _our parameters_. But that's not what I cared about. I wanted to model my _data_. But the really important realization is that if you have a function of parameters, then if you have a distribution of your parameters, then you _do_ have a model of your data. 
The whole point is that you've made some axiomatic assumption about a model family for your data, and then from there, you have to figure out the best value for your parameters.
Instead of forcing yourself to pick a single best value, you can admit that you don't really know perfectly, and instead describe your parameters as distributions themselves. The mean is _probably_ 0 but it might be positive or negative as well.
Now another important note is that the modek of your parameters does not need to be remotely the same model as your data! You could have skew-normal data, or beta distributed data - but most likely, you'll want to model the uncertainty of your parameters as normal distributions. 

Another aspect of this that helped me understand this stuff was that the posterior distribution is basically just another way of saying that you are fitting your model to data. So you do have to choose a model initially. You could choose a linear model! But then we could solve it with linear regression.
But basically what we're doing here is learning a model (i.e learning the best parameters for our model). 
