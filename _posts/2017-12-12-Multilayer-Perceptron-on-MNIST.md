---
layout: post
title: Day 1-2 Multilayer Perceptron on MNIST
permalink: /30ddlf/mlp-on-mnist
comment: true
---
#### Project Content &rarr;  *[30 Days Of Deep Learning Fundamentals](/blog/30-days-of-deep-learning-fundamentals/)*
## Day 1
#### Focus of the day: Learn and play with MNIST dataset
[MNIST](http://yann.lecun.com/exdb/mnist/) is a classic CV dataset that was set up by Yann LeCun et al. It's a good entry level CV dataset for people who want to get their feet wet in ML world.

#### Q & A: 
1. What is a multilayer perceptron? 

    Input layer, hidden layer and output layer, you got one. It can have multiple hidden layers and it has to be fully connected, which means each node in any layer, has to connect with every node in the following layer.
    As a class of feedforward neural networks, MLP is one of the quintessential deep learning models. It's sometimes called the vanilla NN.

2. Is dense/fully-connected layer in CNN the same concept as a hidden layer in MLP?

    It's different concepts but the same thing. MLP is the structure with at least one hidden layer and all layers are fully connected. Hidden layer in MLP is fully connected to its following layer, which is exactly the definition of dense/FC layers in CNN. 

3. How do step and epoch differ, and when to use which?

    Epoch is simple, you train your algorithm on the entire training dataset once, it's called one epoch. Twice, two epochs.
    Step is a concept in mini-batch training, where you set a specific number to be your batch size. After the algorithm finishes training on a batch, we call it one step finished. So basically 

    > num_steps = num_epochs * examples_per_epoch / batch_size

    Notice sometimes it may not be divisible and you have to handle the leftover training examples, i.e., in the last batch, it may contain fewer examples than the batch_size dictates.

    It doesn't really matter which one you choose to use in training. Depending on the dataset and how you do things like logging and evaluation, sometimes one is more convenient than the other. But it won't affect the training process.
    
4. How do you save/restore a model in tensorflow?

    [Tensorflow doc on save/restore](https://www.tensorflow.org/programmers_guide/saved_model)

#### Task done:

1. Coded up a MLP in tensorflow to play with MNIST dataset
2. Successfully trained a four layer MLP.
3. Tweaked the hyperparameters a little bit, observe and document the performance.

#### Questions raised
1. How do hyperparameters affect the performance of a MLP?
2. How do the hyperparameters affect the performance of other NN architectures?

## Day 2
#### Focus of the day: Play with the hyperparameters
Try different combinations of LR and batch size and see what happens

#### Q&A:
1. What is the difference between batch mode, mini-batch model and online learning?

    * Batch mode: The entire training set is considered a single batch and fed into the network for training.  
    * Mini-batch: A subset of training set is grouped into a mini batch, and fed into the network.
    * Online learning: Data is ingested one at a time. (A single data point, or example, is fed into the network)

2. How does mini batch size affect the performance of generalization?  

    **[On large-batch training for deep learning (Keskar et al,2017)](https://arxiv.org/abs/1609.04836)**  
    Keskar's work helped me a lot on understanding this topic. In short, batch size does affect the performance. It is observed in practice that larger batch sizes tend to have a degradation affect in the quality of the model.

    > We investigate the cause for this generalization drop in the large-batch 
    > regime and present numerical evidence that supports
    > the view that large-batch methods tend to converge to sharp minimizers of the
    > training and testing functions—and as is well known, sharp minima lead to poorer
    > generalization. In contrast, small-batch methods consistently converge to flat min-
    > imizers, and our experiments support a commonly held view that this is due to the
    > inherent noise in the gradient estimation. 

    In simple words, similar with small vs large LR, large-batch methods give poorer generalization than small-batch methods. However a larger batch size does provide faster training, and in some case, if the training time is the bottleneck, it is crucial to experiment for a reasonably good large batch size.

3. How large/small should the batch size typically be?

    Rule of thumb is to set the batch size larger than 32 if you have a reasonably large dataset. 32, 64, 128, these are all commonly used numbers.

4. Does the degradation in the quality of the model when using a large batch size also appear when training with optimizer other than SGD?

    Yes. Refer to **[On large-batch training for deep learning (Keskar et al,2017)](https://arxiv.org/abs/1609.04836)**  

5. Generally speaking, how do batch_size, learning_rate and num_epoch affect the training process or performance of the model?

    * batch_size: 
        In general, larger batch sizes result in faster progress in training, but do not always converge as fast. Smaller batch sizes train slower, but can converge faster. It's heavily problem dependent, and batch_size only plays a minor role.
    * num_epoch:
        In general, the models improve with more epochs of training. But it's not the more the merrier. They'll start to plateau in accuracy as they converge. Plot a num_epoch vs accuracy graph and adjust the hyperparameters (LR in most cases) when it levels out.
    * learning_rate:
        This is the most tricky one. People spend quite a lot more time on LR than the other two. LR has a huge impact on the training process and the performance of the model. A too large LR would overshoot the optimal point and a too small one would cause optimizer to be stuck in a local minima.  

    [Chapter 8 of Deep Learning book by Ian Goodfellow and Yoshua Bengio and Aaron Courville](http://www.deeplearningbook.org/contents/optimization.html) has an in-depth discussion on this topic.

#### Task done:
1. Reproduce the results shown in [On large-batch training for deep learning (Keskar et al,2017)](https://arxiv.org/abs/1609.04836) on MNIST MLP
2. Compare the results of small and large batch size.

#### Notes of the day:
1. Keskar's paper ([On large-batch training for deep learning (Keskar et al,2017)](https://arxiv.org/abs/1609.04836)) gives a very detailed explanation to my question "How does mini batch size affect the performance of generalization". They provided numerical analytics and proof to the well known observation that large batch size leads to a loss in generalization performance. In simple words, the reason according to Keskar's team, is that large batch size optimizer tends to converge to "sharp minimizers of the training function". Unlike small batch methods, large batches typically are not able to escape the basin of sharp minimizers due to the lack of noisiness in the training batches. 
2. [Chapter 8 of Deep Learning book](http://www.deeplearningbook.org/contents/optimization.html) has a detailed discussion on how to optimize the training process for a deep learning model.
