---
id: 506
title: 'Injecting multiple Kubernetes volumes to the same directory'
date: '2022-03-11T22:30:33+00:00'
author: Ryan
layout: revision
guid: 'https://geekyryan.com/?p=506'
permalink: '/?p=506'
---

We can inject configuration files into containers using Kubernetes config maps and secrets. However, if we want multiple configurations originating from different config maps or secrets to be injected into the exact location, we must specify a subpath:

```
<pre class="wp-block-code">```
kind: Deployment
apiVersion: apps/v1
metadata:
  name: hello-world
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: hello-world
    spec:
      containers:
      - name: hello-world
        image: docker.example.com/app:1
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

This example will create two volumes from the contents of the config map `hello-world-config` and the secret `hello-world-credentials`.

Imagine, these resources have the following contents:

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
  credentials.properties: <base64>
type: Opaque
```
```

In this example, the key application.properties from the configuration map will be mounted to a file with the same name under /config/, and the secret value credentials.properties will be mounted to a second file under that directory. Both files will be read-only accessible to the application.

The `subPath` declaration also allows to mount a single volume into the pod multiple times with different sub paths.