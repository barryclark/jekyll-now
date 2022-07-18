---
id: 283
title: "The User Profile Service service failed the logon. User Profile Cannot\nbe Loaded."
date: '2022-01-14T19:23:34+00:00'
author: Ryan
layout: revision
guid: 'https://geekyryan.com/?p=283'
permalink: '/?p=283'
---

One of my clients had a really strange issue the other day. He has a domain admin account in his domain and was not able to login to a server that I recently built. The server was an Exchange 2013 box, and was used in Coexistence mode to migrate his company from an Exchange 2007 box.

He was getting this error message when attempting to login:

[![](https://geekyryan.com/wp-content/uploads/2015/12/2015-12-30_09h38_53.png)](https://geekyryan.com/wp-content/uploads/2015/12/2015-12-30_09h38_53.png)

This is a classic error message that I’m sure most technicians have seen before. Usually the resolution is to go into the registry and rename the user profile key to have a “.bak” extension and then do some other magic. However, this time, that was not the case. I looked in the registry and didn’t even see a reg key for his profile. I then looked in the c:users folder and didn’t see a folder for his profile. Strange…

So what exactly was happening? Well, I took a look at the Event Viewer and found this error message:

[![](https://geekyryan.com/wp-content/uploads/2015/12/2015-12-30_09h34_06.png)](https://geekyryan.com/wp-content/uploads/2015/12/2015-12-30_09h34_06.png)

I browsed to the file referenced in the error message and deleted it. Walla! He was able to login with his admin account. I’m not sure why this file was in the default user profile. It has something to do with Customer Experience Improvement Program:

<http://www.nextofwindows.com/what-is-sqmdata-and-sqm-file-in-windows-7-and-how-to-delete-them>