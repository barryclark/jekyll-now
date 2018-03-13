---
layout: post
title: Raspberry Pi Hi-Fi
categories: blog
comments: true
published: false
---

# Raspberry Pi Hi-Fi

**The Problem**
I have a reasonably large collection of music files (about 80GB), which I keep on my laptop hard drive. I love the convenience of storing/playing music as files, and have been progressively ripping and mothballing my CD/Vinyl/Cassette collection over the years. 

However, I am still quite old school in that I like to listen to my music through my 20 year old separates hi-fi system. Now, for all other music media formats, there has always been a readily available generic solution for the hi-fi separates system:

* Vinyl = record player/turntable
* Cassette = cassette deck
* CD = CD player
* MiniDisc = minidisc player
* MP3 etc = er ....... who knows?

To my knowledge, there has never been a straightforward plug and play option for adding a collection of music files to a hi-fi system.

I've tried a number of solutions with varying degrees of success over the years, including:

* Stream from iTunes on my laptop via AirPort Express
* Upload all my music to a free Google Play account, then stream via a Google Chromecast Audio
* Connect iPod Classic to hifi via a dedicated docking station
* Stream from Spotify via a Google Chromecast Audio

There main problems with these approaches are:
* Streaming dropouts - very annoying!
* Having to use a laptop to control music playback
* Spotify is great, but has a lot of gaps in its catalogue

**Requirements**
In summary:
* Direct connection to my existing hifi amplifier - no streaming!
* Store all my music files
* Remote control
* Hifi sound quality (obviously within the parameters of file compression etc)

I searched for solutions online. There are a few components available which meet the above criteria, but they are all really expensive (eg [Brennan](http://www.brennan.co.uk/units) - around £500). The market has decided that streaming is the way forward!

**The Solution**
Of course, use a Raspberry Pi! A few Google searches revealed a host of ideas for turning a humble Pi into a hif music player.

***Ingredients***
* 1 x Raspberry Pi (£32)
* 1 x HiFiBerry DAC+ (£25)
* 1 x USB Wifi Adapter for the Raspberry Pi (£6)
* 1 x HiFiBerry Acrylic Case for DAC+ (RCA) (£10)
* 1 x 128GB USB Stick (£28)
* 1 x 8GB SD Card (£8)
* 1 x RuneAudio image (Free)
* 2 x good quality phono leads (£6)

Total: £115

***Method***
I won't go into too much detail as there are so many "how to" web pages that already cover this. But in summary, the heart of the system is the RuneAudio software available from their [website](http://www.runeaudio.com/). This is essentially a modified Linux OS which turns your Pi into a music player. 

The other essential item is a DAC (Digital to Analogue Converter). Although the Pi has audio outputs, these are very low quality. The [HiFiBerry DAC+](https://www.hifiberry.com/products/dacplus/) plugs directly into your Pi motherboard, and provides RCA outputs for connection to an external amp.

RuneAudio is capable of streaming media from a network drive, but I wanted a totally wired connection, so used a high capacity USB memory stick (128GB) plugged directly into the Pi with all my music collection on it. If you want to update your collection later, you can simply FTP files to the Pi.

You'll also need a wifi adapter to allow you to control playback etc. The RuneAudio GUI is exposed via a local website on your home network. This allows you to control it from any internet-enabled device with a browser. Also, RuneAudio is an [MPD Client](https://www.musicpd.org/). This is a common framework for playing music from a server. This means that, if you don't like the RuneAudio UI, you can choose from a variety of other MPD-enabled interfaces. eg on my laptop, I use a Windows app called [Chimney](https://www.microsoft.com/en-gb/store/p/chimney/9wzdncrfj6jx?silentauth=1&wa=wsignin1.0&activetab=pivot%3aoverviewtab) which provides a richer UX than the RuneAudio one. There are also players available as iOS, Android apps etc etc. RuneAudio also provide an [Android app](https://play.google.com/store/apps/details?id=com.runeaudio&hl=en_GB) version of their UI.

In terms of finishing, a case is good - HifiBerry do a [custom one](https://www.hifiberry.com/shop/cases/hifiberry-case-for-dac-rca-and-digi-black/) which accommodates a Pi with DAC and RCA cables attached attached.

Here is the finished item:
![image-title-here](https://raw.githubusercontent.com/julianjoseph/julianjoseph.github.io/master/images/raspberry-pi-hifi.jpg)

As my hi-fi system diminishes over the years (good bye to: turntable, cassette deck, minidisc player, CD player) - the Pi has become the heart of the system. Plus, its small size means that it can be hidden away behind the amp, so no need to accommodate another bulky separates component.

