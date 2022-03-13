---
id: 238
title: Azure Function benchmark for .Net 4.7 vs .Net Core beta
date: 2017-10-25T18:45:00+02:00
author: Janusz Nowak

guid: http://blog.janono.pl/?p=238
permalink: /2017/10/azure-function-benchmark-for-net-4-7-vs-net-core-beta/
ftf_open_type:
  - video.tv_show
disable_open_graph:
  - ""
header:
  teaser: /wp-content/uploads/2017/10/fun-bench.jpg
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

## Azure Function benchmark for .Net 4.7 vs .Net Core beta, how much request per seconds we can squeeze?

There was some benchmark done by my colleague [Roberto](https://robertoprevato.github.io/Comparing-Linux-hosted-to-Windows-hosted-ASP-NET-Core-applications-in-Azure-Application-Service-Plan/) about running application on app service plan vs app service plan for docker.

That inspired me for some other approach to run the same code sample but on azure function running .net 4.7 vs azure function running .net core

The size of machine for app service plan is S1, testing approach is ab benchmark tool running under windows hosted in azure, do not hit network limits or CPU the machine size is DS5_V2

![Vm size](/wp-content/uploads/2017/10/s1.png)![Vm size](/wp-content/uploads/2017/10/DS5_V2.jpg)

The setup is pre compiled Azure Function running .Net 4.7

![runtime](/wp-content/uploads/2017/10/fun-runtime.jpg)

```csharp
public static class Function1
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
}
```

vs Azure Function .Net Core having kestrel under hood in beta version

![function beta](/wp-content/uploads/2017/10/functionbeta.png)

```csharp
#r "Newtonsoft.Json"

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
```

Cmd for testing ab -n 5000 -c 150 -l http://&#8230;&#8230; ?s=&#8221;&#8221; s=1, s=10 , s=100

ab results :

| **Host**                                      | **Scenario** | **RPS (mean)** | **95% within ms** |
| --------------------------------------------- | ------------ | -------------- | ----------------- |
| azure function .net 4.7                       | Hello World  | 229            | 999               |
| azure function .net 4.7                       | 1KB          | 227            | 999               |
| azure function .net 4.7                       | 10KB         | 206            | 1106              |
| azure function .net 4.7                       | 100KB        | 127            | 3798              |
| azure function .net core beta                 | Hello World  | 72             | 2696              |
| azure function .net core beta                 | 1KB          | 70             | 3500              |
| azure function .net core beta                 | 10KB         | 67             | 3656              |
| azure function .net core beta                 | 100KB        | 51             | 5691              |
| azure function .net 4.7 (csx) not precompiled | Hello World  | 226            | 1094              |
| azure function .net 4.7 (csx) not precompiled | 1KB          | 242            | 922               |
| azure function .net 4.7 (csx) not precompiled | 10KB         | 200            | 1268              |
| azure function .net 4.7 (csx) not precompiled | 100KB        | 126            | 3128              |

From results we can see that .net core on azure functions is still in beta and the performance is not amazing but if we compare azure function ruining pre compiled azure function on .net 4.7

the performance look even nice.

When comparing .net 4.7 pre-compiled vs .net 4.7 not precompiled (csx) the result is very similar but the first call are slower.

When we look on .net core beta on Azure function it do not look good but this is just beta, so for final version I assume it can be much better.
