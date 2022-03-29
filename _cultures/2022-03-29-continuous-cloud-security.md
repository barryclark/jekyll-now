---
layout: culture
title: Continuous Cloud Security 
---

## At the beginning ...

There was the Waterfall and classical (Micro)Management approaches to deal with complexitiy. Visualized it looks like this:

<p align="center">
<img width="600" src="/images/WaterFallSecurity.png">
</p>

The problem in this flow is similar to the issues in the Quality Assurance - at the end the budget is nearly gone and the test phases need to be cut down to a bare minimum. Also it's nearly impossible to "test in" quality at the very end of the cycle.

In my time as a Testmanager I used the metaphor of a Blueberry Muffin. If the dough of the Muffin is our piece of Software and the Blueberries is the Qualty. It's better to mix the Blueberries into the dough instead of just place a few on the top. In that way you can enjoy a Blueberry with every bite. 

Based on this metaphor we need to think of Security and DevOps Culture in a more holistic way. Instead of testing in "Security" and "Quality" in the end we have to include a tiny bit in each step of the lifecycle process of our software. With this in mind we'll end with something like this:

<p align="center">
<img width="600" src="/images/DevOpsContinuousSecurity.png">
</p>

## Now we have DevOps - but what is it all about?
DevOps is about performing the **wonder** of releasing a piece of software, not once every 6 month but as often as we like. This is achieved by
**automating** and standardizing whatever possible, from the design over the code and it's tests till the point of deployment.

Therefore, we bring together the world of Dev and Ops, by treating
everything in Ops the same way we treat our code artefacts. 

## But where's the Security part coming in? 

Suprise it's a Mindset:

> DevOpsTeams seek for continuous self improvement<br>
  Everyone is doing Security<br>
  Everyone is doing Architecture<br>
  Everyone is responsible for the Quality
  
With this mindset we can narrow it down to:

> It’s not DevSecOps , it’s just DevOps<br>
  Security is a natural part of it!

As a DevOps we like our loop and if we take this [Tweet](https://twitter.com/LMaccherone/status/843644744538427392) we have it back and enriched by a lot of useful Security activities:

<p align="center">
<img width="600" src="/images/DevSecOpsCycle.jfif">
</p>


## But where's the Cloud ?
As a DevOps we're cloud natives and breath cloud technology like air - it's still different to classical approaches that we used on premise. Let's take a look on how the Cloud looks from the perspective of AWS:

<p align="center">
<img width="600" src="/images/AWSAccountFlow.png">
</p>

Our job as a Security guy we have to bring our skills and magic to the Control- and the Data Plane. Based on this you'll find by some googling the `Shared Responsibility Model` (I'll create an own post for this including a rant). What you' ll hear from the cloud provider will be something like:

> "AWS is securing some things, you’re responsible for securing everything else."

But ....

> "AWS is never going to say "Hey, one of our people couldn’t make the shift to be a security guard at our data center, would you mind showing up and keeping an eye on things?"

**So as a conclution**: `The responsibilitiy is not shared, it's split!`

For a better understanding of what we need to secure we need to understand more what's an AWS Account and bring some clearance to the highly confusing terminology "AWS account” ≠ “user account":

<p align="center">
<img width="600" src="/images/AWSAccount.png">
</p>

It's more: “AWS account” ~= “AWS tenant” / “AWS subscription”

As you can see - the Cloud is confusing and the goals that need to be secured differ from time to time to our classical approaches. Therefore it's more helpful to stick to common things that help ous out:

* [Treacherous 12 - Cloud Computing](https://downloads.cloudsecurityalliance.org/assets/research/top-threats/Treacherous-12_Cloud-Computing_Top-Threats.pdf)
* [OWASP Proactive Controls](https://owasp.org/www-project-proactive-controls/)
* [MITRE Cloud Matrix](https://attack.mitre.org/matrices/enterprise/cloud/)
* ...

