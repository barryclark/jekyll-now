---
layout: post
title: Insufficient Disk Space Warning When Attempting to install
permalink: /microsoft/insufficient-disk-space-warning-when-attempting-to-install
post_id: 1045
categories:
- ACT!
- fsutil
- How to
- Microsoft
- Windows
---

Quick easy fix for
[Insufficient Disk Space Warning When Attempting to Unpack and Install a Sage ACT! Update or Hot Fix](http://kb.swiftpage.com/app/answers/detail/a_id/14362/kw/free%20space%20disk). The error arises from the fact that the free space on the drive is a multiple of 4GB. The underlying issue is to do with a bug in InstallShield. To fix this create a file of 1GB, changing your free space available, to do so quickly, from a windows command prompt, on the drive affected run this command:

fsutil file createnew 1gbfile.bin 1024000
This creates a 1GB file. You no longer have free space that is a multiple of 4GB. Do the install, then delete the 1gbfile.bin file.
[More on fsutil on Technet](http://technet.microsoft.com/en-us/library/cc753059.aspx).
