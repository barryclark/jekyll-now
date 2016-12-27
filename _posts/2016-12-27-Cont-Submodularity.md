---
layout: post
title: Continuous submodularity Non-convex structure with guaranteed optimization
---

Recently, we are working on optimizing a class of non-convex objectives with a nice
structure: _continuous submodularity_.  Submodularity is a classical structure in
combinatorial optimization, with important implications for optimizing set-functions.

It turns out that continuous submodularity is also a common structure for many continuous
objectives, with strong guarantees for both minimizing and maximizing continuous-functions.
For two very recent papers, one can refer to [the one](https://arxiv.org/abs/1511.00394)
from Francis Bach for minimization, and
[the one](http://neocortex.ch/docs/sfmax_cont.pdf) from us for maximization.


We give a thorough characterization of submodular continuous-functions, which can be
put in comparison with that of convex functions. They are summarized
in the following table.

![Table 1](/images/cont-submodularity/table1.png)

The $0^\text{th}$ order property gives the definition: the domain $X$ is the Cartesion product of
subsets of $R$, it is actually a lattice. A function $f$ is submodular iff. for all $(x,y)$ in the domain,
it satisfies,
\begin{align}
f(x) + f(y) \geq f(x\vee y) + f(x\wedge y).
\end{align}


There are some interesting open problems: 1)
