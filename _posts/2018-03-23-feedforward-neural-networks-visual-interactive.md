---
layout: prediction_post
published: True
title: A Visual And Interactive Look at Basic Neural Network Math
---

In the [previous post, we looked at the basic concepts of neural networks](https://jalammar.github.io/visual-interactive-guide-basics-neural-networks/). Let us now take another example as an excuse to guide us to explore some of the basic mathematical ideas involved in prediction with neural networks.

<video width="100%" height="auto" loop autoplay controls>
  <source src="/images/titanic_nn_calculation.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>


<!--more-->


If you had been aboard the Titanic, would you have survived the sinking event? Let's build a model to predict one's odds of survival.

This will be a neural network model building on what we discussed in the [previous post](), but will have a higher prediction accuracy because it utilizes hidden layers and activation functions.

The dataset we'll use this time will be the [Titanic passenger list]() from Kaggle. It lists the names and other information of the passengers and shows whether each passenger survived the sinking event or not.
<!--more-->

The raw dataset looks like this:

{::options parse_block_html="true" /}
<div class="titanic-dataset">

| PassengerId | Survived | Pclass | Name | Sex | Age | SibSp | Parch | Ticket | Fare | Cabin | Embarked|
|--- | ---| --- | ---| ---| ---| ---| ---| ---| ---| ---| ---|
|1	|0|	3|	Braund, Mr. Owen Harris|	male	|22.0	|1	|0	|A/5 21171	|7.2500	| NaN	|S|
|2	|1|	1|	Cumings, Mrs. John Bradley (Florence Briggs Th...	| female	|38.0	|1	|0	|PC 17599	|71.2833	|C85	|C|
|3	|1|	3|	Heikkinen, Miss. Laina	|female	|26.0	|0	|0	|STON/O2. 3101282	|7.9250	|NaN	|S|

</div>

We won't bother with most of the columns for now. We'll just use the sex and age columns as our features, and survival as our label that we'll try to predict.



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
        <td>0</td>
        <td>0</td>
      </tr>
      <tr>
        <td>38</td>
        <td>1</td>
        <td>1</td>
      </tr>
      <tr>
        <td>26</td>
        <td>1</td>
        <td>1</td>
      </tr>
      <tr>
        <td colspan="3">… 891 rows total</td>
      </tr>
    </tbody>
  </table>
</div>

We’ll attempt to build a network that predicts whether a passenger survived or not.

Neural networks need their inputs to be numeric. So we had to change the sex column -- male is now 0, female is 1. You'll notice the dataset already uses something similar for the survival column -- survived is 1, did not survive is 0.

The simplest neural network we can use to train to make this prediction looks like this:


<div class="img-div" markdown="0">
    <img src="/images/two-input-one-output-sigmoid-network.png" alt="neural netowrk with two inputs, one output, and sigmoid output activation"/>
    Calculating a prediction is done by plugging in a value for "age" and "sex". The calculation then flows from the left to the right.
    Before we can use this net for prediction, however, we'll have to run a "training" process that will give us the values for the weights (<span class="weight-node-text">w</span>) and bias (<span class="bias-node-text">b</span>).

<br />
Note: we have slightly adjusted the way we represent the networks from the previous post. The bias node specifically is more commonly represented like this
</div>



Let's recap the elements that make up this network and how they work:

{::options parse_block_html="true" /}
<div class="row neuron-expo vertical-align">
<div class="col-sm-4 small-column" >
<img src="/images/input-neuron.png" alt="input neuron"/>
</div>
<div class="col-sm-8 side-column">

An input neuron is where we plug in an input value (e.g. the age of a person). It's where the calculation starts. The outgoing connection and the rest of the graph tell us what other calculations we need to do to calculate a prediction.

</div>
</div>




{::options parse_block_html="true" /}
<div class="row neuron-expo vertical-align">
<div class="col-sm-4 small-column" >
<img src="/images/weight.png" alt="weighted neuron image"/>
</div>
<div class="col-sm-8 side-column">

If a connection has a weight, then the value is multiplied by that weight as it passes through it.

    connection_output = weight * connection_input
</div>
</div>



{::options parse_block_html="true" /}
<div class="row neuron-expo vertical-align">
<div class="col-sm-4 small-column" markdown="0">
    <img src="/images/neuron.png" alt=" neuron image"/>
</div>
<div class="col-sm-8 side-column">
If a neuron has inputs, it sums their value and sends that sum along its outgoing connection(s).

    node_output = input_1 + input_2
</div>
</div>






### Sigmoid <a name="sigmoid" href="#sigmoid">#</a>
{::options parse_block_html="true" /}
<div class="row neuron-expo vertical-align">
<div class="col-sm-4 small-column">

<img src="/images/sigmoid-neuron.png" alt="sigmoid neuron"/>


</div>
<div class="col-sm-8 side-column">

To turn the network's calculation into a probability value between 0 and 1, we have to pass the value from the output layer through a "sigmoid" formula. Sigmoid squashes the output value of a neuron to between 0 and 1 according to a specific curve.

f(x)= <span id="sigmoid_function" style="font-size:200%"></span>


<script>
var sigmoid_el = $("#sigmoid_function");
console.log(sigmoid_el);
katex.render("\\frac{1}{1 + e^{-x}}", sigmoid_el[0]);
console.log("printing")
</script>

Where e is the mathematical constant approximately equal to 2.71828



    def sigmoid(x):
        return 1/(1 + math.exp(-x))

    output = sigmoid(value)


</div>
</div>





### Sigmoid Visualization <a name="sigmoid-visualization" href="#sigmoid-visualization">#</a>
{::options parse_block_html="true" /}
<div class="row neuron-expo vertical-align">
<div class="col-sm-4 small-column" >


<!-- ==== SIGMOID ACTIVATION GRAPH ==== -->
<table>
<tr>
<td class="sigmoid-input-value explicit-slider-weight-value" valign="middle">
0
</td>
<td>
<img src = "/images/sigmoid-neuron.png" />
</td>
<td class="explicit-activation-output-value">

</td>
</tr>
</table>

</div>
<div class="col-sm-8 side-column">

Interact a little with sigmoid to see how it transforms various values

<!-- ==== SIGMOID SLIDER ==== -->
<table class="activation-graph-slider">
<tr>
<td>
<input id="sigmoid-slider" style="width:400px" type="range" class="weight" min="-20" max="20" step="0.01">
</td>
<td class="slider-value">
<span class="weight sigmoid-input-value">0</span>
</td>
</tr>
</table>

<!-- ==== SIGMOID FORMULA ==== -->
<p style="margin-left:40px">f(<span class="slider-value"><span class="sigmoid-input-value weight">0</span></span>) =
<span style="font-size:150%"></span><span id="sigmoid_function" style="font-size:200%"><span class="katex"><span class="katex-mathml"><math><semantics><mrow><mfrac><mrow><mn>1</mn></mrow><mrow><mn>1</mn><mo>+</mo><msup><mi>e</mi><mrow><mo>−</mo><mi>x</mi></mrow></msup></mrow></mfrac></mrow><annotation encoding="application/x-tex">\frac{1}{1 + e^{-x}}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="strut" style="height: 0.845108em;"></span><span class="strut bottom" style="height: 1.24844em; vertical-align: -0.403331em;"></span><span class="base textstyle uncramped"><span class="mord reset-textstyle textstyle uncramped"><span class="sizing reset-size5 size5 reset-textstyle textstyle uncramped nulldelimiter"></span><span class="mfrac"><span class="vlist"><span class="" style="top: 0.345em;"><span class="fontsize-ensurer reset-size5 size5"><span class="" style="font-size: 0em;">​</span></span><span class="reset-textstyle scriptstyle cramped"><span class="mord scriptstyle cramped"><span class="mord mathrm">1</span><span class="mbin">+</span><span class="mord">  <span class="mord mathit">e</span>  <span class="vlist"><span class="" style="top: -0.289em; margin-right: 0.0714286em;"><span class="fontsize-ensurer reset-size5 size5"><span class="" style="font-size: 0em;">​</span></span><span class="reset-scriptstyle scriptscriptstyle cramped"><span class="mord scriptscriptstyle cramped">       <span id="sigmoid-formula-input" class="mord mathit">−(<span class="sigmoid-value-input-number">x</span>)</span>      </span></span></span><span class="baseline-fix"><span class="fontsize-ensurer reset-size5 size5"><span class="" style="font-size: 0em;">​</span></span>​</span></span></span></span></span></span><span class="" style="top: -0.23em;"><span class="fontsize-ensurer reset-size5 size5"><span class="" style="font-size: 0em;">​</span></span><span class="reset-textstyle textstyle uncramped frac-line"></span></span><span class="" style="top: -0.394em;"><span class="fontsize-ensurer reset-size5 size5"><span class="" style="font-size: 0em;">​</span></span><span class="reset-textstyle scriptstyle uncramped"><span class="mord scriptstyle uncramped"><span class="mord mathrm">1</span></span></span></span><span class="baseline-fix"><span class="fontsize-ensurer reset-size5 size5"><span class="" style="font-size: 0em;">​</span></span>​</span></span></span><span class="sizing reset-size5 size5 reset-textstyle textstyle uncramped nulldelimiter"></span></span></span></span></span></span>
= <span id="sigmoid-result"></span></p>

<!-- ==== SIGMOID GRAPH ==== -->
<div id="sigmoid-graph" style="width:100%"></div>



</div>
</div>




{::options parse_block_html="true" /}
<div class="row neuron-expo vertical-align">
<div class="col-sm-4 small-column" >
<img src="/images/two-input-one-output-sigmoid-network.png" alt="weighted neuron image"/>
</div>
<div class="col-sm-8 side-column">

To bring it all together, calculating a prediction with this shallow network looks like this:

    def sigmoid(x):
        return 1/(1 + math.exp(-x))

    def calculate_prediction(age, sex, weight_1, weight_2, bias):

        # Multiply the inputs by their weights, sum the results up
        layer_2_node = age * weight_1 + sex * weight_2 + 1 * bias

        prediction = sigmoid(layer_2_node)
        return prediction


</div>
</div>

Now that we know the structure of our network, we can train it using  [gradient descent] running on the first 600 rows of the 891-row dataset. I will not be addressing the training process in this post because that's a separate concern at the moment. For now, I just want you to be comfortable with how a trained network calculates a prediction. Once you get this intuition down, we'll proceed to training in a future post.


The training process gives us the following values (with an accuracy of 73.20%):

    weight_1 =   -0.016852 # Associated with "Age"
    weight_2 =   0.704039  # Associated with "Sex" (where male is 0, female is 1)
    bias =       -0.116309

Intuitively, the weights indicate how much their associated property contribute to the prediction -- odds of survival improve the younger a person is (since a larger age multiplied by the negative weight value gives a bigger negative number). They improve more if the person is female.


### Prediction Calculation <a name="prediction-calculation" href="#prediction-calculation">#</a>
The trained network now looks like this:
(hover or click on values in the table to see their individual predictions)


<div class="row vertical-align">
<div id="neural-network-calculation-table" class="col-sm-3"></div>
<div id="neural-network-calculation-viz" class="col-sm-9"></div>
</div>
<div class="nn-tooltip" style="opacity: 0"></div>


An accuracy of 73.20% isn't very impressive. This is a case that can benefit from adding a hidden layer. Hidden layers give the model more capacity to represent more sophisticated prediction functions that may do a better job ([Deep Learning ch.5 page 113](http://www.deeplearningbook.org/contents/ml.html)).


{::options parse_block_html="true" /}
<div class="row neuron-expo vertical-align">
<div class="col-sm-4 small-column" >

<img src="/images/neuron_with_activation.png" alt="weighted neuron with activation"/>

</div>
<div class="col-sm-8 side-column">

It's often useful to apply certain math functions to the weighted outputs. These are called "activation functions" because historically they translated the output of the neuron into either 1 (On/active) or 0 (Off).


    def activation_function(x):
        # Do something to the value
        ...

    weighted_sum = weight * (input_1 + input_2)
    output = activation_function(weighted_sum)

Activation functions are vital for hidden layers. Without them, deep networks would be no better than a shallow linear network. Read the "Commonly used activation functions" section from [Neural Networks Part 1: Setting up the Architecture](https://cs231n.github.io/neural-networks-1/) for a look at various activation functions.
</div>
</div>


### ReLU <a name="relu" href="#relu">#</a>
{::options parse_block_html="true" /}
<div class="row neuron-expo vertical-align">
<div class="col-sm-4 small-column" >

<img src="/images/relu.png" alt="weighted neuron with activation"/>

</div>
<div class="col-sm-8 side-column">

A leading choice for activation function is called ReLU. It returns 0 if its input is negative, returns the number itself otherwise. Very simple!

f(x) = max(0, x)

    # Naive scalar relu implementation. In the real world, most calculations are done on vectors
    def relu(x):
        if x < 0:
            return 0
        else:
            return x


    output = relu(value)
</div>
</div>




### ReLU Visualization <a name="relu-visualization" href="#relu-visualization">#</a>


{::options parse_block_html="true" /}
<div class="row neuron-expo vertical-align">
<div class="col-sm-4 small-column" >


<!-- ==== RELU ACTIVATION GRAPH ==== -->
<table>
<tr>
<td class="relu-input-value explicit-slider-weight-value" valign="middle">
0
</td>
<td>
<img src = "/images/relu.png" />
</td>
<td class="explicit-relu-activation-output-value">

</td>
</tr>
</table>

</div>
<div class="col-sm-8 side-column">


Interact a little with relu to see how it transforms various values

<!-- ==== RELU SLIDER ==== -->
<table class="activation-graph-slider">
<tr>
<td>
<input id="relu-slider" style="width:400px" type="range" class="weight" min="-20" max="20" step="0.01">
</td>
<td class="slider-value">
<span class="weight relu-input-value">0</span>
</td>
</tr>
</table>

<!-- ==== RELU FORMULA ==== -->
<p style="margin-left:40px">f(<span class="slider-value"><span class="relu-input-value weight">0</span></span>) =
max( 0,        <span id="relu-formula-input" class="mord mathit"><span class="relu-value-input-number">x</span></span>)
= <span id="relu-result"></span></p>

<!-- ==== RELU GRAPH ==== -->
<div id="relu-graph" style="width:100%"></div>



</div>
</div>



## Closing
This post has been parked for more than a year. I had attempted to visualize a deeper network after this point, but that never materialized. I hope you enjoyed it. Let me know on [@JayAlammar on Twitter](https://twitter.com/JayAlammar) if you have any feedback. 




<script type="text/javascript" src="/js/nnVizUtils.js"></script>
<script type="text/javascript" src="/js/nn_calc.js"></script>
<script type="text/javascript" src="/js/sigmoid_graph.js"></script>
<script type="text/javascript" src="/js/relu_graph.js"></script>
<script type="text/javascript" src="/js/accuracy-graph.js"></script>





<!--

{::options parse_block_html="true" /}
<div class="row neuron-expo vertical-align">
<div class="col-sm-4 small-column" >

<img src="/images/relu_node_shorthand.png" alt="weighted neuron with activation"/>

</div>
<div class="col-sm-8 side-column">

Now that we'll begin to have a lot more nodes in our network, let's use this figure to represent a weighted neuron activated with relu. The same can be done with the output node with its sigmoid activation.


</div>
</div>

And now we're ready to introduce the structure of our deep(er) network:



<div class="img-div" markdown="0">
    <img src="/images/two-input-three-hidden-one-output-sigmoid-neural-network.png" alt="neural netowrk with two inputs, one output, and sigmoid output activation"/>
    A neural network with 2 inputs, 1 hidden layer containing 3 hidden nodes activate with relu, and one output unit with sigmoid activation. Once trained, it can predict a person's odds of surviving the Titanic sinking event.
</div>






<div class="row vertical-align">
<div id="accuracy-graph" class="col-sm-3"></div>
<div id="neural-network-architecture-viz" class="col-sm-9"></div>
</div>


## Enter The Matrix





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








Two things are different with this network from the ones we discussed in the previous post:

 1. We are now using a different activation function called "sigmoid" (more on that below). Since the output of the network is one of only two values (<i>survived</i> or <i>did not survive</i>), we can use one output value for this case. An output of 1 means 'survived', 0 means 'did not survive' (in reality the network will output values between 0 and 1 that'll round up or down to the closest value -- an output of 0.51 will mean 'survived').

 2. The bias node here follows a more common representation. It's a node of value 1, and the bias will be the weight of that node.




{::options parse_block_html="true" /}
<div class="row neuron-expo">
<div class="col-sm-4" >

<img src="/images/activation_weighted_neuron.png" alt="weighted neuron with activation"/>

</div>
<div class="col-sm-8 side-column">

It's often useful to apply certain math functions to a node's output. These are called "activation functions" because historically they translated the output of the neuron into either 1 (On/active) or 0 (Off).


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



    def sigmoid(x):
        return 1/(1 + math.exp(-x))

    weighted_sum = weight * (input_1 + input_2)
    output = sigmoid(weighted_sum)


</div>
</div>
-->