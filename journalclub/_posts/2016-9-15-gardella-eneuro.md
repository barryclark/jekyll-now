---
layout: post
title: A Tractable Method for Describing Complex Couplings Between Neurons and Population Rate (2016)
category: journalclub
olddate: September 20, 2016
---

* [Paper](http://eneuro.org/content/eneuro/early/2016/07/18/ENEURO.0160-15.2016.full.pdf) Christophe Gardella, Olivier Marre, and Thierry Mora, A tractable method for describing complex couplings between neurons and population rate, eNeuro, DOI: 10.1523/ENEURO.0160-15.2016

* Abstract

Neurons within a population are strongly correlated, but how to simply capture these correlations is still a matter of debate. Recent studies have shown that the activity of each cell is influenced by the population rate, defined as the summed activity of all neurons in the population. However, an explicit, tractable model for these interactions is still lacking. Here we build a probabilistic model of population activity that reproduces the firing rate of each cell, the distribution of the population rate, and the linear coupling between them. This model is tractable, meaning that its parameters can be learned in a few seconds on a standard computer even for large population recordings. We inferred our model for a population of 160 neurons in the salamander retina. In this population, single-cell firing rates depended in unexpected ways on the population rate. In particular, some cells had a preferred population rate at which they were most likely to fire. These complex dependencies could not be explained by a linear coupling between the cell and the population rate. We designed a more general, still tractable model that could fully account for these non-linear dependencies. We thus provide a simple and computationally tractable way to learn models that reproduce the dependence of each neuron on the population rate.