---
layout: post
title: Baby steps to k8s
---

Recently, I had the opportunity to design a new system that uses kubernetes instead of EC2. To be fair, when this trend started a few years ago, I read several blog posts explaining the why's, what's and how's but I always thought that technology will only affect the DevOps / Ops people work. _Wrong!!_

I have to admit, this managed cluster idea that manages our containers providing auto-scaling and auto-healing is quite cool! Well, I am not going to explain the advantages and disadvantages of k8s, instead, I will write about it from a developer perspective, adressing question like: how to run it locally, how to play with it and how to deploy.

So... kubernetes is a managed cluster of containers! To run it locally, we need to setup the cluster using `minikube`.
It's pretty standard to install, search in your package manager. For instance, in macOS, if you use brew, it will download and install it automatically for you.

In this example, I will use the following Kubernetes components: services and controllers (deployments). Therefore, I would definetely recommend that you read the following docs.
* https://kubernetes.io/docs/concepts/workloads/controllers/deployment/
* https://kubernetes.io/docs/concepts/services-networking/service/

After this installation process, you need to start the service.
* `minikube start --vm-driver=hyperkit`

Managing the cluster requires another tool: `kubectl`. Check your package manager and install it.
To "deploy" your container, you need to run the following command.
* `kubectl run <deployment-name> --image=<your-docker-username>/<your-image> --port <your-exposed-port>`
Please note, you need to push your image to your docker account. It is possible to use local images, but this will require small changes in your minikube.

Finally, what we need to expose the deployment using a service and then we can hit the exposed port.
* `kubectl expose deployment <deployment-name> --type=NodePort`
* `curl $(minikube service <deployment-name> --url)`

All of this steps can be replaced by .yaml files that represent your deployments and services. Something pretty cool as you can keep multiple deployments and services definitions in your git! To run those scripts you, you just need to execute the following command.
* `kubectl create -f <your-filename>.yaml`

In sum, it isn't hard to play with k8s. I will use it in my side-projects as it is quite simple to deploy in AWS by using EKS or even Fargate. I created a small flask webserver that runs on top of minikube and it is works well, check my github and try it.

###### References
* https://github.com/alizard0/flask-k8s
* https://kubernetes.io/docs/setup/minikube/
* https://github.com/learnk8s/spring-boot-k8s-hpa
