---
layout: post
title: This is my first post!
---

Recently I have been working on implementing an over-engineered doorbell for the purposes of 
- Allowing for *muting* of the doorbell via app
- Allowing for *push notification* to my phone when someone rings the doorbell (just in case I am not able to hear it)
- Most importantly, allowing me to trigger the doorbell **remotely** via my app when I am outside

But before everything else, a bit of context: 
My current doorbell is a rather old design that actually uses a *mechanical* switch to manually open and close a circuit to a solenoid. This meant that there was a wire running from inside the house to the outside switch box where the doorbell switch was located. 
This was really what spurred me to convert my doorbell to *wireless* as repurposing this wire (which was literally a standard multi-core copper wire) to transmit power rather than signal was something which would allow me to power the WiFi chip directly via the *mains* instead of having to deal with batteries (something I try to avoid as much as possible especially when we are dealing with WiFi).

{% include youtube_embed.html id="i-Zetl8BYZ4"%}  
![Test Picture 1](/images/Doorbell 1.jpg)