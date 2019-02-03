---
layout: page
title: Traffic Light LED
permalink: /Microbits/Traffic-Light-LED
---

# Traffic Light LED
### You will need
- 1 Green LED
- 1 Green Wire
- 1 Green Crocodile Clip
- 1 Yellow LED
- 1 Yellow Wire
- 1 Yellow Crocodile Clip
- 1 Red LED
- 1 Red Wire
- 1 Red Crocodile Clip
- 4 White Wires
- 1 White Crocodile Clip
- BBC Microbit
- Small Battery Pack
## Wiring up your Traffic Lights
![LED Diagram](/images/MicroBits/LEDTraffic.png "LED Diagram")

Firstly, lay your breadboard infront of you with the longest side facing you.

Have a look at all your LEDs, you will notice that they all have one leg longer than the other. Electricity can only flow through LEDs in one direction so it's important to have these in the correct order.

The longest leg should be always be on the right hand side.

Insert all your LEDs into your breadboard in the order shown on the diagram. You have a green cable and crocodile clip for your green LED, same for your red and yellow LEDS.

For each LED, insert the wire behind the right leg on each LED and attach the crocodile clip to the other end of the wire. Repeat for all the colours.

Then for each LED, take a white wire and insert them infront of the left leg on your LEDS and then the other end into the "rails" on your breadboard.

## Connecting to the Microbit

Take your green Crocodile clip and attach it to Pin 0, yellow to Pin 1, and red to Pin 2.

Take the white crocodile clip and attach it to the GND pin.

Congratulations! You should have now successfully connected your sensor to your Microbit. 

**Make sure to get it checked before you continue.**

## Writing your code

### Setting up your team
Go to [https://makecode.microbit.org/](https://makecode.microbit.org/#) on Microsoft Edge and Press on **New Project**.

Give your project a name before starting,  `Lights-'TeamNumber'`, where 'TeamNumber' is your team number.

Your Microbit is going to talk to your partners Microbit using bluetooth, but we need to be able to know who is talking to who.

![Instruction 1](/images/MicroBits/Distance-1.png "Instruction 1")

Each team will get their own radio group, so inside the `on start` block, you will add the `radio set group` block. You can find the radio under the 'Radio' option. 

Change the number to be the same as your team number.

### Traffic Light Functions

![Instruction 2](/images/MicroBits/LED-2.png "Instruction 2")

Create two functions, one called `GreenLight`, the other called `RedLight`. We use functions where we can create code once but use it multiple times as we will see soon.

For a "STOP", we will turn our lights amber, then red. For a "GO" we will turn them red & amber, then green.

![Instruction 3](/images/MicroBits/LED-3.jpg "Instruction 3")

Remember that green is on Pin 0, yellow is on Pin 1, and Red is on Pin 2.

Add `digital write pin` blocks and `pause` blocks in the correct sequence to match the image .

Also add a `call function RedLight` block to your `on start` block.

![Instruction 4](/images/MicroBits/LED-4.png "Instruction 4")

### Listening for the radio

We now need a new block `on radio received receivedString` for when the distance sensor is telling you when to change the traffic lights.

![Instruction 5](/images/MicroBits/LED-5.png "Instruction 5")

We just need to check which string we are getting. Inside Logic on your toolbox, you'll find an `if..else` block, and a comparison block `0 = 0`. 

![Instruction 6](/images/MicroBits/LED-6.png "Instruction 6")

You will find the `receivedString` block under Variables, and the quotations for "STOP" under Text.

Well Done! You've now finished all the code for your traffic lights. If your partner is struggling then make sure to give them a hand.