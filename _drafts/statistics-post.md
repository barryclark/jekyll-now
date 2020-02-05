---
layout: post
tags: bayesian-probability-theory math
#categories: []
date: 2020-01-23 00:00:00
#excerpt: ''
#image: 'BASEURL/assets/blog/img/.png'
#description:
#permalink:
title: 'Evaluating Game Strategies using Bayes Theorem from Scratch'
---

While playing a boardgame for three-year-olds with my daughter my mind started to wander. Boardgames for young children give the player very little agency to influence the game (if any) but still I wondered what the best playing strategy for this particular game was. The game is simple enough that I could start writing a simulation and now I am faced with the problem of how to interpret the data? How confident can I be that one strategy really is better than the other given my data?  Deriving these answers from scratch is the topic of this post.

# A Note on Bayesian Probability Theory
The book that changed my whole perception of probability theory is [Data Analysis - A Bayesian Tutorial](https://global.oup.com/academic/product/data-analysis-9780198568322?cc=de&lang=en&) by D.S. Sivia and J. Skilling. In this book the authors build a logical fundament of probablity theory and motivate the reader by constantly giving practical applications. I will follow their reasoning and their notation. Thus $P(X|I)$ is the probability of a proposition (e.g. an event happening) $X$ given some background knowledge $I$. All probabilities are conditional on $I$ because the authors state:
> ...there is no such thing as an absolute probability

The $I$ takes the role of all background knowlegde we have on a certain situation. The probability of an event depends on the state of knowlegde  we have (or *assumptions* if that is easier to swallow). Your background knowledge may be different than mine and thus lead to different probabilities. That is fine, because as long as we are clear about our assumptions we can always compare results.

This leads us to the next point. Probability values reflect our confidence in something. The probability of a proposition being true is a value between zero (0) and one (1). Zero meaning the proposition is false (given our prior knowlegde) and one meaning it is true. Every value between those reflects our confidence in the truth value of the proposition. However, this only has a meaning if compared to the probability value of a different proposition. Say we have $A$="I look fantastic in my back shirt" and we arrived at $P(A|I) = 0.2$ that does not mean much by itself. But if we also have $B$="A killer virus will break out today" and $P(B|I)=10^{-6}$ we know that we believe in one proposition more than the other. Now when we stand before our wardrobe, black shirt in one hand and hazmat suit in the other, we can let our fashion choice be guided by our relative confidence in these propositions. 

Interpreting the probability as a level of confidence (or *belief*) in the proposition is the heart of the Bayesian approach. This is opposed to the frequentist approach which interprets the probabilty of an event as the likelihood of an event occurrng given multiple repetitions of the same experiment.

# Anatomy of a Simple Game
Let us now dive into the analysis of a game. Assume the simplest case for a game: a cooperative game where either all players win or lose collectively. This means the game has two outcomes $W$="players win the game" and $L$="players lose the game". Further assume that we have some agency in the game, e.g. a choice of strategy $S$ that might influence the outcome of the game. What we are interested in is the probability of winning the game $P(W|S,I)$ given our strategy $S$ and our background knowledge $I$. Of course we have $P(W|S,I)=1-P(L|S,I).

For ease of notation let us write the probability of winning as $p := P(W|S,I) \in [0,1]$. We omit $S$ and $I$ in our symbol $p$ just to make the following calculations easier to read. We can ask the question: If we play the game $N$ times total, what is the probability of winning $N_W$ times, given the probability $p$ of winning a single game? This is given by the [Binomial Distribution](https://en.m.wikipedia.org/wiki/Binomial_distribution) if we assume the result of individual games are statistically independent:

$$P(N_W|p,N,S,I) = \binom{N}{N_W} \cdot p^{N_W}\cdot(1-p)^{N-N_W} \tag{1}$$

This is the first step in understanding the game from data we have collected about it.

# Gaining Knowledge from Data
To get to $p=P(W|S,I)$ we need data. This data can, for example, be repeated executions of the game or a simulation. The data is the vector $(N_W,N,S)$, i.e. the number $N_W$ of wins in $N$ games using a strategy $S$. Our interest is estimating $p$ from the data. What we are interested in speciically is $P(p|N_W,N,S,I)$, which is the probability of $P(W|S,I)$ having the value $p$. Do not be weirded out that  $p$ is itself a probability (of winning a single game). Call it  "chance of winning" and the thing gets less complicated when written as a sentence: we are interested in the probability of our chance of winning being $p$. Not too bad, right?

If this is all getting confusing and by now you are thinking: "stop making things so complicated, the chance of winning is $p=N_W/N$ and that's it". Well... you're not *wrong*, but the point of this exercise is not only to get the value of $p$ but also gain insight into how confident we are in this value compared to others. So bear with me.

Looking at the last formula $(1)$ in the previous section we can see that we almost, but not quite have the expression that we want. What we *have* is an expression for the probability of observing the data $N_W$ given $p$. What we *want* is an expression for the probability of $p$ given the observed data. This is where [Bayes Theorem](https://en.m.wikipedia.org/wiki/Bayes%27_theorem) comes into play. Here it enables us to write:

$$P(p|N_W,N,S,I) = \frac{P(N_W|p,N,S,I) \cdot P(p|N,S,I)}{P(N_W|,N,S,I)}$$

Let us talk about each term briefly. The term $P(N_W|p,N,S,I)$ is called the *likelihood* of observing the data given $p$. We already have an expression for this term. The denominator $P(N_W|,N,S,I)$ is called the *evidence*. Since term does not depend on $p$ and (for our application) is merely a constant of integration that ensures that the probability $P(p|N_W,N,S,I)$ is normalized to one. The last term is called the *prior* probability. That is the probability we assign to the possible values of $p$ based on our prior assumptions. One thing we can be sure of is that the term does not depend on the number of games (per our initial assumtions that games are independent), so  $P(p|,N,S,I)=P(p|S,I)$. Other than that we can 

