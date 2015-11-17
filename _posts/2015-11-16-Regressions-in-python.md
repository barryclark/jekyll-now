---
layout: post
title: Regressions in python!
---
![]({{ site.baseurl }}/images/extrapolating.jpg "image")


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
print 'the r square of the model is %.4f' % model.score(diameter_pizza_test,price_pizza_test)

```





