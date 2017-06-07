---
layout: post
comments: true
title: Making my own Google AIY Kit
---


Google recently released the AIY kit in conjuntion with the MagPi magazine. I got an email telling me about this kit 3 days after its release. I regretted instantly for not keeping a closer eye on updates in the makers' realm. I have since subscribed to the MagPi magazine in the hope that I won’t miss out any cool stuff for the next 12 months.

This morning, I spent an hour looking for a way to get this AIY Kit. I could have gone outside and search for it in the bookstores but it’s Sunday and it’s early. I searched all over the Internet to find somewhere that still has this kit in stock and doesn’t cost £20+. I gave up by my second glass of chocolate oat milk and started looking at the components that make up this kit.

Here is the list as captured on [Google AIY Projects](https://aiyprojects.withgoogle.com/voice/), Google’s official guide for the AIY kit.

![Screenshot from Google AIY](/assets/AIY.png)

<!--excerpt-->

I thought to myself, I can make it without the plastic standoffs, the speaker, replacing the push button with some other forms of input, I have some wires, the cardboard box, the lamp, I have still have loads of switch, I don’t need lamp holder if I don’t have a lamp. I basically don’t need 10 out of 12 items included in the kit. The most essential items which are not listed are the Raspberry Pi 3 and a SD card which I have.

The 2 items I was unsure about it the Voice HAT accessory board and the Voice HAT microphone board. I set out to resarch on what they are used for. Or…here is another thought, from what I have so far, I think all I’m missing is some form of microphone for input. I found this article about using the webcam microphone as voice input. I think I’ll head on this direction first. I want to make my own Alexa which converses with me using a webcam and speakers. I also found this read which is exactly what I’m trying to do

But first of all, I have to set up my SD card. It’s time to install NOOBS.

Head to https://www.raspberrypi.org/downloads/noobs/ to download the latest install.

To create an installation of NOOBS on SD Card on a Mac, I’m following this [guide](https://computers.tutsplus.com/tutorials/how-to-install-noobs-on-a-raspberry-pi-with-a-mac--mac-57831)

In the meantime, I’m using the speakers to play [Apocalyptica - Shadowmaker](https://play.spotify.com/album/34RyPrb9qW7uSCLGpeLrBQ?play=true&utm_source=open.spotify.com&utm_medium=open)

I’m having some doubt with the suggested SDFormatter app as it’s taking a very long time…Could I have done this using Disk Utility? Still running, I have finished folding my clothes. It feels a bit like that game where you can only move when noone is looking. Format is finally done.

Now it’s time to install NOOBS. More waiting.

![Screenshot from NOOBS installation](/assets/install-OS.jpg)

I went out for lunch and a few drinks, but now I’m back. Here are what I’ve done so far:
 - I have set up the Raspberry Pi 3 with the newest installation of NOOBS
 - I have set up wifi
 - I have set the IP address to static
 - I have set up VNC so I could control the desktop remotely from my laptop
 - I have registered for Google Assistance API

So now Google Assistance is up and running on the Raspberry Pi. I plugged in the webcam for microphone and the speakers. The input was great. Google Assistance can understand most of what I said. The output was audible but quality wasn’t top. I’m adding this onto my to do list to fix

To-do list:
 - fix the audio
 - Make a touch screen app to trigger the assistance
 - Is there a way to keep the conversation running?
 - Could I fit everything in a box?
 - How can I make this portable? I have a battery











