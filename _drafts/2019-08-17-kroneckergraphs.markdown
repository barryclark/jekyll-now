---
layout: post
title: "Realistic networks using Kronecker graphs"
date: "2019-08-17 13:16:07 +0200"
---

How does the common cold spread in a population? Why are molecular networks so rubust to perturbations? Do I know someone who knows someone who knows Elon Musk? All these questions can be answered using network science. Networks are extremely powerful tools to model various phenomena around us. In this blog post, I will explain how Kronecker graphs can be used to similate large, realistic networks.

## Why similate networks?

Just like biologists love their *E. coli* and *C. elegans* model organisms, so do network scientist like toy networks such as the [karate club network](https://en.wikipedia.org/wiki/Zachary%27s_karate_club). The nice thing in working with abstract objects is that you can simulate them.

Real-world networks are complex. They are [small-world](https://en.wikipedia.org/wiki/Small-world_network)! They are scale-free ([supposingly](https://arxiv.org/abs/1801.03400))! They are nested!

## Kronecker graphs

$$
{\displaystyle  {A} \otimes  {B} ={\begin{bmatrix}a_{11}{B} &\cdots &a_{1n}{B} \\\vdots &\ddots &\vdots \\a_{m1} {B} &\cdots &a_{mn} {B} \end{bmatrix}}}
$$

$$
{{A}\otimes {B}} = \begin{bmatrix}
   a_{11} b_{11} & a_{11} b_{12} & \cdots & a_{11} b_{1q} &
                   \cdots & \cdots & a_{1n} b_{11} & a_{1n} b_{12} & \cdots & a_{1n} b_{1q} \\
   a_{11} b_{21} & a_{11} b_{22} & \cdots & a_{11} b_{2q} &
                   \cdots & \cdots & a_{1n} b_{21} & a_{1n} b_{22} & \cdots & a_{1n} b_{2q} \\
   \vdots & \vdots & \ddots & \vdots & & & \vdots & \vdots & \ddots & \vdots \\
   a_{11} b_{p1} & a_{11} b_{p2} & \cdots & a_{11} b_{pq} &
                   \cdots & \cdots & a_{1n} b_{p1} & a_{1n} b_{p2} & \cdots & a_{1n} b_{pq} \\
   \vdots & \vdots & & \vdots & \ddots & & \vdots & \vdots & & \vdots \\
   \vdots & \vdots & & \vdots & & \ddots & \vdots & \vdots & & \vdots \\
   a_{m1} b_{11} & a_{m1} b_{12} & \cdots & a_{m1} b_{1q} &
                   \cdots & \cdots & a_{mn} b_{11} & a_{mn} b_{12} & \cdots & a_{mn} b_{1q} \\
   a_{m1} b_{21} & a_{m1} b_{22} & \cdots & a_{m1} b_{2q} &
                   \cdots & \cdots & a_{mn} b_{21} & a_{mn} b_{22} & \cdots & a_{mn} b_{2q} \\
   \vdots & \vdots & \ddots & \vdots & & & \vdots & \vdots & \ddots & \vdots \\
   a_{m1} b_{p1} & a_{m1} b_{p2} & \cdots & a_{m1} b_{pq} &
                   \cdots & \cdots & a_{mn} b_{p1} & a_{mn} b_{p2} & \cdots & a_{mn} b_{pq}
\end{bmatrix}
$$



## Stochastic Kronecker graphs

```julia
using SparseArrays: spzeros
using StatsBase: sample, Weights

function samplekrongraph(P::KroneckerPower)
    A, pow = P.A, P.pow
    n, m = size(A)
    G = spzeros(Bool, n^pow, m^pow)  # empty sparse matrix for the interactions
    # we construct a function to sample indices of A,
    # the probability of sampling (i, j) is proportional to A[i,j]
    W = Weights(vec(A), sum(A))
    sampleindices = s -> Tuple.(sample(CartesianIndices(A), W, s))
    for edge in 1:sum(P)
        i, j = 1, 1
        for (k, l) in sampleindices(pow)
            i, j = (i-1) * n + k, (j-1) * m + l
        end
        G[i,j] = true
    end
    return G
end
```



## A small simulation study
