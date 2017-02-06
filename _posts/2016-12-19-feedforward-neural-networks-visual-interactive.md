---
layout: prediction_post
published: False
title: Feedforward Neural Networks - Part 2 of A Visual and Interactive Guide to Neural Networks
---

If you had been aboard the Titanic, would you have survived the sinking event? Let's build a model to predict one's odds of survival.

The dataset we'll use this time will be the [Titanic passenger list]() from Kaggle. It lists the names and other information of the passengers and shows whether each passenger survived the sinking event or not.
<!--more-->



While the networks we discussed in the [previous post]() show some important basic concepts, we'll need to continue our look at more concepts that can improve our prediction models.



We'll slightly adjust the way we represent the networks from the previous weights. The bias node specifically is more commonly represented like this

<div class="img-div" markdown="0">
    <img src="/images/two_input_tow_output_softmax_neural_network.png" />
    The calculation flows from the left to the right. Before we can use this net for prediction, we'll have to run a "training" process that will give us the values of all the weights (<span class="weight-node-text">w</span>) and biases (<span class="bias-node-text">b</span>).
</div>


We'll attempt to build a network that predicts whether a passenger survived or not. We'll start with only two feature columns of the dataset (and add more later):



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

{::options parse_block_html="true" /}
<div class="row neuron-expo">
<div class="col-sm-4" markdown="0">
    <img src="/images/neuron.png" alt=" neuron image"/>
</div>
<div class="col-sm-8 side-column">
A neuron sums its inputs, sends the value to the next layer.

    output = input_1 + input_2
</div>
</div>



{::options parse_block_html="true" /}
<div class="row neuron-expo">
<div class="col-sm-4" >

<img src="/images/weighted_neuron.png" alt="weighted neuron image"/>

</div>
<div class="col-sm-8 side-column">

A weighted neuron sums its inputs, multiplies the result by a specific value called the "weight", sends the value to the next layer.

    output = weight * (input_1 + input_2)
</div>
</div>


{::options parse_block_html="true" /}
<div class="row neuron-expo">
<div class="col-sm-4" >

<img src="/images/activation_weighted_neuron.png" alt="weighted neuron with activation"/>

</div>
<div class="col-sm-8 side-column">

It's often useful to apply certain math functions to the weighted outputs. These are called "activation functions" because historically they translated the output of the neuron into either 1 (On/active) or 0 (Off).


    def activation_function(x):
        # Do something to the value
        ...

    weighted_sum = weight * (input_1 + input_2)
    output = activation_function(weighted_sum)
</div>
</div>




{::options parse_block_html="true" /}
<div class="row neuron-expo">
<div class="col-sm-4" >

<img src="/images/sigmoid_weighted_neuron.png" alt="weighted neuron with activation"/>

</div>
<div class="col-sm-8 side-column">

One common activation function is called "sigmoid". It's useful because it squashes the output value of a neuron to between 0 and 1 according to a specific curve (that is not a straight line, hence it's called a "nonlinear activation function").

<span id="sigmoid_function" style="font-size:200%"></span>

<script>
var sigmoid_el = $("#sigmoid_function");
console.log(sigmoid_el);
katex.render("\\frac{1}{1 + e^{-x}}", sigmoid_el[0]);
console.log("printing")
</script>

Where e is the mathematical constant approximately equal to 2.71828


    import numpy as np

    def sigmoid(x):
        return 1/(1+np.exp(-x))

    weighted_sum = weight * (input_1 + input_2)
    output = sigmoid(weighted_sum)


</div>
</div>





{::options parse_block_html="true" /}
<div class="row neuron-expo">
<div class="col-sm-4" >


</div>
<div class="col-sm-8 side-column">


Interact a little with sigmoid to see how it transforms various values

<div id="sigmoid-graph" style="width:100%"></div>

<input id="sigmoid-slider" type="range" class="weight" min="-20" max="20" step="0.01">
<span class="slider-value">
            <span id="sigmoid-input-value" class="weight">0</span>
</span>

<span style="font-size:150%"></span><span id="sigmoid_function" style="font-size:200%"><span class="katex"><span class="katex-mathml"><math><semantics><mrow><mfrac><mrow><mn>1</mn></mrow><mrow><mn>1</mn><mo>+</mo><msup><mi>e</mi><mrow><mo>−</mo><mi>x</mi></mrow></msup></mrow></mfrac></mrow><annotation encoding="application/x-tex">\frac{1}{1 + e^{-x}}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="strut" style="height: 0.845108em;"></span><span class="strut bottom" style="height: 1.24844em; vertical-align: -0.403331em;"></span><span class="base textstyle uncramped"><span class="mord reset-textstyle textstyle uncramped"><span class="sizing reset-size5 size5 reset-textstyle textstyle uncramped nulldelimiter"></span><span class="mfrac"><span class="vlist"><span class="" style="top: 0.345em;"><span class="fontsize-ensurer reset-size5 size5"><span class="" style="font-size: 0em;">​</span></span><span class="reset-textstyle scriptstyle cramped"><span class="mord scriptstyle cramped"><span class="mord mathrm">1</span><span class="mbin">+</span><span class="mord">  <span class="mord mathit">e</span>  <span class="vlist"><span class="" style="top: -0.289em; margin-right: 0.0714286em;"><span class="fontsize-ensurer reset-size5 size5"><span class="" style="font-size: 0em;">​</span></span><span class="reset-scriptstyle scriptscriptstyle cramped"><span class="mord scriptscriptstyle cramped">       <span id="sigmoid-formula-input" class="mord mathit">−(x)</span>      </span></span></span><span class="baseline-fix"><span class="fontsize-ensurer reset-size5 size5"><span class="" style="font-size: 0em;">​</span></span>​</span></span></span></span></span></span><span class="" style="top: -0.23em;"><span class="fontsize-ensurer reset-size5 size5"><span class="" style="font-size: 0em;">​</span></span><span class="reset-textstyle textstyle uncramped frac-line"></span></span><span class="" style="top: -0.394em;"><span class="fontsize-ensurer reset-size5 size5"><span class="" style="font-size: 0em;">​</span></span><span class="reset-textstyle scriptstyle uncramped"><span class="mord scriptstyle uncramped"><span class="mord mathrm">1</span></span></span></span><span class="baseline-fix"><span class="fontsize-ensurer reset-size5 size5"><span class="" style="font-size: 0em;">​</span></span>​</span></span></span><span class="sizing reset-size5 size5 reset-textstyle textstyle uncramped nulldelimiter"></span></span></span></span></span></span>

<span id="sigmoid-result"></span>

</div>
</div>







Move the slider around to see how sigmoid deals with different values
[activation function viz - sigmoid]

Get an intuition for the whole system:
[activation function viz - inputs + weight]





## Feed it forward


## Activation functions





<script type="text/javascript" src="/js/nnVizUtils.js"></script>
<script type="text/javascript" src="/js/neuralNetworkCalculationViz.js"></script>
<script type="text/javascript" src="/js/sigmoid_graph.js"></script>


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
