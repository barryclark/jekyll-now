---
layout: post
title: Your Spring application takes longer to deploy? Think again!
excerpt: Trying to understand why a large Spring based application took longer to deploy on WebLogic than on Tomcat...
---
Uday Joshi of the WebLogic Team was recently asked to understand why a large Spring based application took longer to deploy on WebLogic than on Tomcat. And to do that, Uday only had one constraint, i.e. he was not given access to that Spring application! The only thing Uday had at his disposal was the deployment-time thread dumps of that application, nothing else.

In his [detailed](https://community.oracle.com/people/Uday+Joshi-Oracle/blog/2015/06/02/spring-framework-based-application-on-weblogic-1213) article, Uday describes how he mimicked the 'suspicious' application to understand what was going on. He also shares some of his findings and some recommendations like using filtering classloader. This article is based on a large Spring application but those recommendations also apply to any large application. 

*Originaly posted on [The Aquarium](https://blogs.oracle.com/weblogicserver/your-spring-application-takes-longer-to-deploy-think-again) blog.*
