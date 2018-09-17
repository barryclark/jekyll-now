---
layout: post
title: Spotlight on GF 4.1 - WebSocket Client Redirect
excerpt: Tyrus and GlassFish 4.1 now support HTTP 3xx Redirect ...
---

A WebSocket connection is always initiated using HTTP (or HTTP/S). After a successful [handshake](http://en.wikipedia.org/wiki/WebSocket#WebSocket_protocol_handshake), the HTTP connection is upgraded to a WebSocket connection using the [HTTP 1.1 upgrade header](http://en.wikipedia.org/wiki/HTTP/1.1_Upgrade_header).


[Tyrus](https://tyrus-project.github.io) and GlassFish 4.1 now support [HTTP 3xx Redirect](http://en.wikipedia.org/wiki/URL_redirection#HTTP_status_codes_3xx) handling during the WebSocket handhake phase. This feature allows a WebSocket server end-point to transparently redirect clients to another server end-point. Tyrus WebSocket client can be configured to accept to be redirected. The number of redirections allowed is also configurable (eg. to avoid infinite redirection loop). For more details on this feature, please check [this section](https://tyrus-project.github.io/documentation/1.12/user-guide.html#d0e1774) of the Tyrus documentation.

*Originaly posted on [The Aquarium](https://blogs.oracle.com/theaquarium/spotlight-on-glassfish-41%3a-10-websocket-client-redirect) blog.*
