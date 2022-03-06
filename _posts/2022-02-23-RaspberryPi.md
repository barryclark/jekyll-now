---
layout: post
title: "Raspberry Pi Tutorials"
---

# How to install Raspbian on Raspberry Pi
Simple tutorial to install Raspbian OS on Raspberry Pi by using Raspberry Pi imager.
Here is the link to the [Imager](https://www.raspberrypi.com/software/)

## Instructions

 1: Make sure your computer can recognize the SD card
  
 2: Open Raspberry pi Imager 

 3: Click on Choose OS

 4: Click on Raspberry Pi OS(32-bit) 

 5: Click on Choose Storage

 5: Click on your SD Card

## Instructions for Headless OS

 4: Click on Raspberry Pi OS (Other)
  
 5: Click on Raspberry Pi OS Lite (32-bit)

 6: Reinsert the SD Card

 7: Open the Boot folder aka SD Card's folder

 8: Create an ssh file in boot folder. Make sure the file doesn’t have any extensions, should be only 'ssh' 
 
 
 
# How to install Docker on Raspberry pi?
 
 In this tutorial, we will be installing docker on Raspbian and run hello-world docker. We are going to ssh into Raspi and deploy the docker.
 
 1. From your terminal ssh into Raspberry pi

       ssh pi@<IPAdderessOfThePi> 
 2. Pi's ssh default password 
 
       raspberry
 
