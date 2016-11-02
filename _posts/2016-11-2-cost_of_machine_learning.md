---
layout: post
title: Cost of Machine Learning
author: Mike Kroutikov
style: |
  table {border-collapse: collapse;}
  td, th {border: 1pt solid gray; padding-left: 1em; padding-right: 1em;}
---

How much Deep Learning costs, anyway? Let me compare some cloud hardware and get down to dollars and cents.

The ultimate goal of Deep Learning is to create a good model. It requires a lot of data, patience, and some luck.
Basically what we are doing is runing many experiments on the training data. The amount of the training data for
a task is
pretty much fixed. The number of experiments depends on how many different hiperparameters you want to try.

From the point of view of ML developer, what matters is the cost of one experiment. And to be precise, the cost of
processing your dataset **once**. Showing each sample of the training data to your deep model just once is called 
*an epoch*. So, I need to know the cost of one epoch! In experimenting I may decide to tweak hyperparameters, try
changing the number of epochs, and so on. But the basic building block for the cost analysis is the *cost of one epoch*.

As defined, *cost of one epoch* is very problem-specific. It is also model-specific. Thus, when we talk about the cost,
we have in mind a very specific problem that we are solving. For the different problem, cost analysis need to be done
again, and it may happen that the cheapest platform for `model1` is not the cheapest for `model2`. Beware!

## Methodology
For running benchmarks I will use my TensorFlow port of
[LSTM CNN language model](https://github/com/mkroutikov/tf-lstm-char-cnn). Just because I am familiar with this model.

This model needs 25 epochs to train. It takes anywhere from 20 hours to 1.5 hours, depending on the hardware.

I am not patient enough to re-run the complete training. Instead, I will time only the first epoch.

## Results:

Training `tf-lstm-char-cnn` for one epoch. This assumes the current cost of $1.675/hour for `c4.8xlarge`, $0.65/hour
for `g2.2xlarge`, and $0.90/hour for `p2.xlarge`.

| Metrics       | `c4.8xlarge` | `g2.2xlarge` | `p2.xlarge` |
|---------------|--------------|--------------|-------------|
| time (secs)   | 1404         | 3779         | 428         |
| cost (cents)  |   65         |   68         | 11          |

We found out that `p2.xlarge` is 6 times cheaper that the next contender, even though it is not the cheapest machine
to rent (per hour).

## Utilization, Utilization, Utilization

Can we do better? Sure!

The default training parameters are selected assuming 4Gb of GPU memory. By changing `batch_size` parameter, we change
the amount of memory needed. Increasing batch size proportionally decreases the number of batches in epoch, while
processing time should stay roughly unchanged. Ideally, we will choose the batch size to utilize the 100% of GPU
memory.

Here is the extension to the same table:

| Metrics       | `p2.xlarge` | `p2.xlarge, batch_size=100` |
|---------------|-------------|-----------------------------|
| time (secs)   | 428         | 170                         |
| cost (cents)  | 11          | 4.3                         |

By choosing correct hardware, and tweaking model to fully utilize this hardware, we reduced the cost of training
from 60 cents/epoch to 4 cents/epoch. Accounting people should be happy :)
