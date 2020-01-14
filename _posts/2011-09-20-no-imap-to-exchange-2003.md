---
layout: post
title: No IMAP to Exchange 2003
permalink: /microsoft/no-imap-to-exchange-2003
post_id: 485
categories:
- IMAP
- Microsoft
- Outlook
- Aside
---

So I ran into an issue I've not seen before yesterday. Couldn't get Microsoft Outlook 2010 configured to talk via IMAP to Microsoft Exchange 2003, although the username and password was correct, it just would not connect. Turns out the answer is in this Microsoft KB article: [Users Cannot Log On Using POP3 and the Error 0x80040920 Is Logged](http://support.microsoft.com/default.aspx?scid=kb;en-us;296387). Although about POP3 and not IMAP, the fix is the same, make both the account name and the alias in Microsoft Exchange the same.
