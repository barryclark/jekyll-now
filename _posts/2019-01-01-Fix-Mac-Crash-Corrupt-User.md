---
layout: post
title: Fix Mac Crash/Corrupt User [macOS Mojave]
---

I have seen a lot of blogs on how to fix it but I often get stuck. [This](https://appletoolbox.com/2016/07/fix-corrupt-user-accounts-macos/) one seems the most useful at times.

The problem is like, after restarting the Finder starts to freeze and soon you cannot open any applications or even request for a restart.

The solution is to create an Admin User and clear `~/Users/username/Library/Caches`. I had to use the terminal for that (used the command `sudo rm -rf <path>`)

There was a slight trick required. By default the terminal does not have `All Disk` access and so the `rm -rf` or such commands won't work. To allow it:

1. Open `System Preferences`
2. Go to `Security and Privacy`
3. `Privacy` tab
4. `Full Disk Access` from the left panel 
5. Click the lock button at the bottom to allow changes
6. Add terminal in the list of applications having Full Disk Access