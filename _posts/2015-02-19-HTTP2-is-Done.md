---
layout: post
title: HTTP/2 is Done!
excerpt: There are still some minor processes to go through before they are published as official RFCs but the IESG has formally approved the HTTP/2 and HPACK specifications!...
---

...well almost! There are still some minor processes to go through before they are published as official RFCs but the IESG [has formally approved](https://www.mnot.net/blog/2015/02/18/http2) the HTTP/2 and HPACK specifications! So clearly, it’s safe to say that HTTP/2 is done! And given how vital the HTTP protocol is in today’s world, this is really important news.

The fact that HTTP/2 is binary based (Vs. HTTP 1.x being text based) removes lot of technical barriers that (text-based) HTTP 1.x had and allows the introduction of new capabilities. Those new capabilities (e.g. stream multiplexing over a single TCP connection, stream prioritization, server-push, etc.) are more than welcome as they will reduce the overall Web latency. HTTP/2 will also help to get rid of the various “hacks” (e.g. file concatenation, domain sharding) that were put in place to work-around the HTTP 1.x limitations (e.g. Head-of-Line blocking).

HTTP/2 maintains a high-level compatibility with HTTP 1.x and preserve a lot of its predecessors concepts (e.g. URI, headers, etc.). So from a Java EE developer point of view, the HTTP/2 impact will be relatively minimal and only a few HTTP/2 aspects will be exposed to the developer through the Servlet API (Server-Push & Stream Prioritization). This work is conducted right now in the Servlet 4 ([JSR 369](https://jcp.org/en/jsr/detail?id=369)) Experts Group. Even if you are not a Web-tier developer, it is still important to understand HTTP/2 and what it brings. 

*Originaly posted on [The Aquarium](https://blogs.oracle.com/theaquarium/http2-is-done) blog.*
