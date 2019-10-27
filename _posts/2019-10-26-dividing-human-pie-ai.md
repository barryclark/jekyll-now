---
layout: post
title: Dividing a human pie with machine learning
author: chris_empson
---

![Immersion day participants get to grips with AWS machine learning services ]({{ "/images/2019-10-26-immersion-day.png"}})

Virtually every organisation that we meet is trying to figure out how to use machine learning and artificial intelligence. So much hype and expectation has evolved around these exciting technologies that it can be hard to cut through the noise and understand what they are, how they really work, and when they should be used.

To help organisations to address these questions Infinity Works recently started to run machine learning immersion days in association with [Amazon Web Services](https://aws.amazon.com/). 

We invite developers, engineering managers and business leaders who are interested in using AI to a day of talks and hands-on workshops. We provide them with a holistic view of the software delivery lifecycle for machine learning, and how to build and deploy machine learning algorithms in the AWS cloud.

AWS provides some great example exercises that demonstrate the capabilities of [Amazon SageMaker](https://aws.amazon.com/sagemaker/), [Amazon Lex](https://aws.amazon.com/lex/), [Amazon Personalize](https://aws.amazon.com/personalize/) and [Amazon Forecast](https://aws.amazon.com/forecast/). In the afternoon session participants worked through a choice of these exercises at their own pace while a colleague and I offered help and explanation if they got stuck.

Feedback from a recent event indicated that participants would've liked more guidance in the hands-on session. We're always keen to try new things, figure out what works and what doesn't, fix things quickly and continuously improve. However, opinions were split on how to improve the experience for participants.

* Some participants would have preferred more explanation of how the AWS cloud works, and that they'd have appreciated working more slowly when configuring the infrastructure.

* Some developers felt that we'd discussed the data science aspects too briefly, so they didn't have time to pick up any new knowledge in that area.

* Another respondent said that the machine learning content could have been more challenging, because we'd focused on the basics.

## How to divide a human pie?
Dividing the participants into two groups would give the participants more contact time with the helpers. The helpers would also have some data to help them to tailor their guidance to address their group's knowledge gaps. Asking for help always feels easier in smaller groups, too. 

But given the participants' diversity of experience, how should we divide the groups to give everyone a better experience?

There were so many possible ways to divide our human pie that there was no clear answer. I needed some data!

During a morning break I asked all of the participants to rate themselves in terms of their machine learning knowledge, where on the developer - data scientist spectrum they identify themselves, and how much cloud experience they had, using a Google Form.

I fed the responses into a Python app that used the [_scikit-learn_](https://scikit-learn.org/) library's [_k_-means clustering algorithm](https://scikit-learn.org/stable/modules/clustering.html#k-means) to assign the responses into two groups. 

_k_-means is a relatively simple unsupervised learning algorithm that can be used to group similar data points together. 

It starts by randomly choosing locations for _k_ cluster centroids, where _k_ is the desired number of groups. The distances to the data points are then calculated, and data points are each assigned to their nearest centroid. The algorithm then moves each centroid to reduce the sum of the distances between the data points and their respective centroids.

The process is then repeated until no data points change centroids. At this point the algorithm is said to have 'converged' on a solution.

This process is repeated a number of times with different initial centroid locations to try and ensure a robust solution. It isn't guaranteed to be the optimum solution, but in this case any reasonably good solution would be acceptable. 

## Mmm delicious pie
The _k_-means algorithm conveniently divided the participants into data scientists and developers. This was a gratifyingly simple solution, and it worked really well in practice. 

My biggest concern was the group sizes would be dramatically unbalanced. Ideally I wanted them to be similarly sized, but the _k_-means clustering algorithm doesn't guarantee this. As luck would have it the algorithm split the participants into 11 data scientists and 14 developers, which was close enough. In the 3D visualisation below the points in red represent the data scientists, and the green points represent the developers.

![A 3D visualisation of our response data]({{ "/images/2019-10-26-3d-visualisation.png"}})

The group of developers first learned about Amazon SageMaker and then went on to build a chatbot in Amazon Lex. The data scientists decided that instead of following the Lex demo they'd rather get stuck into the time series forecasting and product recommendation demos. These required a bit more data science understanding and were more relevant to the projects that they were working on.

Taking this data-driven approach significantly improved the hands-on session. Participants had a fairer share of the helpers' time. Everyone seemed to learn a lot from the exercises, and the groups had some really interesting conversations about the machine learning challenges that they were facing.

This is a neat demonstration that relatively simple machine learning methods can produce useful results. If you need to group similar things why not give this simple machine learning approach a try? 

## A little digestif
The Python code for clustering the groups is available on GitHub. Feel free to adapt the code to divide your own human pies!
* [Visualisation and clustering code](https://github.com/mcmont/mldemos/tree/master/human-pie-divider)
