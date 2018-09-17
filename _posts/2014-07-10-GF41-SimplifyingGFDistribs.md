---
layout: post
title: GF401 - Simplifying GF distributions
excerpt: For any particular GlassFish release, we used to have different distributions...
---


For any particular GlassFish release, we used to have different distributions. We had an English and a multilingual (ML) version of GlassFish. We had a Zip based distribution. We also had versions with a native installer... on different platforms (Windows and Unix's). Finally, from a Java EE standpoint, we had 2 types of distributions: Full Platform and Web Profile. If we factor in all those criteria’s together, this gives 12 different distributions!  And that was just for the Open Source edition of GlassFish! Needless to say that this was costly and not necessarily very useful as clearly, the statistics shows that the Zip distribution was the most popular one.


<p align="center">
<img alt="GF 4.0.1" src="https://raw.githubusercontent.com/delabassee/delabassee.github.io/master/images/blog/gf40distros.jpg" width="80%"/>
</p>


For 4.0.1, we have decided to **greatly simplify** this by only producing **2 Zip based distributions**, i.e. a Web Profile distribution and a Full Java EE Platform distribution. To install GlassFish 4.0.1, you just need to unzip the archive in the desired location. And GF is already pre-configured and ready to be started (the only assumption is that you have a JDK installed). The advantage of the Zip distribution is that it is simple and universal, it works on any platform. This approach is also very convenient when it comes to script GF installation. Other open source application server are also using Zip distributions, so we should be on the right track.


*Originaly posted on [The Aquarium](https://blogs.oracle.com/theaquarium/spotlight-on-glassfish-401%3a-2-simplifying-gf-distributions) blog.*
