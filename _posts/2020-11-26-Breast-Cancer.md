---	
layout: post	
title: Breast Cancer Prediction Competition
---


Breast cancer is the most common cancer among women other than skin
cancer. Increasing age is the most common risk factor for developing breast
cancer, with 66% of breast cancer patients being diagnosed after the age of 55.
It starts when cells in the breast begin to grow out of control. These cells
usually form tumors that can be seen via X-ray or felt as lumps in the breast
area.

The key challenges against it’s detection is how to classify tumors into
malignant (cancerous) or benign(non cancerous).
AICVS organized this competition with some real world issues in mind. It was
held on 8 November 2020 12 noon to 12 midnight. The competitors Were
asked to complete the analysis of classifying these tumors using machine
learning (with SVMs) and the Breast Cancer Wisconsin (Diagnostic) Dataset.

The data was split into two groups: training set (train.csv) and test set (test.csv)
The training set was used to build the machine learning models. For the
training set, we provided the outcome (also known as the “ground truth” or
&quot;target variable&quot; which is &quot;diagnosis&quot; in our case) for each Id. The models of
the participants were based on “features” like radius_mean, area_mean, etc.
The detailed description of the features was mailed to the competitiors.

The test set was used to see how well the participant&#39;s model performed on
unseen data. For the test set, the ground truth for each Id was not provided. It
was the participant&#39;s job to predict these outcomes. For each Id in the test set,
the model that was trained was used to predict whether the tumor was Benign
or Malignant.

We had also included a sample_solution.csv file which contains a set of
predictions that assume all females have Benign tumors as an example of what
a submission file should have looked like.

The winners of this competition were:

<ol>
<li> Akanksha Hatle , Score : 0.98076</li>
<li> Radhika Wadekar , Score : 0.98076</li>
</ol>
  
The participants who made submissions were given a Completion Certificate
and the winners got a Certificate of Excellence.

In these trying times we at AICVS hope that we can offer some much needed
escape from reality and ensure that your journey towards Machine learning
doesn&#39;t stop. We hope to organize more competitions like this. Till the next
competition, Stay Home and Stay Safe!!!
  
Written by Shreya Mandal
