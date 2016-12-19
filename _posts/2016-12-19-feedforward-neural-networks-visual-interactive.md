---
layout: prediction_post
published: False
title: Feedforward Neural Networks - Part 2 of A Visual and Interactive Guide to Neural Networks
---

In the [previous post]() we discussed some of the basics of neural networks:
 * How the inputs flow through the network to calculate a prediction
 * How we multiply the inputs by the respective weights and add the biases
 * How we calculate Mean Square Error and how we use it as a measuring stick to gauge how accurate our model is
 * We touched very lightly on Gradient Descent, an iterative algorithm that takes steps towards a better set of weights and biases
 * We started with regression models and moved into classification models in the last example


There are a couple more concepts we need to touch upon if we're to build a better understanding of proper neural networks. So let's dive right in.

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

When we trained a neural network to try to classify it, it got an error value of X


## Activation functions