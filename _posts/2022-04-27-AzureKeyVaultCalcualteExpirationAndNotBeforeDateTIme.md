---
title: Azure Key Vault fill, calculate missing Expiration and NotBefore Date Time
author: Janusz Nowak
header:
  teaser: /wp-content/uploads/2022/2022-04_azure_keyvault_calculate_01.png
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

[Azure Key Vault](https://azure.microsoft.com/en-us/services/key-vault/#product-overview)
[Azure Key Vault](https://docs.microsoft.com/en-us/rest/api/storageservices/create-service-sas)

<!-- ![Azure Key Vault](/wp-content/uploads/2022/2022-04-ApplicationInsightsAvabilityMicrosoftAzure.webp) -->

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
