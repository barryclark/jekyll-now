---
layout: post
title: What are MX Records?
permalink: /general/what-are-mx-records
post_id: 8
categories:
- DNS
- email
- MX record
- What is
---

I was asked to explain MX records today, here it is for others as well:

MX Records, or Mail eXchange Records, is simply a line of text in a file on a DNS Server on the internet.

What it does however is VERY important. It tells other peoples mail servers where to deliver email they are sending to you.


![DNS MX Record](/images/DNS.MX.Record.jpg)The first MX record (indicated by a lower number, in this example, 10 mail.domain.com.au) is known as the primary MX record. This is where email servers will try to send email first. If it fails, then it will try subsequent MX records (in this example, 20 mail.domain.com.au).

If your email server is hosted onsite on MS Small Business Server 2003 and you change ISP, you will have a new STATIC IP address assigned. Given that your MX record will be pointing to the old IP address, you won't be getting any email arrive.

To fix this means editing the MX record to reflect the new IP address. That will involve either lodging a job with your hosting provider, or domain name registrar.
