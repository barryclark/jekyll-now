---
id: 400
title: 'Kubernetes Storage Simplified'
date: '2022-03-01T08:37:58+00:00'
author: Ryan
excerpt: 'In this blog post, we will attempt to explain the current storage options that exist in Kubernetes. If you are new to Kubernetes, learning about its capabilities of managing the application state can be a daunting task.'
layout: post
guid: 'https://geekyryan.com/?p=400'
permalink: '/?p=400'
gd_system_blocks_used:
    - '{"core/paragraph":36,"core/code":9,"core/list":3,"core/heading":4}'
image: /wp-content/uploads/2022/02/header.png
categories:
    - 'Azure Kubernetes Service'
    - kubernetes
tags:
    - aks
    - 'azure kubernetes service'
    - kubernetes
    - storage
---

In this blog post, we will attempt to explain the current storage options that exist in Kubernetes. If you are new to Kubernetes, learning about its capabilities of managing the application state can be a daunting task.

Container images are built-in layers, with the runtime layer being writable. However, any files on this writable layer are only available for the container’s lifetime. We can mount a volume to a directory inside the container to have persistent data.

Kubernetes storage uses the concepts of volumes. Ephemeral volumes are called volumes and only last the lifetime of a pod, and “persistent volumes” are used for long-term storage. A typical use case for Ephemeral volumes is storing logs that are not sent to stdout.

Mounting a persistent volume inside a container allows you to persist the state of your application long after the container is terminated. Persistent volumes can also take advantage of the typical storage idiosyncrasies such as backup, compression, and encryption.

## Persistent Volumes

Kubernetes has several types of persistent volumes. At its core, a persistent volume is simply a directory mounted inside a pod. How that volume is created, the configuration options and the medium that backs it are all determined by the type of volume created.

There are several types of volumes available, too many to list here. You may commonly see some volume types: NFS, iSCSI, hostpath, and local. If your Kubernetes cluster exists in a cloud environment such as Azure or AWS, other volume types are available to you (azureDisk, azureFile, and awsElasticBlockStore, respectively). A complete list of types can be found here:

<https://kubernetes.io/docs/concepts/storage/persistent-volumes/#types-of-persistent-volumes>

Creating a persistent volume is generally a simple task. The first step is determining the type of volume to create. In this post, we will cover creating a local volume. A local volume represents a disk, partition, or directory shared from a node. Local volumes are subject to the availability of the underlying node, meaning that if the node is offline, the volume is also offline and will not be accessible by any pod. Because of this, local volumes should not be used in production.

A persistent volume can only be created using a declarative approach. To create a persistent local volume, use the following YAML definition:

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
    # the path to the volume or directory on the node
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

When creating a persistent volume of this type, you must specify a node affinity. This ensures that the Kubernetes scheduler schedules any pods requesting access to this volume on the correct node. For example, any pod requesting access to the persistent volume named ‘example-PV will only be scheduled on the node ‘node01’.

Let’s dive into this persistent volume spec a bit more:

You can change the capacity of the persistent volume by updating:

```
<pre class="wp-block-code">```
spec:
  capacity:
    storage: 100Gi
```
```

The accessModes will be determined by the storage provider being used. There are generally 3 access modes available: ReadWriteOnce, ReadWriteMany, and ReadOnlyMany.

- ReadWriteOnce – The volume can be mounted as read-write by a single node
- ReadWriteMany – The volume can be mounted as read-write by many nodes
- ReadOnlyMany – The volume can be mounted as read-only by many nodes

The “persistentVolumeReclaim” policy determines what happens to a persistent volume when it is no longer mounted by any pods (i.e., there are no claims to it, more on this later). There are three options available for the reclaim policy:

- Retain – The persistent volume is kept as-is. It must be manually removed when no longer needed.
- Recycle – The persistent volume is scrubbed and can be re-used by other pods
- Delete – The persistent volume is deleted.

Currently, only NFS and hostPath volumes support recycling. Cloud storage providers (Azure, AWS, and GCE) support deletion.

The other aspects of this spec are unique to the volume being used. Since we are using a local volume here, we must specify the path to the directory or volume on the host and the host which is sharing the directory or volume:

```
<pre class="wp-block-code">```
  local:
    # the path to the volume or directory on the node
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

## Ephemeral Volumes

Note: The Kubernetes documentation recognizes configMaps and Secrets as ephemeral volumes. However, in this article, we will only discuss ephemeral volumes used for data storage (emptyDir volumes).

Ephemeral volumes are defined within the context of a pod. This means that you cannot create an ephemeral volume on its own. Instead, define the ephemeral volume in the pod or a deployment spec.

Ephemeral volumes are useful in a few scenarios:

1. You want to share data between multiple containers in a pod
2. You want to cache temporary information such as log files
3. You need scratch space to store data before it is processed by another container or pod

If one of the containers in the pod happens to restart, data on the ephemeral volume will still exist; as long as one of the containers is mounting, it stays online. In other words, if a pod mounting the ephemeral volume is removed from a node, data on the ephemeral volume is lost. However, if a pod crashes, the data on the volume remains intact.

As stated previously, creating an ephemeral volume is done as part of the pod or deployment template:

```
<pre class="wp-block-code">```
apiVersion: v1
kind: Pod
metadata:
  name: test-pd
spec:
  containers:
  - image: k8s.gcr.io/test-webserver
    name: test-container
    volumeMounts:
    - mountPath: /cache
      name: cache-volume
  volumes:
  - name: cache-volume
    emptyDir: {}
```
```

If the template, you add a volume of type ’emptyDir’ in the ‘volumes’ spec and name it. You can mount this volume in any container in the pod. The volume does not have to be mounted to the same directory in each container.

## Persistent Volume Claims

A persistentVolumeClaim (often referred to as a ‘PVC’) is used by a pod to create a ‘claim’ on storage. Using a PVC, a pod can mount multiple persistent volumes simultaneously to any directory in the pod.

PersistentVolumeClaim’s are a Kubernetes primitive that can be deployed from a manifest:

```
<pre class="wp-block-code">```
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: fast-storage-pvc
spec:
  accessModes:
    - ReadWriteMany
  volumeMode: Filesystem
  resources:
    requests:
      storage: 8Gi
  storageClassName: fast
```
```

Most of the options in the manifest above seem pretty obvious. The volumeMode specifies whether to consume the persistent volume as a FileSystem or block device. The resources section helps specify the amount of storage you require (8Gi in this example). We will cover the storageClassName in the next section. Finally, the accessModes are identical to those described above in the Persistent Volumes section.

Pods access a volume by using the persistentVolumeClaim as volume. Claims must exist in the same namespace as the pod using the claim. The controller finds the claim in the pods’ namespace and uses it to find a persistent volume capable of backing the claim. The volume is then mounted on the host and attached to the pod.

To create a pod that utilizes a PVC, use the following yaml definition:

```
<pre class="wp-block-code">```
apiVersion: v1
kind: Pod
metadata:
  name: test-pd
spec:
  containers:
  - image: k8s.gcr.io/test-webserver
    name: test-container
    volumeMounts:
    - mountPath: /mnt/share
      name: azfileshare
  volumes:
  - name: cache-volume
    persistentVolumeClaim:
      claimName: azfileshare
```
```

## Storage Classes

In this article, we will only be referencing Kubernetes storage classes with respect to dynamic provisioners. If you would like to learn more, please reference the Kubernetes docs:

<https://bit.ly/3ruJD2A>

Storage Classes have many uses. Kubernetes is unopinionated about what a storage class represents. They can be used to represent different characteristics of storage (performance, compression method, file system modes, etc.). Storage Classes can also be used to provision persistent volumes dynamically, which will be the focus of this article.

Storage classes are often packaged with CSI drivers. Each StorageClass contains the fields “provisioner”, “parameters”, and “reclaimPolicy”. The provisioner field is used to determine what CSI driver is used for provisioning volumes.

This is an example of the storage class packaged with the AzureFiles CSI driver:

```
<pre class="wp-block-code">```
kind: StorageClass
apiVersion: storage.k8s.io/v1
metadata:
  name: azurefileshare
provisioner: file.csi.azure.com # replace with "kubernetes.io/azure-file" if aks version is less than 1.21
mountOptions:
  - dir_mode=0777
  - file_mode=0777
  - uid=0
  - gid=0
  - mfsymlinks
  - cache=strict
  - actimeo=30
parameters:
  skuName: Standard_LRS
```
```

You can see in the above manifest that the provisioner is set to ‘file.csi.azure.com.’ When a pod uses a PVC in its manifest that references this storage class, the provisioner will dynamically manage the underlying storage.

The name of the storageClass is referenced in the persistentVolumeClaim:

```
<pre class="wp-block-code">```
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: azfileshare
spec:
  accessModes:
    - ReadWriteMany
  resources:
    requests:
      storage: 8Gi
  storageClassName: azurefileshare
```
```

You could then reference this PVC in a pod:

```
<pre class="wp-block-code">```
apiVersion: v1
kind: Pod
metadata:
  name: test-pd
spec:
  containers:
  - image: k8s.gcr.io/test-webserver
    name: test-container
    volumeMounts:
    - mountPath: /mnt/share
      name: azfileshare
  volumes:
  - name: cache-volume
    persistentVolumeClaim:
      claimName: azfileshare
```
```

That concludes this article. I know that is a lot of information! As always, if you have any questions or comments, please reach out.