---
layout: post
title: A Summer at Craneware
---
![Craneware's Edinburgh Office](/images/IMG_20180614_165850.jpg "Craneware's Edinburgh Office")

Tucked away north of Edinburgh's New Town and across the Water of Leith is Tanfield, home to the leader of US Healthcare revenue capture software — Craneware.

I spent the summer here as part of a twelve week long internship working with software engineers, managers, architects, UX designers amongst others to develop a small product to be used inside their [Trisus platform](https://public.craneware.com/software/charge-capture/). I was working with charge capture anayltics, which is software designed to identify potential issues in claims made by a healthcare facility to a provider prior to submission.

The idea being that if a facility can correct an issue before a provider proccesses it, the more likely those claims are successfully processed meaning the facility can reclaim more revenue for themselves.

## The Heart of Craneware
That's what is at the very core of Craneware as a business, to enable healthcare facilities across the United States improve their revenue.

When I learned about my offer to join Craneware for the summer, I was concerned about becoming a cog in the otherwise evil US Healthcare system. That fear was very quickly put to rest upon arriving where we (we being myself and 4 other interns) spent a week trailing what will become the companies formal onboarding process.

We had the opportunity to meet a wide range of colleagues across many departments, projects & products. We learned how the healthcare system works and where Craneware fits into that. We were shown how to operate their Code & Project management software, [TFS](https://en.wikipedia.org/wiki/Team_Foundation_Server). We also met the QA, UX & DevOps teams and learned about the role they play in the business and the work we will be doing.

We also had an opportunity to see what it was like working together, we took part in a Unit Testing [Coding Kata](https://en.wikipedia.org/wiki/Kata_(programming)) and were coached by a Frontend developer to implement a sliding menu. We were also introduced to the [Craneware Cares](http://cranewarecares.com/) committee, which is the company's social responsibility efforts to support charities and organizations. Something which really stood out was how much the company and it's employees cared about being responsible in this way and that the people we met were passionate people in other respects; a number of people told us that they want to make sure we get the best possible experience out of this internship and to understand what we do and why we do it.

There was a lot of domain knowledge to take in to properly understand the data and products we would be working with, and it really opened my eyes to how complex the healthcare system is.

# Starting Development

In short, we were asked to develop a pipeline that could discover trends amongst a set of data. The purpose was to allow customers to identify problems within their own revenue capture process and as a result spend less of their time on corrective measures.

There were lots of new technologies and tools at our deposal to create this pipeline, so we took a weeks worth of R&D time to better understand what the best tool for the job. We focused on Apache Flink as the data analysis tool of choice, but seeing as this was completely alien to us we wanted to prototype some demos to understand it's viability. Flink, while being a steam-first data analytic tool eventually came out as the best solution.

However, it wasn't immediately how we would be able to batch load data into Flink. Sure, batched processing is supported but not as thoroughly. We assumed that SQL data load would just be a standard thing, like how Apache Spark does it. As a result we came up with this crazy architecture involving Apache Kafka to stream rows into Flink. Two lessons came out of this: 1. Thoroughly read the documentations and 2. Always keep it simple.

Below is a rough activity diagram for this architecture, needlessly complicated. We stripped this out once we had the opportunity to speak to one of the architects who was able to point us in the correct direction. The solution was to write our own custom database connector and batch load in our data. 
![Rough activity diagram](/images/IMG_20180622_112915.jpg "Rough activity diagram")

We were able to really scale back what we were attempting to do as a result and came up with a much smaller and cleaner proposal.