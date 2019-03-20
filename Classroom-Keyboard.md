---
layout: page
title: Classroom Keyboard
permalink: /Microbits/Classroom-Keyboard
---

# Traffic Light Distance Sensor Instructions
### You will need
- BBC Microbit
- 2 Crocodile Clips
- One Banana
- One Orange

## Step 1: Making the Keyboard
- Take one crocodile clip and attach it to GND (Ground) on your Microbit.
- Take the other crocodile clip and attach it to Pin 0 on the Microbit.
![](/images/MicroBits/.png "")
- With the crocodile clip that is currently attached to GND, take the other end and insert it into your orange.
- With the crocodile clip that is currently attached to Pin 0, take the other end and insert that into your banana.
![](/images/MicroBits/.png "")

## Step 2: Writing the Code
- You will be given a note on a keyboard and that's what you will be sending to the speaker.
- Make a new variable called 'note', and place a 'set note to 0' block inside the 'on start' block.
!["Keyboard 1"](/images/MicroBits/Keyboard-1.png "Keyboard 1")
- Underneath Music, look for the 'Middle C' block and place that so note is set to 'Middle C'.
!["Keyboard 2"](/images/MicroBits/Keyboard-2.png "Keyboard 2")
- Click on 'Middle C' and a keyboard will appear, look for the note that you've been given on the speaker.
!["Keyboard 3"](/images/MicroBits/Keyboard-3.png "Keyboard 3")
- Underneath add a 'show string' block, and make the microbit show your note variable.
!["Keyboard 4"](/images/MicroBits/Keyboard-4.png "Keyboard 4")
- Finally, we need to make sure that all the microbits can talk to each other, so we will set the radio group. This value should be 5.
!["Keyboard 5"](/images/MicroBits/Keyboard-5.png "Keyboard 5")
- The Microbit will send out note when we hold our orange and then touch on the banana. Look for the 'on pin p0 pressed' and drag that into code.
!["Keyboard 6"](/images/MicroBits/Keyboard-6.png "Keyboard 6")
- Under 'Radio' look for the 'radio send value name = 0' block and drag that into your 'on pin p0 pressed'
- Change 'name' to say 'note' and drop your 'note' variable ontop of the zero.
!["Keyboard 7"](/images/MicroBits/Keyboard-7.png "Keyboard 7")
- Congragulations! You have now created a key on the keyboard!