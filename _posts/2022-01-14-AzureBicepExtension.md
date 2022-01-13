---
title: Microsoft Azure Bicep VsCode Extension
author: Janusz Nowak
header:
  teaser: /wp-content/uploads/2022/BicepExtension.png
permalink: /MicrosoftAzureBicepVsCodeExtension
categories:
  - Azure
  - Bicep
tags:
  - Azure
  - Bicep
  - IoC
  - Code
  - Tools
  - VsCode
  - Extension
---

On previous [post](./_post_/2021-12-20-AzureBicepMigrationFromArm.md) how to migrate from existing ARM template to Azure Bicep.
On this one we will cover about tooling with can support our development.

# Visual Studio Code install

We start from installing [Vs-Code](https://code.visualstudio.com) with can be download from [here](https://code.visualstudio.com/download).

or we can use [chocolatey/choco](https://community.chocolatey.org/packages/vscode)

```
choco install vscode -y
```

or [winget](https://winget.run/)

```
winget install -e --id Microsoft.VisualStudioCode
```

# Bicep extension install

After having Visual Studio Code installed, we visit [marketplace](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-bicep) and press Install button

![azure bicep extension](/wp-content/uploads/2022/BicepExtension.png)

or we install extension [directly](https://code.visualstudio.com/docs/editor/extension-marketplace) from vs code

# Bicep extension getting started

We create or open .bicep file and get are getting great tools for support multiple cases:

- Intellisense

  - Dot-property access ![](https://raw.githubusercontent.com/Azure/bicep/main/docs/images/resource-dot-property-intellisense.gif)
  - Resource property names & property values ![](https://raw.githubusercontent.com/Azure/bicep/main/docs/images/resource-property-names-and-values.gif)

- List all available resource types ![](https://raw.githubusercontent.com/Azure/bicep/main/docs/images/list-types-intellisense.gif)
- Snippets
- Go to definition, peek definition
- Find all references, peek references
- Outline view and breadcrumb view
- Highlights
- Hovers
- Formatting
- Quick fixes
- Insert Resource

Check out more details on [Bicep Extension Page](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-bicep)
At summary this is great tools that is develop all time more and more staff are implements,
but most important we get great tool for making out development much better experience, sad that we haven't such great for ARM templates.
