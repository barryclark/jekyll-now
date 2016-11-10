---
published: false
title: training-and-deploying-your-first-tensorflow-vision-model-with-android
---

In my [previous post](http://jalammar.github.io/Supercharging-android-apps-using-tensorflow/), we looked at how TensorFLow's [example Android app](https://github.com/tensorflow/tensorflow/tree/master/tensorflow/examples/android) works. We saw how it loaded an object-detection machine-learning model, and used it to make predictions about what it sees from the camera.

In this post, we will go a step further. We will see the entire journey from creating another vision machine-learning model until deploying it on Android. We will be building on the official TensorFlow tutorials as well as modifying the example app to serve our purpose. In the end, we will have an app that detects digits.

## Prediction Primer
Let us discuss a couple of the basic concepts of prediction before we proceed. You can skip this section if you have a good understanding of machine learning.

Let's start with a simple example. Say you're helping a friend who wants to buy a house. She was quoted $400,000 for a 2000 sq ft house (185 meters). Is this a good price or not?

It's not easy to tell without a frame of reference. So you ask your friends who have bought houses in that same neighborhoods, and you end up with three data points:

 Area (sq ft)(x) | Price (y)
 ---: | :--- 
 2,104 | 399,900 
 1,600 | 329,900 
 2,400 | 369,000 

Personally, my first instinct would be to get the average price per sq ft. That comes to $183 per sq ft. Multiply that by the area of the house, and you get $366,000.

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
| | | Total: |6,465

Here we can see the actual price value, the predicted price value, and the difference between them. Then we'll need to sum up the difference so we have a number that tells us how much error there is in this prediction model. The problem is, the 3rd row has -70 as its value. We have to deal with this negative value if we want to use the difference between the prediction and price as our error measuring stick. That's why we introduce an additional column that shows the error squared, thus getting rid of the negative value.

This is now our definition of doing better -- a better model is one that has less error. Total error is measured as the sum of the errors for each point in our data set. For each point, the error is measured by the difference between the actual value and the predicted value, raised to the power of 2. This is called our **loss function** (also, **cost function**).



## Groundwork
The first required reading for this tutorial is the official [MNIST For ML Beginners](https://www.tensorflow.org/versions/r0.11/tutorials/mnist/beginners/index.html) tutorial. It introduces the dataset we will be using to train our model. It's called MNIST, and it has 70,000 images of digits that we can use to train and test our model. Each of these images is 28x28 pixels. Each pixel is a byte whose value ranges from 0 (white) to 255 (black). The tutorial introduces the mechanics of dealing with the model, then helps you build and train a simple model that ends up having 92% accuracy of digit detection.

The second tutorial, [Deep MNIST for Experts](https://www.tensorflow.org/versions/r0.11/tutorials/mnist/pros/index.html),uses the same dataset to train a more fancy model that ends up having 99.2% accuracy. You don't have to understand the details of how it exactly works. For our purpose, you can treat it as a black box with inputs and outputs. If it triggers your curiosity to learn more about machine learning and neural networks, you  will love [this series of lectures](https://www.youtube.com/watch?v=g-PvXUjD6qg&list=PLlJy-eBtNFt6EuMxFYRiNRS07MCWN5UIA). The model's central cool idea of convolutions is discussed beautifully in [lecture 7: Convolutional Neural Networks](https://www.youtube.com/watch?v=AQirPKrAyDg).

We can choose to deploy either of these two models. I'm going to be using the latter due to its higher accuracy. Another reason is that after training the model, both behave the same -- we load them, feed them inputs, and get out output. We don't pay an engineering penalty for the higher accuracy after the model is ready.

## Installing TensorFlow
If you haven't already, go ahead and [Install TensorFlow](https://www.tensorflow.org/versions/r0.11/get_started/os_setup.html#download-and-setup). On my mac laptop, I went ahead with the [Anaconda installation](https://www.tensorflow.org/versions/r0.11/get_started/os_setup.html#anaconda-installation) since I had [Anaconda](https://www.continuum.io/downloads) installed. It's useful because it packages many useful machine learning and data science tools including [Jupyter Notebook](http://jupyter.org/) which is a great way to execute and share code. On my windows desktop, I used these [Docker installation instructions](https://gist.github.com/ericjang/959c03168c0bdfac1ca3). Regardless of your OS, both these and the linux instructions will hopefully lead you in the end to a Jupyter Notebook where you can import tensorflow and run the code to build your graph and train your network.

## Preparing the model
We can now proceed to building our graph and training our model. I prepared [this notebook]() that follows the steps outlined in the expert tutorial. You can copy the contents of each cell and execute it in your own notebook. 

The first cell just imports necessary libraries and gets the labeled data we'll use for training. The following command gets and extracts the 70,000 images and prepares them in a neat class for us to use:"

``mnist = input_data.read_data_sets(`MNIST_data/`, one_hot=True)``


The second cell tells TensorFlow how the graph is built. None of the computations are executed. We just declare the sequence of operations to TensorFlow and will later tell it to execute it as many times as we need. It is very important here to note the names of the input tensor and the output tensor. Note that I specified their names:

        x = tf.placeholder(\\"float", shape=[None, 784], name="input_node")
and

        y_conv=tf.nn.softmax(tf.matmul(h_fc1, W_fc2) + b_fc2, name="output_node")

We will need these names later when we feed the inputs into the model and want to read the prediction output. Also notice that the input expects a two dimensional tensor (or array). The first dimension correspends to images, so if we want, we can send multiple images to be identified at once. The second dimension has the pixel values of each image (784 being the values of a flattened 28x28 pixel image).

The third cell is the training cell. It's the one takes the most time. It took about 30 minutes to run on my 2010 Macbook Pro, but about 10 minutes on both my i5 desktop and 2015 Macbook Air. 

This cell is also where the magic happens. It is where TensorFlow will take an image, pass it through the computation graph (initially set to random weights), compare the output of the computation with the actual value of the image (the dataset has both the images and the labels saying what digit is in each image -- this is a supervised learning exercise), and then when it sees that the output is way off from the actual value, it will go back and adjust the weights so that the next computation will be closer to the expected value (this is the jist of the backpropegation algorithm, a central concept in neural networks).

When we do this process many times with all the images in the training dataset, we will end up with a good set of weights that make our model highly accurate. 

To test how accurate our model is, we make it compute its predictions of our test dataset (which we sat aside and did not used in the training process) and compare its predictions with the actualy values. In this case, the model had an accuracy of 97.7%.

## Exporting the model
After training the model and ensuring it has a reasonable accuracy, the next step is to export it into a file we can package within our app. TensorFlow uses Google's protobuff protocol for serialization.	There are three steps in the exporting process:
 1. In the second cell in the notebook, we had this command that wrote the computation graph to a file

        tf.train.write_graph(sess.graph.as_graph_def(), FLAGS.model_dir, input_graph_name)

   This file contains the operations that are used to calculate a prediction. It is missing one key element, however. Computing a prediction needs both the graph of operations as well as the weights that resulted from the training process.

 2. The weights are saved to a "checkpoint" file in the third cell using this command:
 
        saver.save(sess, checkpoint_file, global_step=0, latest_filename=checkpoint_state_name)

 3. We now need to "freeze" the graph. Freezing merges the operations graph and the weights checkpoint file into one file. It also transforms the graph in a way that is required to make it run  on Android (the graph contains variable operations, they need to be transformed to constant operations to run in Android's C++ tensorflow environment).
 
   Freezing is handled by [freeze_graph.py](https://github.com/tensorflow/tensorflow/blob/master/tensorflow/python/tools/freeze_graph.py). There are two ways to do it. First is to checkout the tensorflow source, install bazel, build freeze_graph as a TensorFlow python tool, and then ask it to freeze the graph via the command line.
   
   The second is to just copy the code (or import it as a part of a python module).
   The third cell takes the graph and checkpoint files and generates the frozen graph file. It need freeze_graph.py to run 

## Image format

## Image conversion

## Preparing the input
