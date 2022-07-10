---
layout: culture
title: The three ways of DevOps
---

If we think of DevOps there are plenty definitions, theories and more around. Also the [5 ideals of DevOps](https://itrevolution.com/five-ideals-of-devops/) are an amazing piece of culture. But in my opinion, the best baseline to get in touch with DevOps are these books and the DORA State of DevOps reports from awesome authors like Gene Kim, Kevin Behr, Jez Humble and Nicole Forsgren:

<p align="center">
<img width="600" src="/images/devops-books.png">
</p>

The `Phoenix-` and `Unicorn Project` are awesome novels that are really worth to read. To summarize the books on a pretty high level  ...

<p align="center">
<img width="600" src="/images/unicorn-waiting.png">
</p>

... didn't we all encounter something like this? The most of the time we're waiting for stuff and waste our time in meetings or in manual tasks. To create value for a customer we need to rethink a lot. The book `Accelerate` provides awesome capabilities to drive improvement:

<p align="center">
<img width="600" src="/images/24-capabilities.png">
</p>

Those 24 capabilities are a great north star, that can be used as an orientation in your way to master DevOps.

## The three ways of DevOps

<img height="200" align="left" src="/images/mando.png" >  As a DevOps rookie the 24 capabilities can feel overwhelming. Therefore we should talk about the three ways of devops to get more in touch with the mindset and culture of DevOps.
<br><br>
This is the way ...
<br><br>

### The first Way - Systems thinking

<p align="left">
<img src="/images/way1.png">
</p>

Enhance the performance of the whole System, by increasing the flow from ...

> left to Right

In other words, work should only flow into one direction, and that is downstream from Dev to Ops. While orchestrating the flow, always seek to increase the flow like Kanban teaches us. One thing to keep in mind is:

> The performance of a system increases proportionally to the throughput

### The Second Way – Amplify Feedback

<p align="left">
<img src="/images/way2.png">
</p>

> Shorten & Amplify the feedback loop

Establish an upstream feedback loop to optimize the value stream. To achieve this - a fast feedback from Production is required to plan the next steps in the "Plan" Phase. Based on the feedback from production, strategies can be crafted to move forward or make a pirouette to rethink the plans and find new ways to build and ship your software.

### The Third Way – Continued experimentation

<p align="left">
<img src="/images/way3.png">
</p>

> Promote experiments

The Culture & Environment are  as important as the work being done.

To achieve mastery:

* Learn from success and mistakes
* Strive for constant improvement
* Practice! Get your hands dirty

## From Theory to a more practical approach

Theory is nice but to really get the spirit of the DevOps culture we need to get the hands dirty. Therefore I'll try to make a metaphor based on something we all know from our daily experiences > Washing dirty clothes. Time to ...

<p align="center">
<img width=600  src="/images/setting_the_stage.png">
</p>

With the stage and all actors in place we can now start iterating:

<p align="center">
<img width=600 src="/images/iteration1.png">
</p>

* Big laundry day once a week -> “Big bang release”
* Washing all in one shot. A lot of clothes needs to get done by the Devs
* Multiple changes are performed in Production with high risks. Red socks and white T-Shirts might get washed together and ruining the T-Shirt with side effects
* Ops is overwhelmed with drying so much laundry. The laundry will stay moist for at least 2-3 days

Let's perform another and improve a little...

<p align="center">
<img width=600  src="/images/iteration2.png">
</p>

* Now we're washing on a more regular base (every 3-4 days)
* Less changes than before in Production. This will reduce the risks of failures
* One problem still remains -> `Washing black and white cloths together still is a bad idea`. This problem is symbolic for clashing of resource requirements.

Things are working better now, but still not perfect. Time for another iteration ...

<p align="center">
<img width=600  src="/images/iteration3.png">
</p>

* Washing in smaller loads on a daily base
* A tiny load (releases) result in a manageable risk for Production
* The Dev-Team can create faster value, since only a few loads of clothes needs to be washed
* Ops can dry the laundry overnight (more stable, less side effects)  

Everything is flowing now more perfectly and all of the feedback from the production is now integrated within the flow. But we're no DevOps if we wouldn't drive it beyond the edge. Time for a final iteration ...

<p align="center">
<img width=600  src="/images/iteration4.png">
</p>

* Automate the boring tasks. If it takes more than 60 secs of your time doing it manually, simply automate it
* CI/CD is the backbone and engine to drive DevOps culture
* Dev and Ops can focus on the important things to create value

Now we reached a state where it's worth to come back to the 24 capabilities and start optimizing to master DevOps. To become superior you've to iterate even more and keep raising the bar. Hopefully, this more practical approach helped to dive more into the mindset of a DevOps. Happy to hear some of your stories, really would love to hear them :)

To be continued ...
