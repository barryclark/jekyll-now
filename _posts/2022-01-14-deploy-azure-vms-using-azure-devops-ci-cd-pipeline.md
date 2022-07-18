---
id: 43
title: 'Deploy Azure VMs Using Azure Devops CI/CD Pipeline'
date: '2022-01-14T18:46:35+00:00'
author: Ryan
layout: post
guid: 'https://geekyryan.com/?p=43'
permalink: '/?p=43'
gd_system_blocks_used:
    - '{"core/paragraph":23,"core/list":1}'
categories:
    - Uncategorized
tags:
    - azure
    - devops
---

This article assumes that you have already created a pipeline in Azure Devops and have it linked to an Azure Devops repo. You will need to create a variable named $vmpassword and assign it the value stored in your key vault.

To create a release pipeline that will automatically create a VM (using the password stored in key vault for the local administrator account), do the following:

1. Create a new release pipeline

![](https://www.geekyryan.com/content/images/2021/01/image-13.png)

3\. In the “select a template” box, choose “Empty Job”![](https://www.geekyryan.com/content/images/2021/01/image-14.png)

4\. Select “Tasks” in the navigation bar, and then select the appropriate stage. For simplicities sake, we will be using 1 stage within this release.![](https://www.geekyryan.com/content/images/2021/01/image-15.png)

5\. Click on the “+” in the Agent job bar, and then in the “Add tasks” section, type in “Key Vault”. Click “Azure Key Vault” and then click “Add”. ![](https://www.geekyryan.com/content/images/2021/01/image-16.png)

6\. Click on the “Azure Key Vault:” task to configure it. Select your subscription, Key Vault, and the secrets filter. You can also create the $vmpassword variable as a variable within your devops project, rather than assigning it as a secret filter for the release. ![](https://www.geekyryan.com/content/images/2021/01/image-20.png)

7\. In your Key Vault, you need to grant the devops account access to the Key Vault. To do this, go to your Key Vault and create a new access policy. This policy will be assigned to a service principal that is being used by your Azure Devops project. To find the ID of this service principal, go to your project settings, and under “Pipelines”, click on “Service Connections”. Then select the service connection that resembles your subscription. After doing this, click “Manage Service Principal”. In the service principal window, click “Manifest” and then find the “name” tag within the JSON.![](https://www.geekyryan.com/content/images/2021/01/image-19.png)

8\. Now go back to your key vault, and assign an access policy for this service principal. Grant the principal read and list for secrets.

9\. Add another agent job for the task (see step 6) and search for “azure cli”. Click on “Add” for Azure CLI. Configure the settings for this job as below:![](https://www.geekyryan.com/content/images/2021/01/image-18.png)

10\. Save and run your pipeline. Give it some time to complete, and go take a look at your newly created VM. This is just a very simple example of creating a server as part of a CI/CD pipeline. You can then deploy your code to it, run some tests, destroy them VM, etc. Completely automated.![](https://www.geekyryan.com/content/images/2021/01/image-21.png)