---
layout: post
title: A Little More on Logistic Regression
date: 20181211
categories: [Machine Learning, Mathematics]
picture: /assets/images/logreg/binary-dataset.png
published: true
excerpt: Logistic Regression is one of the first techniques taught in Machine Learning, and for many applications is a good baseline model. Here I'd like to share some details I've discovered about it over the last year, which helped me better understand how and why it works.
---

# Introduction

One of the most popular techniques for classification is the binary classification method. It's simplicity, interpretability, and scalability are big advantages. Although more recent methods for classification have gotten a fair amount of attention the logistic regression stays a strong contender for many problems.

I wrote this article because of a training I gave on the subject for some junior data scientists. Although I had worked with it before, I never took the time to understand some of it's "finer" points. Coming from a mathematics background, I like to understand how things work and why they work. I feel this helps in understanding what the strengths and weaknesses of something are, and how it's connected to similar mathematical machinery. For those of you who are interested, here are some of the things I discovered.

To keep things simple we'll be limiting ourselves to the two (e.g. 0 and 1) class problem. 

# Derivation of logistic regression

Most material I've read start out with the assumption that the so-called conditional log [odds ratio](https://www.wikiwand.com/en/Odds_ratio) of an observation can be written as a weighted sum of the observation's features:

$$\log \frac{P(Y=1|x)}{P(Y=0|x)} = \sum_{j=0}^Nb_jx_j$$

where we define $x_0 := 1$ for the intercept. We'll try and explain this assumption a little bit.

So what is this odds-ratio $p/(1-p)$? In the case of a game, the odds-ratio of winning is simply the ratio of winning vs. non-winning. Say your game pays out 70% of the time, then your ratio is $\frac{0.7}{1-0.7} \approx 2.33$. If you win 20% of the time, it's $\frac{0.2}{1 - 0.2} \approx 0.25$.

Another natural question is, why are we looking at this odds-ratio instead of the probabilities themselves? To answer this, we'll do a little experiment. Given a 1-D dataset with binary labels, we're gonna do two things to estimate the probabilities:
- **Method 1**: We're going to estimate the probability for each feature vector directly. We'll do this by splitting the features into buckets, and in each bucket we'll estimate the probability by num_true/num_false.
- **Method 2**: We train a logistic regression model.

Here's a comparison of these two methods in a simple simulation
<figure style="text-align: center;">
    <img src="/assets/images/logreg/lin_log_probs.png" style="width: 75%;">
    <figcaption> Comparing logistic regression (orange) to binned empirical probability estimates (blue) </figcaption>
</figure>

Besides some noise, the probabilities match! The "bucketing" approach isn't used in practice because the number of buckets explodes as the dimensionality increases. 

For me this is the most convincing argument that logistic regression is a sensible model on an intuitive level, and unfortunately I have never seen it mentioned in introductions to the technique.

## Relation between thresholds and decision boundaries

So as most of you probably know in order to get that binary output we want, we need to choose a threshold. Probabilities below this threshold are mapped to 0, and above it are mapped to 1. Visually we can think of this:

<figure style="text-align: center;">
    <img src="/assets/images/logreg/prob_threshold.png" style="width: 85%;">
</figure>

You might wonder, how does that relate to a decision boundary? For those unfamiliar with the term, the decision boundary refers to the hypersurface that segments the feature space into the two output classes. Which side of the boundary a point is determines how it gets classified by the model. 

Given a probability threshold, it's pretty easy to find this boundary with a little linear algebra. Let's take $t = 1/2$ and see what what the boundary is:

$$ \begin{align} P(Y = 1 | X = x) & = \frac{1}{1 + e^{\beta^\intercal x}} = 1/2 \end{align} $$

We can rewrite this as

$$ \begin{align}\frac{1}{1 + e^{\beta^\intercal x}} & = \frac{1}{2}
    \\ 1 + e^{\beta^\intercal x} & = 2 
    \\ e^{\beta^\intercal x} & = 1
    \\ \beta^\intercal x & = 0\end{align} $$

So there it is, our boundary for $t=0.5$ is the line $\\{x \in \mathbb{R}^n: \beta^{\intercal}x = 0 \\}$, which is a hyperplane in $\mathbb{R}^n$.

# Deriving Cross-Entropy from Maximum Likelihood

So now that we've defined the model, we also need a function which tells us how well the model fits the data we're training on. There are lots of loss functions to choose from, so why is the [cross-entropy](https://www.wikiwand.com/en/Cross_entropy) usually taken for logistic regression?

The short answer is it's equivalent to the [Maximum Likelihood Estimator](https://www.wikiwand.com/en/Maximum_likelihood_estimation) here, which has all kinds of nice properties. It's pretty easy to derive the cross-entropy from the MLE, so we'll show that here. Lets start with the expression of our trustworthy log-likelihood:

$$ \begin{align} \log \mathcal{L}(\beta) & = \sum_{i=1}^n\log P_\beta(Y = y_i|X=x_i)
    \\ & = \sum_{i=1}^n\log P_\beta(Y = 1|X=x_i)^{y_i} + \log P_\beta(Y = 0|X=x_i)^{(1 - y_i)} 
    \\ & = \sum_{i=1}^n y_i\log \hat{y}_\beta(x_i) + (1 - y_i)\log (1 - \hat{y}_\beta(x_i))  \end{align} $$

which is exactly the cross-entropy loss.

# Geometric Interpretation of L1/L2 Regularization

L1/L2 regularization (also known as Ridge/Lasso) is a widely used technique for reducing model overfitting. We restrict the size of the model's weights, which restricts how complex the model can become. This increases bias, reduces variance, and allows for better generalization on the test set.

In order to regularize our problem, we minimize the original problem:

$$ \sum_{i=1}^n L(\beta, x_i) = \sum_{i=1}^n y_i\log \hat{y}_\beta(x) + (1 - y_i)\log (1 - \hat{y}_\beta(x_i))$$

but we add a restriction, namely:

$$ \text{arg}\,\text{min}_\beta\sum_{i=1}^n L(\beta, x_i), \quad \text{such that}\, \|\beta\| \lt C$$

for some $C > 0$ which determines how strong we want to regularize. If we use the L2-norm for $\Vert\beta\Vert$ we get Ridge regularization, and with the L1-norm we get Lasso. Smaller values for $C$ correspond with stronger regularization.

## Feature Selection with L1/L2 regularization

A key difference between the two kinds of regularization is that lasso "turns-off" features, while ridge only reduces their values. Why this happens has a nice geometric explanation which I took from [Elements of Statistical Learning](https://web.stanford.edu/~hastie/ElemStatLearn/). 

### Ridge

It can be shown for logistic regression with cross-entropy loss that the loss function is convex, with elliptical level sets. The gives the optimization problem shown below when $\beta = (w_1, w_2)$:

<figure style="text-align: center;">
    <img src="/assets/images/logreg/l2_regularization.png" style="width: 75%">
</figure>

In this picture, you can see that if we're using the L2-norm, the unit-ball takes the form of a circle. This means that the minimum will be where the black dot is, and this will usually be at a point where $w_1, w_2 > 0$, and as we wanted both fitted weights are smaller than the original one.

To see this happening with a real model, take a look at this graph which plots the value of various weights as we increase the amount of regularization by reducing $\text{df}(\lambda)$. 

<figure style="text-align: center;">
    <img src="/assets/images/logreg/ridge_coefficients.png" width = "75%">
</figure>

### Lasso

Things work a little differently for Lasso regularization with the L1-norm. In this case the unit ball looks like a diamond, which causes the constrained minimum to more often fall on the corners of the diamond. These corners correspond with features being set to zero.

<figure style="text-align: center;">
    <img src="/assets/images/logreg/l1_regularization.png" width = "75%">
</figure>

It's a bit harder to visualize this picture in higher dimensions, but just like the ridge regression we can plot the weight values against the regularization strength to visualize this "turning-off" of features.

<figure style="text-align: center;">
    <img src="/assets/images/logreg/lasso_coefficients.png" width = "75%">
</figure>

## Lagrange Duals and Regularization

The last thing I want to share is a detail on regularization I saw lot's of authors skip over. Usually regularization is written as this minimization problem, the one with regularization term added to the loss function

$$ \text{arg}\,\text{min}_\beta\left(\sum_{i=1}^n L(\beta, x_i) + \lambda \Vert\beta\Vert\right)$$

I wanted to figure out why this was equivalent to

$$ \text{arg}\,\text{min}_\beta\sum_{i=1}^n L(\beta, x_i), \quad \text{such that}\, \|\beta\| \lt C.$$

The second is essential to the whole geometric interpretation, while the first is the form used for gradient descent, so I wanted to see this equivalence for myself.

After some research, I found out these two formulations are equivalent due the [strong Lagrangian principle](https://www.wikiwand.com/en/Duality_(optimization)). For the curious, this comes from the field of convex optimization and tells us which conditions are necessary for these two types of problems to be equivalent. For more information on this duality you can check out [this paper](https://pdfs.semanticscholar.org/7aa3/9f7f3b69473705e247dd2b3a9689f10fbbc3.pdf) which formally proves this result.
