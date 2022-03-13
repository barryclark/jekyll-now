---
id: 285
title: Create free High Availability Azure Sql Db in 8 regions with fail-over group using arm template.
date: 2017-11-27T21:53:49+02:00
author: Janusz Nowak

guid: http://blog.janono.pl/?p=285
permalink: /2017/11/azure-sql-ha-8-regions-fail-over-group/
header:
  teaser: /wp-content/uploads/2017/11/2017-11-09-17_15_52-Geo-Replication-Microsoft-Azure.png
categories:
  - Azure Sql
tags:
  - ARM
  - arm template
  - Azure
  - azure-sql
  - db
  - PaaS
  - sql
format: image
---

![Configure-performance-Microsoft-Azure](/wp-content/uploads/2017/11/2017-11-27-20_05_52-Configure-performance-Microsoft-Azure.png)

# How to create free High Availability Azure Sql Db with fail-over group in 8 regions with Arm template for free

Let's go to <https://portal.azure.com> and lets try to create it we will see that option is not available to create free tire.

But if go and check here [https://resources.azure.com](https://resources.azure.com/) other deployment template for other azure sql database we can see with what parameters it was created so we can play with it.

And the important are this 3 properties values on bottom edition, maxSizeBytes and requestedServiceObjectiveName.

```json
{
  "name": "[variables('SqlDatabaseName')]",
  "type": "databases",
  "location": "[resourceGroup().location]",
  "tags": {
    "displayName": "Database"
  },
  "apiVersion": "2014-04-01-preview",
  "dependsOn": [
    "[resourceId('Microsoft.Sql/servers/', variables('SqlServerName'))]"
  ],
  "properties": {
    "edition": "Free",
    "collation": "[parameters('collation')]",
    "maxSizeBytes": "33554432",
    "requestedServiceObjectiveName": "Free"
  }
}
```

If we will create azure sql database with this parameters values using arm template deployment.

We will see that now we can see free version of azure sql database.
![Configure-performance-Microsoft-Azure](/wp-content/uploads/2017/11/2017-11-27-20_05_17-Configure-performance-Microsoft-Azure.png)

If we go now to our arm template and and will repeat sql resources multiple times or use arm template function copy-index and pass the list or regions as array we can create multiple azure sql databases for free. But this is not all because we what to have multiple read localization so we, go to azure portal create linked servers and check how it looks <https://resources.azure.com>, we repeat the same step to see how the fail over group are created.

Going all this steps we are able to create arm template that will create free High Availability Azure Sql Db in 8 regions with fail-over group.

![Geo-Replication-Microsoft-Azure](/wp-content/uploads/2017/11/2017-11-27-20_04_09-Geo-Replication-Microsoft-Azure.png)
