---
layout: post
title: Predictive Coding of Dynamical Variables in Balanced Spiking Networks (2013)
category: journalclub
olddate: October 29th, 2018
---

* Martin Boerlin, Christian K. Machens, Sophie Denève. Predictive Coding of Dynamical Variables in Balanced Spiking Networks, PLOS. (2013)
[(PLOS)](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1003258)
[(local cache)]({{site.url}}/journalclub/JCpapers/Boerlin_Predictive_Spiking.pdf)

#### Abstract
Two observations about the cortex have puzzled neuroscientists for a long time. First, neural responses are highly variable. Second, the level of excitation and inhibition received by each neuron is tightly balanced at all times. Here, we demonstrate that both properties are necessary consequences of neural networks that represent information efficiently in their spikes. We illustrate this insight with spiking networks that represent dynamical variables. Our approach is based on two assumptions: We assume that information about dynamical variables can be read out linearly from neural spike trains, and we assume that neurons only fire a spike if that improves the representation of the dynamical variables. Based on these assumptions, we derive a network of leaky integrate-and-fire neurons that is able to implement arbitrary linear dynamical systems. We show that the membrane voltage of the neurons is equivalent to a prediction error about a common population-level signal. Among other things, our approach allows us to construct an integrator network of spiking neurons that is robust against many perturbations. Most importantly, neural variability in our networks cannot be equated to noise. Despite exhibiting the same single unit properties as widely used population code models (e.g. tuning curves, Poisson distributed spike trains), balanced networks are orders of magnitudes more reliable. Our approach suggests that spikes do matter when considering how the brain computes, and that the reliability of cortical representations could have been strongly underestimated.