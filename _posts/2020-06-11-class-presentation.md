---
layout: post
title: Twitter Information Analysis and Visualization
---

I use non-API method to get the data of user "realDonaldTrump" from 2016-05 to 2020-06. Then I used pandas library via jupyter notebook to analyze the information with the code as follows: 

import pandas

url = '/Users/min/OneDrive - The University of Texas at Dallas/UTD/Courses/EPPS 7V81 Advanced Data Programming/Exercise 1/realDonaldTrump.csv'
df = pandas.read_csv(url)

df['date'] = pandas.to_datetime(df['date'])

dfm1 = df.groupby(df['date'].dt.strftime('%Y-%m')).sum()

dfm2 = df.groupby(df['date'].dt.strftime('%Y-%m')).count()

dfm1 = dfm1.drop(['geo','id'], axis=1)

dfm2 = dfm2.drop(['username','to','replies','retweets','favorites','text','geo','mentions','hashtags','id','permalink'], axis=1)

dfm2.columns = ['frequency']

dfm3 = pandas.concat([dfm1, dfm2], axis=1)

#dfm1['counts'] = pandas.Series(data=dfm1.groupby(dfm1['date']).count())

#counts = df.groupby(df['date'].dt.strftime('%B')).['date'].count()

dfm1.plot()
dfm2.plot()
dfm3.plot()

The results are shown in the screenshots below:
![My helpful screenshot](images/realDonalTrump1.png)
![My helpful screenshot](images/realDonalTrump2.png)
![My helpful screenshot](images/realDonalTrump2.png)

Also, you can [get the PDF](_posts/realDonaldTrumpTweetsInfor.pdf)directly. https://github.com/MinShiMia/MinShiMia.github.io/blob/master/_posts/realDonaldTrumpTweetsInfor.pdf.


I also have searched the data in Twitter about China and the U.S. relations, the results are also interesting which could be explored here: 
![My helpful screenshot](images/ChinaUS1.png)
![My helpful screenshot](images/ChinaUS2.png)
![My helpful screenshot](images/ChinaUS3.png)

Also, you can [get the PDF](_posts/China_US_tweets_infor.pdf)directly. 
