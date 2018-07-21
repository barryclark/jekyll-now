---
layout: post
title: Computational Optimal Transport (2018)
category: journalclub
olddate: July 24th, 2018
---

* [Paper]({{site.url}}/journalclub/JCpapers/Peyre_Optimal_Transport.pdf) Gabriel Peyre, Marco Cuturi. Computational Optimal Transport, arXiv. (2018)
* Abstract

Optimal Transport (OT) is a mathematical gem at the interface between probability,
analysis and optimization. The goal of that theory is to define geometric tools that
are useful to compare probability distributions. Let us briefly sketch some key ideas
using a vocabulary that was first introduced by Monge two centuries ago: a probability
distribution can be thought of as a pile of sand. Peaks indicate where likely observations
are to appear. Given a pair of probability distributions—two different piles of sand—
there are, in general, multiple ways to morph, transport or reshape the first pile so that
it matches the second. To every such transport we associate an a “global” cost, using
the “local” consideration of how much it costs to move a single grain of sand from one
location to another. The goal of optimal transport is to find the least costly transport,
and use it to derive an entire geometric toolbox for probability distributions.
Despite this relatively abstract description, optimal transport theory answers many
basic questions related to the way our economy works: In the “mines and factories”
problem, the sand is distributed across an entire country, each grain of sand represents
a unit of a useful raw resource; the target pile indicates where those resources are
needed, typically in factories, where they are meant to be processed. In that scenario,
one seeks the least costly way to move all these resources, knowing the entire logistic
cost matrix needed to ship resources from any storage point to any factory.
Transporting optimally two abstract distributions is also extremely relevant for
mathematicians, in the sense that it defines a rich geometric structure on the space of
probability distributions. That structure is canonical in the sense that it borrows, in
arguably the most natural way, key geometric properties of the underlying “ground”
space on which these distributions are defined. For instance, when the underlying space
is Euclidean, key concepts such as interpolation, barycenters, convexity or gradients of
functions extend very naturally to distributions when endowed with an optimal transport
geometry. OT has a rich and varied history. Earlier contributions originated from
Monge’s work in the 18th century, to be later rediscovered under a different formalism
by Tolstoi in the 1920’s, Kantorovich, Hitchcock and Koopmans in the 1940’s. The
problem was solved numerically by Dantzig in 1949 and others in the 1950’s within the
framework of linear programming, paving the way for major industrial applications in
the second half of the 20th century. OT was later rediscovered under a different light
by analysts in the 90’s, following important work by Brenier and others, as well as in
the computer vision/graphics fields under the name of earth mover’s distances. Recent
years have witnessed yet another revolution in the spread of OT, thanks to the emergence
of approximate solvers that can scale to sizes and dimensions that are relevant
to data sciences. Thanks to this newfound scalability, OT is being increasingly used to
unlock various problems in imaging sciences (such as color or texture processing), computer
vision and graphics (for shape manipulation) or machine learning (for regression,
classification and density fitting). This paper reviews OT with a bias toward numerical
methods and their applications in data sciences, and sheds lights on the theoretical
properties of OT that make it particularly useful for some of these applications. Our
focus is on the recent wave of efficient algorithms that have helped translate attractive
theoretical properties onto elegant and scalable tools for a wide variety of applications.
We also give a prominent place to the many generalizations of OT that have been proposed
in but a few years, and connect them with related approaches originating from
statistical inference, kernel methods and information theory. A companion website 
provides bibliographical and numerical resources, and in particular gives access to all
the open source software needed to reproduce the figures of this article.