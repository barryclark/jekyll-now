---
layout: post
title: Journey into IoT Cloud With NodeMCU & Heroku - Part 1 Choose your tools wisely!
---

I have been tinkering with electrinics for a while and with all the noise around IoT, Cloud & Salesforce it was time to try connecting my own Internet Thingy to Coud. Since this is a topic rich in details I decided to make this blog in parts. This is Part 1, selecting tools, kits and parts. First step is selection of IoT tools and kits to strat with. There are many kits available but I set some common sense parameters of what to build and what it may look like:

1. Small form factor in size
2. Minimal power consumption that can run on solar or small battery and be selfsufficient.
3. Easy to develop with, Arduino IDE, Sketch or similar tools & language. 
4. Standard well known parts 
5. WiFi connectivity and USB
5. Something that will work with known cloud platforms such as Heroku, Salesforce or AWS.

I strated by reviewing several kits. Typical IoT kit costs range $45 - $200 that variation depends on number of parts & sensors you get. Starter kits include main connection component and some sensor devices. Some are plugable units, others work on breadboards or need soldering on prototype board. Here are some examples:

[Little Bits](http://littlebits.cc/) - is a kit that Salesforce gave out at the Dreamforce conference to some MVPs as IoT gifts. Looking at first glanse it was very cool and simple to develop. Plug and play bits, no soldering needed. There is a [Salesforce littlebits-connector](https://github.com/afawcett/littlebits-connector) package on github that aimes at building IoT declaritively with Salesforce. All good but reading in details that actual LittleBit connection module that makes it all work is an embeded Linux box on a chip, impressive but, it also has large power consumption and heat generation, it requires plug into the wall to work. Good for testing ideas but limiting in actual applications. 

[Intel® Edison Board and Grove](https://software.intel.com/iot/aws) - AWS IoT kit interesting as number of other kits focused on connectivity to Amazon Web Services IoT Cloud platform. Yet again seem large size and power, good for prototyping and building home kits etc.

I also looked at several cloud based platforms that simulate your IoT devices and help to quickly prototype ideas. This is a growing trend in IoT market and rightfully so since that is where value and ROI in IoT is predicted to grow for the long run. Everyone knows that you cannot profit big with selling physical  devices at low cost. These platforms aim at being data collectors and aggregators for IoT connectivity and data analytics. That seem a bit of cheating because for some of them you not really working with real devices but with simulated thing. Some of them I list here:

1. [Xively](https://xively.com/) - Heroku Salesforce partner IoT platform has well documented instructional demo to try a POC with Heroku or Salesforce. Mainly Enterprise connectivity and data collection platform for IoT sensors that is very sleek! But it leaves that hard work of actually connecting your sensors to 3rd party develpers or sensor manufacturers. Smart move on their part to stay away from learnig millions of device drivers. Remains to be seen how practical that really is being virtual and that removed from actaul device code and relying on some porgrammer to do the hard work of using Xively SDK API to connect devices.
2. [Particle](https://www.particle.io/) - is very nice full fetured IoT Cloud patform that also has its own sleek [Particle Photon](https://store.particle.io/) device kits (this be #2 choice).
3. [AWS IoT](https://aws.amazon.com/iot/) - Mature Cloud patform build with familiar AWS services model to connect your devices and have number of kits & devices supporting IoT SDK. 
4. [Google IoT Platform](https://cloud.google.com/solutions/iot/) - well it is Google!

After some quick reads I found info about low cost IoT WiFi unit based on [ESP8266](http://www.instructables.com/id/ESP8266-Wi-fi-module-explain-and-connection/), that peacked my interest, basically internet router on a tiny chip board that runs on 3V of power and low cost. I did some more research and found Open Source project based on this unit [NodeMCU ESP2866](http://nodemcu.com/index_en.html), bingo just what I was looking for, small, low power consumption, open source (bonus) and low cost to build.

Next step finding actual device kit that based on NodeMCU ESP8266. NodeMCU develpment is done via [Arduino IDE](https://www.arduino.cc/en/Guide/Environment) and can use programming languages like [Sketch](https://www.arduino.cc/en/Guide/Environment#toc1) or [Lua](https://nodelua.org/). It is like loading firmwear on the chip, a small program. To load programs to NodeMCU we use USB connection with IDE or LuaLoader. 

I had to check what was compatible devices and chipsets that will work with Mac OSX and most other computers. I knew about number of IoT devices use low cost chips that do not have signed USB drivers, that can be difficult to connect with. Although possible to hack that with changes to Mac OSX security and finding alternate driver. I wanted to avoid that. If you do have a kit that needs these unsigned drivers here is some usefull info [CH340x instructions](https://tzapu.com/making-ch340-ch341-serial-adapters-work-under-el-capitan-os-x/) how to make that work on Mac OSX El Capitan.

After quick search I have selected a NodeMCU [ESP8266 IoT](http://www.oddwires.com/esp8266-internet-of-things-iot-kit-v1-1-by-oddwires/) kit from [OddWires](http://www.oddwires.com/) that had 2 NodeMCU units one complete developer kit v1.0 with mini USB connector, another unit is just ESP8266 that can be used on proto-board to build your own [NodeMCU design](http://www.oddwires.com/esp8266-internet-of-things-iot-kit-v1-1-by-oddwires/). 

![NodeMCU]({{ site.baseurl }}/images/iot/nodemcu.png)

Important consideration was USB connector module in this kit it is based on CP2102 USB UART chip that has a good signed drivers for Mac OSX, Linux or Windows available from [Silicon Labs CP210x USB to UART Bridge VCP Drivers](https://www.silabs.com/products/mcu/Pages/USBtoUARTBridgeVCPDrivers.aspx). This kit also has several sensors and set of wires, breadboard, and other parts, see [full details](http://www.oddwires.com/esp8266-internet-of-things-iot-kit-v1-1-by-oddwires/) for what is included in this kit.

![ESP8266 kit components]({{ site.baseurl }}/images/iot/oddwireskit.png)

We have the kit/parts next will need some tools to assemble our project. You have a full array of tools to choose from and everyone has their favorites, personal choices. I can share a toolkit I use is [Engineer KS-03](http://www.engineer.jp/en/products/ks03_04e.html) professional instruments, in small portable zip-case you can take it with you on the road. It is a sort of a traveling IoT Lab. 

![KS-03 toolkit]({{ site.baseurl }}/images/iot/toolkit1.png)

This toolkit cost approximate 5000JPY - $50 in [Akihabara](https://en.wikipedia.org/wiki/Akihabara) Electric town in Tokyo Japan loaded with Electronic shops and other interesting things. It is small light tool set that has mostly everything you need to build your IoT project or electronic components. It even includes mini soldering iron.

![Engineer Toolkit]({{ site.baseurl }}/images/iot/toolkit2.png)

At this point we have everything ready to build our Internet of Things device. In the next post will explore how to set up and connect NodeMCU with Mac and work on Aduino IDE, [Part 2](http://iandrosov.github.io/IoT-NodeMCU-Heroku-Part2/) - Connecting NodeMCU with IDE tools for development.
