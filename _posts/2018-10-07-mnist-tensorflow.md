---
layout: post
title: Understanding Tensorflow with MNIST
date: 2018-10-07
author: Dorian 
categories: [machine-learning, tensorflow]
picture: /assets/images/mnist/title_banner.jpg
published: true
excerpt: Something about article here
---

Recently at work we had a hackathon on tensorflow, which is something I'd tried (running examples) but never really took the time to play with it. I'd like to share my experiences on the tensorflow computational graph, and some of the flexibility it has to do cool stuff.

> I'm not a tensorflow expert, so please let me know if there are any inaccuracies I need to correct :wink:

## Building a Computational Graph

In order to do anything in tensorflow, you need to create a so called computation graph. This is the main construct used to break things down into problems your GPU can efficiently solve. Like Numpy and PySpark, python is just a wrapper for telling other engines to run your computations. In the case of tensorflow, this is for CUDA and your GPU. 

Sending data from your GPU to python and back creates a lot of performance overhead, so the computation graph is a way of helping you do that as little as possible.

<figure style="text-align: center;">
    <img src="/assets/images/mnist/comp_graph.gif" style="width: 75%;">
    <figcaption> Example of a tensorflow computation graph</figcaption>
</figure>

You define a computation graph using special tensor objects (eg. constants, vectors, matrices) and tensor operations (eg. multiply, weighted sum, apply loss function). Inputs to your graph (like a training dataset) are defined as placeholders.

### Calculating a matrix inverse, the hard way

Say we want to make a simple computation graph, but a little more complicated than adding two numbers. Let's take a square matrix as input, and multiple it by some set matrix $A$. Our goal is to create a graph that finds the matrix inverse $A^{-1}$, which we enforce with the loss. This function tries to make the output as close to the identity matrix as possible.

```python
import tensorflow as tf
import numpy as np

# We'll put this into the graph later
rand_matrix = np.random.randint(0, 10, (10, 10))

# We start making our graph here
x = tf.Variable(np.zeros((10, 10)), dtype=tf.float32, name="A")
A = tf.constant(rand_matrix, dtype=tf.float32)
output = tf.matmul(x, A)
id_mat = tf.constant(np.identity(10), dtype=tf.float32)
loss = tf.reduce_sum(tf.abs(output - id_mat))

# Here we define some "meta-graph" stuff
optimiser = tf.train.AdagradOptimizer(learning_rate=0.001).minimize(loss)
init_op = tf.global_variables_initializer()
```

So in the above section we defined:
- some variables (stuff which get updated and persists between runs) 
- some constants which don't change
- matrix multiplication, which transforms our input into an output in our case 
- a loss function
- an optimiser which changes the variables in the graph to minimize the loss
- a variable initializer, which creates initial states for any variables which are defined using a distribution (we don't use those)

With this defined, we can start training the model.

```python
# Number of passes over the data
epochs = 100_000

# Context managers work nicely with tensorflow sessions
with tf.Session() as sess:
    sess.run(init_op)
    for e in range(epochs):
        _, epoch_loss = sess.run([optimiser, loss])
        if e % 100 == 0:
            print(epoch_loss)

    # Lets evaluate the learned matrix A
    x_ = sess.run(A)
    print(x_.dot(rand_matrix))
```

Running the optimizer once will update the variable x by one step. In order to get a good estimate, we run the optimizer 100,000 times. In the end, we get the learned matrix x and check if it is indeed close to the inverse.

We trained our first tensorflow model!

### Calculating a matrix inverse using data

In the first example we used constants, but in general we want to train on a dataset. In general this will be a list of input and outputs. In this specific case, this would be a list of the same matrix A as input, and the identity matrix as output.

## Using tensorflow (for mnist)

## Understanding the Network Weights

## 
