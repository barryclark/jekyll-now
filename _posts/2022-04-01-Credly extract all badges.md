---
title: Credly extract all badges
author: Janusz Nowak
header:
  teaser: /wp-content/uploads/2022/2022-04_credly_extract_02.png
permalink: /CredlyExtractAllBadges/
categories:
  - Azure
  - Code
  - PowerShell
tags:
  - Azure
  - Certification
  - Code
  - PowerShell
  - Code
  - Badges
---

How to extract all badges from [Credly](https://www.credly.com/) ?

If you would like to extract, list all badges, images of it you can have small challenge to do it. Especially if you have more then 1 or 2, that why I created simple script and discover that they is not straight api endpoint that can provide you all information as json file.
In my case it was "https://www.credly.com/users/janusz-nowak/badges.json" where "janusz-nowak" is user name.

```powershell
$response=Invoke-RestMethod -Uri "https://www.credly.com/users/janusz-nowak/badges.json"
$response.metadata
$data=$response.data|Sort-Object -Property issued_at_date -Descending
$nl = [Environment]::NewLine

$cont="";
$outPutPath="C:\DownloadBadgesImages\"

if (!(test-path -path $outPutPath)) {new-item -path $outPutPath -itemtype directory}
if (!(test-path -path $outPutPath\img)) {new-item -path $outPutPath\img -itemtype directory}

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

After running script you html page will be generate with look like, and can be easy edit.

![html](/wp-content/uploads/2022/2022-04_credly_extract_01.png)

Also folder containing images of all badges will be created.

![images](/wp-content/uploads/2022/2022-04_credly_extract_02.png)

- [Github repository with code](https://github.com/JanuszNowak/credly-extractor/blob/master/credly-extractor.ps1)
