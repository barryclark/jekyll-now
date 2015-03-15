---
layout: post
name: Coding-Bootcamp-Week-3
title: Coding Bootcamp - Week 3
date: 2014-3-9 18:31:00 +00:00
author: Toby Retallick
---

### Things are getting very interesting...

This week at [Makers Academy](www.makersacademy.com) we kicked off with a rare opportunity to learn Git direct from the crew at Github before focusing on a single project - creating a programme that manages the maintenance of [Boris Bikes](http://www.tfl.gov.uk/roadusers/cycling/14808.aspx). This was our first dive into the world of *objects* and [object orientated design](http://en.wikipedia.org/wiki/Object-oriented_design). For me personally, this also marked a new milestone in my journey at Makers. I was about to leave behind the murky yet mystical world of coding I had thus far constructed in my head and venture into new and unexplored territory. Things are getting interesting. And probably, more difficult!

Thankfully, we were given some virtual swimming armbands in the form of a CRC ([Class Responsibility Collaboration](kipedia.org/wiki/Class-responsibility-collaboration_card)) workshop led by Makers Academy marketing chief and former Makers student, Jordan. 

### Role play 
After concisely framing the software problem, each group of students had to identify the main objects in the system and under each:1. The relationships each object had with other objects in the system.2. Each object's individual responsibilities. So, for example, in relation to the Boris Bikes problem, we identified a Docking Station as one of the main objects. This would interact with a Bike. The Docking Station would release and accept bikes into storage...Simples.

The system was then acted out in a furious burst of amateur role playing, whereby we each student pretended to be an object in the system and carefully stepped through the process and various interactions to make sure it all made sense logically.

Looking back I think the CRC exercise was a useful way to think holistically about the software problem we were attempting to solve. We were obviously working on a basic problem, but I for more complex problems, it's easy to see how mapping out everything in your head would have its limits.

### In London, 'doubles' are a Developer's best friend.
Teachers Evgeny and Enrique walked us through two schools of thought on undertaking OOD alongside test-driven development. These are named simply, *London* and *Chicago* styles respectively. The former approaches OOD from the standpoint of constructing all your classes as you need them in order to make the tests pass. The latter takes a leaf from the scientific method and isolates the creation of a particular class from the rest of the system, save for any interactions which are instead *simulated* for the purposes of testing (these simulated aspects are known as *'doubles'*). The differences at first seemed quite trivial to me but eventually it became clear that the London style enjoys some advantages from testing in a vacuum, the main one being that it's approach ensures that tests are not unduly contaminated by other parts of the system. 

### Did my brain just fart?
There was bound to be a first time, and I think it happened last Friday during the end-of-week test.We were asked to make a simple programme that [manages the flow of planes at an airport](https://github.com/tretallick/airport). I got off to a great start, then, coming to the end of test, I hit a brick wall. I had done something wrong and I couldn't for the life of me figure out what had gone wrong and why. My tests wouldn't pass. The minutes ticked by and I got increasingly frustrated. I should know this. Why is this such a mission? I eventually decided to call it a day, cursing Crom and resolving to tackle the coding challenge again first thing early on Saturday. 

> "Crom laughs at your four winds. He laughs from his mountain." Conan the Barbarian

That next morning, loaded on coffee, I jumped on the laptop, jumped back a number of commits, branched and started again.I wrote the code and all the tests passed. Key learning for me this week… It's amazing what you can do coding-wise when you have a clear head! Sometimes the best thing to do is *nothing at all.*
