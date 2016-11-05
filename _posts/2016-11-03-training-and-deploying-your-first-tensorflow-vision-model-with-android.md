---
published: false
title: training-and-deploying-your-first-tensorflow-vision-model-with-android
---
In my [previous post](http://jalammar.github.io/Supercharging-android-apps-using-tensorflow/), we looked at how TensorFLow's [example Android app](https://github.com/tensorflow/tensorflow/tree/master/tensorflow/examples/android) works. We saw how it loaded an object-detection machine-learning model, and used it to make predictions about what it sees from the camera.

In this post, we will go a step further. We will see the entire journey from creating another vision machine-learning model until deploying it on Android. We will be building on the official TensorFlow tutorials as well as modifying the example app to serve our purpose. In the end, we will have an app that detects digits.

## Model
The first required reading for this tutorial is the official [MNIST For ML Beginners](https://www.tensorflow.org/versions/r0.11/tutorials/mnist/beginners/index.html) tutorial. It introduces the dataset we will be using to train our model. It's called MNIST, and it has 70,000 images of digits that we can use to train and test our model. Each of these images is 28x28 pixels. Each pixel is a byte whose value ranges from 0 (white) to 255 (black). The tutorial introduces the mechanics of dealing with the model, then helps you build and train a simple model that ends up having 92% accuracy of digit detection.

The second tutorial, [Deep MNIST for Experts](https://www.tensorflow.org/versions/r0.11/tutorials/mnist/pros/index.html),uses the same dataset to train a more fancy model that ends up having 99.2% accuracy. You don't have to understand the details of how it exactly works. For our purpose, you can treat it as a black box with inputs and outputs. If it triggers your curiosity to learn more about machine learning and neural networks, you  will love [this series of lectures](https://www.youtube.com/watch?v=g-PvXUjD6qg&list=PLlJy-eBtNFt6EuMxFYRiNRS07MCWN5UIA). The model's central cool idea of convolutions is discussed beautifully in [lecture 7: Convolutional Neural Networks](https://www.youtube.com/watch?v=AQirPKrAyDg).

We can choose to deploy either of these two models. I'm going to be using the latter due to its higher accuracy. Another reason is that after training the model, both behave the same -- we load them, feed them inputs, and get out output. We don't pay an engineering penalty for the higher accuracy after the model is ready.

## Preparing the model
After installing TensorFlow on your computer and going through the tutorials, the next step would be to somehow extract a serialization of the model that we can then package within our app. 


## Image format

## Image conversion

## Preparing the input