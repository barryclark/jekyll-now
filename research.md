---
layout: page
title: Research
permalink: /research/
---

The unifying theme of our work is the use of flexible, quantitative, scalable models of neural time series to advance experimental and theoretical understanding of neural computation at the systems level. These data-driven models of neural dynamics have general applicability to many behavioral tasks and neural recording techniques for understanding how the brain works. Our approach is to design __statistical models__ and __machine learning methods__ specialized for analyzing __neural data__.

## Neural Computation and Dynamics

One of the central problems in systems neuroscience is to understand *how neurons collectively implement computation*. While even for seemingly simple tasks–such as expecting reward at a fixed interval or reporting what was perceived–there exist many plausible explanatory theories, solid empirical support is rare. Our research aims at building statistically rigorous connections between the increasingly large-scale neural recordings from behaving animals and plausible theories of how the brain computes. We work with several experimental groups to design behavioral experiments and analyses to recover the hidden neural dynamics and computation from neural signals. 

## Neural Coding

How is information represented in the *noisy* spatio-temporal pattern of neural activity? How *efficient* is the representation? To answer these questions, we build data-driven models that explains the neural signals in the given context. For example, we build probabilistic encoding models that predict the neural response (esp. spike trains) from external variables such as sensory stimuli and behavior.

## Controlling Neural Dynamics

How can we verify a dynamic model of how the brain works?
If we can build a feedback control system that can manipulate internal states, it will strongly support the dynamic model.
Furthermore, robust feedback control of neural states can benefit treatment of many neurological diseases such as epilepsy, Parkinson's, and coma.

## Machine learning, Statistics, and Signal Processing

To understand the above neuroscientific questions, we need powerful algorithms and methods. For one, unlike conventional amplitude modulated signals, neural spike trains carry information in the spike timings, and not the amplitude. Hence, widely used signal processing and machine learning techniques are not readily applicable for their analysis. We develop various methods that can be applied to spike trains. Another focus is to build efficient methods that scales well to high-dimensional datasets to deal with increasingly large-scale neural recordings.

* Stochastic variational inference for time series models
* Deep learning for spike patterns
* Kernel methods for spike trains
* Bayesian kernel adaptive filtering
* Brain machine interfaces
* Dimensionality reduction
* Non-parameteric Bayes
* Spectral methods
* Hypothesis tests for spike trains
* Estimation of information theoretic quantities
* Scalable models for high-dimensional data
