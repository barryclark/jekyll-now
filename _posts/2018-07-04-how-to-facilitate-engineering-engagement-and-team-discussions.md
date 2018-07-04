---
layout: post
title: Scaling a Technology Team... to help scale a business
author: tim_carpenter
comments: true
excerpt_separator: <!--more-->
---

Over the last three years our development team has rapidly expanded: from a few software engineers keeping the lights on, to a team of over sixty creating experiences we are be proud of. Concepts like ‘customer journey’, ‘user experience’ and ‘iterative delivery’ were not even heard of in the old days, now they are at the core of everything we do. 
<!--more-->

The problems we faced as our team grew could all be categorised into: technological, infrastructural or operational. As a product manager I’ll leave it to people more qualified than me to talk about micro services and Docker containers, but where I think we have been successful is how we organise our teams.

Our main two issue were getting software engineers from different teams to communicate with each other, making sure they understood what they were expecting from each other; and stakeholders expecting delivery of large projects whilst sustaining the pace of BAU work we could deliver.

How we structured our teams worked (and still does) for the small feature iterations of our products. Each team has a set of products which they own: they are responsible for monitoring, maintaining and incrementally improving them. Nothing revolutionary there then! Our pain stemmed from large projects that spanned multiple teams.

![Agile Process - Team Structures](/images/agile-process-team-structures.png)

Team A that owned the new API required for the project assumed that team B would be have certain data in order to create their request. Team B who needs to use the new API assumed the new API would go and get that data itself. Cue never-ending back and forth about which team has to make the change and endless theoretical discussions about the importance of stateless web services. All over Slack of course. The result was simple fixes taking weeks to be deployed when writing the code only took hours.  

As a product manager my focus has always been to deliver working software as soon as possible, so we began having ‘bugathons’ towards the end of every project. We would get all the people involved from across various teams and make them sit in a room and fix the issues as team – almost immediately the weeks of back and forth and discussion became minutes and projects that had stalled leaped back into motion. Agile principle six states that face to face communication is the most effective way of communicating within a development team – so we shouldn’t have been surprised that sitting these teams together achieved amazing results.  

The other learning we gained from these ‘bugathons’ was that all of a sudden the engineers involved were not expected to do anything else. The “URGENT!” emails and “please could you quickly…” favours seemed to go somewhere else. It was clear to anyone with eyes that everyone in that room was focused and not to be disturbed. 

As a result we started to plan these big projects in a different way. We called them missions. 

## Missions
A mission starts with a business problem, and on the back of a design sprint and some planning days the team would be assembled. The crucial part of every mission is that the people that makeup the mission stack have the skills and knowledge to achieve the mission’s objective without any external support. We select a product manager and a stakeholder that has the relevant business knowledge to make decisions quickly, engineers are gathered from across the product teams to fulfil the disciplines required from a technical perspective and designers, business analysists and data scientists are added where required.  All members of the team have a deep understanding of what the problem is and a common goal in how to produce a solution.

These people are the same people who would have been working on the project before, the key difference is rather than completing their tasks from within their product team they now do it as part of a mission – sat together at a mission desk.

Although asking the mission stacks to sit together might seem like an innocuous point to raise, it is worth raising. The close physical proximity of the people working on a mission allows decisions to made instantly, discussion to flow easily and disagreements to be settled quickly (and with input from anyone  on the team that doesn’t have headphones on!).

Separating the missions and the product teams physically also makes it extremely visible to stakeholders how their development resource is deployed. With a quick walk through the office even the least engaged stakeholder can gauge the main areas of focus within the tech team. This visibility has proved invaluable when requests for resource come from the business. We now talk about someone moving desks rather than just moving their focus. This connection between the abstract allocation of resource and the physical location of the same resource has proved to be the catalyst to getting our business people to understand that constant ‘small’ requests have big impacts on important projects.

So far missions have proved (for us at least) to be the most effective way to deliver significant projects. They are not perfect of course, and after every mission we hold a mission retro to identify ways to improve the next one. One of the biggest problems we currently face is how to add incremental value on a large projects when the first iteration is too large but seems impossible to breakdown; and how to accurately estimate bulky projects with significant unknowns.
