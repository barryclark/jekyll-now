---
layout: culture
title: The CALMS Model of DevOps
---



CALMS is an acronym for Culture-Automation-Lean-Measurement-Sharing and a foundational model for DevOps.

John Willis and Damon Edwards developed the acronym [CAMS](https://itrevolution.com/devops-culture-part-1/) in the year 2010. This acronym was later expanded to CALMS by Jez Humble. ​

## **C**ulture

At it’s heart, DevOps culture can be summarized as: embracing change, constantly seeking feedback in order to improve, and seeking to take accountability and responsibility - not to avoid it or pass it onto other people/centralized teams.

A DevOps culture seeks to push decision making responsibility as close to the edge (autonomy) as opposed to centralizing all decision making (Command&Control).

​## **A**utomation​
DevOps loves automation! The everything-as-code mindset is the beating heart of DevOps. Regardless of the tooling you might use (Ansible, Puppet, Chef, Terraform, Cloud Formation, Helm templates etc). Google express it best in their SRE (Site Reliability Engineering) website when they talk about **Toil**:​
​
> “So what is toil? Toil is the kind of work tied to running a production service that tends to be manual, repetitive, automatable, tactical, devoid of enduring value, and that scales linearly as a service grows. Not every task deemed toil has all these attributes, but the more closely work matches one or more of the following descriptions, the more likely it is to be toil:” <br>– [Google](https://landing.google.com/sre/sre-book/chapters/eliminating-toil/)

Automation is the antidote to toil – by automating the low value toil it leaves more time for the higher value-add work. Automation should also improve repeatability and reliability by automating all tasks. If the same tasks are performed the same way every time there wont be any surprises left. Manual tasks in the opposite introduce high levels of variation and have therefor a lack of repeatability.

## **L**ean​

The 5 key principles of Lean are well [documented](https://theleanway.net/The-Five-Principles-of-Lean) and the Lean IT movement seeks to extend these concepts into the world of Software Development. Key texts are Lean Software Development by [Tom & Mary Poppendieck](https://www.amazon.co.uk/Lean-Software-Development-Agile-Toolkit/dp/0321150783) and Lean Enterprise by Humble, [Molesky and O’Reilly](https://www.amazon.co.uk/Lean-Enterprise-Performance-Organizations-Innovate/dp/1449368425/). Lean seeks to achieve **FLOW** – the smooth transition of work from one “work centre” to the next, in the minimum time. Ideally with as few queues/buffers as possible.

## **M**easurement​

Whilst it is a truism “what gets measured gets done” (see management guru [Tom Peters](https://tompeters.com/columns/what-gets-measured-gets-done/)) DevOps seeks to take this to the next level.  The Build-Measure-Learn model from Eric Ries [book](http://theleanstartup.com/) “Lean Startup” identifies the key cycle -> Without measurement, you can never learn or improve so “measure all the things”. The annual State of DevOps report (by DORA/Google) focuses on four key measures – two for speed balanced and the other two for stability.

* **Lead time (for change)** – how long does it take from Code Commit to Production Deployment?
* **Change Frequency** – how frequently are you deploying to production? Multiple times per day? Per week? Per month? Per year?
* **Change Failure Rate** – how often does a change (either the code itself or the deployment process) introduce a bug into production?​
* **Mean Time to Repair** – how long does it take you to restore service in the case of an incident?

## **S**haring​

Sharing – a focus on breaking down silos between departments and sharing knowledge and best practice. Sharing needs to be encouraged and rewarded. In opposit hoarding of knowledge in silos must be discouraged. A great way to get started is by setting up our own internal “communities of practice” around DevOps, or even hosting your own “DevOpsDays” summit within your organisation. But more than that, it is the day-to-day knowledge sharing that’s important, whether it’s writing an [awesome git commit message](https://fatbusinessman.com/2019/my-favourite-git-commit), a helpful [Github README](https://github.com/matiassingers/awesome-readme) , or writing up an entire knowledgeable article. Sharing *IS* caring.

<p align="center">
<img width="600" src="/images/calms_devops.jpeg">
</p>
