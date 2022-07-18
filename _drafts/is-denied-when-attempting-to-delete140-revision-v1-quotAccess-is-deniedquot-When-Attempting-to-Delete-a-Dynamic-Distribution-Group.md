---
id: 268
title: '&quot;Access is denied&quot; When Attempting to Delete a Dynamic Distribution Group'
date: '2022-01-14T19:23:20+00:00'
author: Ryan
layout: revision
guid: 'https://geekyryan.com/?p=268'
permalink: '/?p=268'
---

You may receive the error below when attempting to delete a dynamic distribution group.

[![](https://geekyryan.com/wp-content/uploads/2017/06/2017-06-12_09h29_20.png)](https://geekyryan.com/wp-content/uploads/2017/06/2017-06-12_09h29_20.png)

To resolve this, open ADUC and show advanced features (Click View &gt; Advanced Features). Then find the object for the dynamic distribution group and open the properties window. Browse to the “Object” tab and uncheck the “Protect object from accidental deletion” box. Wait for ADDS to replicate or force replication yourself.

[![](https://geekyryan.com/wp-content/uploads/2017/06/2017-06-12_09h34_20.png)](https://geekyryan.com/wp-content/uploads/2017/06/2017-06-12_09h34_20.png)

Go back to the ECP and you should be able to delete the group.