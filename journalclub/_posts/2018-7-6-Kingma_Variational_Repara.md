---
layout: post
title: Auto-Encoding Variational Bayes (2014)
category: journalclub
olddate: July 10th, 2018
---

* [Paper]({{site.url}}/journalclub/JCpapers/Kingma_Variational_Repara.pdf) Diederik P Kingam, Max Welling. Auto-Encoding Variational Bayes, arXiv. (2014)
* Abstract

How can we perform efficient inference and learning in directed probabilistic
models, in the presence of continuous latent variables with intractable posterior
distributions, and large datasets? We introduce a stochastic variational inference
and learning algorithm that scales to large datasets and, under some mild differentiability
conditions, even works in the intractable case. Our contributions is
two-fold. First, we show that a reparameterization of the variational lower bound
yields a lower bound estimator that can be straightforwardly optimized using standard
stochastic gradient methods. Second, we show that for i.i.d. datasets with
continuous latent variables per datapoint, posterior inference can be made especially
efficient by fitting an approximate inference model (also called a recognition
model) to the intractable posterior using the proposed lower bound estimator.
Theoretical advantages are reflected in experimental results.