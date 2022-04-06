---
title: Credly extract all badges
author: Janusz Nowak
header:
  teaser: /wp-content/uploads/2022/Become Microsoft Certified.png
permalink: /Credly extract all badges/
categories:
  - Azure
  - Code
  - PowerShell
  - Code
tags:
  - Azure
  - Certification
  - Code
  - PowerShell
  - Code
  -
---

How to extract all badges from [Credly](https://www.credly.com/) ?
Credly

```powershell
$response=Invoke-RestMethod -Uri "https://www.credly.com/users/janusz-nowak/badges.json"
$response.metadata
$data=$response.data|Sort-Object -Property issued_at_date -Descending
$nl = [Environment]::NewLine

$cont="";
$outPutPath="C:\DownloadBadgesImages\"

Foreach ($i in $data)
{
    #save images locally if you
    Invoke-WebRequest $i.image_url -OutFile "$outPutPath\img\$($i.badge_template.name.Replace(":"," ")).png"

    #output item html template
    $aa="<a href='https://www.credly.com/badges/$($i.id)' title='$($i.badge_template.name)'><img src='$($i.badge_template.image_url)' width='140' alt='$($i.badge_template.name),$($i.badge_template.description)'/></a>"
    $cont+=$aa+$nl
}
$cont|Out-File -FilePath "$($outPutPath)creadexport_local.html"
```
