---
layout: page
title: Sensor-array Spectrometer guide
permalink: /biofactory/class/7-spectrometer/spectrometer-guide/
---

The material list is based on the [Requirements list](/biofactory/class/7-spectrometer/requirements/)

### TSL1406R spectrometer building guide

This spectrometer uses the TSL1406R linear sensor array, which is basically a lot of photodiodes in a row. The sensor actually consists of 2 internal sensors which can be connected either in serial or in parallel mode. Both require a lot of connections however. We chose the serial mode and connected it to the arduino as shown below:
![Connection diagram](https://raw.githubusercontent.com/BioHackAcademy/BHA_Spectrophotometer/master/sensor%20pins.png)

Ofcourse there is a nicer way of connecting those pins, but we went for the quick and dirty approach:
![Connecting the pins in practice](https://raw.githubusercontent.com/BioHackAcademy/BHA_Spectrophotometer/master/sensor%20wires%20photo.jpg)


Back to [Biofactory - Class 7: Spectrometer](/biofactory/class/7-spectrometer/)
