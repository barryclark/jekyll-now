---
id: 148
title: 'Azure AD Connect Not Syncing Active Directory Accounts/Passwords'
date: '2017-01-18T14:39:00+00:00'
author: Ryan
layout: post
permalink: '/?p=148'
image: /wp-content/uploads/2017/01/2017-01-18_09h10_36.png
categories:
    - Uncategorized
---

I enabled Azure AD Sync this morning and was surprised to find that none of my AD accounts were syncing. We had AADSync enabled once before, but disabled it due to some issues with our Active Directory environment. This time around, I configured some filtering so that only a few accounts would be synced initially. However, after enabling synchronization, none of the accounts showed up in the Office 365 Portal.

I checked AADSync health in the Office 365 Portal and found this:

[![](https://geekyryan.com/wp-content/uploads/2017/01/2017-01-18_09h10_36.png)](https://geekyryan.com/wp-content/uploads/2017/01/2017-01-18_09h10_36.png)

Microsoft has really improved PowerShell support for AADSync with the latest iteration of it. You can view all of the cmdlets available for AADSync by running:

Get-Command -Module ADSync

After looking through the cmdlets, we can see there is a cmdlet called “Get-AdSyncScheduler”. You may not be able to tell by the name, but this cmdlet will provide details regarding the sync schedule for AADSync.

I ran the cmdlet and got the following output:

[![](https://geekyryan.com/wp-content/uploads/2017/01/2017-01-18_09h12_07.png)](https://geekyryan.com/wp-content/uploads/2017/01/2017-01-18_09h12_07.png)

I found it a bit strange that the “SyncCycleEnabled” object was False, though I had enabled synchronization through the AADSync wizard. I used the “Set-AdSyncScheduler” to change this value to True:

[![](https://geekyryan.com/wp-content/uploads/2017/01/2017-01-18_09h13_41.png)](https://geekyryan.com/wp-content/uploads/2017/01/2017-01-18_09h13_41.png)

I then started a full synchronization by type:

Start-AdSyncSyncCycle -PolicyType Initial

After waiting a few minutes, I checked the portal again and verified the synced accounts were there. You can also check the status of AADSync health by going to “Health &gt; Directory Sync Status” in the Office 365 Portal:

[![](https://geekyryan.com/wp-content/uploads/2017/01/2017-01-18_09h15_11.png)](https://geekyryan.com/wp-content/uploads/2017/01/2017-01-18_09h15_11.png)

Microsoft is also adding some AADSync Health Monitoring to the Azure Portal, though this feature is still in preview.

You can get more info on the PowerShell cmdlets used in the article here:

[Azure AD Connect sync: Scheduler](https://docs.microsoft.com/en-us/azure/active-directory/connect/active-directory-aadconnectsync-feature-scheduler)