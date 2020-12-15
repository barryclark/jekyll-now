---
layout: post
title: SMTP server in node.js? 
---

https://github.com/haraka/Haraka 
> Haraka is a highly scalable node.js email server with a modular plugin architecture. Haraka can serve thousands of concurrent connections and deliver thousands of messages per second. Haraka and plugins are written in asynchronous JS and are very fast.

>Haraka has very good spam protection (see plugins) and works well as a filtering MTA. It also works well as a MSA running on port 587 with auth and dkim_sign plugins enabled.

>Haraka makes no attempt to be a mail store (like Exchange or Postfix/Exim/Qmail), a LDA, nor an IMAP server (like Dovecot or Courier). Haraka is typically used with such systems.

>Haraka has a scalable outbound mail delivery engine built in. Mail marked as relaying (such as via an auth plugin) is automatically queued for outbound delivery.

It looks strange. But I can imagine that it could be useful. 
