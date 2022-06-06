---
title: Get All groups from Azure Active Directory
author: Janusz Nowak
header:
  teaser: /wp-content/uploads/2022/2022-03-24-GetAllGroupsFromAzureActiveDirectory.png
permalink: /GetAllGroupsFromAzureActiveDirectory/
categories:
  - Azure
  - AAD
  - Code
  - PowerShell
  - Code
tags:
  - Azure
  - AAD
  - Code
  - PowerShell
---

How to get all group from [Azure Active Directory](https://azure.microsoft.com/en-us/services/active-directory) using [PowerShell](https://docs.microsoft.com/en-us/powershell/scripting/overview?view=powershell-7.2) module [AzureAD](https://docs.microsoft.com/en-us/powershell/module/azuread/?view=azureadps-2.0) [AzureAD](https://www.powershellgallery.com/packages/AzureAD) and count members.

```powershell
$moduleName  = "AzureAD"
if (Get-Module -ListAvailable -Name $moduleName) {
    Write-Output "Module $moduleName all ready exists"
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

#login
Connect-AzureAD

$AllGroups =Get-AzureADGroup -All $true
$AllGroups|measure

#apply filter by name
$ado=$AllGroups|where DisplayName -Like "GROUPNAME*"

foreach($g in $ado)
{
  $a=$g|Get-AzureADGroupMember |measure|select Count
  Write-Output  "$($g.DisplayName),$($a.Count)"
}
```
