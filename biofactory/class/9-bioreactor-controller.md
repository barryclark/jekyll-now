---
layout: page
title: Reactor Controller (Class 9)
permalink: /biofactory/class/9-reactor-controller/
---

## Synopsys

Now that we have constructed pumps, stirrers and a spectrometer we can start connecting all the dots into one big bioreactor. The controller will be able to set the environmental parameters, input and analyse the effluent of your reactor. 

## Schedule

* [Bioreactor Controller](/biofactory/class/9/pdf/1 Bioreactor Controller.pdf)

## Reactor Controller Design

This week is all about Arduino code. We need to tie everything together into one mean machine.
The github for the bioreactor can be found [here](https://github.com/BioHackAcademy/BHA_Bioreactor), or in [ZIP](https://github.com/BioHackAcademy/BHA_Bioreactor/archive/master.zip). It consists of:

* Flask, sitting on a heating pad to control temperature 
* Magnetic stirrer
* [Arduino program](https://github.com/BioHackAcademy/BHA_Bioreactor/tree/master/Arduino/Bioreactor), with a connection system to connect pumps and other devices.
* [Bioreactor control program](https://github.com/BioHackAcademy/BHA_Bioreactor/blob/master/BioreactorControl/BioreactorControl.pde) written in Processing
* 2X Mosfet circuit (see below, one for fan, and one for heating pad) ![circuit](/biofactory/class/9/mosfet circuit.jpg)

## Control program

The control program is able to use multiple devices at the same time. This is done by having the processing code send "id" to each arduino, which responds with either "id:bioreactor", "id:peristaltic-pump", or "id:syringe-pump" so it knows which COM port is connected to which device.

## Bill of Materials

In order to take part in this class you will need the following materials:

* [Reactor Controller materials](/biofactory/class/9/bioreactor-materials/)

## Assignment

Prepare for the Graduation Show on April 21st.

## Additional reading and hacking

* Reactor Design
  * [Bioreactor Design for Chemical Engineers](http://d.umn.edu/~rdavis/courses/che4601/notes/BioreactorDesignForChEs.pdf)
  * [Bioreactor Design Software](http://www.bioreactordesign.org)
  * [Modeling a Batch Reactor in SuperPro Design](https://www.youtube.com/watch?v=MLfonzyG3T0)
* Controllers
  * [Applikon bioreactors and controllers](http://www.applikon-bio.com/cms3/index.php?option=com_content&view=article&id=344&Itemid=45)
  * [I2C communication between Arduinos](http://www.instructables.com/id/I2C-between-Arduinos/)
  

## Feeling lazy?

Go ahead and buy a reactor controller:

* [Applikon](https://www.applikon-biotechnology.us/products/bioreactors)
