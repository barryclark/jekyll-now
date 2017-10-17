
### Tensorflow Basics 

Tensorflow is a graph-based numerical computation library. Complex mathematical operations are described in a graph-like data structure, where nodes in the graph represent the mathematical operations, and connections between nodes represent the flow of data from operation to operation. In Tensorflow, these data are held as **tensor** objects, which is just a generalization of a matrix. 

![tf-graph](https://www.tensorflow.org/images/getting_started_add.png)

We will be using the Python API to access Tensorflow's data structures and functions, which are implemented in a highly efficient C++ backend. 

A Tensorflow program can be divided into two essential parts: 

1. Building a computational graph

2. Launching and running the computational graph

A **computational graph** is just a series of mathematical operations defined on some data, which we can easily create in Tensorflow. Let's create our first tensorflow program!


```python
# import our essential libraries
import tensorflow as tf
import numpy as np
import matplotlib.pyplot as plt
%matplotlib inline
```


```python
a = tf.constant(3.0)
b = tf.constant(4.0)
```


```python
print(a)
print(b)
```

Printing out the nodes does not produce the values that you may have expected. This is because Tensorflow only evaluates variables and runs operations in the context of a `session`. 


```python
sess = tf.InteractiveSession()
print(sess.run([a, b]))
```

Let's learn a little more about Tensorflow's graph-based computations.


```python
a = tf.constant(3.0)
b = tf.constant(4.0)
s = tf.multiply(a, b) # shortcut is just a + b
print(sess.run(s))
```

Exercise: Create constants and se Tensorflow's add, multiply, and subtract functions to evaluate: 
                (2 + 3) * 8 - 6 ( 4 + 6). 

Think about how you can express this computation as a graph. 


```python
a = tf.constant(2.0)
b = tf.constant(3.0)
c = tf.constant(8.0)
s = tf.constant(6.0)
d = tf.constant(4.0)
a_plus_b = tf.add(a, b)
m = tf.multiply(a_plus_b, c)
n = tf.add(d, s)
sub = -tf.multiply(s, n)
ans = tf.add(m, sub)
```


```python
sess.run(ans)
```

#### Placeholders and Variables

What we've learned so far is pretty cool, but it's not particularly useful. We want to be able to run our computations on arbitrary data. And thus we must learn about placeholders and variables. 

A ** placeholder ** in Tensorflow is just a promise to provide some value at a later time. We can define a series of computations without knowing the actual data the computation will run on. 



```python
a = tf.placeholder(tf.float32)
b = tf.placeholder(tf.float32)
adder = a + b
```


```python
sess.run(adder) # what will happen if we run this?
```


```python
sess.run(adder, feed_dict = {a: 4.0, b: 5.0})
```

Next, we want to be able to create **variables** as a part of our computational graph. Can you guess why this is desirable? 



### Aside: Machine "Learning" 

What does it mean for a machine to learn? Many people have different definitions, but a good way to think about it is that you initialize a mathematical function with several ** variables ** set to some initial values. 

This function is one that takes in your **inputs** (say, handwritten digits) and produces some  **output** (say, the number that was written). We want to adjust these variables based on the several (input, output) pairs that we have, so that our function becomes very good at correctly mapping inputs to outputs. 

The mathematical methods by which these variables are adjusted is known as "learning". 

### Creating Variables in Tensorflow

One way to create variables in tensorflow is with the ``` tf.Variable() ``` API. When creating variables, we usually want to provide a method of ** initializing ** the variable, and usually also want to mention the ** dimensionality ** of the variable (ie, do we wish to create a constant? Or do we wish to create a vector or matrix of a certain dimension?)

With Tensorflow, we need to explicitly ** intialize ** all of our variable by registering a variable initailizer, and running it within our session. This may sound a little complicated, but its just 2 lines of code. 



```python
W = tf.Variable(tf.constant(0.1, shape = [10,1])) # create a variable with information on how to initialize it and its dimensionality
```

Placeholders (tensors that we've promised to give data to later) can also take on arbitrary shapes. Of course, if you set a placeholder with a certain dimensionality, it will later expect data of that dimensionality!


```python
x = tf.placeholder(tf.float32, shape = [1, 10])
```


```python
mat_mul = tf.matmul(x, W)
```


```python
data = np.arange(10).reshape((1,10)) # 0,1,2,3...10 reshaped into a 1 * 10 matrix

# initialize our variables
init = tf.global_variables_initializer() # the variable initializer
sess.run(init)
sess.run(mat_mul, feed_dict = {x: data}) # can you predict the output? 
```

### Recap
We've learned the very basics of tensorflow: how to represent the computational graphs, use placeholders to input data later, and create variables. It turns out that with these tools and a little knowledge about optimization in Tensorflow, we can easily implement many machine learning models. Let's get to it!

### Linear Regression

Linear regression can be thought of as the "hello world" of machine learning. It's relatively straigthforward to implement once you understand it, yet (unlike a simple "hello world" app) is powerful enough to have signficant use in industry. Let's take a look at the linear regression problem. 

We have some (input, output) pairs which we denote as $ (x_i, y_i) $ and we have $n$ of these, so $i \in [1...n]$. We want to learn a function $f: x \rightarrow{} y$ that maps inputs to outputs. 

At this point, you might be thinking "why is this hard?" - and you'd be right to ask that question. I missed one crucial point in my explanation - the idea of generalization.


```python
from sklearn.datasets import load_boston
from sklearn.decomposition import PCA # to visualize our data
from sklearn.preprocessing import normalize # to standardize our data
from sklearn.model_selection import train_test_split
data, targets = load_boston(True)
data = normalize(data)
targets = targets.reshape((targets.shape[0],1)) # reshape targets to follow our variables
X_train, X_test, y_train, y_test = train_test_split(data, targets, 
                                                    test_size = 0.3, random_state = 42)

print(X_train.shape)
print(y_train.shape)
print(X_test.shape)
print(y_test.shape)
    

```

#### Linear Regression: An overview

As discussed in the slides, we can teach a computer how to predict housing prices based on data. In order to do this, we will create a linear model in many dimensions (specifically, 13, the number of features in our dataset). 

Our goal is to learn a function $ f: x \rightarrow{} y$ that maps information about a house to the house's price prediction. With linear regression, our function $f$ is just a ** linear combination ** of our inputs. That means our output is just the sum of our inputs, but each of our inputs are weighted by some value: 

$$f(x) = w_1 x_1 + w_2 x_2 + ... w_{13}x_{13} + b = \sum_{j=1}^{13} w_j x_j + b$$

Next, we will initialize this linear model with initially random weights. As a result, our model won't be able to predict house prices very well at all. Learning is the process of adjusting these parameters so that our model's accuracy increases. In order to do this, we need to mathematically quantify how "bad" our model is currently. We can do this by calculating how off each prediction is from the actual value: 

$$ L = \frac{1}{N} \sum_{i=1}^{N} (y_i - f(x_i))^2 $$

If we take the derivative of this function with respect to each of the weights $w$, we will know how much to "adjust" each weight $w$ by in order to make our function more accurate. This is an algorithm called ** gradient descent **. 

If you know some multivariable calculus, you can determine that the derivative with respect to the $i$th weight is $$ \frac{dL}{dw_i} = \frac{-2}{N} \sum_{i=1}^{N} (y_i - f(x_i))x_i $$

This is getting a little abstract - lets move on to actually coding up this model!


```python
X = tf.placeholder(tf.float32, shape = [None, 13])
y = tf.placeholder(tf.float32, shape = [None,1])

W = tf.Variable(tf.constant(0.1, shape = [13,1 ]))
b = tf.Variable(tf.constant(0.1))
```


```python
y_pred = tf.matmul(X, W) + b
loss = tf.reduce_mean(tf.square(y_pred - y))
opt = tf.train.GradientDescentOptimizer(learning_rate = .5).minimize(loss)
```


```python
init = tf.global_variables_initializer()
sess.run(init)
initial_loss = loss.eval(feed_dict = {X: X_train, y: y_train})
print("initial loss: {}".format(initial_loss))
for i in range(5000):
    sess.run(opt, feed_dict = {X: X_train, y: y_train})
    if i % 100 == 0:
        print(loss.eval(feed_dict = {X: X_train, y: y_train}))

final_loss = loss.eval(feed_dict = {X: X_test, y: y_test})
print("testing loss: {}".format(final_loss))
```


```python
predictions = sess.run(y_pred, feed_dict = {X: data})
predictions = predictions.flatten()
targets = targets.reshape((506))

# lets take a look at some predictions
for i in range(10):
    randint = np.random.randint(0, 506)
    pred = predictions[randint]
    actual = targets[randint]
    print("prediction: {}, actual was: {}".format(pred, actual))

```


```python
# Lets plot the absolute differences as a function of the actual price
diffs = (targets - predictions)
avg_diffs = np.mean(diffs)
avg_houseprice = np.mean(targets)
plt.xlabel('Home price values')
plt.ylabel('Diff btwn targets and functions')
plt.scatter(targets, diffs)
plt.show()
print("average absolute difference: {}".format(avg_diffs * 1000))
print("average house price: {}".format(avg_houseprice * 1000))
```

Our model seems to do okay with lower and averaged price houses, but appears to do terribly with higher-priced houses. Think about why this may be. It's always important to consider the data that you used to train your model. In particular, it might be likely that our dataset didn't have many examples of highly priced houses, so our model may have not learned how to predict prices for them. What's cool about data science and machine learning is that we can easily test this theory. 


```python
limits = {0: 0, 10: 0, 20: 0, 30: 0, 40: 0, 50: 0}
for price in targets:
    limits[int(price/10) * 10]+=1

for k, v in sorted(limits.items()):
    print("{} : {}".format(k, v))
```

### Exercises

- As we have seen, our model is not very accurate for very highly-priced houses. How many higher-priced houses be different than lower-priced houses, and what did our model not capture about them? 


- Investigate the need for a bias unit in our linear model. How can you adjust our current model to not have the bias unit (hint: just remove it). What happens to the model if the bias unit is removed? Why is having a bias unit important in machine learning models?


- Investigate different learning rates other than 0.5. Anything under 0.5 should work well, but you may have to play around with the number of iterations. Why is this - why do some learning rates require more iterations while others do not? Try learning rates greater than 0.5, and observe what happens. Why do you think this is? What do you think are some good guidelines to pick an optimal learning rate? 



- Try ```Polynomial Regression```. This involves generating additional features that are combinations of the original features. In higher-dimensional space, the house price and newly generated features may be linear with respect to each other. To do this, you'll have to use the ```sklearn.preprocessing.PolynomialFeatures``` library to generate new features. Instead of 13, you'll also have to update your model to take in the new number of features you have created. 


- Do something interesting: If you have any ideas to change the model up or improve accuracy in some way, fork this repository and make your changes. Then post it on the AI at UCLA page for us to see! Also, don't forget to create a pull request on our github if you want your change merged into our tutorials. 

Thank you for attending! Please fill out our [feedback form](https://goo.gl/forms/pLOfAMpspqeqAkB12) so we can produce even better content!


```python

```
