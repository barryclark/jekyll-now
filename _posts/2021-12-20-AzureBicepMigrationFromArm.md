---
title: Microsoft Azure Bicep migration from ARM Templates
author: Janusz Nowak
header:
  teaser: /wp-content/uploads/2021/MicrosoftAzureBicepGettingStartedDecompile.png
permalink: /MicrosoftAzureBicepMIgrationFromArm
categories:
  - Azure
  - Bicep
tags:
  - Azure
  - Bicep
  - IoC
  - Code
---

# Azure Bicep migrating from ARM template

On previous [post](./_post_/2021-11-23-AzureBicepGettingStarted.md) we cover how to get started with Azure Bicep.
On this one we will cover how to migrate existing ARM template to Azure Bicep.

We will start from existing ARM template "azuredeploy.json"

```json
{
  "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
  "parameters": {
    "storageAccountType": {
      "type": "string",
      "defaultValue": "Standard_LRS",
      "allowedValues": [
        "Premium_LRS",
        "Premium_ZRS",
        "Standard_GRS",
        "Standard_GZRS",
        "Standard_LRS",
        "Standard_RAGRS",
        "Standard_RAGZRS",
        "Standard_ZRS"
      ],
      "metadata": {
        "description": "Storage Account type"
      }
    },
    "location": {
      "type": "string",
      "defaultValue": "[resourceGroup().location]",
      "metadata": {
        "description": "Location for the storage account."
      }
    },
    "storageAccountName": {
      "type": "string",
      "defaultValue": "[format('store{0}', uniqueString(resourceGroup().id))]",
      "metadata": {
        "description": "The name of the Storage Account"
      }
    }
  },
  "resources": [
    {
      "type": "Microsoft.Storage/storageAccounts",
      "apiVersion": "2021-06-01",
      "name": "[parameters('storageAccountName')]",
      "location": "[parameters('location')]",
      "sku": {
        "name": "[parameters('storageAccountType')]"
      },
      "kind": "StorageV2",
      "properties": {}
    }
  ],
  "outputs": {
    "storageAccountName": {
      "type": "string",
      "value": "[parameters('storageAccountName')]"
    },
    "storageAccountId": {
      "type": "string",
      "value": "[resourceId('Microsoft.Storage/storageAccounts', parameters('storageAccountName'))]"
    }
  }
}
```

Now we will run az cli with bicep extension using option decompile and passing our ARM template json file "azuredeploy.json" as parameter.

```
az bicep decompile --file azuredeploy.json
```

As out put of it will see yellow warning

> <p style="color:yellow;">
> WARNING: Decompilation is a best-effort process, as there is no guaranteed mapping from ARM JSON to Bicep.
> You may need to fix warnings and errors in the generated bicep file(s), or decompilation may fail entirely if an accurate conversion is not possible.
> If you would like to report any issues or inaccurate conversions, please see https://github.com/Azure/bicep/issues.

</p>

If we would have some <span style="color:red;">Error</span> or recommendations thy would be also output.

Because our decompilation haven't got any error, as out put we can see that file "azuredeploy.bicep" was crated.

```bicep
@description('Storage Account type')
@allowed([
  'Premium_LRS'
  'Premium_ZRS'
  'Standard_GRS'
  'Standard_GZRS'
  'Standard_LRS'
  'Standard_RAGRS'
  'Standard_RAGZRS'
  'Standard_ZRS'
])
param storageAccountType string = 'Standard_LRS'

@description('Location for the storage account.')
param location string = resourceGroup().location

@description('The name of the Storage Account')
param storageAccountName string = 'store${uniqueString(resourceGroup().id)}'

resource storageAccountName_resource 'Microsoft.Storage/storageAccounts@2021-06-01' = {
  name: storageAccountName
  location: location
  sku: {
    name: storageAccountType
  }
  kind: 'StorageV2'
  properties: {}
}

output storageAccountName string = storageAccountName
output storageAccountId string = storageAccountName_resource.id
```

We can see that it is much shorted and concise.

Now we know how to migrate from ARM template json file to Azure Bicep. In case of more complex ARM templates migration can be more complicated, but az bicep decompile is showing recommendations and areas of issues on with we can put our focus for debug purpose.
