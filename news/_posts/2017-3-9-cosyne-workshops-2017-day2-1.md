---
layout: post
title: COSYNE Workshops, Day 2 part 1
category: news
---
Workshop Speakers:
- *Yoshua Bengio*
- *Mark Churchland*
- *Ila Fiete*
- *Deborah Talmi*

----
(Written by David Hocker)


----
Unfortunately I missed *Yoshua Bengio*’s main meeting talk, so I tried to make up for it by attending his workshop talk. I’m admittedly pretty unfamiliar with the particulars of using deep networks, so I felt a bit out of my comfort zone in the deep learning section. And it showed, since looking back at my notes gives me almost zero feel for what he was discussing. From what I can tease out,  Benjio was discussing some updates on the issues involved with deep learning implementation in the context of building a network to solve the credit assignment problem (deciding the relative pros and cons of making a choice by assigning them some sort of value, usually in terms of how much reward will be gained vs. how risky that decision is). It seemed like the talk focused on locating the stationary distributions of the network by using perturbations to the network near optimality to arrive at an easier approximation to the gradient. 
Some refs [here](https://arxiv.org/abs/1206.5538), and he also a mentioned high-level take on the relationship between theory and biology [here](https://arxiv.org/abs/1512.08954).

---

After feeling properly stupid in Bengio’s talk, I went back to learning about monkeys in virtual reality. *Mark Churchland* showed some really cool analysis on population codes in motor cortex while a monkey was operating a crank arm to move through a VR environment. Mark really stressed the importance of a new movement task outside of coordinated reaches, since coordinated reaching has dominated so much of the movement research and might be solidifying a false perspective of what is typical to observe in motor cortex. The monkey was taught to crank the arm either forward or backward depending upon a visual cue, and had to turn the crank a few times in order to arrive at the juice reward zone. All the while, Mark's team was recording a population of neurons in motor cortex, as well as EMG recordings of muscles in the monkey’s bicep. The crux of the analysis was to do dimensionality reduction on the population of recorded spikes (and similarly for the muscle recordings), and see how the dynamics moved in the top few dimensions of this latent space. The dynamics of the top two latent neural and muscle dimensions were circular, but the muscle recordings had a particular structure that did not reflect that of a dynamical system: There was a lot of “tangling” of the trajectories in state space, where the trajectories kept crossing over each other but heading in opposite directions (think of figure eight shapes). Mark's group used a measure of tangling to determine how "muscle-like" vs. "neuron-like" the dynamics looked, which was helpful in training their model of the population dynamics: In order to try and nudge the dynamics to look like the ones seen in experiment, this tangling measure was incorporated into the inference so that the model neural dynamics were less tangled up. This work is pretty early-on in its analysis, but it was really cool to see a qualitatively distinct feature in the latent-space dynamics, and I’m excited to see how the idea develops.

---

Next I caught *Ila Fiete*’s talk that extended upon one of her group’s posters from the main meeting (given by Rishidev Chaudhuri). It was about an unsupervised learning method to decode the latent space structure of head position in both awake and sleep states. The intent of the method was decode the head position of a mouse, which they performed in an automated fashion by building a decoder based upon nonlinear dimensionality reduction and spline fitting to find a decoding manifold. Then, data points in latent space could be decoded by projecting down onto the low-dimensional manifold given the parametrized spline, in this case a 1D curve that decodes the head direction of the mouse. The primary results investigated some of the interval statistics and structure of this decoding manifold in three different scenarios: i) in awake, behaving mice, ii) in mice during REM sleep, and iii) in mice during non-REM sleep. It seems that awake and REM mice share a lot of structure to their decoding manifold, but there are some differences in the statistics of head position. Non-REM sleep, though, didn’t appear to have the same set of states as the other two behavioral states, since their manifolds didn’t strongly overlap in latent space. The interesting thing that I’m still a bit puzzled by, and that I think will be a direction of future work for Ila and her group, is the transition pathway between different head positions. In behaving and REM mice the transitions were in some sense local, in that only nearby head positions were decoded as occurring in successive points in time. But non-REM sleep seems to have these nonlocal “jumps” in head position at nearby points in time. 

---

My last talk before the lunch break was a bit of a change-up. I went to check out work on new models for the emotional enhancement of memory by *Deborah Talmi*. I unfortunately didn’t get a feel for the model quickly enough (COSYNE is quick. You have to think fast to capture the essence of a talk!). The talk was a model that extends upon some [previous work](http://www.sciencedirect.com/science/article/pii/S0028393216302226) on understanding the role of emotion in the list composition effect, an effect in this work where the free recall of emotional scenes was enhanced when both emotional and neutral images were presented together (a mixed list), but not when emotional or neutral images were presented separately (a pure list). Dr. Talmi’s new model, the emotional maintenance and retrieval (EMR) model, appears related to several retrieved context models such as TCM and CMR, where memories become bound to an ever-changing context. I wish I had more to report on this, but by it not really being my subfield I was a bit lost. Still, keep an eye out for her model, because some of the audience members were incredibly excited to see it in action. 

---
Mid-day activity break: snowshoeing with Yuan. I still managed to get sunburnt, under the cover of trees, with SPF 50 on... that's how pale I am...
<p style = "text-align: center;"> 
<img src="/images/yuan_david_snowshoe_compressed.jpg" width="400">
</p>
<p style = "text-align: center;"> 
<img src="/images/yuan_snowshoe_compressed.jpg" width="400">
</p>


--- 

