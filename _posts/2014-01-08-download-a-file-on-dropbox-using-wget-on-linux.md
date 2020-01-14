---
layout: post
title: Download a file on dropbox using wget on linux
permalink: /how-to/download-a-file-on-dropbox-using-wget-on-linux
post_id: 981
categories:
- Dropbox
- How to
- Linux
- wget
---

Firstly, get the dropbox share link. It will look like this

`https://www.dropbox.com/s/ad2arn440pu77si/test.txt`

Then add a `?dl=1` to the end of that url and a `-O filename` so that you end up with something like this:

`wget https://www.dropbox.com/s/ad2arn440pu77si/test.txt?dl=1 -O test.txt`

Now you can easily get files onto your linux box that aren't available elsewhere.
