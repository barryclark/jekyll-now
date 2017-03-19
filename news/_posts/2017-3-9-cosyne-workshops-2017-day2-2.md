---
layout: post
title: COSYNE Workshops, Day 2, part 2
category: news
---
Workshop Speakers:
- *Chris Harvey*
- *Xaq Pitkow*
- *Maneesh Sahani*

----

(Written by David Hocker)

----

I returned to the afternoon session to see *Chris Harvey* talk about some of his group’s single track perceptual decision-making tasks in mice. This was exciting, since we have read two of his papers in journal club this semester alone. This talk focused on the nature of population-level sensorimotor representations, and whether or not they change over time. The study focused on representations in PPC for a color track task, where mice had to choose one arm of a T-maze depending upon which color the walls of the single track portion were in the maze.

<p style = "text-align: center;"> 
<img src="/images/tmaze.png" width="200">
</p>
(Mice choose which arm of the maze to take in order to get a reward. Taken from one of Chris' [related papers](http://www.nature.com/neuro/journal/v19/n12/full/nn.4403.html) where there were cues along the linear part of the maze. But in the workshop work there was only one color cue in the linear arm of the maze.)

 PPC was justified as a good place to perform these recordings, as it connected to many regions in the brain, effectively acting as a “sensorimotor interface.” Chris’ group found that neural decoders built from the population of two-photon calcium signals drifted significantly from day to day, and by a month after the initial recording that the decoder had pretty poor performance. As a contrasting decoder, Chris also built a GLM based upon behavioral parameters to decode the choice of the mouse, and examined how stable each behavioral covariate was over the course of days. He found an interesting inverse relationship between stability and predictive power, where less stable features such as trial type (the color presented) and position of the mouse were weighted more highly in the GLM, and tended to be better predictors of the overall choice. In a related result, the most stable behavioral feature of the decoder was the position of the mouse at the very beginning of the maze. I guess one interpretation is that since it doesn’t encode much information about the eventual choice that it doesn’t need to be updated much to achieve better performance. Chris also finished up with some discussion of timed PPC inactivation trials where PPC is inactivated at specific points in the maze (the different numbered positions in the figure above), and showed that PPC only appears necessary in the first half of the T maze, but not in the second half.
 
 ---

I wanted to stick around for Karel Svoboda’s talk, but I made the mistake of moving away from the wall in a very full room, and got squeezed out. There wasn't even room to sit on the floor! So ask a more tenacious neuroscientist what happened there. Instead, I killed a bit of time until *Xaq Pitkow*’s talk about understanding inference in graphical models as performed by message passing algorithms. It was heavy and technical. I think you’ll need to talk to a smart person to get a brief on this one, or read their [arXiv paper](https://arxiv.org/pdf/1605.06544.pdf). From what I could tease out, they found out a way to use tree-based reparametrization techniques, a way of simplifying inference of graphical models that are acyclic, for graphical models that have some cyclical structure. 

<p style = "text-align: center;"> <img src="/images/pitkow_network.png" width="400"> </p>
(Figure from Xaq's [paper](https://arxiv.org/pdf/1605.06544.pdf) describing a nonlinear recurrent network structure that can perform message passing. )


---

My last talk of the conference was a surprising little reminder of my own thesis work in quantum control, dealing with the robustness of a system to changing under a certain type of control signal. The work presented here by *Maneesh Sahani* resolved a standing and rather confusing result in optogenetic stimulation of motor cortex in monkeys. Namely, that it doesn’t  have any effect on behavior at all! The main solution was to consider models that could contain a latent variable structure with a “nullspace”  in which the optogenetic stimulation lives. In order to arrive at this kind of latent structure, Maneesh's group explicitly included some terms in their loss function that would enforce some nullspace directions in the latent space.

----

