---
layout: post
title: Email error codes
permalink: /how-to/email-error-codes
post_id: 37
categories:
- email
- How to
- Howto
- Microsoft
- RFC
---

Ever got an email message saying something like this?

This is an automatically generated Delivery Status Notification.
THIS IS A WARNING MESSAGE ONLY.
YOU DO NOT NEED TO RESEND YOUR MESSAGE.
Delivery to the following recipients has been delayed.
              < someone@example.com >
The reason for the problem:
4.1.0 - Unknown address error 451-'DNS temporary failure (#4.3.0)'

If you have, then like me, deciphering this is made heaps easier with these two pages:
[this page at Microsoft, which list the Enhanced Status Codes for Delivery](http://support.microsoft.com/kb/256321/) as per
[RFC 1893 - Enhanced Mail System Status Codes](http://www.ietf.org/rfc/rfc1893.txt).

Using this, I now know that 4.1.0 & 4.3.0 means:


**4.X.X   Persistent Transient Failure**

       A persistent transient failure is one in which the message as
       sent is valid, but some temporary event prevents the successful
       sending of the message.  Sending in the future may be successful.

**X.1.0   Other address status**

          Something about the address specified in the message caused
          this DSN.

**X.3.X   Mail System Status**

          Mail system status indicates that something having to do
          with the destination system has caused this DSN.  System
          issues are assumed to be under the general control of the
          destination system administrator.

**X.0.0   Other undefined Status**

          Other undefined status is the only undefined error code. It
          should be used for all errors for which only the class of the
          error is known.

All of which let me know where to start looking in order to fix this. Hope you find it useful too.
