---
id: 273
title: 'WSUS: An error occurred trying to connect the WSUS server'
date: '2022-01-14T19:23:20+00:00'
author: Ryan
layout: revision
guid: 'https://geekyryan.com/?p=273'
permalink: '/?p=273'
---

Ran into this error message when configuring a new WSUS server:

[![](https://geekyryan.com/wp-content/uploads/2016/11/2016-12-21_14h56_00.png)](https://geekyryan.com/wp-content/uploads/2016/11/2016-12-21_14h56_00.png)

Restarted the WSUS, WID, and IIS services to no avail. I even rebooted the server. The WSUS console would work for a short period of time, and then would randomly stop working.

I found that the WSUS app pool in IIS was being disabled anytime new clients connected to the server. I believe this was because the app pool was running out of usable memory.

[![](https://geekyryan.com/wp-content/uploads/2016/11/2016-11-09_21h28_56.png)](https://geekyryan.com/wp-content/uploads/2016/11/2016-11-09_21h28_56.png)

You can manually start the app pool in IIS, but it will continue to crash.

[![](https://geekyryan.com/wp-content/uploads/2016/11/2016-12-21_14h56_48.png)](https://geekyryan.com/wp-content/uploads/2016/11/2016-12-21_14h56_48.png)

The solution for me was to increase the memory limit available for the application pool:

[![](https://geekyryan.com/wp-content/uploads/2016/11/2016-12-21_14h57_38.png)](https://geekyryan.com/wp-content/uploads/2016/11/2016-12-21_14h57_38.png)

By default it is only configured to use just under 2 GBs. <span style="text-align: center;">I reconfigured it to use up to 4 GB and the WSUS console has not crashed since. After re configuring the memory for the application pool, run an IIS reset or reboot the server.</span>

[![](https://geekyryan.com/wp-content/uploads/2016/11/2016-11-09_21h31_40.png)](https://geekyryan.com/wp-content/uploads/2016/11/2016-11-09_21h31_40.png)

UPDATE: Setting the Private Memory Limit to “0” will allow the application pool to use whatever amount of memory it needs.