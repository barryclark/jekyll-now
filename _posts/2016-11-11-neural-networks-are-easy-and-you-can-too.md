---
layout: prediction_post
published: False
title: DRAFT - A Visual Beginners Guide to Neural Networks
---

## Motivation
I'm not a machine learning expert. I'm a software engineer whose only brushes with AI before 2015 were an expert systems class in college and minor experiments with recommendations and search engine optimization. I had always wanted to delve deeper into machine learning, but never really found my "in". That's why when Google open sourced TensorFlow in November 2015, I got super excited and knew it was time to jump in and start the learning journey. Not to sound dramatic, but to me, it actually felt kind of like Prometheus handing down fire to mankind from the Mount Olympus of machine learning. In the back of my head was the idea that the entire field of Big Data and technologies like Hadoop were vastly accelerated when Google researchers released their Map Reduce paper. This time it's not a paper -- it's the actual software they use internally after years and years of evolution.

So I started learning what I can about the basics of

## Start here
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

Personally, my first instinct would be to get the average price per sq ft. That comes to $180 per sq ft.

Welcome to your first neural network! Now it's not quite at Siri level yet, but now you know the fundamental building block. And it looks like this:


<div class="img-div" markdown="0">
    <img src="/images/simple_NN_1.png" />
</div>

Diagrams like this show you the structure of the network and how it calculates a prediction. The calculation starts from the input node at the left. The input value flows to the right. It gets multiplied by the weight and the result becomes our output.

Multiplying 2,000 sq ft by 180 gives us $360,000. That's all there is to it at this level. Calculating the prediction is simple multiplication. But before that, we needed to think about the weight we'll be multiplying by. Here we started with an average, later we'll look at better algorithms that can scale as we get more inputs and more complicated models. Finding the weight is our "training" stage. So whenever you hear of someone "training" a neural network, it just means finding the weights we use to calculate the prediction.


<div class="img-div" markdown="0">
    <img src="/images/NNs_formula_no_bias.png" />
</div>

This is a form of prediction. This is a simple predictive model that takes an input, does a calculation, and gives an output (since the output can be of continuous values, the technical name for what we have would be a "regression model")

Let us visualize this process (for simplicity, let's switch our price unit from $1 to $1000. Now our weights is 0.180 rather than 180):

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
2,104 | 399.9 | 379  | 21 | 449
1,600 | 329.9 | 288  | 42 | 1756
2,400 | 369   | 432  | -63 | 3969
| | | <span class="total"> Average:</span> |<b>2,058</b>





</div>


Here we can see the actual price value, the predicted price value, and the difference between them. Then we'll need to sum up the difference so we have a number that tells us how much error there is in this prediction model. The problem is, the 3rd row has -63 as its value. We have to deal with this negative value if we want to use the difference between the prediction and price as our error measuring stick. That's one reason why we introduce an additional column that shows the error squared, thus getting rid of the negative value.

This is now our definition of doing better -- a better model is one that has less error. Total error is measured as the average of the errors for each point in our data set. For each point, the error is measured by the difference between the actual value and the predicted value, raised to the power of 2. This is called [Mean Square Error](http://mste.illinois.edu/patel/amar430/meansquare.html) . Using it as a guide to train our model makes it our **loss function** (also, **cost function**).


Now that we defined our measuring stick for what makes a better model, let's experiment with a couple more weight values and compare them with our average pick:


<p class="gif-space" />

![]({{site.baseurl}}/images/lines_and_errors_animated.gif)

<p class="gif-space" />


Our lines can better approximate our values now that we have this b value added to the line formula. In this context, we call it a "bias". This makes our neural network look like this:




<div class="img-div" markdown="0">
    <img src="/images/NNs_bias.png" />
</div>





We can generalize it by saying that a neural network with one input and one output (*spoiler warning:* and no hidden layers) looks like this:




<div class="img-div" markdown="0">
    <img src="/images/NNs_bias_2.png" />
</div>
Where W and b are values we find during the training process. X is the input we plug into the formula (area in sq ft in our example). Y is the predicted price.



Calculating a prediction now uses this formula:



<div class="img-div" markdown="0">
    <img src="/images/NNs_formula.png" />
</div>



So our current model calculates predictions by plugging in the area of house as x in this formula:




<div class="img-div" markdown="0">
    <img src="/images/NNs_formula_ex.png" />
</div>


## Train Your Dragon
How about you take a crack at training our toy neural network? Minimize the loss function by tweaking the weight and bias dials. Can you get an error value below 799?


<div id="training-one-chart" class="training-chart"/>
<table id="training-one" class="training-table">


    <tr>

        </td>
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
            <input id="weightSlider" type="range" class="weight" min="0" max="0.4" step="0.001"
                >
        </td>
        <td class="slider-value">
            <span id="weight" class="weight">0</span>
        </td>
    </tr>
    <tr>
        <td>
            Bias
        </td>
        <td>
            <input id="biasSlider" type="range" class="bias"  min="0" max="460" step="1" >
        </td>
        <td class="slider-value">
            <span id="bias" class="bias">0</span>
        </td>
    </tr>
</table>

<div id="neural-network-graph" class="nn-graph-area" ></div>




## Automation
Congratulations on manually training your first neural network! Let's look at how to automate this training process. Below is another example with an additional autopilot-like functionality. These are the GD Step buttons. They use an algorithm called "Gradient Descent" to try to step towards the correct weight and bias values that minimize the loss function.


<div class="container"  markdown="0">
    <div class="row">

        <div class="col-sm-6 graphs">
            <div id="training-one-gd-chart" class="training-chart" ></div>


                <div class="row training-chart mini-charts">
                    <div id="training-one-gd-error-chart" class="error-chart col-xs-6" ></div>
                    <div id="training-one-gd-heatmap" class="error-chart col-xs-6" ></div>
                </div>

        </div>

        <div class="col-sm-6">

            <table id="training-one-gd" class="training-table">
                <tr>
                    <td colspan="3" class="gd-buttons">
                        <input type="button" value="GD Step" id="gradient-descent-button"  class="btn btn-primary" />
                        <input type="button" value="10 GD Steps " id="gradient-descent-10-button"  class="btn btn-secondary" />
                        <input type="button" value="100 GD Steps " id="gradient-descent-100-button"  class="btn btn-secondary" />
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
                        <input id="weightSlider" type="range" class="weight" min="0" max="0.4" step="0.001">
                    </td>
                    <td class="slider-value">
                        <span id="weight" class="weight">0</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        Bias
                    </td>
                    <td>
                        <input id="biasSlider" type="range"  class="bias" min="0" max="460" step="1">
                    </td>
                    <td class="slider-value">
                        <span id="bias" class="bias">0</span>
                    </td>
                </tr>
            </table>

            <div id="neural-network-gd-graph" class="nn-graph-area" ></div>
        </div>
    </div>
</div>

The two new graphs are to help you track the error values as you fiddle with the parameters (weight and bias) of the model . It's important to keep track of the error as the training process is all about reducing this error as much possible.

How does gradient descent know where its next step should be? Calculus. You see, knowing the function we're minimizing (our loss function, the average of (y_ - y)² for all our data points), and knowing the current inputs into it (the current weight and bias, the derivatives of the loss function tell us which direction to nudge W and B in order to minimize the error.




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


</div>


Our neural network with two variables looks like this:


<div class="img-div" markdown="0">
    <img src="/images/NNs_2_variables.png" />
</div>



We now have to find two weights (one for each input) and one bias to create our new model.

Calculating Y looks like this:



<div class="img-div" markdown="0">
    <img src="/images/NNs_formula_two_variables.png" />
</div>



But how do we find w1 and w2? This is a little trickier than when we only had to worry about one weight value. How much does having an extra bathroom change how we predict the value of a home?

Take a stab at finding the right weights and bias. You will start here to see the complexity we start getting into as the number of our inputs increase. We start losing the ability to create simple 2d shapes that allow us to visualize the model at a glance. Instead, we'll have to mainly rely on how the error value is evolving as we tweak our model parameters.


<div class="container"  markdown="0">
    <div class="row">

        <div class="col-sm-6 graphs">
            <div id="training-two-chart" class="error-chart" ></div>

        </div>

        <div class="col-sm-6">

            <table id="training-two-table" class="training-table">
                <tr>
                    <td colspan="3" class="gd-buttons">
                        <input type="button" value="GD Step" id="gradient-descent-button"  class="btn btn-primary" />
                        <input type="button" value="10 GD Steps " id="gradient-descent-10-button"  class="btn btn-secondary" />
                        <input type="button" value="100 GD Steps " id="gradient-descent-100-button"  class="btn btn-secondary" />
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
                        Weight #1
                    </td>
                    <td>
                        <input id="weight0Slider" type="range" class="weight" min="-0.4" max="0.4" step="0.001">
                    </td>
                    <td class="slider-value">
                        <span id="weight0" class="weight">0</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        Weight #2
                    </td>
                    <td>
                        <input id="weight1Slider" type="range" class="weight" min="-100" max="200" step="0.001">
                    </td>
                    <td class="slider-value">
                        <span id="weight1" class="weight">0</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        Bias
                    </td>
                    <td>
                        <input id="biasSlider" type="range"  class="bias" min="-100" max="300" step="1">
                    </td>
                    <td class="slider-value">
                        <span id="bias" class="bias">0</span>
                    </td>
                </tr>
            </table>

            <div id="neural-network-two-graph" class="nn-graph-area" ></div>

        </div>
    </div>
</div>

Our trusty gradient descent is here to help once again. It still is valuable in helping us find the right weights and bias.



## Depth perspective
As the problems we try to solve get more and more complicated, so must our tools get more and more powerful. The truth of the matter is, the models we saw in this post until now are very simple and aren't that useful in most real-life situations. There are cases where a straight line through data points is useful as it indicates some trend, but we're not going to build self-driving cars wih linear regression.


<script type="text/javascript" src="/js/simple_nn.js"></script>
<script type="text/javascript" src="/js/two_variable_nn.js"></script>
