---
id: 505
title: 'Injecting multiple Kubernetes volumes to the same directory in a pod'
date: '2022-04-30T14:21:05+00:00'
author: Ryan
layout: post
guid: 'https://geekyryan.com/?p=505'
permalink: '/?p=505'
gd_system_blocks_used:
    - '{"core/paragraph":9,"core/code":2,"core/image":2}'
categories:
    - Uncategorized
---

We can inject configuration into containers using Kubernetes config maps and secrets. These objects can be consumed by a pod as environment variables, command-line arguments, or as configuration files mounted in a volume. For the subject of this article, we will focus on mounting multiple config maps/secrets into a single directory on a pod.

Mounting a configmap or secret in a Volume is relatively straightforward (for anyone familiar with Kubernetes primitives). Take for example the following deployment definition:

```
<pre class="wp-block-code">```
kind: ConfigMap
apiVersion: v1
metadata:
  name: hello-world-config
data:
  application.properties: |
    greeting=Hello
    name=World

---

kind: Secret
apiVersion: v1
metadata:
  name: hello-world-credentials
data:
  credentials.properties: <base64 goes here>
type: Opaque

---

kind: Deployment
apiVersion: apps/v1
metadata:
  name: hello-world
spec:
  replicas: 1
  selector:
    matchLabels:
      app: hello-world
  template:
    metadata:
      labels:
        app: hello-world
    spec:
      containers:
        - name: hello-world
          image: busybox:latest
          command:
            - /bin/sh
            - -c
            - sleep 5000
          volumeMounts:
            - name: hello-world-config-volume
              mountPath: /config/application.properties
              readOnly: true
            - name: hello-world-credentials-volume
              mountPath: /config/credentials.properties
              readOnly: true
      volumes:
        - name: hello-world-config-volume
          configMap:
            name: hello-world-config
        - name: hello-world-credentials-volume
          secret:
            secretName: hello-world-credentials

```
```

When this deployment is created, we see two directories are created in this pod (one for the configMap, and one for the secret). How can we mount these as two *files* in the ‘config’ directory, rather than two individual directories?

<figure class="wp-block-image size-full is-style-default">![](https://geekyryan.com/wp-content/uploads/2022/04/image.png)</figure>The ‘VolumeMounts’ directive within the container spec of the deployment has an optional (less-known) parameter named ‘subPath’. By using this parameter, we can mount a configMap and secret in the same directory within a pod.

Let’s focus on the following deployment spec:

```
<pre class="wp-block-code">```
kind: ConfigMap
apiVersion: v1
metadata:
  name: hello-world-config
data:
  application.properties: |
    greeting=Hello
    name=World

---

kind: Secret
apiVersion: v1
metadata:
  name: hello-world-credentials
data:
  credentials.properties: <base64 goes here>
type: Opaque

---

kind: Deployment
apiVersion: apps/v1
metadata:
  name: hello-world
spec:
  replicas: 1
  selector:
    matchLabels:
      app: hello-world
  template:
    metadata:
      labels:
        app: hello-world
    spec:
      containers:
        - name: hello-world
          image: busybox:latest
          command:
            - /bin/sh
            - -c
            - sleep 5000
          volumeMounts:
            - name: hello-world-config-volume
              mountPath: /config/application.properties
              subPath: application.properties
              readOnly: true
            - name: hello-world-credentials-volume
              mountPath: /config/credentials.properties
              subPath: credentials.properties
              readOnly: true
      volumes:
        - name: hello-world-config-volume
          configMap:
            name: hello-world-config
        - name: hello-world-credentials-volume
          secret:
            secretName: hello-world-credentials

```
```

Now, if we deploy this, we can see that we have two files in the ‘config’ directory of the pod, rather than a subdirectory for each config/secret:

<figure class="wp-block-image size-full is-style-default">![](https://geekyryan.com/wp-content/uploads/2022/04/image-1.png)</figure>In this example, the key application.properties from the configuration map will be mounted to a file with the same name under /config/, and the secret value credentials.properties will be mounted to a second file under that directory. Both files will be read-only to the application.