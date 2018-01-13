---
layout: post
title: Git and the Command Line
---

I came from an SVN background, using a Windows GUI (Tortoise), and so naturally when I moved to Git, I wanted to use a Windows GUI and used SourceTree by Atlassian.

The problem was I, and the rest of my team, were relying too much on the GUI and had no understanding of what was happening under the covers with Git and we were treating our repositories in the same way that we would treat our old SVN repositories, and not making use of any of the powerful features that Git had to offer.

We had an extremely talented Contractor join our team, who forced us all to dump the GUI and move to the command line only for Git. At first I was extremely reluctant to change and failed to understand why anyone would use the command line over the GUI.

Our contractor spent some time with us going through what was actually happening under the covers when you clicked the buttons in the GUI and opening us up to a whole new wealth of commands.

I have now been using the command line for git for 5 years and can say I would never go back to the UI.

Don't get me wrong, having a GUI is ok, but I do feel that you should really get a decent understanding of what is happening when you press all those buttons before you use the GUI day to day. Very much like Learning To Drive and Passing your test, then go off an explore once you have the basic understanding. Although even though I have a very good understanding of git, I wouldn't go back to a GUI as the commaand line is just so much more powerful.

I use the command line in Powershell and have added a few tools to make this even easier to work with day to day.

## Setup Posh-Git
[Posh-Git](https://github.com/dahlbyk/posh-git) is a Powershell Module which gives you a very powerful overview of the Git Repository you are currently browsing in Powershell.

## Setup Posh-Monokai
Unfortunately this is not maintained anymore, but still works extremely well.

[Posh-Monokai](https://github.com/ntwb/posh-monokai) is a Powershell Module that provides a nice dark theme for powershell, making the colors for Posh-Git more prominent and generally makes Powershell much easier on the eyes to work with.

### Post Setup tips for Posh-Monokai
#### Stop colors being written to the console on Load.
By default, once you have installed Posh-Monokai and added the Module to your Powershell Profile as the setup instructions suggest, all the colors are Written to the Console screen everytime you launch Powershell and you may find this rather annoying. Simply open up the `posh-monokai.ps1` file and comment out or remove any `Write-Host` line.

#### Some text appears invisible
When you are using Powershell with the Monokai Theme you may notice that when you start to type parameters Eg `-SomeParameter` the text appears to be invisible. You just need to tweak your Powershell Profile to amend a couple of options.
1. Open a Powershell Window
2. Open your Powershell Profile in notepad to edit from Powershell `notepad $profile`.
3. Add the following to your profile to override the color options.
```powershell
Set-PSReadLineOption -TokenKind Parameter -ForegroundColor Magenta
Set-PSReadLineOption -TokenKind Operator -ForegroundColor White
```
4. Save the changes to your Powershell Profile.
5. Re-Launch Powershell

#### Powershell Windows still open in Standard Blue Theme.
When you install Posh-Monokai, this only changes the colours on the actual `powershell.exe` located in `C:\Windows\System32\WindowsPowerShell\v1.0`. Each windows Shortcut that is created Eg, Start Menu, Task Bar etc, have their own independent Colors set for that Shortcut, which were set at the time the shortcut was created. This means that if you open Powershell using any of these Shortcuts, the Window opens in the Blue theme. If you run `powershell.exe` from the `Run` dialog then you will notice that the Window loads using the new Monokai Theme.

To fix this, you need to recreate the shortcuts that you use, from the root `powershell.exe` file. Then the new shortcuts will inherit the correct colors.
1. Un-Pin Powershell from the Task Bar (If you have it pinned)
2. Open a Windows Explorer Window and browse to `C:\Windows\System32\WindowsPowerShell\v1.0`
3. Open up the Start Menu and start typing `Powershell`
   1. Right Click `Powershell` and select to open file Location.
   2. This should load a Windows Explorer Window at `C:\Users\username\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Windows PowerShell`
   3. Delete the shortcut `Windows PowerShell`
   4. Right Click and drag `powershell.exe` from `C:\Windows\System32\WindowsPowerShell\v1.0` into the Windows Explorer where you just deleted the shortcut.
   5. Drop `powershell.exe` and select to `Create Shortcuts here`
   6. Rename the new shortcut `Windows PowerShell`.
   7. Close all windows.
4. Open up the Start Menu, start typing `Powershell` again and try to open the new shortcut, this should now launch Powershell correctly with the Monokai theme.
5. Finally Pin the Powershell Window to the Task Bar again.
6. Now anytime you open Powershell from the Task Bar, Powershell should launch correctly with the Monokai theme.