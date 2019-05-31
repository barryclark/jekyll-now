---
id: 238
title: Azure Function benchmark for .Net 4.7 vs .Net Core beta
date: 2017-10-25T18:45:00+02:00
author: Janusz Nowak
layout: post
guid: http://blog.janono.pl/?p=238
permalink: /2017/10/azure-function-benchmark-for-net-4-7-vs-net-core-beta/
ftf_open_type:
  - video.tv_show
disable_open_graph:
  - ""
image: /wp-content/uploads/2017/10/fun-bench.jpg
categories:
  - .Net
  - .Net Core
  - Azure Functions
tags:
  - ab benchmark
  - Azure
  - azurefunction
  - paas
---
## Azure Function benchmark for .Net 4.7 vs .Net Core beta, how much request per seconds we canÂ squeeze?

There was some benchmark done by my colleagueÂ [Roberto](https://robertoprevato.github.io/Comparing-Linux-hosted-to-Windows-hosted-ASP-NET-Core-applications-in-Azure-Application-Service-Plan/) about running application on app service plan vs app service plan for docker.

That inspired me for some other approach to run the same code sample but on azure function running .net 4.7 vs azure function running .net core

The size of machine for app service plan is S1, testing approach is ab benchmark tool running under windows hosted in azure, do not hit network limits or CPU the machine size is DS5_V2

<img class="size-full wp-image-239 alignleft" src="/wp-content/uploads/2017/10/s1.png" alt="" width="183" height="327" srcset="/wp-content/uploads/2017/10/s1.png 183w, /wp-content/uploads/2017/10/s1-168x300.png 168w" sizes="(max-width: 183px) 100vw, 183px" /><img class="size-full wp-image-240 alignleft" src="/wp-content/uploads/2017/10/DS5_V2.jpg" alt="" width="188" height="327" srcset="/wp-content/uploads/2017/10/DS5_V2.jpg 188w, /wp-content/uploads/2017/10/DS5_V2-172x300.jpg 172w" sizes="(max-width: 188px) 100vw, 188px" /> 

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

The setup is pre compiledÂ Azure Function running .Net 4.7

<img class="alignnone size-full wp-image-246" src="/wp-content/uploads/2017/10/fun-runtime.jpg" alt="" width="205" height="72" /> 

<pre class="EnlighterJSRAW" data-enlighter-language="csharp">public static class Function1
{        
    private const int MaxPage = 101;

    private static Dictionary&lt;int, string&gt; Values { get; set; } = new Dictionary&lt;int, string&gt;();

    private static string GetBodyOfSize(int i)
    {
        if (Values.ContainsKey(i))
            return Values[i];

        var s = new String('X', i);
        //Values.TryAdd(i, s);
        Values.Add(i, s);
        return s;
    }

    [FunctionName("Function1")]
    public static async Task&lt;HttpResponseMessage&gt; Run([HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)]HttpRequestMessage req, TraceWriter log)
    {
        var s = req.GetQueryNameValuePairs()
                .FirstOrDefault(q =&gt; string.Compare(q.Key, "s", true) == 0)
                .Value;

        if (string.IsNullOrEmpty(s))
        {
            // return simple hello, world
            var now = DateTime.UtcNow;
            return req.CreateResponse(HttpStatusCode.OK, $"Hello World, from ASP.NET Fun App Net 4.7! {now.ToString("yyyy-MM-dd HH:mm:ss.FFF")}");
        }

        if (int.TryParse(s, out int i))
        {
            if (i &gt; 0 && i &lt; MaxPage)
            {
                var body = GetBodyOfSize(i * 1000);
                return req.CreateResponse(HttpStatusCode.OK, body);
            }
            else
            {
                return req.CreateResponse(HttpStatusCode.BadRequest, $"Size must be an integer between 1 and {MaxPage}");
            }
        }
        else
        {
            return req.CreateResponse(HttpStatusCode.BadRequest, $"Size must be an integer between 1 and {MaxPage}");
        }
    }
}</pre>

vs Azure Function .Net Core having kestrel under hood in beta version

<img class="alignnone size-full wp-image-243" src="/wp-content/uploads/2017/10/functionbeta.png" alt="" width="235" height="89" /> 

<pre class="EnlighterJSRAW" data-enlighter-language="csharp">#r "Newtonsoft.Json"

using System.Net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using Newtonsoft.Json;


   private const int MaxPage = 101;

        private static Dictionary&lt;int, string&gt; Values { get; set; } = new Dictionary&lt;int, string&gt;();

        private static string GetBodyOfSize(int i)
        {
            if (Values.ContainsKey(i))
                return Values[i];

            var s = new String('X', i);
            Values.TryAdd(i, s);
            //Values.Add(i, s);
            return s;
        }

        public static IActionResult Run(HttpRequest req, TraceWriter log)
        {
             var s = req.Query["s"];
          if (string.IsNullOrEmpty(s))
            {                
                var now = DateTime.UtcNow;
                return  (ActionResult)new OkObjectResult($"Hello World, from ASP.NET Core and Net Core 2.0! {now.ToString("yyyy-MM-dd HH:mm:ss.FFF")}");
            }

            if (int.TryParse(s, out int i))
            {
                if (i &gt; 0 && i &lt; MaxPage)
                {
                    var body = GetBodyOfSize(i * 1000);
                    return  (ActionResult)new OkObjectResult( body);
                }
                else
                {
                    return  (ActionResult)new OkObjectResult( $"Size must be an integer between 1 and {MaxPage}");
                }
            }
            else
            {
                 return  (ActionResult)new OkObjectResult( $"Size must be an integer between 1 and {MaxPage}");
            }
}
</pre>

Cmd for testingÂ Â ab -n 5000 -c 150 -l http://&#8230;&#8230; ?s=&#8221;&#8221;Â s=1,Â s=10 ,Â s=100

ab results :

<table border="1" cellspacing="0">
  <tr>
    <td style="min-width: 50px;">
      Host
    </td>
    
    <td style="min-width: 50px;">
      Scenario
    </td>
    
    <td style="min-width: 50px;">
      RPS (mean)
    </td>
    
    <td style="min-width: 50px;">
      95% within ms
    </td>
  </tr>
  
  <tr>
    <td style="min-width: 50px;">
      azure function .net 4.7
    </td>
    
    <td style="min-width: 50px;">
      Hello World
    </td>
    
    <td style="min-width: 50px;">
      229
    </td>
    
    <td style="min-width: 50px;">
      999
    </td>
  </tr>
  
  <tr>
    <td style="min-width: 50px;">
      azure function .net 4.7
    </td>
    
    <td style="min-width: 50px;">
      1KB
    </td>
    
    <td style="min-width: 50px;">
      227
    </td>
    
    <td style="min-width: 50px;">
      999
    </td>
  </tr>
  
  <tr>
    <td style="min-width: 50px;">
      azure function .net 4.7
    </td>
    
    <td style="min-width: 50px;">
      10KB
    </td>
    
    <td style="min-width: 50px;">
      206
    </td>
    
    <td style="min-width: 50px;">
      1106
    </td>
  </tr>
  
  <tr>
    <td style="min-width: 50px;">
      azure function .net 4.7
    </td>
    
    <td style="min-width: 50px;">
      100KB
    </td>
    
    <td style="min-width: 50px;">
      127
    </td>
    
    <td style="min-width: 50px;">
      3798
    </td>
  </tr>
  
  <tr>
    <td style="min-width: 50px;">
      azure function .net core beta
    </td>
    
    <td style="min-width: 50px;">
      Hello World
    </td>
    
    <td style="min-width: 50px;">
      72
    </td>
    
    <td style="min-width: 50px;">
      2696
    </td>
  </tr>
  
  <tr>
    <td style="min-width: 50px;">
      azure function .net core beta
    </td>
    
    <td style="min-width: 50px;">
      1KB
    </td>
    
    <td style="min-width: 50px;">
      70
    </td>
    
    <td style="min-width: 50px;">
      3500
    </td>
  </tr>
  
  <tr>
    <td style="min-width: 50px;">
      azure function .net core beta
    </td>
    
    <td style="min-width: 50px;">
      10KB
    </td>
    
    <td style="min-width: 50px;">
      67
    </td>
    
    <td style="min-width: 50px;">
      3656
    </td>
  </tr>
  
  <tr>
    <td style="min-width: 50px;">
      azure function .net core beta
    </td>
    
    <td style="min-width: 50px;">
      100KB
    </td>
    
    <td style="min-width: 50px;">
      51
    </td>
    
    <td style="min-width: 50px;">
      5691
    </td>
  </tr>
  
  <tr>
    <td style="min-width: 50px;">
      azure function .net 4.7 (csx) not precompiled
    </td>
    
    <td style="min-width: 50px;">
      Hello World
    </td>
    
    <td style="min-width: 50px;">
      226
    </td>
    
    <td style="min-width: 50px;">
      1094
    </td>
  </tr>
  
  <tr>
    <td style="min-width: 50px;">
      azure function .net 4.7 (csx) not precompiled
    </td>
    
    <td style="min-width: 50px;">
      1KB
    </td>
    
    <td style="min-width: 50px;">
      242
    </td>
    
    <td style="min-width: 50px;">
      922
    </td>
  </tr>
  
  <tr>
    <td style="min-width: 50px;">
      azure function .net 4.7 (csx) not precompiled
    </td>
    
    <td style="min-width: 50px;">
      10KB
    </td>
    
    <td style="min-width: 50px;">
      200
    </td>
    
    <td style="min-width: 50px;">
      1268
    </td>
  </tr>
  
  <tr>
    <td style="min-width: 50px;">
      azure function .net 4.7 (csx) not precompiled
    </td>
    
    <td style="min-width: 50px;">
      100KB
    </td>
    
    <td style="min-width: 50px;">
      126
    </td>
    
    <td style="min-width: 50px;">
      3128
    </td>
  </tr>
</table>

&nbsp;

From results we can see that .net core on azure functions is still in beta and the performance is not amazing but if we compare azure function ruining pre compiled azure function on .net 4.7

the performance look even nice.

When comparing .net 4.7 precompiled vs .net 4.7 notÂ precompiled (csx) the result is very similar but the first call are slower.

When we look on .net core beta on Azure function it do not look good but this is just beta, so for final version I assume it can be much better.