---
layout: post
title: Fake News Classification Using Spark
---


![_config.yml]({{ site.baseurl }}/images/spark.png)

  Fake news and the credibility of news articles have been a central issue of in today's digitized society. Fake news in this context is defined as a news article that spreads inaccurate or false information that can influence the political opinion of a reader. This is an important issue because of how quickly these news articles can travel through social media sites like Facebook and Twitter. Spark's MLib (Machine Learning Library) Framework is capable of creating pipelines that ingest and preprocess the text documents,train statistical models, and distribute the workload across several nodes.



## Machine Learning Pipeline
\hspace{\parindent} A pipeline can be thought of as an object that holds the automated steps required to take raw text and apply a machine learning model for classification. These pipelines can be applied to multiple machines, making them ideal for our Cross-Validation process.

#### Tokenizer
\hspace{\parindent} A Tokenizer is an object in PySpark's ML Library and is used to to break up text into words. It is crucial that each document is represented as a bag of words model. 

#### Stop Words Removal
\hspace{\parindent} Once the document has been broken down to individual words, the next step is to remove unnecessary words that add noise to the model. Stop words are words that don't have predictive power in the model. These include words such as "the" and "of". 
\subsection {Count Vectorization}
\hspace{\parindent} After removing stop words, what is left with is a bag of words for each text. With this bag of words, a count vectorizer is used to get the count of how many times a word occurs in a particular piece of text. This will give us our term frequencies of a particular word i in article j.\\


 Term Frequency = $TF_{i,j}$
#### IDF Estimator
\hspace{\parindent} Once the term frequencies for each piece of observation are generated, it imperative to score each individual piece of text. Words that are common throughout the text should have a lower weight in predictive power as opposed to words that are rare. An Inverse Document Frequency is used to find the relevance of words by mapping their term frequency within its respective text to their appearance in other pieces of text. In the equation below, N is the total number of documents $DF_{i}$ is the total number of documents containing the word i. Using this information, a weight W can now be applied to a word i belonging in document j.\\


 IDF = $log \frac{N}{DF_{i}}$\\




#### Vector Assemblage
\hspace{\parindent} The next step is to take the output from the above processes and prepare them for a statistical model. A Vector Assembler will transform a set of inputs and vectorize them using a TF-IDF weight. A weight for word i in document j is defined as the Term Frequency Score multiplied by its Inverse Document Estimator.[1]\\

$W_{i,j} = TF_{i,j} \times IDF$

#### Naive Bayes Learning Model
\hspace{\parindent} Naive Bayes is a popular machine learning algorithm for text classification. It uses Bayes Rule to find estimate the maximum likelihood that a given piece of text belongs to a class.[2]\\
\begin{equation}
\label{eq:bayes}
P(\textbf{C}|\textbf{D}) = \frac{P(\textbf{D} |\textbf{C})\times P(\textbf{C})}{P(\textbf{D})} 
\end{equation}

\begin{enumerate}
	\item $P(\textbf{C}|\textbf{D})$ is the conditional probability the document D belongs to class C. This is also called our posterior probability. 
	\item $P(\textbf{D})$ is the evidence. In this case, it is the series of words that make up an article.
	\item $P(\textbf{D}|\textbf{C})$ is the likelihood. It can be interpreted as the probability of the evidence given the hypothesis is true.
	

\end{enumerate}

\hspace{\parindent} Naive Bayes is a supervised learning algorithm, meaning that we will use a set of labeled data to learn from and predict the outcomes on an unlabeled data.[3]

#### Naive Bayes: Laplace Smoothing Parameter
\hspace{\parindent} The Cross Validation process will attempt to find the optimal value for the Laplace Smoothing Parameter in the Naive Bayes Model. The default value is set to one, and grid of candidate values will be fed into a Cross Validation object.[2]
