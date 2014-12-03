---
layout: post
title: Connecting a Christmas snowglobe to your Raspberry Pi
published: true
---

Christmas is around the corner and it is time for some geeky Christmas Crafts! Got an RaspberryPi from a hack night at iZettle and wanted to make something fun out of it, decided on "Git merge activated snowglobe". If the name doesn't say it all, it's an electronic snowglobe that is gonna start "snowing" and playing christmas music each time someone merges a pull request on Github.

## What you need

**Hardware**

- RaspberryPi
- Electric snowglobe or similar that can be turned on by button
- Cables (like these: http://goo.gl/jYLQuW)
- A transistor
- Tape (some people would probably advocate soldering here)
- Tools for opening the snowglobe

**Software**

- Heroku or similar
- Node.js
- Redis db

## Putting the hardware together
This is the snowglobe I found at a toys store. It plays 8 songs, whisps around some styrofoam and is powered by 3 1.5v AA batteries. 

Opening it up it was really easy to modify it by cutting the cables. I started out with cutting the wires to the battery pack and replacing hooking it up to the RasPi. To strip the cable I just used a normal scissor and to make sure it doesn't pop out I used some normal tape. First make it work, then make it better :) At least I'm using the correct colors!

![Wiring the power cables](/images/christmas-craft/power_wiring.jpg)

It was running as expected so I continued with replacing the button. To simulate a button I used a transistor. A transistor has three pins, the outer two which the wires that previously were connected to the button should be connected to, and the middle one which should be connected to a pin on the RasPi. To test this out, connect the power cables to the RasPi and the button cables to the transistor, then tap the cable connected to the middle pin on one of the 3v pins on the RasPi. If works as expected this should start the snowglobe just as if you'd press the button. If that is the case then connect the cable to one of the pins on the RasPi which is not ground or power supply. I connected it to pin number 10.

![Transistor wiring](/images/christmas-craft/transistor.jpg)
![Connect to Raspberry Pi](/images/christmas-craft/raspi.jpg)

So with all the physical stuff running let's get coding.

## Writing the code
The software is going to consist of two parts, one small server that will receive POST messages from Github and expose a small API with information if a merge has been done or not, and the code on the RasPi that will make a request to the API every second.

### Server
The server needs one endpoint that can receive POST messages from Github webhooks, parse the message and see if a merge has been done and save the information to Redis.

The other endpoint is called by the RasPi to determine if it should "press" the button or not. It gets the information from Redis, returns true if the button should be pressed and then resets the information on Redis so it returns false the next time.

{% gist 14d233b5173f887477ae %}

### Rasberry Pi
The code on the RasPi is just an infinite loop that makes a request to the server a couple of times every second. If the server returns true in the request, the RasPi turns on the power on the pin connected to the transistor for 100ms, which simulates a button press and turns on the snowglobe.

{% gist 0bbaf263b9138f06359f %}

## Done!
![Transistor wiring](/images/christmas-craft/finished.jpg)


If I've left something out or have something to improve, please comment!