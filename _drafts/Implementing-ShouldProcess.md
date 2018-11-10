---
layout: post
title: Implementing ShouldProcess in Your Functions
date:
categories: [powershell]
tags: [powershell, function, ConfirmImpact, ShouldProcess, 'best practices']
---

`ShouldProcess` is something that a _lot_ of folks get wrong, even some of the more seasoned
scripters. Even some official modules don't quite handle it properly, perhaps most notably the
`SetADAccountPassword` cmdlet from the `ActiveDirectory` module &mdash; more on that
[here](https://www.jasonpearce.com/2017/03/04/powershell-set-adaccountpassword-whatif-bug/) &mdash;
although it is more commonly seen in scripts and third-party modules. Let's take a look at some of
the ways you can get it terribly wrong, and then how you _need_ to be doing it.

## What is ShouldProcess

`ShouldProcess` is a property that can be applied to the `[CmdletBinding()]` attribute, which is
used by PowerShell to keep track of what is and isn't important, or more importantly, which commands
may be _dangerous_ to use. It indicates to the PowerShell subsystems that your function should be
given two additional common parameters: `-WhatIf` and `-Confirm`.

### Uses of ShouldProcess

`ShouldProcess` is an extremely helpful safeguard and discovery tool. If you have a command that you
don't want to actually _run_ but get a thorough idea of what it's doing that might be either
important or potentially problematic, these common parameters are extremely helpful.

```powershell
Get-ChildItem | Remove-Item -WhatIf
Get-ChildItem | Set-Content -Confirm
```

The former will simply list all the actions it _would_ have taken, but never take any action. The
latter instead pauses before every action and provides you with an interactive prompt asking if you
want to proceed with the action.

Sometimes, however, you know _exactly_ what you're doing, and you want to **ensure** that it simply
does exactly what it's told without asking questions. For cmdlets which _would_ normally prompt you
for confirmation, you can specifically invoke it in "no-questions-asked" mode:

```powershell
Get-ChildItem | Clear-Content -Confirm:$false # Don't try this near important files!
```

## Problematic Implementation Patterns

### Manually Defining `-WhatIf` or `-Confirm`

Top of the list has to be implementing a _custom_ parameter for either `-WhatIf` or `-Confirm`.

```powershell
function Get-Thing {
    param(
        [switch] $WhatIf
        [switch] $Confirm
    )
}
```

Common parameters exist so that they have a consistent definition, behaviour, and usage. There could
be any number of custom implementations of these parameters, but not using the default leads only to
confusion and an inability to trust any given `-WhatIf` parameter, especially in the absence of
appropriate help documentation, which _also_ tends to follow these common mis-implementations.

Not utilising the common parameters can also mean that applying, for example, `-Confirm:$false` to
the parent function or script does _not_ also cascade down to the commands it runs; with the common
parameters in place and being used appropriately, the parameters applied to the parent command are
applied across the entire breadth of the actions of that command &mdash; if it calls a command that
has support for `ShouldProcess` it will trigger the appropriate actions (or not, as it were) to be
taken, as though you had painstakingly entered the same -WhatIf / -Confim values across _all_ the
other commands in your script or function.

### Declaring Support For, but Not Supporting ShouldProcess

Next along the line seems to be the end result of skipping some of the more important parts of the
documentation, or noticing someone else doing it and trying to copy them without understanding what
is actually being done.

```powershell
function Remove-Thing {
    [CmdletBinding(SupportsShouldProcess)]
    param()

    # Proceed to break _everything_ without asking
}
```

It should be noted, however, that this is frequently a _perfectly valid_ case for any commands that
primarily just call other cmdlets or functions and do little else. In these cases, the parameter
values supplied for the `ShouldProcess` parameters will be passed along to the inner cmdlet and
function calls, for those commands that support it.

### Miscategorising Your Function's `ConfirmImpact`

Finally, the last common mistake is over- or under-rating your cmdlet's `ConfirmImpact`. This can
result in the user not being prompted by default when they should be. For example, not prompting
before attempting to change potentially sensitive system settings or overwriting large numbers of
files.

### Providing Nonsense or Incorrect Prompts

I haven't seen this really done yet; most of the people who have explored far enough into writing
a custom function know enough to avoid this almost instinctually.

## Implementing ShouldProcess

Before we can implement `ShouldProcess` for our function, we need to determine just how potentially
dangerous the function is. Some functions simply don't _need_ it. A majority of cmdlets with the
`Get` verb don't need it, because they don't make any changes; they only retrieve data, and modify
nothing.

### Properly Selecting Your ConfirmImpact Rating

There are [four levels of impact](https://docs.microsoft.com/en-us/dotnet/api/system.management.automation.confirmimpact?view=powershellsdk-1.1.0):
`Low`, `Medium`, `High`, and `None`. When evaluating the `ShouldProcess()` method, a prompt will be
generated **only if** the current command's `ConfirmImpact` is _equal to or higher_ than the
current `$ConfirmPreference` setting.

By default, `$ConfirmPreference` is set to `High`.

#### ConfirmImpact = "Low"

> This action only needs to be confirmed when the user has requested that low-impact changes must
> be confirmed.

In general, reserve `Low` for actions that will never break anything important in any way,
but may still involve an impactful change (e.g., deleting unimportant files, working with and
altering low-risk stored data that you can be reasonably confident will be backed up anyway, altering user-level system settings).

#### ConfirmImpact = "Medium"

> This action should be confirmed in most scenarios where confirmation is requested.

This is the default setting for a function that declares `[CmdletBinding(SupportsShouldProcess)]`
without specifying a `ConfirmImpact` value. I would recommend avoiding just using the default and
explicitly specifying your `ConfirmImpact`, even if it _is_ `Medium`. It indicates to others that
the author has put some thought into it and has _probably_ taken the time to implement properly the
complete `ShouldProcess` functionality.

`Medium` should be used for any system-wide settings changes, deleting folders (especially those
containing files), or making several smaller changes in one go.

Note that despite the enum description, PowerShell's default `ConfirmImpact` is currently `High`,
which means that `Medium`-level changes will not be prompted for unless the user has altered their
default `ConfirmPreference`.

#### ConfirmImpact = "High"

> This action is potentially highly "destructive" and should be confirmed by default unless
> otherwise specified.

Use this for any actions which cannot be reversed and may impact the environment adversely if
misused. Use this also for any actions that take place on a larger scale than normal, for example if
you are by design affecting a significant portion of the machines on a domain network, that action
should be considered to have a `High` impact.

### Coding For ShouldProcess Support

There are two things you need to do to implement ShouldProcess support in a function:

1. Set the `SupportsShouldProcess` and appropriate `ConfirmImpact` properties in your `[CmdletBinding()]` declaration.
2. Test the result of the `$PSCmdlet.ShouldProcess()` method before making any changes to the system.

For the purposes of this example, we will write a simple and small file deletion cmdlet that
utilises `Remove-Item`.

```powershell
function Invoke-Decimation {
    [CmdletBinding(SupportsShouldProcess, ConfirmImpact = 'Medium')] # Step 1
    param(
        [Parameter(Position = 0)]
        [ValidateNotNullOrEmpty()]
        [string]
        $Path,

        [switch]
        $Recurse
    )
    switch ($Recurse.IsPresent) {
        $true {
            # Step 2
            if ($PSCmdlet.ShouldContinue($Path, 'Decimate every file including subdirectories.')) {
                Get-ChildItem -Path $Path -File -Recurse |
                    Where-Object { (Get-Random -Min 1 -Max 11) % 10 -eq 0 } |
                    Remove-Item -Confirm:$false
            }
        }
        $false {
            # Step 2
            if ($PSCmdlet.ShouldProcess($Path, 'Decimate the contained files.')) {
                Get-ChildItem -Path $Path -File |
                    Where-Object { (Get-Random -Min 1 -Max 11) % 10 -eq 0 } |
                    Remove-Item -Confirm:$false
            }
        }
    }
}
```

A few notes about the structure of this function:

1. I have elected to prevent further prompts from showing by telling the `Remove-Item` cmdlet to suppress all confirmation prompts.
    * If I had not done this, the user would receieve a prompt for every file this function attempts to delete. This is often a _desirable_ effect, so only remove further confirmation prompts on actions you are _sure_ you've already comprehensively covered yourself.
    * The values from parameters like `-Confirm` and `-WhatIf` will be _automatically_ applied to functions called by the command they're applied to, although as demonstrated the author of the command **can** opt to override them where appropriate.
2. One of these code branches uses `ShouldProcess`, while the other uses `ShouldContinue`. _Both_ of these are available when enabling `SupportsShouldProcess` for your function.
    * `ShouldProcess`: Checks the function or cmdlet's declared `ConfirmImpact` against the current `$ConfirmPreference` and prompts if appropriate. Specifying `-WhatIf` turns this from a prompt into a dry-run where the action message is displayed, but the code path is automatically skipped.
    * `ShouldContinue`: Unequivocally prompts for confirmation. These prompts _cannot be suppressed_, even with `-Confirm:$false`, so use them only where it is **unquestionably** necessary for the user to be prompted for the action.
        * Be especially cautious, as using this can render this code path _unusable_ in noninteractive (e.g., remoting) scenarios, as there is no way to suppress the prompt.

### ShouldProcess Overloads

[`$PSCmdlet.ShouldProcess()`](https://docs.microsoft.com/en-us/dotnet/api/system.management.automation.cmdlet.shouldprocess?view=powershellsdk-1.1.0)
and [`.ShouldContinue()`](https://docs.microsoft.com/en-us/dotnet/api/system.management.automation.cmdlet.shouldcontinue?view=powershellsdk-1.1.0)
have several overloads available, each of which is detailed on their respective documentation pages.

In most circumstances, I would recommend using the simpler overloads, with one or two parameters
&mdash; `ShouldProcess([string] $target)` or `ShouldProcess([string] $target, [string] $action)`.
Always provide enough information for the user to understand the action that is taking place.
