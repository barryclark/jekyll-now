---
layout: post
title: Encrypt and decrypt .zip files on Mac OS X
permalink: /nix/encrypt-and-decrypt-zip-files-on-mac-os-x
post_id: 1330
categories:
- "*nix"
- Command
- Mac
- ZIP
---

I just needed to compress and encrypt some files on Mac OS X. The following command does that:

`zip -ejr TARGET SOURCEFOLDER`

This will ask for a password (twice to confirm it), encrypt and compress the sourcefolder and put it into a file named target (and auto add the .zip extension).

To unzip it do this:

`unzip SOURCE -d TARGETFOLDER`

This will ask for the password, decrypt and uncompress it into the targetfolder.
