---
layout: culture
title: A song of entropy and toil
---

## Prologue - or what is entropy?
An unofficial appendix of the main laws of thermodynamics reads: `Thou shalt not make unto thee any image of entropy`. We are now going to violate this principle - what is entropy? 

Entropy is primarily a made-up word and comes from the ancient Greek ἐντροπία entropía. This can be roughly translated as "in turn". Entropy describes a fundamental thermodynamic state and is described by the second law of thermodynamics: 

> The total entropy in an isolated system can never become smaller, i.e. it can only become larger or remain the same. A system can no longer change when the entropy has reached its maximum value, the system is then in equilibrium.

Mathematically, this can be described as a rule of thumb by `S = Q/T` - where Q represents the amount of heat in a reversible process and T stands for the temperature. In concrete terms, the formula can therefore be translated as "entropy is the amount of heat that is released to the environment as temperature".

<br><br>
<p align="centre">
<img width=600 src="/images/entropy-and-toil.png">
</p>

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Aha! There is no Agile Transformation. It is just a constant fight against entropy that keeps organizations away from functioning optimal. And a mean to do that most efficiently is the Improvement Kata. <a href="https://twitter.com/RealMikeRother?ref_src=twsrc%5Etfw">@RealMikeRother</a> <a href="https://twitter.com/jonsmart?ref_src=twsrc%5Etfw">@jonsmart</a></p>&mdash; Lars (@bob5ec) <a href="https://twitter.com/bob5ec/status/1537897257613217793?ref_src=twsrc%5Etfw">June 17, 2022</a></blockquote> 


Based on this thesis, an organization can be viewed as an isolated system. The system as such is slowed down by various factors like: 
* Constant change (everyone wants change - but no one wants to change themselves).
* Communication - the more interdependencies there are between the components, the more sluggish the system becomes (boards, committees, inter-team and intra-team communication, ...)
* Process jungle and rigid traditions
* History - from legacy system to historical roles and artifacts 
* much more ...

However, most of the points that affect the entropy of the system here have a different cause. Google expresses this on their SRE (Site Reliability Engineering) website) by the term toil:

> "So what is toil? Toil is the kind of work tied to running a production service that tends to be manual, repetitive, automatable, tactical, devoid of enduring value, and that scales linearly as a service grows. Not every task deemed toil has all these attributes, but the more closely work matches one or more of the following descriptions, the more likely it is to be toil:"
- [Google](https://landing.google.com/sre/sre-book/chapters/eliminating-toil/)

Automation is the antidote to toil - automating low-value work leaves more time for higher-value work. Automation should also improve repeatability and reliability by automating all tasks. When the same tasks are done the same way every time, there are no more surprises. Manual tasks, on the other hand, lead to a high degree of variation and thus a lack of repeatability.

## DevOps culture as the answer 

<p align="centre">
<img width=600 src="https://user-images.githubusercontent.com/8672357/175659600-b6771a3f-76ea-4baa-9718-e5a9175e79c8.png">
</p>

John Willis and Damon Edwards developed the acronym [CAMS](https://itrevolution.com/devops-culture-part-1/) in 2010, where the `A` stands for automation and, as we have already learned, provides a good answer to Toil - but how do you defeat entropy? Jez Humble provides an idea with the extension of the acronym to [C.A.L.M.S](https://benjitrapp.github.io/cultures/2022-03-30-CALMS-devops/). What does the `L` mean? 

## `L` stands for Lean

Jez Humble's extension here adds another success factor to the fight against entropy. Lean consists of the [five key principles of Lean](https://theleanway.net/The-Five-Principles-of-Lean). The Lean IT movement seeks to extend these concepts to the world of software development. The most important texts are [Lean Software Development by Tom & Mary Poppendieck](h[ttps://www.amazon.co.uk/Lean-Software-Development-Agile-Toolkit/dp/0321150783](https://www.oreilly.com/library/view/lean-software-development/0321150783/)) and [Lean Enterprise by Humble, Molesky and O'Reilly](https://www.oreilly.com/library/view/lean-enterprise/9781491946527/). Lean aims at FLOW - the smooth transition of work from one "work centre" to the next in the shortest possible time. Ideally with as few queues/buffers as possible - most of the organizations fail here. 
