---
id: 457
title: 'Kubernetes Evicted Pods'
date: '2022-02-06T01:06:08+00:00'
author: Ryan
layout: revision
guid: 'https://geekyryan.com/?p=457'
permalink: '/?p=457'
---

In this article, we will dive into the process of pod eviction in a Kubernetes cluster, how you can pod prevent pod eviction, and how you can recover from such a situation.

- - - - - -

## What is Pod Eviction?

Kubernetes pod eviction is a type of involuntary service disruption in which a pod is forcefully stopped on a node or fails to be scheduled on a node. Pod eviction can happen for a variety of reasons. The most common of which is resource starvation on a node. This is referred to as “node-pressure eviction.”

```
<pre class="wp-block-code">```
NAME       READY   STATUS    RESTARTS   AGE
nginx      0/1     Evicted   0          10s
```
```

- - - - - -

## Eviction Process

The kubelet process running on the node monitors resources such as CPU, memory, disk space, inodes, etc. When one of these resources reaches a certain consumption level, the kubelet will first attempt to clean up resources by deleting non-running pods and images (in the case of storage starvation). The kubelet will then fail one or more pods on the node to reclaim resources. The class of the pod determines the order in which it does this.

**Pod Classes**

- Guaranteed: Pods that have requests and limits configured for both CPU and memory
- Burstable: Pods with a resource request configured for memory or CPU
- Best Effort: Pods without any requests or limits

The kubelet will first evict any “best-effort” pods. If this is not enough, the kubelet will evict any “burstable” pods. Pods within the “guaranteed” class are theoretically safe from eviction.

During a node-pressure eviction, the kubelet sets the PodPhase for the selected pods to “Failed.” This causes the pods to terminate. If a daemonSet or replicaSet manages the pod, the Kubernetes controller-manager will create new pods on another node.

- - - - - -

## Recovery

Node-pressure eviction is almost always avoidable. We can prevent this type of issue by ensuring that we properly size our clusters and create resource limits for pods.

**Resource** **Requests and Limits:**

- Requests: The minimum amount of resources (CPU/memory) that a container needs to start.
- Limits: The maximum amount of resources that a container is allowed to use.

Pod resources and requests can be defined in a pod spec or deployment spec. Below is an example of a pod spec with resource requests and limits defined:

```
<pre class="wp-block-code">```
apiVersion: v1
kind: Pod
metadata:
  name: frontend
spec:
  containers:

  - name: nginx
    image: nginx
    resources:
      requests:
        memory: "64Mi"
        cpu: "250m"
      limits:
        memory: "128Mi"
        cpu: "500m"
```
```

- - - - - -

You will often need to clean up evicted pods manually. If you find that your cluster has a large amount of evicted pods, you can clean them up with the following kubectl commands:

**To see all failed pods in the cluster:**

```
<pre class="wp-block-code">```
kubectl get pod --all-namespaces --field-selector=status.phase==Failed
```
```

**To remove all failed pods in the cluster:**

```
<pre class="wp-block-code">```
kubectl delete pod --all-namespaces --field-selector=status.phase==Failed
```
```

I hope this article has been helpful. Please reach out if you have any questions or comments! Also, if you would like to learn more, take a look at the official Kubernetes docs:

<https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/>