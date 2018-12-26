---
layout: post
title: Fake News Classification Using Spark
---

![_config.yml]({{ site.baseurl }}/images/santander/spark.png)



  Fake news and the credibility of news articles have been a central issue of in today's digitized society. Fake news in this context is defined as a news article that spreads inaccurate or false information that can influence the political opinion of a reader. This is an important issue because of how quickly these news articles can travel through social media sites like Facebook and Twitter. Spark's MLib (Machine Learning Library) Framework is capable of creating pipelines that ingest and preprocess the text documents,train statistical models, and distribute the workload of cross-validation across several nodes.



## What Is Apache Spark?
 Spark is a fast, open-source ,in-memory, data processing engine with a slew of API's and libraries that give data scientists the ability to execute expensive workloads that require iterative access to large datasets. Spark is built on top of the Hadoop YARN Architecture, which enables a cluster to share and distribute Spark programs and data. One big advantage to Spark is that it allows the dataset to be cached in the memory of each worker node. This allows for faster data reads, which is ideal for iterative machine learning algorithms that constantly need to be fed data in order to optimize parameters.[8] 


## Machine Learning Pipeline
A pipeline can be thought of as an object that holds the automated steps required to take raw text and apply a machine learning model for classification. These pipelines can be applied to multiple machines, making them ideal for our Cross-Validation process.

#### Tokenizer
 A Tokenizer is an object in PySpark's ML Library and is used to to break up text into words. It is crucial that each document is represented as a bag of words model. 

#### Stop Words Removal
 Once the document has been broken down to individual words, the next step is to remove unnecessary words that add noise to the model. Stop words are words that don't have predictive power in the model. These include words such as "the" and "of". 
 
 
#### Count Vectorization
\hspace{\parindent} After removing stop words, what is left with is a bag of words for each text. With this bag of words, a count vectorizer is used to get the count of how many times a word occurs in a particular piece of text. This will give us our term frequencies of a particular word i in article j.


![_config.yml]({{ site.baseurl }}/images/fakenews_spark/tf_score.png)

#### IDF Estimator
 Once the term frequencies for each piece of observation are generated, it imperative to score each individual piece of text. Words that are common throughout the text should have a lower weight in predictive power as opposed to words that are rare. An Inverse Document Frequency is used to find the relevance of words by mapping their term frequency within its respective text to their appearance in other pieces of text. In the equation below, N is the total number of documents $DF_{i}$ is the total number of documents containing the word i. Using this information, a weight W can now be applied to a word i belonging in document j.\\

![_config.yml]({{ site.baseurl }}/images/fakenews_spark/idf.png)



#### Vector Assemblage
The next step is to take the output from the above processes and prepare them for a statistical model. A Vector Assembler will transform a set of inputs and vectorize them using a TF-IDF weight. A weight for word i in document j is defined as the Term Frequency Score multiplied by its Inverse Document Estimator.[1]

![_config.yml]({{ site.baseurl }}/images/fakenews_spark/tfidf.png)

#### Naive Bayes Learning Model
Naive Bayes is a popular machine learning algorithm for text classification. It uses Bayes Rule to find estimate the maximum likelihood that a given piece of text belongs to a class.[2]

![_config.yml]({{ site.baseurl }}/images/fakenews_spark/nb.png)


1. $P(\textbf{C}|\textbf{D})$ is the conditional probability the document D belongs to class C. This is also called our posterior probability. 
2. \item $P(\textbf{D})$ is the evidence. In this case, it is the series of words that make up an article.
3. \item $P(\textbf{D}|\textbf{C})$ is the likelihood. It can be interpreted as the probability of the evidence given the hypothesis is true.


Naive Bayes is a supervised learning algorithm, meaning that we will use a set of labeled data to learn from and predict the outcomes on an unlabeled data.[3]

#### Naive Bayes: Laplace Smoothing Parameter
The Cross Validation process will attempt to find the optimal value for the Laplace Smoothing Parameter in the Naive Bayes Model. The default value is set to one, and grid of candidate values will be fed into a Cross Validation object.[2]



#### K Fold Cross-Validation

Given that there can multiple possible values for a Laplace smoothing parameter for Naive Bayes model, the next task would be to find the ideal value for our parameter. Spark's Cross Validation can be used to find the optimal value for our parameters.[4]  Before building the cross validation object, a Parameter grid must be defined in order to specify the list of possible combinations for a given machine learning pipeline.[5] 


![_config.yml]({{ site.baseurl }}/images/fakenews_spark/params.png)


For each 6 possible values for the model, the following are accomplished.[4]


	
1. Shuffle the data set randomly
2. Partition the data set into K sections
3. For each unique section 

* Use the unique section as the test set
* Use the remaining data as the training set
* Fit the model on the training data and evaluate on the test set.
* Retain the evaluation metric and discard model.

4.  Summarize the performance of the model using the set of evaluation metrics obtained.


Once a Parameter Grid Object and a Machine Learning Pipeline is established, a Cross Validator object can be created.[6]

![_config.yml]({{ site.baseurl }}/images/fakenews_spark/cv.png)


	
1. The estimator is the pipeline that was created to process the data and train the algorithm
2. EstimatorParamMaps is the Parameter Grid Object. A model will be created for every possible combination of parameters. 
3. Evaluator is the classification method that evaluate the test data.
4. NumFolds is the number of sections our data will be broken into. If our parameter grid is training 6 parameters and the numFolds is set to 10, then the program will run the Naive Bayes algorithm 60 times.
4. The parallelism parameter is the number of threads that each computational node that will evaluate a particular fold. This will give our Cross-Validation process a different level of granularity in terms of parallelism[7]. 


