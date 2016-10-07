---
layout: post
title: Project - B#1 
subtitle: Insights from the Freiburg Hackathon - New online Queue Management in Bürgeramt
category: product
tags: [Mobile, Open Source]
author: anja_kienzler
author_email: daniel.wehrle@haufe-lexware.com, anja.kienzler@haufe-lexware.com
header-img: "images\bg-post.alt.jpg"
---

A Hackathon is a kind of software prototype development marathon. This year the second Freiburg hackathon took place. The target was to develop an application for “Newcomers” to the city of Freiburg in 48 hours (Friday evening to Sunday morning). We accepted this challenge with the idea to create less-stressful way to manage the necessary administrative procedures at “Burgeramt Freiburg” (city government administrative services) for foreigners and employees alike with the possibility to extend the system to other official city departments at a later point.

![Hackathon Logo]({{ site.url }}/images/FR-hackathon-2016/2016_09_08_11_22_05_Hackathon_2016.png){:style="margin:auto"}

### The technologies

Among newcomers, smartphones are more common than personal computers, and we decided to build an smartphone app instead of a website because the solution required personal user settings and an offline mode function which we shall address below. The project goals we defined were:

1. An online function for receiving a number (ticket) for a queue at one of the city offices. The application should also provide users with information about current waiting times so they are on time for their appointments. If you use this app, you should feel like you are the first in line upon your arrival. 
2. Retrieval of digital forms in various languages, including a checklist of the required documents and forms needed for “Bürgeramt” appointments. This ensures that you do not have to come a second time because you forgot something. This feature also includes a database of translated forms that are normally only available in German. Even if they have to fill out the German forms, newcomers may see the questions in a language they are familiar with.
3. An App-UX that is easy to understand and comfortable to use even if the user is not always online.

Due to the short timeframe, our team had to make use of one technology that was known by the whole team, and so we also decided at very the beginning to develop in C#.

As platform options, we had Xamarin and Universal App and we decided to use Universal App because the team was also more familiar with this technology. 

### Technical doing

The project was then split into the subprojects UX-concept, Data Layer, Office and Queue Management, QRCode Scanning, and Document Storage. One developer was responsible for one subproject. Several times during the Hackathon, developers switched subprojects. 

### UX-concept

Working on the UX-concept and on the interface design started some days before the Hackathon. This allowed us to complete our UX-concept shortly after the event started so the developers could get the most out of the short timeframe of the hackathon.

The aim of the UX-concept was to make an interface that is easy to understand - the exact opposite of German bureaucracy. The user should always be guided to the best action, moving through the application in a few simple steps and reaching the desired goal quickly and easily.

To achieve the UX-concept, it was important to start from the user's point of view by reorganizing and resquencing the existing appointment categories of the “Bürgeramt” to meet newcomer needs.

The design is friendly and welcoming and supports easy navigation by using flat buttons and a clear menu prompt.  Because of the app’s name, B#1, and the characteristic behavior (diligent and useful) the mascot is a friendly bee.

### Data layer

While the design was being finalized, the developers started on the data layer. This subproject is the major backend component, and the data layer holds all user data, offices, lines, advices (representations of Bürgeramt appointments) and requirements - like required documents - for these advices. Because advices are built in a tree structure we built in a self-reference from advice to advice.

![Hackathon class model]({{ site.url }}/images/FR-hackathon-2016/2017-09-09_HackathonClassDiagram.png){:style="margin:auto"}

A simple XML solution for the data, stored directly on the phone, was our first choice to get the version of this main component running quickly. This was important so other developers could start using data for our app very early. 

The next step was to connect via WebService to a server and to update this data. The information should always stay on the phone to enable offline browsing of the data. Only the functions of receiving a line number, checking current waiting information and downloading documents should require an internet connection. This was clearly defined because newcomers often are dependent on Wi-Fi which is generally not available. 

The offices’ addresses and required data were taken from the city of Freiburg homepage. For the demonstration, we implemented a test data generator to create the rest of the data (number of people currently waiting, next number in line and so on).

### Queue management

For each possible type of appointment, we set a fixed waiting time, in a later version, we will improve this by adding self-learning. For each office, we defined one FIFO (First in, First out) queue filled with waiting tickets. 

By using the queue information, it was possible to calculate the current waiting time and the next ticket number. 

#### QRCode scanning

To realize this function, we included the XZing.Net component Nuget package. The usage was very straightforward, the only thing that was a little bit tricky was to improve focusing of the phone camera. But in the end we figured it out. 

In the QRCodes, we embedded the IDs that are associated with links to specific documents stored in our data layer. So for "advice requirements", we were able to use the same ID and link for QR Codes and associated documents and to avoid storing duplicate data.

The ID made it possible to change the storage locations for documents without needng to reprint the QR Codes.

### Document storage

Document storage was a nice to have feature which is why we started working on it last. We settled for a very quick solution. We only stored IDs (Used for QRCodes) along with http links to the documents so we could use cloud storage to address the documents.

Because we did not know at that point whether a centralized or an individual storage from the independent office should be used, the document storage solution functions with both local storage and remote storage.

### Conclusion

Getting a project done in two days is not an easy task. It requires great effort and teamwork. Building a team consisting of members from different Haufe Group departments is also not easy - especially considering that each member is busy with his/her own projects.

In the end, we completed the project and it was possible to produce a prototype within 48 hours. For this kind of a project, our takeaway is that you have to concentrate on the core functions and use as much external code as possible (Nuget, OpenSource Libraries etc.). Another takeaway was that it is good to have a finished design concept at the beginning of the project. The completed UX-concept helped guide our coding.

Freiburg Hackathon was a good challenge to learn new things and test our skills in a “new project environment”. We all liked the concept of the hackathon.
Finally, we believe our idea is a good concept that will be a really nice, working product. Because of the short timeframe there is still a lot of work to do, turning many of the functions, that are right now “dummies”, into full-fledged features. 
