---
layout: post
title: Terminal Server FTP without admin rights
permalink: /microsoft/terminal-server-ftp-without-admin-rights
post_id: 30
categories:
- FTP
- How to
- Howto
- Microsoft
---

I've just found myself needing to FTP some files to a clients site. The file are in the data directory on our company's terminal server (which I don't have admin rights on) and I need them on a SQL Server for a client.

I do have access to a FTP Server but the first step is to get the files up to the FTP Server then download them to the client site. Yes, I could use the command line tool
ftp but that is just too painful at this time of day (read: night).

Thus a quick google turned up this:
[AnyClient - The Free No-Install FTP Client](http://www.anyclient.com/applet.html).

It is a java applet. What a lifesaver, nice gui (similar to Filezilla, which is my choice of FTP clients). Anyway, AnyClient is quick and easy to use. Just thought I'd share the find.

Oh, and of course, no admin rights needed, as there is no program installing. Yay!
