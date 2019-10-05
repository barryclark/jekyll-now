---
layout: post
title: Organising Dundee University's Hackathon
header-image: /images/IMG_3139.JPG
header-alt: Gavin Henderson and I during Quackathon
---

Just over a week ago, we held the closing ceremony for Quackathon 2017. This was the end of what was months of planning and continuously jumping hurdles. The most important thing to make this happen was having a good team. There are 5 committee members for Dundee University's Computing Society and the five of us relied on each other to complete our own areas. It's also worth noting it's not easy planning a major event from scratch while juggling other responsibilities like our courses, jobs and others.

I wanted to get some thoughts down specifically about the areas of the event I lead, what I learned and what I'd do differently. One of the pitfalls of these student run events are that they are organised by different people each year, and therefore it's always from (sorta) scratch so this kind of documentation is really helpful. We received it from the previous committee and we shall leave it for the next.

## Major League Hacking

For those not familiar with MLH, they operate two student hackathon leagues — One for Europe, another for North America — and for organisers they offer some assistance in organising the events by offering one-to-ones to resolve issues, provide a number of resources, a hardware lab and an on-site expert. For the hackers, they get the use of the hardware lab, as well as access to products from Github, Amazon Web Services, Name.com amongst others.

It felt stupid to not make our event an MLH supported one, so we put in out application but I surprised to learn that they only help for events with 80 student or more. Considering I've been at an MLH hackathon in the recent past which had at most 30/40 hackers. We had conservatively estimated we could host 60 students so we decided to press ahead without them.

I don't feel like this decision had much, if any impact on our hackathon. I feel like while we had more heavy lifting to do, we had more control to shape the event to how we felt was best. However it's worth noting that we actually had over 80 places in the end, and those places sold out in 48 hours with more people being put on a waiting list.

## Sponsors

One of the two areas I focused on was trying to get local companies excited and interested in sponsoring the hackathon. Students typically don't pay for hackathons, but they are still very costly events to run, so without sponsors it's just not fesible for us to run hackathons. It's actually a win-win situation for all in my opinion; Companies get to expose themselves and their products and services to a bunch of talented students who are very interested in finding jobs and the hackers can use these hackathons to learn something new as well as potentially meeting their future employeers. I've seen hackathons being compared to job fairs but for computer science, which I think is highly accurate.

During this process I was graced with two things: 1) Anne, she manages work placements for the School of Science and Engineering at the University of Dundee and 2) The university has really great links with a number of interested and innovative local companies

I personally think it's a bit ballsy to call email companies and ask for money. I think it's very important to do your homework here. I wanted to understand what each company did and what they could offer our student and in turn, what we could offer their businesses. This certainly helped in cases where I might be talking to HR and would be explaining what a hackathon is given that these events are typically only found within computer science.

This is something I wish I had started much sooner. I believe part of the problem was that many companies weren't in a position to move fast enough so by giving much more notice and time to commit, this may have yielded more sponsors. Additionally, I went through what felt like 2 weeks for constant emails and conference calls which I found extremely draining. By having longer to prepare these things I would have avoided this.

Being flexible with the packages we offered was helpful. We were able to swap in-and-out bit that a company may want more than others. I found that companies were very excited and eager to set a hacking challenge. I would probably offer that at all package levels in the future.

## Hacking Challenge

Like I've just mentioned, many sponsors insisted on having the ability to offer a hacking challenge which was absolutely great. On the day we had 13 teams and 4 hacking challenges which offered a great diversity of possible opportunities. We don't get to control which challenge each team tackles, as it should be in my opinion, but it would have been nice to see the a roughly equal split amongst the challenges.

We had 10 teams participating in one challenge, 2 in another challenge, 1 team competing in a challenge and zero teams competing in the final challenge. Somewhat fortunately, the final challenge with zero teams was sponsors by our own Computing Department so there wasn't much loss. There are certainly two things I would do differently in regards to this.

I would make sure I knew specifically what each sponsor purposed as a challenge, this was something I did attempt but got fogged by other things in the process. I'd want to do this mostly to ensure that the difficulty level was mostly consistent across challenges and give hackers access to the widest range of challenges. I did what I could to guide those who weren't quite sure what to offer as a hacking challenge. I feel like I failed to properly nail down an answer for the sponsors in order to help them create a challenge. Secondly, there was a particular challenge which required the use of microphones. It would have been useful to be able to provision a bunch of microphones in preparation for this. Some sponsors were very happy to provide their own hardware which was fantastic.

## Ticketing

Once we had secured the venue and got clearance from the school, health and safety & security (which had its own set of struggles) we were able to set a capacity limit and release tickets. I threw together a quick application in Laravel — the source for which is available here — the purpose was to quicker and easily get all the information we needed.

I have seen a few hackathons use something like Eventbrite, which I personally didn't feel was flexible enough for our needs in this instance so quickly making an application was a better idea. If I had given myself some more time, I'd have extended the website to integrate some form of CRM like Mailchimp, or even just an email provider like SendGrid etc, only to make the distribution of emails a much less manual process.

I found myself manually taking a database dump, firing it into a spreadsheet and using that to email out to attendees which was quite tedious at times. I was traveling in the run up to the hackathon, and editing that spreadsheet to update it with those who weren't able to attend and replace them with those on our waiting list was made painfully but a flakey internet connections as I went through tunnels.

## On The Day

On the day, everything ran very (thankfully) smoothly. A huge relief after all the planning. The only issue was in the morning, the bakery providing part of our breakfast meal had forgotten about the order but not much would be done.

## Wrap-up

Hackathons are of huge value to students. I've found them to be a great experience and a fantastic way to to learn something new and greatly improve team-working and communications skills. I never expected to be on the other side organising one but I need to stress that this was far from a one man show. It certainly would never have been possible with the whole committee as well as the School of Computing.

It's been great to have local companies work so closely with us. We are looking to keep that relationship and are hoping to run some events in the new year.
