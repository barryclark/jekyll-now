---
layout: post
title: Keeping our Azure Cloud Tidy - Part 1
subtitle:
category: dev
tags: [howot, cloud, devops]
author: Esmaeil Sarabadani
author_email: esmaeil.sarabadani@haufe-lexware.com
header-img: "images/new/Exportiert_43.jpg"
---

Are you a developer on Azure? Have a lot of virtual machines running on your Azure development environment? Are you tired of shutting them down manually one by one once you are done with your work in the evenings? This blog post is for you... Use this guide to automate the shutdown and start of your VMs at specific times and save your company hundreds and thousands of dollars...

You can implement this solution either individually per subscription or have it on a single Azure subscription and deploy it to all the other subscriptions from there... If you are planning for a solid Azure governance model in your organization the latter choice is a better one... 

**What are we going to cover in this post?**

 - Create an automation account on Azure and import a Runbook which performs the VM shutdown/start job
 - Link the subscription service admin/owner to the imported automation Runbook
 - Define schedules for the runbook to check the target subscriptions
 - Tag Virtual Machines (or the Resource Groups which includes them) which you want to shut down or start
 - Wait for the magic to happen
 
 
> Note: If you are an Azure developer at Haufe, this solution is already implemented on your subscription and you just need to proceed 
> to the next section of the article to learn how you should tag your Virtual Machines or Resource Groups. Or if you still want to learn 
> the solution, be my guest and read on...



### Create an Automation Account and Runbook
I assume you are already familiar with Azure, so I will not go into every single step in doing basic things. 

 - Create a new **Resource Group** and proceed to add an **Automation Account**.

![Automation](/images/Automation.PNG)
 
 - Make sure you check the box **Create Azure Run As account**. The Automation Account does not have to be in the same Resource Group as your virtual machines. 
 
![Automation2](/images/Automation2.PNG)
 
 - One you are done with creating the Automation Account, open it and go into the **Runbooks** section and click **Add a runbook** and then in the new blade click **Import an existing runbook**.

![Import](/images/Import.PNG)
 
 - Download this PowerShell [script] from here and in the new blade select it as the **Runbook File** and then click **Create**.
 
> Please take note this PowerShell script was mainly developed by Noah Stahl (see his website [here]) and slightly modified and used for our scenario here. 


### Link the subscription service admin/owner to the imported automation Runbook
The action to shut down or start virtual machines needs to happen under a user account defined on Azure Active Directory. This user account needs to be both an Azure Subscription Owner on the new portal AND a Service Administrator/Co-Administrator on the classic portal. (Please pay attention to the AND)... Once you make sure about it:

 - Open your Automation Account blade and click the **Assets** tile and then in the new blade click the **Credentials** tile.  
 
![Assets](/images/assets.PNG)
 
 - Click **Add a Credential** and then enter the value **Default Automation Credential** for the **Name** and enter the above-mentioned username and password and click **Create**. Please take note the User name field is case-sensitive (I know it is crazy, you don't need to tell me)... 
 - Going back to the **Assets** tiles now click the **Variables** tile and click **Add a variable** and then enter the value **Default Azure Subscription** for the **Name**, select the **String** type and then enter the subscription name you are targetting in the **Value** field and click **Create**. 
 
> Take note here you are only implementing this solution for one subscription in this case. If you want to target multiple subscriptions, do not perform the previous step and go to the next section of the blog (Defining Schedules). 


### Define schedules for the runbook to check the target subscriptions
 - Now in this step Open the created Runbook and click the **Schedules** tile. In here you will define how often the runbook is checked against the target virtual machines and if you have multiple subscriptions, you will need to define one schedule per subscription.

![Schedules](/images/schedules_tile.PNG)

 - Click **Add a Schedule** and enter the required values. For the **Parameters and run settings** just leave all the fields empty. If you are implementing the solution for multiple subscriptions, enter the subscription name in the **AZURESUBSCRIPTIONNAME** field and make sure you create one schedule per subscription. 

### Tag Virtual Machines or the Resource Groups which contain them
Now that we defined a schedule for the runbook to run, how does the runbook know which virtual machines in the specified subscription to shut down or start? based on what time frame? That is when the tagging comes in to play.

You can either tag the virtual machines or the resource groups which contain those virtual machines. Once the runbook finds a tag with the name **AutoShutdownSchedule**, it looks into the tag value and based on its finding it either shuts down/starts the machine or takes no action. Here is a table which explains the tagging structure: 

Description     | Tag Value
-------- | ----------- 
Shut down from 10PM to 6 AM UTC every day | 10pm -> 6am
Shut down from 10PM to 6 AM UTC every day (different format, same result as above)    | 22:00 -> 06:00
Shut down from 8PM to 12AM and from 2AM to 7AM UTC every day (bringing online from 12-2AM for maintenance in between)     | 8PM -> 12AM, 2AM -> 7AM
Shut down all day Saturday and Sunday (midnight to midnight) | Saturday, Sunday
Shut down from 2AM to 7AM UTC every day and all day on weekends | 2:00 -> 7:00, Saturday, Sunday
Shut down on Christmas Day and New Year’s Day | December 25, January 1
Shut down from 2AM to 7AM UTC every day, and all day on weekends, and on Christmas Day | 2:00 -> 7:00, Saturday, Sunday, December 25
Shut down always – I don’t want this VM online, ever |	0:00 -> 23:59:59

> Please take note these times are based on GMT time zone.

> Once again to emphasize, if you are an Azure developer in Haufe, all you need to do is just simply tag your Resource Groups/Virtual Machines and your machines will shut down and start accordingly.

**But how do you tag a Virtual Machine or Resource Group?**

Simply open your Resource Group/Virtual Machine and on the left-side menu click **Tags** and start tagging as shown below:

![Tag](/images/Tag.PNG)

### Wait for the magic to happen...

Well, this is the easiest part... All you need to do is just wait...

Once the defined schedule triggers the Runbook, your VMs are checked and if the GMT time matches the shutdown time of your VMs they will be simply shut down. 

How do they wake up? The runbook will start your virtual machines on the next schedule if the GMT time falls out of the shutdown time frame in the VM tag. 

Have fun and in case you had questions just leave a comment...

Happy saving cost!

   [here]: <https://automys.com/>
   [script]: </resources/Assert-AutoShutdownSchedule.ps1>
