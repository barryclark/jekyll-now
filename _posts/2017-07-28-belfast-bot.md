---
layout: post
title: Hackathon - Belfast Bot
---
In July 2017 I took part in <a target="_blank" href="https://www.kainos.com/ai-camp-declassified/">Kainos AI Camp.</a> Over two weeks I learned about the theory behind machine learning and how to apply it in software development. 

I widened my knowledge of Javascript (using NodeJS) and Python (using libraries such as NumPy, Pandas, Keras, scikit-learn and Flask). At the end of the camp I took part in a hackathon and worked in a team of three to achieve second place. We developed a chatbot for tourists in Belfast that allowed the user to take a photo of a local landmark and send it to the bot which would then identify the landmark and send back information about it and things nearby. The frontend was developed using the Microsoft Bot Framework. The backend used Python and the Keras package to create a convolutional neural network model which classified landmark images. The backend also had a module for supplying relevant landmark information that used datasets from OpenDataNI, Google Maps API and Wikipedia’s API.

![_config.yml]({{ site.baseurl }}/images/belfast-bot-1.png)


If I was to continue the development of this project I’d like to make full use of Bot Builder cards to present location info better. The CNN model is currently only trained to identify either Belfast City Hall or QUB. I’d like to play about with adding more landmarks into the mix or using the Azure computer vision API. I would also use geolocation data stored in image metadata to improve the accuracy of landmark identification.

![_config.yml]({{ site.baseurl }}/images/belfast-bot-2.png)


This was an incredibly fun opportunity and a brilliant introduction to the world of machine learning. A massive thanks goes out to the folks at Kainos who did a superb job at teaching us.

View the code for the project <a target="_blank" href="https://github.com/JackOHara/Belfast-Tourist-Chatbot">here.</a>