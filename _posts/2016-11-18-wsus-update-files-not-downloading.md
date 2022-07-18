---
id: 154
title: 'WSUS: Update Files Not Downloading (Content File Download Failed)'
date: '2016-11-18T15:13:00+00:00'
author: Ryan
layout: post
guid: 'https://geekyryan.com/?p=154'
permalink: '/?p=154'
categories:
    - Uncategorized
tags:
    - WindowsServer
    - WSUS
---

This article will discuss an issue regarding WSUS failing to download updates from Microsoft Update servers. You may notice that the home page of your WSUS console states that it has downloaded 0MB of updates:

[![](https://geekyryan.com/wp-content/uploads/2016/11/2016-11-18_10h02_21.png)](https://geekyryan.com/wp-content/uploads/2016/11/2016-11-18_10h02_21.png)

You may also see this event (or similar) in the Event Log.

[![](https://geekyryan.com/wp-content/uploads/2016/11/2016-11-15_16h39_32.png)](https://geekyryan.com/wp-content/uploads/2016/11/2016-11-15_16h39_32.png)

This problem is caused by not specifying a valid path when assigning the WSUS content drive when first installing the role. The first time you load the WSUS console after installing the role, you will be prompted to specify the path to store Windows Update files. WSUS does not like to have its content directory be the root of a partition. For example, if I were to specify “e:” as the path for the Windows Update content, the wizard would give you an error message stating that the path is not valid. However, it doesn’t prompt you to re-enter the path if you click close. The WSUS console opens immediately after and that invalid path is where WSUS will try to store your update files. This is and has been a known bug for a while and needs to be addressed by Microsoft. Evidence of the invalid path can be found in the registry under:

HKLMSoftwareMicrosoftUpdate ServicesServerSetupContentDir

[![](https://geekyryan.com/wp-content/uploads/2016/11/2016-11-15_16h39_44.png)](https://geekyryan.com/wp-content/uploads/2016/11/2016-11-15_16h39_44.png)

If you come across this problem, you can change the ContentDir above to a valid path. Keep in mind that it cannot be the root of a partition. You need to specify a drive letter with a subfolder (eg: e:wsus).

[![](https://geekyryan.com/wp-content/uploads/2016/11/2016-12-21_14h54_54.png)](https://geekyryan.com/wp-content/uploads/2016/11/2016-12-21_14h54_54.png)

The other option is to reinstall the WSUS role. If you remove the role, the WID database is not removed, unless you remove that role as well (or manually delete the database). This means that when you reinstall the WSUS role, it will be able to use that same database and any clients that have contacted the WSUS server will immediately show up in the console. The same is true for update metadata. The new WSUS installation will still have the same approvals, denials, etc. as the old installation.

Regardless of what option you choose, I suggest rebooting the server after you make the changes.