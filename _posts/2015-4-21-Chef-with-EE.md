---
layout: post
title: Managing a Java EE Application Server with Chef
excerpt: Chef is a popular open source infrastructure automation framework...
---

[Chef](http://docs.chef.io/) is a popular open source infrastructure automation framework that has been popularized with the whole DevOps movement. In a nutshell, Chef has the notion of Recipe and Cookbook. A [Recipe](http://docs.chef.io/recipes.html) is written using a Ruby based DSL to describe how to install and configure software(s) on a host. And as the name suggest, a [Cookbook](http://docs.chef.io/cookbooks.html) is a collection of related Recipes.

Needless to say that managing Java EE Application Servers with Chef is a common use-case. You just need to use the appropriate Cookbook for your container : [GlassFish](https://github.com/realityforge/chef-glassfish), [WebLogic](http://blog.c2b2.co.uk/2015/03/installing-weblogic-with-chef.html), [WildFly](https://supermarket.chef.io/cookbooks/wildfly), [TomEE](https://github.com/freedev/chef-tomee), etc.


*Originaly posted on [The Aquarium](https://blogs.oracle.com/theaquarium/managing-a-java-ee-application-server-with-chef) blog.*
