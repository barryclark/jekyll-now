---
layout: post
title: Notes from AWS Summit in San Francisco April 2018
---

Below is a series of notes that I took while I was attending the AWS Summit in San Francisco. There was definitely an information overload. However, it was exciting to learn the new tools that are out there and be able to gain the pulse on what other companies are working on right now.

The most exciting tools at the Summit was the **Serverless architecture**, **Fargate** as well as **DeepLens**.

1. **Serverless architecture** - is a cloud computing execution model in which the cloud provider dynamically manages the allocation of machine resources. On AWS you create **Lambda** applications and **Step Functions** 
2. **AWS Fargate** - is an easy way to deploy your containers on AWS. **Fargate** is like EC2 but instead of giving you a virtual machine you get a container. It’s a technology that allows you to use containers as a fundamental compute primitive without having to manage the underlying instances. 
2. **IoT DeepLens** - Amazon partnered with Intel where Intel provides a powerful hardware with a camera. The software that runs on the DeepLens camera is able to understand the output from a Machine Learning Trained Models. So you build your Machine Learning training models, and then upload to AWS. Amazon Machine Learning then trains those model and then you feed the output to your Deeplens camera. Then you can simply disconnect your Deeplens from internet and it will be able to recognize objects based on your training models. It's really cool.
3. **EC2 Spot Instances** - This is great to know and understand when to use Spot instances in order to save money as well as being good corporate citizens.

## Spot Instances for EC2

Use spot instance advisor

1. Ondemand Instances (OI) - good for stateless
2. Reserved Instances (RI)- good for stateful
3. Spot Instances (SI) - good for stateless

***Do not run databases on spot.*** 

**An Example of a 3 tier web application**

1. spot - 13%
2. on-demand - 11%
3. reserved - 76%

Containerized application look at Fargate and Lambda.

```
Don't live with the collateral damage of your failures.
```

1. Right sizing
2. Elasticity (turn stuff off!)
3. Measure monitor improve
4. Use launch templates to streamline and simplify the launch templates
5. Use tags to understand your services
6. Architect your workloads with performance and cost in mind. (figure out what resources needs to be on Spot, OnDemand and Reserved instances)
7. Optimize across the three purchasing options.

**Summary**

1. Build free from constraints
2. Optimize cost and performance
3. Accelerate your innovation.


## AWS Step Functions

### Step Functions

https://aws.amazon.com/step-functions/

1. Define steps in json file (Uses Amazon Step Language)
2. Visualize step function in AWS console
3. Monitor executions

**Seven state types**

1. Task - unit of work
2. Choice - branching logic like if-else
3. Parallel - fork execution and join data across tasks
4. Wait - simple time used to pause for specified time duration
5. Fail - stops an execution
6. Succeed - successfully tops an execution 
7. Pass - pass through of input to output. Maybe used as a test task that does nothing, simply takes data provided in input and return it as output. Or can be used to share data across tasks.

### Test workshops

Here is a sample test tool for learning Step Functions - http://amzn.to/sfn-workshop

```
export AWS_ACCESS_KEY_ID=ASIAIYXT5W3KWMDYB3ZA
export AWS_SECRET_ACCESS_KEY=coW6S5N8zNeF4tzk+E9F8NliBxR4HTCF1B0llGQk
export AWS_SESSION_TOKEN=FQoDYXdzEGcaDE1TItM1ujrKS4aJiSLtAdLpaS1X7UxmZ208oi51arQkWgMMIlN+skYVHLDsU5EkoWHJpNrnG/xHYjAwE7gWWodUpG+uw4P/ehNKjxQjExg436rwlGAPDAqcOrn41SP6WpPU/rcveBnw+YKV3sZIz4jGiu9FHWkA5LPxqhIhH0EIs40VvfE8nbIEjVeoL3B5VgfKTP5Xl2Jybc9Wv2otunPCbIYUcgtjVDQkEbGVmIQOsQjtUOYpsOvpDby35xTSDp4/yo+9E0BjitNP4WIDoUoytsfMaYPr3TtC0uSIrhNSVvtSzswQoCjSBLZkcsv1p45d3AuAwsKMYh/rfyjBj5XWBQ==
export AWS_DEFAULT_REGION=us-west-2
```
You can define an **Asynchronous** *Activity Task* which is polled by workers.

#### Input/Output Processing

Input -> State(x) -> Output

There are paths:

1. InputPath - a chance to massage the data before it can be passed to the next path / step
2. ResultPath - allows you to concatenate the data you processed with the original data that you received. (ie. $.metadata)


#### Activity task for manual approval

These are task that require a manual intervention. It could be a case where an email is send to an approver. In email, it may have a link to **Approve** and **Reject** the request.

#### Use Wait + Choice to wait for batch job/async calls

This simulates a loop and use the choice lambda function to be used as an exit path.

#### Ways for trigger Step Functions

1. Can be triggered from a Cloud Watch event. 
2. You can start Step function from a Lambda function.


## Kubernetes

Kubernetes is a platform for running and deploying containers at scale.

Cloud Native applications

### Kubernetes on AWS

1. API Server
2. Controller manager 
3. Cloud controller 
4. Scheduler
5. KuberDNS (Dashboard)


Kubernetes has these basic components:

1. Master
2. EtcD
3. Worker nodes (application)

You need to manage and support the components mentioned above.

## Amazon EKS

Amazon EKS - Highly available and scalable Kubernetes service

In EKS, **Master** and **EtcD** are managed and abstracted by Amazon and the worker is what you care about.


### EKS Architecture

1. How to provision EKS Worker Nodes? - EKS optimized army, and cloud formation template can spin worker nodes and spin them in your environment.
2. IAM authentication with Kubernetes - IAM credentials are used to authenticate in front of AWS service. It uses the **heptio** for authentication. 
3. **CNI** (Container Network Interface) -native VPC networking with CNI plugin
4. **Calico** https://www.projectcalico.org - is an opensource managed by **Tigera** https://www.tigera.io and it uses Kubernetes Network Policies.  

### Upgrade Strategy

**"On-Demand Updates"** - Amazon EKS will automatically upgrade minor versions.

### Auto-scaling with Amazon EKS

1. Horizonal Pod autoscaler - can scale based on cloud watch metrics generated by K*s generated metrics (CPU)
2. Cluster autoscaler is reactive - if HPA fails, it will autoscale.
3. AWS Auto Scaling groups work as usual. This is the default mode on AWS.

### PrivateLink Endpoints and EKS

Service endpoint to appear as a (see https://aws.amazon.com/about-aws/whats-new/2017/11/introducing-aws-privatelink-for-aws-services/)

### EKS is Kubernetes Certified

It means it has the same functions and APIs that are 1:1 with the upstream open source Kubernetes.

### PKI and TLS

The communication between the Master on Amazon EKS to your application inside your VPC is encrypted and uses **TLS**.

### Load Balancing

CoreOS ALB Ingress Controller: Supported by AWS

Exposes ALB functionality

See https://github.com/coreos/alb-ingress-controller - this is a Step 7 Load Balancer.

### ExternalDNS 

Service discovery at VPC level.

ExternalDNS is a relatively new Kubernetes Incubator project that makes Ingresses and Services available via DNS. It currently supports AWS Route 53 and Google Cloud DNS. 

There are several similar tools available with varying features and capabilities like **route53-kubernetes**, **Mate**, and the DNS controller from **Kops**. 

https://github.com/kubernetes-incubator/external-dns

## Reference

* AWS Summit Agenda - https://aws18sf.smarteventscloud.com/connect/agenda.ww
* IoT DeepLens - https://aws.amazon.com/deeplens/ and get the camera here https://www.amazon.com/dp/B075Y3CK37
* Kubernetes  - https://kubernetes.io
* Running Kubernetes Locally - https://kubernetes.io/docs/getting-started-guides/minikube/#minikube-features
* ExternalDNS - https://github.com/kubernetes-incubator/external-dns
* AWS Step Functions - https://aws.amazon.com/step-functions/, Self paced tool for learning Step Functions - http://amzn.to/sfn-workshop
* AWS Lambda (Serverless application) - https://aws.amazon.com/lambda/
* AWS Fargate - https://aws.amazon.com/blogs/aws/aws-fargate/





