---
id: 227
title: Azure function benchmark with and without ssl.
date: 2017-10-24T16:01:46+02:00
author: Janusz Nowak
layout: post
guid: http://blog.janono.pl/?p=227
permalink: /?p=227
categories:
  - Uncategorized
tags:
  - azurefunction
  - http
  - https
  - performance
  - rps
  - SSL
---
How much https can cost you on req/s ?

Here is sample application running as azure function with on S1 plan.

<pre class="EnlighterJSRAW" data-enlighter-language="csharp">using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Host;

namespace FunctionApp1
{
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
                return req.CreateResponse(HttpStatusCode.OK, $"Hello World, from ASP.NET Core and Net Core 2.0! {now.ToString("yyyy-MM-dd HH:mm:ss.FFF")}");
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
}
</pre>

&nbsp;

<img class="alignnone size-full wp-image-229" src="/wp-content/uploads/2017/10/ssl-vs-no-ssl-s1-fun-app.png" alt="" width="1763" height="1048" srcset="/wp-content/uploads/2017/10/ssl-vs-no-ssl-s1-fun-app.png 1763w, /wp-content/uploads/2017/10/ssl-vs-no-ssl-s1-fun-app-300x178.png 300w, /wp-content/uploads/2017/10/ssl-vs-no-ssl-s1-fun-app-768x457.png 768w, /wp-content/uploads/2017/10/ssl-vs-no-ssl-s1-fun-app-1024x609.png 1024w" sizes="(max-width: 1763px) 100vw, 1763px" /> 

&nbsp;

Difference is around 10% from http 237 rps to 260 rps https.

also this is can be compared to article to

&nbsp;