---
layout: post
title: How to clear the MS Exchange mail queue quickly
permalink: /microsoft/how-to-clear-the-ms-exchange-mail-queue-quickly
post_id: 332
categories:
- email
- How to
- Howto
- Microsoft
- SPAM
---

Spent the day dealing with an exchange server that had been compromised. As a result, heaps of spam emails were in the exchange mail queue. Manually removing them is a major pain in the rear. Fortunately, others have shared [how to clear the Microsoft Exchange mail queue of thousands for spam mails](http://technicians-blog.kingcomputer.com.au/how-to-clear-exchange-queue-when-there-are-hundres-of-spam-messages/).

- Stop the SMTP service
- Create a new spam folder for example in `C:\Program Files\Exchsrvr\Mailroot\vsi 1\Spam`
- With the SMTP service still stopped, move all the messages from the `C:\Program Files\Exchsrvr\Mailroot\vsi 1\Queue` to the spam folder (in case you need to retrieve a message)
- Restart the SMTP service. Of course prior to doing that, the instructions at this Microsoft KB [How to block open SMTP relaying and clean up Exchange Server SMTP queues in Windows Small Business Server](http://support.microsoft.com/kb/324958/) is quite helpful in showing how to make sure your exchange server is not an open relay. It also shows how to test if it is an authenticated relay attack that is the problem.
