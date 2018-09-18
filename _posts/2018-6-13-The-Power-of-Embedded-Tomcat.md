---
layout: post
title: Embedded Tomcat
---

I came accross this implementation of Tomcat and instantly fell in love with it because it is no longer necessary to setup a Tomcat instance on your laptop neither in your cloud instances. _Perfect!_ 

From a technical standpoint, this is just a _jar_ file which can be encapuslated into a container and you could setup your own cluster of webservices as known as _kubernetes_. 

I decided to created this library in order to speed up the creation of POC or MVPs as sometimes when I start a side project I need to run it in a kubernetes service on the cloud and I struggle to spend more time doing that than implementing new features in the side project. I believe this library can be really useful to create thin microservices that's why in the following weeks I will develop some monitoring features.

#### Implementation
I wrote a small java class that creates a Tomcat automatically with a specific port and a set of servlets which are auto-discovered by this class. Technically, you provide a directory in your project where you have your servlet classes, then the auto-discover mechanism will use a reflection approach to identify which classes are servlets! This will keep your project cleaned and there's no need to use a framework anymore with that dodgy and annoying route/config.xml files.

#### Library
*Buzze* helps you on creating a bunch of microservices in the same java project where each service has its own tomcat and they will be part of the same _jar_ file. If one _jar_ file represents a problem to you, you can create multiple projects and use this library as a dependency.

Additionally, this library uses java-servlets and tomcat which is amazing for someone who likes to control the low level technical details. 

#### Examples

```java

public class BetaServer extends HTTPServer {
    public BetaServer() {
        // port, path, servlets-package 
        super(Optional.of("8088"), Optional.of("/api"), Optional.of("api"));
    }
}

```

```java

@WebServlet(name = "GammaServlet", urlPatterns = {"/s/api"})
public class GammaServlet extends HttpServlet {

    public GammaServlet() {
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        return resp;
    }
}

```
The BetaServer class extends HTTPServer, which requires a port, a path and a package name to auto discover the servlets and attach them to its current execution. In this specific case, it will discover the class GammaServlet and attach it to its list of servlets. Therefore, if you want to create several webservices under the same project, you can organise them by HTTPServer and put the respective servlets in separated folders.


