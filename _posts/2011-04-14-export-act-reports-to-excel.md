---
layout: post
title: Export ACT! reports to Excel
permalink: /act/export-act-reports-to-excel
post_id: 391
categories:
- ACT!
- Excel
- Microsoft
- Report
---

Had a client today need some information out of ACT!, and ideally it would be in an Microsoft Excel spread sheet.

Given that one of the default ACT! reports gave the bare minimum required (Group Membership) we spent some considerable time editing a copy of that report to display the actual fields we wanted, both contact fields and group fields. What we wanted was a spread sheet that showed each contact in a particular groups sub-groups, detailing which sub-group each contact was a member of, and also showing some groups specific information for each.

This was all fine except that it still wasn't in a spread sheet once we produced the report, printing it, out to PDF, were no problem, but no .xls file.

This is where
[KB 14690](http://kb.sagesoftwareonline.com/cgi-bin/sagesoftwareonline.cfg/php/enduser/std_adp.php?p_faqid=14690) came in handy. It details how to modify the Windows Registry such that the output options for ACT! reports will then include such welcome and handy options like Microsoft Excel, Microsoft Word, TIFF file and Paged html.

Now when we produce the report, we get a beautiful Excel spread sheet with just the information the client requested.

Hope you find that useful, and if you do, let me know how you've applied it.
