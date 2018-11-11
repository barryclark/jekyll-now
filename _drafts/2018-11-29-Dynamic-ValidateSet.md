---
layout: post
title: Creating Dynamic Sets for ValidateSet
date: 2018-11-29
categories: ['best practices', 'powershell core']
tags: [validateset, IValidateSetValuesGenerator, function, 'parameter validation', pwsh]
---

An all too common pattern I see get used in some more advanced scripts is the use of `dynamicparam`
where it isn't needed. Unfortunately, `dynamicparam` can be complicated, quirky, and frustrating to
work with, and is really best avoided in a majority of cases when creating advanced functions or
_script cmdlets_, as I've occasionally heard them called. Thankfully, there are a few alternatives
hat are often a good bit easier.

## Option 1: `[ValidateSet()]` and `[ValidateScript()]`

If you're writing for Windows PowerShell, I think a much more _effective_ alternative is to combine
`[ArgumentCompleter()]` and `[ValidateScript()]` in order to mimic the effect of a `[ValidateSet()]`
but give you the ability to run PowerShell script in order to determine the available vales.

### Let's See an Example

The most effective and simple way to do this is to use a helper function in order to get the valid
values you want to use. This will be called when the initial function is being called, in order to
both supply values for tab completion _and_ to validate the final value, in case the user opts to
enter a value outside of what you're looking for.

```powershell
function Get-ValidValues {
    [CmdletBinding()]
    param($Path)

    (Get-ChildItem -Path $Path -File).Name
}

function Clear-FileInCurrentLocation {
    [CmdletBinding(SupportsShouldProcess)]
    param(
        [Parameter(Position = 0, Mandatory)]
        [ArgumentCompleter(
            {
                param($Command, $Parameter, $WordToComplete, $CommandAst, $FakeBoundParams)

                Get-ValidValues -Path (Get-Location)
            }
        )]
        [ValidateScript(
            {
                Get-ValidValues -Path (Get-Location)
            }
        )]
        [string]
        $Path
    )

    Clear-Content -Path $Path
}
```

Note how the `ArgumentCompleter` attribute actually passes in parameters. For those of you who want
or need to use this, you can work with those attributes to dynamically set completion results based
on the other parameters and their values, should you need to, or based on the command that it is
being applied to.

## Option 2: Implement `IValidateSetValuesGenerator`

This class is only available in PowerShell Core, but it simplifies things _quite_ a bit. Essentially
what you need to do is create a class that inherits from the interface, and then implements a method
to provide the valid input values. This can all be done rather simply with PowerShell classes. Once
you have the class defined, you pass in the _type name_ of the class as a `[type]` object to the
standard `[ValidateSet()]` attribute.

Let's see the above example with this method instead:

```powershell
using namespace System.Management.Automation

class ValidFilesGenerator : IValidateSetValuesGenerator {
    [string[]] GetValidValues() {
        $Values = (Get-ChildItem -File).Name
        return $Values
    }
}

function Clear-FileInCurrentLocation {
    [CmdletBinding(SupportsShouldProcess)]
    param(
        [Parameter(Position = 0, Mandatory)]
        [ValidateSet( [ValidFilesGenerator] )]
        [string]
        $Path
    )

    Clear-Content -Path $Path
}
```

As you can see, it is significantly more easy to implement, looks cleaner, and is overall a more
robust solution. Naturally, this is constrained by the usual limitations of a PowerShell class, but
for this particular use case, this will be much more effective and maintainable than the available
alternatives.