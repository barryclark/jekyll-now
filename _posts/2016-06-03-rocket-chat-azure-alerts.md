---
layout: post
title: Rocket.Chat Integrations
subtitle: How to integrate social media and other information streams into your Rocket.Chat instance via Webhooks
category: dev
tags: [howto, automation, devops]
author: doru_mihai
author_email: doru.mihai@haufe-lexware.com
header-img: "images/new/Exportiert_22.jpg"
---

As you probably [already know](/irc-chatops/), within Haufe we have decided to switch to Rocket.chat from Slack.

One of the things we had grown accustomed to with Slack were it's variuous built in integrations. And Rocket lacks in that department but it does have support for generic [Webhook Integrations](https://rocket.chat/docs/administrator-guides/integrations/), and there are guides and how-to's for the usual integrations you might need/want.

## Azure App Insight Alerts

One of the cool things you can to in Azure is to have Alerts set on different kinds of conditions.

You can test if your website or web application is accesible, or that it returns what you expect, or if the response time or load is within certain bounds. You can read more about them [here](https://azure.microsoft.com/en-us/documentation/articles/app-insights-alerts/).

I did a pull request with this guide on the rocket.chat official documentation and as a result you can now also find it in the [Rocket.Chat.Docs](https://rocket.chat/docs/administrator-guides/integrations/azurealerts-md/).

In order to do the necessary configuration in Rocket.Chat you need administrative rights.

Just follow these steps:

1. In Rocket.Chat go to "Administration"->"Integrations" and create "New Integration"
2. Choose Incoming WebHook.
3. Follow all instructions like Enable, give it a name, link to channel etc.
4. **Most Important Step**: Set "Enable Script" to true and enter the javascript snippet below in the "Script" box.
4. Press Save changes and copy the *Webhook URL* (added just below the script box).
5. Go to the azure portal and on the specific resource you want to enable Alerts for follow the steps for enabling Alerts and set the previously copied URL as the webhook URL for the Azure Alert. You can follow the steps shown here: https://azure.microsoft.com/en-us/documentation/articles/insights-webhooks-alerts/


Paste this in javascript in the "Script" textarea on Rocket.Chat webhook settings:

```javascript

class Script {
  process_incoming_request({ request }) {
    // console is a global helper to improve debug
    console.log(request.content);

    var alertColor = "warning";

    if(request.content.status === "Resolved"){ alertColor = "good"; }
    else if (request.content.status === "Activated") { alertColor = "danger"; }

    var condition = request.content.context.condition;

    return {
      content:{
       username: "Azure",
        text: "Azure Alert Notification",
        attachments: [{
          title: request.content.context.name,
          pretext: request.content.context.description,
          title_link: request.content.context.portalLink,
          text: condition.failureDetails,
          color: alertColor,
          fields: [
            {
              title: "Status",
              value: request.content.status + "   @ " + request.content.context.timestamp
            },
            {
              title: "Condition",
              value: condition.metricName + ": " + condition.metricValue + " " + condition.metricUnit + " for more than " + condition.windowSize + " min."
            },
            {
              title: "Threshold",
              value: condition.operator + " " + condition.threshold
            }
          ]
        }]
       }
    };

    return {
       error: {
         success: false,
         message: 'Error'
       }
    };
  }
}
```

This example shows basic processing of azure alerts that will give you the necessary information as to what happened and what is the current status, along with a status color to get an idea at a quick glimpse of the message.

The schema of the incoming message as of the official [Azure Alert Webhook Docs](https://azure.microsoft.com/en-us/documentation/articles/insights-webhooks-alerts/) is:


```json
{
"status": "Activated",
"context": {
            "timestamp": "2015-08-14T22:26:41.9975398Z",
            "id": "/subscriptions/s1/resourceGroups/useast/providers/microsoft.insights/alertrules/ruleName1",
            "name": "ruleName1",
            "description": "some description",
            "conditionType": "Metric",
            "condition": {
                        "metricName": "Requests",
                        "metricUnit": "Count",
                        "metricValue": "10",
                        "threshold": "10",
                        "windowSize": "15",
                        "timeAggregation": "Average",
                        "operator": "GreaterThanOrEqual"
                },
            "subscriptionId": "s1",
            "resourceGroupName": "useast",                                
            "resourceName": "mysite1",
            "resourceType": "microsoft.foo/sites",
            "resourceId": "/subscriptions/s1/resourceGroups/useast/providers/microsoft.foo/sites/mysite1",
            "resourceRegion": "centralus",
            "portalLink": "https://portal.azure.com/#resource/subscriptions/s1/resourceGroups/useast/providers/microsoft.foo/sites/mysite1"                                
},
"properties": {
              "key1": "value1",
              "key2": "value2"
              }
}
```

The result is that you will see messages in your specified channel or direct message looking something like this:

{:.center}
![Rocket.Chat Azure Alert]({{ site.url }}/images/rocket-chat-integrations/rocket_azure_alerts.JPG){:style="margin:auto"}

You see Azure and a cloud icon there because when configuring the Rocket.Chat incoming webhook I specified Azure as the Alias and i set :cloud: as the Emoji. Both of these settings are optional.

### Caution
Be aware, I have noticed there is a latency sometimes between the e-mail notifications and the webhook notifications, in the sense that I would sooner receive an e-mail than receive a webhook call from Azure.

So be wary of relying on this mechanism to trigger perhaps some other automations that you would want to happen in order to fix potential issues because if the issue is transient, you might find that by the time you receive the webhook call that your application is no longer responding, you might receive an e-mail telling you it's already recovered and well.

Enjoy :)
