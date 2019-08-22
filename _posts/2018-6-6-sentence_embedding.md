---
layout: post
title: Sentence Embedding based Information Retrieval
---

<p align="center">
  <img width="600" height="400" src="{{ site.baseurl }}/images/sentence_embedding_search.png">
</p>

Recent IR papers with CNNs try to match phrases of query with phrases in the
document, i.e ustext-indenting 3\*3 (trigram), 2\*2 (bigram) filters. Most of the
CNNs use either cosine similarity between query and documents or sparse inputs like one
hot encoding or ngraphs to represent query and documents. However, there
has been lot of good work on sentence representation recently, with new
sentence embedding models like Skipthoughts and Smooth Inverse Frequency
(SIF). In this work, we represent query and sentences in the documents
in terms of sentence embedding. Once we compute the sentence embedding,
we compute cosine similarity between query and sentences in the documents
to get most relevant matches. This is used as an input to Neural
Network to extract patterns between query and documents. One of the
advantages of this method is the simplicity, high accuracy and the
computation time required to process one query. After optimizing the
network, we are able to process 100k documents in approximately 2 secs on
single P100 nvidia gpu.
