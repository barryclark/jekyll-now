---
layout: post
title: "Naive Bayes: The Baseline for Text Classification"
date: 2018-04-22
author: Dorian 
categories: [Javascript]
picture: tmp 
published: false
excerpt: Bladiebla
---

## What can this be used for

## Problem definition

> TODO: Make this section less mathy, and require less decyphering to understand. Maybe with picture?

So what do we mean when we say we want to classify documents, in precise terms? Ideally we want to formulate the problem in mathematical terms, since we're going to be solving it with math. Having such a precise formulation also helps us check if the tools available help us solve the problem at hand (eg. assigning pre-defined categories to news title). It can also help us spot ambiguities or missing information important to solving the problem. An article having two titles might be an issue, and we can spot this more easily if we are aware of the formal definition.

So lets get down to the actual definition, where we consider single-label classification. We define the following objects for our problem:

* We have a domain of documents we call $D$.
* Each document $d_i$ is defined as $\\{w_{i_1}, w_{i_2}, \cdots, w_{K_i}\\}$, where $w_{i_j}$ is a word in document $d_i$.
* We have a pre-defined set of categories $C = \\{ c_1, \cdots, c_K \\}$.
* For every $d \in D$ we have a tuple $(d,c_{true}) \in C \times D$, where $c_{true}$ is the document's true class. 

The problem at hand is trying to find a function $f: D \rightarrow C$ which best approximates the true class/document pair $(d,c_{true})$. What "best approximation" means, depends on which statistical error or metrics you want to use.

## Creating features from our documents

In order to properly discuss the math behind the Naive Bayes approach, we first need to translate each document into a feature vector. We will do this using a [Bag-of-words model](https://en.wikipedia.org/wiki/Bag-of-words_model?oldformat=true), which are a popular starting point for document classification methods. It's killer feature is that it gives each document a feature vector of the same length, even though documents might have different numbers of words in them. This is important if we want to train a single classifier on all these documents.

We start by creating a vocabulary $V = \\{w_1, w_2,\cdots, w_K\\}$, which the full set of words from all documents exactly once.

## Theory behind Naive Bayes

## Implementation in Python

## Classifying news title and metrics


