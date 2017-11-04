---
layout: post
title: Paper Reading Group - A Few Useful Things to Know about Machine Learning
mathjax: True
---

Today, we read a paper that presents a higher level overview of machine learning, the core of the learning problem and makes it difficult, and many valuable insights relating to a model's ability to generalize and how to prevent overfitting. We thought this paper was valuable because while it did not discuss in detail specific machine learning algorithms or rigorous optimization and probabilility theory, it reminded us of the core problems all of us are trying to solve using machine learning.

Link to slides: https://docs.google.com/presentation/d/1I2B0TLEWjffEXZva6OEw1mfU4FWZ5vSjBnfxFXmXl6g/edit?usp=sharing

Link to paper: https://homes.cs.washington.edu/~pedrod/papers/cacm12.pdf

After reading this paper, we discussed the following questions:
1) What types of problems can't be solved with manually programming rules, and instead require large amounts of data? 
2) The paper discussed choosing a representation for a learner being equivalent to choosing a specific function within a hypothesis space - give a concrete example of such a hypothesis space. 
3) How do evaluation/objective functions and optimization relate to each other? 
4) If a model gets 100% accuracy on a training dataset, would you release it to production? Why or why not? What would you to to mitigate your concerns? 
5) You've trained a model but you've discvered it has high bias and low variance. What does this mean, and how can you go about fixing this? 
6) You've trained a model and determined it suffers from high variance but has low bias. What are some things we can look into for fixing this issue? 
7) Which model would have higher variance and lower bias: a model selected from a rich hypothesis space with no constraints, or a model select from a small, constrained hypothesis space? 
7) Explain why overfitting generally corresponds to lower bias and higher variance. 
8) Why might we prefer an ensemble of decision trees as our machine learning model as opposed to a single decision tree? 



