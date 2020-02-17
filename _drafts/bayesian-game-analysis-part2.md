---
layout: post
tags: bayesian-probability-theory math games
#categories: []
date: 2020-02-17
#excerpt: ''
#image: 'BASEURL/assets/blog/img/.png'
#description:
#permalink:
title: 'Bayesian Analysis of a Game for Children - Part 2'
#comments_id:
---
This is the second installment my attempt at a rigorous statistical analysis of a game for children. In this post we will look at how confident we can be of the fact that one strategy delivers a higher chance of winning than a different strategy. As in the previous post I will use the game as a backdrop to dive into some facts and formulas about Bayesian probability theory.

## Comparing Stragegies

From the last post we know how to calculate a probability distribution for the chance of winning $$p$$ given a certain strategy from data. The probability distribution allows us to express our confidence in $$p$$ having a certain value on $$[0,1]$$. If we have data on several strategies $$S_j$$ we can calculate expressions for $$P(p_j\vert N_W,N,S_j,I)$$. Here $$p_j$$ is the chance of winning a single game given the stragegy $$S_j$$. Ultimately we are interested in an expression for how confident we are in the fact the $$p_i > p_j$$ for two stragegies. How do we do that?

## Taking a Step Back
If we carried on with our game example right here, we would not see the forest for the trees, because the notation would get confusing quickly. All we are interested in is the following scenario: we have variables $$X$$, $$Y$$ which are absolutely continuous and real-valued. What do we need to calculate the probability $$P(X>Y \vert I)$$? Again, $$I$$ again is all our background knowledge.

Let us try to write $$P(X>Y \vert I)$$ in terms of a much simpler expression, namely $$P(X>Y \vert X,Y,I)$$. The latter is just the probability of $$X>Y$$ *given* both $$X$$ and $$Y$$, which is very easy to express

$$
\begin{equation}
P(X>Y \vert X, Y, I) = \theta(X-Y) =
\begin{cases}
1 & X > Y \\
0 & \text{else.}
\end{cases}
\label{conditional}
\tag{1}
\end{equation}
$$

This is not to be confused with the expression $$P(X>Y, X,Y \vert I)$$ which is the probability of $$X>Y$$ *and* $$X$$ having the given value *and* $$Y$$ having a given value. However, this expression is related to $$(\ref{conditional})$$ by the [product rule]( https://en.wikipedia.org/wiki/Chain_rule_(probability) ):

$$P(X>Y, X, Y \vert I) = P(X>Y \vert X,Y,I) \cdot P(X,Y \vert I), \label{chain}\tag{2}$$

where  $$P(X,Y \vert I)$$ is called the *joint probability distribution* of $$X$$ and $$Y$$. This expression helps us a lot because we can also link it to $$P(X>Y \vert I)$$ using the [marginalization rule](https://en.wikipedia.org/wiki/Marginal_distribution):

$$P(X > Y \vert I) = \iint dX \, dY \, P(X>Y,X,Y \vert I),\label{marginal}\tag{3}$$

where the integral extends over the whole definition ranges of $$X$$, $$Y$$. Now we have all pieces together to derive a general expression by first plugging $$(\ref{chain})$$ into $$(\ref{marginal})$$:

$$\begin{eqnarray}
P(X > Y \vert I) &=& \iint dX \, dY \, P(X>Y \vert X,Y,I) \cdot P(X,Y \vert I) \\
                 &=& \iint dX \, dY \, \theta(X-Y) \cdot P(X,Y \vert I) \\
                 &=& \iint_{X>Y} dX \, dY \, \cdot P(X,Y \vert I).
\end{eqnarray}$$

So we arrive at the desired expression by integrating the joint probability distribution over all value pairs $$(X,Y)$$ with $$X>Y$$. That also makes sense intuitively.

### Simplifications for Independent Variables
If $$X$$ and $$Y$$ are independent, that means the result of $$X$$ does not influence $$Y$$ and vice versa. Formally we can say that $$P(X \vert Y, I) = P(X \vert I)$$ and $$P(Y \vert X, I) = P(Y \vert I)$$. This means that the joint distribution becomes a product:

$$P(X,Y \vert I) = P(X \vert I) \cdot P(Y \vert I) \text{ for independent variables X, Y.}$$

### Extension to More than Two Variables
It is easy to extend the reasoning above to more than two variables.
