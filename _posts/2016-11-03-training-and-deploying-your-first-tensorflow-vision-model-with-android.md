---
published: false
title: training-and-deploying-your-first-tensorflow-vision-model-with-android
---
In my [previous post](http://jalammar.github.io/Supercharging-android-apps-using-tensorflow/), we looked at how TensorFLow's [example Android app](https://github.com/tensorflow/tensorflow/tree/master/tensorflow/examples/android) works. We saw how it loaded an object-detection machine-learning model, and used it to make predictions about what it sees from the camera.

In this post, we will go a step further. We will see the entire journey from creating another vision machine-learning model until deploying it on Android. We will be building on the official TensorFlow tutorials as well as modifying the example app to serve our purpose. In the end, we will have an app that detects digits.

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

        x = tf.placeholder("float", shape=[None, 784], name="input_node")
and

        y_conv=tf.nn.softmax(tf.matmul(h_fc1, W_fc2) + b_fc2, name="output_node")

We will need these names later when we feed the inputs into the model and want to read the prediction output. Also notice that the input expects a two dimensional tensor (or array). The first dimension correspends to images, so if we want, we can send multiple images to be identified at once. The second dimension has the pixel values of each image (784 being the values of a flattened 28x28 pixel image).


## Exporting the model
After installing TensorFlow on your computer and going through the tutorials, the next step would be to somehow extract a serialization of the model that we can then package within our app. 


## Image format

## Image conversion

## Preparing the input
