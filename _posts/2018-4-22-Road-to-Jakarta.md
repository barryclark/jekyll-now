---
layout: post
title: The road to Jakarta EE
excerpt: It's probably a good time to reflect on how we got here...
---

Today, the Eclipse Foundation is making multiple [announcements](https://jakarta.ee/news/2018/04/24/eclipse-foundation-unveils-new-cloud-native-java-future-with-jakarta-ee/) related to Jakarta EE that includes the unveiling of [https://jakarta.ee](https://jakarta.ee/) and the Jakarta EE logo, the [results of the developers survey](https://jakarta.ee/news/2018/04/24/jakarta-ee-community-survey/), etc. It's probably a good time to reflect on how we got here...

<p align="center">
<img alt="Jakarta EE logo" src="http://delabassee.com/images/blog/jakarta_ee_logo.png" width="50%">
</p>

End 2016, early 2017, I was jokingly using the following slide when I was discussing Java EE. 

<p align="center">
<img alt="Java EE is not dead" src="http://delabassee.com/images/blog/slide_pic.jpg" width="80%">
</p>

I am relatively confident that at that time no one would have predicted what would happen. You have to remember that during that period, things were not so simple for Java EE as questions were raised about the future of the platform. At that time, Oracle along with the different JCP experts were focused on finalizing Java EE 8 and its various APIs. 

Relatively soon in the process we also started to think about the future of the platform, i.e. ‘Java EE Next’ as we informally called the post-Java EE 8 era. The Java EE 9 plans that were shared at JavaOne 2016 weren’t particularly well received so we went back to the drawing board. It was clear that we had to do something radically different to get the Java EE ecosystem excited and engaged again. 

To lift all the concerns that were raised on Java EE through the years, we thought that the platform should, from that point on, evolve in a more open fashion and at a more rapid pace. It was clear that the platform had to adopt an open source model including a well-established governance. Early in those reflections, Oracle along with some key players from the ecosystem, namely Red Hat and IBM, decided that the Eclipse Foundation would be the obvious venue to host this radical evolution. One of the many reasons is that the Eclipse is already hosting the MicroProfile.IO project, which is itself augmenting the Java EE platform with capabilities geared towards Microservices Architecture. Shortly after that, additional Java EE players such as Tomitribe, Payara and Fujitsu joined the initiative. And that’s in a nutshell how EE4J Jakarta EE came to life.

Transitioning the development of the platform to the Eclipse Foundation is a huge undertaking. It involves many technical and non-technical aspects including complex legal issues that I won’t cover here given IANAL! In addition, we are not talking about a small project; we are talking about a large collection of established projects that includes GlassFish, Jersey, Grizzly, Mojarra, Open MQ to name just a few. And that’s not all, there are also all the activities related to the opening of the various TCKs. It is simply a huge effort and probably the largest project that the Eclipse Foundation has ever embarked on (see here for some background). This is one of the reasons why it was decided early on that Jakarta EE would use Java EE 8 as its baseline and that older versions of the platform would not be part of Jakarta EE; that approach was simply reasonable and pragmatic. All these efforts are happening as we speak. While we would prefer the work to be behind us so that we can effectively focus on evolving the Jakarta EE platform, we still have to wait for everything to be in place. On that note, I have recently received the following mail from a well-known community member. 

<p align="center">
<img alt="email" src="http://delabassee.com/images/blog/mail_pic.jpg" width="80%">
</p>

We were discussing a matter unrelated to Jakarta EE and while I sincerely appreciate the gratitude from that person, I really need to stress something about the whole Jakarta EE effort. Some of us are clearly more visible in the community (ex. [Dmitry Kornilov](https://twitter.com/m0mus?lang=en) who represents Oracle in the PMC and me as an evangelist) but Jakarta EE is really a team effort on the Oracle side. There are many people who are working behind the (Oracle) scene to transition Java EE to the Eclipse Foundation. It is impossible to mention all my colleagues that are, closely or remotely, involved in this effort. The list is simply too long and I don't want to take the risk of omitting someone. I, however, want to publicly acknowledge the work of Ed Bratt, Will Lyons, and Bill Shanon who deserve a particular mention as they have been working tirelessly since the early days of this effort to make sure Jakarta EE happens! So thanks to you all!

You should also realize that usually when a project is open-sourced, all the related activities, including all the legal aspects, are happening upstream and it is only when everything is discussed, agreed and done that the project is made public. But early on, we have decided to be as transparent as possible, which is why we have announced our initial intent last summer. At that time, lots of things were not decided yet and that lead us to where we are today, i.e. in the early days of Jakarta EE including the creation of a new but already actively engaged open-source community. A lot of work still needs to happen to properly tackle the ultimate goal of Jakarta EE, i.e. evolve the platform towards an open-source and Java-based, Cloud Native foundation that will be relevant for the next decade. The Jakarta EE community is actively working towards that goal and today's [announcement](https://jakarta.ee/news/2018/04/24/eclipse-foundation-unveils-new-cloud-native-java-future-with-jakarta-ee/) represent an important initial milestone!

*Originaly posted on [The Aquarium](https://blogs.oracle.com/theaquarium/the-road-to-jakarta-ee) blog.*
