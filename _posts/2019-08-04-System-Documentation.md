---
layout: post
title: Documenting systems - Some options
excerpt_separator: <!--more-->
tags: [system design, documentation]
---

## Systems, systems, everywhere! 

![Yet another system](../images/system-documentation/martin-adams-a_PDPUPuNZ8-unsplash.jpg)
> Photo by Martin Adams on Unsplash

Other than the neighborhood bakery and garage, pretty much every modern-day organisation worth its salt is a technology 
company.
 
As [software is eating the world][5] at an increasing pace, focus is on delivery and pushing features out the door.  
That is the only way to stay ahead of the competition. Deliver X% more than your rivals each day/year and through the 
[compounding interest effect][7] of features and efficiency you will win.

One aspect which is almost always an after-thought is that of documenting the systems and their interactions.   

Here are some ideas of mine on the subject after a few years in the trenches. 
    
<!--more-->

## Why?

![Here we go again!](../images/system-documentation/kaleidico-7lryofJ0H9s-unsplash.jpg)
> Photo by Kaleidico on Unsplash

The paragon of modern IT organisations is continuous delivery. The product/service needs to evolve non-stop, requiring 
constant shifting in growth, nimbleness and agility.  
Technology (and software in particular) has a huge deflationary impact and [not only in the economy][8]. When you can 
achieve more with less resources (think smaller teams, SaaS, cloud services acting as force multipliers,...) documentation
is sub-consciously associated with [stasis][9].

Anyone in the IT industry can produce anecdotal evidence of the almost natural dislike of documentation. Something 
possibly rooted in the [sufficiently smart engineer][2] fallacy.  
Why not take it a few steps further and assert that [the code is self-documenting][4]? 

I would humbly argue that the above assertions are missing a critical aspect of reality: [staff turnover][1].  
The last few decades of [secular low yields][10] have seen [a torrent of funds][3] chasing the next unicorns. 

In this world, talent (i.e. human capital) is the one and only capital that counts.  
The same forces which are driving for exponential growth are the same ones causing churn of a company's top-hitters.  
Talent is a rare and sought-after "commodity"! 

Unless the company is one of the few with a talent-attracting brand (think Google), for everyone else the result is a 
revolving door of new team member onboarding.   
If documentation is not up-to-date, the result is board sessions to describe the past and present from memory.
Past assumptions and critical details are almost always missed.

A well-run organisation owes it to itself to capture and pass on the accumulated collective intelligence and experience.  

## What?

So...   
We need to document things. 
 
Where do we start?

Here are some things to consider: 

* Code moves fast.  
Engineers are conditioned to utilize modern source control systems and deploy in a [CI/CD][11] environment.  
The documentagtion tooling and environment must support this and be compatible. 

* Use as similar toolset as possible.  
This is a corollary of the above.  
Documentation is something to be done by the engineers themselves.  
If you prefer a cheesier quote, the people "making history" should be the ones writing it first hand.  
Context switching takes time, a different tool is a potential barrier to entry.  
Engineers are system and processe users as well, so the goal is to reduce friction as much as possible.

* Be as close to the codebase as possible.  
Another corollary.  
The furthest the docs are from the code, the harder it is to keep them in sync.  
Deep-linking and creating references to modules and classes, becomes increasingly harder with physical distance. 

* How much to document?  
I personally view system documentation a little bit like the sea: readily accessible to everyone.   
Everyone should be able to dip their toes in and appreciate <sub>Aww! How poetic!</sub>. Just as the sea, docs must be accessible, transparent and
accessible. Up to a depth.  
After that, it is only for experts, most possibly using different tooling than everyone else. 

## How?

Given the above, successfully documenting a system needs to capture 2 things:   
  * the sequence of important decisions which lead us to the present state, and
  * the present state, in an as clear way as possible.

### The course so far 

![Map and compass](../images/system-documentation/thomas-thompson-9Ags1vGk07c-unsplash.jpg)
> Photo by Thomas Thompson on Unsplash

Addressing the first need is by answering the question "why is X designed like this and not like that?".  
This will definitely come up again and again, as new members join the team.

The best way to capture this is with [Architecture Decision Records (ADR)][12]. 

The benefits and suggestions on the structure of this approach are [pretty][6] [well][13] [documented][14]. 

Each ADR clearly and briefly answers 4 questions
* What problem / issue had to be addressed
* What was the chosen solution / system
* When was the decision taken / implemented
* Why it was chosen i.e. what restrictions/requirements/assumptions weighed in on the decision  

The list of ADRs acts as a date-sorted index and entry-point to all the relevant deep-dive and analysis documents 
created at the time.  
If a new joiner has a WTF moment with any part of the system, the ADR will provide all the answers on the trade-offs 
and rationale.

If any of the parameters of the problem space have changed since then, or the assumptions no longer hold true, then it 
is perhaps time for a change.    

### Telling the story of now

![Stories](../images/system-documentation/clem-onojeghuo-x7CDil50KKY-unsplash.jpg)
> Photo by Clem Onojeghuo on Unsplash

Describing the current state is a little bit more involved.  
The system itself can be of any size.  
How do you describe the current system state of a small does-only-one-thing-very-well startup?  
Is it the same approach as one would take to document a cloud CRM provider?  
Is the CRM provider the same as, say, a bank? 

Unfortunately there is not one size to fit all.  
What has worked well in past settings, will not necessarily work in the new environment.  
A failure to recognize this, will almost certainly lead to poor and/or hard-to-maintain documentation.   

'But haven't [UML][15] and other [similar notations][16] been invented to guide us in this?' one might ask.  
I would humbly disagree. 

As their name suggests, these are *languages*. Whereas a system design description is essentially a *story*, it should 
have a flow to be digestible.  
In fiction and story-telling there are [literary frameworks][17] to guide us, each one with its own rules.   
Same way we should look for some higher level system design frameworks. These can guide us in telling the system design 
"story" in a meaningful way.

After many attempts in the past, I have settled on the dissection of a complex system along 2 axis:  
* themes and
* level of detail   

![System dissection](../images/system-documentation/system-detail.png)
> System breakdown

#### Themes

Any non-trivial system and organization is composed of too many components, services and interactions between them.
Trying to capture them all in a single diagram would result in something impossible to track.

For this reason, it makes sense to split the organization "ecosystem" in easier to understand chunks.  
It makes sense to make that split along the rough lines of [themes][18] or [sagas][19].  

One of our basic principles is to make the documentation accessible to everyone.  
Attempting to draw delineation lines along IT systems will not make sense to everyone.  
What is "BigData store" supposed to mean to a customer support person?  
On the contrary, drawing the lines along discreet customer value functions or business principles, is something 
understandable by anyone in the organization. "Customer onboarding" means pretty much the same thing to everyone.

#### Drilling down 

Having established how we split the system vertically, how do we go about detailing each theme's inner workings? 

Do we use [Deployment diagrams][21]?  
Something [else][22]?

I have found that a great framework to guide us in the "story-telling" is the [C4 Model][23].  

At a glance, C4 defines 4 levels of increasing detail: 
* **Context**  
At the top-most level users/actors interact with "systems".  
A system is a black box which offers a related set of functionality to its actors ("offers value" in C4 parlance).
This is from a user's point-of-view, so it might be a little subjective.
* **Container**  
Next level of abstraction, Containers live inside systems.  
They are something into which code "runs" or data "lives" (Kubernetes cluster, Postgres DB, HTML 5 app, AWS S3 buckets,...).  
This is where the "logical" architecture intersects with the "physical".  
Containers can be marked/annotated with the characteristics of the actual deployment (2 node cluster, 
some.domain.com, 6 worker pool,...).
* **Components**  
According to C4, Components are  
> a grouping of related functionality encapsulated behind a well-defined interface, which runs inside a container  

Not much to add to that!
* **Classes**  
The last level of detail should need no further introduction.

It is becoming clear how in the above framework, we can go as deep or as shallow as we want for our system description.  
Moreover, at any level, we can utilize all the elements provided by our chosen representation language (e.g. UML).  
Anyone in the organization would be able to follow a Context diagram or a Sequence diagram referring to Systems. 

### Documenting the story 



#### Visio and MS Word

#### Google docs

#### Confluence 

#### Markdown

#### ...and AsciiFlow

#### ...and mermaidJS

https://mermaidjs.github.io/mermaid-live-editor

//cdn.jsdelivr.net/npm/mermaid@8.2.1/dist/mermaid.min.js

<script src="mermaid.min.js"></script>
<script>mermaid.initialize({startOnLoad:true});</script>

<div class="mermaid">
    CHART DEFINITION GOES HERE
</div>

#### ...and LucidChart

#### ...and  

## And the winner is...



## Parting thought

![Sailing away](../images/building-wealth/farid-askerov-235058-unsplash.jpg)
> Photo by Farid Askerov on Unsplash

Our financial well-being should be something we take as seriously as our physical and mental health.  
Without me pretending to be an expert on it, I hope this presentation will make you see things under 
a different light. 

*Many thanks to [Georges Haidar][20] for introducing me to the C4 Model*


   [1]: https://business.linkedin.com/talent-solutions/blog/trends-and-research/2018/the-3-industries-with-the-highest-turnover-rates
   [2]: https://www.linkedin.com/pulse/myth-sufficiently-smart-engineer-aaron-blohowiak/
   [3]: https://techcrunch.com/2018/07/22/inside-the-rise-and-reign-of-supergiant-venture-capital-rounds/
   [4]: https://thenewstack.io/no-testing-no-documentation-no-problem/
   [5]: https://a16z.com/2011/08/20/why-software-is-eating-the-world/
   [6]: https://github.com/joelparkerhenderson/architecture_decision_record
   [7]: https://www.moneysense.gov.sg/articles/2018/10/effects-of-compounding-interest
   [8]: https://www.ft.com/content/9f945d12-f6e5-11e7-88f7-5465a6ce1a00
   [9]: https://www.merriam-webster.com/dictionary/stasis
   [10]: https://www.niesr.ac.uk/sites/default/files/publications/Box%20A%20-%20Decline%20interest%20rates.pdf
   [11]: https://en.wikipedia.org/wiki/CI/CD
   [12]: https://adr.github.io/
   [13]: https://medium.com/better-programming/here-is-a-simple-yet-powerful-tool-to-record-your-architectural-decisions-5fb31367a7da
   [14]: https://www.agilealliance.org/resources/experience-reports/distribute-design-authority-with-architecture-decision-records/
   [15]: https://en.wikipedia.org/wiki/Unified_Modeling_Language
   [16]: https://en.wikipedia.org/wiki/Systems_Modeling_Language
   [17]: https://en.wikipedia.org/wiki/The_Seven_Basic_Plots
   [18]: https://www.atlassian.com/agile/project-management/epics-stories-themes
   [19]: https://www.scrumexpert.com/knowledge/using-sagas-as-a-strategic-view-of-epics/
   [20]: https://www.linkedin.com/in/georges-haidar-a9314123/
   [21]: https://en.wikipedia.org/wiki/Deployment_diagram
   [22]: https://en.wikipedia.org/wiki/Sequence_diagram
   [23]: https://c4model.com/