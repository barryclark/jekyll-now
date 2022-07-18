---
id: 191
title: 'Finding All Mailboxes with a Forwarding Address in Exchange 2003'
date: '2015-09-07T23:13:00+00:00'
author: Ryan
layout: post
permalink: '/?p=191'
image: /wp-content/uploads/2015/09/ExchangeForwarding.png
categories:
    - Uncategorized
tags:
    - Exchange
    - WindowsServer
---

Believe it or not, the MSP I work for still has a client who is using Exchange 2003 as their primary email service. Despite several attempts at convincing them of the power of Office 365, they refuse to migrate. Last week the CFO contacted me and requested we provide them with a report of all users who have their email forwarded to another mailbox. “Ok, no problem.” I said helpfully as the client informed me of their request (at the time I didn’t even think about them having Exchange 2003…). I figured I would just connect to their server and do some quick PowerShell magic, and that would be it. Quick and painless, right? Wrong.

I did the RDP dance and got connected to their server, and my jaw just about hit the floor when I couldn’t find the Exchange Management Shell! I asked around the office to see if any of the other guys could help, but no one knew what to do. However, after talking with one of the guys, I remembered that this is Active Directory we are dealing with. There are objects, and those objects have attributes. The mailboxes/user accounts are objects, and those objects have attributes. So what attribute is it that controls forwarding addresses? I manually found one of the users who had a forwarding address configured. Then I opened up Active Directory Users and Computers, opened up her account properties, and went to the Attribute Editor tab. I filtered for attributes that have values and was able to see the email address that her mail was forwarding to. This was the “altRecipient” attribute.

I then did an “Advanced” search in Active Directory Users and Computers for any objects that have the “altRecipient” attribute configured, like so:

[![](https://geekyryan.com/wp-content/uploads/2015/09/ExchangeForwarding.png)](https://geekyryan.com/wp-content/uploads/2015/09/ExchangeForwarding.png)

This search showed me all of the mailboxes that have an alternate recipient (forwarding address) configured. Not sure if there is another way to obtain this information, but this is the way that worked for me. Hopefully this article is able to help someone in the same situation.