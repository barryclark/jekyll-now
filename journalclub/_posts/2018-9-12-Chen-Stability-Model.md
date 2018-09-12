---
layout: post
title: Stability Of Point Process Spiking Neuron Models (2018)
category: journalclub
olddate: September 17th, 2018
---

* [Paper]({{site.url}}/journalclub/JCpapers/Chen_Stability_Model.pdf) Chen, Y., Xin, Q., Ventura, V., and Kass, R.E. (2018) Stability of point process spiking neuron models , Journal of Computational Neuroscience, to appear.
* Abstract

Point process regression models, based on
generalized linear model (GLM) technology, have been
widely used for spike train analysis, but a recent paper
by Gerhard et al. described a kind of instability, in
which fitted models can generate simulated spike trains
with explosive firing rates. We analyze the problem by
extending the methods of Gerhard et al. First, we improve
their instability diagnostic and extend it to a
wider class of models. Next, we point out some common
situations in which instability can be traced to model
lack of fit. Finally, we investigate distinctions between
models that use a single filter to represent the effects
of all spikes prior to any particular time t, as in a 2008
paper by Pillow et al., and those that allow different
filters for each spike prior to time t, as in a 2001 paper
by Kass and Ventura. We re-analyze the data sets
used by Gerhard et al., introduce an additional data
set that exhibits bursting, and use a well-known model
described by Izhikevich to simulate spike trains from
various ground truth scenarios. We conclude that models
with multiple filters tend to avoid instability, but
there are unlikely to be universal rules. Instead, care in
data fitting is required and models need to be assessed
for each unique set of data.