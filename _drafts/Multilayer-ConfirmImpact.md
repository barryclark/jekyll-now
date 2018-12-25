---
layout: post
title: Multi-Layer ConfirmImpact Implementation
date:
categories: [powershell]
tags: [powershell, function, ConfirmImpact, ShouldProcess]
---

Using ShouldProcess correctly can become a little dicey at times, but there are (as usual) a few
different options available to be used in cases where it doesn't _quite_ get you what you're after.
Today, I'd like to take you down a couple of possible paths you can use.

# A Refresher

For those of you who don't use it extensively, `ConfirmImpact` is a property of the
`[CmdletBinding()]` attribute and is typically specified when declaring an advanced function that
might have some noteworthy impact on the system:

```powershell
function Do-Thing {
    [CmdletBinding(SupportsShouldProcess, ConfirmImpact = 'Medium')]
    param()
}
```

This is evaluated against the current [`$ConfirmPreference`](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_preference_variables?view=powershell-6)
setting when determining whether or not to execute any code that tests against `$PSCmdlet.ShouldProcess()`.
If the current `ConfirmImpact` of the cmdlet or advanced function in question is
_equal to or higher_ than the value of `$ConfirmPreference`, the user will be prompted to confirm
the action that is about to take place.
In modes where an interactive console is not available, an error will be thrown instead.

Note that this behaviour can be deliberately altered by specifying either the `-WhatIf` or
`-Confirm` switches explicitly.

* `-WhatIf` causes PowerShell to return `$false` to the function for any queries of `ShouldProcess()` and does not _prompt_ the user, but does display the messages that indicate what _would_ have happened.
* `-Confirm` causes PowerShell to ignore the `ConfirmImpact` value and _always_ prompt the user directly if `ShouldProcess()` is queried.
  * `-Confirm:$false` forces the opposite behaviour, and tells PowerShell to "never prompt" for these actions.



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
        [CmdletBinding(SupportsShouldProcess, ConfirmImpact = { return $Level })]
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