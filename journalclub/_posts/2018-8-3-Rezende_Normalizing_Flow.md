---
layout: post
title: Variational Inference With Normalizing Flow (2016)
category: journalclub
olddate: August 7th, 2018
---

* [Paper]({{site.url}}/journalclub/JCpapers/Rezende_Normalizing_Flow.pdf) Danilo Jimenez Rezende, Shakir Mohamed. Variational Inference With Normalizing Flow, arXiv. (2016)
* Abstract

The choice of approximate posterior distribution
is one of the core problems in variational inference.
Most applications of variational inference
employ simple families of posterior approximations
in order to allow for efficient inference, focusing
on mean-field or other simple structured
approximations. This restriction has a significant
impact on the quality of inferences made
using variational methods. We introduce a new
approach for specifying flexible, arbitrarily complex
and scalable approximate posterior distributions.
Our approximations are distributions constructed
through a normalizing flow, whereby a
simple initial density is transformed into a more
complex one by applying a sequence of invertible
transformations until a desired level of complexity
is attained. We use this view of normalizing
flows to develop categories of finite and infinitesimal
flows and provide a unified view of approaches
for constructing rich posterior approximations.
We demonstrate that the theoretical advantages
of having posteriors that better match
the true posterior, combined with the scalability
of amortized variational approaches, provides a
clear improvement in performance and applicability
of variational inference.