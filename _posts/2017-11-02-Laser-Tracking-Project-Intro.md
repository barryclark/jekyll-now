---
layout: post
title: Laser Tracking Project Introduction
---

<img src=/images/robot_blinding.gif alt="Blinding" style="width: 50%"/> 

![Blinding](/images/robot_blinding.gif)

If you haven't watched Michael Reeves' eye-lasering robot [here](https://www.youtube.com/watch?v=Q8zC3-ZQFJI), then go do that.
I'm going to do the same thing, but hopefully with a bit more speed and precision.
The end goal is to end up with a pan-tilt laser that will follow reasonably fast-moving thrown objects across the screen.
The initial chain will be webcam -> laptop -> arduino -> servos, but if I can make the program sufficiently lightweight I'd like to move the processing from the laptop to an RPi. 
I've picked up a pan-tilt servo assembly from amazon [here](https://www.amazon.com/gp/product/B00PY3LQ2Y/ref=oh_aui_detailpage_o03_s00?ie=UTF8&psc=1) and some laser diodes.
I'll mount the laser on the servos using a pen like Michael did, and zip-tie it to the servo mount. 
Then it's on to programming. 

1. Get the servos hooked up to the arduino and figure out which inputs move it in which directions.
2. Get a basic OpenCV program that reads from the webcam and pushes the incoming video to a window.
3. Get OpenCV to recognize a tennis ball or other similar round object.
4. Get servos to point at center of recognized object.

Step 1 should be a half-hour process at the most, I'll get it done after work either today or tomorrow.

I'm reasonably proficient at programming for Arduino, so I don't think that'll be a problem. 
I've never used OpenCV (or any sort of image processing apart from basic linear algebra stuff), so that'll be a bit of an adventure. 
I'll either use C or Python; I haven't decided which yet. 
C would help ensure the program is efficient enough to run on an RPi, but the C bindinss for OpenCV are supposedly second-class whereas Python is supported much better.
For this to be a permanent build, I'll eventually need to use a usb webcam rather than the laptop's.
But for the time being I don't need to grab one.
