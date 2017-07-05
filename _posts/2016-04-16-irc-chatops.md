---
layout: post
title: IRC and the Age of Chatops
subtitle: How developer culture, devops and ux are influenced by the renaisance of IRC
category: dev
tags: [general, culture, devops, ux]
author: Holger Reinhardt
author_email: holger.reinhardt@haufe-lexware.com 
header-img: "images/new/Exportiert_22.jpg"
---

Since April 8th Haufe Group has a new group-wide tool to facilitate internal communication between individuals and teams: [Rocket.chat](https://rocket.chat). If you have heard about Slack, then Rocket.chat is just like it.

### What is it
Rocket.chat is a group chat tool you can use to communicate internally in projects, exchange information on different topics in open channels and integrate tooling via bots. If you were around for the beginning of the internet, it’s like IRC but with history. If you know Slack… then it’s exactly like that. 

### Another tool?
… but we already have so many!

We know. But Slack has taken the software industry by storm over the last 3 years. We felt that IRC-style communication fits into a niche where social tools don’t. We experimented with Slack and many of us loved it so we used it daily. We got a lot of good feedback from our Slack pilot over the last year and already more than 100 colleagues registered in the first 24h after our Rocket.chat instance went live. 
If you are curious why we felt the need to support this very distinct form of communication, you might find some interesting information and ideas in the following articles:

* [Modelling mediums of communication](http://techcrunch.com/2015/04/07/modeling-mediums-of-communication/)
* [IRC - The secret to success of Open Source](https://developer.ibm.com/opentech/2015/12/20/irc-the-secret-to-success-in-open-source/)
* [Is Slack the new LMS](https://medium.com/synapse/is-slack-the-new-lms-7d1c15ff964f#.m6r5c1b31)

IRC-style communication has been around since the dawn of the Internet and continues to draw a large group of active users. As we strive to create an open and collaborative culture at Haufe, we felt that there was a need to complement the linear social-media style form of communication of something like Yammer with an active IRC-style chat model. As mentioned above, IRC style chat seems to encourage the active exchange of knowledge and helps us in creating a [learning organisation](https://en.wikipedia.org/wiki/Learning_organization).

But there is more. Based on the phenomenal success of Slack in the software industry, companies are starting to experiment with Chatops as a new take on devops:

* [What is Chatops](https://www.pagerduty.com/blog/what-is-chatops/)
* [Chatops Adaption Guide](http://blogs.atlassian.com/2016/01/what-is-chatops-adoption-guide/)

And last but not least, there is even a trend in the UX community to leverage chat (or so called `conversational interfaces`) as a new User Experience paradigm:

* [On Chat as an interface](https://medium.com/@acroll/on-chat-as-interface-92a68d2bf854#.vhtlcvkxj)
* [The next phase of UX is designing chatbots](http://www.fastcodesign.com/3054934/the-next-phase-of-ux-designing-chatbot-personalities)

Needless to say, we felt that there is not just a compelling case for a tool matching the communication needs of our developer community, but even more a chance to experience first hand through our daily work some of the trends shaping our industry.

### So why not Slack
I give full credit to Slack to reimagine what IRC can look like in the 21st century. But for our needs as a forum across our developer community it has two major drawbacks. The price tag rises very quickly if wanted to role it out aross our entire company. But even more importantly we could not get approval from our legal department due to Germany's strict data privacy rules. 

Rocket.chat on the other hand is Open Source and we are hosting it in our infrastructure. We are keeping costs extremely low by having operations completely automated (which has the welcome side effect of giving our ops team a proving ground to support our Technology Stratgy around Docker and CI/CD). And we got full approval by our legal department on top.

### How to use it?
We don’t have many rules, and we hope we don’t have to. The language tends to be English in open channels and in #general (where everyone is by default). We strive to keep in mind that there might be colleagues that don’t speak German. Beyond that we ask everyone to be courtegeous, open, helpful, respectful and welcoming – the same way we would want to be treated. 

### Beyond chat
Chat and chat bots are very trendy this year – there is plenty of experimentation around leveraging it as a new channel for commerce, marketing, products, customers and services. Microsoft, Facebook, Slack – they are all trying it out. We now have the platform to do so as well if we want to.

But don’t take our word for it – check out the following links:

* [2016 will be the year of conversational commerce](https://medium.com/chris-messina/2016-will-be-the-year-of-conversational-commerce-1586e85e3991#.aathpymsh)
* [Conversational User Interfaces](http://www.wired.com/2013/03/conversational-user-interface/)
* [Microsoft to announce Chatbots](http://uk.businessinsider.com/microsoft-to-announce-chatbots-2016-3)
* [Facebook's Future in Chatbots](http://www.platformnation.com/2016/04/15/a-future-of-chatbots/)

Rocket.chat comes with a simple but good API and [a framework for building bots](https://github.com/RocketChat/hubot-rocketchat). We are already looking at integrating with our internal tools like Git, Confluence, Jira, Jenkins and Go.CD.

