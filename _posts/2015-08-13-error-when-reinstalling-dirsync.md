---
id: 196
title: 'Error When Reinstalling DirSync'
date: '2015-08-13T18:59:00+00:00'
author: Ryan
layout: post
guid: 'https://geekyryan.com/?p=196'
permalink: '/?p=196'
gd_system_blocks_used:
    - '{"core/paragraph":6,"core/image":5}'
categories:
    - Uncategorized
tags:
    - azure
    - Office365
    - WindowsServer
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