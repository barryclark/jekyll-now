---
layout: post
title: Slack Notifications & Alertmanager 
author: ed_marshall
image: phone.jpg
---


A simple guide, taking a look at how we can enhance the quality of the alert notifications we recieve from Alertmanager in our Slack channels. The changes we run through allow us to enrich the quality of the information in our alerts, allowing us to make better decisions up-front when responding to an event.

Alertmanager is the go-to method of alert handling, routing and delivery for Prometheus. It's a fantastic yet simple tool that allows us to customise how we handle the alerting aspects of our monitoring systems. The process of installing and configuring Alertmanager is already well [documented](https://www.robustperception.io/using-slack-with-the-alertmanager/).

Based on the same powerful PromQL that Prometheus uses, it's easy to see why it's a popular choice. This article hopes to offer a simple guide to getting more value out of Alertmanager when used to drive notifications, in our case into Slack.

# But Why?
By design, the default Alertmanager template for Slack is deliberatley brief. This has been done on the expectation that it serves as a notification with just enough details for the engineer to then investigate. Though I understand the thinking, having additional context to an alert and making them more usable can help recievers assess the alert and make better decisions, faster. 

Lets dig deeper...

![StandardAlert]({{ site.baseurl }}/images/alert_basic.png "StandardAlert")

As you can see, in it's default guise, the detail provided is fairly limited, we know:
* The Alert's name within Prometheus
* The fact it's currently firing
* The severity

One of the problems with the above is the alert name in Prometheus can often be shorthand and not at all clear, also, we have no context as to the values involved that have triggered the alarm. 

Unless you setup the above yourself personally, it doesn't give a lot away to the reciever. If it's 02:00 and you've been called out due to a systems failure, this can add additional delays whilst you dial-in to get at that contextual information that Prometheus holds.

# Another Way

Below is a screenshot from Alertmanager, configured in this case to provide the team with a richer level of information:

![Alert]({{ site.baseurl }}/images/alert.png "Alert")

Slack will deliberatly collapse messages over five lines long, this is useful to avoid creating noise in a channel. Here's the alert when a user expands the message in Slack using the 'show more' option:

![AlertExpanded]({{ site.baseurl }}/images/alert_expanded.png "AlertExpanded")

Let's have a look in more detail; 

* **Summary**, here we can see a clear concise summary of the issue, this is far more readable than the formatting of the actual alert name in Prometheus allows.
* **Description**, allows us to detail more relevant information.
* **Severity**, a user defined field that allows us to perform some basic classification of alerts and can be used to inform notification preferences.
* **Graph**, a link to the relevant query using the Prometheus graph interface, this usually requires some additional config that's detailed futher down.
* **Runbook**, this one is actually more useful than I first appreciated. This field allows you to specify the URL of a runbook that's associated to an alert. For example; a disk usage alert on a database server could link through to a runbook on how to safely clear it down. This can be super useful to ensuring smooth and predictable responses to common issues from on-call teams.
* **Details**, in this section we range through additional fields that are present to ensure we are representing all the essential info.

# How to customise
If the detail shown above looks like it would add value for yourself and your teams, below are the steps we followed to achieve this.

## Step 1 - Alert Rules
The alert notification is only as useful as the data you feed it, first up let's look at how we can define our alert rules to ensure we can enrich our alert messages. 

Standard rules tend to look something like this: 

```
ALERT ElasticacheCPUUtilisation
  IF aws_elasticache_cpuutilization_average > 80
  FOR 10m
  LABELS
    ANNOTATIONS {
    summary = "Elasticache CPU Alert",
    description = "Elasticache CPU Usage is high, please investigate"
```

Keeping in-mind our template for how we will consume these alerts, update your rules to ensure they are concise and descriptive. For example: 

```
ALERT ElasticacheCPUUtilisation
  IF aws_elasticache_cpuutilization_average > 80
  FOR 10m
  LABELS { severity = "warning" }
    ANNOTATIONS {
    summary = "ElastiCache CPU Utilisation Alert",
    description = "Elasticache CPU Usage has breach the threshold set (80%) on cluster id {{ $labels.cache_cluster_id }}, now at {{ $value }}%",
    runbook = "https://mywiki.com/ElasticacheCPUUtilisation",
  }
```

## Step Two - Prometheus configuration

The 'graph' link provides us with a direct link to the Prometheus graph view for that query. The issue however is that it's likely to guess that URL wrong. When behind a proxy or running the container as an image, this value needs setting to something your clients browser can resolve.

To do this, define the following flag to Prometheus and restart the Prometheus server: 
```
-web.external-url=http://externally-available-url:9090/
```

## Step Three - Alertmanager configuration

Below is the config used to produce the alerts in the format shown earlier:

{% raw %}
```
receivers:
  - name: 'iw-team-slack'
    slack_configs:
    - channel: alert-events
      send_resolved: true
      api_url: https://hooks.slack.com/services/<your_token>
      title: '[{{ .Status | toUpper }}{{ if eq .Status "firing" }}:{{ .Alerts.Firing | len }}{{ end }}] Monitoring Event Notification'
      text: >-
        {{ range .Alerts }}
           *Alert:* {{ .Annotations.summary }} - `{{ .Labels.severity }}`
          *Description:* {{ .Annotations.description }}
          *Graph:* <{{ .GeneratorURL }}|:chart_with_upwards_trend:> *Runbook:* <{{ .Annotations.runbook }}|:spiral_note_pad:>
          *Details:*
          {{ range .Labels.SortedPairs }} • *{{ .Name }}:* `{{ .Value }}`
          {{ end }}
        {{ end }}
```
{% endraw %}

Of note, this has been tailored for our environment, we group our alerts by the 'alertname', so we can reieve multiple alerts of the same type in a single message. 
Here we set the title to something abstract, we then range through the alerts in the `text` field. 

# Summary

The above simple changes certainly provide value for us, hopefully they help others looking to customise their alerts too. Good examples of PromQL and alert rules can be hard to come by, they exist but are somewhat hard to find. 

To that end, we've created a repo to help share some of these examples [here](https://github.com/infinityworksltd/Guide_Rancher_Monitoring). 
It would be super cool if people could add their own handy tips/rules/alerts to the growing list! 
