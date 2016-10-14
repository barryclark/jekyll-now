---
layout: post
title: Visualising Our Digital Footprint
author: ed_marshall
image: visual_header.jpeg
---

Visualisation has always been a critical component of the services I've worked on. I beleive that visualising the services you run and the systems you manage, is a key part of engaging your teams and enabling them to buy into the services you provide. I'll likely explore this subject further in a future blog, for now though I'd like to talk about visualisation, in this instance of our digital footprint at Infinity Works.

On a recent trip back to our head office in Leeds, I took a moment to observe the teams based there. They do an excellent job of visualising work in progress through physical kanban boards, they also do an excellent job of visualising the systems we manage and the key business metrics for those services. I say 'business metrics', what I mean are real-time metrics which quantify the quality and reliability of the services we provide, and how our customers are interacting with our products.

I'm a huge fan of the economics of open source, and I'm always pushing the work we do in the wider open source community, this got me thinking... 

How, as a consultancy do we visualise our own digital footprint? Why don't we track, measure and visualise this, as we do so well for our customers? we thought we would have a little go at creating something exciting, the aim being we could put something that represents our digital footprint and the things we do in the wider community. 

# What to measure

How could we visualise such a thing? we wanted to know:

* *How do we interact with open source code?* We want to see key metrics for our primary public open-source platform, Github. we're particularly interested in the volume of open-source public code we host on github, interactions such as forks/stars of these repositories.
* *How are people using the stuff we contribute?* We want to see key metrics for our most popular distribution mechanisms, currently that's primarily the Docker Hub.
* *How many people are viewing our website and reading out engineering blogs?* We don't need a wealth of metrics here but a few simple values would help is track and encourage engagement.

Let's start with these simple metrics to ascertain our current levels of community interaction. Ultimately we want to use this data to track and encourage more open source collaboration across Infinity Works.

## Strong Foundations

Personally, I've spent a lot of time working with metrics recently, we decided upon the following tools to help me visualise this data:

* [Prometheus](https://prometheus.io/) - Used as my scraping engine with a solid time series database to boot
* [Grafana](http://grafana.org/) - Who else does graphs better?

## Mapping in the data

We're off to a good start, but it's time to get our hands dirty to get at the information we need. Neither Github nor Docker Hub have native Prometheus support, there also wasn't an option we could find within the community.
We set out to create some tools for us and others to use, should they find them useful... (yay opensource!) 

* Github Exporter ([Docker Hub](https://hub.docker.com/r/infinityworks/github-exporter/), [GitHub](https://github.com/infinityworksltd/github-exporter))
* Docker Hub Exporter ([Docker Hub](https://hub.docker.com/r/infinityworks/docker-hub-exporter/), [GitHub](https://github.com/infinityworksltd/docker-hub-exporter))

Whilst simple, the above two exporters helps us capture the metrics from the APIs and present them for scraping by the prometheus server. We can use these metrics to measure our contribution back to the community.

Github fortunately has a simple, well documented API to retrieve the information you need. We made us of the Prometheus client libraries and some python to extract the data we needed from repositories and organisations.

Docker Hub also has a API, unfortunately it's somewhat un-documented at this stage. Thanks to [@thebsdbox](https://twitter.com/thebsdbox?lang=en-gb) for a pointer in the right direction and we were away, again using a simple python script to collect the data and present it to Prometheus to scrape.

So... How does this fit together?

![Simple Diagram]({{ site.baseurl }}/images/prom-infin.png "Simple Diagram")

Simple really, Prometheus operates on a pull based approach which keeps everything easy to setup.

*We also need an exporter for google analytics, this is still underway as googles API is a tad more involved than the above, i'll update the blog once it's completed.*


## Visualising the Metrics

Now we've captured the data, we've built a Grafana dashboard around the metrics. Attempting to represent the current state of our online presence, and how that's trending over time.
Below is a screenshot of the current version at the time of writing. 

First, we have an overview of our Github activity, click [here]({{ site.baseurl }}/images/github_stats.png) to view fullscreen.
![GitHub Screenshot]({{ site.baseurl }}/images/github_stats.png "GitHub Screenshot")

Secondly, we have an overview of our DockerHub activity, click [here]({{ site.baseurl }}/images/docker_hub_stats.png) to view fullscreen.

![Docker Hub Screenshot]({{ site.baseurl }}/images/docker_hub_stats.png "Docker Hub Screenshot")

## What's next?

This is very much a first step in the direction of what we hope can be achieved. We would like to compliment the data gathered with richer metrics, from more sources. How many Slack messages did we exchange today? How many cups of coffee did the team last month? The list is endless, but we've made a start. And of course, it's all open-source. We encourage you to get involved and improve upon what's there so far.

The exporters are linked above, the config used to deploy this and the exported Grafana dashboard are available [here](https://github.com/infinityworksltd/infin-eye)

We didn't want to over-complicate this, so kept the hosting as simple as possible. We've put the configuration of our services into a docker-cloud.yml file that can be passed up to docker cloud either through the GUI or via the CLI.
From there, it deploys onto (in this case Digital Ocean) a number of containers across a small docker swarm cluster. 

So, in the end, what does this give you? Hopefully, a snapshot of how we are contributing to the open source community and how people are using our digital services. As mentioned before, watch this space for another blog around the importance of visualisation.

## Useful Links 
* [Prometheus website](https://prometheus.io/)
* [Prometheus Github](https://github.com/prometheus/prometheus)
* [Robust Perception](https://www.robustperception.io/)
