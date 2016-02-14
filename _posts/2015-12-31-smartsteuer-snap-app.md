---
layout: post
title: Creating the Smartsteuer 'Snap' App
subtitle: A behind the scenes view of the birth of our youngest creation.
category: product
tags: [smartsteuer, mobile, custdev]
author: eike_hirsch
author_email: eike.hirsch@smartsteuer.de
header-img: "images/bg-post.jpg"
---

As we at [smartsteuer](https://www.smartsteuer.de) really enjoyed how our [Smartsteuer Smartphone App](https://www.smartsteuer.de/online/steuererklaerung-online/#smartphone) was imagined and eventually created, I thought it might be fun to write about it. This blog post is not that much technical but describes our journey to a product which (hopefully) will create value for our customers. 

### Background

At smartsteuer we create tools for people who want to do their tax filings online. For that, we continuously seek for smart solutions to make this task as easy as possible. One example is an app that we created to answer one question which always nags our customers: 
  
> Why should I care? Can I even expect a refund?
  
To answer this seriously you have to do a whole lot of calculations for which you need quite some information from the user. Which in turn would create a process which is _not_ fast and easy. So, some years ago we created this app which would do two things:

1. Only asks for about five things every user knows of the top of their heads.
2. Make some educated guesses to answer all the other questions with rough estimates.

The result couldn't be exact but it was good enough to answer said question. It worked quite well even though you still had to provide those five figures.

### Theory

Now, with the help and cooperation of our fellow colleagues from "Haufe Lohn & Gehalt" we wanted to take the app to the next level. It was our aim to reduce the number of questions the user needs to answer and at the same time increase the accuracy of the calculation. I will spare you the details but the result of our efforts was a QR-Code which every user of "Haufe Lohn & Gehalt" would get and which would contain all wage and tax information an employee needs to file her taxes.

So the plan was to enhance the app with a qr-code scanner to safe the user some typing.
 
We created a quick briefing for our mobile dev agency - they returned an offer - we signed it - the deal was sealed.
  
You might wonder why I am writing the blog post in the first place, as this sounds all to familiar and is in any regards special. Well you are right. Up until here this story is _only_ an example of solid work.  But please bare with me and read on.

### Reality kicks in

About an hour before the agency would come by to kick the project off I was holding an internal meeting to get everybody on the same page. During this meeting it came to light that the project somehow managed to stay under the radar and that everyone in the room did not know about it. This is quite uncommon in our company as everybody is eager to know what is going on and to contribute her ideas and we encourage everyone to do so. But in this particular case this somehow did not happen until said meeting.

And so it was this meeting when all the experts where questioning the new feature and its purpose:
  
> Why are we doing this?  
> What is the benefit for the user?  
> Is the benefit big enough to justify the work?  
> What data is included in the qr-code?  
> Is this really the best we can do for our customers?  
> …  

It turned out that, while we would get a lot more data to replace some of our guesses with real values, the user would still need to answer four out of the former five questions and instead would need to turn on the scanner and snap the code.  That was not the benefit we hoped to deliver.

### Adaption

Luckily we did not stop there. When you happen to have a bunch of smart people in the room, new ideas come up and so a totally new app slowly came into shape.

**What can we do with that qr-code?** It contained lots of data which the user would need to manually enter into her tax filing - a tedious and error-prone process.

**But our main product - the tax filing software - runs in the browser on desktop-PCs.** You don't normally scan qr-codes with an desktop-PC.

**What if we could transform the qr-code-scanner into an input device for our software?** We would need to find a way to link the app with the software without needing the user to do some fancy stuff or even worse needing to understand the whole process. And at the same time keeping her data safe and protected.
 
**Can't we create a second qr-code which contains the data needed for the linking?** 

**And why not use OCR to read any other document**
 
By the time the agency arrived we had totally rewritten the plan. And they had no idea…

### Outcome

Well, we had to start the meeting with a lot of apologies. The app we original signed up for was from the table but we still wanted *an* app. Luckily our agency was flexible enough to adapt to the new plan and within only one week we had a working prototype. From that day on everything worked according to the plan and now our Smartsteuer App is available at the [IOS App Store](https://itunes.apple.com/de/app/smartsteuer/id1068423226?mt=8) and will be very soon be in the Android Play store as well (We will post the link as soon as its up). Check it out if you like and let me now what you think. 

Finally I'd like to give a big shout out to our colleagues at [Haufe-Lexware](http://haufe-lexware.com) and to our agency [Wissenswerft](http://wissenswerft.net) for the great teamwork and flexibility! 



 

