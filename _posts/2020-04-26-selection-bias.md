---
layout: post
title: Selection bias and sample calibration
---

<script src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML" type="text/javascript"></script>

When using data from a sample of a population of interest
to make inferences about that population,
it's important to be aware of the
sampling process, i.e.
how observed units in the sample were chosen.

The goals of this post are:

1. To convey a brief introduction of probability sampling;
1. To talk about systematic selection biases and how we can reason about it;
1. To expose the risk of being misled by selection bias
when conclusions are driven by common statistical tools
by showing that, under selection bias,
more data does not mean that estimates are more accurate;
1. Finally, to demonstrate what you can do about it
and help you to understand the assumptions and consequent
limitations of such tools.

This post is for anyone who is interested on these issues
and has a basic understanding of probability and statistics.

I'll discuss these topics in a simple yet realistic scenario.
I'll take advantage of the simplicity to make a deeper analysis
that hopefully helps to understand the technique as applied in the wild.

## The problem

We are interested in a finite population
$$U = \{1,2,\ldots,N\}$$ of $$N$$ elements
and we have at our disposal a sample
$$S \subset U$$ of $$n$$ elements taken from $$U$$.
We need to use $$S$$ to estimate

$$\begin{equation}
P(C) = \frac{|C|}{N},
\end{equation}$$

the proportion of elements of $$U$$ that belong to a set $$C \subset U$$.
You can also think of $$P(C)$$ as the probability of
sampling a random element from $$U$$ and then finding out
that it belongs to $$C$$.

## The population in one figure

That situation can be visualized below,
where the whole rectangle is $$U$$ and
we also add that it can be partitioned into
two disjoint sets $$A$$ and $$B = A^c$$
(just the complement of $$A$$ in $$U$$),
which are going to be useful in a minute.

You can think of $$A$$ as being any other
characteristic of the elements of $$U$$
that may be important to understand those
which belong to $$C$$.
Both $$A$$ and $$C$$ could be
some thresholding on age, years
of education or gender in case
we are talking about humans.

<div style="text-align:center">
<img src="{{ site.baseurl }}/images/selection-bias/sets.png" />
</div>

## Probability sampling

We say that $$S$$ is a probability sample if
it was obtained by a **controlled (i.e. known) randomization procedure**
that attaches to each element $$i \in U$$ an inclusion probability
$$\pi_i$$ of it being chosen to be part of $$S$$.
Let's define two binary variables for each $$i \in U$$:

* $$s_i = 1$$ if $$i \in S$$, and $$s_i = 0$$ otherwise;
* $$c_i = 1$$ if $$i \in C$$, and $$c_i = 0$$ otherwise.

Note that $$c_i$$ is just a constant
that can be perfectly known as long as we have access
to the unit $$i$$.
On the other hand, we only get to know the
$$s_i$$ values once we get $$S$$,
and repeating the same randomized process
may yield different values for the same $$i$$.
What we know a priori (because we controlled/designed it)
is the selection probability
$$P(s_i = 1) = 1 - P(s_i = 0) = \pi_i$$
(prior to sampling, it's a
[Bernoulli random variable](https://en.wikipedia.org/wiki/Bernoulli_distribution)).

Now we may write

$$
P(C)
= \frac{|C|}{N}
= \frac{1}{N} \sum_{i \in U} c_i.
$$

Let's try to employ the sample analogue of the above equation
to estimate $$P(C)$$ from $$S$$:

$$
\widehat{P(C)}
= \frac{1}{n} \sum_{i \in S} c_i.
$$

Note that $$\widehat{P(C)}$$ is a random variable
because it depends on $$S$$,
which we do not know a priori.
Is it accurate as an estimator of $$P(C)$$?
Let's make the dependence on $$S$$ explicit
in terms of the $$s_i$$ variables
(note the change from $$S$$ to $$U$$ in the second summation):

$$
\widehat{P(C)}
= \frac{1}{n} \sum_{i \in S} c_i
= \frac{1}{n} \sum_{i \in U} c_i \cdot s_i.
$$

Since the $$c_i$$s are constants, it's easy to
compute the expectation of this random variable:

$$\begin{align}
\mathrm{E} \left\{ \widehat{P(C)} \right\}
&= \mathrm{E} \left\{ \frac{1}{n} \sum_{i \in U} c_i \cdot s_i \right\} \\
&= \frac{1}{n} \sum_{i \in U} c_i \cdot \mathrm{E} \left\{ s_i \right\} \\
&= \frac{1}{n} \sum_{i \in U} c_i \cdot \pi_i.
\end{align}$$

Now, when all units $$i$$ are equally likely to be sampled,
we have that $$\pi_i = n/N$$ for all $$i$$.
In this case, $$S$$ is called a **simple random sample (SRS)**
and the previous equation shows that

$$\begin{align}
\mathrm{E} \left\{ \widehat{P(C)} \right\} = \frac{1}{N} \sum_{i \in U} c_i = P(C).
\end{align}$$

That is, under a SRS,
the sample proportion of cases in $$C$$ is a nice
guess of its populational counterpart.
When the above equation holds true, we
say that the estimator is centered.

## The Horvitz-Thompson estimator

But **what if $$S$$ is not a SRS?**
What if the elements in $$U$$ are not equally likely to be in $$S$$?

An important observation is that both
$$P(C)$$ and $$\widehat{P(C)}$$ are linear
combinations of the $$c_i$$s.
Let's write it down:

$$
\widehat{P(C)} = \sum_{i \in S} k_i \cdot c_i,
$$

where the $$k_i$$s are constants.
In the SRS case,
we just saw that $$k_i = 1/n$$ is a
good choice because $$\pi_i = n/N$$.
In general, we observe that the expectation
of this linear estimator is

$$\begin{align}
\mathrm{E} \left\{ \widehat{P(C)} \right\}
&= \mathrm{E} \left\{ \sum_{i \in U} k_i \cdot c_i \cdot s_i \right\} \\
&= \sum_{i \in U} k_i \cdot c_i \cdot \pi_i.
\end{align}$$

If we set $$k_i = (N \pi_i)^{-1}$$,
then $$\widehat{P(C)}$$ is centered for $$P(C)$$.
This is known as the
[Horvitz-Thompson estimator (HTE)](https://en.wikipedia.org/wiki/Horvitz%E2%80%93Thompson_estimator#Proof_of_Horvitz-Thompson_Unbiased_Estimation_of_the_Mean).
It assumes that we know the randomization process
that yields $$S$$ and therefore know the inclusion probabilities
$$\pi_i$$ up to reasonable accuracy for all $$i$$.

Notice that
probability sampling designs can also have
different inclusion probabilities for different units
in the population
([SRS is not the only probability sampling design](https://en.wikipedia.org/wiki/Sampling_(statistics)#Sampling_methods)).
That design choice can be used as a
tool to reduce the variance of the estimates.

But what if we do not know the $$\pi_i$$s?
Equivalently,
**what if we do not know the process that yields $$S$$?**
Well, welcome to most real-world data analysis problems.

## Some simulations

Before jumping into some workarounds, let's
take a closer look at how s


## Calibration

In practice, we rarely know the structure of
the sampling process.
However, when we do know it, we saw that
the HTE proposes to weight the observation
of unit $$i$$ with $$(N\pi_i)^{-1}$$.
That's nicely intuitive since we may interpret $$N \pi_i$$ as
the number of units in $$U$$ that the unit $$i$$
will be responsible to represent in case it's sampled.

The baseline approach is usually the sample proportion,
which we know to be our best guess of $$P(C)$$
under SRS.
How can we improve it?

Let's suppose that knowing that an unit belongs to $$A$$
is a relevant piece of information to guess whether
or not it is also in $$C$$.
In other words, guesses based on the conditional distribution
$$P(C \mid A)$$ are more accurate than guesses that use solely $$P(C)$$.

From the
[law of total probability](https://en.wikipedia.org/wiki/Law_of_total_probability),
in the population we have

$$\begin{align}
P(C) = P(C \mid A) \ P(A) + P(C \mid B) \ P(B),
\end{align}$$

and a similar equation is true when we also condition on the sample:

$$
\begin{align}
P(C \mid S)
&= P(C \mid A \cap S)\ P(A \mid S) + P(C \mid B \cap S) \ P(B \mid S).
\end{align}
$$

It may be useful to visualize these equations in the figure at the beginning.
Note that $$P(C \mid S)$$ is just the baseline estimate,
the fraction of $$C$$ in $$S$$.
Also, it's informative to evaluate the right-hand side
of the last equation for the SRS case,
just to help to convince ourselves that it makes sense:

$$
\frac{n(C \cap A)}{n(A)} \frac{n(A)}{n} +
\frac{n(C \cap B)}{n(B)} \frac{n(B)}{n} =
\frac{n(C)}{n},
$$

where we write $$n(X)$$ for the number of
sampled elements that belong to the set $$X$$,
and use the fact that $$A$$ and $$B$$
form a partition of $$U$$.

Therefore, the (observed) bias of our baseline estimator
is $$P(C \mid S) - P(C)$$ and it's hopefully
clear that it has two sources:

1. $$P(A \mid S) \neq P(A)$$:
Whenever $$A$$ and $$C$$ are correlated,
i.e. the distribution $$P(C \mid A)$$ is different from $$P(C)$$,
$$A$$ being over- ($$P(A \mid S) > P(A)$$) or under-represented ($$P(A \mid S) < P(A)$$)
in the sample can be a problem if we want to estimate $$P(C)$$;
2. $$P(C \mid A \cap S) \neq P(C \mid A)$$ (similarly for $$B$$):
If the previous point is OK, we can still suffer if there is
selection bias within $$A$$ and $$B$$ with respect to $$C$$.

## Case study: COVID-19 lethality rates


## Sum up

We've learned that

- Under SRS, the commonly used
sample proportion is a good guess for the populational proportion
- When that is not the case but we know the sampling process,
the general form of the proportion estimator is given by
the Horvitz-Thompson estimator, in which each unit $$i$$
is assigned a weight proportional to $$\pi_i^{-1}$$;
- testing




