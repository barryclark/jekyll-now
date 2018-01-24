---
layout: post
title: Save cost on AWS using Roham
subtitle: Automate stop/start/termination of your EC2 Instances based on schedule tags
category: dev
tags: [howto, cloud, devops]
author: Esmaeil Sarabadani
author_email: esmaeil.sarabadani@haufe-lexware.com
header-img: "images/new/Exportiert_42.jpg"
---

<p align="center">
  <img width="200" height="200" src="https://github.com/esarabadani/Roham/blob/master/Images/Roham_Logo.png">
</p>
<p align="center"> Roham GitHub Repo: https://github.com/esarabadani/Roham </p> 

# What is Roham?
Roham saves you cost on AWS by stopping/terminating/starting Instances on schedules defined by you. Roham gives you these benefits:

  - It helps you to stop/start/terminate EC2 Instances based on schedule tags
  - Schedule tags follow cron expressions in Linux which are simple to learn
  - It can be implemented across different AWS accounts to be manage centrally
  - Roham can create tags on your EC2 Instances automatically in case people forget to
  - It is a free open-source project and costs you almost nothing on AWS
  - It is simple to implement by just following the implementation guide

> The word 'Roham' refers to a well-known hero in Persian legends. It also literally means 'undefeatable'. 

# Why did we develop Roham?
Like many other enterprises we also have the problem of having too many unneeded EC2 Instances which are simply forgotten to be stopped/terminated in different AWS Accounts and simply account for nearly 30% (if not more) of the total cost we pay in the cloud. So it is clear that we need a way to automatically find such Instances and terminate/stop them.

If you simply search for such tools, you will probably come across many, but the problem is they are either too complicated to understand/implement, or they simply do not fit into our environment. So we decided to create our own tool to fix the problem. It has been tried to provide a complete documentation on how it works and should be implemented. In case you still have questions about it, please do not hesitate to leave a comment and simply ask. 

# Architecture and Components
Roham consists of the following Lambda functions which are written in Python:

  - **Roham Tagger**: It automatically tags EC2 Instances to stop/terminate on a schedule in case they are not properly tagged. 
  - **Roham Terminator**: It terminates EC2 Instances which are tagged to terminate. 
  - **Roham Stopper**: It stops (shuts down) EC2 instances which are tagged to stop at a specified time. 
  - **Roham Starter**: It starts EC2 instances which are tagged to start at a specified time. 
  
> These four Lambda functions above are independent of one another and could be independently enabled/disabled, even though it is best to enable all of them together to get the best cost-saving results.  

Our recommendation is to create a central Shared Services AWS Account and create/import these Lambda functions there and then control tagging/termination/stop/start of your EC2 Instances in all your other AWS project Accounts. The diagram below shows the big picture:

<p align="center">
  <img width="450" height="652" src="https://github.com/esarabadani/Roham/blob/master/Images/big-picture.png">
</p>

The diagram and the steps below show how Roham (in this case Roham Stopper) works across AWS Accounts and takes actions on EC2 Instances:

<p align="center">
  <img width="824" height="363" src="https://github.com/esarabadani/Roham/blob/master/Images/small-picture.png">
</p>

  1. CloudWatch Event triggers the SNS Topic and passes the IAM Role ARN to it. 
  2. SNS Topic publishes a message to Roham Stopper Lambda function (in the Shared Services AWS Account) and passes the IAM Role ARN as a message to it.
  3. Roham Stopper Lambda function assumes the given IAM Role (in the Project1 Account)
  4. Request for Role assumption is accepted and Rohan Stopper is allowed to take actions on EC2 Instances.
  5. Roham Stopper reads and interprets the tags on the Instances and takes actions accordingly. 
  
> The same concept in the steps above applies to the other three Lambda functions. This means every project AWS Account will have a separate CloudWatch Rule and a separate SNS Topic for each Lambda function. Please see the diagram below:

<p align="center">
  <img width="824" height="363" src="https://github.com/esarabadani/Roham/blob/master/Images/Account_Resources_View.png">
</p>

# Implementation
There is a complete step-by-step guide on how to implement Roham in your AWS environment here [on this page](http://thebluenode.com/roham).

# Tagging Scheme
Once you follow the steps in the implementation guide and everything is done, now it is time to tag your EC2 Instances. Please follow the tagging scheme in the table below:
  
| Tag Key | Tag Value | Definition |
| :---: | :---: | ------ |
| toterminate | yes | The EC2 Instance will be terminated when the respective CloudWatch Event is triggered |
| toterminate | no | The EC2 Instance will never be terminated |
| tostop | no | The EC2 Instance will never be stopped |
| tostop | cron expression | The EC2 Instance will stop at the specified time represented by the cron expression |
| weekendstop | yes | The EC2 Instance will stop on Saturday at 00:00 |
| weekendstop | no | The EC2 Instance will not stop on the weekend |
| tostart | cron expression | The EC2 Instance will start at the specified time represented by the cron expression |

## Cron Expression
Cron expression is a string of characters representing a schedule. Please take note there are different definitions of cron expressions in different libraries which means a cron expression which is valid on a system may not be identified as valid by Roham. Roham only identifies the cron expressions which are defined by the Croniter Python library. 
The table below briefly explains how you need to format your cron expression to represent a valid schedule:
  
|  | Minute | Hour | Day of Month | Month | Day of Week | 
|:---:|:---:|:---:| :---:| :---:| :---:|
| **Possible Values** | 0-59 | 0-23 | 1-31 | 1-12 OR jan-dec | 1-7 OR mon-sun |

### Other possible characters

| Character | Definition |
|:---:|:---|
| Comma (,) | Commas are used to separate items of a list. For example, using "mon,wed,fri" in the 5th field (day of week) means Mondays, Wednesdays and Fridays. |
| Hyphen (-) | Hyphens define ranges. For example, mon-fri means from Monday to Friday |
| Asterisk (*) | Asterisks are used to select all values within a field. For example, * in the Month field means ?every month? |

Now let's see some example expressions and their definitions:
  
| Expression | Minute | Hour | Day of Month | Month | Day of Week | Definition |
|:---:|:---:|:---:| :---:| :---:| :---:| :---:|
| 0 18 * * mon-fri | 0 | 18 | * | * | mon-fri | Every day from Monday to Friday at 18:00 |
| 30 7 20 2 * | 30 | 7 | 20 | 2 | * | On February 20th at 7:30 AM |
| 30 23 * * 5 | 30 | 23 | * | * | 5 | On this coming Friday at 23:30 |

> Please take note the Python code in Roham evaluates these cron expressions against the GMT time. The use of slashes (/) is also prohibited in your cron expression.

> It is also important to know in case your cron expression is invalid, the cron tagger will override it with a default value.  
