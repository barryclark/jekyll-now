---
layout: post
title: Hackathon - Ready Reviews
---
In March 2018 I took part in HackTheHub, a Belfast based hackathon. In a team of three known as the *Deep Ducks* we developed an app, Ready Reviews, which processes customer reviews as they are being typed and detects shipping and customer service issues on the spot so that the user can be directed to the correct place to resolve their issue.

We were provided with a dataset containing product review text and the moderated action taken on each review. We created a model for each possible moderation action for reviews. For each model we converted the dataset to a bag of words and used a LinearSVM to train the dataset. In the demo as reviews are typed, they are passed to the back end which used the created models to detect if the customer was potentially having an issue.

![_config.yml]({{ site.baseurl }}/images/ready-reviews.gif)

Read the SyncNI write up <a href="https://syncni.com/news/718/9920/hackthehub-sees-huge-success-at-their-annual-hackathon/tab/1356" target="_blank">here</a>.