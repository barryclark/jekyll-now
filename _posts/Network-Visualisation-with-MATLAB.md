---
layout: post
title: Network Visualisation with MATLAB
---

For a recent university project we were analysing large networks. We used the [Standford Network Analysis Project (SNAP)](http://snap.stanford.edu) to perform a number of operations on any [dataset](http://snap.stanford.edu/data/index.html) we wanted. We searched for a large dataset as we believed it could yeild some pretty interesting results. We settled on the [California Road Network](http://snap.stanford.edu/data/roadNet-CA.html) where nodes represent either an intersection, or end point (dead end) and the edges represent the roads between them. The website states that this is an undirected edge but we found during the visualisation that there is infact directed edges.

There are some quite interesting things to notice about the dataset when you perform some network anaysis on it. However we were interested in producing some kind of visual for our presentation.

# Visualisation

Given that the dataset contains 1965206 nodes, the adjaency matrix would be [1965206 X 1965206] large and if each element is represented as an integer (4 bytes), the size of the matrix is around **3596GB** so that was out of the question. Using the SNAP tools, we could calculate the communities within the matrix.

We were able to extract a matrix of a few thousand nodes and visualise that.

## Using MATLAB

Once you've downloaded and extracted the dataset from SNAP, navigate to that folder using the bar just below the ribbon. You can import the data by either using the **Import Data** button on the ribbon, or by typing `roadNet-CA = textread('roadNet-CA.txt')`. Note that if you use this second command method you'll need to delete the first few lines which contain the hash symbol.

To extract a specific community you'll need to also load in the communities to MATLAB. If you place
