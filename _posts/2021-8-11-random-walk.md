---
layout: post
title: 1D Random walk and binomial distribution
---
A point particle can move in one dimentional discrete space. In each time step it can randomly move forward or backward.
The question is ¿Where is going to be the particle after $n$ steps? ¿What is the probability distribution os position $k$?

The final position $k$ after $B$ forward and $F$ backward steps have the relations:
$F + B = n$
$F -B = k$

To find the probability we have first to find the total number of configurations of the $n$ steps. Which is similar to 
find all the possible configurations of tossing a coin $n$ times; that is $2^{n}$

$ s = -k \ln\omega $
$ H = -\sum p\ln(p)$

What is the relation of teh definition of irrersivility and the assimetry in Bayes rule.
$ P(h|D) = \frac{P(D|h) P(h)}{P(D)} $
