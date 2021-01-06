---
layout: post
title: Cross Domain Image Registration between CAD & SEM image using Deep Learning
---

Image registration or image alignment is a process of registering one image with another image. Images can be acquired at different time intervals with different camera settings. It is very likely that two images taken from the same camera could have an offset in x, y and z directions. This is a common problem in medical domain applications, where MRIs or CT scans are taken for different organs. Image registration can be divided into three types as follows

1. Rigid Registration -  Involves only rotation & translation to register two images
2. Affine Registration - Involves shear, scaling, rotation & translation to register two images
3. Non-rigid Registration - Involves deforming local geometries to register two images

As we don't want to change the CAD or SEM pattern, we limit our registration to affine registration. 
Image registration problem becomes even more challeging, when the images are from two different domains. For e.g. aligning MRI image and CT scan image of brain. Traditional machine learning methods, which involve feature extraction and iterative update perform better when both images to be registered are from same domain. For e.g. image of brain MRI scan with another brain MRI scan. Traditional ML methods fail when we want to register images from two different domains.
In our case, we want to register images from two different domains i.e [CAD](https://en.wikipedia.org/wiki/Electronic_design_automation) image and [SEM](https://en.wikipedia.org/wiki/Scanning_electron_microscope) image. Following is an example of CAD image and its corresponding SEM image.

<figure>
<p align="center">
<div class = "column">	
  <img src="{{ site.baseurl }}/images/img1_cad.png">
</div>
<div class="column">  
  <img src="{{ site.baseurl }}/images/img1_sem.png">
</div>
</p>
<figcaption>
<p align="center"> Left: CAD image & Right: SEM image </p>
</figcaption>
</figure>

As we can see both are completely different, the SEM image has more noise and shades of grey. The noise in SEM is because of the overall processes involved in capturing SEM image i.e printing mask using CAD, etching variations and SEM machine noise. 

We use deep neural networks to resolve the problem of cross domain image registration between SEM & CAD. When working with deep neural networks we need lot of data for training. Here, we need misaligned CAD & SEM as input and corrsponding aligned CAD & SEM as ground truth. Acquiring samples of aligned CAD & SEM can be difficult, so we use in house built SEM digital twin to generate millions of CAD and its corresponding SEM image. Using millions of CAD & SEM images from SEM digital twin, we create training data for training image registration network. The registration DNN consists of 3 parts.

1. CNN encoder - Encodes information of CAD & SEM
2. Feed forward network - Outputs values for registration 
3. Spatial transformer network - Performs spatial transformation on input to align CAD & SEM


<figure>
<p align="center">
<img src="{{ site.baseurl }}/images/image_registration_architecture.png">
</p>
<figcaption>
<p align="center"> Image Registration Architecture </p>
</figcaption>
</figure>


Training:

The encoder architecture depends on the input image size and the receptive field. We used custom loss function, which penalizes the network when the alignment between CAD & SEM is incorrect. In order to train the DNNs we generate millions of samples of unaligned & aligned (CAD & SEM images) and train the network using ADAM optimizer. There are many different tweaks that are required to make DNN learn the function that aligns CAD & SEM given unaligned CAD & SEM image. For training we generate millions of samples and store it in the disk and use tensorflow datasets to fetch data and pass it to the network. This helps us in reducing the overall time required for loading data to the network.

Testing:

Once we train the network on millions of images, we test the network by passing unaligned CAD & SEM image. In order to evaluate the efficacy of the trained model we compute [NCC](https://en.wikipedia.org/wiki/Cross-correlation#Normalized_cross-correlation_(NCC)) (Normalized Cross Correlation) score. Score of '1' means the CAD is perfectly aligned with SEM and score of '0' means they are unaligned.

In order to visually inspect alignment of CAD & SEM image, we overlapped CAD & SEM image. If CAD and SEM are perfectly aligned then we don't see any difference between CAD & SEM. However, if they are unaligned then we can see white edges not correctly overlapped with grey geometries.

Following are the results on test images.

<script>
function imageZoom(imgID, resultID) {
  var img, lens, result, cx, cy;
  img = document.getElementById(imgID);
  result = document.getElementById(resultID);
  /*create lens:*/
  lens = document.createElement("DIV");
  lens.setAttribute("class", "img-zoom-lens");
  /*insert lens:*/
  img.parentElement.insertBefore(lens, img);
  /*calculate the ratio between result DIV and lens:*/
  cx = result.offsetWidth / lens.offsetWidth;
  cy = result.offsetHeight / lens.offsetHeight;
  /*set background properties for the result DIV:*/
  result.style.backgroundImage = "url('" + img.src + "')";
  result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";
  /*execute a function when someone moves the cursor over the image, or the lens:*/
  lens.addEventListener("mousemove", moveLens);
  img.addEventListener("mousemove", moveLens);
  /*and also for touch screens:*/
  lens.addEventListener("touchmove", moveLens);
  img.addEventListener("touchmove", moveLens);
  function moveLens(e) {
    var pos, x, y;
    /*prevent any other actions that may occur when moving over the image:*/
    e.preventDefault();
    /*get the cursor's x and y positions:*/
    pos = getCursorPos(e);
    /*calculate the position of the lens:*/
    x = pos.x - (lens.offsetWidth / 2);
    y = pos.y - (lens.offsetHeight / 2);
    /*prevent the lens from being positioned outside the image:*/
    if (x > img.width - lens.offsetWidth) {x = img.width - lens.offsetWidth;}
    if (x < 0) {x = 0;}
    if (y > img.height - lens.offsetHeight) {y = img.height - lens.offsetHeight;}
    if (y < 0) {y = 0;}
    /*set the position of the lens:*/
    lens.style.left = x + "px";
    lens.style.top = y + "px";
    /*display what the lens "sees":*/
    result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
  }
  function getCursorPos(e) {
    var a, x = 0, y = 0;
    e = e || window.event;
    /*get the x and y positions of the image:*/
    a = img.getBoundingClientRect();
    /*calculate the cursor's x and y coordinates, relative to the image:*/
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    /*consider any page scrolling:*/
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return {x : x, y : y};
  }
}
</script>


<figure>
<p align="center">
<div class = "column_3">	
  <img src="{{ site.baseurl }}/images/img2_misaligned_sti.bmp">
</div>
<div class="column_3">  
  <img src="{{ site.baseurl }}/images/img2_misaligned_sem.bmp">
</div>
<div class = "column_3">
  <img src="{{ site.baseurl }}/images/img2_misaligned_merge_sem_sti.bmp">	
</div>
</p>
<figcaption>
<p align="center"> Left:CAD image, Middle: SEM image, Right: Overlapped misaligned CAD & SEM </p>
</figcaption>
</figure>

<!-- <div class="img-zoom-container">

  <img id="myimage" class= src="{{ site.baseurl }}/images/img2_misaligned_merge_sem_sti.bmp" width="300" height="240">
  <div id="myresult" class="img-zoom-result"></div>
</div> -->
<figcaption>

<div class="img-zoom-container">
 <div class = "column">
	<img id="myimage" src="{{ site.baseurl }}/images/img2_misaligned_merge_sem_sti.bmp" width="300" height="300">
 </div>	
</div> 
<div class = "column">
	<img id="myresult" class="img-zoom-result">
</div>	
<p align="center">Input to DL - Left: Overlapped misaligned CAD & SEM (Hover your mouse cursor) & Right: Zoomed in image</p>
</figcaption>
<script>
// Initiate zoom effect:
imageZoom("myimage", "myresult");
</script>



<figcaption>

<div class="img-zoom-container">
 <div class = "column">
	<img id="myimage1" src="{{ site.baseurl }}/images/img2_aligned_merge_sem_sti.bmp" width="300" height="300">
 </div>	
</div> 
<div class = "column">
	<img id="myresult1" class="img-zoom-result">
</div>	
<p align="center">Ouput of DL - Left: Overlapped aligned CAD & SEM (Hover your mouse cursor) & Right: Zoomed in image</p>
</figcaption>


<script>
// Initiate zoom effect:
imageZoom("myimage1", "myresult1");
</script>


Thus, with DL we no longer require manual alignment - which takes tremendous amount of time. With DL registering images can be done within seconds thereby increasing the overall productivity by focusing on other tasks. In semiconductor manufacturing, there are many applications that require registering images within same domains or across domains. Using DL to learn the aligning function can significantly reduce tremendous amount of time taken by manual alignment and achieve same accuracy.

To read more about CAD & SEM alignment/registration refer - section 3 of [paper](https://cdle.ai/wp-content/uploads/2020/10/A-deep-learning-mask-analysis-toolset-using-mask-SEM-digital-twins.pdf)