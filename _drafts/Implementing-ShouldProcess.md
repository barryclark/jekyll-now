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

`ShouldProcess` is a property that can be applied to ythe `[CmdletBinding()]` property, which is
used by PowerShell to keep track of what is and isn't important, or more importantly, which commands
may be _dangerous_ to use.

## What to Avoid

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

Finally, the last common mistake is over- or under-rating your cmdlet's `ConfirmImpact`. There are
three levels of impact: `Low`, `Medium`, and `High`. In general, reserve `Low` for actions that will
basically never break anything important in any way, but may still involve an impactful change
(e.g., deleting unimportant files, working with and altering low-risk stored data that you can be
reasonably confident will be backed up anyway)