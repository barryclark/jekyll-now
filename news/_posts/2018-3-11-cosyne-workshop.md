---
layout: post
title: COSYNE 2018 Workshops
category: news
---

After a cold trip, we finally made it to Breckenridge. 
I felt lucky to get on a shuttle before the storm that blocked the way.
The resort was really a nice and warm place to heal my headache. 

![breckenridge](/images/breckenridge.jpg)

During the two days, I spent most of my time in the workshops of recurrent neural networks and manifolds. There were interesting talks in both of them. I wish the organizers could make videos online afterwards.

____
(Written by Yuan Zhao)

____

**Studying human-level cognition with trained recurrent neural networks**

Robert Yang introduced a common framework to describe many cognitive tasks as graphs of simple operators, and trained RNN to perform various tasks within this framework. They found that the network developed compositionality of task representations, whereby one task can be performed by recombining in structions for other tasks. This talk pertains to the preprint [Clustering and compositionality of task representations in a neural network trained to perform many cognitive tasks](https://www.biorxiv.org/content/early/2017/09/01/183632).

**Low-dimensional population activity in recurrent spiking networks**

Byron Yu showed the work of applying factor analysis on spiking activity of recurrent neural networks. He compared the dimensionality of two types of networks to real V1 recordings.
```
         Balanced                         Clustered
                                 +---------+
                                 | +-+     |
 +-----+          +-----+        | |E|     |      +-----+
 |     | <------+ |     |        | +-+ +-+ | +--> |     |
 |  E  |          |  I  |        |     |E| |      |  I  |
 |     | +------> |     |        | +-+ +-+ | <--+ |     |
 +-----+          +-----+        | |E|     |      +-----+
                                 | +-+     |
                                 +---------+
```
Basically there were two kinds of comparisons that how the dimensionality and the percentage of explained variance change as more and more neurons or trials included in the analysis. Unfortunately, Byron could not finish all the staff in time because too many questions raised.

**Describing nonlinear latent dynamics**

Maneesh Sahani talked about the *Gaussian Process Dynamical Model* (GPDM) which describes nonlinear dynamical systems in forms of
\\[ 
    \begin{eqnarray}
    x_t &=& f(x_{t-1}, u_t) + \epsilon_t, \\\
    y_t &=& g(x_t) + \eta_t
    \end{eqnarray}
\\]
where \\(x_t\\) and \\(y_t\\) are the latent state and observation of current time respectively, while \\(\epsilon_t\\) and \\(\eta_t\\) are Gaussian noises in discrete time. Instead of perceptrons, \\(f\\) and \\(g\\) are implemented by Gaussian Processes. To enable examining locally the fixed points, further each parametrized fixed point and Jacobian were given as
\\[
    f(s) + \sigma_s \zeta = s \\\
    \nabla f(s) = J
\\]
The inference is done by *Assumed Density Filtering* which optimizes \\(s\\), \\(\sigma_s\\) and \\(J\\) as well. Note that \\(\sigma_s\\) represents the confidence on the fixed point \\(s\\).

