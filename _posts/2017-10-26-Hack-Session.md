---
layout: post
title: Pandas Tutorial & Kaggle Hack Session
mathjax: True
---

A link to the slides given at the workshop is available [here](https://docs.google.com/presentation/d/1dBfAeSrrlAKV86Pgk1XHYw1Ux5eUOi2fEHQmFHAgqQg/edit?pli=1#slide=id.g35f391192_00). This week's workshop is best viewed as a downloaded Jupyter notebook, so we'd recomment downloading the [Pandas Tutorial](https://github.com/uclaacmai/tf-workshop-series-fall17/blob/master/week4-pandas-and-kaggle/Pandas%20Tutorial.ipynb) and the [Kaggle Starter](https://github.com/uclaacmai/tf-workshop-series-fall17/blob/master/week4-pandas-and-kaggle/Kaggle%20Hack%20Session%20Starter.ipynb) notebooks.
# Introduction

Today, we have our first ever Kaggle Hack Session! We're going to be competing in the Titantic competition. The goal in this competition is to be able to predict who survived and who passed away during this tragedy, given information about the people involved.

We know that getting started for one of these competitions can be difficult, so we've provided this starter notebook to help you get up and running. Let's think about what we need to do when approaching any machine learning competition/problem. 

1) Determine your problem space. Do you have a classification problem, or a regression problem?

2) Determine what model you want to use (Always good to start off with simple models).

3) Load in and preprocess your dataset. Examine your database to see if there are any NULL or non-numeric values.

4) Split up your dataset into training and testing components. 

5) Create your model. This entails defining your function, your placeholders, the loss function, and the optimizer. 

6) Train, evaluate, and iterate on your model!

7) Once you have a model that you're satisfied with, load in test.csv (the test set for the Titanic competition), compute your predictions, save them to a CSV file, and submit to Kaggle. 


```python
import pandas as pd
import tensorflow as tf
```

# Load in Data

You can download the data from the Kaggle website. The direct link is [here](https://www.kaggle.com/c/titanic/data), but we've already downloaded it for you. It's located in the Data subfolder. 


```python
# Use the Pandas read_csv() function to load in the train.csv
titanicTrain = pd.read_csv('Data/train.csv')
```

# Examine Data


```python
# Use the head function to see how the first couple rows of the dataframe looks like
titanicTrain.head()
```




<div>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>PassengerId</th>
      <th>Survived</th>
      <th>Pclass</th>
      <th>Name</th>
      <th>Sex</th>
      <th>Age</th>
      <th>SibSp</th>
      <th>Parch</th>
      <th>Ticket</th>
      <th>Fare</th>
      <th>Cabin</th>
      <th>Embarked</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>0</td>
      <td>3</td>
      <td>Braund, Mr. Owen Harris</td>
      <td>male</td>
      <td>22.0</td>
      <td>1</td>
      <td>0</td>
      <td>A/5 21171</td>
      <td>7.2500</td>
      <td>NaN</td>
      <td>S</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2</td>
      <td>1</td>
      <td>1</td>
      <td>Cumings, Mrs. John Bradley (Florence Briggs Th...</td>
      <td>female</td>
      <td>38.0</td>
      <td>1</td>
      <td>0</td>
      <td>PC 17599</td>
      <td>71.2833</td>
      <td>C85</td>
      <td>C</td>
    </tr>
    <tr>
      <th>2</th>
      <td>3</td>
      <td>1</td>
      <td>3</td>
      <td>Heikkinen, Miss. Laina</td>
      <td>female</td>
      <td>26.0</td>
      <td>0</td>
      <td>0</td>
      <td>STON/O2. 3101282</td>
      <td>7.9250</td>
      <td>NaN</td>
      <td>S</td>
    </tr>
    <tr>
      <th>3</th>
      <td>4</td>
      <td>1</td>
      <td>1</td>
      <td>Futrelle, Mrs. Jacques Heath (Lily May Peel)</td>
      <td>female</td>
      <td>35.0</td>
      <td>1</td>
      <td>0</td>
      <td>113803</td>
      <td>53.1000</td>
      <td>C123</td>
      <td>S</td>
    </tr>
    <tr>
      <th>4</th>
      <td>5</td>
      <td>0</td>
      <td>3</td>
      <td>Allen, Mr. William Henry</td>
      <td>male</td>
      <td>35.0</td>
      <td>0</td>
      <td>0</td>
      <td>373450</td>
      <td>8.0500</td>
      <td>NaN</td>
      <td>S</td>
    </tr>
  </tbody>
</table>
</div>




```python
# Figure out what the different column names are
titanicTrain.columns.tolist()
titanicTrain.describe()
```




<div>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>PassengerId</th>
      <th>Survived</th>
      <th>Pclass</th>
      <th>Age</th>
      <th>SibSp</th>
      <th>Parch</th>
      <th>Fare</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>count</th>
      <td>891.000000</td>
      <td>891.000000</td>
      <td>891.000000</td>
      <td>714.000000</td>
      <td>891.000000</td>
      <td>891.000000</td>
      <td>891.000000</td>
    </tr>
    <tr>
      <th>mean</th>
      <td>446.000000</td>
      <td>0.383838</td>
      <td>2.308642</td>
      <td>29.699118</td>
      <td>0.523008</td>
      <td>0.381594</td>
      <td>32.204208</td>
    </tr>
    <tr>
      <th>std</th>
      <td>257.353842</td>
      <td>0.486592</td>
      <td>0.836071</td>
      <td>14.526497</td>
      <td>1.102743</td>
      <td>0.806057</td>
      <td>49.693429</td>
    </tr>
    <tr>
      <th>min</th>
      <td>1.000000</td>
      <td>0.000000</td>
      <td>1.000000</td>
      <td>0.420000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
    </tr>
    <tr>
      <th>25%</th>
      <td>223.500000</td>
      <td>0.000000</td>
      <td>2.000000</td>
      <td>20.125000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>7.910400</td>
    </tr>
    <tr>
      <th>50%</th>
      <td>446.000000</td>
      <td>0.000000</td>
      <td>3.000000</td>
      <td>28.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>14.454200</td>
    </tr>
    <tr>
      <th>75%</th>
      <td>668.500000</td>
      <td>1.000000</td>
      <td>3.000000</td>
      <td>38.000000</td>
      <td>1.000000</td>
      <td>0.000000</td>
      <td>31.000000</td>
    </tr>
    <tr>
      <th>max</th>
      <td>891.000000</td>
      <td>1.000000</td>
      <td>3.000000</td>
      <td>80.000000</td>
      <td>8.000000</td>
      <td>6.000000</td>
      <td>512.329200</td>
    </tr>
  </tbody>
</table>
</div>



Use other functions such as describe, max, mean, value_counts, etc to learn more about the dataset you're dealing with. 

# Clean Data

This is one of the most important parts of any machine learning pipeline. We want to make sure that the inputs we feed into any machine learning model are are valid, non-null, and are numerical values. To get you started with datapreprocessing, we'll show you one example of a column you may want to drop in this dataset 


```python
# Visualize the data we're working with
titanicTrain.info()
```

    <class 'pandas.core.frame.DataFrame'>
    RangeIndex: 891 entries, 0 to 890
    Data columns (total 12 columns):
    PassengerId    891 non-null int64
    Survived       891 non-null int64
    Pclass         891 non-null int64
    Name           891 non-null object
    Sex            891 non-null object
    Age            714 non-null float64
    SibSp          891 non-null int64
    Parch          891 non-null int64
    Ticket         891 non-null object
    Fare           891 non-null float64
    Cabin          204 non-null object
    Embarked       889 non-null object
    dtypes: float64(2), int64(5), object(5)
    memory usage: 83.6+ KB


So, as you can see above, some of the people don't have values for the age and cabin attributes. There are ways we can deal with this (for example, replace the null values with the median of the other values, replace them with 0, etc), but a simple method is to just drop the column.


```python
# Drop the column
titanicTrain.drop(['Cabin'], axis = 1, inplace = True)
# alternatively, if you don't wish to modify the original data structure, you can re-assign the result of.drop().
#titanicTrain_dropped = titanicTrain.drop(['Cabin'], axis = 1) # For axis number (0 for rows and 1 for columns)

```

Another column that needs processing is the age.


```python
# Do the preprocessing
medianAge = titanicTrain['Age'].median()
titanicTrain['Age'].fillna(medianAge, inplace = True)
```

Now, try it on your own! The functions you will probably be using are (although you're not limited to just these!):
- [drop()](https://pandas.pydata.org/pandas-docs/stable/generated/pandas.DataFrame.drop.html)
- [fillna](https://pandas.pydata.org/pandas-docs/stable/generated/pandas.DataFrame.fillna.html)
- [get_dummies()](https://pandas.pydata.org/pandas-docs/stable/generated/pandas.get_dummies.html)
- [dropna()](https://pandas.pydata.org/pandas-docs/stable/generated/pandas.DataFrame.dropna.html)


```python
titanicTrain.head()
```




<div>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>PassengerId</th>
      <th>Survived</th>
      <th>Pclass</th>
      <th>Name</th>
      <th>Sex</th>
      <th>Age</th>
      <th>SibSp</th>
      <th>Parch</th>
      <th>Ticket</th>
      <th>Fare</th>
      <th>Embarked</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>0</td>
      <td>3</td>
      <td>Braund, Mr. Owen Harris</td>
      <td>male</td>
      <td>22.0</td>
      <td>1</td>
      <td>0</td>
      <td>A/5 21171</td>
      <td>7.2500</td>
      <td>S</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2</td>
      <td>1</td>
      <td>1</td>
      <td>Cumings, Mrs. John Bradley (Florence Briggs Th...</td>
      <td>female</td>
      <td>38.0</td>
      <td>1</td>
      <td>0</td>
      <td>PC 17599</td>
      <td>71.2833</td>
      <td>C</td>
    </tr>
    <tr>
      <th>2</th>
      <td>3</td>
      <td>1</td>
      <td>3</td>
      <td>Heikkinen, Miss. Laina</td>
      <td>female</td>
      <td>26.0</td>
      <td>0</td>
      <td>0</td>
      <td>STON/O2. 3101282</td>
      <td>7.9250</td>
      <td>S</td>
    </tr>
    <tr>
      <th>3</th>
      <td>4</td>
      <td>1</td>
      <td>1</td>
      <td>Futrelle, Mrs. Jacques Heath (Lily May Peel)</td>
      <td>female</td>
      <td>35.0</td>
      <td>1</td>
      <td>0</td>
      <td>113803</td>
      <td>53.1000</td>
      <td>S</td>
    </tr>
    <tr>
      <th>4</th>
      <td>5</td>
      <td>0</td>
      <td>3</td>
      <td>Allen, Mr. William Henry</td>
      <td>male</td>
      <td>35.0</td>
      <td>0</td>
      <td>0</td>
      <td>373450</td>
      <td>8.0500</td>
      <td>S</td>
    </tr>
  </tbody>
</table>
</div>




```python
# TODO Find the other attributes that may give us trouble later on! Once you find these
# columns, figure out if you just want to drop the attribute altogether or replace with 
# median, or something else!

# HINT: The name attribute is something you may want to look at. We don't want strings in our ML model!
titanicTrain.drop(['Name'], axis = 1, inplace = True)
```

Now that you know a couple ways of dealing with null values and string values, feel free to be creative! The best way to get a more accurate machine learning model is to understand the best ways to visualize and clean your data! This is one of the most important steps in any ML pipeline. 

# Create Training/Testing Matrices

So, now that we've made our final changes to our dataframe, we want to convert it into a matrix of numbers. We want our Y Matrix to be filled with binary labels indicating whether the person survived or not. Our X Matrix should contain all of the features that represent each individual.  


```python
titanicTrain.info()
titanicTrain.head()
mapping = {
    'female': 1,
    'male': 0
}
titanicTrain['Sex'] = titanicTrain['Sex'].map(mapping)
```

    <class 'pandas.core.frame.DataFrame'>
    RangeIndex: 891 entries, 0 to 890
    Data columns (total 10 columns):
    PassengerId    891 non-null int64
    Survived       891 non-null int64
    Pclass         891 non-null int64
    Sex            891 non-null object
    Age            891 non-null float64
    SibSp          891 non-null int64
    Parch          891 non-null int64
    Ticket         891 non-null object
    Fare           891 non-null float64
    Embarked       889 non-null object
    dtypes: float64(2), int64(5), object(3)
    memory usage: 69.7+ KB



```python
titanicTrain.head()
```




<div>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>PassengerId</th>
      <th>Survived</th>
      <th>Pclass</th>
      <th>Sex</th>
      <th>Age</th>
      <th>SibSp</th>
      <th>Parch</th>
      <th>Ticket</th>
      <th>Fare</th>
      <th>Embarked</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>0</td>
      <td>3</td>
      <td>0</td>
      <td>22.0</td>
      <td>1</td>
      <td>0</td>
      <td>A/5 21171</td>
      <td>7.2500</td>
      <td>S</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2</td>
      <td>1</td>
      <td>1</td>
      <td>1</td>
      <td>38.0</td>
      <td>1</td>
      <td>0</td>
      <td>PC 17599</td>
      <td>71.2833</td>
      <td>C</td>
    </tr>
    <tr>
      <th>2</th>
      <td>3</td>
      <td>1</td>
      <td>3</td>
      <td>1</td>
      <td>26.0</td>
      <td>0</td>
      <td>0</td>
      <td>STON/O2. 3101282</td>
      <td>7.9250</td>
      <td>S</td>
    </tr>
    <tr>
      <th>3</th>
      <td>4</td>
      <td>1</td>
      <td>1</td>
      <td>1</td>
      <td>35.0</td>
      <td>1</td>
      <td>0</td>
      <td>113803</td>
      <td>53.1000</td>
      <td>S</td>
    </tr>
    <tr>
      <th>4</th>
      <td>5</td>
      <td>0</td>
      <td>3</td>
      <td>0</td>
      <td>35.0</td>
      <td>0</td>
      <td>0</td>
      <td>373450</td>
      <td>8.0500</td>
      <td>S</td>
    </tr>
  </tbody>
</table>
</div>




```python
# Convert to matrices. 
# TODO Add/Remove columns as you see fit
print(titanicTrain.head())
X = titanicTrain[['Pclass', 'Age', 'SibSp', 'Sex', 'Parch', 'Fare']].as_matrix()
Y = titanicTrain['Survived'].as_matrix()
Y = Y.reshape([Y.shape[0], 1]) # Reshaping from (891,) to (891,1)
print (X.shape)
print (Y.shape)
import numpy as np

from sklearn.preprocessing import PolynomialFeatures
poly = PolynomialFeatures(2)
X = poly.fit_transform(X)
print(X.shape)
```

       PassengerId  Survived  Pclass  Sex   Age  SibSp  Parch            Ticket  \
    0            1         0       3    0  22.0      1      0         A/5 21171   
    1            2         1       1    1  38.0      1      0          PC 17599   
    2            3         1       3    1  26.0      0      0  STON/O2. 3101282   
    3            4         1       1    1  35.0      1      0            113803   
    4            5         0       3    0  35.0      0      0            373450   
    
          Fare Embarked  
    0   7.2500        S  
    1  71.2833        C  
    2   7.9250        S  
    3  53.1000        S  
    4   8.0500        S  
    (891, 6)
    (891, 1)
    [[False False False False False False]
     [False False False False False False]
     [False False False False False False]
     ..., 
     [False False False False False False]
     [False False False False False False]
     [False False False False False False]]
    (891, 28)


(OPTIONAL) Remember that whenever we have a dataset, it's good practice to seperate the dataset into 2 parts, one that we will use to train the model, and one that we will use to check how our model is doing as a test/validation set. 


```python
# Divide into xTrain, yTrain, xTest, and yTest. Take the last 100 examples as test
#numExamples = X.shape[0]
#numTestExamples = 100

#xTrain = X[:numExamples - numTestExamples] # xTrain contains the examples 0-791
#yTrain = Y[:numExamples - numTestExamples] # yTrain contains the labels for examples 0-791
#xTest = X[numExamples - numTestExamples:] # xTrain contains the examples 792-891
#yTest = Y[numExamples - numTestExamples:] # yTrain contains the labels for examples 792-891
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, Y)
print(X_train.shape)
print(X_test.shape)
print(y_train.shape)
import numpy as np
print(X)
```

    (668, 28)
    (223, 28)
    (668, 1)
    [[        nan  0.82737724 -0.56573646 ..., -0.29008832 -0.29704981
      -0.19930472]
     [        nan -1.56610693  0.66386103 ..., -0.29008832 -0.29704981
       0.09110119]
     [        nan  0.82737724 -0.25833709 ..., -0.29008832 -0.29704981
      -0.19871319]
     ..., 
     [        nan  0.82737724 -0.1046374  ...,  1.1701868   0.36825424
      -0.17058375]
     [        nan -1.56610693 -0.25833709 ..., -0.29008832 -0.29704981
      -0.15036591]
     [        nan  0.82737724  0.20276197 ..., -0.29008832 -0.29704981
      -0.1988716 ]]


# Create Model

Now that we have all of our data loaded in and preprocessed, we can start on creating our model. This component is pretty open ended. You have the freedom to choose whichever model you'd like to create. If you need inspiration, take a look at the code for linear regression and logistic regression in the week2 and week3 folders. A few other reminders:

- Think about what types of objects you'll need to create. Placeholders, variables, optimizers, etc
- Think back to how we created the linear regression and logistic regression models. 


```python
# TODO Create your model here
lr = .01 # the learning rate
batch_size = 128 # the number of examples we will consider per iterations
n_epochs = 2500 # the number of iterations we will do
# TODO: Create placeholders for X (our features) and Y (our labels)
X_hold = tf.placeholder(tf.float32, [None, X.shape[1]])
Y_hold = tf.placeholder(tf.float32, [None, Y.shape[1]])


w = tf.Variable(tf.truncated_normal(shape = [X.shape[1], Y.shape[1]], stddev=0.01), name = 'w')
b = tf.Variable(tf.zeros([1, 1]), name = 'b')

logits = tf.matmul(X_hold, w) + b
loss = tf.reduce_mean(tf.nn.sigmoid_cross_entropy_with_logits(logits = logits, labels = Y_hold))
opt = tf.train.GradientDescentOptimizer(learning_rate = 0.1).minimize(loss)
cp = tf.equal(tf.argmax(logits, axis = 1), tf.cast(Y_hold, dtype = tf.int64))
acc= tf.reduce_mean(tf.cast(cp, tf.float32))
sess = tf.InteractiveSession()
init = tf.global_variables_initializer()
sess.run(init)
for i in range(10000):
    if len(y_train.shape) == 1:
        y_train = y_train.reshape((y_train.shape[0], 1))
    sess.run(opt, feed_dict = {X_hold: X_train, Y_hold: y_train})
    if i % 100 == 0:
        if len(y_train.shape) == 1:
            y_train = y_train.reshape((y_train.shape[0], 1))
        l = loss.eval(feed_dict = {X_hold: X_train, Y_hold: y_train})
        print("loss: {}".format(l))
a = acc.eval(feed_dict = {X_hold: X_test, Y_hold: y_test})
print(a)

```

    loss: 250678.5625
    loss: 28739.490234375
    loss: 44614.37109375
    loss: 38531.62109375
    loss: 102167.78125
    loss: 101966.703125
    loss: 152069.984375
    loss: 64315.890625
    loss: 35330.796875
    loss: 63122.50390625
    loss: 16132.6201171875
    loss: 125917.9140625
    loss: 24268.763671875
    loss: 82141.109375
    loss: 46447.57421875
    loss: 7690.41162109375
    loss: 63021.59375
    loss: 250575.421875
    loss: 235694.4375
    loss: 118510.859375
    loss: 8583.3369140625
    loss: 8934.5361328125
    loss: 48401.9140625
    loss: 80947.9140625
    loss: 19777.6328125
    loss: 117079.5703125
    loss: 9368.3857421875
    loss: 126977.5546875
    loss: 46854.109375
    loss: 19823.0546875
    loss: 38916.54296875
    loss: 104362.609375
    loss: 43819.5078125
    loss: 29292.509765625
    loss: 82773.0625
    loss: 96821.3984375
    loss: 231241.609375
    loss: 58788.15625
    loss: 18894.4609375
    loss: 54967.6484375
    loss: 97964.7890625
    loss: 10475.65625
    loss: 27148.34765625
    loss: 118247.9296875
    loss: 226313.296875
    loss: 26940.796875
    loss: 223620.125
    loss: 45561.45703125
    loss: 206861.75
    loss: 48157.84375
    loss: 36913.125
    loss: 8928.0869140625
    loss: 51866.40234375
    loss: 103074.703125
    loss: 46238.33984375
    loss: 34007.1875
    loss: 200766.5625
    loss: 9973.1357421875
    loss: 16200.841796875
    loss: 10957.2578125
    loss: 50686.69921875
    loss: 206631.28125
    loss: 17606.9765625
    loss: 45384.5703125
    loss: 211457.53125
    loss: 16930.12890625
    loss: 45694.29296875
    loss: 209486.46875
    loss: 16328.705078125
    loss: 46469.88671875
    loss: 205581.296875
    loss: 44419.4609375
    loss: 208269.265625
    loss: 14647.564453125
    loss: 16388.40234375
    loss: 42964.8671875
    loss: 71500.5234375
    loss: 48931.6015625
    loss: 106241.078125
    loss: 49490.57421875
    loss: 18712.5859375
    loss: 99140.1015625
    loss: 45830.453125
    loss: 18923.31640625
    loss: 99637.4140625
    loss: 47340.515625
    loss: 19042.294921875
    loss: 98253.53125
    loss: 48093.359375
    loss: 18364.201171875
    loss: 11573.908203125
    loss: 15641.412109375
    loss: 41333.9921875
    loss: 191603.96875
    loss: 13521.6572265625
    loss: 11900.71484375
    loss: 197615.828125
    loss: 186272.0625
    loss: 18176.75
    loss: 18685.546875
    0.663677


# Train Model

Now that you've created your model by defining your computational graph, you're ready to start training the model. Remember that training model basically means that we want to run our optimizer object over different parts of our training dataset. A few other reminders:
- Remember to create a Tensorflow session and initialize all of your variables
- Run your optimizer object at every iteration
- Keep track of how your model is doing every now and again


```python
numIterations = 1000 # Adjust this number as you see fit!
# TODO Create session and initialize variables
for i in range(numIterations):
    ...
    # TODO Run optimizer object over your data
    # TODO Check accuracy every once in a while
```

# Test Model

By now, you have a trained model and you're almost ready to submit! We want to now see how our model does on data that it has never seen before. We want to compute our predictions for the test set. We will then submit these predictions to Kaggle in order to see how accurate we are. A few reminders:
- Remember that preprocessing you did for the training dataset? You'll need to do that same preprocessing for this test set as well. 
- No need to initialize variables or anything. Everything is already trained! We just want to compute our predictions for this new set of data. 


```python
titanicTest = pd.read_csv('Data/test.csv')

# TODO Do the same data preprocessing you did for the train set
# TODO Compute the predictions for the testing set by evaluating your logits/normalized logits variables
# TODO Check that the predictions are the correct dimensionality 
```

# Create Kaggle Submission

It's very important to be familiar with the exact Kaggle submission format. We basically want to create a CSV file where the first line of the CSV has the column names '' and '' (this will be different from competition to competition). The following lines will be contain the id number for the test as well as the prediction for that example.


```python
import numpy as np
import csv

firstRow = [['id', 'pred']]
with open("predictions.csv", "w") as f:
    writer = csv.writer(f)
    writer.writerows(firstRow)
    # TODO write the id number and the predictions you got from the last step!
    # HINT: Using a for loop might be helpful
```

Once you have the predictions.csv file, you can go ahead and submit to Kaggle! Great job!



