---
layout: post
title: Haufe Summer Practice 2017
subtitle: First steps into the real IT World
category: dev
tags: [general, culture, react, alexa]
author: Nechitelea Robert, Chiriac Alex, Zaharie Robert
author_email: ncrobertpal@gmail.com
header-img: "images/HaufeSummerPractice/5-Coding-Challenges-to-Help-You-Train-Your-Brain.jpg"
---

# Nechitelea Robert&Chiriac Alex.Mobile applicatin with React-Native

Hello, my name is Nechitelea Robert and together with my colleagues Chiriac Alex(students at the West University of Timisoara) and Dragutoiu Alexandru we developed a mobile 
application that shows the availability of Haufe’s meeting rooms based on Outlook Calendar scheduling as part of our summer practice.

The Haufe Meeting App is an mobile application which displays meetings information such as : meeting room availability, meeting duration(start and end time), organizer, 
all of this in an easy to use format.The user can switch between the current rooms at any time and also check the schedule on other days.

![Screenshot of the Main Menu] images\HaufeSummerPractice\20747801_1379739378762563_1204295863_o.png
![Screenshot of the Timeline] images\HaufeSummerPractice\20707381_1379739358762565_748158599_o.png

During these 4 weeks we learned a lot and went through many challenging problems, which we managed to solve successfully.When we first got here we didn’t have much experience
in using Javascript frameworks(such as Node or React-Native).We spent the first week installing and configuring the necessary libraries and dependencies and then went on to 
learn the ropes of React-Native and general mobile app development(deployment to device, emulators and so on).

During our second week we really picked up the pace.We managed to create a prototype of the UI using information we learned by completing tutorials and reading documentation.
We also had to expand your Javascript programming knowledge by reading about the new features of ES6.This was one of the most creative part of our work here becaue we had the
opportunity to developed the UI as we wanted and choose the overall structure of the application.

Moving on to the next week we faced most of the challenges.We got familiar with the Exchange Web Service API which was pretty difficult as there wasn’t much API information 
available for javascript. Our tutor helped us with this problem by pointing us to a Javascript library for the EWS Managed API.The rest of the week we had : learn how to use
the library, find the Exchange Server URL and make our first test calls to the Exchange Server.We also created an API server using Node.js and Express from which we could 
fetch information regarding the meeting times in our application.

Our forth and final week was spent integrating the responses in the mobile application and displaying it properly in our UI, deployed the API server to Azure and tested our 
work on a real device for the first time.Bug fixing was the activity which took most of our time as we wanted to release a working Android app.
While most of the code and structure of the application can still be improved by an experienced programmer, we pride ourselves in the work we put in, considering the fact we 
had little experience in using Javascript frameworks or backend programming and in only 4 weeks.

This experience opened a new perspective for us as we learned a great deal on how to figure out and solve problems by ourselves, what working in a real IT company feels like 
and how to manage our time, all of which will help us in the near future.
In the end, it was an amazing experience for us.We are grateful for all the help that we received and we want to thank everyone for giving us this riveting opportunity.

# Zaharie Robert.Building an Alexa skill for news selection.

My name is Zaharie Robert and I am a student at Politehnica University of Timisoara. During these 4 weeks, I developed an Alexa skill that can search for news about a given
subject.

The skill is using an API that gets news from about 60 sources, choses the ones that are relevant to the given subject and creates a list. Alexa will read all the headlines
and after that, the user can request a description of a specific article and / or to save the link to his Pocket account and Alexa cards. 

First week was all about getting used to Amazon web services and how Alexa works. After a few days, using javascript I made my first skill that was able to tell me facts 
about Amazon. Using that as a template, I started to add more intents and create the main body of the skill.
During my second week, I added the API for the articles and the filter function that selects the right ones. The functional part was there, so I started to think about 
making it behave more like a human, so I added different responses and requests that made the experience with the skill nonlinear. 

The third week I realized that Alexa cards are not very convenient, so I started to search for a different solution. The solution I found was the Pocket service, a very 
nice online service where you can save links and it also has a mobile app. I linked the Alexa skill to the pocket service and beside the normal Alexa cards, now the links 
are also sent to the pocket account. 

During the fourth week, I enhanced the filter function, so now the user can refilter the list using other tags until he is pleased with it. I polished the code and tested 
it a lot to be sure there are no conflicts ( Alexa understanding another kind of request because it may sound the same to her ) between requests. It can be improved a lot, 
with better filters, better APIs and optimization, but as it is now it can be used with acceptable results. 

This experience taught me how to solve different problems, manage my time and how it feels to work in a company, things that I am sure will help me in the near future.



