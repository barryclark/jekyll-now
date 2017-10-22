#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Mon Oct  2 02:09:16 2017

@author: shourya
"""

import numpy as np

def sigmoid(z):
    
    '''This function calculates the sigmoid of every element in array z'''
    s = 1/(1+np.exp(-1*z))
    return s

def initialize(dim):
    
    '''Randomly initialising the weight array'''
    w = np.random.rand(dim,1)
    b = 0   
    return w, b

def propagate(w, b, X, Y):

    '''m stores the number of rows in X'''
    m = X.shape[0]    
    
    '''A is a column vector storing the output based on w,b and X'''
    A = sigmoid(np.dot(X, w)+b)    
    
    '''cost stores the cost associated with current value of w and b'''    
    reg_const=0.05
    cost = -1/m*np.sum(Y*np.log(A)+(1-Y)*np.log(1-A))  +  (reg_const/(2*m))*np.sum(w*w)

    w=np.reshape(w,(1,4))
    '''dw is partial derivation of cost function wrt weight'''              
    dw = 1/m*(np.dot((A-Y).T,X))  +  (reg_const/m)*w

    '''db is partial derivation of cost function wrt bias'''   
    db = 1/m*(np.sum(A-Y))    
    dw=dw.T
    
    '''grads is a dictionary'''
    grads = {"dw": dw,
             "db": db}   
    
    return grads,cost


def optimize(w, b, X, Y, num_iterations, learning_rate):
    
    costs=[]
    Y=Y.reshape((Y.shape[0],1))

    '''With every iteration, the cost function's value decreases'''
    for i in range(num_iterations):
        
        grads,cost = propagate(w,b,X,Y)

        dw = grads["dw"]
        db = grads["db"]
        
        '''Updating the weights using the gradients'''
        w = w-learning_rate*dw
        b = b-learning_rate*db       
# storing the cost values so that it can be plotted
        costs.append(cost)
          
    params = {"w": w,
              "b": b}
    
    return params,costs

    '''Predicts the labels for the matrix X based on w and b'''
def predict(w, b, X):
    
    w = w.reshape(X.shape[1], 1)
    A = sigmoid(np.dot(X, w)+b)
    return A

    '''This function trains the model using other function defined above'''
def model(X_train, Y_train, X_test, Y_test, num_iterations = 8000, learning_rate = 0.5):


    w, b = initialize(X_train.shape[1])
    
    '''Training the model to get the parameters (w and b) for each class'''
    parameters0,costs0 = optimize(w, b, X_train, Y_train[:,0], num_iterations, learning_rate)
    parameters1,costs1 = optimize(w, b, X_train, Y_train[:,1], num_iterations, learning_rate)
    parameters2,costs2 = optimize(w, b, X_train, Y_train[:,2], num_iterations, learning_rate)
        
    x=[]
    for i in range(num_iterations):
        x.append(i)

    '''Plotting cost vs iteration for each class'''    
    import matplotlib.pyplot as plt
    plt.plot(x ,costs0)
    plt.xscale('symlog')
    plt.xlabel('Iterations')
    plt.ylabel('Cost')
    plt.title('Class 1')
    plt.show()
    
    plt.plot(x ,costs1)
    plt.xscale('symlog')
    plt.xlabel('Iterations')
    plt.ylabel('Cost')
    plt.title('Class 2')
    plt.show()
    
    plt.plot(x ,costs2)
    plt.xscale('symlog')
    plt.xlabel('Iterations')
    plt.ylabel('Cost')  
    plt.title('Class 3')
    plt.show()
    
    '''Parameters for 1st class'''

    w0 = parameters0["w"]
    b0 = parameters0["b"]

    '''Parameters for 2nd class'''    
    w1 = parameters1["w"]
    b1 = parameters1["b"]
    
    '''Parameters for 3rd class'''
    w2 = parameters2["w"]
    b2 = parameters2["b"]
    
    
    '''Predicting classes of training data'''
    Y_prediction_train0 = predict(w0,b0,X_train)
    Y_prediction_train1 = predict(w1,b1,X_train)
    Y_prediction_train2 = predict(w2,b2,X_train)
    
    Y_prediction_train=np.concatenate((Y_prediction_train0,Y_prediction_train1,Y_prediction_train2),axis=1)   
    
    '''Y_prediction_train has 3 columns, one for each class
       For a single row, the column having the maximum value is more likely to be the class for that data
       hence we need to store column number having the maximum value. For that we use argmax
    '''
    Y_pred_train=Y_prediction_train.argmax(axis=1)
    
    
    '''Y_train is also converted into similar format as Y_prediction_train so that it is easy to
        compare between actual Y values and predicted Y values
    '''
    Y_train=Y_train.argmax(axis=1)
    
    
    '''Counting cases having correct prediction'''
    count=0
    for i in range(Y_train.shape[0]):
        if Y_pred_train[i]==Y_train[i]:
            count+=1
            
    print("Train accuracy ="+str(100*(count/Y_train.shape[0])))
    
    '''Predicting classes of test data'''
    Y_prediction_test0 = predict(w0,b0,X_test)
    Y_prediction_test1 = predict(w1,b1,X_test)
    Y_prediction_test2 = predict(w2,b2,X_test)
    
    Y_prediction_test=np.concatenate((Y_prediction_test0,Y_prediction_test1,Y_prediction_test2),axis=1)

   # print(Y_prediction_test)
    '''Y_prediction_test has 3 columns, one for each class
       For a single row, the column having the maximum value is more likely to be the class for that data
       hence we need to store column number having the maximum value. For that we use argmax
       Uncomment the print statement above to see how Y_prediction_test looks like
    '''
    Y_pred_test=Y_prediction_test.argmax(axis=1)
    
    
    #print(Y_test)
    '''Y_test is also converted into similar format as Y_prediction_test so that it is easy to
        compare between actual Y values and predicted Y values
        Uncomment the print statement above/below to see how Y_test looked/looks like
    '''
    Y_test=Y_test.argmax(axis=1)
    #print(Y_test)
                
    '''Counting cases having true prediction'''
    count=0
    for i in range(Y_test.shape[0]):
        if Y_pred_test[i]==Y_test[i]:
            count+=1
        
    print("Test accuracy ="+str(100*(count/Y_test.shape[0])))

    return





import pandas as pd
df = pd.read_csv('Iris.csv') #Reading the dataset as a pandas dataframe
X=df[["SepalLengthCm","SepalWidthCm","PetalLengthCm","PetalWidthCm"]].as_matrix() # Extracting the features from the dataset
Y=df[["Species"]].as_matrix() # Extracting the labels for classes
   
Y_num=np.zeros((Y.shape[0],3)) # To store the classes in numeric format instead of Strings

'''Min-Max Scaling'''
maximum=np.amax(X,axis=0)
minimum=np.amin(X,axis=0)
X=np.divide((X-minimum),(maximum-minimum))

''' Categorical to number
    Y_num will have same number of rows as Y but 3 columns instead of one
    The first column will have 1 for the row where the class is "Iris-setosa"
    The second column will have 1 for the row where the class is "Iris-versicolor"
    The third column will have 1 for the row where the class is "Iris-virginica"
    So a row will have 1 in any one of the columns.
'''
for i in range(Y.shape[0]):
    if Y[i]=='Iris-setosa':
        Y_num[i,0]=1
    elif Y[i]=="Iris-versicolor":
        Y_num[i,1]=1
    elif Y[i]=="Iris-virginica":
        Y_num[i,2]=1
        
from sklearn.cross_validation import train_test_split

''' Function used to split the original dataset into training and test dataset'''
train_x, test_x,train_y,test_y = train_test_split(X,Y_num, train_size = 0.7)

'''Function to train as well as test the model'''
model(train_x,train_y,test_x,test_y)






