---
layout: post
title: Santander Kaggle Challenge
---
## Topics
#### High Dimensionality, High Sparsity, Bias-Variance Trade-off, Regression


## Santander Kaggle Challenge

  Machine Learning is a large field that is taking the field of finance and banking by storm. Businesses are now using algorithms to personalize a customers experience and to find areas where they can improve. The Santander Group is a banking organization that posted a challenge on Kaggle in hopes to make their banking services more personalized. The goal of the challenge is to build a regression model that can be used to predict the monetary value of a potential customer’s transactions.  In doing so, they can tailor their products and services to specific customers and gain a technological advantage over other banking organizations. 
  

## Regression Challenges

### Targer Variable

### High Sparsity 

### High Dimensionality 


## Principal Components Regression Using a Linear Stacked AutoEncoder

  One approach we can take to reduce the large dimensionality of our dataset is creating Principal Components using a Linear Stacked Auto Encoder. The Principal Component Analysis is a statistical procedure that uses an orthogonal transformation to create a set of nonlinear variables that capture the variance between the input matrix. Because there are so many variables, chances are there is collinearity in our model. We cannot get accurate estimates for a linear regression model. A Linear Stacked Auto Encoder is a type of Neural Network that produces a similar result to a Principal Component Analysis. The difference between the two is that PCA is restricted to a linear transformation and Neural networks have different activation functions to account for Non-Linearities.[2]

## Regularization Methods:
### Lasso
  Lasso regression uses a penalizer that shrinks the coefficient estimates to zero. Surprisingly enough, when I fit the a lasso model on the full dataset, it did exactly just that. One interesting thing to note was the negative R\textasciicircum{}2 metric that was received from the Lasso model. Any  R\textasciicircum{}2 value that is greater than 0 means that the model performed better than fitting a horizontal line through the mean target value of the the data.[4]

### Ridge 
  Ridge regression uses a penalizer that shrinks the coefficients as close to zero as possible, but unlike lasso, it does not kick out the parameters. We can see in this, it behaved similarly to our Principal Components Regression, with the omission of the 'wall' phenomenon discussed in Figure 7. We can note that our MSE did increase and our 	R\textasciicircum{}2 is not only still negative, but it is still lower than the R\textasciicircum{}2 obtained from our Principal Component Regression. In short, the Principal Component Regression outperformed both Penalization methods.
  
 

## Tree Based Regression:

  We can see that our penalization methods still suffer from the sparsity of our dataset. Ridge and Lasso Regression both assume that the input matrix is orthonormal, which means that the predictors are not correlated and loosely the same scale[]. Despite the MinMaxScaling we applied to the dataframe, it does not do anything to alleviate the correlation stipulation.
   It is beginning to be clear that linear methods are not performing well. Let us explore the notion of Non-Linear Regression.   Trees can be used for both nonlinear classification and regression, and they work separating the prediction space using the input matrix. Although they are fast and easy to interpret, they can be prone to over fitting and high variance. Two algorithms that have been made popular in machine learning to solve this issue are Random Forest and XGBoost.
### Random Forest
## XGBoost 

## Bias-Variance Trade-Off

## Conclusion 

![_config.yml]({{ site.baseurl }}/images/config.png)

