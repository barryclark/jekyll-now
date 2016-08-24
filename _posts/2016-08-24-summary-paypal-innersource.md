---
layout: post
title: Summary of PayPal InnerSource Summit, 2016
subtitle: Summary of the PayPal InnerSource Summit in London.
category: conference
tags: [devops, culture, open-source]
author: holger_reinhardt
author_email: holger.reinhardt@haufe-lexware.com 
header-img: "images/bg-post.jpg"

---

From April 21st to 22nd, 2016 we were fortunate to attend the [PayPal Inner Source Summit](http://paypal.github.io/InnerSourceCommons/events/) in London. 

We first got exposed to the InnerSource concept through a talk by PayPal at the [OSCON 2015](https://hlgr360.wordpress.com/2015/11/04/notes-from-oscon-europe-2015/) in Amsterdam in fall of 2015. At that point we were struggling to resolve a multitude of project dependencies on our backend platform team. The modus operandi of the team was highly interrupt driven, reactive and managed largely through tickets raised by other teams looking for changes or additions to existing services. There was precious little time in which the team could proactively reduce technical debt or improve operational efficiency. Needless to say the foundation of the so called 'Haufe Group Service Platform' (HGSP) continued to deteriorate. (The HGSP was also the topic of [my recent talk on the Automated Monolith](http://www.apiacademy.co/resources/api360-microservices-summit-the-automated-monolith/) at the API360 Microservice conference in New York).

Before I dive more into the topic, let me first summarize what InnerSource stands for: To apply the concepts of Open Source to the internal software development inside of your company. You can read more about it at the [InnerSource Commons](http://paypal.github.io/InnerSourceCommons/) and/or download a free copy of the [InnerSource eBook](http://www.oreilly.com/programming/free/getting-started-with-innersource.csp). If you google it you will also find some articles, for instance [here](http://thenewstack.io/github-bloomberg-talk-using-innersource-build-open-source-project-development-behind-company-firewalls/) and [here](https://www.infoq.com/news/2015/10/innersource-at-paypal). 


What made us excited about the InnerSource concept was the premise to unwind or at least greatly reduce those external dependencies, and thereby freeing up the core team to focus on evolving the platform itself. It does so by offering dependent projects the ability to add their required enhancements to the platform code base vs. having to wait for the platform team do it for them.

While it appears to be counter-intuitive at first, remember that (a) this is how Open Source works (and you can hardly argue that it does not scale) and (b) the external team regains control over their own project schedule in exchange for  extra work. The latter is an extremely powerful motivator, especially if you consider that the change might be small or incremental, but keeps being deprioritzed by the platform team due to some other feature from some other projects.

To me there are two macro patterns at work here, which seem to point into the same direction:

* Change the perspective from a point solution (add more developer) to changing the motivators in the system (enable external teams to take care of itself). The same can be said about the [Netflix approach of 'Chaos Engineering'](http://readwrite.com/2014/09/17/netflix-chaos-engineering-for-everyone/). Instead of pretending that QA can catch every bug (and thereby contributing to an illusion of bug-free systems), Netflix deliberatly introduces failure into the system to force engineers to design software anticipating the presence of failure.
* Efficiency and Speed are goals at opposite ends (I owe that insight to the folks from Thoughtworks). You can not have both of them at the same time. Microservices (MSA) embrace speed over efficiency through its emphasize on a `shared nothing` approach. In effect MSA is saying that databases and app servers are commodity by now and that you do not gain significant business value by using them efficiently. MSA emphasizes duplication and the reduction of cross dependencies over having a central instance which will become the bottleneck. 

I would like to thank Danese Cooper and her team for so openly sharing their lessons and knowledge.

Here are my notes from the various sessions under the [Chatham House Rule](https://www.chathamhouse.org/about/chatham-house-rule).

---

### How does InnerSource work at Paypal

* concept of a trusted [committer](https://en.wikipedia.org/wiki/Committer) (TC) within core team 
* define a formal contributor document
* pull request builder
  * based on jenkins
  * generates metrics before/after pull
    * metric can not be worse after merge
    * contains code checking, style, fortify etc
  * both for internal and external pull requests
    * peer reviewed pull requests internal
    * rule: pull requestor can not be pull committer
 * pay attention to InnerSource activation and incentive 
   * need to have documentation
     * system documentation in markdown in the repo
     * so keep documentation and source together in same pull request
     * the teams should have a chance to meet (there difference between inner and open source)
 * extrensic vs intrinsic motivation - accept the difference
   * Core Motivation: It takes too long, lets do it ourself
   * Learning penalty vs intrinsic understanding of the system
   * Motivation: customer (only) sees product as a whole
     * irregardless how many system boundaries are hidden within
     * Take a customer centric view - take responsibility for the whole stack
   * pull request helps to improve code structure
* InnerSource as company policy
  * do to others what you want them to do to you
* Security concerns
  * developer does not have production access
  * legal information is isolated  
  * production access nur ueber audited tool 
    * *Example for such an audting framework on AWS from Zalando at <https://stups.io>*

### Workshop

* Existing model: variations of 'big cheese gets stuff done'
  * *I could not find a good explanation for it, but the expression means that some inidvidual's identity and self-worth are tied to 'being the one which get stuff done'.*
* OSS Apache Model: 
  * ratio of users/contributors/trusted committers/lead is 1000/100/10/1
* How can we make trusted committer to not be the chokepoint
  * super powers come with responsibilities
    * code mentorship (not rewriting)
    * its like on-boardig new team members
    * if it is not written down, it does not exist
    * think of rewards for trusted committer and team
      * in open source the submissions to projects stay with the contributor
      * refactoring clues for core team
      * lazy documentation through discussion threads
      * also extrinsic rewards
        * i.e. I give you a beer for that, or Badges
        * Could there be rewards for archiving committer status on external projects?
* Tooling for inner source
  * <http://innersourcecommons.org>
  * <https://www.youtube.com/watch?v=r4QU1WJn9f8>
  * <http://www.inner-sourcing.com>
* KPI’s to measure the success of the ‘openness’ 
  * To change culture, you can not just do it from the inside, but also create pressure from the outside
  * Create transparency by making all code repos by default visible/public within the company
  * Challenges
    * How to get PO bought into it (most of them like management by exception and `big cheese`)
    * **If ownership is culture, part of it is keeping others out**
      * this code is mine, this is yours
        * it must be ok to fail for ownership to stop being exclusive
    * Operational responsibility
      * agreement on the time window of operational responsibility for  merged patch by contributor
* Training of trusted committers 
  * keeper of the flame
  * not everybody will be good at this (rotating)
  * its all about mentorship (did you get that far by yourself?)
    * what mentor do you want to be
    * growing a new culture
	* do it a sprint at the time
    * have rules of engagement
    * why - because it is leadership (it is about mentoring)
	* visible rewards
	  * <http://openbadges.org>
	  * <https://en.wikipedia.org/wiki/Mozilla_Open_Badges>


### Interviews and Lessons Learnt

#### Company 1
* from central dev to separate dev per business units
* resulting in a lot of redundancy over the years
* challenge: 
  * how can we speed up product development
  * AND keep the place interesting for engineers to join the company
 
#### Company 2
* optimize developer productivity
  * low friction, high adaption
  * ease of use, ease of contribution
* developer community is something to opt-in individually, can not be mandatory
  * how to motivate people:
    * is it a personality strait or can it be taught?
	* are people not motivated or do not know how to?
    * was/is there a hiring bias discouraging the right dev to join
* developer happiness through transparency
* **if you have a PO who is only focussed on his goals, he will eventually loose the team**

#### Company 3
* someone critiquing your code is like someone reading your journal
* someone critiquing your service is like someone complaining about your children (one step removed)
* there is an implizit cultural hierarchy/snobbism of programmers depending how hard it is to learn and how many years you needed to put it into
* law of unintended consequences (start with experiments)
* modularize software such that it becomes more intelligible for other people
  * accept diskrete contributions and mentor them through it, observe to learn what to document and what to modularize
  * run experiments long enough to gather useful data (engineers tend to rather write code than listening to feedback)
  * trusted committers need to be taken out sprint rotation for the duration and focus on mentoring (but can be escalated in with clear tracking of costs)

#### Company 4
* paper comparing different appropaches ["Inner Source - Adapting Open Source Within Organizations"](https://www.computer.org/csdl/mags/so/preprint/06809709.pdf)
* factors for success: 
  * Candidate product
  * Stakeholders
  * Modularity, 
  * Bazaar-style Development
    * maintenance is continuous: moving target or dead corpse
	* caters to the individual style
	* quick turnaround but potentially incoherent approach
  * Bazaar-style quality assurance
	* (true) peer review of contributions
	* releasing regularly improves quality
      * no rushing in code
      * releasing becomes no big deal
  * Standardized or at least compatible tools
    * incompatible toolsets inhibit collaboration
  * Coordination & leadership to support meritocracy
    * advocate and evangelists
      * emerging leadership
  * Transparency
    * needed for visibility
    * cultural fit to accept working in a fishbowl
      * 1:n communication over 1:1
      * management support 
        * the importance of slack (pict of number slide)
  * Motivation
    * There is **‘learned helplessness' that is afflicting teams without slack and some sense of self-determination**

---
    
On a side note: For me personally it was eye opening to discuss the implications of an institutional bias towards `ownership` and 'single responsibility' and how this can counteract sharing and agility. It appears that too much focus on ownership might directly contribute towards risk avoidance and lack of openness:

* because being the owner means `if it breaks it is on me` and therefor I will do everything in my power to limit my risk
* which counteracts agility and controlled risk taking

The key here seems to be an institutional bias on 'if it breaks'. If the default assumption is that it can go wrong, it is clear that we would prefer to have one person responsible. But obviously embracing the possibility of (controlled) failure is what makes all the difference in execution speed between a startup and an enterprise, between a 'fail fast' and a risk avoidance culture. But this is a topic worthy of a separate blog post.