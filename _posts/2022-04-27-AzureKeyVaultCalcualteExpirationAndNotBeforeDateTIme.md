---
title: Azure Key Vault fill, calculate missing Expiration and NotBefore Date Time
author: Janusz Nowak
header:
  teaser: /wp-content/uploads/2022/2022-04_azure_keyvault_calculate_02.png
permalink: /AzureKeyVaultCalculateExpirationAndNotBeforeTime/
categories:
  - Azure
  - Code
  - PowerShell
  - Azure Key Vault
tags:
  - Azure
  - Cloud
  - Code
  - PowerShell
  - Azure Key Vault
---

Microsoft [Azure Key Vault](https://azure.microsoft.com/en-us/services/key-vault/#product-overview) is a cloud-hosted management service that allows users to encrypt keys and small secrets by using keys that are protected by hardware security modules (HSMs). Key Vault is central store to manage secrets, key and certificates. It is used also for storing shared access signatures [SAS](https://docs.microsoft.com/en-us/azure/storage/common/storage-sas-overview) for grant limited access to Azure Storage resources. On of the case case witch I found is that, sometimes people are not including expiration data for secrets. One of the way how to resolve this is to calculate expiration date directly from SAS token with is stored as secret text. One note, not all SAS contains expiration.

![AzureKeyVault](/wp-content/uploads/2022/2022-04_azure_keyvault_calculate_02.png)

<!-- ![Azure Key Vault](/wp-content/uploads/2022/2022-04-ApplicationInsightsAvabilityMicrosoftAzure.webp) -->

## Reverse calculation expiration date for SAS token

```powershell

$vaultName = ''
$secrets = Get-AzKeyVaultSecret -VaultName $vaultName
foreach ($s in $secrets) {
    if (($null -eq $s.Expires) -or ($null -eq $s.NotBefore)) {
        $secret = Get-AzKeyVaultSecret -VaultName $vaultName -Name $s.Name -AsPlainText
        $s.Name
        $s.SecretValue
        $sp = $secret -split "&"
        $expire = $null
        $start = $null

        #search for SAS portion "se" Expiry time and "st" Start time
        #https://docs.microsoft.com/en-us/rest/api/storageservices/create-service-sas
        For ($i = 0; $i -lt $sp.Length; $i++) {
            if ($sp[$i].StartsWith("se=")) {
                $expire = $sp[$i] -split "se="
            }

            if ($sp[$i].StartsWith("st=")) {
                $start = $sp[$i] -split "st="
            }
        }

        #parse expiration date
        $ex = $null
        if ($null -ne $expire) {
            $expire = $expire.replace('%3A', ':')
            $ex = [datetime]::Parse($expire)
            $ex
        }

        #parse start date
        $st = $null
        if ($null -ne $start) {
            $start = $start.replace('%3A', ':')
            $st = [datetime]::Parse($start)
            $st
        }

        if (($expire -ne $s.Expires) -or ($start -ne $s.NotBefore)) {
            $secretValue = ConvertTo-SecureString $secret -AsPlainText -Force
            Set-AzKeyVaultSecret -VaultName $s.VaultName -Name $s.Name -SecretValue $secretValue -Expires $ex -NotBefore $st
        }
    }
}
```
