---
title: Microsoft Azure Bicep In Continues Integration Pull Request
author: Janusz Nowak
header:
  teaser: /wp-content/uploads/2022/2022AzBicepValidate.png
permalink: /AzureBicepValidationOnPR
  - Azure
  - Bicep
tags:
  - Azure
  - Bicep
  - IoC
  - Azure DevOps
  - Azure Pipelines
  - Code
  - Yaml
  - Continuous Delivery
  - Continuous Deployment
  - Pull Request
  - Continuous Integration
---

On previous [posts](./tags/#bicep) we have been introduced, how to get started, use extension or migrate from ARM templates for azure bicep or how to use in Continuous Delivery/Continuous Deployment.

![2022AzBicepCreate](/wp-content/uploads/2022/2022AzBicepValidate.png)

# Azure Bicep in Continuous Integration Pipeline on Pull Request

On current one I will cover how to use bicep in our Continuous Integration Azure DevOps yaml pipeline.
We start from setup branch policy/branch protection. We link out CI build and make this required for purpose to protect our main branches and not allow breaking code.

## How to setup branch protection in

- [Azure Devops](https://docs.microsoft.com/en-us/azure/devops/repos/git/branch-policies?view=azure-devops&tabs=browser)
- [GitHub Action](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/managing-a-branch-protection-rule)

## Validation task

We create additional task in out ci pipeline used also for branch protection.

```yaml
- task: AzureCLI@2
  displayName: Bicep Validate
  inputs:
    azureSubscription: AzureServiceConnection
    scriptType: bash
    scriptLocation: inlineScript
    inlineScript: |
      az group create --name pr-validation-rg --location $(locationRG)
      az deployment group validate --resource-group pr-validation-rg --template-file '$(Pipeline.Workspace)--template-file '$(Pipeline.Workspace)/${{ parameters.build_ci }}/drop bicep/main.bicep' --parameters '$(Pipeline.Workspace)/${{ parameters.build_ci }}/drop bicep/main.${{ parameters.env }}.parameters.json'
```

The task is very similar what we use in [post](./_post_/2022-02-28-AzureBicepInCDPipeline.md) with difference that instead using `az deployment group create` we will use `az deployment group validate` with is causing validation on bicep. In addition depending from out need if we use multiple environments for staging. We can use `--resource-group` parameter with can be dynamic/calculated or we can use dedicated resource group for validation purpose. The good way would we using dedicated RG for PR to not affect production resource manager, and use the same validation step on Continuous Delivery/Continuous Deployment with will validate our bicep against target deployment as prerequisite before any other action. One of example can be issues limitation or quotas on target Resource Group/Subscription.
