---
layout: post
title: Variational Algorithms For Approximate Bayesian Inference (2003)
category: journalclub
olddate: July 3rd, 2018
---

* [Paper]({{site.url}}/journalclub/JCpapers/Beal_Variational_Bayesian.pdf) Matthew Beal. Variational Algorithms For Approximate Bayesian Inference, Dissertation. University of London (2003)
* Abstract

The Bayesian framework for machine learning allows for the incorporation of prior knowledge
in a coherent way, avoids overfitting problems, and provides a principled basis for selecting
between alternative models. Unfortunately the computations required are usually intractable.
This thesis presents a unified variational Bayesian (VB) framework which approximates these
computations in models with latent variables using a lower bound on the marginal likelihood.
Chapter 1 presents background material on Bayesian inference, graphical models, and propagation
algorithms. Chapter 2 forms the theoretical core of the thesis, generalising the expectationmaximisation
(EM) algorithm for learning maximum likelihood parameters to the VB EM algorithm
which integrates over model parameters. The algorithm is then specialised to the large
family of conjugate-exponential (CE) graphical models, and several theorems are presented to
pave the road for automated VB derivation procedures in both directed and undirected graphs
(Bayesian and Markov networks, respectively).
Chapters 3-5 derive and apply the VB EM algorithm to three commonly-used and important
models: mixtures of factor analysers, linear dynamical systems, and hidden Markov models.
It is shown how model selection tasks such as determining the dimensionality, cardinality, or
number of variables are possible using VB approximations. Also explored are methods for
combining sampling procedures with variational approximations, to estimate the tightness of
VB bounds and to obtain more effective sampling algorithms. Chapter 6 applies VB learning
to a long-standing problem of scoring discrete-variable directed acyclic graphs, and compares
the performance to annealed importance sampling amongst other methods. Throughout, the
VB approximation is compared to other methods including sampling, Cheeseman-Stutz, and
asymptotic approximations such as BIC. The thesis concludes with a discussion of evolving
directions for model selection including infinite models and alternative approximations to the
marginal likelihood.