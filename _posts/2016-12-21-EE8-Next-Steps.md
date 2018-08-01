---
layout: post
title: Java EE 8 - Community Survey Results and Next Steps
---

Thanks to everyone who took the time to complete the Java EE Community Survey!  1693 of you completed the survey, and ranked the importance of 21 different component technologies included in our proposed Java EE roadmap presented at JavaOne 2016.  For more detail on this roadmap, watch [Anil Gaur’s Keynote at JavaOne 2016](https://www.youtube.com/watch?v=ZqfjW-RQPOs).

Detailed findings and analysis can be found here and the chart below summarizes community ranking of component technologies surveyed, from most important to least important.
Score ranking

<p align="center">
<img alt="Java EE 8" src="http://delabassee.com/images/blog/surv_chart.jpg" width="75%">
</p>


### Conclusions

We reviewed the Java EE 8 proposal based on these survey results, and additional review of implementation considerations.  We have concluded that:
* REST (JAX-RS 2.1) and HTTP/2 (Servlet 4.0) have been voted as the two most important technologies surveyed, and together with JSON-B represent three of the top six technologies. Much of the new API work in these technologies for Java EE 8 is already complete.  There is significant value in delivering Java EE 8 with these technologies, and the related JSON-P updates, as soon as possible. 
* CDI 2.0, Bean Validation 2.0 and JSF 2.3 were not directly surveyed, but significant progress has been made on these technologies and they will be included in Java EE 8.
* We considered accelerating Java EE standards for OAuth and OpenID Connect based on survey feedback.  This could not be accomplished in the Java EE 8 timeframe, but we’ll continue to pursue Security 1.0 for Java EE 8.
* At JavaOne, we had proposed to add Configuration and Health Checking to Java EE 8, and these technologies rank reasonably high in survey results.   However, after additional review we believe the scope of this work would delay overall Java EE 8 delivery.  We have concluded it is best to defer inclusion of these technologies in Java EE in order to complete Java EE 8 as soon as possible.
* Management, JMS, and MVC ranked low in survey results, and this ranking supports our proposal to withdraw new APIs in these areas from Java EE 8. We have withdrawn the JSRs for Management 2.0 (JSR 373), and JMS 2.1 (JSR 368), and are investigating a possible transfer of MVC to another community member or organization in order to complete JSR 371 as a stand-alone component.

We will revise the Java EE 8 proposal consistent with these findings. The table below summarizes Oracle's original and revised Java EE 8 proposals, focusing on areas of new API development:

<p align="center">
<img alt="Java EE 8" src="http://delabassee.com/images/blog/surv_table.jpg" width="75%">
</p>


### Next Steps

Based on the survey results and implementation considerations discussed above, we’ll move forward with the revised Java EE 8 proposal. If you have further feedback on Java EE 8, please join the [project](https://java.net/projects/javaee-spec/pages/Home) (if you are not already a member), and post to [users@javaee-spec.java.net](https://java.net/projects/javaee-spec/lists/users/archive) for further discussion.


*Originaly posted on [The Aquarium](https://blogs.oracle.com/theaquarium/java-ee-8-is-final-and-glassfish-50-is-released)*.
