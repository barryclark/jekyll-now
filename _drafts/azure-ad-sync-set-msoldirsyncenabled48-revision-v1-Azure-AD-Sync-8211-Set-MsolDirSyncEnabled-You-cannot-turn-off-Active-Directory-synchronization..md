---
id: 321
title: 'Azure AD Sync &#8211; Set-MsolDirSyncEnabled : You cannot turn off Active Directory synchronization.'
date: '2022-01-14T21:56:41+00:00'
author: Ryan
layout: revision
guid: 'https://geekyryan.com/?p=321'
permalink: '/?p=321'
---

 I recently ran into a situation in my lab environment that required I resync all (2000+) user accounts to Azure AD. Though this sounds complex and daunting, its actually quite simple. T

he basic steps involve disabling sync, and then removing the user objects. This can all be done with two PowerShell commands:

1\) Set-MsolDirSyncEnabled -EnableDirSync $false

<span> </span>

[![](https://geekyryan.com/wp-content/uploads/2020/11/image.png)](https://lh3.googleusercontent.com/-rGK18FXw7ns/X7_WthQR0CI/AAAAAAAAyCM/gg7MsY2fcVIcWMMbvxYzPpbpPyKwgHP8ACLcBGAsYHQ/image.png)

2\) Get-MsolUser -All | Remove-MsolUser -force

<span> </span>

[![](https://geekyryan.com/wp-content/uploads/2020/11/image-1.png)](https://lh3.googleusercontent.com/-miyfN7OISGo/X7_WzDCc6iI/AAAAAAAAyCQ/PtHURTTVMQ4uypzO7L1UaLfyEs0fpYGdACLcBGAsYHQ/image.png)

The account that you are currently running the commands as will not be removed.

To enable Azure AD Sync, you simply reverse the boolean operation on the Set-MsolDirSyncEnabled cmdlet above. However, I ran into an issue when trying to enable Azure AD Sync.

[![](https://geekyryan.com/wp-content/uploads/2020/11/image-2.png)](https://lh3.googleusercontent.com/-R1TPVgYaEBE/X7_XM5_ljKI/AAAAAAAAyCY/VIJZnlgNEPQbhL9p3D0J3XsekBrGiNS3QCLcBGAsYHQ/image.png)

After some research, it turns out you must wait a period of time (up to 12 hours in some cases) before you can make a second change to the Azure AD Sync status. This error simply means that we made a recent change to Azure AD Sync, and we must wait before making another change. To prove this, there is a “DirectorySynchronizationStatus” member for the Get-MsolCompanyInformation cmdlet. If we take a look at this member, we can see the status is “PendingDisabled”.

[![](https://geekyryan.com/wp-content/uploads/2020/11/image-3.png)](https://lh3.googleusercontent.com/-0OBwKDDD5xQ/X7_X1bBxXjI/AAAAAAAAyCk/FyRlaMpCDT4aBe08TL_8sLiwUBnHkcPJQCLcBGAsYHQ/image.png)

Check the status of this periodically over the next 12 hours or so, and once it says “Enabled” or “Disabled”, you should be able to change the state once more.