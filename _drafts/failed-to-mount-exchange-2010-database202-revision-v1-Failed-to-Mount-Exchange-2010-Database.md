---
id: 291
title: 'Failed to Mount Exchange 2010 Database'
date: '2022-01-14T19:23:34+00:00'
author: Ryan
layout: revision
guid: 'https://geekyryan.com/?p=291'
permalink: '/?p=291'
---

<span style="font-family: "arial" , "helvetica" , sans-serif;">Recently, one of my users’ came to me and said he was missing two months worth of email. This was just after migrating to Exchange Online. We were using Exchange 2010 with System Center DPM for backups.</span>

<span style="font-family: "arial" , "helvetica" , sans-serif;"></span>

<span style="font-family: "arial" , "helvetica" , sans-serif;">I restored the database that the users’ mailbox was on from a backup then copied it over to the Exchange server from the network share I restored it to. All was going well, until I tried to mount the darn thing. </span>

<span style="font-family: "arial" , "helvetica" , sans-serif;">I was getting this error and could not for the life of me decry-pt the meaning of it. There is obviously some type of IO issue/file not found. But what could it be?</span>

[<span style="font-family: "arial" , "helvetica" , sans-serif;">![](https://geekyryan.com/wp-content/uploads/2015/08/1-1.png)</span>](https://geekyryan.com/wp-content/uploads/2015/08/1-1.png)

<span style="font-family: "arial" , "helvetica" , sans-serif;">I figured I’d better kick this one off with some basic troubleshooting. First, I checked the health of the database and made sure it was clean. Passed that test… </span>

[<span style="font-family: "arial" , "helvetica" , sans-serif;">![](https://geekyryan.com/wp-content/uploads/2015/08/2-1.png)</span>](https://geekyryan.com/wp-content/uploads/2015/08/2-1.png)

<span style="font-family: "arial" , "helvetica" , sans-serif;">Then ran a repair on the database, to no avail. </span>

[<span style="font-family: "arial" , "helvetica" , sans-serif;">![](https://geekyryan.com/wp-content/uploads/2015/08/3-1.png)</span>](https://geekyryan.com/wp-content/uploads/2015/08/3-1.png)

<span style="font-family: "arial" , "helvetica" , sans-serif;">After racking my brain for a good thirty minutes, and a few failed Google searches, I found the solution. It was so simple! I created the log file directory in the folder with the database, and voila, the database mounted without a single error! </span>

[<span style="font-family: "arial" , "helvetica" , sans-serif;">![](https://geekyryan.com/wp-content/uploads/2015/08/7.png)</span>](https://geekyryan.com/wp-content/uploads/2015/08/7.png)

<span style="font-family: "arial" , "helvetica" , sans-serif;">[![](https://geekyryan.com/wp-content/uploads/2015/08/4-1.png)](https://geekyryan.com/wp-content/uploads/2015/08/4-1.png)[![](https://geekyryan.com/wp-content/uploads/2015/08/5-1.png)](https://geekyryan.com/wp-content/uploads/2015/08/5-1.png)</span>

<span style="font-family: "arial" , "helvetica" , sans-serif;">I was able to see the ‘supposed’ location of the log file by opening the Exchange Management Shell and running the ‘Get-MailboxDatabase’ cmdlet, like so:</span>

<span style="font-family: "arial" , "helvetica" , sans-serif;">*Get-MailBoxDatabase –Identity &lt;Recovery DB Name&gt; | FL Name, ServerName, EDBFilePath, LogFolderPath*</span>

[<span style="font-family: "arial" , "helvetica" , sans-serif;">![](https://geekyryan.com/wp-content/uploads/2015/08/6.png)</span>](https://geekyryan.com/wp-content/uploads/2015/08/6.png)

<span style="font-family: "arial" , "helvetica" , sans-serif;"> </span>

<span style="font-family: "arial" , "helvetica" , sans-serif;">I’m not sure why the database mounting process isn’t capable of creating the log file directory… I think Microsoft would have thought and planned for a situation like this. Hope this helps!</span>