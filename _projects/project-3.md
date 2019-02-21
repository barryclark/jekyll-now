---
layout: post
title: 'Image classification'
---
Image Classification using Tensorflow & Keras

In this project to teach the computer to recognize images and classify them into one of the 2 categories viz 
* Mountain Bike 
* Road Bike  

We all know that Keras has been integrated into Tensorflow, it is wiser to build your network using tf.keras and insert anything you want in the network using pure TensorFlow.

We decided to use the mountain bike/road bike dataset that consists of 200 images sized 990 x 580 pixels. The training dataset contains 2 classes that are mutually exclusive (do not overlap)with each class containing 100 images. The test dataset contains 10 images with both classes.
Here are a few pictures were taken from the dataset:

 ![Input Images](/images/projects/proj-3/inputimages.PNG "Mountain Bike Images")

This project utilizes tf.keras and creates the classifier model using Keras layers.
Here's how the model with tf.keras layer looks like:

{% highlight python %}
model = keras.Sequential([
keras.layers.Conv2D(32,3, input_shape = (64, 64, 3), activation = 'relu'),
keras.layers.Conv2D(32,3, activation = 'relu'),
keras.layers.MaxPool2D(strides=2),
keras.layers.Conv2D(32,3, activation = 'relu'),
keras.layers.Conv2D(32,3, activation = 'relu'),
keras.layers.MaxPool2D(strides=2),
keras.layers.Conv2D(32,3, activation = 'relu'),
keras.layers.MaxPool2D(strides=2),
keras.layers.Flatten(),
keras.layers.Dense(32, activation='relu'),
keras.layers.Dense(16, activation='relu'),
keras.layers.Dense(2, activation='softmax'),
])
{% endhighlight %}
Just by tweaking some activation functions and loss functions you can get an accuracy as good as the
Google’s Inception model.

{% highlight python %}
# Compiling the model
model.compile(optimizer=Opt, 
              loss ='categorical_crossentropy',
              metrics=['accuracy'])
# Fit the model
model.fit(x,y,epochs=EPOCHS)
print('End of Training')
{% endhighlight %}
{% highlight python %}
Epoch 1/20
200/200 [======] - 4s 18ms/step - loss: 2.7821 - acc: 0.4700
Epoch 2/20
200/200 [======] - 3s 13ms/step - loss: 0.6784 - acc: 0.5700
Epoch 3/20
200/200 [======] - 3s 13ms/step - loss: 0.5543 - acc: 0.8150
Epoch 4/20
200/200 [======] - 3s 13ms/step - loss: 0.3760 - acc: 0.9800
.
.
200/200 [======] - 3s 13ms/step - loss: 7.5560e-05 - acc: 1.0000
Epoch 17/20
200/200 [======] - 3s 13ms/step - loss: 5.7742e-05 - acc: 1.0000
Epoch 18/20
200/200 [======] - 3s 13ms/step - loss: 4.2686e-05 - acc: 1.0000
Epoch 19/20
200/200 [======] - 3s 13ms/step - loss: 3.4039e-05 - acc: 1.0000
Epoch 20/20
200/200 [======] - 3s 13ms/step - loss: 3.0814e-05 - acc: 1.0000
End of Training
{% endhighlight %}
![Model Results](/images/projects/proj-3/tfkerasoutput.png "Prediction with Confidence")


We were able to build an artificial convolutional neural network that can recognize images with an accuracy of 100% using TensorFlow. We performed pre-processing tasks on the images to make the model more generic, split the dataset into a number of batches and finally build and train the model.

Check <a href="https://github.com/shreyas1701/Tensorflow-Keras-Image-Classification">github repo</a> for code and analysis.
