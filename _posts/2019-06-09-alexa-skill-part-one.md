---
layout: post
title: Booking a Meeting Room with Alexa – Part One
author: ben_foster
---

Hey there! This is part one into my adventures of developing an Alexa skill. I was inspired recently on client site, where I saw they’d installed a shiny new room booking system. Each meeting room had a touch screen setup outside of it, and from it you could see who’d booked the room, and also use it to book the room out if it was available.

It had the right idea, but from talking to people I learnt that it wasn’t the most user-friendly, and that it had cost a pretty penny too! I’d been looking for an excuse to dabble with Alexa and Voice UIs, so I decided to see if I could build something similar with commodity hardware.

> “Alexa, book this meeting room out for 48 minutes”

Because I like nothing more than diving in at the deep end, I chose a completely unfamiliar tech stack to me. My comfort zone as of late is Java and ECS, so I used AWS Lambda to host the Skill and Javascript as the development language. I used the [Serverless framework](https://serverless.com/) to manage deployments. The development of a Lambda Skill is split up into two parts – creating and hosting the voice interface, and then the application code that handles your requests.

In this blog post I’ll be focusing on developing the Invocation Model using the Alexa Development Console. To get started, you can [go here](https://developer.amazon.com/alexa) and sign in using your Amazon.com account. If you need to create an account you can do that here too.

With Alexa, what you write are Skills – code functions that carry out the action you want to happen. They’re triggered by Invocations – user requests in the form of phrases that Alexa uses to figure out what you’re trying to do. In my case, an Invocation was “Alexa, book out this meeting room for 48 minutes”.

Once you get set up with an account, you’ll end up at a page listing your current skills. Towards the right hand side there’s a button called “Create Skill”, go ahead and click that to be taken to the following page to create your skill:

![Create Alexa Skill UI]({{"/images/20190609-Skill-Creation-Page.png"}})

Amazon gives you a number of template models to choose from, to speed up development and give examples of what you can do with Alexa. You can also “Provision your own” backend resources, directing your Skill either to a http endpoint or an AWS Lambda. Alternatively, you can choose “Alexa-Hosted”, which uses AWS Lambda but integrates the code development into the Alexa Console, so you can do code development alongside in the same UI.

An Alexa Skill can have one or more Intents – actions or requests that your Skills can handle. An Intent can be something like “what’s the weather today”, or “what’s on my agenda today”, or “book me a meeting room” (see where I’m going with this? Intents can be invoked by one or more Utterances, the phrase you’ll use to request your Intent. You can link one or more Utterances to an Intent, which can be useful to capture all the variations that someone might use to request your Intent.

As part of designing the UX, I found it useful to test how I’d interact with my Skill on an Echo Device, but with the microphone turned off. It was interesting to see how many variations I could come up with to request booking a room, and I noted all of these variations and configured them as Utterances, as you can see below:

![Alexa Interaction Model UI]({{"/images/20190609-Alexa-Intention-Model.png"}})

Within these Utterances, you can have Slots too – parameter placeholders that allow you to specify variables to the request, making the requests more dynamic. In my case, this was allowing the user to specify the duration of the booking, and optionally providing a start time, but it equally could have been movie actors, days of the week, a telephone number etc. Amazon has various Slot Types, such as animals, dates, countries and so on, which allows Alexa to try to match the user request with a value in that Slot Type. These Slots can be optional as well, so your requests can include one or more parameters. You can do this by configuring multiple Utterances, that use one or more of your Slots.

If you don’t want to use of the preconfigured Slot Types you can create your own list of values to match the parameter against, or use the AMAZON.SearchQuery Spot Type, although I’ve had varying success with its speech recognition.

Not related to my Meeting Room Booker Skill, but something worth mentioning. It doesn’t always quite catch what I say (or interprets it differently to how I intended), making it difficult to do exact matches or lookups. For example I tried building a “Skills Matrix” Skill, where I could name a technology and Alexa would tell me who knows about it. I didn’t realise you could have so many variations on interpreting the words “Node JS”! The only way I could think of getting around it at the time was to have a custom “Technology” Slot Type, and for the more difficult technologies to pronounce, list all the expected variations in there. You can also employ a “Dialog Delegation Strategy”, which allows you to defer all dialog management to your lambda, which allows far more possibilities to interact with your user (e.g. you could use fuzzy logic or ML to figure out what the client meant), but it’s a bit more advanced to get set up.

It’s worth noting at this point, you can have a different Interaction Model per Locale, which makes sense as it allows you to account for things such as language and dialect differences. The key thing to ensure is that when you’re developing and testing your Skill (which I’ll cover in following posts) that you’re always using the same Locale, otherwise you just get a rather unhelpful “I don’t know what you mean”-esque response, or an even less unhelpful but more confusing “Uber can help with that”, which completely threw me off for much longer than I’d like to admit!

Eventually, I had an Interaction Model for the Skill created through the UI. Once you’re past the point of trying it out and want to productionise it, you’ll probably be thinking how to create and modify these Skills programmatically. Thankfully, there’s an Alexa Skills Kit (ASK) SDK, that allows you to do just that.

Here’s a link for installation instructions for the CLI – [https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html](https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html)

And here’s a quick start to creating a new Skill using the CLI – [https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html](https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html)

You can use the ASK CLI to create, update and delete skills. It’s fairly simple to use, so long as all your json config is correct – the errors it returns don’t give you much insight if you’ve missed a required parameter, or specified an invalid value for example.

As I’d already had a Skill created at this point using the UI, I used the CLI here to pull the metadata generated from the UI, to store in Git. The commands I used in particular were:

`ask api list-skills` to get the skillId for the newly created Skill  
`ask api get-skill -s {skillId}` to get the Skill metadata as a json payload  
`ask api get-model -s {skillId} -l {locale}` to get the Interaction Model metadata as a json payload

At this point, everything that I did in the UI was now available to me as code, and I was able to check it all in to Git. I found it very useful to do that just as with any code, because once you start tweaking and trying out various things it can be difficult to revert back to a good working state without it should things go wrong. You can use the following commands to update your Skill:

`ask api update-skill -s {skillId} -f {skill-file-location}` to update the Skill metadata  
`ask api update-model -s {skillId} -l {locale} -f {model-file-location}` to update the Interaction Model

You can also use the ASK CLI to create a Skill from scratch, without ever needing to use the UI. You can use `ask new` to configure and provision a Skill, and it also creates you a folder structure with the json files I generated from my existing Skill already set up, ready for you to get started.

So that was a rather quick “how to get up and going” creating an Alexa Skill. The next step is linking the Skill to some backend code to handle the requests. I’ll be following this blog up with a how to on that, but in the meantime if you have any questions feel free to give me a shout!

(Originally published at [www.foyst.co.uk](http://www.foyst.co.uk/2019/06/booking-a-meeting-room-with-alexa-part-one/))