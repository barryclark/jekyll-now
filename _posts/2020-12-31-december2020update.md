---
layout: post
title:  Dec. 2020 Updates -
---

Hello!

As of this month ZBCE is officially starting with Phase 3 of the Roadmap. For more details about the different phases visit this link [here](https://boostnote.io/shared/14a9893a-d4d7-4e40-ac10-4dc1ab77e019). This includes creating a LAMP based server for data endpoints, including basic data analytics, and expanding on the sensor module to make it IoT enabled.  This journey of making ZBCE is still in it's beginning phases, but I'm so glad that I was able to make it to this point. The rest of this blog will also talk more about some progress I have made (with the help of others such as Grace Choe and Primal Pappachan). There's a comment section now in all the blogs if you have any thoughts, suggestions, or questions. There is also the [ZotBins Discord community](https://discord.gg/mGKVVpxTPr) as well.

![](https://raw.githubusercontent.com/zotbins/zbceblog/master/images/december2020-images/Moving_on_to_Phase_III.png)

### Database Schema for your Trash
This is just a first draft of the database schema to store all relevant waste related data. Some key ideas behind this schema was to include some modularity for including different type of data metrics while also being flexible enough to handle all sorts of bin types. Bins can vary a lot from the type of trash they are supposed to accept (eg. compost, mixed paper, comingled recycling, landfill) and can also vary depending on what sensors are deployed on them. This is just a draft for now and will definitely be improved moving forward. Huge thanks to Grace, Primal, and others for giving their input.

![](https://raw.githubusercontent.com/zotbins/zbceblog/master/images/december2020-images/ZotBins%20Database%20Schema.png)

### Setting up a LAMP Server
This was another learning experience for me and also a test to see how replicable it was to setup a [RESTful API](https://en.wikipedia.org/wiki/Representational_state_transfer). The LAMP tech stack that I decided to use was Linux (operating system), Apache (web server), MySQL (database), and Python (CGI scripting), which makes this tech stack a [LAMP](https://en.wikipedia.org/wiki/LAMP_%28software_bundle%29) stack. With the help of a [tutorial](https://db.tannercrook.com/cit-225/lamp-stack-with-flask/) I found I was able to get my RESTful API client up and running pretty quickly.


### Revisiting Power Consumption for the Sensor Module
In the [November 2020 Updates](https://zotbins.github.io/zbceblog/november2020update/) I calculated that the sensor module could theoretically operate for 559.62 hours. However, after testing the sensor module I found that the sensor module was able to collect data for 91 hours (~ 4 days). Here were my following suspicions:
1. Flash LED was consuming power during Deep Sleep (I could see a dim light from the flash LED)
2. Flash LED might be on for too long when taking photos (sometimes for ~ 4 seconds)
3. HC-SR04 consuming power during deep sleep (I could actually hear some high pitched noises from the sensor during deep sleep)

I was able to address suspicion # 1, by using some functions from esp32 library. I just needed to hold the GPIO signal to the Flash LED to low using a [function](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/api-reference/peripherals/gpio.html#_CPPv417rtc_gpio_hold_dis10gpio_num_t) to manage this.

For suspicion # 2, I'll need to experiment with limiting the number of times I activate the flash. I was researching using a [photoresistor](https://en.wikipedia.org/wiki/Photoresistor) to help determine if the flash should be activated if the current lighting is too dim. However, I'm pretty sure it's possible to just use the camera to determine if the lighting of the bin is too dim. This is definitely a great place to do some more research and I will definitely look into this when I have more time. Below is a picture of the flash LED still being on at a dim setting during deep sleep.
![](https://raw.githubusercontent.com/zotbins/zbceblog/master/images/december2020-images/dim_light.png)

For suspicion # 3, I'll just modify my circuit a bit to include a extra [NPN MOSFET transistor](https://en.wikipedia.org/wiki/MOSFET). This will allow me to cut off power by acting as a switch to the HC-SR04 during deep sleep. I already designed a new circuit for this feature as you can see in the figure below.

![](https://raw.githubusercontent.com/zotbins/zbceblog/master/images/december2020-images/Simple%20Waste%20Auditing%20Data%20Logger%20-%20v1.png)

I also evaluated my power consumption calculations again and found more specific values for the ESP32-CAM AI-Thinker from [Seeed Studio](https://www.seeedstudio.com/ESP32-CAM-Development-Board-with-camer-p-3153.html) instead of just the ESP32 chip that I found last time on [Last Minute Engineers](https://lastminuteengineers.com/esp32-sleep-modes-power-consumption/). From this, I was able to see that there was a slightly bigger increase in power consumption in deep sleep and learned that the turning off the flash still consumes power.
- Deep Sleep: 6 mA (at 5V)
- Turn on Flash: 310 mA (at 5V)
- Turn off Flash: 180 mA (at 5V)

With this information, I can definitely try out a bunch of things to help extend the device battery life.

----
Thank you all so much for following the blog. I also really appreciate any feedback just so it doesn't feel like I'm writing to myself. You can comment down on this blog down below or find me in our [ZotBins Discord community](https://discord.gg/mGKVVpxTPr).

See you next year!

-- Owen Y.
