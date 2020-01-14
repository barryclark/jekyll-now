---
layout: post
title: How to fix ssh "Remote host identification has changed" Error
permalink: /how-to/how-to-fix-ssh-remote-host-identification-has-changed-error
post_id: 997
categories:
- How to
- ssh
---

Trying to connect to a host via ssh and I'm getting an error:@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@ WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED! @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!
Someone could be eavesdropping on you right now (man-in-the-middle attack)!
It is also possible that a host key has just been changed.
The fingerprint for the RSA key sent by the remote host is
[...].
Please contact your system administrator.
Add correct host key in /Users/benhamilton/.ssh/known_hosts to get rid of this message.
Offending RSA key in /Users/benhamilton/.ssh/known_hosts:2
RSA host key for [...] has changed and you have requested strict checking.
Host key verification failed.

The simplest way to fix this (that I'm aware of) is to edit the /Users/benhamilton/.ssh/known_hosts file and delete the second entry. Why the second entry, because the line in the error above tells us which line is the offending key at the end of the line.:

>Offending RSA key in /Users/benhamilton/.ssh/known_hosts:
**2**


I'm using Mac OSX, other flavours of *nix will have a slightly different path to the known_hosts file.

More info re this error can be found at
[Serverfault](http://serverfault.com/questions/321167/add-correct-host-key-in-known-hosts-multiple-ssh-host-keys-per-hostname),
[MacWorld](http://hintsforums.macworld.com/showthread.php?p=721899), and
[thegeekstuff](http://www.thegeekstuff.com/2010/04/how-to-fix-offending-key-in-sshknown_hosts-file/).
