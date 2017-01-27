---
layout: prediction_post
published: False
title: Feedforward Neural Networks - Part 2 of A Visual and Interactive Guide to Neural Networks
---

<!--more-->

While the networks we discussed in the [previous post]() show some important basic concepts, we'll need to continue our look at more concepts that can improve our prediction models.


We'll slightly adjust the way we represent the networks from the previous weights. The bias node specifically is more commonly represented like this

<div class="img-div" markdown="0">
    <img src="/images/two_input_tow_output_softmax_neural_network.png" />
    The calculation flows from the left to the right. Before we can use this net for prediction, we'll have to run a "training" process that will give us the values of all the weights (<span class="weight-node-text">w</span>) and biases (<span class="bias-node-text">b</span>).
</div>


The dataset we'll use this time will be the [Titanic passenger list]() from Kaggle. It lists the names and other information of the passengers and shows whether each passenger survived the sinking event or not. We'll attempt to build a network that predicts whether a passenger survived or not. We'll start with only two feature columns of the dataset (and add more later):



<div class="two_variables">
  <table>
    <thead>
      <tr>
        <th>Age</th>
        <th>Sex</th>
        <th>Survived?</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>22</td>
        <td>male</td>
        <td>No</td>
      </tr>
      <tr>
        <td>38</td>
        <td>female</td>
        <td>Yes</td>
      </tr>
      <tr>
        <td>26</td>
        <td>female</td>
        <td>Yes</td>
      </tr>
      <tr>
        <td colspan="3">… 891 rows total</td>
      </tr>
    </tbody>
  </table>
</div>

Let's start with training a shallow neural network to predict survival given given a passenger's information. Running two thousand steps of gradient descent looks like this:

[Training Viz]


The trained network now looks like this:

(hover or click on values in the table to see their individual predictions)

<div id="neural-network-calculation-viz"></div>

<div id="neural-network-calculation-table"></div>


When trained, this shallow network can correctly guess only 81% of the training examples. To improve on it, we'll need to pull another tool from our toolbox.

## Feed it forward


## Activation functions





<script type="text/javascript" src="/js/nnVizUtils.js"></script>
<script type="text/javascript" src="/js/neuralNetworkCalculationViz.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.6.0/katex.min.css" integrity="sha384-wE+lCONuEo/QSfLb4AfrSk7HjWJtc4Xc1OiB2/aDBzHzjnlBP4SX7vjErTcwlA8C" crossorigin="anonymous">
<script src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.6.0/katex.min.js" integrity="sha384-tdtuPw3yx/rnUGmnLNWXtfjb9fpmwexsd+lr6HUYnUY4B7JhB5Ty7a1mYd+kto/s" crossorigin="anonymous"></script>

## Where we left off

In the [previous post]() we discussed some of the basics of neural networks:

 * How the inputs flow through the network to calculate a prediction
 * How we multiply the inputs by the respective weights and add the biases
 * How we calculate Mean Square Error and how we use it as a measuring stick to gauge how accurate our model is
 * We touched very lightly on Gradient Descent, an iterative algorithm that takes steps towards a better set of weights and biases
 * We started with regression models and moved into classification models in the last example


There are a couple more concepts we need to touch upon if we're to build a better understanding of proper neural networks. These will be network structure concepts that improve the behaviours of our networks and our prediction models.




## Feed it forward
Let's keep tweaking the example we started with. Your friend who wants to buy a house provided you with this list of house size & price and how appropriate for her she thinks the size and price are.


{::options parse_block_html="true" /}
<div class="two_variables">

 | Area (x1) | Price (x2) | Label (y) |
 | --- | --- | --- |
 | 2,104 |  399,900 | Good |
 | 1,600 |  329,900 | Good |
 | 2,400 |  369,000 | Good |
 | 1,416 | 	232,000 | Bad |
 | 3,000 | 	539,900 | Bad |
 | 1,985 | 	299,900 | Good |
 | 1,534 | 	314,900 | Bad |
 | 1,427 | 	198,999 | Good |
 | 1,380 | 	212,000 | Good |
 | 1,494 | 	242,500 | Good |

</div>

In [this notebook](), I trained a softmax regression neural network against this dataset. After the training, the network could correctly classify only 8 out of the 10 examples in the training set.

Take a look at how the trained network calculates the prediction for each example in the training set:
