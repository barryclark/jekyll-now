---
layout: post
title: Finding user SID
permalink: /microsoft/finding-user-sid
post_id: 261
categories:
- Howto
- Microsoft
- SID
- Windows
---

Occasionally you may want to know the [SID][] of a windows user. If that made no sense to you, read no futher, this snippet is not for you.

[SID]:http://encyclopedia.thefreedictionary.com/Security+Identifier
"Read a definition of what the SID is"

Open up REGEDIT and browse to this key:

`HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\ProfileList`

Here you will find a list of SID's, under each is a subkey containing the name of the user it is associated with. Run through them until you find the username you're looking for and bingo, it's parent key is that users SID.

Found via [petri.co.il][]

[petri.co.il]:http://www.petri.co.il/forums/showthread.php?t=21332\
"petri.co.il is a wealth of tech goodness"

[Bonus link][]

[Bonus link]:https://secure.wikimedia.org/wikipedia/en/wiki/Security_Identifier
"More explaination of SID's, decoding them etc"
