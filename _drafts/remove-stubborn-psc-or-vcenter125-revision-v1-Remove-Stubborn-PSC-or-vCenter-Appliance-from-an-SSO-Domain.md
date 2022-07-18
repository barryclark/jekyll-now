---
id: 315
title: 'Remove Stubborn PSC or vCenter Appliance from an SSO Domain'
date: '2022-01-14T21:49:35+00:00'
author: Ryan
layout: revision
guid: 'https://geekyryan.com/?p=315'
permalink: '/?p=315'
---

While attempting to decommission one of our vCenter sites, I ran into an issue removing one of the PSCs. This site consisted of two PSCs and one vCenter appliance. I removed the first PSC from the SSO domain successfully, and then removed the vCenter appliance. Things became a little tricky during the removal of the final PSC. This PSC did not get removed even after running the cmsso-util command. This article will detail the steps I took in decommissioning the site, as well as removing the stubborn PSC.

First, we need to check if vCenter is currently using the PSC we plan on decommissioning. If it is, we need to use the cmsso-util command to redirect vCenter to a different PSC. Instructions for redirecting vCenter can be found here: [https://kb.vmware.com/s/article/2113917?language=en\_US](https://kb.vmware.com/s/article/2113917?language=en_US)

To check what PSC your vCSA is currently pointing to, browse to the Advanced Settings for the vCSA in the vSphere Web Client. Filter by this key: config.vpxd.sso.admin.uri

To remove a PSC or vCSA from an SSO domain, connect to a PSC via SSH and run these commands:

To remove a PSC from the vSphere SSO domain:

*cmsso-util unregister –node-pnid psc01.ad.vcplab.local –username administrator@your\_domain\_name –passwd vCenter\_Single\_Sign\_On\_password*

To remove a vCSA from the vSphere SSO domain:

*cmsso-util unregister –node-pnid vcsa.ad.vcplab.local –username administrator@your\_domain\_name –passwd vCenter\_Single\_Sign\_On\_password*

After running these commands, delete the virtual appliances. You can also verify the appliances have been removed by browsing to Administration &gt; System Configuration &gt; Nodes in the vSphere Web Client.

If cmsso-util fails to remove any of the nodes, you can use this command to force the removal:

*vdcleavefed -h vcsa.ad.vcplab.local -u Administrator -w Passw0rd!*

Upon successful completion, you should see something like this:

*/usr/lib/vmware-vmdir/bin/vdcleavefed -h vcsa.ad.vcplab.local -u administrator*  
 *password:*  
 *vdcleavefd offline for server vcsa.ad.vcplab.local*  
 *Leave federation cleanup done*

When specifying the username, use the SSO admin (administrator). However, do not use the full UPN (<administrator@vsphere.local>). Doing so will cause the command to fail.