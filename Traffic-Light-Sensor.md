---
layout: page
title: Traffic Light Distance Sensor
permalink: /Microbits/Traffic-Light-Distance-Sensor
---

# Traffic Light Distance Sensor Instructions
### You will need
- 2 White Wires
- 2 White Crocodile Clips
- 1 Red Wire
- 1 Red Crocodile Clip
- 1 Green Wire
- 1 Green Crocodile Clip
- 1 Yellow Wire
- 1 Yellow Crocodile Clip
- Distance Sensor
- BBC Microbit
- Small Battery Pack
- Large Battery Pack
## Wiring up your Distance Sensor
![Distance Sensor Diagram](/images/MicroBits/MotionSensorTraffic.png "Distance Sensor Diagram")

Firstly, lay your breadboard infront of you with the longest side facing you.

Take your yellow wire and insert it into the breadboard. To it's left insert a red wire, then a green wire then a white wire. Take your second white wire and insert that below your first white wire.

Next, attach one end of your crocodile clips to the ends of your wires. The colour of your crocodile clips will match the colours of your wires. So green crocodile clip to green wire, white to white and so on.

### Connecting the Microbit

Now we need to connect our sensor to the Microbit and to our battery. Connect the red crocodile clip to Pin 0 on your Microbit, and the green on to Pin 1.

Connect any one of your white crocodile clips to GND on your microbit, and connect the other to the red wire on your large battery pack. Finally, connect the yellow crocodile clip to the black wire on your large battery pack.

Take your distance sensor and insert it facing away from your wires, **if you're not sure then please ask.**

Congratulations! You should have now successfully connected your sensor to your Microbit. 

**Make sure to get it checked before you continue.**

## Writing your code

### Setting up your team
Go to [https://makecode.microbit.org/](https://makecode.microbit.org/#) on Microsoft Edge and Press on **New Project**.

Give your project a name before starting,  `Distance-'TeamNumber'`, where 'TeamNumber' is your team number.

Your Microbit is going to talk to your partners Microbit using bluetooth, but we need to be able to know who is talking to who.

![Instruction 1](/images/MicroBits/Distance-1.png "Instruction 1")

Each team will get their own radio group, so inside the `on start` block, you will add the `radio set group` block. You can find the radio under the 'Radio' option. 

Change the number to be the same as your team number.

### Reading the sensor

Using the distance sensor is not part of what a Microbit can usually do, so we must add a special extension before we can write any more code.

![Instruction 2](/images/MicroBits/Distance-2.png "Instruction 2")

Scroll to the bottom of your toolbox until you can see Extensions (Red box). Click on it and you will see a grid of options.  

You are looking for 'Sonar', once you click on it, it will be added to your toolbox (Blue box).

![Instruction 3](/images/MicroBits/Distance-3.png "Instruction 3")

We need a place to store how far away our car is from the sensor, so we need to create a variable to do so.

Inside you toolbox look for `Variables` then the button for to create a variable. Let's call this "Distance"

You can then drag the `Set Distance to 0` block into the `forever` block.

![Instruction 4](/images/MicroBits/Distance-4.png "Instruction 4")

Now that we have a place to store the reading, we actually need to read it from the sensor.

Look for Sonar in your toolbox and drag the large grey block to replace the zero in the block you've just placed.

We need to change few things here to make this work.

First, the top line should read `ping trig P0`, then the second line should read `echo P1`, finally the bottom line should read `unit cm`.

You can use the `show number` block to make it print how far away something is on your Microbit.

![Instruction 5](/images/MicroBits/Distance-5.png "Instruction 5")

### Talking to the other Microbit

So now we can read how far away something is from our sensor, we just need to tell the other Microbit when to change colour.

Most traffic lights work by changing to green when it knows a car is approaching, so we will create the code to do that.

We're going to change our traffic light to green when we know a car less than 15cm away from the sensor, and if it isn't then turn it red.

We need an if..else block, and a comparison block. Both of these can be found inside Logic in your toolbox. 

You can also find the `Distance` block under Variables.

![Instruction 6](/images/MicroBits/Distance-6.png "Instruction 6")

The top section will be tell the other Microbit to turn the traffic lights green, and the bottom section will be to turn them red.

To do this, we're going to send a radio string of either STOP or GO to the other Microbit.

![Instruction 7](/images/MicroBits/Distance-7.png "Instruction 7")

Well Done! You've now finished all the code for your distance sensor. If your partner is struggling then make sure to give them a hand.