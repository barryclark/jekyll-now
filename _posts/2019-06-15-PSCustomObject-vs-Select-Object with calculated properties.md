---
layout: post
title:  PSCustomObject vs Select-Object with calculated properties
tag: notReady
---
there are many of method to collect data in foreach (or other) loops in PowerShell.
One of them are calculated properties (useful when we are sure on we have such data, and we agreed to not display it). Calculated properties generate some mess in code. That why personally, for long term managed scripts I prefer PSCustom object. But there are cases (especially in oneliners) where CP are just faster.
Recently I read done on [Kiran's WeBlog](https://kpatnayakuni.com/) on move hash from CP to variable. Instead:  
```powershell 
PS C:\h\z\s> dir -file | select Fullname,@{n='SizeKB';e={$_.Length/1KB -as [int]}},LastWriteTimeUTC

FullName               SizeKB LastWriteTimeUtc     
--------               ------ ----------------     
C:\h\z\s\disks.xlsx         3 6/15/2019 5:18:08 AM 
C:\h\z\s\file.csv           4 6/24/2019 11:32:00 AM
C:\h\z\s\o.ps1              0 6/24/2019 11:24:10 AM
```

just use
```powershell
PS C:\h\z\s> $sizeKBexp = @{n='SizeKB';e={$_.Length/1KB -as [int]}}
PS C:\h\z\s> dir -file | select Fullname,$sizeKBexp,LastWriteTimeUTC

FullName               SizeKB LastWriteTimeUtc     
--------               ------ ----------------     
C:\h\z\s\disks.xlsx         3 6/15/2019 5:18:08 AM 
C:\h\z\s\file.csv           4 6/24/2019 11:32:00 AM
C:\h\z\s\o.ps1              0 6/24/2019 11:24:10 AM
```

## More: 
[Just a tip #5 – Select-Object with calculated properties in PowerShell](https://kpatnayakuni.com/2019/01/13/just-a-tip-5-select-object-with-calculated-properties-in-powershell/)