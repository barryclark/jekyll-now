---
title: Microsoft Azure Bicep Introduction
author: Janusz Nowak
header:
  teaser: /wp-content/uploads/2021/bicep.png
permalink: /MicrosoftAzureBicepIntroduction
categories:
  - Azure
  - Bicep
tags:
  - Azure
  - Bicep
  - IoC
---

# What is Bicep?

Bicep is a Domain Specific Language (DSL) for deploying Azure resources declaratively. It aims to drastically simplify the authoring experience with a cleaner syntax, improved type safety, and better support for modularity and code re-use. Bicep is a transparent abstraction over ARM and ARM templates, which means anything that can be done in an ARM Template can be done in Bicep. All resource types, apiVersions, and properties that are valid in an ARM template are equally valid in Bicep on day one (Note: even if Bicep warns that type information is not available for a resource, it can still be deployed).

Bicep code is **transpiled** to standard ARM Template JSON files, which effectively treats the ARM Template as an Intermediate Language (IL).

<iframe width="560" height="315" src="https://www.youtube.com/embed/l85qv_1N2_A" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

- [Azure Bicep Github](https://github.com/Azure/bicep)

- [Azure Bicep documentation](https://docs.microsoft.com/en-us/azure/azure-resource-manager/bicep/)