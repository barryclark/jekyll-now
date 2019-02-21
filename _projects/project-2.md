---
layout: post
title: 'Time-Series Modelling & Analysis'
---
QVC Data Analysis & Time Series Modelling

QVC is a video and ecommerce retailer with a live broadcast that reaches nearly 300 million homes worldwide.
This project is to analyze and gain insight into how Products, Social Media and Campaigning  components drive product sales.  
Our analysis addresses the following questions:
1.	What are the products and product categories that sell best in the US market?
2.	How effective are QVC’s campaigns in driving product sales?
3.	How effective are QVC’s on-air broadcast and on-air personalities in driving product sales?
4. What is the impact of QVC’s social networking presence on driving product sales?

Several techniques were deployed for performing data analysis and gaining insights into data.

![WordCloud](/images/projects/proj-2/wordcloud1.png "WordCloud for positive words")
![Sentiment Analysis](/images/projects/proj-2/SentimentAnalysis1.png "Pie Chart for Sentiment Analysis")

The technique used for time series modelling: 
[ARIMA](https://en.wikipedia.org/wiki/Autoregressive_integrated_moving_average)

![Time Line Decomposition](/images/projects/proj-2/TimeSeries1.png "Decomposed Components")
![Time Series Modelling](/images/projects/proj-2/TimeSeries2.png "Model Result Comparison")

Forecasting a Time Series Trend: The ARIMA forecasting for a stationary time series is nothing but a linear equation. The predictors depend on the parameters (p,d,q) of the ARIMA model: 
*	Number of AR (Auto-Regressive) terms (p)                                                           
*	Number of MA (Moving Average) terms (q)
*	Number of Differences (d)


Major Findings:
1.	Most of the negative posts on Social Media talk about the Shipment and Return process carried out by QVC. QVC should work in this direction to increase the number of customers as well as the sales.
2.	The impact of negative posts are more than the positive posts. Even though on an average per day basis positive posts are always higher the sales have some decreasing trend. This means that customers are hesitant to buy products after reading any negative post.
3.	The product sales majorly increase when there are Air_personalities hosting a Air broadcast. So more broadcasting can be done by including the hosts.
4.	Analysis of the  Total Sales , gave us an insight that there is an increasing trend reaching the month March. The  Analysis of the Campaign Amount spent didn’t help much in finding a pattern. 
5.	The impact of hold on  Email Campaigns  whether it be only for the month of January or for an entire duration has a significant impact in the Total Sales amount.

Check <a href="https://github.com/shreyas1701/QVC-Data-Analysis">github repo</a> for code and analysis

This [website](https://www.analyticsvidhya.com/blog/2016/02/time-series-forecasting-codes-python/) was greatly helpful for the completion of this project.


