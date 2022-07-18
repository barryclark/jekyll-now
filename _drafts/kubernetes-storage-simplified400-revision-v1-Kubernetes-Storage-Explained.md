---
id: 409
title: 'Kubernetes Storage Explained'
date: '2022-01-23T00:52:02+00:00'
author: Ryan
layout: revision
guid: 'https://geekyryan.com/?p=409'
permalink: '/?p=409'
---

## Intro

In this blog post, we will attempt to explain the current storage options that exist in Kubernetes. If you are new to Kubernetes, learning about its capabilities of managing the application state can be a daunting task.

Container images are built in layers, with the runtime layer being writable. However, any files on this writable layer are only available for the lifetime of the container. To have persistent data, we can use a volume. Kubernetes storage is based on the concepts of volumes. There are ephemeral volumes that are simply called volumes and only last the lifetime of a pod, and “persistent volumes” that are used for long-term storage. A typical use case for Ephemeral volumes is storing logs that are not sent to stdout. Mounting a persistent volume inside of a container allows you to persist the state of your application long after the container is terminated.

<div class="wp-container-31 wp-block-buttons"></div>## Persistent Volumes

Kubernetes has several types of persistent volumes. At its core, a persistent volume is simply a directory, mounted inside of a pod. How that volume is created, the configuration options, and the medium that backs it are all determined by the type of volume being created.

There are several types of volumes available, too many to list here. Some volume types that you may commonly see are NFS, iscsi, hostpath, and local. If your Kubernetes cluster exists in a cloud environment such as Azure or AWS, other volume types are available to you (azureDisk, azureFile, and awsElasticBlockStore). A full list of types can be found here:

<https://kubernetes.io/docs/concepts/storage/persistent-volumes/#types-of-persistent-volumes>

Creating a persistent volume is generally a simple task. The first step is determining the type of volume to create. In this post, we’ll cover creating a simple local volume. A local volume represents a disk, partition, or directory shared from a node. LocalVolume’s are subject to the availability of the underlying node, meaning that if the node is offline, the volume is also offline and will not be accessible by any pod. Because of this, local volumes should not be used in production.

A local volume can only be created using a declarative approach. To create a volume of this type, use the following YAML definition:

```
<pre class="wp-block-code">```
apiVersion: v1
kind: PersistentVolume
metadata:
  name: example-pv
spec:
  capacity:
    storage: 100Gi
  volumeMode: Filesystem
  accessModes:
  - ReadWriteOnce
  persistentVolumeReclaimPolicy: Delete
  storageClassName: local-storage
  local:
    # the path to the volume on the node
    path: /mnt/disks/ssd1
  nodeAffinity:
    required:
      nodeSelectorTerms:
      - matchExpressions:
        - key: kubernetes.io/hostname
          operator: In
          values:
            # name of the node sharing the volume
          - node01
```
```

This YAML definition creates a persistent volume of type “local”. When creating a persistent volume of this type, you are required to specify a node affinity. This ensures that the Kubernetes scheduler schedules any pods requesting access to this volume on the correct node. n

## Ephemeral Volumes

dal;ksdjf;lasjldf;asdfdflsjk

## Persistent Volume Claims

A persistentVolumeClaim (often referred to as a ‘PVC’) is used to mount a volume in a pod. A pod can mount multiple persistent volumes simultaneously.

## Storage Classes

asdfsadfasdfasdfsadfasdf

## Mounting Volumes in Pods

A pod can mount any number of volumes of different types simultaneously.