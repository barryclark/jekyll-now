---
layout: post
title: Estimating short-term synaptic plasticity from pre- and postsynaptic spiking (2017)
category: journalclub
olddate: February 12, 2018
---

* [Paper]({{site.url}}/journalclub/JCpapers/Ghanbari_Estimating_Plasticity.pdf) Abed Ghanbari, Aleksey Malyshev, Maxim Volgushev, Ian H. Stevenson. Estimating short-term synaptic plasticity from pre- and postsynaptic spiking, PLOS. (2017)
* Abstract

Short-term synaptic plasticity (STP) critically affects the processing of information in neuronal
circuits by reversibly changing the effective strength of connections between neurons on
time scales from milliseconds to a few seconds. STP is traditionally studied using intracellular
recordings of postsynaptic potentials or currents evoked by presynaptic spikes. However,
STP also affects the statistics of postsynaptic spikes. Here we present two model-based
approaches for estimating synaptic weights and short-term plasticity from pre- and postsynaptic
spike observations alone. We extend a generalized linear model (GLM) that predicts
postsynaptic spiking as a function of the observed pre- and postsynaptic spikes and allow
the connection strength (coupling term in the GLM) to vary as a function of time based on
the history of presynaptic spikes. Our first model assumes that STP follows a TsodyksMarkram
description of vesicle depletion and recovery. In a second model, we introduce a
functional description of STP where we estimate the coupling term as a biophysically unrestrained
function of the presynaptic inter-spike intervals. To validate the models, we test the
accuracy of STP estimation using the spiking of pre- and postsynaptic neurons with known
synaptic dynamics. We first test our models using the responses of layer 2/3 pyramidal neurons
to simulated presynaptic input with different types of STP, and then use simulated
spike trains to examine the effects of spike-frequency adaptation, stochastic vesicle release,
spike sorting errors, and common input. We find that, using only spike observations, both
model-based methods can accurately reconstruct the time-varying synaptic weights of presynaptic
inputs for different types of STP. Our models also capture the differences in postsynaptic
spike responses to presynaptic spikes following short vs long inter-spike intervals,
similar to results reported for thalamocortical connections. These models may thus be useful
tools for characterizing short-term plasticity from multi-electrode spike recordings in vivo.






