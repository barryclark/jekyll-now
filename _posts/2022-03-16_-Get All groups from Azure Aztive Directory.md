---
title: Get All groups from Azure Active Directory
author: Janusz Nowak
header:
  teaser: /wp-content/uploads/2022/Become Microsoft Certified.png
permalink: /Get All groups from Azure Active Directory/
categories:
  - Azure
  - AAD
  - Code
  - PowerShell
  - Code
  - Event
tags:
  - Azure
  - AAD
  - Code
  - PowerShell
  - Code
---

How to get all

```csharp
$moduleName  = "AzureAD"
if (Get-Module -ListAvailable -Name $moduleName) {
    Write-Output "Module $moduleName allready exists"
}
else
{
    Write-Output "Module $moduleName does not exist"

    try {
        Write-Output "Installing Module $moduleName"
        Install-Module -Name $moduleName -AllowClobber
    }
    catch [Exception] {
        $_.message
        exit
    }
}
Import-Module -Name $moduleName

Connect-AzureAD

$Allgroups =Get-AzureADGroup -All $true
$Allgroups|measure

$ado=$Allgroups|where DisplayName -Like "GROUPNAME*"

foreach($g in $ado)
{

  $a=$g|Get-AzureADGroupMember |measure|select Count
  Write-Output  "$($g.DisplayName),$($a.Count)"
}
```
