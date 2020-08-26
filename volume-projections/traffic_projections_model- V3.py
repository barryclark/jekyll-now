# -*- coding: utf-8 -*-
"""
Created on Mon Aug 17 18:11:05 2020

@author: charlie.henry
"""

#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun Apr 28 15:46:31 2019

@author: berkunis
"""
##############################################01_02_PythonLibraries#####################################################
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.impute import SimpleImputer
import matplotlib.pyplot as plt 

from sklearn.preprocessing import MinMaxScaler
from sklearn.preprocessing import StandardScaler
from sklearn.preprocessing import OneHotEncoder
from sklearn.preprocessing import LabelEncoder

from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures
from sklearn.svm import SVR
from sklearn.tree import DecisionTreeRegressor
from sklearn.ensemble import RandomForestRegressor




#import data
data = pd.read_csv("volumes-3.csv")

#see the first 15 lines of data
print(data.head(15))

data= data.dropna(subset=['Weeknum', 'Avg Volume','Residential Score Avg','Deaths','Cases','Search'])

print(data.head(15))

data= data.dropna(axis='columns')

print(data.head(15))


############################################01_05_DividingtheDataintoTestandTrain##############################################

#putting the data together:

##take the numerical data from the original data
X_num = data[['Residential Score Avg','Cases','Search']].copy()

##take the encoded data and add to numerical data
X_final = pd.concat([X_num], axis = 1)

#define y as being the "charges column" from the original dataset
y_final = data[['Avg Volume']].copy()

#Test train split
X_train, X_test, y_train, y_test = train_test_split(X_final, y_final, test_size = 0.33, random_state = 0 )
#X_train, X_test, y_train, y_test = train_test_split(data[['age']], y_final, test_size = 0.33, random_state = 0 )


############################################02_06_RandomForestRegression#######################################
forest = RandomForestRegressor(n_estimators = 100,
                              criterion = 'mse',
                              random_state = 1,
                              n_jobs = -1)
#test train split
X_train, X_test, y_train, y_test = train_test_split(X_final, y_final, test_size = 0.33, random_state = 0 )

#standard scaler (fit transform on train, fit only on test)
sc = StandardScaler()
X_train = sc.fit_transform(X_train.astype(np.float))
X_test= sc.transform(X_test.astype(np.float))

#fit model
forest.fit(X_train,y_train.values.ravel())
y_train_pred = forest.predict(X_train)
y_test_pred = forest.predict(X_test)

#print score
print('forest train score %.3f, forest test score: %.3f' % (
forest.score(X_train,y_train),
forest.score(X_test, y_test)))

data_fut = pd.read_csv("predict - 4.csv")
X_fut = data_fut[['Residential Score Avg','Cases','Search']].copy()
X_fut = pd.concat([X_fut], axis = 1)
X_fut = sc.transform(X_fut.astype(np.float))

y_pred = forest.predict(X_fut)

