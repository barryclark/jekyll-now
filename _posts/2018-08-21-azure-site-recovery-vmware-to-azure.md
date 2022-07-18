---
id: 103
title: 'Azure Site Recovery &#8211; VMware-to-Azure: Wrong IP address discovered for VM'
date: '2018-08-21T17:26:00+00:00'
author: Ryan
layout: post
guid: 'https://geekyryan.com/?p=103'
permalink: '/?p=103'
categories:
    - Uncategorized
tags:
    - azure
    - vmware
---

When replicating virtual machines from VMware to Azure using Site Recovery, you may encounter an issue where the Configuration server discovers the wrong IP address for a VM. This can be caused by stale entries within the <span style="background: white; color: #333333; font-family: "Segoe UI",sans-serif; font-size: 10.5pt; line-height: 107%;">infrastructurevms</span> MySQL table that is used by ASR to track VM attributes.

To resolve this issue, you first need to disable replication for the VM in the Azure Portal.

[![](https://geekyryan.com/wp-content/uploads/2018/08/2018-08-21_13h20_26.png)](https://geekyryan.com/wp-content/uploads/2018/08/2018-08-21_13h20_26.png)

Next, login to your ASR Configuration Server and open a CMD prompt as administrator. Browse to the bin directory for your ASR installation. For example, in my case ASR is installed on the E: partition under the following directory:

E:Program Files (x86)Microsoft Azure Site Recoveryhomesvsystemsbin

Type in this command to remove the VM from the ASR database (replace IP address with the IP of your VM):

<span style="color: #2a2a2a; font-family: "Segoe UI",sans-serif; font-size: 9.0pt;">**perl Unregister-ASRComponent.pl -IPAddress 10.0.0.4 -Component Source**</span>

That’s it. You should now be able to reconfigure replication for the VM, and ASR will discover the correct info about the VM.