---
layout: post
title: Installing Snapshot client in Windows
date: '2012-08-22 16:00:00'
---

In this tutorial, we will be installing the Snapshot Client Tool downloaded from Behind The Blackboard and installing it on your machine. Yeah! you don't actually need to have any type of server in order to install this tool to use it against your server. So follow the following steps and hopefully you will be having it working in no time.

### What we will be doing:
Create the installation in a Windows Environment, then continue with simple configuration changes to perform basic troubleshooting steps and list the most common issues of the configuration or the case scenarios.

#### Before you begin
The Snapshot *tool* is a client that can be installed on a Windows / Linux / RedHat computers.
When you are going to install this tool on your computer or server, it is **required** that the version that you are installing is the same version as your current Blackboard Learn.

If you don’t know what version you currently have, you can ask your Support Engineer.
The Blackboard installation (your Blackboard environment) has this tool already installed on the servers. You can’t use it directly because of security issues of accessing the backend of the server, that is why we are installing it on your computer with the following steps.

---
**IMPORTANT NOTE:** _If your Blackboard Learn is upgraded, you will need to upgrade your snapshot tool client._

---

### Requirements
1. Before getting the installer, please get a **Blackboard License.**
1.1 This can be requested by creating a Behind the Blackboard ticket or using a copy of the one used for a hosted environment.
1.2 The license is needed to perform the installation, so have it available before proceeding.
2. **Get the snapshot** client tool from Behind the Blackboard by doing the following:
2.1 Login
2.2 Click on Downloads
2.3 Click Support Tools
2.4. Search for the specific Blackboard version and operating system.
2.5 In this example, download 9.1 SP7 HF1 Client Snapshot for Windows *bb-client-windows-9.1.70081.25.jar*
2.6 The file will now be on the computer or server.

### Installation
1. Double click the downloaded file to start the installer. The following image will appear ![Step 1](/content/images/2013/Nov/1.png)
2. Click Next
3. It will ask where to install the Blackboard tool. For this example, please install it in the C: directory in the top level as shown below. ![Step 2](/content/images/2013/Nov/2.png)
4. Click Next
5. It will ask what type of installation to do. In this example, the only option is Full Installation because there is nothing installed in the system in that particular folder. ![Step 3](/content/images/2013/Nov/3.png)
6. Click Next</li>
7. It will then prompt to accept terms and conditions. ![Step 4](/content/images/2013/Nov/4.png)
8. Click Next
9. It will next ask for the Blackboard license. Browse to find and attach the license. ![Step 5](/content/images/2013/Nov/5.png)
10. Click Next.
11. You will be prompted to select where is installed Java. This is auto populated but in most cases is not in that location where is installed. NOTE: The Java folder and jre folder needs to be picked. The following two images will show the default and what was used for this example.
11.1. Default directory ![Step 6 no](/content/images/2013/Nov/6_no.png)
11.2. For this example, java location picked: ![Step 6 yes](/content/images/2013/Nov/6_yes.png)
11.3. Click Next
12. Next it will show options on how to connect to the system. In this example, we are using SOAP (a protocol to connect to your system) so replace the defaults with the word **NONE** (with no quotes) in every field.
12.1. Default:
![Step 7 no](/content/images/2013/Nov/7_no.png)
12.2. With fields replaced:
![Step 7 yes](/content/images/2013/Nov/7_yes.png)
12.3. Click Next.
13. A Validation warning may appear because of how we needed to fill in the fields for a SOAP connection. Click OK. ![Step 8 Alert 1](/content/images/2013/Nov/8_alert1.png)
14. Click OK to continue to ignore these warning. ![Step 8 Alert 2](/content/images/2013/Nov/8_alert2.png)
15. Now a confirmation message will appear![Step 9](/content/images/2013/Nov/9.png)
16. Click Next for other Validation warnings like below that appear because of the fields for SOAP. ![Step 10 Alert 1](/content/images/2013/Nov/10_alert1.png)
17. Click Ok
18. A final warning will appear ![Step 10 Alert 2](/content/images/2013/Nov/10_alert2.png)
19. It will run and then display the message below that it is completed.
![Step 11](/content/images/2013/Nov/11_final.png)

### Troubleshooting
**Q:** When I was installing the tool, I got the following error:
![Error 1](/content/images/2013/Nov/error1.png)
**A:** This error message states that for some reason the tool is trying to analyze my IIS and stating that the port 80 is already in use. The simple fix is to shut down IIS. _To correct this issue there are two options:_

#### Option 1
1. This can be done from the IIS Manager. If you don’t have IIS installed, install it by going into the Control Panel -&gt; Installed Tools and seek to install it with your Windows Cds.
2. Once you have IIS installed, you will open Windows Start and search for the IIS Manager, in my case is version 6.0. It will look like the image below.
3. ![Error 1 Solution 1](/content/images/2013/Nov/solution_error1.png)
On the far right you will have the option to Stop or Restart the server. In this specific case we want it to be **stopped.**

_If you get this port 80 error message, the installation would have stopped so you will need to Stop the Server and then start running the installer again._

#### Option 2

Also, if this is the case, you can uncompressed the jar file and seek for the **port 80** in the **bb-config.properties** file and then just change it to something else, this will prevent the system from asking that port when its even not being used.