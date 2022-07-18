---
id: 41
title: 'Azure Devops &#8211; Self Hosted Agent Service Won&#8217;t Start &#8211; Incorrect Function'
date: '2022-01-14T18:45:00+00:00'
author: Ryan
layout: post
guid: 'https://geekyryan.com/?p=41'
permalink: '/?p=41'
gd_system_blocks_used:
    - '{"core/paragraph":25,"core/list":1}'
categories:
    - Uncategorized
tags:
    - azure
    - devops
---

I setup a self hosted agent for Azure Devops this morning on Server 2012 R2 (legacy Visual Studio dependencies…) and found that I was unable to start the service. The error I received was “Error 1 Incorrect Function” when attempting to start the service in services.msc.

I was attempting to run the agent from within my user profile downloads folder. I originally was not aware the service would be running from this directory. I thought it would copy its binary files to program files directory or programdata, like 99% of all other apps. The service installs and attempts to run itself as the “network service” authority. This account does not have permission to a user profile folder by default, and the installation script is not able to grant it permission for some reason (I didn’t investigate this further). I removed the agent, moved the installation files to the root of c:, and then reinstalled. The agent service is now able to start successfully.