---
layout: post
title: How we're using Machine Learning to change the current state of disease detection
---

Diagnosing medical conditions such as sickle cell disease can become much, much faster. 
![test text](https://raw.githubusercontent.com/rohan-varma/rohan-blog/master/images/propic.jpg "Logo Title Text 1")


During my past year at UCLA, I had the opportunity to work as an undergraduate researcher in a biotechnology related lab. The project I was working on with a couple of other undergrads under a postdoc aimed to streamline the process of identifying sickle cell disease **through** image processing and machine learning. My work involved leveraging machine learning algorithms and creating heuristic methods to operate on high-dimensional data and classify different cells quickly.

### Some background on Sickle Cell Disease
Sickle cell disease is a disease in which the patient’s red blood cells take on a slim and pointed shape as opposed to a wholesome, cylindrical red blood cell. This is an inherited red blood cell disorder, and those with the disease have an abnormal hemoglobin, hemoglobin S, in their red blood cells1. This in turn results in cells that are not flexible and tend to stick around to vessel walls, which results in reduced oxygen flow to nearby tissues. This causes chronic pain, as well as sudden bursts of extreme pain that requires hospitalization. This disease currently has no complete cure; however, the symptoms of this disease can be managed and a normal life can be led through the use of medication. A caveat, however, is that this disease must be quickly diagnosed, and treatment must begin quickly if the patient is to survive and lead a healthy life.

### The Current State of Sickle Cell Disease Diagnosis
In the United States, newborn children are required to undergo tests that detect this disease, so it is diagnosed and treated rather quickly. Typically, the test data – a blood sample the size of a drop, for example = is sent out to an external lab and in a day or two, results of the diagnosis are returned. However, only a small portion of sickle cell disease cases occur in the United States and the rest of the developed world – the vast majority of cases occur in the region of Sub-Saharan Africa, where access to clean water is extremely difficult, let alone having the opportunity for a new born child to be screened for this deadly disease. What we have then is a grim situation: a region where sickle cell disease is much more commonly inherited, and medical technology that is insufficient to rapidly diagnose this disease, causing many children to unnecessarily decease. 

### Why we need to improve it 
As discussed, these unnecessary deaths – on average, about 200,000 per year – are due to lacking technology in the diagnosis of sickle cell disease. A current method in detecting this deadly disease is blood cell analysis. This is called cell morphology, the medical practice of analyzing a patient’s blood cells in order to diagnose a condition. For over 150 years, this has been a primary approach to medicine in general – malaria, chronic disease, and pathogens along with sickle cell disease are just some of the conditions detected through this method. 

However, despite the importance of blood cell analysis in the medical industry, the process has not changed for over a century. The patient visits a doctor, gets a blood sample withdrawn, allows for some time for an expert to analyze his or her blood, and then, in a couple days or sometimes a few weeks, receives back a full blood report. In countries such as the United States and other developed nations, this method to diagnose sickle cell disease works primarily because the component required the expertise of the pathologist only takes a day or two to complete, and the blood samples can be stored securely in an ideal state during the interim. However, places such as those in Sub-Saharan Africa do not have this luxury: access to a trained medical expert who can analyze blood samples is as limited as access to a clinic and relaying lab test results between these two can require several days and relies on unreliable storage equipment. 

### Automated Detection Via Blood Image Analysis
Our solution relies on a portable cell phone with a microscope lens attachment as well as associated software that allows the detection and labelling of sickle cells. Together, the hardware and software components work together to provide a rapid and efficient diagnosis without the need of a pathologist.


### First step: Preprocessing the Data and Feature Selection 
We're now at the computation intensive portion of the project - the problem of classifying images of cells. First, we determined the labels we wanted to predict. These were simply the three types of cells we wanted to detect - red blood cells, white blood cells, and sickle cells. 
Next, we wanted some way to describe each cell present in an image. Given an image with hundreds of cells, we wanted to: 
- Locate each cell
- Run an algorithm on this region to extract several key features to describe this cell. 

Locating a cell in an image of several hundred cells wasn't exactly trivial. We decided to use a hough transform, a transformation that is designed to detect lines in images. This transformation allowed us to detect rough boundaries of circular regions in the image. We ended up with 665 detected cells in our smartphone-captured image. Next, we created a linear mapping algorithm to map cell regions in this image to our gold standard image, the microscope-captured image. This allowed us to extract 665 regions that contain a single cell in our microscope-captured image. 

[Insert link to image here]
Now, we sought to quantify this data - represent it in a way so that we can easily do some calculations and computations on it. This brings in the idea of a _feature_ - a single property of the object under analysis. For houses, this could be the number of bedrooms in the house or the lot size of the house. For images, features can include the RGB values for each pixel, the intensity and shade for each pixel, or the saturation of a pixel. They tend to be numerical or boolean qualities, but really can be anything. 

Several features allow us to accurately represent an object - I could represent a house with the following vector of features - ```{numBedrooms, numBathrooms, lotSize, isNearSchool] = {4, 3, 3000, 1}```. Similarly, each detected cell can be represented by a vector of features we can extract from it - we used Matlab's regionprops (http://www.mathworks.com/help/images/ref/regionprops.html) to extract several features of the cell, such as its area, eccentricity, Euler number, mean intensity, and weighted centroid. We ended up with a total of 28 features for each of the 665 cells. 


### Unsupervised Machine Learning Using K-means
Since these data did not have any labels associated with them yet (we sent off the images to a pathologist who'd manually label the cells to provide a training dataset), I decided to see if I could find any patterns or similarities in the data. 

One way to do this is by using the `kmeans` algorithm. This algorithm takes in a set of data and assigns each data point to a cluster of other similar data points. This is done through computing a `centroid`, or mean vector, for each cluster. Each time a new data point is added to a cluster, its centroid is recomputed. Here's a visualization of the kmeans algorithm: 

```insert k means blob here```

The hope was that clustering the data would produce three distinct regions: a sickle cell region, a red blood cell region, and a white blood cell region. Sure enough, our cells (represented here as points) clustered into three regions: 




In reality, the actual clusters would look a little more complicated - each cluster is a subspace of 18 (our number of features) dimensional space. To classify a cell, we'd specify it's feature vector and compute its distance to each of the centroids. As an example, we might end up with an unlabeled cell being a distance d away. If d is within our maximum distance threshold (given by the distance the furthest correctly labelled cell is away from its centroid), we'd assign it to that cluster and recompute the centroid accordingly. So our algorithm might look something like this: 

<script src="https://gist.github.com/nisrulz/11c0d63428b108f10c83.js"></script>

  
  
  
  


### Bootstrap Aggregation
A machine learning classifier.

### A stateful Recurrent Neural Network 
How we're going to solve this problem


This post will outline the technical details, benefits, and challenges of using machine learning - specifically, neural networks - to detect sickle cells. We'll cover the preprocessing step of applying various filters to extract features of the image, using clustering to detect images of cells clumped together, and then detail how a classifier can be built through the use of these features. Stay tuned!

- Kmeans algorithm to cluster the data 
- Locality sensitive hashing of data
- neural network to classify data 
- 
