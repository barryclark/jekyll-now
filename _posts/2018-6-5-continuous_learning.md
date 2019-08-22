---
layout: post
title: Continuous Learning Feedback System
---



<p align="center">
  <img width="600" height="400" src="{{ site.baseurl }}/images/continuos_learning.png">
</p>

Designing and developing continuous learning search feedback system to train
neural networks from user feedback data. Two types of feedback are received
Explict and Implict feedback. Explict feedback consists of thumbs up and thumbs
down for snippet level data. The snippet level feedback is converted to document
level feedback using a scoring function. The implict feedback consits of user
click patterns. The feedback data is fetched from DB and based on the amount of
data received, model is either fine tuned or trained from scratch. The best
model is choosen based on Mean Average Precision (MAP). The DB is updated with
best model and metadata related to the model, best model is used by tensorflow
serving to perform inferencing.
