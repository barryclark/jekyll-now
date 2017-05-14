---
layout: post
title: Security Disclosure - Lawson Chase
---

Working in cyber security means I get contacted by a lot of recruiters on LinkedIn - despite being happily employed and not 'looking for work'!

I noticed specialist Corporate Governance/Cyber Security recruitment company *Lawson Chase* didn't use a secure connection on their website - taking usernames and passwords (a login page) and lots of personal details (a signup page) over a plaintext HTTP connection. Not using a secure connection makes it incredibly easy for these details to be intercepted by third parties.

Not using a secure connection isn't a great idea - especially when attempting to recruit people for *cyber security* roles! Even more incredibly, I've also reported *the same issue* to another cyber security recruitment company in the last few weeks. 

Luckily Lawson Chase fixed this, with a new HTTPS certificate appearing on their website shortly after disclosure


Disclosure Timeline:
* 2017-April-22 Reported issue to Lawson Chase
* 2017-May-08 Issue fixed (HTTPS implemented)