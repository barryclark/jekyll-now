---
layout: post
title: Code reviews suck
---

!["rain" by William Gantz]({{ site.baseurl }}/images/85391227_7cfb5ab29e_o.jpg)

If you work in software development, you're probably doing code reviews. If not, you may be either in a loosey goosey sort of place that hasn't caught up to general good practices, or you're part of a shop full of full stack ninja rockstars who write flawless code in less time than it takes most of us to copy and paste from Stack Overflow.

For the majority of us, code reviews are a standard thing. Why do we do them? Typically:

* Make sure that the code follows standards for formatting, unit test coverage, style, etc.
* Confirm that the code does what it says what it does.
* Ensure that the code also doesn't do anything unintended and unexpected, such as bringing down your servers or introducing huge performance problems.
* Legal requirements: checking off the boxes that someone other than the person that wrote the code signs off on it doing what the developer said.

I've participated in a fair number of code reviews, and for anything other than the most trivial of changes I try to avoid the "rubber stamp" form of CR. For almost any change of significant size for a sufficiently mature codebase there's going to be some area of discussion. Some better way to do it that the reviewee wasn't aware of, a better name to make the code more readable, something. Reviewing the code also allows you to think about the bigger questions of "should we be doing this at all?" and "is there a way to do this with less code?"

All of that is to say that the five second "LGTM!" (looks good to me) stamp is something I try to avoid, as well as not something I want when I get reviewed. I want some back and forth, some investment on the part of the reviewer to understand the change and use their different perspective to provide alternatives to my implementation that I may have never considered. 

Unfortunately, that takes time. It takes a substantial time investment to read through the code and understand how the changes relate to the requirements. There's also the context switch from your own work, with its own overhead. 

Beyond the time investment, the code review comes at the second worst time during the development process (second only to post-release-to-production). By then, the developer submitting their code for CR is emotionally invested in it. They've paid a price in blood, sweat, and tears to push through to get their shiny feature working, and now some other team member's job is to rain on their parade and point out all the things that are wrong. 

And this isn't easy on the reviewer's part either. Programming design involves a few important decisions and many small ones. The important ones are hard to change once they've been made and the new code is scratching at the door, just ready to burst out into the production environment, with the code reviewer futilely trying to hold the leash. Additionally, do you really want to waste time quibbling over a bunch of small stuff, likely rehashing discussions the developer already had, either internally or with others? It gets extremely tedious and often small stuff starts to get through the cracks during a review as fatigue sets in.

All of that leads me to my conclusion that code reviews, properly done, suck. The review takes place when it's too late to make any appreciable difference without adding a ton of time to the project.

The better alternative is [pair programming](http://www.extremeprogramming.org/rules/pair.html) (2 people), or [mob programming](http://mobprogramming.org/) (3+). Some form of collaborative programming where you sit side-by-side throughout the whole process and write code together. This allows you to have multiple eyes and brains working together at the moment the code hits the screen, bringing up points of contention much sooner than the typical end of development CR. This does require a different style of programming than many software engineers are used to, and initially there may be some friction with the "stop, start" slowness that you'll experience when you first begin, but eventually if you're working with team members genuinely interested in working smarter then you'll resolve those differences and get on the same page. Future projects will go quicker as you don't have to repeat the same debates over and over.

Code reviews provide value, but they do it an a very inefficient and inopportune time. Pairing or mobbing allows you to more evenly distribute the discussion and reap the benefits throughout the development process. Afterwards there should hardly be any need for a review besides a final sanity check.

(image credit: [William Gantz](https://www.flickr.com/photos/bilg/85391227/in/photolist-8xDQx-fm7MvY-fm7Qr5-9XKrUy-a9WgeR-e9JNWx-4EPs5J-pN8Gk7-o36BYs-fKFfuo-6vZHze-e9QuvL-6X2uTn-5byZUe-9puWNv-u8uSD-6X6vEL-dbZ1Z-5kJ37P-e4tEbE-oyqhFZ-bq5aDT-ogmiNt-ocXLzr-aC257f-noF2an-e9JMnD-4e4t2s-5uFuc1-hDJj8c-PZr25-8BKxHq-ifFdh-fKFfw7-cT54aj-br6pbW-fbs46f-X3eKv-e36nXn-e9JM7e-mykDrN-prxAXP-oca4oh-4ySaF1-9i8ev3-23QnR-f5YQxh-hbaKVU-oP7Sx5-rkrpHc))