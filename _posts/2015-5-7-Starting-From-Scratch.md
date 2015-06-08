---
layout: post
title: Starting from scratch
---

New blog. New system. Let's start with the basics.

## Generate an SSH key
In order to clone the repo for this blog, first an SSH key needs to be generated and uploaded to Github.

```bash
ssh-keygen -t rsa -b 2048 -C "hax0r@darkmail.net"
```

The default file name is sufficient. Now enter a password. This is more secure because the SSH key (and not the password) is put on the wire. 

Now cat the contents of your key and copy to Github via the web interface.

```bash
cat id_rsa.pub
```

All keys are accessible at http://github.com/jashley82.keys
