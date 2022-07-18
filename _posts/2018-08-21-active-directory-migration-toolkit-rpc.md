---
id: 100
title: 'Active Directory Migration Toolkit &#8211; The RPC Server is Unavailable (hr=0x800706ba)'
date: '2018-08-21T17:34:00+00:00'
author: Ryan
layout: post
guid: 'https://geekyryan.com/?p=100'
permalink: '/?p=100'
categories:
    - Uncategorized
tags:
    - ActiveDirectory
---

When migrating computer objects using the Active Directory Migration Tool, you may encounter the following error:

[![](https://geekyryan.com/wp-content/uploads/2018/08/2018-08-03_11h20_09.png)](https://geekyryan.com/wp-content/uploads/2018/08/2018-08-03_11h20_09.png)

In addition, the Migration Log may show the following error:

[![](https://geekyryan.com/wp-content/uploads/2018/08/2018-08-03_11h20_20.png)](https://geekyryan.com/wp-content/uploads/2018/08/2018-08-03_11h20_20.png)

This is typically caused by a host-side firewall. To resolve this, deploy a GPO to disable the Windows firewall prior to migrating the computer account. I like to create a special OU for computers (I typically name it “PreMigration”) that I will move computer objects to prior to migrating them. This OU will have two policies applied. One to disable the Windows Firewall and another to start the Remote Registry service. Both are required for the computer object to successfully migrate.