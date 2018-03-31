---
layout: post
title: Sensor and electronics selection
lang: EN
ref: Sensorauswahl
teaserImage: /images/Prototyping.jpg
---

The last days we were pretty active and 
worked a lot on the hardware and software for the CanSat. Here we give
a brief overview of the sensors and electronics we will use.

### Primary mission
During the primary mission we will measure air density and temperature.
For this we use the [BMP180](https://www.amazon.de/kwmobile-airpressure-digital-Barometric-Raspberry/dp/B01M0LU3KF/),
a fairly accurate and easy-to-control sensor.
Price: 8,40 €


### Secondary mission
For our secondary mission we want to measure the fine dust distribution in the atmosphere during the flight.
Originally we wanted to use the Nova SDS011 because of its high accuracy and pre-installed fan.
However, this was about 2 mm too big for our can.
That's why we chose the [Waveshare GP2Y1010AU0F](https://www.amazon.de/Waveshare-Dust-Sensor-GP2Y1010AU0F-Conditioner/dp/B00T2T7FUS/). It is not quite so accurate, but it should be enough for our purpose 
since we mainly want to measure the distribution in the atmosphere and don't need absolute values (although that would still be better).
Price: 15,99 €


### Control
To control the individual components, we use not just one, but two [Arduino nanos](https://www.amazon.de/gp/product/B0713ZRJLC/)!
Why two? After initial attempts, we found out that logging the data to the SD card used more than
30% RAM on the small ATmega328P chip of the Arduino Nanos: space that can be used for more important things.
Therefore, the first Arduino collects all the data and sends them over the serial interface to the
second Arduino which then logs them onto the SD card.
Price: about 4,75 € per Arduino nano


### SD card reader + SD card
We were not sure if we really needed a card reader. But what if radio communication fails and
we don't receive any data? That was worth the 4g or 6,10€. We use the [MicroSD card breakout](https://www.adafruit.com/product/254)
from Adafruit. It is easy to use and works reliably (if controlled correctly).
Price: 6,10 € (+ 8,90 € for SD card)


### GPS module
The [GPS Module](http://www.watterott.com/Adata/Adafruit-Ultimate-GPS-Breakout-66-channel) is not only useful for determining the position and motion of the CanSats,
It also has another advantage that many may not think of: it can tell time.
For many small microcontrollers, such as the Arduino, it is difficult to give a precise time because the internal clock will eventually be out of sync.
With the GPS module, we can determine the time quite accurately and timestamp our data packages with it
so we can interpret them correctly.
The module we use was also made by Adafruit, but we ordered it from watterott.com.
Watterott supports the CanSat competition this year and allows us to get otherwise expensive components for free.
Price: 44,90 €


### Radio module
The radio module we use is also from Adafruit. We transmit on 433 Mhz with the [RFM69HCW](https://www.adafruit.com/product/3071). This module features
a network function and data encryption (so that no one will steal our measurements). The data from the CanSat is
sent in packets and received and decrypted with the ground station. There is not much to say here, except
that it is a nice, small radio module with many functions.
Price: 8,10 €


### And otherwise?
Of course the listed parts here are not everything. Maybe we will add a humidity sensor 
to calibrate the particulate matter sensor. Or we find a great other sensor that we really want to include.
But what's listed here has already been ordered and successfully tested, so it will definitely stay in the package.
In the next few days we will continue to adapt and improve the software for our CanSat, so you can already expect a blog entry.

To all of you we wish a happy easter!
