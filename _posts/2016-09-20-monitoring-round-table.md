---
layout: post
title: Monitoring Round Table
---

At Infinity Works, we use a variety of different monitoring tools with our clients: Prometheus, AWS CloudWatch, AppDynamics, Splunk, ELK etc. They all appear similar or appear to do similar things, but actually work in very different ways. We got together to talk through the options, starting by getting some definitions out of the way. 

## So what is a metric?

AH: Let's start with a "sample" - a numeric value at a point in time. A "series" is a set of "samples" and a "metric" is a catch-all for a named series, or aggregation of multiple series.

An "event" doesn’t necessarily have a value attached to it so I think of it as a sample with an integer value, usually one because things don't often happen at exactly the same time.

How often you sample is really important because you can only see the shape of a curve if you sample it enough. If you only sample at the top or bottom of every curve, you could get a very strange result, while sampling too much will give you a data volume problem.

There are different techniques to handle this like reducing the granularity of data over time or precomputing averages so that when you report on them they are fast to render.

Be cautious of the average. Although it's more difficult to think about distributions it's worth the effort. For example, if you’ve got six servers and you’re looking at the total percentage CPU usage, you’re probably looking at an average over those six servers and might actually have four servers that are really working hard and two servers that are not doing very much.

## Log aggregation

Splunk and ELK are increasingly used to produce dashboards, although the traditionally they have been seen as log aggregation tools. They do this by  extracting data from logs, as per this example of a Grok pattern from the Logstash. It demonstrates a regular expression which pulls useful samples out of this HTTP log file entry. Since each log entry has a timestamp, then it's pretty easy to do, with developers simply adding log entries for new metrics.

## Runtime profiling

AH - In the AppDynamics / New Relic space we’ve got tools which add profiling which has kind of traditionally been a desktop activity but is increasingly happening on the server. These tools answer a different set of questions, not just how much RAM the software is using, but where is that RAM going?

Do I have a dictionary that's continually increasing in size because it's a static object and won't be garbage collected? For example, I once had a system where the dependency injection framework was creating new objects which were never being disposed of. As a result, the longer the application lived on, the more and more RAM it consumed. Eventually you’ll see that in production because your application will slow down but then when you restart it, it will go back to normal so you might never know the underlying cause. I used ANTS Memory Profiler to tackle that one, and it was very easy to spot with the tool. 

Things like AppDynamics and New Relic have agents which can hook into the profiling APIs of some platforms, get notified of all functions calls and extract the data for analysis while other platforms require sampling profilers which essentially stop the program repeatedly and look at where every thread is currently executing. Over time you can say 50% of the times I looked it was in this location so therefore that's using 50% of the CPU. You can drill down into individual functions and see the lines of code where problems are happening, and even see which SQL code was being executed.

## Instrumentation

AH - Instrumentation is where you update your code to push metrics out. Timing data can be pushed out automatically by tools - sometimes just by literally adding logging between each line - or manually by developers just adding in custom logging to log the time taken to complete critical activities.

Speaker: It sounds like a bad thing to be doing to me, because you’re not going to run it live like that.

AH: I think increasingly people do run in production like that.  I watched a talk of the Golang UK Conference and the company the speaker was working for was  bidding in real time auctions to place advertisements. They had to respond within a timeframe of milliseconds or they wouldn’t be able to participate in the auction. They ran the profiling all the time and said they didn't really notice any difference. I think that level of profiling performance might be unqiue to Go though.

Speaker: I think also there’s times where you can kind of switch it on and switch it off when you need it, when something is going wrong that can also give you problems when it's running.

AH: There’s been a few approaches to instrumentation:
 * Adding data into the logs and pulling that out via a log forwarding agent.
 * Pushing metrics out via an agent or directly from the app.
 * Having the application present a metrics interface - a pull mechanism.
 
The final monitoring element to consider is concurrency monitoring. In multithreaded apps it's important to track thread starvation, where tasks are waiting to be scheduled against a CPU.

# What is monitoring telling you? What to monitor, what to collect, what are the risks and what metrics?

ND: It's dead easy to monitor things like CPU utilisation and see if the computer’s busy. Which is brilliant, but what if the CPU is meant to be busy?

BB: Yes, what are you using the monitoring for as well?  Are you using it for indicating whether to scale-up your cloud infrastructure or are you using it for queue length where you might need to build new on-premise infrastructure. It's what you’re actually trying to get out of the monitoring rather than just having it tell you you’ve got a problem, because it might not be a problem.

ND: Monitoring tells you what's happening, it doesn’t tell you why, it doesn’t allow you to infer anything. You have to have some context or knowledge to put any sense into it.

IC: It's tricky narrowing down your monitoring to just you know, what you want to take action on, because then you’ve got a pretty narrow view aren’t you?

ND: In one of our projects, we started with a bunch of monitoring stuff and the acknowledgement at the start was ‘We might not need all this stuff but we'll put them up, run it for a while and see what is meaningful’ because we knew when you were going to get high load.

SR: We went round and we got the infrastructure stats out because that's what you do, that's conventional isn't it, and we also invested some time to get some business stats that we knew we wanted. The principle we had was that we're not that interested in infrastructure stats, as a rule, because they are context-free whereas if I know from a business perspective registrations have just stopped, something is wrong, and I can then drill down. So I look into peaks and I might need to take an action based on behaviour on...it’s more behavioural kind of stuff...

ND: It's almost like its layered isn't it?  You start off with the business stuff because as long as that keeps ticking along at the expected rate then I might not need to go digging.  It happens a lot in business scorecards and dashboards and things.  The execs look at the red/amber/green lights, saying “Is everything okay?” “Green light yes” “I’m not going to spend any more time on that.”  “Is it a red light?”  “Yes.”  “So who do I call now to tell them to go digging?”

SR: I absolutely didn't want to traffic light our monitoring - we don't have any because I think it's very hard to define because you end up having to create an arbitrary model and then you’re tuning the model like “You should have gone amber” but it never did, “Okay good I’ll tune it” because we’ve had so long building this arbitrary model that nobody really understands or you’ve got kind of web genius in the corner....

ND: But I mean you are looking at logins and business usage and stuff.  They’re genuinely useful metrics, you can tell everything is working and if you see a problem then you then almost go down to the infrastructure level to kind of like go “Is the network working?  Is the ELB busy or overly busy or...?”

SR: Yes things like that because they are kind of trending and profiling, of the infrastructure, have I got a big enough box or...

ND: I guess you drill down to the individual hosts and see if you see problems, is it just one host that is overloaded or more than one?

SR: Yes, from a stakeholder's perspective it was useful to expose the business metrics up-front because they could then get confidence that the system was up and running and then didn't need to involve me to find out if it's running, how many of these things have happened today, what's the rate of this, what's the rate of that? etc.

AB: How do you collect your business metric requirements? I've found one of the hardest things is to engage people. Maybe because they’re not really interested?

SR: From `customer` we knew what they already had internally, so our minimum requirement was to replicate what they already had.

ND: At `customer`, our job is to make a certain pipeline go fast, but when we asked about peak load through a period, they didn't really know so we had to go back to last year and guess how much more would be processed this year. You have to start with how many physical things happen in the real world, how many data points that is generating in your system and how much of that data actually gets to the bit that you're working on.

Speaker: If you start with obvious metrics and demonstrate that, you'll quickly get “Oh that's interesting. Would it be possible to split that value by this other dimension?, or what about this dimension?", so it's an iterative process.

# Context

Speaker: If you see something go wrong on the graphs it's quite useful to have things like when the last deployment was run, what's it usually like at this time of day and other data overlaid in your graphs.

Don't monitor in isolation, you need to understand the business impact of what you’re doing and what the metrics are telling you.

# Is it better to script logs or expose/push metrics?

Speaker: Pushing metrics has a cost, an application cost if it's running the push from the same place as you’re running.

AH: Prometheus has some cool eatures for this. For batch processes, you can POST metrics to a piece of software called the pushgateway. You can keep pushing metrics to it from batch processes on the machine, with Prometheus regularly scraping metrics from the pushgateway instead.

Speaker: Well the thing is you buy a Splunk license and use that for everything. [laughter]

Speaker: A lot of time, but I’ve seen it several times where you’ve tried to do real time log analysis in with Splunk so you go right, in that case we’ll write a special log line that has values in it and what you end up with is millions and millions and millions of useless lines because they were only valid for five seconds.  

Speaker: I guess the true example of trying to do that was on `project` where we tried to use Splunk for everything and it's not a top performer because it's a bit clunky for most people.  On `project`, we’ve got Prometheus for some stuff and I don't want to say but ELK for the log stuff...

Speaker: Every time I've been to a place that uses Splunk, the team have taken the approach of logging everything and figuring out what to monitor later.

Speaker: It's more effecient to expose stats at a certain point, but you’d have to keep the internal status...

AH: When you implement counters in Prometheus it will do that [maintain statistics] for you.

# Alerting

AH: An alert is a notification of an event that we expect to trigger some kind of response workflow. How do we turn our metrics into alerts?

Speaker: Prometheus will do all that and that's how we’ve got ours setup. I think the best way to get started is to get something live, figure out the system then configure some alerts. We’re now getting to the point where we understand the heartbeat of the system and are able to configure alerts for that.  So we’ve now got some alerts set around whether parts of the system seem to have gone down, that logs are working and backups are completed every day.

Speaker: That's the critical thing though isn't it?  It's whether you care about the alerts and you need to figure that out at the time by living with the thing.

Speaker: Because we’ve all been swamped by spammed by alerts and you just go "this happens every day|.  That's been red for weeks...

Speaker: Once you start ignoring it, it loses its value.

Speaker: Exactly.

Speaker: You’ve got to decide what scenarios you’re going to take some action against. So one half of your database going offline, or the fact that we haven't processed any transactions for the last five minutes might be something to address, whereas you probably wouldn’t be interested to know the CPU spiked.

AH: We also need to check that someone's got the message and that if they are on call they do get woken-up. If not, we need to escalate that to the second point of contact. And then you have other problems, you’ve got to manage and maintain the list, handle giving your team phones, or use tools like Pager Duty where you get an app on your phone. We also need to communicate with other people who need to know about incidents. Just pinging an alert to a channel doesn’t mean that anyone saw it or took action on it - it just means that it triggered the alert but there should be probably a process behind that.

# How do we capture business metrics like abandoned shopping carts?

Speaker: The way to do this is to time-bound it and say that if you see an event where you expect another to follow within a time period, and it doesn't happen, then you might need to trigger an action.

# Is there any need to pay for monitoring tools?

Speaker: So I suppose my only input, having been a manager that bought AppDynamics for a previous company, it's really good.  It claims to be a bit of a silver bullet, where you switch it on and you’ll see all these wonderful metrics. But they're all totally unlabelled and you don't know what the hell is going on. Unless you wire your code properly, you don’t really get the information about which methods it's calling and what the transaction boundaries are, so it's actually not much use to you unless you put extra work into it.

You need to get somebody educated to use it and they need to spend time to get their head around it. You need to spend a bit more money to wire it to all the things that you do care about on top of your licence fee.  So it's really good if you’re going to make a long term commitment to it.

I think if you spend all that money, you spend all that time and you still have the question “What do I need to monitor?”  You kind of go back to the start, I’ve got this beautiful shiny capable tool, now what do I do with it? 

I’ve been really impressed by Prometheus, you can just do stuff and it's really well supported by the community. It's got export and you can do all your tinkering with the free stuff and if you really, really, really identify a gap then go and spend $3000 for a JVM licence on AppDynamics.

Speaker: I’ve used New Relic before for phone monitoring and finding out what the actual user experience has been on that. It took a long time to set up properly, and work out what we were capturing and what we needed to capture. The value we got out of it, don't know. I mean it tells you a bunch of stuff and you go what do I do about that?  Is that a bad thing or...
  
Speaker: You need to know what you’re trying to achieve before you start monitoring it I think.  I think that seems to be what this has boiled down to.

Speaker: So the summary of the meeting is that you know what you want before you start doing it I think.

Speaker: Let's assume we do know so one option is you go out and buy AppDynamics and you can probably do most of what you want, is that fair?

Speaker: It is easy to set up and you do just put a couple of adaptations in and it does get up and working and if you want to make it richer you can tag your code a bit more. It will drill into all the related servers and it will be auto discovering, so AppDynamics will get you up and running quickly if you know what you want to monitor, why you want to monitor it, it will do it quicker but I think for most people the question isn't "how do I monitor this" it's "what should I be monitoring"?  It's not so much the doing of the monitoring it's the "why am I bothering"?

Speaker: It's an off the shelf solution to the requirement of just log everything.

Speaker: If you’re at the point you know what you want to monitor and how you want to monitor it and you have a load of people, they’ll probably go “Oh I’ll just use Prometheus because I don't need any other help.”

Speaker: It just seems if it's worth monitoring then it's worth doing it properly rather than to automatically do something but not do it quite how you need it.  

Speaker: So has anyone got any experience of anything other than one of these expensive ones or this Prometheus?

Speaker: Dynatrace. It's all the same kind of thing to be honest, that you’ve got to invest so much time getting everything set up.  It does do a lot out of the box but it's not specific to your business or anything like that.  So from my point of view, why should I spend loads of money when I’ve got to invest the same amount of time, the same amount of effort, if not more, when I could just use something else?

Speaker: Maybe that's what it boils down to.  None of those things cater to your business so all they will tell you is this server is a bit warm, this data base has fallen over but it won't tell you you’re losing money right now, that's kind of the important thing. 

Speaker: You’ve got to configure it and program it to do that for you, which you’d have to do if you were building your own anyway.
 
Speaker: I’ve had good stuff out of Google analytics as well.  No-one has kind of mentioned it but it's just kind of setting up goals and things like that and seeing what's hit and what sort of paths through things and real time on server monitoring.  I’ve seen that all quite nicely through Google analytics and that's free unless you really want to go down the line of paying mega bucks for it.  So it's kind of what you want to do with it.  

Speaker: Monitoring is for life not just for Christmas!
