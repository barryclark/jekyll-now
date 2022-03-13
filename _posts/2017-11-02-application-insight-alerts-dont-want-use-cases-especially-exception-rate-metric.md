---
id: 275
title: "Application Insight Alerts, why You don't want to use them in some cases, especially &#8220;exception rate&#8221; metric."
date: 2017-11-02T17:36:41+02:00
author: Janusz Nowak

guid: http://blog.janono.pl/?p=275
permalink: /2017/11/application-insight-alerts-dont-want-use-cases-especially-exception-rate-metric/
header:
  teaser: /wp-content/uploads/2017/11/2017-11-02-11_38_34-Metrics-Explorer-Microsoft-Azure.png
categories:
  - Application Insights
tags:
  - alert
  - applicationinsights
  - ARM
---

## Why we do not want to use all application insight alerts ?

Let create azure function like this:

```csharp
const string Time = "0/60 * * * * *";
[FunctionName("FunctionName")]
public static void Run([TimerTrigger(Time)]TimerInfo myTimer, TraceWriter log)
{
try
{
  throw new Exception();
}
catch (Exception)
{
}
}
```

Also let create application insight alert with metric exception rate:
![Metrics-Explorer-Microsoft-Azure](/wp-content/uploads/2017/11/application-inisight-alert-create-exception-rate.png)

And now we will start to receive emails about alert fire up.

When we will dig into metric explorer we will see "0" exceptions but if we dig more and add exception rate metric we will see that it is more then "0"

![Metrics-Explorer-Microsoft-Azure](/wp-content/uploads/2017/11/2017-11-02-11_38_21-Metrics-Explorer-Microsoft-Azure.png)

And the reason of that is that the exception rate metric is also catching handled exceptions.

![Metrics-Explorer-Microsoft-Azure](/wp-content/uploads/2017/11/2017-11-02-11_38_34-Metrics-Explorer-Microsoft-Azure.png)

_Exception rate_ is a system performance counter. The CLR counts all the handled and unhandled exceptions that are thrown, and divides the total in a sampling interval by the length of the interval. The Application Insights SDK collects this result and sends it to the portal.

From my point of view this do not make sense,

especially when there are cases in code when you can handle situations only by catching exceptions.

In summary we want to have all possible alerts setup but we should not use "exception rate" metric alert.

Here can find more about [System performance counters in Application Insights](https://docs.microsoft.com/gl-es/azure/application-insights/app-insights-performance-counters)
