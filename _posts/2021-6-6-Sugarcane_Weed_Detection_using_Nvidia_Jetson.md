---
layout: post
title: Detecting sugarcane crop against weeds using Nvidia Jetson (Personal Project)
---

<p align="center">
  <img width="600" height="400" src="{{ site.baseurl }}/images/Jetson-weed-detection-Trim-final.gif">
</p>


This project involves identifying weeds in the sugarcane crops, this is a very important problem especially in developing countries like India, Bangladesh etc were these weeds damage crops by almost 2 to 72 per cent. Removing these weeds is an challenging task and currently most of the farmers use manual labour who are skilled at removing the weeds. Automating the process can be of huge benefit thus enabling the farmers to have higher yield.
Following are the components required for this project both software and hardware.

1. Nvidia Jetson Nano (costs 100$)
2. Camera (eyes of the system)
3. Data (very important)
4. Pytorch DL framework (DL framework)
5. LEDs / bread board (LED turns on when it sees a sugarcane crop)

<figure>
<p align="center">
<div class = "column_3">	
  <img src="{{ site.baseurl }}/images/camera.jpg">
</div>
<div class="column_3">  
  <img src="{{ site.baseurl }}/images/Jetson.jpg">
</div>
<div class="column_3">  
  <img src="{{ site.baseurl }}/images/LED.jpg">
</div>
</p>
<figcaption>
<b>	
<p style="color:black;font-size:15px" align="center">1. Camera 2. Jetson nano 3. Breadboard & LED</p>
</b>
</figcaption>
</figure>


The data for this project was obtained from the fields in India. The data consists of raw videos of sugarcane farms. Most of the data was recorded from mobile phones. Following are the steps required to clean and label the data

1. Convert video to set of images
2. Cluster similar images using DBSCAN algorithm
3. Label the images using labelmg tool (open source tool) 


<figure>
<p align="center">
<img src="{{ site.baseurl }}/images/labelmg_tool.png">
</p>
<figcaption>
<b>
<p style="color:black;font-size:15px" align="center"> Labelmg tool for labelling data </p>
</b>
</figcaption>
</figure>

Example of sugarcane and no sugarcane crops

<figure>
<p align="center">
<div class = "column">	
  <img src="{{ site.baseurl }}/images/sample_sugarcane_images.jpg">
</div>
<div class="column">  
  <img src="{{ site.baseurl }}/images/sample_sugarcane_images_1.jpg">
</div>
</p>
<figcaption>
<b>	
<p style="color:black;font-size:15px" align="center">Left:Sugarcane crop & Right: Weed / other crops</p>
</b>
</figcaption>
</figure>


One of the challenges involved in this project was getting segmentation labels, It's a time consuming task to label each pixel of the crop as sugarcane and no sugarcane. To avoid labelling each pixel, I just label each image and use weakly supervised approaches to create segmentation labels. But the weakly supervised approaches to create segmentated label are slow to run on Jetson. The goal is to process each image in less than 0.15 secs. With weakly supervised approach it was impossible to process each image in less than 0.15 secs. Thus, I use the data generated from weakly supervised approach to train another DL model to perform fast inferencing within 0.15 secs.




<figure>
<p align="center">

  <img src="{{ site.baseurl }}/images/crop_512_reduce_mem.gif">

</p>
<figcaption>
<b>	
<p style="color:black;font-size:15px" align="center">Model's output as it sees each image</p>
</b>
</figcaption>
</figure>



Once we have a trained model, it's time to put it on Nvidia Jetson for inferencing. Setting up all the libraries and software required for this project on the jetson was not easy. Thus, I created a docker image, which has all the required software components to perform inferencing on Jetson. 
During inference following steps are performed.


1. Capture the images using the camera
2. Run segmentation model on the captured images
3. Send GPIO signals to turn on the LED light


I have 3 threads that run in parallel together for the above 3 tasks in real time.



<p align="center">
  <img width="600" height="400" src="{{ site.baseurl }}/images/Jetson-weed-detection-Trim-final.gif">
</p>


Hope you learned something new and enjoyed reading this post!