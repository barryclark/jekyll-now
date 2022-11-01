---
layout: post
title: "Infrastructure Matters: Keynote at The DevOps Conference, Copenhagen"
description: "Cheryl Hung discusses why sustainable infrastructure matters, and frameworks, tools and groups to explore."
image: https://pbs.twimg.com/media/FgfFF9YX0AEg_gm?format=jpg&name=medium
location: Copenhagen, Denmark
slides: //www.slideshare.net/slideshow/embed_code/key/4JCciRBeuCu7Gw
tags:
  - Video
  - "2022"
---

In this keynote, I discuss why sustainable infrastructure matters, and share frameworks, tools and groups for infrastructure builders.

With hyperscale cloud computing, we now have near-infinite computing resources at our fingertips. But data centres emit as much CO2 as the global airline industry, and that will only increase with growing deployment of AI, smart cities, blockchain and other compute-intensive technologies.

Sustainability, GreenOps and Net Zero aren’t faraway concepts - what you build today directly impacts our planet and our future. How do you understand how to use resources most effectively, and will you create infrastructure that matters?

Recommended tools:

* [Cloud Carbon Footprint](https://github.com/cloud-carbon-footprint/cloud-carbon-footprint) is a tool to estimate energy use and carbon emissions from public cloud usage.
* [Kepler](https://github.com/sustainable-computing-io/kepler) (Kubernetes Efficient Power Level Exporter) uses eBPF to probe energy-related system stats and exports as Prometheus metrics.
* [Kube-green](https://github.com/kube-green/kube-green) is a simple Kubernetes add-on that automatically shuts down (some of) your resources when you don't need them.
* [Kube-downscaler](https://codeberg.org/hjacobs/kube-downscaler) scales down or "pauses" Kubernetes workloads during non-work hours.

Recommended groups:

* [CNCF TAG Environmental Sustainability](https://github.com/cncf/tag-env-sustainability) launched in May 2022 and will be releasing an end user survey in Q4 2022.
