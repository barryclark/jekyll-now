---
layout: post
title: Invoke a PowerShell Module Command in the Global Scope
date: 2018-11-16
categories: [PowerShell, modules, tips]
tags: [PowerShell, module, tips, black magic, scope, breaking]
---

This isn't exactly a _common_ requirement, but it turned up as I was working on
[PSKoans](https://github.com/vexx32/pskoans). Essentially, I had a slight problem: the Koans in
AboutDiscovery that deal with `Get-Command` were consistently finding commands that were _intended_
to be hidden to the user; commands internal to the PSKoans module itself. So, I needed a way to have
the Koan files evaluated **outside** the module scope.

# Scope Breaking

At its simplest, scope breaking can work like this: you take a `SessionState`, `PSModuleInfo`, or
similarly session-state-tied object and invoke a command using its session state. It looks a bit
like this:

```powershell
& (Get-Module 'Pester') { Get-Command -Module Pester }
```

This will show you all the secret, private functions that Pester would prefer you not to see. You
could also use this method to _execute_ those functions. This is the precise inverse of what **I**
wanted to do. I wanted to execute code _in a module function_ that would see only the outside
world, and not the cmdlets and functions that created it.

# Breaking into the Global Scope

Thanks to [Patrick Meinecke](https://github.com/seeminglyscience) I was given this little taste of
the dark arts of breaking out into the global scope:

```powershell
             # [psmoduleinfo]::new(bool linkToGlobal)
$GlobalScope = [psmoduleinfo]::new($true)

& $GlobalScope {
    # Invoke commands here
}
```

This was _almost_ there. But it has a _slight_ problem. You see, the command **I** wanted to use
here was actually `Invoke-Pester`. That's how my Koans operate; just like a Pester script, with a
few bells and whistles.

Nothing too crazy there... until I realized, as it was building in the VM. I've just made it _nigh_
impossible to test properly. See, my **tests** need to be able to _mock_ that `Invoke-Pester` call.
And it was _not_ happening. It _seemed_ to mock just fine, but thereafter attempting to call
**any** mocked command simply failed with some rather curious errors.

![Pester Summons Elder Gods](/images/mocking-pester-itself.png)

It seemed to break literally all mocks for that module's commands. _Very_ odd. But that's what you
get when you play with scopes!

# The Solution

As much as I'd like to say I was able to bully it into submission, I couldn't. Something very
fundamental was in play here; I suspect I triggered an almost sort of recursion in Pester's mocking logic. It wasn't _built_ for this kind of abuse.

So what to do? Thankfully, I **could** create a proxy command that essentially just hid away the
scope-breaking code. A bit of `[System.Management.Automation.ProxyCommand]::Create()` and some
manual editing later, I came out with a new internal module command for executing the Koans in the
global scope, as though the user were invoking them directly, without my module getting in the way.

_Perfect_. This command can, thankfully, be mocked, and wrapping the command sequence up in such
a way is a particularly easy thing to abstract away.

This is the main body of the function I eventually came up with:

```powershell
$GlobalScope = [psmoduleinfo]::new($true)

& $GlobalScope {
    param($Params)

    Invoke-Pester @Params
} @($PSBoundParameters)
```

Thanks for reading!