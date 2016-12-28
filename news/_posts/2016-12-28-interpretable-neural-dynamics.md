---
layout: post
title: Interpretable Nonlinear Neural Dynamics Model (NIPS 2016)
category: news
---

Neurons are the fundamental unit of computation of the brain, however, they do not work alone when we perceive a tiger and decide to run away.
The fundamental question in systems neuroscience is to understand *how neurons interact with each other to generate large-scale dynamics* that implements cognitive behavior and support dynamical neurological disease such as Parkinson's disease at the same time.

Recently, at the Conference on [Neural Information Processing Systems](http://nips.cc) (NIPS 2016), we have presented a paper about the developed a new time series model that can capture various proposed models of neural computation and diseases such as multiple fixed point attractors, continuous attractor, chaotic attractor, nonlinear oscillation, and bifurcation.

Yuan Zhao, Il Memming Park. **[Interpretable Nonlinear Dynamic Modeling of Neural Trajectories](https://arxiv.org/abs/1608.06546)**, NIPS 2016

{% include youtubePlayer.html id="7oWRZRpaq_I" %}

This model explicitly models the external stimulus interaction as locally linear, which means for any brain state, we have a predictive model for how the stimulus will drive the brain state.
We are working on combining the nonlinear time series model with a feedback control scheme as a potential advanced treatment for Parkinson's disease.

This project was partially funded by the Thomas Hartman foundation.
