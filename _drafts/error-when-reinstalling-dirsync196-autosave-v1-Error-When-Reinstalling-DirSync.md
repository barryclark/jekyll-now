---
id: 313
title: 'Error When Reinstalling DirSync'
date: '2022-01-14T21:47:04+00:00'
author: Ryan
layout: revision
guid: 'https://geekyryan.com/?p=313'
permalink: '/?p=313'
---

Today is just not my day! After a failed attempt at installing/configuring DirSync, I removed it and tried to install and configure it again. This time did not prove any more successful. I was getting this error midway through the install process:

<figure class="wp-block-image">[![](https://geekyryan.com/wp-content/uploads/2015/08/1.png)](https://geekyryan.com/wp-content/uploads/2015/08/1.png)</figure>I was able to figure this out after a little while and wanted to sure what I learned. If you are seeing this error message after removing DirSync and trying to reinstall, here’s what you need to do:

• Uninstall Windows Azure Active Directory Sync tool and reboot

<figure class="wp-block-image">[![](https://geekyryan.com/wp-content/uploads/2015/08/2.png)](https://geekyryan.com/wp-content/uploads/2015/08/2.png)</figure>• Remove this directory and all subfolders: C:Program FilesWindows Azure Active Directory Sync

<figure class="wp-block-image">[![](https://geekyryan.com/wp-content/uploads/2015/08/3.png)](https://geekyryan.com/wp-content/uploads/2015/08/3.png)</figure>• If you created a domain account to use for DirSync, remove it. Also remove the Office 365 account you created.  
• Delete the Group accounts that the DirSync wizard created. Their names all begin with “FIM”

<figure class="wp-block-image">[![](https://geekyryan.com/wp-content/uploads/2015/08/4.png)](https://geekyryan.com/wp-content/uploads/2015/08/4.png)</figure>• Uninstall MSSQL  
• Delete the MSSQL directory: C:Program FilesMicrosoft SQL Server  
• Reboot!  
• You should be able to install and configure DirSync now.

<figure class="wp-block-image">[![](https://geekyryan.com/wp-content/uploads/2015/08/5.png)](https://geekyryan.com/wp-content/uploads/2015/08/5.png)</figure>