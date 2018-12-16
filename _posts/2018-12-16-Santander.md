---
layout: post
title: Santander Kaggle Challenge
---
## Topics
#### High Dimensionality, High Sparsity, Bias-Variance Trade-off, Regression


## Santander Kaggle Challenge

  Machine Learning is a large field that is taking the field of finance and banking by storm. Businesses are now using algorithms to personalize a customers experience and to find areas where they can improve. The Santander Group is a banking organization that posted a challenge on Kaggle in hopes to make their banking services more personalized. The goal of the challenge is to build a regression model that can be used to predict the monetary value of a potential customer’s transactions.  In doing so, they can tailor their products and services to specific customers and gain a technological advantage over other banking organizations. 
  

## Regression Challenges

### Target Variable
 Since the goal of the project is an attempt to predict the monetary value of customers, it is reasonable to assume that only a few select customers will are wealthy while the vast majority are average, middle-class accounts.[3] This poses a problem in a linear regression setting, specifically because our model would assume normality. By taking the logarithmic transformation of the target variable, we are able to make it a better fit for the underlying assumptions of a linear model.
 
 ![_config.yml]({{ site.baseurl }}/images/santander/target.png)

 



### High Sparsity 
  Another note to make about the dataset is its sparsity. Most of the values through out the dataset contain a high amount of zeros. Besides the high number of dimensions, getting predictive power out of these columns will be a challenge. To demonstrate the sparsity of the matrix, I took the sums of each column and stored them into an array. Below is the histogram of that array.
  

### High Dimensionality 

![_config.yml]({{ site.baseurl }}/images/santander/df_head.jpg)



## An Attempt At Fitting A Linear Model
![_config.yml]({{ site.baseurl }}/images/santander/2op52u.jpg)

We can see that the high number of dimensions and the sparsity of the data frame violate many of the assumptions of a standard Ordinary Least Squares Regression model. Our model should not be prediction negative values. Since most of the target values are also sparse, our fitted values are concentrated around 0.[1]

![_config.yml]({{ site.baseurl }}/images/santander/lr_raw.png)

## Principal Components Regression Using a Linear Stacked AutoEncoder

  One approach we can take to reduce the large dimensionality of our dataset is creating Principal Components using a Linear Stacked Auto Encoder. The Principal Component Analysis is a statistical procedure that uses an orthogonal transformation to create a set of nonlinear variables that capture the variance between the input matrix. Because there are so many variables, chances are there is collinearity in our model. We cannot get accurate estimates for a linear regression model. A Linear Stacked Auto Encoder is a type of Neural Network that produces a similar result to a Principal Component Analysis. The difference between the two is that PCA is restricted to a linear transformation and Neural networks have different activation functions to account for Non-Linearities.[2]
  
  ![_config.yml]({{ site.baseurl }}/images/santander/3d.png)
  
  
| Model 	 |  MSE     | R^2       | 
|----------------|----------|-----------|
| LR w/ LSA      | .5437    | 0.0575    |   

  

  
  As we can see below, there is a huge difference already, however we can see the model demonstrating similar behavior as it did previously. Most of the fitted values are centered around the mean of the logarithmic transformation of the target [Fig. 5]. There also appears to be some sort of 'wall' that does not let our predict any value less than 6.25 .
  
  
![_config.yml]({{ site.baseurl }}/images/santander/lr_3d.png)

## Regularization Methods:

Is it possible to perform better with just a subset of the original features instead of their Principal Components? Let's explore some methods to shrink the coefficients of the parameters of our model and see how it compares to our makeshift principal components regression.
![_config.yml]({{ site.baseurl }}/images/santander/L1_and_L2_balls.svg.png)




### Lasso
  Lasso regression uses a penalizer that shrinks the coefficient estimates to zero. Surprisingly enough, when I fit the a lasso model on the full dataset, it did exactly just that. One interesting thing to note was the negative R^2 metric that was received from the Lasso model. Any R^2 value that is greater than 0 means that the model performed better than fitting a horizontal line through the mean target value of the the data.[4]
  
![_config.yml]({{ site.baseurl }}/images/santander/lasso.png)

  
    
| Model 	 |  MSE     | R^2       | 
|----------------|----------|-----------|
| Lasso    | .5777    | -0.0001104    |   


### Ridge 
  Ridge regression uses a penalizer that shrinks the coefficients as close to zero as possible, but unlike lasso, it does not kick out the parameters. We can see in this, it behaved similarly to our Principal Components Regression, with the omission of the 'wall' phenomenon discussed in Figure 7. We can note that our MSE did increase and our R^2 is not only still negative, but it is still lower than the R^2 obtained from our Principal Component Regression. In short, the Principal Component Regression outperformed both Penalization methods.
  
![_config.yml]({{ site.baseurl }}/images/santander/ridge.png)

  
| Model 	 |  MSE     | R^2       | 
|----------------|----------|-----------|
| Ridge Regression     | .6108    | -0.05878    |   


  
 

## Tree Based Regression:

  We can see that our penalization methods still suffer from the sparsity of our dataset. Ridge and Lasso Regression both assume that the input matrix is orthonormal, which means that the predictors are not correlated and loosely the same scale[]. Despite the MinMaxScaling we applied to the dataframe, it does not do anything to alleviate the correlation stipulation.
   It is beginning to be clear that linear methods are not performing well. Let us explore the notion of Non-Linear Regression. Trees can be used for both nonlinear classification and regression, and they work separating the prediction space using the input matrix. Although they are fast and easy to interpret, they can be prone to over fitting and high variance. Two algorithms that have been made popular in machine learning to solve this issue are Random Forest and XGBoost.
   
   
### Random Forest

Random Forest uses random sampling with replacement to select a random subset of features  and fit a tree on them. This process is called bagging, and it is done multiple times and at the end, we get an average of how those models performed and use that as our final model. We can see that our model performed much better. Since decision trees do not make the assumption that the data is orthonormal, it is a much more flexible method.


![_config.yml]({{ site.baseurl }}/images/santander/forest.png)

  
| Model 	 |  MSE     | R^2       | 
|----------------|----------|-----------|
| Random Forest      | .438   | 0.240    |   


## XGBoost 

XGBoost is similar to Random Forest, except that it uses to random sampling without replacement, and instead of averaging out the performance of all trees, it is going to take the observations that were predicted incorrectly and try to fit another model to focus on those observations. This is called boosting, since you are iteratively boosting the performance on learners. We can see that XGBoost performed slightly better than its Bagging counter part.

![_config.yml]({{ site.baseurl }}/images/santander/xgb.png)

  
| Model 	 |  MSE     | R^2       | 
|----------------|----------|-----------|
| XGBoost     | .434    | 0.277   |   




## Bias-Variance Trade-Off
So why didn't our parametric methods perform as expected. The heart of the problem lies in the concept of bias-variance trade-off
in statistical learning. The predicted values from our linear models had too much bias in them. In other words, out model had a high preference for a set of fitted values that were not anywhere near our actual values. This is because our data is not normalized and linear parametric methods are not flexible methods. Once we chose a more flexible method, we reduced the bias and we began seeing a better fit. 

![_config.yml]({{ site.baseurl }}/images/santander/bias-variance-tradeoff.svg)


## Conclusion 

We have explored several approaches to reducing the problems of dimensionality and sparsity. We saw how non-orthonormal data can pose trouble on linear based methods. It is  crucial to understand your data and what kind of assumptions your model is making, as well as the concept of Bias-Variance Trade Off within different models. In this context, non-parametric methods outperformed parametric methods because they did not make assumptions on the data.


## References

	 [1.] Bravo, H. C, $\&$ Irizarry, R. A. (2018, December 4). Lecture 6: Methods for High-Dimensional Problems. Lecture.
	 [2.]  Cohen, O. (2018, April 23). PCA vs Autoencoders – Towards Data Science. Retrieved from https://towardsdatascience.com/pca-vs-autoencoders-1ba08362f450 
	[3.] Macdonnell, K. (2010, March 04). Why transform the dependent variable? Retrieved from https://cooldata.wordpress.com/2010/03/04/why-transform-the-dependent-variable/ 
	 [4.] What Is R Squared And Negative R Squared. (2017, May 12). Retrieved December 4, 2018, from http://www.fairlynerdy.com/what-is-r-squared/ 
	

