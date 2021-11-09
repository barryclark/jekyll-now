---
layout: post
title: 1D Random walk and binomial distribution
---
A point particle can move in one dimentional discrete space. In each time step it can randomly move forward or backward.
The question is ¿Where is going to be the particle after $n$ steps? ¿What is the probability distribution os position $k$?

The final position $k$ after $B$ forward and $F$ backward steps have the relations:

$F + B = n$

$F - B = k$

__The combinatorial part__

To calculate the probability, we have first to find the total number of configurations of the $n$ steps. Which is similar to 
find all the possible configurations of tossing a coin $n$ times; that is $2^{n}$.

$\omega(n)=2^{n}$ is the total number of configurations. Now we need to calculate the number of configurations that have $F$ forward steps.
That is similar to find all the ways you can fill $F$ boxes in an array of $n$ boxes.

- For the first space you have $n$ options.
- For the next, $n-1$.
- Until you have $n-F+1$ for the last one.

So, the firt part of our formula is:

$\frac{n!}{(n-F)!}$

Because we care about the combinations and not the order in which these combinations of spaces is filled, we need to divide the
above expresion by the number of different ordinances the $F$ selected spaces can be filled. That is $F!$.

The number of ways to fill $F$ spaces out of $n$ spaces is

$\omega(F) = \frac{n!}{F!(n-F)!}$,

and the probability of $F$ forward steps

$P(F, n) = \frac{n!}{2^{n}F!(n-F)!}$


