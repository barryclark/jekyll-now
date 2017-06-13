---
layout: post
title: Haufe-Akademie Chat Bot
subtitle:
category: product
tags: [chatbot]
author: george_ganea
author_email: george.ganea@haufe-lexware.com
header-img: "images/bg-post.jpg"
---
# Idea

It all started at a Haufe Group wide hackathon organised in the Timisoara R&D Center. Business would come up with ideas and tech would implement them. One of the ideas was to build a chat bot for the Haufe-Akademie designed to help customers find trainings easier.

Users should be able to log in the Haufe-Akademie website, open up a chat window, input phrases like “Show me seminars on management in July in Berlin” and get results. We were also given a spreadsheet with over 3000 courses, trainings and seminars.

# Tech stack

The requirements seem clear enough. Let’s break them down. We need a chat window, a way to understand the german language and a way to query the spreadsheet. Easy! Well… sort of.

The toughest part is being able to analyze the sentence (or “utterance” as we’ll see later) the user types in. We should be able to detect if the user really does want to search (even though it’s the only feature we support at the moment). Then, if we detected that the user does indeed want to search, we have to extract as many search parameters as possible. On top of that, our bot should be also able to hold a conversation, even if a short one. Otherwise it would just be a NLP-enabled search field. Oh, one more thing: all this needs to be in German!

After a few hours of searching, we decided to go with the Microsoft stack (https://dev.botframework.com/ + https://www.luis.ai/) mainly because of the ease of use and good documentation. So, the hardest part of our job should now be pretty straight forward: just register an app on luis.ai, get an endpoint to call and use that one from our bot app build with the node.js SDK of the bot framework.

The “data” part of the problem was solved by exporting the spreadsheet into a csv file, uploading it into an Azure Blob storage and indexing it into an Azure Search Service. After that, it was all a mater of putting it all together. Oh, almost forgot - because we used the bot framework, we also got the web UI for free (not very customisable though) as an iframe that we could just embed into our website.

# Design

Our architecture looks something like the diagram below. We have the bot framework app that provides “channels” to talk to our bot through. One of these channels being the iframe that we can embed in our website.

![Architecture]({{ site.url }}/images/akachatbot/architecture.png)

The framework app is configurable with the url (the endpoint has to be https!) of the actual bot server. This is either a node.js or a C# application written against the Bot Framework  SDK. We used node.js and deployed the application as a docker container on an Azure VM. We plan on migrating the container to the Azure Container Service.

Ops-wise, everything is hooked up in a continuous delivery pipeline, from commit to end-deployment, through Jenkins' github hook, Docker, azure hosting and a little bash script here and there.

The SDK allows for an easy setup of a connection to a luis.ai app. This application is both build and run from it’s web interface. No actual programming is required. To make it work, one needs to define the intents and entities that should be detected. An intent is basically the verb/action of the sentence the user typed in, while an entity is a piece of information related to the intent. To train Luis, we input as many “utterances” (chatbot jargon for sentence) as we can think of - the more the better. This has to be done for each supported intent. In our case, we only had to support “search” and “ask for a human”. As entities, we have “course type”, “topic”, “datetime” and “location”.

Once the intent was detected as “search”, we simply used the entities as parameters for the Azure Search Service. Well, technically it was not that simple because of the beauty of the german language and because German Luis likes to split up composed words. But this is a story for another time. Let’s stay on task here.

# Presentation

In order to have full control over the content we show we decided to not use the message/card layouts built into the bot framework in favor of another young Microsoft project, adaptivecards.io. This allowed us to fully customize the look and feel of the content we give back to the customer with little effort.
