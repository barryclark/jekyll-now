---
id: 45
title: 'Continuous Deployment Models'
date: '2022-01-14T19:24:01+00:00'
author: Ryan
layout: post
guid: 'https://geekyryan.com/?p=45'
permalink: '/?p=45'
gd_system_blocks_used:
    - '{"core/paragraph":9,"core/heading":5,"core/separator":3,"coblocks/gallery-offset":1}'
categories:
    - CI/CD
    - 'Software Deployment'
tags:
    - azure
    - CI/CD
    - devops
    - 'software deployment'
---

When deploying new software releases to servers or (insert -as-a-service&gt; here), it’s a good idea to either deploy the releases in a controlled manner or to have a quick rollback plan. This article will be diving into blue/green deployments, canary deployments, ring-based deployments, and feature tag deployments.

<div class="ez-toc-v2_0_28 counter-hierarchy counter-decimal ez-toc-black" id="ez-toc-container"><div class="ez-toc-title-container">Table of Contents

<span class="ez-toc-title-toggle"></span></div><nav>- [Blue/Green Deployments](https://geekyryan.com/?p=45/#BlueGreen_Deployments "Blue/Green Deployments")
- [Immutable Servers](https://geekyryan.com/?p=45/#Immutable_Servers "Immutable Servers")
- [Canary Deployments](https://geekyryan.com/?p=45/#Canary_Deployments "Canary Deployments")
- [Ring Based Deployments](https://geekyryan.com/?p=45/#Ring_Based_Deployments "Ring Based Deployments")
- [Feature Tag Deployments](https://geekyryan.com/?p=45/#Feature_Tag_Deployments "Feature Tag Deployments")

</nav></div>## <span class="ez-toc-section" id="BlueGreen_Deployments"></span>Blue/Green Deployments<span class="ez-toc-section-end"></span>

Blue/green deployments are a deployment model where a new application version never gets deployed to the production servers (green) directly. Instead, it gets deployed to another set of servers (blue) first. Since the blue servers are not currently serving any traffic for users, the deployment has no impact. However, once the deployment has been completed successfully and tested, users will be directed to the new deployment (blue). You can control all user traffic or a subset of user traffic if your load balancer supports it (referred to as ‘Progressive Exposure’).

  
The next release will then repeat the same process. Blue would be the current production environment, so you would first deploy to the green servers. This model requires two sets of identical hosts and a load balancer or reverse proxy in front of them. If there are any unexpected issues with the new release, it is straightforward to switch back to the previous release. The disadvantage to this type of model is that it requires having redundant environments (and potentially wasted resources). However, this is less of a concern if using container orchestration platforms such as Kubernetes.

<div aria-label="Offset Gallery" class="wp-block-coblocks-gallery-offset">- <figure class="wp-block-coblocks-gallery-offset__figure">![Blue Green deployment model](https://geekyryan.com/wp-content/uploads/2022/01/2022-01-19_07h57_58-1024x575.png)</figure>

</div>## <span class="ez-toc-section" id="Immutable_Servers"></span>Immutable Servers<span class="ez-toc-section-end"></span>

There is an alternative method of blue/green deployments called “immutable servers”. This method is identical to blue/green deployments as described above. However, after switching user traffic over to the servers with the new release, the old servers are destroyed. They are not used again. This type of model becomes particularly efficient when using a pipeline that is capable of creating servers for you (i.e., Azure DevOps Pipelines)

- - - - - -

## <span class="ez-toc-section" id="Canary_Deployments"></span>Canary Deployments<span class="ez-toc-section-end"></span>

In a canary deployment, not all users are routed to the new release immediately. Only a limited percentage of users get access to the new release. These users are the canaries. They should be monitored closely, so it is important to be using Not all users are routed to the new release immediately in a canary deployment. Only a limited percentage of users get access to the latest release. These users are the canaries.

Organizations should monitor the canaries closely, so it is essential to be using monitoring software capable of looking at the statistics of a web application from the users’ perspective (for example, Application Insights). The number of canaries can increase until all traffic is directed to the new release over time. The most significant advantage of this method is limited exposure to issues. If a problem appears after the release is deployed, only a small subset of users will experience it. After you fix the issues and redeploy the release, it’s best to select a different group of users to be canaries.

- - - - - -

## <span class="ez-toc-section" id="Ring_Based_Deployments"></span>Ring Based Deployments<span class="ez-toc-section-end"></span>

A ring-based deployment has multiple production environments. Each serves a limited number of users, similar to a canary deployment. However, you can have as many production environments as you want with a ring-based deployment. New releases are deployed to the rings one by one over time.

- - - - - -

## <span class="ez-toc-section" id="Feature_Tag_Deployments"></span>Feature Tag Deployments<span class="ez-toc-section-end"></span>

Feature flags are used to expose new features to sets of users slowly. Unlike the other deployment models, they are not implemented in the infrastructure. Instead, they are typically implemented and enabled in code or database. An example would be a feature flag in a database that gives users access to a button on your web page. A developer could enable the flag for a set of users. These users would be able to see the button; other users would not. Feature flags can even toggle bug fixes or performance improvements.

  
I will cover implementing blue/green deployments in Azure using Azure DevOps and App Services in a future article.