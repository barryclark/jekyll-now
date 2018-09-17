---
layout: post
title: WebSocket Session Throttling and JMX Monitoring
excerpt: GlassFish 4.1 embeds Tyrus 1.8.1 which is compliant with the Maintenance Release of JSR 356. This release also brings brings additional features ...
---

GlassFish 4.1 embeds Tyrus 1.8.1 which is compliant with the Maintenance Release of JSR 356 (_"WebSocket API 1.1"_). This release also brings brings additional features to the WebSocket support in GlassFish.


### JMX Monitoring

Tyrus now exposes WebSocket metrics through JMX . In GF 4.1, the following message statistics are monitored for both sent and received messages:

* messages count

* messages count per second

* average message size

* smallest message size

* largest message size

Those statistics are collected independently of the message type (global count) and per specific message type (text, binary and control message). In GF 4.1, Tyrus also monitors, and exposes through JMX, errors at the application and endpoint level.

For more information, please check [Tyrus JMX Monitoring](https://tyrus-project.github.io/documentation/1.12/user-guide.html#d0e1483).


### Session Throttling

To preserve resources on the server hosting websocket endpoints, Tyrus now offers ways to limit the number of open sessions. Those limits can be configured at different level:

* per whole application

* per endpoint

* per remote endpoint address (client IP address)

For more details, check [Tyrus Session Throttling](https://tyrus-project.github.io/documentation/1.12/user-guide.html#d0e1574).


*Originaly posted on [The Aquarium](https://blogs.oracle.com/theaquarium/spotlight-on-glassfish-41%3a-7-websocket-session-throttling-and-jmx-monitoring) blog.*
