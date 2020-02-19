---
layout: post
tags: bayesian-probability-theory math
#categories: []
date: 2020-02-19
#excerpt: ''
#image: 'BASEURL/assets/blog/img/.png'
#description:
#permalink:
title: 'Bayesian Interlude - Calculating P(X>Y)'
comments_id: 2
---
This post is a little sidenote to the last post on the Bayesian analysis of a game for children. Here we will calculate the expression $$P(X>Y \vert I)$$ given information about two variables $$X$$, $$Y$$.

We will use the notation from [the last post]({{site.baseurl}}/2020/02/08/bayesian-game-analysis-part1/), especially $$I$$ being all background information we have on a subject. We are interested in the following scenario for variables $$X$$, $$Y$$ which are absolutely continuous and real-valued: How do we calculate the probability $$P(X>Y \vert I)?$$

Let us try to write $$P(X>Y \vert I)$$ in terms of a much simpler expression, namely $$P(X>Y \vert X,Y,I)$$. The latter is just the probability of $$X>Y$$ *given* both $$X$$ and $$Y$$. This case is very easy to express because we can be 100% sure whether $$X>Y$$ is true when we are given $$X$$ and $$Y$$. Thus we can write this probability using the [Heaviside step function](https://de.wikipedia.org/wiki/Heaviside-Funktion):

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

This is not to be confused with the expression $$P(X>Y, X,Y \vert I)$$ which is the probability $$X$$ and $$Y$$ having certain values *and* $$X>Y$$ being true. However, that expression is related to $$(\ref{conditional})$$ by the [product rule]( https://en.wikipedia.org/wiki/Chain_rule_(probability) ):

$$P(X>Y, X, Y \vert I) = P(X>Y \vert X,Y,I) \cdot P(X,Y \vert I), \label{chain}\tag{2}$$

where  $$P(X,Y \vert I)$$ is called the *joint probability distribution* of $$X$$ and $$Y$$. This expression helps us a lot because we can also link it to $$P(X>Y \vert I)$$ using the [marginalization rule](https://en.wikipedia.org/wiki/Marginal_distribution):

$$P(X > Y \vert I) = \iint dX \, dY \, P(X>Y,X,Y \vert I),\label{marginal}\tag{3}$$

where the integral extends over the whole definition ranges of $$X$$, $$Y$$. Now we have all pieces together to derive a general expression by first plugging $$(\ref{chain})$$ into $$(\ref{marginal})$$:

$$\begin{eqnarray}
P(X > Y \vert I) &=& \iint dX \, dY \, P(X>Y \vert X,Y,I) \cdot P(X,Y \vert I) \\
                 &=& \iint dX \, dY \, \theta(X-Y) \cdot P(X,Y \vert I) \\
                 &=& \iint_{X>Y} dX \, dY \, \cdot P(X,Y \vert I).
\end{eqnarray}$$

So we arrive at the desired expression by integrating the joint probability distribution over all value pairs $$(X,Y)$$ with $$X>Y$$. That also makes sense intuitively, which is always reassuring.

# Special Cases and Extensions

## Independent Variables
$$X$$ and $$Y$$ being independent implies that the result of $$X$$ does not influence $$Y$$ and vice versa. Formally we can say that $$P(X \vert Y, I) = P(X \vert I)$$ and $$P(Y \vert X, I) = P(Y \vert I)$$. This means that the joint distribution becomes a product:

$$P(X,Y \vert I) = P(X \vert I) \cdot P(Y \vert I) \text{ for independent variables X, Y.}$$

### Extension to More than Two Variables
It is easy to extend the reasoning above to more than two variables. Let us take three variables $$X$$, $$Y$$, and $$Z$$. Say we are looking for $$P(X>Y, X>Z \vert I)$$, which is the probability of $$X$$ being larger than both $$Y$$ and $$Z$$.

We can just follow the steps above. The only thing that requires a tiny bit of attention is the expression $$P(X>Y, X>Z \vert X,Y,Z, I)$$ because we have to express the logical *and* in the expression "$$X>Y$$ and $$X>Z$$" as a function. We do so by using the product of $$\theta$$-functions:

$$P(X>Y, X>Z \vert X,Y,Z, I) = \theta(X-Y)\cdot \theta(X-Z).$$

Every other step is pretty much exactly as above, so that we end up with

$$P(X>Y, X>Z \vert I) = \iiint_{X>Y, X>Z} dX \, dY \, dZ \, \cdot P(X,Y,Z \vert I),$$

which can obviously be generalized to more variables.
