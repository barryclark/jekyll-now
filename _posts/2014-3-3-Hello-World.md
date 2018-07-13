---
layout: post
title: The Power of Embedded Tomcat
---

I came accross this implementation of Tomcat and I instantly fell in love with it because it is no longer necessary to setup a Tomcat instance on your laptop neither in your cloud instances. Perfect!

Then I wrote a small java class that creates a Tomcat automatically with a specific port and a set of servlets which are auto-discovered by this class. Technically, you provide a directory in your project where you have your servlet classes, then the auto-discover mechanism will use a reflection approach to identify which classes are servlets! This will keep your project cleaned and there's no need to use a framework anymore with that dodgy and annoying route/config.xml files.

Using this idea, I am building a library called *Buzze* that helps you on creating a bunch of microservices in the same java project where each service has its own tomcat. Apart from that, this library only uses servlets and tomcat which is amazing for someone who likes to control the low level technical details. My project is not open source, but I am happy to share it, please let me know if you want to have access to it.

#Example

´´java

public class BetaServer extends HTTPServer {
    public BetaServer() {
        // port, path, servlets-package 
        super(Optional.of("8088"), Optional.of("/api"), Optional.of("api"));
    }
}

´´

´´java

@WebServlet(name = "GammaServlet", urlPatterns = {"/s/api"})
public class GammaServlet extends HttpServlet {

    public GammaServlet() {
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        return resp;
    }
}

´´

If you extend HTTPServer in your class, you only have to provide in the super method a port, a path and the servlet package name. In this case, it will start a tomcat server on port 8088, to hit the provided servlet you need to hit /api and the servlet is inside of api package. Therefore, if you want to create several webservices under the same project, you can organise them by HTTPServer and put the respective servlets in separated folders.



Andre
