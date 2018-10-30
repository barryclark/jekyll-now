---
layout: post
title: Transferring Functions with PSRemoting
date: 2018-11-02
tags: powershell function remoting invoke-command
---

Thankfully, these days a majority of our functions and cmdlets are kept tucked
away in easily-installed modules. However, on occasion I have still found myself
wishing I could just pull a function directly into a remote session to use.

Often it's a fairly small function, but on occasion it'll be something larger,
making it not worth the time to rewrite the function to use in the remote
session. As I alluded to in my [previous post](/Anonymous-Functions/), functions are _objects_ in PowerShell, just like everything else.

With that in mind, the following chain of reasoning seems to make sense:
> If we can:
>
> 1. Retrieve the function as an object, and
> 2. Store the function into a variable, then it (hopefully) follows that we can also
> 3. _Send this object into a remote session_ and use it!

### Capturing and Invoking a Captured Function

However, we have a... slight problem. Once it's _in_ the remote session, how can
we actually use it **as a function?** Well, as it turns out, there are a handful of ways one can do so:

```powershell
function Get-Thing {
    [CmdletBinding()]
    param()

    [PSCustomObject]@{
        Thing = 1..20 | Get-Random
    }
}

# Save a reference to the function object
$GetThing = Get-Item 'Function:\Get-Thing'

# Invoke it directly using '&'
& $GetThing

# Invoke its script block
$GetThing.ScriptBlock.Invoke()

# Create a new function with the existing one and call it as normal!
New-Item -Path 'Function:\Get-OtherThing' -Value $GetThing.ScriptBlock
Get-OtherThing
```

Note that last example. We never actually used the `function` keyword to define
the function. We simply used `New-Item` to create an item in the `Function:`
PSDrive, and the function immediately became available to be called.

### Using the Function in a Remote Session

#### Caveats

The rest seems fairly straightforward, right? Well, sort of. Keep in mind,
before we attempt this, that if _either_ of the following are used in the captured
function, you will have **significant** difficulty properly transferring it to a
remote session:

1. External libraries or files.
2. References to third-party or non-default modules and commands.
3. References to other locally-defined module functions or commands.

The issue here is that the function is essentially captured as only a few
components, the primary one being its `ScriptBlock`. This will be executed on
the other end just like any other piece of script, so the same rules will apply.
Note that #3 essentially means that a majority of custom module functions cannot be transferred &mdash; at least without manually transferring any helper commands the function might use.

#### Methods

The most straightforward method is simply to feed the function object into an
`Invoke-Command` block as-is and use it from there, either by passing it in the
`-ArgumentList` or else by utilising `$using:` to pull the value into the remote
"scope."

```powershell
$Function = Get-Item 'Function:\Get-Thing'

Invoke-Command -ComputerName 'RemotePC' -ScriptBlock {
    param($Fn)
    & $Fn
} -ArgumentList $Function

# Or, with $using:
Invoke-Command -ComputerName 'RemotePC' -ScriptBlock {
    & $using:Function
}
```