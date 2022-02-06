---
layout: post
title: AWS Login Guard
---

> Ever wondered who is lurking around in the shadows of your AWS Account? Get notified if strange login activities occured in your AWS Account

If the event `AwsConsoleSignin` get's triggered, the Event Bridge shall trigger a lambda function, that gathers some info about "who is logging in" and try to check if it's a Pentester. Most of the guys are forgetting to disguise their user agents. In this first version we stay "detective", in later version also an automatic remediation could be implemented. Let's see how this script evolves :)

![]({{ site.baseurl }}/images/AWSLoginGuard.png)


[AWS-LoginGuard Repo](https://github.com/BenjiTrapp/AWS-LoginGuard)
**Currently still work in progress''
