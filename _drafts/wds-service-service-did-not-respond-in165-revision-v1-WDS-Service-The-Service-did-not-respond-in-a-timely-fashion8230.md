---
id: 274
title: 'WDS Service: The Service did not respond in a timely fashion&#8230;'
date: '2022-01-14T19:23:20+00:00'
author: Ryan
layout: revision
guid: 'https://geekyryan.com/?p=274'
permalink: '/?p=274'
---

This was a new one for me. Usually WDS is rock solid and it just works.

Anyway, I was getting ready to deploy some servers in my lab and found that I couldn’t get WDS to start on my deployment server. I got this error message when trying to start the service:

[![](https://geekyryan.com/wp-content/uploads/2016/11/2016-11-09_21h02_29.png)](https://geekyryan.com/wp-content/uploads/2016/11/2016-11-09_21h02_29.png)

I then tried to start the service from the Services console and got this error message:

[![](https://geekyryan.com/wp-content/uploads/2016/11/2016-11-09_21h02_42.png)](https://geekyryan.com/wp-content/uploads/2016/11/2016-11-09_21h02_42.png)

“This was just working yesterday”, I said to myself. What could possibly have happened since yesterday evening that could cause this? I looked in the event log and after scrolling through the Administrative Events, I found this:

[![](https://geekyryan.com/wp-content/uploads/2016/11/2016-11-09_21h04_33.png)](https://geekyryan.com/wp-content/uploads/2016/11/2016-11-09_21h04_33.png)

The solution was so obvious it was staring me in the face, but I wanted to verify first. So I fired up a cmd prompt and ran netstat, and found this:

[![](https://geekyryan.com/wp-content/uploads/2016/11/2016-11-09_21h06_14.png)](https://geekyryan.com/wp-content/uploads/2016/11/2016-11-09_21h06_14.png)

I had installed DHCP on this server the night before and totally forgot about it. Anyway, the solution was simple. I just needed to tell the WDS service to not listen on port 67. To do that, just open the WDS server properties and got to the “DHCP” tab. Then check the box next to “Do not listen on DHCP Ports”.

[![](https://geekyryan.com/wp-content/uploads/2016/11/2016-11-09_21h08_04.png)](https://geekyryan.com/wp-content/uploads/2016/11/2016-11-09_21h08_04.png)

I was then able to start the DHCP service.