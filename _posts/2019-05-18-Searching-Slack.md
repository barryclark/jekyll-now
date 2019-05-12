---
layout: post
title: Slack as a searchable chat-ops sink
excerpt_separator: <!--more-->
tags: [slack, api, chat-ops, data extraction]
---

## Chit-chatting 

![Slack](../images/searching-slack/pankaj-patel-642856-unsplash.jpg)
> Photo by Pankaj Patel on Unsplash

I have been using [Slack][1] quite a lot this last year for my day-to-day work.  
Late adopter as I am, I have been using it both in a geographically distributed startup as well as
a tightly knit mature company. 

In both cases, it is a force multiplier.

The benefits it brings are [pretty][2] [well][3] [documented][4] and I will not go over them here.

What I will cover is how to easily utilize [Slack's API][5] for historical data processing.   
<!--more-->

## The use case

![Robot](../images/searching-slack/franck-v-516603-unsplash.jpg)
> Photo by Franck V. on Unsplash

We have a long-running business-critical process.
Let's say an automatic apple tree care-taker and harvester. 
  
Upon hitting an important "milestone" or completing a task, it sends a message to a Slack channel.  
For example   
`Weed removal: Starting at orchard A23`  
`Apple harvesting: Box of 30 Gala apples loaded on truck 26`

The same happens for failures which need immediate operator attention.  
For example  
`@here Failure of harvester John Deere 25, orchard B5. Immediate restart required`

Having the process running for a period of time, we have the questions:
* _Are failures happening more often?_
* _Is there a correlation with the harvester type?_
* _Is there a correlation with the orchard location?_     

Let's get cracking!

## Slack API

![Slack](../images/searching-slack/taskin-ashiq-464194-unsplash.jpg)
> Photo by Taskin Ashiq on Unsplash

The API endpoint for searching messages is... umm, the [`search.messages`][6] endpoint.  
What a surprise! :-)

There are 3 things to note in this method:  
* `query`
* pagination
* sorting

and finally the app token 



## Parting thought

![Doctor](../images/postgres-indexes-queries/arvin-chingcuangco-1337417-unsplash.jpg)
> Photo by Arvin Chingcuangco on Unsplash





   [1]: https://en.wikipedia.org/wiki/Slack_(software)
   [2]: https://www.linkedin.com/pulse/slack-chatops-revolution-dinis-cruz/
   [3]: https://www.ibm.com/cloud/garage/practices/manage/chatops/tool_slack
   [4]: https://www.quora.com/How-useful-is-Slack-for-a-small-business
   [5]: https://api.slack.com/methods
   [6]: https://api.slack.com/methods/search.messages
   