---
id: 262
title: 'Migrate Windows Deployment Services to New Server'
date: '2022-01-14T19:23:19+00:00'
author: Ryan
layout: revision
guid: 'https://geekyryan.com/?p=262'
permalink: '/?p=262'
---

We have been making a great effort to move all of our internal services to Windows Server 2016. This past week, it was WDS’ turn to get migrated. Migrating this role is extremely simple. Here are the steps that I took:

1. Create new server and install WDS role.
2. Stop WDS Service on old server
3. Stop WDS Service on new server
4. Use my “Copy-Files” PowerShell script (Available Here: [Copy-Files.ps1](https://gallery.technet.microsoft.com/scriptcenter/Copy-Files-17cba2ae)) to copy RemoteInstall Share to new server
5. Start WDS Service on new Server
6. Shutdown old WDS Server completely
7. Update option 66/67 in DHCP scopes to reflect new WDS Server
8. Update any appropriate DNS records

Note:

If you are unable to start the WDS service, delete the WDS database and logs from the old server located at &lt;drive letter&gt;:RemoteInstallStoresMetadata\*.\*. You should be able to start the service after deleting these files.

Simple enough! 🙂