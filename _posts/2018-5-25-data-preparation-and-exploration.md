---
title:  "Data Preparation and Exploration"
date:   2018-5-25
layout: single
author_profile: true
comments: true
tags: [data analysis, data science, data preprocessing]
---

<img src="https://cdn-images-1.medium.com/max/800/1*pKo6DmEKYf0EJCKXueFX_Q.jpeg" width="85%">


This is a blog for people new to Data Science, like me. I hope we learn together through this process. My personal interests lie heavily in Data Analytics and Visualisation, so keep an eye out for more blogs on the same.

Datasets are like introverted human beings, at first, they might/might not give you a misleading idea but they never lie. Exploratory analysis, noise removal, missing value treatment, identifying outliers and correct data inconsistencies, and more, all are a part of the process called data preparation and exploration. I will talk more about these in detail below.

A very important aspect of the process would the identification of variable. The image below speaks for itself.

<figure>
<img src="https://cdn-images-1.medium.com/max/800/1*Y-z85lh0qFlwOAvNi3S0pA.png" width="75%">
<figcaption>Understanding the identity of variable is a key task</figcaption>
</figure>

Predictor variables (input) and Target variables (output) define the independent & dependent variables. Knowing whether a variable will consist of a character or a numerical value is also essential to knowledge. Categorical variables can be further divided into: nominal, dichotomous, ordinal variables. They are generally referred to as qualitative variables. Continuous variables have two categories: interval and ratio variables. They are also called quantitative variables.

### Exploratory Data Analysis (EDA)

EDA is used to understand, summarize and analyse the contents of a dataset, usually to investigate a specific question or to prepare for more advanced modeling.

### Univariate Analysis: 
For continuous variables, it helps us find mean, median, mode, min, max. For categorical variables, we use frequency table to understand distribution of each category. Univariate analysis is also used to highlight missing and outlier values.

### Bi-variate Analysis: 
While doing bi-variate analysis between two continuous variables, we should look at scatter plot. The relationship can be linear or non-linear. To find the strength of the relationship, we use Correlation. Correlation varies between -1 and +1.

There are different models which determine correlation between types of variables:

<img src="https://cdn-images-1.medium.com/max/800/1*x83PAPKLIjdZBcsvevaG0Q.png" width="70%">

### Missing Value Treatment

Different types of missing values:

1. Not Missing at Random: NMAR
2. Missing at Random: MAR
3. Missing Completely at Random: MCAR

There are various ways to deal with each of these missing values, and you should <a href="https://measuringu.com/missing-data/">explore that in detail</a>. This step is important because it can cause huge amounts of inconsistency when you look at the averages, sums of various groups of data. It is better to get rid of all those nasty NaN values as soon as possible. We can go ahead with a few models in this one.

### Deleting entry : 
This is where we can remove the missing/null values by removing the entire row of data but also in the process loose quite a lot of data which could create serious amounts of variance.

### Mean/Mode/Median Imputation:
We can replace the missing/null values with either of 3 M’s depending on the possible values of the given column. The method consists of replacing the missing data for a given attribute by the mean or median (quantitative attribute) or mode (qualitative attribute) of all known values of that variable.

### Prediction model:
Here we divide the dataset into two datasets, one with no missing values(to train) and one with missing values. This helps us figure out the values to be introduced in the dataset with missing values. This model can still be less precise in cases where there is no relation between missing values and the attributes in the dataset.

### Outliers:

<img src="https://cdn-images-1.medium.com/max/600/1*J-ds9KYQBheiBaIJn78seg.gif" width="65%">

In statistics, an outlier is an observation point that is distant from other observations. An outlier may be due to variability in the measurement or it may indicate experimental error; the latter are sometimes excluded from the data set.

While outliers may seem to be an extra unnecessary addition to the dataset at first, from hindsight I can confirm to you it’s not, and they deserve fair treatment as well. Models like deletion, imputing, and individual treatment exist for the same. Transforming and binning also ensures that the variance caused by outliers is reduced.

## Feature Engineering:

Involves creation of derived or dummy variables by analysing the rest of the dataset, and existing dependencies between variables in it. Feature engineering can help in validating the correctness of data.

When data is collected over time displays random variation, data smoothing techniques can be used to reduce or cancel the effect of these variations. When properly applied, these techniques smooth out the random variation in the time series data to reveal underlying trends.

That’s it for now folks. This was great fun for me. I hope you enjoyed it as well. Any feedback would be appreciated. <a href="https://twitter.com/abhinavr8">Contact me on Twitter about anything.</a>

Here’s a link to some of the Exploratory Analysis I did. There are always various ways to go about the same. Do share your opinions if you feel like it.
<a href="https://github.com/abhinavralhan/EDA/blob/master/one.ipynb">Repo link.</a>