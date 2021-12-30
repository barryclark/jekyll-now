---
layout: post
title: Threat Modeling Tool - Docker Templates
---

After creating some Templates for AWS it's time to make a first step into Containerization. The created Docker Templates are based on [OWASP Container Security](https://github.com/OWASP/Docker-Security) and Liz Rice's Container Security. Especially the last point needs some more facilitation to fill the gaps.

The Docker Template is thought as a baseline for k8s but first things first. Currently I felt the urge to create more insights into my private container landscape. 

-> [TMT Cloud Templates](https://github.com/BenjiTrapp/tmt-cloud-templates)

![_config.yml]({{ site.baseurl }}/images/blog_2021_31_12_tmt_docker.png)

Based on this example threat model the output with it's containing risks and threats looks like [this](/assets/posts/docker_full_report.htm)
