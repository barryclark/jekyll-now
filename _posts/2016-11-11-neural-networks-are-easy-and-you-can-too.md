---
layout: prediction_post
published: False
title: Neural Networks are Easy and You Can Too
---


Let's start with a simple example. Say you're helping a friend who wants to buy a house. She was quoted $400,000 for a 2000 sq ft house (185 meters). Is this a good price or not?

It's not easy to tell without a frame of reference. So you ask your friends who have bought houses in that same neighborhoods, and you end up with three data points:

 | Area (sq ft) (x) | Price (y) |
 | --- | --- |
 | 2,104 | 399,900 |
 | 1,600 | 329,900 |
 | 2,400 | 369,000 |

Personally, my first instinct would be to get the average price per sq ft. That comes to $183 per sq ft. Do you agree?

Welcome to your first neural network! Now it's not quite at Siri level yet, but now you know the fundamental building block. And it looks like this:
[Image]



Multiply that by the area of the house, and you get $366,000.

Let us visualize this process:
[Gif]

This is a form of prediction. This is a simple predictive model that takes an input, does a calculation, and gives an output (since the output can be of infinite values, the technical name for what we have would be a "regression model")

[figure]

But can we do better? Let's try. Let's first define what it means to be better in this scenario. If we apply our model to the three data points we have, how good of a job would it do?

[Gif]

That's quite a bit of yellow line. Yellow line is bad. Yellow line is error. We want to shrink that as much as we can.


Area (1000 sq ft) (x) | Price (y) | Prediction (y_) | y - y_ | (y - y_)²
--- |  --- | --- | --- | ---
2,104 | 399.9 | 385  | 14 | 196
1,600 | 329.9 | 292  | 37 | 1,369
2,400 | 369   | 439  | -70 | 4,900
| | | <span class="total"> Total:</span> |6,465


Here we can see the actual price value, the predicted price value, and the difference between them. Then we'll need to sum up the difference so we have a number that tells us how much error there is in this prediction model. The problem is, the 3rd row has -70 as its value. We have to deal with this negative value if we want to use the difference between the prediction and price as our error measuring stick. That's why we introduce an additional column that shows the error squared, thus getting rid of the negative value.

This is now our definition of doing better -- a better model is one that has less error. Total error is measured as the sum of the errors for each point in our data set. For each point, the error is measured by the difference between the actual value and the predicted value, raised to the power of 2. This is called our **loss function** (also, **cost function**).

