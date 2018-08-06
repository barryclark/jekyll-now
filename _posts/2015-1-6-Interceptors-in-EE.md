---
layout: post
title: Interceptors in Java EE
excerpt: Interceptors are used to implement cross-cutting concerns such as ...
---

Interceptors are used to implement cross-cutting concerns such as auditing, logging, security related tasks, etc. from the actual business logic.  Interceptors provide a clean separation between those cross-cutting concerns and the rest of the application logic.  Overall, this separation simplify the development and the maintenance of the application.

Interceptors are not new.  In fact, interceptors are nearly a decade old as the initial interceptor support has been introduced in Java EE 5... in the EJB 3.0 specification to be more precise.  But in those nearly 10 years, Interceptors have evolved quite a lot and have now [their own specification](https://jcp.org/aboutJava/communityprocess/mrel/jsr318/index2.html).  The fact that interceptors are now independent of the EJB specification broadens their scope and reach to the complete Java EE platform.

[Abhishek Gupta](Abhishek Gupta) recently wrote a nice [post on Interceptors](https://abhirockzz.wordpress.com/2015/01/03/java-ee-interceptors/).  In his article, Abhishek start with the history of Interceptors and then goes on the different type of Interceptors and how to use them. And as usual, you can also check the [Java EE Tutorial section on Interceptors](https://docs.oracle.com/javaee/7/tutorial/cdi-adv006.htm#GKHJX) and [this sample](https://docs.oracle.com/javaee/7/tutorial/cdi-adv-examples004.htm#GKHPA) if you want to learn about Interceptors.


*Originaly posted on [The Aquarium](https://blogs.oracle.com/theaquarium/interceptors-in-java-ee) blog.*
