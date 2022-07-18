---
id: 515
title: 'Remove Kubernetes Namespace Stuck in the Terminating State'
date: '2022-06-04T18:29:41+00:00'
author: Ryan
layout: post
guid: 'https://geekyryan.com/?p=515'
permalink: '/?p=515'
Likes:
    - '2'
Dislikes:
    - '0'
'Likes minus dislikes':
    - '2'
gd_system_blocks_used:
    - '{"core/paragraph":19,"core/code":4,"core/separator":1,"core/image":1}'
image: /wp-content/uploads/2022/06/2022-06-04_14h27_42.png
categories:
    - 'Azure Kubernetes Service'
    - kubernetes
tags:
    - aks
    - 'azure kubernetes service'
    - bash
    - kubernetes
    - Linux
    - Powershell
---

In this post, we will discuss how to remove a Kubernetes namespace that is stuck in the ‘terminating’ state.

A namespace is like a container. You can use it to store related objects in a Kubernetes environment. Maybe you are hosting a blog in Kubernetes. This blog will likely have a database, a frontend website, a load balancer (service) to spread the incoming traffic among ‘x’ number of frontend containers (pods), and maybe some middle-tier or utility applications. One day, you decide you no longer want this blog, so you plan to delete it. Rather than tediously deleting all of the various entities associated with this blog, you can delete the namespace that contains these entities. This will essentially ‘cascade delete’ the resources within the namespace as well.

After deleting the namespace for your blog, you notice that it still exists, but the state of it is ‘Terminating’, and it has been like this for a long time (hours or maybe even days).

<figure class="wp-block-image size-full">![](https://geekyryan.com/wp-content/uploads/2022/06/image.png)</figure>Kubernetes will occassionally fail to delete third-party resources when deleting a namespace, causing the namespace to linger. This can happen if the third-party API managing the resource is not responding to requests. To verify if any of these resources still exist, use this command:

```
<pre class="wp-block-code">```
kubectl api-resources --verbs=list --namespaced -o name | xargs -n 1 kubectl get --show-kind --show-all --ignore-not-found -n <terminating-namespace>
```
```

If you happen to see any resources in the output, you can try force deleting them and then try to delete the namespace again.

- - - - - -

In my experience, the majority of the time you will not find any resources still hanging around. Rather, the namespace will be completely empty. What is going on here?

Let’s take a look at the namespace:

```
<pre class="wp-block-code">```
$ kubectl get namespace darn-c101 -o yaml
apiVersion: v1
kind: Namespace
metadata:
  annotations:
	kubectl.kubernetes.io/last-applied-configuration: |
	kubernetes.io/metadata.name: darn-c101
spec:
  finalizers:
  - kubernetes
status:
  conditions:
 - lastTransitionTime: "2022-06-01T19:05:31Z"
	message: 'Some content in the namespace has finalizers remaining: darn-c101.geekyryan.io/finalizer in 1 resource instances'
	reason: SomeFinalizersRemain
	status: "True"
	type: NamespaceFinalizersRemaining
  phase: Terminating
```
```

Notice the inclusion of the finalizers field in the above JSON. Some namespaces have a finalizer defined under spec.

A finalizer is a special metadata key that tells Kubernetes to wait until a specific condition is met before it fully deletes a resource. Much like a finalizer in the .NET framework (does Java have those too? 😀 )

So when you run a command like `kubectl delete namespace <namespace>`, Kubernetes checks for a finalizer in the `metadata.finalizers` field. If the resource defined in the finalizer cannot be deleted, then the namespace is not deleted either. This puts the namespace into a perpetual terminating state and is never actually deleted.

When an object has been terminating for an excessive time, check its finalizers by inspecting the `metadata.finalizers` field in its YAML.

So we now know what the problem is. How can we solve it? Well, it’s actually quite simple. If you are using bash, use this script:

```
<pre class="wp-block-code">```
#!/bin/bash

namespaces=$(kubectl get ns --field-selector=status.phase==Terminating -o jsonpath='{range .items[*]}{.metadata.name}{"\n"}{end}')

if [ -z "$namespaces"]
then
  echo "No namespaces to delete."
  exit
else
  for namespace in $namespaces
  do
    echo "[Removing Namespace]: $namespace"
    kubectl get namespace $namespace -o json | tr -d "\n" | sed "s/\"finalizers\": \[[^]]\+\]/\"finalizers\": []/" | kubectl replace --raw /api/v1/namespaces/$namespace/finalize -f - > /dev/null 2>&1
  done
fi
```
```

[Delete Terminating Kubernetes Namespaces with Bash (github.com)](https://gist.github.com/rnemeth90/e83bb4c8808f0d28412cb40edb2487d3)

It will search for any namespace that is stuck in the terminating state and forcefully remove it by removing the finalizers field and then using ` kubectl replace` to commit the change back to the Kube API.

If you prefer Powershell, you can use this script:

```
<pre class="wp-block-code">```
$terminatingNamespaces = kubectl get ns --field-selector=status.phase==Terminating -o jsonpath="{range .items[*]}{.metadata.name}{'\n'}{end}"

foreach ($ns in $terminatingNamespaces) {
    Write-Verbose '[FOUND]: Forcefully removing $ns'
    $jsonObj = kubectl get namespace $ns -o json | ConvertFrom-Json | foreach-object { $_.spec.finalizers = @(); $_ } |
    convertto-json | kubectl replace --raw /api/v1/namespaces/$namespace/finalize -f -
}
```
```

[Delete Terminating Kubernetes Namespaces with Powershell (github.com)](https://gist.github.com/rnemeth90/19d7de622a5009c1cf908c5d4deb5358)

It does the same thing as the bash script, just in more of a Window-zy way.

It’s that simple. I hope this was helpful. If you have any questions, comments, or concerns, please feel free to reach out.