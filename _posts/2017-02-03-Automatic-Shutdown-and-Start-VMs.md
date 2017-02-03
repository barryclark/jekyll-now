---
layout: post
title: Schedule the auto shutdown and start of your VMs using Azure Automation and Runbooks
subtitle: Cut down on the cost of your DEV environment
category: howto
tags: [cloud, automation]
author: esmaeil_sarabadani
author_email: esmaeil.sarabadani@haufe-lexware.com
header-img: "images/bg-post.jpg"
---

Are you a developer on Azure? Have a lot of virtual machines running on your Azure development environment? Are you tired of shutting them down manually one by one once you are done with your work in the evenings? This blog post is for you... Use this guide to automate the shutdown and start of your VMs at specific times and save your company hundreds and thousands of dollars...

You can implement this solution either individually per subscription or have it on a single Azure subscription and deploy it to all the other subscriptions from there... If you are planning for a solid Azure governance model in your organization the later choice is a better one... 

**What are we going to cover in this post?**

 - Create an automation account on Azure and import a Runbook which performs the VM shutdown/start job
 - Link the subscription service admin/owner to the imported automation Runbook
 - Define hourly schedules for the runbook to check the target subscriptions
 - Tag the Virtual Machines (or the Resource Groups which includes them) which you want to shut down or start
 - Wait for the magic to happen
 
 
> Note: If you are an Azure developer at Haufe, this solution is already implemented on your subscription and you just need to proceed 
> to the next section of the article to learn how you should tag your Virtual Machines or Resource Groups. Or if you still want to learn 
> the solution, be my guest and read on...


### Create an Automation Account and Runbook
