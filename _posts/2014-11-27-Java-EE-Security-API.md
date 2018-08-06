---
layout: post
title: JMS 2.0 Errata release
excerpt: If we look at the feedback, security is an area ...
---

2014-11-27-Java-EE-Security-API.md


Java EE has been used to develop and run enterprise applications securely since years. Obviously, Java EE and its containers are just parts of the global security equation. When we zoom at the Java EE layer, we see that some of the security capabilities are backed into the specification while others security features are proprietary and specific to the different Java EE implementations.  Sometime, some of the security capabilities are also external add-on's (e.g. 3rd party libraries).  Security is not a self-contained matter as interactions between different components are often required (e.g. a Java EE Application Server needs to interact with an LDAP server).  Things also change when we go from an on-premises deployment to a cloud based deployment.  Finally, portability is never simple when it comes to security.

Java EE needs to evolve to stay relevant and clearly, if we look at the feedback from the Java EE 8 Community Survey, security is an area that could be improved.  And that is the goal of [JSR 375 (Java EE Security API)](https://jcp.org/en/jsr/detail?id=375) which has just been submitted to the JCP for review. JSR 375 is slated for inclusion in Java EE 8, its initial scope is based on the community survey feedback, on issues and RFEs filled against the Java EE specifications, on various exchanges EG members had overtime and also on various informal discussions we had during conferences, etc.

The [JSR proposal](https://jcp.org/en/jsr/detail?id=375) gives a more detailed overview of what it will try to achieve. In short, JSR 375’s goal is to simplify, standardize, and modernize the Security API across the platform in different area.

<p align="center">
<img alt="Security API picture 2" src="http://delabassee.com/images/blog/jsr375_1.jpg">
</p>

<p align="center">
<img alt="Security API picture 2" src="http://delabassee.com/images/blog/jsr375_2.jpg">
</p>


* User Management: Standardization of a ’user service’ API which would enable an application to perform user management operations (e.g. create a user). The ‘user service’ would rely on a ‘user source’ which would be an abstraction of a physical user store (e.g. LDAP, data-bases, etc.).  The user service would be configurable to match the deployment requirements.

* Password Aliasing: Standardization of syntax for pointing (alias) to passwords stored in a (secure) password repository. This password repository might then be bundled with an application (e.g. think cloud deployment).

* Role Mapping: Definition and standardization of a ‘role service’ API that would enable an application to perform various role mapping operations (e.g. querying a group role).  This would be done via different role mappers (e.g. LDAP, files) that would be adaptable based on the environment’s needs.

* Authorization: Definition of a new CDI interceptor annotation that would be used to preform application-domain rules at the method level.

* Authentication: Several enhancements are also planned around authentication (e.g. the ability for a web application to offers different authentication methods).

This is just an of overview of the initial scope. In addition, the Experts Group will also have to look at how some of the Java EE orthogonal technologies (e.g. CDI events, Expression Language, etc.) can be leveraged in order to simplify the use of those new APIs.  To know more about this JSR, make sure to read the JSR 375 proposal. You can also watch the replay of the [Java EE 8 Overview](https://blogs.oracle.com/theaquarium/entry/javaone_replay_java_ee_8) that Linda DeMichiel gave during JavaOne as she has touched some of those ideas during her talk.

JSR 375 has entered the JCP review period; the next step should then be the approval ballot period. And if it passes this ballot, the Experts Group will be formed and the real works (and discussions) will start! So we are just at the beginning of this effort but it’s nice to see the different pieces of Java EE 8 being put in place...

*Originaly posted on [The Aquarium](https://blogs.oracle.com/theaquarium/jsr-375%3A-java-ee-security-api) blog.*
