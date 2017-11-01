---
layout: post
title: Optimal transport
---

Transportation theory has been around since 1781 but still remains an active topic of research. Optimal transport theory is concerned with optimally distributing resources to a set of sinks. More formally, it is a theory to transform one probability distribution into another using a given cost function.

In this seminar I will try to convey this problem using a case study I dubbed the 'zoetjeslijst problem'. This problem will be solved using a simple algorithm. Furthermore, I will discuss some examples (in greater or smaller detail) about interpolating probability distributions, domain adaptation, image color transfer, comparing distributions with prior knowledge, modeling complex systems and computational fluid dynamics.

This seminar will take one hour max, and is relevant for people working with data, probability or distributions.

=> herwerk tot goede abstract!

## KERMIT party!

Let's have a party in our research unit! Pastries and party hats for everyone! We ask Tinne, our laborant, to make some desserts: an airy merveilleux, some delicious eclairs, a big bowl of dark chocolate mousse, a sweet passion fruit-flavored bavarois and moist carrot cake (got to have vegetables). If we mentally cut all these sweets into portions, we have twenty portions as shown in the table below.

<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>merveilleux</th>
      <th>eclair</th>
      <th>chocolate mousse</th>
      <th>bavarois</th>
      <th>carrot cake</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Pieces</th>
      <td>4</td>
      <td>2</td>
      <td>6</td>
      <td>4</td>
      <td>4</td>
    </tr>
  </tbody>
</table>

Since this is academia, we respect the hierarchy: people higher on the ladder can have to take more dessert. The professors, Bernard, Jan and Willem get three pieces each, our senior post-doc Hilde will take four portions (one for each of her children) and the teaching assistants are each allowed two portions. Sorry Wouter, since you are a shared teaching assistant with the Biomath research group, you can only take one...

<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Bernard</th>
      <th>Jan</th>
      <th>Willem</th>
      <th>Hilde</th>
      <th>Steffie</th>
      <th>Marlies</th>
      <th>Tim</th>
      <th>Wouter</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Pieces</th>
      <td>3</td>
      <td>3</td>
      <td>3</td>
      <td>4</td>
      <td>2</td>
      <td>2</td>
      <td>2</td>
      <td>1</td>
    </tr>
  </tbody>
</table>

As engineers and mathematicians, we pride ourselves in doing things the optimal way. So how can we divide the desserts to make everybody as happy as possible. As I prepare a course on optimization, I went around and asked which of those cakes and tarts they liked. On a scale between -2 and 2, with -2 being something they hated and 2 being their absolute favorite, the desert preferences of the teaching staff is given below (students: take note!).

<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>merveilleux</th>
      <th>eclair</th>
      <th>chocolate mousse</th>
      <th>bavarois</th>
      <th>carrot cake</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Bernard</th>
      <td>2.0</td>
      <td>2</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>Jan</th>
      <td>0.0</td>
      <td>-2</td>
      <td>-2</td>
      <td>-2</td>
      <td>2</td>
    </tr>
    <tr>
      <th>Willem</th>
      <td>1.0</td>
      <td>2</td>
      <td>2</td>
      <td>2</td>
      <td>-1</td>
    </tr>
    <tr>
      <th>Hilde</th>
      <td>2.0</td>
      <td>1</td>
      <td>0</td>
      <td>1</td>
      <td>-1</td>
    </tr>
    <tr>
      <th>Steffie</th>
      <td>0.5</td>
      <td>2</td>
      <td>2</td>
      <td>1</td>
      <td>0</td>
    </tr>
    <tr>
      <th>Marlies</th>
      <td>0.0</td>
      <td>1</td>
      <td>1</td>
      <td>1</td>
      <td>-1</td>
    </tr>
    <tr>
      <th>Tim</th>
      <td>-2.0</td>
      <td>2</td>
      <td>2</td>
      <td>1</td>
      <td>1</td>
    </tr>
    <tr>
      <th>Wouter</th>
      <td>2.0</td>
      <td>1</td>
      <td>2</td>
      <td>1</td>
      <td>-1</td>
    </tr>
  </tbody>
</table>

See how most people like eclairs and chocolate mousse, but merveilleus are a much more polarizing dessert! Jan is lactose intolerant, so he gave a high score to the carrot cake by default.

My task is clear: divide these desserts in such a way that people get their portions of the kinds they like the most!

## The optimal transport problem

Let us introduce some notation so we can formally state this as an optimization problem. Let $\mathbf{r}$ be the vector containing the amount of dessert every portion can eat. In this case $\mathbf{r} = (3,3,3,4,2,2,2,1)^\intercal$ (in general the dimension of $\mathbf{r}$ is $n$). Similarly, $\mathbf{c}$ denotes the vector of how much there is of every dessert, i.e. $\mathbf{c}=(4, 2, 6, 4, 4)^\intercal$ (in general the dimension of $\mathbf{c}$ is $m$). Often $\mathbf{r}$ and $\mathbf{c}$ represent marginal probability distributions, hence their values sum to one.

Let $U(\mathbf{r}, \mathbf{c})$ be the set of positive $n\times m$ matrices for which the rows sum to $\mathbf{r}$ and the columns sum to $\mathbf{c}$:
$$
U(\mathbf{r}, \mathbf{c}) = \{P\in \mathbb{R}_{>0}^{n\times m}\mid P\mathbf{1}_m = \mathbf{r}, P^\intercal\mathbf{1}_n = \mathbf{c}\}\,.
$$
For our problem, $U(\mathbf{r}, \mathbf{c})$ contains all the ways of dividing the desserts for my colleagues.

The preferences of each person for each dessert is also stored in a matrix. In order to be consistent with the literature, this will be stored in a $n\times m$ *cost* matrix $M$. The above matrix is a preference matrix which can easily changed into a cost matrix by inverting the sign of every element.

So finally, the problem we want to solve is formally posed as
$$
d_M(\mathbf{r}, \mathbf{c}) = \min_{P\in U(\mathbf{r}, \mathbf{c})}\, \sum_{ij}P_{ij}M_{ij}\,.
$$
This is called the *optimal transport* between $\mathbf{r}$ and $\mathbf{c}$. This has been around for several centuries in mathematics. It can be solved using linear programming.

The optimum, $d_M(\mathbf{r}, \mathbf{c})$, is called the *Wasserstein metric*. Is a basically a distance between two probability distributions. It is sometimes also called the *earth mover distance* as it can be interpreted as how much 'dirt' you have to move to change one 'landscape' (distribution) in another.

## Choosing a bit of everything

Consider a slightly modified form of the optimal transport:
$$
d_M^\lambda(\mathbf{r}, \mathbf{c}) = \min_{P\in U(\mathbf{r}, \mathbf{c})}\, \sum_{i=1}^n\sum_{j=1}^mP_{ij}M_{ij} - \frac{1}{\lambda}h(P)\,,
$$
with
$$
h(P) = -\sum_{ij}P_{ij}\log P_{ij}
$$
the *information entropy* of $P$. One can increase the entropy by making the distribution more homogeneous, i.e. giving everybody an equal share of every dessert. The parameter $\lambda$ determines the trade-off between the two terms: trying to give every person only their favorites or encouraging equal distributions. Machine learners will recognize this as similar to regularization in for example ridge regression

- Sinkhorn distance

##

![](../images/2017_optimal_transport/desserts_high_lambda.png)

$$
\mathcal{L}(P, \lambda, \{a_1,\ldots,a_n\}, \{b_1,\ldots,b_m\}) = \sum_{ij}P_{ij}M_{ij} +\frac{1}{\lambda}\sum_{ij}P_{ij}\log P_{ij} \\+ \sum_{i=1}^n a_i (r_i-\sum_j P_{ij})+ \sum_{j=1}^m b_j (c_j-\sum_i P_{ij})
$$

$$
\frac{\partial \mathcal{L}(P, \lambda, \{a_1,\ldots,a_n\})}{\partial P_{ij}} |_{P^*_{ij}}=0
$$

$$
\frac{\partial \mathcal{L}(P, \lambda, \{a_1,\ldots,a_n\})}{\partial P_{ij}}  = M_{ij} +\frac{\log P_{ij}}{\lambda} + \frac{1}{\lambda} -a_i- b_j
  $$

$$
P^\star_{ij} = e^{-a_i-b_j-1} e^{-\lambda M_{ij}}
$$


$$
P^\star_{ij} = \alpha_i\beta_j e^{-\lambda M_{ij}}
$$

## References

Lévy, B. and Schwindt, E. (2017). *Notions of optimal transport theory and how to implement them on a computer* [arxiv](https://arxiv.org/pdf/1710.02634.pdf)

Courty, N., Flamary, R., Tuia, D. and Rakotomamonjy, A. (2016). *Optimal transport for domain adaptation*

Cuturi, M. (2013) *Sinkhorn distances: lightspeed computation of optimal transportation distances*
