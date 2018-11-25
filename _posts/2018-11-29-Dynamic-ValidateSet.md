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
that are often a good bit easier.

# Option 1: `ArgumentCompleter` and `[ValidateScript()]`

If you're writing for Windows PowerShell, I think a much more _effective_ alternative is to combine
`[ArgumentCompleter()]` and `[ValidateScript()]` in order to mimic the effect of a `[ValidateSet()]`
but give you the ability to run PowerShell script in order to determine the available values.

## Let's See an Example

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
    [CmdletBinding(SupportsShouldProcess, ConfirmImpact = 'High')]
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
                $_ -in (Get-ValidValues -Path (Get-Location))
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

For more information on those parameters, what they give you, and how to utilise them, see the
[MSDN Docs Page](https://docs.microsoft.com/en-us/dotnet/api/system.management.automation.iargumentcompleter.completeargument?view=powershellsdk-1.1.0)
for the underlying method and what the values passed in will correspond to.

## `Register-ArgumentCompleter`

Sometimes you'll come across a function you _wish_ had an ArgumentCompleter, but doesn't.
For those times, there's `Register-ArgumentCompleter` &mdash; you can apply an ArgumentCompleter to
literally anything you want.

For example, let's say we want `Invoke-Command` to autocomplete the presently listed machines in our
current domain.

```powershell
Register-ArgumentCompleter -CommandName Invoke-Command -ParameterName ComputerName -ScriptBlock {
    Get-ADComputer -Filter * | Select-Object -ExpandProperty Name | ForEach-Object {
        $Text = $_
        if ($Text -match '\s') { $Text = $Text -replace '^|$','"' }

        [System.Management.Automation.CompletionResult]::new(
            $Text,
            $_,
            'ParameterValue',
            "$_"
        )
    }
}
```

This isn't advisable in general, as it would be quite slow, but a more sophisticated completion
script could be devised to do something similar to this.

This is _fantastic_ for those cases where a module you didn't create, or a compiled module you'd
like to include a completer for, would otherwise lack desired completion.

# Option 2: Implement `IValidateSetValuesGenerator`

This class is only available in PowerShell Core, but it simplifies things _quite_ a bit. Essentially
what you need to do is create a class that inherits from the interface, and then implements a method
to provide the valid input values. This can all be done rather simply with PowerShell classes. Once
you have the class defined, you pass in the _type name_ of the class as a `[type]` object to the
standard `[ValidateSet()]` attribute.

Let's see the first example with this method instead:

```powershell
using namespace System.Management.Automation

class ValidFilesGenerator : IValidateSetValuesGenerator {
    [string[]] GetValidValues() {
        $Values = (Get-ChildItem -File).Name
        return $Values
    }
}

function Clear-FileInCurrentLocation {
    [CmdletBinding(SupportsShouldProcess, ConfirmImpact = 'High')]
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