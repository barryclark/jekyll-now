---
layout: post
title: Reading the Registry from the Command Line
permalink: /microsoft/reading-the-registry-from-the-command-line
post_id: 411
categories:
- Command
- How to
- Microsoft
- Registry
---

Often I need to check windows registry values, for example, to see if an addon is working.

From the Microsoft Windows command line (Start | run | cmd) it is easy to see what value a registry key has:


`REG QUERY "HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Office\MS Project\Addins\Mindjet.Mm8MsProject.AddIn.4" /v "LoadBehavior"`

In this example above, we see if the Mindjet Mindmanager add-on is loaded or not in Microsoft Project.
