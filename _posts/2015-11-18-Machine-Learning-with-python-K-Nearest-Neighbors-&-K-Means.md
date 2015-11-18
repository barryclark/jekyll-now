---
layout: post
title: Machine Learning with Python - K-Nearest Neighbors & K-Means!
---

![](http://gerardnico.com/wiki/_media/data_mining/basket_analysis_joke.png)


### Difference between K-nearest neighbors and K-means algorithms

Yes they are both different! Most people tend to assume both the algorithms to be similar because of the same 'k' in their names but they are not!

K-nearest neighbors is a classification algorithm which is supervised in nature. You have a list of things already classified into groups, and your goal would be to assign a new thing into the group it is closest to. Here 'k' is the number of the closest things you would check before classifying the new thing. 

K-Means is a clustering algorithm which is unsupervised in nature. You have a list of objects which have a hidden pattern and your goal is to cluster without any guidance. Here k is the number of clusters. 


#### K-Nearest Neighbors with python

Let us assume a scenario where there is an election to vote for the best programming language. Each city gets one vote and you also get the longitude and latitude of the city. 

The idea behind k-nearest neighbors is that if someone voted for a language, their neighbors have a high tendency to be influenced by them and vote similar. So when we try to predict the vote of a new city we see what was the vote of their closest neighbor and assume they vote the same.  

So the input variables are: 

- Longitude
- Latitude
- City name

```
cities = [(-86.75,33.5666666666667,'Python'),(-88.25,30.6833333333333,'Python'),(-112.016666666667,33.4333333333333,'Java'),(-110.933333333333,32.1166666666667,'Java'),(-92.2333333333333,34.7333333333333,'R'),(-121.95,37.7,'R'),(-118.15,33.8166666666667,'Python'),(-118.233333333333,34.05,'Java'),(-122.316666666667,37.8166666666667,'R'),(-117.6,34.05,'Python'),(-116.533333333333,33.8166666666667,'Python'),(-121.5,38.5166666666667,'R'),(-117.166666666667,32.7333333333333,'R'),(-122.383333333333,37.6166666666667,'R'),(-121.933333333333,37.3666666666667,'R'),(-122.016666666667,36.9833333333333,'Python'),(-104.716666666667,38.8166666666667,'Python'),(-104.866666666667,39.75,'Python'),(-72.65,41.7333333333333,'R'),(-75.6,39.6666666666667,'Python'),(-77.0333333333333,38.85,'Python'),(-80.2666666666667,25.8,'Java'),(-81.3833333333333,28.55,'Java'),(-82.5333333333333,27.9666666666667,'Java'),(-84.4333333333333,33.65,'Python'),(-116.216666666667,43.5666666666667,'Python'),(-87.75,41.7833333333333,'Java'),(-86.2833333333333,39.7333333333333,'Java'),(-93.65,41.5333333333333,'Java'),(-97.4166666666667,37.65,'Java'),(-85.7333333333333,38.1833333333333,'Python'),(-90.25,29.9833333333333,'Java'),(-70.3166666666667,43.65,'R'),(-76.6666666666667,39.1833333333333,'R'),(-71.0333333333333,42.3666666666667,'R'),(-72.5333333333333,42.2,'R'),(-83.0166666666667,42.4166666666667,'Python'),(-84.6,42.7833333333333,'Python'),(-93.2166666666667,44.8833333333333,'Python'),(-90.0833333333333,32.3166666666667,'Java'),(-94.5833333333333,39.1166666666667,'Java'),(-90.3833333333333,38.75,'Python'),(-108.533333333333,45.8,'Python'),(-95.9,41.3,'Python'),(-115.166666666667,36.0833333333333,'Java'),(-71.4333333333333,42.9333333333333,'R'),(-74.1666666666667,40.7,'R'),(-106.616666666667,35.05,'Python'),(-78.7333333333333,42.9333333333333,'R'),(-73.9666666666667,40.7833333333333,'R'),(-80.9333333333333,35.2166666666667,'Python'),(-78.7833333333333,35.8666666666667,'Python'),(-100.75,46.7666666666667,'Java'),(-84.5166666666667,39.15,'Java'),(-81.85,41.4,'Java'),(-82.8833333333333,40,'Java'),(-97.6,35.4,'Python'),(-122.666666666667,45.5333333333333,'Python'),(-75.25,39.8833333333333,'Python'),(-80.2166666666667,40.5,'Python'),(-71.4333333333333,41.7333333333333,'R'),(-81.1166666666667,33.95,'R'),(-96.7333333333333,43.5666666666667,'Python'),(-90,35.05,'R'),(-86.6833333333333,36.1166666666667,'R'),(-97.7,30.3,'Python'),(-96.85,32.85,'Java'),(-95.35,29.9666666666667,'Java'),(-98.4666666666667,29.5333333333333,'Java'),(-111.966666666667,40.7666666666667,'Python'),(-73.15,44.4666666666667,'R'),(-77.3333333333333,37.5,'Python'),(-122.3,47.5333333333333,'Python'),(-89.3333333333333,43.1333333333333,'R'),(-104.816666666667,41.15,'Java')]
cities = [([longitude, latitude], language) for longitude, latitude, language in cities]


```

Since we will be iterating between cities to calculate distance. It is important to have the other cities for a given city. 

```
import matplotlib.pyplot as plt
import math
from collections import Counter

def other_cities(cities):
  for location, actual_language in cities:
            other_cities = [other_city
                            for other_city in cities
                            if other_city != (location, actual_language)]
  return other_cities
```

```
def raw_majority_votes(labels):
    votes = Counter(labels)
    #print votes
    winner, _ = votes.most_common(1)[0]
    #print winner
    return winner

def majority_vote(labels):
    vote_counts = Counter(labels)
    #print vote_counts
    winner, winner_count = vote_counts.most_common(1)[0]
    num_winners = len([count
                      for count in vote_counts.values()
                      if count == winner_count])
    if num_winners == 1:
    #    print winner
        return winner
    else:
        return majority_vote(labels[:-1])


def knn_classify(k, labeled_points, new_point):
    """each labeled point should be a pair (point, label)"""

    # order the labeled points from nearest to farthest
    by_distance = sorted(labeled_points,
                         key = lambda (point, _): distance(point, new_point))

    # find the labels for the k closest
    k_nearest_labels = [label for _, label in by_distance[:k]]
    return majority_vote(k_nearest_labels)

def vector_subtract(v, w):
    return [v_i - w_i
            for v_i, w_i in zip(v, w)]

def dot(v ,w):
    return sum(v_i * w_i
               for v_i, w_i in zip(v, w))

def sum_of_squares(v):
    return dot(v, v)

def magnitude(v):
    return math.sqrt(sum_of_squares(v))

def squared_distance(v, w):
    return sum_of_squares(vector_subtract(v, w))

def distance(v,w):
    return math.sqrt(squared_distance(v, w))
    
def plot_cities():

    plots = {"Java": ([], []), "Python": ([], []), "R": ([], [])}

    markers = {"Java": "o", "Python": "s", "R": "^"}
    colors = {"Java": "r", "Python": "b", "R": "g"}

    for (longitude, latitude), language in cities:
        plots[language][0].append(longitude)
        plots[language][1].append(latitude)

    for language, (x, y) in plots.iteritems():
        plt.scatter(x, y, color=colors[language], marker=markers[language],
                label=language, zorder=10)

    plot_state_borders(plt)
    plt.legend(loc=0)
    plt.axis([-130,-60,20,55])
    plt.title("Favorite Programming Languages")
    plt.show()
    
if __name__ == "__main__":

    for k in [1, 3, 5, 7]:
        num_correct=0
        for location, actual_language in cities:
            other_cities = [other_city
                            for other_city in cities
                            if other_city != (location, actual_language)]
            predicted_language = knn_classify(k, other_cities, location)

            if predicted_language == actual_language:
                num_correct += 1

        print k, "neighbors[s]:", num_correct, "correct out of", len(cities)
        
    plot_cities()

```

output: 

1 neighbors[s]: 40 correct out of 75
3 neighbors[s]: 44 correct out of 75
5 neighbors[s]: 41 correct out of 75
7 neighbors[s]: 35 correct out of 75

![]({{ site.baseurl }}/images/knn.png "k-nn")