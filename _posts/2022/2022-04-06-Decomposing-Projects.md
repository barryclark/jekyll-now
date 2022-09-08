---
title: Decomposing Projects
layout: post
---

In [Software Estimation without Guessing](https://www.amazon.com/dp/B084SW6HYJ/ref=cm_sw_r_tw_dp_S5Z6W9TMRBPG5HA5GMA9), George Dinwiddie outlines three different ways to break down a project to estimate it:

## Decomposition by phase: Analysis, Design, Development, Testing, and Deployment

Estimating by phase is the most dangerous method and not-surprisingly maps almost directly to the Waterfall method. Almost every phase creates written documents, which means their actual time neatly matches the estimate one-to-one because you just stop when the time runs out. The Development phase, however - based on the previous phases - won't fall nicely into the same estimates. Code is not a document and some parts are more difficult to develop than others. Finally, the testing phase - which must make up for all the mistakes in the previous phases - is left until last. Projects frequently die late because the testing phase can't make up for earlier mistakes.

## Decomposition by implementation: Front-end, middleware, back-end; or Ordering, Billing, Shipping

Breaking a system down into its component parts - whether the logical layers like front-end and back-end or business systems like quoting and invoicing has its advantages. You can assign estimates to technical experts who have a good understanding of what needs to be done. Unfortunately, it's in the integration testing where the hidden scope creep hides. Rework during integration can be high and getting to "done" can be difficult.

## Decomposition by functionality: A scenario across any or all components of the system

Agile development processes are designed to break projects down by functionality. User stories describe goals for one small slice of the system. When the acceptance criteria are met, the system is functional. The only obstacle here is whether or not the list of user stories was complete.
