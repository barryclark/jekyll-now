---
layout: post
title: Kruskal's Algorithm
date: April 16, 2019
time: 15:50 UTC-4
---

This is more of an addendum to [Travelling Salesperson]({{ site.url }}/posts/April/2019-4-15-2Travelling-Sales-Person).
I quickly made a solution to Minimum Spanning Tree problem. This algorithm runs in $$O(\alpha(n)n\log(n))$$ time. This is the Inverse Ackerman function $$\alpha$$, and it grows incredibly slow, $$\alpha (2^{2^{2^{65533}}} - 3) = 4$$. So for all values this algorithm will run for, this is $$O(n\log(n))$$.

The true analysis of this algorithm would be $$O(E\log(E))$$, however our set-up is always a connected graph, so we can just denote it as $$n$$ which would technically be $$V$$. For a more detailed analysis, check Wikipedia's for a simple to follow one [here](https://en.wikipedia.org/wiki/Kruskal%27s_algorithm#Complexity).

![]({{ site.url }}/images/tsp/kruskal1.png)

## Source Code

Click [here]({{ site.url }}/assets/tsp/kruskals-algo.py) for the source file.

```python
# Copyright 2019 Justin Baum
# Kruskals Algorithm
# kruskals-algo.py


import networkx as nx
import matplotlib.pyplot as plt
import networkutils as nu

"""
1. Sort all the edges in non-decreasing order of their weight.
2. Pick the smallest edge. Check if it forms a cycle with the spanning tree formed so far. If cycle is not formed, include this edge. Else, discard it.
3. Repeat step#2 until there are (V-1) edges in the spanning tree
"""

def kruskals(matrix):
  m = len(matrix)
  E = [[i, j, matrix[i][j]] for i in range(m) for j in range(m)]
  E.sort(key = lambda x: x[2])
  walk = []
  dj = list(range(m))
  while len(walk) <= m - 2:
    leg = E[0]
    E = E[1:]
    if find(leg[0],dj) != find(leg[1], dj):
      union(leg[0],leg[1],dj)
      walk.append(leg)
  return walk

### Disjoint Set

def find(i, dj):
  while dj[i] != i:
    i = dj[i]
  return i

def union(i, j, dj):
  a = find(i, dj)
  b = find(j, dj)
  dj[a] = b

def showGraph(V, matrix, walk):
  X = nx.Graph()
  plt.close()
  X.add_nodes_from(V.keys())
  E = list(map(lambda x: x[:2], walk))
  X.add_edges_from(E)
  nx.draw(X, V, with_labels=True)
  plt.savefig('fig.png')

V = nu.gennodes(10)
matrix = nu.makematrix(V)

showGraph(V, matrix, kruskals(matrix))
```