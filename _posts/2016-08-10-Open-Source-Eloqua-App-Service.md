---
layout: post
title: Build an Eloqua Action Service and make it Open-Source  
subtitle:
category: general
tags: [cto, open-source, culture]
author: melania_andrisan
author_email: melania.andrisan@haufe-lexware.com
header-img: "images/bg-post.alt.jpg"
---

[Here is our Open Source][github] project on Github after some digging into Eloqua documentation and building some docker files. Take a couple of minutes and read the entire story. 

Some time ago... the story of building an [Eloqua App][eloqua app] begins. First, [Bogdan][bogdan] (one of my colleagues) starts to investigate what can be done and after digging and digging in the old and new documentation he realizes what it’s possible. After 2 weeks of building and debugging the first version of our Eloqua App appears.

Our Eloqua App is a service meant to provide a small box in a campaign which can receive a list of contacts from the campaign and deliver emails with a form with their data. We are using Eloqua to create different Marketing Campaigns and in case you are not familiar with it you can have a look at the [official Oracle Page][Oracle].  

To be able to do this we needed to build a Node Service with Express (it could be any type of REST service) which can serve the needed Endpoints:

- Create - the endpoint is called when the App is initialized, and this is happening when the marketer drags the app box into the campaign

- Configure - is called when the marketer chooses to configure the app by double clocking the App box in the campaign. This Endpoint delivers some HTML to make the configuration possible.

- Notify - is called automatically by Eloqua when the campaign is active and the list of contacts ends up into the App box

- Delete - is called when the App is deleted from the campaign   


And back to the story now... we deployed the App in Azure, and we started using it in a campaign. Some weeks after, Eloqua changes the API and some static fields which were configured in the needed form where not appearing anymore.

Here I enter into the story and start investigating; it looks like Eloqua does not offer the possibility to store other fields than the ones attached to an Eloqua entity anymore. Having this problem to solve I added a [Mongodb][Mongodb] with [Mongoose][Mongoose] to the project and saved the needed fields there. Doing this I realized that we can improve our code and instead of using the old callbacks I switched to promises.

I built also some Docker scripts to have the app containerized and made everything opened source.  

[On Github][github] you can find the Server, the docker containers and a Readme file which explains everything we learned from building this App.

Enjoy! and Happy cloning!  

[bogdan]:https://github.com/cimpoesub
[eloqua app]:https://docs.oracle.com/cloud/latest/marketingcs_gs/OMCAB/#Developers/AppCloud/Develop/develop-action-service.htm%3FTocPath%3DAppCloud%2520Development%2520Framework%7CDevelop%2520Apps%7C_____3
[Mongodb]:https://www.mongodb.com/
[Mongoose]:http://mongoosejs.com/
[Oracle]:https://www.oracle.com/marketingcloud/products/marketing-automation/index.html
[github]:https://github.com/Haufe-Lexware/eloqua-contract-to-form-action-service
