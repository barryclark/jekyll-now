---
layout: post
title: Lexoffice first contact with machine learning
subtitle: The journey to AI automagic - part 1
category: dev
tags: [data, culture, development, team]
author: Carina Kaltenbach
editor_email: carina.kaltenbach@haufe-lexware.net
header-img: "images/LexofficeML/DataFeed.jpg"
---

# First steps toward AI automagic - part 1

Machine Learning is an incredibly vast field, and getting into it might feel like an unmanageable task: apart from the know-how required, one also needs the right data, and, of course, an idea that has at least some kind of business value. At lexoffice, we came up with a concrete use case for machine learning in our application. A seemingly simple categorisation task. Given a voucher, pick the right bookkeeping category. Well, after all, not that simple. We have 140 different categories and even humans don’t get it right all the time. But, exactly the difficulty of the task defines its business value. Solving this would be of great help for our customers (and their tax advisors), so we decided to find out how far we could go.

## Building an ML team

We gathered five motivated devs with some background knowledge in machine learning, excited to learn more. Since this project is meant to be the first of many, we didn’t just want to have a solution, we wanted to acquire the skills we need to make machine learning work for lexoffice. To do this, we worked in a so-called experimental framework, two weeks in which we only focussed on this task and were able to experiment. Our main goal was to get an idea of the complexity of the task, and acquire hands-on experience in machine learning, not solving the task. Instead of pressuring ourselves into getting something “done”, we focussed on learning.

## Make sure your recommender eats the right data

One of the most painful lessons we learned is that the star in the show of machine learning isn’t the algorithm, it’s the data: if you don’t have the right data, you won’t be able to learn anything. This might be the one thing underestimated the most, and we underestimated it too. Instead of carefully investigating whether the data was what we needed, we did all the data analysis during our two week framework. But, once in the framework, we had no time to get better data. So, at the start of any ML project should be the data analysis. There’s a million questions you should ask yourself when you analyse your data, and that you should be able to answer before you actually start coding.

## Go slow, experiment, and talk - a lot

We also found that machine learning tasks are very different from the average engineering task. They are inherently unpredictable and there’s an infinite number of angles to approach a task. Starting a project like this, you should give yourself enough freedom to be spontaneous, to experiment and to dive in deeper whenever you feel intrigued by results or an experiment. You want to stay as flexible as possible, so don’t try and use unnecessary definitions or rigid frameworks. But, how do you not descend into chaos? We found that, as a team, we made good decisions when it came to allocating time and effort to tasks and the level of detail we wanted in our analysis. Of course, that meant a lot of discussions about every part of our work, and this might be very different to a standard engineering task or story. But, discussions are essential and you should engage in them.

## Avoid frustration by having a baseline

Machine Learning is inherently frustrating. Whatever you start, there’s always the chance it won’t work. If your data isn’t suitable, you won’t be able to learn anything useful from it. True data isn’t perfectly nice, it’s messy, and you’ll have to do a lot of preprocessing and feature engineering. But, even if your data is perfect, there’s a million ways you can mess up your results. You might get incredible scores, just to realize that your train-test-split wasn’t correct and your findings don’t extend to the complete dataset. This can be painful, so be careful and analyse your results well to find any mistakes. It might also be helpful to define a baseline, whether that is how well an already implemented heuristic scores, or maybe how well your customers solve the task. Having something to compare to will put your own scores in perspective.

## For this iteration, learning was the pot of gold at the end of the rainbow

But, machine learning isn’t just painful and tedious. It’s also fun and rewarding, and you get to learn so many things while doing it. In our case, we obviously learned a ton of things about how to work on these projects together with some useful skills for Python and the frameworks we used. We also found that our data isn’t what we need and we are trying to implement changes in our application to improve the data we collect. We’ve even learned a lot of things about our customers, relevant for anyone in the lexoffice team. Even though (or maybe because) we did not build a well-performing model, we are now even more motivated to keep working on this task, apply our gained knowledge and maybe start the next machine learning project soon.

Photo: "Gassing up the Ford" | Starman series | https://bit.ly/2p2kjQb | CC BY 2.0
