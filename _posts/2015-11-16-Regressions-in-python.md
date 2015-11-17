---
layout: post
title: Regressions in python!
---
![]({{ site.baseurl }}/images/extrapolating.jpg "image")

### Linear Regression

It is more or less logical to think that a bigger pizza costs more. In other words the price of a pizza is directly proportional to the cost of the pizza. 

Lets take a few samples of pizza diameters and prices and try to predict the price of a new pizza of given diameter: 

```
diameter_pizza = [[6],[7],[8],[9],[10]]
price_pizza = [[7],[10],[14],[17],[19]]
```

Lets import matplotlib:

```
import matplotlib.pyplot as plt
%matplotlib inline 

plt.figure()
plt.title('pizza price vs diameter')
plt.xlabel('Diameter in inches')
plt.ylabel('Price in euros')
plt.plot(diameter_pizza,price_pizza,'k.')
plt.axis([0,12,0,20])
plt.grid(True)
plt.show()
```
![]({{ site.baseurl }}/images/price-vs-diameter.png "price vs diameter")

If we plotted a regression that has the least sum of squared errors:  

```
plt.figure()
plt.title('visualizing the linear regression model')
plt.xlabel('Diameter in inches')
plt.ylabel('Price in euros')
plt.plot(diameter_pizza,price_pizza,'k.')
plt.plot(diameter_pizza,model.predict(diameter_pizza))
plt.axis([0,12,0,30])
plt.grid(True)
plt.show()

```

it would look something like this:

![]({{ site.baseurl }}/images/linear_regression_visual.png "linear regression visual")

To see the r-square of the model: 

```
diameter_pizza_test = [[8],[9],[11],[16],[12]]
price_pizza_test = [[14],[17],[21],[31],[24]]
from sklearn.linear_model import LinearRegression 
model = LinearRegression()
model.fit(diameter_pizza,price_pizza)
print 'the r square of the model is %.4f' % model.score(diameter_pizza_test,price_pizza_test)

```
the r square of the model is 0.6618

### Multiple Linear Regression

While linear regression is easy to understand and implement, the r square of linear regression is low and gives room for many errors. To improve the r square we can look at the other factors that can affect the price of the pizza. Like the # of toppings for example. Below is the input to our multiple linear regression problem: 

```
diameter_toppings_pizza = [[6, 0], [7, 1], [8, 1], [9, 2], [10, 2]]
price_pizza = [[7], [10], [14], [17], [19]]

from sklearn.linear_model import LinearRegression
model = LinearRegression()
model.fit(diameter_toppings_pizza, price_pizza)

diameter_toppings_pizza_test = [[8, 2], [9, 0], [11, 2], [16, 2], [12, 0]]
price_pizza_test = [[14], [17], [21], [31], [24]]

predictions = model.predict(diameter_toppings_pizza_test)

for i, prediction in enumerate(predictions):
    print 'predicted is %s, actual is %s ' % (prediction, price_pizza_test[i])
    
print 'the r-square value of the model is %.2f' % model_2.score(diameter_toppings_pizza_test, price_pizza_test)

```

The output of the multiple linear regression can be seen as: 

```
predicted is [ 13.66666665], actual is [14] 
predicted is [ 15.93333332], actual is [17] 
predicted is [ 22.46666665], actual is [21] 
predicted is [ 37.13333332], actual is [31] 
predicted is [ 24.73333332], actual is [24]

the r-square value of the model is 0.76

```

As can be seen there is a significant improvement in the r square with the addition of an explanatory variable. Is there a possibility to increase our accuracy further ? 

YES! There is!

In both of our earlier models we are assuming a linear relationship between the diameter of the pizza and its price. It is highly likely that the price is a square or cube of the diameter. Lets look into that: 

### Non-Linear Regression
















