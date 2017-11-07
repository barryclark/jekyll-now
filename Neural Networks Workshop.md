
Based on what we saw during the slides, let's see if we can code up a single hidden layer neural network! If you're stuck on some of these parts, go back to the [linear regression](https://github.com/uclaacmai/tf-workshop-series-fall17/blob/master/week2-linear-regression/Intro%20to%20TF%20and%20Linear%20Regression.ipynb) and [logisitic regression](https://github.com/uclaacmai/tf-workshop-series-fall17/blob/master/week3-classification/Classification%20and%20Logistic%20Regression.ipynb) pieces of code. 


```python
# Imports
import tensorflow as tf
import numpy as np
import matplotlib.pyplot as plt

from tensorflow.examples.tutorials.mnist import input_data
mnist = input_data.read_data_sets('MNIST_data', one_hot=True) # reads in the MNIST dataset
```


```python
# TODO Define placeholders
```


```python
# TODO Define Hyperparameters
```


```python
# TODO Create our W1 weight and bias variables
```


```python
# TODO Create our W2 weight and bias variables
```


```python
# TODO Define the intermediate operations in our network (How can we compute h1 and yPred?)
```


```python
# TODO Define loss function and optimizer  
```


```python
# functions that allow us to gauge accuracy of our model
correct_predictions = tf.equal(tf.argmax(yPred, 1), tf.argmax(y_, 1)) 
accuracy = tf.reduce_mean(tf.cast(correct_predictions, tf.float32))
```


```python
# TODO Define our global variable initializer
```


```python
# TODO Create our training loop
```

# More Exercises

1. Using different activation functions. Consult the Tensorflow documentation on `tanh` and `sigmoid`, and use that as the activation function instead of `relu`. Gauge the resulting changes in accuracy. 
2. Varying the number of neurons - as mentioned, we have complete control over the number of neurons in our hidden layer. How does the testing accuracy change with a small number of neurons versus a large number of neurons? What about the generalization accuracy (with respect to the testing accuracy?)
3. Using different loss functions - we have discussed the cross entropy loss. Another common loss function used in neural networks is the MSE loss. Consult the Tensorflow documentation and implement the ```MSELoss()``` function. 
4. Addition of another hidden layer - We can create a deeper neural network with additional hidden layers. Similar to how we created our original hidden layer, you will have to figure out the dimensions for the weights (and biases) by looking at the dimension of the previous layer, and deciding on the number of neurons you would like to use. Once you have decided this, you can simply insert another layer into the network with only a few lines of code: 
