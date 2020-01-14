---
layout: post
title: SSH and Private Key usage on Mac OS X
permalink: /general/ssh-and-private-key-usage-on-mac-os-x-md
post_id: 1482
categories:
- General
- ssh
---

It’s very important that your private keys are kept secure and away from prying eyes.

A good place to keep your private keys is in the folder
`~/.ssh` as this makes it easier to manage (this is a subfolder of your home folder).

You then want to set the permissions of the private key file to
600.

`chmod 600 ~/.ssh/privatekeyfile.pem`

Then you can ssh to the server from the command line using:

`ssh -i ~/.ssh/privatekeyfile.pem.pem root@fqdn -p 22`
