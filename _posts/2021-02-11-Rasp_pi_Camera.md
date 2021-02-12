---
layout: post
title: RaspberryPi camera webserver
---


## Pr-requisites ##
- Raspberry pi ( in this case i have raspi pi 4 )
- Raspi camera (A link to [Camera](https://addons.mozilla.org/en-CA/firefox/addon/foxyproxy-s)
- Host computer ( any with ssh and scp )

##Process 

- SSh into you Raspi berry pi > ssh pi@192.168.0.42 < 
- sudo apt-get update -y
- sudo apt-get upgrade -y
- sudo apt-get python3
- sudo raspi-config > Interface options > Camera > Enable < Yes reboot !

This will enable the camera on raspi.

Now for the python file 

Copy this to a file on your host computer :
by installing git first if you done > sudo apt-get install git

 - sudo git clone https://github.com/PKHarsimran/Raspi_Camera.py
 - cd Rasp_Camera
 - sudo pyhton3 Raspi_camaera.py

This will make you terminal look like its stuck but dont worry !!!

Go to your browser and look for 192.168.0.42:8000 < 
