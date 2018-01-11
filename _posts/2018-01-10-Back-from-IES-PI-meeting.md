---
layout: post
title: "Back from the IES PI meeting"
date: January 10, 2018
tags: [single-case-research, hypothesis-testing]
permalink: Back-from-IES-PI-meeting
---

I'm just back from the Institute of Education Sciences' Principle Investigators conference in Washington D.C. It was an envigorating trip for me, and not only because of the opportunity to catch up with colleagues and friends from across the country. A running theme across several of the keynote addresses was the importance of increasing the transparency and replicability of education research, and it was exciting to hear about promising reforms underway and to talk about how to change the norms of our discipline(s). 

I contributed to the conference in two ways. First, I gave a presentation on incorporating randomization and randomization inference into single-case designs, as part of a session on innovations in single-case research methods organized by Dr. Wendy Machalicek. You can a static version of [my slides here]({{ site.url}}/files/Randomization-inference-for-SCED-2018-01-10.pdf); unfortunately the animations don't work in pdf. 

Second, I brought [a poster]({{ site.url}}/files/Gradual-effects-model-poster-IES-2018-01-10.pdf) presenting some work from my IES-funded methods grant. Thanks very much to the folks who stopped by to talk during the poster session! Y'all gave me some very helpful feedback about technical aspects of the work and about how to better contextualize it for single case researchers. 

If you didn't make it: this project was joint work with Danny Swan, a doctoral student in our Quantitative Methods program. It involved developing a model for estimating effect sizes from single-case designs where the effects of the intervention take time to reach full potency. Rather than assuming that the intervention produces immediate shifts in the level of the outcome, we model the effects using an impulse response function (cribbed from [an old paper by Box and Tiao](http://www.jstor.org/stable/2285379)) that leads to non-linear trends in response to the introduction of the intervention. Using an impulse response function also makes it possible to model more complex design patterns, like treatment reversal designs with returns-to-baseline and treatment re-introduction phases, in a very parsimonious way. Check out [the full paper](https://osf.io/gaxrv/), the [accompanying R package](https://github.com/jepusto/SingleCaseES), and Danny's [interactive web-app](https://jepusto.shinyapps.io/gem-scd/).
