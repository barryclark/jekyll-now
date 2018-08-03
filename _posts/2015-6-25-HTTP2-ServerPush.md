---
layout: post
title: HTTP/2 and Server Push
---

HTTP/2, which has been finalized a few weeks ago, is composed of 2 related specifications: RFC 7540 and RFC 7541.<!--more--> With HTTP/2, the existing HTTP 1.1 semantics are fully preserved as this new version of HTTP aims to be as compatible as possible with current uses of HTTP. The main goal of HTTP/2 is to provide a more efficient use of the network resources and, at the same time, to reduce the overall latency. So the fundamental difference between HTTP/2 and HTTP/1.1 is really at the transport level, i.e. how the bits are exchanged over the network. And that is what HTTP/2's new binary-framed protocol is all about.

HTTP/2 relies on the existing HTTP/1.1 semantics, we keep using the same HTTP verbs (GET, PUT, POST, etc.), the same HTTP status codes and so on. So from a Server-side Java developer perspective nothing should really change. Running an existing application over a HTTP/2 stack should be transparent. We obviously could expect to see improvements at the wire level. That means that most of the HTTP/2 capabilities should not be exposed at the Servlet API level. But there are few exceptions to this rule and Server Push is one the important new HTTP/2 feature that should ideally be made available to the developer.

[Server Push](https://httpwg.github.io/specs/rfc7540.html#PushResources) is a new HTTP/2 feature that allows a server to proactively 'push' multiple unsolicited resources as a response(s) of a regular client request. And since a server-side application knows what resources are needed to render a particular page, this capability basically let an application to pro-actively push resources needed by a client... before the client even knows that it will need those resources.

The Servlet 4.0 Expert Group now needs to figure out how this Server Push capability should be exposed at the API level. One of the possibilities might be inspired from Greg Wilkins's proposal based on [Jetty 9.3](https://dev.eclipse.org/mhonarc/lists/jetty-announce/msg00080.html)'s PushBuilder API (see [here](https://java.net/projects/servlet-spec/lists/users/archive/2015-03/message/0)). Greg is an active Servlet EG member and is the original Jetty developer, he started to develop Jetty 20 years ago using Java 0.9! So happy 20th birthday to Jetty as well!

Useful resources:

* Hypertext Transfer Protocol Version 2 (HTTP/2): [RFC 7540](https://httpwg.github.io/specs/rfc7540.html)
* HPACK: Header Compression for HTTP/2: [RFC 7541](https://httpwg.github.io/specs/rfc7541.html)
* [HTTP/2: A New Excerpt from High Performance Browser Networking](http://www.oreilly.com/webops-perf/free/HTTP2-high-perf-browser-networking.csp) by Ilya Grigorik
* Jetty 9.3 PushBuilder [Javadoc](http://download.eclipse.org/jetty/stable-9/apidocs/org/eclipse/jetty/server/PushBuilder.html)

<br/>

<center>
<iframe src="//www.slideshare.net/slideshow/embed_code/key/J5ClC0FQ89I8Ef" width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe> <div style="margin-bottom:5px"> <a href="//www.slideshare.net/delabassee/http2-comes-to-java" title="HTTP/2 Comes to Java" target="_blank">HTTP/2 Comes to Java</a> from <a href="https://www.slideshare.net/delabassee" target="_blank">David Delabassee</a></div>
</center>
  
<br/>


*Originaly posted on [The Aquarium](https://blogs.oracle.com/theaquarium/http2-and-server-push) blog.*
