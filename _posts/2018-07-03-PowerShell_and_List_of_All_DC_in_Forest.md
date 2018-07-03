---
layout: post
title: PowerShell and list of all DC in forrest  
---
# DirectoryServices 
```powershell 
$Forest = [System.DirectoryServices.ActiveDirectory.Forest]::GetCurrentForest()
$Forest.Sites | % { $_.Servers } | Select Name, Domain
```
via [Technet](https://social.technet.microsoft.com/Forums/windowsserver/en-US/3553139c-7ecf-4637-9f2b-7129323aa405/how-do-i-get-list-for-all-dcs-for-the-entire-forest?forum=winserverDS)


# References 
- https://social.technet.microsoft.com/Forums/windowsserver/en-US/3553139c-7ecf-4637-9f2b-7129323aa405/how-do-i-get-list-for-all-dcs-for-the-entire-forest?forum=winserverDS