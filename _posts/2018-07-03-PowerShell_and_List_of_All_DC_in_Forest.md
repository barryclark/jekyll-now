---
layout: post
title: PowerShell and list of all DC in forrest  
---
Sometime, when I tried solve problems with Exchange Server on-permises I need i.e. investigate traffic for Active Directory. Or when I need set up new site. And for many other cases. For mall environments it's simple: open `dsa.msc` also known for ADUC and look. For bigger, it's quite complicated :). 

# DirectoryServices 

That method is kind of strange, as it actually return metadata of servers, not actually servers. :) 

```powershell 
$Forest = [System.DirectoryServices.ActiveDirectory.Forest]::GetCurrentForest()
$Forest.Sites | % { $_.Servers } | Select Name, Domain
```
via [Technet forum](https://social.technet.microsoft.com/Forums/windowsserver/en-US/3553139c-7ecf-4637-9f2b-7129323aa405/how-do-i-get-list-for-all-dcs-for-the-entire-forest?forum=winserverDS)

# ActiveDirectory module 
```powershell 
$allDCs = (Get-ADForest).Domains | %{ Get-ADDomainController -Filter * -Server $_ }
```
via [docs.microsoft.com](https://docs.microsoft.com/en-us/powershell/module/activedirectory/get-adforest?view=winserver2012-ps)
# References 
- https://social.technet.microsoft.com/Forums/windowsserver/en-US/3553139c-7ecf-4637-9f2b-7129323aa405/how-do-i-get-list-for-all-dcs-for-the-entire-forest?forum=winserverDS