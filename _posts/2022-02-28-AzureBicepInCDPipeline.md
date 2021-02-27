---
title: Microsoft Azure Bicep In Continues Deliver Pipeline
author: Janusz Nowak
header:
  teaser: /wp-content/uploads/2022/2022AzBicepCreate.png
permalink: /MicrosoftAzureBicepInCDPipeline
categories:
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
---

On previous [posts](./tags/#bicep) we have been introduced, how to get started, use extension or migrate from ARM templates for azure bicep.

![2022AzBicepCreate](/wp-content/uploads/2022/2022AzBicepCreate.png)

# Azure Bicep in Continuous Delivery pipeline

On current one I will cover how to use bicep in our Continuous Deployment or Continuous Delivery Azure DevOps yaml pipeline, we cover case of replacing se use of ARM templates/ adding it from scratch.

We all ready have out bicep file created and in is located in 'src/Bicep.ResourceGroup' in our repository.
We add specific step to our CI pipeline that will push our bicep file as artefact allowing us to

- easy version infrastructure
- separation of Continues Integration from Continues Deployment or Continues Delivery as recommended way

# ci yaml pipeline publish artefact task

```yaml
- task: PublishBuildArtifacts@1
  displayName: "Publish Artifact: drop bicep"
  inputs:
    PathtoPublish: src/Bicep.ResourceGroup
    ArtifactName: drop bicep
```

After our ci pipeline is ready, we jump and create or modify out cd pipeline.

## cd yaml pipeline deploy bicep

### using az cli

```yaml
stages:
  - stage: provisioning
    displayName: Provisioning Stage
    jobs:
      - job: provisioning_job
        displayName: Provisioning Job
        steps:
          - download: ${{ parameters.build_ci }}
          - task: AzureCLI@2
            inputs:
              azureSubscription: AzureServiceConnection
              scriptType: bash
              scriptLocation: inlineScript
              inlineScript: |
                az group create --name $(rg) --location $(locationRG)
                az deployment group create --resource-group $(rg) --template-file '$(Pipeline.Workspace)/${{ parameters.build_ci }}/drop bicep/main.bicep' --parameters '$(Pipeline.Workspace)/${{ parameters.build_ci }}/drop bicep/main.${{ parameters.env }}.parameters.json'
```

or we can use

### using powershell

```yaml
stages:
  - stage: provisioning
    displayName: Provisioning Stage
    jobs:
      - job: provisioning_job
        displayName: Provisioning Job
        steps:
          - download: ${{ parameters.build_ci }}
          - task: AzurePowerShell@5
            inputs:
              azureSubscription: AzureServiceConnection
              ScriptType: bash
              scriptLocation: inlineScript
              pwsh: true
              inline: |
                New-AzResourceGroup -Name $(rg) -Location $(locationRG)
                New-AzResourceGroupDeployment -Name $(rg) -ResourceGroupName ExampleGroup -TemplateFile '$(Pipeline.Workspace)/${{ parameters.build_ci }}/drop bicep/main.bicep' -TemplateParameterFile '$(Pipeline.Workspace)/${{ parameters.build_ci }}/drop bicep/main.${{ parameters.env }}.parameters.json'
```

So we have to option to Az CLI and Azure Powershell, there is third option using old way using az build option with will generate ARM template. So we can use old way of ARM template deployment.

For all cases we can also pass inline parameters '--parameters' for Az CLI and names of the parameter and value for Azure Powershell.

- AZ CLI --parameters storageAccountType=Standard_GRS

```yaml
az deployment group create ... --parameters storageAccountType=Standard_GRS
```

- Azure Powershell

```yaml
New-AzResourceGroupDeployment ... -storageAccountType=Standard_GRS
```
