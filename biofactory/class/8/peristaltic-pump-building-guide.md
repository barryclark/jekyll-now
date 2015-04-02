---
layout: page
title: Peristaltic Pump Building Guide
permalink: /biofactory/class/8-pumps/peristaltic-pump-building-guide/
---

The material list is based on the [Requirements list](/biofactory/class/8-pumps/requirements/)

## Bill of Materials

See [here](/biofactory/class/8-pumps/peristaltic-pump-materials/)

## Assembly

### Axis mount
The perstaltic pump has a stepper motor with axis mount made from laser cut wood, as shown below. This needs a few 20mm M3 bolts, and the bearings. We used a total of 3 spacers in the end (even though only 2 are in the picture below), to make some space for extra washers between the bearings and the wood (TODO make a picture with washers shown).
![Axis mount](https://raw.githubusercontent.com/BioHackAcademy/BHA_PeristalticPump/master/photos/axismount.JPG)
![Axis mount assembled](https://raw.githubusercontent.com/BioHackAcademy/BHA_PeristalticPump/master/photos/axismount-assembled.JPG)

### Motor mount
Next is the motor mount. This is a critical piece. If the cutout is too wide, the tube will not be properly constrained and no pumping will occur. It's important to have the same diameter tube, otherwise you will have to adjust the lasercut SVG to match.
![Motormount](https://raw.githubusercontent.com/BioHackAcademy/BHA_PeristalticPump/master/photos/motormount.JPG)

After that, the motor mount can be inserted into the side panels, so it ends up like this:

![Assembly](https://raw.githubusercontent.com/BioHackAcademy/BHA_PeristalticPump/master/photos/assembly.JPG)

### Control panel

The user interface consists of a rotary encoder, a pushbutton and a 2-line LCD character display. You will need a few 10mm and 20mm bolts to assemble it. The LCD I2C module pins have to be bent a little so it fits in the enclosure.
![Control panel](https://raw.githubusercontent.com/BioHackAcademy/BHA_PeristalticPump/master/photos/controlpanel2.JPG)


## Wiring diagram
On to the hardest part: Wiring up all the electronics and getting it into the enclosure can be a challenge. Make sure you create long wires from the control panel to the breadboard/arduino to make assembly a bit easier. 

![Wiring](https://raw.githubusercontent.com/BioHackAcademy/BHA_PeristalticPump/master/Wiring.png)

The shown wiring diagram creates some problems with the user interface. Due to electromagnetic interference the arduino will detect random voltage fluctuations and think the user is turning the rotary encoder. 
To fix this, some RC filters can be added to the circuit to reduce the noise on the button/encoder inputs, like shown below. A RC filter is a combination of Resistor and Capacitor, and is a very practical way to filter high frequency noise out of a signal. See [wikipedia](http://en.wikipedia.org/wiki/Low-pass_filter#RC_filter) for more details

![Debounce circuit](https://raw.githubusercontent.com/BioHackAcademy/BHA_PeristalticPump/master/RotaryEncoderDebounceCircuit.png)



## Links

[Rotary encoder tutorial](http://bildr.org/2012/08/rotary-encoder-arduino/)

* 

Back to [Biofactory - Class 8:Syringe & Peristaltic Pumps](/biofactory/class/8-pumps/)
