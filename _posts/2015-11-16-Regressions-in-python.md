---
layout: post
title: Regressions in python!
---
![]({{ site.baseurl }}/images/extrapolating.jpeg "image")


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





