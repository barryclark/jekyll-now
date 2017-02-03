---
layout: post
title: Schedule the auto shutdown and start of your VMs using Azure Automation and Runbooks
subtitle: Cut down on the cost of your DEV environments
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
I assume you are already familiar with Azure, so I will not go into every single step in doing basic things. 

 - Create a new **Resource Group** and inside your Resource Group click **Add** and search for the word Automation.
 - Click on **Automation** and fill in the form to create a new Automation Account. Make sure you check the box **Create Azure Run As account**. The Automation Account does not have to be in the same Resource Group as your virtual machines. 
 - One you are done with creating the Automation Account, open it and go into the **Runbooks** section and click **Add a runbook** and then in the new blade click **Import and existing runbook**.
 - Download this PowerShell script from here and in the new blade select it as the *Runbook File* and then click *Create*.
 
> Please take note this PowerShell was mainly developed by Noah Stahl (see his website here) and slightly modified and used for our scenario here. 


### Link the subscription service admin/owner to the imported automation Runbook
The action to shut down or start virtual machines needs to happen under a user account defined on Azure Active Directory. This user account needs to be both an Azure Subscription Owner on the new portal AND a Service Administrator/Co-Administrator on the classic portal. (Please pay attention to the AND)... Once you make sure about it:

 - Open your Automation Account blade and click the **Assets** tile and then in the new blade click the **Credentials** tile.  
 - Click **Add a Credential** and then enter the value **Default Automation Credential** for the **Name** and enter the above-mentioned username and password and click **Create**. Please take note the User name field is case-sensitive (I know it is crazy, you don't need to tell me)... 
 - Going back to the **Assets** tiles now click the **Variables** tile and click **Add a variable** and then enter the value **Default Azure Subscription** for the **Name**, select the **String** type and then enter the subscription name you are targetting in the **Value** field and click **Create**. 
 
> Take note here you are only implementing this solution for one subscription in this case. If you want to target multiple              > subscriptions, do not perform the previous step and go to the next sections. 


### Define hourly schedules for the runbook to check the target subscriptions
Now in this step Open the created Runbook and click the **Schedules** tile. 
