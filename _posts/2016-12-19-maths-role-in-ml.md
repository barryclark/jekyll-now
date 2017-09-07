---
title: AIML is not mathematics
layout: post
published: true
---
In this post, I attempt to point out that AIML is not mathematics even if mathematics play an important role in AIML.   

**Target vs. tool**: AIML is target while mathematics is just a tool or a forma language to describe your models.   

I believe that one of the crutial and secret part of success for a career, particularly in AIML is that one should distinguish clearly between *target* and *tool*. *Target* is what you want to achieve or decode in your models (do not confuse the word *target* here with target function) and *tool* is what actually helps you realize your *target*.  They are both indispensable but your contributions are mostly from *target*, not *tool* even if you would see a larger portion of a typical academic paper dedicated to presenting *tool*.  

In particular for AIML, *tool* is *mathematics* and *programming* while *target* is priors which are reasonable behaviors that you force your model to owe. Since *programming* can be viewed as just a realization of *mathematics* which is in the lower level, I only focus on *mathematics* when refer to *tool* in this post. From my perspective at this moment, *mathematics* in AIML field (I am talking about mathematics in a particular field AIML, not in general) in its own right is meaningless until you use them to encode priors into your model. In another word, *mathematics* is not intelligent in its own right, it simply follows logical rules. It is an AIML reseacher's role to come up with reasonable and well-educated priors and make use of *mathematics* to force such priors into their model's behaviors ,hence, giving *mathematics* a meaning.  

**ML is not optimization**: The ultimate goal in optimization is to find optimum while that in ML is to minize generalization error. Optimum of cost function in ML do not neccessarily lead to optimal generalization error. In fact, it is very difficult to find the optimal solution in a hypothesis space in ML, instead we usually iteratively search for better solution until some good generalization error is met. 
