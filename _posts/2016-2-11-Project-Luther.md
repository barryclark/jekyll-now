


---
layout: post
title: Predicting movie Gross immediately after release
---
One of my first projects at Metis is to scrape data from the web and apply linear regression to build a model. And below is the report of my analysis. 

__Client__: Movie Studios would like to predict the total gross a movie makes immediately after its release. This will let them change their marketing strategies accordingly and generate higher revenues by running longer in theatres. For example, studios might want to pump more money into the ongoing promotion campaign targeting a different audience than initial focus group.

__Data__: The analysis presented here is based on movie information available on [www.boxofficemojo.com](www.boxofficemojo.com) and [www.metacritic.com](www.metacritic.com).

__Approach__: From information that is easily available about movies, we can infer that opening weekend gross and critics reviews have a high effect on the total gross of a movie. Once a movie is released the features that don’t change are budget, release date and genre of a movie.

From the data we have we can say that opening weekend gross of a movie is highly correlated with total gross of the movie. A model using opening weekend gross as predictor gives R^2 = 0.702. Below figure is a plot of the fit model with opening weekend gross as a predictor.  From the figure we can say that the model fits pretty well.

__MODEL 1__:

![](/images/Fit_model_openingweekend_pred .png)
 

Adding critics reviews as features along with the opening weekend gross drove up the value of R^2 to 0.724. Critics reviews include critics positive reviews, critics negative reviews, critics neutral reviews and total critics reviews. In this model we take critics positive reviews, critics negative reviews and total critics reviews as features and exclude critics neutral reviews. This is because if we include critics positive, neutral and negative along with critics total then they will be collinear. We definitely want to include critics total reviews because some movies might have more reviews compared to others. Below is the summary of the regression model with opening weekend gross, critics positive percentage, critics negative percentage and critics total reviews as predictors.

__MODEL 2__:

|	Variable			|	Coefficient	|	P-Value		|
|---------------------------------------|-----------------------|-----------------------|
|Intercept				|	1.043e06	|	0.792		|
|Opening Weekend Gross			|	3.0839		|	0.000		|
|Critics positive percentage		|	4.086e07	|	0.000		|
|Critics negative percentage		|	3.88e06		|	0.531		|
|Critics total reviews			|	-3.318e05 	|	0.001		|
					R^2 = 0.724

Lifetime gross and opening weekend gross in our data are in millions and it is a better idea to scale them. A model predicting log lifetime gross using log opening weekend gross and critics reviews as predictors fits the data very well (R^2 = 0.810). Below is the summary for this model.

__MODEL 3__:

|	Variable		|	Coefficient	|	P-Value	     |
|-------------------------------|-----------------------|--------------------|
|Intercept			|	3.8881		|	0.000	     |
|Log Opening Weekend gross	|	0.7640		|	0.000	     |
|Critics positive percentage	|	1.8046		|	0.000	     |
|Critics negative percentage	|	0.5161		|	0.001	     |
|Critics total reviews		|	0.0168 		|	0.000	     |
			 		R^2 = 0.810

Its interesting to see how adding more features to this model changed model values. By adding opening weekend theatres as one of the features to our model makes the model even better. Below table summarizes the results for log opening weekend gross, critics reviews and opening theatres as predictors.

__MODEL 4__:

|	Variable		 |	Coefficient	|	P-Value	     |
|--------------------------------|----------------------|--------------------|
|Intercept			 |	1.6253		|	0.000	     |
|Log Opening Weekend gross	 |	0.9823		|	0.000	     |
|Critics positive percentage	 |	1.2680		|	0.000	     |
|Critics negative percentage	 |	0.3315		|	0.022	     |
|Critics total reviews		 |	0.0260 		|	0.000	     |
|Opening Weekend theatres	 |	-0.0005		|	0.000	     |
				R^2 = 0.829
 
From the above analysis, it is clear that R^2 goes up as number of features go up. And a model with more features can lead to over fitting. The reason I chose this model is, these variables add significantly to the model and the coefficients of the model are intuitive. Also, if we compare the residuals versus actual lifetime gross plots for the last two models, i.e., model 3 and model 4, we can clearly see that residuals converge more towards 0 for model 4 and some movies like Avatar and Titanic did exceptionally well.

Plot of Model 4:
 
 ![](/images/Actual_log_Lifetime_(openingWeekend_critics_openingTheatres)_vs_Residuals.png)

Plot of Model 3:

![](/images/Actual_log_Lifetime_(openingWeekend_and_critics)_vs_Residuals.png)
 
Below are the results of train-test set model fitting, cross validation and ridge regression for the above model. 

|Train and test set score	 					|	0.8256      |

|10 fold cross validation score:					|	0.8231      |

|Ridge regression score: 						|	0.8260	    |

__Conclusion and Further steps__: The above analyses illustrates that ultimate box office performance of movies can be forecast with some accuracy given early available information and the box office performance is highly affected by the opening weekend gross of a movie. Therefore movie studios must watch the opening weekend gross closely to make the right marketing decisions and to keep the movie in theatres longer.

However, the models discussed here have certain limitations. It is quite possible that other predictors could improve the models. It would be interesting to see how genre, budget and release date of a movie would affect the overall performance of the movie. 
