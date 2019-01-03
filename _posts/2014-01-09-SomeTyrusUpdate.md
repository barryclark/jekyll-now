---
layout: post
title: Some Tyrus updates
excerpt: Tyrus 1.0 was released mid 2013 when the JSR 356 specification went final. Since then, the work hasn't stopped...
---

[Project Tyrus](https://github.com/tyrus-project/tyrus) is the [JSR 356](https://www.jcp.org/en/jsr/detail?id=356) (Java API for WebSocket) Reference Implementation. As JSR 356 is part of Java EE 7 (Web Profile and the Full Java EE Platform), Tyrus is embedded in GlassFish 4. In addition, Tyrus *should* also run on any Servlet 3.1 compatible container.


Tyrus 1.0 was released mid 2013 when the JSR 356 specification went final. Since then, the work on Tyrus hasn't stopped and this is also true for other implementations such as Jersey for JAX-RS, Mojarra for JavaServer Faces, etc. For example, no less than 2 updates of Mojarra were released this week (2.2.5 & 2.1.27) but more on JSF later and back to Tyrus...

Here are some of features and improvments that were recently added to Tyrus :

** [WebSocket Extension](https://blogs.oracle.com/PavelBucek/entry/websocket_extensions_in_tyrus) : A new filtering capability to processes incoming and outgoing WebSocket frames.

** [Shared Client Container](https://blogs.oracle.com/pavelbucek/tyrus-client-shared-container) : An improved container for WebSocket clients who need to deal with lot of connections.

** [Optimized WebSocket Broadcast](https://blogs.oracle.com/PavelBucek/entry/optimized_websocket_broadcast) : A server-side WebSocket endpoint optimization for broadcasting payload.


*Originaly posted on [The Aquarium](https://blogs.oracle.com/theaquarium/some-tyrus-updates) blog.*
