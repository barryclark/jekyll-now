---
layout: prediction_post
published: False
title: How Machines Learn (The Illustrated Gradient Descent)
---


<div class="img-div-any-width" markdown="0">
  <image src="/images/grad/gradient-descent-overview.png"/>
  <br />
</div>


At a time when a lot of people are trying to learn machine learning to improve their careers or satisfy their curiosity, I feel there's still a lot that can be done to improve how accessible this body of knowledge is to outsiders. Nowhere is this more evident than in the "learning" concept of machine learning (neural networks in particular). A concept shrouded in mystery forcing non-specialists to speak of it in handwavy terms. The leading "learning" concept in neural networks is an algorithm called Gradient Descent.

The [second post I wrote in this blog](/visual-interactive-guide-basics-neural-networks/) sets the stage for this post by showing how a simple prediction is calculated and how we evaluate models (by calculating error/loss). It leads you right up to the curtain of Gradient Descent and how it can rapidly improve the accuracy of a prediction model. In this post we'll start with a simpler example then peer through that curtain. It would be beneficial if you read that post first.

<!--more-->

## But First, Ice Cream!
If a group of three people walk into an ice cream shop, how much do you think they'll end up paying?

This is a type of question where the only possible answer is "it depends". We don't have a formula for this type of broad question. We can, however, make a reasonable guess if we looked at the sales records of that shop:

<table class="features-table">
  <tr>
    <th class="mdc-text-light-green-600">
    # of people in group
    </th>
    <th class="mdc-text-purple-600">
    $ price paid for ice cream
    </th>
  </tr>
  <tr>
    <td class="mdc-bg-light-green-50">
    1
    </td>
    <td class="mdc-bg-purple-50">
    10
    </td>
  </tr>
  <tr>
    <td class="mdc-bg-light-green-50">
    1
    </td>
    <td class="mdc-bg-purple-50">
    10
    </td>
  </tr>
  <tr>
    <td class="mdc-bg-light-green-50">
    2
    </td>
    <td class="mdc-bg-purple-50">
    20
    </td>
  </tr>
  <tr>
    <td class="mdc-bg-light-green-50">
    4
    </td>
    <td class="mdc-bg-purple-50">
    40
    </td>
  </tr>
</table>

By looking at this dataset, can you predict how much this group of three people would pay? Your prediction doesn't need to be 100% accurate, just the best estimate given the data that we have.

It shouldn’t be too difficult to see a pattern between the numbers in the column on the left and those on the right – namely, that we multiply the number of people by $10 to get the price that group will pay. That just means on average, a person pays $10 at this ice cream shop. We can now show the table and weight of that column together:


<table class="features-table">
  <tr>
    <th class="mdc-text-light-green-600">
    # of people in group
    </th>
    <th class="mdc-text-purple-600">
    $ price paid for ice cream
    </th>
  </tr>
  <tr>
    <td class="mdc-bg-light-green-50">
    1
    </td>
    <td class="mdc-bg-purple-50">
    10
    </td>
  </tr>
  <tr>
    <td class="mdc-bg-light-green-50">
    1
    </td>
    <td class="mdc-bg-purple-50">
    10
    </td>
  </tr>
  <tr>
    <td class="mdc-bg-light-green-50 ">
    2
    </td>
    <td class="mdc-bg-purple-50">
    20
    </td>
  </tr>
  <tr>
    <td class="mdc-bg-light-green-50">
    4
    </td>
    <td class="mdc-bg-purple-50">
    40
    </td>
  </tr>
  <tr>
    <td class="inactive_cell">

    </td>
    <td class="inactive_cell">

    </td>
  </tr>
  <tr>
    <th class="mdc-bg-grey-700 mdc-text-cyan-200">
    weight 1
    </th>
    <td class="inactive_cell">

    </td>
  </tr>
  <tr>
    <td class="mdc-bg-grey-700 mdc-text-cyan-200">
    10
    </td>
    <td class="inactive_cell">
    </td>
  </tr>
</table>


We can carry-over that same pattern to predict values for numbers of people we don’t have in our dataset.

<table class="features-table">
  <tr>
    <th class="mdc-text-light-green-600">
    # of people in group
    </th>
    <th class="mdc-text-pink-600">
    Prediction: $ price paid for ice cream
    </th>
  </tr>
  <tr>
    <td class="mdc-bg-light-green-50">
    3
    </td>
    <td class="mdc-text-pink-600 mdc-bg-pink-50">
    ?
    </td>
  </tr>
  <tr>
    <td class="inactive_cell">

    </td>
    <td class="inactive_cell">

    </td>
  </tr>
  <tr>
    <th class="mdc-bg-grey-700 mdc-text-cyan-200">
    weight 1
    </th>
    <td class="inactive_cell">

    </td>
  </tr>
  <tr>
    <td class="mdc-bg-grey-700 mdc-text-cyan-200">
    10
    </td>
    <td class="inactive_cell">
    </td>
  </tr>
</table>



To calculate the prediction, we simply multiply <span class="mdc-text-light-green-800 "> 3 </span> (a feature, the number of people) by <span class="mdc-text-cyan-600">$10</span> (a weight, the average price a person usually pays at this shop) to get a predicted price of <span class="mdc-text-pink-600">$30</span> that this group will pay.


## Welcome to Machine Learning!
This is the most basic distillation of the machine learning concept that lies at the center of many practical machine learning use cases: *supervised learning*. Let’s recap what we did:

1.	We needed to predict a certain value
2.	We found historical data containing that value and other inputs (features). Luckily there was a strong correlation between the two values
3.	We looked at the dataset, learned the pattern that links the feature and the label. That pattern is often just a single number we multiply with, called a weight.
4.	That weight can now be used to predict that certain value using the features associated with it.

This is the basic formula that powers everything from Siri to Google Translate. No doubt that idea has to be extended in multiple different directions to solve more difficult problems, but this is the kernel that it all boils down to. Step #3 in particular is where the “learning” part of “machine learning” happens. Learning is the process of finding out the appropriate weights that explain the relationship between features and the label.

We can visualize this “trained” ice cream prediction model (trained because we found the appropriate weight) as looking like this:


<div class="img-div-any-width" markdown="0">
  <image src="/images/grad/ice-cream-linear-model.png"/>
  <br />
</div>



And it calculates its prediction by simply multiplying the input feature by the weight parameter. (3 x 10 = 30).

## Judging Model Quality
In [the earlier post](/visual-interactive-guide-basics-neural-networks/) , we discussed the concept of error, and how we can use Mean Square Error to judge the quality of a model's predictions. This error value can also be used to compare two models.

Let's look at this dataset for the coffee shop next to the ice cream shop:

<table class="features-table">
  <tr>
    <th class="mdc-text-light-green-600">
    # of people in group
    </th>
    <th class="mdc-text-purple-600">
    $ price paid for coffee
    </th>
  </tr>
  <tr>
    <td class="mdc-bg-light-green-50">
    1
    </td>
    <td class="mdc-bg-purple-50">
    6
    </td>
  </tr>
  <tr>
    <td class="mdc-bg-light-green-50">
    2
    </td>
    <td class="mdc-bg-purple-50">
    23
    </td>
  </tr>
  <tr>
    <td class="mdc-bg-light-green-50 ">
    4
    </td>
    <td class="mdc-bg-purple-50">
    22
    </td>
  </tr>

</table>

Which of the following two models is better at making predictions based on this dataset? These models are not trained, we just picked a random parameter for each of them:


<div class="img-div-any-width" markdown="0">
  <image src="/images/grad/two-coffee-linear-models.png"/>
  <br />
</div>


How do we compare the two models? We make both models predict the values for our labeled dataset, and then we score them based on how close their predictions were to the actual values. We'll use Mean Square Error for this scoring step. This is the calculation of MSE for model #1. Let's first calculate its predictions for each sample in our dataset:




<table class="features-table">
  <tr>
    <th class="mdc-text-light-green-600">
    # of people
    </th>
    <th class="mdc-text-purple-600">
    $ price paid
    </th>


    <th class="mdc-text-pink-600">
    Prediction
    </th>


  </tr>
    <tr>
      <th style="font-family:monospace;opacity:0.5;">
      <span class="mdc-text-light-green-600">features</span>
      </th>
      <th style="font-family:monospace;opacity:0.5;">
      <span class="mdc-text-purple-600">labels</span>
      </th>


      <th style="font-family:monospace;opacity:0.5;">
      <span class="mdc-text-cyan-600">weight</span> ×
      <span class="mdc-text-light-green-600">features</span>
      =
      <span class="mdc-text-pink-600">predictions</span>
      </th>


    </tr>
  <tr>
    <td class="mdc-bg-light-green-50">
    1
    </td>
    <td class="mdc-bg-purple-50">
    6
    </td>
    <td class="mdc-bg-pink-50">


    <span class="mdc-text-cyan-600">5</span> ×
    <span class="mdc-text-light-green-600">1</span>
    =
    <span class="mdc-text-pink-600">5</span>


    </td>
  </tr>
  <tr>
    <td class="mdc-bg-light-green-50">
    2
    </td>
    <td class="mdc-bg-purple-50">
    23
    </td>
    <td class="mdc-bg-pink-50">

        <span class="mdc-text-cyan-600">5</span> ×
        <span class="mdc-text-light-green-600">2</span>
        =
        <span class="mdc-text-pink-600">10</span>

    </td>
  </tr>
  <tr>
    <td class="mdc-bg-light-green-50">
    4
    </td>
    <td class="mdc-bg-purple-50">
    22
    </td>
    <td class="mdc-bg-pink-50">

        <span class="mdc-text-cyan-600">5</span> ×
        <span class="mdc-text-light-green-600">4</span>
        =
        <span class="mdc-text-pink-600">20</span>

    </td>
  </tr>

  <tr>
    <td>

    </td>
    <td  class="inactive_cell">

    </td>
    <td class="inactive_cell">

    </td>
  </tr>

  <tr>
    <th class="mdc-bg-grey-700 mdc-text-cyan-200">
    weight 1: <br />
    5
    </th>
    <td class="inactive_cell">

    </td>
    <td class="inactive_cell">
    </td>
  </tr>
</table>


After calculating the model's predictions, we can now subtract from the actual label, square that result (to get rid of the negative signs if they exist, amongst other reasons), and then get the average/mean of those errors -- which is basically Mean Square Error:




<table class="features-table">
  <tr>
    <th class="mdc-text-light-green-600">
    # of people
    </th>
    <th class="mdc-text-purple-600">
    $ price paid
    </th>


    <th class="mdc-text-pink-600">
    Prediction
    </th>

    <th class="mdc-text-orange-600">
    Error
    </th>

    <th class="mdc-text-orange-600">
    Squared Error
    </th>

  </tr>
    <tr>
      <th style="font-family:monospace;opacity:0.5;">
      <span class="mdc-text-light-green-600">features</span>
      </th>
      <th style="font-family:monospace;opacity:0.5;">
      <span class="mdc-text-purple-600">labels</span>
      </th>


      <th style="font-family:monospace;opacity:0.5;">
      <span class="mdc-text-pink-600">predictions</span>
      </th>

      <th style="font-family:monospace;opacity:0.5;">
      <span class="mdc-text-purple-600">labels</span> -
      <span class="mdc-text-pink-600">predictions</span> =
      <span class="mdc-text-orange-600">Error</span>
      </th>

      <th style="font-family:monospace;opacity:0.5;">
      <span class="mdc-text-orange-600">Error</span>²
      </th>

    </tr>
  <tr>
    <td class="mdc-bg-light-green-50">
    1
    </td>
    <td class="mdc-bg-purple-50">
    6
    </td>
    <td class="mdc-bg-pink-50">
    5
    </td>
    <td class="mdc-bg-orange-50">
    <span style="opacity:0.3">
      <span class="mdc-text-purple-600">6</span> -
      <span class="mdc-text-pink-600">5</span> =
    </span>
      1
    </td>
    <td class="mdc-bg-orange-50">
    <span style="opacity:0.3">1² =</span> 1
    </td>
  </tr>
  <tr>
    <td class="mdc-bg-light-green-50">
    2
    </td>
    <td class="mdc-bg-purple-50">
    23
    </td>
    <td class="mdc-bg-pink-50">
    10
    </td>
    <td class="mdc-bg-orange-50">
    <span style="opacity:0.3">
      <span class="mdc-text-purple-600">23</span> -
      <span class="mdc-text-pink-600">10</span> =
    </span>
    13
    </td>
    <td class="mdc-bg-orange-50">
    <span style="opacity:0.3">13² = </span> 169
    </td>
  </tr>
  <tr>
    <td class="mdc-bg-light-green-50">
    4
    </td>
    <td class="mdc-bg-purple-50">
    22
    </td>
    <td class="mdc-bg-pink-50">
    20
    </td>
    <td class="mdc-bg-orange-50">
      <span style="opacity:0.3">
        <span class="mdc-text-purple-600">22</span> -
        <span class="mdc-text-pink-600">20</span> =
      </span>
      2

    </td>
    <td class="mdc-bg-orange-50">
    <span style="opacity:0.3">2² =</span> 4
    </td>
  </tr>

  <tr>
    <td>

    </td>
    <td class="inactive_cell">

    </td>
    <td class="inactive_cell">

    </td>
    <td  class="inactive_cell">

    </td>
    <td   class="inactive_cell">

    </td>
  </tr>

  <tr>
    <th class="mdc-bg-grey-700 mdc-text-cyan-200">
    weight 1: <br />
    5
    </th>
    <td class="inactive_cell">

    </td>
    <td  class="inactive_cell" colspan="2" style="text-align:right;font-size:80%;font-weight:bold;">
    Average (Mean Squared Error) <br />
    <span style="opacity:0.3">(1 + 169 + 4) / 3 = </span> &nbsp;
    </td>
    <td class="mdc-bg-orange-50 inactive_cell" style="background-image: linear-gradient(#FF8400, #FFE594); color:white; vertical-align:middle;
    text-shadow: 3px 3px 10px #333;
    font-size:150%;
    border-radius: 20px;
    ">
    58
    </td>
  </tr>
</table>

If we do the same calculation for model #2, then we know which of the two models are better:


<div class="img-div-any-width" markdown="0">
  <image src="/images/grad/two-linear-models-with-mse.png"/>
  <br />
  The model with less error is the better model. So Model #1 makes better, more accurate predictions than Model #2
</div>


So model #1 is better than model #2. But is that the best model we can come up with? What if we picked a few more random numbers and were able to find a model with lower error value -- which is very likely. But is that really the best way to find a good model?

## Enter The North Star
Thanks to gradient descent, we don't have to stumble in the dark by picking random models and comparing them against each other. Gradient descent gives us the ability to take successive steps that continue to improve the model (decreasing the error) until we're satisfied we have a good enough model.

We start by picking our initial parameter(s) randomly. We then take a number of gradient descent steps (anywhere from one to millions of steps) -- each step making adjustments to the parameters and (hopefully) decreasing the error.

## Gradient Descent Overview
Let's use gradient descent to find the best model for our coffee shop. The process goes like this:

1- We pick a random parameter, say 1.

<div class="img-div-any-width" markdown="0">
  <image src="/images/grad/gradient-descent-random-initialization.png"/>
  <br />
</div>


2- We take one gradient descent step, resulting in an adjustment for the parameter that hopefully leads to less error


<div class="img-div-any-width" markdown="0">
  <image src="/images/grad/gradient-descent-step-high-level.png"/>
  <br />
</div>

Blink or scroll too quickly and you might miss it, but see how that error dropped? THAT is learning. That is model training. This one simple trick is at the heart of the AI revolution that is forever transforming humanity, disrupting industries and economies, and challenging our conceptions of intelligence and sentience.

3- We repeat step #2 until we're satisfied

<div class="img-div-any-width" markdown="0">
  <image src="/images/grad/gradient-descent-repeat.png"/>
  <br />
</div>

Notice that at step #4, the improvement in MSE over step #3 is very tiny, so we can use that as an indication to stop training the model, and use the model with the parameter 6.6 as our trained model. We can now say that our model is trained and is ready to make predictions. You can see that the training is effective because the error of this trained model (38.5) is less than the error in both random models we looked at before (58 and 116).

Three gradient descent steps are good enough for this tiny model on this toy dataset. In practice, models are more complex and require much, much larger datasets (with thousands or even millions of examples, as opposed to the three examples in this dataset).

In the next section, we'll look more closely at some of the details of gradient descent to get a fuller picture of the process.

### Quiz

 * Which of the two following statements describes how gradient descent trains a model?
   * A) Increasing the number of parameters the model uses to calculate a prediction
   * B) Updating the value parameters so the model has less error
 * How many steps of gradient descent are necessary to train a model?

## Gradient Descent in More Detail

Now that we've looked at an overview of the major steps of gradient descent, let's present a more detailed look that includes more details.

### Step #1: Parameter Initialization

When we start training the model, we do not know the best initial value of its parameter(s) will be. But we've got to start somewhere. So we pick a random value. There are best practices for initializing model weights that are valuable for real-world models. When we have more advanced models with many parameters, randomly selecting different initial values for each parameter improves the model's ability to learn.


<div class="img-div-any-width" markdown="0">
  <image src="/images/grad/gradient-descent-random-init-detailed.png"/>
  <br />
  Calculating MSE in this step is optional. We don't really need it as we'll repeat it in the gradient descent step. I'm including it here to set up the following figure.
</div>



One common way to visualize gradient descent is to think of it as being teleported to a mountain and trying to climb down -- with lower altitudes corresponding to less error. Think of as this, where the X-axis is the parameter value, and the Y-axis is the Error/loss at that value. Our goal is to minimize the error/loss function, which in this case is Mean Square Error (there are other loss functions).


<div class="img-div-any-width" markdown="0">
  <image src="/images/grad/gradient-descent-weight-1-random-init.png"/>
  <br />

</div>


In this case, we chose to teleport to parameter value 1, we then calculate the error at the point, and that tells us how high we are on this mountain (263). Let's proceed to the gradient descent step and see if we can find a better parameter that takes down to a lower elevation/error.

### Step #2: A gradient descent step

A gradient descent step goes through three steps:



1-  Let's use the model with the parameter 1 to make predictions for the samples in our datasets.


<div class="img-div-any-width" markdown="0">
  <image src="/images/grad/gradient-descent-algo-s1.png"/>
  <br />

</div>

<br />

2- We can now calculate a value called a <span class="grad-descent-one">gradient</span>. The <span class="grad-descent-one">gradient</span> is the mathematical signal that will tell us how best to update our parameter to decrease the error. The <span class="grad-descent-one">gradient</span> calculation involves using the datasets and the predictions we just calculated. These values are plugged into a formula called an "update rule" that is derived from the loss function (MSE in this case). It's okay at this point to treat the <span class="grad-descent-one">gradient</span> and the <span style="color:#4FB6F7">learning rate</span> as black magic as long as you know their names and how they factor in the process.

<div class="img-div-any-width" markdown="0">
  <image src="/images/grad/gradient-descent-algo-s2.png"/>
  <br />

</div>


<br />

3- Calculate MSE from the predictions of the model with the newly updated weight. Did the error decrease? If so, then yay! The learning process is working!


<div class="img-div-any-width" markdown="0">
  <image src="/images/grad/gradient-descent-algo-s3.png"/>
  <br />

</div>


<br />
<br />


The the model this step generated has an MSE of 44 -- clearly an improvement over the initial parameter we randomly picked. Let's compare the weight (5.7) and error (44) after this step with the weight and error before it (1, 263):

<div class="img-div-any-width" markdown="0">
  <image src="/images/grad/gradient-descent-weight-1-step-1.png"/>
  <br />

</div>




### Step #3: Repeat Step #2

We have now completed the first iteration in the training loop. We continue repeating the same process as step #2:


<div class="img-div-any-width" markdown="0">
  <image src="/images/grad/gradient-descent-weight-1-step-2.png"/>
  <br />
</div>

We can see that the error keeps dropping, and we're successfully descending towards lower and lower error values:

<div class="img-div-any-width" markdown="0">
  <image src="/images/grad/gradient-descent-weight-1-step-22.png"/>
  <br />

</div>


There is no limit to how many steps we need to take to train a model. There are practical considerations to when to stop training, with a common strategy being that you continue training a model until the improvements between each step and the next start becoming too small. This is a strategy called *[early stopping](https://machinelearningmastery.com/early-stopping-to-avoid-overtraining-neural-network-models/)*.  




## Why Machines Learn
So what's going on here? Why does this work? What is this magical <span class="grad-descent-one">gradient</span> signal and where is it coming from? To answer these questions, let's look at the first gradient descent iteration above.


<div class="img-div-any-width" markdown="0">
  <image src="/images/grad/gradient-descent-weight-vs-error-1.png"/>
  <br />

</div>



By now we know that this point represents how much MSE error is in the predictions of the model with weight 1 for our dataset. If I go ahead and calculate the MSE for all points in this graph (which would be easy here because the model is simple and the dataset is tiny, not as easy to do in most real-world problems), we'd get the following figure:


<div class="img-div-any-width" markdown="0">
  <image src="/images/grad/gradient-descent-weight-vs-error-curve-1.png"/>
  <br />

</div>


Since our goal is to find the bottom of this valley (minimize the error function), gradient descent gives us a way to do that. The <span class="grad-descent-one">gradient</span> is the slope of the line tangent to the error curve, which only touches the curve at the point (1,263). The value of ths slope is that it tells us the inclination of the curve at that point -- and so, it's telling us which direction we should go if we want to head down.


<div class="img-div-any-width" markdown="0">
  <image src="/images/grad/gradient-descent-weight-vs-error-tangent.png"/>
  <br />

</div>



It's no coincidence that the error curve looks like a smooth valley like this. This shape is a property of the loss function. That is actually why we chose MSE as our loss function. The gradient is calculated by using the derivative of the loss function.

### The Learning Rate

Let's get back to our mindset when we were calculating the first gradient descent step above. So we've calculated the gradient, and our goal is find a weight (by moving left or right in the figure) that would decrease the error (knowing that we are limited to move only within the rainbow-colored error curve, a curve that we couldn't actually see). How do we reflect the slope (which we can now call the <span class="grad-descent-one">gradient</span>) to select a new value for the weight?

<div class="img-div-any-width" markdown="0">
  <image src="/images/grad/gradient-descent-weight-vs-error-tangent-only.png"/>
  <br />

</div>


Can we simply add the weight and the <span class="grad-descent-one">gradient</span>? Let's see, 1 plus -79.3 is -78.3. MSE of the predictions at that weight value is 50,573.


<div class="img-div-any-width" markdown="0">
  <image src="/images/grad/gradient-descent-weight-vs-error-no-learning-rate-1.png"/>
  <br />
</div>

Wow. No. That's bad. That's really bad. Not only did the error shoot up, but it also sent us the wrong way (left, when the correct direction to decrease the error is to go right). This tells us it's better to the subtract the <span class="grad-descent-one">gradient</span> from the weight. Let's calculate that, 1 minus -79.3 is 80.3. MSE at this weight is 37991.

<div class="img-div-any-width" markdown="0">
  <image src="/images/grad/gradient-descent-weight-vs-error-no-learning-rate-2.png"/>
  <br />
</div>

Now we're heading the correct direction, but we've moved so far that we actually jumped the bottom of the valley and managed to increase the error. What we need to do is multiple the <span class="grad-descent-one">gradient</span> by a small number so we can take a reasonably sized step. That is what the learning rate is. In this case, we picked 0.06 to be our learning rate. Let's multiply it by the gradient, then subtract the result from the current weight (1). So that's 1 - 0.06 * (-79.3) = 1 + 4.7 = 5.7. Which is exactly the calculation we made above.


<div class="img-div-any-width" markdown="0">
  <image src="/images/grad/gradient-descent-weight-vs-error-learning-rate.png"/>
  <br />
</div>


## Multiple Parameters
Gradient descent is equally effective with multiple parameters. Let's look at a basic dataset with two features. We'll adjust our example so for each group that enters the store, we'll count the number of adults, and number of children in that group (the assumption being that the average purchase price for adults is different from that for children).


<table class="features-table">
  <tr>
    <th class="mdc-text-light-green-600">
    # of adults in group
    </th>
    <th class="mdc-text-light-green-600">
    # of children in group
    </th>
    <th class="mdc-text-purple-600">
    $ price paid for ice cream
    </th>
  </tr>
  <tr>
    <td class="mdc-bg-light-green-50">
    1
    </td>
    <td class="mdc-bg-light-green-50">
    1
    </td>
    <td class="mdc-bg-purple-50">
    6
    </td>
  </tr>
  <tr>
    <td class="mdc-bg-light-green-50">
    2
    </td>
    <td class="mdc-bg-light-green-50">
    0
    </td>
    <td class="mdc-bg-purple-50">
    23
    </td>
  </tr>
  <tr>
    <td class="mdc-bg-light-green-50 ">
    4
    </td>
    <td class="mdc-bg-light-green-50 ">
    2
    </td>
    <td class="mdc-bg-purple-50">
    22
    </td>
  </tr>

</table>

A simple linear model assigns a weight to each feature/column, for example:

<table class="features-table">
  <tr>
    <th class="mdc-text-light-green-600">
    # of adults in group
    </th>
    <th class="mdc-text-light-green-600">
    # of children in group
    </th>
    <th class="mdc-text-purple-600">
    $ price paid for ice cream
    </th>
  </tr>
  <tr>
    <td class="mdc-bg-light-green-50">
    1
    </td>
    <td class="mdc-bg-light-green-50">
    1
    </td>
    <td class="mdc-bg-purple-50">
    10
    </td>
  </tr>
  <tr>
    <td class="mdc-bg-light-green-50 ">
    2
    </td>
    <td class="mdc-bg-light-green-50">
    0
    </td>
    <td class="mdc-bg-purple-50">
    20
    </td>
  </tr>
  <tr>
    <td class="mdc-bg-light-green-50">
    4
    </td>
    <td class="mdc-bg-light-green-50 ">
    2
    </td>
    <td class="mdc-bg-purple-50">
    40
    </td>
  </tr>
  <tr>
    <td class="inactive_cell">

    </td>
    <td class="inactive_cell">

    </td>
  </tr>
  <tr>
    <th class="mdc-bg-grey-700 mdc-text-cyan-200">
    weight 1
    </th>

    <th class="mdc-bg-grey-700 mdc-text-cyan-200">
    weight 2
    </th>
    <td class="inactive_cell">

    </td>
  </tr>
  <tr>
    <td class="mdc-bg-grey-700 mdc-text-cyan-200">
    5
    </td>
    <td class="mdc-bg-grey-700 mdc-text-cyan-200">
    3
    </td>
    <td class="inactive_cell">
    </td>
  </tr>
</table>

A prediction model for such a dataset can look like this:


<div class="img-div-any-width" markdown="0">
  <image src="/images/grad/gradient-descent-multiple-features-model.png"/>
  <br />
</div>



And it calculates a prediction by multiplying each feature by its associated weight, and then summing them up:

<div class="img-div-any-width" markdown="0">
  <image src="/images/grad/gradient-descent-multiple-features-prediction.png"/>
  <br />
</div>


In the following example we can see the steps to update the parameters of a model with two weights.


<div class="img-div-any-width" markdown="0">
  <image src="/images/grad/gradient-descent-multiple-parameters.png"/>
  <br />
</div>


In the same vein, gradient descent can be used to train models with millions of parameters. The difference between them is that each parameter has a different update rule based on its place in the prediction calculation.
