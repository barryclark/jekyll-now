---
layout: page
title: Sensor-array Spectrometer guide
permalink: /biofactory/class/7-spectrometer/spectrometer-guide/
---

The material list is based on the [Requirements list](/biofactory/class/7-spectrometer/requirements/)

## TSL1406R spectrometer building guide

Steps:
* Download all the files from [git](https://github.com/BioHackAcademy/BHA_Spectrophotometer/) or [ZIP](https://github.com/BioHackAcademy/BHA_Spectrophotometer/archive/master.zip).
* Lasercut the [SVG file](https://raw.githubusercontent.com/BioHackAcademy/BHA_Spectrophotometer/master/Spectrometer-Lasercut.svg)
* Get an Arduino and upload the [sketch](https://raw.githubusercontent.com/BioHackAcademy/BHA_Spectrophotometer/master/arduino/Spectrophotometer/Spectrophotometer.ino) to it. We used an Arduino Duemilanove, but nothing special so many other arduino's will work too. 
* Assemble (see below)
* Open the processing application in SpectrumDisplay and run. The application will automatically connect to the first COM, assuming the arduino will be there.

## Connection diagrams

This spectrometer uses the TSL1406R linear sensor array, which is basically a lot of photodiodes in a row. The sensor actually consists of 2 internal sensors which can be connected either in serial or in parallel mode. Both require a lot of connections however. We chose the serial mode and connected it to the arduino as shown below:
![Connection diagram](https://raw.githubusercontent.com/BioHackAcademy/BHA_Spectrophotometer/master/sensor%20pins.png)

Additionally, the LED was connected to pin A5, but ofcourse all of these pin assignments are changeable if you modify the Arduino sketch.

Ofcourse there is a nicer way of connecting those pins, but we went for the quick and dirty approach:
![Connecting the pins in practice](https://raw.githubusercontent.com/BioHackAcademy/BHA_Spectrophotometer/master/sensor%20wires%20photo.jpg)


Back to [Biofactory - Class 7: Spectrometer](/biofactory/class/7-spectrometer/)
