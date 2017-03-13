---
layout: post
title: Introduction to Server-Side Swift with Vapor
---
![Vapor]({{ site.baseurl }}/images/vapor/vapor-droplet.png) ![Swift]({{ site.baseurl }}/images/vapor/swift.png)

Recently I started to explore Server Side Swift and this is my first article on this topic. With Swift v3.0 it has been noticable activity with new Heroku Build packs and emerging new platforms. That all make sense to a programmer, write server side and client in same langauge & tools, makes development easier without context switching. 

Recent [study](http://www.sciencedirect.com/science/article/pii/S0093934X14001266) indicates that human brain experiences extra stress switching natural languages as it does when we switch programming langauge. Good example of this are live interpreters we see at international conferences, that work is so intence that single person only can do it for 15min at a time, then another takes over on rotation. Personally exerianced this effect while living in Japan and be in discussions among friends speacking single language English, Japanese or Russian. After swithcing and interpreting this friendly conversation for 30min it turned out to be exhausting work. 

We can conclude as a full-stack programmers we may experience similar effects coding iOS apps in Swift then try to switch to Java, Ruby or C++ for API layer. Brain gets tired and stressed and our productivity is effected. Combine that with different tools needed for above languages even worse. Especially in business-work we may be required to do this switching for 8-10HR per day. (Food for Thought to PMs and tech leaders when choosing languages and frameworks think about your developer instead of "best of breed").
It will be awesome to be able to write client iOS and Server API all in Swift & Xcode. With server-side swift now we can.

This same problem NodeJS try to solve for web developers, code Website in JavaSript then do API in NodeJS, same language but 1000s of frameworks and tools. 

We can do the same in Swift+Xcode. [Server Side Swift](https://developer.ibm.com/swift/) has been driven by IBM group with platform [BlueMix](https://console.ng.bluemix.net/docs/runtimes/swift/index.html) and [Kitura](https://github.com/IBM-Swift/Kitura) web frameworks for Swift that run on Linux platform. [Swift Sandbox](https://swift.sandbox.bluemix.net/#/repl) with BlueMix is a great tool to start coding Swift on the server running repl. Recently others has join the Server Side Swift movement with open source Heroku Build packs built by Kyle Fuller - [heroku-buildpack-swift](https://github.com/kylef/heroku-buildpack-swift), @neonichu - [swift-buildpack](https://elements.heroku.com/buildpacks/neonichu/swift-buildpack) and [Vapor](https://vapor.codes/) full web-framework.

In this article we will look at Vapor that seem to have all support needed for typical web apps such as AWS, Heroku, Docker, Ubutu, MySQL, Postgres, Mongo etc. First visit [Vapor Docs](https://vapor.github.io/documentation/getting-started/install-swift-3-macos.html) for install and quick start instructions.
After installing all required tools we are ready to try Vapor-Swift Hello World.

In Vapor everything start with Droplet main web framework server component. Define Droplet as follows with basic server code

```
let drop = Droplet()
drop.get("hello") { request in
    return "Hello, world!"
}
drop.run()
```
But typing code is overrated let Vapor template do the work for us. Execute thsi command on your terminal

```
vapor new Hello
``` 

This will generate a starting biolerplate code for our server. Compile and run this code

```
vapor build
vapor run serve
```
Once server starts you should see this output in command prompt

```
Running Hello...
No preparations.
Server 'default' starting at 0.0.0.0:8080
GET /
```

Now open browser with address `http://localhost:8080` you should see a server response from Vapor server

```
Hello, world!
```

Here is our first Swift server runtime code. In next article will look at how to server web content and build API.