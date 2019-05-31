---
id: 213
title: CosmosDb DocumentDb auto ScaleUp and Down.
date: 2017-10-23T11:01:11+02:00
author: Janusz Nowak
layout: revision
guid: http://blog.janono.pl/2017/10/120-revision-v1/
permalink: /2017/10/120-revision-v1/
---
Currently there is no option to auto scale document db. There is option to use alerts to do this but this will be 5 min deleyaed.

But there is option to do this 🙂 by our self.

First part is to scale it up instantly when needed.

<pre class="EnlighterJSRAW" data-enlighter-language="null">return await CosmosDbHelper.EnsureDatabase(Connection.Client, async client =&gt;
            {
    var result = await Connection.Client.CreateDocumentAsync(collectionLink, data.Item);

    var response = req.CreateResponse(HttpStatusCode.Created);
    response.Headers.Add("Location", new[] { UriFactory.CreateDocumentUri(databaseId, collectionId, result.Resource.Id).ToString() });
    return response;
}, settings, log);</pre>

&nbsp;

&nbsp;

<pre class="EnlighterJSRAW" data-enlighter-language="csharp" data-enlighter-theme="git">public static async Task&lt;T&gt; EnsureDatabase&lt;T&gt;(DocumentClient client, Func&lt;DocumentClient, Task&lt;T&gt;&gt; fn, Settings settings, TraceWriter log, int counter = 0) 
{ 
    int MaxTry = 4; 
  
    try 
    { 
        return await fn(client); 
    } 
    catch (DocumentClientException dce) when (dce.Message.Contains(SyntaxErrorMessage)) 
    { 
        // it's bad that they are not throwing specialized exceptions for such common scenario... 
        throw new QuerySyntaxException(dce); 
    } 
    catch (DocumentClientException dce) when (dce.Message.Contains("Request rate is large")) 
    { 
        counter++; 
        log.Info($"Retry {counter} value, RetryAfter: {dce.RetryAfter}"); 
        IncreaseRUs(client, settings, log, dce.RetryAfter); 
  
        if (counter &lt; MaxTry) 
        { 
            log.Info($"Retry {counter} value ,Retry Exception {dce.Message} RetryAfter: {dce.RetryAfter}"); 
            //System.Threading.Thread.Sleep(100); 
            //await Task.Delay(1000); 
            //await Task.Delay(dce.RetryAfter); 
            return await EnsureDatabase(client, fn, settings, log, counter); 
        } 
        else 
        { 
            log.Info($"Retry Exception {dce.Message} RetryAfter: {dce.RetryAfter}  "); 
            throw; 
        } 
    } 
    catch (DocumentClientException dce) when (dce.Message.Contains(MissingDatabaseErrorMessage) || dce.Message.Contains(MissingCollectionErrorMessage)) 
    { 
        var databaseId = settings.DatabaseId; 
        var collectionId = settings.CollectionId; 
  
        log.Info($"[*] Configured database and/or collection weren't found, and are going to be created: '{databaseId}.{collectionId}'"); 
        log.Info("[*] A second attempt to execute the desired operation will be executed after db initialization."); 
  
        await client.CreateDatabaseIfNotExistsAsync(new Database { Id = databaseId }); 
        await client.CreateDocumentCollectionIfNotExistsAsync(UriFactory.CreateDatabaseUri(databaseId), new DocumentCollection { Id = collectionId }, new RequestOptions { OfferThroughput = settings.TestDatabaseOfferThroughput ?? 400 }); 
  
        // try again (once) 
        return await fn(client); 
    } 
}</pre>

<pre class="EnlighterJSRAW" data-enlighter-language="null">public static void IncreaseRUs(DocumentClient client, Settings settings, TraceWriter log, TimeSpan? retryAfter = null)
{
    try
    {
        log.Info($"Increasing RU");

        var databaseId = settings.DatabaseId;
        var collectionId = settings.CollectionId;

        var collectionLink = UriFactory.CreateDocumentCollectionUri(databaseId, collectionId);

        //using new client
        using (DocumentClient clientRU = new DocumentClient(new Uri(settings.CosmosDbEndpoint), settings.CosmosDbReadWriteKey))
        {
            var start = DateTime.Now;
            var responseA = client.ReadDocumentCollectionAsync(collectionLink).Result;
            var collection = responseA.Resource;

            var results = client.CreateOfferQuery()
                .Where(o =&gt; o.ResourceLink == collection.SelfLink)
                .AsDocumentQuery()
                .ExecuteNextAsync&lt;OfferV2&gt;().Result;

            //log.Info($"RequestCharge for reading offer  {results.RequestCharge}");

            var offer = results.FirstOrDefault();

            var currentOfferThroughput = offer.Content.OfferThroughput;
            if (currentOfferThroughput &lt; settings.RUsOfferThroughputMax)
            {
                var newOfferThroughput = currentOfferThroughput + settings.RUsScaleStepUp;
                var updatedOffer = new OfferV2(offer, offerThroughput: newOfferThroughput);
                var response = client.ReplaceOfferAsync(updatedOffer);
                var end = DateTime.Now;
                var span = end - start;

                log.Info($"RequestCharge for updating offer  {response.Result.RequestCharge} new RUs is {newOfferThroughput} scaleup take {span:ss.fff} ms");
            }
            else
            {
                log.Info($"No scale up, delay only {retryAfter:ss.fff} ms, Current Offer Throughput {currentOfferThroughput} is equal/bigger settings.RUsOfferThroughputMax {settings.RUsOfferThroughputMax}");
                if (retryAfter != null)
                    Task.Delay((TimeSpan)retryAfter);
            }
        }
    }
    catch (Exception ex)
    {
        log.Error($"Exception when IncreaseRUs {ex.Message}");
    }
    //ResourceResponse&lt;DocumentCollection&gt; response = client.ReadDocumentCollectionAsync(collectionLink).Result;
    //log.Info($"{response.CollectionSizeQuota}");
    //log.Info($"{response.CollectionSizeUsage}");
}</pre>

&nbsp;

&nbsp;

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