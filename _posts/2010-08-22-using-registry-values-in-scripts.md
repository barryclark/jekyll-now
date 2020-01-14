---
layout: post
title: Using registry values in scripts
permalink: /microsoft/using-registry-values-in-scripts
post_id: 265
categories:
- Command
- How to
- Howto
- Microsoft
- Registry
- Script
- Windows
---

I'm often writing scripts to do stuff. It makes my job easier. I've often wanted to be able to script the discovery of registry values in the Windows Registry.

Thus here is a short example on using the vanilla windows command line to find the value of a Windows registry key. From my testing these commands are all present by default in Windows XP, Vista, 7, Server 2003 and Server 2008.

Assume we want to find the Microsoft Windows Common Files directory. Using `Regedit` we can find that here: `HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\CommonFilesDir`

So the first thing we want to do is query the registry, we do that with the command line tool `reg` as follows ([more about reg][]):

[more about reg]:http://www.petri.co.il/reg_command_in_windows_xp.htm
"Read up on how to use the reg command for more than just a query"

`reg query HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion /v CommonFilesDir >1.tmp`

This will spit out the following into the text file `1.tmp`:

<pre><code>
HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion    CommonFilesDir    REG_SZ    C:\Program Files\Common Files
</code></pre>

However, this isn't of much use in a script. Really, we just want the value of the folder itself, not all the extra info.

So what we do is use the command line tool `findstr` which essentially is a windows regex tool. We use it to do this:

[more about findstr]:http://www.netexpertise.eu/en/windows/findstr-an-alternative-to-grep.html

`findstr /r REG_SZ 1.tmp >2.tmp`

This spits out just the line that contains REG_SZ and puts it into the text file `2.tmp`. Now that we've just just the one line, we want to strip the first 32 characters off it. We do this by first setting it as an enviroment variale and then trimming it down using the following two commands ([more on set][]):

[more on set]:http://www.computing.net/answers/windows-2000/use-file-contents-to-set-variables/63174.html

`set /p CommFiles=<2.tmp`

And then we shorten that ([more on trimming][]):

[more on trimming]:http://www.dostips.com/DtTipsStringManipulation.php

`set CommFiles=%CommFiles:~32%`

Then we can echo the result to the screen using:

`Echo The Common Files directory is: %CommFiles%`

And here it is all in one easy to copy set:

<pre><code>
Set CommFiles=C:\Temp
reg query HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion /v CommonFilesDir >1.tmp
findstr /r REG_SZ 1.tmp >2.tmp
set /p CommFiles=<2.tmp
set CommFiles=%CommFiles:~32%
Echo The Common Files directory is: %CommFiles%
</code></pre>

With a little editing I'm sure that you can turn this to your own uses, pulling out the value of registry keys and using them in script files. You're not limited to this registry key, you can use it to access all sorts of registry keys.

Please do tell me what uses you put this to.

Enjoy.
