---
layout: post
title: Classification With Matlab
---

In my 2016 linear algebra class during my Master's, we were assigned to do a project that used SVD and PCA in some fashion. I used SVD to classify emotions from an image, and my partner, David Kaplan, used PCA to predict gender from a picture. 

I used a method that was used by Lassiter A. and Gugercin S. to determine what number someone had written down[1]. The method works by taking each training image and converting them into multiple one column matrices and then combining these. SVD is then used to determine the U matrix. This new matrix is used with the test image z to get the residual, through the equation norm(I-U(U transpose)z). The image is then classified as the emotion that had the smallest residual. 

I wanted to see if this method was useful for a different classification problem. I also wanted to determine if the classification could be improved by filtering the image beforehand. The idea was that different filters might remove some of the noise or emphasize different features. I used the original black and white image, polarized, and sobel filtered images. The images were used from the Karolinska Directed Emotional Faces database[2].

![_config.yml]({{ site.baseurl }}/images/linear_project/test_images.png)

The classification method used provided really good results. When using the black and white images the accuracy was 69.8%, but this was increased to 87.32% when the filter was applied before hand. Fear was difficult for each method to classify, and had the worst accuracy for each method. 

![_config.yml]({{ site.baseurl }}/images/linear_project/accuracy.png)

Below is the residuals for each fear test image using the black and white images. You can see most dip at the fear classification, but that is not the lowest value for them. Another interesting thing to note is the dips at surprise and sad. This could indicate that both emotions surprise and sad, share similarities with fear. 

![_config.yml]({{ site.baseurl }}/images/linear_project/grayscale_fear.png)

![_config.yml]({{ site.baseurl }}/images/linear_project/sobel_fear.png)

When the sobel filtering is applied the lines are more uniform, and you can see the dip at fear is more pronounced. 

![_config.yml]({{ site.baseurl }}/images/linear_project/sobel_happy.png)

Above is the residuals for each happy test image, which the method was really good at classifying. You can see the lines follow the same basic path and have the huge dip at happy. 

This project taught me alot about linear algebra and what it can be used for. Its one thing to learn the theory, but its completely different to actually see it in action. It would be interesting to see how the method worked on varying degrees of emotions, since the ones used were very pronounced. The code and the write up for the project can be found at https://github.com/armerj/linear_algebra_project. 

[1]	 Lundqvist, D., Flykt, A., & Öhman, A. (1998). The Karolinska Directed Emotional Faces - KDEF, CDROM from Department of Clinical Neuroscience, Psychology section, Karolinska Institutet, ISBN 91-630-7164-9

[2]	Lassiter, A. and Gugercin, S. (2013). Handwritten Digit Classification and Reconstruction of Marred Images Using Singular Value Decomposition.
