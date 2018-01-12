---
layout: post
title: Challenges and future vision
author: hoangbm
---

In this part, we will talk about the challenge that we have to face in the classification task and the prospective work in 
Computer Vision in [OtoNhanh](https://otonhanh.vn)

# Challenges:
- We collect images in automobile industry automatically by our crawler. In this process, some images are not well-defined (
multiple objects in one image, image which is difficult to recognize the object, even for human)... Obviously, we could 
set a threshold to ignore images with low confidence score. However, in many cases, the models can give a very high 
'thumb-up' for these kind of images. So the most optimal solution in this case is the intervention of human during the 
acquisition. After crawling the images from the internet, our firm will check and delete unwell-defined images before 
giving them to our classification models.
 
<p align="center">
 <img src="/images/Introduction_CNN/1503650313909.jpg" alt="" align="middle">
 <div align="center">Multiple car pose in one image <a href="https://www.smart.com/content/dam/smart/HQ/master/index/Visuals/VP1/VP1_01HE_smart_range_autumn_campaign.jpg.imgresize.width=1920.name=imagevp1.jpg/1503650299540.jpg">Source</a></div>
</p>  

<p align="center">
 <img src="/images/Introduction_CNN/guong-chieu-hau.jpg" alt="" align="middle">
 <div align="center">Object in object<a href="https://www.smart.com/content/dam/smart/HQ/master/index/Visuals/VP1/VP1_01HE_smart_range_autumn_campaign.jpg.imgresize.width=1920.name=imagevp1.jpg/1503650299540.jpg">Source</a></div>
</p>  

<p align="center">
 <img src="/images/Introduction_CNN/1.jpg" alt="" align="middle">
 <div align="center">Un well-defined image</div>
</p>  

- Images from some labels are quite similar to each other. It results in the confusion of the model when classifying.
For example, the images from 'left_front_view' and 'right_rear_view' are similar.

<p align="center">
 <img src="/images/Introduction_CNN/0d283c8a2ddd7be343024378a75647b5.jpg" alt="" align="middle">
 <div align="center">Right_rear_view image</div>
</p> 

<p align="center">
 <img src="/images/Introduction_CNN/2c93b2d8573db5a98232861ccdd6c520.jpg" alt="" align="middle">
 <div align="center">Left_front_view image</div>
</p>  

- The decision of model is sometimes inconsistent due to the fact that we use random cropping in our pre-processing. 
Images from the internet are various in size, so we have to use random cropping to fix the size of the input as well as 
a way to regularize the model. Nevertheless, it leads to the different results in each inference.  

# Prospective work  
In [OtoNhanh](https://otonhanh.vn), we aim at improving end-user experience with our website, and Computer Vision will
be an important part. Our forthcoming works will be:  
- Since our current classification is just at the low level: it can only capture the shallow semantic feature. 
We are in need of more detailed investigation, including image similarity in a same class or car orientation estimation.   
[3D Pose Regression using Convolutional Neural Networks](http://juxi.net/workshop/deep-learning-robotic-vision-cvpr-2017/papers/9.pdf)  
[Learning Fine-grained Image Similarity with Deep Ranking](https://static.googleusercontent.com/media/research.google.com/vi//pubs/archive/42945.pdf)  
- We also target at the Interior 3D Reconstruction so that the user can have a lively view of the car.  
- For data collection, we intend to integrate a secondary model to the crawler. It will play the role of labeling the 
crawled images automatically. Then someone from our firm will justify th eirvalidity before give them to our main models 
as training data.    

