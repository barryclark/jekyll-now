---
layout: post
title: "Amazon Connect: A work from home call center"
author: blongden
---

![Photo by Andrea Piacquadio from Pexels](/images/amazon-connect/woman-using-white-headphones-using-macbook-3885801.jpg)

One week in to this brave new world of working from home and we are settling in quite nicely to the new 'normal', here at Infinity Works. We're lucky that much of the day to day tooling we use as consultants is very remote friendly, so aside from a few initial issues and a slight feeling of cabin fever, we have all managed to adjust relatively easily. All our customers are going through the same thing. One of the big issues that we have seen over the past week is the challenge in getting call centre staff to be able to perform their duties out of the office.

As cloud natives, we're experts at working in AWS to develop solutions that take advantage of the full power of the cloud and of the services that AWS has to offer. We have embraced serverless technology and use it to great effect with our partners to achieve amazing things, all largely without the need for the maintenance of traditional servers. Given the presence of customer data in the cloud it would seem logical that there would be a service to allow contact to those customers via means other than the obvious 'cloud' interfaces through web and mobile.

This is where the appropriately named Amazon Connect omni-channel contact centre comes in. Through the same interface, call centre staff can run both text and voice chat (via inbound or outbound calls). What makes this relevant to the situation we currently find ourselves in is that the call centre works with both a soft phone (using a headset connected to a modern, Google Chrome or Firefox web browser) or a Desk Phone, routing calls to another number, either mobile or landline.

## Solution Overview

Through Amazon Connect you are able to set up a new phone number or transfer in a number you already own. In a single Amazon Connect instance you can claim multiple phone numbers in multiple countries and link them to 'Contact Flows', a visual representation of your contact centre flow.

### Flows

![Contact Centre Flow](/images/amazon-connect/flow.png)

In this example the entry point is a phone number. It could also be a text chat (though things like set voice obviously would not apply). Each step progresses in order through to the point where the caller makes a selection using numbers on their phone keypad. The flows beyond that selection branch into a new flow, put the caller into a named queue loop or one of many other possible actions in the console. Eventually, all paths either lead to the call being terminated or transferred to a queue, flow or another phone number.

### Queues

A queue is an end point for a caller. Agents are assigned a 'routing profile' which provides access to queues. When callers are placed in a queue, they are placed on hold until an agent is found that can take the call.

### Routing Profile

The routing profile determines the priority of queues for agents. An agent can only have one routing profile, but the routing profile can provide access to multiple queues with different priorities. You can also provide a delay in seconds for how long an agent needs to be free before picking a call off a queue.

### Roles

Amazon Connect provides a role based access system with roles defined as Admin, CallCenterManager, QualityAnalyst and Agent. Extra roles can be defined if they're needed.

## Agents

Agents will likely be the highest number of users in a typical call centre set up. All users (with access to 'Contact Control Panel (CPP)', Admins and Agents by default) have access to either a soft phone which works through the browser and a headset, or a desk phone, which could be an agents landline or mobile phone.

![Agent 1](/images/amazon-connect/agent.png)

### Status

By default an agent can be either Offline or Available, however you can define as many statuses as required. Reports can be run to view a breakdown of realtime agent status or how long agents have been in each state.

### Reporting

![Contact Search](/images/amazon-connect/contact-search.png)

Reporting on agents is clearly a vital part of a functioning call centre. Out of the box there are reports detailing a whole range of different statistics on agent performance with call logging and recordings/transcripts are available through a contact search report (stored as .wav or .json in S3).

## Additional features

It is of course possible for deeper integrations with callers if you have call data also stored in AWS. Part of a call flow can be the execution of a lambda which returns key/value pairs with data that could identify the caller based on data collected during the call, or from identifiable information like the number that they are calling from.

Utilising the power of additional AWS services like Lex for automatic speech recognition and natural language understanding (the same system that powers Alexa) it is possible to build fully automated chat bots to handle many calls automatically.

With Amazon Connect, the power largely comes from the distributed nature of the platform. Agents can log in and take calls from anywhere in the world, either through their browser, or via another phone number. The ease of being able to set up call routing, and the flexibility of exactly how much of your IVR can be handled by Amazon Connect makes it a really powerful tool, and whats more, if you already use AWS for some of your services, you can simply turn it on with no extra approval required for a new supplier.

## Pricing

Amazon connect is pay as you go so there are no lengthy contracts or lock-ins. You just pay for what you use. As an example, if you have your whole contact centre under a single number you pay $0.03 per day for the claimed number, and $0.004 per minute for any inbound call ($0.03 for a free phone number). The rates differ for inbound/outbound calls from overseas. There is also an Amazon Connect charge of $0.0018 per minute for voice and $0.004 per message on chat. Here's an example.

A customer calls using Amazon Connect DID (Direct Inward Dial) in the UK (London) region and is answered by a Agent using a softphone (web browser). The call lasts 10 minutes.

There are three charges that apply, Amazon Connect per minute, inbound call per minute and DID charge per day.

1. Amazon Connect: $0.004 * 10: $0.04
2. Call charge: $0.0018 * 10: $0.018
3. DID charge: $0.03

So the call charge is $0.058 plus the standing day charge of $0.03 ($0.088). Scaling it up to 10 or 100 calls per day averaging 10 minutes, you would hit charges of $0.58 or $5.80. There is no limit to the number of Agents or the number of inbound calls.

Scaling up to some real stats for a call center, (5900 calls per day and avg call length of 7 mins) we'd be looking at around $240 per day.

## Bottom line

It's incredibly fast to set up an inbound number, call logging, recording and routing to queues to agents who are working from anywhere to address the immediate need to allow or encourage call centre workers to work from home. The challenge in the short term is going to be in re-training significant numbers of staff to use a softphone connected to a web browser and make the transition to mobile devices.

Infinity Works are here to help. If Amazon Connect would solve a problem for you and your call centre staff and you would like to chat please [get in touch](https://www.infinityworks.com/contact).
