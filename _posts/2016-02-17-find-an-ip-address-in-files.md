---
layout: post
title: Find an IP address in files
permalink: /how-to/find-an-ip-address-in-files
post_id: 1433
categories:
- "*nix"
- CommandLine
- How to
- Linux
---

Ever been looking for a config file that contains an incorrect IP address?

If the IP address you're looking for is 8.8.8.8

Then this command is for you:

`find . -type f -exec grep -l 8.8.8.8 {} \;`

It'll find all occurrences of `8.8.8.8` that appear in files in the current directory and folders below it. With that short list you should be able to find where you need to edit.
