---
layout: prediction_post
published: True
title: A Visual Beginners Guide to Neural Networks
---
<script src="/js/jquery-3.1.1.slim.min.js"></script>

<script type="text/javascript" src="/js/d3.min.js"></script>



Let's start with a simple example. Say you're helping a friend who wants to buy a house. She was quoted $400,000 for a 2000 sq ft house (185 meters). Is this a good price or not?

It's not easy to tell without a frame of reference. So you ask your friends who have bought houses in that same neighborhoods, and you end up with three data points:



{::options parse_block_html="true" /}
<div class="one_variable">

 | Area (sq ft) (x) | Price (y) |
 | --- | --- |
 | 2,104 | 399,900 |
 | 1,600 | 329,900 |
 | 2,400 | 369,000 |

</div>

Personally, my first instinct would be to get the average price per sq ft. That comes to $183 per sq ft. Do you agree?

Welcome to your first neural network! Now it's not quite at Siri level yet, but now you know the fundamental building block. And it looks like this:


![]({{site.baseurl}}/images/simple_NN_1.png)



Multiply that by the area of the house, and you get $366,000.

<p class="gif-space"/>

![]({{site.baseurl}}/images/NNs_animated_2.gif)

This is a form of prediction. This is a simple predictive model that takes an input, does a calculation, and gives an output (since the output can be of infinite values, the technical name for what we have would be a "regression model")

Let us visualize this process (for simplicity, our price axis will be $1000):

<p class="gif-space"/>

![]({{site.baseurl}}/images/data_points_graph_animated.gif)

<p class="gif-space"/>

<p class="gif-space"/>

## Harder, Better, Faster, Stronger

Can we do better than estimate the price based on the average of our data points? Let's try. Let's first define what it means to be better in this scenario. If we apply our model to the three data points we have, how good of a job would it do?


<p class="gif-space"/>

![]({{site.baseurl}}/images/data_points_error_animated.gif)

<p class="gif-space"/>

That's quite a bit of yellow. Yellow is bad. Yellow is error. We want to shrink yellow as much as we can.



{::options parse_block_html="true" /}
<div class="one_variable">


Area (sq ft) (x) | Price ($1000) (<span class="y_">y_</span>) | Prediction (<span class="y">y</span>) | <span class="y_">y_</span> - <span class="y">y</span> | (<span class="y_">y_</span> - <span class="y">y</span>)²
--- |  --- | --- | --- | ---
2,104 | 399.9 | 385  | 14 | 196
1,600 | 329.9 | 292  | 37 | 1,369
2,400 | 369   | 439  | -70 | 4,900
| | | <span class="total"> Total:</span> |6,465
| | | <span class="total"> Average:</span> |<b>2,155</b>


</div>


Here we can see the actual price value, the predicted price value, and the difference between them. Then we'll need to sum up the difference so we have a number that tells us how much error there is in this prediction model. The problem is, the 3rd row has -70 as its value. We have to deal with this negative value if we want to use the difference between the prediction and price as our error measuring stick. That's why we introduce an additional column that shows the error squared, thus getting rid of the negative value.

This is now our definition of doing better -- a better model is one that has less error. Total error is measured as the sum of the errors for each point in our data set. For each point, the error is measured by the difference between the actual value and the predicted value, raised to the power of 2. This is called our **loss function** (also, **cost function**).



<p class="gif-space"/>

![]({{site.baseurl}}/images/lines_and_errors_animated.gif)

<p class="gif-space"/>


Our lines can better approximate our values now that we have this b value added to the line formula. In this context, we call it a "bias". This makes our neural network look like this:



<p class="gif-space-half"/>

![]({{site.baseurl}}/images/NNs_bias.png)




We can generalize it by saying that a neural network with one input and one output (*spoiler warning:* and no hidden layers) looks like this:


<p class="gif-space-half"/>

![]({{site.baseurl}}/images/NNs_bias_2.png)

<p class="gif-space-half"/>

## Train Your Dragon
How about you take a crack at training our toy neural network? Minimize the loss function by tweaking the weight and bias dials. Can you get an error value below 2,397?


<div id="training-one-chart" />
<table id="training-one">

    <tr>
        <td>
            Error
        </td>
        <td colspan="2">
            <span id="error-value" ></span>
        </td>

    </tr>

    <tr>
        <td class="error-cell" colspan="3">
            <span id="error-value-message"></span>&nbsp;
        </td>

    </tr>
    <tr>
        <td>
            Weight
        </td>
        <td>
            <input id="weightSlider" type="range" min="0" max="0.4" step="0.001"
                >
        </td>
        <td class="slider-value">
            <span id="weight">0</span>
        </td>
    </tr>
    <tr>
        <td>
            Bias
        </td>
        <td>
            <input id="biasSlider" type="range" min="0" max="460" step="1"
                    >
        </td>
        <td class="slider-value">
            <span id="bias">0</span>
        </td>
    </tr>
</table>




## Automation
Congratulations on manually training your first neural network! Let's look at how to automate this training process. Below is another example with one additional button. This button uses an algorithm called "Gradient Descent" to try and take a step towards the correct weight and bias values that minimize the loss function.


<div id="training-one-gd-chart" />

<table id="training-one-gd">
    <tr>
        <td colspan="3">
            <input type="button" value="GD Step" id="gradient-descent-button" />
            <input type="button" value="GD 10 Steps " id="gradient-descent-10-button" />
            <input type="button" value="GD 100 Steps " id="gradient-descent-100-button" />
            <input type="button" value="GD 100 Steps " id="gradient-descent-converge-button" />
        </td>
    </tr>
    <tr>
        <td>
            Error
        </td>
        <td colspan="2">
            <span id="error-value" ></span>
        </td>

    </tr>

    <tr>
        <td class="error-cell" colspan="3">
            <span id="error-value-message"></span>&nbsp;
        </td>

    </tr>
    <tr>
        <td>
            Weight
        </td>
        <td>
            <input id="weightSlider" type="range" min="0" max="4" step="0.001">
        </td>
        <td class="slider-value">
            <span id="weight">0</span>
        </td>
    </tr>
    <tr>
        <td>
            Bias
        </td>
        <td>
            <input id="biasSlider" type="range" min="-12.7" max="4" step="0.01">
        </td>
        <td class="slider-value">
            <span id="bias">0</span>
        </td>
    </tr>
</table>





## And Then There Were Two

Is the size of the house the only variable that goes into how much it costs? Obviously there are many other factors. Let's add another variable and see how we can adjust our neural network to it.

Say your friend does a bit more research and find a bunch more data points. She also finds out how many bathrooms each house has:

{::options parse_block_html="true" /}
<div class="two_variables">


 | Area (sq ft) (x1) | Bathrooms (x2) | Price (y)
 | --- | --- | --- |
 | 2,104 |  3 | 399,900 |
 | 1,600 |  3 | 329,900 |
 | 2,400 |  3 | 369,000 |
 | 1,416 | 	2 | 232,000 |
 | 3,000 | 	4 | 539,900 |
 | 1,985 | 	4 | 299,900 |
 | 1,534 | 	3 | 314,900 |
 | 1,427 | 	3 | 198,999 |
 | 1,380 | 	3 | 212,000 |
 | 1,494 | 	3 | 242,500 |
 | 1,940 | 	4 | 239,999 |


</div>


Our neural network with two variables looks like this:


<p class="gif-space-half"/>

![]({{site.baseurl}}/images/NNs_2_variables.png)

<p class="gif-space-half"/>

We now have to find two weights (one for each input) and one bias to create our new model.

Calculating Y looks like this:
[figure]

But how do we find w1 and w2? This is a little trickier than when we only had to worry about one weight value. How much does having an extra bathroom change how we predict the value of a home?




<script type="text/javascript" src="/js/simple_nn.js"></script>
