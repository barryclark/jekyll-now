---
id: 120
title: CosmosDb DocumentDb auto ScaleUp and Down.
date: 2017-10-23T11:31:55+02:00
author: Janusz Nowak
layout: post
guid: http://blog.janono.pl/?p=120
permalink: /?p=120
categories:
  - Uncategorized
tags:
  - azurefunction
  - cosmosdb
  - documentdb
  - pass
  - Scale
---
Currently there is no option to auto scale document db. There is option to use alerts to do this but this will be 5 min deleyaed.

But there is option to do this 🙂 by our self.

https://github.com/janusznowak/BlogJanonoCodeExample/blob/master/README.md

&nbsp;

<div class="oembed-gist">
  <noscript>
    View the code on <a href="https://gist.github.com/janusznowak/3a65214380f16b00daae76895d4a1bc7">Gist</a>.
  </noscript>
</div>

First part is to scale it up instantly when needed.

<pre class="EnlighterJSRAW" data-enlighter-language="csharp" data-enlighter-theme="git">using System;
using System.Collections.Generic;
using System.Text;

namespace ConsoleApplication1
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello, world!");
            Console.ReadLine();
        }
    }
}</pre>

https://github.com/janusznowak/BlogJanonoCodeExample/blob/master/LICENSE

&nbsp;

&nbsp;

Second part is to scale it down when we can.

&nbsp;

<pre class="EnlighterJSRAW" data-enlighter-language="csharp" data-enlighter-theme="git">const string Time = "0 * * * * *"; 
[FunctionName("MonitorFunction")] 
public static void Run([TimerTrigger(Time)]TimerInfo myTimer, TraceWriter log) 
{ 
    try 
    { 
        var settings = Settings.FromConfiguration(); 
        var databaseId = settings.DatabaseId; 
        var collectionId = settings.CollectionId; 
        var collectionLink = UriFactory.CreateDocumentCollectionUri(databaseId, collectionId); 
  
        var responseA = ; 
        var collection = Connection.Client.ReadDocumentCollectionAsync(collectionLink).Result.Resource; 
  
        var results = Connection.Client.CreateOfferQuery() 
        .Where(o =&gt; o.ResourceLink == collection.SelfLink) 
        .AsDocumentQuery() 
        .ExecuteNextAsync&lt;OfferV2&gt;().Result; 
  
        log.Info($"RequestCharge {results.RequestCharge}"); 
  
        var offer = results.FirstOrDefault(); 
  
        if (offer != null) 
        { 
            var currentOfferThroughput = offer.Content.OfferThroughput; 
  
            log.Info($"currentOfferThroughput {currentOfferThroughput}"); 
            if (currentOfferThroughput &gt; settings.RUsOfferThroughputMin) 
            { 
                var newOfferThroughput = currentOfferThroughput - settings.RUsScaleStepDown; 
                var updatedOffer = new OfferV2(offer, offerThroughput: newOfferThroughput); 
                var res = Connection.Client.ReplaceOfferAsync(updatedOffer).Result; 
                log.Info($"NewOfferThroughput {newOfferThroughput}"); 
                log.Info($"Info {res}"); 
            } 
        } 
    } 
    catch (Exception dce) 
    { 
        log.Info($"Collection do not exist exc:{dce}"); 
    } 
}</pre>

&nbsp;

&nbsp;

&nbsp;