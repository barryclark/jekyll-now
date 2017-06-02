---
layout: post
comments: true
title: Writing my own KNearestNeighbors classifier in Python (from scratch)
---

Hello my friends,

I’m revising machine learning by going through the Youtube videos by Google Developers. One of the videos was teaching how to write a scrappy kNN classifier from scratch in Python. The algorithm finds the closest neighbour to the value and classifies the value accordingly. So I think to myself, I can write a proper k-NN classifier from scratch.

The first step is to revise k-NN. I found this [lecture notes](http://www.indiana.edu/~dll/B657/B657_lec_kmeans.pdf) which explains k-NN algorithm in the simplest terms.
1. determine k
2. calculate the distances between the new input and all training data
3. sort the distance and determine k nearest neighbors based on the k-th minimum distance
4. gather the categories of those neighbors
5. determine the category based on majority votes

<!--excerpt-->

I want to base my new classifier on the codes provided in the video.

```python
class ScrappyKNN():
    def fit(self, X_train, y_train):
        self.X_train = X_train
        self.y_train = y_train

    def predict(self, X_test):
        predictions = []
        for row in X_test:
           label = self.closest(row)
           predictions.append(label)
        return predictions

    def closest(self, row):
        best_dist = euc(row, self.X_train[0])
        best_index = 0
        for i in range(1, len(self.X_train)):
            dist = euc(row, self.X_train[i])
            if dist < best_dist:
                best_dist = dist
                best_index = i
        return self.y_train[best_index]
 ```

### 1. Determine k
First of all, instead of `closest()`, we want to write a new method called `k_closest()`. This method will have 2 attributes, `row` and `k`, where `row` is the test value and `k` is the number of nearest neighbors we are looking at. This will give us flexibility in determining `k`.

```python
def k_closest(self, row, k):
    pass
```

### 2. Calculate the distances between the new input and all training data
We will use the same method to calculate the euclidean distance as in the example. The difference is we don’t have to find the best distance as we will sort all the values and find the top `k` values later.

```python
def k_closest(self, row, k):
    neighbor_dist = []
    for i in self.X_train:
        dist = euc(row, i)
        neighbor_dist.append(dist)  # compute the distance from all neighbors
```

### 3. Sort the distance and determine k nearest neighbors based on the k-th minimum distance
Now that we have the distance from the test value to all training data, we need to sort them. Numpy has a very useful method which is `argsort()`, which can return the index of the values. However, we’ll need to convert our list to an array in order to apply it.

```python
def k_closest(self, row, k):
    neighbor_dist = []
    for i in self.X_train:
        dist = euc(row, i)
        neighbor_dist.append(dist)  # compute the distance from all neighbors
    ndist = np.array(neighbor_dist) # convert the list of distance into an array
    knn = ndist.argsort()[:k]  # find the index of the k closest values
```

### 4. Gather the categories of those neighbors
We need to use the indices to look up the categories of the train data. We need another list to store the categories of the top k values. Let’s call this list `knn_label`. For each value in our list of indices of the k closest values, we would want to find the corresponding categories in the training data and add it to our `knn_label` list.

```python
def k_closest(self, row, k):
    knn_label = []
    neighbor_dist = []
    for i in self.X_train:
        dist = euc(row, i)
        neighbor_dist.append(dist)  # compute the distance from all neighbors
    ndist = np.array(neighbor_dist) # convert the list of distance into an array
    knn = ndist.argsort()[:k]  # find the index of the 3 closest values
    for j in knn:
        knn_label.append(self.y_train[j])  # categorising
```

### 5. Determine the category based on majority votes
I was stumbled a bit while looking for the best way to simulating this majority voting system. As I studied a lot of Statistics, a simple way to find the most frequently occur element in the list is to by finding the mode. Numpy has a method for that.

```python
from scipy import stats
def k_closest(self, row, k):
    knn_label = []
    neighbor_dist = []
    for i in self.X_train:
        dist = euc(row, i)
        neighbor_dist.append(dist)  # compute the distance from all neighbors
    ndist = np.array(neighbor_dist) # convert the list of distance into an array
    knn = ndist.argsort()[:k]  # find the index of the 3 closest values
    for j in knn:
        knn_label.append(self.y_train[j])  # categorising
    pred = stats.mode(knn_label)[0][0]  # finding the most frequently occured values
return pred.astype(int) #convert the value back to int as mode return float values
```

Somehow `stats.mode()` returns a `float` so I have converted it into `int` as our categories are `int`.

What left to do is to call this method by amending the `predict()` method

```python
def predict(self, X_test):
    predictions = []
    for row in X_test:
        label = self.k_closest(row, 5) # change the number here to increase the number of neighbours
        predictions.append(label)
    return np.asarray(predictions)
```

Now we can run the classifier and evaluate the fit by looking at accuracy score

It gives me 97% accuracy for `k = 5` which sounds about right.

