---
layout: post
title: A Nuxeo Immutable Image
excerpt: |
  Having immutable deployment artifact is a must have when you want to achieve repeatable
  deployments. Let's see how to achieve that with Nuxeo.
img_url: /images/2019-10-23-nuxeo-immutable-image.png
img_credits: Photo by <a href="https://unsplash.com/@frankiefoto">frank mckenna on Unsplash</a>
---

Immutable Infrastructure
========================

In the DevOps culture, you may often hear about immutable infrastructure. This describes an infrastructure where deployments are reproducible and immutable: if executed twice, it should give the same result. It is important because it guarantees that a given deployment leads to only one given state.

For instance, when the underlying infrastructure needs to be changed (think of a disk failure), it is easy to redeploy our application on a new machine. Another use is when we detect that the application has been compromised, we can just shut down the actual deployment, and run a new one. And finally, when for whatever reason a team decides to rollback the application to a former state, immutable deployments are super useful. There are plenty of other uses cases where immutable deployment are super helpful and it's one of the reasons why pods and replicasets are immutable in kubernetes for instance.

At Nuxeo, we have been providing a Docker image for a very long time: they are often seen as a good way to provide immutable infrastructure. However, the driver has very often been to make the image super configurable at runtime. We provide lots of ways to provide configuration which makes it a non immutable image. Look for instance at this command:

```console
# docker run -e NUXEO_PACKAGES="-s my-package" nuxeo:10.10
```

This allows running a Nuxeo 10.10 Docker image in which we will install the snapshot version of `my-package` which can change over time. We also execute every shell script that is present in the `docker-entrypoint-initnuxeo.d` which allows doing pretty much everything we want in the container. From an immutable infrastructure perspective, it's definitely not gonna help!


Identifying The Source Of Configuration
=======================================

From the beginning of Nuxeo, it was very clear that we wanted to put as much configuration that we can in the application artifact by itself. That's why we have extension points that allow to define schemas, types, workflows etc... and package them as a Java JAR. This part is immutable.

But there are some configuration needs remaining that we cannot put inside those artifacts because they can change depending on various factors:

 * The custom JARs, that define their own custom types or automation operation etc...
 * The Nuxeo packages that we want to install (Drive, S3 binary manager etc...)
 * The `templates` that we want to activate (to enable Redis for instance)
 * Some environment type specific properties: you probably don't want to use the same SAML endpoint between your dev and prod environments, but you probably want to use the same for all development environments.
 * What we call bindings configuration: the addresses and credentials to access the underlying backends (MongoDB, Elasticsearch....)
 * Some specific configuration like `JAVA_OPTS` or `NUXEO_CLID`

We want to sort this configuration in two types:

 * properties that are immutable and should be part of the deployed artifact
 * properties that are totally dependent on the environment in which they are deployed (DB bindings for instance) and that we agree to make it mutable.


Nuxeo Packaging System For Immutable Configuration
==================================================

Nuxeo packages are a good way to bundle different sources of configuration. The JAR that we want to deploy can be packaged, and the manifest can reference versioned dependencies. With this definitions, we can easily package JARs and dependent packages.

Nuxeo packages also allow to declare templates, in which we can include other templates. Some installation directives also allow to add a given template to the `nuxeo.templates` property of the configuration file.

We will then use the Nuxeo packaging sytem to bundle those configuration source and install them in a new Docker image:

```
FROM nuxeo:10.10

RUN /docker-entrypoint.sh nuxeoctl mp-init && \
    /docker-entrypoint.sh $NUXEO_HOME/bin/nuxeoctl mp-install my-package-2.3.4
```

After this, we have an image in which we have new JARs installed in our `bundles` directory, an additional template brought by the Nuxeo package and an updated `nuxeo.conf` that uses that template.

The fact that `nuxeo.conf` has been updated is super important here. It means that some state (the list of additional templates) has been persisted to `nuxeo.conf`. For that reason, we'll have to keep that `nuxeo.conf` all over our deployment. We now only can append configuration to it.


Environment Type Based Configuration
====================================

Some configurations are really part of the application, but their value may differ given the environment you are dealing with. We mentioned SAML endpoint but let's just look at the `org.nuxeo.dev=true` that obviously needs to be enabled only for dev environments.

No mechanism in Nuxeo allows to do that out of the box. However, the templating system refers to a `nuxeo.defaults` that is included in `nuxeo.conf` when the template is activated. `defaults` stands for default values and we want to provide specific values for `dev`, so let's create a `nuxeo.dev` file in our template that will contain our specific development property.

Now, let's say that at runtime we define a `$NUXEO_ENVIRONMENT` environment variable that we set to `dev`. A simple script like the following can append our `nuxeo.dev` file to the `nuxeo.defaults`:

```sh
# Adding environment specific variables
if [ -n "$NUXEO_ENVIRONMENT" ]; then
  pushd $NUXEO_HOME/templates > /dev/null
  find . -name nuxeo.$NUXEO_ENVIRONMENT  | awk -F'/' '{print $2}' | while read i; do
    echo "Appending specific [$NUXEO_ENVIRONMENT] environment configuration from template $i"
    cat ./$i/nuxeo.$NUXEO_ENVIRONMENT >> ./$i/nuxeo.defaults ;
  done
  popd > /dev/null
fi

```

Because we want our image to be immutable, we can decide to get rid of the `docker-entrypoint-initnuxeo.d` feature and just hard code a `configure.sh` script in there to make it work.

Binding The Backends Stores
===========================

The adresses and credentials of every backend store (DB, Elasticsearch, S3 etc...) are very specific to each deployment. That's a legitimate reason to have specific configuration here.

A direct reaction would be to generate a `nuxeo.conf` by the automation and mount it in `docker-entrypoint-initnuxeo.d`. Unfortunately, we cannot do that anymore because we decided to hard copy our shell script above in it, but more importantly because of the `nuxeo.conf` that is in our baked image contains the state of all installed packages and specifically the `nuxeo.templates` property that has been modified by the various other packages installations.

The solution I found is to create a `/etc/nuxeo/conf.d/` folder in which we can put files that will be appended to `nuxeo.conf` at runtime. It allows to have one file per backend, for instance `20-mongodb.conf` would contain:

```
nuxeo.mongodb.server=mongodb://localhost:27017
nuxeo.mongodb.dbname=nuxeo
```
We can handle the copy of those file by the same `configure.sh` script that we used earlier:

```sh
# Handling /etc/nuxeo/conf.d/
find /etc/nuxeo/conf.d/ -type f | while read i;  do
  echo "Adding $i to $NUXEO_CONF"
  cat $i >> $NUXEO_CONF
done
```

In a Kubernetes based environment, those files can be mounted from secrets exposed by the various backends.

Other Configuration?
====================

With all the mechanisms that we put in place above, we covered pretty much every configuration use case of the Nuxeo platform. There are two environment variables that are configuration and that we will keep as mutable configuration:

 * `NUXEO_CLID`: it can be seen as a binding but cannot be configured thru `nuxeo.conf` so we keep it here. It doesn't have any real visible effect on the application anyway.
 * `JAVA_OPTS`: unfortunately, as it is read by the `nuxeoctl` client before templates are evaluated, we cannot use the template mechanism to configure it. As it's mainly to configure the JVM Heap Size, I would set it by default to something using the `-XX:MaxRAMFraction=2` options of the JVM (see [https://medium.com/adorsys/jvm-memory-settings-in-a-container-environment-64b0840e1d9e](https://medium.com/adorsys/jvm-memory-settings-in-a-container-environment-64b0840e1d9e)) to get a dynamic configuration based on the container CGroups limits.

Conclusion
==========

With all those conventions, and apart from the 2 last 2 environment variables, we now don't need any additional configuration. The good news is that we now don't have to maintain a full `nuxeo.conf` file for each environment, it's all included in our image.

An alternative to this is to bake one single image for each environment that contains every single piece of configuration. If the idea seems interesting, it doesn't allow you to promote the same image across every environment because there will always be a build needed to include configuration. It also add a constraint of rebuilding the image when some password is changing of some key are rotated!

Those hacks allow to transform the generic official 10.10 image into an immutable deployment ready image. Of course it still contains the remaining parts that allow to mute it (think about `NUXEO_PACKAGES`), but it's a real step forward that will help you keeping the application configuration in just one place.

References
==========

 - A Github project containing the build recipes: [https://github.com/nuxeo-sandbox/docker-nuxeo-conffree](https://github.com/nuxeo-sandbox/docker-nuxeo-conffree)
 - Dynamic JVM heap configuration: [https://medium.com/adorsys/jvm-memory-settings-in-a-container-environment-64b0840e1d9e](https://medium.com/adorsys/jvm-memory-settings-in-a-container-environment-64b0840e1d9e)
