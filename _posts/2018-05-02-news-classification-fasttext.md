---
layout: post
title: A Walkthrough of the FastText algorithm
date: 2018-05-03
author: Dorian
categories: [Machine Learning, NLP]
picture: /assets/images/fasttext/title2.jpg
published: false
excerpt: Bladiebla
---

# Origin Story

If there's one thing facebook has a lot of (and isn't too careful with, according to [recent news](https://www.wikiwand.com/en/Facebook%E2%80%93Cambridge_Analytica_data_scandal)), it's text data. A large part of their business model is creating situations where it's users provide them with data, which they can then use to deliver incredibly target adds using the information you provided. In order to do this they need to be able to categorize a huge number of text fields shared each day. Recently Facebook published a fairly novel approach to this problem they named [FastText](https://fasttext.cc/). 

FastText classifies documents with comparable accuracy to much larger and slower CNN's, but can be trained and run in a much shorter time. As I am currently working on a project which uses this algorithm, I thought this would be a great excuse to share the things I've learned so far. 

It was surprisingly hard to piece together the algorithm from the many papers published on the algorithm ([1](https://arxiv.org/abs/1607.01759), [2](https://arxiv.org/abs/1607.04606), [3](https://arxiv.org/abs/1612.03651)), and I hope this will save from future implementers from frustration and headache.

# Classifying Text

So first off, what problem are we trying to solve in document classification?

# TODO: Figure out diagram drawing (inkscape) with Latex support

<figure style="text-align: center;">
    <img src="" style="width: 90%;">
    <figcaption> The stack is LIFO, so we need to reverse the text </figcaption>
</figure>

## TODO's

- Training of word vectors
  - Text preprocessing (creating phrases, filter out infrequent words)
  - Feature hashing
  - Skipgram and subword information
  - Negative subsampling
- Detailed classifier
  - How the wordvecs are used to construct document vectors
  - Bigrams as features
  - Out-of-sample words
  - Classifier architecture
  - Optimization function and training (hierarchical softmax vs others)
