---
layout: post
title: CNN based Information Retrieval
---
<p align="center">
  <img width="600" height="400" src="{{ site.baseurl }}/images/cnn_search.png">
</p>

Most of the state of the art architectures use sparse inputs like one hot encoding or ngraphs to
represent words. One of the problems with sparse representation is that a huge
amount of data is required to train the network to understand hidden
pattern between query and documents. So, we used word2vec/fastText to represent
each word with dense representation. As an input to the CNN, we use cosine
similarity between query word vectors and document word vectors. For CNN, we use
3\*3 (trigram), 2\*2 (bigram), 1\*1 (unigram) as the filter size. Along with
cosine similarity, we also use Inverse Document Frequency (IDF) for each
query word as the final input to the fully connected layer. The CNNs find
relevant phrase match between query and documents and rates each document based on their
relevance. In order to understand, where in the document network finds
relevant match, we highlight the portion of that text, which network thinks
is the most relevant text in the document that matches with the query. In
order to improve the speed, we optimize the network to perform inferencing
on multi gpu, profiling the network to understand the time taken by each
operation and performing calculation on float16.
