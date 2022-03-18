---
title: Credly extract all badges
author: Janusz Nowak
header:
  teaser: /wp-content/uploads/2022/Become Microsoft Certified.png
permalink: /Credly extract all badges/
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

How to extract all badges from

{% include codeHeader.html %}

```PowerShell
$respo=Invoke-RestMethod -Uri "https://www.credly.com/users/janusz-nowak/badges.json"
$respo.metadata
$data=$respo.data|Sort-Object -Property issued_at_date -Descending
$nl = [Environment]::NewLine

$cont="";
$outPutPath="C:\xxxx\"

Foreach ($i in $data)
{
    #save images localy
    Invoke-WebRequest $i.image_url -OutFile "$outPutPath\img\$($i.badge_template.name.Replace(":"," ")).png"
    $aa="<a href='https://www.credly.com/badges/$($i.id)' title='$($i.badge_template.name)'><img src='$($i.badge_template.image_url)' width='140' alt='$($i.badge_template.name),$($i.badge_template.description)'/></a>"
    $cont+=$aa+$nl
}
$cont|Out-File -FilePath "$($outPutPath)creadexport_local.html"
```
