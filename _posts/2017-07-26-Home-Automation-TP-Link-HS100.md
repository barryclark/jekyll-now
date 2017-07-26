layout: post
title: Home Automation with TP-Link HS 100 plug
subtitle: TP-Link, Raspberry PI and Amazon Lambda
category: dev
tags: [serverless, cloud]
author: Melania Andrisan
author_email: melania.andrisan@haufe-lexware.com 
header-img: "images/new/Exportiert_18.jpg"
---

A couple of weeks ago I got a plug, the TP-Link HS 100, from Holger to play with it and see what data can we use from it and if there is an use case we can integrate it in. 

In case you are wondering what this plug does or how you can make use of it in your home you can have a look at their [website](http://www.tp-link.com/us/products/details/HS100.html). And if you decided to give it a try and masure your energy consumption with it you can configure it like [this](http://www.tp-link.com/us/faq-946.html) using the Kasa app from the Apple AppStore or Google Play 

Once you passed the normal user phase and want to take the power in your hands and create your own app being it to start the plug, to stop it or read the consumption elsewhere then their app, then you need to use an API. Unfortunatelly there is no API officially, but unofficialy you can use the one from [George Vassilis](https://blog.georgovassilis.com/2016/05/07/controlling-the-tp-link-hs100-wi-fi-smart-plug/) which you can find on [GITHUB](https://github.com/arhea/tplink-hs100). They even created a [docker container](https://hub.docker.com/r/arhea/tplink-hs100-hub/) to discover the plugs from your home and the docker container has this [API](https://github.com/arhea/tplink-hs100) deployed on it.

Ok, now we have a docker container and we need to deploy it someware in the house to make it available from our app. What I decided to do was to deploy it on my [Raspberry Pi](https://www.raspberrypi.org). To be able to install docker on your Raspberry Pi you need to follow this [tutorial](https://docs.docker.com/engine/installation/linux/docker-ce/debian/). 

Ok, now I have this small application which is able to find all the plugs and deliver the current consumption if needed. Next I need to send this data somewhere and to make it available everywhere I am with my phone. What I did was to make a small node.js server which does this. And you can find it on [Github](https://github.com/melaniaandrisan/nodejs-schedule-server-docker). What it does is get the data from the plug using the previuos docker container and send it to a service which is  implemented using a Amazon Lambda function which gets this data and saves it in a Dynamo DB table.

And in this way, I have my plug info in my DB and from there I can take it whenever I need to: I can make reports or notifications or nice graphs. 

![Architecture Overview](/images/tplinkArchitectureOverview.png)

Hope this helps you, till next time!
