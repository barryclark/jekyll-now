---
id: 425
title: 'Deleting Failed/Evicted Pods'
date: '2022-01-27T15:40:59+00:00'
author: Ryan
layout: revision
guid: 'https://geekyryan.com/?p=425'
permalink: '/?p=425'
---

```
<pre class="wp-block-code">```
NAME       READY   STATUS    RESTARTS   AGE
nginx      0/1     Evicted   0          10s
```
```

```
<pre class="wp-block-code">```
kubectl get pod --all-namespaces --field-selector=status.phase==Failed
```
```

```
<pre class="wp-block-code">```
kubectl delete pod --all-namespaces --field-selector=status.phase==Failed
```
```