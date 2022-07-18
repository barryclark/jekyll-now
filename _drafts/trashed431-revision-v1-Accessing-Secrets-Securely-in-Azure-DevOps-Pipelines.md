---
id: 490
title: 'Accessing Secrets Securely in Azure DevOps Pipelines'
date: '2022-02-19T16:15:09+00:00'
author: Ryan
layout: revision
guid: 'https://geekyryan.com/?p=490'
permalink: '/?p=490'
---

This post will cover a secure method for accessing secrets in Azure DevOps pipelines.

## Why Azure Key Vault?

Azure Key Vault is an Azure cloud service used to securely store secrets, keys, and certificates. A secret can be any string of characters, such as API keys, passwords, URLs, etc. Azure Key Vault encrypts data at rest and in transit using HTTPS. Depending on the type of Key Vault you are using, data at rest is encrypted using software encryption (AES 256) or HSM-backed keys.

Azure Key Vault also gives us the ability to control access to secrets, keys, and certificates using native Key Vault access policies or the newer option of Azure IAM (RBAC) integration.

## What are Variable Groups? 

It’s all in the name. Variable groups are simply a method of grouping Azure DevOps pipeline variables. If you created a release for an application named MyAwesomeApp, you could create a variable group named myawesomeapp-var-group that could then store all of the variables you reference in the release. It’s simply a method of organizing variables.

You apply permissions to variable groups so that only certain people and pipelines/releases are able to use them.

You can read more here about variable groups and their usage:

[https://docs.microsoft.com/en-us/azure/devops/pipelines/library/variable-groups?view=azure-devops&amp;tabs=yaml#use-a-variable-group](https://docs.microsoft.com/en-us/azure/devops/pipelines/library/variable-groups?view=azure-devops&tabs=yaml#use-a-variable-group)

## Creating a Key Vault and Adding Secrets

**If you already have a Key Vault, skip this section.**

In this post, we will create a Key Vault using the AzureCLI. To create the Vault and a secret, run these commands:

```
<pre class="wp-block-code">```
# Create a resource group
az group create --location <location> --name <resource-group-name>

# Create a KeyVault
az keyvault create --name <keyvault-name> --resource-group <resource-group-name> --enable-soft-delete

# Create some secrets in the Key Vault
az keyvault secret set --name username --vault-name <keyvault-name> --value <username>
az keyvault secret set --name password --vault-name <keyvault-name> --value <password>
az keyvault secret set --name tenantId--vault-name <keyvault-name> --value <tenant id>
```
```

You will need to update the location and resource group name with whatever values you want. You will also need to update the username, password, and your Azure AD tenant ID. The username you choose will need read access to your subscription.

## Creating a Variable Group

Now we’ll create the variable group in Azure DevOps.

Go to your Azure DevOps project &gt; Pipelines &gt; Library and click “+ Variable Group”:

<figure class="wp-block-image size-full is-resized is-style-default has-lightbox">![](https://geekyryan.com/wp-content/uploads/2022/02/image.png)</figure>Give your variable group a name. Then toggle the switch “Link secrets from an Azure key vault as variables”. Select your Azure Subscription (you may need to authorize DevOps access to the subscription, and then select the Key Vault.

<figure class="wp-block-image size-full is-style-default has-lightbox">![](https://geekyryan.com/wp-content/uploads/2022/02/image-1.png)</figure>Now we can add the secrets from the Key Vault to the variable group. Under “Variables”, click the “+ Add” button. Select the checkbox next to any secrets you want to add to the variable group, and then click “Ok”.

<figure class="wp-block-image size-full is-style-default has-lightbox">![](https://geekyryan.com/wp-content/uploads/2022/02/image-7.png)</figure>Finally, click the “Save” button. You now have a variable group with secrets linked to a Key Vault. Notice the name of the secret is the only thing visible from the variable group. If you were to update the secret value in the Key Vault, Azure DevOps would automatically pick up the new value.

## Use the Variable Group in a Pipeline

Now that we have our variable group in place, let’s use it in a pipeline. In Azure DevOps, go to Pipelines and click “New pipeline”.

<figure class="wp-block-image size-large is-resized is-style-default has-lightbox">![](https://geekyryan.com/wp-content/uploads/2022/02/image-8-1024x596.png)</figure>Choose “Azure Repos Git” &gt; “&lt; your git repo&gt; “, “Starter Pipeline”, and then paste in the following code (You will need to update the ‘azureSubscription’ field with your SPN):

```
<pre class="wp-block-code">```
trigger:
- main

pool:
  vmImage: ubuntu-latest

variables:
  - group: kv-secrets

pr: none

stages:
  - stage: print_resource_groups
    jobs:
    - job: print_resource_groups
      continueOnError: false
      steps:
        - task: AzureCLI@2
          inputs:
            azureSubscription: '<Your SPN>'
            scriptType: 'bash'
            scriptLocation: 'inlineScript'
            inlineScript: |
              az login --service-principal --username  $(username) --password $(password) --tenant $(tenantId)
              az group list
```
```

Now click “Save and Run”, and then “Save and Run” again.

<figure class="wp-block-image size-large is-resized is-style-default has-lightbox">![](https://geekyryan.com/wp-content/uploads/2022/02/image-9-1024x596.png)</figure>Once the pipeline finishes running, you can see that it was able to read the subscription and create a list of all resource groups found.

This is a simple example of using Key Vault credentials in a pipeline. But you can imagine how useful this could be in more complex scenarios.

That’s all for now. If you have any questions, feel free to reach out!