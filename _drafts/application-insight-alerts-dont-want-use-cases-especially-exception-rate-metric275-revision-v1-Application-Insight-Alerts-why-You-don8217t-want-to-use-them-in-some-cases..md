---
id: 279
title: 'Application Insight Alerts, why You don&#8217;t want to use them in some cases.'
date: 2017-11-02T12:53:09+02:00
author: Janusz Nowak
layout: revision
guid: http://blog.janono.pl/2017/11/275-revision-v1/
permalink: /2017/11/275-revision-v1/
---
Why we do not want to use all application insight alerts ?

Let create azure function like this:

<pre class="EnlighterJSRAW" data-enlighter-language="null">const string Time = "0/60 * * * * *";
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
}</pre>

Also let create application insight alert:  
<img class="alignnone wp-image-274" src="/wp-content/uploads/2017/11/application-inisight-alert-create-exception-rate.png" alt="" width="380" height="390" srcset="/wp-content/uploads/2017/11/application-inisight-alert-create-exception-rate.png 557w, /wp-content/uploads/2017/11/application-inisight-alert-create-exception-rate-293x300.png 293w" sizes="(max-width: 380px) 100vw, 380px" /> 

And now we will start to receive emails about alert fire up.

When we will dig into metric explorer we will see &#8220;0&#8221; exceptions but if we dig more and add exception rate metric we will see that it is more then &#8220;0&#8221;

<img class="alignnone size-full wp-image-276" src="/wp-content/uploads/2017/11/2017-11-02-11_38_21-Metrics-Explorer-Microsoft-Azure.png" alt="" width="544" height="335" srcset="/wp-content/uploads/2017/11/2017-11-02-11_38_21-Metrics-Explorer-Microsoft-Azure.png 544w, /wp-content/uploads/2017/11/2017-11-02-11_38_21-Metrics-Explorer-Microsoft-Azure-300x185.png 300w" sizes="(max-width: 544px) 100vw, 544px" /> 

And the reason of that is that the exception rate metric is also catching handled exceptions.

<img class="alignnone size-full wp-image-277" src="/wp-content/uploads/2017/11/2017-11-02-11_38_34-Metrics-Explorer-Microsoft-Azure.png" alt="" width="549" height="124" srcset="/wp-content/uploads/2017/11/2017-11-02-11_38_34-Metrics-Explorer-Microsoft-Azure.png 549w, /wp-content/uploads/2017/11/2017-11-02-11_38_34-Metrics-Explorer-Microsoft-Azure-300x68.png 300w" sizes="(max-width: 549px) 100vw, 549px" /> 

From my point of view this do not make sense,

especially when there are cases in code when you can handle situations only by catching exceptions.

In summary we want to have all possible alerts setup but we should not use &#8220;exception rate&#8221; metric alert.

&nbsp;