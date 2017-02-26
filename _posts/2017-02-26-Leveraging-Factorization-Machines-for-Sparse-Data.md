---
layout: page
title: Leveraging Factorization Machines for Wide Sparse Data
tags:
- Python
- Machine Learning
summary: A nonlinear model great for sparse data.
---

Taking cues from other disciplines is a great way to expand your data science toolbox. Factorization Machines are particularly successful models for recommendation systems which have led to high scoring results in the Netflix challenge and many Kaggle competitions. In this post, we will apply feature hashing combined with Factorization Machines to a static text classification problem to excellent effect, allowing us to avoid manual feature engineering on text data. We'll go through an example and explain the mathematical background of Factorization Machines in an easy-to-understand simplified fashion.

## Applying Factorization Machines to Free Text

Popular text classification approaches include using a TF-IDF transformations while others might use more sophisticated neural networks with word vectors. There are drawbacks to each approach. The TF-IDF approach [does not have a theoretical backing](https://en.wikipedia.org/wiki/Tf–idf#Justification_of_idf) and in some cases applies a heuristic that may be inappropriate for the problem. For word vectors, one may not have the necessary volume of domain-specific data to train word vectors, the available pre-trained word vectors are insufficient, or they simply want to avoid such complicated approaches due to time constraints.

If you found yourself nodding along to that last paragraph, then this post is for you. As a data science practioner facing multiple deadlines and competing priorities, sometime it's nice to have an approach simply well work out of the box. Here we will explore a recipe which is perfect for handling a large, sparse data set (which free text van be represented as). This approach eschews manual feature engineering and instead allows the data to "speak for itself" through a sophisticated, theoretical model-- great for deadlines!

# The Data

For our example, we will use the "20 Newsgroups" data set that is included with sci-kit learn.


```python
from sklearn.datasets import fetch_20newsgroups
twenty_train = fetch_20newsgroups(subset='train', 
                                  shuffle=True, 
                                  random_state=42)
```

## Label Definition

First, we have to define the label for our classifier and subsequently create some features. The label part is going to be simple, we will label text from any newsgroup with "comp" or "sci" in the label as "1" and otherwise "0". The resulting labels are approximately balanced with 60% of the labels being 0 and 40% being 1.


```python
twenty_train.target_names
```




    ['alt.atheism',
     'comp.graphics',
     'comp.os.ms-windows.misc',
     'comp.sys.ibm.pc.hardware',
     'comp.sys.mac.hardware',
     'comp.windows.x',
     'misc.forsale',
     'rec.autos',
     'rec.motorcycles',
     'rec.sport.baseball',
     'rec.sport.hockey',
     'sci.crypt',
     'sci.electronics',
     'sci.med',
     'sci.space',
     'soc.religion.christian',
     'talk.politics.guns',
     'talk.politics.mideast',
     'talk.politics.misc',
     'talk.religion.misc']




```python
import pandas as pd
def define_label(x, target_names):
    name = target_names[x]
    return 1 if 'sci' in name or 'comp' in name else 0
    
target = pd.Series(twenty_train.target).apply(lambda x : define_label(x,twenty_train.target_names))
```

# "Automatic" Feature Engineering with Feature Hashing

To allow us to train from the data (raw text), we will split the data by spaces and hash the output. Feature hashing is a robust way to create features in many contexts, not only text. It is fundamentally similar to one-hot encoding but can store additional information. As you will see, this simple approach is actually quite powerful, and allows us to avoid many manual feature engineering tasks by employing a more powerful model.

Feature hashing has become popular in the context of online learning. In a feature hashing approach, one does not have to define features upfront, and so a model could be exposed to new data and learn new features over time, including new categorical values for pre-existing features. It also has the benefit of storing the data in a very small (and fixed) memory footprint which is great for learning on large data with a huge number of features (like text!).

So how does feature hashing work? Here's a simplified explanation. Imagine if up front you define a fixed hash table of a given size in which to store objects (or more precisely, references to objects). A hash table can be thought of as a big array, much bigger than you probably need, and then you identify a function that maps objects to indices for the array, and the object is stored in the box represented by that index. The function that assigns the index is called a hash function. In fact, a python dictionary is nothing more than a hash table implementation (or HashMap for you Java users).

For a suitably large hash table, and well chosen hash function, you expect every object to be assigned a unique index. However, this is NOT guaranteed. When two objects have the same hash value, a "collision" occurs. Collisions are exceedingly rare, but if your objects are individual strings, and lots of different strings, the likelihood is slightly higher. This originally was thought to be a flaw in the approach; however the current wisdom is that this actually acts as a form of regularization for a model, helping to prevent overfitting.

The short of it is-- hash away! It's very convenient and it allows you to skip a tedious feature engineering portion while maintaining much of the utility if a proper modeling approach is utilized.


```python
def clean_text(text):
    # Leaving in symbols, special characters and blank strings
    return text.split(' ')

X = [clean_text(x) for x in twenty_train.data]

from sklearn.feature_extraction import FeatureHasher

# Hash away!
fh = FeatureHasher(input_type='string',non_negative=True)
X_t = fh.transform(X)

X_t
```




    <11314x1048576 sparse matrix of type '<class 'numpy.float64'>'
    	with 1917599 stored elements in Compressed Sparse Row format>



# Sparse Data

A sparse matrix only stores nonzero values, which makes it a memory efficient format. Sparse data can allow you to leverage more raw information than you can store in memory in a "dense" format, meaning a matrix with 0's filled in. The sci-kit learn implementation of feature hashing results in a sparse matrix.

### Drawbacks

Some nonlinear models do not perform well against sparse data and many are not implemented to use sparse data at all. Training can also become prohibitively long in these cases.

As the number of features increases, tree based models built by the CART algorithm (like sklearn's decision trees) become exceedingly slow to train because they evaluate a subset ($$\subseteq$$) of the features at every split. Above, our sparse matrix technically has over 1 million features, due to the size of the hash table. To alleviate this you may choose a lower number of features to evaluate at each split or shallower trees, but then you may have to build more trees to be performant.

In the case of a neural network, you can run into issues as the number of weights increases. In our case, we also do not have a large volume of training examples (~ 11k). Depending on how the library is implemented, there can be hard limits on the memory usage of the weights of the hidden layers (for example, H2O's H2ODeepLearningEstimator model).

You could reduce the dimension of the inputs, but this may not help performance either due to the noise present in the data. Using a Truncated SVD (similar to PCA but works better for sparse data) will degradate information in your raw features and the goal is the leverage the total of the information available to the algorithm.

# Baseline Model: SVM

First, we will attempt to train a (linear) SVM model on the raw, hashed features to get a baseline for the performance. Linear models are a good starting point for sparse data as they can train quickly and also benefit from the enlarged feature space.

We're going to evaluate the model's accuracy score via cross validation. Typically, any preprocessing of features should be done inside the CV step (with say a pipeline); however a hash function does not depend on the features themselves, and is fixed. This allows you to hash your data upfront rather than during the CV loop for convenience and speed.


```python
from sklearn.model_selection import StratifiedKFold
from sklearn.linear_model import SGDClassifier
from sklearn.model_selection import cross_val_score
import numpy as np
np.random.seed(10)

model = SGDClassifier() # default = SVM

cross_val_score(model, 
                X_t, 
                twenty_train.target, 
                cv=StratifiedKFold(n_splits=5, shuffle=True, random_state=11),
                scoring ='accuracy')
```




    array([ 0.30277655,  0.31332745,  0.33480565,  0.41415929,  0.43503326])



As you can see, the accuracy score is poor and it's probably because the data is too noisy. In fact, if I did basic cleaning (removing \n, \t, and other special characters plus blank chars that remain), the accuracy would rise to around .75. Either way, this is not good, but the model is (generalized) linear. Rather than resort to handcrafting features, maybe we can get a boost from a nonlinear model. Unfortunately, most nonlinear models are intractable for such a large, sparse data set either due to memory or runtime constraints as discussed above. However, there is something we can use that is widely employed by recommendation systems: the Factorization Machine.

# Factorization Machines

At their's simplest, factorization machines take a linear regression model and adds quadratic or second order interactions. A basic linear regression for inputs $$x\in \mathbb{R}^n$$ is
\begin{equation}
y(x) = \sum_{i=1}^{n} w_i x_i + c
\end{equation}
for some weights $$w_i$$. Let $$w_{i,j}$$ model the interaction between $$x_i$$ and $$x_j$$. Then the second order interactions can be added via
\begin{equation}y(x) = \sum_{i,j=1}^n w_{i,j}x_i x_j + \sum_{i=1}^{n} w_i x_i + c.\end{equation}


This can be written using the vector ($$\ell^2$$) dot product $$(\cdot, \cdot )$$ and definiting the matrix $$W=[w_{i,j}]_{i,j=1}^{n}$$.

\begin{equation}y(x) = (x, Wx) +  \sum_{i=1}^{n} w_i x_i + c.\end{equation}

The interaction matrix $$W$$ has a few special properties:

    - It is sparse (if the data is sparse)
    - It is typically low rank (due to the sparsity)
    - It is symmetric since the interaction between the i and j factor is the same as between the j and i factor

Therefore, if the matrix $$W$$ is symmetric and of rank $$d$$, one has the equality
\begin{equation} W = V V^T\end{equation}
for some matrix $$V \in \mathbb{R}^{n \times d}$$. This is a consequence of the eigenvalue decomposition of $$W$$. In general, you don't know the rank of $$W$$ but you assume it's low, so you just guess, making $$d$$ a hyperparameter of the model. Therefore $$W\approx VV^T$$ holds. Then you can rewrite the equation using the identity $$(x,Wx) \approx (x,VV^Tx) = (V^Tx, V^Tx)$$, which is true for a very mathematically technical reason. So finally, we can use the identity and define a factorization machine $$y$$ given by the equation

\begin{equation}y(x) := (V^Tx,V^Tx) +  \sum_{i=1}^{n} w_i x_i + c.\end{equation}

Now, $$W$$ had $$n^2$$ entries (with $$n$$ very large), but $$V$$ has $$nd$$ entries. Since typically $$d <<n$$, $$V$$ has a similar order of entries to learn as $$w_i$$, the linear terms. In other words, it's much easier to learn $$V$$ than $$W$$, yet we still get the utility of the concept of $$W$$ modeling the interactions.

## fastFM

We will use the implementation of Factorization Machines from the [fastFM](https://github.com/ibayer/fastFM) library. Conveniently, fastFM implements the sci-kit learn API so you can use the model inside their cross validation tools and pipelines.


```python
from fastFM import sgd
import numpy as np
model2 = sgd.FMClassification(n_iter=5, rank=2)

cross_val_score(model2, 
                X_t, 
                np.array([ 1 if x > .5 else -1 for x in twenty_train.target]),
                cv=StratifiedKFold(n_splits = 5, shuffle=True, random_state=11),
                scoring ='accuracy')
```




    array([ 0.94211224,  0.93548387,  0.93371631,  0.93150685,  0.93854996])



# Visualization

We can use the "latent factors" from the rows of $$V$$ and the hashing function to visualize the data as another type of dimensionality reduction. This approach was used in the Netflix challenge and it was found that the movies were grouped by genre. In our case, we will see that words associated with each label are loosely located together when using the location given by $$V$$.

To visualize the relationships of factors, you can use the first two entries of the vector of $$V$$ which corresponds to the index of the factor. To find this index, we pass the word through the hash function.


```python
import matplotlib.pyplot as plt
%matplotlib inline

# Fit the model to the data to learn V
model2.fit(X_t,np.array([ 1 if x > .5 else -1 for x in twenty_train.target]))
from sklearn.feature_extraction import _hashing # The hashing function we used

words = {}

# Terms that might be found in sci/comp
for word in ['computer','GPU','space', 'keyboard', 'Microsoft', 
             'open source','Tolkien',
             'modem','electronic', 'mouse', 'planetary','orbit']:
    indx = fh.transform([[word]]).indices[0]
    words[indx] = (word, 1)

# Terms in the other groups, probably
for word in ['musket','Republican', 'Toyota', 'newspaper', 
             'Washington Post', 'Fox News', 'couch','GDP',
             'political', 'family' ,'Democrat','democratic']:
    indx = fh.transform([[word]]).indices[0]
    words[indx] = (word, 0)

# Plot the word's locations colored by label
fig, ax = plt.subplots(figsize=(12,12))
x = [model2.V_[0, k]  for k in words.keys()]
y = [model2.V_[1, k]  for k in words.keys()]
color = ['b' if x[1] else 'r' for x in words.values()]
ax.scatter(x,y, color = color)

# Add the words to the plot
for i, v in words.items():
    word, target_class = v
    ax.annotate(word, (model2.V_[0, i], model2.V_[1, i]))
```


![png](../images/fm_sparse/output_14_0.png)


You can see that loosely the words were grouped together by label. This lends more credence to how a linear model or an SVM like model can do well identifying the labels with few errors. There are some interesting ones like "GDP" appearing near "GPU" and other space terms, but you should not read too far into that.

One disadvantage for using the hashing method on some data sets is losing explainability on these simple models. This is in part due to the collisions of the hash function, but also because many times hashing is used as a "one-hot encoder" by making the data set a series of strings "feature=value". In our case, we can actually map strings (which are words in the training set) through the hash function, thus finding their corresponding index in $$V$$. However, there is no way to map backwards from an index to a word uniquely in general, as this would depend on the hashing function.

# Feature Hashing For Non Free Text

Although we have used this approach for text data, it is actually appropriate for any type of data. As we have mentioned, you can arrange your data set in the format of "feature=value" with the hash being a count. Here's an example. Let's say we have a data set where we are trying to predict someone's college major. Imagine some of the columns indicate their preferences:

    favorite_os, favorite_book, favorite_animal 
    
Using one-hot encoding on any of these columns could be problematic on a large data set. However, with feature hashing, we won't have any problems. To encode these features properly, one strategy is as follows:


```python
# Define a row of your data set
columns = ['favorite_os', 'favorite_book', 'favorite_animal']
data_row = ['Linux', 'Excession', 'cat']


new_data_row = ['%s=%s' % (x,y) for x,y in zip(columns, data_row)]
print(new_data_row)
```

    ['favorite_os=Linux', 'favorite_book=Excession', 'favorite_animal=cat']

