---
published: false
title: training-and-deploying-your-first-tensorflow-vision-model-with-android
---
In my [previous post](http://jalammar.github.io/Supercharging-android-apps-using-tensorflow/), we looked at how TensorFLow's [example Android app](https://github.com/tensorflow/tensorflow/tree/master/tensorflow/examples/android) works. We saw how it loaded an object-detection machine-learning model, and used it to make predictions about what it sees from the camera.

In this post, we will go a step further. We will see the entire journey from creating another vision machine-learning model until deploying it on Android. We will be building on the official TensorFlow tutorials as well as modifying the example app to serve our purpose. In the end, we will have an app that detects digits.

The first required reading for this tutorial is the official [MNIST For ML Beginners](https://www.tensorflow.org/versions/r0.11/tutorials/mnist/beginners/index.html) tutorial. It introduces the dataset we will be using to train our model. It's called MNIST, and it has 70,000 images of digits that we can use to train and test our model. Each of these images is 28x28 pixels. Each pixel is a byte whose value ranges from 0 (white) to 255 (black). The tutorial introduces the mechanics of dealing with the model, then helps you build and train a simple model that ends up having 92% accuracy of digit detection.

The second tutorial, [Deep MNIST for Experts](https://www.tensorflow.org/versions/r0.11/tutorials/mnist/pros/index.html)