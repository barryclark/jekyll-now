---
layout: post
title: Applications of Entropy in Machine Learning
---

In the previous blog post we talked about entropy and formally defined. In today's post, I want to 


### Applications in Machine Learning 

If you made it all the way through here, I hope you would appreciate how useful how powerful is the concept of entropy. Now, let's look at some very important applications in Machine Learning.

##### Bayesian Inference

In Bayesian statistics, the choice of a prior is often supported by the [Principle of Maximum Entropy](https://en.wikipedia.org/wiki/Principle_of_maximum_entropy). This principle is based on the premise that, when estimating a probability distribution, you should select the distribution which leaves you the largest remaining uncertainty (i.e., the maximum entropy) consistent with your constraints. That way you have not introduced any additional bias or or assumptions into your calculations.

Here is a quick summary of when some very popular distributions from the exponential family have maximum entropy:

* Normal: among all distributions with a given mean $ \mu $ and variance $ \sigma^2 $
* Binomial: each trial must result in one of two events and the expected value is constant
* Multinomial: more than two types of unordered events are possible, and the probability of each type of event is constant across trials
* Geometric: unbounded counts with constant expected value

I'm going to dedicate a whole blog post in the future regarding this topic, because it is a quite important one in Bayesian statistics.

##### Decesion Tree learning

Another popular application of entropy is in tree-based algorithms. In this case entropy is uses to select the split point for each node. What we are trying to do here is to minimize the entropy, choosing the value at which the two child nodes will have the smaller entropy, in other world be as much homogeneous within each node.

I've coded up a very simple implementation of a Decesion Tree in Python, to show how entropy is used.

```python
import numpy as np

from ml.information.metric import entropy, gini


INFORMATION_MEASURE = dict(
    entropy=entropy,
    gini=gini,
)

class DecisionTree:

    def __init__(self, criterion='entropy'):
        self.criterion = INFORMATION_MEASURE[criterion]
    
    def fit(self, X):
        return self

    def predict(self, X):
        pass
```

As you can see from this code snippet, in a decision tree entropy is used to decide how to split the existing parent node, into two child nodes. The value selected it the one the minimizes the within-node entropy.

I hope you found this article interesting. If you have any mistake or have any suggestion, please leave a comment.
