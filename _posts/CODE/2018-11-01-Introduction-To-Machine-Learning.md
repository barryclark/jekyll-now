---
layout: post
title: An Introduction to Machine Learning 
category: CODE
---

# Introduction

This section looks at the big picture of Machine Learning and is intended as a jumping off point for anyone new to the area. Additionally, I will aim to update this post with a list of resources.

# Definition

The term Machine Learning seems to be used in almost all products nowadays. But how do we actually define Machine Learning.

Arthur Samuel, 1959:
 > Machine Learning is the field of study, which provides computers the ability to learn without explicitly being programmed.

I find this statement to be the easiest and apt definition of the field.

# Jargon

* Attributes are the data types or variable types e.g. Integer or String,
* Features are the data types plus the values. e.g. Name = 'eXit',
* Labelled data is the process of placing a light description on a piece of data. For example, Normal data = 0, while Attack data = 1.
* Training and Test Sets is a common approach of modelling an algorithm. You supply your data and break the data into 80% of testing for the algorithm to model against, and then 20% of the data is set to be your test set. This test set is how you evaluate an algorithm. _(This is where overfitting and underfitting come into play)_
* Generalization in Machine Learning refers to the concepts that have been determined from the data. If a model generalizes well, the model is optimal for use. If the model is incapable of generalizing, then the model has overfit or underfit towards the data.

# Learning Types

There are many different types of learning structures for Machine Learning algorithms. In this section we aim to differential between them.

## Supervised

Supervised learning is the process in which an engineer provides data that has specific labels e.g., Normal data = 0, while Attack data = 1.

Supervised learning is quite common in the field of Intrusion Detection as baseline datasets for algorithms, models and systems. Examples of common benchmark datasets include: [KDD1999](http://kdd.ics.uci.edu/databases/kddcup99/kddcup99.html), [DARPA1999](https://www.ll.mit.edu/r-d/datasets/1999-darpa-intrusion-detection-evaluation-dataset), [Tokyo2006](http://www.takakura.com/Kyoto_data/) (this includes a 2015) dataset and [CICIDS2017](https://www.unb.ca/cic/datasets/ids-2017.html)

Here is a non-exhaustive list of Supervised Machine Learning algorithm:

1. Regression
    * Simple Linear Regression
    * Support Vector Regression
    * Random Forest Regression
2. Classification
    * k-Nearest Neighbours
    * Support Vector Machine
    * Random Forests and Decision Trees
    * Neural Networks

## Semi-Supervised

Semi-Supervised Machine Learning is the half-way house between Supervised learning and Unsupervised Learning. By this I mean, within the dataset only partial parts of the data are labelled. While the majority of the data is un-labelled.

Many of the algorithms that fall under this umbrella are the combinations between Supervised algorithms and Unsupervised algorithms.

## Unsupervised

Unsupervised learning is the use of data that has no labels. Unsupervised learning is used to determine patterns based on the data that is gathered. Such approaches require good quality data to infer trends and predictions.

Unsupervised learning has a variety of techniques and categories:

1. Clustering
    * k-Means
    * Hierarchical Cluster Analysis
2. Dimensionality Reduction
    * Principal Component Analysis
    * Kernel Principal Component Analysis
3. Association Rule Learning
    * Eclat
4. Neural Networks _(You can have both supervised and unsupervised Neural Networks)_
    * Artificial Neural Networks

## Reinforcement Learning

Reinforcement Learning is similar to that of Unsupervised Machine Learning. However, Reinforcement learning provides a positive reinforcement for a correct action. If a wrong action is taken, a positive punishment is incurred.

### Batch Learning

Batch learning is the process of providing all data to a model in one go. This can be extremely costly due to the amount of information that is required to be processed and in doing so _should_ be done offline.

### Online Learning

Online Learning is the process of taking a data set and incrementally feeding the model data. For example, we split a constant stream of the data down into _Mini Batches_ instead of one big batch of data. Each iteration of learning we pass a _Mini Batch_ and conduct the training and testing functions.

### Instance-based Learning

Instance-based learning is the idea learning something to the letter. For example, I can classify all liquid containers to have a screw lid (Like a coke bottle). This becomes a problem when we try to classify a glass.

### Model-based Learning

Model-based learning approaches the same topic as Instance-based learning, however instead of classifying something to the letter we make a generalized conclusion on the data. For example, all containers that hold liquid must have an outer shell such as plastic, glass, etc and has no holes. Now we have a model, where we can plot whether the container can or cannot hold a liquid.

# Challenges of Machine Learning

When conducting Machine Learning, we first must consider the four challenges we might face.

1. Insufficient Data - Is there enough data to work with?
2. Poor Quality Data - Is the data of any substance?
3. Irrelevant Features - Is the column names of the data respective of what we are looking for e.g., If I am looking for anomalies in the network, do I need to know the user that is logged in. You will have to ask yourself "Does this help with inferring a trend?"
4. Overfitting and underfitting the data - If you train your model too much, the model will be adapted to only the testing data. However, if you under train the model. The new data will be considered to be noise.

All of the challenges are something you must assess when looking at pipeline of your research such as when you gather the data, after you have gathered the data, when you process the data and the modelling of the algorithm around that set of data.

# Summary

Machine learning is an incredible way in which underlying and subtle trends can be found within the data. It can also be a brilliant addition to a toolkit to help intrusion detection and incident response.

# References

* [Hands on Machine Learning with Sci-kit Learn & Tensorflow](https://www.amazon.co.uk/Hands-Machine-Learning-Scikit-Learn-TensorFlow/dp/1491962291)

# Resources

This section is content that I have read or am currently reading and have found useful in my studies. _(I will try and update this as frequently as possible. Throughout this series I will be following both the Hands-on Machine Learning with Sci-kit Learn & Tensorflow as well as Deep Learning with Python)._

# Books

* [Practical Statistics for Data Scientists](https://www.amazon.co.uk/Practical-Statistics-Scientists-Peter-Bruce/dp/1491952962)
* [Hands on Machine Learning with Sci-kit Learn & Tensorflow](https://www.amazon.co.uk/Hands-Machine-Learning-Scikit-Learn-TensorFlow/dp/1491962291)
* [Deep Learning with Python](https://www.amazon.co.uk/Deep-Learning-Python-Francois-Chollet/dp/1617294438)

## Packages and Libraries

### Python

* [Pandas](http://pandas.pydata.org)
* [Numpy](http://www.numpy.org)
* [Matplotlib](https://matplotlib.org)
* [Scikit Learn](http://scikit-learn.org/stable/)
* [Tensorflow](https://www.tensorflow.org)

## Neural Networks

* [Neural Network Playground Tensorflow](http://playground.tensorflow.org)