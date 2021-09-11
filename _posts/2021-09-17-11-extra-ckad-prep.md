---
layout: post
title: Deep Lore - CKAD Exam Prep
---

Hi folks, welcome to War(un)lock - Deep Lore Edition! This is the first blog post where I'll post an extra blog that may not fit well with the regularly blog posts. Why?
1. All of the content is relevant to a small audience.
2. It's so much in-depth content, it would mask the day-to-day updates.

This post will be dedicated on **preparing for the Certified Kubernetes Application Developer (CKAD) exam**. Since I will be renewing my certification this month, and folks have regularly asked me about the certification exam, I wanted to post my study plan and resources to prepare.

<div style="text-align:center"><img src="/images/blog11/blog11-ckad.jpg" width="500"></div>

Note that I won't go into Kubernetes concepts in this blog post. If you want to learn, you'll have to learn that yourself with this helpful guide. ;)

### Background

Kubernetes is a container management platform software. It addresses the issue of managing how containers and applications are deployed, maintained, scaled, accessed, etc. in one big platform. It's a lot of nautical-themed jargon on top of a comprehensive and extensible platform.

I have been interested in learning Kubernetes since I first learned about it in around 2017. I have had the opportunity to work on applications that were deployed to Kubernetes since then. However, my knowledge around the software was rather shallow. I often mixed up what was the Kubernetes standard, what was company in-house customization, and what were Kubernetes extensions (i.e. Helm).

At mid-2018, I booked a trip to Berlin to go to the [Velocity conference (now defunct)](https://www.oreilly.com/conferences/). I was interested in attending a workshop alongside the conference talks, and I saw that the conference offered a CKAD certification preparation course. It was run by awesome Kubernetes trainer Sébastien Goasguen, covered good CKAD tips and tricks, and the CKAD exam cost was covered. Thus, I was now set to learn everything Kubernetes!

<div style="text-align:center"><img src="/images/blog11/blog11-kubernetes.png" width="500"></div>

*All the nautical themes!*

### Original study plan

My CKAD certification exam was set in late November, and I had some high-priority projects at work as well. I formed a study plan that would give me enough time to learn the concepts and prepare for the test while working full-time and staying sane. I studied for 2 months in total, 2-3 hours per day for 3-4 days per week. (I’m recalling this information from 2 years ago, and I had some practical Kubernetes experience before, so YMMV with this study strategy.) My intent was to be consistent with my studying so I retained the information better. I wanted to apply this knowledge to my data engineering job as well since, well I'll be honesst, my company was covering the costs of the conference and exam.

**The first month was dedicated to learning Kubernetes fundamentals.** I would hit the books one chapter at a time, then did some hands-on work on ther terminal. This helped me understand what the heck the YAML configuration files were doing, and how it related to the high-level concepts. I took my time to really learn how Kubernetes objects related to each other, and how I could relate Kubernetes concepts to what I already knew. An  example is my experience with AWS and the connection of EC2 instances and autoscalers with Kubernetes pods and deployments respectively. (At a more nuanced level, there are some differences.)

**The other month was dedicated to test preparation.** The test itself is 2 hours long with 20 multi-stage prompts. It’s also open book to the [kubernetes.io website](kubernetes.io/). BUT, it’s a very short amount of time to live code Kubernetes objects to complete the prompts. (In my first practice exam, I only got through half of the questions in two hours!) Therefore, you have to know the materials AND be comfortable typing and editing on the terminal. There is also a little bit of exam strategy, such as picking which (weighted) questions to tackle first.

For extra credit to myself, I came across a GitHub repo for [creating a Kubernetes cluster from scratch on a Raspberry Pi](https://github.com/kelseyhightower/kubernetes-the-hard-way). Since I had a Raspberry Pi gathering dust in my home, I decided to try out the tutorial on my device. In short, I was proud to be a mom of a baby Kubernetes cluster!

Exam day was... particularly stressful. I did have a decent breakfast and coffee to fuel myself for a morning exam time. I ensured that I was following exam rules for a proctored exam. I had used up most of my two hours before I submitted my exam, feeling like I needed a nap and a few beers... at 11 o'clock in the morning. However, I was happy to hear that I became CKAD-certified. That meant I didn't need to put myself under that stress for another two years!

### Current study plan

Since I learned that the CKAD test will change at the end of September 2021, my goal was to take the test a few days before that deadline. The CKAD exam offers a free retake if you fail the first time (because that's how stressful the exam is to take), so I left buffer room in case I’ll need to do a retake. This has given me roughly 3.5 weeks of studying.

So far, I’ve spent around **two weeks reviewing concepts (5%) and refreshing my brain on the syntax (95%)**. Having implemented and debugged Kubernetes applications in-depth for two years, I didn't need to spend as much time reviewing on concepts now. I’ve spent around 1-2 hours per day for 5 days per week, since there's only so much time I can tolerate practicing my typing and remembering words.

I plan to have the remaining **week and a half be dedicated to taking practice exams**, and simulating my testing environment. (This means no headphones and no breaks!) The CKAD exam now includes 2 free practice exam attempts through [killer.sh](https://killer.sh/), which is new to me this year. Having these two weeks to practice gives me enough time to review any other concepts I've missed, and to rest plenty.

### Resources

If you'd like to get a CKAD certification yourself, I wanted to leave a list of resources for studying. While I keep my own hand-written notes on Kubernetes concepts, these notes may not be helpful for your own studies. (I'm a more visual and diagrammatic person with very strange abbreviations littered in my notes.) Instead, see what you can synthesize from these helpful resources!

#### General resources

* [The CKAD certification website](https://www.cncf.io/certification/ckad/). For registration, information, etc. They also link to the handbook, which is super important to read so you don't disqualify yourself from the exam process!
* [CNCF CKAD exam curriculum](https://github.com/cncf/curriculum/blob/master/CKAD_Curriculum_V1.21.pdf). An important syllabus-like resource for knowing what Kubernetes topics to focus on for the exam. For the most part, 90% of the exam comprise of pods, pods, pods.
* [The official Kubernetes documentation website](https://kubernetes.io/). It’s a really good reference to use for everything Kubernetes, from studying to general reference. The CKAD exam also allows you to use this website during the exam, so you should also be familiar with navigating through it.

#### Useful resources if you’re not familiar with Kubernetes

* [Docker Desktop](https://www.docker.com/products/docker-desktop). I installed Docker Desktop and enabled the Kubernetes settings, so I can practice CKAD exam questions on my laptop. I have the displeasure of having an older Windows laptop that might explode if I attempt to dual-boot it with another OS. Thus, I’ve used [Chocolatey](https://chocolatey.org/) and Windows Powershell to emulate a more Linux-like environment on my Windows OS.
* [Docker getting started](https://docs.docker.com/get-started/) and [Docker overview](https://docs.docker.com/get-started/overview/). Docker is a type of container that Kubernetes can manage. It’s not necessarily required to know about Docker, but it’s important to learn what Docker containers are, and to distinguish between it and Kubernetes.
* [Learn Kubernetes Basics tutorial](https://kubernetes.io/docs/tutorials/kubernetes-basics/). A “baby’s first” Kubernetes cluster. An interactive guide to learning about the basic components.
* [Kubernetes: Up and Running](https://www.oreilly.com/library/view/kubernetes-up-and/9781492046523/). I had a free subscription to O’Reilly, so I went through this book to learn Kubernetes concepts. Even if you don't pay for the book or subscription, the table of contents itself is a good outline on what the main concepts are. Again, the official Kubernetes website is a really good reference as well.
* [kelseyhightower/kubernetes-the-hard-way](https://github.com/kelseyhightower/kubernetes-the-hard-way). Highly recommended for the CKA exam but not needed for the CKAD. I definitely recommend trying this if you have access to a Raspberry Pi or similar hardware, or want to try the tutorial out through cloud resources (AWS and GCP have free trials).

#### Exam prep resources

* [dgkanatsios/CKAD-exercises](https://github.com/dgkanatsios/CKAD-exercises). My favorite GitHub repo for CKAD exam practice questions, since they have hidden answers to every question. My goal is to be able to run through the questions in less than 90 minutes.
* [bmuschko/ckad-prep](https://github.com/bmuschko/ckad-prep). Another GitHub repo for CKAD exam practice questions, but these don't have answer banks.
* [twajr/ckad-prep-notes](https://github.com/twajr/ckad-prep-notes). A GitHub repo for CKAD tips and tricks.
* [kubectl cheat sheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/). A useful reference for learning Kubernetes terminal commands. Speed is key in this exam, so it's useful to know what commands are available!

In addition, I went through a few tutorials learning about Vim and Bash. I’m comfortable with using Vim (if only because I learned it from a Vim superfan), but I’m quite rusty on Bash syntax. Learning both helps with getting comfortable with the terminal.

Also, be sure to learn how to read and write a Kubernetes YAML spec from memory. It's a lot of syntax, but most of the Kubernetes specs have a similar format.

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: hello
spec:
  template:
    # This is the pod template
    spec:
      containers:
      - name: hello
        image: busybox
        command: ['sh', '-c', 'echo "Hello, Kubernetes!" && sleep 3600']
      restartPolicy: OnFailure
    # The pod template ends here
```

*From the [official Kubernetes website.](https://kubernetes.io/docs/concepts/workloads/pods/)*

Finally, eating right and sleeping well before the exam is always recommended - before an exam and in life!

### Summary

If you're a software engineer who'd like to know about a cool full-stack platform, Kubernetes is a solid software to learn and put on your resume. With the CKAD exam, you will be familiar with how applications are deployed and maintained in a Kubernetes cluster. You'll also become a super speedy terminal typer in the process!

*What's next for me after the CKAD exam?* The CKAD exam is a whooping $350, and is valid for 3 years. I may not get another certification at that price unless there's a discount, or I come across a particularly cool technology to learn. But if I do find myself looking to polish my resume in the future, the [Certified Kubernetes Administration (CKA) certification](https://www.cncf.io/certification/cka/) or the [GCP Professional Data Engineer certification](https://www.google.com/search?client=firefox-b-1-d&q=gcp+data+engineer) are the next ones I'll aim for.

As of time of writing, I am still in the process of preparing to renew my CKAD certification. After the exam, I will update this blog post on any other resources I've used, as well as a short summary of my experience.

Like this bonus blog post? Think there are some improvements yet? Don’t hesitate to send an email through [susanna@warunlock.com](mailto:susanna@warunlock.com).

Thanks for reading!
