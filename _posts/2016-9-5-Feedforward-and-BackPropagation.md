---
layout: post
title: A simple introduction to Feed Forward and Backpropagation
---
![Inputs into a neuron and its output.](http://deeplearning.stanford.edu/wiki/images/thumb/8/85/STL_Logistic_Classifier.png/380px-STL_Logistic_Classifier.png "Inputs into a neuron and its output.")

In this post, we'll walk through some intuition development for the feed forward and backpropagation steps of training a neural network. We'll use a simple neural network model with real numbers to see exactly what's going on. Some calculus and a bit of linear algebra background is all that's needed to get started. 

### A Super-Simple Neural Network

Consider a neural network with three layers: an input layer, a hidden layer, and an output layer. The input layer will be composed of two units, and it'll be connected to a hidden layer of two units. The hidden layer connects to an output layer of two units as well. While neural networks can have thousands of units (and not necessarily the same amount of units per layer), we'll keep ours small for our purposes. Here's our neural network, with dummy values for the inputs, weights, and output labels. Given inputs of 0.18 and 0.31, we want our neural network to output 0.23 and 0.76. 

The overarching goal of neural networks is to learn the values of a set of weights that allow output to be accurately predicted from a given input. This is done by taking our inputs and feeding them forward through the neural network, where they are multiplied by weights (which are initially initialized randomly). Our output units represent the predictions made (for example, the probability that our input belongs to a certain class). At first, these predictions are inaccurate since the weights were initialized randomly. However, we can quantify our error and recompute our weights to reduce it. A popular technique in neural network implementations to minimize our errors is called backpropagation. Let's take a look at how the forward pass of our data through the network looks: 

### The Forward Pass

First, let's add a bias unit to our input data. Then, let's apply our weights to the inputs. Looking at our diagram above, each input has a corresponding weight that contributes to our input values into the hidden layer. From our diagram, let's calculate the inputs into the hidden layer individually:

input h1 = w1i1 + w3i2 + 1b = NUM
input h2 = w2i1 + w4i2 + 1b = NUM

We essentially just took a *linear combination* of our values in the input layer. That's all there is to obtaining an input value for your neural network's next layer: multiply each of your inputs by some weight, and them sum them up. We can just as easily write the above step as a matrix-vector multiplication:

--write that --

Next, we feed these two inputs into a logistic function that returns a continuous value over a distrubution. The results from this function is called the activation of the hidden layer. 

