---
layout: post
title: Automatically Store Last Output in PowerShell
date: 2018-10-19
categories: [powershell]
tags: [powershell, tips, profile]
---

I'm sure we've all been there. Some command takes a solid 30s to run to completion, and then... just
dumps _all_ output to the console. And it is only **then** that we realise that we needed to process
or reuse that output.

```powershell
PS> Get-ChildItem -Path 'C:\Users' -Recurse -Depth 2

# ... oh shoot, I forgot to store it into a variable again
```

## The Answer?

While it would be _awesome_ to have some `$LastOutput` variable automatically assigned by PS itself,
you may be interested to know that it's something you can already add for yourself &mdash; kind of.

```powershell
$PSDefaultParameterValues['Out-Default:OutVariable'] = 'LastOut'
```

What this does is that any time `Out-Default` is called, by any function or cmdlet, it
_automatically_ applies the parameter `-OutVariable 'LastOut'` to the call. If you aren't currently
aware, `Out-Default` is the command that _all output_ passes through in PowerShell unless it's
deliberately handed directly to a `Format-*` cmdlet like `Format-Table`.

So, in a nutshell, you now have a variable called `$LastOut` which stores the complete output of the
last command sequence you entered, provided you didn't call a `Format-*` cmdlet before it reaches
the host / default output.

Some caveats:

* Only the last command's final output is stored.
* Output is stored in an `ArrayList`.
* As mentioned, sending output to a `Format-*` cmdlet prevents it from being captured.
* It's possible that PowerShell would run out of memory if you attempt to store the results of too large a command &mdash; however, the likelihood is low in general practice.
* Directly reassigning the full output can get tricky. It is assigned by reference by default, which is often undesirable.
  * To circumvent this, you can force PS to enumerate it before storing elsewhere (`$Data = $($LastOut)`) or manually retrieve the array (`$Data = $LastOut.ToArray()`). Both are both good choices, but potentially the array option may be quicker.

With that said, I've found it invaluable to add this to my PowerShell profile scripts; it can save
quite a bit of time!
