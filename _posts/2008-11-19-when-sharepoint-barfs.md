---
layout: post
title: When SharePoint barfs
permalink: /microsoft/when-sharepoint-barfs
post_id: 106
categories:
- Disaster
- How to
- Howto
- Microsoft
- Recovery
- SharePoint
---

A client has a SharePoint installation that has died, with all their project files and data in it.

In the course of searching for how to resurrect it, I've found the following that seem to be things that others may well benefit from:*An article on the
[Official SBS Blog, pointing to an unofficial tool](http://blogs.technet.com/sbs/archive/2007/01/05/using-sharepoint-database-explorer-on-sbs.aspx):


>During disaster recovery, if no backups other than the database files exist, we may manually extract the files from the database as a "belt and suspenders" approach to disaster recovery.


*A script from
[Mark Jen at Plaxo that restores files from SharePoint SQL DB with their directory structure](http://blog.plaxoed.com/2006/11/02/little-tool-to-extract-all-files-out-of-sharepoint/)


*An article from
[Ed Walters on how to backup SharePoint](http://blogs.technet.com/edwalt/archive/2008/07/25/3093877.aspx)

Possibly the biggest lesson here is to ensure that if your using
[SharePoint](http://www.microsoft.com/sharepoint/default.mspx), make sure you back it up PROPERLY, ALL OF IT.
