---
layout: post
title: Neuroscience for Creating Online Courses - Part 1
---

This is part 1 of a multi-part series on thinking through parts of neuroscience research that can be adopted when creating online video courses. I use the example of creating an online course on Software Testing for this series. I rely heavily on *Make It Stick* by Peter Brown and others for my research.

This particular post focuses on setting up the context in which the research and thinking is being carried out. I share my journey with teaching software testing so far and also explain why I am trying to create the online course.

![Online Learning]({{ site.baseurl }}/images/online-learning.jpg)

## The LYFT Training Programme
The story begins with the LYFT (Light Your Future in Tech, no connection with the ride sharing service) training programme my friend [Mo Bhojani](https://www.linkedin.com/in/monarch-bhojani-csm-istqb-9271aa31/) and I designed. We had noticed that many in our local community had migrated to the UK and were stuck in laborious jobs even when they had received good education in their home countries. The aim of the LYFT programme was to train such migrants in computing skills so that they can improve the quality of their lives and also contribute more significantly to the UK economy.

Obviously, there are many other skills that could have been taught to achieve the goal of improving the quality of life. However, we both were from computing backgrounds - Mo had about 10 years of software testing experience and I had played different kinds of software developer and team lead roles for about 11 years. Thus, picking a computing skill was the more sensible choice. When chosing the specific subject, we considered web development, DevOps, and automated testng, but settled on manual web and mobile application testing. It was the easiest subject to teach and had a demand in the UK market increasing the likelihood of participants getting a job after the course.

We designed the programme as a 6 month long part time training, split into two equal parts. The first part involved classroom teaching and practice and the second part was a 3 month long part time internship at a web/mobile app development company. The content of the training was reverse engineered by answering the question: If we were to interview an entry level software tester what would we expect them to know. This resulted in teaching the participants the following topics:

- Development methodologies: TDD, BDD
- Development/Test processes: SCRUM, Kanban, Waterfall
- Test Case format: Gherkin, Standard
- Test management software: JIRA
- Mobile platforms: Android, iOS
- API testing tool: Postman
- Proxy/Debugging tools: Charles, Web inspector
- Device debugging tools: ADB, iOS Console

## Batch 1 - The Highs and Lows
Training for the first batch of participants is currently underway with classroom based teaching and practice close to completion. We have about 15 participants who will go on to intern at a variety of startups and technology firms. We believe most of these participants have acquired enough skills to be entry level manual tests. Some are good enough to grow very quickly into mid level testers as soon as they acquire some experience. While the end result (of how many actually get jobs) is still far away, the journey so far has been immensely satisfying.

The enthusiasm showed by the participants fueled our desire to do as good a job as we could. We pushed ourselves quite a bit, constantly reviewing and revising the course plan, re-teaching topics in a different way if we failed to teach well the first time, and coming up with innovative ways of providing practical experience. This improved the course quality significantly, but it also demanded a lot of time and effort at our end. With 5.5 hours of class time spread over three lectures and the time required to review curriculum, plan lectures, prepare slides, design and prepare tests, evaluate tests, etc. we have spent 12+ hours/week each on the program. As a result we have had to cut down on any other social activity or projects that we were involved in.

## The Sustainability Question
This is clearly unsustainable if we want to conduct more batches of the programme. Even mid-way through the first batch we have felt some burnout effects, needing some downtime. So how do we ensure that the programme can continue? 

We could train teachers from among the participants and they could conduct further batches. The participants from these batches in turn could also be trained and then they could teach the next batched, thus triggering a chain reaction of sorts. However, it isn't clear how effective such a training would be. We could rely on our experience to answer a variety of questions from participants. We could also rely on our experience to explain complicated concepts from different perspectives depending on what made sense for the participants. Finally, we could rely on our depth of knowledge to distill the most important learnings and highlight them during the classes. This things would be very hard to achieve for the teachers in the later batches.

Another approach could be to record videos of the lectures that we conduct and structure the course such that participants watch the video before coming to the class and discuss the video. With such a structure it would then be possible to reduce the number of classes to two per week each lasting 1 hour. Further, we will require little prep work before the classes, even though the test design and evaluation will still take time. Such a structure could bring down time required to 3 hours/week each. Further, if we get the videos *right* the experience required for facilitating discussions may reduce. We can then train participants of batch 1 to facilitate classes for later batches and thus design a more sustainable program.

To enable a highly scalable learning mechanism the videos can form a self learning online course. This of course will not be as effective as a course that includes discussions, but is significantly more scalable.

## The Right Videos
Having taught the first batch we have largely figured out what needs to be taught in the software testing programme. We also have lecture-by-lecture slides that captures in significant detail the content that needs to be taught in each lecture. This raw material is a fantastic starting point for preparing the videos. However, with video based lectures, a teacher does not have the luxury of looking at the students to quickly guage whether they are following the content being taught. This means that the content of the video needs to be structured so that students are able to follow well and *learn* effectively.

For this purpose of *learning effectively*, I have turned towards understanding the neuroscience of learning and identifying aspects of it that will be useful when structuring our video based course.

---

In the next post I will talk about what I mean by *learning* and look at the first empricical technique of learning - **Testing**.