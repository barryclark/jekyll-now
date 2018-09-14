---
layout: post
title: Statistical Rethinking [text-book review]
---

![statistical-rethinking-cover](https://images.tandf.co.uk/common/jackets/amazon/978148225/9781482253443.jpg)

After reading the excellent reviews in Amazon, I decided to give it a go to the text-book [Statistical Rethinking](https://xcelab.net/rm/statistical-rethinking/) by Richard McElreath. Long story short, I can't praise enough the author for this great book that I wish I have discovered long time ago, when I first started doing Bayesian data analysis.

The target reader for the book is a data analyst or data scientist with only a basic understanding on Bayesian inference. The author does a wonderful job of making sure to guide the reader from very simple concepts up to some intermediate level modeling techniques, like Multilevel Modeling. I've particularly appreciated the presence of plenty of excercises and the optional paragraphs where more advanced concepts are described ― without getting in the way of less experienced readers that want to get as much as possible from their first read of the material.

The book also contains lots of examples, using R and a companion open-source library named after the book. Even though I prefer much more the Python scientific eco-system for doing Data Science, and I haven't touched R for quite a few years now, following the examples is very easy. The author also encapsuled all of the Stan models into it's own wrapper library. I personally would have appreciated to see more Stan code, which I find quite easily interpretable, and would be anyway the language of choice for many readers after completing this book. Nonetheless, the companion library seems to be very compelling and will centainly bring you through all the examples in the book without much effort. For more advanced models though, Stan offers more flexibility.

Regarding the content, I particularly appreciated the chapters about Information Theory and Multilevel models. These are probably the most advanced ones, but they are easy to follow and quite engaging also for more experienced users.

Throughout the entire book, McElreath reiterate the importance of using counterfactual plots to understand the absolute effect of a feature on the target variable, and WAIC to compare alternative models. This is something I've particularly appreciated and I believe it should be promoted more often. I wish these kind of advices were given to me when I started my journey into Bayesian inference.

To summarize, Statistical Rethinking is a very enjoyable book, packed with important lessons for both beginner and intermediate practitioners who want to better understand how to do proper Bayesian data analysis.
