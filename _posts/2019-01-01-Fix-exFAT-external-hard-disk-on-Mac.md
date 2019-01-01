---
layout: post
title: Fix exFAT External Hard Disk on Mac
---

Often times my External Hard disk stops being detected on my MacBook Air. The first few times were scary but now I generally know that I will figure a way out.

## Why
It usually happens when the Hard Disk does not get ejected properly. I have read that exFAT on mac is vulnerable to such a scenario and the file system kind of breaks.

## How to Fix It
There are two options. The first one is simple: Keep the hard disk connected and let Mac fix it by itself. I have noticed that if you give it approx 10-20 minutes, mac would by itself fix the File System. And optionally you can also try to run `First-Aid` from `Disk Utility`

The other option is to use the following steps:

1. Use `diskutil list` to find the right drive id.
  1. You want the id under the IDENTIFIER column, it should look like `disk1s1`
2. Run `sudo fsck_exfat -d <id from above>`. eg `sudo fsck_exfat -d disk1s3`
  1. `-d` is debug so you'll see all your files output as they're processed.
3. Answer `YES` if it gives you the prompt `Main boot region needs to be updated. Yes/No?`
4. Open Disk Utility and you should be able to repair here successfully.

[Source](https://gist.github.com/scottopell/595717f0f77ef670f75498bd01f8cab1) of the above steps