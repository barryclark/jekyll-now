---
layout: post
title: Amazon WorkSpaces - Introduction to Desktop as a Service (DaaS)
---
## Introduction - What is Desktop as a Service (DaaS) ##

Desktop as a Service (DaaS) provides desktop services via a public or private cloud service. It is essential a virtual desktop infrastructure (VDI) that a third party provider manages. The third party service provider assumes the responsibility for managing the desktop infrastructure. The DaaS on offer from AWS is called Amazon WorkSpaces. In this post I’m going to discuss some of WorkSpaces features and benefits. After that I will walk you through how to get started with WorkSpaces in your account.

## Advantages of Desktop as a Service (DaaS) ##

Desktop as a Service (DaaS) offers some clear advantages over a traditional desktop model. Below are some of the benefits of **DaaS:**

* **Faster deployment and decommissioning of active end users:** The desktop is already configured, it just needs to be connected to a new user. For businesses that consistently experience spikes and drops in demand or employees, DaaS can save a lot of time and money.

* **Cost savings:** There is no CAPEX investment required and is on a monthly subscription basis.

* **Increased device flexibility:** It runs on a variety of operating systems and device types.

* **Enhanced security:** The data is stored in the cloud alongside the desktop therefore the security risks are considerably lower. A DaaS device cannot be stolen. If a laptop or mobile device used to connect to DaaS is stolen none of the data lives on that stolen device, the risk of a thief accessing sensitive data is minimal. Security patches and updates are also easier to install in a DaaS environment and can be the responsibility of the cloud provider if required.

## Amazon WorkSpaces ##

Amazon WorkSpaces is a fully managed desktop virtualization service for Windows and Linux that enables you to access resources from any supported device. It provides the flexibility to pay for monthly or hourly usage which is in turn billed monthly. With monthly billing, you pay a fixed monthly fee for unlimited usage during the month. This is suited to workers who use their Amazon WorkSpace on a full time basis.

With hourly billing, you pay a small fixed monthly fee per WorkSpace to cover infrastructure costs and storage, and a low hourly rate for each hour of running during the month. Hourly billing works best when the desktop is used on average for less than a full working day or for just a few days a month. It is ideal for disaster recovery, part-time workers, short-term projects, training, and education.

## Amazon WorkSpaces - Requirements ##
The Amazon Workspaces service requires three components to deploy successfully:

* WorkSpaces client application — An Amazon Workspaces-supported client device.

* A directory service to authenticate users and provide access to their WorkSpace. WorkSpaces currently works with AWS Directory Service and Microsoft AD It is possible to use on-premises AD server with AWS Directory Service to support existing enterprise user credentials with Amazon WorkSpaces.

* Amazon Virtual Private Cloud (Amazon VPC) in which to deploy Amazon WorkSpaces. A minimum of two subnets is required for an Amazon Workspaces deployment because each AWS Directory Service construct requires two subnets in a Multi-AZ deployment.

## Amazon WorkSpaces - Connecting ##

A user can connect to a WorkSpace from any supported device using the free Amazon WorkSpaces client application on supported devices including Windows and Mac computers, tablets or using Chrome and/or Firefox browsers. They will connect using credentials set up by an administrator or using their existing Active Directory credentials if you’ve chosen to integrate your Amazon WorkSpaces with an existing Active Directory domain. Once the user is connected to a WorkSpace they can perform all the usual tasks they would do on a desktop computer.

## Amazon WorkSpaces - Streaming Protocols ##

Amazon WorkSpaces supports two protocols: PCoIP and WorkSpaces Streaming Protocol (WSP). The protocol that you choose depends on several factors, such as the type of devices your users will be accessing their WorkSpaces from, which operating system is on your WorkSpaces, what network conditions your users will be facing, and whether your users require bidirectional video support.

**PCoIP Use Cases:**

* Leveraging iPad, Android, or Linux clients to connect to WorkSpaces.

* Using Teradici zero client devices.

* Will use GPU-based bundles (Graphics or GraphicsPro).

* Need to use a Linux bundle for non-smart card use cases.

* Deploying WorkSpaces in the China (Ningxia) Region.

**WSP Use Cases:**

* Requirement for higher loss/latency tolerance to support end user network conditions. For example users who are accessing their WorkSpaces across large distances or using unreliable networks.

* Your end users to authenticate with smart cards or to use smart cards in-session.

* Requirement for webcam support capabilities in-session.

* Requirement for web access with the Windows Server 2019-powered WorkSpaces bundle.

## Amazon WorkSpaces - Which Region

At the time of writing WorkSpaces is available in 12 regions around the Globe. There is web tool that can be used to report on Round Trip Time and Speed Rating. It is a good idea to run this from several end users devices before deploying to determine the right region. [Amazon Work Health Check](https://clients.amazonworkspaces.com/Health.html)

![_config.yml]({{ site.baseurl }}/images/blog/Amazon-WorkSpaces-Intro/BlogImage1.png)

## How to create an Amazon WorkSpace ##

I'm now going to walk you through how to create a WorkSpace. Login into the AWS Management Console, you can either search for WorkSpaces or locate it under End User Computing under All Services.

![_config.yml]({{ site.baseurl }}/images/blog/Amazon-WorkSpaces-Intro/BlogImage2.png)

![_config.yml]({{ site.baseurl }}/images/blog/Amazon-WorkSpaces-Intro/BlogImage3.png)

Click on Get Started Now.

![_config.yml]({{ site.baseurl }}/images/blog/Amazon-WorkSpaces-Intro/BlogImage4.png)

I will walk you through the Advanced Setup where we will leverage Simple AD Directory service instead of full Active Directory. Click on the Launch Button beside Advanced.

**N.B you will need a VPC with one public subnet and two private subnets which are in different availability zones to follow along.**

![_config.yml]({{ site.baseurl }}/images/blog/Amazon-WorkSpaces-Intro/BlogImage5.png)

Directory Services will launch. You want to select Simple AD and then click Next.

[_config.yml]({{ site.baseurl }}/images/blog/Amazon-WorkSpaces-Intro/BlogImage6.png)

Select Small directory, gave it a name as well as a DNS name. The DNS name does not need to be publically resolveable.

[_config.yml]({{ site.baseurl }}/images/blog/Amazon-WorkSpaces-Intro/BlogImage7.png)

Enter the local administrator password and description for the directory. Then click Next.

[_config.yml]({{ site.baseurl }}/images/blog/Amazon-WorkSpaces-Intro/BlogImage8.png)

Next select the relevant VPC and private subnets. If you have existing directory service in a shared services account, it is best practice to peer that VPC with your new WorkSpaces VPC.

[_config.yml]({{ site.baseurl }}/images/blog/Amazon-WorkSpaces-Intro/BlogImage9.png)

Review the configuration and then select Create Directory.

[_config.yml]({{ site.baseurl }}/images/blog/Amazon-WorkSpaces-Intro/BlogImage10.png)

Once the directory is finished creating it will show similar to below in WorkSpaces. Before we can use the directory it must be registered. Select the directory and click on Actions then Register

[_config.yml]({{ site.baseurl }}/images/blog/Amazon-WorkSpaces-Intro/BlogImage11.png)

Select your two private subnets and if you want to enable Self-Service and WorkDocs. Then click on Register. The status of the directory will change to Active and Yes.

[_config.yml]({{ site.baseurl }}/images/blog/Amazon-WorkSpaces-Intro/BlogImage12.png)

Next go to WorkSpaces and click Launch WorkSpaces.

[_config.yml]({{ site.baseurl }}/images/blog/Amazon-WorkSpaces-Intro/BlogImage13.png)

You want to select the directory from the dropdown that contains the users you want to use. Click on the Next Step and the users screen will open where we can add new users to the Directory or select existing users from the Directory.

[_config.yml]({{ site.baseurl }}/images/blog/Amazon-WorkSpaces-Intro/BlogImage14.png)

[_config.yml]({{ site.baseurl }}/images/blog/Amazon-WorkSpaces-Intro/BlogImage15.png)

Once you have selected the users, click Next Step.

[_config.yml]({{ site.baseurl }}/images/blog/Amazon-WorkSpaces-Intro/BlogImage16.png)

Select the WorkSpace operating system, CPU and memory requirements to match your needs.

[_config.yml]({{ site.baseurl }}/images/blog/Amazon-WorkSpaces-Intro/BlogImage17.png)

Modify the root volume and user volume to your needs or keep the default. Click on Next Step to Continue.

[_config.yml]({{ site.baseurl }}/images/blog/Amazon-WorkSpaces-Intro/BlogImage18.png)

Select the type of billing you require and turn on encryption for root and user volumes. **N.B If turning on encryption select /alias/aws/workspaces or you will get error that users cannot access the key.**

[_config.yml]({{ site.baseurl }}/images/blog/Amazon-WorkSpaces-Intro/BlogImage19.png)

Review configuration and click on Launch WorkSpaces to create the individual WorkSpace.

[_config.yml]({{ site.baseurl }}/images/blog/Amazon-WorkSpaces-Intro/BlogImage20.png)

That is all there is to creating the WorkSpace. The users will receive an email with instructions on where to download the WorkSpaces client and how to connect once the WorkSpace has been provisioned.


**N.B Delete all WorkSpace created, once finished testing. Also deregister the Directory Service, remove the WorkDocs association if you enabled before you delete the Simple AD to stop incurring unnecessary costs.**

## Conclusion ##

Amazon WorkSpaces is an easy to use Desktop as a Service (DaaS). It has a number of use cases such as facilitating remote work or the ability to run powerful GPU applications. Many organisations have adopted WorkSpaces during the pandemic as it allowed them move to remote work swiftly where they may not have been setup for remote work previously. In the next post will show you how to customise the image to include custom apps or configurations within WorkSpaces.
