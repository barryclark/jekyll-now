---
layout: post
title: Cross-Validation Using Spark
---

## Topics
#### Cross-Validation, Apache Spark, Machine Learning Pipelines, Naive-Bayes Classification

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
 After removing stop words, what is left with is a bag of words for each text. With this bag of words, a count vectorizer is used to get the count of how many times a word occurs in a particular piece of text. This will give us our term frequencies of a particular word i in article j.


![_config.yml]({{ site.baseurl }}/images/fakenews_spark/tf_score.png)

#### IDF Estimator
 Once the term frequencies for each piece of observation are generated, it imperative to score each individual piece of text. Words that are common throughout the text should have a lower weight in predictive power as opposed to words that are rare. An Inverse Document Frequency is used to find the relevance of words by mapping their term frequency within its respective text to their appearance in other pieces of text. In the equation below, N is the total number of documents $DF_{i}$ is the total number of documents containing the word i. Using this information, a weight W can now be applied to a word i belonging in document j.\\

![_config.yml]({{ site.baseurl }}/images/fakenews_spark/idf.png)



#### Vector Assemblage
The next step is to take the output from the above processes and prepare them for a statistical model. A Vector Assembler will transform a set of inputs and vectorize them using a TF-IDF weight. A weight for word i in document j is defined as the Term Frequency Score multiplied by its Inverse Document Estimator.[1]

![_config.yml]({{ site.baseurl }}/images/fakenews_spark/tfidf.png)

#### Let's start by building a pipeline and prepare data for Cross Validation

```python
from pyspark.ml.feature import Tokenizer,StopWordsRemover, CountVectorizer,IDF,StringIndexer
from pyspark.ml.feature import VectorAssembler
from pyspark.ml.linalg import Vector

tokenizer = Tokenizer(inputCol="text", outputCol="token_text")
stopremove = StopWordsRemover(inputCol='token_text',outputCol='stop_tokens')
count_vec = CountVectorizer(inputCol='stop_tokens',outputCol='c_vec', minDF=1, minTF=1)
idf = IDF(inputCol="c_vec", outputCol="tf_idf")
binary_label = StringIndexer(inputCol='label',outputCol='target')
vectors = VectorAssembler(inputCols=['tf_idf'],outputCol='features')
```

#### Build a Pipeline


```python
from pyspark.ml import Pipeline
```


```python
data_prep_pipe = Pipeline(stages=[binary_label,tokenizer,stopremove,count_vec,idf,vectors])
```

#### Fit our pipeline on our dataframe!
```python
cleaner = data_prep_pipe.fit(df)
clean_data = cleaner.transform(df)

```

#### Naive Bayes Learning Model
Naive Bayes is a popular machine learning algorithm for text classification. It uses Bayes Rule to find estimate the maximum likelihood that a given piece of text belongs to a class.[2]

![_config.yml]({{ site.baseurl }}/images/fakenews_spark/nb.png)


1. `P(C|D)` is the conditional probability the document D belongs to class C. This is also called our posterior probability. 
2. `P(D)` is the evidence. In this case, it is the series of words that make up an article.
3. `P(D|C)` is the likelihood. It can be interpreted as the probability of the evidence given the hypothesis is true.


Naive Bayes is a supervised learning algorithm, meaning that we will use a set of labeled data to learn from and predict the outcomes on an unlabeled data.[3]

#### Naive Bayes: Laplace Smoothing Parameter
The Cross Validation process will attempt to find the optimal value for the Laplace Smoothing Parameter in the Naive Bayes Model. The default value is set to one, and grid of candidate values will be fed into a Cross Validation object.[2]



#### K Fold Cross-Validation

Given that there can multiple possible values for a Laplace smoothing parameter for Naive Bayes model, the next task would be to find the ideal value for our parameter. Spark's Cross Validation can be used to find the optimal value for our parameters.[4]  Before building the cross validation object, a Parameter grid must be defined in order to specify the list of possible combinations for a given machine learning pipeline.[5] 


```python

nb = NaiveBayes()
paramGrid = ParamGridBuilder() \
		.addGrid(nb.smoothing, [0.0, 0.2, 0.4, 0.6, 0.8, 1.0]) \
		.build()

```


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

```python
cv = CrossValidator(estimator=data_prep_pipe, estimatorParamMaps=paramGrid,evaluator=BinaryClassificationEvaluator(),
                          numFolds=10, parallelism = 5)
```

	
1. The estimator is the pipeline that was created to process the data and train the algorithm
2. EstimatorParamMaps is the Parameter Grid Object. A model will be created for every possible combination of parameters. 
3. Evaluator is the classification method that evaluate the test data.
4. NumFolds is the number of sections our data will be broken into. If our parameter grid is training 6 parameters and the numFolds is set to 10, then the program will run the Naive Bayes algorithm 60 times.
4. The parallelism parameter is the number of threads that each computational node that will evaluate a particular fold. This will give our Cross-Validation process a different level of granularity in terms of parallelism[7]. 


#### Set Up Cross-Validation
#### Perform a Train-Test Split
We are going to split our data set into two sections, a training set and testing set. Cross-validation will run on the training set, and we will have a hold out set of new data to test the best possible model.

```python
df_cv = df.select(['target','text'])


(training,testing) = df_cv.randomSplit([0.9,0.1]) # 90% training, 10% testing
```


#### Run Cross Validation

```python
cvModel = cv.fit(training)

results = cvModel.transform(testing)
```

#### Get Metrics
We will be using a simple Confusion Matrix to analyze the accurace of our best model.
```python

acc_eval = MulticlassClassificationEvaluator()
acc = acc_eval.evaluate(results)
best_model = cvModel.bestModel


from pyspark.mllib.evaluation import MulticlassMetrics
# Create (prediction, label) pairs
predictionAndLabel = results.select("label", "prediction").rdd

# Generate confusion matrix
metrics = MulticlassMetrics(predictionAndLabel)
print( metrics.confusionMatrix())


DenseMatrix([[ 303., 61.],
              [ 15., 244.]])
```

#### Time Analysis
With the introduction of a parallelism parameter in the Cross-Validator object, a time analysis was conducted to examine the performance across varying levels of parallelism. After using 8 computational nodes, there is no significant speed up in times, in fact, in some instances it performed worse. This is because of the communication overhead it takes to manage the process across a high number of nodes. It also can be noted that a parallelism level of 8 appears to be the sweet spot for this particular task. 

![_config.yml]({{ site.baseurl }}/images/fakenews_spark/time2.png)



#### Conclusion

Spark allows developers to build fast and scalable applications. Spark's built-in MLib library is a versatile framework that can handle various machine learning tasks, such as cross-validation. The Cross-Validator Object in Spark's MLib library gives engineers the ability to define their machine learning pipelines, fix what parameters they want analyzed, and even the level of granularity of parallelism. This gives teams tremendous amount of flexibility on how they distribute work loads. Spark is able to turn a computationally expensive task like Cross-Validation, into an embarrassingly parallel solution. 


#### References
1. Extracting, transforming and selecting features. (n.d.). Retrieved December 3, 2018, from spark.apache.org/docs/latest/ml-features.html$\#$vectorassembler 

2. Jurafsky, D. (n.d.). Text Classification and Naive Bayes. Lecture. Retrieved December 4, 2018, from https://web.stanford.edu/class/cs124/lec/naivebayes.pdf 
	
3. Huang, O. (2017, July 17) Applying Multinomial Naive Bayes to NLP Problems: A Practical Explanation. Retrieved December 4, 2018, from https://medium.com/syncedreview/applying-multinomial-naive-bayes-to-nlp-problems-a-practical-explanation-4f5271768ebf 

4. Brownlee, J. (2018, May 21). A Gentle Introduction to k-fold Cross-Validation. Retrieved December 3, 2018, from https://machinelearningmastery.com/k-fold-cross-validation/ 

5. Portilla, J. (2018) Spark and Python For Big Data, online course, Natural Language Processing. Retrieved November 8, 2018 from https://www.udemy.com/spark-and-python-for-big-data-with-pyspark/learn/v4/t/lecture/7026564?start=485

6.  ML Tuning: Model selection and hyperparameter tuning. (n.d.). Retrieved December 2, 2018, from https://spark.apache.org/docs /latest/ml-tuning.html 
	
7. Pentreath, N., & Cutler, B. (2018, November 2). Model Parallelism in Spark ML Cross Validation. Lecture presented at Spark AI Summit 2018. 

8. What is Apache Spark. (n.d.). Retrieved November 3, 2018, from https://hortonworks.com/apache/spark/ 
	
