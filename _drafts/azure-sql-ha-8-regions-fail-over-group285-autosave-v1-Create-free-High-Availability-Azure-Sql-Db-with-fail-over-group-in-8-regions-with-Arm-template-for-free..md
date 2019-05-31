---
id: 303
title: Create free High Availability Azure Sql Db with fail-over group in 8 regions with Arm template for free.
date: 2017-11-27T21:57:45+02:00
author: Janusz Nowak
layout: revision
guid: http://blog.janono.pl/2017/11/285-autosave-v1/
permalink: /2017/11/285-autosave-v1/
---
## How to create free High Availability Azure Sql Db with fail-over group in 8 regions with Arm template for free.

Let&#8217;s go to <https://portal.azure.com>Â and lets try to create it we will see that option is not available to crate free tire.

<img class="alignnone size-full wp-image-298" src="/wp-content/uploads/2017/11/2017-11-27-20_05_52-Configure-performance-Microsoft-Azure.png" alt="" width="1015" height="318" srcset="/wp-content/uploads/2017/11/2017-11-27-20_05_52-Configure-performance-Microsoft-Azure.png 1015w, /wp-content/uploads/2017/11/2017-11-27-20_05_52-Configure-performance-Microsoft-Azure-300x94.png 300w, /wp-content/uploads/2017/11/2017-11-27-20_05_52-Configure-performance-Microsoft-Azure-768x241.png 768w" sizes="(max-width: 1015px) 100vw, 1015px" /> 

But if go and check hereÂ [https://resources.azure.comÂ](https://resources.azure.com/) other deployment template for other azure sql database we can see with what parameters it was created so we can play with it.

And the important are this 3 properties values on bottomÂ edition,Â maxSizeBytes andÂ requestedServiceObjectiveName.

<pre class="EnlighterJSRAW" data-enlighter-language="json">{
  "name": "[variables('sqlDatabaseName')]",
  "type": "databases",
  "location": "[resourceGroup().location]",
  "tags": {
    "displayName": "Database"
  },
  "apiVersion": "2014-04-01-preview",
  "dependsOn": [
    "[resourceId('Microsoft.Sql/servers/', variables('sqlserverName'))]"
  ],
  "properties": {
    "edition": "Free",
    "collation": "[parameters('collation')]",
    "maxSizeBytes": "33554432",
    "requestedServiceObjectiveName": "Free"
  }
}</pre>

If we will create azure sql database with this parameters values using arm template deployment.

We will see that now we can see free version of azure sql database.

<img class="alignnone size-full wp-image-297" src="/wp-content/uploads/2017/11/2017-11-27-20_05_17-Configure-performance-Microsoft-Azure.png" alt="" width="1009" height="279" srcset="/wp-content/uploads/2017/11/2017-11-27-20_05_17-Configure-performance-Microsoft-Azure.png 1009w, /wp-content/uploads/2017/11/2017-11-27-20_05_17-Configure-performance-Microsoft-Azure-300x83.png 300w, /wp-content/uploads/2017/11/2017-11-27-20_05_17-Configure-performance-Microsoft-Azure-768x212.png 768w" sizes="(max-width: 1009px) 100vw, 1009px" /> 

If we go now to our arm template and and will repeat sql resources multiple times or use arm template function copy-index and pass the list or regions as array we can crate multiple azure sql databases for free.Â But this is not all because we what to have multiple read localization so we, go to azure portal create linked servers and check how it looksÂ https://resources.azure.com, we repeat the same step to see how the fail over group are created.

Going all this steps we are able to create arm template that will createÂ free High Availability Azure Sql Db in 8 regions withÂ fail-over group.

<img class="alignnone size-full wp-image-296" src="/wp-content/uploads/2017/11/2017-11-27-20_04_09-Geo-Replication-Microsoft-Azure.png" alt="" width="818" height="718" srcset="/wp-content/uploads/2017/11/2017-11-27-20_04_09-Geo-Replication-Microsoft-Azure.png 818w, /wp-content/uploads/2017/11/2017-11-27-20_04_09-Geo-Replication-Microsoft-Azure-300x263.png 300w, /wp-content/uploads/2017/11/2017-11-27-20_04_09-Geo-Replication-Microsoft-Azure-768x674.png 768w" sizes="(max-width: 818px) 100vw, 818px" /> 

&nbsp;