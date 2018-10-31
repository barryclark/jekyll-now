---
layout: post
title: Multi-Layer ConfirmImpact Implementation
date: 2018-11-09
tags: powershell function ConfirmImpact ShouldProcess
---

## A Refresher

For those of you who don't use it extensively, ConfirmImpact is a property of
the

```powershell
function Remove-MyFile {
    [CmdletBinding(SupportsShouldProcess, ConfirmImpact = 'Medium')]
    param(
        [string]
        $Path,

        [switch]
        $Recurse
    )

    if (Test-Path $Path -PathType Container) {
        $Level = 'High'
    }
    else {
        $Level = 'Medium'
    }

    & {
        [CmdletBinding(SupportsShouldProcess, ConfirmImpact = {$Level})]
        param()

        if ($PSCmdlet.ShouldProcess($Path, "Remove Item")) {
            if ($Level -eq 'High') {
                Remove-Item $Path -Confirm:$false -Force -Recurse
            }
            else {
                Remove-Item $Path -Confirm:$false -Force
            }
        }
    }
}
```