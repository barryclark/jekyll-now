---
layout: post
title: How-to Write An Environment Aware Nuxeo Package?
excerpt: |
   Generating a ZIP server side can be challenging. This can be a long and blocking task
   which put servers under pressure. With Vert.X we can make it asynchronous which allows to handle concurrency better.
---


What Is The Goal Here?
======================

When deploying a Nuxeo application, we often have some parameters that differ from one environment to another. For instance, the SAML endpoint may be different between production and development. To address that problem there are different solutions:

 * specialize some parameters in `nuxeo.conf`: the configuration then becomes the responsibility of the ops team and every change needs to be communicated to them
 * having several Nuxeo templates, one per environment that contains different configuration. The ops team needs to know which template to activate depending on the environment where they deploy.

In a cloud-native world, applications are shipped as container, and the applicative configuration should be embedded in the container. The infrastructure platform should only provide an environment name or type without knowing anything about the application. The options above are then not really usable.

Thru the usage of the `NUXEO_ENVIROMENT` variable, we will see in this how-to, how we can specify some environment specific configuration in a Nuxeo package and then ship it as a container. The infrastructure platform then just need to specify the type of environment.


A Simple Nuxeo Package
======================

Let's start by creating an empty Nuxeo project with just one plugin and a package. For that we can easily use the [Nuxeo CLI](https://doc.nuxeo.com/nxdoc/nuxeo-cli/) to boostrap our project:

```shell
$ mkdir nuxeo-acme
$ cd nuxeo-acme
$ nuxeo bootstrap

...

You will be prompted for generation of:
     info   nuxeo-acme-core: single-module

   create Generating Multi module (Your project parent POM)
     info   Parameters: Use a parent artifact, Use the nuxeo distribution pom, Parent group, Parent artifact, Parent version, Import nuxeo in the `dependency management`, Nuxeo version, Project group, Project artifact, Project version, Project description
? Use a parent artifact (for instance your company's BOM or the Nuxeo Distribution POM)? Yes
? Use the Nuxeo Distribution POM? Yes
? Nuxeo Version: 11.4
? Project Group id: org.nuxeo.acme
? Project Artifact id: nuxeo-acme-parent
? Project Version: 1.0-SNAPSHOT
? Project Description: ACME project

   create Generate Module: nuxeo-acme-core

   create Generating Single module
     info   Parameters: Project group, Project artifact, Project version, Project description
? Project Group id: org.nuxeo.acme.core
? Project Artifact id: nuxeo-acme-core
? Project version: 1.0-SNAPSHOT
? Project description: ACME Core
   create Writing Multi module
   create Configuration: multi
...
   create nuxeo-acme-core/src/test/resources/log4j2-test.xml
   create Your project is ready!
     info You can start editing code or you can continue with calling another generator (nuxeo bootstrap [<generator>..])
```
and then:
```shell
$ nuxeo bootstrap package
   info Your target Nuxeo version is: 11.4
     info You will be prompted for generation of:
     info   nuxeo-acme-package: package

   create Generate Module: nuxeo-acme-package

   create Generating Package
     info   Parameters: Parent group, Parent artifact, Parent version, Package artifact, Package version, Package name, Company name
? Parent Group id: org.nuxeo.acme
? Parent Artifact id: nuxeo-acme-parent
? Parent version: 1.0-SNAPSHOT
? Package Artifact id: nuxeo-acme-package
? Package name: marketplace-acme
? Company name: Nuxeo
     info Trying to override current version: 11.4 with: 1.0-SNAPSHOT
   create Writing Package
    force pom.xml
   create nuxeo-acme-package/pom.xml
   create nuxeo-acme-package/src/main/assemble/assembly.xml
   create nuxeo-acme-package/src/main/resources/install/templates/marketplace-acme/nuxeo.defaults
   create nuxeo-acme-package/src/main/resources/install.xml
   create nuxeo-acme-package/src/main/resources/package.xml
   create Your project is ready!
     info You can start editing code or you can continue with calling another generator (nuxeo bootstrap [<generator>..])
$

```

With those commands, we just created an empty Nuxeo package that installs its own `marketplace-acme` template. We can now configure some specific application configuration by
editing the file in `nuxeo-acme-package/src/main/resources/install/templates/marketplace-acme/nuxeo.defaults`. For instance we can configure the prefix of the emails sent
by the platform by adding:

```
nuxeo.notification.eMailSubjectPrefix="[ACME] "
```

The package can simply be built by running:
```shell
$ mvn clean package
```


Running The Package In A Docker Container
=========================================

In order to test our package, we will run it inside a Docker container. For this to be reproducible, we will create a dedicated image using the following `Dockerfile` at the root of our project:

```dockerfile
FROM docker.packages.nuxeo.com/nuxeo/nuxeo:11.4

ARG NUXEO_CLID

COPY nuxeo-acme-package/target/nuxeo-acme-package-1.0-SNAPSHOT.zip /package.zip
RUN /install-packages.sh --clid ${NUXEO_CLID} /package.zip nuxeo-web-ui

```

To build and run it:

```shell
$ docker run --rm -i docker.packages.nuxeo.com/nuxeo/nuxeo:11.4 nuxeoctl register && cat /var/lib/nuxeo/instance.clid | sed ':a;N;$!ba;s/\n/--/g' | sed s/--$//
XXXXX
$ export NUXEO_CLID=XXXXX
$ docker build -t nuxeo-acme --build-arg NUXEO_CLID .
$ docker run -d --name nuxeo nuxeo-acme
425d138bc6d9b49dee92791296a3a60ec92718dd6b066c9f2821b03e24a6d093
$ docker exec nuxeo cat /opt/nuxeo/server/nxserver/config/notification-config.xml
<?xml version="1.0"?>
<component name="org.nuxeo.ecm.platform.ear.config.notification">

  <extension
    target="org.nuxeo.ecm.platform.ec.notification.service.NotificationService"
    point="generalSettings">
    <settings>
      <serverPrefix>http://localhost:8080/nuxeo/</serverPrefix>
      <eMailSubjectPrefix>"[ACME] " </eMailSubjectPrefix>
      <mailSessionJndiName>java:comp/env/Mail</mailSessionJndiName>
    </settings>
  </extension>

</component>
$ docker rm -f nuxeo
```

We can see that our configuration has been taken into account.


Specifying Another Email Prefix For The DEV Environment
=======================================================

[ACME] is the default prefix. But for a development environment, it may be a problem that the prefix is the same than in production: it could lead to misinterpreation on some test messages. To change that configuration in dev, we could ask the devops team to manage that configuration at the infrastructure level and override it in the global `nuxeo.conf`. The other and better way of doing it is to add a `nuxeo.dev` file next to the `nuxeo.defaults` one and fill it with:
```
nuxeo.notification.eMailSubjectPrefix="[ACME Dev] "
```

When starting Nuxeo, setting the `NUXEO_ENVIRONMENT` variable to `dev` will append the content of that file to the configuration. That way, Ops team just have to set the `NUXEO_ENVIRONMENT` variable for the correct configuration to be picked up.

After adding that file, we will test our DEV environment with the same Docker pattern:


```shell
$ mvn clean package
$ docker build -t nuxeo-acme --build-arg NUXEO_CLID .
$ docker run -d --name nuxeo nuxeo-acme
425d138bc6d9b49dee92791296a3a60ec92718dd6b066c9f2821b03e24a6d093
$ docker exec nuxeo cat /opt/nuxeo/server/nxserver/config/notification-config.xml | grep eMailSubjectPrefix
      <eMailSubjectPrefix>"[ACME] " </eMailSubjectPrefix>
$ docker rm -f nuxeo
nuxeo
$ docker run -d -e NUXEO_ENVIRONMENT=dev --name nuxeo nuxeo-acme
$ docker exec nuxeo cat /opt/nuxeo/server/nxserver/config/notification-config.xml | grep eMailSubjectPrefix
      <eMailSubjectPrefix>"[ACME Dev] " </eMailSubjectPrefix>
$ docker rm -f nuxeo
nuxeo
$
```

We can see that in the second run, by running the same image, hence the same package, we have been able to have a different configuration specific to the dev environment.


A More Sophisticated Example
============================

In the previous example, we just configured an existing Nuxeo configuration parameter bound to an environment. In Nuxeo, the configuration might
also take the form of contribution to the extension point of a component. Let's say that we want to change the background color of the login box
in our dev environment to orange so that it can't be taken for the production one. We need to look at [how to customize the login page](https://doc.nuxeo.com/nxdoc/how-to-customize-the-login-page/) to see that we need to extend the `PluggableAuthenticationService`.

Let's add the following file in `nuxeo-acme-package/src/main/resources/install/templates/marketplace-acme/config/login-screen-config.xml.nxftl`:

```
<component name="org.nuxeo.login.startup.page.web.contrib.override">
<#if !((org.nuxeo.prod.environment)??) || (org.nuxeo.prod.environment) != "true">
  <require>org.nuxeo.login.startup.page.web.contrib</require>

  <extension point="loginScreen" target="org.nuxeo.ecm.platform.ui.web.auth.service.PluggableAuthenticationService">
    <loginScreenConfig>
      <loginBoxBackgroundStyle>#ffa500</loginBoxBackgroundStyle>
    </loginScreenConfig>
  </extension>
</#if>
</component>
```

By adding the `.nxftl` extension to the file, it will be treated as a Freemarker template during the startup preprocessing phase.
Freemarker allows to use conditional structure which brings a lot of power to our configuration mecanism.

and the following file in `nuxeo-acme-package/src/main/resources/install/templates/marketplace-acme/nuxeo.prod`:
```
org.nuxeo.prod.environment=true
```

Now we can rebuild the image and test the result:

```shell
$ mvn clean package
$ docker build -t nuxeo-acme --build-arg NUXEO_CLID .
$ docker run -d --name nuxeo -p 8080:8080 nuxeo-acme
425d138bc6d9b49dee92791296a3a60ec92718dd6b066c9f2821b03e24a6d093
$ open http://localhost:8080/
```
![Nuxeo Dev](/images/2021-01-11-nuxeo-dev.png)

```shell
$ docker rm -f nuxeo
nuxeo
$ docker run -d -e NUXEO_ENVIRONMENT=prod --name nuxeo nuxeo-acme
$ open http://localhost:8080/
```
![Nuxeo Prod](/images/2021-01-11-nuxeo-prod.png)


Conclusion
==========

In this how-to, we've seen how to bundle some environment specific configurations inside a Nuxeo package and then inside a Docker container. It allows developper teams to handle their applicative configuration and removes that responsibility from ops team that then just need to handle very generic configuration like the type of environment. It allows with a few convention to handle very common use case where you want some configuration to be different from an environment type to another (SAML endpoint, external web service endpoint etc...).

References
==========

 * The sample project: [https://github.com/dmetzler/nuxeo-acme](https://github.com/dmetzler/nuxeo-acme)
