---
layout: culture
title: Continuous Cloud Security 
---

In this article you can follow me on my journey on how to master my way to something I call "Continuous Cloud Security". 

## At the very beginning ...

there was the Waterfall and classical (Micro)Management approaches to deal with complexitiy. We tried to manage complexity by creating checklist and observed the state in Excel. The process itself was mostly plugged into the casual Watterfall approaches like regular Quality Assurance aspects. Visualized it looks like this:

<p align="center">
<img width="600" src="/images/WaterFallSecurity.png">
</p>

The problem in this flow is similar to the issues in the Quality Assurance - at the end the budget is nearly gone and the test phases need to be cut down to a bare minimum. Also it's nearly impossible to "test in" quality at the very end of the cycle.

In my time as a Testmanager I often used the metaphor of baking a tasty Blueberry Muffin. In this metaphor the dough of the Muffin can be abstracted as our piece of Software. The Blueberries can be symbolized as Quality. Isn't it more tasty to mix the Blueberries into the dough, instead of just place a few of them on the top? In that way with each bite can a Blueberry can be enjoyed. 

Based on this metaphor we need to think of Security and DevOps Culture in a more holistic way. Instead of "testing in" some Security and Quality in the end, we have to include a tiny bit in each step of the lifecycle process of our Software. With this in mind we'll end with something like this:

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
  Everyone is responsible for the Quality (functional and non-functional)<br>
  Everyone is needs to operate the systems or at least monitor them
  
With this mindset we can narrow it down to:

> It’s not DevSecOps , it’s just DevOps<br>
  Security is a natural part of it!

As a DevOps we like our loop and if we take this [Tweet](https://twitter.com/LMaccherone/status/843644744538427392) we have it back and enriched by a lot of useful Security activities:

<p align="center">
<img width="600" src="/images/DevSecOpsCycle.jfif">
</p>


## But where's the Cloud ?
Since we're cloud natives and breath cloud technology like air - we know that it's a very different approach to classical ones that we used in the past on premise. Let's take a look on how the Cloud looks from the perspective of AWS:

<p align="center">
<img width="600" src="/images/AWSAccountFlow.png">
</p>

Our job as a Security guy we have to bring our skills and magic to the Control- and the Data Plane. Based on this you'll find by some googling the `Shared Responsibility Model` (I'll create an own post for this including a rant). What you' ll hear from the cloud provider will be something like:

> "AWS is securing some things, you’re responsible for securing everything else."

But ....

> "AWS is never going to say "Hey, one of our people couldn’t make the shift to be a security guard at our data center, would you mind showing up and keeping an eye on things?"

**So as a conclution**: `The responsibilitiy is not shared, it's split!`

Even if AWS is doing a lot to secure the Control Plane we still have some homeweork left. The main work we need to tacke is the Data Plane. If we look on the options at a very high flight-level our targets to secure the Data Plane will look like this:

* Don’t expose any part of your infrastructure to the Internet. Isolation is king!
* Ensure services are configured to disallow public access
* Secure authentication
* Encryption (in transit and at rest)

The cool kids still tell you all day long that you require to secure your AWS account. For a better understanding of what we need to secure, we need to understand more what an AWS Account actually is. To bring some clearance to this highly confusing terminology "AWS account” ≠ “user account". Visualized it looks more like this:

<p align="center">
<img width="600" src="/images/AWSAccount.png">
</p>

So an AWS account can be abstracted more like this: “AWS account” ~= “AWS tenant” / “AWS subscription”. To secure the Account we can stick at the AWS Well Architected Framework ([pdf](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwigu9r4ou72AhXM8bsIHbbrAagQFnoECAkQAQ&url=https%3A%2F%2Fdocs.aws.amazon.com%2Fwellarchitected%2Flatest%2Fframework%2Fwellarchitected-framework.pdf&usg=AOvVaw351ntBckF2uCUrI4k41wra)) or multiple other frameworks like the [Knowledge base](https://www.trendmicro.com/cloudoneconformity/knowledge-base/aws/) from Trend Micro. 

As you can see - the Cloud is confusing and the goals that need to be secured differ from time to time to our classical approaches. Therefore it's more helpful to stick to common things that help ous out:

* [Treacherous 12 - Cloud Computing](https://downloads.cloudsecurityalliance.org/assets/research/top-threats/Treacherous-12_Cloud-Computing_Top-Threats.pdf)
* [OWASP Proactive Controls](https://owasp.org/www-project-proactive-controls/)
* [MITRE Cloud Matrix](https://attack.mitre.org/matrices/enterprise/cloud/)
* [AWS Security Maturity Roadmap by Scott Piper](https://summitroute.com/downloads/aws_security_maturity_roadmap-Summit_Route.pdf)
* ...

But this is only one side of the Truth - to master this challenge we have to go beyond that. 

* Cloud Security DevOps Framewkork (still work in Progress)
* Use a Policy as Code tool like [Cloud Custodian](https://github.com/cloud-custodian/cloud-custodian) 
* ...

(Sorry still Work in Progress ...)

