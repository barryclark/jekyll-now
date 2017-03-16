---
layout: post
title: COSYNE Workshops, Day 2
category: news
---
Workshop Speakers:
- *Gordon Berman*
- *Adam Calhoun*
- *Mark Schnitzer*

----
(Written by David Hocker)

Before the first day of COSYNE workshops we arrived with an ominous “There’s a huge snowstorm coming tomorrow. HUGE!” which didn’t fail to deliver:

<p style = "text-align: center;"> 
<img src="/images/snowbird.JPG" width="400">
</p>
<p style = "text-align: center;"> 
The view from our hotel room on the first night 
</p>

<p style = "text-align: center;"> 
<img src="/images/snowtree.jpg" width="400">
</p>
<p style = "text-align: center;"> 
and the aftermath of the storm
</p>


So with the prophecy of the storm now validated, and the recent news of my friend ripping his tendons from his kneecap while skiing, I used these as universal signs to stay indoors that day and celebrate warmth. And kneecaps. That means I’ll be giving you a rundown of the talks I checked out during the workshops.

----
Unfortunately I missed *Yoshua Bengio*’s main meeting talk, so I tried to make up for it by attending his workshop talk. I’m admittedly pretty unfamiliar with the particulars of using deep networks, so I felt a bit out of my comfort zone in the deep learning section. And it showed, since looking back at my notes gives me almost zero feel for what he was discussing. From what I can tease out,  Benjio was discussing some updates on the issues involved with deep learning implementation in the context of building a network to solve the credit assignment problem (deciding the relative pros and cons of making a choice by assigning them some sort of value, usually in terms of how much reward will be gained vs. how risky that decision is). It seemed like the talk focused locating the stationary distributions of the network by using perturbations to the network near optimality to arrive at an easier approximation to the gradient. 
Some refs [here](https://arxiv.org/abs/1206.5538), and also a mentioned high-level take on the relationship between theory and biology [here](https://arxiv.org/abs/1512.08954)
---

After feeling properly stupid in Bengio’s talk, I went back to learning about monkeys in virtual reality. *Mark Churchland* showed some really cool analysis on population codes in motor cortex while a monkey was operating a crank arm to move through a VR environment. Mark really stressed the importance of a new movement task outside of coordinated reaches, since the extended reach has dominated so much of the movement research field, and might be solidifying a false perspective of what is typical to observe in motor cortex. In this work, the monkey was taught to crank the arm either forward or backward depending upon a visual cue, and had to turn the crank a few times in order to arrive at the juice reward zone. All the while, Mark was recording a population of neurons in motor cortex, as well as EMG recordings of muscles in the monkey’s bicep. The crux of the analysis was to do dimensionality reduction on the population of recorded spikes (and similarly for the muscle recordings), and see how the dynamics moved in the top few dimensions of this latent space. The dynamics of the top two latent neural and muscle dimensions were circular, but the muscle recordings had a particular structure that did not reflect that of a dynamical system: There was a lot of “tangling” of the trajectories in state space, where the trajectories kept crossing over each other but heading in opposite directions (think of figure eight shapes). Mark used a measure of tangling to determine how "muscle-like" vs. "neuron-like" the dynamics looked. In building their model of the population dynamics, Mark's group added this tangling measure to the inference cost in order to try and nudge the dynamics to look like the ones seen in experiment, meaning that the neural dynamics were less tangled up. Some other initial results in investigating the tangling of dimensions seen in real data showed that while motor cortex neural dynamics weren’t very tangled, somatosensory cortex recordings appear to be quite tangled. This work seems pretty early-on in its analysis, but it was really cool to see a qualitatively distinct feature in the latent-space dynamics, and I’m excited to see how the idea develops.

---

Next I caught Ila Fiete’s talk that extended upon one of her group’s posters from the main meeting (given by Rishidev Chaudhuri). It was about an unsupervised learning method to decode the latent space structure of head position in both awake and sleep states. The intent of the method was decode the head position of a mouse, which they performed in an automated fashion by building a decoder based upon nonlinear dimensionality reduction and spline fitting to find a decoding manifold. Then, data points in latent space could be decoded by projecting down onto the low-dimensional manifold given the parametrized spline, in this case a 1D curve that decodes the head direction of the mouse. The primary results investigated some of the interval statistics and structure of this decoding manifold in three different scenarios: i) in awake, behaving mice, ii) in mice during REM sleep, and iii) in mice during non-REM sleep. It seems that awake and REM mice share a lot of structure to their decoding manifold, but there are some differences the statistics of head position. Non-REM sleep, though, didn’t appear to have the same set of states that as the other two behavioral states, since their manifolds didn’t strongly overlap in latent space. The interesting thing that I’m still a bit puzzled by, and that I think will be a direction of future work for Ila and her group, is the transition pathway between different head positions. In behaving and REM mice the transitions were in some sense local, in that only nearby head positions were decoded as occurring in successive points in time. But non-REM sleep seems to have these nonlocal “jumps” in head position at nearby points in time. 

---

My last talk before the lunch break was a bit of a change-up, and I went to check out a talk on new models for the emotional enhancement of memory by Deborah Talmi. I unfortunately didn’t get a feel for a model quickly enough (COSYNE is quick. You have to think fast to capture the essence of a talk!). The talk was a model that extends upon some [previous work](http://www.sciencedirect.com/science/article/pii/S0028393216302226) on understanding the role of emotion in the list composition effect, an effect in this work where the free recall of emotional scenes was enhanced when both emotional and neutral images were presented together (a mixed list), but not when emotional or neutral images were presented separately. Dr. Talmi’s new model, the emotional maintenance and retrieval (EMR) model, appears related to several retrieved context models such as TCM and CMR, where memories become bound to an ever-changing context. I wish I had more to report on this, but by it not really being my field I was a bit lost. Still, keep an eye out for her model, because some the audience members were incredibly excited to see it in action. 

---
Mid-day activity break: snowshoeing with Yuan. I still managed to get sunburnt, under the cover of trees, with SPF 50 on… thats how pale I am
<p style = "text-align: center;"> 
and the aftermath of the storm
</p>


--- 

I returned to the afternoon session to see Chris Harvey talk about some of his group’s single track perceptual decision-making tasks in mice. This was exciting, since we have read two of his papers in journal club this semester alone. This talk focused on the nature of population-level sensorimotor representations, and whether or not they change over time. The study focused on representations in PPC for a color track task, where mice had to choose one arm of a T-maze depending upon which color the walls of the single track portion were in the maze.

(figure)
 PPC was justified as a good place to perform these recordings, as it connected to many regions in the brain, effectively acting as a “sensorimotor interface.” Chris’ group found that neural decoders built from the population of two-photon calcium signals drifted significantly from day to day, and by a month after the initial recording that the decoder had pretty poor performance. As a contrasting decoder, Chris also built a GLM based upon behavioral parameters to decode the choice of the mouse, and examined how stable each behavioral covariate was over the course of days. He found an interesting inverse relationship between stability and predictive power, where less stable features such as trial type (the color presented) and position of the mouse were weighted more highly in the GLM, and tended to be better predictors of the overall choose. In a somewhat related result that probably doesn’t sound that profound in hindsight, guess what the the most stable behavioral feature of the decoder was over time? The position of the mouse at the very beginning of the maze. I guess since it doesn’t encode much information about the eventual choice that it doesn’t need to be updated much to achieve better performance. Chris also finished up with some discussion of timed PPC inactivation trials where PPC is inactivated at specific points in the maze, and showed that PPC only appears necessary in the first half of the T maze, but not in the second half.

I wanted to stick around for Karel Svoboda’s talk, but I made the mistake of moving away from the wall in a very full room, and got squeezed out. So ask a more tenacious neuroscientist what happened there. Instead, I killed a bit of time until Xaq Pitkow’s talk about understanding inference in graphical models as performed by message passing algorithms. It was heavy and technical. I think you’ll need to talk to a smart person to get a brief on this one, or read their arXiv paper (https://arxiv.org/pdf/1605.06544.pdf). From what I could tease out, they found out a way to use tree-based reparametrization techniques, a way of simplifying inference of graphical models that are acyclic, for graphical models that have some cyclical structure. 

My last talk of the conference was a surprising little reminder of my own thesis work in quantum control, dealing with the robustness of a system to changing under a certain type of control signal. The work presented here by Mannish Sahani resolved a standing, and rather confusing result in optogenetic stimulation of motor cortex in monkeys. Namely, that it doesn’t  have any effect on behavior at all! 

(figure about optogenetic stimulation)

The main solution was to consider models that could contain a latent variable structure with a “nullspace”  in which the optogenetic stimulation lives. In order to arrive at this kind of latent structure, Mannish’s group explicitly included some terms in their loss function that would enforce some nullspace directions in the latent space

----

