---
layout: post
title: An update on GlassFish 5
excerpt: The Reference Implementation is a critical piece of any given JSR...
---

The Reference Implementation is a critical piece of any given JSR, this is even more true for Java EE. As the different Java EE 8 JSRs continue to make progress, it is now important to ramp up efforts around GlassFish 5, the open source Java EE 8 Reference Implementation. And today is an important milestone on the way to Java EE 8 as we are publishing the [first promoted build of GlassFish 5](http://download.oracle.com/glassfish/5.0/promoted/index.html), aka GlassFish-5.0-b03.

<p align="center">
<img alt="GlassFish logo" src="https://delabassee.com/images/blog/gf_logo.png">
</p>

We are in fact releasing 2 types of GlassFish 5 builds: _nightly_ and _promoted_ (for both the full Java EE platform and the Web Profile). 

* _Nightly_ builds have a daily cadence and goes through more limited testing; those builds are on the edge! See [here](https://download.oracle.com/glassfish/5.0/nightly/index.html).

* The _promoted_ builds on the other hand have a slower cadence, i.e. weekly cadence, but go through a larger set of tests including (an initial version of) the Java EE 8 CTS.  See [here](https://download.oracle.com/glassfish/5.0/promoted/index.html).

It is obvious that we are in the early days and everything is in motion: the different specifications, their respective Reference Implementations (e.g. Jersey for JAX-RS, Hibernate Validator for Bean Validation, ...) but also their own TCK. So clearly, we are not claiming that any GlassFish 5 promoted build is fully passing the Java EE 8 [CTS](https://www.oracle.com/technetwork/java/javaee/javaee-faq-jsp-135209.html#compatibilitytests) ... yet! ;-)

It should also be mentioned that the cadences mentioned below might varies depending on the actual state of a given build, e.g. if the build is broken, it might be delayed or simply skipped.

Given that Java EE 8 is based on Java SE 8+, we are using Java SE 8 as the baseline JDK for GlassFish 5 but the intent to also support Java SE 9 for the final GF5 release. For example, this week promoted build isn't working on Java SE 9 but that is only temporary. 

The nightly builds will always be a few days ahead of the latest promoted build but we do encourage the community to use promoted builds. So you can help us by testing the latest promoted GF5 builds. If you find any issue, please raise a ticket against the appropriate GlassFish component [here](https://java.net/jira/browse/GLASSFISH?selectedTab=com.atlassian.jira.jira-projects-plugin:summary-panel). And if you are confident that the issue is located in a specific component (e.g. Jersey) it might be more efficient to raise the issue directly against that particular component.

GlassFish 5 should be released about six weeks after the Java EE 8 Platform specification ([JSR 366](https://jcp.org/en/jsr/detail?id=366)) is final. As of today, we are targeting specification completion in July, which would result on a release date in the August/September timeframe. The schedule is subject to change but that is our current direction.  

*Originaly posted on [The Aquarium](https://blogs.oracle.com/theaquarium/an-update-on-glassfish-5) blog.*
