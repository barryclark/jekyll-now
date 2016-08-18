---
layout: post
title: How we're using Machine Learning to change the current state of disease detection
---

Diagnosing medical conditions such as sickle cell disease can become much, much faster. 
![A sickle cell next to a healthy cell.](https://raw.githubusercontent.com/rohan-varma/rohan-blog/master/images/sickle2.png "A sickled cell next to a healthy cell.")

During my past year at UCLA, I had the opportunity to work as an undergraduate researcher in a biotechnology related lab. The project I was working on with a couple of other undergrads under a postdoc aimed to streamline the process of identifying sickle cell disease through image processing and machine learning. My work involved leveraging machine learning algorithms and creating heuristic methods to operate on high-dimensional data and classify different cells quickly.

### Some background on Sickle Cell Disease
Sickle cell disease is a disease in which the patient’s red blood cells take on a slim and pointed shape as opposed to a wholesome, cylindrical red blood cell. This is an inherited red blood cell disorder, and those with the disease have an abnormal hemoglobin, hemoglobin S, in their red blood cells. This in turn results in cells that are not flexible and tend to stick around to vessel walls, which results in reduced oxygen flow to nearby tissues. This causes chronic pain, as well as sudden bursts of extreme pain that requires hospitalization. This disease currently has no complete cure; however, the symptoms of this disease can be managed and a normal life can be led through the use of medication. A caveat, however, is that this disease must be quickly diagnosed, and treatment must begin quickly if the patient is to survive and lead a healthy life.

### The Current State of Sickle Cell Disease Diagnosis
In the United States, newborn children are required to undergo tests that detect this disease, so it is diagnosed and treated rather quickly. Typically, the blood sample is sent out to an external lab and in a day or two, results of the diagnosis are returned. However, only a small portion of sickle cell disease cases occur in the United States and the rest of the developed world – the vast majority of cases occur in the region of Sub-Saharan Africa, where access to clean water is extremely difficult, let alone having the opportunity for a new born child to be screened for this deadly disease. What we have then is a grim situation: a region where sickle cell disease is much more commonly inherited, and medical technology that is insufficient to rapidly diagnose this disease, resulting in a lot of unnecessary suffering and death.

![A map of regions with sickle cell disease.](https://raw.githubusercontent.com/rohan-varma/rohan-blog/master/images/map1.png "A map of regions with sickle cell disease.")

### Why we need to improve it 
As discussed, these unnecessary deaths – on average, about 200,000 per year – are due to lacking technology in the diagnosis of sickle cell disease. A current method in detecting this deadly disease is blood cell analysis. This is called _cell morphology_, the medical practice of analyzing a patient’s blood cells in order to diagnose a condition. For over 150 years, this has been a primary approach to medicine in general – malaria, chronic disease, and pathogens along with sickle cell disease are just some of the conditions detected through this method. 

However, despite the importance of blood cell analysis in the medical industry, the process has not changed for over a century. The patient visits a doctor, gets a blood sample withdrawn, allows for some time for an expert to analyze his or her blood, and then, in a couple days or sometimes a few weeks, receives back a full blood report. In countries such as the United States and other developed nations, this method to diagnose sickle cell disease works primarily because the component requiring the expertise of the pathologist only takes a day or two to complete, and the blood samples can be stored securely in an ideal state during the interim. 

However, places such as those in Sub-Saharan Africa do not have this luxury: access to a trained medical expert who can analyze blood samples is limited, and so is the ability to quickly relay lab test results and store samples properly.  

### Automated Detection Via Blood Image Analysis
Our solution relies on a portable cell phone with a microscope lens attachment as well as associated software that allows the detection and labelling of sickle cells. Together, the hardware and software components work together to provide a rapid and efficient diagnosis without the need of a pathologist.

![Phone and sickle cell slide.](https://raw.githubusercontent.com/rohan-varma/rohan-blog/master/images/phone3.png "Phone and sickle cell slide.")

### First step: Preprocessing the Data and Feature Selection 
We're now at the computation intensive portion of the project - the problem of classifying images of cells. First, we determined the labels we wanted to predict. These were simply the three types of cells we wanted to detect - red blood cells, white blood cells, and sickle cells. 
Next, we wanted some way to describe each cell present in an image. Given an image with hundreds of cells, we wanted to:

       1. Locate each cell
       2. Run an algorithm on this region to extract several key features to describe this cell. 
       
Locating a cell in an image of several hundred cells wasn't exactly trivial. We decided to use a **hough transform**, a transformation that is designed to detect lines in images. This transformation allowed us to detect rough boundaries of circular regions in the image. We ended up with 665 detected cells in our smartphone-captured image. 

![Successfully identified cells.](https://raw.githubusercontent.com/rohan-varma/rohan-blog/master/images/sickletrialexample.jpg "Successfully identified cells.")

Now, we sought to quantify this data - represent it in a way so that we can easily do some calculations and computations on it. This brings in the idea of a _feature_ - a single property of the object under analysis. For houses, this could be the number of bedrooms in the house or the lot size of the house. For images, features can include the RGB values for each pixel, the intensity and shade for each pixel, or the saturation of a pixel. They tend to be numerical or boolean qualities, but really can be anything. 

Several features allow us to accurately represent an object - I could represent a house with the following vector of features - ```{numBedrooms, numBathrooms, lotSize, isNearSchool] = {4, 3, 3000, 1}```. Similarly, each detected cell can be represented by a vector of features we can extract from it - [we used Matlab's regionprops](http://www.mathworks.com/help/images/ref/regionprops.html) to extract several features of the cell, such as its area, eccentricity, Euler number, mean intensity, and weighted centroid. We ended up with a total of 28 features for each of the 665 cells. 

### Unsupervised Machine Learning Using K-means
Since these data did not have any labels associated with them yet (we sent off the images to a pathologist who'd manually label the cells to provide a training dataset), I decided to see if I could find any patterns or similarities in the data. 

One way to do this is by using the `kmeans` algorithm. This algorithm takes in a set of data and assigns each data point to a cluster of other similar data points. This is done through computing a `centroid`, or mean vector, for each cluster. Each time a new data point is added to a cluster, its centroid is recomputed. Here's a visualization of the kmeans algorithm: 

![K-means visualization.](https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/EM-Gaussian-data.svg/2000px-EM-Gaussian-data.svg.png "K-means visualization.")

The hope was that clustering the data would produce three distinct regions: a sickle cell region, a red blood cell region, and a white blood cell region. Sure enough, our cells clustered into three regions, similar to the below visualization: 

![Three clusters.](https://raw.githubusercontent.com/rohan-varma/rohan-blog/8adec4c1cafdf272117ed143382bfd1825b74e7c/images/kmeans.jpg
 "Three clusters.")

In reality, the actual clusters were a little more complicated - each cluster is a subspace of 28 (our number of features) dimensional space. To classify a cell, we'd specify it's feature vector and compute its distance to each of the centroids.

As an example, we might end up with an unlabeled cell being a distance _d_ away. If _d_ is within our maximum distance threshold (given by the distance the furthest correctly labelled cell is away from its centroid), we'd assign it to that cluster and recompute the centroid accordingly. So our algorithm might look something like this: 

<script src="https://gist.github.com/rohan-varma/d8b4f3fd4fa93a45c4b4048f0c5df6d6.js"></script>

  
  
  
  


### Bootstrap Aggregation
Finally, we sought to use the Bootstrap Aggregation (also known as Bagging) machine learning technique in order to build a reliable classifier to accurately predict labels of new cells. This required the use of the **Bootstrap Method**, a statistical method that produces an estimate of a statistic (for example, the mean of a population) using parameters (for example, the mean of a sample from the population) from various samples. 

Concretely, we could use the Bootstrap method to predict the average pixel intensity for red, white, and sickle cells, given the intensities of our training data set. For any set of cells, this would involve: 

       1. Choosing a random sub-sample of the set. 
       2. Computing the mean of this sub-sample. 
       3. With replacement, repeat the two above steps until many (we used 100) means are computed. 
       4. Take the average of these means as an estimate for the population's mean. 
       
This process can be generalized to estimate any kind of quantity or feature used in machine learning. Bagging, or Bootstrap Aggregation, is the generalization of this bootstrapping concept to machine learning algorithms that are sensitive to the data they are trained on, meaning that even a slight variation in training data can cause such an algorithm to classify future input differently. An example of such algorithms are decision trees, and they are known as "high-variance classifiers". 

Using the Bootstrap idea, we can enhance such algorithms by training several different decision trees (we trained 100 such trees) with a different sub-sample of our data. As a result, each tree will be trained on a slightly different set of data and will thus classify cells differently. When we input a new feature vector representing an unclassified cell, these decision trees will "vote" on its label and the most-picked label will be the classification of this new cell. This method reduces variance and the impact of the specific training data we used, and thus yields a more reliable classifier. Here's a visualization of the bagging algorithm: 

![Bagging visualization.](https://raw.githubusercontent.com/rohan-varma/rohan-blog/master/images/bagging.png
 "Bagging visualization.")
 
Using Matlab's [TreeBagger](http://www.mathworks.com/help/stats/treebagger.html), we trained a bootstrap aggregating classifier to operate on our dataset of cells. Using a 90/10 training to test data ratio, we managed to achieve an **82.3%** accuracy in classifying sickle cells. 

### A Small Tweak To Improve Accuracy

After having some success with our Bootstrap Aggregation techniques, we did some additional research to see whether there were any simple tweaks we could make to our learning algorithm in order to improve our accuracy. Looking at decision trees further, we realized that even though we are creating many decision trees that train on different sub-samples, these trees still ended up with **high correlation in their predictions**. Why was this? 

The answer lies in the details of the implementation of decision trees, and involves diving into the nitty-gritty of CS theory. It turns out that the problem of making a decision tree "learn" is **NP complete**, meaning, in simple terms, that there's no efficient solution to the problem (but a potential solution can be quickly verified). Instead of using the inefficient solution, a **heuristic**, such as the **greedy algorithm** is used. A heuristic is essentially a problem solving technique that is used to get an efficient but approximate solution when the exact solution either does not exist or is highly inefficient. Decision trees use a **greedy algorithm** that minimizes error in each stage, hoping that this will also minimize the overall error. 

With that background out of the way, we can now proceed to improve our bootstrap aggregation method. The decision tree's greedy algorithm works by iterating over all the features and feature values we input to it to find a local error minimization. As each of the many trees we trained had access to all of the features from our dataset, the classification models outputted turned out to be highly correlated, even though they came from different subsamples of our original sample. A fix to this issue was then clear: we had to apply the same bootstrapping techniques to our number of features as we did to our original dataset. 

We tweaked our decision trees so that each tree only knows about a random subset of features (say, 10 of our 28 features) from our original list of features. Now, since each of our 100 decision trees were training on a different set of features, they were weakly correlated (as opposed to strongly correlated) classifiers. With this small tweak, and some adjustment of our number of random features we'd allow each decision tree to know about (we ended up using 16), we achieved an accuracy of **86.8%**!

### Conclusions and Future Work

Our final results are encouraging of further work into this field, but they aren't optimal - use in the medical field definitely requires diagnosis accuracy of over 99.9%, and an essential gaurantee of no type II errors, or false negatives (a case where a sickle cell diseased individual is told they don't have the disease). Future work involves additional adjustments to our preprocessing pipelines and machine learning algorithms. One exciting thing we're looking into is using Artifical Neural Networks to aid in our detection, a method that has previously been [researched in cancer detection](http://www.ncbi.nlm.nih.gov/pubmed/1748845).

And that's it! We presented our work at several research days and seminar, including UCLA's annual undegraduate research day and the 2016 UC Bioengineering Symposium. If you have any questions, feel free to contact me!
