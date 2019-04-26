---
layout: post
title: Analytics
---

Give me all of you data!

# Unity Analytics

You can get a better insight into your game and if the mechanics work as intended with some user data. To getter these data and to visualise we use Unity Analytics. You can enable Unity Analytics with the simple click of a button and it will automaticly collect certain data, like the daily users. This s a nice aspect of it but to unleash the entire power of analytics you will need more than just the standard events. Lukily you can create custom events that will give you a detailed insight into your game, to that extends that you programmed it to be.

## Custom Events

We currently have 7 custom events:
- Achievement Gained
- Buttons Pressed	
- Cube Spawned	
- Door Opened	
- Netgame Completed	
- Netgame Created	
- Stepped Up

With this events we can monitor more precisely what the user is doing.

These events are also automaticly collected and send to the Analytics dashboard. The dashboard displays the data and allows you to show them in a graph.

![Analytics Dashboard](/images/analyticsDashboard.png)

In the graph you can see some test events we generated to test the events and dashboard.

## Problems

In theorie we have done everything we need to get some good analytics going, unfortunately we ran into some problems. The events are not sended consistently, this means we dont have all the events that are been send to the dashboard. Unity provides an event validator thta displays the events that are send. In the validator we can see the events been send but they never appear in the dashboard. We have search for solutions for it but we weren't able to fix the problem yet. 
For this reason we only have some event data in the dashboard and not as many as we would liked.

The reason for this is that Unity has a hourly analytics request cap and it won't let you send more than 100 events per hour per user. Because of this we can't send as many data as we would liked. F.e. you step up way to often to track it. The way we fixed this is by sending only a few events.

Another problem with Unity Analytics is the time it takes for events to be processed and displayed in the dashboard. We have encountered waiting times inbetween event creation and the dashboard showing them of multiple days. Maybe this is also the reason why we don't have consistent event data in the dashboard. Nevertheless these waiting time would be acceptable if we get all the events that are been send. It looks like this is not the case though.

# Time invested

Tim: 6h