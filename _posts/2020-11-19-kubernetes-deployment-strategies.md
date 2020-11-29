---
layout: post
title: Kubernetes Deployment Strategies
---
In a bid to learn a bit of Kuberenetes and to solidify my understanding of some common methods of deployments I took on a challenge to give a demo on it. I covered recreate, rolling, blue/green and canary deployments. This blog contains some key takeaways from it.

If you're not familiar with Kubernetes I highly recommend you read the <a href="https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/" target="_blank">official documentation</a>. They are a pleasure to read (not something I can often say about documentation). If you'd like to skip to the code then <a href="https://github.com/JackOHara/k8-deployment-strategies" target="_blank">click here</a>.


## Recreate
Let's say you have a stack in production and you want to deploy a new version of your app to it. Recreate will kill all pods from the current version in production and after they have been terminated it will bring up pods with the new version to replace them. Systems will occur downtime in between killing the old version and bringing up the new version.
It's often called reckless due to the downtime that occurs with it but there are some genuine use cases for it.

![_config.yml]({{ site.baseurl }}/images/recreate.png)

### The Good
* No two versions of your app will be alive at one time. This means you won't need to handle things like sticky sessions for users. It can be useful if your old and new code isn't able to co-exist.
* You will have some downtime that can be useful for doing data migrations/transformations that aren't possible on a live system.

### The Bad
* Rollouts take time. You must wait for the old version to be killed and then wait for the new version to be brought up.
* Rollbacks will take a similar amount of time.

## Rolling
This is the default deployment strategy provided by Kubernetes. Let's say you have some pods running your app and you want to deploy a new version. Kubernetes will kill a specified number of pods (known as maxUnavailable) at once and bring up a specified number of pods at the same time (know as maxSurge). And it will repeat this until all pods are using the new version of the application.

If maxSurge is one and maxUnavailable is one it will kill one and bring up a new one. Once it see's that the new version is alive and doing well it will move repeating the same process until our new version is fully deployed.

![_config.yml]({{ site.baseurl }}/images/rolling.gif)


### The Good
* No down time.

### The Bad
* Rollouts and rollbacks can take time (although their time can be reduced greatly by playing with maxSurge and maxUnavailable).
* Old and new versions of code must be able to co-exist.
* Users may experience both versions of the app if sticky sessions are not handled. 

## Blue/Green
So you want to deploy a new version of your app. Spin up an identical version of your production stack but with the new version. Keep traffic pointed towards the old production stack. When you are ready to rollout point your Kubernetes service to the new stack. If you're having issues after rollout you can have your service redirect traffic back to the old stack. Boom instant rollbacks as well.


I think this is a pretty good deployment strategy and provides a lot of advantages without too much additional complexity.



![_config.yml]({{ site.baseurl }}/images/blue_green.png)


### The Good
* Instant rollouts and rollbacks.
* No down time.
* You can QA in the identical stack.
* No two version will be in use at the same time.

### The Bad
* It can be expensive to run an identical production stack.


## Canary
Miners in the old days used to bring a canary bird with them into the mines. If the bird died then they knew there toxic gases and they should leave. 

In deployment terms we run a new version of our app alongside the old version. We monitor the new version to see if it's healthy. If it's not we roll back (leave the mine). If it is we continue to kill pods with the old version and replace them with new ones. 

You can use any metric you want to determine if your canary is healthy but some pretty common ways are to check the number of errors in the logs and check the number of 400/500 responses.

![_config.yml]({{ site.baseurl }}/images/canary_1.png)
![_config.yml]({{ site.baseurl }}/images/canary_2.png)
![_config.yml]({{ site.baseurl }}/images/canary_3.png)

### The Good
* It can handle rollbacks automatically.
* It provides much more confidence when releasing new features.

### The Bad
* It can be very slow to rollout depending on how long it takes to evaluate if your canary is healthy.
* Sticky sessions might be required if your old and new code is incompatible.
* It can be tricky to implement using just the tools Kubernetes provides (but there are a lot of solutions out there like Harness.io to help you).


## Sources
- <a href="https://www.bluematador.com/blog/kubernetes-deployments-rolling-update-configuration" target="_blank">https://www.bluematador.com/blog/kubernetes-deployments-rolling-update-configuration</a>
- <a href="http://blog.itaysk.com/2017/11/20/deployment-strategies-defined" target="_blank">http://blog.itaysk.com/2017/11/20/deployment-strategies-defined</a>
- <a href="https://martinfowler.com/bliki/CanaryRelease.html" target="_blank">https://martinfowler.com/bliki/CanaryRelease.html</a>