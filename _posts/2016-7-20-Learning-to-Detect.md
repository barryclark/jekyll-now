---
layout: post
title: How we're using Machine Learning to change the current state of disease detection
---

Diagnosing medical conditions such as sickle cell disease can become much, much faster. 

During my past year at UCLA, I had the opportunity to work as an undergraduate researcher in a biotechnology related lab. The project I was working on with a couple of other undergrads under a postdoc aimed to streamline the process of identifying sickle cell disease through image processing and machine learning. My work involved leveraging machine learning algorithms and creating heuristic methods to operate on high-dimensional data and classify different cells quickly.

### Some background on Sickle Cell Disease
Talk about the background of sickle cell disease here.

### The Current State of Sickle Cell Disease Diagnosis
Talk about the current diagnosis methods here. 

### Why we need to improve it 
Point out the problems with this.

### Automated Detection Via Blood Image Analysis
We're doing cool stuff. smartphone-captured, microscope-captured

### First step: Preprocessing the Data and Feature Selection 
We're now at the computation intensive portion of the project - the problem of classifying images of cells. First, we determined the labels we wanted to predict. These were simply the three types of cells we wanted to detect - red blood cells, white blood cells, and sickle cells. 
Next, we wanted some way to describe each cell present in an image. Given an image with hundreds of cells, we wanted to: 
- Locate each cell
- Run an algorithm on this region to extract several key features to describe this cell. 

Locating a cell in an image of several hundred cells wasn't exactly trivial. We decided to use a hough transform, a transformation that is designed to detect lines in images. This transformation allowed us to detect rough boundaries of circular regions in the image. We ended up with 665 detected cells in our smartphone-captured image. Next, we created a linear mapping algorithm to map cell regions in this image to our gold standard image, the microscope-captured image. This allowed us to extract 665 regions that contain a single cell in our microscope-captured image. 

[Insert link to image here]
Now, we sought to quantify this data - represent it in a way so that we can easily do some calculations and computations on it. This brings in the idea of a _feature_ - a single property of the object under analysis. For houses, this could be the number of bedrooms in the house or the lot size of the house. For images, features can include the RGB values for each pixel, the intensity and shade for each pixel, or the saturation of a pixel. They tend to be numerical or boolean qualities, but really can be anything. 

Several features allow us to accurately represent an object - I could represent a house with the following vector of features - {numBedrooms, numBathrooms, lotSize, isNearSchool] = {4, 3, 3000, 1}. Similarly, each detected cell can be represented by a vector of features we can extract from it - we used Matlab's regionprops (http://www.mathworks.com/help/images/ref/regionprops.html) to extract several features of the cell, such as its area, eccentricity, Euler number, mean intensity, and weighted centroid. We ended up with a total of 28 features for each of the 665 cells. 


### Unsupervised Machine Learning Using K-means
Clustering is cool, but doesn't provide any labels :(


### Bootstrap Aggregation
A machine learning classifier.

### A stateful Recurrent Neural Network 
How we're going to solve this problem


This post will outline the technical details, benefits, and challenges of using machine learning - specifically, neural networks - to detect sickle cells. We'll cover the preprocessing step of applying various filters to extract features of the image, using clustering to detect images of cells clumped together, and then detail how a classifier can be built through the use of these features. Stay tuned!

- Kmeans algorithm to cluster the data 
- Locality sensitive hashing of data
- neural network to classify data 
- 
