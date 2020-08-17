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
data = pd.read_csv("volumes-2.csv")

#see the first 15 lines of data
print(data.head(15))

data= data.dropna(subset=['Day', 'Cases','Volume','Deaths','Day of Week'])

print(data.head(15))

data= data.dropna(axis='columns')

print(data.head(15))


############################################01_05_DividingtheDataintoTestandTrain##############################################

#putting the data together:

##take the numerical data from the original data
X_num = data[['Day', 'Deaths','Day of Week']].copy()

##take the encoded data and add to numerical data
X_final = pd.concat([X_num], axis = 1)

#define y as being the "charges column" from the original dataset
y_final = data[['Volume']].copy()

#Test train split
X_train, X_test, y_train, y_test = train_test_split(X_final, y_final, test_size = 0.33, random_state = 0 )
#X_train, X_test, y_train, y_test = train_test_split(data[['age']], y_final, test_size = 0.33, random_state = 0 )



############################################02_03_PolynomialRegression##############################################

poly = PolynomialFeatures (degree = 4)
X_poly = poly.fit_transform(X_final)

X_train,X_test,y_train,y_test = train_test_split(X_poly,y_final, test_size = 0.33, random_state = 0)

#standard scaler (fit transform on train, fit only on test)
sc = StandardScaler()
X_train = sc.fit_transform(X_train.astype(np.float))
X_test= sc.transform(X_test.astype(np.float))

#fit model
poly_lr = LinearRegression().fit(X_train,y_train)

y_train_pred = poly_lr.predict(X_train)
y_test_pred = poly_lr.predict(X_test)

#print score
print('poly train score %.3f, poly test score: %.3f' % (
poly_lr.score(X_train,y_train),
poly_lr.score(X_test, y_test)))

data_fut = pd.read_csv("predict.csv")
X_fut = data_fut[['Day', 'Deaths','Day of Week']].copy()
X_fut = pd.concat([X_fut], axis = 1)
X_poly_fut = poly.fit_transform(X_fut)
X_fut = sc.fit_transform(X_poly_fut.astype(np.float))


y_pred = poly_lr.predict(X_fut)

