---
layout: post
title: Improving My Odds of Getting a Glastonbury Ticket with Puppeteer
---

Glastonbury is a notoriously difficult festival to get a ticket to. Last year myself and some friends managed to get some. It was good craic. Such craic that we wanted to go again. I decided to splash a bit of technical knowledge into my attempt this year to see if I could turn the odds in my favour. How could I maximise my chances of getting a ticket?

### The Problem
135,000 tickets were up for sale this year and there were 2.4m people going after them. The typical attempt to get one goes something like this:
1. At 9am the ticket site opens and a user begins refreshing the page
2. The page likely times out again and again for the user as they refresh furiously (frustration begins)
3. Eventually it loads and they see a link to Glastonbury tickets for this year
4. It leads to another page (that may timeout for some time) which tells them they are in a queue
5. The user can choose to refresh the page manually or else the page will auto refresh itself every 20 seconds
- This is the page which proves most difficult to get through. **For majority of users, their journey ends here**
6. The page to enter up to six registration numbers appears
7. Enter card details, click submit and you're off to Glastonbury

So the rate limit per IP that SeeTickets (the ticket provider for Glastonbury) has set is 60 hits per minute. It's hard to know what the exact load is on their servers, but let's say all 2.4m people are using one device each to refresh the page every second. Thats 144 million requests per second. Obviously not everyone will be refreshing at that rate, but it's common for people to use multiple devices on different internet connections, have friends who aren't going to try get them tickets, along with bots that are hammering the site. It's not unrealistic to think it would be close to that number. And every year the whole of Twitter goes into uproar calling the SeeTickets website shit, but you've got to give them some respect as that is an incredible amount of traffic to handle. To put it in a bit of perspective Google search gets 40k requests per second. 

### A Bit of Research
A quick google on how to improve your chances will give you countless articles detailing advice, article to article the advice often seems to conflict. Most of the advice I read online was fairly anecdotal and there was no way to tell until the ticket site opened if they would have any effect.
* __The limit__: a pretty popular method for people is to install an auto refresher on their browser that will refresh the page once a second.
* __Multiple internet connections and devices__: they will often have multiple devices refreshing the page, with each device connected to the internet differently (mobile data, broadband, VPNs).
* __The session__: many people say that having different browsers open will increase your chances. I'm guessing this is because each browser is running a unique session.
* __Location matters__: the majority of people going after tickets are from the UK. When they load up the page they probably get routed to a set of servers in London where the competition to get a spot on the server will be toughest. I read many anecdotal stories online where people swear having people from different continents like America and Asia will get you through the page instantly.

### My solution
I built a Node app that used Puppeteer to open a load of browsers (each with one tab) and refresh each one periodically so it loaded the ticket page at a set rate. Puppteer is a node library that allows you to control a chrome browser (a lot like Selenium for Python). For example, the app might open 15 browsers with one page each and then iterate through each browser at a set rate loading each page. 

I only had about two days til the coach tickets were released and three days after that until the general tickets, so this was a bit rushed. 

![_config.yml]({{ site.baseurl }}/images/glasto2.gif)
*Puppeteer app and test app running side by side. Unfortunately I didn't record the actual run on the ticket site.*

**Key parts of the app:**
* I used multiple browsers with a tab each instead of one browser with multiple tabs for two key reasons. One because if one browser crashes it won't take down the whole app ([considered a best practice when working with Puppeteer](https://docs.browserless.io/blog/2018/06/04/puppeteer-best-practices.html#4-parallelize-with-browsers-not-page)). And two because a common piece of advice was to run different types of browsers simultaneously. I'm assuming this is because each browser has it's own unique session.
* When a page loads it gets the text from it and compares it to a set text we are trying to match, if it looks to be a good match then the browser window with the matching page was brought to the front. This logic is a bit crude and relies on the text of the ticket page not changing an awful lot, but I think it's simple and quite reliable.
* [puppeteer-extra-plugin-stealth](https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-stealth) - I didn't want the app to be detectable as using automated testing software like Puppeteer so I used this extension which does its best to mask the browser, not perfect at it but pretty good from what I've read. 
* I used a mock Glasto site to test it. Cheers to link the [thomasms](https://github.com/thomasms/testsites/) who created this).

### Results
**On the coach tickets sale:**
- I ran the app on a laptop, with a standard internet connection. It ran with 15 browsers and at a rate of 59 refreshes per minute. Unfortunately the app crashed a lot at the start as pages were still loading by the time it came to refreshing them again and this wasn't handled. After five minutes it started working as expected. I had the occasional crash. Then boom. I got to the ticket page at about 20 minutes in but unfortunately there were no bus tickets left / I wasn't quick enough to pick the right ones.
- Something to note. At this point instead of using multiple browsers I was using multiple tabs in one browser and I had not set the app to pause automatically when it found the registration page. When it loaded the registration page, the next tab then refreshed and also found the registration page, and then this happened again in the next few tabs. It seems likely this was due to them sharing the same session. Definitely something to take into consideration in a future iteration. 

**On the general tickets sale:**
- I ran the app on two laptops, one tethered to my phone connection and one on my normal internet. I got through to the registration page on one laptop 15 minutes in and the other laptop shortly after. Entered the registration details, entered my card details, clicked submit and boom. Nope, the page froze when I submitted my card details. I couldn't enter the registration numbers on the other laptop due to 10 minute lock in place on submitted registration numbers. I cursed the app and blamed it. But then after a quick scroll through Twitter it seemed clear that this was an issue that had effected many people. Shit one for me but life goes on. 

## How could this be improved for next year?
* The main thing holding the app back from increasing its chances of getting tickets is the limit of 60 requests per minute per IP address. Simply adding another device and IP and you've doubled your chances. So the current lack of scalability is limiting. I won't be scaling this up as I don't think it's very ethical but if I were to do it I would do something like this: 
dockerize the app and stick it on ECS instances. Put a good VPN in front of each instance so that requests are not coming from an IP within AWS's IP range. And if you're using VPN's you might as well spread them around the globe so you have more chance of hitting their US/Asia servers (if they exist). 
* Automate entering your registration and card details. I think this is quite a bit more risky, you'd likely be matching with CSS selectors to find the input fields and buttons to click, things such as class names and ID's could easily be different year to year and break this.


View the full code [here](https://github.com/JackOHara/glasto-helper).

[Here's](https://github.com/thomasms/glastoselenium) a very similar project I found with some great resources.